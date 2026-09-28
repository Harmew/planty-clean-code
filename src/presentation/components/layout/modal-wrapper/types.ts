import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface ModalWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: number;
}
