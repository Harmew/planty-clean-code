import { useRouter } from "expo-router";
import React from "react";

// DI
import { container } from "@di/container";

export function useAllRight() {
  const router = useRouter();

  const handleFinishOnboarding = React.useCallback(() => {
    container.completeOnboarding();
    router.replace("/(tabs)/my-plants");
  }, [router]);

  return {
    handleFinishOnboarding,
  };
}
