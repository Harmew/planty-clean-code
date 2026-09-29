import { render } from "@testing-library/react-native";

import { DownloadCompleted } from "./download-completed.component";

describe("download-completed", () => {
  it("deve renderizar a mensagem de conclusão", async () => {
    const { getByText } = await render(<DownloadCompleted />);

    expect(getByText("Tudo pronto!")).toBeTruthy();

    expect(
      getByText("A IA está pronta para ajudar você a cuidar melhor das suas plantas, mesmo sem internet."),
    ).toBeTruthy();
  });
});
