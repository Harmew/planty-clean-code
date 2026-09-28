import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type TextInput } from "react-native";

import { FormField } from "@presentation/components/form";
import { Icons } from "@presentation/components/svgs";

import type { Schema } from "../../schema";

interface TemperatureMinFieldProps {
  inputRef: React.RefObject<TextInput | null>;
  nextRef: React.RefObject<TextInput | null>;
}

export function TemperatureMinField({ inputRef, nextRef }: Readonly<TemperatureMinFieldProps>) {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "temperatureMin",
  });

  return (
    <FormField isInvalid={fieldState.invalid}>
      <FormField.Label>Temperatura mínima</FormField.Label>

      <FormField.Input
        ref={inputRef}
        prefix={<Icons.ThermometerSnowflake color="gray500" size={20} />}
        value={field.value}
        onChangeText={field.onChange}
        placeholder="Ex: 1°"
        accessibilityLabel="Temperatura mínima"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        returnKeyType="next"
        onSubmitEditing={() => nextRef?.current?.focus()}
      />

      <FormField.Error>{fieldState.error?.message}</FormField.Error>
      <FormField.Description>Temperatura mínima recomendada</FormField.Description>
    </FormField>
  );
}
