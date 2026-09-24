import { RequestGalleryPermission } from "@domain/usecases/permissions/request-gallery-permission.usecase";

import { createPermissionsServiceMock } from "@mocks/services/permissions.service.mock";

describe("request-gallery-permission-usecase", () => {
  it("deve solicitar permissão da galeria", async () => {
    const service = createPermissionsServiceMock();

    service.requestGallery.mockResolvedValue(true);

    const requestGalleryPermission = RequestGalleryPermission(service);

    const result = await requestGalleryPermission();

    expect(service.requestGallery).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a permissão for negada", async () => {
    const service = createPermissionsServiceMock();

    service.requestGallery.mockResolvedValue(false);

    const requestGalleryPermission = RequestGalleryPermission(service);

    const result = await requestGalleryPermission();

    expect(service.requestGallery).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
