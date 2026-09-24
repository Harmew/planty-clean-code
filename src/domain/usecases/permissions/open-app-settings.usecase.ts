import type { PermissionsService } from "@domain/services/permissions.service";

export const OpenAppSettings = (service: PermissionsService) => (): void => {
  service.openSettings();
};
