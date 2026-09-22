import type { PlantRepository } from "@domain/repositories/plantRepository";
import type { ImageStorage } from "@domain/services/imageStorage";

type CreatePlantInput = {
  name: string;
  imageUri: string | null;
  location: string;
  sunlight: "low" | "medium" | "high";
  temperatureMin: string | null;
  temperatureMax: string | null;
  humidity: string | null;
};

export const CreatePlant =
  (repository: PlantRepository, imageStorage: ImageStorage) => async (input: CreatePlantInput) => {
    let imagePath: string | null = null;

    try {
      if (input.imageUri) {
        imagePath = await imageStorage.saveImage(input.imageUri);
      }

      const plant = await repository.create({
        name: input.name,
        image: imagePath,
        location: input.location,
        sunlight: input.sunlight,
        temperatureMin: input.temperatureMin,
        temperatureMax: input.temperatureMax,
        humidity: input.humidity,
        createdAt: new Date().toISOString(),
      });

      return plant;
    } catch (error) {
      if (imagePath) {
        await imageStorage.deleteImage(imagePath);
      }

      throw error;
    }
  };
