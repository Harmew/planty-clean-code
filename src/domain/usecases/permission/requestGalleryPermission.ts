import type { PermissionService } from "@domain/services/permissionService";

export const RequestGalleryPermission = (service: PermissionService) => async (): Promise<boolean> =>
  service.requestGallery();
