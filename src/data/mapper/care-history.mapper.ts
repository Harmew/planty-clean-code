import type { CareHistoryDto } from "@data/dto/care-history.dto";
import type { CareHistory } from "@domain/entities/care-history.entity";

export const careHistoryMapper = (dto: CareHistoryDto): CareHistory => ({
  id: dto.id,
  plantId: dto.plant_id,
  careScheduleId: dto.care_schedule_id,
  type: dto.type,
  intervalDays: dto.interval_days,
  doneAt: dto.done_at,
});
