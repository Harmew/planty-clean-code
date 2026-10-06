import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import type { HapticsService } from "@domain/services/haptics.service";

export const hapticsService: HapticsService = {
  buttonPress() {
    if (Platform.OS === "ios") {
      void Haptics.selectionAsync();
    }
  },

  tabPress() {
    if (Platform.OS === "ios") {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },
};
