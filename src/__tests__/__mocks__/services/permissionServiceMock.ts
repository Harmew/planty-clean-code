import type { PermissionService } from "@domain/services/permissionService";

/**
 * Mock centralizado de PermissionService (@domain/services/permissionService), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createPermissionServiceMock } from '@mocks/services/permissionServiceMock';
 * const service = createPermissionServiceMock();
 * service.getAll.mockReturnValue({});
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createPermissionServiceMock(): jest.Mocked<PermissionService> {
  return {
    getAll: jest.fn(),
    requestNotifications: jest.fn(),
    requestCamera: jest.fn(),
    requestGallery: jest.fn(),
    openSettings: jest.fn(),
  };
}
