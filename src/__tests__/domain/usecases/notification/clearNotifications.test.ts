import { ClearNotifications } from "@domain/usecases/notification/clearNotifications";

import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";
import { createNotificationServiceMock } from "@mocks/services/notificationServiceMock";

describe("ClearNotifications", () => {
  it("deve cancelar todas as notificações e removê-las do repositório", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const clearNotifications = ClearNotifications(repository, service);

    await clearNotifications();

    expect(service.cancelAll).toHaveBeenCalledTimes(1);
    expect(repository.deleteAll).toHaveBeenCalledTimes(1);
  });
});
