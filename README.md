# OpenClawButton Kickstarter Promo Video

Project scaffold for a 90-second whiteboard animation Kickstarter video for
OpenClawButton (openclawbutton.com).

## Layout

- `spec/` — canonical production specification (single source of truth)
- `openclaw-video/` — project working directory
  - `scripts/` — voiceover script
  - `prompts/` — Sora B-roll prompts (one file per shot)
  - `storyboard/` — shot-by-shot storyboard, captions SRT
  - `checklists/` — pre-production, shoot-day, pre-flight
  - `01-source-footage/` — drop whiteboard masters, VO, and Sora finals here
  - `02-project-files/` — Resolve / Premiere project files
  - `03-final-deliverables/` — exported master and cutdowns
  - `04-archive/raw-takes/` — outtakes
- `mockups/` — browser previews (open the HTML files locally)
  - `storyboard-frames.html` — 8 static key frames, one per section
  - `preview.html` — 90-second animated SVG playback (programmatic stand-in)
- `scripts/` — shell pipelines
  - `assemble.sh` — FFmpeg pipeline for master + 4 cutdowns
- `remotion/` — TypeScript Remotion project for a programmatic render

## Start here

1. Read `spec/OpenClawButtonWhiteboardVideoProduction.md` end to end.
2. Open `mockups/preview.html` in a browser to see a 90-second animated
   placeholder of the full timeline.
3. Walk through `openclaw-video/checklists/pre-production.md`.
4. Generate Sora B-roll using `openclaw-video/prompts/`.
5. Record VO using `openclaw-video/scripts/voiceover.md`.
6. Shoot whiteboard footage per `openclaw-video/checklists/shoot-day.md`.
7. Assemble: either run `scripts/assemble.sh` (FFmpeg pipeline) once you
   have raw inputs, or use the Remotion project under `remotion/` for a
   programmatic render.
8. Run `openclaw-video/checklists/pre-flight.md` before publishing.

## Locked elements

- Voiceover script (do not rewrite without strong reason)
- Three Sora B-roll inserts (non-negotiable, carry hardware credibility)
- Deadpan tone (never winks at the camera)
- Lobster Red + Cream as the only accent colors
- Final close on absolute silence
