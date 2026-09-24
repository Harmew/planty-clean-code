import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import { hapticsService } from "@infra/haptics/expoHapticsServiceImpl";

jest.mock("expo-haptics", () => ({
  selectionAsync: jest.fn(),
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
  },
}));

describe("hapticsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("buttonPress", () => {
    it("deve executar feedback de seleção no iOS", () => {
      Object.defineProperty(Platform, "OS", {
        configurable: true,
        value: "ios",
      });

      hapticsService.buttonPress();

      expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
    });

    it("não deve executar feedback no Android", () => {
      Object.defineProperty(Platform, "OS", {
        configurable: true,
        value: "android",
      });

      hapticsService.buttonPress();

      expect(Haptics.selectionAsync).not.toHaveBeenCalled();
    });
  });

  describe("tabPress", () => {
    it("deve executar impacto leve no iOS", () => {
      Object.defineProperty(Platform, "OS", {
        configurable: true,
        value: "ios",
      });

      hapticsService.tabPress();

      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    });

    it("não deve executar impacto no Android", () => {
      Object.defineProperty(Platform, "OS", {
        configurable: true,
        value: "android",
      });

      hapticsService.tabPress();

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });
});
