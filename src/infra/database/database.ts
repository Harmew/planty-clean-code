import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "plants.db" as const;

let database: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  database = await SQLite.openDatabaseAsync(DATABASE_NAME);

  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT,
      temperature_min TEXT,
      temperature_max TEXT,
      humidity TEXT,
      sunlight TEXT,
      location TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS care_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      interval_days INTEGER NOT NULL,
      last_done TEXT,
      next_due TEXT NOT NULL,
      created_at TEXT NOT NULL,

      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS care_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      care_schedule_id INTEGER,
      type TEXT NOT NULL,
      interval_days INTEGER NOT NULL,
      done_at TEXT NOT NULL,

      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (care_schedule_id) REFERENCES care_schedule(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER,
      care_schedule_id INTEGER,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      type TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      scheduled_for TEXT,
      expo_notification_id TEXT,
      created_at TEXT NOT NULL,

      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (care_schedule_id) REFERENCES care_schedule(id) ON DELETE SET NULL
    );
  `);
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Banco de dados não inicializado. Chame initDatabase() primeiro.");
  }

  return database;
};

/**
 * Executa uma consulta SQL que não retorna resultados
 * @param source Uma string contendo a consulta SQL a ser executada.
 * @param params Os parâmetros a serem ligados à instrução preparada.
 */
export const run = (source: string, params: SQLite.SQLiteBindParams = []) => {
  return getDatabase().runAsync(source, params);
};

/**
 * Executa uma consulta SQL que retorna múltiplos resultados
 * @param source Uma string contendo a consulta SQL a ser executada.
 * @param params Os parâmetros a serem ligados à instrução preparada.
 * @returns Resultados da consulta
 */
export const getAll = <T>(source: string, params: SQLite.SQLiteBindParams = []) => {
  return getDatabase().getAllAsync<T>(source, params);
};

/**
 * Executa uma consulta SQL que retorna o primeiro resultado
 * @param source Uma string contendo a consulta SQL a ser executada.
 * @param params Os parâmetros a serem ligados à instrução preparada.
 * @returns O primeiro resultado da consulta
 */
export const getFirst = <T>(sql: string, params: SQLite.SQLiteBindParams = []) => {
  return getDatabase().getFirstAsync<T>(sql, params);
};
