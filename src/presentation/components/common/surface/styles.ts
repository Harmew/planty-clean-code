import { StyleSheet } from "react-native";

import type { Theme } from "@shared/theme";

export const createStyles = ({ tokens, colors, spacings, radius }: Theme) =>
  StyleSheet.create({
    base: {
      padding: spacings[16],
      borderRadius: radius[26],
      backgroundColor: tokens.surface,
      gap: spacings[12],
      overflow: "hidden",
    },

    wrapper: {
      borderRadius: radius[26],
      borderCurve: "continuous",

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.04,
      shadowRadius: 4,
    },
  });
