# OpenClawButton Kickstarter Promo Video

## Full Production Specification: Whiteboard Animation Hybrid

**Project:** OpenClawButton Kickstarter Launch Video
**Format:** Whiteboard animation with cinematic Sora B-roll inserts
**Runtime:** 90 seconds
**Aspect Ratios:** 16:9 master (Kickstarter), 9:16 cutdown (Reels/TikTok), 1:1 cutdown (feed)
**Owner:** Jared Eggett / Egghead Labs
**Domain:** openclawbutton.com
**Status:** Production-ready spec, pending shoot

---

## 1. Creative Direction

### 1.1 Core Concept

A whiteboard animation tells the story of a developer who raised an AI lobster (OpenClaw) and gave it a physical button. The visible drawing hand carries warmth and authenticity. Strategic Sora-generated cinematic inserts cut in at three key moments to deliver hardware credibility (the press, the rotating product, the lobster character).

### 1.2 Why this works for OpenClawButton

The whiteboard aesthetic signals scrappy, open-source, engineer-built. It matches the brand voice already established at openclawbutton.com (the deadpan manifesto, the lobster mythology, the "Molty approves" tone). Kickstarter backers are drowning in venture-funded slick. A hand-drawn approach stops the scroll and reads as honest.

### 1.3 Tone

Deadpan. Slightly absurd. Never winks at the camera. The lobster bit lands precisely because the voiceover treats it as completely normal that you raised a coding lobster and it eats your finger presses. Think Wes Anderson narrating an instruction manual.

### 1.4 Visual System

