import { OpenAppSettings } from "@domain/usecases/permission/openAppSettings";

import { createPermissionServiceMock } from "@mocks/services/permissionServiceMock";

describe("OpenAppSettings", () => {
  it("deve abrir as configurações do aplicativo", () => {
    const service = createPermissionServiceMock();

    const openAppSettings = OpenAppSettings(service);

    openAppSettings();

    expect(service.openSettings).toHaveBeenCalledTimes(1);
  });
});
