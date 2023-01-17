import {
  IMAGE_FORMAT_EPS,
  IMAGE_FORMAT_TIF,
  TAG_NAME_DEFAULT,
  TAG_NAME_IMAGE,
  TAG_NAME_IMAGE_LINK_NOT_SUPPORTED,
  TAG_NAME_IMAGE_NOT_SUPPORTED,
  TAG_NAME_VIDEO,
  TAG_NAME_VIDEO_LINK,
  TAG_NAME_VIDEO_LINK_IMAGE,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from "./constants";

/*
 * Function call Bynder Universal Content Viewer in HTML editor
 */

export function openBynder({ portalURL, token, block, locale }) {
  window.BynderCompactView.open({
    language: locale,
    theme: {
      colorButtonPrimary: "var(--color-primary-base)", // our "info" blue
    },
    // Customer URL
    portal: {
      url: portalURL,
    },
    // Customer API Key
    authentication: {
      getAccessToken: () => token,
      hideLogout: true, // Let's disable logout for now
    },
    mode: "SingleSelectFile", // Only mono selection for now
    assetTypes: ["image", "video"], // Take off document type since no way to display it properly
    // When selecting an asset, edit the HTML default layout and integrate the selected asset in it
    onSuccess: (assets, additionalInfo) => {
      const asset = assets?.[0];
      const { type, derivatives, previewUrls, extensions } = asset;

      block.find(TAG_NAME_DEFAULT).css("display", "none");
      switch (type) {
        case TYPE_IMAGE:
          // NOTE: images with .tif .eps extension might not work proprely
          // since most browsers does not support it
          if (
            extensions.includes(IMAGE_FORMAT_EPS) ||
            extensions.includes(IMAGE_FORMAT_TIF)
          ) {
            block.find(TAG_NAME_VIDEO).css("display", "none");
            block.find(TAG_NAME_IMAGE).css("display", "none");
            block.find(TAG_NAME_IMAGE_NOT_SUPPORTED).css("display", "inline");
            block
              .find(TAG_NAME_IMAGE_LINK_NOT_SUPPORTED)
              .css("display", "inline")
              .attr("href", additionalInfo?.selectedFile?.url);
          } else {
            block.find(TAG_NAME_VIDEO).css("display", "none");
            block.find(TAG_NAME_IMAGE_NOT_SUPPORTED).css("display", "none");
            block
              .find(TAG_NAME_IMAGE)
              .css("display", "inline")
              .attr("src", additionalInfo?.selectedFile?.url);
          }
          break;
        case TYPE_VIDEO:
          block.find(TAG_NAME_IMAGE).css("display", "none");
          block.find(TAG_NAME_IMAGE_NOT_SUPPORTED).css("display", "none");
          block
            .find(TAG_NAME_VIDEO)
            .css("display", "inline")
            .attr("src", previewUrls[0]);
          block.find(TAG_NAME_VIDEO_LINK).attr("href", previewUrls[0]);
          block
            .find(TAG_NAME_VIDEO_LINK_IMAGE)
            .attr("src", derivatives?.webImage);
          break;
      }
    },
  });
}
