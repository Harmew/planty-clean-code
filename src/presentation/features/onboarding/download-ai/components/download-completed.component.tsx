import Animated, { FadeInDown } from "react-native-reanimated";

import { Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";

export function DownloadCompleted() {
  return (
    <>
      <Animated.View entering={FadeInDown.delay(40)}>
        <Icons.Bot size={100} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80)}>
        <Typography size={48} color="green500">
          Tudo pronto!
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120)}>
        <Typography>A IA está pronta para ajudar você a cuidar melhor das suas plantas, mesmo sem internet.</Typography>
      </Animated.View>
    </>
  );
}
