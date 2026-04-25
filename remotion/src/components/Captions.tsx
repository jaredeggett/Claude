import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FPS } from "../Root";
import React from "react";

type Cue = { from: number; to: number; text: string };

const CUES: Cue[] = [
  { from: 0, to: 3, text: "You raised a lobster." },
  { from: 3, to: 6, text: "A coding lobster." },
  { from: 6, to: 10, text: "You taught it everything." },
  { from: 10, to: 13, text: "Every morning you walk to your keyboard" },
  { from: 13, to: 15.5, text: "and type the same prompt." },
  { from: 15.5, to: 17, text: "Summarize my inbox." },
  { from: 17, to: 18.5, text: "Deploy the code." },
  { from: 18.5, to: 20, text: "Run the script." },
  { from: 20, to: 22, text: "Twelve times a day. Every day. Forever." },
  { from: 22, to: 24, text: "OpenClawButton." },
  { from: 24, to: 28, text: "One button. No batteries." },
  { from: 28, to: 32, text: "You press it. Your finger powers it." },
  { from: 32, to: 35, text: "A wireless signal flies." },
  { from: 35, to: 38, text: "Your lobster wakes up and goes to work." },
  { from: 38, to: 40.5, text: "Press. Harvest. Broadcast. Run." },
  { from: 40.5, to: 48, text: "The same kinetic mechanism in commercial light switches for twenty years." },
  { from: 48, to: 52, text: "Now it talks to your AI agent." },
  { from: 52, to: 55.5, text: "Stick one on your nightstand." },
  { from: 58, to: 61, text: "One on your monitor." },
  { from: 61, to: 63.5, text: "One by the door." },
  { from: 65, to: 68, text: "Every press feeds the lobster a different skill." },
  { from: 68, to: 70.5, text: "Open source SDK." },
  { from: 70.5, to: 73, text: "Published BLE spec." },
  { from: 73, to: 76, text: "Five lines of Python." },
  { from: 76.5, to: 78.5, text: "Hack it. Fork it." },
  { from: 78.5, to: 80, text: "Build whatever your lobster wants." },
  { from: 80, to: 82, text: "Live on Kickstarter." },
  { from: 86, to: 88, text: "First hundred backers feed at $19.99." },
  { from: 89, to: 90, text: "Feed your lobster." },
];

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const active = CUES.find((c) => t >= c.from && t < c.to);
  if (!active) return null;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 160,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.85)",
          color: "#fff",
          padding: "20px 36px",
          borderRadius: 8,
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
          fontSize: 72,
          fontWeight: 700,
          maxWidth: "80%",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
