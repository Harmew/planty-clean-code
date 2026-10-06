import { Text } from "react-native";

import { render } from "@testing-library/react-native";

import { SettingsGroup } from "./settings-group.component";

describe("settings-group-component", () => {
  it("deve renderizar os filhos", async () => {
    const { getByText } = await render(
      <SettingsGroup delay={100}>
        <Text>Conteúdo</Text>
      </SettingsGroup>,
    );

    expect(getByText("Conteúdo")).toBeTruthy();
  });
});
