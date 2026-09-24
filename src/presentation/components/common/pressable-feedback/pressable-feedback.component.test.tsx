import { act, fireEvent, render } from "@testing-library/react-native";

import { Text } from "react-native";

import { container } from "@di/container";

import { PressableFeedback } from "@presentation/components/common/pressable-feedback";

jest.mock("@di/container", () => ({
  container: {
    hapticsService: {
      buttonPress: jest.fn(),
    },
  },
}));

describe("pressable-feedback-component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve renderizar os filhos", async () => {
    const { getByText } = await render(
      <PressableFeedback>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    expect(getByText("Conteúdo")).toBeTruthy();
  });

  it("deve renderizar os filhos como função com pressed falso", async () => {
    const { getByText } = await render(
      <PressableFeedback>
        {({ pressed }) => <Text>{pressed ? "Pressionado" : "Não pressionado"}</Text>}
      </PressableFeedback>,
    );

    expect(getByText("Não pressionado")).toBeTruthy();
  });

  it("deve alterar pressed para true ao pressionar", async () => {
    const { getByTestId, getByText } = await render(
      <PressableFeedback>
        {({ pressed }) => <Text>{pressed ? "Pressionado" : "Não pressionado"}</Text>}
      </PressableFeedback>,
    );

    const pressable = getByTestId("pressable-feedback");

    await act(() => {
      fireEvent(pressable, "pressIn");
    });

    expect(getByText("Pressionado")).toBeTruthy();
  });

  it("deve alterar pressed para false ao soltar", async () => {
    const { getByTestId, getByText } = await render(
      <PressableFeedback>
        {({ pressed }) => <Text>{pressed ? "Pressionado" : "Não pressionado"}</Text>}
      </PressableFeedback>,
    );

    const pressable = getByTestId("pressable-feedback");

    await act(() => {
      fireEvent(pressable, "pressIn");
    });

    expect(getByText("Pressionado")).toBeTruthy();

    await act(() => {
      fireEvent(pressable, "pressOut");
    });

    expect(getByText("Não pressionado")).toBeTruthy();
  });

  it("deve executar o feedback háptico ao pressionar", async () => {
    const { getByTestId } = await render(
      <PressableFeedback>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    await act(() => {
      fireEvent(getByTestId("pressable-feedback"), "pressIn");
    });

    expect(container.hapticsService.buttonPress).toHaveBeenCalledTimes(1);
  });

  it("deve executar onPressIn ao pressionar", async () => {
    const onPressIn = jest.fn();

    const { getByTestId } = await render(
      <PressableFeedback onPressIn={onPressIn}>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    await act(() => {
      fireEvent(getByTestId("pressable-feedback"), "pressIn");
    });

    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it("deve executar onPressOut ao soltar", async () => {
    const onPressOut = jest.fn();

    const { getByTestId } = await render(
      <PressableFeedback onPressOut={onPressOut}>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    await act(() => {
      fireEvent(getByTestId("pressable-feedback"), "pressOut");
    });

    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it("não deve executar eventos quando estiver desabilitado", async () => {
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();

    const { getByTestId } = await render(
      <PressableFeedback disabled onPressIn={onPressIn} onPressOut={onPressOut}>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    const pressable = getByTestId("pressable-feedback");

    await act(() => {
      fireEvent(pressable, "pressIn");
      fireEvent(pressable, "pressOut");
    });

    expect(onPressIn).not.toHaveBeenCalled();
    expect(onPressOut).not.toHaveBeenCalled();
    expect(container.hapticsService.buttonPress).not.toHaveBeenCalled();
  });

  it("deve utilizar o testID personalizado", async () => {
    const { getByTestId } = await render(
      <PressableFeedback testID="custom-pressable">
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    expect(getByTestId("custom-pressable")).toBeTruthy();
  });

  it("deve possuir role de botão", async () => {
    const { getByTestId } = await render(
      <PressableFeedback>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    const pressable = getByTestId("pressable-feedback");

    expect(pressable.props.accessibilityRole).toBe("button");
  });

  it("deve informar disabled na acessibilidade", async () => {
    const { getByTestId } = await render(
      <PressableFeedback disabled>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    const pressable = getByTestId("pressable-feedback");

    expect(pressable.props.accessibilityState).toEqual({
      disabled: true,
    });
  });

  it("deve aceitar scaleValue personalizado", async () => {
    const { getByTestId } = await render(
      <PressableFeedback scaleValue={0.95}>
        <Text>Conteúdo</Text>
      </PressableFeedback>,
    );

    await act(() => {
      fireEvent(getByTestId("pressable-feedback"), "pressIn");
    });

    expect(container.hapticsService.buttonPress).toHaveBeenCalledTimes(1);
  });
});
