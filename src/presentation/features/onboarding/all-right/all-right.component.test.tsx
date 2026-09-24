import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { AllRightScreen } from "./all-right.component";
import { useAllRight } from "./hooks/use-all-right";

jest.mock("./hooks/use-all-right", () => ({
  useAllRight: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
  }),
}));

describe("all-right-screen-component", () => {
  const handleFinishOnboarding = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAllRight as jest.Mock).mockReturnValue({
      handleFinishOnboarding,
    });
  });

  it("deve renderizar a mensagem de conclusão", async () => {
    await render(<AllRightScreen />);
    expect(screen.getByText("Tudo certo!")).toBeTruthy();
  });

  it("deve renderizar a descrição da tela", async () => {
    await render(<AllRightScreen />);

    expect(screen.getByText("Seu aplicativo está configurado e pronto para uso")).toBeTruthy();

    expect(
      screen.getByText("Aproveite todas as funcionalidades e mantenha suas plantas sempre saudáveis!"),
    ).toBeTruthy();
  });

  it("deve renderizar o progresso completo", async () => {
    await render(<AllRightScreen />);

    expect(screen.getByTestId("progress-line-container")).toBeTruthy();
    expect(screen.getByTestId("progress-line")).toBeTruthy();
  });

  it("deve renderizar o botão para finalizar", async () => {
    await render(<AllRightScreen />);

    expect(screen.getByText("Vamos lá")).toBeTruthy();
  });

  it("deve finalizar o onboarding ao pressionar o botão", async () => {
    await render(<AllRightScreen />);

    await act(async () => {
      fireEvent.press(screen.getByText("Vamos lá"));
    });

    expect(handleFinishOnboarding).toHaveBeenCalledTimes(1);
  });
});
