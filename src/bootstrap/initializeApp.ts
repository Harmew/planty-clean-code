import { initDatabase } from "@infra/database/database";
import { notificationService } from "@infra/notification/notificationServiceImpl";

export async function initializeApp() {
  await initDatabase();
  notificationService.initialize();
}
