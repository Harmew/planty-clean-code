import { act, fireEvent, render } from "@testing-library/react-native";

// Presentation
import { Icons } from "@presentation/components/svgs";

import { InputComponent } from "./input.component";

const mockOnFocus = jest.fn();
const mockOnBlur = jest.fn();
const mockUseTheme = jest.fn();
const mockGetThemeColors = jest.fn();
const mockUseFormField = jest.fn();

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: () => mockUseTheme(),
}));

jest.mock("@shared/utils/theme", () => ({
  getThemeColors: (...args: unknown[]) => mockGetThemeColors(...args),
}));

jest.mock("../form-field.component", () => ({
  useFormField: () => mockUseFormField(),
}));

describe("form-field-input-component", () => {
  beforeEach(() => {
    mockOnFocus.mockClear();
    mockOnBlur.mockClear();

    mockUseTheme.mockReturnValue({
      dark: false,
      theme: {
        colors: {
          green500: "#00A859",
          red500: "#FF0000",
          gray500: "#808080",
        },
        radius: {
          16: 16,
        },
        spacings: {
          12: 12,
        },
        fontSizes: {
          16: 16,
        },
      },
    });

    mockGetThemeColors.mockReturnValue({
      background: "#FFFFFF",
      text: "#000000",
    });

    mockUseFormField.mockReturnValue({
      isDisabled: false,
      isInvalid: false,
    });
  });

  it("renders with the default state", async () => {
    const { getByTestId } = await render(<InputComponent />);

    const input = getByTestId("form-field-input");

    expect(getByTestId("form-field-input-container")).toBeTruthy();
    expect(input).toBeTruthy();
    expect(input.props.editable).toBe(true);
    expect(input.props.selectionColor).toBe("#00A859");

    expect(input).toHaveStyle({
      borderColor: "#FFFFFF",
    });
  });

  it("applies the focused border and calls onFocus", async () => {
    const { getByTestId } = await render(<InputComponent onFocus={mockOnFocus} />);

    const input = getByTestId("form-field-input");

    await act(() => {
      input.props.onFocus({});
    });

    expect(input).toHaveStyle({ borderColor: "#00A859" });
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it("returns to the default border and calls onBlur", async () => {
    const { getByTestId } = await render(<InputComponent onBlur={mockOnBlur} />);

    const input = getByTestId("form-field-input");

    await act(() => {
      input.props.onFocus({});
    });

    expect(input).toHaveStyle({ borderColor: "#00A859" });

    await act(() => {
      input.props.onBlur({});
    });

    expect(input).toHaveStyle({ borderColor: "#FFFFFF" });
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("applies the invalid state", async () => {
    mockUseFormField.mockReturnValue({
      isDisabled: false,
      isInvalid: true,
    });

    const { getByTestId } = await render(<InputComponent />);

    const input = getByTestId("form-field-input");

    expect(input).toHaveStyle({
      borderColor: "#FF0000",
    });

    expect(input.props.selectionColor).toBe("#FF0000");

    await act(() => {
      fireEvent(input, "focus");
    });

    expect(input).toHaveStyle({
      borderColor: "#FF0000",
    });
  });

  it("is not editable when disabled", async () => {
    mockUseFormField.mockReturnValue({
      isDisabled: true,
      isInvalid: false,
    });

    const { getByTestId } = await render(<InputComponent />);

    expect(getByTestId("form-field-input").props.editable).toBe(false);
  });

  it("renders the prefix and applies its spacing", async () => {
    const { getByTestId } = await render(<InputComponent prefix={<Icons.ThermometerSun size={20} />} />);

    expect(getByTestId("form-field-input-prefix")).toHaveStyle({
      left: 12,
      width: 20,
      height: 20,
    });

    expect(getByTestId("form-field-input")).toHaveStyle({
      paddingLeft: 44,
    });
  });

  it("renders the suffix and applies its spacing", async () => {
    const { getByTestId } = await render(<InputComponent suffix={<Icons.ChevronDown size={20} />} />);

    expect(getByTestId("form-field-input-suffix")).toHaveStyle({
      right: 12,
      width: 20,
      height: 20,
    });

    expect(getByTestId("form-field-input")).toHaveStyle({
      paddingRight: 44,
    });
  });

  it("does not render prefix or suffix when they are not provided", async () => {
    const { queryByTestId } = await render(<InputComponent />);

    expect(queryByTestId("form-field-input-prefix")).toBeNull();
    expect(queryByTestId("form-field-input-suffix")).toBeNull();
  });

  it("forwards TextInput props", async () => {
    const { getByTestId } = await render(
      <InputComponent placeholder="Nome da planta" value="Minha planta" maxLength={50} />,
    );

    const input = getByTestId("form-field-input");

    expect(input.props.placeholder).toBe("Nome da planta");
    expect(input.props.value).toBe("Minha planta");
    expect(input.props.maxLength).toBe(50);
  });

  it("uses the theme colors", async () => {
    mockUseTheme.mockReturnValue({
      dark: true,
      theme: {
        colors: {
          green500: "#00FF00",
          red500: "#FF0000",
          gray500: "#888888",
        },
        radius: {
          16: 16,
        },
        spacings: {
          12: 12,
        },
        fontSizes: {
          16: 16,
        },
      },
    });

    mockGetThemeColors.mockReturnValue({
      background: "#111111",
      text: "#FFFFFF",
    });

    const { getByTestId } = await render(<InputComponent />);

    const input = getByTestId("form-field-input");

    expect(input).toHaveStyle({
      backgroundColor: "#111111",
      color: "#FFFFFF",
    });

    expect(input.props.placeholderTextColor).toBe("#888888");
  });
});
