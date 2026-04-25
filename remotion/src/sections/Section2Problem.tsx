import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

export const Section2Problem: React.FC = () => (
  <Whiteboard>
    {/* Stick figure head */}
    <MarkerStroke
      d="M1080 660 m-130 0 a130 130 0 1 0 260 0 a130 130 0 1 0 -260 0"
      startFrame={f(0)}
      durationFrames={f(0.3)}
    />
    {/* Body + limbs */}
    <MarkerStroke d="M1080 790 L1080 1290" startFrame={f(0.3)} durationFrames={f(0.2)} />
    <MarkerStroke d="M1080 980 L1340 1170" startFrame={f(0.5)} durationFrames={f(0.2)} />
    <MarkerStroke d="M1080 980 L820 1170" startFrame={f(0.7)} durationFrames={f(0.2)} />
    <MarkerStroke d="M1080 1290 L960 1620" startFrame={f(0.9)} durationFrames={f(0.2)} />
    <MarkerStroke d="M1080 1290 L1200 1620" startFrame={f(1.1)} durationFrames={f(0.2)} />
    {/* Desk */}
    <MarkerStroke d="M576 1620 L1920 1620" startFrame={f(1.3)} durationFrames={f(0.4)} />
    {/* Laptop */}
    <MarkerStroke
      d="M1440 1370 L1820 1370 L1820 1620 L1440 1620 Z"
      startFrame={f(1.5)}
      durationFrames={f(0.4)}
    />
    {/* Crossed-out bubbles */}
    <MarkerText x={2040} y={830} startFrame={f(4)} durationFrames={f(0.7)} size={56}>
      Summarize my inbox
    </MarkerText>
    <MarkerStroke
      d="M2020 800 L3060 860"
      startFrame={f(5.5)}
      durationFrames={f(0.3)}
      thin
    />
    <MarkerText x={2040} y={1030} startFrame={f(6)} durationFrames={f(0.5)} size={56}>
      Deploy the code
    </MarkerText>
    <MarkerStroke d="M2020 1000 L2880 1060" startFrame={f(6.7)} durationFrames={f(0.3)} thin />
    <MarkerText x={2040} y={1230} startFrame={f(7)} durationFrames={f(0.5)} size={56}>
      Run the script
    </MarkerText>
    <MarkerStroke d="M2020 1200 L2880 1260" startFrame={f(8)} durationFrames={f(0.3)} thin />
    {/* Aggressive scribble loop */}
    <MarkerStroke
      d="M480 480 Q1920 312 3432 600 Q3600 1200 3312 1848 Q1920 2040 480 1896 Q288 1200 480 480"
      startFrame={f(9)}
      durationFrames={f(2)}
      color="red"
      pathLength={9000}
    />
  </Whiteboard>
);
