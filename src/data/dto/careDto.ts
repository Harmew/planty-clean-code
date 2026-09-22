export interface CareDto {
  id: number;
  plant_id: number;
  type: "water" | "fertilizer" | "prune" | "repot";
  interval_days: number;
  last_done: string | null;
  next_due: string;
  created_at: string;
}
