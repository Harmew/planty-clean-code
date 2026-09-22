/**
 * Representa os tipos de cuidados que podem ser realizados em uma planta.
 */
export type CareType = "water" | "fertilizer" | "prune" | "repot";

/**
 * Representa um cuidado com suas propriedades e características.
 */
export interface Care {
  id: number;
  plantId: number;
  type: CareType;
  intervalDays: number;
  lastDone: string | null;
  nextDue: string;
  createdAt: string;
}
