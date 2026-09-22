/**
 * Interface para armazenamento de imagens
 */
export interface ImageStorage {
  /**
   * Salva imagem localmente
   * @description Comprime e redimensiona a imagem antes de salvar para o dispositivo
   * @param uri URI da imagem a ser salva
   */
  saveImage(uri: string): Promise<string>;
  /**
   * Deleta imagem
   * @param path URI da imagem a ser deletada
   */
  deleteImage(path: string): Promise<void>;
  /**
   * Lê imagem
   * @param path URI da imagem a ser lida
   * @description Retorna a imagem em base64 ou null caso não exista
   */
  readImage(path: string): Promise<string | null>;
  /**
   * Salva imagem em base64
   * @param base64 Base64 da imagem a ser salva
   * @param fileName Nome do arquivo a ser salvo
   * @description Salva a imagem em base64 no dispositivo e retorna o caminho da imagem salva
   */
  saveBase64(base64: string, fileName: string): Promise<string>;
}
