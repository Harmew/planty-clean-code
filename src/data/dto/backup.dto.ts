import type { CareHistoryDto } from "@data/dto/care-history.dto";
import type { CareDto } from "@data/dto/care.dto";
import type { NotificationDto } from "@data/dto/notification.dto";
import type { PlantDto } from "@data/dto/plant.dto";

export interface BackupDto {
  schema_version: number;
  exported_at: string;

  data: {
    plants: PlantDto[];
    cares: CareDto[];
    history: CareHistoryDto[];
    notifications: NotificationDto[];
  };

  images: Record<string, string>;
}
