import type { Theme } from "@shared/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ spacings }: Theme) =>
  StyleSheet.create({
    container: {
      gap: spacings[12],
      marginHorizontal: spacings[18],
    },
  });
