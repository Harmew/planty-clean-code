import type { Permissions } from "@domain/models/permissions.model";
import type { PermissionsService } from "@domain/services/permissions.service";

export const GetPermissions = (service: PermissionsService) => async (): Promise<Permissions> => service.getAll();
