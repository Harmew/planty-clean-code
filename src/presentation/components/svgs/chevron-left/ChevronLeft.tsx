import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { ChevronLeftProps } from "./types";

export function ChevronLeft({ size = 24, color = "green500", ...props }: Readonly<ChevronLeftProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="chevron-left-svg">
      <Path
        d="M15 18L9 12L15 6"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
