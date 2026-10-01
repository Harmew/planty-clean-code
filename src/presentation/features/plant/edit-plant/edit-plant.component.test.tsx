import { fireEvent, render, renderHook } from "@testing-library/react-native";
import { useForm } from "react-hook-form";

import { EditPlantScreen } from "./edit-plant.component";
import { useEditPlant } from "./hooks/use-edit-plant";
import type { Schema } from "./schema";

jest.mock("./hooks/use-edit-plant", () => ({
  useEditPlant: jest.fn(),
}));

describe("edit-plant-screen", () => {
  const onSubmit = jest.fn();

  const refs = {
    nameRef: { current: null },
    locationRef: { current: null },
    temperatureMinRef: { current: null },
    temperatureMaxRef: { current: null },
    humidityRef: { current: null },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  async function renderScreen() {
    const { result } = await renderHook(() =>
      useForm<Schema>({
        defaultValues: {
          imageUri: null,
          name: "",
          location: "",
          sunlight: "medium",
          temperatureMin: "",
          temperatureMax: "",
          humidity: "",
        },
      }),
    );

    jest.mocked(useEditPlant).mockReturnValue({
      form: result.current,
      onSubmit,
      refs,
    });

    return render(<EditPlantScreen />);
  }

  it("deve renderizar o formulário de editar planta", async () => {
    const { getByText, getByLabelText } = await renderScreen();

    expect(getByText("Editar Planta")).toBeTruthy();
    expect(getByLabelText("Nome da planta")).toBeTruthy();
    expect(getByLabelText("Localização da planta")).toBeTruthy();
    expect(getByLabelText("Temperatura mínima")).toBeTruthy();
    expect(getByLabelText("Temperatura máxima")).toBeTruthy();
    expect(getByLabelText("Umidade")).toBeTruthy();
    expect(getByText("Salvar planta")).toBeTruthy();
  });

  it("deve executar o envio ao pressionar o botão de salvar planta", async () => {
    const { getByText } = await renderScreen();

    await fireEvent.press(getByText("Salvar planta"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
