import type { Notification } from "@domain/entities/notification";
import type { NotificationDto } from "@data/dto/notificationDto";

export const notificationMapper = (dto: NotificationDto): Notification => ({
  id: dto.id,
  plantId: dto.plant_id,
  careScheduleId: dto.care_schedule_id,
  title: dto.title,
  body: dto.body,
  type: dto.type,
  read: dto.read === 1,
  scheduledFor: dto.scheduled_for,
  expoNotificationId: dto.expo_notification_id,
  createdAt: dto.created_at,
});
