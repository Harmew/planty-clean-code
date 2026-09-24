import type { Svg } from "react-native-svg";

/**
 * Propiedades do ícone UndrawWelcoming, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <UndrawWelcoming />
 * ```
 */
export type UndrawWelcomingProps = React.ComponentProps<typeof Svg> & {
  /** Altura do ícone */
  height?: number;
  /** Largura do ícone */
  width?: number;
};
