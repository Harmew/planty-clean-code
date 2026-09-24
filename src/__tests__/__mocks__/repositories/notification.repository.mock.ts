import type { NotificationRepository } from "@domain/repositories/notification.repository";

/**
 * Mock centralizado de NotificationRepository (@domain/repositories/notificationRepository), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createNotificationRepositoryMock } from '@mocks/repositories/notificationRepository';
 * const repository = createNotificationRepositoryMock();
 * repository.getAll.mockReturnValue([]);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createNotificationRepositoryMock(): jest.Mocked<NotificationRepository> {
  return {
    getAll: jest.fn(),
    create: jest.fn(),
    markAsRead: jest.fn(),
    getByCareId: jest.fn(),
    deleteByCareId: jest.fn(),
    getByPlantId: jest.fn(),
    deleteByPlantId: jest.fn(),
    deleteAll: jest.fn(),
    getOlderThan: jest.fn(),
    deleteOlderThan: jest.fn(),
  };
}
