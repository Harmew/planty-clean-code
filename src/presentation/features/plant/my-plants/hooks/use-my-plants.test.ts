import { renderHook } from "@testing-library/react-native";

import { useRouter } from "expo-router";

import { useMyPlants } from "./use-my-plants";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("use-my-plants-hook", () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("deve navegar para adicionar planta", async () => {
    const { result } = await renderHook(() => useMyPlants());

    result.current.openAddPlant();

    expect(push).toHaveBeenCalledWith("/(modals)/add-plant");
  });

  it("deve navegar para notificações", async () => {
    const { result } = await renderHook(() => useMyPlants());

    result.current.openNotifications();

    expect(push).toHaveBeenCalledWith("/notifications");
  });

  it("deve navegar para os detalhes da planta", async () => {
    const { result } = await renderHook(() => useMyPlants());

    result.current.openDetails(123);

    expect(push).toHaveBeenCalledWith({
      pathname: "/my-plant",
      params: {
        id: 123,
      },
    });
  });
});
