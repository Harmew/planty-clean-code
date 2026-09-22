export interface CareHistoryDto {
  id: number;
  plant_id: number;
  care_schedule_id: number | null;
  type: "water" | "fertilizer" | "prune" | "repot";
  interval_days: number;
  done_at: string;
}
