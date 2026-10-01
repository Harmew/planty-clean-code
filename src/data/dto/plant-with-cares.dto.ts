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
  care_id: number | null;
  care_plant_id: number | null;
  care_type: "water" | "fertilize" | "prune" | "repot" | null;
  care_interval_days: number | null;
  care_last_done: string | null;
  care_next_due: string | null;
  care_created_at: string | null;
};
