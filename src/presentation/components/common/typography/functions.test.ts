import {
  capitalize,
  getTextColor,
  transformChildren,
  transformText,
} from "@presentation/components/common/typography/functions";

import { themes } from "@shared/theme";

describe("typography-component-functions", () => {
  describe("capitalize", () => {
    it("deve capitalizar a primeira letra de cada palavra", () => {
      expect(capitalize("hello world")).toBe("Hello World");
    });

    it("deve manter espaços entre as palavras", () => {
      expect(capitalize("hello  world")).toBe("Hello  World");
    });

    it("deve retornar string vazia quando receber string vazia", () => {
      expect(capitalize("")).toBe("");
    });
  });

  describe("transformText", () => {
    it("deve transformar para uppercase", () => {
      expect(transformText("hello world", "uppercase")).toBe("HELLO WORLD");
    });

    it("deve transformar para lowercase", () => {
      expect(transformText("HELLO WORLD", "lowercase")).toBe("hello world");
    });

    it("deve transformar para capitalize", () => {
      expect(transformText("hello world", "capitalize")).toBe("Hello World");
    });

    it("não deve transformar quando for none", () => {
      expect(transformText("Hello World", "none")).toBe("Hello World");
    });
  });

  describe("transformChildren", () => {
    it("deve retornar os children sem alteração quando transform for none", () => {
      const children = "Hello World";

      expect(transformChildren(children, "none")).toBe(children);
    });

    it("deve transformar uma string", () => {
      expect(transformChildren("hello world", "uppercase")).toBe("HELLO WORLD");
    });

    it("deve transformar um número", () => {
      expect(transformChildren(123, "uppercase")).toBe("123");
    });

    it("deve transformar um array de children", () => {
      expect(transformChildren(["hello", "world"], "uppercase")).toEqual(["HELLO", "WORLD"]);
    });

    it("não deve transformar children que não sejam texto ou número", () => {
      const child = { type: "element" };

      expect(transformChildren(child as never, "uppercase")).toBe(child);
    });
  });

  describe("getTextColor", () => {
    it('deve retornar o token de texto quando a cor for "text"', () => {
      expect(getTextColor(themes.light, "text")).toBe(themes.light.tokens.text);
    });

    it("deve retornar a cor do tema quando receber uma cor específica", () => {
      expect(getTextColor(themes.light, "green500")).toBe(themes.light.colors.green500);
    });
  });
});
