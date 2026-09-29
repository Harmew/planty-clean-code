import type { AIService } from "@domain/services/ai.service";

export const DownloadAIModel =
  (service: AIService) =>
  (onProgress: (progress: number) => void): Promise<void> =>
    service.downloadAI(onProgress);
