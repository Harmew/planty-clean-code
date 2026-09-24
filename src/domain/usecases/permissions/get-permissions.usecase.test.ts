import { GetPermissions } from "@domain/usecases/permissions/get-permissions.usecase";

import { createPermissionsServiceMock } from "@mocks/services/permissions.service.mock";

describe("get-permissions-usecase", () => {
  it("deve retornar as permissões", async () => {
    const service = createPermissionsServiceMock();

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
