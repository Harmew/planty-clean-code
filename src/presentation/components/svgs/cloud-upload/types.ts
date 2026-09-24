import type { Theme } from "@shared/theme";
import type { Svg } from "react-native-svg";

/**
 * Propiedades do ícone CloudUpload, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <CloudUpload
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type CloudUploadProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};
