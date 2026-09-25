import { FormField } from "@presentation/components/form-field/form-field.component";
import { ScreenWrapper } from "@presentation/components/layout";

export function AddPlantScreen() {
  const fieldState = {
    invalid: false,
    error: {
      message: "Campo obrigatório",
    },
  };

  return (
    <ScreenWrapper style={{ padding: 16 }}>
      <FormField isInvalid={fieldState.invalid}>
        <FormField.Label>Temperatura máxima</FormField.Label>

        <FormField.Input placeholder="Digite a temperatura máxima" />

        <FormField.Error> {fieldState.error?.message} </FormField.Error>

        <FormField.Description>Temperatura máxima recomendada</FormField.Description>
      </FormField>
    </ScreenWrapper>
  );
}
