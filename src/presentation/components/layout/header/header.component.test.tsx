import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { Platform, Text } from "react-native";

// Components
import { Header } from "./header.component";

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("header", () => {
  beforeEach(() => {
    jest.mocked(useRouter).mockReturnValue({
      back: mockBack,
    } as unknown as ReturnType<typeof useRouter>);

    mockBack.mockClear();
  });

  it("renders the title", async () => {
    const { getByText } = await render(<Header title="Minhas plantas" />);

    expect(getByText("Minhas plantas")).toBeTruthy();
  });

  it("renders the back button by default", async () => {
    const { getByRole } = await render(<Header title="Minhas plantas" />);

    expect(getByRole("button", { name: "Voltar" })).toBeTruthy();
  });

  it("does not render the back button when disabled", async () => {
    const { queryByRole } = await render(<Header title="Minhas plantas" showBackButton={false} />);

    expect(queryByRole("button", { name: "Voltar" })).toBeNull();
  });

  it("goes back when pressing the back button", async () => {
    const { getByRole } = await render(<Header title="Minhas plantas" />);

    fireEvent.press(getByRole("button", { name: "Voltar" }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("renders the modal back icon on iOS", async () => {
    jest.replaceProperty(Platform, "OS", "ios");

    const { getByRole } = await render(<Header title="Adicionar planta" isModal />);

    expect(getByRole("button", { name: "Voltar" })).toBeTruthy();
  });

  it("renders the regular back icon on Android", async () => {
    jest.replaceProperty(Platform, "OS", "android");

    const { getByRole } = await render(<Header title="Adicionar planta" isModal />);

    expect(getByRole("button", { name: "Voltar" })).toBeTruthy();
  });

  it("renders the right content", async () => {
    const { getByTestId } = await render(
      <Header title="Minhas plantas" rightContent={<Text testID="header-right-content">Editar</Text>} />,
    );

    expect(getByTestId("header-right-content")).toBeTruthy();
  });
});
