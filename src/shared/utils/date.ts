const pad = (value: number) => String(value).padStart(2, "0");

/** Formata uma data ISO como "DD/MM/YYYY às HH:mm". Se for inválida, devolve o valor original. */
export const formatDateTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return `${day}/${month}/${date.getFullYear()} às ${time}`;
};
