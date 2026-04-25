import { Composition } from "remotion";
import { OpenClawPromo } from "./Composition";

// 90 seconds at 30fps = 2700 frames.
export const FPS = 30;
export const DURATION = 90 * FPS;
export const WIDTH = 3840;
export const HEIGHT = 2160;

export const Root = () => (
  <Composition
    id="OpenClawPromo"
    component={OpenClawPromo}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
