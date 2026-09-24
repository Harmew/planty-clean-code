import type { StyleProp, ViewProps, ViewStyle } from "react-native";

export interface SurfaceProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
}
