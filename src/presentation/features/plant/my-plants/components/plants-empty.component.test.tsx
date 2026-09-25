import { fireEvent, render } from "@testing-library/react-native";

import { PlantsEmpty } from "./plants-empty.component";

describe("plants-empty-component", () => {
  it("deve renderizar a mensagem de estado vazio", async () => {
    const { getByText } = await render(<PlantsEmpty onAddPlantPress={jest.fn()} />);

    expect(getByText("Você ainda não tem plantas")).toBeTruthy();
    expect(getByText("Vamos começar adicionando a sua primeira planta e acompanhar os cuidados dela?")).toBeTruthy();
  });

  it("deve renderizar o botão para adicionar planta", async () => {
    const { getByText } = await render(<PlantsEmpty onAddPlantPress={jest.fn()} />);

    expect(getByText("Adicionar")).toBeTruthy();
  });

  it("deve chamar onAddPlantPress ao pressionar o botão", async () => {
    const onAddPlantPress = jest.fn();

    const { getByText } = await render(<PlantsEmpty onAddPlantPress={onAddPlantPress} />);

    fireEvent.press(getByText("Adicionar"));

    expect(onAddPlantPress).toHaveBeenCalledTimes(1);
  });
});
