import { GetCareHistoryByPlant } from "@domain/usecases/care-history/get-care-history-by-plant.usecase";

import { createCareHistory } from "@mocks/fixtures/care-history.fixture";
import { createCareHistoryRepositoryMock } from "@mocks/repositories/care-history.repository.mock";

describe("get-care-history-by-plant-usecase", () => {
  it("deve retornar o histórico de cuidados da planta", async () => {
    const repository = createCareHistoryRepositoryMock();

    const history = [
      createCareHistory({
        id: 1,
        plantId: 10,
      }),
      createCareHistory({
        id: 2,
        plantId: 10,
      }),
    ];

    repository.getByPlantId.mockResolvedValue(history);

    const getCareHistoryByPlant = GetCareHistoryByPlant(repository);

    const result = await getCareHistoryByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledTimes(1);
    expect(repository.getByPlantId).toHaveBeenCalledWith(10);
    expect(result).toEqual(history);
  });
});
