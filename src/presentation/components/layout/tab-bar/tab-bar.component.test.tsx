import { act, fireEvent, render } from "@testing-library/react-native";

import { container } from "@di/container";

import { BottomTabBarProps } from "expo-router/build/layouts/Tabs";
import { TabBar } from "./tab-bar.component";

describe("tab-bar-component", () => {
  const emit = jest.fn();
  const navigate = jest.fn();

  const routes = [
    {
      key: "my-plants-key",
      name: "my-plants",
      params: undefined,
    },
    {
      key: "my-cares-key",
      name: "my-cares",
      params: undefined,
    },
    {
      key: "settings-key",
      name: "settings",
      params: undefined,
    },
  ];

  const createProps = (index = 0, emitResult = { defaultPrevented: false }) => {
    emit.mockReturnValue(emitResult);

    return {
      state: { index, routes },
      descriptors: {},
      navigation: { emit, navigate },
      insets: { top: 0, bottom: 24, left: 0, right: 0 },
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(container.hapticsService, "tabPress").mockImplementation(() => {});
  });

  it("deve renderizar as abas", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps() as unknown as BottomTabBarProps)} />);

    expect(getAllByTestId("tab-bar-button")).toHaveLength(3);
  });

  it("deve identificar corretamente a aba selecionada", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps(1) as unknown as BottomTabBarProps)} />);

    const buttons = getAllByTestId("tab-bar-button");

    expect(buttons[0].props.accessibilityState).toEqual({
      selected: false,
    });

    expect(buttons[1].props.accessibilityState).toEqual({
      selected: true,
    });

    expect(buttons[2].props.accessibilityState).toEqual({
      selected: false,
    });
  });

  it("deve aplicar o espaçamento inferior do inset", async () => {
    const { getByTestId } = await render(<TabBar {...(createProps() as unknown as BottomTabBarProps)} />);

    const containerView = getByTestId("tab-bar-container");

    expect(containerView.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          bottom: 24,
        }),
      ]),
    );
  });

  it("deve disparar o haptic ao pressionar uma aba", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps() as unknown as BottomTabBarProps)} />);

    await act(async () => {
      fireEvent.press(getAllByTestId("tab-bar-button")[1]);
    });

    expect(container.hapticsService.tabPress).toHaveBeenCalledTimes(1);
  });

  it("deve emitir tabPress ao pressionar uma aba", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps() as unknown as BottomTabBarProps)} />);

    await act(async () => {
      fireEvent.press(getAllByTestId("tab-bar-button")[1]);
    });

    expect(emit).toHaveBeenCalledWith({
      type: "tabPress",
      target: "my-cares-key",
      canPreventDefault: true,
    });
  });

  it("deve navegar para uma aba não selecionada", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps(0) as unknown as BottomTabBarProps)} />);

    await act(async () => {
      fireEvent.press(getAllByTestId("tab-bar-button")[1]);
    });

    expect(navigate).toHaveBeenCalledWith("my-cares", undefined);
  });

  it("não deve navegar para a aba já selecionada", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps(0) as unknown as BottomTabBarProps)} />);

    await act(async () => {
      fireEvent.press(getAllByTestId("tab-bar-button")[0]);
    });

    expect(navigate).not.toHaveBeenCalled();
  });

  it("não deve navegar quando o evento tabPress for impedido", async () => {
    const { getAllByTestId } = await render(
      <TabBar {...(createProps(0, { defaultPrevented: true }) as unknown as BottomTabBarProps)} />,
    );

    await act(async () => {
      fireEvent.press(getAllByTestId("tab-bar-button")[1]);
    });

    expect(navigate).not.toHaveBeenCalled();
  });

  it("deve emitir tabLongPress ao pressionar e segurar uma aba", async () => {
    const { getAllByTestId } = await render(<TabBar {...(createProps() as unknown as BottomTabBarProps)} />);

    await act(async () => {
      fireEvent(getAllByTestId("tab-bar-button")[1], "longPress");
    });

    expect(emit).toHaveBeenCalledWith({
      type: "tabLongPress",
      target: "my-cares-key",
    });
  });
});
