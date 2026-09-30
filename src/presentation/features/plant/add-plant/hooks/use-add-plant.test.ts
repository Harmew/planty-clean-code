import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";

import { container } from "@di/container";

import { useAddPlant } from "./use-add-plant";

const replace = jest.fn();
const back = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace,
    back,
  }),
}));

jest.mock("@di/container", () => ({
  container: {
    createPlant: jest.fn(),
    generatePlantData: jest.fn(),
  },
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

describe("useAddPlant", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve iniciar o formulário com os valores padrão", async () => {
    const { result } = await renderHook(() => useAddPlant());

    expect(result.current.form.getValues()).toEqual({
      imageUri: null,
      name: "",
      location: "",
      sunlight: "medium",
      temperatureMin: "",
      temperatureMax: "",
      humidity: "",
    });

    expect(result.current.isGenerating).toBe(false);
  });

  it("deve disponibilizar as referências dos campos", async () => {
    const { result } = await renderHook(() => useAddPlant());

    expect(result.current.refs.nameRef).toBeDefined();
    expect(result.current.refs.locationRef).toBeDefined();
    expect(result.current.refs.temperatureMinRef).toBeDefined();
    expect(result.current.refs.temperatureMaxRef).toBeDefined();
    expect(result.current.refs.humidityRef).toBeDefined();
  });

  it("deve exibir alerta quando tentar gerar dados sem informar o nome", async () => {
    const { result } = await renderHook(() => useAddPlant());

    await act(() => result.current.handleAutoComplete());

    expect(Alert.alert).toHaveBeenCalledWith(
      "Planty informa",
      "Para gerar os dados da planta, informe o nome dela",
      expect.any(Array),
      expect.any(Object),
    );

    expect(container.generatePlantData).not.toHaveBeenCalled();
  });

  it("deve focar o campo de nome ao confirmar o alerta de nome obrigatório", async () => {
    const { result } = await renderHook(() => useAddPlant());

    const focus = jest.fn();

    result.current.refs.nameRef.current = {
      focus,
    } as never;

    await act(() => result.current.handleAutoComplete());

    const [, , buttons] = jest.mocked(Alert.alert).mock.calls[0];

    await act(() => {
      buttons?.[0]?.onPress?.();
    });

    expect(focus).toHaveBeenCalledTimes(1);
  });

  it("deve gerar e preencher os dados da planta", async () => {
    jest.mocked(container.generatePlantData).mockResolvedValue({
      sunlight: "high",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    });

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
    });

    await act(() => result.current.handleAutoComplete());

    expect(container.generatePlantData).toHaveBeenCalledWith("Jiboia");

    expect(result.current.form.getValues()).toEqual(
      expect.objectContaining({
        name: "Jiboia",
        sunlight: "high",
        temperatureMin: "18",
        temperatureMax: "30",
        humidity: "70",
      }),
    );

    expect(result.current.isGenerating).toBe(false);
  });

  it("deve remover espaços do nome antes de gerar os dados", async () => {
    jest.mocked(container.generatePlantData).mockResolvedValue({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    });

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "  Jiboia  ");
    });

    await act(() => result.current.handleAutoComplete());

    expect(container.generatePlantData).toHaveBeenCalledWith("Jiboia");
  });

  it("deve exibir alerta quando ocorrer erro ao gerar os dados", async () => {
    jest.mocked(container.generatePlantData).mockRejectedValue(new Error("Erro ao gerar dados"));

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
    });

    await act(() => result.current.handleAutoComplete());

    expect(Alert.alert).toHaveBeenCalledWith(
      "Planty informa",
      "Erro ao gerar dados",
      [{ text: "Entendi" }],
      expect.any(Object),
    );

    expect(result.current.isGenerating).toBe(false);
  });

  it("deve criar a planta e exibir alerta de sucesso", async () => {
    jest.mocked(container.createPlant).mockResolvedValue({
      id: 42,
    });

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
      result.current.form.setValue("sunlight", "medium");
      result.current.form.setValue("temperatureMin", "18");
      result.current.form.setValue("temperatureMax", "30");
      result.current.form.setValue("humidity", "70");
    });

    await act(() => result.current.onSubmit());

    expect(container.createPlant).toHaveBeenCalledWith({
      name: "Jiboia",
      imageUri: null,
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "70",
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Planta adicionada com sucesso",
      "Adicione seus cuidados para começar a monitorar sua planta e receber notificações personalizadas",
      expect.any(Array),
      expect.any(Object),
    );
  });

  it("deve navegar para a planta ao escolher adicionar agora", async () => {
    jest.mocked(container.createPlant).mockResolvedValue({
      id: 42,
    });

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    const [, , buttons] = jest.mocked(Alert.alert).mock.calls[0];

    await act(() => {
      buttons?.[0]?.onPress?.();
    });

    expect(replace).toHaveBeenCalledWith({
      pathname: "/my-plant",
      params: { id: 42 },
    });
  });

  it("deve voltar ao escolher adicionar depois", async () => {
    jest.mocked(container.createPlant).mockResolvedValue({
      id: 42,
    });

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    const [, , buttons] = jest.mocked(Alert.alert).mock.calls[0];

    await act(() => {
      buttons?.[1]?.onPress?.();
    });

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("deve exibir alerta quando ocorrer erro ao criar a planta", async () => {
    jest.mocked(container.createPlant).mockRejectedValue(new Error("Erro ao criar planta"));

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    expect(Alert.alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Erro ao criar planta",
      [{ text: "Entendi" }],
      expect.any(Object),
    );
  });
});
