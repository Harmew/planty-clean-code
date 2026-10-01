import { fireEvent, render } from "@testing-library/react-native";

import { useFormContext, useFormState } from "react-hook-form";

import { SubmitButton } from "./submit-button.component";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
  useFormState: jest.fn(),
}));

describe("submit-button", () => {
  const onPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useFormContext).mockReturnValue({
      control: {},
    } as never);

    jest.mocked(useFormState).mockReturnValue({
      isSubmitting: false,
    } as never);
  });

  it("deve renderizar o botão de salvar planta", async () => {
    const { getByText } = await render(<SubmitButton onPress={onPress} />);

    expect(getByText("Salvar planta")).toBeTruthy();
  });

  it("deve exibir o carregamento ao enviar", async () => {
    jest.mocked(useFormState).mockReturnValue({
      isSubmitting: true,
    } as never);

    const { getByTestId, queryByText } = await render(<SubmitButton onPress={onPress} />);

    expect(getByTestId("spinner-container")).toBeTruthy();
    expect(queryByText("Salvar planta")).toBeNull();
  });

  it("deve chamar onPress ao pressionar o botão", async () => {
    const { getByText } = await render(<SubmitButton onPress={onPress} />);

    await fireEvent.press(getByText("Salvar planta"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
