export interface CareDto {
  id: number;
  plant_id: number;
  type: "water" | "fertilize" | "prune" | "repot";
  interval_days: number;
  last_done: string | null;
  next_due: string;
  created_at: string;
}
