import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

const rooms: { x: number; label: string; doodle: string; reveal: number }[] = [
  { x: 576,  label: "morning_briefing", doodle: "coffee", reveal: 2.5 },
  { x: 1248, label: "deploy_staging",   doodle: "rocket", reveal: 5 },
  { x: 1920, label: "going_home",       doodle: "lock",   reveal: 7 },
  { x: 2592, label: "focus_90",         doodle: "DND",    reveal: 9 },
  { x: 3264, label: "scene_movie",      doodle: "popcorn", reveal: 11 },
];

export const Section5UseCases: React.FC = () => (
  <Whiteboard>
    {/* Roof */}
    <MarkerStroke d="M240 768 L1920 240 L3600 768" startFrame={f(0)} durationFrames={f(1)} />
    {/* Outer walls + base */}
    <MarkerStroke d="M240 768 L240 1872" startFrame={f(0.5)} durationFrames={f(0.4)} />
    <MarkerStroke d="M3600 768 L3600 1872" startFrame={f(0.7)} durationFrames={f(0.4)} />
    <MarkerStroke d="M240 1872 L3600 1872" startFrame={f(0.9)} durationFrames={f(0.5)} />
    {/* Room dividers */}
    <MarkerStroke d="M912 768 L912 1872" startFrame={f(1.1)} durationFrames={f(0.3)} thin />
    <MarkerStroke d="M1584 768 L1584 1872" startFrame={f(1.3)} durationFrames={f(0.3)} thin />
    <MarkerStroke d="M2256 768 L2256 1872" startFrame={f(1.5)} durationFrames={f(0.3)} thin />
    <MarkerStroke d="M2928 768 L2928 1872" startFrame={f(1.7)} durationFrames={f(0.3)} thin />
    {/* Buttons + labels */}
    {rooms.map((r, i) => (
      <React.Fragment key={i}>
        <MarkerStroke
          d={`M${r.x} 1200 m-60 0 a60 60 0 1 0 120 0 a60 60 0 1 0 -120 0`}
          startFrame={f(r.reveal)}
          durationFrames={f(0.3)}
          pathLength={500}
        />
        <MarkerText
          x={r.x - 200}
          y={1440}
          startFrame={f(r.reveal + 0.4)}
          durationFrames={f(0.6)}
          size={48}
        >
          {r.label}
        </MarkerText>
      </React.Fragment>
    ))}
    {/* Molty on the roof at the end */}
    <MarkerStroke
      d="M1728 168 Q1920 72 2112 168 Q2136 240 2064 264 Q1872 264 1728 240 Q1704 192 1728 168 Z"
      startFrame={f(13)}
      durationFrames={f(0.8)}
    />
    <circle cx="1824" cy="192" r="12" fill="#0a0a0a" opacity={1} />
    <circle cx="1968" cy="192" r="12" fill="#0a0a0a" opacity={1} />
  </Whiteboard>
);
