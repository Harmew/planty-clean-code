import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { TemperatureMinField } from "./temperature-min-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("temperature-min-field", () => {
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

  it("deve renderizar o campo de temperatura mínima", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByText, getByLabelText } = await render(<TemperatureMinField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByText("Temperatura mínima")).toBeTruthy();
    expect(getByText("Temperatura mínima recomendada")).toBeTruthy();
    expect(getByLabelText("Temperatura mínima")).toBeTruthy();
  });

  it("deve exibir o valor atual do campo", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "1",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByLabelText } = await render(<TemperatureMinField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByLabelText("Temperatura mínima").props.value).toBe("1");
  });

  it("deve atualizar o campo ao alterar o texto", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByLabelText } = await render(<TemperatureMinField inputRef={inputRef} nextRef={nextRef} />);

    await act(() => {
      fireEvent.changeText(getByLabelText("Temperatura mínima"), "1");
    });

    expect(onChange).toHaveBeenCalledWith("1");
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
          message: "Temperatura mínima inválida",
        },
      },
    } as never);

    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByText } = await render(<TemperatureMinField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByText("Temperatura mínima inválida")).toBeTruthy();
  });

  it("deve focar o próximo campo ao enviar", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();
    const focus = jest.fn();

    nextRef.current = { focus };

    const { getByLabelText } = await render(<TemperatureMinField inputRef={inputRef} nextRef={nextRef} />);

    await act(() => {
      fireEvent(getByLabelText("Temperatura mínima"), "submitEditing");
    });

    expect(focus).toHaveBeenCalledTimes(1);
  });
});
