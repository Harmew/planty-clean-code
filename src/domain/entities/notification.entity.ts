import type { CareType } from "./care.entity";

/**
 * Representa uma notificação com suas propriedades e características.
 */
export interface Notification {
  id: number;
  plantId: number | null;
  careScheduleId: number | null;
  title: string;
  body: string;
  type: CareType;
  read: boolean;
  scheduledFor: string;
  expoNotificationId: string | null;
  createdAt: string;
}
