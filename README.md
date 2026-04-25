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

## Start here

1. Read `spec/OpenClawButtonWhiteboardVideoProduction.md` end to end.
2. Walk through `openclaw-video/checklists/pre-production.md`.
3. Generate Sora B-roll using `openclaw-video/prompts/`.
4. Record VO using `openclaw-video/scripts/voiceover.md`.
5. Shoot whiteboard footage per `openclaw-video/checklists/shoot-day.md`.
6. Assemble in Resolve / Premiere using the storyboard.
7. Run `openclaw-video/checklists/pre-flight.md` before publishing.

## Locked elements

- Voiceover script (do not rewrite without strong reason)
- Three Sora B-roll inserts (non-negotiable, carry hardware credibility)
- Deadpan tone (never winks at the camera)
- Lobster Red + Cream as the only accent colors
- Final close on absolute silence
