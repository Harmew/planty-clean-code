import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone Check, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <Check
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type CheckProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function Check({ size = 24, color = "green500", ...props }: Readonly<CheckProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="check-svg">
      <Path
        d="M20 6 9 17l-5-5"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
