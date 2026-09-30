import { useFormContext, useFormState } from "react-hook-form";

// Presentation
import { Button, Typography } from "@presentation/components/common";

import { Schema } from "../../schema";

interface SubmitButtonProps {
  onPress: () => void;
}

export function SubmitButton({ onPress }: Readonly<SubmitButtonProps>) {
  const { control } = useFormContext<Schema>();

  const { isSubmitting } = useFormState({
    control,
  });

  return (
    <Button isLoading={isSubmitting} onPress={onPress}>
      <Typography color="white">Adicionar planta</Typography>
    </Button>
  );
}
