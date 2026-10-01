import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { LocationField } from "./location-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("location-field", () => {
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

  it("deve renderizar o campo de localização", async () => {
    const inputRef = React.createRef<any>();

    const { getByTestId, getByLabelText, getByText } = await render(<LocationField inputRef={inputRef} />);

    expect(getByTestId("form-field-label-text")).toHaveTextContent("Localização *");
    expect(getByLabelText("Localização da planta")).toBeTruthy();
    expect(getByText("Onde sua planta está localizada")).toBeTruthy();
    expect(getByLabelText("Localização da planta").props.accessibilityHint).toBe("Campo obrigatório");
  });

  it("deve exibir o valor atual do campo", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "Varanda",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const inputRef = React.createRef<any>();

    const { getByLabelText } = await render(<LocationField inputRef={inputRef} />);

    expect(getByLabelText("Localização da planta").props.value).toBe("Varanda");
  });

  it("deve atualizar o campo ao alterar o texto", async () => {
    const inputRef = React.createRef<any>();

    const { getByLabelText } = await render(<LocationField inputRef={inputRef} />);

    await act(() => {
      fireEvent.changeText(getByLabelText("Localização da planta"), "Varanda");
    });

    expect(onChange).toHaveBeenCalledWith("Varanda");
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
          message: "A localização da planta é obrigatória",
        },
      },
    } as never);

    const inputRef = React.createRef<any>();

    const { getByText } = await render(<LocationField inputRef={inputRef} />);

    expect(getByText("A localização da planta é obrigatória")).toBeTruthy();
  });
});
