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
    expect(repository.getAllByPlantIdAndType).not.toHaveBeenCalled();
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
    repository.getAllByPlantIdAndType.mockResolvedValue(care);

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

    expect(repository.getAllByPlantIdAndType).toHaveBeenCalledWith(1, "water");

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
    repository.getAllByPlantIdAndType.mockResolvedValue(null);

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

    expect(repository.getAllByPlantIdAndType).toHaveBeenCalledWith(1, "water");

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
    repository.getAllByPlantIdAndType.mockResolvedValue(care);

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
        careId: 10,
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
    repository.getAllByPlantIdAndType.mockResolvedValue(null);
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
        careId: 20,
        title: "Hora de regar",
        body: "A planta Jiboia precisa de água!",
        type: "water",
        scheduledFor: care.nextDue,
      }),
    );

    expect(cancelNotificationsByCare).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
  });

  describe("cuidados existentes habilitados", () => {
    const NOW = new Date("2026-10-01T12:00:00.000Z");

    const setup = () => {
      const repository = createCareRepositoryMock();
      const getPlantById = jest.fn().mockResolvedValue(createPlant({ id: 1, name: "Jiboia" }));
      const scheduleNotification = jest.fn();
      const cancelNotificationsByCare = jest.fn();

      const createOrUpdateCares = CreateOrUpdateCares(
        repository,
        getPlantById,
        scheduleNotification,
        cancelNotificationsByCare,
      );

      return { repository, scheduleNotification, cancelNotificationsByCare, createOrUpdateCares };
    };

    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(NOW);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("não deve alterar nem reagendar o cuidado quando o intervalo não mudou", async () => {
      const { repository, scheduleNotification, cancelNotificationsByCare, createOrUpdateCares } = setup();

      repository.getAllByPlantIdAndType.mockResolvedValue(
        createCare({ id: 10, plantId: 1, type: "water", intervalDays: 2 }),
      );

      await createOrUpdateCares(1, [{ type: "water", intervalDays: 2, enabled: true }]);

      expect(cancelNotificationsByCare).not.toHaveBeenCalled();
      expect(repository.update).not.toHaveBeenCalled();
      expect(repository.create).not.toHaveBeenCalled();
      expect(scheduleNotification).not.toHaveBeenCalled();
    });

    it("deve recalcular o vencimento a partir da última vez feito quando o intervalo mudar", async () => {
      const { repository, scheduleNotification, createOrUpdateCares } = setup();

      repository.getAllByPlantIdAndType.mockResolvedValue(
        createCare({
          id: 10,
          plantId: 1,
          type: "water",
          intervalDays: 7,
          lastDone: "2026-09-30T12:00:00.000Z",
          createdAt: "2026-09-01T12:00:00.000Z",
        }),
      );

      await createOrUpdateCares(1, [{ type: "water", intervalDays: 3, enabled: true }]);

      // 30/09 + 3 dias = 03/10 (e não hoje + 3 = 04/10)
      expect(repository.update).toHaveBeenCalledWith(
        expect.objectContaining({ id: 10, intervalDays: 3, nextDue: "2026-10-03T12:00:00.000Z" }),
      );
      expect(scheduleNotification).toHaveBeenCalledWith(
        expect.objectContaining({ careId: 10, scheduledFor: "2026-10-03T12:00:00.000Z" }),
      );
    });

    it("deve usar a data de criação como base quando o cuidado nunca foi feito", async () => {
      const { repository, createOrUpdateCares } = setup();

      repository.getAllByPlantIdAndType.mockResolvedValue(
        createCare({
          id: 10,
          plantId: 1,
          type: "water",
          intervalDays: 2,
          lastDone: null,
          createdAt: "2026-09-30T12:00:00.000Z",
        }),
      );

      await createOrUpdateCares(1, [{ type: "water", intervalDays: 5, enabled: true }]);

      // 30/09 + 5 dias = 05/10
      expect(repository.update).toHaveBeenCalledWith(expect.objectContaining({ nextDue: "2026-10-05T12:00:00.000Z" }));
    });

    it("deve vencer a partir de agora quando o novo prazo já estiver no passado", async () => {
      const { repository, scheduleNotification, createOrUpdateCares } = setup();

      repository.getAllByPlantIdAndType.mockResolvedValue(
        createCare({
          id: 10,
          plantId: 1,
          type: "water",
          intervalDays: 2,
          lastDone: "2026-09-01T12:00:00.000Z",
        }),
      );

      await createOrUpdateCares(1, [{ type: "water", intervalDays: 5, enabled: true }]);

      // 01/09 + 5 dias já passou, então usa hoje + 5 = 06/10
      expect(repository.update).toHaveBeenCalledWith(expect.objectContaining({ nextDue: "2026-10-06T12:00:00.000Z" }));
      expect(scheduleNotification).toHaveBeenCalledWith(
        expect.objectContaining({ scheduledFor: "2026-10-06T12:00:00.000Z" }),
      );
    });

    it("deve criar o cuidado novo sem mexer nos existentes que não mudaram", async () => {
      const { repository, scheduleNotification, cancelNotificationsByCare, createOrUpdateCares } = setup();

      const existingWater = createCare({ id: 10, plantId: 1, type: "water", intervalDays: 2 });

      repository.getAllByPlantIdAndType.mockImplementation(async (_plantId, type) =>
        type === "water" ? existingWater : null,
      );
      repository.create.mockResolvedValue(
        createCare({ id: 20, plantId: 1, type: "fertilize", intervalDays: 30, nextDue: "2026-10-31T12:00:00.000Z" }),
      );

      await createOrUpdateCares(1, [
        { type: "water", intervalDays: 2, enabled: true },
        { type: "fertilize", intervalDays: 30, enabled: true },
      ]);

      // O existente não é tocado
      expect(cancelNotificationsByCare).not.toHaveBeenCalled();
      expect(repository.update).not.toHaveBeenCalled();

      // Só o novo é criado e agendado
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ type: "fertilize", intervalDays: 30, nextDue: "2026-10-31T12:00:00.000Z" }),
      );
      expect(scheduleNotification).toHaveBeenCalledTimes(1);
      expect(scheduleNotification).toHaveBeenCalledWith(expect.objectContaining({ careId: 20, type: "fertilize" }));
    });
  });
});
