import type { Theme } from "@shared/theme";
import type { Svg } from "react-native-svg";

/**
 * Propiedades do ícone MinimalisticMagnifer, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <MinimalisticMagnifer
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type MinimalisticMagniferProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};
