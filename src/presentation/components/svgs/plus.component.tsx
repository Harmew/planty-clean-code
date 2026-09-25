import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone Plus, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <Plus
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type PlusProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function Plus({ size = 24, color = "green500", ...props }: Readonly<PlusProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="plus-svg">
      <Path d="M5 12H19" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 5V19" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
