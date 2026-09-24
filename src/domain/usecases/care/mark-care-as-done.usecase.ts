import type { Care } from "@domain/entities/care.entity";

import type { CareHistoryRepository } from "@domain/repositories/care-history.repository";
import type { CareRepository } from "@domain/repositories/care.repository";

import type { CancelNotificationsByCare } from "@domain/usecases/notification/cancel-notifications-by-care.usecase";
import type { ScheduleNotification } from "@domain/usecases/notification/schedule-notification.usecase";
import type { GetPlantById } from "@domain/usecases/plant/get-plant-by-id.usecase";

import { getNotificationBody, getNotificationTitle } from "@shared/utils/notification";

export const MarkCareAsDone =
  (
    careRepository: CareRepository,
    careHistoryRepository: CareHistoryRepository,
    getPlantById: GetPlantById,
    cancelNotificationsByCare: CancelNotificationsByCare,
    scheduleNotification: ScheduleNotification,
  ) =>
  async (plantId: number, type: Care["type"]) => {
    const care = await careRepository.getByPlantAndType(plantId, type);

    if (!care) {
      throw new Error("Cuidado não encontrado");
    }

    const plant = await getPlantById(care.plantId);

    if (!plant) {
      throw new Error("Planta não encontrada");
    }

    const doneAt = new Date();

    const nextDue = new Date(doneAt);
    nextDue.setDate(nextDue.getDate() + care.intervalDays);

    await cancelNotificationsByCare(care.id);

    await careRepository.update({
      ...care,
      lastDone: doneAt.toISOString(),
      nextDue: nextDue.toISOString(),
    });

    await careHistoryRepository.create({
      plantId: care.plantId,
      careScheduleId: care.id,
      type: care.type,
      intervalDays: care.intervalDays,
      doneAt: doneAt.toISOString(),
    });

    await scheduleNotification({
      plantId: care.plantId,
      careScheduleId: care.id,
      title: getNotificationTitle(care.type),
      body: getNotificationBody(plant.name, care.type),
      type: care.type,
      scheduledFor: nextDue.toISOString(),
    });
  };
