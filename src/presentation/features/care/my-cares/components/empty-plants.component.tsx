import React from "react";

// Presentation
import { Button, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";

interface EmptyPlantsProps {
  onAdd: () => void;
}

export const EmptyPlants = React.memo(function EmptyPlants({ onAdd }: Readonly<EmptyPlantsProps>) {
  return (
    <Surface>
      <Icons.Leaf style={{ alignSelf: "center" }} />
      <Typography align="center">Você ainda não tem plantas</Typography>
      <Typography align="center" size={14} color="gray500">
        Vamos começar adicionando a sua primeira planta?
      </Typography>
      <Button size="sm" style={{ alignSelf: "center" }} onPress={onAdd}>
        <Icons.Plus size={20} color="white" />
        <Typography color="white">Adicionar</Typography>
      </Button>
    </Surface>
  );
});
