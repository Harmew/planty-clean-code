import type { OnboardingService } from "@domain/services/onboardingService";

export const IsOnboardingCompleted = (service: OnboardingService) => () => service.isCompleted();
