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

    currentPlants.filter((plant) => plant.image).forEach((plant) => imageStorage.deleteImage(plant.image!));

    // 3. Limpa os dados atuais
    await plantRepository.deleteAll();

    // 4. Restaura as imagens
    Object.entries(backup.images).forEach(([fileName, base64]) => imageStorage.saveBase64(base64, fileName));

    // 5. Restaura as plantas
    const plantIds = new Map<number, number>();

    const createdPlants = await Promise.all(
      backup.data.plants.map(async (plant) => {
        const { id, ...plantData } = plant;
        const createdPlant = await plantRepository.create(plantData);

        return {
          oldId: id,
          newId: createdPlant.id,
        };
      }),
    );

    for (const { oldId, newId } of createdPlants) {
      plantIds.set(oldId, newId);
    }

    // 6. Restaura os cuidados
    const careIds = new Map<number, number>();

    const createdCares = await Promise.all(
      backup.data.cares
        .map((care) => {
          const plantId = plantIds.get(care.plantId);

          if (plantId === undefined) {
            return null;
          }

          return (async () => {
            const { id, ...careData } = care;

            const createdCare = await careRepository.create({
              ...careData,
              plantId,
            });

            return {
              oldId: id,
              newId: createdCare.id,
            };
          })();
        })
        .filter((promise): promise is Promise<{ oldId: number; newId: number }> => promise !== null),
    );

    for (const { oldId, newId } of createdCares) {
      careIds.set(oldId, newId);
    }

    // 7. Restaura o histórico
    await Promise.all(
      backup.data.history.map(async (history) => {
        const plantId = plantIds.get(history.plantId);

        if (plantId === undefined) {
          return;
        }

        const careId = history.careId === null ? null : (careIds.get(history.careId) ?? null);

        const { id, ...historyData } = history;

        await careHistoryRepository.create({
          ...historyData,
          plantId,
          careId,
        });
      }),
    );

    // 8. Recria as notificações futuras
    const plants = await plantRepository.getAll();
    const plantsById = new Map(plants.map((plant) => [plant.id, plant]));
    const now = new Date();

    await Promise.all(
      backup.data.cares.map(async (care) => {
        const nextDue = new Date(care.nextDue);

        if (nextDue <= now) {
          return;
        }

        const plantId = plantIds.get(care.plantId);
        const careId = careIds.get(care.id);
        const plant = plantId === undefined ? undefined : plantsById.get(plantId);

        if (plantId === undefined || !plant || careId === undefined) {
          return;
        }

        const title = getNotificationTitle(care.type);
        const body = getNotificationBody(plant.name, care.type);

        const notificationId = await notificationService.schedule({
          title,
          body,
          date: nextDue,
        });

        await notificationRepository.create({
          plantId,
          careId,
          title,
          body,
          type: care.type,
          read: false,
          scheduledFor: care.nextDue,
          expoNotificationId: notificationId,
          createdAt: new Date().toISOString(),
        });
      }),
    );
  };
