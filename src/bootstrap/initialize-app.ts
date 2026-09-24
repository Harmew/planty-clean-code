import { initDatabase } from "@infra/database/database";
import { notificationService } from "@infra/notification/notification.service.impl";

export async function initializeApp() {
  await initDatabase();
  notificationService.initialize();
}
