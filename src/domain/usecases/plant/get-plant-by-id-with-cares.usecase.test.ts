import { GetPlantByIdWithCares } from "@domain/usecases/plant/get-plant-by-id-with-cares.usecase";

import { createPlant } from "@mocks/fixtures/plant.fixture";
import { createPlantRepositoryMock } from "@mocks/repositories/plant.repository.mock";

describe("get-plant-by-id-with-cares-usecase", () => {
  it("busca uma planta com cuidados em uma operação", async () => {
    const plant = { ...createPlant({ id: 1 }), cares: [] };
    const repository = createPlantRepositoryMock();

    repository.getByIdWithCares.mockResolvedValue(plant);

    const getPlantByIdWithCares = GetPlantByIdWithCares(repository);
    const result = await getPlantByIdWithCares(1);

    expect(repository.getByIdWithCares).toHaveBeenCalledWith(1);
    expect(result).toEqual(plant);
  });

  it("deve retornar null quando a planta não existir", async () => {
    const repository = createPlantRepositoryMock();

    repository.getByIdWithCares.mockResolvedValue(null);

    const getPlantByIdWithCares = GetPlantByIdWithCares(repository);

    const result = await getPlantByIdWithCares(1);

    expect(repository.getByIdWithCares).toHaveBeenCalledWith(1);
    expect(result).toBeNull();
  });
});
