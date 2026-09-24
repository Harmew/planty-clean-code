import type { Plant } from "@domain/entities/plant.entity";
import type { PlantRepository } from "@domain/repositories/plant.repository";
import type { ImageStorage } from "@domain/storage/image.storage";

type UpdatePlantInput = {
  name: string;
  imageUri?: string | null;
  location: string;
  sunlight: "low" | "medium" | "high";
  temperatureMin: string | null;
  temperatureMax: string | null;
  humidity: string | null;
};

export const UpdatePlant =
  (repository: PlantRepository, imageStorage: ImageStorage) => async (id: number, input: UpdatePlantInput) => {
    // 1. Busca planta existente
    const existing = await repository.getById(id);

    // 2. Verifica se a planta existe
    if (!existing) {
      throw new Error("Planta não encontrada");
    }

    // 3. Define os caminhos das imagens
    let newImagePath = existing.image;
    let oldImageToDelete: string | null = null;

    try {
      // 4. Atualiza a imagem (caso tenha mudado)
      if (input.imageUri && input.imageUri !== existing.image) {
        // Salva a nova imagem
        newImagePath = await imageStorage.saveImage(input.imageUri);

        // Só salva o path da imagem antiga para deletar depois
        oldImageToDelete = existing.image;
      }

      // 5. Monta o objeto atualizado
      const updatedPlant: Plant = {
        ...existing,
        name: input.name,
        image: newImagePath,
        location: input.location,
        sunlight: input.sunlight,
        temperatureMin: input.temperatureMin,
        temperatureMax: input.temperatureMax,
        humidity: input.humidity,
      };

      // 6. Atualiza a planta no banco
      await repository.update(updatedPlant);

      // 7. Deleta a imagem antiga (caso tenha mudado)
      if (oldImageToDelete) {
        await imageStorage.deleteImage(oldImageToDelete);
      }

      // 8. Retorna a planta atualizada
      return updatedPlant;
    } catch (error) {
      // Deleta imagem caso contenha algum erro no fluxo de atualização
      if (newImagePath && newImagePath !== existing.image) {
        await imageStorage.deleteImage(newImagePath);
      }

      throw error;
    }
  };
