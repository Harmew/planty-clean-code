import type { Theme } from "@shared/theme";
import type { StyleProp, ViewStyle } from "react-native";

export interface ProgressLineProps {
  /**
   * Largura total da barra
   */
  maxWidth?: number;
  /**
   * Altura da barra
   * @default 6
   */
  height?: number;
  /**
   * Porcentagem da barra preenchida
   * @default 0
   */
  percentage?: number;
  /**
   * Cor da linha ativa
   * @default "tint"
   */
  activeColor?: keyof Theme["colors"];
  /**
   * Cor da linha de fundo
   * @default "backgroundSecondary"
   */
  backgroundColor?: keyof Theme["colors"];
  /**
   * Duração da animação em ms
   * @default 300
   */
  duration?: number;
  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;
}
