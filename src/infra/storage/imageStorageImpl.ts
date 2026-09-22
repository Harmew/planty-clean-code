import { File, Paths } from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

import type { ImageStorage } from "@domain/services/imageStorage";

export const imageStorage: ImageStorage = {
  async saveImage(uri) {
    // 1. Cria um contexto de manipulação para a imagem
    const context = ImageManipulator.ImageManipulator.manipulate(uri);

    // 2. Redimensiona para até 512 (height e width), mantendo a proporção
    context.resize({ width: 512 });

    // 3. Renderiza a imagem manipulada
    const imageRef = await context.renderAsync();

    // 4. Salva em um arquivo temporário
    const manipulatedResult = await imageRef.saveAsync({
      compress: 0.8, // valor de compressão entre 0 e 1
      format: ImageManipulator.SaveFormat.JPEG,
    });

    // 5. Cria nome único para o arquivo
    const fileName = `${Date.now()}.jpg`;

    // 6. Cria referência do arquivo destino
    const destination = new File(Paths.document, fileName);

    // 7. Copia o arquivo manipulado para o destino
    // OBS: aqui usamos o URI retornado pelo manipulator (manipulatedResult.uri)
    const source = new File(manipulatedResult.uri);
    source.copy(destination);

    // 8. Retorna o URI final (ex: file:///…/Documents/123456789.jpg)
    return destination.uri;
  },

  async deleteImage(path) {
    try {
      // 1. Cria referência do arquivo
      const file = new File(path);

      // 2. Verifica se o arquivo existe
      if (file.exists) {
        // 3. Deleta o arquivo
        file.delete();
      }
    } catch (error) {
      console.warn("Falha ao deletar imagem:", path, error);
    }
  },

  async readImage(path) {
    try {
      const file = new File(path);

      if (!file.exists) {
        return null;
      }

      return file.base64Sync();
    } catch (error) {
      console.warn("Falha ao ler imagem:", path, error);
      return null;
    }
  },

  async saveBase64(base64, fileName) {
    const file = new File(Paths.document, fileName);

    file.write(base64, {
      encoding: "base64",
    });

    return file.uri;
  },
};
