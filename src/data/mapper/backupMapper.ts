import type { Backup } from "@domain/entities/backup";
import type { BackupDto } from "@data/dto/backupDto";

import { plantMapper } from "./plantMapper";
import { careMapper } from "./careMapper";
import { careHistoryMapper } from "./careHistoryMapper";
import { notificationMapper } from "./notificationMapper";

export const backupMapper = (dto: BackupDto): Backup => ({
  schemaVersion: dto.schema_version,
  exportedAt: dto.exported_at,

  data: {
    plants: dto.data.plants.map(plantMapper),
    cares: dto.data.cares.map(careMapper),
    history: dto.data.history.map(careHistoryMapper),
    notifications: dto.data.notifications.map(notificationMapper),
  },

  images: dto.images,
});
