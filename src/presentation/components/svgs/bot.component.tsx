import { Path, Svg } from "react-native-svg";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import type { Theme } from "@shared/theme";

/**
 * Propiedades do ícone Bot, baseado na paleta de cores do tema.
 * @example
 * ```tsx
 * <Bot
 *   size={24}
 *   color="green500"
 * />
 * ```
 */
export type BotProps = React.ComponentProps<typeof Svg> & {
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone, baseado na paleta de cores do tema */
  color?: keyof Theme["colors"];
};

export function Bot({ size = 24, color = "green500", ...props }: Readonly<BotProps>) {
  const { theme } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} testID="bot-svg">
      <Path d="M12 8V4H8" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M18 8H6C4.89543 8 4 8.89543 4 10V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M2 14H4" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 14H22" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15 13V15" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 13V15" stroke={theme.colors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
