import type { AIService } from "@domain/services/ai.service";

export const GeneratePlantData = (service: AIService) => (name: string) => service.generatePlantData(name);
