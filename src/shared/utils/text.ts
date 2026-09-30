import type { PlantSunlight } from "@domain/entities/plant.entity";

export function formatSunlightLabel(value: PlantSunlight) {
  switch (value) {
    case "low":
      return "Baixa";
    case "medium":
      return "Média";
    case "high":
      return "Alta";
  }
}

export function formatTemperatureRange(min: string | null, max: string | null) {
  if (!min && !max) return "-";
  if (min && max) return `${min}° - ${max}°`;
  if (min) return `↓ ${min}°`;
  return `↑ ${max}°`;
}

export function formatHumidityLabel(value: string | null) {
  if (!value) return "-";

  return `${value}%`;
}
