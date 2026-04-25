import { AbsoluteFill } from "remotion";
import React from "react";

/** Pure-white whiteboard background. Children are rendered as SVG content. */
export const Whiteboard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
    <svg viewBox="0 0 3840 2160" style={{ width: "100%", height: "100%" }}>
      {children}
    </svg>
  </AbsoluteFill>
);
