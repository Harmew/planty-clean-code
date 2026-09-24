import { render } from "@testing-library/react-native";

import { BootErrorScreen } from "@presentation/features/startup/boot-error/boot-error.component";

describe("boot-error-screen-component", () => {
  it("deve renderizar a mensagem de erro padrão", async () => {
    const { getByText } = await render(<BootErrorScreen error={new Error("Erro de teste")} />);

    expect(getByText("Não foi possível iniciar o aplicativo")).toBeTruthy();

    expect(getByText("Ocorreu um problema durante a inicialização.")).toBeTruthy();
  });

  it("deve renderizar a mensagem do erro quando existir", async () => {
    const { getByText } = await render(<BootErrorScreen error={new Error("Falha ao inicializar")} />);

    expect(getByText("Falha ao inicializar")).toBeTruthy();
  });

  it("não deve renderizar a mensagem do erro quando não existir", async () => {
    const { queryByText } = await render(<BootErrorScreen error={undefined} />);

    expect(queryByText("Falha ao inicializar")).toBeNull();
  });

  it("não deve renderizar a mensagem quando o erro não possuir mensagem", async () => {
    const { queryByText } = await render(<BootErrorScreen error={new Error()} />);

    expect(queryByText("Falha ao inicializar")).toBeNull();
  });
});
