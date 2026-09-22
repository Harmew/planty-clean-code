import { aiService } from "@infra/ai/aiServiceImpl";

const mockFetch = jest.spyOn(globalThis, "fetch");

describe("aiService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
  });

  describe("generatePlantData", () => {
    it("deve gerar os dados da planta", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      sunlight: "medium",
                      minTemperature: 18,
                      maxTemperature: 30,
                      humidity: 70,
                    }),
                  },
                ],
              },
            },
          ],
        }),
      } as unknown as Response);

      const result = await aiService.generatePlantData("Jiboia");

      expect(result).toEqual({
        sunlight: "medium",
        minTemperature: 18,
        maxTemperature: 30,
        humidity: 70,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("key="),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });

    it("deve retornar null quando os dados forem inválidos", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      sunlight: "invalid",
                      minTemperature: 18,
                      maxTemperature: 30,
                      humidity: 70,
                    }),
                  },
                ],
              },
            },
          ],
        }),
      } as unknown as Response);

      const consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {});

      const result = await aiService.generatePlantData("Jiboia");

      expect(result).toBeNull();
      expect(consoleWarn).toHaveBeenCalled();

      consoleWarn.mockRestore();
    });

    it("deve lançar erro quando a resposta não for um JSON válido", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: "resposta inválida",
                  },
                ],
              },
            },
          ],
        }),
      } as unknown as Response);

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow(
        "Não foi possível processar a resposta da IA",
      );
    });

    it("deve lançar erro quando a API retornar erro HTTP", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: jest.fn(),
      } as unknown as Response);

      await expect(aiService.generatePlantData("Jiboia")).rejects.toThrow("Não foi possível consultar a IA");
    });
  });
});
