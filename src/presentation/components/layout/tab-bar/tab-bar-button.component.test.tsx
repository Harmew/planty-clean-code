import { act, fireEvent, render } from "@testing-library/react-native";

import { TabBarButton } from "./tab-bar-button.component";

describe("tab-bar-button-component", () => {
  const onPress = jest.fn();
  const onLongPress = jest.fn();

  const route = {
    key: "my-plants-key",
    name: "my-plants",
    params: undefined,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve renderizar o botão", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    expect(getByTestId("tab-bar-button")).toBeTruthy();
  });

  it("deve renderizar o ícone correspondente à rota", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    expect(getByTestId("home-svg")).toBeTruthy();
  });

  it("deve renderizar o ícone de cuidados", async () => {
    const { getByTestId } = await render(
      <TabBarButton
        route={{ ...route, name: "my-cares" }}
        group="left"
        isFocused={false}
        onPress={onPress}
        onLongPress={onLongPress}
      />,
    );

    expect(getByTestId("heart-pulse-svg")).toBeTruthy();
  });

  it("deve renderizar o ícone de configurações", async () => {
    const { getByTestId } = await render(
      <TabBarButton
        route={{ ...route, name: "settings" }}
        group="right"
        isFocused={false}
        onPress={onPress}
        onLongPress={onLongPress}
      />,
    );

    expect(getByTestId("settings-svg")).toBeTruthy();
  });

  it("deve aplicar o estado selecionado", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused onPress={onPress} onLongPress={onLongPress} />,
    );

    expect(getByTestId("tab-bar-button").props.accessibilityState).toEqual({
      selected: true,
    });
  });

  it("deve aplicar o estado não selecionado", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    expect(getByTestId("tab-bar-button").props.accessibilityState).toEqual({
      selected: false,
    });
  });

  it("deve executar a ação ao pressionar", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId("tab-bar-button"));
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("deve executar a ação de pressionamento longo", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    await act(async () => {
      fireEvent(getByTestId("tab-bar-button"), "longPress");
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it("deve usar o espaçamento do grupo esquerdo quando não estiver selecionado", async () => {
    const { getByTestId } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    expect(getByTestId("tab-bar-button")).toHaveAnimatedStyle({
      paddingHorizontal: 20,
    });
  });

  it("deve animar o espaçamento do grupo esquerdo quando for selecionado", async () => {
    const { getByTestId, rerender } = await render(
      <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
    );

    await act(async () => {
      await rerender(<TabBarButton route={route} group="left" isFocused onPress={onPress} onLongPress={onLongPress} />);

      jest.advanceTimersByTime(150);
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    expect(getByTestId("tab-bar-button")).toHaveAnimatedStyle({
      paddingHorizontal: 28,
    });
  });

  it("deve manter o espaçamento do grupo direito", async () => {
    const { getByTestId } = await render(
      <TabBarButton
        route={{ ...route, name: "settings" }}
        group="right"
        isFocused
        onPress={onPress}
        onLongPress={onLongPress}
      />,
    );

    expect(getByTestId("tab-bar-button")).toHaveAnimatedStyle({
      paddingHorizontal: 12,
    });
  });

  it("deve animar para o estado não selecionado", async () => {
    const { getByTestId, rerender } = await render(
      <TabBarButton route={route} group="left" isFocused onPress={onPress} onLongPress={onLongPress} />,
    );

    await act(async () => {
      rerender(
        <TabBarButton route={route} group="left" isFocused={false} onPress={onPress} onLongPress={onLongPress} />,
      );
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    expect(getByTestId("tab-bar-button")).toHaveAnimatedStyle({ paddingHorizontal: 20 });
  });
});
