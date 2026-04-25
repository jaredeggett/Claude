import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

/**
 * Section 3 spans 0:22-0:38 (16s). The Sora insert at 0:24-0:28 is layered on
 * top of the timeline by Composition.tsx, so this component just keeps drawing
 * underneath. The big button drawn here is what the camera "dives into" for
 * the macro press cut.
 */
export const Section3Solution: React.FC = () => (
  <Whiteboard>
    <MarkerText x={1080} y={384} startFrame={f(0)} durationFrames={f(1.5)} size={140} bold>
      OPENCLAWBUTTON
    </MarkerText>
    {/* Big button circle */}
    <MarkerStroke
      d="M1920 1200 m-432 0 a432 432 0 1 0 864 0 a432 432 0 1 0 -864 0"
      startFrame={f(1)}
      durationFrames={f(0.8)}
      pathLength={3000}
    />
    <MarkerStroke
      d="M1488 1176 q432 -120 864 0 q-432 60 -864 0 Z"
      startFrame={f(1.5)}
      durationFrames={f(0.5)}
      thin
    />
    {/* Finger pressing (drawn after Sora returns) */}
    <MarkerStroke
      d="M1896 672 Q1872 528 1896 384 Q1944 384 1944 528 L1944 816 Q1920 912 1896 816 Z"
      startFrame={f(6)}
      durationFrames={f(0.6)}
    />
    {/* Energy squiggles */}
    <MarkerStroke d="M1560 864 Q1524 804 1584 768" startFrame={f(8)} durationFrames={f(0.2)} color="red" thin />
    <MarkerStroke d="M2280 864 Q2316 804 2256 768" startFrame={f(8.2)} durationFrames={f(0.2)} color="red" thin />
    {/* Wireless arcs */}
    <MarkerStroke d="M2376 1200 Q2592 1080 2592 1344" startFrame={f(10)} durationFrames={f(0.4)} />
    <MarkerStroke d="M2472 1176 Q2736 1008 2736 1392" startFrame={f(10.4)} durationFrames={f(0.4)} />
    <MarkerStroke d="M2568 1152 Q2880 936 2880 1440" startFrame={f(10.8)} durationFrames={f(0.4)} />
    {/* 100% HUMAN POWERED */}
    <MarkerText x={768} y={1920} startFrame={f(13)} durationFrames={f(1.5)} size={120} color="red" bold>
      100% HUMAN POWERED
    </MarkerText>
  </Whiteboard>
);
