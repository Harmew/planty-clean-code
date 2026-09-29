import { render } from "@testing-library/react-native";

import { DownloadProgress } from "./download-progress.component";

describe("download-progress", () => {
  it("deve renderizar o progresso do download", async () => {
    const { getByText } = await render(<DownloadProgress progress={50} hasError={false} />);

    expect(getByText(/Preparando a/)).toBeTruthy();

    expect(getByText("Estamos baixando a IA para o seu celular")).toBeTruthy();

    expect(getByText("50.00%")).toBeTruthy();
  });

  it("deve renderizar mensagem de erro", async () => {
    const { getByText } = await render(<DownloadProgress progress={50} hasError={true} />);

    expect(getByText("Não foi possível baixar a IA. Tente novamente")).toBeTruthy();
  });
});
