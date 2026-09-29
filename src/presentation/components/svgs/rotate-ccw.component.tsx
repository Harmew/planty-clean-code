import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone RotateCCW, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <RotateCCW
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type RotateCCWProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function RotateCCW({ size = 24, color = "green500", ...props }: Readonly<RotateCCWProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="rotate-ccw-svg">
      <Path
        d="M3 12C3 13.78 3.52784 15.5201 4.51677 17.0001C5.50571 18.4802 6.91131 19.6337 8.55585 20.3149C10.2004 20.9961 12.01 21.1743 13.7558 20.8271C15.5016 20.4798 17.1053 19.6226 18.364 18.364C19.6226 17.1053 20.4798 15.5016 20.8271 13.7558C21.1743 12.01 20.9961 10.2004 20.3149 8.55585C19.6337 6.91131 18.4802 5.50571 17.0001 4.51677C15.5201 3.52784 13.78 3 12 3C9.48395 3.00947 7.06897 3.99122 5.26 5.74L3 8"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3 3V8H8" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
