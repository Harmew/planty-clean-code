import { useColorScheme } from "react-native";

import type { Theme } from "@shared/theme";
import { themes } from "@shared/theme";

export interface AppTheme {
  dark: boolean;
  theme: Theme;
}

export function useAppTheme(): AppTheme {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  return {
    dark,
    theme: dark ? themes.dark : themes.light,
  };
}
