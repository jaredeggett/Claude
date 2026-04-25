# OpenClawButton — Remotion render

Programmatic 90-second render of the Kickstarter promo. The whiteboard
strokes are drawn programmatically as a stand-in for real hand-shot
footage. Sora B-roll inserts and the voiceover are loaded as static assets
at render time.

This project is **not a substitute** for the real shoot. It exists so you
can preview the full timeline, validate timing against the locked VO, and
generate placeholders for design / sponsor / Kickstarter early-bird
previews while the real footage is being captured.

## Install

```bash
cd remotion
npm install
```

## Drop in source assets

Per `public/README.md`, copy these into `public/`:

- `voiceover-master.wav`
- `sora-01-press-final.mp4`
- `sora-02-rotation-final.mp4`
- `sora-03-molty-final.mp4`

## Run

```bash
# Preview in the Remotion studio (live editor on http://localhost:3000)
npm start

# Render the 4K master MP4
npm run build

# Render a 1080p version
npm run build:1080

# Export a still frame (handy for thumbnails)
npm run still
```

Outputs land in `out/`.

## Project layout

```
remotion/
├── src/
│   ├── index.ts              # registerRoot
│   ├── Root.tsx              # composition definition (90s @ 30fps, 4K)
│   ├── Composition.tsx       # section sequencing + Sora overlays + audio
│   ├── components/
│   │   ├── Whiteboard.tsx    # white background + SVG viewBox
│   │   ├── MarkerStroke.tsx  # stroke-dasharray draw-on for SVG paths
│   │   ├── MarkerText.tsx    # character-by-character marker writing
│   │   └── Captions.tsx      # burned-in captions matching the VO
│   └── sections/
│       ├── Section1Cold.tsx
│       ├── Section2Problem.tsx
│       ├── Section3Solution.tsx     # SORA-01 overlays this section
│       ├── Section4HowItWorks.tsx
│       ├── Section5UseCases.tsx
│       ├── Section6Open.tsx
│       ├── Section7Ask.tsx           # SORA-02 overlays this section
│       └── Section8Close.tsx         # SORA-03 overlays this section
├── public/                    # static assets (VO, Sora MP4s, optional music)
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Tuning

Each section component takes timing in seconds via the local `f(s)` helper.
If your VO read is faster or slower than the spec, adjust the `startFrame`
and `durationFrames` values per stroke / text in the relevant section file.

The `pathLength` prop on `<MarkerStroke>` controls how the dasharray mask
animates. Long curved paths need a higher value (3000–9000); short straight
strokes are fine at the 2000 default.

## Limitations vs. real whiteboard

- No drawing-hand visible (programmatic mask, not a real Sharpie).
- Strokes are mathematically perfect, not slightly wobbly. Looks more
  Khan-Academy than RSA-Animate.
- No real marker squeak SFX. Mix those in via `scripts/assemble.sh` after
  rendering, or layer them as additional `<Audio>` tracks here.

When the real shoot is done, swap in the captured whiteboard footage and
keep this project as a backup / fallback / pitch artifact.
