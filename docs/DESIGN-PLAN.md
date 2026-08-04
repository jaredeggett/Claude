# Connected 7-Day Pillbox — Design Plan

**Project codename:** `Lumen7`
**Revision:** v0.1 (design plan, pre-prototype)
**Status:** Design specification. Nothing has been built, printed, or flashed yet — every number below is a starting target to be validated by the test coupons in Phase 2.

---

## 1. What we are building

A 7-day medication organizer made of **7 removable clear pill pods** sitting in a **smart tray**. The tray knows, per day:

| State | Meaning |
| --- | --- |
| `SEATED_CLOSED` | Pod is in its bay, lid shut. Nothing has happened. |
| `SEATED_OPEN` | Pod is in its bay, lid open → **presumed dose taken** |
| `REMOVED` | Pod has been lifted out of the tray (travel, refill, or the user took the whole pod with them) |

Each bay is lit from below by an RGB LED. Because the pods are clear, the entire pod glows — amber when a dose is due, green when taken, red when the window is missed. That light-piping behaviour is the whole reason the pods are clear rather than opaque, and it is the primary user interface: the box is readable from across the room with no screen.

Detection is magnetic **contact sensing** — a magnet in the moving part, a solid-state sensor in the fixed part. No holes in the enclosure, no wear surfaces, nothing to clean around.

### Explicitly out of scope for v1
- Not a medical device. It logs lid events; it never advises on dosing, never tells a user to take or skip a dose, and must not be represented as an adherence guarantee. An open lid is *evidence* of a dose, not proof of one.
- **Not child-resistant.** A single cantilever latch does not meet CPSC Poison Prevention Packaging Act requirements. If children have access to the household, this box must live in a locked cabinet. A two-action latch is sketched in §11 as a future option, but it is untested and unqualified.
- No pill counting, no camera, no weight sensing (see §11 for why load cells were rejected for v1).

---

## 2. Architecture at a glance

```
                    ┌──────────────── REAR SPINE (printed, opaque) ────────────────┐
                    │  Spine PCB:  7 × hall sensor (lid)  +  MCP23017 @ 0x21       │
                    └───────────────────────────┬─────────────────────────────────┘
                                                │ I²C (4-wire JST)
   ┌────────────────────────────────────────────┴────────────────────────────────┐
   │ TRAY (printed, opaque)                                                      │
   │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        Main PCB:                          │
   │   │ MON │ │ TUE │ │ WED │ │ THU │          ESP32-C6                         │
   │   └─────┘ └─────┘ └─────┘ └─────┘          MCP23017 @ 0x20 (7 × pod-present │
   │      ┌─────┐ ┌─────┐ ┌─────┐  ┌────┐         hall + 2 buttons)              │
   │      │ FRI │ │ SAT │ │ SUN │  │ UI │        7 × WS2812B (bay uplight)       │
   │      └─────┘ └─────┘ └─────┘  └────┘        DS3231 RTC, buzzer, USB-C       │
   └─────────────────────────────────────────────────────────────────────────────┘
        ▲ 7 × clear pod, each with hinged clear lid, 2 magnets, no electronics
```

**The pods contain no electronics.** Every removable part is a dumb, washable, cheap-to-reprint piece of plastic. All silicon lives in the tray. This is the single most important architectural decision in the project: it is why the system costs ~$60 instead of ~$250, why there are no seven batteries to change, and why a cracked pod is a 40-minute reprint instead of a repair.

---

## 3. Sensing design

### 3.1 Why two sensors per bay

One sensor cannot distinguish "lid open" from "pod removed" — both look like *magnet gone*. That ambiguity matters: if the user takes Wednesday's pod to work in a pocket, we must not log a dose at the moment they lift it out, and we must not log a missed dose at 9 p.m. So each bay gets two independent magnet/sensor pairs:

| Pair | Magnet location | Sensor location | Answers |
| --- | --- | --- | --- |
| **P** (presence) | Boss on pod underside, rear-left corner | Main PCB, directly beneath bay floor | Is the pod in its bay? |
| **L** (lid) | Lid rear tab, 6 mm forward of hinge axis | Spine PCB, at hinge height | Is the lid shut? |

Truth table:

| P | L | State |
| --- | --- | --- |
| 1 | 1 | `SEATED_CLOSED` |
| 1 | 0 | `SEATED_OPEN` → dose event |
| 0 | 0 | `REMOVED` |
| 0 | 1 | Impossible → flag `SENSOR_FAULT`, do not log |

