import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone ChevronRight, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ChevronRight
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ChevronRightProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function ChevronRight({ size = 24, color = "green500", ...props }: Readonly<ChevronRightProps>) {
  const { theme } = useTheme();

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
