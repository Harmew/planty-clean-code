/**
 * Interface para serviço de notificações
 */
export interface NotificationService {
  /**
   * Inicializa o serviço de notificações.
   */
  initialize(): void;
  /**
   * Agenda uma notificação para as 6:00 (horário local)
   * @param input Dados da notificação
   */
  schedule(input: { title: string; body: string; date: Date }): Promise<string>;
  /**
   * Cancela as notificações de um cuidaddo
   */
  cancel(notificationId: string): Promise<void>;
  /**
   * Cancela todas as notificações
   */
  cancelAll(): Promise<void>;
}
