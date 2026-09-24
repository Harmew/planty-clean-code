import { act, fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";

import { Button } from "@presentation/components/common/button";

describe("button-component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve renderizar os children", async () => {
    const { getByText } = await render(
      <Button>
        <Text>Continuar</Text>
      </Button>,
    );

    expect(getByText("Continuar")).toBeTruthy();
  });

  it("deve executar onPress", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <Button onPress={onPress}>
        <Text>Continuar</Text>
      </Button>,
    );

    await act(() => {
      fireEvent.press(getByTestId("pressable-feedback"));
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("deve executar onPressIn", async () => {
    const onPressIn = jest.fn();

    const { getByTestId } = await render(
      <Button onPressIn={onPressIn}>
        <Text>Continuar</Text>
      </Button>,
    );

    await act(() => {
      fireEvent(getByTestId("pressable-feedback"), "pressIn");
    });

    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it("deve executar onPressOut", async () => {
    const onPressOut = jest.fn();

    const { getByTestId } = await render(
      <Button onPressOut={onPressOut}>
        <Text>Continuar</Text>
      </Button>,
    );

    await act(() => {
      fireEvent(getByTestId("pressable-feedback"), "pressOut");
    });

    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it("deve aplicar o tamanho sm", async () => {
    const { getByTestId } = await render(
      <Button size="sm">
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 36,
        }),
      ]),
    );
  });

  it("deve aplicar o tamanho md por padrão", async () => {
    const { getByTestId } = await render(
      <Button>
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 48,
        }),
      ]),
    );
  });

  it("deve aplicar o tamanho lg", async () => {
    const { getByTestId } = await render(
      <Button size="lg">
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 56,
        }),
      ]),
    );
  });

  it("deve aplicar a cor personalizada", async () => {
    const { getByTestId } = await render(
      <Button color="red500">
        <Text>Excluir</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#F93634",
        }),
      ]),
    );
  });

  it("deve aplicar opacity quando estiver desabilitado", async () => {
    const { getByTestId } = await render(
      <Button disabled>
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({
        disabled: true,
      }),
    );

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          opacity: 0.8,
        }),
      ]),
    );
  });

  it("não deve alterar opacity quando estiver habilitado", async () => {
    const { getByTestId } = await render(
      <Button>
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({
        disabled: false,
      }),
    );

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          opacity: 1,
        }),
      ]),
    );
  });

  it("deve aplicar isIconOnly", async () => {
    const { getByTestId } = await render(
      <Button isIconOnly>
        <Text>+</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.accessibilityLabel).toBe("Botão de ação");

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          aspectRatio: 1,
        }),
      ]),
    );
  });

  it("não deve definir accessibilityLabel para botão normal", async () => {
    const { getByTestId } = await render(
      <Button>
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.accessibilityLabel).toBeUndefined();
  });

  it("deve renderizar Spinner durante o loading", async () => {
    const { getByTestId, queryByText } = await render(
      <Button isLoading>
        <Text>Continuar</Text>
      </Button>,
    );

    expect(getByTestId("spinner-container")).toBeTruthy();
    expect(queryByText("Continuar")).toBeNull();
  });

  it("deve desabilitar durante o loading", async () => {
    const { getByTestId } = await render(
      <Button isLoading>
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({
        disabled: true,
      }),
    );
  });

  it.each([
    ["sm", 16],
    ["md", 20],
    ["lg", 24],
  ] as const)("deve usar o tamanho correto do Spinner para %s", async (size, expectedSize) => {
    const { getByTestId } = await render(
      <Button isLoading size={size}>
        <Text>Continuar</Text>
      </Button>,
    );

    const spinner = getByTestId("spinner-svg");

    expect(spinner.props.width).toBe(expectedSize);
    expect(spinner.props.height).toBe(expectedSize);
  });

  it("deve aceitar children como função", async () => {
    const { getByText } = await render(
      <Button>{({ pressed }) => <Text>{pressed ? "Pressionado" : "Normal"}</Text>}</Button>,
    );

    expect(getByText("Normal")).toBeTruthy();
  });

  it("deve aplicar style personalizado", async () => {
    const { getByTestId } = await render(
      <Button style={{ marginTop: 20 }}>
        <Text>Continuar</Text>
      </Button>,
    );

    const button = getByTestId("pressable-feedback");

    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 20,
        }),
      ]),
    );
  });

  it("deve aceitar testID personalizado", async () => {
    const { getByTestId } = await render(
      <Button testID="button-continuar">
        <Text>Continuar</Text>
      </Button>,
    );

    expect(getByTestId("button-continuar")).toBeTruthy();
  });
});
