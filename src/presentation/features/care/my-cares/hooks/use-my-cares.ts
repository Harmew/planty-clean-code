import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

import { getPendingCares, type PendingCare } from "../utils/pending-cares";

export function useMyCares() {
  const router = useRouter();
  const { dark } = useTheme();

  const query = React.useCallback(() => container.getPlantsWithCares(), []);
  const { data: plants } = useLiveQuery(["plants", "cares"], query, []);

  const pendingCares = React.useMemo(() => getPendingCares(plants), [plants]);

  const markAsDone = React.useCallback(
    async (item: PendingCare) => {
      try {
        await container.markCareAsDone(item.plantId, item.type);
      } catch (error) {
        Alert.alert(
          "Algo deu errado",
          (error as Error).message ?? "Não foi possível concluir o cuidado",
          [{ text: "Entendi" }],
          getAlertOptions(dark),
        );
      }
    },
    [dark],
  );

  const handleAddPlant = React.useCallback(() => {
    router.push("/(modals)/add-plant");
  }, [router]);

  return { plants, pendingCares, markAsDone, handleAddPlant };
}
