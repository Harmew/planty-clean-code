import { RequestNotificationPermission } from "@domain/usecases/permissions/request-notification-permission.usecase";

import { createPermissionsServiceMock } from "@mocks/services/permissions.service.mock";

describe("request-notification-permission-usecase", () => {
  it("deve solicitar permissão de notificações", async () => {
    const service = createPermissionsServiceMock();

    service.requestNotifications.mockResolvedValue(true);

    const requestNotificationPermission = RequestNotificationPermission(service);

    const result = await requestNotificationPermission();

    expect(service.requestNotifications).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a permissão for negada", async () => {
    const service = createPermissionsServiceMock();

    service.requestNotifications.mockResolvedValue(false);

    const requestNotificationPermission = RequestNotificationPermission(service);

    const result = await requestNotificationPermission();

    expect(service.requestNotifications).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
