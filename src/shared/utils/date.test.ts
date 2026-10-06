import { formatDateTime } from "./date";

describe("formatDateTime", () => {
  it("deve formatar corretamente uma data ISO válida", () => {
    const isoDate = "2023-06-15T14:30:00Z";
    const formattedDate = formatDateTime(isoDate);
    expect(formattedDate).toBe("15/06/2023 às 11:30");
  });

  it("deve retornar o valor original para uma data inválida", () => {
    const invalidDate = "data inválida";
    const formattedDate = formatDateTime(invalidDate);
    expect(formattedDate).toBe(invalidDate);
  });
});
