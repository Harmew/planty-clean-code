import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Domain
import { CareInput } from "@domain/usecases/care/create-or-update-cares.usecase";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { CARE_TYPES } from "@shared/constants/care";
import { getAlertOptions } from "@shared/utils/alert";

// Domain
import type { Care } from "@domain/entities/care.entity";

import { type Schema, schema } from "../schema";

function toFormValues(cares: Care[]): Schema {
  const entries = CARE_TYPES.map((type) => {
    const care = cares.find((item) => item.type === type);

    return [type, { enabled: !!care, interval_days: care?.intervalDays.toString() ?? "" }];
  });

  return Object.fromEntries(entries) as Schema;
}

function toCareInputs(data: Schema): CareInput[] {
  return CARE_TYPES.map((type) => ({
    type,
    intervalDays: Number(data[type].interval_days),
    enabled: data[type].enabled,
  }));
}

export function useUpdateCares() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();
  const { dark } = useTheme();

  const query = React.useCallback(() => container.getCaresByPlant(Number(id)), [id]);
  const { data: cares } = useLiveQuery(["cares"], query, []);

  const values = React.useMemo(() => toFormValues(cares), [cares]);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    values,
    resetOptions: { keepDirtyValues: true },
  });

  const onSubmit = form.handleSubmit(async (data: Schema) => {
    try {
      await container.createOrUpdateCares(Number(id), toCareInputs(data));
      router.back();
    } catch (error) {
      Alert.alert(
        "Algo deu errado",
        (error as Error).message ?? "Ocorreu um erro inesperado",
        [{ text: "Entendi" }],
        getAlertOptions(dark),
      );
    }
  });

  return {
    form,
    onSubmit,
  };
}
