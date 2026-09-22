import { MarkNotificationAsRead } from "@domain/usecases/notification/markNotificationAsRead";

import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";

describe("MarkNotificationAsRead", () => {
  it("deve marcar a notificação como lida", async () => {
    const repository = createNotificationRepositoryMock();

    const markNotificationAsRead = MarkNotificationAsRead(repository);

    await markNotificationAsRead(1);

    expect(repository.markAsRead).toHaveBeenCalledTimes(1);
    expect(repository.markAsRead).toHaveBeenCalledWith(1);
  });
});
