import { AbsoluteFill, Series } from "remotion";
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

/**
 * Asset-free composition: no VO Audio, no Sora B-roll Video. Whiteboard
 * sections and burned-in captions only. Use this when the public/ folder
 * doesn't have voiceover-master.wav and the three sora-*.mp4 files yet.
 *
 * The locked composition with audio + Sora overlays is in Composition.tsx.
 */
export const OpenClawPromoNoAssets = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <Series>
        <Series.Sequence durationInFrames={sec(10)}><Section1Cold /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}><Section2Problem /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(16)}><Section3Solution /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(14)}><Section4HowItWorks /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(16)}><Section5UseCases /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}><Section6Open /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(8)}><Section7Ask /></Series.Sequence>
        <Series.Sequence durationInFrames={sec(2)}><Section8Close /></Series.Sequence>
      </Series>
      <Captions />
    </AbsoluteFill>
  );
};
