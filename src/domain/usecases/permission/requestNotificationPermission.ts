import type { PermissionService } from "@domain/services/permissionService";

export const RequestNotificationPermission = (service: PermissionService) => async (): Promise<boolean> =>
  service.requestNotifications();
