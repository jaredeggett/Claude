import { Composition } from "remotion";
import { OpenClawPromo } from "./Composition";
import { OpenClawPromoNoAssets } from "./CompositionNoAssets";

// 90 seconds at 30fps = 2700 frames.
export const FPS = 30;
export const DURATION = 90 * FPS;
export const WIDTH = 3840;
export const HEIGHT = 2160;

export const Root = () => (
  <>
    <Composition
      id="OpenClawPromo"
      component={OpenClawPromo}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    {/* Asset-free preview: 1080p, no VO, no Sora overlays. Renders without
        anything in public/. */}
    <Composition
      id="OpenClawPromoNoAssets"
      component={OpenClawPromoNoAssets}
      durationInFrames={DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
