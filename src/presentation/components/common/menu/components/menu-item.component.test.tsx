import { act, fireEvent, render } from "@testing-library/react-native";

import { Text } from "react-native";

import { MenuContext } from "../menu.context";
import { MenuItem } from "./menu-item.component";

describe("MenuItem", () => {
  const setOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o conteúdo", async () => {
    const { getByText } = await render(
      <MenuContext.Provider value={{ isOpen: true, setOpen }}>
        <MenuItem>
          <Text>Editar</Text>
        </MenuItem>
      </MenuContext.Provider>,
    );

    expect(getByText("Editar")).toBeTruthy();
  });

  it("deve chamar onPress e fechar o menu", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <MenuContext.Provider value={{ isOpen: true, setOpen }}>
        <MenuItem onPress={onPress}>
          <Text>Editar</Text>
        </MenuItem>
      </MenuContext.Provider>,
    );

    await act(() => {
      fireEvent.press(getByTestId("menu-item"));
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setOpen).toHaveBeenCalledTimes(1);
  });

  it("deve fechar o menu mesmo sem onPress", async () => {
    const { getByTestId } = await render(
      <MenuContext.Provider value={{ isOpen: true, setOpen }}>
        <MenuItem>
          <Text>Editar</Text>
        </MenuItem>
      </MenuContext.Provider>,
    );

    await act(() => {
      fireEvent.press(getByTestId("menu-item"));
    });

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setOpen).toHaveBeenCalledTimes(1);
  });
});
