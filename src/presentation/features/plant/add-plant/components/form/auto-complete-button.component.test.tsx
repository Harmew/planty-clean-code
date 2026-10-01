import { fireEvent, render } from "@testing-library/react-native";

import { useFormContext, useFormState } from "react-hook-form";

import { AutoCompleteButton } from "./auto-complete-button.component";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
  useFormState: jest.fn(),
}));

describe("auto-complete-button", () => {
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

  it("deve renderizar o botão de auto completar", async () => {
    const { getByText } = await render(<AutoCompleteButton onPress={onPress} isLoading={false} />);

    expect(getByText("Auto Completar")).toBeTruthy();
  });

  it("deve exibir o carregamento quando estiver gerando os dados", async () => {
    const { getByTestId, queryByText } = await render(<AutoCompleteButton onPress={onPress} isLoading />);

    expect(getByTestId("spinner-container")).toBeTruthy();
    expect(queryByText("Auto Completar")).toBeNull();
  });

  it("deve desabilitar o botão enquanto o formulário estiver sendo enviado", async () => {
    jest.mocked(useFormState).mockReturnValue({
      isSubmitting: true,
    } as never);

    const { getByTestId } = await render(<AutoCompleteButton onPress={onPress} isLoading={false} />);

    expect(getByTestId("pressable-feedback").props.accessibilityState).toEqual(
      expect.objectContaining({
        disabled: true,
      }),
    );
  });

  it("deve chamar onPress ao pressionar o botão", async () => {
    const { getByText } = await render(<AutoCompleteButton onPress={onPress} isLoading={false} />);

    await fireEvent.press(getByText("Auto Completar"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
