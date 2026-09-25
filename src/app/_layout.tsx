import React from "react";

// React Native
import { Platform } from "react-native";

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
import { initializeApp } from "@bootstrap/initialize-app";

// Hooks
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

// Screens
import { BootErrorScreen } from "@presentation/features/startup/boot-error/boot-error.component";
import { useAndroidBackHandler } from "@presentation/hooks/use-android-back-handler";

/**
 * Previne o auto-hide da SplashScreen até que a aplicação esteja pronta
 */
SplashScreen.preventAutoHideAsync().catch(() => {});

/**
 * Habilita as telas nativas para melhorar a performance da navegação
 */
enableScreens(true);

function Layout() {
  const { dark } = useTheme();
  const { background } = getThemeColors(dark);
  useAndroidBackHandler();

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
          contentStyle: { backgroundColor: background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="my-plant" />
        <Stack.Screen name="plant-history" />
        <Stack.Screen name="(modals)" options={{ presentation: Platform.OS === "ios" ? "modal" : undefined }} />
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
