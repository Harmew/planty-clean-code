import { fireEvent, render } from "@testing-library/react-native";

import { DownloadAIScreen } from "./download-ai.component";
import { useDownloadAI } from "./hooks/use-download-ai";

jest.mock("./hooks/use-download-ai", () => ({
  useDownloadAI: jest.fn(),
}));

describe("download-ai-screen", () => {
  const startDownload = jest.fn();
  const handleContinue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar a introdução no estado inicial", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "idle",
      progress: 0,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    expect(getByText(/Uma IA para/)).toBeTruthy();
    expect(getByText("Baixar IA")).toBeTruthy();
  });

  it("deve iniciar o download ao pressionar o botão", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "idle",
      progress: 0,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    fireEvent.press(getByText("Baixar IA"));

    expect(startDownload).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar o progresso durante o download", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "downloading",
      progress: 50,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    expect(getByText(/Preparando a/)).toBeTruthy();
    expect(getByText("50.00%")).toBeTruthy();
  });

  it("deve renderizar o erro do download", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "error",
      progress: 50,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    expect(getByText("Não foi possível baixar a IA. Tente novamente")).toBeTruthy();

    expect(getByText("Tentar novamente")).toBeTruthy();
  });

  it("deve tentar novamente ao pressionar o botão de erro", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "error",
      progress: 50,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    fireEvent.press(getByText("Tentar novamente"));

    expect(startDownload).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar a conclusão do download", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "completed",
      progress: 100,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    expect(getByText("Tudo pronto!")).toBeTruthy();
    expect(getByText("Continuar")).toBeTruthy();
  });

  it("deve continuar ao pressionar o botão", async () => {
    jest.mocked(useDownloadAI).mockReturnValue({
      status: "completed",
      progress: 100,
      startDownload,
      handleContinue,
    });

    const { getByText } = await render(<DownloadAIScreen />);

    fireEvent.press(getByText("Continuar"));

    expect(handleContinue).toHaveBeenCalledTimes(1);
  });
});
