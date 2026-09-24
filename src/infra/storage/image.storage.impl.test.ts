import { File, Paths } from "expo-file-system";

import * as ImageManipulator from "expo-image-manipulator";

import { imageStorage } from "@infra/storage/image.storage.impl";

import { createExpoFileSystemMock } from "@mocks/libs/expo-file-system.mock";
import { createExpoImageManipulatorMock } from "@mocks/libs/expo-image-manipulator.mock";

jest.mock("expo-file-system", () => ({
  File: jest.fn(),
  Paths: {
    document: "file:///Documents",
  },
}));

jest.mock("expo-image-manipulator", () => ({
  ImageManipulator: {
    manipulate: jest.fn(),
  },
  SaveFormat: {
    JPEG: "jpeg",
  },
}));

const fileSystemMock = createExpoFileSystemMock();
const imageManipulatorMock = createExpoImageManipulatorMock();

const mockFile = File as unknown as jest.Mock;
const mockManipulate = ImageManipulator.ImageManipulator.manipulate as jest.Mock;

const mockSource = fileSystemMock.file;
const mockDestination = fileSystemMock.file;

describe("image-storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Date, "now").mockReturnValue(123456789);

    imageManipulatorMock.imageRef.saveAsync.mockResolvedValue({
      uri: "file:///tmp/manipulated.jpg",
    });

    imageManipulatorMock.context.renderAsync.mockResolvedValue(imageManipulatorMock.imageRef);

    mockManipulate.mockReturnValue(imageManipulatorMock.context);

    mockDestination.uri = "file:///Documents/123456789.jpg";
    mockSource.uri = "file:///tmp/manipulated.jpg";
    mockSource.exists = true;
    mockSource.base64Sync.mockReturnValue("base64-image");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("saveImage", () => {
    it("deve processar e salvar a imagem", async () => {
      mockFile.mockReturnValueOnce(mockDestination).mockReturnValueOnce(mockSource);

      const result = await imageStorage.saveImage("file:///original/image.jpg");

      expect(mockManipulate).toHaveBeenCalledWith("file:///original/image.jpg");

      expect(imageManipulatorMock.context.resize).toHaveBeenCalledWith({
        width: 512,
      });

      expect(imageManipulatorMock.context.renderAsync).toHaveBeenCalled();

      expect(imageManipulatorMock.imageRef.saveAsync).toHaveBeenCalledWith({
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      expect(mockFile).toHaveBeenNthCalledWith(1, Paths.document, "123456789.jpg");

      expect(mockFile).toHaveBeenNthCalledWith(2, "file:///tmp/manipulated.jpg");

      expect(mockSource.copy).toHaveBeenCalledWith(mockDestination);

      expect(result).toBe(mockDestination.uri);
    });
  });

  describe("deleteImage", () => {
    it("deve deletar a imagem quando o arquivo existe", async () => {
      mockSource.exists = true;
      mockFile.mockReturnValue(mockSource);

      await imageStorage.deleteImage("file:///image.jpg");

      expect(mockSource.delete).toHaveBeenCalled();
    });

    it("não deve deletar quando o arquivo não existe", async () => {
      mockSource.exists = false;
      mockFile.mockReturnValue(mockSource);

      await imageStorage.deleteImage("file:///image.jpg");

      expect(mockSource.delete).not.toHaveBeenCalled();
    });

    it("não deve lançar erro quando ocorrer uma falha ao deletar", async () => {
      const error = new Error("Erro ao deletar");

      mockSource.exists = true;
      mockSource.delete.mockImplementation(() => {
        throw error;
      });

      mockFile.mockReturnValue(mockSource);

      const consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {});

      await imageStorage.deleteImage("file:///image.jpg");

      expect(mockSource.delete).toHaveBeenCalled();

      expect(consoleWarn).toHaveBeenCalledWith("Falha ao deletar imagem:", "file:///image.jpg", error);
    });
  });

  describe("readImage", () => {
    it("deve ler a imagem quando o arquivo existe", async () => {
      mockSource.exists = true;
      mockSource.base64Sync.mockReturnValue("base64-image");
      mockFile.mockReturnValue(mockSource);

      const result = await imageStorage.readImage("file:///Documents/image.jpg");

      expect(mockFile).toHaveBeenCalledWith("file:///Documents/image.jpg");

      expect(mockSource.base64Sync).toHaveBeenCalled();

      expect(result).toBe("base64-image");
    });

    it("deve retornar null quando o arquivo não existe", async () => {
      mockSource.exists = false;
      mockFile.mockReturnValue(mockSource);

      const result = await imageStorage.readImage("file:///Documents/image.jpg");

      expect(mockSource.base64Sync).not.toHaveBeenCalled();

      expect(result).toBeNull();
    });

    it("deve retornar null quando ocorrer uma falha ao ler", async () => {
      const error = new Error("Erro ao ler");

      mockSource.exists = true;

      mockSource.base64Sync.mockImplementation(() => {
        throw error;
      });

      mockFile.mockReturnValue(mockSource);

      const consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {});

      const result = await imageStorage.readImage("file:///Documents/image.jpg");

      expect(mockSource.base64Sync).toHaveBeenCalled();

      expect(consoleWarn).toHaveBeenCalledWith("Falha ao ler imagem:", "file:///Documents/image.jpg", error);

      expect(result).toBeNull();

      consoleWarn.mockRestore();
    });
  });

  describe("saveBase64", () => {
    it("deve salvar a imagem em base64", async () => {
      mockFile.mockReturnValue(mockDestination);

      const result = await imageStorage.saveBase64("base64-image", "1.jpg");

      expect(mockFile).toHaveBeenCalledWith(Paths.document, "1.jpg");

      expect(mockDestination.write).toHaveBeenCalledWith("base64-image", {
        encoding: "base64",
      });

      expect(result).toBe(mockDestination.uri);
    });
  });
});
