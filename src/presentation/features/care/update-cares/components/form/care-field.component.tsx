import { useController, useFormContext } from "react-hook-form";

// Presentation
import { Row, Surface, Switch, Typography } from "@presentation/components/common";
import { FormField } from "@presentation/components/form";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getIconTextColor, getThemeColors } from "@shared/utils/theme";

import { CARE_MAP, type CareType } from "../../constants";
import type { Schema } from "../../schema";

const onlyNumbers = (text: string) => text.replace(/\D/g, "");

interface CareFieldProps {
  name: CareType;
}

export function CareField({ name }: Readonly<CareFieldProps>) {
  const { theme, dark } = useTheme();
  const { background, surfaceDisabled } = getThemeColors(dark);

  const { control, setValue } = useFormContext<Schema>();
  const { field: enabledField } = useController({ control, name: `${name}.enabled` });
  const { field: intervalField, fieldState: intervalState } = useController({ control, name: `${name}.interval_days` });

  const enabled = enabledField.value;

  const { label, icon } = CARE_MAP[name];
  const Icon = Icons[icon];

  const iconBackground = enabled ? theme.colors.green500 + "20" : surfaceDisabled;

  const handleToggle = (value: boolean) => {
    enabledField.onChange(value);

    // Ao desabilitar, limpa o intervalo para não deixar dado inconsistente
    if (!value) {
      setValue(`${name}.interval_days`, "", { shouldValidate: true });
    }
  };

  return (
    <Surface>
      <Row justify="space-between" align="center">
        <Row flex={1} align="center">
          <Surface
            style={{ padding: theme.spacings[8], borderRadius: theme.radius[18], backgroundColor: iconBackground }}
          >
            <Icon color={enabled ? "green500" : getIconTextColor(dark)} />
          </Surface>
          <Typography color={enabled ? "text" : "gray500"}>{label}</Typography>
        </Row>

        <Switch isSelected={enabled} onSelectedChange={handleToggle} />
      </Row>

      <FormField isRequired={enabled} isDisabled={!enabled} isInvalid={intervalState.invalid}>
        <FormField.Input
          style={{ backgroundColor: background }}
          prefix={<Icons.CalendarDays color="gray500" size={20} />}
          value={intervalField.value}
          onChangeText={(text) => intervalField.onChange(onlyNumbers(text))}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          placeholder="Ex: 2 dias"
          accessibilityLabel={`Intervalo em dias para ${label.toLowerCase()}`}
        />

        <FormField.Error>{intervalState.error?.message}</FormField.Error>
      </FormField>
    </Surface>
  );
}
