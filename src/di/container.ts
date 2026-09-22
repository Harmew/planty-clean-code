// camada: di — o único lugar autorizado a conhecer domain e repository ao
// mesmo tempo (que por sua vez conhece data e infra). É aqui que a
// arquitetura de 6 camadas é "montada": presentation ──► domain ◄── repository
// ──► data ──► infra.

// Plant Use Cases
import { GetPlants } from "@domain/usecases/plant/getPlants";
import { GetPlantById } from "@domain/usecases/plant/getPlantById";
import { CreatePlant } from "@domain/usecases/plant/createPlant";
import { UpdatePlant } from "@domain/usecases/plant/updatePlant";
import { DeletePlant } from "@domain/usecases/plant/deletePlant";

// Care Use Cases
import { GetCaresByPlant } from "@domain/usecases/care/getCaresByPlant";
import { CreateOrUpdateCares } from "@domain/usecases/care/createOrUpdateCares";
import { DeleteCaresByPlant } from "@domain/usecases/care/deleteCaresByPlant";
import { MarkCareAsDone } from "@domain/usecases/care/markCareAsDone";

// Care History Use Cases
import { GetCareHistoryByPlant } from "@domain/usecases/careHistory/getCareHistoryByPlant";

// Notification Use Cases
import { GetNotifications } from "@domain/usecases/notification/getNotifications";
import { MarkNotificationAsRead } from "@domain/usecases/notification/markNotificationAsRead";
import { ScheduleNotification } from "@domain/usecases/notification/scheduleNotification";
import { CancelNotificationsByCare } from "@domain/usecases/notification/cancelNotificationsByCare";
import { CancelNotificationsByPlant } from "@domain/usecases/notification/cancelNotificationsByPlant";
import { ClearNotifications } from "@domain/usecases/notification/clearNotifications";
import { CleanOldNotifications } from "@domain/usecases/notification/cleanOldNotifications";
import { GeneratePlantData } from "@domain/usecases/plant/generatePlantData";

// Backup Use Cases
import { ExportBackup } from "@domain/usecases/backup/exportBackup";
import { ImportBackup } from "@domain/usecases/backup/importBackup";

// Permissions Use Cases
import { GetPermissions } from "@domain/usecases/permission/getPermissions";
import { RequestCameraPermission } from "@domain/usecases/permission/requestCameraPermission";
import { RequestGalleryPermission } from "@domain/usecases/permission/requestGalleryPermission";
import { RequestNotificationPermission } from "@domain/usecases/permission/requestNotificationPermission";
import { OpenAppSettings } from "@domain/usecases/permission/openAppSettings";

// Onboarding Use Cases
import { CompleteOnboarding } from "@domain/usecases/onboarding/completeOnboarding";
import { IsOnboardingCompleted } from "@domain/usecases/onboarding/isOnboardingCompleted";

// Repositories
import { plantRepository } from "@data/repositories/plantRepositoryImpl";
import { careRepository } from "@data/repositories/careRepositoryImpl";
import { careHistoryRepository } from "@data/repositories/careHistoryRepositoryImpl";
import { notificationRepository } from "@data/repositories/notificationRepositoryImpl";

// Infra
import { imageStorage } from "@infra/storage/imageStorageImpl";
import { notificationService } from "@infra/notification/notificationServiceImpl";
import { backupStorage } from "@infra/storage/backupStorageImpl";
import { permissionService } from "@infra/permissions/permissionServiceImpl";
import { aiService } from "@infra/ai/aiServiceImpl";
import { onboardingStorage } from "@infra/storage/onboardingStorageImpl";

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

  getPermissions: GetPermissions(permissionService),
  requestCameraPermission: RequestCameraPermission(permissionService),
  requestGalleryPermission: RequestGalleryPermission(permissionService),
  requestNotificationPermission: RequestNotificationPermission(permissionService),
  openAppSettings: OpenAppSettings(permissionService),

  isOnboardingCompleted: IsOnboardingCompleted(onboardingStorage),
  completeOnboarding: CompleteOnboarding(onboardingStorage),
};
