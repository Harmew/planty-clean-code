import { buildPlantAIPrompt } from "./plant-ai.prompt";

describe("buildPlantAIPrompt", () => {
  it("deve incluir o nome da planta no prompt", () => {
    const prompt = buildPlantAIPrompt("Jiboia");

    expect(prompt).toContain('Analyze the plant: "Jiboia".');
  });

  it("deve instruir a IA a retornar apenas JSON", () => {
    const prompt = buildPlantAIPrompt("Jiboia");

    expect(prompt).toContain("Return ONLY a valid JSON object without any markdown, explanations, or additional text.");
  });

  it("deve informar as regras dos dados da planta", () => {
    const prompt = buildPlantAIPrompt("Jiboia");

    expect(prompt).toContain('sunlight must be "low", "medium", or "high".');
    expect(prompt).toContain("minTemperature and maxTemperature are Celsius values.");
    expect(prompt).toContain("humidity must be between 0 and 100.");
    expect(prompt).toContain("minTemperature must be less than or equal to maxTemperature.");
  });

  it("deve informar como lidar com plantas desconhecidas", () => {
    const prompt = buildPlantAIPrompt("Planta Desconhecida");

    expect(prompt).toContain("If the plant is unknown, make a reasonable estimate based on similar plants.");
  });

  it("deve incluir um exemplo de resposta JSON", () => {
    const prompt = buildPlantAIPrompt("Jiboia");

    expect(prompt).toContain('"sunlight": "medium"');
    expect(prompt).toContain('"minTemperature": 18');
    expect(prompt).toContain('"maxTemperature": 30');
    expect(prompt).toContain('"humidity": 70');
  });
});
