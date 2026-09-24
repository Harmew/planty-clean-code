import { plantMapper } from "@data/mapper/plant.mapper";

describe("plant-mapper", () => {
  it("mapeia um plantDto completo para a entidade Plant", () => {
    const plant = plantMapper({
      id: 1,
      name: "Cacto",
      image: "/poster.jpg",
      location: "Cozinha",
      sunlight: "high",
      temperature_min: "12",
      temperature_max: "30",
      humidity: "12",
      created_at: "2023-01-01T00:00:00Z",
    });

    expect(plant).toEqual({
      id: 1,
      name: "Cacto",
      image: "/poster.jpg",
      location: "Cozinha",
      sunlight: "high",
      temperatureMin: "12",
      temperatureMax: "30",
      humidity: "12",
      createdAt: "2023-01-01T00:00:00Z",
    });
  });

  it("usa valores padrão quando campos opcionais estão ausentes", () => {
    const plant = plantMapper({
      id: 2,
      name: "Cacto",
      image: null,
      location: "Cozinha",
      sunlight: "high",
      temperature_min: null,
      temperature_max: null,
      humidity: null,
      created_at: "2023-01-01T00:00:00Z",
    });

    expect(plant).toEqual({
      id: 2,
      name: "Cacto",
      image: null,
      location: "Cozinha",
      sunlight: "high",
      temperatureMin: null,
      temperatureMax: null,
      humidity: null,
      createdAt: "2023-01-01T00:00:00Z",
    });
  });
});
