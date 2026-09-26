import { render } from "@testing-library/react-native";

// Components
import { LabelComponent } from "./label.component";

const mockUseFormField = jest.fn();

jest.mock("../form-field.component", () => ({
  useFormField: () => mockUseFormField(),
}));

describe("form-field-label-component", () => {
  beforeEach(() => {
    mockUseFormField.mockReturnValue({
      isRequired: false,
    });
  });

  it("does not render when there is no label", async () => {
    const { queryByTestId } = await render(<LabelComponent />);

    expect(queryByTestId("form-field-label")).toBeNull();
  });

  it("renders the label without required indicator", async () => {
    const { getByTestId, queryByTestId } = await render(<LabelComponent>Nome da planta</LabelComponent>);

    expect(getByTestId("form-field-label")).toBeTruthy();
    expect(getByTestId("form-field-label-text")).toHaveTextContent("Nome da planta");
  });

  it("renders the required indicator", async () => {
    mockUseFormField.mockReturnValue({
      isRequired: true,
    });

    const { getByTestId } = await render(<LabelComponent>Nome da planta</LabelComponent>);

    expect(getByTestId("form-field-label")).toBeTruthy();
    expect(getByTestId("form-field-label-text")).toHaveTextContent("Nome da planta * ");
  });
});
