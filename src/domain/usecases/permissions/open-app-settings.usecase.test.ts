import { OpenAppSettings } from "@domain/usecases/permissions/open-app-settings.usecase";

import { createPermissionsServiceMock } from "@mocks/services/permissions.service.mock";

describe("open-app-settings-usecase", () => {
  it("deve abrir as configurações do aplicativo", () => {
    const service = createPermissionsServiceMock();

    const openAppSettings = OpenAppSettings(service);

    openAppSettings();

    expect(service.openSettings).toHaveBeenCalledTimes(1);
  });
});
