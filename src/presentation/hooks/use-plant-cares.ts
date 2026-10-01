import React from "react";

// DI
import { container } from "@di/container";

import { useLiveQuery } from "./use-live-query";

export function usePlantCares(plantId: number) {
  const query = React.useCallback(() => container.getCaresByPlant(plantId), [plantId]);

  const { data: cares, isLoading } = useLiveQuery(["cares"], query, []);

  return {
    cares,
    isLoading,
  };
}
