// Presentation
import { Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";

// Shared
import { CARE_MAP } from "@shared/constants/care";
import { formatDateTime } from "@shared/utils/date";

// Domain
import type { CareHistory } from "@domain/entities/care-history.entity";

export function CareHistoryItem({ item }: Readonly<{ item: CareHistory }>) {
  const { history: label, icon } = CARE_MAP[item.type];
  const Icon = Icons[icon];

  return (
    <Surface>
      <Row align="center">
        <Icon size={20} color="gray500" />

        <Row flex={1} justify="space-between">
          <Typography style={{ flex: 1 }} numberOfLines={1}>
            {label}
          </Typography>

          <Typography size={14} color="gray500" numberOfLines={1}>
            {formatDateTime(item.doneAt)}
          </Typography>
        </Row>
      </Row>
    </Surface>
  );
}
