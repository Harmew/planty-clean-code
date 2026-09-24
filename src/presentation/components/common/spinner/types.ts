import type { StyleProp, ViewStyle } from "react-native";

import type { Theme } from "@shared/theme";

export interface SpinnerProps {
  size?: number;
  color?: keyof Theme["colors"];
  duration?: number;
  style?: StyleProp<ViewStyle>;
}
