import { Typography } from "@presentation/components/common";
import { ScreenWrapper } from "@presentation/components/layout";
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import { createStyles } from "./styles";
import type { BootErrorScreenProps } from "./types";

export function BootErrorScreen({ error }: Readonly<BootErrorScreenProps>) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <ScreenWrapper style={styles.container}>
      <Typography align="center" size={18} weight={600} color="red500">
        Não foi possível iniciar o aplicativo
      </Typography>
      <Typography align="center" size={16}>
        Ocorreu um problema durante a inicialização.
      </Typography>
      {error?.message ? (
        <Typography align="center" size={14}>
          {error.message}
        </Typography>
      ) : null}
    </ScreenWrapper>
  );
}
