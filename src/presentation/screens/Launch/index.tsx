import { ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";

import { createStyles } from "./styles";

export function LaunchScreen() {
  const styles = createStyles();

  return (
    <ScreenWrapper style={styles.container}>
      <Icons.PlantIntro size={150} />
    </ScreenWrapper>
  );
}
