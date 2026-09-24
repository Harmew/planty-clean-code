import { StyleSheet } from "react-native";

import type { Theme } from "@shared/theme";

import type { TextAlign } from "./types";

export const createStyles = (
  theme: Theme,
  size: keyof Theme["fontSizes"],
  weight: keyof Theme["fontWeights"],
  align: TextAlign,
) =>
  StyleSheet.create({
    text: {
      fontSize: theme.fontSizes[size],
      lineHeight: theme.fontLineHeights[size],
      fontWeight: theme.fontWeights[weight],
      textAlign: align,
    },
  });
