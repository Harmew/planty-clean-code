import { act, renderHook } from "@testing-library/react-native";

import { useRouter } from "expo-router";

import { container } from "@di/container";

import { useDownloadAI } from "./use-download-ai";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("use-download-ai", () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useRouter).mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);

    jest.spyOn(container, "downloadAIModel").mockImplementation(async () => {});
  });

  it("deve iniciar o download da IA", async () => {
    const { result } = await renderHook(() => useDownloadAI());

    await act(async () => {
      await result.current.startDownload();
    });

    expect(container.downloadAIModel).toHaveBeenCalledTimes(1);
  });

  it("deve concluir o download da IA", async () => {
    const { result } = await renderHook(() => useDownloadAI());

    await act(async () => {
      await result.current.startDownload();
    });

    expect(result.current.status).toBe("completed");
  });

  it("deve navegar para all-right ao continuar", async () => {
    const { result } = await renderHook(() => useDownloadAI());

    result.current.handleContinue();

    expect(replace).toHaveBeenCalledWith("/(onboarding)/all-right");
  });

  it("deve definir erro quando o download falhar", async () => {
    jest.spyOn(container, "downloadAIModel").mockImplementation(async () => {
      throw new Error("Erro ao baixar IA");
    });

    const { result } = await renderHook(() => useDownloadAI());

    await act(async () => {
      await result.current.startDownload();
    });

    expect(result.current.status).toBe("error");
  });

  it("não deve iniciar outro download enquanto estiver baixando", async () => {
    let resolveDownload!: () => void;

    jest.spyOn(container, "downloadAIModel").mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveDownload = resolve;
        }),
    );

    const { result } = await renderHook(() => useDownloadAI());

    await act(async () => {
      result.current.startDownload();
    });

    expect(result.current.status).toBe("downloading");

    await act(async () => {
      result.current.startDownload();
    });

    expect(container.downloadAIModel).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveDownload();
    });
  });
});