The impossible row is free diagnostics: it catches a dislodged magnet, a cracked solder joint, or a pod put back upside down, and it is why the two-sensor scheme is worth the extra $4.

### 3.2 Sensor choice

**Recommended: `DRV5032FA` digital hall (unipolar, omnipolar variant available), SOT-23, 1.3 µA at 20 Hz internal sampling.** 14 of them, driving two `MCP23017` I²C expanders (16 inputs each; we use 14 + 2 buttons). The MCP's `INT` pin wakes the ESP32, so the firmware is interrupt-driven rather than polling.

Why not the alternatives:

| Option | Verdict |
| --- | --- |
| **Reed switch** (a true contact sensor — the classic door-sensor part) | Works, and is a **drop-in substitute** into the same MCP23017 inputs with only a pull-up change. Rejected as default: glass envelope is fragile in a drop, contacts bounce (~1 ms, needs debounce anyway), and orientation sensitivity makes the magnet pocket geometry fussier. Keep as the fallback if hall sourcing is a problem — the PCB footprint should accept both. |
| **Mechanical microswitch / lever** | Cheapest, but needs a penetration through the enclosure at exactly the place we want sealed, adds lid-closing friction the user feels, and wears out. Rejected. |
| **Analog ratiometric hall** (`DRV5055`) | Could infer three states from one sensor per bay by field strength, saving 7 parts. Rejected for v1: state boundaries become calibration-dependent and drift with temperature and magnet aging. Two digital sensors give a hard, repeatable truth table. Revisit only if BOM cost becomes critical. |
| **Load cells under each bay** (pill counting) | Genuinely useful — it would detect *how many* pills left, not just lid events. Rejected for v1 on complexity: 7 amplifiers, drift, tare management, and a mechanically decoupled bay floor. Logged as the highest-value v2 feature. |

### 3.3 Magnets

Ø4 × 2 mm N52 discs, 14 total. Press-fit into a Ø4.1 × 2.2 mm pocket, retained by a drop of CA and capped by a 0.8 mm printed wall. Working air gap ~3–4 mm in both pairs.

**This is the number most likely to be wrong on the first print.** `DRV5032FA` typical operate point is ~3.5 mT / release ~2.5 mT; a Ø4×2 N52 at 4 mm on-axis lands in the low single-digit mT range, which is uncomfortably close to threshold. Phase 2 must build the **magnet gap coupon** (§8) and measure actual switching distance before any full part is printed. If margin is thin, in order of preference: (a) shrink the gap by thinning the sensor-side wall to 1.0 mm, (b) go to Ø5 × 2 magnets, (c) switch to the more sensitive `DRV5032FB`. Do not proceed to Phase 3 without ≥2× margin on both operate and release.

---

## 4. Mechanical design — pods

Seven identical, interchangeable pods. **The day is a property of the bay, not of the pod** — the tray is what's labelled MON–SUN, and the tray is what has the sensors. This means pods can be washed, swapped, and reprinted freely without breaking tracking, and there is no seven-part inventory of subtly different STLs.

### 4.1 Pod body (print in clear)

| Feature | Dimension | Note |
| --- | --- | --- |
| Internal cavity | 34.0 × 28.0 × 26.0 mm | 24.8 mL — holds ~15–20 typical 500 mg caplets |
| Wall thickness | 2.0 mm | 5 perimeters at 0.4 mm — no infill in walls, which matters for clarity |
| Floor thickness | 1.6 mm | Thin for light transmission from the bay LED |
| Body outer | 38.0 × 32.0 × 27.6 mm | |
| Rim ledge | 1.5 mm tall × 1.0 mm wide | Lid lip drops inside this |
| Presence-magnet boss | Underside rear-left, 8 × 8 × 3.0 mm pad, Ø4.1 × 2.2 pocket | Magnet **P** |
| Retention dimples | 0.5 mm hemispherical, 2 per long side, 3.0 mm above base | Mate with tray detents |
| Grip flutes | 1.0 mm radius vertical scallops, both short sides | Pods must come out with arthritic hands — see §7 |

### 4.2 Lid (print in clear)

