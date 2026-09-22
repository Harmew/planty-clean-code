import { CreatePlant } from "@domain/usecases/plant/createPlant";

import { createPlant } from "@mocks/fixtures/plant";
import { createPlantRepositoryMock } from "@mocks/repositories/plantRepositoryMock";
import { createImageStorageMock } from "@mocks/storage/imageStorageMock";

describe("CreatePlant", () => {
  it("deve criar uma planta sem imagem", async () => {
    const plant = createPlant();
    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.create.mockResolvedValue(plant);

    const createPlantUseCase = CreatePlant(repository, imageStorage);

    const result = await createPlantUseCase({
      name: "Jiboia",
      imageUri: null,
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "60",
    });

    expect(imageStorage.saveImage).not.toHaveBeenCalled();

    expect(repository.create).toHaveBeenCalledWith({
      name: "Jiboia",
      image: null,
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "60",
      createdAt: expect.any(String),
    });

    expect(result).toEqual(plant);
  });

  it("deve salvar a imagem antes de criar a planta", async () => {
    const plant = createPlant({
      image: "file:///images/jiboia.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    imageStorage.saveImage.mockResolvedValue("file:///images/jiboia.jpg");
    repository.create.mockResolvedValue(plant);

    const createPlantUseCase = CreatePlant(repository, imageStorage);

    const result = await createPlantUseCase({
      name: "Jiboia",
      imageUri: "file:///tmp/jiboia.jpg",
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "60",
    });

    expect(imageStorage.saveImage).toHaveBeenCalledWith("file:///tmp/jiboia.jpg");

    expect(repository.create).toHaveBeenCalledWith({
      name: "Jiboia",
      image: "file:///images/jiboia.jpg",
      location: "Sala",
      sunlight: "medium",
      temperatureMin: "18",
      temperatureMax: "30",
      humidity: "60",
      createdAt: expect.any(String),
    });

    expect(result).toEqual(plant);
  });

  it("deve deletar a imagem quando ocorrer erro ao criar a planta", async () => {
    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    const error = new Error("Erro ao criar planta");

    imageStorage.saveImage.mockResolvedValue("file:///images/jiboia.jpg");
    repository.create.mockRejectedValue(error);

    const createPlantUseCase = CreatePlant(repository, imageStorage);

    await expect(
      createPlantUseCase({
        name: "Jiboia",
        imageUri: "file:///tmp/jiboia.jpg",
        location: "Sala",
        sunlight: "medium",
        temperatureMin: "18",
        temperatureMax: "30",
        humidity: "60",
      }),
    ).rejects.toThrow("Erro ao criar planta");

    expect(imageStorage.saveImage).toHaveBeenCalledWith("file:///tmp/jiboia.jpg");

    expect(imageStorage.deleteImage).toHaveBeenCalledWith("file:///images/jiboia.jpg");
  });

  it("deve lançar o erro quando ocorrer erro ao criar a planta sem imagem", async () => {
    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    const error = new Error("Erro ao criar planta");

    repository.create.mockRejectedValue(error);

    const createPlantUseCase = CreatePlant(repository, imageStorage);

    await expect(
      createPlantUseCase({
        name: "Jiboia",
        imageUri: null,
        location: "Sala",
        sunlight: "medium",
        temperatureMin: "18",
        temperatureMax: "30",
        humidity: "60",
      }),
    ).rejects.toThrow("Erro ao criar planta");

    expect(imageStorage.saveImage).not.toHaveBeenCalled();
    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
  });
});
