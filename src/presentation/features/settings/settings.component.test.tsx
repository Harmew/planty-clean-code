import { fireEvent, render } from "@testing-library/react-native";

import { useSettings } from "./hooks/use-settings";
import { SettingsScreen } from "./settings.component";

jest.mock("./hooks/use-settings", () => ({
  useSettings: jest.fn(),
}));

describe("settings-screen", () => {
  const mockHandleExportData = jest.fn();
  const mockHandleImportData = jest.fn();
  const mockHandleOpenAppSettings = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useSettings).mockReturnValue({
      isExporting: false,
      isImporting: false,
      handleExportData: mockHandleExportData,
      handleImportData: mockHandleImportData,
      handleOpenAppSettings: mockHandleOpenAppSettings,
    });
  });

  it("deve renderizar o título da tela", async () => {
    const { getByText } = await render(<SettingsScreen />);

    expect(getByText("Ajustes")).toBeTruthy();
  });

  it("deve renderizar as opções de configurações", async () => {
    const { getByText } = await render(<SettingsScreen />);

    expect(getByText("Notificações")).toBeTruthy();
    expect(getByText("Câmera")).toBeTruthy();
    expect(getByText("Galeria")).toBeTruthy();
    expect(getByText("Importar Dados")).toBeTruthy();
    expect(getByText("Exportar Dados")).toBeTruthy();
  });

  it("deve renderizar a versão do aplicativo", async () => {
    const { getByText } = await render(<SettingsScreen />);

    expect(getByText(/Versão do Aplicativo/)).toBeTruthy();
  });

  it.each(["Notificações", "Câmera", "Galeria"])(
    "deve abrir as configurações do aplicativo ao pressionar %s",
    async (label) => {
      const { getByText } = await render(<SettingsScreen />);

      fireEvent.press(getByText(label));

      expect(mockHandleOpenAppSettings).toHaveBeenCalledTimes(1);
    },
  );

  it("deve chamar handleImportData ao pressionar importar dados", async () => {
    const { getByText } = await render(<SettingsScreen />);

    fireEvent.press(getByText("Importar Dados"));

    expect(mockHandleImportData).toHaveBeenCalledTimes(1);
  });

  it("deve chamar handleExportData ao pressionar exportar dados", async () => {
    const { getByText } = await render(<SettingsScreen />);

    fireEvent.press(getByText("Exportar Dados"));

    expect(mockHandleExportData).toHaveBeenCalledTimes(1);
  });
});
