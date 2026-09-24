// Expo Router
import { Stack } from "expo-router";

// Hooks
import { useAppTheme } from "@presentation/hooks/useAppTheme";

export default function OnboardingLayout() {
  const { theme } = useAppTheme();

  return (
    <Stack
      initialRouteName="bem-vindo"
      screenOptions={{
        headerShown: false,
        /** Desabilita o gesto de voltar ao arrastar */
        gestureEnabled: false,
        contentStyle: {
          backgroundColor: theme.tokens.background,
        },
      }}
    >
      <Stack.Screen name="bem-vindo" />
      <Stack.Screen name="permissoes" />
      <Stack.Screen name="tudo-certo" />
    </Stack>
  );
}