| Feature | Dimension |
| --- | --- |
| Plate | 38.0 × 32.0 × 3.0 mm |
| Inner lip | 33.4 × 27.4 mm × 1.5 mm tall (0.3 mm clearance per side into cavity) |
| Hinge | Rear, Ø1.75 mm filament offcut as pin; pod carries 2 outer knuckles (6 mm), lid carries 1 centre knuckle (8 mm); bore Ø1.9, boss OD Ø5.0 |
| Hinge axis | 2.0 mm above rim, 2.5 mm behind rear face → +5.0 mm rear overhang |
| Lid magnet pocket | Rear tab, 6.0 mm forward of hinge axis, Ø4.1 × 2.2 | Magnet **L** |
| Latch | Front cantilever, 6.0 W × 8.0 L × 1.2 T, 0.7 mm hook into a pod-front undercut |
| Open angle | 110° hard stop, over-centre hold so the lid stays open one-handed |

**Latch release force target: 8–12 N.** Below 8 N it pops open in a bag; above 12 N it is inaccessible to a user with reduced grip strength — which is a substantial fraction of the people who need a pillbox at all. This is a tuned parameter, not a guess: print the latch coupon at 1.0 / 1.2 / 1.4 mm thickness and measure with a luggage scale.

**Assembled pod envelope:** 38.0 W × 37.0 D × 31.0 H mm.

### 4.3 Tray (print opaque)

| Feature | Dimension |
| --- | --- |
| Bay pocket | 38.6 × 32.6 × 6.0 deep (0.3 mm clearance per side) |
| Layout | 4 bays rear row, 3 bays front row, 2.0 mm dividers |
| Retention detents | 0.5 mm bumps, 2 per bay side wall |
| LED window | Ø6.0 through bay floor, capped with a 1.2 mm natural/translucent printed diffuser disc |
| Bay floor | 2.0 mm over the sensor P footprint (thin locally to 1.0 mm if §3.3 margin is tight) |
| Electronics cavity | 10 mm tall, under the bay floors, closed by a screwed bottom plate |
| Fasteners | 8 × M3 heat-set inserts, 4 × M3×8 bottom plate, 4 × M3×10 spine |
| Front strip | 22 mm deep — refill button, ack button, buzzer grille, USB-C, status LED |
| Outer | 166 W × 110 D × 20 H mm |

### 4.4 Spine (print opaque)

Separate bar, 166 × 12 × 46 mm, screwed to the tray rear. Carries the 7 lid sensors and MCP #2 on a strip PCB, connected to the main board by one 4-wire JST-XH (I²C + power). Printing it separately keeps every part flat on the bed, and makes the sensor strip serviceable without disassembling the tray.

**Assembled system envelope: ~166 × 110 × 46 mm.** Every part fits flat on a 220 × 220 bed; largest single part is the tray at 166 × 110.

### 4.5 Layout alternative

A single straight row of 7 is the more conventional pillbox shape, but it measures 288 mm long and requires splitting the tray into two printed halves with a dovetail-and-screw joint. The 4+3 arrangement was chosen instead because it fits every common printer in one piece and has a better nightstand footprint. The parametric model should keep `ROWS` as a variable so the linear version stays buildable.

---

## 5. Printing the clear parts

FDM "clear" is translucent, never optical-grade. Two viable routes:

### Route A — Clear PETG (recommended)
Tougher, cheaper, chemically the safer polymer, and forgiving to print. Target settings:

| Parameter | Value | Why |
| --- | --- | --- |
| Nozzle | 0.4 mm, **hardened steel or stainless** | Brass leaches lead into anything food-adjacent |
| Nozzle temp | 245–250 °C | Hot enough to fuse layers optically |
| Bed | 80 °C |
| Layer height | 0.24 mm | Thicker layers = fewer interfaces = clearer |
| Extrusion width | 0.50 mm | Slight over-width squeezes out voids |
| Flow | 103–105 % | Tune by coupon, not by faith |
| Perimeters | 5 (walls are 100 % perimeter, no infill boundary) | Infill/perimeter seams are the #1 cloudiness source |
| Infill | 100 %, rectilinear ±45°, 30 % overlap | Only applies to bosses |
| Cooling | 0–20 % | Fan quenches the interface and makes parts foggy |
| Speed | 25 mm/s on external perimeters |

Post-process for glass-like finish: wet sand 400→3000, then a thin flood coat of clear UV resin or two-part epoxy. Expect ~30 min per pod. A heat-gun polish is faster but warps thin walls — not recommended on the 1.6 mm floor.

