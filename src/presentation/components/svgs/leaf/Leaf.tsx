import { Path, Svg } from "react-native-svg";

// Presentation
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import type { LeafProps } from "./types";

export function Leaf({ size = 24, color = "green500", ...props }: Readonly<LeafProps>) {
  const { theme } = useAppTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="leaf-svg">
      <Path
        d="M10.9997 20C9.24379 20.0053 7.54999 19.3505 6.25425 18.1654C4.95852 16.9803 4.1555 15.3515 4.00447 13.6021C3.85344 11.8527 4.36543 10.1104 5.43888 8.72074C6.51234 7.33112 8.06886 6.3957 9.79974 6.1C15.4997 5 16.9997 4.48 18.9997 2C19.9997 4 20.9997 6.18 20.9997 10C20.9997 15.5 16.2197 20 10.9997 20Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
