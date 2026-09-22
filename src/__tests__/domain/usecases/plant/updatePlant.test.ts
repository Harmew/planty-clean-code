import { UpdatePlant } from "@domain/usecases/plant/updatePlant";

import { createPlant } from "@mocks/fixtures/plant";
import { createPlantRepositoryMock } from "@mocks/repositories/plantRepositoryMock";
import { createImageStorageMock } from "@mocks/storage/imageStorageMock";

describe("UpdatePlant", () => {
  const input = {
    name: "Jiboia atualizada",
    imageUri: null,
    location: "Quarto",
    sunlight: "high" as const,
    temperatureMin: "20",
    temperatureMax: "32",
    humidity: "70",
  };

  it("deve lançar erro quando a planta não existir", async () => {
    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.getById.mockResolvedValue(null);

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    await expect(updatePlantUseCase(1, input)).rejects.toThrow("Planta não encontrada");

    expect(repository.update).not.toHaveBeenCalled();
    expect(imageStorage.saveImage).not.toHaveBeenCalled();
    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
  });

  it("deve atualizar a planta sem alterar a imagem", async () => {
    const plant = createPlant({
      id: 1,
      image: "file:///images/jiboia.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.getById.mockResolvedValue(plant);

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    const result = await updatePlantUseCase(1, input);

    expect(repository.getById).toHaveBeenCalledWith(1);

    expect(imageStorage.saveImage).not.toHaveBeenCalled();

    expect(repository.update).toHaveBeenCalledWith({
      ...plant,
      name: "Jiboia atualizada",
      image: "file:///images/jiboia.jpg",
      location: "Quarto",
      sunlight: "high",
      temperatureMin: "20",
      temperatureMax: "32",
      humidity: "70",
    });

    expect(imageStorage.deleteImage).not.toHaveBeenCalled();

    expect(result).toEqual({
      ...plant,
      name: "Jiboia atualizada",
      image: "file:///images/jiboia.jpg",
      location: "Quarto",
      sunlight: "high",
      temperatureMin: "20",
      temperatureMax: "32",
      humidity: "70",
    });
  });

  it("deve salvar a nova imagem e deletar a imagem antiga", async () => {
    const plant = createPlant({
      id: 1,
      image: "file:///images/old.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.getById.mockResolvedValue(plant);
    imageStorage.saveImage.mockResolvedValue("file:///images/new.jpg");

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    const result = await updatePlantUseCase(1, {
      ...input,
      imageUri: "file:///tmp/new.jpg",
    });

    expect(imageStorage.saveImage).toHaveBeenCalledWith("file:///tmp/new.jpg");

    expect(repository.update).toHaveBeenCalledWith({
      ...plant,
      name: "Jiboia atualizada",
      image: "file:///images/new.jpg",
      location: "Quarto",
      sunlight: "high",
      temperatureMin: "20",
      temperatureMax: "32",
      humidity: "70",
    });

    expect(imageStorage.deleteImage).toHaveBeenCalledWith("file:///images/old.jpg");

    expect(result).toEqual({
      ...plant,
      name: "Jiboia atualizada",
      image: "file:///images/new.jpg",
      location: "Quarto",
      sunlight: "high",
      temperatureMin: "20",
      temperatureMax: "32",
      humidity: "70",
    });
  });

  it("não deve salvar uma nova imagem quando a imagem for a mesma", async () => {
    const plant = createPlant({
      id: 1,
      image: "file:///images/jiboia.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.getById.mockResolvedValue(plant);

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    const result = await updatePlantUseCase(1, {
      ...input,
      imageUri: "file:///images/jiboia.jpg",
    });

    expect(imageStorage.saveImage).not.toHaveBeenCalled();

    expect(imageStorage.deleteImage).not.toHaveBeenCalled();

    expect(repository.update).toHaveBeenCalledWith({
      ...plant,
      name: "Jiboia atualizada",
      image: "file:///images/jiboia.jpg",
      location: "Quarto",
      sunlight: "high",
      temperatureMin: "20",
      temperatureMax: "32",
      humidity: "70",
    });

    expect(result.image).toBe("file:///images/jiboia.jpg");
  });

  it("deve deletar a nova imagem quando ocorrer erro ao atualizar", async () => {
    const plant = createPlant({
      id: 1,
      image: "file:///images/old.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    const error = new Error("Erro ao atualizar planta");

    repository.getById.mockResolvedValue(plant);
    imageStorage.saveImage.mockResolvedValue("file:///images/new.jpg");
    repository.update.mockRejectedValue(error);

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    await expect(
      updatePlantUseCase(1, {
        ...input,
        imageUri: "file:///tmp/new.jpg",
      }),
    ).rejects.toThrow("Erro ao atualizar planta");

    expect(imageStorage.saveImage).toHaveBeenCalledWith("file:///tmp/new.jpg");

    expect(repository.update).toHaveBeenCalled();

    expect(imageStorage.deleteImage).toHaveBeenCalledWith("file:///images/new.jpg");
  });

  it("não deve deletar a imagem antiga quando ela não existir", async () => {
    const plant = createPlant({
      id: 1,
      image: null,
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.getById.mockResolvedValue(plant);
    imageStorage.saveImage.mockResolvedValue("file:///images/new.jpg");

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    await updatePlantUseCase(1, {
      ...input,
      imageUri: "file:///tmp/new.jpg",
    });

    expect(imageStorage.saveImage).toHaveBeenCalledWith("file:///tmp/new.jpg");

    expect(repository.update).toHaveBeenCalled();

    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
  });

  it("não deve deletar imagem quando ocorrer erro sem trocar a imagem", async () => {
    const plant = createPlant({
      id: 1,
      image: "file:///images/old.jpg",
    });

    const repository = createPlantRepositoryMock();
    const imageStorage = createImageStorageMock();

    repository.getById.mockResolvedValue(plant);
    repository.update.mockRejectedValue(new Error("Erro ao atualizar planta"));

    const updatePlantUseCase = UpdatePlant(repository, imageStorage);

    await expect(updatePlantUseCase(1, input)).rejects.toThrow("Erro ao atualizar planta");

    expect(imageStorage.saveImage).not.toHaveBeenCalled();
    expect(imageStorage.deleteImage).not.toHaveBeenCalled();
  });
});
