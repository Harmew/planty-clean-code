import { act, fireEvent, render } from "@testing-library/react-native";

import { Switch } from "./switch.component";

describe("switch-component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve renderizar com os valores padrão", async () => {
    const { getByTestId } = await render(<Switch isSelected={false} />);

    const switchComponent = getByTestId("switch");
    const track = getByTestId("switch-track");
    const thumb = getByTestId("switch-thumb");

    expect(switchComponent).toBeTruthy();
    expect(track).toBeTruthy();
    expect(thumb).toBeTruthy();

    expect(switchComponent.props.accessibilityState).toEqual(
      expect.objectContaining({
        disabled: false,
        checked: false,
      }),
    );

    expect(track.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 50,
          height: 24,
          borderRadius: 12,
        }),
      ]),
    );

    expect(thumb.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 20,
          height: 20,
          borderRadius: 10,
        }),
      ]),
    );
  });

  it("deve iniciar o thumb na posição selecionada", async () => {
    const { getByTestId } = await render(<Switch isSelected />);

    const thumb = getByTestId("switch-thumb");

    expect(thumb).toHaveAnimatedStyle({
      transform: [{ translateX: 28 }],
    });
  });

  it("deve iniciar o thumb na posição não selecionada", async () => {
    const { getByTestId } = await render(<Switch isSelected={false} />);

    const thumb = getByTestId("switch-thumb");

    expect(thumb).toHaveAnimatedStyle({
      transform: [{ translateX: 2 }],
    });
  });

  it("deve chamar o haptic e alterar a seleção ao pressionar", async () => {
    const onSelectedChange = jest.fn();

    const { getByTestId } = await render(<Switch isSelected={false} onSelectedChange={onSelectedChange} />);

    await act(() => {
      fireEvent.press(getByTestId("switch"));
    });

    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("deve alterar a seleção para false quando estiver selecionado", async () => {
    const onSelectedChange = jest.fn();

    const { getByTestId } = await render(<Switch isSelected onSelectedChange={onSelectedChange} />);

    await act(() => {
      fireEvent.press(getByTestId("switch"));
    });

    expect(onSelectedChange).toHaveBeenCalledWith(false);
  });

  it("não deve alterar a seleção quando estiver desabilitado", async () => {
    const onSelectedChange = jest.fn();

    const { getByTestId } = await render(<Switch isSelected={false} disabled onSelectedChange={onSelectedChange} />);

    const switchComponent = getByTestId("switch");

    expect(switchComponent.props.accessibilityState).toEqual(
      expect.objectContaining({
        disabled: true,
        checked: false,
      }),
    );

    await act(() => {
      fireEvent.press(switchComponent);
    });

    expect(onSelectedChange).not.toHaveBeenCalled();
  });

  it("não deve falhar quando onSelectedChange não for informado", async () => {
    const { getByTestId } = await render(<Switch isSelected={false} />);

    await act(() => {
      fireEvent.press(getByTestId("switch"));
    });

    expect(getByTestId("switch")).toBeTruthy();
  });

  it("deve animar o thumb ao mudar para selecionado", async () => {
    const { getByTestId, rerender } = await render(<Switch isSelected={false} />);

    const thumb = getByTestId("switch-thumb");

    expect(thumb).toHaveAnimatedStyle({
      transform: [{ translateX: 2 }],
    });

    await act(async () => {
      await rerender(<Switch isSelected />);
    });

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(thumb).toHaveAnimatedStyle({
      transform: [{ translateX: 28 }],
    });
  });

  it("deve animar o thumb ao mudar para não selecionado", async () => {
    const { getByTestId, rerender } = await render(<Switch isSelected />);

    const thumb = getByTestId("switch-thumb");

    expect(thumb).toHaveAnimatedStyle({
      transform: [{ translateX: 28 }],
    });

    await act(async () => {
      await rerender(<Switch isSelected={false} />);
    });

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(thumb).toHaveAnimatedStyle({
      transform: [{ translateX: 2 }],
    });
  });

  it("deve aplicar a animação de cor ao selecionar", async () => {
    const { getByTestId, rerender } = await render(<Switch isSelected={false} />);

    const track = getByTestId("switch-track");

    await act(async () => {
      await rerender(<Switch isSelected />);
    });

    await act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(track).toHaveAnimatedStyle({
      backgroundColor: "rgba(129, 180, 51, 1)",
    });
  });

  it("deve aplicar a animação de cor ao desselecionar", async () => {
    const { getByTestId, rerender } = await render(<Switch isSelected />);

    const track = getByTestId("switch-track");

    await act(async () => {
      await rerender(<Switch isSelected={false} />);
    });

    await act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(track).toHaveAnimatedStyle({
      backgroundColor: "rgba(191, 191, 191, 1)",
    });
  });
});
