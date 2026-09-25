import { colors } from "@shared/theme/colors";
import { withAlpha } from "@shared/utils/color";

import { getIconTextColor, getSurfaceColor, getThemeColors } from "./theme";

describe("get-icon-text-color", () => {
  it("deve retornar branco para o tema escuro", () => {
    expect(getIconTextColor(true)).toBe("white");
  });

  it("deve retornar preto para o tema claro", () => {
    expect(getIconTextColor(false)).toBe("black");
  });
});

describe("get-surface-color", () => {
  it("deve retornar gray800 para o tema escuro", () => {
    expect(getSurfaceColor(true)).toBe("gray800");
  });

  it("deve retornar white para o tema claro", () => {
    expect(getSurfaceColor(false)).toBe("white");
  });
});

describe("get-theme-colors", () => {
  it("deve retornar as cores do tema claro", () => {
    expect(getThemeColors(false)).toEqual({
      background: colors.gray100,
      backgroundSecondary: colors.gray300,
      surface: colors.white,
      surfaceDisabled: colors.gray300,
      text: colors.gray900,
      overlay: withAlpha(colors.black, 0.5),
      tabBackground: colors.white,
      tabIcon: colors.gray500,
    });
  });
  it("deve retornar as cores do tema escuro", () => {
    expect(getThemeColors(true)).toEqual({
      background: colors.gray900,
      backgroundSecondary: colors.gray700,
      surface: colors.gray800,
      surfaceDisabled: colors.gray700,
      text: colors.gray100,
      overlay: withAlpha(colors.black, 0.56),
      tabBackground: colors.gray800,
      tabIcon: colors.gray100,
    });
  });
});
