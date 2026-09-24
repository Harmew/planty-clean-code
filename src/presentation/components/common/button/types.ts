import type { PressableProps, StyleProp, ViewStyle } from "react-native";

import type { Theme } from "@shared/theme";

export type ButtonColor = keyof Theme["colors"];

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends PressableProps {
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}
