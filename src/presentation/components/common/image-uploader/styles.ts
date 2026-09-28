import type { Theme } from "@shared/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ spacings, radius }: Theme) =>
  StyleSheet.create({
    container: {
      height: 48,
      borderRadius: radius[16],
      borderCurve: "continuous",
    },

    imageContainer: {
      position: "relative",
      alignSelf: "center",
      width: 160,
      height: 160,
    },

    image: {
      flex: 1,
      borderCurve: "continuous",
      borderRadius: radius[16],
    },

    deleteIcon: {
      position: "absolute",
      right: -8,
      top: -8,
      zIndex: 10,
    },

    loadingOverlay: {
      ...StyleSheet.absoluteFill,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      gap: spacings[8],
      paddingHorizontal: spacings[18],
    },
  });
