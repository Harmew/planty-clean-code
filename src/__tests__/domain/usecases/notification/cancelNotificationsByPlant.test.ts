import { CancelNotificationsByPlant } from "@domain/usecases/notification/cancelNotificationsByPlant";

import { createNotification } from "@mocks/fixtures/notification";
import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";
import { createNotificationServiceMock } from "@mocks/services/notificationServiceMock";

describe("CancelNotificationsByPlant", () => {
  it("deve cancelar as notificações e removê-las do repositório", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notifications = [
      createNotification({
        id: 1,
        plantId: 10,
        expoNotificationId: "expo-1",
      }),
      createNotification({
        id: 2,
        plantId: 10,
        expoNotificationId: "expo-2",
      }),
    ];

    repository.getByPlantId.mockResolvedValue(notifications);

    const cancelNotificationsByPlant = CancelNotificationsByPlant(repository, service);

    await cancelNotificationsByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledWith(10);

    expect(service.cancel).toHaveBeenCalledTimes(2);
    expect(service.cancel).toHaveBeenNthCalledWith(1, "expo-1");
    expect(service.cancel).toHaveBeenNthCalledWith(2, "expo-2");

    expect(repository.deleteByPlantId).toHaveBeenCalledWith(10);
  });

  it("não deve cancelar uma notificação sem expoNotificationId", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notification = createNotification({
      id: 1,
      plantId: 10,
      expoNotificationId: null,
    });

    repository.getByPlantId.mockResolvedValue([notification]);

    const cancelNotificationsByPlant = CancelNotificationsByPlant(repository, service);

    await cancelNotificationsByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledWith(10);
    expect(service.cancel).not.toHaveBeenCalled();
    expect(repository.deleteByPlantId).toHaveBeenCalledWith(10);
  });

  it("não deve cancelar nenhuma notificação quando não houver notificações", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    repository.getByPlantId.mockResolvedValue([]);

    const cancelNotificationsByPlant = CancelNotificationsByPlant(repository, service);

    await cancelNotificationsByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledWith(10);
    expect(service.cancel).not.toHaveBeenCalled();
    expect(repository.deleteByPlantId).toHaveBeenCalledWith(10);
  });
});
