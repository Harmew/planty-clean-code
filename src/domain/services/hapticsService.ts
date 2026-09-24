/**
 * Interface que define os métodos do serviço de Haptics para fornecer feedback tátil em interações do usuário.
 */
export interface HapticsService {
  /**
   * Gera um feedback tátil de clique (pressão) para indicar que um botão foi pressionado.
   */
  buttonPress(): void;
  /**
   * Gera um feedback tátil de toque (tap) para indicar que uma ação foi realizada.
   */
  tabPress(): void;
}
