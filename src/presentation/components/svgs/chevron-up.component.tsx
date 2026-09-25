import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone ChevronUp, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ChevronUp
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ChevronUpProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function ChevronUp({ size = 24, color = "green500", ...props }: Readonly<ChevronUpProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="chevron-up-svg">
      <Path
        d="M18 15L12 9L6 15"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
