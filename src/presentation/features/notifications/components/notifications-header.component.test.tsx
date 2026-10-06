import { act, fireEvent, render } from "@testing-library/react-native";

import { NotificationsHeader } from "./notifications-header.component";

describe("notifications-header-component", () => {
  it("deve renderizar o título", async () => {
    const { getByText } = await render(<NotificationsHeader />);

    expect(getByText("Notificações")).toBeTruthy();
  });

  it("deve exibir a informação sobre o prazo das notificações ao abrir o menu", async () => {
    const { getByRole, getByText } = await render(<NotificationsHeader />);

    await act(() => {
      fireEvent.press(
        getByRole("button", {
          name: "Botão de ação",
        }),
      );
    });

    expect(getByText("Notificações são mantidas por até 3 meses e depois são removidas automaticamente")).toBeTruthy();
  });
});
