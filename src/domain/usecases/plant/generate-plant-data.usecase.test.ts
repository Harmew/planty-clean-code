import { GeneratePlantData } from "@domain/usecases/plant/generate-plant-data.usecase";

import { createAIServiceMock } from "@mocks/services/ai.service.mock";

describe("generate-plant-data-usecase", () => {
  it("deve gerar os dados da planta", async () => {
    const plantAI = {
      sunlight: "medium" as const,
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    };

    const service = createAIServiceMock();
    service.generatePlantData.mockResolvedValue(plantAI);

    const generatePlantData = GeneratePlantData(service);

    const result = await generatePlantData("Jiboia");

    expect(service.generatePlantData).toHaveBeenCalledWith("Jiboia");
    expect(result).toEqual(plantAI);
  });

  it("deve retornar null quando o serviço não encontrar dados", async () => {
    const service = createAIServiceMock();
    service.generatePlantData.mockResolvedValue(null);

    const generatePlantData = GeneratePlantData(service);

    const result = await generatePlantData("Planta desconhecida");

    expect(service.generatePlantData).toHaveBeenCalledWith("Planta desconhecida");
    expect(result).toBeNull();
  });
});
