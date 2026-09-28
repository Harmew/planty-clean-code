import { useFormContext, useFormState } from "react-hook-form";

import { Button, Typography } from "@presentation/components/common";

import { Schema } from "../../schema";

interface SubmitButtonProps {
  label: string;
  onPress: () => void;
}

export function SubmitButton({ onPress, label }: Readonly<SubmitButtonProps>) {
  const { control } = useFormContext<Schema>();

  const { isSubmitting } = useFormState({
    control,
  });

  return (
    <Button isLoading={isSubmitting} onPress={onPress}>
      <Typography color="white">{label}</Typography>
    </Button>
  );
}
