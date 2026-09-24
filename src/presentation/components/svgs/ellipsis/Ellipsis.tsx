import { Circle, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { EllipsisProps } from "./types";

export function Ellipsis({ size = 24, color = "green500", ...props }: Readonly<EllipsisProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="ellipsis-svg">
      <Circle
        cx="12"
        cy="12"
        r="1"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="19"
        cy="12"
        r="1"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="5"
        cy="12"
        r="1"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
