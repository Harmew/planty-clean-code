export type PlantWithCaresDto = {
  plant_id: number;
  plant_name: string;
  plant_image: string | null;
  plant_temperature_min: string | null;
  plant_temperature_max: string | null;
  plant_humidity: string | null;
  plant_sunlight: "low" | "medium" | "high";
  plant_location: string;
  plant_created_at: string;
  care_id: number;
  care_plant_id: number;
  care_type: "water" | "fertilize" | "prune" | "repot";
  care_interval_days: number;
  care_last_done: string | null;
  care_next_due: string;
  care_created_at: string;
};
