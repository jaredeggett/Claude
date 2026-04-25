import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

/**
 * Section 7 spans 1:20-1:28 (8s). The Sora insert at 1:22-1:26 covers the
 * middle 4s; the tier rectangles appear before the insert and the price text
 * + START HERE arrow fill in after we cut back.
 */
export const Section7Ask: React.FC = () => (
  <Whiteboard>
    {/* Three rectangles, drawn fast in the first 1.5s before SORA-02 cuts in */}
    <MarkerStroke d="M240 480 L1248 480 L1248 1680 L240 1680 Z" startFrame={f(0)} durationFrames={f(0.4)} pathLength={5000} />
    <MarkerStroke d="M1416 480 L2424 480 L2424 1680 L1416 1680 Z" startFrame={f(0.3)} durationFrames={f(0.4)} pathLength={5000} />
    <MarkerStroke d="M2592 480 L3600 480 L3600 1680 L2592 1680 Z" startFrame={f(0.6)} durationFrames={f(0.4)} pathLength={5000} />
    {/* NOVICE tier */}
    <MarkerText x={432} y={672} startFrame={f(1)} durationFrames={f(0.5)} size={108} bold>NOVICE</MarkerText>
    <MarkerText x={432} y={960} startFrame={f(1.2)} durationFrames={f(0.5)} size={140} color="red" bold>$19.99</MarkerText>
    {/* JUST THE CLAW */}
    <MarkerText x={1560} y={672} startFrame={f(1.5)} durationFrames={f(0.4)} size={108} bold>JUST THE</MarkerText>
    <MarkerText x={1680} y={816} startFrame={f(1.7)} durationFrames={f(0.3)} size={108} bold>CLAW</MarkerText>
    <MarkerText x={1632} y={1080} startFrame={f(1.9)} durationFrames={f(0.5)} size={108} bold>$24.99</MarkerText>
    {/* KEEPER + crown */}
    <MarkerStroke
      d="M2736 480 L2808 384 L2880 480 L2952 360 L3024 480 L3096 384 L3168 480 L3240 360 L3312 480 L3384 384 L3456 480"
      startFrame={f(2)}
      durationFrames={f(0.5)}
      pathLength={1500}
    />
    <MarkerText x={2808} y={672} startFrame={f(2.5)} durationFrames={f(0.5)} size={108} bold>KEEPER</MarkerText>
    <MarkerText x={2832} y={1080} startFrame={f(2.7)} durationFrames={f(0.5)} size={108} bold>$59.99</MarkerText>
    {/* After SORA-02 returns at 6s: 100 ONLY + arrow + START HERE */}
    <MarkerText x={384} y={1200} startFrame={f(6)} durationFrames={f(0.4)} size={56} color="red">
      100 ONLY
    </MarkerText>
    <MarkerStroke
      d="M672 1176 m-336 -72 a336 72 0 1 0 672 0 a336 72 0 1 0 -672 0"
      startFrame={f(6.3)}
      durationFrames={f(0.4)}
      color="red"
      thin
      pathLength={2200}
    />
    <MarkerStroke d="M672 1920 Q672 1824 672 1728" startFrame={f(6.6)} durationFrames={f(0.3)} color="red" />
    <MarkerStroke d="M624 1800 L672 1728 L720 1800" startFrame={f(6.9)} durationFrames={f(0.2)} color="red" />
    <MarkerText x={384} y={2052} startFrame={f(7.1)} durationFrames={f(0.5)} size={108} color="red" bold>
      START HERE
    </MarkerText>
  </Whiteboard>
);
