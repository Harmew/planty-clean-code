import { renderHook } from "@testing-library/react-native";

import { useRouter } from "expo-router";

import { useLiveQuery } from "@presentation/hooks/use-live-query";
import { useMyPlants } from "./use-my-plants";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@presentation/hooks/use-live-query", () => ({
  useLiveQuery: jest.fn(),
}));

describe("use-my-plants-hook", () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as ReturnType<typeof useRouter>);

    jest.mocked(useLiveQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it("deve navegar para adicionar planta", async () => {
    const { result } = await renderHook(() => useMyPlants());

    result.current.handleAddPlant();

    expect(push).toHaveBeenCalledWith("/(modals)/add-plant");
  });

  it("deve navegar para notificações", async () => {
    const { result } = await renderHook(() => useMyPlants());

    result.current.handleOpenNotifications();

    expect(push).toHaveBeenCalledWith("/notifications");
  });

  it("deve navegar para os detalhes da planta", async () => {
    const { result } = await renderHook(() => useMyPlants());

    result.current.handleOpenDetails(123);

    expect(push).toHaveBeenCalledWith({
      pathname: "/my-plant",
      params: {
        id: 123,
      },
    });
  });
});
