import { withAlpha } from "@shared/utils/color";

import { colors } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacings } from "./spacings";
import type { Theme } from "./types";
import { fontLineHeights, fonts, fontSizes, fontWeights } from "./typography";

export * from "./colors";
export * from "./radius";
export * from "./shadows";
export * from "./spacings";
export * from "./types";
export * from "./typography";

/**
 * Light Theme
 */
const lightTheme: Theme = {
  tokens: {
    background: colors.gray100,
    backgroundSecondary: colors.gray300,
    surface: colors.white,
    surfaceDisabled: colors.gray300,
    text: colors.gray900,
    overlay: withAlpha(colors.black, 0.5),
    tabBackground: colors.white,
    tabIcon: colors.gray500,
  },
  colors,
  fontSizes,
  fontLineHeights,
  fontWeights,
  fonts,
  spacings,
  radius,
  shadows,
} as const;

/**
 * Dark Theme
 */
const darkTheme: Theme = {
  tokens: {
    background: colors.gray900,
    backgroundSecondary: colors.gray700,
    surface: colors.gray800,
    surfaceDisabled: colors.gray700,
    text: colors.gray100,
    overlay: withAlpha(colors.black, 0.56),
    tabBackground: colors.gray800,
    tabIcon: colors.gray100,
  },
  colors,
  fontSizes,
  fontLineHeights,
  fontWeights,
  fonts,
  spacings,
  radius,
  shadows,
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
