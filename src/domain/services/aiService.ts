import type { PlantAI } from "@domain/models/plantAI";

/**
 * Interface que define os métodos do serviço de IA para gerar dados de cuidados de plantas.
 */
export interface AIService {
  /**
   * Gera dados de cuidados para uma planta com base em seu nome.
   * @param name O nome da planta para a qual os dados de cuidados serão gerados.
   * @returns Uma Promise que resolve para um objeto PlantAI contendo os dados de cuidados da planta, ou null se não for possível gerar os dados.
   */
  generatePlantData(name: string): Promise<PlantAI | null>;
}
