import { Platform } from "react-native";

export const getPlatformBottomSpacing = (safeAreaBottom: number, extraSpacing: number) =>
  Platform.OS === "ios" ? safeAreaBottom : safeAreaBottom + extraSpacing;
