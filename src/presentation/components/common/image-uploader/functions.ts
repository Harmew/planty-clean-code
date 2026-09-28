// Expo Image Picker
import * as ImagePicker from "expo-image-picker";

export const pickMedia = async (
  onSuccess: (asset: ImagePicker.ImagePickerAsset) => void,
  onError: (e: unknown) => void,
) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permissão negada");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    selectionLimit: 1,
    shouldDownloadFromNetwork: true,
    presentationStyle: ImagePicker.UIImagePickerPresentationStyle.CURRENT_CONTEXT,
  });

  if (result.canceled) {
    onError("Usuário cancelou a seleção de imagem.");
    return;
  }

  onSuccess(result.assets[0]);
};
