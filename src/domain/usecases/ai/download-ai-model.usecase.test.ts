import { createAIServiceMock } from "@mocks/services/ai.service.mock";

import { DownloadAIModel } from "./download-ai-model.usecase";

describe("download-ai-model-usecase", () => {
  it("deve baixar o modelo da IA informando o progresso", async () => {
    const service = createAIServiceMock();
    const onProgress = jest.fn();

    service.downloadAI.mockResolvedValue();

    const downloadAIModel = DownloadAIModel(service);

    await downloadAIModel(onProgress);

    expect(service.downloadAI).toHaveBeenCalledWith(onProgress);
    expect(service.downloadAI).toHaveBeenCalledTimes(1);
  });
});
