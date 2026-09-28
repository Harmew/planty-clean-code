import { Platform, Text } from "react-native";

import { render } from "@testing-library/react-native";

import { ModalWrapper } from "./modal-wrapper.component";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@presentation/hooks/use-theme";

import { getThemeColors } from "@shared/utils/theme";

describe("modal-wrapper-component", () => {
  it("deve renderizar os children", async () => {
    const { getByText } = await render(
      <ModalWrapper>
        <Text>Conteúdo da tela</Text>
      </ModalWrapper>,
    );

    expect(getByText("Conteúdo da tela")).toBeTruthy();
  });

  it("deve aplicar os valores padrão no iOS", async () => {
    jest.replaceProperty(Platform, "OS", "ios");

    const { dark } = useTheme();
    const { background } = getThemeColors(dark);

    const { getByTestId } = await render(
      <ModalWrapper>
        <Text>Conteúdo da tela</Text>
      </ModalWrapper>,
    );

    const container = getByTestId("modal-wrapper");

    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        marginTop: 18,
        backgroundColor: background,
      }),
    );
  });

  it("deve aplicar o safe area no Android", async () => {
    jest.replaceProperty(Platform, "OS", "android");

    jest.mocked(useSafeAreaInsets).mockReturnValue({
      top: 24,
      bottom: 0,
      left: 0,
      right: 0,
    });

    const { getByTestId } = await render(
      <ModalWrapper>
        <Text>Conteúdo da tela</Text>
      </ModalWrapper>,
    );

    const container = getByTestId("modal-wrapper");

    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        marginTop: 24,
      }),
    );
  });

  it("deve aplicar o flex personalizado", async () => {
    const { getByTestId } = await render(
      <ModalWrapper flex={2}>
        <Text>Conteúdo da tela</Text>
      </ModalWrapper>,
    );

    const container = getByTestId("modal-wrapper");

    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 2,
      }),
    );
  });

  it("deve aplicar o style personalizado", async () => {
    const { getByTestId } = await render(
      <ModalWrapper style={{ marginTop: 20 }}>
        <Text>Conteúdo da tela</Text>
      </ModalWrapper>,
    );

    const container = getByTestId("modal-wrapper");

    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 20,
        }),
      ]),
    );
  });
});
