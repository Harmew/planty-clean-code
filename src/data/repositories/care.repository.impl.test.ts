import { careRepository } from "@data/repositories/care.repository.impl";
import { getAll, getFirst, run } from "@infra/database/database";
import { createCare } from "@mocks/fixtures/care.fixture";

jest.mock("@infra/database/database", () => ({
  getAll: jest.fn(),
  getFirst: jest.fn(),
  run: jest.fn(),
}));

describe("care-repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("busca todos os cuidados", async () => {
    const care = createCare();

    const row = {
      id: care.id,
      plant_id: care.plantId,
      type: care.type,
      interval_days: care.intervalDays,
      last_done: care.lastDone,
      next_due: care.nextDue,
      created_at: care.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await careRepository.getAll();

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("FROM care_schedule"));

    expect(result).toEqual([care]);
  });

  it("busca os cuidados de uma planta", async () => {
    const care = createCare();

    const row = {
      id: care.id,
      plant_id: care.plantId,
      type: care.type,
      interval_days: care.intervalDays,
      last_done: care.lastDone,
      next_due: care.nextDue,
      created_at: care.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await careRepository.getByPlantId(care.plantId);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE plant_id = ?"), [care.plantId]);

    expect(result).toEqual([care]);
  });

  it("busca um cuidado pelo tipo da planta", async () => {
    const care = createCare();

    const row = {
      id: care.id,
      plant_id: care.plantId,
      type: care.type,
      interval_days: care.intervalDays,
      last_done: care.lastDone,
      next_due: care.nextDue,
      created_at: care.createdAt,
    };

    (getFirst as jest.Mock).mockResolvedValue(row);

    const result = await careRepository.getByPlantAndType(care.plantId, care.type);

    expect(getFirst).toHaveBeenCalledWith(expect.stringContaining("AND type = ?"), [care.plantId, care.type]);

    expect(result).toEqual(care);
  });

  it("retorna null quando o cuidado não existe", async () => {
    (getFirst as jest.Mock).mockResolvedValue(null);

    const result = await careRepository.getByPlantAndType(999, "water");

    expect(result).toBeNull();
  });

  it("cria um cuidado", async () => {
    const care = createCare();

    (run as jest.Mock).mockResolvedValue({
      lastInsertRowId: care.id,
    });

    const { id, ...careToCreate } = care;

    const result = await careRepository.create(careToCreate);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO care_schedule"), [
      care.plantId,
      care.type,
      care.intervalDays,
      care.lastDone,
      care.nextDue,
      care.createdAt,
    ]);

    expect(result).toEqual(care);
  });

  it("atualiza um cuidado", async () => {
    const care = createCare({
      intervalDays: 14,
      nextDue: "2023-01-15T00:00:00Z",
    });

    (run as jest.Mock).mockResolvedValue({});

    await careRepository.update(care);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("UPDATE care_schedule"), [
      care.type,
      care.intervalDays,
      care.lastDone,
      care.nextDue,
      care.id,
    ]);
  });

  it("exclui um cuidado", async () => {
    const care = createCare();

    (run as jest.Mock).mockResolvedValue({});

    await careRepository.delete(care.id);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM care_schedule"), [care.id]);
  });

  it("exclui todos os cuidados de uma planta", async () => {
    const care = createCare();

    (run as jest.Mock).mockResolvedValue({});

    await careRepository.deleteByPlantId(care.plantId);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM care_schedule"), [care.plantId]);
  });
});
