import React from "react";

// DI
import { container } from "@di/container";

import { useLiveQuery } from "./use-live-query";

export function usePlantHistory(plantId: number) {
  const query = React.useCallback(() => container.getCareHistoryByPlant(plantId), [plantId]);

  const { data: history } = useLiveQuery(["care_history"], query, []);

  return {
    history,
  };
}
