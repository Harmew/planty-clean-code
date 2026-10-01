import { Image } from "expo-image";

// Presentation
import { Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";
import { CARE_MAP, CARE_TYPES, type CareType } from "../constants";

// Domain
import type { Care } from "@domain/entities/care.entity";
import { PlantWithCares } from "../types";

export function PlantCareCard({ plant }: Readonly<{ plant: PlantWithCares }>) {
  const { theme } = useTheme();

  return (
    <Surface style={{ padding: theme.spacings[12] }}>
      <Row align="center">
        <Image
          source={plant.image ? { uri: plant.image } : undefined}
          placeholder={require("@assets/images/placeholder.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: theme.radius[12],
            // @ts-expect-error - borderCurve não está nos tipos, mas funciona em runtime
            borderCurve: "continuous",
          }}
          contentFit="cover"
        />

        <Typography numberOfLines={1} style={{ flex: 1 }}>
          {plant.name}
        </Typography>
      </Row>

      <Row flex={1}>
        {CARE_TYPES.map((type) => (
          <CareTile key={type} type={type} care={plant.cares.find((care) => care.type === type)} />
        ))}
      </Row>
    </Surface>
  );
}

interface CareTileProps {
  type: CareType;
  care?: Care;
}

function CareTile({ type, care }: Readonly<CareTileProps>) {
  const { theme, dark } = useTheme();
  const { background, surfaceDisabled } = getThemeColors(dark);

  const enabled = !!care;
  const Icon = Icons[CARE_MAP[type].icon];

  return (
    <Surface
      wrapperStyle={{ flex: 1 }}
      style={{
        alignItems: "center",
        padding: theme.spacings[8],
        borderRadius: theme.radius[18],
        backgroundColor: background,
        opacity: enabled ? 1 : 0.8,
        gap: theme.spacings[4],
      }}
    >
      <Surface
        style={{
          padding: theme.spacings[8],
          borderRadius: theme.radius[18],
          backgroundColor: enabled ? theme.colors.green500 + "20" : surfaceDisabled + "10",
        }}
      >
        <Icon color={enabled ? "green500" : "gray500"} />
      </Surface>

      <Typography size={12} color="gray500">
        {care ? `${care.intervalDays} dias` : "-"}
      </Typography>
    </Surface>
  );
}
