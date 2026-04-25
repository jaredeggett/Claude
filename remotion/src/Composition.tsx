import { AbsoluteFill, Audio, Sequence, Series, staticFile, Video } from "remotion";
import { FPS } from "./Root";
import { Section1Cold } from "./sections/Section1Cold";
import { Section2Problem } from "./sections/Section2Problem";
import { Section3Solution } from "./sections/Section3Solution";
import { Section4HowItWorks } from "./sections/Section4HowItWorks";
import { Section5UseCases } from "./sections/Section5UseCases";
import { Section6Open } from "./sections/Section6Open";
import { Section7Ask } from "./sections/Section7Ask";
import { Section8Close } from "./sections/Section8Close";
import { Captions } from "./components/Captions";

const sec = (s: number) => Math.round(s * FPS);

export const OpenClawPromo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* ---- WHITEBOARD SECTIONS ---- */}
      <Series>
        <Series.Sequence durationInFrames={sec(10)}>
          <Section1Cold />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}>
          <Section2Problem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(16)}>
          <Section3Solution />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(14)}>
          <Section4HowItWorks />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(16)}>
          <Section5UseCases />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}>
          <Section6Open />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(8)}>
          <Section7Ask />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(2)}>
          <Section8Close />
        </Series.Sequence>
      </Series>

      {/* ---- SORA B-ROLL INSERTS (overlay on top, opaque while playing) ---- */}
      {/* SORA-01 macro press: 0:24-0:28 */}
      <Sequence from={sec(24)} durationInFrames={sec(4)}>
        <SoraInsert src="sora-01-press-final.mp4" />
      </Sequence>
      {/* SORA-02 rotating hero: 1:22-1:26 */}
      <Sequence from={sec(82)} durationInFrames={sec(4)}>
        <SoraInsert src="sora-02-rotation-final.mp4" />
      </Sequence>
      {/* SORA-03 Molty wink: 1:28-1:29 */}
      <Sequence from={sec(88)} durationInFrames={sec(1)}>
        <SoraInsert src="sora-03-molty-final.mp4" />
      </Sequence>

      {/* ---- BURNED-IN CAPTIONS ---- */}
      <Captions />

      {/* ---- VOICEOVER (anchor track) ---- */}
      <Audio src={staticFile("voiceover-master.wav")} />

      {/* ---- OPTIONAL MUSIC BED ----
          Drop a music-bed.wav into public/ and uncomment to layer it under VO.
          Remotion does not duck automatically; pre-mix the bed at -18 LUFS or
          run the FFmpeg sidechain pass in scripts/assemble.sh after render. */}
      {/* <Audio src={staticFile("music-bed.wav")} volume={0.25} /> */}
    </AbsoluteFill>
  );
};

const SoraInsert: React.FC<{ src: string }> = ({ src }) => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </AbsoluteFill>
);
