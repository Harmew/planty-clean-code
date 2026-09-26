import { render } from "@testing-library/react-native";

// Components

import { ErrorComponent } from "./error.component";

const mockUseFormField = jest.fn();

jest.mock("../form-field.component", () => ({
  useFormField: () => mockUseFormField(),
}));

describe("form-field-error-component", () => {
  beforeEach(() => {
    mockUseFormField.mockReturnValue({
      isInvalid: false,
    });
  });

  it("does not render when the field is valid", async () => {
    const { queryByTestId } = await render(<ErrorComponent>Campo obrigatório</ErrorComponent>);

    expect(queryByTestId("form-field-error")).toBeNull();
  });

  it("does not render when there is no error message", async () => {
    mockUseFormField.mockReturnValue({
      isInvalid: true,
    });

    const { queryByTestId } = await render(<ErrorComponent />);

    expect(queryByTestId("form-field-error")).toBeNull();
  });

  it("renders the error message when the field is invalid", async () => {
    mockUseFormField.mockReturnValue({
      isInvalid: true,
    });

    const { getByTestId } = await render(<ErrorComponent>Campo obrigatório</ErrorComponent>);

    expect(getByTestId("form-field-error")).toBeTruthy();
    expect(getByTestId("form-field-error-text")).toHaveTextContent("Campo obrigatório");
  });
});
