import type { Backup } from "@domain/entities/backup.entity";
import type { CareHistoryRepository } from "@domain/repositories/care-history.repository";
import type { CareRepository } from "@domain/repositories/care.repository";
import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { PlantRepository } from "@domain/repositories/plant.repository";
import type { BackupStorage } from "@domain/storage/backup.storage";
import type { ImageStorage } from "@domain/storage/image.storage";

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
    const [plants, cares, history, notifications] = await Promise.all([
      plantRepository.getAll(),
      careRepository.getAll(),
      careHistoryRepository.getAll(),
      notificationRepository.getAll(),
    ]);

    // 2. Lê as imagens e troca o caminho local pelo nome do arquivo
    const images: Record<string, string> = {};

    const backupPlants = plants.map((plant) => {
      const fileName = plant.image?.split("/").pop();

      if (!plant.image || !fileName) return plant;

      try {
        const base64 = imageStorage.readImage(plant.image);

        if (!base64) return plant;

        images[fileName] = base64;

        return { ...plant, image: fileName };
      } catch {
        return plant;
      }
    });

    // 3. Monta e grava o backup
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
