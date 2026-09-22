import type { Backup } from "@domain/entities/backup";

/**
 * Interface para armazenamento de backups
 */
export interface BackupStorage {
  /**
   * Exporta o backup para um arquivo criptografado
   * @param backup Entidade de backup a ser exportada
   * @param password Senha para criptografia do arquivo
   */
  export(backup: Backup, password: string): Promise<void>;
  /**
   * Importa o backup de um arquivo criptografado.
   * @param password Senha para descriptografia do arquivo.
   * @returns Entidade de backup importada ou null se a seleção for cancelada.
   */
  import(password: string): Promise<Backup | null>;
}
