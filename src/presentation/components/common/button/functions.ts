import type { ButtonColor, ButtonSize } from "./types";

export function getSpinnerSize(size: ButtonSize) {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  } as const;

  return sizes[size];
}

export function getSpinnerColor(color: ButtonColor): ButtonColor {
  if (color === "green500") {
    return "white";
  }
  return "green500";
}
