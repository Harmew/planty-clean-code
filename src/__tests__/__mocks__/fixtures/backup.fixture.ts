import type { Backup } from "@domain/entities/backup.entity";

import { createCareHistory } from "./care-history.fixture";
import { createCare } from "./care.fixture";
import { createNotification } from "./notification.fixture";
import { createPlant } from "./plant.fixture";

/**
 * Fixture centralizada de Backup, usada por praticamente todo teste que precisa de um backup de exemplo:
 *
 * ```ts
 * const backup = createBackup();
 * const backup2 = createBackup({ schemaVersion: 2  });
 * ```
 */
export function createBackup(overrides: Partial<Backup> = {}): Backup {
  return {
    schemaVersion: 1,
    exportedAt: "2023-01-01T00:00:00Z",
    data: {
      plants: [createPlant()],
      cares: [createCare()],
      history: [createCareHistory()],
      notifications: [createNotification()],
    },
    images: {
      "1.jpg": "base64-image",
    },
    ...overrides,
  };
}
