import { fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { SunlightField } from "./sunlight-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("sunlight-field", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useFormContext).mockReturnValue({
      control: {},
    } as never);

    jest.mocked(useController).mockReturnValue({
      field: {
        value: "medium",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);
  });

  it("deve renderizar o campo de luz solar", async () => {
    const { getByTestId, getByText } = await render(<SunlightField />);

    expect(getByTestId("form-field-label-text")).toHaveTextContent("Luz Solar *");
    expect(getByText("Quantidade de luz solar que sua planta recebe")).toBeTruthy();
  });

  it("deve atualizar o campo ao selecionar uma opção", async () => {
    const options = [
      { label: "Baixa", value: "low" },
      { label: "Média", value: "medium" },
      { label: "Alta", value: "high" },
    ];

    const { getByTestId } = await render(<SunlightField options={options} />);

    await fireEvent(getByTestId("form-field-select"), "change", "high");

    expect(onChange).toHaveBeenCalledWith("high");
  });

  it("deve renderizar a mensagem de erro quando o campo for inválido", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "medium",
        onChange,
      },
      fieldState: {
        invalid: true,
        error: {
          message: "Selecione uma opção de luz solar",
        },
      },
    } as never);

    const { getByText } = await render(<SunlightField />);

    expect(getByText("Selecione uma opção de luz solar")).toBeTruthy();
  });
});
