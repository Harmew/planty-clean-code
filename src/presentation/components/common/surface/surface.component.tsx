import { StyleSheet, View } from "react-native";

import { useTheme } from "@presentation/hooks/use-theme";

import { createStyles } from "./styles";
import type { SurfaceProps } from "./types";

export function Surface({ children, style, wrapperStyle, ...props }: Readonly<SurfaceProps>) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={StyleSheet.compose(styles.wrapper, wrapperStyle)}>
      <View {...props} style={StyleSheet.compose(styles.base, style)}>
        {children}
      </View>
    </View>
  );
}
