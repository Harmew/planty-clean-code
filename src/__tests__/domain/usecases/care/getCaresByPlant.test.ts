import { GetCaresByPlant } from "@domain/usecases/care/getCaresByPlant";

import { createCare } from "@mocks/fixtures/care";
import { createCareRepositoryMock } from "@mocks/repositories/careRepositoryMock";

describe("GetCaresByPlant", () => {
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

    repository.getByPlantId.mockResolvedValue(cares);

    const getCaresByPlant = GetCaresByPlant(repository);

    const result = await getCaresByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledTimes(1);
    expect(repository.getByPlantId).toHaveBeenCalledWith(10);
    expect(result).toEqual(cares);
  });
});
