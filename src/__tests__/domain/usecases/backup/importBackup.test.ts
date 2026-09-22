import { ImportBackup } from "@domain/usecases/backup/importBackup";

import { createBackup } from "@mocks/fixtures/backup";
import { createCareHistoryRepositoryMock } from "@mocks/repositories/careHistoryRepositoryMock";
import { createCareRepositoryMock } from "@mocks/repositories/careRepositoryMock";
import { createNotificationRepositoryMock } from "@mocks/repositories/notificationRepositoryMock";
import { createPlantRepositoryMock } from "@mocks/repositories/plantRepositoryMock";
import { createBackupStorageMock } from "@mocks/storage/backupStorageMock";
import { createImageStorageMock } from "@mocks/storage/imageStorageMock";
import { createNotificationServiceMock } from "@mocks/services/notificationServiceMock";

describe("ImportBackup", () => {
  it("não deve fazer nada quando o backup for nulo", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    backupStorage.import.mockResolvedValue(null);

    const importBackup = ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    );

    await importBackup("senha");

    expect(backupStorage.import).toHaveBeenCalledWith("senha");

    expect(notificationService.cancelAll).not.toHaveBeenCalled();
    expect(plantRepository.getAll).not.toHaveBeenCalled();
    expect(plantRepository.deleteAll).not.toHaveBeenCalled();
  });

  it("deve remover imagens e restaurar os dados do backup", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    const backup = createBackup();

    const currentPlant = {
      ...backup.data.plants[0],
      id: 99,
      image: "file:///images/current.jpg",
    };

    backupStorage.import.mockResolvedValue(backup);
    plantRepository.getAll.mockResolvedValueOnce([currentPlant]).mockResolvedValueOnce(backup.data.plants);

    const importBackup = ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    );

    await importBackup("senha");

    expect(notificationService.cancelAll).toHaveBeenCalledTimes(2);

    expect(plantRepository.getAll).toHaveBeenCalledTimes(2);

    expect(imageStorage.deleteImage).toHaveBeenCalledWith("file:///images/current.jpg");

    expect(plantRepository.deleteAll).toHaveBeenCalledTimes(1);

    expect(imageStorage.saveBase64).toHaveBeenCalledWith("base64-image", "1.jpg");

    expect(plantRepository.create).toHaveBeenCalledWith(backup.data.plants[0]);

    expect(careRepository.create).toHaveBeenCalledWith(backup.data.cares[0]);

    expect(careHistoryRepository.create).toHaveBeenCalledWith(backup.data.history[0]);
  });

  it("não deve remover imagem quando a planta atual não possuir imagem", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    const backup = createBackup();

    plantRepository.getAll
      .mockResolvedValueOnce([
        {
          ...backup.data.plants[0],
          id: 99,
          image: null,
        },
      ])
      .mockResolvedValueOnce(backup.data.plants);

    backupStorage.import.mockResolvedValue(backup);

    const importBackup = ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    );

    await importBackup("senha");

    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
    expect(plantRepository.deleteAll).toHaveBeenCalledTimes(1);
  });

  it("deve recriar notificações futuras", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    const backup = createBackup({
      data: {
        ...createBackup().data,
        cares: [
          {
            ...createBackup().data.cares[0],
            plantId: 1,
            type: "water",
            nextDue: "2099-01-10T06:00:00.000Z",
          },
        ],
      },
    });

    backupStorage.import.mockResolvedValue(backup);

    plantRepository.getAll.mockResolvedValueOnce([]).mockResolvedValueOnce(backup.data.plants);

    notificationService.schedule.mockResolvedValue("expo-new-123");

    const importBackup = ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    );

    await importBackup("senha");

    expect(notificationService.schedule).toHaveBeenCalledWith({
      title: "Hora de regar",
      body: `A planta ${backup.data.plants[0].name} precisa de água!`,
      date: new Date("2099-01-10T06:00:00.000Z"),
    });

    expect(notificationRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 1,
        careScheduleId: backup.data.cares[0].id,
        type: "water",
        read: false,
        scheduledFor: "2099-01-10T06:00:00.000Z",
        expoNotificationId: "expo-new-123",
      }),
    );
  });

  it("não deve recriar notificação quando o cuidado já estiver vencido", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    const backup = createBackup({
      data: {
        ...createBackup().data,
        cares: [
          {
            ...createBackup().data.cares[0],
            nextDue: "2020-01-10T06:00:00.000Z",
          },
        ],
      },
    });

    backupStorage.import.mockResolvedValue(backup);

    plantRepository.getAll.mockResolvedValueOnce([]).mockResolvedValueOnce(backup.data.plants);

    const importBackup = ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    );

    await importBackup("senha");

    expect(notificationService.schedule).not.toHaveBeenCalled();
    expect(notificationRepository.create).not.toHaveBeenCalled();
  });

  it("não deve recriar notificação quando a planta do cuidado não existir", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    const backup = createBackup({
      data: {
        ...createBackup().data,
        plants: [],
        cares: [
          {
            ...createBackup().data.cares[0],
            plantId: 999,
            nextDue: "2099-01-10T06:00:00.000Z",
          },
        ],
      },
    });

    backupStorage.import.mockResolvedValue(backup);

    plantRepository.getAll.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    const importBackup = ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    );

    await importBackup("senha");

    expect(notificationService.schedule).not.toHaveBeenCalled();
    expect(notificationRepository.create).not.toHaveBeenCalled();
  });
});
