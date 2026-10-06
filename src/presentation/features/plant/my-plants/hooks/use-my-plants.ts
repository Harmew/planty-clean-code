import { useRouter } from "expo-router";
import React from "react";

// DI
import { container } from "@di/container";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";

export function useMyPlants() {
  const router = useRouter();

  const query = React.useCallback(() => container.getPlants(), []);
  const { data: plants } = useLiveQuery(["plants"], query, []);

  const handleAddPlant = React.useCallback(() => router.push("/(modals)/add-plant"), [router]);

  const handleOpenNotifications = React.useCallback(() => router.push("/notifications"), [router]);

  const handleOpenDetails = React.useCallback(
    (id: number) =>
      router.push({
        pathname: "/my-plant",
        params: { id },
      }),
    [router],
  );

  return {
    plants,
    handleAddPlant,
    handleOpenNotifications,
    handleOpenDetails,
  };
}
