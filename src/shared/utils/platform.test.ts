import { Platform } from "react-native";
import { getPlatformBottomSpacing } from "./platform";

describe("getPlatformBottomSpacing", () => {
  it("deve retornar o safe area no iOS", () => {
    Platform.OS = "ios";

    expect(getPlatformBottomSpacing(20, 18, false)).toBe(20);
  });

  it("deve adicionar o espaçamento extra no Android", () => {
    Platform.OS = "android";

    expect(getPlatformBottomSpacing(20, 18, false)).toBe(38);
  });

  it("deve adicionar o espaçamento extra em ambas as plataformas quando both for true", () => {
    Platform.OS = "ios";

    expect(getPlatformBottomSpacing(20, 18, true)).toBe(38);

    Platform.OS = "android";

    expect(getPlatformBottomSpacing(20, 18, true)).toBe(38);
  });
});
