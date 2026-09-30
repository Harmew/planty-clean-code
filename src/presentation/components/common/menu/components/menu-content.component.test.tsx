import React from "react";

import { Text } from "react-native";

import { act, fireEvent, render } from "@testing-library/react-native";

import { MenuContext } from "../menu.context";
import { MenuContent } from "./menu-content.component";

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@shared/utils/theme", () => ({
  getThemeColors: jest.fn(),
}));

jest.mock("@presentation/components/common", () => ({
  FullWindowOverlay: ({ children }: React.PropsWithChildren) => <>{children}</>,
  Surface: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

const { useTheme } = jest.requireMock("@presentation/hooks/use-theme");

const { getThemeColors } = jest.requireMock("@shared/utils/theme");

describe("MenuContent", () => {
  const setOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useTheme.mockReturnValue({
      theme: {
        spacings: {
          4: 4,
          18: 18,
        },
      },
      dark: false,
    });

    getThemeColors.mockReturnValue({
      overlay: "rgba(0, 0, 0, 0.5)",
    });
  });

  it("não deve renderizar quando o menu estiver fechado", async () => {
    const { queryByTestId } = await render(
      <MenuContext.Provider value={{ isOpen: false, setOpen }}>
        <MenuContent>
          <Text>Conteúdo</Text>
        </MenuContent>
      </MenuContext.Provider>,
    );

    expect(queryByTestId("menu-overlay")).toBeNull();
  });

  it("deve renderizar o conteúdo quando o menu estiver aberto", async () => {
    const { getByText, getByTestId } = await render(
      <MenuContext.Provider value={{ isOpen: true, setOpen }}>
        <MenuContent>
          <Text>Conteúdo do menu</Text>
        </MenuContent>
      </MenuContext.Provider>,
    );

    expect(getByText("Conteúdo do menu")).toBeTruthy();
    expect(getByTestId("menu-overlay")).toBeTruthy();
  });

  it("deve fechar o menu ao pressionar o overlay", async () => {
    const { getByTestId } = await render(
      <MenuContext.Provider value={{ isOpen: true, setOpen }}>
        <MenuContent>
          <Text>Conteúdo do menu</Text>
        </MenuContent>
      </MenuContext.Provider>,
    );

    await act(() => {
      fireEvent.press(getByTestId("menu-overlay"));
    });

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setOpen).toHaveBeenCalledTimes(1);
  });
});
