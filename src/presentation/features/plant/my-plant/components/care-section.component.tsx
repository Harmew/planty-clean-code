import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { CARE_MAP } from "@shared/constants/care";
import { getIconTextColor, getSurfaceColor } from "@shared/utils/theme";

// Domain
import type { Care } from "@domain/entities/care.entity";

interface CareSectionProps {
  cares: Care[];
  onUpdate: () => void;
}

export function CareSection({ cares, onUpdate }: Readonly<CareSectionProps>) {
  const { dark } = useTheme();

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
            <Button size="sm" color={getSurfaceColor(dark)} onPress={onUpdate}>
              <Icons.Pencil size={20} color={getIconTextColor(dark)} />
              <Typography color="text">Editar cuidados</Typography>
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
          style={{
            padding: theme.spacings[8],
            borderRadius: theme.radius[18],
            backgroundColor: theme.colors.green500 + "20",
          }}
        >
          <Icon />
        </Surface>

        <View style={{ flex: 1 }}>
          <Typography>{label}</Typography>
          <Typography size={14} color="gray500">
            A cada {care.intervalDays}
            {care.intervalDays === 1 ? " dia" : " dias"}
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
