import { createAIServiceMock } from "@mocks/services/ai.service.mock";

import { GeneratePlantData } from "./generate-plant-data.usecase";

describe("generate-plant-data-usecase", () => {
  it("deve gerar os dados da planta", async () => {
    const data = {
      sunlight: "medium" as const,
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    };

    const service = createAIServiceMock();
    service.generatePlantData.mockResolvedValue(data);

    const generatePlantData = GeneratePlantData(service);

    const result = await generatePlantData("Jiboia");

    expect(service.generatePlantData).toHaveBeenCalledWith("Jiboia");
    expect(service.generatePlantData).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });
});
