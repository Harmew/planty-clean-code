import { fireEvent, render } from "@testing-library/react-native";

import { createNotification } from "@mocks/fixtures/notification.fixture";

import { NotificationItem } from "./notification-item.component";

describe("notification-item-component", () => {
  it("deve renderizar os dados da notificação", async () => {
    const notification = createNotification({
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
    });

    const { getByText } = await render(<NotificationItem notification={notification} onPress={jest.fn()} />);

    expect(getByText("Hora de regar")).toBeTruthy();
    expect(getByText("A planta Jiboia precisa de água!")).toBeTruthy();
  });

  it("deve chamar onPress ao pressionar uma notificação não lida", async () => {
    const notification = createNotification({
      read: false,
    });
    const onPress = jest.fn();

    const { getByText } = await render(<NotificationItem notification={notification} onPress={onPress} />);

    fireEvent.press(getByText(notification.title));

    expect(onPress).toHaveBeenCalledWith(notification);
  });

  it("não deve chamar onPress ao pressionar uma notificação lida", async () => {
    const notification = createNotification({
      read: true,
    });
    const onPress = jest.fn();

    const { getByText } = await render(<NotificationItem notification={notification} onPress={onPress} />);

    fireEvent.press(getByText(notification.title));

    expect(onPress).not.toHaveBeenCalled();
  });
});
