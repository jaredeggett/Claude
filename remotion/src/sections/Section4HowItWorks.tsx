import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

export const Section4HowItWorks: React.FC = () => (
  <Whiteboard>
    {/* Column markers */}
    <MarkerText x={192} y={192} startFrame={f(0)} durationFrames={f(0.2)} size={56}>1</MarkerText>
    <MarkerText x={1080} y={192} startFrame={f(0)} durationFrames={f(0.2)} size={56}>2</MarkerText>
    <MarkerText x={1968} y={192} startFrame={f(0)} durationFrames={f(0.2)} size={56}>3</MarkerText>
    <MarkerText x={2856} y={192} startFrame={f(0)} durationFrames={f(0.2)} size={56}>4</MarkerText>
    {/* Bottom line */}
    <MarkerStroke d="M120 1560 L3720 1560" startFrame={f(0.2)} durationFrames={f(0.6)} />
    {/* Panel 1 PRESS */}
    <MarkerStroke
      d="M432 960 m-216 0 a216 216 0 1 0 432 0 a216 216 0 1 0 -432 0"
      startFrame={f(2)}
      durationFrames={f(0.5)}
      pathLength={1600}
    />
    <MarkerStroke
      d="M408 576 Q384 432 408 312 Q456 312 456 432 L456 768"
      startFrame={f(2.5)}
      durationFrames={f(0.4)}
    />
    <MarkerText x={240} y={1776} startFrame={f(3)} durationFrames={f(0.5)} size={108} bold>PRESS</MarkerText>
    <MarkerText x={144} y={1920} startFrame={f(3.5)} durationFrames={f(0.5)} size={56}>0.0003 watts</MarkerText>
    {/* Panel 2 HARVEST */}
    <MarkerStroke
      d="M1332 960 m-216 0 a216 216 0 1 0 432 0 a216 216 0 1 0 -432 0"
      startFrame={f(5)}
      durationFrames={f(0.5)}
      pathLength={1600}
    />
    <MarkerStroke
      d="M1296 864 L1248 984 L1392 984 L1332 1104"
      startFrame={f(5.5)}
      durationFrames={f(0.5)}
      color="red"
      thin
    />
    <MarkerText x={1068} y={1776} startFrame={f(6)} durationFrames={f(0.5)} size={108} bold>HARVEST</MarkerText>
    {/* Panel 3 BROADCAST */}
    <MarkerStroke
      d="M2256 960 m-120 0 a120 120 0 1 0 240 0 a120 120 0 1 0 -240 0"
      startFrame={f(8)}
      durationFrames={f(0.4)}
    />
    <MarkerStroke d="M2400 960 Q2520 840 2520 1128" startFrame={f(8.4)} durationFrames={f(0.3)} thin />
    <MarkerStroke d="M2472 960 Q2616 768 2616 1176" startFrame={f(8.6)} durationFrames={f(0.3)} thin />
    <MarkerStroke d="M2544 960 Q2712 696 2712 1224" startFrame={f(8.8)} durationFrames={f(0.3)} thin />
    <MarkerText x={1992} y={1776} startFrame={f(9)} durationFrames={f(0.5)} size={108} bold>BROADCAST</MarkerText>
    <MarkerText x={2160} y={1920} startFrame={f(9.5)} durationFrames={f(0.3)} size={56}>~30m</MarkerText>
    {/* Panel 4 RUN */}
    <MarkerStroke
      d="M3096 912 Q3216 816 3336 912 Q3360 1008 3312 1056 Q3192 1080 3096 1032 Q3072 960 3096 912 Z"
      startFrame={f(11)}
      durationFrames={f(0.5)}
    />
    <MarkerStroke d="M3144 1080 L3336 1080 L3336 1200 L3144 1200 Z" startFrame={f(11.4)} durationFrames={f(0.4)} thin />
    <MarkerText x={3096} y={1776} startFrame={f(12)} durationFrames={f(0.4)} size={108} bold>RUN</MarkerText>
    <MarkerText x={3024} y={1920} startFrame={f(12.4)} durationFrames={f(0.5)} size={56}>claw.run()</MarkerText>
    {/* Connecting arrow flowing 1->4 */}
    <MarkerStroke
      d="M432 1640 Q1920 1700 3312 1640"
      startFrame={f(13)}
      durationFrames={f(0.8)}
    />
  </Whiteboard>
);
