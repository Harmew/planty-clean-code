// Expo Router
import { Stack } from "expo-router";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

export default function OnboardingLayout() {
  const { dark } = useTheme();
  const { background } = getThemeColors(dark);

  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{ headerShown: false, gestureEnabled: false, contentStyle: { backgroundColor: background } }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="all-right" />
    </Stack>
  );
}
