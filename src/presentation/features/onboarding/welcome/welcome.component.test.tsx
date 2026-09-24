import { render, screen } from "@testing-library/react-native";

import { Platform } from "react-native";
import { WelcomeScreen } from "./welcome.component";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
  }),
}));

describe("welcome-screen-component", () => {
  afterEach(() => {
    Object.defineProperty(Platform, "OS", {
      value: "android",
    });
  });

  it("deve renderizar a mensagem de boas-vindas", async () => {
    await render(<WelcomeScreen />);

    expect(screen.getByText(/Bem-vindo ao/)).toBeTruthy();
    expect(screen.getByText(/Planty/)).toBeTruthy();
  });

  it("deve renderizar a descrição da tela", async () => {
    await render(<WelcomeScreen />);

    expect(
      screen.getByText(
        "Descubra uma forma simples e divertida de cuidar das suas plantas e acompanhar suas tarefas diárias. Vamos começar essa jornada juntos!",
      ),
    ).toBeTruthy();
  });

  it("deve renderizar o botão para continuar", async () => {
    await render(<WelcomeScreen />);

    expect(screen.getByText("Continuar")).toBeTruthy();
  });

  it("deve renderizar o progresso em 33%", async () => {
    await render(<WelcomeScreen />);

    expect(screen.getByTestId("progress-line-container")).toBeTruthy();
    expect(screen.getByText("Continuar")).toBeTruthy();
    expect(screen.getByTestId("progress-line")).toBeTruthy();
  });
});
