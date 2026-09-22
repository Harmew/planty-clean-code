import type { Plant } from "@domain/entities/plant";
import type { PlantDto } from "@data/dto/plantDto";

export const plantMapper = (dto: PlantDto): Plant => ({
  id: dto.id,
  name: dto.name,
  image: dto.image,
  location: dto.location,
  sunlight: dto.sunlight,
  temperatureMin: dto.temperature_min,
  temperatureMax: dto.temperature_max,
  humidity: dto.humidity,
  createdAt: dto.created_at,
});
