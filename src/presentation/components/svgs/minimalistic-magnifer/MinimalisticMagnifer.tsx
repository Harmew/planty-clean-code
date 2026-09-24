import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { MinimalisticMagniferProps } from "./types";

export function MinimalisticMagnifer({ size = 24, color = "green500", ...props }: Readonly<MinimalisticMagniferProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="minimalistic-magnifer-svg">
      <Path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
      />
      <Path d="M20 20L22 22" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
