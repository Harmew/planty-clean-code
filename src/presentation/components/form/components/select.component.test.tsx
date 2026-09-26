import React from "react";

import { Pressable } from "react-native";

import { act, fireEvent, render } from "@testing-library/react-native";

import { SelectComponent } from "./select.component";

const mockUseFormField = jest.fn();

const mockUseTheme = jest.fn();

const mockGetThemeColors = jest.fn();

jest.mock("../form-field.component", () => ({
  useFormField: () => mockUseFormField(),
}));

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: () => mockUseTheme(),
}));

jest.mock("@shared/utils/theme", () => ({
  getThemeColors: (...args: unknown[]) => mockGetThemeColors(...args),
}));

jest.mock("@presentation/components/common", () => {
  const { View, Text } = require("react-native");

  return {
    FullWindowOverlay: ({ children }: React.PropsWithChildren) => <View testID="full-window-overlay">{children}</View>,

    Row: ({ children }: React.PropsWithChildren) => <View>{children}</View>,

    Surface: ({ children }: React.PropsWithChildren) => <View testID="select-surface">{children}</View>,

    Typography: ({ children, ...props }: React.PropsWithChildren) => <Text {...props}>{children}</Text>,
  };
});

jest.mock("@presentation/components/svgs", () => {
  const { View } = require("react-native");

  return {
    Icons: {
      ChevronDown: () => <View testID="select-chevron" />,
      Check: ({ testID }: { testID?: string }) => <View testID={testID ?? "select-check"} />,
    },
  };
});

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");

  return {
    default: {
      View,
    },

    View,

    FadeIn: {
      duration: () => ({
        easing: () => ({}),
      }),
    },

    FadeOut: {
      duration: () => ({
        easing: () => ({}),
      }),
    },

    useSharedValue: jest.fn(() => ({
      value: 0,
    })),

    withTiming: jest.fn((value) => value),
  };
});

describe("form-field-select-component", () => {
  const options = [
    {
      label: "Sol pleno",
      value: "full-sun",
    },
    {
      label: "Meio-sombra",
      value: "partial-shade",
    },
    {
      label: "Sombra",
      value: "shade",
    },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockUseFormField.mockReturnValue({
      isDisabled: false,
      isInvalid: false,
    });

    mockUseTheme.mockReturnValue({
      dark: false,
      theme: {
        colors: {
          red500: "#FF0000",
        },
        radius: {
          16: 16,
        },
        spacings: {
          4: 4,
          12: 12,
          18: 18,
        },
      },
    });

    mockGetThemeColors.mockReturnValue({
      background: "#FFFFFF",
      overlay: "rgba(0, 0, 0, 0.5)",
    });

    mockOnChange.mockClear();
  });

  it("renders the placeholder when there is no selected value", async () => {
    const { getByText, getByTestId } = await render(
      <SelectComponent value={undefined} onChange={mockOnChange} options={options} placeholder="Selecione uma opção" />,
    );

    expect(getByText("Selecione uma opção")).toBeTruthy();
    expect(getByTestId("select-chevron")).toBeTruthy();
  });

  it("renders the selected option label", async () => {
    const { getByText } = await render(
      <SelectComponent value="partial-shade" onChange={mockOnChange} options={options} />,
    );

    expect(getByText("Meio-sombra")).toBeTruthy();
  });

  it("renders the icon", async () => {
    const { getByTestId } = await render(
      <SelectComponent
        value={undefined}
        onChange={mockOnChange}
        options={options}
        icon={<Pressable testID="select-icon" />}
      />,
    );

    expect(getByTestId("select-icon")).toBeTruthy();
  });

  it("applies the invalid border color", async () => {
    mockUseFormField.mockReturnValue({
      isDisabled: false,
      isInvalid: true,
    });

    const { getByTestId } = await render(
      <SelectComponent value={undefined} onChange={mockOnChange} options={options} />,
    );

    const select = getByTestId("form-field-select");

    expect(select).toHaveStyle({
      borderColor: "#FF0000",
    });
  });

  it("does not open when disabled", async () => {
    mockUseFormField.mockReturnValue({
      isDisabled: true,
      isInvalid: false,
    });

    const { getByTestId, queryByTestId } = await render(
      <SelectComponent value={undefined} onChange={mockOnChange} options={options} />,
    );

    await act(() => {
      fireEvent.press(getByTestId("form-field-select"));
    });

    expect(queryByTestId("full-window-overlay")).toBeNull();
  });

  it("opens the options when pressed", async () => {
    const { getByTestId, getByText } = await render(
      <SelectComponent value={undefined} onChange={mockOnChange} options={options} />,
    );

    await act(() => {
      fireEvent.press(getByTestId("form-field-select"));
    });

    expect(getByTestId("full-window-overlay")).toBeTruthy();
    expect(getByText("Sol pleno")).toBeTruthy();
    expect(getByText("Meio-sombra")).toBeTruthy();
    expect(getByText("Sombra")).toBeTruthy();
  });

  it("selects an option, calls onChange and closes the options", async () => {
    const { getByTestId, queryByTestId } = await render(
      <SelectComponent value={undefined} onChange={mockOnChange} options={options} />,
    );

    await act(() => {
      fireEvent.press(getByTestId("form-field-select"));
    });

    await act(() => {
      fireEvent.press(getByTestId("form-field-select-option-partial-shade"));
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("partial-shade");
    expect(queryByTestId("full-window-overlay")).toBeNull();
  });

  it("closes the options when pressing the overlay", async () => {
    const { getByTestId, queryByTestId } = await render(
      <SelectComponent value={undefined} onChange={mockOnChange} options={options} />,
    );

    await act(() => {
      fireEvent.press(getByTestId("form-field-select"));
    });

    await act(() => {
      fireEvent.press(getByTestId("form-field-select-overlay"));
    });

    expect(queryByTestId("full-window-overlay")).toBeNull();
  });

  it("shows the check icon for the selected option", async () => {
    const { getByTestId } = await render(
      <SelectComponent value="partial-shade" onChange={mockOnChange} options={options} />,
    );

    await act(() => {
      fireEvent.press(getByTestId("form-field-select"));
    });

    expect(getByTestId("form-field-select-check")).toBeTruthy();
  });
});
