import { fireEvent, render } from "@testing-library/react-native";

import { createNotification } from "@mocks/fixtures/notification.fixture";

import { useNotifications } from "./hooks/use-notifications";
import { NotificationsScreen, renderNotificationItem } from "./notifications.component";

jest.mock("./hooks/use-notifications", () => ({
  useNotifications: jest.fn(),
}));

describe("notifications-screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useNotifications).mockReturnValue({
      notifications: [],
      isLoading: false,
      handleMarkAsRead: jest.fn(),
    });
  });

  it("deve renderizar o cabeçalho da tela", async () => {
    const { getByText } = await render(<NotificationsScreen />);

    expect(getByText("Notificações")).toBeTruthy();
  });

  it("deve renderizar o estado vazio quando não estiver carregando", async () => {
    const { getByText } = await render(<NotificationsScreen />);

    expect(getByText("Nenhuma notificação no momento")).toBeTruthy();
  });

  it("não deve renderizar o estado vazio enquanto estiver carregando", async () => {
    jest.mocked(useNotifications).mockReturnValue({
      notifications: [],
      isLoading: true,
      handleMarkAsRead: jest.fn(),
    });

    const { queryByText } = await render(<NotificationsScreen />);

    expect(queryByText("Nenhuma notificação no momento")).toBeNull();
  });

  it("deve renderizar as notificações", async () => {
    const notifications = [
      createNotification({
        id: 1,
        title: "Hora de regar",
      }),
      createNotification({
        id: 2,
        title: "Hora de adubar",
        type: "fertilize",
      }),
    ];

    jest.mocked(useNotifications).mockReturnValue({
      notifications,
      isLoading: false,
      handleMarkAsRead: jest.fn(),
    });

    const { getByText } = await render(<NotificationsScreen />);

    expect(getByText("Hora de regar")).toBeTruthy();
    expect(getByText("Hora de adubar")).toBeTruthy();
  });

  it("deve chamar handleMarkAsRead ao pressionar uma notificação", async () => {
    const notification = createNotification({
      title: "Hora de regar",
      read: false,
    });
    const handleMarkAsRead = jest.fn();

    jest.mocked(useNotifications).mockReturnValue({
      notifications: [notification],
      isLoading: false,
      handleMarkAsRead,
    });

    const { getByText } = await render(<NotificationsScreen />);

    fireEvent.press(getByText(notification.title));

    expect(handleMarkAsRead).toHaveBeenCalledWith(notification);
  });

  it("deve renderizar sem animação notificações após o limite", async () => {
    const notification = createNotification({
      id: 11,
      title: "Notificação 11",
    });

    const { getByText } = await render(renderNotificationItem(notification, 10, jest.fn()));

    expect(getByText("Notificação 11")).toBeTruthy();
  });
});
