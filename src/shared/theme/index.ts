import { colors } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacings } from "./spacings";
import type { Theme } from "./types";
import { fontLineHeights, fontSizes, fontWeights } from "./typography";

export * from "./colors";
export * from "./radius";
export * from "./shadows";
export * from "./spacings";
export * from "./types";
export * from "./typography";

export const theme: Theme = {
  colors,
  fontSizes,
  fontLineHeights,
  fontWeights,
  spacings,
  radius,
  shadows,
} as const;
