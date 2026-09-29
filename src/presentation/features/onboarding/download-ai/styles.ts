import type { Theme } from "@shared/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ spacings }: Theme) =>
  StyleSheet.create({
    container: {
      margin: spacings[18],
      gap: spacings[12],
    },
    content: {
      flex: 1,
      gap: spacings[20],
      justifyContent: "center",
    },
  });
