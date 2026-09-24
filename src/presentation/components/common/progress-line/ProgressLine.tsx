import React from "react";
import { View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import { createStyles } from "./styles";
import type { ProgressLineProps } from "./types";

export function ProgressLine({
  maxWidth,
  height = 6,
  percentage = 0,
  activeColor = "green500",
  backgroundColor = "gray400",
  duration = 300,
  style,
}: Readonly<ProgressLineProps>) {
  const { theme } = useAppTheme();
  const styles = createStyles();

  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  const progress = useSharedValue<number>(0);
  const progressRef = React.useRef(progress);

  React.useEffect(() => {
    if (!containerWidth) return;

    const clamped = Math.min(Math.max(percentage, 0), 100);

    // Atualiza com animação
    progressRef.current.value = withTiming((clamped / 100) * containerWidth, {
      duration,
      easing: Easing.out(Easing.exp),
    });
  }, [percentage, containerWidth, duration]);

  // Estilo animado da barra
  const animatedStyle = useAnimatedStyle(() => ({
    width: progressRef.current.value,
  }));

  return (
    <View
      testID="progress-line-container"
      onLayout={(e) => {
        if (!containerWidth) setContainerWidth(e.nativeEvent.layout.width);
      }}
      style={[
        styles.container,
        {
          height,
          maxWidth: maxWidth ?? "100%",
          backgroundColor: theme.colors[backgroundColor],
          borderRadius: height,
        },
        style,
      ]}
    >
      <Animated.View
        testID="progress-line"
        style={[animatedStyle, { height, backgroundColor: theme.colors[activeColor], borderRadius: height / 2 }]}
      />
    </View>
  );
}
