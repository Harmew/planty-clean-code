import { GetPlantById } from "@domain/usecases/plant/getPlantById";

import { createPlant } from "@mocks/fixtures/plant";
import { createPlantRepositoryMock } from "@mocks/repositories/plantRepositoryMock";

describe("GetPlantById", () => {
  it("deve retornar a planta pelo ID", async () => {
    const plant = createPlant({ id: 1 });
    const repository = createPlantRepositoryMock();

    repository.getById.mockResolvedValue(plant);

    const getPlantByIdUseCase = GetPlantById(repository);

    const result = await getPlantByIdUseCase(1);

    expect(repository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(plant);
  });

  it("deve retornar null quando a planta não existir", async () => {
    const repository = createPlantRepositoryMock();

    repository.getById.mockResolvedValue(null);

    const getPlantByIdUseCase = GetPlantById(repository);

    const result = await getPlantByIdUseCase(1);

    expect(repository.getById).toHaveBeenCalledWith(1);
    expect(result).toBeNull();
  });
});
