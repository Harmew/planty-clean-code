import type { CareHistoryRepository } from "@domain/repositories/care-history.repository";
import type { CareRepository } from "@domain/repositories/care.repository";
import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { PlantRepository } from "@domain/repositories/plant.repository";

import type { NotificationService } from "@domain/services/notification.service";
import type { BackupStorage } from "@domain/storage/backup.storage";
import type { ImageStorage } from "@domain/storage/image.storage";

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
    const plantIds = new Map<number, number>();

    for (const plant of backup.data.plants) {
      const { id, ...plantData } = plant;
      const createdPlant = await plantRepository.create(plantData);

      plantIds.set(id, createdPlant.id);
    }

    // 6. Restaura os cuidados
    const careIds = new Map<number, number>();

    for (const care of backup.data.cares) {
      const plantId = plantIds.get(care.plantId);

      if (plantId === undefined) {
        continue;
      }

      const { id, ...careData } = care;
      const createdCare = await careRepository.create({
        ...careData,
        plantId,
      });

      careIds.set(id, createdCare.id);
    }

    // 7. Restaura o histórico
    for (const history of backup.data.history) {
      const plantId = plantIds.get(history.plantId);

      if (plantId === undefined) {
        continue;
      }

      const careId = history.careId === null ? null : (careIds.get(history.careId) ?? null);
      const { id, ...historyData } = history;

      await careHistoryRepository.create({
        ...historyData,
        plantId,
        careId,
      });
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

      const plantId = plantIds.get(care.plantId);
      const careId = careIds.get(care.id);
      const plant = plantId === undefined ? undefined : plantsById.get(plantId);

      if (plantId === undefined || !plant || careId === undefined) {
        continue;
      }

      const notificationId = await notificationService.schedule({
        title: getNotificationTitle(care.type),
        body: getNotificationBody(plant.name, care.type),
        date: nextDue,
      });

      await notificationRepository.create({
        plantId,
        careId,
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
