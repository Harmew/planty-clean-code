import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// Presentation
import { FullWindowOverlay } from "@presentation/components/common/full-window-overlay";
import { Surface } from "@presentation/components/common/surface";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import { useMenu } from "../menu.context";
import { MenuContentProps } from "../types";

export function MenuContent({ children }: Readonly<MenuContentProps>) {
  const { isOpen, setOpen } = useMenu();
  const { theme, dark } = useTheme();
  const { overlay } = getThemeColors(dark);

  function handleClose() {
    setOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <FullWindowOverlay>
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={{ ...StyleSheet.absoluteFill, backgroundColor: overlay }}
      >
        <Pressable testID="menu-overlay" style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        pointerEvents="box-none"
        style={{ ...StyleSheet.absoluteFill, justifyContent: "center" }}
      >
        <Surface style={{ marginHorizontal: theme.spacings[18], gap: theme.spacings[4], maxHeight: 600 }}>
          {children}
        </Surface>
      </Animated.View>
    </FullWindowOverlay>
  );
}
