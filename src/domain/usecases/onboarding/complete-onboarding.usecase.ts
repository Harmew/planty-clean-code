import type { OnboardingStorage } from "@domain/storage/onboarding.storage";

export const CompleteOnboarding = (storage: OnboardingStorage) => () => storage.complete();
