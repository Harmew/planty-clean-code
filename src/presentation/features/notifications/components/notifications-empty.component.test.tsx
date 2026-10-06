import { render } from "@testing-library/react-native";

import { NotificationsEmpty } from "./notifications-empty.component";

describe("notifications-empty-component", () => {
  it("deve renderizar a mensagem de notificações vazias", async () => {
    const { getByText } = await render(<NotificationsEmpty />);

    expect(getByText("Nenhuma notificação no momento")).toBeTruthy();
  });
});
