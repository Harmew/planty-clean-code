import { render } from "@testing-library/react-native";

import { CloudUpload } from "@presentation/components/svgs/cloud-upload.component";

describe("cloud-upload-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<CloudUpload />);

    expect(getByTestId("cloud-upload-svg")).toBeTruthy();
  });
});
