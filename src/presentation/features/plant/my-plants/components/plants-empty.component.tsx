import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";

type PlantsEmptyProps = {
  onAddPlantPress: () => void;
};

export function PlantsEmpty({ onAddPlantPress }: Readonly<PlantsEmptyProps>) {
  return (
    <Animated.View entering={FadeInDown.delay(120)}>
      <Surface style={{ flex: 1 }}>
        <Icons.Leaf style={{ alignSelf: "center" }} />

        <Typography align="center">Você ainda não tem plantas</Typography>

        <Typography align="center" size={14} color="gray500">
          Vamos começar adicionando a sua primeira planta e acompanhar os cuidados dela?
        </Typography>

        <Button size="sm" style={{ alignSelf: "center" }} onPress={onAddPlantPress}>
          <Icons.Plus size={20} color="white" />
          <Typography color="white">Adicionar</Typography>
        </Button>
      </Surface>
    </Animated.View>
  );
}

PlantsEmpty.displayName = "PlantsEmpty";
