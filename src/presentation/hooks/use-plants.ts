import { addDatabaseChangeListener } from "expo-sqlite";
import React from "react";

import { container } from "@di/container";

import type { Plant } from "@domain/entities/plant.entity";

export function usePlants() {
  const [plants, setPlants] = React.useState<Plant[]>([]);

  const getPlants = React.useCallback(async () => {
    const result = await container.getPlants();

    setPlants(result);
  }, []);

  React.useEffect(() => {
    getPlants();

    const subscription = addDatabaseChangeListener(({ tableName }) => {
      if (tableName === "plants") {
        getPlants();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [getPlants]);

  return {
    plants,
  };
}
