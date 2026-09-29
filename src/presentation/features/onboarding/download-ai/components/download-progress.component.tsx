import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ProgressLine, Typography } from "@presentation/components/common";
import { useTheme } from "@presentation/hooks/use-theme";

interface DownloadProgressProps {
  progress: number;
  hasError: boolean;
}

export function DownloadProgress({ progress, hasError }: Readonly<DownloadProgressProps>) {
  const { theme } = useTheme();

  return (
    <>
      <Animated.View entering={FadeInDown.delay(40)}>
        <Typography size={48} color="green500">
          Preparando a{"\n"}IA...
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120)}>
        <Typography align="center">Estamos baixando a IA para o seu celular</Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(160)}>
        <View style={{ gap: theme.spacings[8], marginHorizontal: theme.spacings[20] * 2 }}>
          <ProgressLine percentage={progress} />
          <Typography align="center">{progress.toFixed(2)}%</Typography>
        </View>
      </Animated.View>

      {hasError ? (
        <Animated.View entering={FadeInDown.delay(0)}>
          <Typography>Não foi possível baixar a IA. Tente novamente</Typography>
        </Animated.View>
      ) : null}
    </>
  );
}
