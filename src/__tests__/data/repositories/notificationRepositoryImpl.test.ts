import { notificationRepository } from "@data/repositories/notificationRepositoryImpl";
import { getAll, run } from "@infra/database/database";
import { createNotification } from "@mocks/fixtures/notification";

jest.mock("@infra/database/database", () => ({
  getAll: jest.fn(),
  run: jest.fn(),
}));

describe("notificationRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("busca todas as notificações", async () => {
    const notification = createNotification();

    const row = {
      id: notification.id,
      plant_id: notification.plantId,
      care_schedule_id: notification.careScheduleId,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      read: 0,
      scheduled_for: notification.scheduledFor,
      expo_notification_id: notification.expoNotificationId,
      created_at: notification.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await notificationRepository.getAll();

    expect(getAll).toHaveBeenCalled();

    expect(result).toEqual([notification]);
  });

  it("cria uma notificação", async () => {
    const notification = createNotification();

    (run as jest.Mock).mockResolvedValue({
      lastInsertRowId: notification.id,
    });

    const { id, ...notificationToCreate } = notification;

    const result = await notificationRepository.create(notificationToCreate);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO notifications"), [
      notification.plantId,
      notification.careScheduleId,
      notification.title,
      notification.body,
      notification.type,
      0,
      notification.scheduledFor,
      notification.expoNotificationId,
      notification.createdAt,
    ]);

    expect(result).toEqual(notification);
  });

  it("marca uma notificação como lida", async () => {
    const notification = createNotification();

    (run as jest.Mock).mockResolvedValue({});

    await notificationRepository.markAsRead(notification.id);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("UPDATE notifications"), [notification.id]);
  });

  it("busca notificações pelo care", async () => {
    const notification = createNotification();

    const row = {
      id: notification.id,
      plant_id: notification.plantId,
      care_schedule_id: notification.careScheduleId,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      read: 0,
      scheduled_for: notification.scheduledFor,
      expo_notification_id: notification.expoNotificationId,
      created_at: notification.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await notificationRepository.getByCareId(notification.careScheduleId!);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE care_schedule_id = ?"), [
      notification.careScheduleId,
    ]);

    expect(result).toEqual([notification]);
  });

  it("exclui notificações pelo care", async () => {
    const notification = createNotification();

    (run as jest.Mock).mockResolvedValue({});

    await notificationRepository.deleteByCareId(notification.careScheduleId!);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM notifications"), [
      notification.careScheduleId,
    ]);
  });

  it("busca notificações pela planta", async () => {
    const notification = createNotification();

    const row = {
      id: notification.id,
      plant_id: notification.plantId,
      care_schedule_id: notification.careScheduleId,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      read: 0,
      scheduled_for: notification.scheduledFor,
      expo_notification_id: notification.expoNotificationId,
      created_at: notification.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await notificationRepository.getByPlantId(notification.plantId!);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE plant_id = ?"), [notification.plantId]);

    expect(result).toEqual([notification]);
  });

  it("exclui notificações pela planta", async () => {
    const notification = createNotification();

    (run as jest.Mock).mockResolvedValue({});

    await notificationRepository.deleteByPlantId(notification.plantId!);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM notifications"), [notification.plantId]);
  });

  it("exclui todas as notificações", async () => {
    (run as jest.Mock).mockResolvedValue({});

    await notificationRepository.deleteAll();

    expect(run).toHaveBeenCalledWith("DELETE FROM notifications");
  });

  it("busca notificações anteriores à data informada", async () => {
    const notification = createNotification();

    const row = {
      id: notification.id,
      plant_id: notification.plantId,
      care_schedule_id: notification.careScheduleId,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      read: 0,
      scheduled_for: notification.scheduledFor,
      expo_notification_id: notification.expoNotificationId,
      created_at: notification.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const date = "2023-02-01T00:00:00Z";

    const result = await notificationRepository.getOlderThan(date);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE scheduled_for < ?"), [date]);

    expect(result).toEqual([notification]);
  });

  it("exclui notificações anteriores à data informada", async () => {
    (run as jest.Mock).mockResolvedValue({});

    const date = "2023-02-01T00:00:00Z";

    await notificationRepository.deleteOlderThan(date);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM notifications"), [date]);
  });

  it("cria uma notificação já marcada como lida", async () => {
    const notification = createNotification({
      read: true,
    });

    (run as jest.Mock).mockResolvedValue({
      lastInsertRowId: notification.id,
    });

    const { id, ...notificationToCreate } = notification;

    const result = await notificationRepository.create(notificationToCreate);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO notifications"), [
      notification.plantId,
      notification.careScheduleId,
      notification.title,
      notification.body,
      notification.type,
      1,
      notification.scheduledFor,
      notification.expoNotificationId,
      notification.createdAt,
    ]);

    expect(result).toEqual(notification);
  });
});
