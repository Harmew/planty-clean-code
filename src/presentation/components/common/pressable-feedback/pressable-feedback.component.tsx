import React from "react";

import { Pressable, StyleSheet, type GestureResponderEvent } from "react-native";

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// DI
import { container } from "@di/container";

import type { PressableFeedbackProps } from "./types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableFeedback({
  children,
  style,
  scaleValue = 0.97,
  disabled = false,
  onPressIn,
  onPressOut,
  testID = "pressable-feedback",
  ...props
}: Readonly<PressableFeedbackProps>) {
  const scale = useSharedValue<number>(1);
  const [pressed, setPressed] = React.useState<boolean>(false);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value, { duration: 120 }) }],
  }));

  function handlePressIn(event: GestureResponderEvent) {
    container.hapticsService.buttonPress();

    setPressed(true);
    scale.value = scaleValue;

    onPressIn?.(event);
  }

  function handlePressOut(event: GestureResponderEvent) {
    setPressed(false);
    scale.value = 1;
    onPressOut?.(event);
  }

  return (
    <AnimatedPressable
      {...props}
      testID={testID}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={StyleSheet.compose(scaleStyle, style)}
    >
      {typeof children === "function" ? children({ pressed, hovered: false }) : children}
    </AnimatedPressable>
  );
}
