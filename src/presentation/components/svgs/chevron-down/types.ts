import type { Theme } from "@shared/theme";
import type { Svg } from "react-native-svg";

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
