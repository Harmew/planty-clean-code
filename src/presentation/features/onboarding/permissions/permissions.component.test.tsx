import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { usePermissions } from "./hooks/use-permissions";

import { PermissionsScreen } from "./permissions.component";

jest.mock("./hooks/use-permissions", () => ({
  usePermissions: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
  }),
}));

describe("permissions-screen-component", () => {
  const requestPermission = jest.fn();
  const handleContinue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePermissions as jest.Mock).mockReturnValue({
      permissions: {
        notifications: "granted",
        camera: "denied",
        gallery: "undetermined",
      },
      requestPermission,
      handleContinue,
    });
  });

  it("deve renderizar a mensagem de permissão", async () => {
    await render(<PermissionsScreen />);

    expect(screen.getByText(/Precisamos da/)).toBeTruthy();
    expect(screen.getByText(/sua permissão/)).toBeTruthy();
  });

  it("deve renderizar a descrição da tela", async () => {
    await render(<PermissionsScreen />);

    expect(
      screen.getByText(
        "Para que o app funcione corretamente, precisamos acessar algumas funcionalidades do seu dispositivo, como notificações e armazenamento",
      ),
    ).toBeTruthy();

    expect(screen.getByText("Não se preocupe, só vamos usar o que for realmente necessário")).toBeTruthy();
  });

  it("deve renderizar as opções de permissão", async () => {
    await render(<PermissionsScreen />);

    expect(screen.getByText("Notificacoes")).toBeTruthy();
    expect(screen.getByText("Câmera")).toBeTruthy();
    expect(screen.getByText("Galeria")).toBeTruthy();
  });

  it("deve refletir as permissões recebidas", async () => {
    await render(<PermissionsScreen />);

    const switches = screen.getAllByTestId("switch");

    expect(switches).toHaveLength(3);
  });

  it.each([
    [0, "notifications"],
    [1, "camera"],
    [2, "gallery"],
  ] as const)("deve solicitar a permissão de %s", async (switchIndex, permission) => {
    await render(<PermissionsScreen />);

    const switches = screen.getAllByTestId("switch");

    await act(async () => {
      fireEvent.press(switches[switchIndex]);
    });

    expect(requestPermission).toHaveBeenCalledWith(permission);
  });

  it("deve renderizar o botão para continuar", async () => {
    await render(<PermissionsScreen />);

    expect(screen.getByText("Continuar")).toBeTruthy();
  });

  it("deve executar a ação de continuar", async () => {
    await render(<PermissionsScreen />);

    await act(async () => {
      fireEvent.press(screen.getByText("Continuar"));
    });

    expect(handleContinue).toHaveBeenCalledTimes(1);
  });
});
