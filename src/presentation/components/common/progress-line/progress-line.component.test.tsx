import { act, fireEvent, render } from "@testing-library/react-native";

import { ProgressLine } from "@presentation/components/common/progress-line";

describe("progress-line-component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve renderizar com os valores padrão", async () => {
    const { getByTestId } = await render(<ProgressLine />);

    const container = getByTestId("progress-line-container");
    const progress = getByTestId("progress-line");

    expect(container).toBeTruthy();
    expect(progress).toBeTruthy();
  });

  it("deve aplicar as propriedades personalizadas", async () => {
    const { getByTestId } = await render(
      <ProgressLine
        maxWidth={300}
        height={10}
        percentage={50}
        activeColor="green500"
        backgroundColor="gray400"
        duration={500}
      />,
    );

    const container = getByTestId("progress-line-container");

    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 10,
          maxWidth: 300,
        }),
      ]),
    );
  });

  it("deve atualizar a largura após o layout do container", async () => {
    const { getByTestId } = await render(<ProgressLine percentage={50} />);

    const container = getByTestId("progress-line-container");
    const progress = getByTestId("progress-line");

    await act(() => {
      fireEvent(container, "layout", {
        nativeEvent: {
          layout: {
            width: 200,
            height: 6,
          },
        },
      });
    });

    await act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(progress).toHaveAnimatedStyle({
      width: 100,
    });
  });

  it("deve limitar a porcentagem máxima a 100", async () => {
    const { getByTestId } = await render(<ProgressLine percentage={150} />);

    const container = getByTestId("progress-line-container");
    const progress = getByTestId("progress-line");

    await act(() => {
      fireEvent(container, "layout", {
        nativeEvent: {
          layout: {
            width: 200,
            height: 6,
          },
        },
      });
    });

    await act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(progress).toHaveAnimatedStyle({
      width: 200,
    });
  });

  it("deve limitar a porcentagem mínima a 0", async () => {
    const { getByTestId } = await render(<ProgressLine percentage={-20} />);

    const container = getByTestId("progress-line-container");
    const progress = getByTestId("progress-line");

    await act(() => {
      fireEvent(container, "layout", {
        nativeEvent: {
          layout: {
            width: 200,
            height: 6,
          },
        },
      });
    });

    await act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(progress).toHaveAnimatedStyle({
      width: 0,
    });
  });

  it("não deve alterar o progresso antes de conhecer a largura", async () => {
    const { getByTestId } = await render(<ProgressLine percentage={50} />);

    const progress = getByTestId("progress-line");

    expect(progress).toHaveAnimatedStyle({
      width: 0,
    });
  });

  it("não deve atualizar a largura novamente após o primeiro layout", async () => {
    const { getByTestId } = await render(<ProgressLine percentage={50} />);

    const container = getByTestId("progress-line-container");
    const progress = getByTestId("progress-line");

    await act(() => {
      fireEvent(container, "layout", {
        nativeEvent: {
          layout: {
            width: 200,
            height: 6,
          },
        },
      });
    });

    await act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(progress).toHaveAnimatedStyle({
      width: 100,
    });

    await act(() => {
      fireEvent(container, "layout", {
        nativeEvent: {
          layout: {
            width: 300,
            height: 6,
          },
        },
      });
    });

    await act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(progress).toHaveAnimatedStyle({
      width: 100,
    });
  });
});
