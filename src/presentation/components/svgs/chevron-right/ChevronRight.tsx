import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { ChevronRightProps } from "./types";

export function ChevronRight({ size = 24, color = "green500", ...props }: Readonly<ChevronRightProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="chevron-right-svg">
      <Path
        d="M9 18L15 12L9 6"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
