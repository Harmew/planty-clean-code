import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone Thermometer, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <Thermometer
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ThermometerProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function Thermometer({ size = 24, color = "green500", ...props }: Readonly<ThermometerProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="thermometer-svg">
      <Path
        d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
