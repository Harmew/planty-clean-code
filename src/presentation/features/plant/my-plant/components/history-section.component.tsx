import { useRouter } from "expo-router";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { CARE_MAP } from "../constants";

// Domain
import type { CareHistory } from "@domain/entities/care-history.entity";

interface HistorySectionProps {
  plantId: number;
  history: CareHistory[];
}

export function HistorySection({ plantId, history }: Readonly<HistorySectionProps>) {
  const { theme } = useTheme();
  const router = useRouter();

  const latest = history[0];

  const handleOpenFullHistory = () => {
    router.push({ pathname: "/plant-history", params: { id: plantId } });
  };

  return (
    <>
      <Animated.View entering={FadeInDown.delay(220)}>
        <Typography size={18} weight={500}>
          Histórico
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(260)}>
        {latest ? (
          <View
            style={
              {
                //gap: theme.spacings.lg
              }
            }
          >
            <HistoryItem item={latest} />

            <Button size="sm" variant="secondary" onPress={handleOpenFullHistory}>
              <Icons.Clock size={20} tone="text" />
              {/* <Button.Label>Ver histórico completo</Button.Label> */}
            </Button>
          </View>
        ) : (
          <HistoryEmpty />
        )}
      </Animated.View>
    </>
  );
}

function HistoryItem({ item }: Readonly<{ item: CareHistory }>) {
  const { history: label, icon } = CARE_MAP[item.type];
  const Icon = Icons[icon];

  return (
    <Surface>
      <Row align="center">
        <Icon size={20} tone="textSecondary" />
        <Row flex={1} justify="space-between">
          <Typography flex={1} numberOfLines={1}>
            {label}
          </Typography>
          <Typography variant="textSmall" tone="textSecondary">
            {/* {dayjs(item.done_at).format("DD/MM/YYYY [às] HH:mm")} */}
          </Typography>
        </Row>
      </Row>
    </Surface>
  );
}

function HistoryEmpty() {
  return (
    <Surface>
      <Typography align="center">Sem histórico de cuidados</Typography>
      <Typography align="center" size={14} color="gray500">
        Comece a cuidar da sua planta e consulte o histórico aqui
      </Typography>
    </Surface>
  );
}
