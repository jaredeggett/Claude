# Remotion public assets

Drop these files here before running `npm run build`. Remotion serves them via `staticFile(...)`.

Required:

- `voiceover-master.wav` — 48kHz, 24-bit, ~75s of dialogue with breathing room.
- `sora-01-press-final.mp4` — 4-second macro press shot.
- `sora-02-rotation-final.mp4` — 4-second rotating product hero (generate at 6s for trim flexibility).
- `sora-03-molty-final.mp4` — 1-second Molty wink.

Optional:

- `music-bed.wav` — instrumental warm acoustic loop. Uncomment the `<Audio>` line in `src/Composition.tsx` to mix it under the VO at 25% volume.
- `marker-sfx.wav`, `click.wav`, `ble-swoosh.wav`, `terminal-beep.wav` — SFX layer. Add as additional `<Audio>` tracks with appropriate `from` props to fire at the right frames.

Until these files are present, `npm run build` will fail with a missing-asset error from Remotion. The TypeScript compiles either way; you can preview the whiteboard layer with `npm start` and watching the studio.
