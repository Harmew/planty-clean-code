import { ExportBackup } from "@domain/usecases/backup/export-backup.usecase";

import { createBackup } from "@mocks/fixtures/backup.fixture";
import { createCareHistoryRepositoryMock } from "@mocks/repositories/care-history.repository.mock";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";
import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";
import { createPlantRepositoryMock } from "@mocks/repositories/plant.repository.mock";
import { createBackupStorageMock } from "@mocks/storage/backup.storage.mock";
import { createImageStorageMock } from "@mocks/storage/image.storage.mock";

describe("export-backup-usecase", () => {
  it("deve exportar o backup com todos os dados", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const backup = createBackup();

    plantRepository.getAll.mockResolvedValue(backup.data.plants);
    careRepository.getAll.mockResolvedValue(backup.data.cares);
    careHistoryRepository.getAll.mockResolvedValue(backup.data.history);
    notificationRepository.getAll.mockResolvedValue(backup.data.notifications);

    imageStorage.readImage.mockResolvedValue("base64-image");

    const exportBackup = ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    );

    await exportBackup("senha");

    expect(plantRepository.getAll).toHaveBeenCalledTimes(1);
    expect(careRepository.getAll).toHaveBeenCalledTimes(1);
    expect(careHistoryRepository.getAll).toHaveBeenCalledTimes(1);
    expect(notificationRepository.getAll).toHaveBeenCalledTimes(1);

    expect(backupStorage.export).toHaveBeenCalledTimes(1);
    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        schemaVersion: 1,
        data: expect.objectContaining({
          cares: backup.data.cares,
          history: backup.data.history,
          notifications: backup.data.notifications,
        }),
      }),
      "senha",
    );
  });

  it("deve manter a planta sem imagem como está", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const backup = createBackup();

    const plant = {
      ...backup.data.plants[0],
      image: null,
    };

    plantRepository.getAll.mockResolvedValue([plant]);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);

    const exportBackup = ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    );

    await exportBackup("senha");

    expect(imageStorage.readImage).not.toHaveBeenCalled();

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          plants: [plant],
        }),
        images: {},
      }),
      "senha",
    );
  });

  it("deve ler a imagem e salvar apenas o nome do arquivo no backup", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const backup = createBackup();

    const plant = {
      ...backup.data.plants[0],
      image: "file:///documents/images/jiboia.jpg",
    };

    plantRepository.getAll.mockResolvedValue([plant]);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);

    imageStorage.readImage.mockResolvedValue("base64-jiboia");

    const exportBackup = ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    );

    await exportBackup("senha");

    expect(imageStorage.readImage).toHaveBeenCalledWith(plant.image);

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        images: {
          "jiboia.jpg": "base64-jiboia",
        },
        data: expect.objectContaining({
          plants: [
            {
              ...plant,
              image: "jiboia.jpg",
            },
          ],
        }),
      }),
      "senha",
    );
  });

  it("deve manter a planta original quando não conseguir obter o nome do arquivo", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const backup = createBackup();

    const plant = {
      ...backup.data.plants[0],
      image: "////",
    };

    plantRepository.getAll.mockResolvedValue([plant]);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);

    const exportBackup = ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    );

    await exportBackup("senha");

    expect(imageStorage.readImage).not.toHaveBeenCalled();

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          plants: [plant],
        }),
        images: {},
      }),
      "senha",
    );
  });

  it("deve manter a planta original quando a imagem não puder ser lida", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const backup = createBackup();

    const plant = {
      ...backup.data.plants[0],
      image: "file:///documents/jiboia.jpg",
    };

    plantRepository.getAll.mockResolvedValue([plant]);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);

    imageStorage.readImage.mockResolvedValue(null);

    const exportBackup = ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    );

    await exportBackup("senha");

    expect(imageStorage.readImage).toHaveBeenCalledWith(plant.image);

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          plants: [plant],
        }),
        images: {},
      }),
      "senha",
    );
  });

  it("deve manter a planta original quando ocorrer erro ao ler a imagem", async () => {
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const backup = createBackup();

    const plant = {
      ...backup.data.plants[0],
      image: "file:///documents/jiboia.jpg",
    };

    plantRepository.getAll.mockResolvedValue([plant]);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);

    imageStorage.readImage.mockRejectedValue(new Error("Erro ao ler imagem"));

    const exportBackup = ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    );

    await exportBackup("senha");

    expect(imageStorage.readImage).toHaveBeenCalledWith(plant.image);

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          plants: [plant],
        }),
        images: {},
      }),
      "senha",
    );
  });
});
