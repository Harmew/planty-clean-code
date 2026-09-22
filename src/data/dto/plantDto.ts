export interface PlantDto {
  id: number;
  name: string;
  image: string | null;
  location: string;
  sunlight: "low" | "medium" | "high";
  temperature_min: string | null;
  temperature_max: string | null;
  humidity: string | null;
  created_at: string;
}
