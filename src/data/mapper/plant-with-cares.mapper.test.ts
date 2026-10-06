import { plantWithCaresMapper } from "@data/mapper/plant-with-cares.mapper";

describe("plant-with-cares-mapper", () => {
  it("agrupa vários cuidados na mesma planta", () => {
    const result = plantWithCaresMapper([
      {
        plant_id: 1,
        plant_name: "Jiboia",
        plant_image: null,
        plant_location: "Sala",
        plant_sunlight: "medium",
        plant_temperature_min: null,
        plant_temperature_max: null,
        plant_humidity: null,
        plant_created_at: "2026-01-01T00:00:00.000Z",
        care_id: 10,
        care_plant_id: 1,
        care_type: "water",
        care_interval_days: 3,
        care_last_done: null,
        care_next_due: "2026-01-02T00:00:00.000Z",
        care_created_at: "2026-01-01T00:00:00.000Z",
      },
      {
        plant_id: 1,
        plant_name: "Jiboia",
        plant_image: null,
        plant_location: "Sala",
        plant_sunlight: "medium",
        plant_temperature_min: null,
        plant_temperature_max: null,
        plant_humidity: null,
        plant_created_at: "2026-01-01T00:00:00.000Z",
        care_id: 11,
        care_plant_id: 1,
        care_type: "prune",
        care_interval_days: 30,
        care_last_done: null,
        care_next_due: "2026-01-10T00:00:00.000Z",
        care_created_at: "2026-01-01T00:00:00.000Z",
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 1,
      name: "Jiboia",
      temperatureMin: null,
      temperatureMax: null,
      humidity: null,
    });
    expect(result[0].cares).toEqual([
      expect.objectContaining({
        id: 10,
        plantId: 1,
        intervalDays: 3,
        lastDone: null,
        nextDue: "2026-01-02T00:00:00.000Z",
      }),
      expect.objectContaining({
        id: 11,
        plantId: 1,
        type: "prune",
        intervalDays: 30,
      }),
    ]);
  });

  it("não cria cuidado quando a planta não possui cuidados", () => {
    const [plant] = plantWithCaresMapper([
      {
        plant_id: 1,
        plant_name: "Jiboia",
        plant_image: null,
        plant_location: "Sala",
        plant_sunlight: "medium",
        plant_temperature_min: null,
        plant_temperature_max: null,
        plant_humidity: null,
        plant_created_at: "2026-01-01T00:00:00.000Z",
        care_id: null,
        care_plant_id: null,
        care_type: null,
        care_interval_days: null,
        care_last_done: null,
        care_next_due: null,
        care_created_at: null,
      },
    ]);

    expect(plant.cares).toEqual([]);
  });

  it("lança erro quando o cuidado possui dados incompletos", () => {
    const rows = [
      {
        plant_id: 1,
        plant_name: "Jiboia",
        plant_image: null,
        plant_location: "Sala",
        plant_sunlight: "medium" as const,
        plant_temperature_min: null,
        plant_temperature_max: null,
        plant_humidity: null,
        plant_created_at: "2026-01-01T00:00:00.000Z",
        care_id: 1,
        care_plant_id: 1,
        care_type: null,
        care_interval_days: 3,
        care_last_done: null,
        care_next_due: "2026-01-04T00:00:00.000Z",
        care_created_at: "2026-01-01T00:00:00.000Z",
      },
    ];

    expect(() => plantWithCaresMapper(rows)).toThrow("Cuidado 1 possui dados incompletos");
  });
});
