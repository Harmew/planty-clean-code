import { fireEvent, render, renderHook } from "@testing-library/react-native";
import { useForm } from "react-hook-form";

import { AddPlantScreen } from "./add-plant.component";
import { useAddPlant } from "./hooks/use-add-plant";
import type { Schema } from "./schema";

jest.mock("./hooks/use-add-plant", () => ({
  useAddPlant: jest.fn(),
}));

describe("add-plant-screen", () => {
  const onSubmit = jest.fn();
  const handleAutoComplete = jest.fn();

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

    jest.mocked(useAddPlant).mockReturnValue({
      form: result.current,
      onSubmit,
      handleAutoComplete,
      isGenerating: false,
      refs,
    });

    return render(<AddPlantScreen />);
  }

  it("deve renderizar o formulário de adicionar planta", async () => {
    const { getByText, getByLabelText } = await renderScreen();

    expect(getByText("Adicionar Planta")).toBeTruthy();
    expect(getByLabelText("Nome da planta")).toBeTruthy();
    expect(getByLabelText("Localização da planta")).toBeTruthy();
    expect(getByLabelText("Temperatura mínima")).toBeTruthy();
    expect(getByLabelText("Temperatura máxima")).toBeTruthy();
    expect(getByLabelText("Umidade")).toBeTruthy();
    expect(getByText("Auto Completar")).toBeTruthy();
    expect(getByText("Adicionar planta")).toBeTruthy();
  });

  it("deve executar o auto completar ao pressionar o botão", async () => {
    const { getByText } = await renderScreen();

    await fireEvent.press(getByText("Auto Completar"));

    expect(handleAutoComplete).toHaveBeenCalledTimes(1);
  });

  it("deve executar o envio ao pressionar o botão de adicionar planta", async () => {
    const { getByText } = await renderScreen();

    await fireEvent.press(getByText("Adicionar planta"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
