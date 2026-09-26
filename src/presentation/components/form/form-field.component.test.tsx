import { Text } from "react-native";

import { render } from "@testing-library/react-native";

import React from "react";
import { FormField, FormFieldRoot, useFormField } from "./form-field.component";

const mockUseTheme = jest.fn();

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: () => mockUseTheme(),
}));

describe("form-field-component", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: {
        spacings: {
          8: 8,
        },
      },
    });
  });

  it("renders children", async () => {
    const { getByTestId } = await render(
      <FormFieldRoot>
        <Text testID="form-field-content">Conteúdo</Text>
      </FormFieldRoot>,
    );

    expect(getByTestId("form-field-content")).toBeTruthy();
  });

  it("applies the default opacity when enabled", async () => {
    const { getByTestId } = await render(
      <FormFieldRoot testID="form-field">
        <Text>Conteúdo</Text>
      </FormFieldRoot>,
    );

    expect(getByTestId("form-field")).toHaveStyle({
      opacity: 1,
    });
  });

  it("applies reduced opacity when disabled", async () => {
    const { getByTestId } = await render(
      <FormFieldRoot testID="form-field" isDisabled>
        <Text>Conteúdo</Text>
      </FormFieldRoot>,
    );

    expect(getByTestId("form-field")).toHaveStyle({
      opacity: 0.6,
    });
  });

  it("applies the custom style", async () => {
    const { getByTestId } = await render(
      <FormFieldRoot testID="form-field" style={{ marginTop: 20 }}>
        <Text>Conteúdo</Text>
      </FormFieldRoot>,
    );

    expect(getByTestId("form-field")).toHaveStyle({
      marginTop: 20,
    });
  });

  it("provides the form field state through context", async () => {
    function Consumer() {
      const { isDisabled, isInvalid, isRequired } = useFormField();

      return <Text testID="form-field-state">{`${isDisabled}-${isInvalid}-${isRequired}`}</Text>;
    }

    const { getByTestId } = await render(
      <FormFieldRoot isDisabled isInvalid isRequired>
        <Consumer />
      </FormFieldRoot>,
    );

    expect(getByTestId("form-field-state")).toHaveTextContent("true-true-true");
  });

  it("provides default form field state through context", async () => {
    function Consumer() {
      const { isDisabled, isInvalid, isRequired } = useFormField();

      return <Text testID="form-field-state">{`${isDisabled}-${isInvalid}-${isRequired}`}</Text>;
    }

    const { getByTestId } = await render(
      <FormFieldRoot>
        <Consumer />
      </FormFieldRoot>,
    );

    expect(getByTestId("form-field-state")).toHaveTextContent("false-false-false");
  });

  it("throws when useFormField is used outside FormField", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    function Consumer() {
      useFormField();

      return <Text>Conteúdo</Text>;
    }

    class ErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
      state = {
        hasError: false,
      };

      static getDerivedStateFromError() {
        return {
          hasError: true,
        };
      }

      render() {
        if (this.state.hasError) {
          return <Text testID="form-field-error">Erro capturado</Text>;
        }

        return this.props.children;
      }
    }

    const { getByTestId } = await render(
      <ErrorBoundary>
        <Consumer />
      </ErrorBoundary>,
    );

    expect(getByTestId("form-field-error")).toBeTruthy();

    consoleError.mockRestore();
  });

  it("exposes the compound components through FormField", () => {
    expect(FormField.Label).toBeDefined();
    expect(FormField.Description).toBeDefined();
    expect(FormField.Error).toBeDefined();
    expect(FormField.Input).toBeDefined();
    expect(FormField.Select).toBeDefined();
  });
});
