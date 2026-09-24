import type { PlantRepository } from "@domain/repositories/plant.repository";
import type { ImageStorage } from "@domain/storage/image.storage";

import type { CancelNotificationsByPlant } from "@domain/usecases/notification/cancel-notifications-by-plant.usecase";

export const DeletePlant =
  (repository: PlantRepository, imageStorage: ImageStorage, cancelNotificationsByPlant: CancelNotificationsByPlant) =>
  async (id: number) => {
    // 1. Busca planta existente
    const existing = await repository.getById(id);

    // 2. Verifica se a planta existe
    if (!existing) {
      return;
    }

    // 3. Cancela as notificações da planta
    await cancelNotificationsByPlant(id);

    // 4. Deleta a planta do banco
    await repository.delete(id);

    // 5. Deleta a imagem da planta (caso exista)
    if (existing.image) {
      await imageStorage.deleteImage(existing.image);
    }
  };
