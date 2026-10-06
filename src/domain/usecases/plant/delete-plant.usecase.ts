import type { PlantRepository } from "@domain/repositories/plant.repository";
import type { ImageStorage } from "@domain/storage/image.storage";

import type { CancelNotificationsByPlant } from "@domain/usecases/notification/cancel-notifications-by-plant.usecase";

export const DeletePlant =
  (repository: PlantRepository, imageStorage: ImageStorage, cancelNotificationsByPlant: CancelNotificationsByPlant) =>
  async (id: number) => {
    const existing = await repository.getById(id);
    if (!existing) return;

    // 1. Cancela as notificações da planta
    await cancelNotificationsByPlant(id);

    // 2. Deleta a planta do banco
    await repository.delete(id);

    // 3. Deleta a imagem da planta (caso exista)
    if (existing.image) imageStorage.deleteImage(existing.image);
  };
