import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { ArrowUpProps } from "./types";

export function ArrowUp({ size = 24, color = "green500", ...props }: Readonly<ArrowUpProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="arrow-up-svg">
      <Path
        d="M5 12L12 5L19 12"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 19V5" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
