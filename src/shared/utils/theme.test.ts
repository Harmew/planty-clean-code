import { getIconTextColor } from "@shared/utils/theme";

describe("get-icon-text-color", () => {
  it("deve retornar branco para o tema escuro", () => {
    expect(getIconTextColor(true)).toBe("white");
  });

  it("deve retornar preto para o tema claro", () => {
    expect(getIconTextColor(false)).toBe("black");
  });
});
