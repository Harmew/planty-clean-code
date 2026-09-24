import type { NotificationService } from "@domain/services/notification.service";

/**
 * Mock centralizado de NotificationService (@domain/services/notificationService), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createNotificationServiceMock } from '@mocks/services/notificationServiceMock';
 * const service = createNotificationServiceMock();
 * service.initialize.mockReturnValue(undefined);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createNotificationServiceMock(): jest.Mocked<NotificationService> {
  return {
    initialize: jest.fn(),
    schedule: jest.fn(),
    cancel: jest.fn(),
    cancelAll: jest.fn(),
  };
}
