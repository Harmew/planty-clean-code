import { Linking } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";

import type { PermissionService } from "@domain/services/permissionService";

export const permissionService: PermissionService = {
  async getAll() {
    const notification = await Notifications.getPermissionsAsync();
    const camera = await ImagePicker.getCameraPermissionsAsync();
    const gallery = await ImagePicker.getMediaLibraryPermissionsAsync();

    return {
      notifications: notification.status,
      camera: camera.status,
      gallery: gallery.status,
    };
  },

  async requestNotifications() {
    const { status } = await Notifications.requestPermissionsAsync();

    return status === "granted";
  },

  async requestCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    return status === "granted";
  },

  async requestGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    return status === "granted";
  },

  openSettings() {
    Linking.openSettings();
  },
};
