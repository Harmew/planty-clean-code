import { ClearNotifications } from "@domain/usecases/notification/clear-notifications.usecase";

import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";
import { createNotificationServiceMock } from "@mocks/services/notification.service.mock";

describe("clear-notifications-usecase", () => {
  it("deve cancelar todas as notificações e removê-las do repositório", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const clearNotifications = ClearNotifications(repository, service);

    await clearNotifications();

    expect(service.cancelAll).toHaveBeenCalledTimes(1);
    expect(repository.deleteAll).toHaveBeenCalledTimes(1);
  });
});
