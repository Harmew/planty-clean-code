import { plantAISchema } from "./plant-ai.schema";

describe("plant-ai-schema", () => {
  it("deve aceitar dados válidos", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    });

    expect(result.success).toBe(true);
  });

  it("deve converter temperaturas e umidade para número", () => {
    const result = plantAISchema.parse({
      sunlight: "medium",
      minTemperature: "18",
      maxTemperature: "30",
      humidity: "70",
    });

    expect(result).toEqual({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    });
  });

  it("deve aceitar todos os níveis de luminosidade", () => {
    expect(
      plantAISchema.safeParse({
        sunlight: "low",
        minTemperature: 18,
        maxTemperature: 30,
        humidity: 70,
      }).success,
    ).toBe(true);

    expect(
      plantAISchema.safeParse({
        sunlight: "medium",
        minTemperature: 18,
        maxTemperature: 30,
        humidity: 70,
      }).success,
    ).toBe(true);

    expect(
      plantAISchema.safeParse({
        sunlight: "high",
        minTemperature: 18,
        maxTemperature: 30,
        humidity: 70,
      }).success,
    ).toBe(true);
  });

  it("deve rejeitar luminosidade inválida", () => {
    const result = plantAISchema.safeParse({
      sunlight: "invalid",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    });

    expect(result.success).toBe(false);
  });

  it("deve rejeitar temperatura mínima menor que 0", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: -1,
      maxTemperature: 30,
      humidity: 70,
    });

    expect(result.success).toBe(false);
  });

  it("deve rejeitar temperatura máxima maior que 50", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 51,
      humidity: 70,
    });

    expect(result.success).toBe(false);
  });

  it("deve rejeitar umidade menor que 0", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: -1,
    });

    expect(result.success).toBe(false);
  });

  it("deve rejeitar umidade maior que 100", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 101,
    });

    expect(result.success).toBe(false);
  });

  it("deve rejeitar quando a temperatura mínima for maior que a máxima", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: 31,
      maxTemperature: 30,
      humidity: 70,
    });

    expect(result.success).toBe(false);
  });

  it("deve aceitar quando a temperatura mínima for igual à máxima", () => {
    const result = plantAISchema.safeParse({
      sunlight: "medium",
      minTemperature: 25,
      maxTemperature: 25,
      humidity: 70,
    });

    expect(result.success).toBe(true);
  });
});
