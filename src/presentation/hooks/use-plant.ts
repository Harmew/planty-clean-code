import React from "react";

// DI
import { container } from "@di/container";

import { useLiveQuery } from "./use-live-query";

export function usePlant(plantId: number) {
  const query = React.useCallback(() => container.getPlantById(plantId), [plantId]);

  const { data: plant, isLoading } = useLiveQuery(["plants"], query, null);

  return {
    plant,
    isLoading,
  };
}
