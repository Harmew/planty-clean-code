import type { PermissionsService } from "@domain/services/permissions.service";

export const RequestNotificationPermission = (service: PermissionsService) => async (): Promise<boolean> =>
  service.requestNotifications();
