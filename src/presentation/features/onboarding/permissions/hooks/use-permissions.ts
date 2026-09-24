import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Domain
import type { Permissions } from "@domain/models/permissions.model";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

export function usePermissions() {
  const { dark } = useTheme();
  const router = useRouter();

  const [permissions, setPermissions] = React.useState<Permissions>({
    notifications: "undetermined",
    camera: "undetermined",
    gallery: "undetermined",
  });

  const getPermissions = React.useCallback(async () => {
    const result = await container.getPermissions();
    setPermissions(result);
  }, []);

  /** Pré-carregamento das permissões ao montar o componente, para evitar que o usuário veja a tela de permissões sem saber se já concedeu ou não as permissões. */
  React.useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  // Função para solicitar permissão específica
  const requestPermission = React.useCallback(async (key: keyof Permissions) => {
    let granted = false;

    if (key === "notifications") {
      granted = await container.requestNotificationPermission();
    }

    if (key === "camera") {
      granted = await container.requestCameraPermission();
    }

    if (key === "gallery") {
      granted = await container.requestGalleryPermission();
    }

    setPermissions((prev) => ({
      ...prev,
      [key]: granted ? "granted" : "denied",
    }));
  }, []);

  const handleContinue = React.useCallback(() => {
    if (
      permissions.camera === "granted" &&
      permissions.notifications === "granted" &&
      permissions.gallery === "granted"
    ) {
      router.replace("/(onboarding)/all-right");
    } else {
      Alert.alert(
        "Permissões necessárias",
        "As permissões são necessárias como notificações, câmera e galeria para que o aplicativo funcione corretamente",
        [{ text: "Ajustes", onPress: () => container.openAppSettings() }],
        getAlertOptions(dark),
      );
    }
  }, [permissions, router, dark]);

  return {
    permissions,
    requestPermission,
    handleContinue,
  };
}
