export type PermissionStatus = "granted" | "denied" | "undetermined" | "limited";

export interface Permissions {
  notifications: PermissionStatus;
  camera: PermissionStatus;
  gallery: PermissionStatus;
}
