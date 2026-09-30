import { renderHook } from "@testing-library/react-native";

import { container } from "@di/container";

import { createPlant } from "@mocks/fixtures/plant.fixture";

import { useLiveQuery } from "./use-live-query";
import { usePlant } from "./use-plant";

jest.mock("@di/container", () => ({
  container: {
    getPlantById: jest.fn(),
  },
}));

jest.mock("./use-live-query", () => ({
  useLiveQuery: jest.fn(),
}));

describe("use-plant", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useLiveQuery).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it("deve buscar a planta informada", async () => {
    const plant = createPlant({ id: 1 });

    jest.mocked(container.getPlantById).mockResolvedValue(plant);

    await renderHook(() => usePlant(1));

    const query = jest.mocked(useLiveQuery).mock.calls[0][1];

    await query();

    expect(container.getPlantById).toHaveBeenCalledWith(1);
    expect(container.getPlantById).toHaveBeenCalledTimes(1);
  });

  it("deve retornar a planta", async () => {
    const plant = createPlant({ id: 1 });

    jest.mocked(useLiveQuery).mockReturnValue({
      data: plant,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = await renderHook(() => usePlant(1));

    expect(result.current.plant).toEqual(plant);
  });

  it("deve retornar o estado de carregamento", async () => {
    jest.mocked(useLiveQuery).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = await renderHook(() => usePlant(1));

    expect(result.current.isLoading).toBe(true);
  });

  it("deve usar a chave da tabela de plantas", async () => {
    await renderHook(() => usePlant(1));

    expect(useLiveQuery).toHaveBeenCalledWith(["plants"], expect.any(Function), null);
  });
});
