import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { TextInput } from "react-native";

import { schema, type Schema } from "../schema";

export function useAddPlant() {
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
    console.log("values", values);
  });

  return {
    form,
    onSubmit,
    refs: { nameRef, locationRef, temperatureMinRef, temperatureMaxRef, humidityRef },
  };
}
