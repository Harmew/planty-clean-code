import type { PlantAI } from "@domain/models/plant-ai.model";
import type { AIService } from "@domain/services/ai.service";

export const GeneratePlantData =
  (service: AIService) =>
  async (name: string): Promise<PlantAI | null> =>
    service.generatePlantData(name);
