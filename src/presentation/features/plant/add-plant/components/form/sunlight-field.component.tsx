import { useController, useFormContext } from "react-hook-form";

import { FormField } from "@presentation/components/form";
import type { SelectOption } from "@presentation/components/form/types";
import { Icons } from "@presentation/components/svgs";

import type { Schema } from "../../schema";

interface SunlightFieldProps {
  options?: SelectOption<string>[];
}

export function SunlightField({ options = [] }: Readonly<SunlightFieldProps>) {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "sunlight",
  });

  return (
    <FormField isRequired isInvalid={fieldState.invalid}>
      <FormField.Label>Luz Solar</FormField.Label>

      <FormField.Select
        icon={<Icons.Sun color="gray500" size={20} />}
        value={field.value}
        onChange={field.onChange}
        options={options}
        placeholder="Selecione uma opção"
      />

      <FormField.Error>{fieldState.error?.message}</FormField.Error>
      <FormField.Description>Quantidade de luz solar que sua planta recebe</FormField.Description>
    </FormField>
  );
}
