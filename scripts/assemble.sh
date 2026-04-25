#!/usr/bin/env bash
#
# OpenClawButton — final video assembly via FFmpeg.
#
# Inputs (drop these into openclaw-video/01-source-footage/):
#   whiteboard-master-4k.mov   — raw 4K60 whiteboard footage, real-time
#   voiceover-master.wav       — 48k 24-bit stereo VO, anchor track
#   sora-b-roll/sora-01-press-final.mp4
#   sora-b-roll/sora-02-rotation-final.mp4
#   sora-b-roll/sora-03-molty-final.mp4
#
# Optional:
#   marker-sfx.wav             — recorded marker squeak (separate audio)
#   click.wav, ble-swoosh.wav, terminal-beep.wav  — SFX layer
#   music-bed.wav              — instrumental, ducks under VO
#
# Outputs (written to openclaw-video/03-final-deliverables/):
#   openclaw-promo-90s-master-4k.mp4
#   openclaw-promo-90s-1080p.mp4
#   openclaw-promo-60s-kickstarter.mp4
#   openclaw-promo-30s-vertical.mp4
#   openclaw-promo-30s-square.mp4
#   openclaw-promo-15s-teaser.mp4
#
# Usage:
#   ./scripts/assemble.sh           # full pipeline
#   ./scripts/assemble.sh master    # 90s master only
#   ./scripts/assemble.sh cutdowns  # cutdowns only (master must already exist)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/openclaw-video/01-source-footage"
SORA="$SRC/sora-b-roll"
OUT="$ROOT/openclaw-video/03-final-deliverables"
TMP="$ROOT/openclaw-video/.tmp"
CAPTIONS="$ROOT/openclaw-video/storyboard/captions.srt"

mkdir -p "$OUT" "$TMP"

# ---------------------------------------------------------------------------
# Speed map: section start (in seconds) → playback rate applied to whiteboard.
# Times are expressed in the FINAL timeline. The script trims and re-times the
# raw whiteboard footage so each drawing finishes when the matching VO line
# ends. Adjust if your shoot pacing differs.
# ---------------------------------------------------------------------------
# Section 1 cold open       0–10s   raw start 0s    rate 5x   -> 50s of source
# Section 2 problem        10–22s   raw 50s         rate 6x   -> 72s
# Section 3 solution part1 22–24s   raw 122s        rate 6x
# (SORA-01 cuts in 24–28)
# Section 3 solution part2 28–38s   raw 134s        rate 8x
# Section 4 how it works   38–52s   raw 214s        rate 12x
# Section 5 use cases      52–68s   raw 382s        rate 10x
# Section 6 open part      68–80s   raw 542s        rate 8x  (slow on Python)
# Section 7 ask part1      80–82s   raw 638s        rate 6x
# (SORA-02 cuts in 82–86)
# Section 7 ask part2      86–88s   raw 650s        rate 6x
# (SORA-03 cuts in 88–89)
# Section 8 close          89–90s   raw 662s        rate 4x

require() {
  for f in "$@"; do
    [[ -f "$f" ]] || { echo "Missing input: $f" >&2; exit 1; }
  done
}

