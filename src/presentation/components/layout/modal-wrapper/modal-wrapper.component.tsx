import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import type { ModalWrapperProps } from "./types";

export function ModalWrapper({ children, style, flex = 1 }: Readonly<ModalWrapperProps>) {
  const { top } = useSafeAreaInsets();
  const { theme, dark } = useTheme();

  const { background } = getThemeColors(dark);

  return (
    <View
      style={StyleSheet.compose(
        { flex, backgroundColor: background, marginTop: Platform.OS === "ios" ? theme.spacings[18] : top },
        style,
      )}
      testID="modal-wrapper"
    >
      {children}
    </View>
  );
}
