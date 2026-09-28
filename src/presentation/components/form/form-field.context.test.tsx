import React from "react";

import { Text } from "react-native";

import { render } from "@testing-library/react-native";

import { FormFieldContext, useFormField } from "./form-field.context";

describe("form-field-context", () => {
  it("returns the form field context", async () => {
    function Consumer() {
      const { isDisabled, isInvalid, isRequired } = useFormField();

      return <Text testID="form-field-state">{`${isDisabled}-${isInvalid}-${isRequired}`}</Text>;
    }

    const { getByTestId } = await render(
      <FormFieldContext.Provider
        value={{
          isDisabled: true,
          isInvalid: true,
          isRequired: true,
        }}
      >
        <Consumer />
      </FormFieldContext.Provider>,
    );

    expect(getByTestId("form-field-state")).toHaveTextContent("true-true-true");
  });

  it("throws when used outside FormField", async () => {
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
});
