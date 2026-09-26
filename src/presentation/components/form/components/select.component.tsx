import React from "react";

import { Pressable, StyleSheet } from "react-native";

import Animated, { FadeIn, FadeOut, useSharedValue, withTiming } from "react-native-reanimated";

// Presentation

import { FullWindowOverlay, PressableFeedback, Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";
import { getThemeColors } from "@shared/utils/theme";

// Form

import { useFormField } from "../form-field.component";
import type { SelectProps } from "../types";

export function SelectComponent<T>({
  value,
  onChange,
  options,
  placeholder = "Selecione",
  icon,
}: Readonly<SelectProps<T>>) {
  const [isOpen, setOpen] = React.useState(false);

  const { isDisabled, isInvalid } = useFormField();
  const { theme, dark } = useTheme();
  const { background } = getThemeColors(dark);

  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, {
      duration: 200,
    });
  }, [isOpen, progress]);

  const borderColor = isInvalid ? theme.colors.red500 : background;

  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label;

  function handleSelect(option: T) {
    onChange?.(option);
    setOpen(false);
  }

  return (
    <>
      <PressableFeedback
        scaleValue={0.99}
        disabled={isDisabled}
        style={[
          styles.trigger,
          {
            borderColor,
            opacity: isDisabled ? 0.6 : 1,
            borderRadius: theme.radius[16],
            backgroundColor: background,
            paddingHorizontal: theme.spacings[12],
          },
        ]}
        onPress={() => setOpen((previous) => !previous)}
      >
        <Row align="center" justify="space-between">
          <Row gap={12} align="center" flex={1}>
            {icon}

            <Typography tone={selectedLabel ? "text" : "textSecondary"} numberOfLines={1}>
              {selectedLabel ?? placeholder}
            </Typography>
          </Row>

          <Icons.ChevronDown size={20} tone="textSecondary" />
        </Row>
      </PressableFeedback>

      {isOpen ? (
        <FullWindowOverlay>
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} style={styles.overlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}
            style={styles.contentContainer}
            pointerEvents="box-none"
          >
            <Surface style={styles.content}>
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <PressableFeedback
                    key={String(option.value)}
                    style={[
                      styles.item,
                      isSelected && {
                        backgroundColor: background,
                      },
                    ]}
                    onPress={() => handleSelect(option.value)}
                  >
                    <Row justify="space-between" align="center">
                      <Typography style={{ flex: 1 }}>{option.label}</Typography>

                      {isSelected ? <Icons.Check size={20} /> : null}
                    </Row>
                  </PressableFeedback>
                );
              })}
            </Surface>
          </Animated.View>
        </FullWindowOverlay>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 48,
    borderWidth: 1,
    borderCurve: "continuous",
    justifyContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
  },

  contentContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
  },

  content: {
    marginHorizontal: 24,
    gap: 8,
    maxHeight: 600,
  },

  item: {
    padding: 12,
    borderRadius: 16,
    borderCurve: "continuous",
  },
});
