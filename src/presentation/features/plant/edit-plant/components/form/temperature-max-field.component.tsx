import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type TextInput } from "react-native";

// Presentation
import { FormField } from "@presentation/components/form";
import { Icons } from "@presentation/components/svgs";

import type { Schema } from "../../schema";

interface TemperatureMaxFieldProps {
  inputRef: React.RefObject<TextInput | null>;
  nextRef: React.RefObject<TextInput | null>;
}

export function TemperatureMaxField({ inputRef, nextRef }: Readonly<TemperatureMaxFieldProps>) {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "temperatureMax",
  });

  return (
    <FormField isInvalid={fieldState.invalid}>
      <FormField.Label>Temperatura máxima</FormField.Label>

      <FormField.Input
        ref={inputRef}
        prefix={<Icons.ThermometerSun color="gray500" size={20} />}
        value={field.value}
        onChangeText={field.onChange}
        placeholder="Ex: 30°"
        accessibilityLabel="Temperatura máxima"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        returnKeyType="next"
        onSubmitEditing={() => nextRef?.current?.focus()}
      />

      <FormField.Error>{fieldState.error?.message}</FormField.Error>
      <FormField.Description>Temperatura máxima recomendada</FormField.Description>
    </FormField>
  );
}
