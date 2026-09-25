import { useColorScheme } from "react-native";

import type { Theme } from "@shared/theme";
import { theme } from "@shared/theme";

export interface AppTheme {
  dark: boolean;
  theme: Theme;
}

export function useTheme(): AppTheme {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  return { dark, theme };
}
