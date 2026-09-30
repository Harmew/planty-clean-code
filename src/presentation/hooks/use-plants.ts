import React from "react";

// DI
import { container } from "@di/container";

import { useLiveQuery } from "./use-live-query";

export function usePlants() {
  const query = React.useCallback(() => container.getPlants(), []);

  const { data: plants, isLoading, error } = useLiveQuery(["plants"], query, []);

  return {
    plants,
    isLoading,
    error,
  };
}
