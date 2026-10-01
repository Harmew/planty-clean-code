import type { CareType } from "@domain/entities/care.entity";

import type { PlantWithCares } from "../types";

export type PendingCare = {
  plantId: number;
  plantName: string;
  type: CareType;
  nextDue: string;
  isOverdue: boolean;
  isToday: boolean;
};

export function getPendingCares(plants: PlantWithCares[], now = new Date()): PendingCare[] {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return plants
    .flatMap((plant) =>
      plant.cares.flatMap((care) => {
        const due = new Date(care.nextDue);

        const isOverdue = due < today;

        const isToday =
          due.getFullYear() === today.getFullYear() &&
          due.getMonth() === today.getMonth() &&
          due.getDate() === today.getDate();

        const isTomorrow =
          due.getFullYear() === tomorrow.getFullYear() &&
          due.getMonth() === tomorrow.getMonth() &&
          due.getDate() === tomorrow.getDate();

        // Só atrasados, de hoje e de amanhã
        if (!isOverdue && !isToday && !isTomorrow) {
          return [];
        }

        return [
          {
            plantId: plant.id,
            plantName: plant.name,
            type: care.type,
            nextDue: care.nextDue,
            isOverdue,
            isToday,
          },
        ];
      }),
    )
    .sort((a, b) => a.nextDue.localeCompare(b.nextDue));
}
