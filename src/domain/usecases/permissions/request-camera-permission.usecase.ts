import type { PermissionsService } from "@domain/services/permissions.service";

export const RequestCameraPermission = (service: PermissionsService) => async (): Promise<boolean> =>
  service.requestCamera();
