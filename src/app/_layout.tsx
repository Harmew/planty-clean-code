import React from "react";

import "react-native-reanimated";

import { Stack } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { enableScreens } from "react-native-screens";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync().catch(() => {});

enableScreens(true);

function Layout() {
  React.useEffect(() => {
    SystemUI.setBackgroundColorAsync("#ffffff");
  }, []);

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      {/* <Stack.Screen name="(onboarding)" /> */}
      <Stack.Screen name="notificacoes" />
      <Stack.Screen name="minha-planta" />
      <Stack.Screen name="historico-planta" />
      {/* <Stack.Screen name="(modals)" options={{ presentation: Platform.OS === "ios" ? "modal" : undefined }} /> */}
    </Stack>
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
