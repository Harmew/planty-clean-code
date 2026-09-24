import type { CareDto } from "@data/dto/care.dto";
import type { Care } from "@domain/entities/care.entity";

export const careMapper = (dto: CareDto): Care => ({
  id: dto.id,
  plantId: dto.plant_id,
  type: dto.type,
  intervalDays: dto.interval_days,
  lastDone: dto.last_done,
  nextDue: dto.next_due,
  createdAt: dto.created_at,
});
