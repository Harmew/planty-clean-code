import type { StyleProp, ViewProps, ViewStyle } from "react-native";

import type { Theme } from "@shared/theme";

export interface RowProps extends ViewProps {
  flex?: number;
  gap?: keyof Theme["spacings"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  style?: StyleProp<ViewStyle>;
}
