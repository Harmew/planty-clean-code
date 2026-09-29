import { View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Button, ProgressLine, Typography } from "@presentation/components/common";
import { ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { DownloadCompleted } from "./components/download-completed.component";
import { DownloadIntro } from "./components/download-intro.component";
import { DownloadProgress } from "./components/download-progress.component";
import { DownloadStatus, useDownloadAI } from "./hooks/use-download-ai";
import { createStyles } from "./styles";

const ACTION_BY_STATUS = {
  idle: { label: "Baixar IA", Icon: Icons.ArrowDown },
  error: { label: "Tentar novamente", Icon: Icons.RotateCCW },
  completed: { label: "Continuar", Icon: Icons.ArrowRight },
} as const;

function renderContent(status: DownloadStatus, progress: number) {
  switch (status) {
    case "idle":
      return <DownloadIntro />;
    case "downloading":
      return <DownloadProgress progress={progress} hasError={false} />;
    case "error":
      return <DownloadProgress progress={progress} hasError />;
    case "completed":
      return <DownloadCompleted />;
  }
}

export function DownloadAIScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { bottom: marginBottom } = useSafeAreaInsets();

  const { status, progress, startDownload, handleContinue } = useDownloadAI();

  const action = status === "downloading" ? null : ACTION_BY_STATUS[status];
  const handleActionPress = status === "completed" ? handleContinue : startDownload;

  return (
    <ScreenWrapper
      style={[styles.container, { marginBottom: getPlatformBottomSpacing(marginBottom, theme.spacings[18], false) }]}
    >
      <ProgressLine maxWidth={150} percentage={75} />

      <View style={styles.content}>{renderContent(status, progress)}</View>

      {action && (
        <Animated.View entering={FadeInRight.delay(240)}>
          <Button onPress={handleActionPress} style={{ alignSelf: "flex-end" }}>
            <Typography color="white">{action.label}</Typography>
            <action.Icon color="white" size={20} />
          </Button>
        </Animated.View>
      )}
    </ScreenWrapper>
  );
}
