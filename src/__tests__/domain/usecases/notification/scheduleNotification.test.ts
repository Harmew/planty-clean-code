import { ScheduleNotification } from "@domain/usecases/notification/scheduleNotification";

import { createNotification } from "@mocks/fixtures/notification";
import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";
import { createNotificationServiceMock } from "@mocks/services/notificationServiceMock";

describe("ScheduleNotification", () => {
  it("deve agendar a notificação e salvá-la no repositório", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const notification = createNotification({
      id: 1,
      plantId: 10,
      careScheduleId: 20,
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
      type: "water",
      expoNotificationId: "expo-123",
    });

    service.schedule.mockResolvedValue("expo-123");
    repository.create.mockResolvedValue(notification);

    const scheduleNotification = ScheduleNotification(repository, service);

    const input = {
      plantId: 10,
      careScheduleId: 20,
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
      type: "water" as const,
      scheduledFor: "2023-01-10T14:30:00.000Z",
    };

    const result = await scheduleNotification(input);

    expect(service.schedule).toHaveBeenCalledWith({
      title: input.title,
      body: input.body,
      date: expect.any(Date),
    });

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 10,
        careScheduleId: 20,
        title: input.title,
        body: input.body,
        type: "water",
        read: false,
        expoNotificationId: "expo-123",
      }),
    );

    expect(result).toEqual(notification);
  });

  it("deve agendar a notificação para as 06:00", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    service.schedule.mockResolvedValue("expo-123");
    repository.create.mockResolvedValue(
      createNotification({
        expoNotificationId: "expo-123",
      }),
    );

    const scheduleNotification = ScheduleNotification(repository, service);

    await scheduleNotification({
      plantId: 1,
      careScheduleId: 2,
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
      type: "water",
      scheduledFor: "2023-01-10T14:30:00.000Z",
    });

    const scheduleCall = service.schedule.mock.calls[0][0];

    expect(scheduleCall.date.getHours()).toBe(6);
    expect(scheduleCall.date.getMinutes()).toBe(0);
    expect(scheduleCall.date.getSeconds()).toBe(0);
    expect(scheduleCall.date.getMilliseconds()).toBe(0);

    const createCall = repository.create.mock.calls[0][0];

    expect(new Date(createCall.scheduledFor).getHours()).toBe(6);
    expect(new Date(createCall.scheduledFor).getMinutes()).toBe(0);
  });

  it("deve cancelar a notificação quando ocorrer erro ao salvar", async () => {
    const repository = createNotificationRepositoryMock();
    const service = createNotificationServiceMock();

    const error = new Error("Erro ao salvar notificação");

    service.schedule.mockResolvedValue("expo-123");
    repository.create.mockRejectedValue(error);

    const scheduleNotification = ScheduleNotification(repository, service);

    const input = {
      plantId: 10,
      careScheduleId: 20,
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
      type: "water" as const,
      scheduledFor: "2023-01-10T14:30:00.000Z",
    };

    await expect(scheduleNotification(input)).rejects.toThrow("Erro ao salvar notificação");

    expect(service.schedule).toHaveBeenCalledTimes(1);

    expect(service.cancel).toHaveBeenCalledTimes(1);
    expect(service.cancel).toHaveBeenCalledWith("expo-123");

    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
