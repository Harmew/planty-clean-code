import { renderHook } from "@testing-library/react-native";

import { container } from "@di/container";

import { createCareHistory } from "@mocks/fixtures/care-history.fixture";

import { useLiveQuery } from "./use-live-query";
import { usePlantHistory } from "./use-plant-history";

jest.mock("@di/container", () => ({
  container: {
    getCareHistoryByPlant: jest.fn(),
  },
}));

jest.mock("./use-live-query", () => ({
  useLiveQuery: jest.fn(),
}));

describe("use-plant-history", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useLiveQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it("deve buscar o histórico da planta informada", async () => {
    const history = [createCareHistory({ plantId: 1 })];

    jest.mocked(container.getCareHistoryByPlant).mockResolvedValue(history);

    await renderHook(() => usePlantHistory(1));

    const query = jest.mocked(useLiveQuery).mock.calls[0][1];

    await query();

    expect(container.getCareHistoryByPlant).toHaveBeenCalledWith(1);
  });

  it("deve retornar o histórico da planta", async () => {
    const history = [
      createCareHistory(),
      createCareHistory({
        id: 2,
        type: "fertilize",
      }),
    ];

    jest.mocked(useLiveQuery).mockReturnValue({
      data: history,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = await renderHook(() => usePlantHistory(1));

    expect(result.current.history).toEqual(history);
  });

  it("deve usar a chave da tabela de histórico", async () => {
    await renderHook(() => usePlantHistory(1));

    expect(useLiveQuery).toHaveBeenCalledWith(["care_history"], expect.any(Function), []);
  });
});
