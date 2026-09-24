import type { CareDto } from "@data/dto/care.dto";
import { careMapper } from "@data/mapper/care.mapper";
import type { CareRepository } from "@domain/repositories/care.repository";
import { getAll, getFirst, run } from "@infra/database/database";

export const careRepository: CareRepository = {
  async getAll() {
    const rows = await getAll<CareDto>(
      `
        SELECT
          id,
          plant_id,
          type,
          interval_days,
          last_done,
          next_due,
          created_at
        FROM care_schedule
        ORDER BY next_due ASC
      `,
    );

    return rows.map(careMapper);
  },

  async getByPlantId(plantId) {
    const rows = await getAll<CareDto>(
      `
        SELECT
          id,
          plant_id,
          type,
          interval_days,
          last_done,
          next_due,
          created_at
        FROM care_schedule
        WHERE plant_id = ?
        ORDER BY next_due ASC
      `,
      [plantId],
    );

    return rows.map(careMapper);
  },

  async getByPlantAndType(plantId, type) {
    const row = await getFirst<CareDto>(
      `
        SELECT
          id,
          plant_id,
          type,
          interval_days,
          last_done,
          next_due,
          created_at
        FROM care_schedule
        WHERE plant_id = ?
          AND type = ?
      `,
      [plantId, type],
    );

    return row ? careMapper(row) : null;
  },

  async create(care) {
    const result = await run(
      `
        INSERT INTO care_schedule (
          plant_id,
          type,
          interval_days,
          last_done,
          next_due,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [care.plantId, care.type, care.intervalDays, care.lastDone, care.nextDue, care.createdAt],
    );

    return {
      ...care,
      id: result.lastInsertRowId,
    };
  },

  async update(care) {
    await run(
      `
        UPDATE care_schedule
        SET
          type = ?,
          interval_days = ?,
          last_done = ?,
          next_due = ?
        WHERE id = ?
      `,
      [care.type, care.intervalDays, care.lastDone, care.nextDue, care.id],
    );
  },

  async delete(id) {
    await run(
      `
        DELETE FROM care_schedule
        WHERE id = ?
      `,
      [id],
    );
  },

  async deleteByPlantId(plantId) {
    await run(
      `
        DELETE FROM care_schedule
        WHERE plant_id = ?
      `,
      [plantId],
    );
  },
};