| Element | Spec |
|---------|------|
| Whiteboard background | True white (#FFFFFF), no off-white drift |
| Primary line color | Black marker (#0A0A0A) |
| Accent color | Lobster Red (#C8102E or your exact brand red, pull from openclawbutton.com) |
| Cream accent | Cream (#F5EFE6) only when the actual button appears |
| Typography in marker | Hand-lettered, slightly imperfect, all caps for emphasis only |
| Drawing hand | Bare hand or sleeve cuff visible. No watch, no jewelry. Right-handed. |
| Marker | Sharpie Magnum or Mr. Sketch Scented (thicker line reads better on camera) |

### 1.5 Audio System

| Element | Spec |
|---------|------|
| Voiceover | Single male, dry, mid-30s to 40s, slight rasp. Reference: Donald Glover narration energy, not announcer energy. |
| Music | Minimal. Single warm acoustic loop or ambient pad. Drops out completely during the press moments. |
| SFX | Marker squeak (real, recorded on set), single satisfying button click, BLE swoosh, terminal beep, soft lobster chitter for Molty appearances. |
| Final close | Total silence after the last click. Two beats of nothing before logo card. |

---

## 2. Production Path Decision Tree

Three paths ranked by cost. Pick one before storyboarding.

### Path A: DIY Real Whiteboard Shoot ($0–$300)

**Equipment:** iPhone 14 Pro or better on tripod, ring light or two softboxes, 4×6 ft whiteboard, fresh Sharpies, a willing hand (yours).
**Software:** DaVinci Resolve (free) or Premiere Pro for assembly, Sora for B-roll, Audacity for VO recording.
**Time:** One Saturday for the whiteboard pass, one Sunday for assembly.
**Pros:** Maximum authenticity. Looks unfakeable. Lowest cost.
**Cons:** Requires you to do it. Mistakes mean re-shooting sections.

### Path B: Hybrid Procreate + Sora ($200–$500)

**Equipment:** iPad Pro with Apple Pencil, Procreate ($13).
**Software:** Procreate timelapse export, Sora for B-roll, Resolve or Premiere for assembly.
**Time:** 8–12 hours of drawing across a few evenings.
**Pros:** Total control. Endless undo. Can iterate.
**Cons:** Slightly less authentic than real whiteboard. Procreate timelapses can look digital if not graded carefully.

### Path C: Freelance Animator ($800–$2,500)

**Where:** Fiverr Pro, Upwork, Cara, r/HungryArtists. Search "hand-drawn whiteboard animation" not "VideoScribe."
**Brief:** This document, the script section below, openclawbutton.com link, and 3 reference videos (RSA Animate, Simon Sinek "Start With Why", Khan Academy explainer of your choice).
**Time:** 2–3 weeks turnaround.
**Pros:** You don't draw it.
**Cons:** Risk of generic VideoScribe-template output. Vet portfolios carefully.

**Recommended:** Path A for the main film. You have the workshop, the discipline, and a hands-on ethos. The result will be more authentic than any animator can fake.

---

## 3. Pre-Production Checklist

### 3.1 Brand Asset Pull

Before shooting anything, gather from openclawbutton.com:

- [ ] Exact hex codes for Lobster Red and Cream (inspect element on the live site)
- [ ] High-res button product photos (button-front-3q.png, button-front-angled.png, button-side-profile.png, button-top-down.png)
- [ ] The five-line Python snippet, copied exactly as it appears on the site
- [ ] Tier names and exact prices (Lobster Novice $19.99, Just the Claw $24.99, Lobster Keeper $59.99)
- [ ] The "100% Human Powered" tagline
- [ ] Manifesto copy for VO reference

### 3.2 Sora Asset Generation

Sora handles the cinematic B-roll. Three shots to generate before whiteboard day:

| Shot ID | Description | Sora Prompt | Length |
|---------|-------------|-------------|--------|
| SORA-01 | Macro button press | See section 6.1 | 4 seconds |
| SORA-02 | Rotating product hero | See section 6.2 | 6 seconds |
| SORA-03 | Molty character moment | See section 6.3 | 3 seconds |

Generate 3–5 variants of each, pick the strongest. Total Sora generation time: ~2 hours.

### 3.3 Voiceover

Record voiceover before shooting whiteboard footage. The hand timing needs to match the VO, not the other way around.

**Mic:** Shure SM7B, Rode NT1, or any decent USB mic in a closet with hanging clothes for sound dampening.
**Software:** Audacity (free) or whatever you have.
**Read style:** Slow. Pauses. Confidence in the absurdity. Re-read each line 3–4 times, pick the best.
**Deliverable:** One stereo WAV at 48kHz, full script, with 1-second silence between sections.

### 3.4 Whiteboard Shoot Setup

- [ ] Whiteboard cleaned with isopropyl alcohol (no ghost marks)
- [ ] Phone mounted directly above whiteboard, parallel to surface, locked tripod
- [ ] Two softboxes at 45-degree angles to eliminate glare and shadows
- [ ] Test footage shot to confirm no glare, sharp focus, and that the marker reads black (not blue-black)
- [ ] Frame composition: whiteboard fills 95% of vertical, with small margin for crop
- [ ] iPhone settings: 4K 60fps, ProRes if available, manual focus locked, manual exposure locked
- [ ] Reference monitor or second phone showing the shot frame so you know where you're drawing
- [ ] Pencil marks (faint, will erase digitally) for layout guides on the whiteboard before each section

---

## 4. The Script: Final Voiceover Copy

Total VO time: ~75 seconds spoken, ~15 seconds of breathing room and silence beats.

```
[00:00–00:10] COLD OPEN
"You raised a lobster.
A coding lobster.
You taught it everything."

[00:10–00:22] THE PROBLEM
"Every morning you walk to your keyboard
and type the same prompt.
Summarize my inbox.
Deploy the code.
Run the script.
Twelve times a day. Every day. Forever."

[00:22–00:38] THE SOLUTION
"OpenClawButton.
One button. No batteries.
You press it. Your finger powers it.
A wireless signal flies.
Your lobster wakes up and goes to work."

[00:38–00:52] HOW IT WORKS
"Press. Harvest. Broadcast. Run.
The same kinetic mechanism that's been in commercial light switches for twenty years.
Now it talks to your AI agent."

[00:52–01:08] USE CASES
"Stick one on your nightstand.
One on your monitor.
One by the door.
Every press feeds the lobster a different skill."

[01:08–01:20] THE OPEN PART
"Open source SDK.
Published BLE spec.
Five lines of Python.
Hack it. Fork it.
Build whatever your lobster wants."

[01:20–01:28] THE ASK
"Live on Kickstarter.
First hundred backers feed at $19.99."

[01:28–01:30] CLOSE
[silence]
"Feed your lobster."
[click]
[silence]
```

---

## 5. Shot-by-Shot Storyboard

Each shot is timed to the second. The hand drawing speed should match. Practice the drawings 2–3 times before final take, so you know the pace.

### Section 1: Cold Open (0:00 to 0:10)

| Time | Visual | Audio |
|------|--------|-------|
| 0:00–0:02 | White screen. Hand enters from right with marker. | Marker uncap sound. |
| 0:02–0:06 | Hand draws a simple lobster outline (body, two claws, tail, antennae) in continuous strokes. About 10 strokes total. | "You raised a lobster." |
| 0:06–0:08 | Hand draws two dot eyes. Eyes blink (cut animation: eyes drawn open, quick erase, eyes drawn closed, quick erase, back to open). | "A coding lobster." |
| 0:08–0:10 | Hand draws a thought bubble above lobster, writes "hungry" in cursive inside. | "You taught it everything." |

**Drawing notes:** Keep the lobster simple. No shading. Think "5-year-old's drawing of a lobster but slightly competent." Do not draw realistic anatomy.

### Section 2: The Problem (0:10 to 0:22)

| Time | Visual | Audio |
|------|--------|-------|
| 0:10–0:12 | Hand wipes screen with quick swipe motion (digital wipe transition). New blank space. Hand draws a stick figure at a desk with a laptop. Quick: head, body, arms, legs, desk line, laptop rectangle. | "Every morning you walk to your keyboard" |
| 0:12–0:14 | Hand draws an arrow from stick figure to laptop, then a curved arrow back. | "and type the same prompt." |
| 0:14–0:16 | Hand writes "Summarize my inbox" inside a speech bubble from the figure. | "Summarize my inbox." |
| 0:16–0:17 | Hand crosses out the bubble, writes "Deploy the code" beside it. | "Deploy the code." |
| 0:17–0:18 | Hand crosses that out, writes "Run the script." | "Run the script." |
| 0:18–0:22 | Hand draws a thick scribbled circular loop around the whole scene, repetition made visible. Stick figure looks tired (add small slouch line, downturned mouth). The lobster from earlier appears in the corner, taps a claw on the ground. | "Twelve times a day. Every day. Forever." |

**Drawing notes:** The scribbled loop should look slightly aggressive. Communicates frustration without dialogue.

### Section 3: The Solution (0:22 to 0:38)

**[INSERT SORA-01, MACRO BUTTON PRESS, 0:24 to 0:28, 4 SECONDS]**

| Time | Visual | Audio |
|------|--------|-------|
| 0:22–0:24 | Hand wipes screen. Hand draws a circle, center frame, large. Adds depth lines to make it 3D. Labels above in marker: "OPENCLAWBUTTON". | "OpenClawButton." |
| 0:24–0:28 | **CUT TO SORA-01.** Cinematic macro shot of real button being pressed in slow motion. Cream button on a wood desk, finger descends, press, subtle bloom of light. | "One button. No batteries." |
| 0:28–0:32 | Cut back to whiteboard. Hand draws a finger pressing the circle button. Adds energy squiggle lines around the press point. | "You press it. Your finger powers it." |
| 0:32–0:35 | Hand draws three concentric arcs radiating from the button. This is the wireless signal. Each arc bigger than the last. | "A wireless signal flies." |
| 0:35–0:38 | Hand draws the lobster on the right side of frame. Lobster opens its mouth and the wireless arcs fly into it. Lobster grins. Hand writes in red marker beside it: "100% HUMAN POWERED". | "Your lobster wakes up and goes to work." |

**Drawing notes:** The transition from whiteboard to Sora should feel like the camera "zooms into" the drawing. Edit trick: end the whiteboard shot on a quick push-in zoom on the drawn button, then cut to the Sora macro shot. Cut back from Sora with a matched zoom-out.

### Section 4: How It Works (0:38 to 0:52)

| Time | Visual | Audio |
|------|--------|-------|
| 0:38–0:40 | Hand wipes. Hand draws a horizontal line dividing the bottom third. Labels four columns above the line: 1, 2, 3, 4. | (beat) |
| 0:40–0:43 | Column 1: Hand draws a finger pressing button. Writes "PRESS" beneath. Writes "0.0003 watts" in small text. | "Press." |
| 0:43–0:46 | Column 2: Hand draws a button cross-section (circle with a coil inside, lightning bolt). Writes "HARVEST" beneath. | "Harvest." |
| 0:46–0:49 | Column 3: Hand draws a button with three radiating arcs. Writes "BROADCAST" beneath. Writes "~30m" in small text. | "Broadcast." |
| 0:49–0:52 | Column 4: Hand draws a small lobster at a tiny laptop. Writes "RUN" beneath. Writes "claw.run()" in small text. | "Run." |
| (0:52 cont.) | Hand draws a quick connecting arrow flowing from 1 to 4 across the bottom. | "The same kinetic mechanism that's been in commercial light switches for twenty years. Now it talks to your AI agent." |

**Drawing notes:** Speed up this section in post by 1.2x if needed. Four panels feels long if drawn at full speed. The VO line covers the connector arrow drawing time.

### Section 5: Use Cases (0:52 to 1:08)

| Time | Visual | Audio |
|------|--------|-------|
| 0:52–0:55 | Hand wipes. Hand draws a quick architectural cross-section of a 5-room house. Roof, base line, vertical dividers. Five rooms left to right: bedroom, office, entryway, workshop, kitchen. | "Stick one on your nightstand." |
| 0:55–0:58 | Hand drops a small button drawing in the bedroom. Writes "morning_briefing" beside it. Adds a small coffee cup doodle. | (continued) |
| 0:58–1:01 | Hand drops a button in the office. Writes "deploy_staging." Adds a small rocket doodle. | "One on your monitor." |
| 1:01–1:03 | Hand drops a button in the entryway. Writes "going_home." Adds a small lock doodle. | "One by the door." |
| 1:03–1:05 | Hand drops a button in the workshop. Writes "focus_90." Adds a "DND" sign doodle. | (continued) |
| 1:05–1:08 | Hand drops a button in the kitchen. Writes "scene_movie." Adds a popcorn doodle. The Molty lobster appears at the top of the house, eating a wireless arc. | "Every press feeds the lobster a different skill." |

**Drawing notes:** Keep the house line work loose. This is not architectural drafting. Skill names should be in the same hand-lettered marker style as everything else.

### Section 6: The Open Part (1:08 to 1:20)

| Time | Visual | Audio |
|------|--------|-------|
| 1:08–1:10 | Hand wipes. Hand draws the GitHub octocat (simplified, with a circle head with cat ears and tentacles). Beneath, hand writes "MIT LICENSE" in red marker, underlined. | "Open source SDK. Published BLE spec." |
| 1:10–1:18 | Hand draws the five-line Python snippet, character by character, in marker handwriting: <br>`from openclawbutton import Button` <br>`button = Button()` <br>`@button.on_press` <br>`def feed(e):` <br>`    claw.run("anything")` | "Five lines of Python." (pause) "Hack it. Fork it." |
| 1:18–1:20 | Hand draws a small lobster beside the code, eating a `()` parenthesis. | "Build whatever your lobster wants." |

**Drawing notes:** The Python writing is the slowest part of the video by design. It earns the credibility. Don't speed this section up. The viewer needs to feel the simplicity by reading along.

### Section 7: The Ask (1:20 to 1:28)

**[INSERT SORA-02, ROTATING PRODUCT HERO, 1:22 to 1:26, 4 SECONDS]**

| Time | Visual | Audio |
|------|--------|-------|
| 1:20–1:22 | Hand wipes. Hand draws three rectangles side by side, fast. Top of each: tier name. Inside: price. | "Live on Kickstarter." |
| 1:22–1:26 | **CUT TO SORA-02.** Cinematic rotating product hero shot of the actual button on cream background. Slow rotation, key light catching the surface texture. | (music swells slightly, no VO) |
| 1:26–1:28 | Cut back to whiteboard. The three tier rectangles fill in: <br>"NOVICE, $19.99" (with "100 ONLY" written beside it, circled in red) <br>"JUST THE CLAW, $24.99" <br>"KEEPER, $59.99" (with a tiny lobster crown above it). Hand draws a big arrow pointing at NOVICE, writes "START HERE" in red. | "First hundred backers feed at $19.99." |

**Drawing notes:** The Sora insert is the credibility shot. Backers need to *see* the product is real. This is non-negotiable.

### Section 8: Close (1:28 to 1:30)

**[INSERT SORA-03, MOLTY MOMENT, 1:28 to 1:29, 1 SECOND]**

| Time | Visual | Audio |
|------|--------|-------|
| 1:28–1:29 | **CUT TO SORA-03.** Tight shot of Molty (illustrated 2D character matched to the whiteboard lobster style, but rendered) winking. Held for 1 second. | (silence) |
| 1:29–1:30 | Cut to whiteboard. Hand draws the button, then a finger pressing it. Beneath, writes: "FEED YOUR LOBSTER." On next line: "openclawbutton.com" Tiny lobster signature in corner. | "Feed your lobster." [click] [silence] |

**Drawing notes:** End on absolute silence after the click. Two full beats. Then logo card fade. Resist the urge to add closing music.

---

## 6. Sora B-Roll Generation Prompts

Three Sora generations, each 3–6 seconds. Generate 3–5 variants per shot, pick the strongest.

### 6.1 SORA-01: Macro Button Press

**Prompt:**

```
Cinematic macro shot, 240fps slow motion, of a single matte cream-white circular wireless button being pressed by an adult finger. The button is approximately 60mm diameter, sits on a warm wood desk surface, lit from a soft window light at 45 degrees. The finger descends from upper frame, presses the button with a subtle compression and bounce-back, releases. As the press happens, a barely-visible bloom of warm light flares from the button edge for a single frame. Background is shallow depth of field, slightly blurred wood grain. No text, no logos, no other objects in frame. Color palette: cream, soft warm whites, subtle wood tones. Photorealistic, hyperreal, advertising quality. Single continuous shot, no cuts. 4 seconds.
```

**Variants to try:**
- Same shot but on a clean white desk instead of wood
- Same shot but with a black coffee mug slightly out of focus in the corner
- Same shot but lit cooler (morning blue light instead of warm)

### 6.2 SORA-02: Rotating Product Hero

**Prompt:**

```
Cinematic product hero shot of a single matte cream-white circular wireless button, approximately 60mm diameter, 16mm thick, with a subtle inset rocker face and beveled edges. The button rotates slowly on its vertical axis on a seamless cream-colored backdrop. Lit from one key light at 30 degrees and a softer fill from the opposite side, with a gentle rim light catching the top edge. The button completes one full slow rotation over 6 seconds. No text, no logos visible, no shadows on the backdrop. Color palette: cream, warm whites, subtle gold highlights from the key light. Photorealistic, advertising quality, like an Apple product hero. 6 seconds.
```

**Variants to try:**
- Same shot but with the button on a polished black surface (more dramatic)
- Same shot but with the button slowly tumbling end-over-end instead of rotating
- Same shot but with three buttons in a triangular arrangement, all rotating together

### 6.3 SORA-03: Molty Moment

**Prompt:**

```
2D animated character shot of "Molty" the lobster, hand-drawn whiteboard illustration style. Molty is a friendly cartoon lobster with simple black ink line work, two black dot eyes, two front claws. He sits centered in frame on a plain white background. Over 1 second, Molty's left eye closes in a slow deliberate wink, then opens again. The line work is loose, hand-drawn, slightly imperfect, matching the aesthetic of RSA Animate or a real whiteboard sketch. Marker-style black lines on pure white. No color except the linework, no shading, no gradients. 1 second, smooth animation, ends with both eyes open.
```

**Variants to try:**
- Same shot but Molty raises one claw in a small wave instead of winking
- Same shot but Molty does a single antenna twitch
- Same shot but Molty's eyes flick to the right and back (knowing glance)

**Important:** If Sora struggles to match the whiteboard line style, draw Molty's wink as a 6-frame loop yourself in Procreate and skip Sora for this shot.

---

## 7. Post-Production Workflow

### 7.1 Editing Software

DaVinci Resolve (free) is more than capable. Premiere works too. Final Cut works too. Whatever you already know.

### 7.2 Project Settings

| Setting | Value |
|---------|-------|
| Resolution | 3840×2160 (4K UHD) |
| Frame rate | 30fps (60fps for whiteboard footage, conformed down) |
| Color space | Rec. 709 |
| Audio | 48kHz, 24-bit |

### 7.3 Edit Timeline Structure

Build the timeline in this layer order from bottom to top:

1. **V1:** Master whiteboard footage (sped up 8–12x where appropriate)
2. **V2:** Sora B-roll inserts (cut in at the three marked timecodes)
3. **V3:** Text overlays and lower thirds (use only where the marker can't carry the message)
4. **V4:** Adjustment layer for color grading

5. **A1:** Voiceover (anchor track, everything else times to this)
6. **A2:** Marker squeak SFX, click SFX, BLE swoosh, terminal beep
7. **A3:** Music bed (very low, ducks under VO)
8. **A4:** Ambient/room tone

### 7.4 Speeding Up the Whiteboard Footage

Real-time hand-drawing is too slow for video. Ratio guide:

| Drawing complexity | Speed factor |
|--------------------|--------------|
| Simple line drawings (lobster outline, stick figure) | 4x to 6x |
| Medium drawings (house cross-section, button + signal) | 6x to 10x |
| Complex drawings (Python snippet, four-panel breakdown) | 10x to 14x |
| Wipes and swipes | Real time, no speedup |

Cut speed changes on syllable boundaries in the VO so the hand "lands" each new word.

### 7.5 Color Grading

Whiteboard footage often comes out slightly blue or yellow. Pull it to neutral white in the grade:

- Lift whites until the whiteboard reads as true #FFFFFF without clipping
- Pull blacks until the marker reads as solid #0A0A0A
- Boost saturation +5 to +10 only on red marker accents (without affecting black)
- Optional: subtle vignette at 10% opacity to focus the eye on center

### 7.6 Sound Design Pass

After the picture lock:

1. Add real marker squeak SFX synced to each drawing motion (record this on set with a separate audio recorder; pulled from Foley libraries it sounds wrong)
2. Add the single click SFX at every "press" moment in the visuals
3. Add BLE swoosh SFX (a soft electronic blip) when wireless arcs animate
4. Add a single terminal beep when "claw.run()" appears or the lobster activates
5. Music: pick something instrumental, warm, acoustic. No vocals. No big drops. Consider "Acoustic Cafe" from Artlist or something similar. Duck it -12dB under any VO.
6. Final close: drop music to silence at 1:28. Two beats of room tone only. Click. Two more beats of silence. Logo fade.

### 7.7 Captions

Burn in captions for the entire video. 85% of social viewers watch muted.

- **Font:** Inter Bold or Helvetica Bold, white text, black outline at 4px
- **Position:** Lower third, with 80px margin from bottom edge
- **Size:** Large enough to read on a phone (about 6% of vertical resolution)
- **Style:** Match the deadpan tone. No animations, no bouncing, no color changes. Just clean, readable, on-screen.

---

## 8. Cutdown Versions

After the master 90-second version is locked, produce three cutdowns for distribution.

### 8.1 60-Second Kickstarter Pre-Roll

Cut: Remove Section 4 (How It Works panels) entirely. Compress Section 5 (Use Cases) from 5 rooms to 3 rooms. Trim VO accordingly. Use this version on the Kickstarter campaign page itself.

### 8.2 30-Second Meta/TikTok Ad

Cut: Cold open (5s) → solution reveal with Sora press shot (10s) → product hero with tiers (10s) → ask + close (5s). Reformatted to 9:16 vertical. Captions enlarged for mobile.

### 8.3 15-Second Pre-Launch Teaser

Even tighter. Just the lobster drawing, the button drop-in, one press, one terminal beep, "openclawbutton.com, Live on Kickstarter [DATE]." For Twitter/X and TikTok teasers in the 2 weeks before launch.

---

## 9. File Naming and Delivery

Final delivery structure for the project folder:

```
/openclaw-video/
├── /01-source-footage/
│   ├── whiteboard-master-4k.mov
│   ├── voiceover-master.wav
│   └── /sora-b-roll/
│       ├── sora-01-press-final.mp4
│       ├── sora-02-rotation-final.mp4
│       └── sora-03-molty-final.mp4
├── /02-project-files/
│   └── openclaw-promo.drp (or .prproj)
├── /03-final-deliverables/
│   ├── openclaw-promo-90s-master-4k.mp4
│   ├── openclaw-promo-90s-1080p.mp4
│   ├── openclaw-promo-60s-kickstarter.mp4
│   ├── openclaw-promo-30s-vertical.mp4
│   ├── openclaw-promo-30s-square.mp4
│   └── openclaw-promo-15s-teaser.mp4
└── /04-archive/
    └── /raw-takes/
```

Codec: H.264, MP4 container, ~20Mbps for 4K, ~10Mbps for 1080p. Two-pass encode for the final master.

---

## 10. Distribution and Launch Plan

### 10.1 Pre-Launch (Weeks Before Kickstarter Goes Live)

- 15-second teaser on Twitter/X, LinkedIn, TikTok, Reddit (r/openclaw, r/homeassistant, r/raspberry_pi, r/embedded)
- Drop the 90-second master on the openclawbutton.com landing page (replacing the current `button-press.mp4` in the live footage section)
- Email blast to launch list with embedded video

### 10.2 Launch Day

- 90-second master on the Kickstarter campaign page hero slot
- 60-second cutdown for the campaign updates feed
- 30-second vertical for paid Meta and TikTok pre-launch funnels
- Post the master on YouTube with chapter timestamps matching the storyboard sections

### 10.3 During Campaign

- Re-cut shorter clips from the master for daily Kickstarter updates
- Use SORA-02 (rotating product) as a looping background on the campaign page
- Pull voiceover-only audio for an audiogram clip

---

## 11. Risk Register

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Whiteboard glare on camera | Medium | Two softboxes at 45 degrees, polarizing filter on phone, test footage before final shoot |
| Sora outputs don't match brand colors | High | Generate 5+ variants per shot, color-correct in post to match cream and red exactly |
| Hand shakes visible at 8x speed | Medium | Brace forearm against whiteboard edge while drawing, shoot multiple takes |
| Voiceover sounds amateurish | Medium | Hire a Fiverr VO actor for $50–$150 if your own recording doesn't land. Brief them with the deadpan reference. |
| Markers run dry mid-take | Low but ruinous | Have 6 fresh Sharpies on set. Test each one before each take. |
| Backers don't believe the product is real (whiteboard-only risk) | High | Mandatory: keep all three Sora B-roll inserts. The macro press shot at 0:24 is the credibility moment that sells the hardware. |

---

## 12. Final Pre-Flight Checklist

Before you hit publish on Kickstarter:

- [ ] Master 90-second video color-graded and audio-mixed
- [ ] Captions burned in and proofread (no "lobsters" misspelled as "lobsters")
- [ ] Three cutdowns exported in correct aspect ratios
- [ ] Video uploaded to Kickstarter and tested on mobile and desktop
- [ ] Embedded version on openclawbutton.com replacing the placeholder demo
- [ ] Backup copies of all source files in cold storage (Google Drive Cowork drive)
- [ ] Final spell check of every on-screen text element
- [ ] One trusted person watches it cold and gives an honest "do I want to back this" verdict
- [ ] The cream button color matches between Sora shots and the actual product photos on the site

---

## 13. Asset Pull from Existing Project History

Before generating any new assets, pull from work already done. The OpenClawButton project has substantial history across Cowork, Claude Code, the local hard drive, and prior chat sessions. Reuse before regenerating.

### 13.1 Cowork Drive (Claude-Cowork-Code-Drive)

Check the Google Drive Shared Drive `Claude-Cowork-Code-Drive` for:

- [ ] Existing OpenClawButton brand assets (logos, button photos, color swatches)
- [ ] Prior marketing copy drafts and Kickstarter campaign plan documents
- [ ] BLE protocol spec drafts and SDK documentation
- [ ] Any prior video, motion, or animation experiments
- [ ] The about-me.md, voice-and-style.md context files for tone reference
- [ ] CLAUDE.md operating instructions for Cowork session continuity

Workflow: drop a request in the Cowork inbox folder asking Claude to inventory all OpenClawButton-related files in the drive and produce a manifest before video production starts.

### 13.2 Claude Code Local History

The Mac running Claude Code has session history that may include:

- [ ] Prior animation script drafts and storyboard iterations
- [ ] Sora prompt experiments (text-me-button project has a 15-use-case Sora system that may have transferable prompt structures)
- [ ] BLE packet capture work and protocol decoding (useful for the technical accuracy of the "BROADCAST" panel)
- [ ] The 5-line Python snippet variations from SDK development
- [ ] Any prior whiteboard or animation references gathered during research

Workflow: search local Claude Code history for `openclawbutton`, `openclaw`, `kickstarter`, `lobster`, and `molty` keywords. Pull anything relevant into the project folder.

### 13.3 Raspberry Pi (openclaw-pi) Plans Repo

The `jaredeggett/openclaw-plans` GitHub repo has execution plans previously pushed for Pi-side work. Worth scanning for:

- [ ] Any visual reference materials gathered during BLE packet capture work
- [ ] Photos of the prototype hardware in development environments (potential B-roll source)
- [ ] Logs or screenshots showing real terminal output from `claw.run()` calls (use these for the SORA-03 alternative if Molty rendering fails)

### 13.4 Local Hard Drive

Likely locations to check on the Mac:

- [ ] `~/Documents/OpenClaw*` and `~/Projects/OpenClaw*` for project files
- [ ] `~/Downloads` for any Sora generations, stock footage, or reference videos pulled during research
- [ ] `~/Pictures` and Photos library for any prototype hardware photos shot during development
- [ ] iMovie, Final Cut, or DaVinci Resolve project libraries for any prior video work
- [ ] iCloud Drive for cross-device assets

### 13.5 Conversation Search

Prior Claude conversations may contain refined drafts of:

- [ ] The 90-second script (earlier turns of this thread had a live-action version and animation version that may have phrasing worth preserving)
- [ ] The TextMeButton Sora video production system (15 use cases, split-scene format, strict product description rules), directly transferable patterns
- [ ] LinkedIn AI hallucination content that may inform the deadpan tone calibration
- [ ] OpenClawButton domain research, unit economics, and Kickstarter vs BackerKit analysis

Workflow: run `conversation_search` on terms like `openclawbutton`, `whiteboard animation`, `kickstarter video`, `sora prompt`, `lobster mascot` before generating new content.

### 13.6 Asset Reuse Priority

When the same asset exists in multiple places, priority order:

1. Cowork drive (canonical, version-controlled)
2. Live openclawbutton.com (production-deployed, definitive product photos and copy)
3. Local hard drive (working copies, may be more recent than Cowork)
4. Claude Code session history (drafts and iterations)
5. Conversation search (oldest, use only as a fallback)

---

## 14. Notes for Cowork or Future Claude

This document is the single source of truth for the OpenClawButton promo video production. If you're picking this up later (Cowork, Claude Code, another iteration), the priority order is:

1. The script in Section 4 is locked. Do not rewrite without strong reason.
2. The three Sora B-roll inserts in Section 6 are non-negotiable. They carry hardware credibility that whiteboard alone cannot.
3. The deadpan tone in Section 1.3 is the brand. If a draft starts feeling earnest or hype-y, it's wrong.
4. Lobster Red and Cream are the only accent colors. Do not introduce new colors.
5. End on silence. Always.
6. Always inventory existing assets per Section 13 before generating new ones. Reuse before regenerating.

```
🦞
```
