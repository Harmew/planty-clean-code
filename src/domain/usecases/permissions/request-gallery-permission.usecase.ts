import type { PermissionsService } from "@domain/services/permissions.service";

export const RequestGalleryPermission = (service: PermissionsService) => async (): Promise<boolean> =>
  service.requestGallery();
