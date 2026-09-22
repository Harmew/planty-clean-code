import type { Care } from "@domain/entities/care";

import type { CareRepository } from "@domain/repositories/careRepository";

import type { GetPlantById } from "@domain/usecases/plant/getPlantById";
import type { CancelNotificationsByCare } from "@domain/usecases/notification/cancelNotificationsByCare";
import type { ScheduleNotification } from "@domain/usecases/notification/scheduleNotification";

import { getNotificationBody, getNotificationTitle } from "@shared/utils/notification";

type CareInput = {
  type: Care["type"];
  intervalDays: number;
  enabled: boolean;
};

export const CreateOrUpdateCares =
  (
    repository: CareRepository,
    getPlantById: GetPlantById,
    scheduleNotification: ScheduleNotification,
    cancelNotificationsByCare: CancelNotificationsByCare,
  ) =>
  async (plantId: number, cares: CareInput[]) => {
    const plant = await getPlantById(plantId);

    if (!plant) {
      throw new Error("Planta não encontrada");
    }

    for (const input of cares) {
      const existingCare = await repository.getByPlantAndType(plantId, input.type);

      // Se o cuidado não estiver habilitado, removemos o cuidado existente (se houver) e cancelamos as notificações.
      if (!input.enabled) {
        if (existingCare) {
          await cancelNotificationsByCare(existingCare.id);
          await repository.delete(existingCare.id);
        }

        continue;
      }

      const now = new Date();
      const nextDue = new Date(now);
      nextDue.setDate(nextDue.getDate() + input.intervalDays);

      if (existingCare) {
        await cancelNotificationsByCare(existingCare.id);

        const updatedCare = {
          ...existingCare,
          intervalDays: input.intervalDays,
          nextDue: nextDue.toISOString(),
        };

        await repository.update(updatedCare);

        await scheduleNotification({
          plantId,
          careScheduleId: updatedCare.id,
          title: getNotificationTitle(input.type),
          body: getNotificationBody(plant.name, input.type),
          type: input.type,
          scheduledFor: updatedCare.nextDue,
        });

        continue;
      }

      const care = await repository.create({
        plantId,
        type: input.type,
        intervalDays: input.intervalDays,
        lastDone: null,
        nextDue: nextDue.toISOString(),
        createdAt: now.toISOString(),
      });

      await scheduleNotification({
        plantId,
        careScheduleId: care.id,
        title: getNotificationTitle(input.type),
        body: getNotificationBody(plant.name, input.type),
        type: input.type,
        scheduledFor: care.nextDue,
      });
    }
  };
