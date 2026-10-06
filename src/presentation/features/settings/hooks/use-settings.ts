import React from "react";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

type SettingsAction = "export" | "import";

export function useSettings() {
  const { dark } = useTheme();

  const [action, setAction] = React.useState<SettingsAction | null>(null);

  const requestPassword = React.useCallback(
    ({ title, message }: { title: string; message: string }) =>
      new Promise<string | null>((resolve) => {
        Alert.prompt(
          title,
          message,
          [
            { text: "Cancelar", style: "cancel", onPress: () => resolve(null) },
            { text: "Confirmar", onPress: (value?: string) => resolve(value || null) },
          ],
          "secure-text",
          "",
          "default",
          getAlertOptions(dark),
        );
      }),
    [dark],
  );

  const handleOpenAppSettings = React.useCallback(() => {
    container.openAppSettings();
  }, []);

  const handleExportData = React.useCallback(async () => {
    if (action) return;

    const password = await requestPassword({
      title: "Senha do backup",
      message: "Defina uma senha para proteger o arquivo exportado. Você precisará dela para importar.",
    });

    if (!password) return;

    try {
      setAction("export");
      await container.exportBackup(password);
      setAction(null);
    } catch (error) {
      setAction(null);
      Alert.alert(
        "Algo deu errado",
        (error as Error).message ?? "Ocorreu um erro inesperado",
        [{ text: "Entendi" }],
        getAlertOptions(dark),
      );
    }
  }, [action, requestPassword, dark]);

  const handleImportData = React.useCallback(async () => {
    if (action) return;

    const password = await requestPassword({
      title: "Senha do backup",
      message: "Digite a senha usada ao exportar o backup.",
    });

    if (!password) return;

    try {
      setAction("import");
      await container.importBackup(password);
      Alert.alert(
        "Importação concluída",
        "Os dados foram importados com sucesso",
        [{ text: "Entendi" }],
        getAlertOptions(dark),
      );
      setAction(null);
    } catch (error) {
      setAction(null);
      Alert.alert(
        "Algo deu errado",
        (error as Error).message ?? "Ocorreu um erro inesperado",
        [{ text: "Entendi" }],
        getAlertOptions(dark),
      );
    }
  }, [action, dark, requestPassword]);

  return {
    isExporting: action === "export",
    isImporting: action === "import",
    handleOpenAppSettings,
    handleExportData,
    handleImportData,
  };
}
