import type { CareType } from "@domain/entities/care.entity";

export const getNotificationTitle = (type: CareType): string => {
  switch (type) {
    case "water":
      return "Hora de regar";

    case "fertilize":
      return "Hora de adubar";

    case "prune":
      return "Hora de podar";

    case "repot":
      return "Hora de replantar";
  }
};

export const getNotificationBody = (plantName: string, type: CareType): string => {
  switch (type) {
    case "water":
      return `A planta ${plantName} precisa de água!`;

    case "fertilize":
      return `Chegou a hora de adubar a planta ${plantName}`;

    case "prune":
      return `A planta ${plantName} precisa ser podada`;

    case "repot":
      return `A planta ${plantName} precisa ser replantada`;
  }
};

type NotificationDate = {
  label: string;
  relative: string;
};

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
] as const;

const pad = (value: number) => String(value).padStart(2, "0");

const formatTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

const formatFullDate = (date: Date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${formatTime(date)}`;

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

/** Diferença em dias de calendário (hoje = 0, ontem = 1) */
const calendarDaysAgo = (date: Date, now: Date) => Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS);

/** Equivalente aproximado ao fromNow() do dayjs em pt-br */
const formatRelative = (date: Date, now: Date) => {
  const diff = now.getTime() - date.getTime();
  const abs = Math.abs(diff);

  const amount = (() => {
    if (abs < 45 * 1000) return "alguns segundos";
    if (abs < 90 * 1000) return "um minuto";

    const minutes = Math.round(abs / MINUTE_MS);
    if (minutes < 45) return `${minutes} minutos`;
    if (abs < 90 * MINUTE_MS) return "uma hora";

    const hours = Math.round(abs / HOUR_MS);
    if (hours < 22) return `${hours} horas`;
    if (abs < 36 * HOUR_MS) return "um dia";

    const days = Math.round(abs / DAY_MS);
    if (days < 26) return `${days} dias`;
    if (days < 46) return "um mês";
    if (days < 320) return `${Math.round(days / 30)} meses`;

    const years = Math.round(days / 365);
    return years <= 1 ? "um ano" : `${years} anos`;
  })();

  return diff >= 0 ? `há ${amount}` : `em ${amount}`;
};

/** Formata uma data de notificação */
export const formatNotificationDate = (value: string, now: Date = new Date()): NotificationDate => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { label: value, relative: "" };
  }

  const relative = formatRelative(date, now);
  const time = formatTime(date);
  const daysAgo = calendarDaysAgo(date, now);

  if (daysAgo === 0) return { label: `Hoje às ${time}`, relative };
  if (daysAgo === 1) return { label: `Ontem às ${time}`, relative };
  if (daysAgo > 1 && daysAgo < 7) return { label: `${WEEKDAYS[date.getDay()]} às ${time}`, relative };

  return { label: formatFullDate(date), relative };
};
