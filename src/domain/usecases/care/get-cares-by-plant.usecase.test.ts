import { GetCaresByPlant } from "@domain/usecases/care/get-cares-by-plant.usecase";

import { createCare } from "@mocks/fixtures/care.fixture";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";

describe("get-cares-by-plant-usecase", () => {
  it("deve retornar os cuidados da planta", async () => {
    const repository = createCareRepositoryMock();

    const cares = [
      createCare({
        id: 1,
        plantId: 10,
      }),
      createCare({
        id: 2,
        plantId: 10,
      }),
    ];

    repository.getAllByPlantId.mockResolvedValue(cares);

    const getCaresByPlant = GetCaresByPlant(repository);

    const result = await getCaresByPlant(10);

    expect(repository.getAllByPlantId).toHaveBeenCalledTimes(1);
    expect(repository.getAllByPlantId).toHaveBeenCalledWith(10);
    expect(result).toEqual(cares);
  });
});
