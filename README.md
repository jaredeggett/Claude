# Lumen7 — connected 7-day pillbox

A 3D-printed 7-day medication organizer: **7 removable clear pill pods** in a **smart tray** that senses, per day, whether the pod is seated and whether its lid is open. Each bay is lit from below, so the clear pod itself glows — amber when a dose is due, green when taken, red when missed. Readable across a room, no screen.

**Status: design plan only.** Nothing has been printed, built, or flashed. Every dimension is a starting target to be validated by the Phase 2 test coupons.

## Repo layout

| Path | Contents |
| --- | --- |
| [`docs/DESIGN-PLAN.md`](docs/DESIGN-PLAN.md) | The plan — architecture, sensing, full dimensions, print settings, phases, risks |
| [`hardware/BOM.csv`](hardware/BOM.csv) | Costed bill of materials (~$69 first unit, ~$52 thereafter) |
| [`firmware/lumen7.yaml`](firmware/lumen7.yaml) | Reference ESPHome sketch — untested, placeholder pins |

## Key decisions

- **Pods hold no electronics.** All silicon lives in the tray, so removable parts stay cheap, washable, and reprintable — and there are no seven batteries to change.
- **Two magnet/sensor pairs per bay**, because one sensor cannot tell "lid open" from "pod removed". The two-sensor truth table also yields a free impossible-state fault check.
- **Day belongs to the bay, not the pod.** Pods are interchangeable; the tray carries the labels and the sensors.
- **4+3 layout**, so the tray prints in one piece on a 220 × 220 bed instead of a 288 mm two-part split.
- **Clear PETG** for pods over resin — tougher, cheaper, and the safer polymer near medication.

## Please read before building

This is **not a medical device**. It logs lid events; an open lid is evidence of a dose, not proof of one. It makes no dosing recommendations and is not an adherence guarantee.

It is also **not child-resistant** — a single cantilever latch does not meet CPSC Poison Prevention Packaging Act requirements. With children in the household, this box belongs in a locked cabinet.

Printed parts are not certified food-contact regardless of the base polymer. See the material-contact caveat in the design plan.

## Next steps

Four decisions are open (design plan §10); defaults are chosen so work can start now. The one that actually reshapes the design is **one dose per day vs. AM/PM split** — AM/PM doubles the pods and needs 28 sensors, so decide it before the parametric model is written.
