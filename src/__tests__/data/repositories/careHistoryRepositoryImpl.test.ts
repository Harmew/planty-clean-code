import { careHistoryRepository } from "@data/repositories/careHistoryRepositoryImpl";
import { getAll, run } from "@infra/database/database";
import { createCareHistory } from "@mocks/fixtures/careHistory";

jest.mock("@infra/database/database", () => ({
  getAll: jest.fn(),
  run: jest.fn(),
}));

describe("careHistoryRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("busca todos os históricos", async () => {
    const history = createCareHistory();

    const row = {
      id: history.id,
      plant_id: history.plantId,
      care_schedule_id: history.careScheduleId,
      type: history.type,
      interval_days: history.intervalDays,
      done_at: history.doneAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await careHistoryRepository.getAll();

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("FROM care_history"));

    expect(result).toEqual([history]);
  });

  it("busca o histórico de uma planta", async () => {
    const history = createCareHistory();

    const row = {
      id: history.id,
      plant_id: history.plantId,
      care_schedule_id: history.careScheduleId,
      type: history.type,
      interval_days: history.intervalDays,
      done_at: history.doneAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await careHistoryRepository.getByPlantId(history.plantId);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE plant_id = ?"), [history.plantId]);

    expect(result).toEqual([history]);
  });

  it("cria um registro no histórico", async () => {
    const history = createCareHistory();

    (run as jest.Mock).mockResolvedValue({
      lastInsertRowId: history.id,
    });

    const { id, ...historyToCreate } = history;

    const result = await careHistoryRepository.create(historyToCreate);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO care_history"), [
      history.plantId,
      history.careScheduleId,
      history.type,
      history.intervalDays,
      history.doneAt,
    ]);

    expect(result).toEqual(history);
  });
});
