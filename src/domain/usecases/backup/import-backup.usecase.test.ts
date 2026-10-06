import { ImportBackup } from "@domain/usecases/backup/import-backup.usecase";

import { createBackup } from "@mocks/fixtures/backup.fixture";

import { createCareHistoryRepositoryMock } from "@mocks/repositories/care-history.repository.mock";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";
import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";
import { createPlantRepositoryMock } from "@mocks/repositories/plant.repository.mock";
import { createNotificationServiceMock } from "@mocks/services/notification.service.mock";

import { createBackupStorageMock } from "@mocks/storage/backup.storage.mock";
import { createImageStorageMock } from "@mocks/storage/image.storage.mock";

describe("import-backup-usecase", () => {
  it("não faz nada quando o backup não existe", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    backupStorage.import.mockResolvedValue(null);

    await ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    )("senha");

    expect(backupStorage.import).toHaveBeenCalledWith("senha");
    expect(notificationService.cancelAll).not.toHaveBeenCalled();
    expect(plantRepository.deleteAll).not.toHaveBeenCalled();
    expect(imageStorage.saveBase64).not.toHaveBeenCalled();
  });

  it("restaura imagens, plantas, cuidados e histórico", async () => {
    const backup = createBackup({
      images: {
        "1.jpg": "base64-image",
      },
    });

    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    backupStorage.import.mockResolvedValue(backup);

    plantRepository.getAll
      .mockResolvedValueOnce([
        {
          ...backup.data.plants[0],
          image: "old-image.jpg",
        },
      ])
      .mockResolvedValueOnce([
        {
          ...backup.data.plants[0],
          id: 101,
          name: backup.data.plants[0].name,
        },
      ]);

    plantRepository.create.mockResolvedValue({
      ...backup.data.plants[0],
      id: 101,
    });

    careRepository.create.mockResolvedValue({
      ...backup.data.cares[0],
      id: 201,
      plantId: 101,
    });

    careHistoryRepository.create.mockResolvedValue(backup.data.history[0]);

    notificationService.schedule.mockResolvedValue("notification-1");

    await ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    )("senha");

    expect(notificationService.cancelAll).toHaveBeenCalledTimes(1);

    expect(imageStorage.deleteImage).toHaveBeenCalledWith("old-image.jpg");

    expect(plantRepository.deleteAll).toHaveBeenCalledTimes(1);

    expect(imageStorage.saveBase64).toHaveBeenCalledWith("base64-image", "1.jpg");

    expect(plantRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: backup.data.plants[0].name,
      }),
    );

    expect(careRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 101,
      }),
    );

    expect(careHistoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 101,
      }),
    );
  });

  it("ignora cuidados que não possuem a planta restaurada", async () => {
    const backup = createBackup({
      data: {
        ...createBackup().data,
        cares: [
          {
            ...createBackup().data.cares[0],
            plantId: 999,
          },
        ],
      },
    });

    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    backupStorage.import.mockResolvedValue(backup);

    plantRepository.getAll.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    plantRepository.create.mockResolvedValue({
      ...backup.data.plants[0],
      id: 101,
    });

    await ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    )("senha");

    expect(careRepository.create).not.toHaveBeenCalled();
  });

  it("ignora histórico quando a planta não foi restaurada e mantém careId nulo", async () => {
    const backup = createBackup({
      data: {
        ...createBackup().data,
        history: [
          {
            ...createBackup().data.history[0],
            careId: null,
          },
          {
            ...createBackup().data.history[0],
            id: 2,
            plantId: 999,
            careId: null,
          },
        ],
      },
    });

    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    backupStorage.import.mockResolvedValue(backup);

    plantRepository.getAll.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    plantRepository.create.mockResolvedValue({
      ...backup.data.plants[0],
      id: 101,
    });

    careHistoryRepository.create.mockResolvedValue(backup.data.history[0]);

    await ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    )("senha");

    expect(careHistoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 101,
        careId: null,
      }),
    );

    expect(careHistoryRepository.create).not.toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 999,
      }),
    );
  });

  it("agenda apenas cuidados futuros com referências válidas", async () => {
    const backup = createBackup();

    const futureCare = {
      ...backup.data.cares[0],
      id: 10,
      plantId: backup.data.plants[0].id,
      nextDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const overdueCare = {
      ...backup.data.cares[0],
      id: 11,
      plantId: backup.data.plants[0].id,
      nextDue: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    };

    const invalidPlantCare = {
      ...backup.data.cares[0],
      id: 12,
      plantId: 999,
      nextDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const backupWithCares = createBackup({
      data: {
        ...backup.data,
        cares: [futureCare, overdueCare, invalidPlantCare],
      },
    });

    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();
    const notificationService = createNotificationServiceMock();

    backupStorage.import.mockResolvedValue(backupWithCares);

    plantRepository.getAll.mockResolvedValueOnce([]).mockResolvedValueOnce([
      {
        ...backup.data.plants[0],
        id: 101,
      },
    ]);

    plantRepository.create.mockResolvedValue({
      ...backup.data.plants[0],
      id: 101,
    });

    careRepository.create
      .mockResolvedValueOnce({
        ...futureCare,
        id: 201,
        plantId: 101,
      })
      .mockResolvedValueOnce({
        ...overdueCare,
        id: 202,
        plantId: 101,
      });

    notificationService.schedule.mockResolvedValue("notification-1");

    await ImportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
      notificationService,
    )("senha");

    expect(notificationService.schedule).toHaveBeenCalledTimes(1);

    expect(notificationService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.any(String),
        body: expect.any(String),
        date: new Date(futureCare.nextDue),
      }),
    );

    expect(notificationRepository.create).toHaveBeenCalledTimes(1);

    expect(notificationRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 101,
        careId: 201,
        expoNotificationId: "notification-1",
        read: false,
        scheduledFor: futureCare.nextDue,
      }),
    );
  });
});
