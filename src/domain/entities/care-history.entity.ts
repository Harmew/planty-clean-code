import type { CareType } from "./care.entity";

/**
 * Representa um histórico de cuidados com suas propriedades e características.
 */
export interface CareHistory {
  id: number;
  plantId: number;
  careScheduleId: number | null;
  type: CareType;
  intervalDays: number;
  doneAt: string;
}