### Route B — MSLA clear resin
Meaningfully better clarity (near-optical after sanding to 3000 + clear coat). Costs: UV yellowing over 12–18 months, brittleness on drop, and most clear resins are **not** food-contact rated. Only worth it if the light-pipe aesthetic is the point.

### Route C — Hybrid (best of both)
Pods and lids in clear PETG; if one showpiece unit is wanted, print that set in resin. Tray and spine always in opaque PETG or ASA — they need toughness and heat resistance, not clarity.

### Material-contact caveat — read this one
3D-printed surfaces have layer lines that harbour bacteria and cannot be truly sterilised, and printed parts are not certified food-contact regardless of the base polymer's rating. For dry tablets this is a low risk, but the honest guidance is: keep pills in their blister where possible, hand-wash pods in warm soapy water and dry fully, don't put them in a dishwasher (PETG softens ~80 °C), and reprint the pod set annually. If a user is immunocompromised, use a commercially moulded insert instead of a printed cavity.

---

## 6. Electronics & firmware

### 6.1 Core
- **MCU:** ESP32-C6 (Seeed XIAO ESP32C6 for the prototype — 21 × 17.5 mm). Wi-Fi 6 + BLE + 802.15.4, which keeps the Matter/Thread door open.
- **I/O:** 2 × MCP23017 (0x20 main, 0x21 spine), interrupt-driven.
- **Time:** DS3231 RTC + CR2032. A dose log with wrong timestamps is worse than no log, and this box must survive a Wi-Fi outage without lying about when the lid opened.
- **Feedback:** 7 × WS2812B-5050 (bay uplight) + 1 status LED + passive piezo.
- **Power:** USB-C, 5 V 1 A. This is a bedside appliance, not a wearable — mains power removes battery anxiety entirely. Optional TP4056 + 2000 mAh LiPo for outage ride-through and portability; at ~14 × 1.3 µA sensor idle the sleep budget is dominated by the radio, not the sensing.

### 6.2 Event logic
- Debounce 250 ms on every input.
- A **dose event** is declared when the lid has been open ≥1 s and then closes — not on the opening edge. This rejects a bump, and it means a briefly-jostled lid doesn't silently mark a dose taken.
- **Refill mode is mandatory, not a nicety.** Sunday-night refilling opens all seven lids and would otherwise log seven phantom doses and clear seven real reminders. Hold the refill button 3 s (or toggle from the app) → all logging suppressed for 10 minutes, all LEDs white, auto-exit on timeout. Any design that omits this produces garbage data in week one.
- Escalation: LED amber at window open → slow pulse at +15 min → phone push at +30 min → optional caregiver notification at +2 h → LED red and `MISSED` logged at window close.
- `REMOVED` suspends the schedule for that bay and starts a "pod is out" timer rather than firing missed-dose alerts.

### 6.3 Integration
Primary path is **ESPHome → Home Assistant**: 7 lid binary sensors, 7 presence binary sensors, 7 text sensors for bay state, plus services for refill mode and week reset. Matter/Thread is the stretch goal for native Apple/Google Home support, which the C6 makes reachable without new hardware.

A reference ESPHome sketch is at [`firmware/lumen7.yaml`](../firmware/lumen7.yaml). **It has not been flashed or tested** — pin assignments in particular are placeholders until the PCB is laid out.

---

## 7. Who this is for

The median pillbox user is older, may have reduced grip strength and reduced near vision, and is often managing this alongside a caregiver. Three consequences that are already baked into the numbers above and must not be value-engineered away:

1. **Latch force capped at 12 N** and grip flutes on the pods — if it takes two hands and a fingernail, it will not be used.
2. **The LED is the primary interface**, not a screen. A glowing amber pod is legible without glasses at 3 m; a 0.96" OLED is not.
3. **The caregiver notification is a first-class feature.** For a large share of users the person who needs to know about a missed dose is not the person standing at the box.

---

## 8. Build phases

