import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";

import { SettingsItem } from "./settings-item.component";

describe("settings-item-component", () => {
  it("deve renderizar o label", async () => {
    const { getByText } = await render(<SettingsItem icon={<Text>Ícone</Text>} label="Exportar backup" />);

    expect(getByText("Exportar backup")).toBeTruthy();
  });

  it("deve chamar onPress ao pressionar", async () => {
    const onPress = jest.fn();

    const { getByText } = await render(
      <SettingsItem icon={<Text>Ícone</Text>} label="Exportar backup" onPress={onPress} />,
    );

    fireEvent.press(getByText("Exportar backup"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("não deve chamar onPress enquanto estiver carregando", async () => {
    const onPress = jest.fn();

    const { getByText } = await render(
      <SettingsItem icon={<Text>Ícone</Text>} label="Exportar backup" onPress={onPress} isLoading />,
    );

    fireEvent.press(getByText("Exportar backup"));

    expect(onPress).not.toHaveBeenCalled();
  });
});
