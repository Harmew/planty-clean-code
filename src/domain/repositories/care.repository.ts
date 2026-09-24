import type { Care } from "@domain/entities/care.entity";

/**
 * Interface do repositório de cuidados
 */
export interface CareRepository {
  /**
   * Busca todos os cuidados cadastrados no banco de dados.
   * @returns Uma promessa que resolve para um array com todos os cuidados.
   */
  getAll(): Promise<Care[]>;
  /**
   * Busca todos os cuidados associados a uma determinada planta no banco de dados.
   * @param plantId - O ID da planta para a qual os cuidados devem ser buscados.
   * @returns Uma promessa que resolve para um array de cuidados associados à planta especificada.
   */
  getByPlantId(plantId: number): Promise<Care[]>;
  /**
   * Busca um cuidado específico associado a uma determinada planta e tipo de cuidado no banco de dados.
   * @param plantId - O ID da planta para a qual o cuidado deve ser buscado.
   * @param type - O tipo de cuidado a ser buscado.
   * @returns Uma promessa que resolve para o cuidado encontrado, ou null se nenhum cuidado for encontrado.
   */
  getByPlantAndType(plantId: number, type: Care["type"]): Promise<Care | null>;
  /**
   * Cria um novo cuidado no banco de dados.
   * @param care - O cuidado a ser criado, sem o campo "id".
   * @returns Uma promessa que resolve para o cuidado criado, incluindo o campo "id".
   */
  create(care: Omit<Care, "id">): Promise<Care>;
  /**
   * Atualiza um cuidado existente no banco de dados.
   * @param care - O cuidado a ser atualizado.
   */
  update(care: Care): Promise<void>;
  /**
   * Exclui um cuidado específico do banco de dados.
   * @param id - O ID do cuidado a ser excluído.
   */
  delete(id: number): Promise<void>;
  /**
   * Exclui todos os cuidados associados a uma determinada planta no banco de dados.
   * @param plantId - O ID da planta para a qual os cuidados devem ser excluídos.
   */
  deleteByPlantId(plantId: number): Promise<void>;
}
