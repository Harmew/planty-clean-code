/**
 * Interface para o armazenamento de onboarding.
 */
export interface OnboardingStorage {
  /**
   * Verifica se o processo de onboarding foi concluído.
   * @returns Uma Promise que resolve para um booleano indicando se o onboarding foi concluído.
   */
  isCompleted(): Promise<boolean>;
  /**
   * Marca o processo de onboarding como concluído.
   */
  complete(): Promise<void>;
}
