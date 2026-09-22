import { CleanOldNotifications } from "@domain/usecases/notification/cleanOldNotifications";

import { createNotification } from "@mocks/fixtures/notification";
import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";
import { createNotificationServiceMock } from "@mocks/services/notificationServiceMock";

describe("CleanOldNotifications", () => {
  it("deve cancelar e remover notificações antigas", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notifications = [
      createNotification({
        id: 1,
        expoNotificationId: "expo-1",
      }),
      createNotification({
        id: 2,
        expoNotificationId: "expo-2",
      }),
    ];

    repository.getOlderThan.mockResolvedValue(notifications);

    const cleanOldNotifications = CleanOldNotifications(repository, service);

    await cleanOldNotifications();

    const limitDate = repository.getOlderThan.mock.calls[0][0];

    expect(limitDate).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/));

    expect(repository.getOlderThan).toHaveBeenCalledWith(limitDate);

    expect(service.cancel).toHaveBeenCalledTimes(2);
    expect(service.cancel).toHaveBeenNthCalledWith(1, "expo-1");
    expect(service.cancel).toHaveBeenNthCalledWith(2, "expo-2");

    expect(repository.deleteOlderThan).toHaveBeenCalledWith(limitDate);
  });

  it("não deve cancelar uma notificação antiga sem expoNotificationId", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notification = createNotification({
      id: 1,
      expoNotificationId: null,
    });

    repository.getOlderThan.mockResolvedValue([notification]);

    const cleanOldNotifications = CleanOldNotifications(repository, service);

    await cleanOldNotifications();

    const limitDate = repository.getOlderThan.mock.calls[0][0];

    expect(service.cancel).not.toHaveBeenCalled();

    expect(repository.deleteOlderThan).toHaveBeenCalledWith(limitDate);
  });

  it("deve remover sem cancelar quando não houver notificações antigas", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    repository.getOlderThan.mockResolvedValue([]);

    const cleanOldNotifications = CleanOldNotifications(repository, service);

    await cleanOldNotifications();

    const limitDate = repository.getOlderThan.mock.calls[0][0];

    expect(service.cancel).not.toHaveBeenCalled();
    expect(repository.deleteOlderThan).toHaveBeenCalledWith(limitDate);
  });
});
