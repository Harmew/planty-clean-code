import React from "react";

import { Text } from "react-native";

import { render, renderHook } from "@testing-library/react-native";

import { MenuContext, useMenu } from "./menu.context";

describe("useMenu", () => {
  it("deve retornar o contexto do Menu", async () => {
    const context = {
      isOpen: true,
      setOpen: jest.fn(),
    };

    const wrapper = ({ children }: React.PropsWithChildren) => (
      <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
    );

    const { result } = await renderHook(() => useMenu(), { wrapper });

    expect(result.current).toBe(context);
  });

  it("throws when used outside Menu", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    function Consumer() {
      useMenu();

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
          return <Text testID="menu-error">Erro capturado</Text>;
        }

        return this.props.children;
      }
    }

    const { getByTestId } = await render(
      <ErrorBoundary>
        <Consumer />
      </ErrorBoundary>,
    );

    expect(getByTestId("menu-error")).toBeTruthy();

    consoleError.mockRestore();
  });
});
