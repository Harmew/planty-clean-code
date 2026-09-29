import { render } from "@testing-library/react-native";

import { DownloadIntro } from "./download-intro.component";

describe("download-intro", () => {
  it("deve renderizar a introdução da IA", async () => {
    const { getByText } = await render(<DownloadIntro />);

    expect(getByText(/Uma IA para/)).toBeTruthy();

    expect(
      getByText(
        "A IA do Planty pode ajudar você a descobrir as necessidades das suas plantas, como luminosidade, umidade e temperatura.",
      ),
    ).toBeTruthy();

    expect(getByText("Baixe uma vez e use a IA mesmo quando estiver sem internet.")).toBeTruthy();
  });
});
