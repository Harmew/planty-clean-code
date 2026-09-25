import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone ChevronDown, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ChevronDown
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ChevronDownProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function ChevronDown({ size = 24, color = "green500", ...props }: Readonly<ChevronDownProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="chevron-down-svg">
      <Path
        d="M6 9L12 15L18 9"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
