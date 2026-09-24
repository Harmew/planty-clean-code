import type { Plant } from "@domain/entities/plant.entity";

/**
 * Interface do repositório de plantas
 */
export interface PlantRepository {
  /**
   * Busca todas as plantas no banco de dados.
   * @returns Uma promessa que resolve para um array de plantas.
   */
  getAll(): Promise<Plant[]>;
  /**
   * Busca uma planta específica pelo seu ID no banco de dados.
   * @param id - O ID da planta a ser buscada.
   * @returns Uma promessa que resolve para a planta encontrada, ou null se nenhuma planta for encontrada.
   */
  getById(id: number): Promise<Plant | null>;
  /**
   * Cria uma nova planta no banco de dados.
   * @param plant - A planta a ser criada, sem o campo "id".
   * @returns Uma promessa que resolve para a planta criada, incluindo o campo "id".
   */
  create(plant: Omit<Plant, "id">): Promise<Plant>;
  /**
   * Atualiza uma planta existente no banco de dados.
   * @param plant - A planta a ser atualizada.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  update(plant: Plant): Promise<void>;
  /**
   * Exclui uma planta específica do banco de dados.
   * @param id - O ID da planta a ser excluída.
   */
  delete(id: number): Promise<void>;
  /**
   * Exclui todas as plantas do banco de dados.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  deleteAll(): Promise<void>;
}
