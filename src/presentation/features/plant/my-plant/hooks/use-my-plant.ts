import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { usePlant } from "@presentation/hooks/use-plant";
import { usePlantCares } from "@presentation/hooks/use-plant-cares";
import { usePlantHistory } from "@presentation/hooks/use-plant-history";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

export function useMyPlant() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { dark } = useTheme();

  const router = useRouter();

  const { plant } = usePlant(Number(id));
  const { cares } = usePlantCares(Number(id));
  const { history } = usePlantHistory(Number(id));

  const deletePlant = React.useCallback(async () => {
    try {
      await container.deletePlant(Number(id));
      router.back();
    } catch (error) {
      Alert.alert("Algo deu errado", (error as Error).message, [{ text: "Entendi" }], getAlertOptions(dark));
    }
  }, [id, router, dark]);

  const handleEditPlant = React.useCallback(() => {
    router.push({
      pathname: "/(modals)/edit-plant",
      params: { id },
    });
  }, [router, id]);

  const handleUpdateCares = React.useCallback(() => {
    router.push({
      pathname: "/(modals)/update-cares",
      params: { id },
    });
  }, [router, id]);

  const handleDeletePlant = React.useCallback(() => {
    if (!plant) return;

    Alert.alert(
      "Excluir planta",
      `Tem certeza que deseja excluir a planta "${plant.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: deletePlant },
      ],
      getAlertOptions(dark),
    );
  }, [plant, deletePlant, dark]);

  return { plant, cares, history, handleEditPlant, handleUpdateCares, handleDeletePlant };
}
