// Domain
import type { PlantWithCaresDto } from "@data/dto/plant-with-cares.dto";
import type { PlantDto } from "@data/dto/plant.dto";

import { plantWithCaresMapper } from "@data/mapper/plant-with-cares.mapper";
import { plantMapper } from "@data/mapper/plant.mapper";

import type { PlantRepository } from "@domain/repositories/plant.repository";

import { getAll, getFirst, run } from "@infra/database/database";

export const plantRepository: PlantRepository = {
  async getAll() {
    const rows = await getAll<PlantDto>(
      `
        SELECT
          id,
          name,
          image,
          temperature_min,
          temperature_max,
          humidity,
          sunlight,
          location,
          created_at
        FROM plants
        ORDER BY created_at DESC
      `,
    );

    return rows.map(plantMapper);
  },

  async getAllWithCares() {
    const rows = await getAll<PlantWithCaresDto>(
      `
        SELECT
          p.id AS plant_id,
          p.name AS plant_name,
          p.image AS plant_image,
          p.location AS plant_location,
          p.sunlight AS plant_sunlight,
          p.temperature_min AS plant_temperature_min,
          p.temperature_max AS plant_temperature_max,
          p.humidity AS plant_humidity,
          p.created_at AS plant_created_at,
          c.id AS care_id,
          c.plant_id AS care_plant_id,
          c.type AS care_type,
          c.interval_days AS care_interval_days,
          c.last_done AS care_last_done,
          c.next_due AS care_next_due,
          c.created_at AS care_created_at
        FROM plants p
          LEFT JOIN cares c ON c.plant_id = p.id
        ORDER BY p.created_at DESC, c.next_due ASC
      `,
    );

    return plantWithCaresMapper(rows);
  },

  async getById(id) {
    const row = await getFirst<PlantDto>(
      `
        SELECT
          id,
          name,
          image,
          location,
          sunlight,
          temperature_min,
          temperature_max,
          humidity,
          created_at
        FROM plants
        WHERE id = ?
      `,
      [id],
    );

    return row ? plantMapper(row) : null;
  },

  async getByIdWithCares(id) {
    const rows = await getAll<PlantWithCaresDto>(
      `
        SELECT
          p.id AS plant_id,
          p.name AS plant_name,
          p.image AS plant_image,
          p.location AS plant_location,
          p.sunlight AS plant_sunlight,
          p.temperature_min AS plant_temperature_min,
          p.temperature_max AS plant_temperature_max,
          p.humidity AS plant_humidity,
          p.created_at AS plant_created_at,
          c.id AS care_id,
          c.plant_id AS care_plant_id,
          c.type AS care_type,
          c.interval_days AS care_interval_days,
          c.last_done AS care_last_done,
          c.next_due AS care_next_due,
          c.created_at AS care_created_at
        FROM plants p
          LEFT JOIN cares c ON c.plant_id = p.id
        WHERE p.id = ?
        ORDER BY p.created_at DESC, c.next_due ASC
      `,
      [id],
    );

    return rows.length > 0 ? plantWithCaresMapper(rows)[0] : null;
  },

  async create(plant) {
    const result = await run(
      `
        INSERT INTO plants (
          name,
          image,
          location,
          sunlight,
          temperature_min,
          temperature_max,
          humidity,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        plant.name,
        plant.image,
        plant.location,
        plant.sunlight,
        plant.temperatureMin,
        plant.temperatureMax,
        plant.humidity,
        plant.createdAt,
      ],
    );

    return {
      ...plant,
      id: result.lastInsertRowId,
    };
  },

  async update(plant) {
    await run(
      `
        UPDATE plants
        SET
          name = ?,
          image = ?,
          location = ?,
          sunlight = ?,
          temperature_min = ?,
          temperature_max = ?,
          humidity = ?
        WHERE id = ?
      `,
      [
        plant.name,
        plant.image,
        plant.location,
        plant.sunlight,
        plant.temperatureMin,
        plant.temperatureMax,
        plant.humidity,
        plant.id,
      ],
    );
  },

  async delete(id) {
    await run(
      `
        DELETE FROM plants
        WHERE id = ?
      `,
      [id],
    );
  },

  async deleteAll() {
    await run(`
    DELETE FROM plants
  `);
  },
};
