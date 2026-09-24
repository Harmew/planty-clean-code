import { act, render } from "@testing-library/react-native";

import { Spinner } from "@presentation/components/common/spinner";

describe("spinner-component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve renderizar com os valores padrão", async () => {
    const { getByTestId } = await render(<Spinner />);

    const container = getByTestId("spinner-container");
    const animatedSpinner = getByTestId("spinner-animated");
    const spinner = getByTestId("spinner-svg");

    expect(container).toBeTruthy();
    expect(animatedSpinner).toBeTruthy();
    expect(spinner).toBeTruthy();
  });

  it("deve aplicar o tamanho personalizado", async () => {
    const { getByTestId } = await render(<Spinner size={32} />);

    const spinner = getByTestId("spinner-svg");

    expect(spinner.props.width).toBe(32);
    expect(spinner.props.height).toBe(32);
  });

  it("deve aplicar o estilo personalizado no container", async () => {
    const style = {
      marginTop: 16,
      padding: 8,
    };

    const { getByTestId } = await render(<Spinner style={style} />);

    const container = getByTestId("spinner-container");

    expect(container.props.style).toEqual(expect.arrayContaining([expect.objectContaining(style)]));
  });

  it("deve iniciar a animação de rotação", async () => {
    const { getByTestId } = await render(<Spinner />);

    const animatedSpinner = getByTestId("spinner-animated");

    await act(() => {
      jest.advanceTimersByTime(900);
    });

    expect(animatedSpinner).toHaveAnimatedStyle({
      transform: [{ rotate: "360deg" }],
    });
  });

  it("deve utilizar a duração personalizada da animação", async () => {
    const { getByTestId } = await render(<Spinner duration={500} />);

    const animatedSpinner = getByTestId("spinner-animated");

    await act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(animatedSpinner).toHaveAnimatedStyle({
      transform: [{ rotate: "360deg" }],
    });
  });

  it("deve reiniciar a animação quando a duração mudar", async () => {
    const { getByTestId, rerender } = await render(<Spinner duration={900} />);

    const animatedSpinner = getByTestId("spinner-animated");

    await act(() => {
      jest.advanceTimersByTime(900);
    });

    expect(animatedSpinner).toHaveAnimatedStyle({
      transform: [{ rotate: "360deg" }],
    });

    await act(() => {
      rerender(<Spinner duration={1200} />);
    });

    await act(() => {
      jest.advanceTimersByTime(1200);
    });

    expect(animatedSpinner).toHaveAnimatedStyle({
      transform: [{ rotate: "360deg" }],
    });
  });
});
