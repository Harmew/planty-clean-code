/**
 * Mock centralizado do SQLite, para ser usado em todos os testes que precisarem de um banco de dados.
 *
 * O mock é criado usando a função createSQLiteMock, que retorna um objeto com os métodos openDatabaseAsync e database. O método openDatabaseAsync é um mock que resolve para o objeto database, que contém os métodos execAsync, runAsync, getAllAsync e getFirstAsync, todos eles sendo mocks do Jest.
 */
export function createDatabaseMock() {
  return {
    execAsync: jest.fn(),
    runAsync: jest.fn(),
    getAllAsync: jest.fn(),
    getFirstAsync: jest.fn(),
  };
}
