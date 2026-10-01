import { FormProvider } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Header, ModalWrapper } from "@presentation/components/layout";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { CareField } from "./components/form/care-field.component";
import { useUpdateCares } from "./hooks/use-update-cares";

import { Surface, Typography } from "@presentation/components/common";
import { SubmitButton } from "./components/form/submit-button.component";
import { CARE_TYPES } from "./constants";
import { createStyles } from "./styles";

export function UpdateCaresScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const { form, onSubmit } = useUpdateCares();

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
          <Header isModal title="Cuidados da Planta" />

          <Surface>
            <Typography style={{ flex: 1 }} size={14} align="center">
              Receberá notificações para lembrar de realizar o cuidado da planta no intervalo definido.
            </Typography>
          </Surface>

          {CARE_TYPES.map((type) => (
            <CareField key={type} name={type} />
          ))}

          <SubmitButton onPress={onSubmit} />
        </KeyboardAwareScrollView>
      </FormProvider>
    </ModalWrapper>
  );
}
