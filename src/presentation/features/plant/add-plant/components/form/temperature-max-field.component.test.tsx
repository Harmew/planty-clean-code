import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { TemperatureMaxField } from "./temperature-max-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("temperature-max-field", () => {
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

  it("deve renderizar o campo de temperatura máxima", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByText, getByLabelText } = await render(<TemperatureMaxField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByText("Temperatura máxima")).toBeTruthy();
    expect(getByText("Temperatura máxima recomendada")).toBeTruthy();
    expect(getByLabelText("Temperatura máxima")).toBeTruthy();
  });

  it("deve exibir o valor atual do campo", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "30",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByLabelText } = await render(<TemperatureMaxField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByLabelText("Temperatura máxima").props.value).toBe("30");
  });

  it("deve atualizar o campo ao alterar o texto", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByLabelText } = await render(<TemperatureMaxField inputRef={inputRef} nextRef={nextRef} />);

    await act(() => {
      fireEvent.changeText(getByLabelText("Temperatura máxima"), "30");
    });

    expect(onChange).toHaveBeenCalledWith("30");
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
          message: "Temperatura máxima inválida",
        },
      },
    } as never);

    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByText } = await render(<TemperatureMaxField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByText("Temperatura máxima inválida")).toBeTruthy();
  });

  it("deve focar o próximo campo ao enviar", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const focus = jest.fn();

    nextRef.current = {
      focus,
    };

    const { getByLabelText } = await render(<TemperatureMaxField inputRef={inputRef} nextRef={nextRef} />);

    await act(() => {
      fireEvent(getByLabelText("Temperatura máxima"), "submitEditing");
    });

    expect(focus).toHaveBeenCalledTimes(1);
  });
});
