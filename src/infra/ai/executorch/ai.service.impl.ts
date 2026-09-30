import { AIService } from "@domain/services/ai.service";

import { createLLMChatSession, download, models } from "react-native-executorch";
import { buildPlantAIPrompt } from "./plant-ai.prompt";
import { plantAISchema } from "./plant-ai.schema";

// const MODEL = models.llm.HAMMER2_1_1_5B.DEFAULT;
const MODEL = models.llm.SMOLLM2_135M.DEFAULT; // FOR TESTING PURPOSES ONLY, CHANGE TO HAMMER2_1_1_5B WHEN IN PRODUCTION

export const aiService: AIService = {
  async downloadAI(onProgress) {
    await download(MODEL, {
      onProgress,
    });
  },

  async generatePlantData(name) {
    const model = await download(MODEL);
    const session = await createLLMChatSession(model);

    try {
      const response = await session.sendMessage(buildPlantAIPrompt(name));

      const message = response.messages.at(-1);

      if (message?.role !== "assistant") {
        throw new Error("A IA não retornou uma resposta válida.");
      }

      if (typeof message.content !== "string") {
        throw new TypeError("A IA não retornou um conteúdo válido.");
      }

      const json = JSON.parse(message.content);
      return plantAISchema.parse(json);
    } finally {
      session.dispose();
    }
  },
};
