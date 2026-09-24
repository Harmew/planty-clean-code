import { Redirect } from "expo-router";
import React from "react";

// DI
import { container } from "@di/container";

// Presentation
import { LaunchScreen } from "@presentation/features/startup/launch/launch.component";
import { useMinimumDelay } from "@presentation/hooks/use-minimum-delay";

export default function Index() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await container.isOnboardingCompleted();

      setIsOnboardingCompleted(completed);
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  // Segura animação até dar tempo
  const canNavigate = useMinimumDelay(!isLoading, 1800);

  // 1. Animação de carregamento (LaunchScreen)
  if (!canNavigate) {
    return <LaunchScreen />;
  }

  // 2. Onboarding
  if (!isOnboardingCompleted) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)/my-plants" />;
}
