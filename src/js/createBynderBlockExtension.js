import translations from './translations'
import defaultLayout from './layout/defaultLayout.html'
import { openBynder } from './modal_window'

const BLOCK_UNIQUE_CLASS_NAME = `bynder-block`

export function createBynderBlockExtension(
  stripoConfig,
  stripoApi,
  extensionBasePath
) {
  function getBlockLayoutToDrop() {
    return defaultLayout
  }
  const { bynderConfig, locale } = stripoConfig
  const portalURL = bynderConfig?.portalURL
  const token = bynderConfig?.token
  const hasCredentials = portalURL && token

  function blockDropped(block) {
    block.find(`>.esd-structure-type`).html(stripoApi.translate('block.name'))
  }

  function onSelectBlock(block, context) {
    if (!context.showCustomBlockSettings) {
      openBynder(portalURL, token, block, locale)
    }
  }

  return {
    name: 'BynderBlockSettings',
    iconClass: 'es-icon-image',
    uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
    canBeSavedToLibrary: true,
    settingsCssPath: '/assets/css/settings.css',
    i18n: translations,
    blockName: 'block.name',
    blockType: 'block',
    disableSettingsPanel: true,
    isEnabled: () => hasCredentials, // Disable bynder block if no credentials
    getBlockLayoutToDrop,
    blockDropped,
    onSelectBlock
  }
}
