import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";

import { container } from "@di/container";

import { useTheme } from "@presentation/hooks/use-theme";

import { useSettings } from "./use-settings";

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@di/container", () => ({
  container: {
    openAppSettings: jest.fn(),
    exportBackup: jest.fn(),
    importBackup: jest.fn(),
  },
}));

jest.mock("@shared/utils/alert", () => ({
  getAlertOptions: jest.fn(() => ({})),
}));

describe("use-settings-hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useTheme).mockReturnValue({
      dark: false,
    } as ReturnType<typeof useTheme>);

    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  it("deve abrir as configurações do aplicativo", async () => {
    const { result } = await renderHook(() => useSettings());

    result.current.handleOpenAppSettings();

    expect(container.openAppSettings).toHaveBeenCalledTimes(1);
  });

  it("não deve exportar quando a senha for cancelada", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[0]?.onPress?.();
      }
    });

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleExportData();
    });

    expect(container.exportBackup).not.toHaveBeenCalled();
  });

  it("não deve exportar quando a senha informada estiver vazia", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("" as never);
      }
    });

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleExportData();
    });

    expect(container.exportBackup).not.toHaveBeenCalled();
  });

  it("deve exportar os dados com a senha informada", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.exportBackup).mockResolvedValue(undefined);

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleExportData();
    });

    expect(container.exportBackup).toHaveBeenCalledWith("minha-senha");

    expect(result.current.isExporting).toBe(false);
  });

  it("deve exibir erro quando a exportação falhar", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.exportBackup).mockRejectedValue(new Error("Falha ao exportar"));

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleExportData();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Falha ao exportar",
      [{ text: "Entendi" }],
      expect.anything(),
    );

    expect(result.current.isExporting).toBe(false);
  });

  it("deve usar mensagem padrão quando a exportação falhar sem mensagem", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.exportBackup).mockRejectedValue({});

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleExportData();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Ocorreu um erro inesperado",
      [{ text: "Entendi" }],
      expect.anything(),
    );

    expect(result.current.isExporting).toBe(false);
  });

  it("não deve iniciar uma nova ação enquanto a exportação estiver em andamento", async () => {
    let resolveExport!: () => void;

    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.exportBackup).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveExport = resolve;
        }),
    );

    const { result } = await renderHook(() => useSettings());

    let firstExport!: Promise<void>;

    await act(async () => {
      firstExport = result.current.handleExportData();
    });

    expect(result.current.isExporting).toBe(true);

    await act(async () => {
      await result.current.handleExportData();
    });

    expect(container.exportBackup).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveExport();
      await firstExport;
    });

    expect(result.current.isExporting).toBe(false);
  });

  it("não deve importar quando a senha for cancelada", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[0]?.onPress?.();
      }
    });

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleImportData();
    });

    expect(container.importBackup).not.toHaveBeenCalled();
  });

  it("não deve importar quando a senha informada estiver vazia", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("" as never);
      }
    });

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleImportData();
    });

    expect(container.importBackup).not.toHaveBeenCalled();
  });

  it("deve importar os dados e exibir confirmação", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.importBackup).mockResolvedValue(undefined);

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleImportData();
    });

    expect(container.importBackup).toHaveBeenCalledWith("minha-senha");

    expect(Alert.alert).toHaveBeenCalledWith(
      "Importação concluída",
      "Os dados foram importados com sucesso",
      [{ text: "Entendi" }],
      expect.anything(),
    );

    expect(result.current.isImporting).toBe(false);
  });

  it("deve exibir erro quando a importação falhar", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("senha-incorreta" as never);
      }
    });

    jest.mocked(container.importBackup).mockRejectedValue(new Error("Senha incorreta ou backup inválido"));

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleImportData();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Senha incorreta ou backup inválido",
      [{ text: "Entendi" }],
      expect.anything(),
    );

    expect(result.current.isImporting).toBe(false);
  });

  it("deve usar mensagem padrão quando a importação falhar sem mensagem", async () => {
    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.importBackup).mockRejectedValue({});

    const { result } = await renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleImportData();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Ocorreu um erro inesperado",
      [{ text: "Entendi" }],
      expect.anything(),
    );

    expect(result.current.isImporting).toBe(false);
  });

  it("não deve iniciar uma nova ação enquanto a importação estiver em andamento", async () => {
    let resolveImport!: () => void;

    jest.spyOn(Alert, "prompt").mockImplementation((_title, _message, buttons) => {
      if (Array.isArray(buttons)) {
        buttons[1]?.onPress?.("minha-senha" as never);
      }
    });

    jest.mocked(container.importBackup).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveImport = resolve;
        }),
    );

    const { result } = await renderHook(() => useSettings());

    let firstImport!: Promise<void>;

    await act(async () => {
      firstImport = result.current.handleImportData();
    });

    expect(result.current.isImporting).toBe(true);

    await act(async () => {
      await result.current.handleImportData();
    });

    expect(container.importBackup).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveImport();
      await firstImport;
    });

    expect(result.current.isImporting).toBe(false);
  });
});