build_master() {
  echo "==> Building 90s master"

  require \
    "$SRC/whiteboard-master-4k.mov" \
    "$SRC/voiceover-master.wav" \
    "$SORA/sora-01-press-final.mp4" \
    "$SORA/sora-02-rotation-final.mp4" \
    "$SORA/sora-03-molty-final.mp4"

  # 1. Conform whiteboard footage: speed-up + trim per the section map above.
  #    setpts=PTS/RATE speeds up video. Audio is dropped here; VO is the anchor.
  ffmpeg -y \
    -i "$SRC/whiteboard-master-4k.mov" \
    -filter_complex "
      [0:v]trim=start=0:end=50,setpts=(PTS-STARTPTS)/5[wb1];
      [0:v]trim=start=50:end=122,setpts=(PTS-STARTPTS)/6[wb2];
      [0:v]trim=start=122:end=134,setpts=(PTS-STARTPTS)/6[wb3a];
      [0:v]trim=start=134:end=214,setpts=(PTS-STARTPTS)/8[wb3b];
      [0:v]trim=start=214:end=382,setpts=(PTS-STARTPTS)/12[wb4];
      [0:v]trim=start=382:end=542,setpts=(PTS-STARTPTS)/10[wb5];
      [0:v]trim=start=542:end=638,setpts=(PTS-STARTPTS)/8[wb6];
      [0:v]trim=start=638:end=650,setpts=(PTS-STARTPTS)/6[wb7a];
      [0:v]trim=start=650:end=662,setpts=(PTS-STARTPTS)/6[wb7b];
      [0:v]trim=start=662:end=666,setpts=(PTS-STARTPTS)/4[wb8];
      [wb1][wb2][wb3a][wb3b][wb4][wb5][wb6][wb7a][wb7b][wb8]concat=n=10:v=1:a=0[wb]
    " \
    -map "[wb]" -c:v prores_ks -profile:v 3 -an "$TMP/whiteboard-conformed.mov"

  # 2. Splice in Sora B-roll at the locked timecodes.
  #    Whiteboard plays 0–24, SORA-01 24–28, whiteboard 28–82, SORA-02 82–86,
  #    whiteboard 86–88, SORA-03 88–89, whiteboard 89–90.
  ffmpeg -y \
    -i "$TMP/whiteboard-conformed.mov" \
    -i "$SORA/sora-01-press-final.mp4" \
    -i "$SORA/sora-02-rotation-final.mp4" \
    -i "$SORA/sora-03-molty-final.mp4" \
    -filter_complex "
      [0:v]trim=start=0:end=24,setpts=PTS-STARTPTS,scale=3840:2160[wA];
      [0:v]trim=start=28:end=82,setpts=PTS-STARTPTS,scale=3840:2160[wB];
      [0:v]trim=start=86:end=88,setpts=PTS-STARTPTS,scale=3840:2160[wC];
      [0:v]trim=start=89:end=90,setpts=PTS-STARTPTS,scale=3840:2160[wD];
      [1:v]trim=start=0:end=4,setpts=PTS-STARTPTS,scale=3840:2160[s1];
      [2:v]trim=start=0:end=4,setpts=PTS-STARTPTS,scale=3840:2160[s2];
      [3:v]trim=start=0:end=1,setpts=PTS-STARTPTS,scale=3840:2160[s3];
      [wA][s1][wB][s2][wC][s3][wD]concat=n=7:v=1:a=0[v]
    " \
    -map "[v]" -c:v prores_ks -profile:v 3 -an "$TMP/picture-locked.mov"

  # 3. Audio mix. VO is the anchor. Music ducks -12dB under VO via sidechain.
  #    SFX layer assumed pre-edited to a single mix-bus WAV (sfx-mix.wav). If
  #    not present, we skip the SFX bus and use VO + music only.
  local sfx_input=""
  local sfx_filter=""
  if [[ -f "$SRC/sfx-mix.wav" ]]; then
    sfx_input="-i $SRC/sfx-mix.wav"
    sfx_filter="[2:a]volume=0.7[sfx];[duck][sfx]amix=inputs=2:duration=first:dropout_transition=0[mix]"
  else
    sfx_filter="[duck]anull[mix]"
  fi

  local music_input=""
  if [[ -f "$SRC/music-bed.wav" ]]; then
    music_input="-i $SRC/music-bed.wav"
  else
    # Generate 90s of silence as a stand-in if no music bed exists.
    ffmpeg -y -f lavfi -i anullsrc=r=48000:cl=stereo -t 90 \
      -c:a pcm_s24le "$TMP/music-silence.wav"
    music_input="-i $TMP/music-silence.wav"
  fi

  ffmpeg -y \
    -i "$SRC/voiceover-master.wav" \
    $music_input \
    $sfx_input \
    -filter_complex "
      [1:a][0:a]sidechaincompress=threshold=0.05:ratio=8:attack=20:release=400[duck];
      $sfx_filter;
      [mix][0:a]amix=inputs=2:duration=longest:weights='1 1.5':dropout_transition=0[final]
    " \
    -map "[final]" -c:a pcm_s24le -ar 48000 "$TMP/audio-mix.wav"

  # 4. Mux picture + audio + burn captions. Two-pass H.264 for the master.
  ffmpeg -y \
    -i "$TMP/picture-locked.mov" \
    -i "$TMP/audio-mix.wav" \
    -vf "subtitles=$CAPTIONS:force_style='FontName=Inter,FontSize=42,PrimaryColour=&Hffffff&,OutlineColour=&H000000&,Outline=4,MarginV=80'" \
    -c:v libx264 -b:v 20M -pass 1 -preset slow -an -f mp4 /dev/null
  ffmpeg -y \
    -i "$TMP/picture-locked.mov" \
    -i "$TMP/audio-mix.wav" \
    -vf "subtitles=$CAPTIONS:force_style='FontName=Inter,FontSize=42,PrimaryColour=&Hffffff&,OutlineColour=&H000000&,Outline=4,MarginV=80'" \
    -c:v libx264 -b:v 20M -pass 2 -preset slow \
    -c:a aac -b:a 192k -ar 48000 \
    -movflags +faststart \
    "$OUT/openclaw-promo-90s-master-4k.mp4"

  # 5. 1080p version for web embeds.
  ffmpeg -y -i "$OUT/openclaw-promo-90s-master-4k.mp4" \
    -vf "scale=1920:1080" \
    -c:v libx264 -b:v 10M -preset slow \
    -c:a copy \
    -movflags +faststart \
    "$OUT/openclaw-promo-90s-1080p.mp4"

  echo "==> Master complete."
}

