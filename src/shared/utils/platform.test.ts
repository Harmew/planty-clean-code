import { Platform } from "react-native";
import { getPlatformBottomSpacing } from "./platform";

describe("getPlatformBottomSpacing", () => {
  it("deve retornar o safe area no iOS", () => {
    Platform.OS = "ios";

    expect(getPlatformBottomSpacing(20, 18)).toBe(20);
  });

  it("deve adicionar o espaçamento extra no Android", () => {
    Platform.OS = "android";

    expect(getPlatformBottomSpacing(20, 18)).toBe(38);
  });
});
