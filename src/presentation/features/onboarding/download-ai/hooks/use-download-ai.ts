import { useRouter } from "expo-router";
import React from "react";

// DI
import { container } from "@di/container";

export type DownloadStatus = "idle" | "downloading" | "completed" | "error";

export function useDownloadAI() {
  const router = useRouter();

  const [status, setStatus] = React.useState<DownloadStatus>("idle");
  const [progress, setProgress] = React.useState<number>(0);

  const startDownload = React.useCallback(async () => {
    if (status === "downloading") return;

    setProgress(0);
    setStatus("downloading");

    try {
      await container.downloadAIModel(setProgress);
      setStatus("completed");
    } catch {
      setStatus("error");
    }
  }, [status]);

  const handleContinue = React.useCallback(() => {
    router.replace("/(onboarding)/all-right");
  }, [router]);

  return { status, progress, startDownload, handleContinue };
}