| Phase | Work | Exit criterion |
| --- | --- | --- |
| **0. Decisions** | Confirm the four open questions in §10 | Answers recorded here |
| **1. Bench sensing** | One bay on a breadboard: 2 halls + MCP23017 + XIAO C6, hand-held magnets | Truth table §3.1 reproduces reliably, incl. the fault row |
| **2. Coupons** | Print: (a) **magnet-gap coupon** — sensor wall at 1.0/1.6/2.0/2.5 mm, measure actual switching distance; (b) **latch coupon** at 1.2/1.4/1.6 mm, measure release force; (c) **hinge coupon**, 500 open/close cycles; (d) **clarity coupon** — 4 print recipes side by side | Gap has ≥2× threshold margin; latch lands 8–12 N; hinge survives 500 cycles; a clarity recipe is chosen |
| **3. Mechanical v1** | Full parametric model, print tray + spine + 2 pods | Pods seat with correct detent feel; lids clear the spine at 110° |
| **4. Full set** | Print all 7 pods + lids, assemble magnets | All 14 magnet pairs read correctly through real walls |
| **5. Electronics** | Perfboard build → KiCad PCB → JLCPCB 5-off | Both MCPs enumerate; all 7 LEDs address correctly |
| **6. Firmware** | ESPHome config, state machine, refill mode, escalation, HA dashboard | 7 days of synthetic events logged with zero phantom doses |
| **7. Field test** | 2 weeks of real daily use, including 2 refill cycles and 1 travel day | False-positive rate = 0; no missed real dose events |
| **8. Release** | STLs, parametric source, BOM, assembly guide, firmware | Someone else can build it from the repo alone |

Phase 2 is the phase to not rush. Every dimension in §4 is an educated starting point, and coupons are how they stop being guesses. The magnet gap in particular (§3.3) is the one most likely to force a redesign, which is exactly why it is tested before anything large is printed.

---

## 9. Bill of materials

Full costed list in [`hardware/BOM.csv`](../hardware/BOM.csv). Summary:

| Group | Cost |
| --- | --- |
| Electronics (MCU, 14 halls, 2 expanders, RTC, LEDs, buzzer, USB-C) | ~$38 |
| PCB (5-off from JLCPCB) | ~$15 |
| Magnets, fasteners, inserts, feet | ~$9 |
| Filament (~250 g: 130 g tray/spine + 120 g pods/lids) | ~$7 |
| **Total per unit (first unit, incl. PCB minimum order)** | **~$69** |
| Marginal cost of units 2–5 | ~$52 |

Optional: LiPo + charger +$8; MSLA clear resin route +$15/set.

---

## 10. Open questions

Defaults are chosen so work can start immediately; each is cheap to change now and expensive to change after Phase 3.

| # | Question | Default assumed |
| --- | --- | --- |
| 1 | Layout: 4+3 two-row, or 7-in-a-row split-print? | **4+3** (fits any bed in one piece) |
| 2 | Doses per day: one compartment/day, or AM/PM split (14 pods)? | **One per day.** AM/PM doubles pod count and needs 28 sensors — it changes the whole architecture, so decide before Phase 3 |
| 3 | Ecosystem: Home Assistant only, or Matter for Apple/Google Home? | **ESPHome/HA first**, Matter as stretch |
| 4 | Clarity: PETG (tough, cheap) or resin (near-optical, brittle, not food-rated)? | **Clear PETG** |

Question 2 is the one that actually reshapes the design. If AM/PM is wanted, say so before the parametric model is written.

---

## 11. Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Magnet field too weak through printed wall | **High** — blocks everything | Phase 2 gap coupon before any large print; escalation path in §3.3 |
| Refill opens all 7 lids → phantom doses | **High** — corrupts the core data | Refill mode is a Phase 6 requirement, not an enhancement |
| Clear FDM parts look cloudy/cheap | Medium | Clarity coupon compares 4 recipes; epoxy flood coat as fallback; resin as Route B |
| Living-hinge/pin hinge fatigue | Medium | Separate filament-pin hinge (not a living hinge); 500-cycle coupon; pods are a 40-min reprint |
| Lid open ≠ dose taken | Medium — inherent to the approach | Never claim proof of adherence; load cells in v2 for actual counting |
| User trusts it as a medical device | Medium | Explicit disclaimer in README, app, and docs |
| Child access | **High if children present** | Not child-resistant. Documented prominently; two-action latch as future work |
| Wi-Fi outage loses events | Low | DS3231 + local event buffer, replay on reconnect |
| PETG softens in a hot car | Low | ASA for tray if portability matters; documented limit |

---

## 12. Future work (v2+)

- **Load cells per bay** for real pill counting — the single biggest jump in data quality, turning "the lid opened" into "two pills left".
- Two-action child-resistant latch, tested against CPSC protocol.
- Matter/Thread native commissioning.
- Moulded food-grade drop-in liners for the pod cavities.
- Travel mode: a single pod plus a BLE tag, so a pod taken out of the house still reports.
- Caregiver web dashboard and weekly adherence report.
