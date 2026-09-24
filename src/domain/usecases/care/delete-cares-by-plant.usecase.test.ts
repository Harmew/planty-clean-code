import { DeleteCaresByPlant } from "@domain/usecases/care/delete-cares-by-plant.usecase";

import { createCare } from "@mocks/fixtures/care.fixture";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";

describe("delete-cares-by-plant-usecase", () => {
  it("deve cancelar as notificações e excluir os cuidados da planta", async () => {
    const repository = createCareRepositoryMock();
    const cancelNotificationsByCare = jest.fn();

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

    const deleteCaresByPlant = DeleteCaresByPlant(repository, cancelNotificationsByCare);

    await deleteCaresByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledWith(10);

    expect(cancelNotificationsByCare).toHaveBeenCalledTimes(2);
    expect(cancelNotificationsByCare).toHaveBeenNthCalledWith(1, 1);
    expect(cancelNotificationsByCare).toHaveBeenNthCalledWith(2, 2);

    expect(repository.deleteByPlantId).toHaveBeenCalledWith(10);
  });

  it("não deve cancelar notificações quando a planta não possuir cuidados", async () => {
    const repository = createCareRepositoryMock();
    const cancelNotificationsByCare = jest.fn();

    repository.getByPlantId.mockResolvedValue([]);

    const deleteCaresByPlant = DeleteCaresByPlant(repository, cancelNotificationsByCare);

    await deleteCaresByPlant(10);

    expect(repository.getByPlantId).toHaveBeenCalledWith(10);
    expect(cancelNotificationsByCare).not.toHaveBeenCalled();
    expect(repository.deleteByPlantId).toHaveBeenCalledWith(10);
  });
});
