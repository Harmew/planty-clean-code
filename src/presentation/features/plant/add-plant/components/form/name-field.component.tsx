import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type TextInput } from "react-native";

import { FormField } from "@presentation/components/form";
import { Icons } from "@presentation/components/svgs";

import type { Schema } from "../../schema";

interface NameFieldProps {
  inputRef: React.RefObject<TextInput | null>;
  nextRef: React.RefObject<TextInput | null>;
}

export function NameField({ inputRef, nextRef }: Readonly<NameFieldProps>) {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "name",
  });

  return (
    <FormField isRequired isInvalid={fieldState.invalid}>
      <FormField.Label>Nome</FormField.Label>

      <FormField.Input
        ref={inputRef}
        prefix={<Icons.Leaf color="gray500" size={20} />}
        value={field.value}
        onChangeText={field.onChange}
        placeholder="Ex: Samambaia"
        accessibilityLabel="Nome da planta"
        accessibilityHint="Campo obrigatório"
        returnKeyType="next"
        onSubmitEditing={() => nextRef?.current?.focus()}
      />

      <FormField.Error>{fieldState.error?.message}</FormField.Error>
    </FormField>
  );
}
