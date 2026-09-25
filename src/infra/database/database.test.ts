import * as SQLite from "expo-sqlite";

import { getAll, getFirst, initDatabase, run } from "@infra/database/database";

import { createDatabaseMock } from "@mocks/storage/database.mock";

jest.mock("expo-sqlite", () => ({
  openDatabaseAsync: jest.fn(),
}));

const mockDatabase = createDatabaseMock();

describe("database", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (SQLite.openDatabaseAsync as jest.Mock).mockResolvedValue(mockDatabase);
  });

  describe("getDatabase", () => {
    it("lança erro quando o banco não foi inicializado", () => {
      jest.isolateModules(() => {
        jest.doMock("expo-sqlite", () => ({
          openDatabaseAsync: jest.fn(),
        }));

        const { run: runWithoutDatabase } = require("@infra/database/database");

        expect(() => runWithoutDatabase("SELECT * FROM plants")).toThrow(
          "Banco de dados não inicializado. Chame initDatabase() primeiro.",
        );
      });
    });
  });

  describe("initDatabase", () => {
    it("abre o banco plants.db", async () => {
      await initDatabase();

      expect(SQLite.openDatabaseAsync).toHaveBeenCalledWith("plants.db", { enableChangeListener: true });
    });

    it("executa a criação das tabelas", async () => {
      await initDatabase();

      expect(mockDatabase.execAsync).toHaveBeenCalledTimes(1);

      const sql = mockDatabase.execAsync.mock.calls[0][0];

      expect(sql).toContain("PRAGMA journal_mode = WAL");
      expect(sql).toContain("PRAGMA foreign_keys = ON");

      expect(sql).toContain("CREATE TABLE IF NOT EXISTS plants");

      expect(sql).toContain("CREATE TABLE IF NOT EXISTS care_schedule");

      expect(sql).toContain("CREATE TABLE IF NOT EXISTS care_history");

      expect(sql).toContain("CREATE TABLE IF NOT EXISTS notifications");
    });
  });

  describe("run", () => {
    it("executa a query com os parâmetros informados", async () => {
      await initDatabase();

      await run("INSERT INTO plants (name) VALUES (?)", ["Jiboia"]);

      expect(mockDatabase.runAsync).toHaveBeenCalledWith("INSERT INTO plants (name) VALUES (?)", ["Jiboia"]);
    });

    it("executa a query sem parâmetros", async () => {
      await initDatabase();

      await run("SELECT * FROM plants");

      expect(mockDatabase.runAsync).toHaveBeenCalledWith("SELECT * FROM plants", []);
    });
  });

  describe("getAll", () => {
    it("executa a query com os parâmetros informados", async () => {
      await initDatabase();

      await getAll("SELECT * FROM plants WHERE location = ?", ["Sala"]);

      expect(mockDatabase.getAllAsync).toHaveBeenCalledWith("SELECT * FROM plants WHERE location = ?", ["Sala"]);
    });

    it("executa a query sem parâmetros", async () => {
      await initDatabase();

      await getAll("SELECT * FROM plants");

      expect(mockDatabase.getAllAsync).toHaveBeenCalledWith("SELECT * FROM plants", []);
    });
  });

  describe("getFirst", () => {
    it("executa a query com os parâmetros informados", async () => {
      await initDatabase();

      await getFirst("SELECT * FROM plants WHERE id = ?", [1]);

      expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith("SELECT * FROM plants WHERE id = ?", [1]);
    });

    it("executa a query sem parâmetros", async () => {
      await initDatabase();

      await getFirst("SELECT * FROM plants");

      expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith("SELECT * FROM plants", []);
    });
  });
});
