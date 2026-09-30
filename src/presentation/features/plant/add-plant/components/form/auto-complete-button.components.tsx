import { useFormContext, useFormState } from "react-hook-form";

// Presentation
import { Button, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getSurfaceColor } from "@shared/utils/theme";

import { Schema } from "../../schema";

interface AutoCompleteButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export function AutoCompleteButton({ onPress, isLoading }: Readonly<AutoCompleteButtonProps>) {
  const { dark } = useTheme();
  const { control } = useFormContext<Schema>();

  const { isSubmitting } = useFormState({
    control,
  });

  return (
    <Button disabled={isSubmitting} onPress={onPress} isLoading={isLoading} color={getSurfaceColor(dark)}>
      <Icons.Sparkles color="green500" size={20} />
      <Typography color="green500">Auto Completar</Typography>
    </Button>
  );
}
