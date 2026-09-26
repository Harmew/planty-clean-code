import { Surface } from "@presentation/components/common";
import { FormField } from "@presentation/components/form";
import { ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import React from "react";

export function AddPlantScreen() {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const fieldState = {
    invalid: true,
    error: {
      message: "Campo obrigatório",
    },
  };

  const selectfieldState = {
    invalid: false,
    error: {
      message: "Campo obrigatório",
    },
  };

  return (
    <ScreenWrapper style={{ padding: 16, gap: 16 }}>
      <Surface>
        <FormField isInvalid={selectfieldState.invalid} isRequired>
          <FormField.Label>Temperatura máxima</FormField.Label>

          <FormField.Select
            value={value}
            onChange={setValue}
            options={[
              { label: "Sol plenoSol pleno Sol pleno Sol pleno Sol pleno Sol pleno Sol pleno", value: "full-sun" },
              { label: "Meio-sombra", value: "partial-shade" },
              { label: "SombraSol plenoSol plenoSol plenoSol pleno", value: "shade" },
            ]}
            placeholder="Selecione uma opção"
            icon={<Icons.Sun size={20} />}
          />

          <FormField.Description>Temperatura máxima recomendada</FormField.Description>
          <FormField.Error> {selectfieldState.error?.message} </FormField.Error>
        </FormField>
      </Surface>

      <Surface>
        <FormField isInvalid={fieldState.invalid} isDisabled isRequired>
          <FormField.Label>Temperatura máxima</FormField.Label>

          <FormField.Input prefix={<Icons.ThermometerSun size={20} />} keyboardType="numeric" placeholder="Ex: 30°" />

          <FormField.Description>Temperatura máxima recomendada</FormField.Description>
          <FormField.Error> {fieldState.error?.message} </FormField.Error>
        </FormField>
      </Surface>
    </ScreenWrapper>
  );
}
