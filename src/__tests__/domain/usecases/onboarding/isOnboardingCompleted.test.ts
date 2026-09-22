import { IsOnboardingCompleted } from "@domain/usecases/onboarding/isOnboardingCompleted";

describe("IsOnboardingCompleted", () => {
  it("deve verificar se o onboarding foi concluído", async () => {
    const service = {
      isCompleted: jest.fn().mockResolvedValue(true),
      complete: jest.fn().mockResolvedValue(undefined),
    };

    const isOnboardingCompleted = IsOnboardingCompleted(service);

    const result = await isOnboardingCompleted();

    expect(service.isCompleted).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("deve retornar false quando o onboarding não foi concluído", async () => {
    const service = {
      isCompleted: jest.fn().mockResolvedValue(false),
      complete: jest.fn().mockResolvedValue(undefined),
    };

    const isOnboardingCompleted = IsOnboardingCompleted(service);

    const result = await isOnboardingCompleted();

    expect(service.isCompleted).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
