import { act, renderHook } from "@testing-library/react-native";

import { Alert } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { container } from "@di/container";

import { createPlant } from "@mocks/fixtures/plant.fixture";

import { usePlant } from "@presentation/hooks/use-plant";

import { useEditPlant } from "./use-edit-plant";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@di/container", () => ({
  container: {
    updatePlant: jest.fn(),
  },
}));

jest.mock("@presentation/hooks/use-plant", () => ({
  usePlant: jest.fn(),
}));

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: jest.fn(() => ({
    dark: false,
  })),
}));

jest.mock("@shared/utils/alert", () => ({
  getAlertOptions: jest.fn(() => ({
    userInterfaceStyle: "light",
  })),
}));

describe("useEditPlant", () => {
  const back = jest.fn();
  let alert: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useLocalSearchParams).mockReturnValue({
      id: "42",
    });

    jest.mocked(useRouter).mockReturnValue({
      back,
    } as never);

    jest.mocked(usePlant).mockReturnValue({
      plant: createPlant({
        id: 42,
        image: "plant.jpg",
      }),
      isLoading: false,
    });

    alert = jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alert.mockRestore();
  });

  it("deve carregar os dados da planta no formulário", async () => {
    const { result } = await renderHook(() => useEditPlant());

    expect(result.current.form.getValues()).toEqual({
      imageUri: "plant.jpg",
      name: "Jiboia",
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "60",
    });
  });

  it("deve usar valores padrão quando a planta não existir", async () => {
    jest.mocked(usePlant).mockReturnValue({
      plant: null,
      isLoading: false,
    } as never);

    const { result } = await renderHook(() => useEditPlant());

    expect(result.current.form.getValues()).toEqual({
      imageUri: null,
      name: "",
      location: "",
      sunlight: "medium",
      temperatureMin: "",
      temperatureMax: "",
      humidity: "",
    });
  });

  it("deve disponibilizar as refs dos campos", async () => {
    const { result } = await renderHook(() => useEditPlant());

    expect(result.current.refs.nameRef).toBeTruthy();
    expect(result.current.refs.locationRef).toBeTruthy();
    expect(result.current.refs.temperatureMinRef).toBeTruthy();
    expect(result.current.refs.temperatureMaxRef).toBeTruthy();
    expect(result.current.refs.humidityRef).toBeTruthy();
  });

  it("deve atualizar a planta e voltar ao finalizar o formulário", async () => {
    const plant = createPlant({
      id: 42,
      image: "plant.jpg",
    });

    jest.mocked(container.updatePlant).mockResolvedValue(plant);

    const { result } = await renderHook(() => useEditPlant());

    await act(() => result.current.onSubmit());

    expect(container.updatePlant).toHaveBeenCalledWith(42, {
      name: "Jiboia",
      imageUri: "plant.jpg",
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "60",
    });

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("deve atualizar a planta usando null quando os campos opcionais forem undefined", async () => {
    const plant = createPlant({ id: 42 });

    jest.mocked(container.updatePlant).mockResolvedValue(plant);

    const { result } = await renderHook(() => useEditPlant());

    await act(() => {
      result.current.form.setValue("imageUri", undefined);
      result.current.form.setValue("temperatureMin", undefined);
      result.current.form.setValue("temperatureMax", undefined);
      result.current.form.setValue("humidity", undefined);
    });

    await act(() => result.current.onSubmit());

    expect(container.updatePlant).toHaveBeenCalledWith(42, {
      name: "Jiboia",
      imageUri: null,
      location: "Sala",
      sunlight: "medium",
      temperatureMin: null,
      temperatureMax: null,
      humidity: null,
    });
  });

  it("deve exibir alerta quando ocorrer erro ao atualizar a planta", async () => {
    jest.mocked(container.updatePlant).mockRejectedValue(new Error("Erro ao atualizar planta"));

    const { result } = await renderHook(() => useEditPlant());

    await act(() => result.current.onSubmit());

    expect(alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Erro ao atualizar planta",
      [{ text: "Entendi" }],
      expect.any(Object),
    );

    expect(back).not.toHaveBeenCalled();
  });

  it("deve usar a mensagem padrão quando o erro ao atualizar a planta não possuir mensagem", async () => {
    jest.mocked(container.updatePlant).mockRejectedValue({});

    const { result } = await renderHook(() => useEditPlant());

    await act(() => result.current.onSubmit());

    expect(alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Ocorreu um erro inesperado",
      [{ text: "Entendi" }],
      expect.any(Object),
    );

    expect(back).not.toHaveBeenCalled();
  });
});
