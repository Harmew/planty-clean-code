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

  it("busca plantas com cuidados em uma consulta agregada", async () => {
    const plant = createPlant();

    (getAll as jest.Mock).mockResolvedValue([
      {
        plant_id: plant.id,
        plant_name: plant.name,
        plant_image: plant.image,
        plant_location: plant.location,
        plant_sunlight: plant.sunlight,
        plant_temperature_min: plant.temperatureMin,
        plant_temperature_max: plant.temperatureMax,
        plant_humidity: plant.humidity,
        plant_created_at: plant.createdAt,
        care_id: 10,
        care_plant_id: plant.id,
        care_type: "water",
        care_interval_days: 3,
        care_last_done: null,
        care_next_due: "2026-01-02T00:00:00.000Z",
        care_created_at: "2026-01-01T00:00:00.000Z",
      },
    ]);

    const result = await plantRepository.getAllWithCares();

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("LEFT JOIN cares"));
    expect(result).toEqual([
      {
        ...plant,
        cares: [
          expect.objectContaining({
            id: 10,
            plantId: plant.id,
            type: "water",
            intervalDays: 3,
          }),
        ],
      },
    ]);
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

  it("busca uma planta pelo id com seus cuidados", async () => {
    const plant = createPlant();

    (getAll as jest.Mock).mockResolvedValue([
      {
        plant_id: plant.id,
        plant_name: plant.name,
        plant_image: plant.image,
        plant_location: plant.location,
        plant_sunlight: plant.sunlight,
        plant_temperature_min: plant.temperatureMin,
        plant_temperature_max: plant.temperatureMax,
        plant_humidity: plant.humidity,
        plant_created_at: plant.createdAt,
        care_id: 10,
        care_plant_id: plant.id,
        care_type: "water",
        care_interval_days: 3,
        care_last_done: null,
        care_next_due: "2026-01-02T00:00:00.000Z",
        care_created_at: "2026-01-01T00:00:00.000Z",
      },
    ]);

    const result = await plantRepository.getByIdWithCares(plant.id);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE p.id = ?"), [plant.id]);

    expect(result).toEqual({
      ...plant,
      cares: [
        expect.objectContaining({
          id: 10,
          plantId: plant.id,
          type: "water",
          intervalDays: 3,
        }),
      ],
    });
  });

  it("retorna null quando a planta com cuidados não existe", async () => {
    (getAll as jest.Mock).mockResolvedValue([]);

    const result = await plantRepository.getByIdWithCares(999);

    expect(getAll).toHaveBeenCalledWith(expect.stringContaining("WHERE p.id = ?"), [999]);

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
