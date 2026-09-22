import type { PermissionService } from "@domain/services/permissionService";

export const RequestCameraPermission = (service: PermissionService) => async (): Promise<boolean> =>
  service.requestCamera();
