import type { CareHistoryRepository } from "@domain/repositories/careHistoryRepository";
import type { CareHistoryDto } from "@data/dto/careHistoryDto";
import { careHistoryMapper } from "@data/mapper/careHistoryMapper";
import { getAll, run } from "@infra/database/database";

export const careHistoryRepository: CareHistoryRepository = {
  getAll: async () => {
    const rows = await getAll<CareHistoryDto>("SELECT * FROM care_history");

    return rows.map(careHistoryMapper);
  },

  async getByPlantId(plantId) {
    const rows = await getAll<CareHistoryDto>(
      `
        SELECT
          id,
          plant_id,
          care_schedule_id,
          type,
          interval_days,
          done_at
        FROM care_history
        WHERE plant_id = ?
        ORDER BY done_at DESC
      `,
      [plantId],
    );

    return rows.map(careHistoryMapper);
  },

  async create(history) {
    const result = await run(
      `
        INSERT INTO care_history (
          plant_id,
          care_schedule_id,
          type,
          interval_days,
          done_at
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [history.plantId, history.careScheduleId, history.type, history.intervalDays, history.doneAt],
    );

    return {
      ...history,
      id: result.lastInsertRowId,
    };
  },
};
