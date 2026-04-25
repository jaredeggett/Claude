import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

export const Section1Cold: React.FC = () => {
  const frame = useCurrentFrame();
  // Eyes blink at ~6.5s.
  const eyeOpacity = interpolate(frame, [f(6.5), f(6.7), f(6.9), f(7.1)], [1, 0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Whiteboard>
      {/* Lobster body */}
      <MarkerStroke
        d="M1500 1180 Q1920 970 2340 1180 Q2400 1400 2240 1500 Q1920 1540 1600 1500 Q1440 1400 1500 1180 Z"
        startFrame={f(2)}
        durationFrames={f(0.6)}
      />
      {/* Left claw */}
      <MarkerStroke
        d="M1500 1180 Q1300 1080 1200 1140 Q1140 1220 1240 1280 Q1320 1260 1340 1240"
        startFrame={f(2.6)}
        durationFrames={f(0.4)}
      />
      {/* Right claw */}
      <MarkerStroke
        d="M2340 1180 Q2540 1080 2640 1140 Q2700 1220 2600 1280 Q2520 1260 2500 1240"
        startFrame={f(3.0)}
        durationFrames={f(0.4)}
      />
      {/* Antennae */}
      <MarkerStroke
        d="M1750 1080 Q1730 880 1800 820"
        startFrame={f(3.4)}
        durationFrames={f(0.3)}
      />
      <MarkerStroke
        d="M2090 1080 Q2110 880 2040 820"
        startFrame={f(3.7)}
        durationFrames={f(0.3)}
      />
      {/* Tail */}
      <MarkerStroke
        d="M1880 1500 Q1920 1700 1960 1500"
        startFrame={f(4.0)}
        durationFrames={f(0.3)}
      />
      {/* Eyes */}
      <circle cx="1810" cy="1160" r="22" fill="#0a0a0a" opacity={frame > f(4.4) ? eyeOpacity : 0} />
      <circle cx="2030" cy="1160" r="22" fill="#0a0a0a" opacity={frame > f(4.4) ? eyeOpacity : 0} />
      {/* Thought bubble */}
      <MarkerStroke
        d="M2500 820 Q2780 580 3060 680 Q3160 800 3060 920 Q2940 1000 2780 970 Q2680 950 2620 940 L2600 970 L2580 940 Z"
        startFrame={f(8)}
        durationFrames={f(1.2)}
      />
      <MarkerText x={2730} y={870} startFrame={f(8.8)} durationFrames={f(0.8)} size={80}>
        hungry
      </MarkerText>
    </Whiteboard>
  );
};
