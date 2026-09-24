import { getSpinnerColor, getSpinnerSize } from "@presentation/components/common/button/functions";

describe("Button functions", () => {
  describe("getSpinnerSize", () => {
    it("deve retornar 16 para o tamanho sm", () => {
      expect(getSpinnerSize("sm")).toBe(16);
    });

    it("deve retornar 20 para o tamanho md", () => {
      expect(getSpinnerSize("md")).toBe(20);
    });

    it("deve retornar 24 para o tamanho lg", () => {
      expect(getSpinnerSize("lg")).toBe(24);
    });
  });

  describe("getSpinnerColor", () => {
    it("deve retornar branco para a cor green500", () => {
      expect(getSpinnerColor("green500")).toBe("white");
    });

    it("deve retornar green500 para outras cores", () => {
      expect(getSpinnerColor("red500")).toBe("green500");
    });
  });
});
