import { act, renderHook, waitFor } from "@testing-library/react-native";

import { Alert } from "react-native";

import { useRouter } from "expo-router";

import { container } from "@di/container";

import { useTheme } from "@presentation/hooks/use-theme";

import { usePermissions } from "./use-permissions";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: jest.fn(),
}));

describe("use-permissions", () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    (useRouter as jest.Mock).mockReturnValue({
      replace,
    });

    (useTheme as jest.Mock).mockReturnValue({
      dark: false,
    });

    jest.spyOn(container, "getPermissions").mockResolvedValue({
      notifications: "granted",
      camera: "denied",
      gallery: "undetermined",
    });

    jest.spyOn(container, "requestNotificationPermission").mockResolvedValue(true);

    jest.spyOn(container, "requestCameraPermission").mockResolvedValue(true);

    jest.spyOn(container, "requestGalleryPermission").mockResolvedValue(true);

    jest.spyOn(container, "openAppSettings").mockImplementation(() => {});
  });

  it("deve iniciar com as permissões carregadas", async () => {
    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(result.current.permissions).toEqual({
        notifications: "granted",
        camera: "denied",
        gallery: "undetermined",
      });
    });

    expect(container.getPermissions).toHaveBeenCalledTimes(1);
  });

  it("deve solicitar permissão de notificações e atualizar o estado", async () => {
    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.requestPermission("notifications");
    });

    expect(container.requestNotificationPermission).toHaveBeenCalledTimes(1);
    expect(result.current.permissions.notifications).toBe("granted");
  });

  it("deve solicitar permissão da câmera e atualizar o estado", async () => {
    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.requestPermission("camera");
    });

    expect(container.requestCameraPermission).toHaveBeenCalledTimes(1);
    expect(result.current.permissions.camera).toBe("granted");
  });

  it("deve solicitar permissão da galeria e atualizar o estado", async () => {
    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.requestPermission("gallery");
    });

    expect(container.requestGalleryPermission).toHaveBeenCalledTimes(1);
    expect(result.current.permissions.gallery).toBe("granted");
  });

  it("deve atualizar a permissão para denied quando a solicitação for negada", async () => {
    jest.spyOn(container, "requestCameraPermission").mockResolvedValue(false);

    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.requestPermission("camera");
    });

    expect(result.current.permissions.camera).toBe("denied");
  });

  it("deve navegar para all-right quando todas as permissões forem concedidas", async () => {
    jest.spyOn(container, "getPermissions").mockResolvedValue({
      notifications: "granted",
      camera: "granted",
      gallery: "granted",
    });

    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      result.current.handleContinue();
    });

    expect(replace).toHaveBeenCalledWith("/(onboarding)/all-right");
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it("deve exibir alerta quando alguma permissão não for concedida", async () => {
    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      result.current.handleContinue();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Permissões necessárias",
      "As permissões são necessárias como notificações, câmera e galeria para que o aplicativo funcione corretamente",
      expect.any(Array),
      {
        cancelable: false,
        userInterfaceStyle: "light",
      },
    );

    expect(replace).not.toHaveBeenCalled();
  });

  it("deve abrir as configurações ao pressionar Ajustes", async () => {
    const { result } = await renderHook(() => usePermissions());

    await waitFor(() => {
      expect(container.getPermissions).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      result.current.handleContinue();
    });

    expect(Alert.alert).toHaveBeenCalled();

    const alertCall = (Alert.alert as jest.Mock).mock.calls.at(-1);
    const buttons = alertCall?.[2];

    await act(async () => {
      buttons?.[0]?.onPress?.();
    });

    expect(container.openAppSettings).toHaveBeenCalled();
  });
});
