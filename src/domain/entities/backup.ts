import type { Care } from "@domain/entities/care";
import type { CareHistory } from "@domain/entities/careHistory";
import type { Notification } from "@domain/entities/notification";
import type { Plant } from "@domain/entities/plant";

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
