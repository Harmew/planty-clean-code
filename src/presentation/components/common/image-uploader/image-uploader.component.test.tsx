import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";

import { Alert } from "react-native";

import { pickMedia } from "./functions";

import { ImageUploader } from "./image-uploader.component";

jest.mock("./functions", () => ({
  pickMedia: jest.fn(),
}));

jest.mock("../full-window-overlay", () => ({
  FullWindowOverlay: ({ children }: React.PropsWithChildren) => children,
}));

describe("image-uploader-component", () => {
  const asset = {
    uri: "file:///plant.jpg",
    width: 1200,
    height: 900,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the placeholder when there is no image", async () => {
    const { getByTestId, getByText } = await render(<ImageUploader onSelect={jest.fn()} onClear={jest.fn()} />);

    expect(getByTestId("image-uploader")).toBeTruthy();
    expect(getByText("Enviar imagem")).toBeTruthy();
  });

  it("renders a custom placeholder", async () => {
    const { getByText } = await render(
      <ImageUploader placeholder="Adicionar foto" onSelect={jest.fn()} onClear={jest.fn()} />,
    );

    expect(getByText("Adicionar foto")).toBeTruthy();
  });

  it("calls onSelect with the selected image uri", async () => {
    const onSelect = jest.fn();

    jest.mocked(pickMedia).mockImplementation(async (onSuccess) => {
      onSuccess(asset as never);
    });

    const { getByTestId } = await render(<ImageUploader onSelect={onSelect} onClear={jest.fn()} />);

    await act(() => {
      fireEvent.press(getByTestId("image-uploader-pressable"));
    });

    expect(onSelect).toHaveBeenCalledWith(asset.uri);
  });

  it("hides the loading state after selecting an image", async () => {
    jest.mocked(pickMedia).mockImplementation(async (onSuccess) => {
      onSuccess(asset as never);
    });

    const { getByTestId, queryByTestId } = await render(<ImageUploader onSelect={jest.fn()} onClear={jest.fn()} />);

    await act(() => {
      fireEvent.press(getByTestId("image-uploader-pressable"));
    });

    expect(queryByTestId("image-uploader-loading")).toBeNull();
  });

  it("shows the loading state while selecting an image", async () => {
    let resolvePick!: () => void;

    jest.mocked(pickMedia).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvePick = resolve;
        }),
    );

    const { getByTestId } = await render(<ImageUploader onSelect={jest.fn()} onClear={jest.fn()} />);

    await act(() => {
      fireEvent.press(getByTestId("image-uploader-pressable"));
    });

    expect(getByTestId("image-uploader-loading")).toBeTruthy();

    await act(() => {
      resolvePick();
    });
  });

  it("hides the loading state when image selection is cancelled", async () => {
    jest.mocked(pickMedia).mockImplementation(async (_, onError) => {
      onError("Usuário cancelou a seleção de imagem.");
    });

    const { getByTestId, queryByTestId } = await render(<ImageUploader onSelect={jest.fn()} onClear={jest.fn()} />);

    await act(() => {
      fireEvent.press(getByTestId("image-uploader-pressable"));
    });

    expect(queryByTestId("image-uploader-loading")).toBeNull();
  });

  it("shows an alert when image selection fails", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    jest.mocked(pickMedia).mockRejectedValue(new Error("Permissão negada"));

    const { getByTestId } = await render(<ImageUploader onSelect={jest.fn()} onClear={jest.fn()} />);

    await act(() => {
      fireEvent.press(getByTestId("image-uploader-pressable"));
    });

    expect(alertSpy).toHaveBeenCalledWith(
      "Não foi possível selecionar a imagem",
      "Permissão negada",
      [{ text: "Entendi" }],
      { cancelable: false, userInterfaceStyle: "light" },
    );

    alertSpy.mockRestore();
  });

  it("renders the selected image", async () => {
    const { getByTestId, queryByTestId } = await render(
      <ImageUploader file="file:///plant.jpg" onSelect={jest.fn()} onClear={jest.fn()} />,
    );

    expect(getByTestId("image-uploader-preview")).toBeTruthy();
    expect(getByTestId("image-uploader-image")).toBeTruthy();
    expect(queryByTestId("image-uploader-pressable")).toBeNull();
  });

  it("calls onClear when pressing the delete button", async () => {
    const onClear = jest.fn();

    const { getByTestId } = await render(
      <ImageUploader file="file:///plant.jpg" onSelect={jest.fn()} onClear={onClear} />,
    );

    await act(() => {
      fireEvent.press(getByTestId("image-uploader-clear"));
    });

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
