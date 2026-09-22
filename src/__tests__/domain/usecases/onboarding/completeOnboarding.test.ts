import { CompleteOnboarding } from "@domain/usecases/onboarding/completeOnboarding";

describe("CompleteOnboarding", () => {
  it("deve marcar o onboarding como concluído", async () => {
    const service = {
      isCompleted: jest.fn().mockResolvedValue(false),
      complete: jest.fn().mockResolvedValue(undefined),
    };

    const completeOnboarding = CompleteOnboarding(service);

    await completeOnboarding();

    expect(service.complete).toHaveBeenCalled();
  });
});
