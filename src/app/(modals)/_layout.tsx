// Expo Router
import { Stack } from "expo-router";

// Hooks
import { useTheme } from "@presentation/hooks/use-theme";

export default function ModalsLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.tokens.background,
        },
      }}
    >
      <Stack.Screen name="add-plant" />
      <Stack.Screen name="add-care" />
    </Stack>
  );
}
