import React from "react";
import { Dimensions, FlatList, Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut, useSharedValue, withTiming } from "react-native-reanimated";

// Presentation
import { FullWindowOverlay, Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import { useFormField } from "../form-field.component";

import type { SelectProps } from "../types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function SelectComponent<T>({
  value,
  onChange,
  options,
  placeholder = "Selecione",
  icon,
}: Readonly<SelectProps<T>>) {
  const [isOpen, setOpen] = React.useState(false);

  const { theme, dark } = useTheme();
  const { background, overlay } = getThemeColors(dark);
  const { isDisabled, isInvalid } = useFormField();

  const progress = useSharedValue<number>(0);

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

  function handlePress() {
    setOpen((previous) => !previous);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      {/* Input */}
      <Pressable
        testID="form-field-select"
        disabled={isDisabled}
        onPress={handlePress}
        style={StyleSheet.compose(styles.container, {
          borderColor,
          borderRadius: theme.radius[16],
          backgroundColor: background,
          paddingHorizontal: theme.spacings[12],
        })}
      >
        <Row align="center" flex={1}>
          <Row gap={12} align="center" style={{ flex: 1, minWidth: 0 }}>
            {icon}

            <Typography color={selectedLabel ? "text" : "gray500"} numberOfLines={1} style={{ flex: 1 }}>
              {selectedLabel ?? placeholder}
            </Typography>
          </Row>

          <Icons.ChevronDown size={20} color="gray500" />
        </Row>
      </Pressable>

      {/* Modal */}
      {isOpen ? (
        <FullWindowOverlay>
          {/* Overlay */}

          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: overlay,
            }}
          >
            <Pressable testID="form-field-select-overlay" style={StyleSheet.absoluteFill} onPress={handleClose} />
          </Animated.View>

          {/* Box */}

          <Animated.View
            pointerEvents="box-none"
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: "center",
            }}
          >
            <Surface style={{ margin: theme.spacings[18] }}>
              <FlatList
                data={options}
                keyExtractor={(item) => String(item.value)}
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: SCREEN_HEIGHT * 0.75 }}
                contentContainerStyle={{
                  gap: theme.spacings[4],
                }}
                renderItem={({ item: option }) => {
                  const isSelected = option.value === value;

                  return (
                    <Pressable
                      testID={`form-field-select-option-${String(option.value)}`}
                      style={{
                        padding: theme.spacings[12],
                        borderRadius: theme.radius[16],
                        borderCurve: "continuous",
                        backgroundColor: isSelected ? background : "transparent",
                      }}
                      onPress={() => handleSelect(option.value)}
                    >
                      <Row flex={1} justify="space-between" align="center">
                        <Typography style={{ flex: 1 }}>{option.label}</Typography>

                        {isSelected ? <Icons.Check size={20} testID="form-field-select-check" /> : null}
                      </Row>
                    </Pressable>
                  );
                }}
              />
            </Surface>
          </Animated.View>
        </FullWindowOverlay>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 1,
    borderCurve: "continuous",
    justifyContent: "center",
  },
});
