import { render } from "@testing-library/react-native";

import { Surface } from "@presentation/components/common/surface";
import { useTheme } from "@presentation/hooks/use-theme";
import { Text } from "react-native";

describe("surface-component", () => {
  it("deve aplicar os estilos padrão do tema", async () => {
    const { theme } = useTheme();

    const { getByTestId } = await render(<Surface testID="surface" />);

    const surface = getByTestId("surface");

    expect(surface.props.style).toEqual(
      expect.objectContaining({
        padding: theme.spacings[16],
        borderRadius: theme.radius[26],
        backgroundColor: theme.tokens.surface,
        gap: theme.spacings[12],
        overflow: "hidden",
      }),
    );
  });

  it("deve renderizar os filhos", async () => {
    const { getByText } = await render(
      <Surface>
        <Text>Conteúdo do Surface</Text>
      </Surface>,
    );

    expect(getByText("Conteúdo do Surface")).toBeTruthy();
  });

  it("deve aplicar o style personalizado", async () => {
    const { getByTestId } = await render(
      <Surface
        testID="surface"
        style={{
          backgroundColor: "#FF0000",
          padding: 24,
        }}
      />,
    );

    const surface = getByTestId("surface");

    expect(surface.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#FF0000",
          padding: 24,
        }),
      ]),
    );
  });

  it("deve aplicar o wrapperStyle personalizado", async () => {
    const { getByTestId } = await render(
      <Surface
        testID="surface"
        wrapperStyle={{
          margin: 20,
        }}
      />,
    );

    const surface = getByTestId("surface");
    const wrapper = surface.parent;

    expect(wrapper?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          margin: 20,
        }),
      ]),
    );
  });

  it("deve repassar as propriedades para a View", async () => {
    const { getByTestId } = await render(<Surface testID="surface" accessibilityLabel="Área de conteúdo" />);

    const surface = getByTestId("surface");

    expect(surface.props.accessibilityLabel).toBe("Área de conteúdo");
  });
});
