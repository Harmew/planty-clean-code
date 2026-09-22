import AsyncStorage from "@react-native-async-storage/async-storage";

import type { OnboardingService } from "@domain/services/onboardingService";

const KEY = "@planty_onboarding_service_is_completed";

export const onboardingStorage: OnboardingService = {
  async isCompleted() {
    const value = await AsyncStorage.getItem(KEY);

    return value === "true";
  },

  async complete() {
    await AsyncStorage.setItem(KEY, "true");
  },
};
