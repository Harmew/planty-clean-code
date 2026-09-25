import { fireEvent, render } from "@testing-library/react-native";

import { PlantsFooter } from "./plants-footer.component";

describe("plants-footer-component", () => {
  it("deve renderizar o botão de adicionar planta", async () => {
    const { getByText } = await render(<PlantsFooter onAddPlantPress={jest.fn()} />);

    expect(getByText("Adicionar planta")).toBeTruthy();
  });

  it("deve chamar onAddPlantPress ao pressionar o botão", async () => {
    const onAddPlantPress = jest.fn();

    const { getByText } = await render(<PlantsFooter onAddPlantPress={onAddPlantPress} />);

    fireEvent.press(getByText("Adicionar planta"));

    expect(onAddPlantPress).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar o ícone de adicionar", async () => {
    const { getByText } = await render(<PlantsFooter onAddPlantPress={jest.fn()} />);

    const button = getByText("Adicionar planta").parent?.parent;

    expect(button).toBeTruthy();
  });
});
