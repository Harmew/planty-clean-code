import { CreateOrUpdateCares } from "@domain/usecases/care/create-or-update-cares.usecase";

import { createCare } from "@mocks/fixtures/care.fixture";
import { createPlant } from "@mocks/fixtures/plant.fixture";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";

describe("create-or-update-cares-usecase", () => {
  it("deve lançar erro quando a planta não existir", async () => {
    const repository = createCareRepositoryMock();
    const getPlantById = jest.fn();
    const scheduleNotification = jest.fn();
    const cancelNotificationsByCare = jest.fn();

    getPlantById.mockResolvedValue(null);

    const createOrUpdateCares = CreateOrUpdateCares(
      repository,
      getPlantById,
      scheduleNotification,
      cancelNotificationsByCare,
    );

    await expect(createOrUpdateCares(1, [])).rejects.toThrow("Planta não encontrada");

    expect(getPlantById).toHaveBeenCalledWith(1);
    expect(repository.getByPlantAndType).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("deve deletar o cuidado e cancelar as notificações quando estiver desabilitado", async () => {
    const repository = createCareRepositoryMock();
    const getPlantById = jest.fn();
    const scheduleNotification = jest.fn();
    const cancelNotificationsByCare = jest.fn();

    const plant = createPlant({ id: 1 });
    const care = createCare({
      id: 10,
      plantId: 1,
      type: "water",
    });

    getPlantById.mockResolvedValue(plant);
    repository.getByPlantAndType.mockResolvedValue(care);

    const createOrUpdateCares = CreateOrUpdateCares(
      repository,
      getPlantById,
      scheduleNotification,
      cancelNotificationsByCare,
    );

    await createOrUpdateCares(1, [
      {
        type: "water",
        intervalDays: 7,
        enabled: false,
      },
    ]);

    expect(repository.getByPlantAndType).toHaveBeenCalledWith(1, "water");

    expect(cancelNotificationsByCare).toHaveBeenCalledWith(10);
    expect(repository.delete).toHaveBeenCalledWith(10);

    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
    expect(scheduleNotification).not.toHaveBeenCalled();
  });

  it("não deve fazer nada quando o cuidado estiver desabilitado e não existir", async () => {
    const repository = createCareRepositoryMock();
    const getPlantById = jest.fn();
    const scheduleNotification = jest.fn();
    const cancelNotificationsByCare = jest.fn();

    getPlantById.mockResolvedValue(createPlant({ id: 1 }));
    repository.getByPlantAndType.mockResolvedValue(null);

    const createOrUpdateCares = CreateOrUpdateCares(
      repository,
      getPlantById,
      scheduleNotification,
      cancelNotificationsByCare,
    );

    await createOrUpdateCares(1, [
      {
        type: "water",
        intervalDays: 7,
        enabled: false,
      },
    ]);

    expect(repository.getByPlantAndType).toHaveBeenCalledWith(1, "water");

    expect(cancelNotificationsByCare).not.toHaveBeenCalled();
    expect(repository.delete).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
    expect(scheduleNotification).not.toHaveBeenCalled();
  });

  it("deve atualizar o cuidado existente e agendar uma nova notificação", async () => {
    const repository = createCareRepositoryMock();
    const getPlantById = jest.fn();
    const scheduleNotification = jest.fn();
    const cancelNotificationsByCare = jest.fn();

    const plant = createPlant({
      id: 1,
      name: "Jiboia",
    });

    const care = createCare({
      id: 10,
      plantId: 1,
      type: "water",
      intervalDays: 7,
    });

    getPlantById.mockResolvedValue(plant);
    repository.getByPlantAndType.mockResolvedValue(care);

    const createOrUpdateCares = CreateOrUpdateCares(
      repository,
      getPlantById,
      scheduleNotification,
      cancelNotificationsByCare,
    );

    await createOrUpdateCares(1, [
      {
        type: "water",
        intervalDays: 14,
        enabled: true,
      },
    ]);

    expect(cancelNotificationsByCare).toHaveBeenCalledWith(10);

    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 10,
        plantId: 1,
        type: "water",
        intervalDays: 14,
        nextDue: expect.any(String),
      }),
    );

    expect(scheduleNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 1,
        careScheduleId: 10,
        title: "Hora de regar",
        body: "A planta Jiboia precisa de água!",
        type: "water",
        scheduledFor: expect.any(String),
      }),
    );

    expect(repository.create).not.toHaveBeenCalled();
  });

  it("deve criar o cuidado e agendar uma nova notificação quando não existir", async () => {
    const repository = createCareRepositoryMock();
    const getPlantById = jest.fn();
    const scheduleNotification = jest.fn();
    const cancelNotificationsByCare = jest.fn();

    const plant = createPlant({
      id: 1,
      name: "Jiboia",
    });

    const care = createCare({
      id: 20,
      plantId: 1,
      type: "water",
      intervalDays: 7,
    });

    getPlantById.mockResolvedValue(plant);
    repository.getByPlantAndType.mockResolvedValue(null);
    repository.create.mockResolvedValue(care);

    const createOrUpdateCares = CreateOrUpdateCares(
      repository,
      getPlantById,
      scheduleNotification,
      cancelNotificationsByCare,
    );

    await createOrUpdateCares(1, [
      {
        type: "water",
        intervalDays: 7,
        enabled: true,
      },
    ]);

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 1,
        type: "water",
        intervalDays: 7,
        lastDone: null,
        nextDue: expect.any(String),
        createdAt: expect.any(String),
      }),
    );

    expect(scheduleNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 1,
        careScheduleId: 20,
        title: "Hora de regar",
        body: "A planta Jiboia precisa de água!",
        type: "water",
        scheduledFor: care.nextDue,
      }),
    );

    expect(cancelNotificationsByCare).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
  });
});
