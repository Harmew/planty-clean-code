import { PressableFeedback } from "../pressable-feedback";
import { Spinner } from "../spinner";

import { useAppTheme } from "@presentation/hooks/useAppTheme";

import { createStyles } from "./styles";

import { getSpinnerColor, getSpinnerSize } from "./functions";
import type { ButtonProps } from "./types";

export function Button({
  children,
  color = "green500",
  size = "md",
  disabled = false,
  isIconOnly = false,
  isLoading = false,
  style,
  ...props
}: Readonly<ButtonProps>) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const backgroundColor = theme.colors[color];

  return (
    <PressableFeedback
      {...props}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={isIconOnly || isLoading ? "Botão de ação" : undefined}
      style={[
        styles.base,
        styles[size],
        isIconOnly && styles.iconOnly,
        {
          backgroundColor,
          opacity: disabled ? 0.8 : 1,
        },
        style,
      ]}
    >
      {isLoading ? <Spinner size={getSpinnerSize(size)} color={getSpinnerColor(color)} /> : children}
    </PressableFeedback>
  );
}
