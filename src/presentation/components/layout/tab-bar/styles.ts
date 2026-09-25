import type { Theme } from "@shared/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const createStyles = ({ spacings, tokens, radius }: Theme) =>
  StyleSheet.create({
    container: {
      width: width - spacings[18] * 2,
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: spacings[18],
    },
    content: {
      gap: 0,
      backgroundColor: tokens.tabBackground,
      borderRadius: radius[999],
      borderCurve: "continuous",
      flexDirection: "row",
      padding: spacings[4],
      elevation: 1,
    },
    tab: {
      borderRadius: radius[999],
      borderCurve: "continuous",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacings[12],
    },
  });
