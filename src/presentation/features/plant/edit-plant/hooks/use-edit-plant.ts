import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, type TextInput } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

import { schema, type Schema } from "../schema";

export function useEditPlant() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { dark } = useTheme();
  const router = useRouter();

  const query = React.useCallback(() => container.getPlantById(Number(id)), [id]);
  const { data: plant } = useLiveQuery(["plants"], query, null);

  // Refs
  const nameRef = React.useRef<TextInput>(null);
  const locationRef = React.useRef<TextInput>(null);
  const temperatureMinRef = React.useRef<TextInput>(null);
  const temperatureMaxRef = React.useRef<TextInput>(null);
  const humidityRef = React.useRef<TextInput>(null);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    values: {
      imageUri: plant?.image ?? null,
      name: plant?.name ?? "",
      location: plant?.location ?? "",
      sunlight: plant?.sunlight ?? "medium",
      temperatureMin: plant?.temperatureMin ?? "",
      temperatureMax: plant?.temperatureMax ?? "",
      humidity: plant?.humidity ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const plant = {
      name: values.name,
      imageUri: values.imageUri ?? null,
      location: values.location,
      sunlight: values.sunlight,
      temperatureMin: values.temperatureMin ?? null,
      temperatureMax: values.temperatureMax ?? null,
      humidity: values.humidity ?? null,
    };

    try {
      await container.updatePlant(Number(id), plant);
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
    refs: { nameRef, locationRef, temperatureMinRef, temperatureMaxRef, humidityRef },
  };
}
