import type { CareDto } from "@data/dto/careDto";
import type { CareHistoryDto } from "@data/dto/careHistoryDto";
import type { NotificationDto } from "@data/dto/notificationDto";
import type { PlantDto } from "@data/dto/plantDto";

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
