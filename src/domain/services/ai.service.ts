import type { PlantAI } from "@domain/models/plant-ai.model";

/**
 * Interface que define os métodos do serviço de IA para gerar dados de cuidados de plantas.
 */
export interface AIService {
  /**
   * Baixa o modelo de IA para uma planta com base em seu nome.
   * @param onProgress Função de callback que será chamada para atualizar o progresso do download.
   * @returns Uma Promise que resolve quando o download estiver concluído.
   */
  downloadAI(onProgress: (progress: number) => void): Promise<void>;

  /**
   * Gera dados de cuidados para uma planta com base em seu nome.
   * @param name O nome da planta para a qual os dados de cuidados serão gerados.
   * @returns Uma Promise que resolve com os dados de cuidados da planta.
   */
  generatePlantData(name: string): Promise<PlantAI>;
}
