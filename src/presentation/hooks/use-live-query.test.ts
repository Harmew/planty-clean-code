import { act, renderHook, waitFor } from "@testing-library/react-native";

import { addDatabaseChangeListener, type DatabaseChangeEvent } from "expo-sqlite";

import { useLiveQuery } from "./use-live-query";

jest.mock("expo-sqlite", () => ({
  addDatabaseChangeListener: jest.fn(),
}));

describe("use-live-query", () => {
  let remove: jest.Mock;
  let listener: ((event: DatabaseChangeEvent) => void) | undefined;

  beforeEach(() => {
    remove = jest.fn();
    listener = undefined;

    jest.clearAllMocks();

    jest.mocked(addDatabaseChangeListener).mockImplementation((callback) => {
      listener = callback;

      return {
        remove,
      } as never;
    });
  });

  it("deve executar a query inicialmente", async () => {
    const query = jest.fn().mockResolvedValue(["planta"]);

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(result.current.data).toEqual(["planta"]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(query).toHaveBeenCalledTimes(1);
  });

  it("deve atualizar os dados quando a query for executada novamente", async () => {
    const query = jest.fn().mockResolvedValueOnce(["planta 1"]).mockResolvedValueOnce(["planta 2"]);

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(result.current.data).toEqual(["planta 1"]);

    await act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["planta 2"]);
    });

    expect(query).toHaveBeenCalledTimes(2);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("deve limpar o erro quando uma nova query for executada com sucesso", async () => {
    const query = jest.fn().mockRejectedValueOnce(new Error("Erro")).mockResolvedValueOnce(["planta"]);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    await waitFor(() => {
      expect(result.current.error).toEqual(new Error("Erro"));
    });

    await act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["planta"]);
    });

    expect(result.current.error).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  it("deve armazenar o erro quando a query falhar com Error", async () => {
    const error = new Error("Falha na consulta");

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const query = jest.fn().mockRejectedValue(error);

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  it("deve converter erros que não são Error", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const query = jest.fn().mockRejectedValue("Erro desconhecido");

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    await waitFor(() => {
      expect(result.current.error).toEqual(new Error("Erro desconhecido"));
    });

    expect(result.current.isLoading).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it("deve refazer a consulta quando uma tabela observada sofrer alteração", async () => {
    const query = jest.fn().mockResolvedValueOnce(["planta 1"]).mockResolvedValueOnce(["planta 2"]);

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(result.current.data).toEqual(["planta 1"]);

    await act(() => {
      listener?.({
        databaseName: "test",
        databaseFilePath: "test.db",
        tableName: "plants",
        rowId: 1,
      });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["planta 2"]);
    });

    expect(query).toHaveBeenCalledTimes(2);
  });

  it("não deve refazer a consulta quando outra tabela sofrer alteração", async () => {
    const query = jest.fn().mockResolvedValue(["planta"]);

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(result.current.data).toEqual(["planta"]);
    expect(query).toHaveBeenCalledTimes(1);

    await act(() => {
      listener?.({
        databaseName: "test",
        databaseFilePath: "test.db",
        tableName: "cares",
        rowId: 1,
      });
    });

    expect(result.current.data).toEqual(["planta"]);
    expect(query).toHaveBeenCalledTimes(1);
  });

  it("deve observar todas as tabelas informadas", async () => {
    const query = jest
      .fn()
      .mockResolvedValueOnce(["planta 1"])
      .mockResolvedValueOnce(["planta 2"])
      .mockResolvedValueOnce(["planta 3"]);

    const { result } = await renderHook(() => useLiveQuery(["plants", "cares"], query, []));

    expect(result.current.data).toEqual(["planta 1"]);

    await act(() => {
      listener?.({
        databaseName: "test",
        databaseFilePath: "test.db",
        tableName: "cares",
        rowId: 1,
      });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["planta 2"]);
    });

    await act(() => {
      listener?.({
        databaseName: "test",
        databaseFilePath: "test.db",
        tableName: "plants",
        rowId: 1,
      });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["planta 3"]);
    });

    expect(query).toHaveBeenCalledTimes(3);
  });

  it("deve remover a inscrição ao desmontar", async () => {
    const query = jest.fn().mockResolvedValue(["planta"]);

    const { unmount } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(addDatabaseChangeListener).toHaveBeenCalledTimes(1);

    await unmount();

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it("deve ignorar o resultado de uma requisição antiga", async () => {
    let resolveFirst!: (value: string[]) => void;
    let resolveSecond!: (value: string[]) => void;

    const query = jest
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string[]>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<string[]>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(query).toHaveBeenCalledTimes(1);

    await act(() => {
      result.current.refetch();
    });

    expect(query).toHaveBeenCalledTimes(2);

    await act(() => {
      resolveSecond(["resultado novo"]);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["resultado novo"]);
    });

    await act(() => {
      resolveFirst(["resultado antigo"]);
    });

    expect(result.current.data).toEqual(["resultado novo"]);
  });

  it("deve invalidar uma requisição pendente ao desmontar", async () => {
    let resolveQuery!: (value: string[]) => void;

    const query = jest.fn().mockImplementation(
      () =>
        new Promise<string[]>((resolve) => {
          resolveQuery = resolve;
        }),
    );

    const { result, unmount } = await renderHook(() => useLiveQuery(["plants"], query, []));

    expect(query).toHaveBeenCalledTimes(1);

    await unmount();

    await act(() => {
      resolveQuery(["resultado"]);
    });

    expect(result.current.data).toEqual([]);
  });

  it("deve ignorar o erro de uma requisição antiga", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    let rejectFirst!: (reason: Error) => void;
    let resolveSecond!: (value: string[]) => void;

    const query = jest
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string[]>((_, reject) => {
            rejectFirst = reject;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<string[]>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = await renderHook(() => useLiveQuery(["plants"], query, []));

    await act(() => {
      result.current.refetch();
    });

    await act(() => {
      resolveSecond(["resultado novo"]);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(["resultado novo"]);
    });

    await act(() => {
      rejectFirst(new Error("erro antigo"));
    });

    expect(result.current.data).toEqual(["resultado novo"]);
    expect(result.current.error).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("deve ignorar o erro de uma requisição pendente ao desmontar", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    let rejectQuery!: (reason: Error) => void;

    const query = jest.fn().mockImplementation(
      () =>
        new Promise<string[]>((_, reject) => {
          rejectQuery = reject;
        }),
    );

    const { result, unmount } = await renderHook(() => useLiveQuery(["plants"], query, []));

    await unmount();

    await act(() => {
      rejectQuery(new Error("erro após desmontar"));
    });

    expect(result.current.error).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
