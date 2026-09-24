import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import type { Backup } from "@domain/entities/backup.entity";
import type { BackupStorage } from "@domain/storage/backup.storage";

import { backupCrypto } from "@infra/crypto/backup-crypto";

export const backupStorage: BackupStorage = {
  async export(backup, password) {
    const data = JSON.stringify(backup);

    const encryptedData = await backupCrypto.encrypt(data, password);

    const fileName = `planty-backup-${Date.now()}.json`;
    const file = new File(Paths.cache, fileName);

    file.write(encryptedData);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, {
        mimeType: "application/json",
        dialogTitle: "Exportar backup",
        UTI: "public.json",
      });
    }
  },

  async import(password) {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return null;
    }

    const file = new File(result.assets[0].uri);
    const encryptedData = await file.text();

    const decryptedData = await backupCrypto.decrypt(encryptedData, password);

    return JSON.parse(decryptedData) as Backup;
  },
};
