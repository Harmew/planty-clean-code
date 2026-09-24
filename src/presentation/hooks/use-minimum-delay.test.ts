import { act, renderHook } from "@testing-library/react-native";

import { useMinimumDelay } from "@presentation/hooks/use-minimum-delay";

describe("use-minimum-delay-hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve iniciar como false quando ready for false", async () => {
    const { result } = await renderHook(() => useMinimumDelay(false, 1000));

    expect(result.current).toBe(false);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);
  });

  it("deve permanecer false antes do delay quando ready mudar para true", async () => {
    const { result, rerender } = await renderHook((ready: boolean) => useMinimumDelay(ready, 1000), {
      initialProps: false,
    });

    await rerender(true);

    await act(() => {
      jest.advanceTimersByTime(999);
    });

    expect(result.current).toBe(false);
  });

  it("deve permitir prosseguir após o delay", async () => {
    const { result, rerender } = await renderHook((ready: boolean) => useMinimumDelay(ready, 1000), {
      initialProps: false,
    });

    await rerender(true);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it("deve usar o delay padrão quando não informado", async () => {
    const { result } = await renderHook(() => useMinimumDelay(true));

    expect(result.current).toBe(false);

    await act(() => {
      jest.advanceTimersByTime(1499);
    });

    expect(result.current).toBe(false);

    await act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe(true);
  });
});
