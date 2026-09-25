import type { NavigationRoute, ParamListBase } from "expo-router/build/react-navigation";
import type { PressableProps } from "react-native";

export interface TabBarButtonProps extends PressableProps {
  route: NavigationRoute<ParamListBase, string>;
  isFocused: boolean;
  group: "left" | "right";
  onPress: () => void;
  onLongPress: () => void;
}
