import { useController, useFormContext } from "react-hook-form";

// Presentation
import { ImageUploader } from "@presentation/components/common";
import { FormField } from "@presentation/components/form";

import type { Schema } from "../../schema";

export function ImageUriField() {
  const { control } = useFormContext<Schema>();

  const { field, fieldState } = useController({
    control,
    name: "imageUri",
  });

  return (
    <FormField isRequired isInvalid={fieldState.invalid}>
      <ImageUploader file={field.value} onSelect={field.onChange} onClear={() => field.onChange(null)} />
    </FormField>
  );
}
