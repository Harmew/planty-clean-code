import type { BackupDto } from "@data/dto/backup.dto";
import { backupMapper } from "@data/mapper/backup.mapper";

import { createBackup } from "@mocks/fixtures/backup.fixture";

describe("backup-mapper", () => {
  it("mapeia o backup DTO para a entidade de domínio", () => {
    const backup = createBackup();

    const dto: BackupDto = {
      schema_version: backup.schemaVersion,
      exported_at: backup.exportedAt,
      data: {
        plants: [
          {
            id: backup.data.plants[0].id,
            name: backup.data.plants[0].name,
            image: backup.data.plants[0].image,
            location: backup.data.plants[0].location,
            sunlight: backup.data.plants[0].sunlight,
            temperature_min: backup.data.plants[0].temperatureMin,
            temperature_max: backup.data.plants[0].temperatureMax,
            humidity: backup.data.plants[0].humidity,
            created_at: backup.data.plants[0].createdAt,
          },
        ],
        cares: [
          {
            id: backup.data.cares[0].id,
            plant_id: backup.data.cares[0].plantId,
            type: backup.data.cares[0].type,
            interval_days: backup.data.cares[0].intervalDays,
            last_done: backup.data.cares[0].lastDone,
            next_due: backup.data.cares[0].nextDue,
            created_at: backup.data.cares[0].createdAt,
          },
        ],
        history: [
          {
            id: backup.data.history[0].id,
            plant_id: backup.data.history[0].plantId,
            care_schedule_id: backup.data.history[0].careScheduleId,
            type: backup.data.history[0].type,
            interval_days: backup.data.history[0].intervalDays,
            done_at: backup.data.history[0].doneAt,
          },
        ],
        notifications: [
          {
            id: backup.data.notifications[0].id,
            plant_id: backup.data.notifications[0].plantId,
            care_schedule_id: backup.data.notifications[0].careScheduleId,
            title: backup.data.notifications[0].title,
            body: backup.data.notifications[0].body,
            type: backup.data.notifications[0].type,
            read: backup.data.notifications[0].read ? 1 : 0,
            scheduled_for: backup.data.notifications[0].scheduledFor,
            expo_notification_id: backup.data.notifications[0].expoNotificationId,
            created_at: backup.data.notifications[0].createdAt,
          },
        ],
      },
      images: backup.images,
    };

    expect(backupMapper(dto)).toEqual(backup);
  });

  it("mapeia um backup vazio", () => {
    const dto: BackupDto = {
      schema_version: 1,
      exported_at: "2023-01-01T00:00:00Z",
      data: {
        plants: [],
        cares: [],
        history: [],
        notifications: [],
      },
      images: {},
    };

    expect(backupMapper(dto)).toEqual({
      schemaVersion: 1,
      exportedAt: "2023-01-01T00:00:00Z",
      data: {
        plants: [],
        cares: [],
        history: [],
        notifications: [],
      },
      images: {},
    });
  });
});
