import { Image } from "expo-image";
import React from "react";
import { Alert, Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

import { Button } from "../button";
import { Row } from "../row";
import { Spinner } from "../spinner";
import { Typography } from "../typography";

// Shared
import { getThemeColors } from "@shared/utils/theme";

import { FullWindowOverlay } from "../full-window-overlay";
import { pickMedia } from "./functions";
import { createStyles } from "./styles";
import { ImageUploaderProps } from "./types";

export const ImageUploader = ({
  file = null,
  onSelect,
  onClear,
  placeholder = "Enviar imagem",
}: Readonly<ImageUploaderProps>) => {
  const { theme, dark } = useTheme();
  const styles = createStyles(theme);
  const { surface, overlay } = getThemeColors(dark);

  const [isPickingMedia, setIsPickingMedia] = React.useState<boolean>(false);

  const pickImage = async () => {
    try {
      setIsPickingMedia(true);

      await pickMedia(
        (asset) => {
          onSelect(asset.uri);
          setIsPickingMedia(false);
        },
        () => {
          setIsPickingMedia(false);
        },
      );
    } catch (error) {
      setIsPickingMedia(false);
      Alert.alert("Não foi possível selecionar a imagem", String(error));
    }
  };

  if (!file) {
    return (
      <Pressable onPress={pickImage} testID="image-uploader-pressable">
        <Row
          align="center"
          justify="center"
          style={[styles.container, { backgroundColor: surface }]}
          testID="image-uploader"
        >
          <Icons.CloudUpload color="gray500" size={20} />
          <Typography color="gray500">{placeholder}</Typography>

          {isPickingMedia ? (
            <FullWindowOverlay>
              <Animated.View
                entering={FadeIn}
                style={[styles.loadingOverlay, { backgroundColor: overlay }]}
                testID="image-uploader-loading"
              >
                <Spinner color="white" />
                <Typography color="white">Aguarde enquando a imagem é carregada...</Typography>
              </Animated.View>
            </FullWindowOverlay>
          ) : null}
        </Row>
      </Pressable>
    );
  }

  // Com imagem selecionada
  return (
    <Animated.View entering={FadeIn} style={styles.imageContainer} testID="image-uploader-preview">
      <Image source={file} style={styles.image} contentFit="cover" transition={100} testID="image-uploader-image" />
      <Button
        isIconOnly
        color="red500"
        size="sm"
        style={styles.deleteIcon}
        onPress={onClear}
        testID="image-uploader-clear"
      >
        <Icons.Trash color="white" size={20} />
      </Button>
    </Animated.View>
  );
};
