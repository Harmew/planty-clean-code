import { fireEvent, render } from "@testing-library/react-native";

import { usePlants } from "@presentation/hooks/use-plants";

import { MyPlantsScreen } from "./my-plants.component";

import { createPlant } from "@mocks/fixtures/plant.fixture";

jest.mock("@presentation/hooks/use-plants", () => ({ usePlants: jest.fn() }));

const mockPush = jest.fn();

jest.mock("expo-router", () => ({ useRouter: () => ({ push: mockPush }) }));

describe("my-plants-screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(usePlants).mockReturnValue({
      plants: [],
    });
  });

  it("deve renderizar o título da tela", async () => {
    const { getByText } = await render(<MyPlantsScreen />);

    expect(getByText("Minhas Plantas")).toBeTruthy();
  });

  it("deve renderizar o estado vazio quando não existem plantas", async () => {
    const { getByText } = await render(<MyPlantsScreen />);

    expect(getByText("Você ainda não tem plantas")).toBeTruthy();
    expect(getByText("Adicionar")).toBeTruthy();
  });

  it("deve navegar para notificações ao pressionar o botão", async () => {
    const { getByRole } = await render(<MyPlantsScreen />);

    fireEvent.press(getByRole("button", { name: "Notificações" }));

    expect(mockPush).toHaveBeenCalledWith("/notifications");
  });

  it("deve navegar para adicionar planta no estado vazio", async () => {
    const { getByText } = await render(<MyPlantsScreen />);

    fireEvent.press(getByText("Adicionar"));

    expect(mockPush).toHaveBeenCalledWith("/(modals)/add-plant");
  });

  it("deve renderizar as plantas", async () => {
    const plants = [
      createPlant({ id: 1, name: "Jiboia", location: "Sala" }),
      createPlant({ id: 2, name: "Monstera", location: "Quarto" }),
    ];

    jest.mocked(usePlants).mockReturnValue({
      plants,
    });

    const { getByText } = await render(<MyPlantsScreen />);

    expect(getByText("Jiboia")).toBeTruthy();
    expect(getByText("Sala")).toBeTruthy();
    expect(getByText("Monstera")).toBeTruthy();
    expect(getByText("Quarto")).toBeTruthy();
  });

  it("deve renderizar o botão de adicionar quando existem plantas", async () => {
    jest.mocked(usePlants).mockReturnValue({
      plants: [createPlant()],
    });

    const { getByText } = await render(<MyPlantsScreen />);

    expect(getByText("Adicionar planta")).toBeTruthy();
  });

  it("deve navegar para adicionar planta quando existem plantas", async () => {
    jest.mocked(usePlants).mockReturnValue({
      plants: [createPlant()],
    });

    const { getByText } = await render(<MyPlantsScreen />);

    fireEvent.press(getByText("Adicionar planta"));

    expect(mockPush).toHaveBeenCalledWith("/(modals)/add-plant");
  });

  it("deve navegar para os detalhes da planta", async () => {
    const plant = createPlant({ id: 123 });

    jest.mocked(usePlants).mockReturnValue({
      plants: [plant],
    });

    const { getByText } = await render(<MyPlantsScreen />);

    fireEvent.press(getByText("Jiboia"));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/my-plant",
      params: {
        id: 123,
      },
    });
  });
});
