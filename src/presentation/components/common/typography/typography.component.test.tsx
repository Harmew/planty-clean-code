import { render } from "@testing-library/react-native";

import { Typography } from "@presentation/components/common/typography";

import { themes } from "@shared/theme";

describe("typography-component", () => {
  it("deve renderizar o texto com os valores padrão", async () => {
    const { getByText } = await render(<Typography>Olá mundo</Typography>);

    const text = getByText("Olá mundo");

    expect(text).toBeTruthy();
  });

  it("deve aplicar as propriedades de tipografia", async () => {
    const { getByText } = await render(
      <Typography size={24} weight={700} align="center">
        Olá mundo
      </Typography>,
    );

    const text = getByText("Olá mundo");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: themes.light.fontSizes[24],
          lineHeight: themes.light.fontLineHeights[24],
          fontWeight: themes.light.fontWeights[700],
          textAlign: "center",
        }),
      ]),
    );
  });

  it("deve aplicar a cor padrão do texto", async () => {
    const { getByText } = await render(<Typography>Olá mundo</Typography>);

    const text = getByText("Olá mundo");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: themes.light.tokens.text,
        }),
      ]),
    );
  });

  it("deve aplicar uma cor específica do tema", async () => {
    const { getByText } = await render(<Typography color="green500">Olá mundo</Typography>);

    const text = getByText("Olá mundo");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: themes.light.colors.green500,
        }),
      ]),
    );
  });

  it("deve transformar o texto para uppercase", async () => {
    const { getByText } = await render(<Typography transform="uppercase">hello world</Typography>);

    expect(getByText("HELLO WORLD")).toBeTruthy();
  });

  it("deve transformar o texto para lowercase", async () => {
    const { getByText } = await render(<Typography transform="lowercase">HELLO WORLD</Typography>);

    expect(getByText("hello world")).toBeTruthy();
  });

  it("deve transformar o texto para capitalize", async () => {
    const { getByText } = await render(<Typography transform="capitalize">hello world</Typography>);

    expect(getByText("Hello World")).toBeTruthy();
  });

  it("deve manter o texto quando transform for none", async () => {
    const { getByText } = await render(<Typography transform="none">Hello World</Typography>);

    expect(getByText("Hello World")).toBeTruthy();
  });

  it("deve aceitar style personalizado", async () => {
    const { getByText } = await render(<Typography style={{ marginTop: 20 }}>Olá mundo</Typography>);

    const text = getByText("Olá mundo");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 20,
        }),
      ]),
    );
  });

  it("deve repassar as propriedades para o Text", async () => {
    const { getByTestId } = await render(<Typography testID="typography">Olá mundo</Typography>);

    const text = getByTestId("typography");

    expect(text).toBeTruthy();
  });
});
