import { useCurrentFrame, interpolate } from "remotion";
import React from "react";

type Props = {
  x: number;
  y: number;
  startFrame: number;
  durationFrames: number;
  size?: number;
  color?: "black" | "red";
  bold?: boolean;
  children: string;
};

/** Marker hand-lettering. Reveals character-by-character to mimic writing. */
export const MarkerText: React.FC<Props> = ({
  x,
  y,
  startFrame,
  durationFrames,
  size = 64,
  color = "black",
  bold = false,
  children,
}) => {
  const frame = useCurrentFrame();
  const total = children.length;
  const visibleCount = Math.floor(
    interpolate(
      frame,
      [startFrame, startFrame + durationFrames],
      [0, total],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );
  const visible = children.slice(0, visibleCount);
  return (
    <text
      x={x}
      y={y}
      fontFamily="Caveat, 'Marker Felt', cursive"
      fontSize={size}
      fontWeight={bold ? 700 : 400}
      fill={color === "red" ? "#c8102e" : "#0a0a0a"}
    >
      {visible}
    </text>
  );
};
