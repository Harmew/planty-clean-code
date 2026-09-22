import type { CareHistoryRepository } from "@domain/repositories/careHistoryRepository";
import type { CareRepository } from "@domain/repositories/careRepository";
import type { NotificationRepository } from "@domain/repositories/notificationRepository";
import type { PlantRepository } from "@domain/repositories/plantRepository";

import type { BackupStorage } from "@domain/services/backupStorage";
import type { ImageStorage } from "@domain/services/imageStorage";
import type { NotificationService } from "@domain/services/notificationService";

import { getNotificationBody, getNotificationTitle } from "@shared/utils/notification";

export const ImportBackup =
  (
    backupStorage: BackupStorage,
    plantRepository: PlantRepository,
    careRepository: CareRepository,
    careHistoryRepository: CareHistoryRepository,
    notificationRepository: NotificationRepository,
    imageStorage: ImageStorage,
    notificationService: NotificationService,
  ) =>
  async (password: string): Promise<void> => {
    const backup = await backupStorage.import(password);

    if (!backup) {
      return;
    }

    // 1. Remove notificações agendadas atuais
    await notificationService.cancelAll();

    // 2. Remove imagens atuais
    const currentPlants = await plantRepository.getAll();

    for (const plant of currentPlants) {
      if (plant.image) {
        await imageStorage.deleteImage(plant.image);
      }
    }

    // 3. Limpa os dados atuais
    await notificationService.cancelAll();
    await plantRepository.deleteAll();

    // 4. Restaura as imagens
    for (const [fileName, base64] of Object.entries(backup.images)) {
      await imageStorage.saveBase64(base64, fileName);
    }

    // 5. Restaura as plantas
    for (const plant of backup.data.plants) {
      await plantRepository.create(plant);
    }

    // 6. Restaura os cuidados
    for (const care of backup.data.cares) {
      await careRepository.create(care);
    }

    // 7. Restaura o histórico
    for (const history of backup.data.history) {
      await careHistoryRepository.create(history);
    }

    // 8. Recria as notificações futuras
    const plants = await plantRepository.getAll();

    const plantsById = new Map(plants.map((plant) => [plant.id, plant]));

    const now = new Date();

    for (const care of backup.data.cares) {
      const nextDue = new Date(care.nextDue);

      if (nextDue <= now) {
        continue;
      }

      const plant = plantsById.get(care.plantId);

      if (!plant) {
        continue;
      }

      const notificationId = await notificationService.schedule({
        title: getNotificationTitle(care.type),
        body: getNotificationBody(plant.name, care.type),
        date: nextDue,
      });

      await notificationRepository.create({
        plantId: care.plantId,
        careScheduleId: care.id,
        title: getNotificationTitle(care.type),
        body: getNotificationBody(plant.name, care.type),
        type: care.type,
        read: false,
        scheduledFor: care.nextDue,
        expoNotificationId: notificationId,
        createdAt: new Date().toISOString(),
      });
    }
  };
