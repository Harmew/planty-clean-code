import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone SquareTopUp, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <SquareTopUp
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type SquareTopUpProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function SquareTopUp({ size = 24, color = "green500", ...props }: Readonly<SquareTopUpProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="square-top-up-svg">
      <Path
        d="M21 3L12 12M12 12H17.3438M12 12V6.65625"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
