jest.mock("@infra/notification/notificationServiceImpl", () => ({
  notificationService: {},
}));

jest.mock("@infra/permissions/permissionServiceImpl", () => ({
  permissionService: {},
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { asyncStorageMock } = require("@mocks/libs/asyncStorageMock");

  return {
    __esModule: true,
    default: asyncStorageMock,
  };
});

import { container } from "@di/container";

describe("container (DI)", () => {
  it("expõe todos os casos de uso já resolvidos", () => {
    expect(typeof container.getPlants).toBe("function");
    expect(typeof container.getPlantById).toBe("function");
    expect(typeof container.createPlant).toBe("function");
    expect(typeof container.updatePlant).toBe("function");
    expect(typeof container.deletePlant).toBe("function");
    expect(typeof container.generatePlantData).toBe("function");

    expect(typeof container.getCaresByPlant).toBe("function");
    expect(typeof container.createOrUpdateCares).toBe("function");
    expect(typeof container.deleteCaresByPlant).toBe("function");
    expect(typeof container.markCareAsDone).toBe("function");

    expect(typeof container.getCareHistoryByPlant).toBe("function");

    expect(typeof container.getNotifications).toBe("function");
    expect(typeof container.markNotificationAsRead).toBe("function");
    expect(typeof container.scheduleNotification).toBe("function");
    expect(typeof container.cancelNotificationsByCare).toBe("function");
    // expect(typeof container.cancelNotificationsByPlant).toBe("function");
    expect(typeof container.clearNotifications).toBe("function");
    expect(typeof container.cleanOldNotifications).toBe("function");

    expect(typeof container.importBackup).toBe("function");
    expect(typeof container.exportBackup).toBe("function");

    expect(typeof container.getPermissions).toBe("function");
    expect(typeof container.requestCameraPermission).toBe("function");
    expect(typeof container.requestGalleryPermission).toBe("function");
    expect(typeof container.requestNotificationPermission).toBe("function");
    expect(typeof container.openAppSettings).toBe("function");

    expect(typeof container.isOnboardingCompleted).toBe("function");
    expect(typeof container.completeOnboarding).toBe("function");
  });
});
