import { Whiteboard } from "../components/Whiteboard";
import { MarkerStroke } from "../components/MarkerStroke";
import { MarkerText } from "../components/MarkerText";
import { FPS } from "../Root";
import React from "react";

const f = (s: number) => Math.round(s * FPS);

const PY_LINES: { text: string; x: number; y: number; reveal: number; duration: number }[] = [
  { text: "from openclawbutton import Button", x: 240, y: 840, reveal: 4, duration: 1 },
  { text: "button = Button()",                 x: 240, y: 1032, reveal: 5, duration: 0.8 },
  { text: "@button.on_press",                  x: 240, y: 1224, reveal: 6, duration: 0.7 },
  { text: "def feed(e):",                      x: 240, y: 1416, reveal: 7, duration: 0.5 },
  { text: '    claw.run("anything")',          x: 240, y: 1608, reveal: 8, duration: 0.9 },
];

export const Section6Open: React.FC = () => (
  <Whiteboard>
    {/* Octocat head */}
    <MarkerStroke
      d="M432 336 m-144 0 a144 144 0 1 0 288 0 a144 144 0 1 0 -288 0"
      startFrame={f(0)}
      durationFrames={f(0.4)}
    />
    <MarkerStroke d="M360 240 L336 180 L396 216 Z" startFrame={f(0.3)} durationFrames={f(0.2)} thin />
    <MarkerStroke d="M504 240 L528 180 L468 216 Z" startFrame={f(0.4)} durationFrames={f(0.2)} thin />
    <circle cx="396" cy="324" r="12" fill="#0a0a0a" />
    <circle cx="468" cy="324" r="12" fill="#0a0a0a" />
    {/* MIT LICENSE label */}
    <MarkerText x={672} y={336} startFrame={f(0.7)} durationFrames={f(1)} size={108} color="red" bold>
      MIT LICENSE
    </MarkerText>
    <MarkerStroke d="M672 384 L1680 384" startFrame={f(1.5)} durationFrames={f(0.3)} color="red" />
    {/* Five lines of Python */}
    {PY_LINES.map((line, i) => (
      <MarkerText
        key={i}
        x={line.x}
        y={line.y}
        startFrame={f(line.reveal)}
        durationFrames={f(line.duration)}
        size={72}
      >
        {line.text}
      </MarkerText>
    ))}
    {/* Lobster eating parens */}
    <MarkerStroke
      d="M2832 1440 Q3072 1296 3312 1440 Q3336 1584 3264 1656 Q3024 1656 2832 1608 Q2808 1512 2832 1440 Z"
      startFrame={f(10)}
      durationFrames={f(0.6)}
    />
    <circle cx="2952" cy="1476" r="12" fill="#0a0a0a" />
    <circle cx="3072" cy="1476" r="12" fill="#0a0a0a" />
    <MarkerText x={3360} y={1560} startFrame={f(11)} durationFrames={f(0.4)} size={56}>
      ( )
    </MarkerText>
  </Whiteboard>
);
