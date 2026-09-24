import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { Row } from "@presentation/components/common/row";
import { useTheme } from "@presentation/hooks/use-theme";

describe("row-component", () => {
  it("deve renderizar com os valores padrão", async () => {
    const { theme } = useTheme();

    const { getByTestId } = await render(
      <Row testID="row">
        <Text>Conteúdo</Text>
      </Row>,
    );

    const row = getByTestId("row");

    expect(row.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flex: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: theme.spacings[12],
        }),
      ]),
    );
  });

  it("deve renderizar os filhos", async () => {
    const { getByText } = await render(
      <Row>
        <Text>Conteúdo da Row</Text>
      </Row>,
    );

    expect(getByText("Conteúdo da Row")).toBeTruthy();
  });

  it("deve aplicar as propriedades personalizadas", async () => {
    const { theme } = useTheme();

    const { getByTestId } = await render(
      <Row testID="row" flex={1} gap={16} align="flex-end" justify="space-between" />,
    );

    const row = getByTestId("row");

    expect(row.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: theme.spacings[16],
        }),
      ]),
    );
  });

  it("deve aplicar o style personalizado", async () => {
    const { getByTestId } = await render(
      <Row
        testID="row"
        style={{
          marginTop: 20,
          paddingHorizontal: 16,
        }}
      />,
    );

    const row = getByTestId("row");

    expect(row.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 20,
          paddingHorizontal: 16,
        }),
      ]),
    );
  });

  it("deve repassar as propriedades para a View", async () => {
    const { getByTestId } = await render(<Row testID="row" accessibilityLabel="Linha de conteúdo" />);

    const row = getByTestId("row");

    expect(row.props.accessibilityLabel).toBe("Linha de conteúdo");
  });
});
