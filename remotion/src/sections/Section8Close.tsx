import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

/**
 * Section 8 is just 2 seconds. The first second is covered by the SORA-03
 * Molty wink overlay. This component renders the final frame: button +
 * finger pressing it + "FEED YOUR LOBSTER." + URL.
 */
export const Section8Close: React.FC = () => (
  <Whiteboard>
    {/* Button */}
    <MarkerStroke
      d="M1920 960 m-360 0 a360 360 0 1 0 720 0 a360 360 0 1 0 -720 0"
      startFrame={f(1)}
      durationFrames={f(0.3)}
      pathLength={2400}
    />
    <MarkerStroke
      d="M1584 936 q336 -84 672 0 q-336 60 -672 0 Z"
      startFrame={f(1.1)}
      durationFrames={f(0.2)}
      thin
    />
    {/* Finger pressing */}
    <MarkerStroke
      d="M1896 528 Q1872 384 1896 240 Q1944 240 1944 384 L1944 672 Q1920 768 1896 672 Z"
      startFrame={f(1.3)}
      durationFrames={f(0.3)}
    />
    <MarkerText x={912} y={1680} startFrame={f(1.5)} durationFrames={f(0.4)} size={140} bold>
      FEED YOUR LOBSTER.
    </MarkerText>
    <MarkerText x={1224} y={1872} startFrame={f(1.8)} durationFrames={f(0.2)} size={64}>
      openclawbutton.com
    </MarkerText>
  </Whiteboard>
);
