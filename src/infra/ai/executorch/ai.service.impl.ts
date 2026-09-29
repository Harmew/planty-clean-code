import { AIService } from "@domain/services/ai.service";

import { download, models } from "react-native-executorch";

export const aiService: AIService = {
  async downloadAI(onProgress) {
    await download(models.llm.SMOLLM2_135M.DEFAULT, {
      onProgress,
    });
  },
};
