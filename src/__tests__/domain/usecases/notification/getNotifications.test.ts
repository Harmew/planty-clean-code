import { GetNotifications } from "@domain/usecases/notification/getNotifications";

import { createNotification } from "@mocks/fixtures/notification";
import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";

describe("GetNotifications", () => {
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
