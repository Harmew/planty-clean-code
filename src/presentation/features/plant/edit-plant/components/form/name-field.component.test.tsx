import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { NameField } from "./name-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("name-field", () => {
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

  it("deve renderizar o campo de nome", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByTestId, getByLabelText } = await render(<NameField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByTestId("form-field-label-text")).toHaveTextContent("Nome *");
    expect(getByLabelText("Nome da planta")).toBeTruthy();
    expect(getByLabelText("Nome da planta").props.accessibilityHint).toBe("Campo obrigatório");
  });

  it("deve exibir o valor atual do campo", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "Samambaia",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByLabelText } = await render(<NameField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByLabelText("Nome da planta").props.value).toBe("Samambaia");
  });

  it("deve atualizar o campo ao alterar o texto", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByLabelText } = await render(<NameField inputRef={inputRef} nextRef={nextRef} />);

    await act(() => {
      fireEvent.changeText(getByLabelText("Nome da planta"), "Samambaia");
    });

    expect(onChange).toHaveBeenCalledWith("Samambaia");
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
          message: "O nome da planta é obrigatório",
        },
      },
    } as never);

    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();

    const { getByText } = await render(<NameField inputRef={inputRef} nextRef={nextRef} />);

    expect(getByText("O nome da planta é obrigatório")).toBeTruthy();
  });

  it("deve focar o próximo campo ao enviar", async () => {
    const inputRef = React.createRef<any>();
    const nextRef = React.createRef<any>();
    const focus = jest.fn();

    nextRef.current = { focus };

    const { getByLabelText } = await render(<NameField inputRef={inputRef} nextRef={nextRef} />);

    await act(() => {
      fireEvent(getByLabelText("Nome da planta"), "submitEditing");
    });

    expect(focus).toHaveBeenCalledTimes(1);
  });
});
