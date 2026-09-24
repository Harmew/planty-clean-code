// Expo Router
import { Stack } from "expo-router";

// Hooks
import { useTheme } from "@presentation/hooks/use-theme";

export default function OnboardingLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
        /** Desabilita o gesto de voltar ao arrastar */
        gestureEnabled: false,
        contentStyle: {
          backgroundColor: theme.tokens.background,
        },
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="all-right" />
    </Stack>
  );
}
