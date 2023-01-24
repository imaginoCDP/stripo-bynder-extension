import translations from "./translations";
import defaultLayout from "./layout/defaultLayout.html";
import { openBynder } from "./modal_window";
import { BLOCK_UNIQUE_CLASS_NAME } from "./constants";

export function createBynderBlockExtension(stripoConfig, stripoApi) {
  function getBlockLayoutToDrop() {
    return defaultLayout;
  }
  const { bynderConfig, locale } = stripoConfig;
  const portalURL = bynderConfig?.portalURL;
  const token = bynderConfig?.token;
  const hasCredentials = portalURL && token;

  function blockDropped(block) {
    block.find(`>.esd-structure-type`).html(stripoApi.translate("block.name"));
  }

  function onSelectBlock(block, context) {
    if (!context.showCustomBlockSettings) {
      openBynder({ portalURL, token, block, locale });
    }
  }

  return {
    name: "BynderBlock",
    iconClass: "es-icon-image",
    uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
    canBeSavedToLibrary: true,
    i18n: translations,
    blockName: "block.name",
    blockType: "structure",
    disableSettingsPanel: true,
    isEnabled: () => hasCredentials, // Disable bynder block if no credentials
    getBlockLayoutToDrop,
    blockDropped,
    onSelectBlock,
  };
}
