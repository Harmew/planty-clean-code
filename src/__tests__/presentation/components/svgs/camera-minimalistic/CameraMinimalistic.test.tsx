import { render } from "@testing-library/react-native";

import { CameraMinimalistic } from "@presentation/components/svgs/camera-minimalistic";

describe("CameraMinimalistic", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<CameraMinimalistic />);

    expect(getByTestId("camera-minimalistic-svg")).toBeTruthy();
  });
});
