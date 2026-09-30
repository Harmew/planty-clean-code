import { createLLMChatSession, download } from "react-native-executorch";

import { aiService } from "./ai.service.impl";
import { buildPlantAIPrompt } from "./plant-ai.prompt";
import { plantAISchema } from "./plant-ai.schema";

jest.mock("./plant-ai.prompt", () => ({
  buildPlantAIPrompt: jest.fn(),
}));

jest.mock("./plant-ai.schema", () => ({
  plantAISchema: {
    parse: jest.fn(),
  },
}));

describe("ai-service", () => {
  const model = "test-model";
  const session = {
    sendMessage: jest.fn(),
    dispose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(download).mockResolvedValue(model as never);

    jest.mocked(createLLMChatSession).mockResolvedValue(session as never);

    jest.mocked(buildPlantAIPrompt).mockReturnValue("prompt da planta");

    jest.mocked(plantAISchema.parse).mockReturnValue({
      sunlight: "medium",
      minTemperature: 18,
      maxTemperature: 28,
      humidity: 60,
    });
  });

  describe("downloadAI", () => {
    it("deve baixar o modelo informando o progresso", async () => {
      const onProgress = jest.fn();

      await aiService.downloadAI(onProgress);

      expect(download).toHaveBeenCalledWith(model, {
        onProgress,
      });
    });
  });

  describe("generatePlantData", () => {
    it("deve gerar os dados da planta", async () => {
      const response = {
        messages: [
          {
            role: "assistant",
            content: JSON.stringify({
              sunlight: "medium",
              minTemperature: "18",
              maxTemperature: "28",
              humidity: "60",
            }),
          },
        ],
      };

      jest.mocked(session.sendMessage).mockResolvedValue(response);

      const result = await aiService.generatePlantData("Jiboia");

      expect(download).toHaveBeenCalledWith(model);
      expect(createLLMChatSession).toHaveBeenCalledWith(model);
      expect(buildPlantAIPrompt).toHaveBeenCalledWith("Jiboia");
      expect(session.sendMessage).toHaveBeenCalledWith("prompt da planta");

      expect(plantAISchema.parse).toHaveBeenCalledWith({
        sunlight: "medium",
        minTemperature: "18",
        maxTemperature: "28",
        humidity: "60",
      });

      expect(result).toEqual({
        sunlight: "medium",
        minTemperature: 18,
        maxTemperature: 28,
        humidity: 60,
      });

      expect(session.dispose).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando a IA não retornar uma mensagem assistant", async () => {
      jest.mocked(session.sendMessage).mockResolvedValue({
        messages: [
          {
            role: "user",
            content: "resposta",
          },
        ],
      });

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow("A IA não retornou uma resposta válida.");

      expect(session.dispose).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando o conteúdo da mensagem não for string", async () => {
      jest.mocked(session.sendMessage).mockResolvedValue({
        messages: [
          {
            role: "assistant",
            content: { sunlight: "medium" },
          },
        ],
      });

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow("A IA não retornou um conteúdo válido.");

      expect(session.dispose).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando a resposta não for um JSON válido", async () => {
      jest.mocked(session.sendMessage).mockResolvedValue({
        messages: [
          {
            role: "assistant",
            content: "resposta inválida",
          },
        ],
      });

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow();

      expect(plantAISchema.parse).not.toHaveBeenCalled();
      expect(session.dispose).toHaveBeenCalledTimes(1);
    });

    it("deve propagar o erro de validação do schema", async () => {
      const error = new Error("Dados inválidos");

      jest.mocked(session.sendMessage).mockResolvedValue({
        messages: [
          {
            role: "assistant",
            content: '{"sunlight":"invalid"}',
          },
        ],
      });

      jest.mocked(plantAISchema.parse).mockImplementation(() => {
        throw error;
      });

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow("Dados inválidos");

      expect(session.dispose).toHaveBeenCalledTimes(1);
    });

    it("deve liberar a sessão quando ocorrer um erro", async () => {
      jest.mocked(session.sendMessage).mockRejectedValue(new Error("Erro na IA"));

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow("Erro na IA");

      expect(session.dispose).toHaveBeenCalledTimes(1);
    });
  });
});
