import React from "react";
import { View } from "react-native";

// Presentation
import { Button, Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";
import type { PendingCare } from "../utils/pending-cares";

// Shared
import { CARE_MAP } from "@shared/constants/care";
import { getThemeColors } from "@shared/utils/theme";

type Status = "overdue" | "today" | "tomorrow";

const getStatus = (item: PendingCare): Status => {
  if (item.isOverdue) return "overdue";
  if (item.isToday) return "today";
  return "tomorrow";
};

interface PendingCaresProps {
  pendingCares: PendingCare[];
  onMarkAsDone: (item: PendingCare) => void;
}

export const PendingCares = React.memo(function PendingCares({ pendingCares, onMarkAsDone }: Readonly<PendingCaresProps>) {
  if (pendingCares.length === 0) {
    return (
      <Surface>
        <Typography align="center">Nenhum cuidado para hoje</Typography>
      </Surface>
    );
  }

  return (
    <Surface>
      {pendingCares.map((item) => (
        <PendingItem key={`${item.plantId}-${item.type}`} item={item} onMarkAsDone={onMarkAsDone} />
      ))}
    </Surface>
  );
});

interface PendingItemProps {
  item: PendingCare;
  onMarkAsDone: (item: PendingCare) => void;
}

const PendingItem = React.memo(function PendingItem({ item, onMarkAsDone }: Readonly<PendingItemProps>) {
  const { theme, dark } = useTheme();
  const { surfaceDisabled } = getThemeColors(dark);

  const { label: careLabel, icon } = CARE_MAP[item.type];
  const Icon = Icons[icon];

  const status = getStatus(item);

  const STATUS = {
    overdue: { label: "Atrasado", iconColor: "red500", background: theme.colors.red500 + "20" },
    today: { label: "Hoje", iconColor: "green500", background: theme.colors.green500 + "20" },
    tomorrow: { label: "Amanhã", iconColor: "gray500", background: surfaceDisabled },
  } as const;

  const { label, iconColor, background } = STATUS[status];
  const isActionable = status !== "tomorrow";

  return (
    <Row align="center" justify="space-between">
      <Row align="center" flex={1}>
        <Surface style={{ padding: theme.spacings[8], borderRadius: theme.radius[18], backgroundColor: background }}>
          <Icon color={iconColor} />
        </Surface>

        <View style={{ flex: 1 }}>
          <Typography numberOfLines={1}>
            {careLabel} {item.plantName}
          </Typography>
          <Typography size={14} color="gray500">
            {label}
          </Typography>
        </View>
      </Row>

      {isActionable && (
        <Button size="sm" onPress={() => onMarkAsDone(item)}>
          <Typography color="white">Concluir</Typography>
        </Button>
      )}
    </Row>
  );
});
