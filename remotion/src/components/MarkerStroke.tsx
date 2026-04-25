import { useCurrentFrame, interpolate } from "remotion";
import React from "react";

type Props = {
  d: string;
  startFrame: number;
  durationFrames: number;
  color?: "black" | "red";
  thin?: boolean;
  /** Approximate path length, used for the dasharray mask. Tune per shape. */
  pathLength?: number;
};

/**
 * Marker stroke that "draws on" using stroke-dasharray. Mimics a hand drawing
 * the line over `durationFrames`. Real whiteboard footage would replace this.
 */
export const MarkerStroke: React.FC<Props> = ({
  d,
  startFrame,
  durationFrames,
  color = "black",
  thin = false,
  pathLength = 2000,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [pathLength, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <path
      d={d}
      fill="none"
      stroke={color === "red" ? "#c8102e" : "#0a0a0a"}
      strokeWidth={thin ? 6 : 10}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={pathLength}
      strokeDashoffset={progress}
    />
  );
};
