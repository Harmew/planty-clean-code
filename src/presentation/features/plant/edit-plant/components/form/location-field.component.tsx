import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type TextInput } from "react-native";

// Presentation
import { FormField } from "@presentation/components/form";
import { Icons } from "@presentation/components/svgs";

import type { Schema } from "../../schema";

interface LocationFieldProps {
  inputRef: React.RefObject<TextInput | null>;
}

export function LocationField({ inputRef }: Readonly<LocationFieldProps>) {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "location",
  });

  return (
    <FormField isRequired isInvalid={fieldState.invalid}>
      <FormField.Label>Localização</FormField.Label>

      <FormField.Input
        ref={inputRef}
        prefix={<Icons.MapPinHouse color="gray500" size={20} />}
        value={field.value}
        onChangeText={field.onChange}
        placeholder="Ex: Varanda"
        accessibilityLabel="Localização da planta"
        accessibilityHint="Campo obrigatório"
        returnKeyType="next"
      />

      <FormField.Error>{fieldState.error?.message}</FormField.Error>
      <FormField.Description>Onde sua planta está localizada</FormField.Description>
    </FormField>
  );
}
