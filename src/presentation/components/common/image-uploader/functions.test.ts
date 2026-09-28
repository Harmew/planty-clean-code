import * as ImagePicker from "expo-image-picker";

import { pickMedia } from "./functions";

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  UIImagePickerPresentationStyle: {
    CURRENT_CONTEXT: "currentContext",
  },
}));

describe("pick-media", () => {
  const asset = {
    uri: "file:///plant.jpg",
    width: 1200,
    height: 900,
  } as ImagePicker.ImagePickerAsset;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws when media library permission is denied", async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      status: "denied",
    } as never);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await expect(pickMedia(onSuccess, onError)).rejects.toThrow("Permissão negada");

    expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("opens the image picker with the expected options", async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      status: "granted",
    } as never);

    jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [asset],
    } as never);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await pickMedia(onSuccess, onError);

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 1,
      shouldDownloadFromNetwork: true,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.CURRENT_CONTEXT,
    });
  });

  it("calls onError when the user cancels image selection", async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      status: "granted",
    } as never);

    jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
      canceled: true,
      assets: [],
    } as never);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await pickMedia(onSuccess, onError);

    expect(onError).toHaveBeenCalledWith("Usuário cancelou a seleção de imagem.");
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("calls onSuccess with the selected asset", async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      status: "granted",
    } as never);

    jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [asset],
    } as never);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await pickMedia(onSuccess, onError);

    expect(onSuccess).toHaveBeenCalledWith(asset);
    expect(onError).not.toHaveBeenCalled();
  });
});
