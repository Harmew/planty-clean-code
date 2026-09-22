export function createExpoImageManipulatorMock() {
  const imageRef = {
    saveAsync: jest.fn(),
  };

  const context = {
    resize: jest.fn(),
    renderAsync: jest.fn().mockResolvedValue(imageRef),
  };

  return {
    ImageManipulator: {
      manipulate: jest.fn(() => context),
    },
    SaveFormat: {
      JPEG: "jpeg",
    },
    context,
    imageRef,
  };
}
