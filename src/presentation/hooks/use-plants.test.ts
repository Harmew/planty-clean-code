import { renderHook } from "@testing-library/react-native";

import { container } from "@di/container";

import { createPlant } from "@mocks/fixtures/plant.fixture";

import { useLiveQuery } from "./use-live-query";
import { usePlants } from "./use-plants";

jest.mock("@di/container", () => ({
  container: {
    getPlants: jest.fn(),
  },
}));

jest.mock("./use-live-query", () => ({
  useLiveQuery: jest.fn(),
}));

describe("use-plants", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useLiveQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it("deve buscar as plantas", async () => {
    const plants = [createPlant({ id: 1 }), createPlant({ id: 2 })];

    jest.mocked(container.getPlants).mockResolvedValue(plants);

    await renderHook(() => usePlants());

    const query = jest.mocked(useLiveQuery).mock.calls[0][1];

    await query();

    expect(container.getPlants).toHaveBeenCalledTimes(1);
  });

  it("deve retornar as plantas", async () => {
    const plants = [createPlant({ id: 1 }), createPlant({ id: 2 })];

    jest.mocked(useLiveQuery).mockReturnValue({
      data: plants,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = await renderHook(() => usePlants());

    expect(result.current.plants).toEqual(plants);
  });

  it("deve retornar o estado de carregamento", async () => {
    jest.mocked(useLiveQuery).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = await renderHook(() => usePlants());

    expect(result.current.isLoading).toBe(true);
  });

  it("deve retornar o erro", async () => {
    const error = new Error("Erro ao buscar plantas");

    jest.mocked(useLiveQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error,
      refetch: jest.fn(),
    });

    const { result } = await renderHook(() => usePlants());

    expect(result.current.error).toBe(error);
  });

  it("deve usar a chave da tabela de plantas", async () => {
    await renderHook(() => usePlants());

    expect(useLiveQuery).toHaveBeenCalledWith(["plants"], expect.any(Function), []);
  });
});
