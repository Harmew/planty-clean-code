import type { Care } from "@domain/entities/care";

import type { CareHistoryRepository } from "@domain/repositories/careHistoryRepository";
import type { CareRepository } from "@domain/repositories/careRepository";

import type { CancelNotificationsByCare } from "@domain/usecases/notification/cancelNotificationsByCare";
import type { ScheduleNotification } from "@domain/usecases/notification/scheduleNotification";
import type { GetPlantById } from "@domain/usecases/plant/getPlantById";

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
