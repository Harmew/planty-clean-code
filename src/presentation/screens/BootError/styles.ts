import type { Theme } from "@shared/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ spacings }: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      margin: spacings[18],
      gap: spacings[12],
    },
  });
