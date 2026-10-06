import type { Care } from "@domain/entities/care.entity";

import type { CareRepository } from "@domain/repositories/care.repository";

import type { CancelNotificationsByCare } from "@domain/usecases/notification/cancel-notifications-by-care.usecase";
import type { ScheduleNotification } from "@domain/usecases/notification/schedule-notification.usecase";
import type { GetPlantById } from "@domain/usecases/plant/get-plant-by-id.usecase";

import { getNotificationBody, getNotificationTitle } from "@shared/utils/notification";

export type CareInput = {
  type: Care["type"];
  intervalDays: number;
  enabled: boolean;
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
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

    const scheduleCareNotification = (careId: number, type: Care["type"], scheduledFor: string) =>
      scheduleNotification({
        plantId,
        careId,
        title: getNotificationTitle(type),
        body: getNotificationBody(plant.name, type),
        type,
        scheduledFor,
      });

    const syncCare = async (input: CareInput) => {
      const existingCare = await repository.getAllByPlantIdAndType(plantId, input.type);

      // Desabilitado: remove o cuidado existente (se houver) e cancela as notificações
      if (!input.enabled) {
        if (!existingCare) return;

        await cancelNotificationsByCare(existingCare.id);
        await repository.delete(existingCare.id);
        return;
      }

      const now = new Date();

      if (existingCare) {
        // Nada mudou: preserva o vencimento e a notificação já agendada
        if (existingCare.intervalDays === input.intervalDays) return;

        await cancelNotificationsByCare(existingCare.id);

        // Recalcula a partir da última vez feito (ou da criação), sem empurrar o prazo para "hoje + intervalo"
        const base = new Date(existingCare.lastDone ?? existingCare.createdAt);
        const candidate = addDays(base, input.intervalDays);

        // Se o novo prazo já passou, vence a partir de agora
        const nextDue = candidate > now ? candidate : addDays(now, input.intervalDays);

        const updatedCare = {
          ...existingCare,
          intervalDays: input.intervalDays,
          nextDue: nextDue.toISOString(),
        };

        await repository.update(updatedCare);
        await scheduleCareNotification(updatedCare.id, input.type, updatedCare.nextDue);
        return;
      }

      const care = await repository.create({
        plantId,
        type: input.type,
        intervalDays: input.intervalDays,
        lastDone: null,
        nextDue: addDays(now, input.intervalDays).toISOString(),
        createdAt: now.toISOString(),
      });

      await scheduleCareNotification(care.id, input.type, care.nextDue);
    };

    await Promise.all(cares.map(syncCare));
  };
