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

  const { data: plants, isLoading } = useLiveQuery(["plants", "cares"], container.getPlantsWithCares, []);

  const pendingCares = React.useMemo(() => getPendingCares(plants), [plants]);

  const markAsDone = React.useCallback(
    async (item: PendingCare) => {
      try {
        await container.markCareAsDone(item.plantId, item.type);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível concluir o cuidado";
        Alert.alert("Algo deu errado", message, [{ text: "Entendi" }], getAlertOptions(dark));
      }
    },
    [dark],
  );

  const addPlant = React.useCallback(() => {
    router.push("/(modals)/add-plant");
  }, [router]);

  return { plants, isLoading, pendingCares, markAsDone, addPlant };
}
