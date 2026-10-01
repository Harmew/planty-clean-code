import { act, renderHook, waitFor } from "@testing-library/react-native";
import { addDatabaseChangeListener, type DatabaseChangeEvent } from "expo-sqlite";

// DI
import { container } from "@di/container";
import { createCare } from "@mocks/fixtures/care.fixture";

import { usePlantCares } from "./use-plant-cares";

jest.mock("expo-sqlite", () => ({
  addDatabaseChangeListener: jest.fn(),
}));

jest.mock("@di/container", () => ({
  container: {
    getCaresByPlant: jest.fn(),
  },
}));

const emitChange = (listener: ((event: DatabaseChangeEvent) => void) | undefined, tableName: string) => {
  listener?.({
    databaseName: "test",
    databaseFilePath: "test.db",
    tableName,
    rowId: 1,
  });
};

describe("use-plant-cares", () => {
  let listener: ((event: DatabaseChangeEvent) => void) | undefined;

  beforeEach(() => {
    listener = undefined;

    jest.clearAllMocks();

    jest.mocked(addDatabaseChangeListener).mockImplementation((callback) => {
      listener = callback;

      return { remove: jest.fn() } as never;
    });
  });

  it("deve buscar os cuidados da planta informada", async () => {
    const care = createCare({ plantId: 1 });

    jest.mocked(container.getCaresByPlant).mockResolvedValue([care]);

    const { result } = await renderHook(() => usePlantCares(1));

    expect(container.getCaresByPlant).toHaveBeenCalledWith(1);
    expect(result.current.cares).toEqual([care]);
    expect(result.current.isLoading).toBe(false);
  });

  it("deve iniciar com lista vazia e carregando", async () => {
    jest.mocked(container.getCaresByPlant).mockImplementation(() => new Promise(() => {}));

    const { result } = await renderHook(() => usePlantCares(1));

    expect(result.current.cares).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("deve refazer a busca quando o plantId mudar", async () => {
    const care1 = createCare({
      id: 1,
      plantId: 1,
    });

    const care2 = createCare({
      id: 2,
      plantId: 2,
    });

    jest.mocked(container.getCaresByPlant).mockResolvedValueOnce([care1]).mockResolvedValueOnce([care2]);

    const { result, rerender } = await renderHook(({ plantId }: { plantId: number }) => usePlantCares(plantId), {
      initialProps: { plantId: 1 },
    });

    expect(result.current.cares).toEqual([care1]);

    await rerender({ plantId: 2 });

    await waitFor(() => {
      expect(result.current.cares).toEqual([care2]);
    });

    expect(container.getCaresByPlant).toHaveBeenNthCalledWith(1, 1);
    expect(container.getCaresByPlant).toHaveBeenNthCalledWith(2, 2);
  });

  it("não deve refazer a busca quando o plantId não mudar", async () => {
    jest.mocked(container.getCaresByPlant).mockResolvedValue([]);

    const { rerender } = await renderHook(({ plantId }: { plantId: number }) => usePlantCares(plantId), {
      initialProps: { plantId: 1 },
    });

    await rerender({ plantId: 1 });

    expect(container.getCaresByPlant).toHaveBeenCalledTimes(1);
  });

  it("deve refazer a busca quando a tabela cares sofrer alteração", async () => {
    const care1 = createCare({
      id: 1,
      plantId: 1,
    });

    const care2 = createCare({
      id: 2,
      plantId: 1,
      type: "fertilize",
    });

    jest.mocked(container.getCaresByPlant).mockResolvedValueOnce([care1]).mockResolvedValueOnce([care1, care2]);

    const { result } = await renderHook(() => usePlantCares(1));

    await act(() => {
      emitChange(listener, "cares");
    });

    await waitFor(() => {
      expect(result.current.cares).toEqual([care1, care2]);
    });

    expect(container.getCaresByPlant).toHaveBeenCalledTimes(2);
  });

  it("não deve refazer a busca quando outra tabela sofrer alteração", async () => {
    const care = createCare({ plantId: 1 });

    jest.mocked(container.getCaresByPlant).mockResolvedValue([care]);

    await renderHook(() => usePlantCares(1));

    await act(() => {
      emitChange(listener, "plants");
    });

    expect(container.getCaresByPlant).toHaveBeenCalledTimes(1);
  });
});
