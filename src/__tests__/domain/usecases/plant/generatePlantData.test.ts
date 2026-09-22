import { GeneratePlantData } from "@domain/usecases/plant/generatePlantData";

describe("GeneratePlantData", () => {
  it("deve gerar os dados da planta", async () => {
    const plantAI = {
      sunlight: "medium" as const,
      minTemperature: 18,
      maxTemperature: 30,
      humidity: 70,
    };

    const service = {
      generatePlantData: jest.fn().mockResolvedValue(plantAI),
    };

    const generatePlantData = GeneratePlantData(service);

    const result = await generatePlantData("Jiboia");

    expect(service.generatePlantData).toHaveBeenCalledWith("Jiboia");
    expect(result).toEqual(plantAI);
  });

  it("deve retornar null quando o serviço não encontrar dados", async () => {
    const service = {
      generatePlantData: jest.fn().mockResolvedValue(null),
    };

    const generatePlantData = GeneratePlantData(service);

    const result = await generatePlantData("Planta desconhecida");

    expect(service.generatePlantData).toHaveBeenCalledWith("Planta desconhecida");
    expect(result).toBeNull();
  });
});
