import { Image } from "expo-image";
import { View } from "react-native";

// Presentation
import { Row, Surface, Typography } from "@presentation/components/common";
import { useTheme } from "@presentation/hooks/use-theme";

// Domain
import type { Plant } from "@domain/entities/plant.entity";

type PlantCardProps = {
  plant: Plant;
};

export function PlantCard({ plant }: Readonly<PlantCardProps>) {
  const { theme } = useTheme();

  return (
    <Surface>
      <Row align="center">
        <Image
          source={plant.image ? { uri: plant.image } : undefined}
          placeholder={require("@assets/images/placeholder.png")}
          style={{
            alignSelf: "center",
            width: 120,
            height: 120,
            borderRadius: theme.radius[18],
            // @ts-expect-error - borderCurve não está nos tipos, mas funciona em runtime
            borderCurve: "continuous",
          }}
        />
        <View style={{ flex: 1 }}>
          <Typography size={24} weight={500}>
            {plant.name}
          </Typography>
          <Typography color="gray500">{plant.location || "-"}</Typography>
        </View>
      </Row>
    </Surface>
  );
}
