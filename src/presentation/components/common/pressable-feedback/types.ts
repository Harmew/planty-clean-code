import type { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface PressableFeedbackProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  scaleValue?: number;
  disabled?: boolean;
}
