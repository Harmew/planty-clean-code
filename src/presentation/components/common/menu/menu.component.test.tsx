import { act, fireEvent, render } from "@testing-library/react-native";

import { Text } from "react-native";

import { Menu } from "./menu.component";

describe("Menu", () => {
  it("deve disponibilizar os componentes do Menu", () => {
    expect(Menu.Trigger).toBeTruthy();
    expect(Menu.Content).toBeTruthy();
    expect(Menu.Item).toBeTruthy();
  });

  it("deve compartilhar o estado de abertura entre Trigger e Content", async () => {
    const { getByText, queryByTestId } = await render(
      <Menu>
        <Menu.Trigger>
          <Text>Opções</Text>
        </Menu.Trigger>

        <Menu.Content>
          <Menu.Item>
            <Text>Editar</Text>
          </Menu.Item>
        </Menu.Content>
      </Menu>,
    );

    expect(queryByTestId("menu-overlay")).toBeNull();

    await act(() => {
      fireEvent.press(getByText("Opções"));
    });

    expect(queryByTestId("menu-overlay")).toBeTruthy();
    expect(getByText("Editar")).toBeTruthy();
  });

  it("deve fechar o menu ao pressionar o item", async () => {
    const { getByText, queryByTestId } = await render(
      <Menu>
        <Menu.Trigger>
          <Text>Opções</Text>
        </Menu.Trigger>

        <Menu.Content>
          <Menu.Item>
            <Text>Editar</Text>
          </Menu.Item>
        </Menu.Content>
      </Menu>,
    );

    await act(() => {
      fireEvent.press(getByText("Opções"));
    });

    expect(queryByTestId("menu-overlay")).toBeTruthy();

    await act(() => {
      fireEvent.press(getByText("Editar"));
    });

    expect(queryByTestId("menu-overlay")).toBeNull();
  });
});
