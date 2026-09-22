import { RequestGalleryPermission } from "@domain/usecases/permission/requestGalleryPermission";

import { createPermissionServiceMock } from "@mocks/services/permissionServiceMock";

describe("RequestGalleryPermission", () => {
  it("deve solicitar permissão da galeria", async () => {
    const service = createPermissionServiceMock();

    service.requestGallery.mockResolvedValue(true);

    const requestGalleryPermission = RequestGalleryPermission(service);

    const result = await requestGalleryPermission();

    expect(service.requestGallery).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a permissão for negada", async () => {
    const service = createPermissionServiceMock();

    service.requestGallery.mockResolvedValue(false);

    const requestGalleryPermission = RequestGalleryPermission(service);

    const result = await requestGalleryPermission();

    expect(service.requestGallery).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
