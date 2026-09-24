import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@presentation/hooks/use-theme";

import { createStyles } from "./styles";
import type { ScreenWrapperProps } from "./types";

export function ScreenWrapper({ children, style, flex = 1 }: Readonly<ScreenWrapperProps>) {
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={[styles.container, { flex, paddingTop: top }, style]} testID="screen-wrapper">
      {children}
    </View>
  );
}
