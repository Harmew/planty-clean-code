import React from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// DI
import { container } from "@di/container";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

import { createStyles } from "./styles";
import { SwitchProps } from "./types";

const SWITCH_WIDTH = 50;
const SWITCH_HEIGHT = 24;

export function Switch({ isSelected, onSelectedChange, disabled = false }: Readonly<SwitchProps>) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const thumbSize = SWITCH_HEIGHT - 4;

  // Controla a posição do thumb
  const thumbPosition = useSharedValue(isSelected ? SWITCH_WIDTH - thumbSize - 2 : 2);
  // Controla a animação da cor da track
  const progress = useSharedValue(isSelected ? 1 : 0);

  // Refs
  const thumbPositionRef = React.useRef(thumbPosition);
  const progressRef = React.useRef(progress);

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbPositionRef.current.value }],
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progressRef.current.value, [0, 1], [theme.colors.gray400, theme.colors.green500]),
  }));

  React.useEffect(() => {
    thumbPositionRef.current.value = withSpring(isSelected ? SWITCH_WIDTH - thumbSize - 2 : 2);
    progressRef.current.value = withTiming(isSelected ? 1 : 0, {
      duration: 200,
    });
  }, [isSelected, thumbSize, SWITCH_WIDTH]);

  function handleChange() {
    container.hapticsService.buttonPress();
    onSelectedChange?.(!isSelected);
  }

  return (
    <Pressable
      testID="switch"
      disabled={disabled}
      accessibilityState={{ disabled, checked: isSelected }}
      onPress={handleChange}
      style={{ width: SWITCH_WIDTH, height: SWITCH_HEIGHT }}
      hitSlop={12}
    >
      <Animated.View
        testID="switch-track"
        style={[
          styles.track,
          animatedTrackStyle,
          { width: SWITCH_WIDTH, height: SWITCH_HEIGHT, borderRadius: SWITCH_HEIGHT / 2 },
        ]}
      >
        <Animated.View
          testID="switch-thumb"
          style={[
            styles.thumb,
            animatedThumbStyle,
            { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
