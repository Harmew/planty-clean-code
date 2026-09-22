import AsyncStorage from "@react-native-async-storage/async-storage";

import { onboardingStorage } from "@infra/storage/onboardingStorageImpl";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("onboardingStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("isCompleted", () => {
    it("deve retornar true quando o onboarding estiver concluído", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue("true");

      const result = await onboardingStorage.isCompleted();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@planty_onboarding_service_is_completed");
      expect(result).toBe(true);
    });

    it("deve retornar false quando o onboarding não estiver concluído", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await onboardingStorage.isCompleted();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@planty_onboarding_service_is_completed");
      expect(result).toBe(false);
    });

    it("deve retornar false quando o valor armazenado não for true", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue("false");

      const result = await onboardingStorage.isCompleted();

      expect(result).toBe(false);
    });
  });

  describe("complete", () => {
    it("deve marcar o onboarding como concluído", async () => {
      await onboardingStorage.complete();

      expect(AsyncStorage.setItem).toHaveBeenCalledWith("@planty_onboarding_service_is_completed", "true");
    });
  });
});
