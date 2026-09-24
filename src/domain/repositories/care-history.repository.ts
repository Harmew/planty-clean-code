import type { CareHistory } from "@domain/entities/care-history.entity";

/**
 * Interface do repositório de histórico de cuidados
 */
export interface CareHistoryRepository {
  /**
   * Busca todos os históricos de cuidados
   * @returns Lista de históricos de cuidados
   */
  getAll(): Promise<CareHistory[]>;
  /**
   * Busca o histórico de cuidados de uma planta
   * @param plantId ID da planta
   * @returns Lista de históricos de cuidados
   */
  getByPlantId(plantId: number): Promise<CareHistory[]>;
  /**
   * Cria um novo histórico de cuidado
   * @param history Dados do histórico de cuidado
   * @returns Histórico de cuidado criado
   */
  create(history: Omit<CareHistory, "id">): Promise<CareHistory>;
}
