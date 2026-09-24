import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import type { HapticsService } from "@domain/services/haptics.service";

export const hapticsService: HapticsService = {
  buttonPress() {
    if (Platform.OS === "ios") {
      Haptics.selectionAsync();
    }
  },

  tabPress() {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },
};
