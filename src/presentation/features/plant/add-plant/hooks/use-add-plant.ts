import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, type TextInput } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

import { schema, type Schema } from "../schema";

export function useAddPlant() {
  const { dark } = useTheme();
  const router = useRouter();

  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  // Refs
  const nameRef = React.useRef<TextInput>(null);
  const locationRef = React.useRef<TextInput>(null);
  const temperatureMinRef = React.useRef<TextInput>(null);
  const temperatureMaxRef = React.useRef<TextInput>(null);
  const humidityRef = React.useRef<TextInput>(null);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      imageUri: null,
      name: "",
      location: "",
      sunlight: "medium",
      temperatureMin: "",
      temperatureMax: "",
      humidity: "",
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
      const result = await container.createPlant(plant);

      Alert.alert(
        "Planta adicionada com sucesso",
        "Adicione seus cuidados para começar a monitorar sua planta e receber notificações personalizadas",
        [
          {
            text: "Adicionar agora",
            onPress: () => router.replace({ pathname: "/my-plant", params: { id: result.id } }),
            style: "default",
            isPreferred: true,
          },
          {
            text: "Adicionar depois",
            onPress: () => router.back(),
            style: "cancel",
          },
        ],
        getAlertOptions(dark),
      );
    } catch (error) {
      Alert.alert(
        "Algo deu errado",
        (error as Error).message ?? "Ocorreu um erro inesperado",
        [{ text: "Entendi" }],
        getAlertOptions(dark),
      );
    }
  });

  const handleAutoComplete = React.useCallback(async () => {
    const name = form.getValues("name")?.trim();

    if (!name) {
      return Alert.alert(
        "Planty informa",
        "Para gerar os dados da planta, informe o nome dela",
        [{ text: "Entendi", onPress: () => nameRef.current?.focus() }],
        getAlertOptions(dark),
      );
    }

    try {
      setIsGenerating(true);
      const result = await container.generatePlantData(name);

      form.setValue("sunlight", result.sunlight);
      form.setValue("temperatureMin", String(result.minTemperature));
      form.setValue("temperatureMax", String(result.maxTemperature));
      form.setValue("humidity", String(result.humidity));
      setIsGenerating(false);
    } catch (error) {
      setIsGenerating(false);
      Alert.alert(
        "Planty informa",
        (error as Error).message ?? "Ocorreu um erro inesperado",
        [{ text: "Entendi" }],
        getAlertOptions(dark),
      );
    }
  }, [form, dark]);

  return {
    form,
    onSubmit,
    handleAutoComplete,
    isGenerating,
    refs: { nameRef, locationRef, temperatureMinRef, temperatureMaxRef, humidityRef },
  };
}
