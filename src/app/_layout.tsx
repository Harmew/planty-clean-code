import React from "react";

// React Native Reanimated
import "react-native-reanimated";

// React Native Screens
import { enableScreens } from "react-native-screens";

// Expo Router
import { Stack } from "expo-router";

// Splash Screen
import * as SplashScreen from "expo-splash-screen";

// Expo Status Bar
import { StatusBar } from "expo-status-bar";

// React Native Gesture Handler
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Keyboard Controller
import { KeyboardProvider } from "react-native-keyboard-controller";

// React Native Safe Area Context
import { SafeAreaProvider } from "react-native-safe-area-context";

// Services
import { initializeApp } from "@bootstrap/initializeApp";

// Hooks
import { useAppTheme } from "@presentation/hooks/useAppTheme";

// Screens
import { BootErrorScreen } from "@presentation/screens/BootError";

/**
 * Previne o auto-hide da SplashScreen até que a aplicação esteja pronta
 */
SplashScreen.preventAutoHideAsync().catch(() => {});

/**
 * Habilita as telas nativas para melhorar a performance da navegação
 */
enableScreens(true);

function Layout() {
  const { theme, dark } = useAppTheme();

  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const initialize = async () => {
      try {
        /** Aqui é o ponto de inicialização do app, onde podemos colocar todas as funções que precisam ser executadas antes do app ser renderizado. */
        await initializeApp();
        await SplashScreen.hideAsync();
        setIsReady(true);
      } catch (error) {
        setError(error as Error);
        await SplashScreen.hideAsync().catch(() => {});
      }
    };

    initialize();
  }, []);

  if (error) {
    return <BootErrorScreen error={error} />;
  }

  if (!isReady) {
    return null; // Renderiza o splash screen enquanto carrega
  }

  return (
    <>
      <StatusBar style={dark ? "light" : "dark"} />

      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.tokens.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notificacoes" />
        <Stack.Screen name="minha-planta" />
        <Stack.Screen name="historico-planta" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Layout />
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
