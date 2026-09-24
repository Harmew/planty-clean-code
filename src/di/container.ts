// camada: di — o único lugar autorizado a conhecer domain e repository ao
// mesmo tempo (que por sua vez conhece data e infra). É aqui que a
// arquitetura de 6 camadas é "montada": presentation ──► domain ◄── repository
// ──► data ──► infra.

// Plant Use Cases
import { CreatePlant } from "@domain/usecases/plant/create-plant.usecase";
import { DeletePlant } from "@domain/usecases/plant/delete-plant.usecase";
import { GetPlantById } from "@domain/usecases/plant/get-plant-by-id.usecase";
import { GetPlants } from "@domain/usecases/plant/get-plants.usecase";
import { UpdatePlant } from "@domain/usecases/plant/update-plant.usecase";

// Care Use Cases
import { CreateOrUpdateCares } from "@domain/usecases/care/create-or-update-cares.usecase";
import { DeleteCaresByPlant } from "@domain/usecases/care/delete-cares-by-plant.usecase";
import { GetCaresByPlant } from "@domain/usecases/care/get-cares-by-plant.usecase";
import { MarkCareAsDone } from "@domain/usecases/care/mark-care-as-done.usecase";

// Care History Use Cases
import { GetCareHistoryByPlant } from "@domain/usecases/care-history/get-care-history-by-plant.usecase";

// Notification Use Cases
import { CancelNotificationsByCare } from "@domain/usecases/notification/cancel-notifications-by-care.usecase";
import { CancelNotificationsByPlant } from "@domain/usecases/notification/cancel-notifications-by-plant.usecase";
import { CleanOldNotifications } from "@domain/usecases/notification/clean-old-notifications.usecase";
import { ClearNotifications } from "@domain/usecases/notification/clear-notifications.usecase";
import { GetNotifications } from "@domain/usecases/notification/get-notifications.usecase";
import { MarkNotificationAsRead } from "@domain/usecases/notification/mark-notification-as-read.usecase";
import { ScheduleNotification } from "@domain/usecases/notification/schedule-notification.usecase";
import { GeneratePlantData } from "@domain/usecases/plant/generate-plant-data.usecase";

// Backup Use Cases
import { ExportBackup } from "@domain/usecases/backup/export-backup.usecase";
import { ImportBackup } from "@domain/usecases/backup/import-backup.usecase";

// Permissions Use Cases
import { GetPermissions } from "@domain/usecases/permissions/get-permissions.usecase";
import { OpenAppSettings } from "@domain/usecases/permissions/open-app-settings.usecase";
import { RequestCameraPermission } from "@domain/usecases/permissions/request-camera-permission.usecase";
import { RequestGalleryPermission } from "@domain/usecases/permissions/request-gallery-permission.usecase";
import { RequestNotificationPermission } from "@domain/usecases/permissions/request-notification-permission.usecase";

// Onboarding Use Cases
import { CompleteOnboarding } from "@domain/usecases/onboarding/complete-onboarding.usecase";
import { IsOnboardingCompleted } from "@domain/usecases/onboarding/is-onboarding-completed.usecase";

// Repositories
import { careHistoryRepository } from "@data/repositories/care-history.repository.impl";
import { careRepository } from "@data/repositories/care.repository.impl";
import { notificationRepository } from "@data/repositories/notification.repository.impl";
import { plantRepository } from "@data/repositories/plant.repository.impl";

// Infra
import { aiService } from "@infra/ai/ai.service.impl";
import { hapticsService } from "@infra/haptics/haptics.service.impl";
import { notificationService } from "@infra/notification/notification.service.impl";
import { permissionsService } from "@infra/permissions/permissions.service.impl";
import { backupStorage } from "@infra/storage/backup.storage.impl";
import { imageStorage } from "@infra/storage/image.storage.impl";
import { onboardingStorage } from "@infra/storage/onboarding.storage.impl";

export const container = {
  getPlants: GetPlants(plantRepository),
  getPlantById: GetPlantById(plantRepository),
  createPlant: CreatePlant(plantRepository, imageStorage),
  updatePlant: UpdatePlant(plantRepository, imageStorage),
  deletePlant: DeletePlant(
    plantRepository,
    imageStorage,
    CancelNotificationsByPlant(notificationRepository, notificationService),
  ),
  generatePlantData: GeneratePlantData(aiService),

  getCaresByPlant: GetCaresByPlant(careRepository),
  createOrUpdateCares: CreateOrUpdateCares(
    careRepository,
    GetPlantById(plantRepository),
    ScheduleNotification(notificationRepository, notificationService),
    CancelNotificationsByCare(notificationRepository, notificationService),
  ),
  deleteCaresByPlant: DeleteCaresByPlant(
    careRepository,
    CancelNotificationsByCare(notificationRepository, notificationService),
  ),
  markCareAsDone: MarkCareAsDone(
    careRepository,
    careHistoryRepository,
    GetPlantById(plantRepository),
    CancelNotificationsByCare(notificationRepository, notificationService),
    ScheduleNotification(notificationRepository, notificationService),
  ),

  getCareHistoryByPlant: GetCareHistoryByPlant(careHistoryRepository),

  getNotifications: GetNotifications(notificationRepository),
  markNotificationAsRead: MarkNotificationAsRead(notificationRepository),
  scheduleNotification: ScheduleNotification(notificationRepository, notificationService),
  cancelNotificationsByCare: CancelNotificationsByCare(notificationRepository, notificationService),
  clearNotifications: ClearNotifications(notificationRepository, notificationService),
  cleanOldNotifications: CleanOldNotifications(notificationRepository, notificationService),

  importBackup: ImportBackup(
    backupStorage,
    plantRepository,
    careRepository,
    careHistoryRepository,
    notificationRepository,
    imageStorage,
    notificationService,
  ),
  exportBackup: ExportBackup(
    backupStorage,
    plantRepository,
    careRepository,
    careHistoryRepository,
    notificationRepository,
    imageStorage,
  ),

  getPermissions: GetPermissions(permissionsService),
  requestCameraPermission: RequestCameraPermission(permissionsService),
  requestGalleryPermission: RequestGalleryPermission(permissionsService),
  requestNotificationPermission: RequestNotificationPermission(permissionsService),
  openAppSettings: OpenAppSettings(permissionsService),

  isOnboardingCompleted: IsOnboardingCompleted(onboardingStorage),
  completeOnboarding: CompleteOnboarding(onboardingStorage),

  hapticsService,
};
