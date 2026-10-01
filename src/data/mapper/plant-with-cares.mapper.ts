import type { PlantWithCaresDto } from "@data/dto/plant-with-cares.dto";
import type { PlantWithCares } from "@domain/models/plant-with-cares.model";

import { careMapper } from "./care.mapper";

export const plantWithCaresMapper = (rows: PlantWithCaresDto[]): PlantWithCares[] => {
  const plants = new Map<number, PlantWithCares>();

  for (const row of rows) {
    let plant = plants.get(row.plant_id);

    if (!plant) {
      plant = {
        id: row.plant_id,
        name: row.plant_name,
        image: row.plant_image,
        location: row.plant_location,
        sunlight: row.plant_sunlight,
        temperatureMin: row.plant_temperature_min,
        temperatureMax: row.plant_temperature_max,
        humidity: row.plant_humidity,
        createdAt: row.plant_created_at,
        cares: [],
      };

      plants.set(plant.id, plant);
    }

    plant.cares.push(
      careMapper({
        id: row.care_id,
        plant_id: row.care_plant_id,
        type: row.care_type,
        interval_days: row.care_interval_days,
        last_done: row.care_last_done,
        next_due: row.care_next_due,
        created_at: row.care_created_at,
      }),
    );
  }

  return [...plants.values()];
};