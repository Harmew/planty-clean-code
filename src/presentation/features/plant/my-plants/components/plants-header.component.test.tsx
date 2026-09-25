import { fireEvent, render } from "@testing-library/react-native";

import { PlantsHeader } from "./plants-header.component";

describe("plants-header-component", () => {
  it("deve renderizar o título", async () => {
    const { getByText } = await render(<PlantsHeader onNotificationsPress={jest.fn()} />);

    expect(getByText("Minhas Plantas")).toBeTruthy();
  });

  it("deve aplicar a acessibilidade do título", async () => {
    const { getByRole } = await render(<PlantsHeader onNotificationsPress={jest.fn()} />);

    expect(getByRole("header", { name: "Minhas Plantas" })).toBeTruthy();
  });

  it("deve renderizar o botão de notificações", async () => {
    const { getByRole } = await render(<PlantsHeader onNotificationsPress={jest.fn()} />);

    expect(getByRole("button", { name: "Notificações" })).toBeTruthy();
  });

  it("deve chamar onNotificationsPress ao pressionar o botão", async () => {
    const onNotificationsPress = jest.fn();

    const { getByRole } = await render(<PlantsHeader onNotificationsPress={onNotificationsPress} />);

    fireEvent.press(getByRole("button", { name: "Notificações" }));

    expect(onNotificationsPress).toHaveBeenCalledTimes(1);
  });
});
