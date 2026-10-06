import type { NotificationDto } from "@data/dto/notification.dto";
import { notificationMapper } from "@data/mapper/notification.mapper";
import type { NotificationRepository } from "@domain/repositories/notification.repository";
import { getAll, run } from "@infra/database/database";

export const notificationRepository: NotificationRepository = {
  async getAll() {
    const rows = await getAll<NotificationDto>(`
      SELECT
        id,
        plant_id,
        care_id,
        title,
        body,
        type,
        read,
        scheduled_for,
        expo_notification_id,
        created_at
      FROM notifications
      ORDER BY created_at DESC
    `);

    return rows.map(notificationMapper);
  },

  async create(notification) {
    const result = await run(
      `
        INSERT INTO notifications (
          plant_id,
          care_id,
          title,
          body,
          type,
          read,
          scheduled_for,
          expo_notification_id,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        notification.plantId,
        notification.careId,
        notification.title,
        notification.body,
        notification.type,
        notification.read ? 1 : 0,
        notification.scheduledFor,
        notification.expoNotificationId,
        notification.createdAt,
      ],
    );

    return {
      ...notification,
      id: result.lastInsertRowId,
    };
  },

  async markAsRead(id) {
    await run(
      `
        UPDATE notifications
        SET read = 1
        WHERE id = ?
      `,
      [id],
    );
  },

  async getAllByCareId(careId) {
    const rows = await getAll<NotificationDto>(
      `
        SELECT
          id,
          plant_id,
          care_id,
          title,
          body,
          type,
          read,
          scheduled_for,
          expo_notification_id,
          created_at
        FROM notifications
        WHERE care_id = ?
      `,
      [careId],
    );

    return rows.map(notificationMapper);
  },

  async deleteAllByCareId(careId) {
    await run(
      `
        DELETE FROM notifications
        WHERE care_id = ?
      `,
      [careId],
    );
  },

  async getAllByPlantId(plantId) {
    const rows = await getAll<NotificationDto>(
      `
        SELECT
          id,
          plant_id,
          care_id,
          title,
          body,
          type,
          read,
          scheduled_for,
          expo_notification_id,
          created_at
        FROM notifications
        WHERE plant_id = ?
      `,
      [plantId],
    );

    return rows.map(notificationMapper);
  },

  async deleteAllByPlantId(plantId) {
    await run(
      `
        DELETE FROM notifications
        WHERE plant_id = ?
      `,
      [plantId],
    );
  },

  async deleteAll() {
    await run(`DELETE FROM notifications`);
  },

  async getOlderThan(date) {
    const rows = await getAll<NotificationDto>(
      `
        SELECT
          id,
          plant_id,
          care_id,
          title,
          body,
          type,
          read,
          scheduled_for,
          expo_notification_id,
          created_at
        FROM notifications
        WHERE scheduled_for < ?
      `,
      [date],
    );

    return rows.map(notificationMapper);
  },

  async deleteOlderThan(date) {
    await run(
      `
        DELETE FROM notifications
        WHERE scheduled_for < ?
      `,
      [date],
    );
  },
};
