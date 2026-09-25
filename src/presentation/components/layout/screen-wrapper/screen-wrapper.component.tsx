import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import type { ScreenWrapperProps } from "./types";

export function ScreenWrapper({ children, style, flex = 1 }: Readonly<ScreenWrapperProps>) {
  const { top } = useSafeAreaInsets();
  const { dark } = useTheme();

  const { background } = getThemeColors(dark);

  return (
    <View
      style={StyleSheet.compose({ flex, backgroundColor: background, paddingTop: top }, style)}
      testID="screen-wrapper"
    >
      {children}
    </View>
  );
}
