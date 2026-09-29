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
}
