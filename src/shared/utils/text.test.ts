import { formatHumidityLabel, formatSunlightLabel, formatTemperatureRange } from "./text";

describe("formatSunlightLabel", () => {
  it("deve formatar luminosidade baixa", () => {
    expect(formatSunlightLabel("low")).toBe("Baixa");
  });

  it("deve formatar luminosidade média", () => {
    expect(formatSunlightLabel("medium")).toBe("Média");
  });

  it("deve formatar luminosidade alta", () => {
    expect(formatSunlightLabel("high")).toBe("Alta");
  });
});

describe("formatTemperatureRange", () => {
  it("deve retornar hífen quando não possui temperaturas", () => {
    expect(formatTemperatureRange(null, null)).toBe("-");
  });

  it("deve formatar temperatura mínima e máxima", () => {
    expect(formatTemperatureRange("18", "28")).toBe("18° - 28°");
  });

  it("deve formatar apenas a temperatura mínima", () => {
    expect(formatTemperatureRange("18", null)).toBe("↓ 18°");
  });

  it("deve formatar apenas a temperatura máxima", () => {
    expect(formatTemperatureRange(null, "28")).toBe("↑ 28°");
  });
});

describe("formatHumidityLabel", () => {
  it("deve retornar hífen quando não possui umidade", () => {
    expect(formatHumidityLabel(null)).toBe("-");
  });

  it("deve formatar a umidade", () => {
    expect(formatHumidityLabel("60")).toBe("60%");
  });
});
