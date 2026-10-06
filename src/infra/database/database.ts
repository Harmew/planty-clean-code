import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "plants.db" as const;

let database: SQLite.SQLiteDatabase | null = null;

type SeedRow = { id: number };

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const atHour = (date: Date, hour: number) => {
  const result = new Date(date);
  result.setHours(hour, 0, 0, 0);
  return result;
};

const seedDevelopmentData = async (db: SQLite.SQLiteDatabase) => {
  const existingSeed = await db.getFirstAsync<SeedRow>("SELECT id FROM plants WHERE name = ? LIMIT 1", [
    "Jiboia de teste",
  ]);

  if (existingSeed) return;

  const now = new Date();
  const yesterday = addDays(now, -1);
  const today = atHour(now, 10);
  const tomorrow = atHour(addDays(now, 1), 9);

  await db.withTransactionAsync(async () => {
    const jiboia = await db.runAsync(
      `
        INSERT INTO plants (name, image, location, sunlight, created_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      ["Jiboia de teste", null, "Sala", "medium", addDays(now, -30).toISOString()],
    );

    const monstera = await db.runAsync(
      `
        INSERT INTO plants (name, image, location, sunlight, created_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      ["Monstera de teste", null, "Quarto", "high", addDays(now, -20).toISOString()],
    );

    const zamioculca = await db.runAsync(
      `
        INSERT INTO plants (name, image, location, sunlight, created_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      ["Zamioculca de teste", null, "Escritorio", "low", addDays(now, -10).toISOString()],
    );

    const waterCare = await db.runAsync(
      `
        INSERT INTO cares (plant_id, type, interval_days, last_done, next_due, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        jiboia.lastInsertRowId,
        "water",
        3,
        addDays(yesterday, -3).toISOString(),
        today.toISOString(),
        yesterday.toISOString(),
      ],
    );

    const fertilizeCare = await db.runAsync(
      `
        INSERT INTO cares (plant_id, type, interval_days, last_done, next_due, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        monstera.lastInsertRowId,
        "fertilize",
        14,
        addDays(yesterday, -14).toISOString(),
        atHour(yesterday, 8).toISOString(),
        addDays(now, -20).toISOString(),
      ],
    );

    const pruneCare = await db.runAsync(
      `
        INSERT INTO cares (plant_id, type, interval_days, last_done, next_due, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        zamioculca.lastInsertRowId,
        "prune",
        7,
        now.toISOString(),
        tomorrow.toISOString(),
        addDays(now, -7).toISOString(),
      ],
    );

    await db.runAsync(
      `
        INSERT INTO care_history (plant_id, care_id, type, interval_days, done_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      [jiboia.lastInsertRowId, waterCare.lastInsertRowId, "water", 3, addDays(yesterday, -3).toISOString()],
    );

    await db.runAsync(
      `
        INSERT INTO care_history (plant_id, care_id, type, interval_days, done_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      [monstera.lastInsertRowId, fertilizeCare.lastInsertRowId, "fertilize", 14, addDays(yesterday, -14).toISOString()],
    );

    await db.runAsync(
      `
        INSERT INTO care_history (plant_id, care_id, type, interval_days, done_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      [zamioculca.lastInsertRowId, pruneCare.lastInsertRowId, "prune", 7, now.toISOString()],
    );
  });
};

export const initDatabase = async () => {
  database = await SQLite.openDatabaseAsync(DATABASE_NAME, {
    enableChangeListener: true,
  });

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

    CREATE TABLE IF NOT EXISTS cares (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      interval_days INTEGER NOT NULL,
      last_done TEXT,
      next_due TEXT NOT NULL,
      created_at TEXT NOT NULL,

      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_cares_plant_due
      ON cares (plant_id, next_due);

    CREATE UNIQUE INDEX IF NOT EXISTS idx_cares_plant_type
      ON cares (plant_id, type);

    CREATE TABLE IF NOT EXISTS care_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      care_id INTEGER,
      type TEXT NOT NULL,
      interval_days INTEGER NOT NULL,
      done_at TEXT NOT NULL,

      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (care_id) REFERENCES cares(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER,
      care_id INTEGER,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      type TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      scheduled_for TEXT,
      expo_notification_id TEXT,
      created_at TEXT NOT NULL,

      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (care_id) REFERENCES cares(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_care_history_plant_done
      ON care_history (plant_id, done_at);

    CREATE INDEX IF NOT EXISTS idx_notifications_care
      ON notifications (care_id);

    CREATE INDEX IF NOT EXISTS idx_notifications_plant
      ON notifications (plant_id);
  `);

  // await seedDevelopmentData(database);
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

/**
 * Executa uma função dentro de uma transação de banco de dados.
 * Se a função lançar um erro, a transação será revertida.
 * @param task Uma função assíncrona que contém as operações de banco de dados a serem executadas dentro da transação.
 * @returns Uma promessa que resolve para o valor retornado pela função `task`.
 */
export const withTransaction = async <T>(task: () => Promise<T>): Promise<T> => {
  let result!: T;

  await getDatabase().withTransactionAsync(async () => {
    result = await task();
  });

  return result;
};
