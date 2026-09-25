import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// Presentation
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Theme
import { getIconTextColor } from "@shared/utils/theme";

import { createStyles } from "./styles";
import type { TabBarButtonProps } from "./types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TAB_ANIMATION_DURATION = 150;

const icons = {
  "my-plants": Icons.Home,
  "my-cares": Icons.HeartPulse,
  settings: Icons.Settings,
} as const;

const labels = {
  "my-plants": "Minhas plantas",
  "my-cares": "Meus cuidados",
  settings: "Configurações",
} as const;

export function TabBarButton({ group, onPress, onLongPress, route, isFocused, ...props }: Readonly<TabBarButtonProps>) {
  const { theme, dark } = useTheme();
  const styles = createStyles(theme);

  const progress = useSharedValue<number>(isFocused ? 1 : 0);
  const progressRef = React.useRef(progress);

  const Icon = icons[route.name as keyof typeof icons];

  const animatedContainerStyle = useAnimatedStyle(() => ({
    paddingHorizontal:
      group === "left"
        ? theme.spacings[20] + progress.value * (theme.spacings[20] - theme.spacings[12])
        : theme.spacings[12],
    backgroundColor: interpolateColor(progress.value, [0, 1], ["transparent", theme.colors.green500]),
  }));

  React.useEffect(() => {
    progressRef.current.value = withTiming(isFocused ? 1 : 0, { duration: TAB_ANIMATION_DURATION });
  }, [isFocused]);

  return (
    <AnimatedPressable
      {...props}
      testID="tab-bar-button"
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={labels[route.name as keyof typeof labels]}
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.compose(styles.tab, animatedContainerStyle)}
      android_ripple={null}
    >
      {Icon && <Icon size={28} color={isFocused ? "white" : getIconTextColor(dark)} />}
    </AnimatedPressable>
  );
}
