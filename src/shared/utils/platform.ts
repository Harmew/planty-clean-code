import { Platform } from "react-native";

export const getPlatformBottomSpacing = (safeAreaBottom: number, extraSpacing: number, both: boolean) => {
  if (both) return safeAreaBottom + extraSpacing;
  return Platform.OS === "ios" ? safeAreaBottom : safeAreaBottom + extraSpacing;
};
