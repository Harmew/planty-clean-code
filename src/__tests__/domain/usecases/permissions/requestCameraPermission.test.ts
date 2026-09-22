import { RequestCameraPermission } from "@domain/usecases/permission/requestCameraPermission";

import { createPermissionServiceMock } from "@mocks/services/permissionServiceMock";

describe("RequestCameraPermission", () => {
  it("deve solicitar permissão da câmera", async () => {
    const service = createPermissionServiceMock();

    service.requestCamera.mockResolvedValue(true);

    const requestCameraPermission = RequestCameraPermission(service);

    const result = await requestCameraPermission();

    expect(service.requestCamera).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a permissão for negada", async () => {
    const service = createPermissionServiceMock();

    service.requestCamera.mockResolvedValue(false);

    const requestCameraPermission = RequestCameraPermission(service);

    const result = await requestCameraPermission();

    expect(service.requestCamera).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
