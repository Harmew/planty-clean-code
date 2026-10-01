export interface PlantDto {
  id: number;
  name: string;
  image: string | null;
  temperature_min: string | null;
  temperature_max: string | null;
  humidity: string | null;
  sunlight: "low" | "medium" | "high";
  location: string;
  created_at: string;
}
