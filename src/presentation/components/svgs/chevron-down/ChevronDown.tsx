import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { ChevronDownProps } from "./types";

export function ChevronDown({ size = 24, color = "green500", ...props }: Readonly<ChevronDownProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="chevron-down-svg">
      <Path
        d="M6 9L12 15L18 9"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
