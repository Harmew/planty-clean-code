import { GetNotifications } from "@domain/usecases/notification/get-notifications.usecase";

import { createNotification } from "@mocks/fixtures/notification.fixture";
import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";

describe("get-notifications-usecase", () => {
  it("deve retornar todas as notificações", async () => {
    const repository = createNotificationRepositoryMock();

    const notifications = [createNotification({ id: 1 }), createNotification({ id: 2, read: true })];

    repository.getAll.mockResolvedValue(notifications);

    const getNotifications = GetNotifications(repository);

    const result = await getNotifications();

    expect(repository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(notifications);
  });
});
