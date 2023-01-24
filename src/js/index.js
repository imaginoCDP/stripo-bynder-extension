import { createBynderBlockExtension } from "./createBynderBlockExtension";
import { GLOBAL_EXTENSION_NAME } from "./constants";
import stripoDefaultExtension from "./stripoDefaultExtension";

const extension = {
  create(stripoConfig, stripoApi, extensionBasePath) {
    return Object.assign({
      stripoConfig,
      stripoApi,
      extensionBasePath,
      ...stripoDefaultExtension,
      ...createBynderBlockExtension(stripoConfig, stripoApi),
    });
  },
};

self[GLOBAL_EXTENSION_NAME] = extension;
