import type { OnboardingService } from "@domain/services/onboardingService";

export const CompleteOnboarding = (service: OnboardingService) => () => service.complete();
