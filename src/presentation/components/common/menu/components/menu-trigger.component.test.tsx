import { Text } from "react-native";

import { act, fireEvent, render } from "@testing-library/react-native";

import { MenuContext } from "../menu.context";
import { MenuTrigger } from "./menu-trigger.component";

describe("MenuTrigger", () => {
  const setOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o conteúdo", async () => {
    const { getByText } = await render(
      <MenuContext.Provider value={{ isOpen: false, setOpen }}>
        <MenuTrigger>
          <Text>Menu</Text>
        </MenuTrigger>
      </MenuContext.Provider>,
    );

    expect(getByText("Menu")).toBeTruthy();
  });

  it("deve abrir o menu ao pressionar o botão", async () => {
    const { getByText } = await render(
      <MenuContext.Provider value={{ isOpen: false, setOpen }}>
        <MenuTrigger>
          <Text>Menu</Text>
        </MenuTrigger>
      </MenuContext.Provider>,
    );

    await act(() => {
      fireEvent.press(getByText("Menu"));
    });

    expect(setOpen).toHaveBeenCalledWith(true);
    expect(setOpen).toHaveBeenCalledTimes(1);
  });
});
