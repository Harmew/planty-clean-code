import { StyleSheet } from "react-native";

import type { Theme } from "@shared/theme";

export const createStyles = ({ tokens }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.background,
    },
  });
