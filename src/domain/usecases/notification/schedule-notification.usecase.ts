import type { CareType } from "@domain/entities/care.entity";
import type { Notification } from "@domain/entities/notification.entity";

import type { NotificationRepository } from "@domain/repositories/notification.repository";

import type { NotificationService } from "@domain/services/notification.service";

type ScheduleNotificationInput = {
  plantId: number;
  careScheduleId: number;
  title: string;
  body: string;
  type: CareType;
  scheduledFor: string;
};

export type ScheduleNotification = (input: ScheduleNotificationInput) => Promise<Notification>;

export const ScheduleNotification =
  (repository: NotificationRepository, service: NotificationService) => async (input: ScheduleNotificationInput) => {
    const scheduledDate = new Date(input.scheduledFor);

    scheduledDate.setHours(6, 0, 0, 0);

    const scheduledFor = scheduledDate.toISOString();
    const createdAt = new Date().toISOString();

    const expoNotificationId = await service.schedule({
      title: input.title,
      body: input.body,
      date: scheduledDate,
    });

    try {
      return await repository.create({
        plantId: input.plantId,
        careScheduleId: input.careScheduleId,
        title: input.title,
        body: input.body,
        type: input.type,
        read: false,
        scheduledFor,
        expoNotificationId,
        createdAt,
      });
    } catch (error) {
      await service.cancel(expoNotificationId);
      throw error;
    }
  };
