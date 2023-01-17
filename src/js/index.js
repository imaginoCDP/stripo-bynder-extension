import { createBynderBlockExtension } from "./createBynderBlockExtension";
import { GLOBAL_EXTENSION_NAME } from "./constants";

const extension = {
  create(stripoConfig, stripoApi, extensionBasePath) {
    return Object.assign({
      stripoConfig,
      stripoApi,
      extensionBasePath,
      ...createBynderBlockExtension(stripoConfig, stripoApi),
    });
  },
};

self[GLOBAL_EXTENSION_NAME] = extension;
