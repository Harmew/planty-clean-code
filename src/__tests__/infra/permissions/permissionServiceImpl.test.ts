import { Linking } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";

import { permissionService } from "@infra/permissions/permissionServiceImpl";

jest.mock("expo-image-picker", () => ({
  getCameraPermissionsAsync: jest.fn(),
  getMediaLibraryPermissionsAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
}));

jest.mock("expo-notifications", () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
}));

describe("permissionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("busca todas as permissões", async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    });

    (ImagePicker.getCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "denied",
    });

    (ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "undetermined",
    });

    const result = await permissionService.getAll();

    expect(result).toEqual({
      notifications: "granted",
      camera: "denied",
      gallery: "undetermined",
    });
  });

  it("solicita permissão de notificações", async () => {
    (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    });

    const result = await permissionService.requestNotifications();

    expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("retorna false quando a permissão de notificações não é concedida", async () => {
    (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "denied",
    });

    const result = await permissionService.requestNotifications();

    expect(result).toBe(false);
  });

  it("solicita permissão da câmera", async () => {
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    });

    const result = await permissionService.requestCamera();

    expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("retorna false quando a permissão da câmera não é concedida", async () => {
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "denied",
    });

    const result = await permissionService.requestCamera();

    expect(result).toBe(false);
  });

  it("solicita permissão da galeria", async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    });

    const result = await permissionService.requestGallery();

    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("retorna false quando a permissão da galeria não é concedida", async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "denied",
    });

    const result = await permissionService.requestGallery();

    expect(result).toBe(false);
  });

  it("abre as configurações do aplicativo", () => {
    permissionService.openSettings();

    expect(Linking.openSettings).toHaveBeenCalled();
  });
});
