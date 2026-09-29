import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Typography } from "@presentation/components/common";

export function DownloadIntro() {
  return (
    <>
      <Animated.View entering={FadeInDown.delay(40)}>
        <Typography size={48} color="green500">
          Uma IA para{"\n"}cuidar das suas plantas
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80)}>
        <Typography>
          A IA do Planty pode ajudar você a descobrir as necessidades das suas plantas, como luminosidade, umidade e
          temperatura.
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120)}>
        <Typography>Baixe uma vez e use a IA mesmo quando estiver sem internet.</Typography>
      </Animated.View>
    </>
  );
}
