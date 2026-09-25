import { PressableFeedback } from "../pressable-feedback";
import { Spinner } from "../spinner";

import { useTheme } from "@presentation/hooks/use-theme";

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
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const backgroundColor = theme.colors[color];

  return (
    <PressableFeedback
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={isIconOnly || isLoading ? "Botão de ação" : undefined}
      {...props}
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
