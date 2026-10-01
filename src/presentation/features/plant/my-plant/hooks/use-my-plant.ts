import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

export function useMyPlant() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { dark } = useTheme();

  const router = useRouter();

  const query = React.useCallback(() => container.getPlantByIdWithCares(Number(id)), [id]);
  const { data: plantWithCares } = useLiveQuery(["plants", "cares"], query, null);

  const deletePlant = React.useCallback(async () => {
    try {
      await container.deletePlant(Number(id));
      router.back();
    } catch (error) {
      Alert.alert("Algo deu errado", (error as Error).message, [{ text: "Entendi" }], getAlertOptions(dark));
    }
  }, [id, router, dark]);

  const handleDeletePlant = React.useCallback(() => {
    if (!plantWithCares) return;

    Alert.alert(
      "Excluir planta",
      `Tem certeza que deseja excluir a planta "${plantWithCares.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: deletePlant },
      ],
      getAlertOptions(dark),
    );
  }, [plantWithCares, deletePlant, dark]);

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

  const handleOpenHistory = React.useCallback(() => {
    router.push({
      pathname: "/plant-history",
      params: { id: id },
    });
  }, [router, id]);

  return {
    plantWithCares,
    handleEditPlant,
    handleUpdateCares,
    handleDeletePlant,
    handleOpenHistory,
  };
}
