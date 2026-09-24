import { RequestCameraPermission } from "@domain/usecases/permissions/request-camera-permission.usecase";

import { createPermissionsServiceMock } from "@mocks/services/permissions.service.mock";

describe("request-camera-permission-usecase", () => {
  it("deve solicitar permissão da câmera", async () => {
    const service = createPermissionsServiceMock();

    service.requestCamera.mockResolvedValue(true);

    const requestCameraPermission = RequestCameraPermission(service);

    const result = await requestCameraPermission();

    expect(service.requestCamera).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a permissão for negada", async () => {
    const service = createPermissionsServiceMock();

    service.requestCamera.mockResolvedValue(false);

    const requestCameraPermission = RequestCameraPermission(service);

    const result = await requestCameraPermission();

    expect(service.requestCamera).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
