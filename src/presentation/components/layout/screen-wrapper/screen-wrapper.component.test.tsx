import { Text } from "react-native";

import { render } from "@testing-library/react-native";

import { ScreenWrapper } from "@presentation/components/layout/screen-wrapper";

import { useTheme } from "@presentation/hooks/use-theme";

import { getThemeColors } from "@shared/utils/theme";

describe("screen-wrapper-component", () => {
  it("deve renderizar os children", async () => {
    const { getByText } = await render(
      <ScreenWrapper>
        <Text>Conteúdo da tela</Text>
      </ScreenWrapper>,
    );

    expect(getByText("Conteúdo da tela")).toBeTruthy();
  });

  it("deve aplicar os valores padrão", async () => {
    const { dark } = useTheme();
    const { background } = getThemeColors(dark);

    const { getByTestId } = await render(
      <ScreenWrapper>
        <Text>Conteúdo da tela</Text>
      </ScreenWrapper>,
    );

    const container = getByTestId("screen-wrapper");

    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        paddingTop: 0,
        backgroundColor: background,
      }),
    );
  });

  it("deve aplicar o flex personalizado", async () => {
    const { getByTestId } = await render(
      <ScreenWrapper flex={2}>
        <Text>Conteúdo da tela</Text>
      </ScreenWrapper>,
    );

    const container = getByTestId("screen-wrapper");

    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 2,
      }),
    );
  });

  it("deve aplicar o style personalizado", async () => {
    const { getByTestId } = await render(
      <ScreenWrapper style={{ marginTop: 20 }}>
        <Text>Conteúdo da tela</Text>
      </ScreenWrapper>,
    );

    const container = getByTestId("screen-wrapper");

    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 20,
        }),
      ]),
    );
  });
});
