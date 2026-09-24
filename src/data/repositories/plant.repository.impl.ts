// Domain
import type { PlantDto } from "@data/dto/plant.dto";
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
          location,
          sunlight,
          temperature_min,
          temperature_max,
          humidity,
          created_at
        FROM plants
        ORDER BY created_at DESC
      `,
    );

    return rows.map(plantMapper);
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
