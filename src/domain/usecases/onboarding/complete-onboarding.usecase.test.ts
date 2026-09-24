import { CompleteOnboarding } from "@domain/usecases/onboarding/complete-onboarding.usecase";

import { createOnboardingStorageMock } from "@mocks/storage/onboarding.storage.mock";

describe("complete-onboarding-usecase", () => {
  it("deve marcar o onboarding como concluído", async () => {
    const storage = createOnboardingStorageMock();
    storage.isCompleted.mockResolvedValue(false);

    const completeOnboarding = CompleteOnboarding(storage);

    await completeOnboarding();

    expect(storage.complete).toHaveBeenCalled();
  });
});
