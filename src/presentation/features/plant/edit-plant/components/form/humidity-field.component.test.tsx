import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { HumidityField } from "./humidity-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("humidity-field", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useFormContext).mockReturnValue({
      control: {},
    } as never);

    jest.mocked(useController).mockReturnValue({
      field: {
        value: "",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);
  });

  it("deve renderizar o campo de umidade", async () => {
    const inputRef = React.createRef<any>();

    const { getByText, getByLabelText } = await render(<HumidityField inputRef={inputRef} />);

    expect(getByText("Umidade")).toBeTruthy();
    expect(getByText("Nível de umidade ideal")).toBeTruthy();
    expect(getByLabelText("Umidade")).toBeTruthy();
  });

  it("deve exibir o valor atual do campo", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "60",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const inputRef = React.createRef<any>();

    const { getByLabelText } = await render(<HumidityField inputRef={inputRef} />);

    expect(getByLabelText("Umidade").props.value).toBe("60");
  });

  it("deve atualizar o campo ao alterar o texto", async () => {
    const inputRef = React.createRef<any>();

    const { getByLabelText } = await render(<HumidityField inputRef={inputRef} />);

    await act(() => {
      fireEvent.changeText(getByLabelText("Umidade"), "60");
    });

    expect(onChange).toHaveBeenCalledWith("60");
  });

  it("deve renderizar a mensagem de erro quando o campo for inválido", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "",
        onChange,
      },
      fieldState: {
        invalid: true,
        error: {
          message: "Umidade inválida",
        },
      },
    } as never);

    const inputRef = React.createRef<any>();

    const { getByText } = await render(<HumidityField inputRef={inputRef} />);

    expect(getByText("Umidade inválida")).toBeTruthy();
  });
});
