// Expo Router
import { Stack } from "expo-router";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

export default function ModalsLayout() {
  const { dark } = useTheme();
  const { background } = getThemeColors(dark);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: background } }}>
      <Stack.Screen name="add-plant" />
      <Stack.Screen name="add-care" />
    </Stack>
  );
}
