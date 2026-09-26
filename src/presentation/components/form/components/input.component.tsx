import React from "react";
import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import { useFormField } from "../form-field.component";
import type { InputProps } from "../types";

const INPUT_ICON_SIZE = 20;
const INPUT_ICON_SPACING = 12;

export const InputComponent = React.forwardRef<TextInput, InputProps>(
  ({ prefix, suffix, onFocus, onBlur, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const { theme, dark } = useTheme();
    const { background, text } = getThemeColors(dark);
    const { isDisabled, isInvalid } = useFormField();

    let borderColor: string = background;

    if (isInvalid) {
      borderColor = theme.colors.red500;
    } else if (isFocused) {
      borderColor = theme.colors.green500;
    }

    const selectionColor = isInvalid ? theme.colors.red500 : theme.colors.green500;

    function handleFocus(event: Parameters<NonNullable<TextInputProps["onFocus"]>>[0]) {
      setIsFocused(true);
      onFocus?.(event);
    }

    function handleBlur(event: Parameters<NonNullable<TextInputProps["onBlur"]>>[0]) {
      setIsFocused(false);
      onBlur?.(event);
    }

    return (
      <View style={styles.container} testID="form-field-input-container">
        {/* Prefixo */}
        {prefix ? (
          <View
            pointerEvents="none"
            style={StyleSheet.compose(styles.icon, { left: INPUT_ICON_SPACING })}
            testID="form-field-input-prefix"
          >
            {prefix}
          </View>
        ) : null}

        {/* Input */}
        <TextInput
          ref={ref}
          testID="form-field-input"
          {...props}
          editable={!isDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={theme.colors.gray500}
          selectionColor={selectionColor}
          style={StyleSheet.compose(
            {
              height: 48,
              borderWidth: 1,
              borderRadius: theme.radius[16],
              borderCurve: "continuous",
              backgroundColor: background,
              paddingHorizontal: theme.spacings[12],
              fontSize: theme.fontSizes[16],
              color: text,
              paddingLeft: prefix ? INPUT_ICON_SIZE + INPUT_ICON_SPACING * 2 : theme.spacings[12],
              paddingRight: suffix ? INPUT_ICON_SIZE + INPUT_ICON_SPACING * 2 : theme.spacings[12],
              borderColor,
            },
            style,
          )}
        />

        {/* Sufixo */}
        {suffix ? (
          <View
            pointerEvents="none"
            style={StyleSheet.compose(styles.icon, { right: INPUT_ICON_SPACING })}
            testID="form-field-input-suffix"
          >
            {suffix}
          </View>
        ) : null}
      </View>
    );
  },
);

InputComponent.displayName = "FormField.Input";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    zIndex: 1,
    position: "absolute",
    width: INPUT_ICON_SIZE,
    height: INPUT_ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});
