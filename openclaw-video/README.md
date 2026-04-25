# OpenClawButton Kickstarter Promo Video — Project Folder

Source spec: `../spec/OpenClawButtonWhiteboardVideoProduction.md`

Format: 90-second whiteboard animation with 3 Sora B-roll inserts.
Master 16:9, cutdowns 9:16 and 1:1.
Domain: openclawbutton.com.

## Folder map

```
openclaw-video/
├── scripts/                  Voiceover script + per-section reads
├── prompts/                  Sora prompts (one file per shot, with variants)
├── storyboard/               Shot-by-shot storyboard, captions SRT
├── checklists/               Pre-production, shoot-day, pre-flight
├── 01-source-footage/        Drop whiteboard masters + VO here
│   └── sora-b-roll/          Drop final Sora MP4s here
├── 02-project-files/         Resolve / Premiere project file
├── 03-final-deliverables/    Exported final cuts (master + cutdowns)
└── 04-archive/raw-takes/     Outtakes, alt takes, ghost footage
```

## Workflow

1. Pull brand assets per spec Section 3.1, drop into `01-source-footage/`.
2. Generate Sora B-roll using prompts in `prompts/`. Save finals to `01-source-footage/sora-b-roll/`.
3. Record VO using the script in `scripts/voiceover.md`. Save master WAV to `01-source-footage/voiceover-master.wav`.
4. Shoot whiteboard footage per `checklists/shoot-day.md`. Save to `01-source-footage/whiteboard-master-4k.mov`.
5. Assemble in Resolve / Premiere using the timeline structure in spec Section 7.3.
6. Run pre-flight checklist before publishing: `checklists/pre-flight.md`.

## Locked elements (do not rewrite without strong reason)

- Voiceover script (Section 4 of spec)
- Three Sora B-roll inserts (Section 6 of spec)
- Deadpan tone (Section 1.3)
- Lobster Red + Cream as the only accent colors
- Final close on absolute silence
