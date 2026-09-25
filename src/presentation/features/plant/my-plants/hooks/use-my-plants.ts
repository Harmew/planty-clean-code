import { useRouter } from "expo-router";
import React from "react";

export function useMyPlants() {
  const router = useRouter();

  const openAddPlant = React.useCallback(() => router.push("/(modals)/add-plant"), [router]);

  const openNotifications = React.useCallback(() => router.push("/notifications"), [router]);

  const openDetails = React.useCallback(
    (id: number) => router.push({ pathname: "/my-plant", params: { id } }),
    [router],
  );

  return {
    openNotifications,
    openDetails,
    openAddPlant,
  };
}
