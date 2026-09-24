import { StyleSheet } from "react-native";

import type { Theme } from "@shared/theme";

export const createStyles = ({ spacings, radius }: Theme) =>
  StyleSheet.create({
    base: {
      borderRadius: radius[26],
      borderCurve: "continuous",
      gap: spacings[8],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },

    iconOnly: {
      paddingHorizontal: 0,
      aspectRatio: 1,
    },

    sm: {
      height: 36,
      paddingHorizontal: spacings[12],
    },

    md: {
      height: 48,
      paddingHorizontal: spacings[16],
    },

    lg: {
      height: 56,
      paddingHorizontal: spacings[18],
    },
  });
