import type { ConfigContext, ExpoConfig } from "expo/config";
import app_package from "./package.json";

/**
 * Obtém o nome do aplicativo com base na variante atual.
 * @returns O nome do aplicativo.
 */
const getAppName = () => {
  if (process.env.APP_VARIANT === "development") {
    return "Planty (development)";
  }

  if (process.env.APP_VARIANT === "preview") {
    return "Planty (preview)";
  }

  return "Planty";
};

/**
 * Obtém o ícone do aplicativo com base na variante atual.
 * @returns O caminho para o ícone do aplicativo.
 */
const getAppIcon = () => {
  if (process.env.APP_VARIANT === "development") {
    return "./assets/images/icons/icon-development.png";
  }

  if (process.env.APP_VARIANT === "preview") {
    return "./assets/images/icons/icon-preview.png";
  }

  return "./assets/images/icons/icon.png";
};

/**
 * Obtém o ícone adaptativo do aplicativo com base na variante atual.
 * - Utilizado apenas em dispositivos Android.
 * @returns O ícone adaptativo do aplicativo.
 */
const getAppAdaptiveIcon = () => {
  if (process.env.APP_VARIANT === "development") {
    return {
      foregroundImage: "./assets/images/icons/icon-development.png",
      backgroundColor: "#FFFFFF",
    };
  }

  if (process.env.APP_VARIANT === "preview") {
    return {
      foregroundImage: "./assets/images/icons/icon-preview.png",
      backgroundColor: "#FFFFFF",
    };
  }

  return {
    foregroundImage: "./assets/images/icons/icon.png",
    backgroundColor: "#FFFFFF",
  };
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: app_package.slug,
  owner: app_package.author.name,
  scheme: app_package.scheme,
  version: app_package.version,
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  assetBundlePatterns: ["**/*"],
  icon: getAppIcon(),
  ios: {
    bundleIdentifier: "com.harmew.planty",
    supportsTablet: true,
    requireFullScreen: true,
    icon: getAppIcon(),
    infoPlist: {
      CFBundleDisplayName: getAppName(),
      CFBundleName: getAppName(),
      UIBackgroundModes: ["remote-notification"],
      CFBundleURLTypes: [{ CFBundleURLSchemes: ["planty"] }],
      NSCameraUsageDescription: "Precisamos da câmera para tirar fotos das plantas.",
      NSPhotoLibraryUsageDescription: "Precisamos acessar suas fotos para adicionar imagens das plantas.",
      NSPhotoLibraryAddUsageDescription: "Salvar imagens das plantas.",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: "com.harmew.planty",
    allowBackup: false,
    adaptiveIcon: getAppAdaptiveIcon(),
    permissions: [
      "android.permission.VIBRATE",
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
      "android.permission.POST_NOTIFICATIONS",
      "android.permission.FOREGROUND_SERVICE",
    ],
    softwareKeyboardLayoutMode: "pan",
    predictiveBackGestureEnabled: false,
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "planty",
            host: "*",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  plugins: [
    "expo-router",
    "expo-sqlite",
    "expo-sharing",
    "expo-image",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/icons/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#F6F6F6",
        dark: {
          backgroundColor: "#19191D",
        },
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./assets/images/icons/notification-icon.png",
        color: "#F6F6F6",
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: true,
          enableMinifyInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
  ],
  extra: {
    APP_VARIANT: process.env.APP_VARIANT,
    eas: {
      projectId: "ed1bea6b-2577-4e0d-b1b6-751fd712514c",
    },
  },
});
