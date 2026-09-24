import type { Theme } from "@shared/theme";
import type { Svg } from "react-native-svg";

/**
 * Propiedades do ícone SquareTopDown, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <SquareTopDown
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type SquareTopDownProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};
