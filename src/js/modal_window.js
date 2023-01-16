const TYPE_IMAGE = 'IMAGE'
const TYPE_VIDEO = 'VIDEO'

const TAG_NAME_IMAGE = '.bynderImage'
const TAG_NAME_VIDEO = '.bynderVideo'
const TAG_NAME_VIDEO_LINK = '.bynderVideoLink'
const TAG_NAME_DEFAULT = '.bynderDefault'

export function openBynder(portalURL, token, block, locale) {
  window.BynderCompactView.open({
    language: locale,
    theme: {
      colorButtonPrimary: 'var(--color-primary-base)' // our "info" blue
    },
    // Customer URL
    portal: {
      url: portalURL
    },
    // Customer API Key
    authentication: {
      getAccessToken: () => token,
      hideLogout: true // Let's disable logout for now
    },
    mode: 'SingleSelectFile', // Only mono selection for now
    assetTypes: ['image', 'video'], // Take off document type since no way to display it properly
    onSuccess: assets => {
      const asset = assets?.[0]
      const { originalUrl: url, type, derivatives, previewUrls } = asset
      block.find(TAG_NAME_DEFAULT).css('display', 'none')
      switch (type) {
        case TYPE_IMAGE:
          // NOTE: images with .tif extension might not work proprely
          // since all link within this type of asset are download links
          block.find(TAG_NAME_VIDEO_LINK).css('display', 'none')
          block.find(TAG_NAME_IMAGE).css('display', 'inline').attr('src', url)
          break
        case TYPE_VIDEO:
          block.find(TAG_NAME_IMAGE).css('display', 'none')
          block
            .find(TAG_NAME_VIDEO_LINK)
            .css('display', 'inline')
            .attr('href', previewUrls[0].url)
          block.find(TAG_NAME_VIDEO).attr('src', derivatives?.webImage)
          break
      }
    }
  })
}
