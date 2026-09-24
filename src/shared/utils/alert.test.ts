import { getAlertOptions } from "@shared/utils/alert";

describe("get-alert-options", () => {
  it("deve retornar as opções para tema claro", () => {
    expect(getAlertOptions(false)).toEqual({
      cancelable: false,
      userInterfaceStyle: "light",
    });
  });

  it("deve retornar as opções para tema escuro", () => {
    expect(getAlertOptions(true)).toEqual({
      cancelable: false,
      userInterfaceStyle: "dark",
    });
  });
});
