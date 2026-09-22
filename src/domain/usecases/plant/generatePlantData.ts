import type { PlantAI } from "@domain/models/plantAI";
import type { AIService } from "@domain/services/aiService";

export const GeneratePlantData =
  (service: AIService) =>
  async (name: string): Promise<PlantAI | null> =>
    service.generatePlantData(name);
