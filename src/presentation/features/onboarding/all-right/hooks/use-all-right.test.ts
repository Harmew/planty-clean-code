import { act, renderHook } from "@testing-library/react-native";
import { useRouter } from "expo-router";

import { container } from "@di/container";

import { useAllRight } from "./use-all-right";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("use-all-right", () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ replace });

    jest.spyOn(container, "completeOnboarding").mockImplementation(async () => {});
  });

  it("deve concluir o onboarding", async () => {
    const { result } = await renderHook(() => useAllRight());

    await act(async () => {
      result.current.handleFinishOnboarding();
    });

    expect(container.completeOnboarding).toHaveBeenCalledTimes(1);
  });

  it("deve navegar para minhas plantas ao finalizar o onboarding", async () => {
    const { result } = await renderHook(() => useAllRight());

    await act(async () => {
      result.current.handleFinishOnboarding();
    });

    expect(replace).toHaveBeenCalledWith("/(tabs)/my-plants");
  });
});
