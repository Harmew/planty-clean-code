import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { ArrowDownProps } from "./types";

export function ArrowDown({ size = 24, color = "green500", ...props }: Readonly<ArrowDownProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="arrow-down-svg">
      <Path d="M12 5V19" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M19 12L12 19L5 12"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
