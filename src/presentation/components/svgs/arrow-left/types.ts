import type { Theme } from "@shared/theme";
import type { Svg } from "react-native-svg";

/**
 * Propiedades do ícone ArrowLeft, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <ArrowLeft
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type ArrowLeftProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};
