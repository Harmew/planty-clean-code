import { Circle, Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { SparklesProps } from "./types";

export function Sparkles({ size = 24, color = "green500", ...props }: Readonly<SparklesProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="sparkles-svg">
      <Path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M20 2v4" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 4h-4" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="4" cy="20" r="2" stroke={theme.colors[color]} strokeWidth="1.5" fill="none" />
    </Svg>
  );
}
