export interface CareHistoryDto {
  id: number;
  plant_id: number;
  care_id: number | null;
  type: "water" | "fertilize" | "prune" | "repot";
  interval_days: number;
  done_at: string;
}
