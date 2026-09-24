import { MarkNotificationAsRead } from "@domain/usecases/notification/mark-notification-as-read.usecase";

import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";

describe("mark-notification-as-read-usecase", () => {
  it("deve marcar a notificação como lida", async () => {
    const repository = createNotificationRepositoryMock();

    const markNotificationAsRead = MarkNotificationAsRead(repository);

    await markNotificationAsRead(1);

    expect(repository.markAsRead).toHaveBeenCalledTimes(1);
    expect(repository.markAsRead).toHaveBeenCalledWith(1);
  });
});