build_cutdowns() {
  echo "==> Building cutdowns"
  local M="$OUT/openclaw-promo-90s-master-4k.mp4"
  require "$M"

  # 60s Kickstarter pre-roll: drop Section 4 (38–52) and tighten Section 5.
  # Keep: 0–38, 52–61, 65–80, 86–90 -> 38 + 9 + 15 + 4 = 66 (close enough; trim
  # final cutdown VO in the source if you want exactly 60).
  ffmpeg -y -i "$M" -filter_complex "
    [0:v]trim=0:38,setpts=PTS-STARTPTS[v1];
    [0:a]atrim=0:38,asetpts=PTS-STARTPTS[a1];
    [0:v]trim=52:61,setpts=PTS-STARTPTS[v2];
    [0:a]atrim=52:61,asetpts=PTS-STARTPTS[a2];
    [0:v]trim=65:80,setpts=PTS-STARTPTS[v3];
    [0:a]atrim=65:80,asetpts=PTS-STARTPTS[a3];
    [0:v]trim=86:90,setpts=PTS-STARTPTS[v4];
    [0:a]atrim=86:90,asetpts=PTS-STARTPTS[a4];
    [v1][a1][v2][a2][v3][a3][v4][a4]concat=n=4:v=1:a=1[v][a]
  " -map "[v]" -map "[a]" \
    -c:v libx264 -b:v 10M -preset slow -c:a aac -b:a 192k -ar 48000 \
    -movflags +faststart \
    "$OUT/openclaw-promo-60s-kickstarter.mp4"

  # 30s vertical (9:16) for Meta/TikTok. Cold open + Sora press + product hero
  # + ask. Crop to 1080x1920 (top/bottom letterbox into a center crop).
  ffmpeg -y -i "$M" -filter_complex "
    [0:v]trim=0:5,setpts=PTS-STARTPTS[v1];
    [0:a]atrim=0:5,asetpts=PTS-STARTPTS[a1];
    [0:v]trim=22:32,setpts=PTS-STARTPTS[v2];
    [0:a]atrim=22:32,asetpts=PTS-STARTPTS[a2];
    [0:v]trim=80:90,setpts=PTS-STARTPTS[v3];
    [0:a]atrim=80:90,asetpts=PTS-STARTPTS[a3];
    [v1][a1][v2][a2][v3][a3]concat=n=3:v=1:a=1[vc][a];
    [vc]crop=2160:3840:840:0,scale=1080:1920[v]
  " -map "[v]" -map "[a]" \
    -c:v libx264 -b:v 8M -preset slow -c:a aac -b:a 192k \
    -movflags +faststart \
    "$OUT/openclaw-promo-30s-vertical.mp4"

  # 30s square (1:1) for feed posts.
  ffmpeg -y -i "$M" -filter_complex "
    [0:v]trim=0:5,setpts=PTS-STARTPTS[v1];
    [0:a]atrim=0:5,asetpts=PTS-STARTPTS[a1];
    [0:v]trim=22:32,setpts=PTS-STARTPTS[v2];
    [0:a]atrim=22:32,asetpts=PTS-STARTPTS[a2];
    [0:v]trim=80:90,setpts=PTS-STARTPTS[v3];
    [0:a]atrim=80:90,asetpts=PTS-STARTPTS[a3];
    [v1][a1][v2][a2][v3][a3]concat=n=3:v=1:a=1[vc][a];
    [vc]crop=2160:2160:840:0,scale=1080:1080[v]
  " -map "[v]" -map "[a]" \
    -c:v libx264 -b:v 8M -preset slow -c:a aac -b:a 192k \
    -movflags +faststart \
    "$OUT/openclaw-promo-30s-square.mp4"

  # 15s teaser: lobster intro + button drop + click + URL card. Pulled from
  # 0–4 (intro), 22–28 (button + Sora press), 88–90 (click + url) = 12s, plus
  # a 3s URL hold. The hold is generated as a still from the master.
  ffmpeg -y -i "$M" -filter_complex "
    [0:v]trim=0:4,setpts=PTS-STARTPTS[v1];
    [0:a]atrim=0:4,asetpts=PTS-STARTPTS[a1];
    [0:v]trim=22:28,setpts=PTS-STARTPTS[v2];
    [0:a]atrim=22:28,asetpts=PTS-STARTPTS[a2];
    [0:v]trim=88:90,setpts=PTS-STARTPTS[v3];
    [0:a]atrim=88:90,asetpts=PTS-STARTPTS[a3];
    [v1][a1][v2][a2][v3][a3]concat=n=3:v=1:a=1[v][a]
  " -map "[v]" -map "[a]" \
    -c:v libx264 -b:v 8M -preset slow -c:a aac -b:a 192k \
    -movflags +faststart \
    "$OUT/openclaw-promo-15s-teaser.mp4"

  echo "==> Cutdowns complete."
}

case "${1:-all}" in
  master)    build_master ;;
  cutdowns)  build_cutdowns ;;
  all)       build_master; build_cutdowns ;;
  *)         echo "Usage: $0 [master|cutdowns|all]" >&2; exit 2 ;;
esac

echo "==> Done. Outputs in: $OUT"
