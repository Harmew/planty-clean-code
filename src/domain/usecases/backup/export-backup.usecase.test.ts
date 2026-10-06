import { ExportBackup } from "@domain/usecases/backup/export-backup.usecase";

import { createBackup } from "@mocks/fixtures/backup.fixture";
import { createCareHistoryRepositoryMock } from "@mocks/repositories/care-history.repository.mock";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";
import { createNotificationRepositoryMock } from "@mocks/repositories/notification.repository.mock";
import { createPlantRepositoryMock } from "@mocks/repositories/plant.repository.mock";
import { createBackupStorageMock } from "@mocks/storage/backup.storage.mock";
import { createImageStorageMock } from "@mocks/storage/image.storage.mock";

describe("export-backup-usecase", () => {
  it("exporta dados e imagens usando apenas o nome do arquivo", async () => {
    const backup = createBackup();
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const plantWithImage = { ...backup.data.plants[0], image: "file:///images/1.jpg" };
    plantRepository.getAll.mockResolvedValue([plantWithImage]);
    careRepository.getAll.mockResolvedValue(backup.data.cares);
    careHistoryRepository.getAll.mockResolvedValue(backup.data.history);
    notificationRepository.getAll.mockResolvedValue(backup.data.notifications);
    imageStorage.readImage.mockReturnValue("base64-image");

    await ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    )("senha");

    expect(imageStorage.readImage).toHaveBeenCalledWith(plantWithImage.image);
    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          plants: [expect.objectContaining({ image: "1.jpg" })],
        }),
        images: { "1.jpg": "base64-image" },
      }),
      "senha",
    );
  });

  it("mantém a planta quando não há imagem ou a leitura falha", async () => {
    const backup = createBackup({
      data: {
        ...createBackup().data,
        plants: [
          { ...createBackup().data.plants[0], image: null },
          { ...createBackup().data.plants[0], id: 2, image: "file:///broken.jpg" },
        ],
      },
    });
    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    plantRepository.getAll.mockResolvedValue(backup.data.plants);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);
    imageStorage.readImage.mockImplementation(() => {
      throw new Error("falha");
    });

    await ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    )("senha");

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ plants: backup.data.plants }), images: {} }),
      "senha",
    );
  });

  it("mantém a planta quando a leitura da imagem não retorna conteúdo", async () => {
    const backup = createBackup();

    const backupStorage = createBackupStorageMock();
    const plantRepository = createPlantRepositoryMock();
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const notificationRepository = createNotificationRepositoryMock();
    const imageStorage = createImageStorageMock();

    const plantWithImage = {
      ...backup.data.plants[0],
      image: "file:///images/1.jpg",
    };

    plantRepository.getAll.mockResolvedValue([plantWithImage]);
    careRepository.getAll.mockResolvedValue([]);
    careHistoryRepository.getAll.mockResolvedValue([]);
    notificationRepository.getAll.mockResolvedValue([]);

    imageStorage.readImage.mockReturnValue(null);

    await ExportBackup(
      backupStorage,
      plantRepository,
      careRepository,
      careHistoryRepository,
      notificationRepository,
      imageStorage,
    )("senha");

    expect(imageStorage.readImage).toHaveBeenCalledWith(plantWithImage.image);

    expect(backupStorage.export).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          plants: [plantWithImage],
        }),
        images: {},
      }),
      "senha",
    );
  });
});
