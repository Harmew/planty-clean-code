import type { TextProps } from "react-native";

import type { Theme } from "@shared/theme";

export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export type TextAlign = "left" | "center" | "right";

export type TypographyColor = /** NOSONAR */ "text" | keyof Theme["colors"];

export interface TypographyProps extends TextProps {
  size?: keyof Theme["fontSizes"];
  weight?: keyof Theme["fontWeights"];
  color?: TypographyColor;
  align?: TextAlign;
  transform?: TextTransform;
}
