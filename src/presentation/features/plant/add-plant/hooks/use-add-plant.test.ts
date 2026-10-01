import { act, renderHook } from "@testing-library/react-native";

import { Alert } from "react-native";

import { useRouter } from "expo-router";

import { container } from "@di/container";

import { createPlant } from "@mocks/fixtures/plant.fixture";

import { useAddPlant } from "./use-add-plant";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
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
  const replace = jest.fn();
  const back = jest.fn();

  let alert: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useRouter).mockReturnValue({
      replace,
      back,
    } as unknown as ReturnType<typeof useRouter>);

    alert = jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alert.mockRestore();
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

  it("deve exibir alerta quando tentar gerar dados sem informar o nome", async () => {
    const { result } = await renderHook(() => useAddPlant());

    await act(() => result.current.handleAutoComplete());

    expect(alert).toHaveBeenCalledWith(
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

    const [, , buttons] = alert.mock.calls[0];

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

    expect(result.current.form.getValues("sunlight")).toBe("high");
    expect(result.current.form.getValues("temperatureMin")).toBe("18");
    expect(result.current.form.getValues("temperatureMax")).toBe("30");
    expect(result.current.form.getValues("humidity")).toBe("70");

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

    expect(alert).toHaveBeenCalledWith(
      "Planty informa",
      "Erro ao gerar dados",
      [{ text: "Entendi" }],
      expect.any(Object),
    );

    expect(result.current.isGenerating).toBe(false);
  });

  it("deve criar a planta e exibir alerta de sucesso", async () => {
    const plant = createPlant({ id: 42 });

    jest.mocked(container.createPlant).mockResolvedValue(plant);

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    expect(container.createPlant).toHaveBeenCalledWith({
      name: "Jiboia",
      imageUri: null,
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "",
      temperatureMax: "",
      humidity: "",
    });

    expect(alert).toHaveBeenCalledWith(
      "Planta adicionada com sucesso",
      "Adicione seus cuidados para começar a monitorar sua planta e receber notificações personalizadas",
      expect.any(Array),
      expect.any(Object),
    );
  });

  it("deve navegar para a planta ao escolher adicionar agora", async () => {
    const plant = createPlant({ id: 42 });

    jest.mocked(container.createPlant).mockResolvedValue(plant);

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    const [, , buttons] = alert.mock.calls[0];

    await act(() => {
      buttons?.[0]?.onPress?.();
    });

    expect(replace).toHaveBeenCalledWith({
      pathname: "/my-plant",
      params: {
        id: 42,
      },
    });
  });

  it("deve voltar ao escolher adicionar depois", async () => {
    const plant = createPlant({ id: 42 });

    jest.mocked(container.createPlant).mockResolvedValue(plant);

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    const [, , buttons] = alert.mock.calls[0];

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

    expect(alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Erro ao criar planta",
      [{ text: "Entendi" }],
      expect.any(Object),
    );
  });

  it("deve criar a planta usando null quando os campos opcionais forem undefined", async () => {
    const plant = createPlant({ id: 42 });

    jest.mocked(container.createPlant).mockResolvedValue(plant);

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
      result.current.form.setValue("imageUri", undefined);
      result.current.form.setValue("temperatureMin", undefined);
      result.current.form.setValue("temperatureMax", undefined);
      result.current.form.setValue("humidity", undefined);
    });

    await act(() => result.current.onSubmit());

    expect(container.createPlant).toHaveBeenCalledWith({
      name: "Jiboia",
      imageUri: null,
      location: "Sala",
      sunlight: "medium",
      temperatureMin: null,
      temperatureMax: null,
      humidity: null,
    });
  });

  it("deve usar a mensagem padrão quando o erro ao gerar os dados não possuir mensagem", async () => {
    jest.mocked(container.generatePlantData).mockRejectedValue({});

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
    });

    await act(() => result.current.handleAutoComplete());

    expect(alert).toHaveBeenCalledWith(
      "Planty informa",
      "Ocorreu um erro inesperado",
      [{ text: "Entendi" }],
      expect.any(Object),
    );

    expect(result.current.isGenerating).toBe(false);
  });

  it("deve usar a mensagem padrão quando o erro ao criar a planta não possuir mensagem", async () => {
    jest.mocked(container.createPlant).mockRejectedValue({});

    const { result } = await renderHook(() => useAddPlant());

    await act(() => {
      result.current.form.setValue("name", "Jiboia");
      result.current.form.setValue("location", "Sala");
    });

    await act(() => result.current.onSubmit());

    expect(alert).toHaveBeenCalledWith(
      "Algo deu errado",
      "Ocorreu um erro inesperado",
      [{ text: "Entendi" }],
      expect.any(Object),
    );
  });
});
