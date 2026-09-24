import { CancelNotificationsByCare } from "@domain/usecases/notification/cancel-notifications-by-care.usecase";

import { createNotification } from "@mocks/fixtures/notification.fixture";
import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";
import { createNotificationServiceMock } from "@mocks/services/notification.service.mock";

describe("cancel-notifications-by-care-usecase", () => {
  it("deve cancelar as notificações e removê-las do repositório", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notifications = [
      createNotification({
        id: 1,
        careScheduleId: 10,
        expoNotificationId: "expo-1",
      }),
      createNotification({
        id: 2,
        careScheduleId: 10,
        expoNotificationId: "expo-2",
      }),
    ];

    repository.getByCareId.mockResolvedValue(notifications);

    const cancelNotificationsByCare = CancelNotificationsByCare(repository, service);

    await cancelNotificationsByCare(10);

    expect(repository.getByCareId).toHaveBeenCalledWith(10);

    expect(service.cancel).toHaveBeenCalledTimes(2);
    expect(service.cancel).toHaveBeenNthCalledWith(1, "expo-1");
    expect(service.cancel).toHaveBeenNthCalledWith(2, "expo-2");

    expect(repository.deleteByCareId).toHaveBeenCalledWith(10);
  });

  it("não deve cancelar uma notificação sem expoNotificationId", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notifications = [
      createNotification({
        id: 1,
        careScheduleId: 10,
        expoNotificationId: null,
      }),
    ];

    repository.getByCareId.mockResolvedValue(notifications);

    const cancelNotificationsByCare = CancelNotificationsByCare(repository, service);

    await cancelNotificationsByCare(10);

    expect(repository.getByCareId).toHaveBeenCalledWith(10);
    expect(service.cancel).not.toHaveBeenCalled();
    expect(repository.deleteByCareId).toHaveBeenCalledWith(10);
  });

  it("não deve cancelar nenhuma notificação quando não houver notificações", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    repository.getByCareId.mockResolvedValue([]);

    const cancelNotificationsByCare = CancelNotificationsByCare(repository, service);

    await cancelNotificationsByCare(10);

    expect(repository.getByCareId).toHaveBeenCalledWith(10);
    expect(service.cancel).not.toHaveBeenCalled();
    expect(repository.deleteByCareId).toHaveBeenCalledWith(10);
  });
});
