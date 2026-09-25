import React from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import { useFormField } from "./form-field.component";
import { InputProps } from "./types";

export const InputComponent = React.forwardRef<TextInput, InputProps>(
  ({ isDisabled: localDisabled, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const { theme, dark } = useTheme();
    const { background } = getThemeColors(dark);

    const { isDisabled: contextIsDisabled } = useFormField();

    const isDisabled = localDisabled ?? contextIsDisabled ?? false;

    const borderColor = isFocused ? theme.colors.green500 : background;

    function handleFocus(event: Parameters<NonNullable<TextInputProps["onFocus"]>>[0]) {
      setIsFocused(true);
      onFocus?.(event);
    }

    function handleBlur(event: Parameters<NonNullable<TextInputProps["onBlur"]>>[0]) {
      setIsFocused(false);
      onBlur?.(event);
    }

    return (
      <TextInput
        ref={ref}
        {...props}
        editable={!isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={theme.colors.gray500}
        selectionColor={theme.colors.green500}
        style={StyleSheet.compose(
          { height: 56, borderWidth: 1, borderCurve: "continuous", backgroundColor: background, borderColor },
          style,
        )}
      />
    );
  },
);

InputComponent.displayName = "FormField.Input";
