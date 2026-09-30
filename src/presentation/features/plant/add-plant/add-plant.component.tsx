import { FormProvider } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Header, ModalWrapper } from "@presentation/components/layout";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { AutoCompleteButton } from "./components/form/auto-complete-button.components";
import { HumidityField } from "./components/form/humidity-field.component";
import { ImageUriField } from "./components/form/image-uri-field.component";
import { LocationField } from "./components/form/location-field.component";
import { NameField } from "./components/form/name-field.component";
import { SubmitButton } from "./components/form/submit-button.component";
import { SunlightField } from "./components/form/sunlight-field.component";
import { TemperatureMaxField } from "./components/form/temperature-max-field.component";
import { TemperatureMinField } from "./components/form/temperature-min-field.component";

import { useAddPlant } from "./hooks/use-add-plant";
import { createStyles } from "./styles";

const options = [
  { label: "Baixa", value: "low" },
  { label: "Média", value: "medium" },
  { label: "Alta", value: "high" },
];

export function AddPlantScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const { form, onSubmit, handleAutoComplete, isGenerating, refs } = useAddPlant();

  return (
    <ModalWrapper>
      <FormProvider {...form}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: getPlatformBottomSpacing(paddingBottom, theme.spacings[18], false) },
          ]}
        >
          <Header isModal title="Adicionar Planta" />
          <ImageUriField />
          <NameField inputRef={refs.nameRef} nextRef={refs.locationRef} />
          <LocationField inputRef={refs.locationRef} />
          <SunlightField options={options} />
          <TemperatureMinField inputRef={refs.temperatureMinRef} nextRef={refs.temperatureMaxRef} />
          <TemperatureMaxField inputRef={refs.temperatureMaxRef} nextRef={refs.humidityRef} />
          <HumidityField inputRef={refs.humidityRef} />
          <AutoCompleteButton onPress={handleAutoComplete} isLoading={isGenerating} />
          <SubmitButton onPress={onSubmit} />
        </KeyboardAwareScrollView>
      </FormProvider>
    </ModalWrapper>
  );
}
