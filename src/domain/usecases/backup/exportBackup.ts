import type { Backup } from "@domain/entities/backup";
import type { CareHistoryRepository } from "@domain/repositories/careHistoryRepository";
import type { CareRepository } from "@domain/repositories/careRepository";
import type { NotificationRepository } from "@domain/repositories/notificationRepository";
import type { PlantRepository } from "@domain/repositories/plantRepository";
import type { BackupStorage } from "@domain/services/backupStorage";
import type { ImageStorage } from "@domain/services/imageStorage";

export const ExportBackup =
  (
    backupStorage: BackupStorage,
    plantRepository: PlantRepository,
    careRepository: CareRepository,
    careHistoryRepository: CareHistoryRepository,
    notificationRepository: NotificationRepository,
    imageStorage: ImageStorage,
  ) =>
  async (password: string): Promise<void> => {
    // 1. Busca dados
    const plants = await plantRepository.getAll();
    const cares = await careRepository.getAll();
    const history = await careHistoryRepository.getAll();
    const notifications = await notificationRepository.getAll();

    // 2. Coleta imagens únicas
    const images: Record<string, string> = {};

    const backupPlants = [];

    for (const plant of plants) {
      if (!plant.image) {
        backupPlants.push(plant);
        continue;
      }

      const fileName = plant.image.split("/").pop();

      if (!fileName) {
        backupPlants.push(plant);
        continue;
      }

      try {
        const base64 = await imageStorage.readImage(plant.image);

        if (!base64) {
          backupPlants.push(plant);
          continue;
        }

        images[fileName] = base64;

        backupPlants.push({
          ...plant,
          image: fileName,
        });
      } catch {
        backupPlants.push(plant);
      }
    }

    const backup: Backup = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      data: {
        plants: backupPlants,
        cares,
        history,
        notifications,
      },
      images,
    };

    await backupStorage.export(backup, password);
  };
