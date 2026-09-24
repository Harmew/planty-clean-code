import { MarkCareAsDone } from "@domain/usecases/care/mark-care-as-done.usecase";

import { createCare } from "@mocks/fixtures/care.fixture";
import { createPlant } from "@mocks/fixtures/plant.fixture";
import { createCareHistoryRepositoryMock } from "@mocks/repositories/care-history.repository.mock";
import { createCareRepositoryMock } from "@mocks/repositories/care.repository.mock";

describe("mark-care-as-done-usecase", () => {
  it("deve lançar erro quando o cuidado não existir", async () => {
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const getPlantById = jest.fn();
    const cancelNotificationsByCare = jest.fn();
    const scheduleNotification = jest.fn();

    careRepository.getByPlantAndType.mockResolvedValue(null);

    const markCareAsDone = MarkCareAsDone(
      careRepository,
      careHistoryRepository,
      getPlantById,
      cancelNotificationsByCare,
      scheduleNotification,
    );

    await expect(markCareAsDone(1, "water")).rejects.toThrow("Cuidado não encontrado");

    expect(careRepository.getByPlantAndType).toHaveBeenCalledWith(1, "water");

    expect(getPlantById).not.toHaveBeenCalled();
    expect(cancelNotificationsByCare).not.toHaveBeenCalled();
    expect(careRepository.update).not.toHaveBeenCalled();
    expect(careHistoryRepository.create).not.toHaveBeenCalled();
    expect(scheduleNotification).not.toHaveBeenCalled();
  });

  it("deve lançar erro quando a planta não existir", async () => {
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const getPlantById = jest.fn();
    const cancelNotificationsByCare = jest.fn();
    const scheduleNotification = jest.fn();

    const care = createCare({
      id: 10,
      plantId: 1,
      type: "water",
    });

    careRepository.getByPlantAndType.mockResolvedValue(care);
    getPlantById.mockResolvedValue(null);

    const markCareAsDone = MarkCareAsDone(
      careRepository,
      careHistoryRepository,
      getPlantById,
      cancelNotificationsByCare,
      scheduleNotification,
    );

    await expect(markCareAsDone(1, "water")).rejects.toThrow("Planta não encontrada");

    expect(careRepository.getByPlantAndType).toHaveBeenCalledWith(1, "water");

    expect(getPlantById).toHaveBeenCalledWith(1);

    expect(cancelNotificationsByCare).not.toHaveBeenCalled();
    expect(careRepository.update).not.toHaveBeenCalled();
    expect(careHistoryRepository.create).not.toHaveBeenCalled();
    expect(scheduleNotification).not.toHaveBeenCalled();
  });

  it("deve concluir o cuidado, atualizar o próximo vencimento, registrar o histórico e agendar a próxima notificação", async () => {
    const careRepository = createCareRepositoryMock();
    const careHistoryRepository = createCareHistoryRepositoryMock();
    const getPlantById = jest.fn();
    const cancelNotificationsByCare = jest.fn();
    const scheduleNotification = jest.fn();

    const care = createCare({
      id: 10,
      plantId: 1,
      type: "water",
      intervalDays: 7,
    });

    const plant = createPlant({
      id: 1,
      name: "Jiboia",
    });

    careRepository.getByPlantAndType.mockResolvedValue(care);
    getPlantById.mockResolvedValue(plant);

    const markCareAsDone = MarkCareAsDone(
      careRepository,
      careHistoryRepository,
      getPlantById,
      cancelNotificationsByCare,
      scheduleNotification,
    );

    await markCareAsDone(1, "water");

    expect(careRepository.getByPlantAndType).toHaveBeenCalledWith(1, "water");

    expect(getPlantById).toHaveBeenCalledWith(1);

    expect(cancelNotificationsByCare).toHaveBeenCalledWith(10);

    expect(careRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 10,
        plantId: 1,
        type: "water",
        intervalDays: 7,
        lastDone: expect.any(String),
        nextDue: expect.any(String),
      }),
    );

    expect(careHistoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plantId: 1,
        careScheduleId: 10,
        type: "water",
        intervalDays: 7,
        doneAt: expect.any(String),
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
  });
});
