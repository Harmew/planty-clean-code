import { withAlpha } from "@shared/utils/color";

describe("withAlpha", () => {
  it("deve adicionar 50% de opacidade ao hexadecimal", () => {
    expect(withAlpha("#000000", 0.5)).toBe("#00000080");
  });

  it("deve adicionar 100% de opacidade", () => {
    expect(withAlpha("#FFFFFF", 1)).toBe("#FFFFFFff");
  });

  it("deve adicionar 0% de opacidade", () => {
    expect(withAlpha("#FFFFFF", 0)).toBe("#FFFFFF00");
  });

  it("deve converter corretamente valores intermediários de opacidade", () => {
    expect(withAlpha("#FF0000", 0.56)).toBe("#FF00008f");
  });
});
