import { act, renderHook } from "@testing-library/react-native";

import { Alert } from "react-native";

import { container } from "@di/container";

import { useLiveQuery } from "@presentation/hooks/use-live-query";

import { createNotification } from "@mocks/fixtures/notification.fixture";

import { useNotifications } from "./use-notifications";

jest.mock("@presentation/hooks/use-live-query", () => ({
  useLiveQuery: jest.fn(),
}));

jest.mock("@presentation/hooks/use-theme", () => ({
  useTheme: () => ({ dark: false }),
}));

describe("use-notifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useLiveQuery).mockImplementation((_key, query) => {
      void query();

      return {
        data: [
          createNotification({
            id: 1,
            scheduledFor: "2026-09-30T10:00:00.000Z",
          }),
          createNotification({
            id: 2,
            scheduledFor: "2099-09-30T10:00:00.000Z",
          }),
        ],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      };
    });

    jest.spyOn(container, "getNotifications").mockResolvedValue([]);

    jest.spyOn(container, "markNotificationAsRead").mockResolvedValue(undefined);
  });

  it("deve retornar apenas notificações que já venceram", async () => {
    const { result } = await renderHook(() => useNotifications());

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].id).toBe(1);
  });

  it("deve marcar a notificação como lida", async () => {
    const notification = createNotification();

    const { result } = await renderHook(() => useNotifications());

    await act(async () => {
      await result.current.handleMarkAsRead(notification);
    });

    expect(container.markNotificationAsRead).toHaveBeenCalledWith(notification.id);
  });

  it("não deve marcar uma notificação que já está lida", async () => {
    const notification = createNotification({
      read: true,
    });

    const { result } = await renderHook(() => useNotifications());

    await act(async () => {
      await result.current.handleMarkAsRead(notification);
    });

    expect(container.markNotificationAsRead).not.toHaveBeenCalled();
  });

  it("deve exibir a mensagem do erro ao falhar ao marcar como lida", async () => {
    jest.mocked(container.markNotificationAsRead).mockRejectedValue(new Error("Erro ao marcar notificação"));

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const notification = createNotification();

    const { result } = await renderHook(() => useNotifications());

    await act(async () => {
      await result.current.handleMarkAsRead(notification);
    });

    expect(alertSpy).toHaveBeenCalledWith(
      "Algo deu errado",
      "Erro ao marcar notificação",
      [{ text: "Entendi" }],
      expect.anything(),
    );
  });

  it("deve exibir uma mensagem padrão quando o erro não possui mensagem", async () => {
    jest.mocked(container.markNotificationAsRead).mockRejectedValue({});

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const notification = createNotification();

    const { result } = await renderHook(() => useNotifications());

    await act(async () => {
      await result.current.handleMarkAsRead(notification);
    });

    expect(alertSpy).toHaveBeenCalledWith(
      "Algo deu errado",
      "Ocorreu um erro inesperado",
      [{ text: "Entendi" }],
      expect.anything(),
    );
  });
});
