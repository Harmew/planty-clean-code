import { RequestNotificationPermission } from "@domain/usecases/permission/requestNotificationPermission";

import { createPermissionServiceMock } from "@mocks/services/permissionServiceMock";

describe("RequestNotificationPermission", () => {
  it("deve solicitar permissão de notificações", async () => {
    const service = createPermissionServiceMock();

    service.requestNotifications.mockResolvedValue(true);

    const requestNotificationPermission = RequestNotificationPermission(service);

    const result = await requestNotificationPermission();

    expect(service.requestNotifications).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a permissão for negada", async () => {
    const service = createPermissionServiceMock();

    service.requestNotifications.mockResolvedValue(false);

    const requestNotificationPermission = RequestNotificationPermission(service);

    const result = await requestNotificationPermission();

    expect(service.requestNotifications).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
