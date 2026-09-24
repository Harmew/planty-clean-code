import type { OnboardingStorage } from "@domain/storage/onboarding.storage";

export const IsOnboardingCompleted = (storage: OnboardingStorage) => () => storage.isCompleted();
