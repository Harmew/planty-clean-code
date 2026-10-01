import { GetPlantsWithCares } from "@domain/usecases/plant/get-plants-with-cares.usecase";

import { createPlant } from "@mocks/fixtures/plant.fixture";
import { createPlantRepositoryMock } from "@mocks/repositories/plant.repository.mock";

describe("get-plants-with-cares-usecase", () => {
  it("busca plantas com cuidados em uma operação agregada", async () => {
    const plants = [{ ...createPlant({ id: 1 }), cares: [] }];
    const repository = createPlantRepositoryMock();

    repository.getAllWithCares.mockResolvedValue(plants);

    const getPlantsWithCares = GetPlantsWithCares(repository);
    const result = await getPlantsWithCares();

    expect(repository.getAllWithCares).toHaveBeenCalledTimes(1);
    expect(result).toEqual(plants);
  });
});
