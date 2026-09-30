import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type TextInput } from "react-native";

// Presentation
import { FormField } from "@presentation/components/form";
import { Icons } from "@presentation/components/svgs";

import type { Schema } from "../../schema";

interface HumidityFieldProps {
  inputRef: React.RefObject<TextInput | null>;
}

export function HumidityField({ inputRef }: Readonly<HumidityFieldProps>) {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "humidity",
  });

  return (
    <FormField isInvalid={fieldState.invalid}>
      <FormField.Label>Umidade</FormField.Label>

      <FormField.Input
        ref={inputRef}
        prefix={<Icons.CloudDrizzle color="gray500" size={20} />}
        value={field.value}
        onChangeText={field.onChange}
        placeholder="Ex: 30%"
        accessibilityLabel="Umidade"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        returnKeyType="next"
      />

      <FormField.Error>{fieldState.error?.message}</FormField.Error>
      <FormField.Description>Nível de umidade ideal</FormField.Description>
    </FormField>
  );
}
