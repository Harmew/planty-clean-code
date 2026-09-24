import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { ArrowLeftProps } from "./types";

export function ArrowLeft({ size = 24, color = "green500", ...props }: Readonly<ArrowLeftProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="arrow-left-svg">
      <Path
        d="M12 19L5 12L12 5"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M19 12H5" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
