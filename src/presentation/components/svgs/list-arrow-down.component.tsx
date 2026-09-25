import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone ListArrowDown, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ListArrowDown
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ListArrowDownProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function ListArrowDown({ size = 24, color = "green500", ...props }: Readonly<ListArrowDownProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="list-arrow-down-svg">
      <Path
        d="M15 17.5L17.5 20M17.5 20L20 17.5M17.5 20V14"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M21 6H3" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M21 10H3" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M11 14H3" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M11 18H3" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
