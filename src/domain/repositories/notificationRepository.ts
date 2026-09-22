import type { Notification } from "@domain/entities/notification";

/**
 * Interface do repositório de notificações
 */
export interface NotificationRepository {
  /**
   * Busca todas as notificações no banco de dados.
   * @returns Uma promessa que resolve para um array de notificações.
   */
  getAll(): Promise<Notification[]>;
  /**
   * Cria uma nova notificação no banco de dados.
   * @param notification - A notificação a ser criada, sem o campo "id".
   * @returns Uma promessa que resolve para a notificação criada, incluindo o campo "id".
   */
  create(notification: Omit<Notification, "id">): Promise<Notification>;
  /**
   * Marca uma notificação como lida no banco de dados.
   * @param id - O ID da notificação a ser marcada como lida.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  markAsRead(id: number): Promise<void>;
  /**
   * Busca todas as notificações associadas a um determinado agendamento de cuidado no banco de dados.
   * @param careScheduleId - O ID do agendamento de cuidado para o qual as notificações devem ser buscadas.
   * @returns Uma promessa que resolve para um array de notificações associadas ao agendamento de cuidado especificado.
   */
  getByCareId(careScheduleId: number): Promise<Notification[]>;
  /**
   * Exclui todas as notificações associadas a um determinado agendamento de cuidado no banco de dados.
   * @param careScheduleId - O ID do agendamento de cuidado para o qual as notificações devem ser excluídas.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  deleteByCareId(careScheduleId: number): Promise<void>;
  /**
   * Busca todas as notificações associadas a uma determinada planta no banco de dados.
   * @param plantId - O ID da planta para a qual as notificações devem ser buscadas.
   * @returns Uma promessa que resolve para um array de notificações associadas à planta especificada.
   */
  getByPlantId(plantId: number): Promise<Notification[]>;
  /**
   * Exclui todas as notificações associadas a uma determinada planta no banco de dados.
   * @param plantId - O ID da planta para a qual as notificações devem ser excluídas.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  deleteByPlantId(plantId: number): Promise<void>;
  /**
   * Exclui todas as notificações no banco de dados.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  deleteAll(): Promise<void>;
  /**
   * Busca todas as notificações que foram criadas antes de uma determinada data no banco de dados.
   * @param date - A data limite para a busca de notificações. As notificações criadas antes desta data serão retornadas.
   * @returns Uma promessa que resolve para um array de notificações criadas antes da data especificada.
   */
  getOlderThan(date: string): Promise<Notification[]>;
  /**
   * Exclui todas as notificações que foram criadas antes de uma determinada data no banco de dados.
   * @param date - A data limite para a exclusão de notificações. As notificações criadas antes desta data serão excluídas.
   * @returns Uma promessa que resolve quando a operação for concluída.
   */
  deleteOlderThan(date: string): Promise<void>;
}
