import { renderHook } from "@testing-library/react-native";

import { usePathname, useRouter } from "expo-router";

import { BackHandler, Platform, ToastAndroid, type HardwareBackPressEvent } from "react-native";

import { useAndroidBackHandler } from "./use-android-back-handler";

jest.mock("expo-router", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe("use-android-back-handler-hook", () => {
  const back = jest.fn();
  const canGoBack = jest.fn();
  const remove = jest.fn();

  const addEventListener = jest.spyOn(BackHandler, "addEventListener");
  const exitApp = jest.spyOn(BackHandler, "exitApp");
  const toast = jest.spyOn(ToastAndroid, "show").mockImplementation(() => {});

  const originalPlatform = Platform.OS;
  const backEvent = {} as HardwareBackPressEvent;

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(Platform, "OS", {
      configurable: true,
      value: "android",
    });

    (useRouter as jest.Mock).mockReturnValue({
      back,
      canGoBack,
    });

    (usePathname as jest.Mock).mockReturnValue("/minhas-plantas");

    addEventListener.mockReturnValue({
      remove,
    } as ReturnType<typeof BackHandler.addEventListener>);
  });

  afterEach(() => {
    Object.defineProperty(Platform, "OS", {
      configurable: true,
      value: originalPlatform,
    });
  });

  it("não deve registrar o listener no iOS", async () => {
    Object.defineProperty(Platform, "OS", {
      configurable: true,
      value: "ios",
    });

    await renderHook(() => useAndroidBackHandler());

    expect(addEventListener).not.toHaveBeenCalled();
  });

  it("deve registrar o listener no Android", async () => {
    await renderHook(() => useAndroidBackHandler());

    expect(addEventListener).toHaveBeenCalledWith("hardwareBackPress", expect.any(Function));
  });

  it("deve voltar na navegação quando houver histórico", async () => {
    canGoBack.mockReturnValue(true);

    await renderHook(() => useAndroidBackHandler());

    const backAction = addEventListener.mock.calls[0][1];
    const result = backAction(backEvent);

    expect(canGoBack).toHaveBeenCalledTimes(1);
    expect(back).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
    expect(exitApp).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });

  it("deve exibir mensagem ao pressionar voltar pela primeira vez na tela inicial", async () => {
    canGoBack.mockReturnValue(false);

    await renderHook(() => useAndroidBackHandler());

    const backAction = addEventListener.mock.calls[0][1];
    const result = backAction(backEvent);

    expect(toast).toHaveBeenCalledWith("Pressione novamente para sair", ToastAndroid.SHORT);
    expect(exitApp).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("deve sair do aplicativo ao pressionar voltar novamente dentro de 2 segundos", async () => {
    canGoBack.mockReturnValue(false);

    const nowSpy = jest.spyOn(Date, "now").mockReturnValueOnce(1000).mockReturnValueOnce(2500);

    await renderHook(() => useAndroidBackHandler());

    const backAction = addEventListener.mock.calls[0][1];

    backAction(backEvent);
    backAction(backEvent);

    expect(exitApp).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledTimes(1);

    nowSpy.mockRestore();
  });

  it("deve retornar false em outra rota quando não houver histórico", async () => {
    canGoBack.mockReturnValue(false);
    (usePathname as jest.Mock).mockReturnValue("/meus-cuidados");

    await renderHook(() => useAndroidBackHandler());

    const backAction = addEventListener.mock.calls[0][1];
    const result = backAction(backEvent);

    expect(result).toBe(false);
    expect(back).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
    expect(exitApp).not.toHaveBeenCalled();
  });

  it("deve remover o listener ao desmontar", async () => {
    const { unmount } = await renderHook(() => useAndroidBackHandler());

    await unmount();

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
