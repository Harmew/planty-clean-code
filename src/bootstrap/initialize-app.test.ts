import { initDatabase } from "@infra/database/database";
import { notificationService } from "@infra/notification/notification.service.impl";

import { initializeApp } from "./initialize-app";

jest.mock("@infra/database/database", () => ({
  initDatabase: jest.fn(),
}));

jest.mock("@infra/notification/notification.service.impl", () => ({
  notificationService: {
    initialize: jest.fn(),
  },
}));

describe("initializeApp", () => {
  it("inicializa o banco antes das notificações", async () => {
    await initializeApp();

    const mockedInitDatabase = jest.mocked(initDatabase);
    const mockedInitializeNotifications = jest.mocked(notificationService.initialize);

    expect(mockedInitDatabase).toHaveBeenCalledTimes(1);
    expect(mockedInitializeNotifications).toHaveBeenCalledTimes(1);

    expect(mockedInitDatabase.mock.invocationCallOrder[0]).toBeLessThan(
      mockedInitializeNotifications.mock.invocationCallOrder[0],
    );
  });
});
