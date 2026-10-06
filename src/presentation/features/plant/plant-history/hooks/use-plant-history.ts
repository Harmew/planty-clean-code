import React from "react";

// DI
import { container } from "@di/container";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";

// Shared

// Domain
import { CareHistory } from "@domain/entities/care-history.entity";
import { useLocalSearchParams } from "expo-router";

export function usePlantHistory() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const query = React.useCallback(() => container.getCareHistoryByPlant(Number(id)), [id]);
  const { data: history, isLoading } = useLiveQuery<CareHistory[]>(["care_history"], query, []);

  return { history, isLoading };
}
