import type { CareHistory } from "@domain/entities/care-history.entity";
import type { Care } from "@domain/entities/care.entity";
import type { Notification } from "@domain/entities/notification.entity";
import type { Plant } from "@domain/entities/plant.entity";

export interface Backup {
  schemaVersion: number;
  exportedAt: string;

  data: {
    plants: Plant[];
    cares: Care[];
    history: CareHistory[];
    notifications: Notification[];
  };

  images: Record<string, string>;
}
