import { IsOnboardingCompleted } from "@domain/usecases/onboarding/is-onboarding-completed.usecase";

import { createOnboardingStorageMock } from "@mocks/storage/onboarding.storage.mock";

describe("is-onboarding-completed-usecase", () => {
  it("deve verificar se o onboarding foi concluído", async () => {
    const storage = createOnboardingStorageMock();
    storage.isCompleted.mockResolvedValue(true);

    const isOnboardingCompleted = IsOnboardingCompleted(storage);

    const result = await isOnboardingCompleted();

    expect(storage.isCompleted).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("deve retornar false quando o onboarding não foi concluído", async () => {
    const storage = createOnboardingStorageMock();
    storage.isCompleted.mockResolvedValue(false);

    const isOnboardingCompleted = IsOnboardingCompleted(storage);

    const result = await isOnboardingCompleted();

    expect(storage.isCompleted).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
