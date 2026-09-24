import { plantRepository } from "@data/repositories/plant.repository.impl";
import { getAll, getFirst, run } from "@infra/database/database";
import { createPlant } from "@mocks/fixtures/plant.fixture";

jest.mock("@infra/database/database", () => ({
  getAll: jest.fn(),
  getFirst: jest.fn(),
  run: jest.fn(),
}));

describe("plant-repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("busca todas as plantas", async () => {
    const plant = createPlant();

    const row = {
      id: plant.id,
      name: plant.name,
      image: plant.image,
      location: plant.location,
      sunlight: plant.sunlight,
      temperature_min: plant.temperatureMin,
      temperature_max: plant.temperatureMax,
      humidity: plant.humidity,
      created_at: plant.createdAt,
    };

    (getAll as jest.Mock).mockResolvedValue([row]);

    const result = await plantRepository.getAll();

    expect(getAll).toHaveBeenCalled();

    expect(result).toEqual([plant]);
  });

  it("busca uma planta pelo id", async () => {
    const plant = createPlant();

    const row = {
      id: plant.id,
      name: plant.name,
      image: plant.image,
      location: plant.location,
      sunlight: plant.sunlight,
      temperature_min: plant.temperatureMin,
      temperature_max: plant.temperatureMax,
      humidity: plant.humidity,
      created_at: plant.createdAt,
    };

    (getFirst as jest.Mock).mockResolvedValue(row);

    const result = await plantRepository.getById(plant.id);

    expect(getFirst).toHaveBeenCalledWith(expect.stringContaining("WHERE id = ?"), [plant.id]);

    expect(result).toEqual(plant);
  });

  it("retorna null quando a planta não existe", async () => {
    (getFirst as jest.Mock).mockResolvedValue(null);

    const result = await plantRepository.getById(999);

    expect(result).toBeNull();
  });

  it("cria uma planta", async () => {
    const plant = createPlant();

    (run as jest.Mock).mockResolvedValue({
      lastInsertRowId: plant.id,
    });

    const { id, ...plantToCreate } = plant;

    const result = await plantRepository.create(plantToCreate);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO plants"), [
      plant.name,
      plant.image,
      plant.location,
      plant.sunlight,
      plant.temperatureMin,
      plant.temperatureMax,
      plant.humidity,
      plant.createdAt,
    ]);

    expect(result).toEqual(plant);
  });

  it("atualiza uma planta", async () => {
    const plant = createPlant({
      name: "Jiboia Atualizada",
      location: "Quarto",
    });

    (run as jest.Mock).mockResolvedValue({});

    await plantRepository.update(plant);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("UPDATE plants"), [
      plant.name,
      plant.image,
      plant.location,
      plant.sunlight,
      plant.temperatureMin,
      plant.temperatureMax,
      plant.humidity,
      plant.id,
    ]);
  });

  it("exclui uma planta", async () => {
    const plant = createPlant();

    (run as jest.Mock).mockResolvedValue({});

    await plantRepository.delete(plant.id);

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM plants"), [plant.id]);
  });

  it("exclui todas as plantas", async () => {
    (run as jest.Mock).mockResolvedValue({});

    await plantRepository.deleteAll();

    expect(run).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM plants"));
  });
});
