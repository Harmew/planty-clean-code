import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { CARE_MAP } from "../constants";

// Domain
import type { Care } from "@domain/entities/care.entity";

interface CareSectionProps {
  cares: Care[];
  onUpdate: () => void;
}

export function CareSection({ cares, onUpdate }: Readonly<CareSectionProps>) {
  return (
    <>
      <Animated.View entering={FadeInDown.delay(120)}>
        <Typography size={18} weight={500}>
          Cuidados
        </Typography>
      </Animated.View>

      {cares.length === 0 ? (
        <Animated.View entering={FadeInDown.delay(160)}>
          <CareEmpty onPress={onUpdate} />
        </Animated.View>
      ) : (
        <>
          {cares.map((care, index) => (
            <Animated.View key={care.id} entering={FadeInDown.delay(Math.min(40 + index * 30, 200))}>
              <CareCard care={care} />
            </Animated.View>
          ))}

          <Animated.View entering={FadeInDown.delay(180)}>
            <Button size="sm" variant="secondary" onPress={onUpdate}>
              <Icons.Pencil size={20} tone="text" />
              {/* <Button.Label>Editar cuidados</Button.Label> */}
            </Button>
          </Animated.View>
        </>
      )}
    </>
  );
}

function CareCard({ care }: Readonly<{ care: Care }>) {
  const { theme } = useTheme();
  const { label, icon } = CARE_MAP[care.type];
  const Icon = Icons[icon];

  return (
    <Surface>
      <Row align="center">
        <Surface
          style={
            {
              // padding: theme.spacings.xs,
              // borderRadius: theme.borderRadius.md,
              // backgroundColor: theme.tokens.tint + "20",
            }
          }
        >
          <Icon />
        </Surface>
        <View style={{ flex: 1 }}>
          <Typography>{label}</Typography>
          <Typography variant="textSmall" tone="textSecondary">
            {/* A cada {care.interval_days} dias */}a
          </Typography>
        </View>
      </Row>
    </Surface>
  );
}

function CareEmpty({ onPress }: Readonly<{ onPress: () => void }>) {
  return (
    <Surface style={{ flex: 1 }}>
      <Icons.Leaf style={{ alignSelf: "center" }} />

      <Typography align="center">Nenhum cuidado cadastrado</Typography>

      <Typography align="center" size={14} color="gray500">
        Adicione os cuidados para começar a receber lembretes
      </Typography>

      <Button size="sm" style={{ alignSelf: "center" }} onPress={onPress}>
        <Icons.Plus size={20} color="white" />
        <Typography color="white">Adicionar</Typography>
      </Button>
    </Surface>
  );
}
