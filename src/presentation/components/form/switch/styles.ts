import { Theme } from "@shared/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    track: {
      justifyContent: "center",
      borderCurve: "continuous",
    },
    thumb: {
      backgroundColor: colors.white,
      position: "absolute",
      top: 2,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
  });
