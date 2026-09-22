import { GetPermissions } from "@domain/usecases/permission/getPermissions";

import { createPermissionServiceMock } from "@mocks/services/permissionServiceMock";

describe("GetPermissions", () => {
  it("deve retornar as permissões", async () => {
    const service = createPermissionServiceMock();

    const permissions = {
      notifications: "granted" as const,
      camera: "denied" as const,
      gallery: "limited" as const,
    };

    service.getAll.mockResolvedValue(permissions);

    const getPermissionsUseCase = GetPermissions(service);

    const result = await getPermissionsUseCase();

    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(permissions);
  });
});
