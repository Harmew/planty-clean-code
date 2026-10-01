import { fireEvent, render } from "@testing-library/react-native";

import { useController, useFormContext } from "react-hook-form";

import { ImageUriField } from "./image-uri-field.component";

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("image-uri-field", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useFormContext).mockReturnValue({
      control: {},
    } as never);

    jest.mocked(useController).mockReturnValue({
      field: {
        value: null,
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);
  });

  it("deve renderizar o uploader com a imagem atual", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "plant.jpg",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const { getByTestId } = await render(<ImageUriField />);

    expect(getByTestId("image-uploader-image").props.source).toEqual([{ uri: "plant.jpg" }]);
  });

  it("deve limpar o campo ao remover a imagem", async () => {
    jest.mocked(useController).mockReturnValue({
      field: {
        value: "plant.jpg",
        onChange,
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    } as never);

    const { getByTestId } = await render(<ImageUriField />);

    await fireEvent.press(getByTestId("image-uploader-clear"));

    expect(onChange).toHaveBeenCalledWith(null);
  });
});
