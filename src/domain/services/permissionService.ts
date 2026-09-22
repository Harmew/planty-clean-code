import type { Permissions } from "@domain/models/permission";

/**
 * Interface para o serviço de permissões.
 */
export interface PermissionService {
  /**
   * Obtém todas as permissões do aplicativo.
   * @returns Uma Promise que resolve para um objeto Permissions contendo o estado das permissões.
   */
  getAll(): Promise<Permissions>;
  /**
   * Solicita permissão para notificações.
   * @returns Uma Promise que resolve para um booleano indicando se a permissão foi concedida.
   */
  requestNotifications(): Promise<boolean>;
  /**
   * Solicita permissão para câmera.
   * @returns Uma Promise que resolve para um booleano indicando se a permissão foi concedida.
   */
  requestCamera(): Promise<boolean>;
  /**
   * Solicita permissão para galeria.
   * @returns Uma Promise que resolve para um booleano indicando se a permissão foi concedida.
   */
  requestGallery(): Promise<boolean>;
  /**
   * Abre as configurações do aplicativo.
   */
  openSettings(): void;
}
