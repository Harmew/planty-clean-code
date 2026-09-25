import { colors } from "@shared/theme/colors";
import { withAlpha } from "./color";

export function getIconTextColor(dark: boolean) {
  return dark ? "white" : "black";
}

export function getSurfaceColor(dark: boolean) {
  return dark ? "gray800" : "white";
}

export const getThemeColors = (dark: boolean) => ({
  /** Background color */
  background: dark ? colors.gray900 : colors.gray100,
  /** Secondary background color */
  backgroundSecondary: dark ? colors.gray700 : colors.gray300,
  /** Surface color */
  surface: dark ? colors.gray800 : colors.white,
  /** Surface disabled color */
  surfaceDisabled: dark ? colors.gray700 : colors.gray300,
  /** Text color */
  text: dark ? colors.gray100 : colors.gray900,
  /** Overlay color */
  overlay: dark ? withAlpha(colors.black, 0.56) : withAlpha(colors.black, 0.5),
  /** Tab background color */
  tabBackground: dark ? colors.gray800 : colors.white,
  /** Tab icon color */
  tabIcon: dark ? colors.gray100 : colors.gray500,
});
