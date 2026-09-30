import { View } from "react-native";

// Presentation
import { Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { formatHumidityLabel, formatSunlightLabel, formatTemperatureRange } from "@shared/utils/text";

// Domain
import type { Plant } from "@domain/entities/plant.entity";

type PlantInfoProps = {
  plant: Plant;
};

export function PlantInfo({ plant }: Readonly<PlantInfoProps>) {
  const { theme } = useTheme();

  const tiles = [
    {
      key: "sunlight",
      Icon: Icons.Sun,
      color: theme.colors.yellow500,
      label: formatSunlightLabel(plant.sunlight),
    },
    {
      key: "temperature",
      Icon: Icons.Thermometer,
      color: theme.colors.green500,
      label: formatTemperatureRange(plant.temperatureMin, plant.temperatureMax),
    },
    {
      key: "humidity",
      Icon: Icons.Droplet,
      color: theme.colors.blue500,
      label: formatHumidityLabel(plant.humidity),
    },
  ];

  return (
    <Row flex={1} gap={12}>
      {tiles.map(({ key, Icon, color, label }) => (
        <Surface
          key={key}
          wrapperStyle={{ flex: 1 }}
          style={{ backgroundColor: color, borderRadius: theme.radius[18] }}
        >
          <View style={{ alignItems: "center", gap: theme.spacings[12] }}>
            <Icon color="white" />
            <Typography color="white" adjustsFontSizeToFit>
              {label}
            </Typography>
          </View>
        </Surface>
      ))}
    </Row>
  );
}
