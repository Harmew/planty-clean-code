import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone ChevronLeft, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ChevronLeft
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ChevronLeftProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function ChevronLeft({ size = 24, color = "green500", ...props }: Readonly<ChevronLeftProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="chevron-left-svg">
      <Path
        d="M15 18L9 12L15 6"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
