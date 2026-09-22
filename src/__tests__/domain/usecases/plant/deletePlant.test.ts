import { DeletePlant } from "@domain/usecases/plant/deletePlant";

import { createPlant } from "@mocks/fixtures/plant";
import { createPlantRepositoryMock } from "@mocks/repositories/plantRepositoryMock";
import { createImageStorageMock } from "@mocks/storage/imageStorageMock";

describe("DeletePlant", () => {
  it("não deve fazer nada quando a planta não existir", async () => {
    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();
    const cancelNotificationsByPlant = jest.fn();

    repository.getById.mockResolvedValue(null);

    const deletePlantUseCase = DeletePlant(repository, imageStorage, cancelNotificationsByPlant);

    await deletePlantUseCase(1);

    expect(repository.getById).toHaveBeenCalledWith(1);
    expect(cancelNotificationsByPlant).not.toHaveBeenCalled();
    expect(repository.delete).not.toHaveBeenCalled();
    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
  });

  it("deve cancelar as notificações e deletar a planta sem imagem", async () => {
    const plant = createPlant({
      id: 1,
      image: null,
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();
    const cancelNotificationsByPlant = jest.fn();

    repository.getById.mockResolvedValue(plant);

    const deletePlantUseCase = DeletePlant(repository, imageStorage, cancelNotificationsByPlant);

    await deletePlantUseCase(1);

    expect(repository.getById).toHaveBeenCalledWith(1);
    expect(cancelNotificationsByPlant).toHaveBeenCalledWith(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
  });

  it("deve deletar a imagem quando a planta possuir imagem", async () => {
    const plant = createPlant({
      id: 1,
      image: "file:///images/jiboia.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();
    const cancelNotificationsByPlant = jest.fn();

    repository.getById.mockResolvedValue(plant);

    const deletePlantUseCase = DeletePlant(repository, imageStorage, cancelNotificationsByPlant);

    await deletePlantUseCase(1);

    expect(repository.getById).toHaveBeenCalledWith(1);
    expect(cancelNotificationsByPlant).toHaveBeenCalledWith(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(imageStorage.deleteImage).toHaveBeenCalledWith("file:///images/jiboia.jpg");
  });
});
