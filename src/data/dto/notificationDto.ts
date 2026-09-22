export interface NotificationDto {
  id: number;
  plant_id: number | null;
  care_schedule_id: number | null;
  title: string;
  body: string;
  type: "water" | "fertilizer" | "prune" | "repot";
  read: number;
  scheduled_for: string;
  expo_notification_id: string | null;
  created_at: string;
}
