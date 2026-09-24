import type { BackupDto } from "@data/dto/backup.dto";
import type { Backup } from "@domain/entities/backup.entity";

import { careHistoryMapper } from "./care-history.mapper";
import { careMapper } from "./care.mapper";
import { notificationMapper } from "./notification.mapper";
import { plantMapper } from "./plant.mapper";

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
