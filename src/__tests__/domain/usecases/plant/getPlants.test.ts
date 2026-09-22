import { GetPlants } from "@domain/usecases/plant/getPlants";

import { createPlant } from "@mocks/fixtures/plant";

import { createPlantRepositoryMock } from "@mocks/repositories/plantRepositoryMock";

describe("GetPlants", () => {
  it("deve retornar todas as plantas", async () => {
    const plants = [createPlant({ id: 1 }), createPlant({ id: 2, name: "Samambaia" })];

    const repository = createPlantRepositoryMock();

    repository.getAll.mockResolvedValue(plants);

    const getPlants = GetPlants(repository);
    const result = await getPlants();

    expect(repository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(plants);
  });
});
