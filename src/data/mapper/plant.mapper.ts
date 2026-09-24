import type { PlantDto } from "@data/dto/plant.dto";
import type { Plant } from "@domain/entities/plant.entity";

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
