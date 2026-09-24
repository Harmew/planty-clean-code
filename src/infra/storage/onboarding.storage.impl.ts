import AsyncStorage from "@react-native-async-storage/async-storage";

import type { OnboardingStorage } from "@domain/storage/onboarding.storage";

const KEY = "@planty_onboarding_storage_is_completed";

export const onboardingStorage: OnboardingStorage = {
  async isCompleted() {
    const value = await AsyncStorage.getItem(KEY);

    return value === "true";
  },

  async complete() {
    await AsyncStorage.setItem(KEY, "true");
  },
};
