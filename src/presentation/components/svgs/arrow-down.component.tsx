import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shred
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone ArrowDown, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ArrowDown
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ArrowDownProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function ArrowDown({ size = 24, color = "green500", ...props }: Readonly<ArrowDownProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="arrow-down-svg">
      <Path d="M12 5V19" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M19 12L12 19L5 12"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
