import type { Permissions } from "@domain/models/permission";
import type { PermissionService } from "@domain/services/permissionService";

export const GetPermissions = (service: PermissionService) => async (): Promise<Permissions> => service.getAll();
