import type { PermissionService } from "@domain/services/permissionService";

export const OpenAppSettings = (service: PermissionService) => (): void => {
  service.openSettings();
};
