import { fireEvent, render } from "@testing-library/react-native";

import { PlantItem } from "./plant-item.component";

import { createPlant } from "@mocks/fixtures/plant.fixture";

describe("plant-item-component", () => {
  it("deve renderizar os dados da planta", async () => {
    const plant = createPlant();

    const { getByText } = await render(<PlantItem item={plant} index={0} onPress={jest.fn()} />);

    expect(getByText("Jiboia")).toBeTruthy();
    expect(getByText("Sala")).toBeTruthy();
  });

  it("deve chamar onPress com o id da planta", async () => {
    const plant = createPlant({ id: 123 });
    const onPress = jest.fn();

    const { getByText } = await render(<PlantItem item={plant} index={0} onPress={onPress} />);

    fireEvent.press(getByText("Jiboia"));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(123);
  });

  it("deve renderizar a imagem da planta quando existir", async () => {
    const plant = createPlant({
      image: "file:///plants/jiboia.jpg",
    });

    const { getByTestId } = await render(<PlantItem item={plant} index={0} onPress={jest.fn()} />);

    const image = getByTestId("plant-image");

    expect(image.props.source).toEqual([
      {
        uri: "file:///plants/jiboia.jpg",
      },
    ]);
  });

  it("deve usar o placeholder quando a planta não possui imagem", async () => {
    const plant = createPlant();

    const { getByTestId } = await render(<PlantItem item={plant} index={0} onPress={jest.fn()} />);

    const image = getByTestId("plant-image");

    expect(image.props.source).toEqual([]);
    expect(image.props.placeholder).toBeTruthy();
  });
});
