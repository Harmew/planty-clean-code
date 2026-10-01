/**
 * Representa os níveis de luz solar que uma planta pode receber.
 */
export type PlantSunlight = "low" | "medium" | "high";

/**
 * Representa uma planta com suas propriedades e características.
 */
export interface Plant {
  id: number;
  name: string;
  image: string | null;
  temperatureMin: string | null;
  temperatureMax: string | null;
  humidity: string | null;
  sunlight: PlantSunlight;
  location: string;
  createdAt: string;
}
