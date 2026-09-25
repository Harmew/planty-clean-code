import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

// Presentation
import { Icons } from "@presentation/components/svgs";

import { createStyles } from "./styles";
import type { SpinnerProps } from "./types";

export function Spinner({ size = 24, color = "green500", duration = 900, style }: Readonly<SpinnerProps>) {
  const styles = createStyles();
  const rotation = useSharedValue<number>(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [duration, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={StyleSheet.compose(styles.container, style)} testID="spinner-container">
      <Animated.View style={animatedStyle} testID="spinner-animated">
        <Icons.Spinner size={size} color={color} />
      </Animated.View>
    </View>
  );
}
