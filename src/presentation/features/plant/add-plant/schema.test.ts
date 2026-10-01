import { schema } from "./schema";

describe("add-plant-schema", () => {
  const validData = {
    imageUri: null,
    name: "Jiboia",
    location: "Sala",
    sunlight: "medium" as const,
    temperatureMin: "18",
    temperatureMax: "30",
    humidity: "60",
  };

  it("deve aceitar uma planta com temperatura mínima e máxima válidas", () => {
    const result = schema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it("deve aceitar quando a temperatura mínima for igual à máxima", () => {
    const result = schema.safeParse({
      ...validData,
      temperatureMin: "20",
      temperatureMax: "20",
    });

    expect(result.success).toBe(true);
  });

  it("deve aceitar quando somente a temperatura mínima for informada", () => {
    const result = schema.safeParse({
      ...validData,
      temperatureMax: "",
    });

    expect(result.success).toBe(true);
  });

  it("deve aceitar quando somente a temperatura máxima for informada", () => {
    const result = schema.safeParse({
      ...validData,
      temperatureMin: "",
    });

    expect(result.success).toBe(true);
  });

  it("deve rejeitar quando a temperatura mínima for maior que a máxima", () => {
    const result = schema.safeParse({
      ...validData,
      temperatureMin: "31",
      temperatureMax: "30",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({
          path: ["temperatureMin"],
          message: "Temperatura mínima não pode ser maior que a máxima",
        }),
      );
    }
  });
});
