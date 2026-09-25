import { colors } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacings } from "./spacings";
import { fontLineHeights, fonts, fontSizes, fontWeights } from "./typography";

export interface Theme {
  colors: typeof colors;
  fontSizes: typeof fontSizes;
  fontLineHeights: typeof fontLineHeights;
  fontWeights: typeof fontWeights;
  fonts: typeof fonts;
  spacings: typeof spacings;
  radius: typeof radius;
  shadows: typeof shadows;
}
