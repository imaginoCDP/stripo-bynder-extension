(() => {
  "use strict";
  const n = {
      name: null,
      iconClass: null,
      uniqueClassName: null,
      canBeSavedToLibrary: !1,
      settingsCssPath: null,
      previewCssPath: null,
      i18n: {},
      blockName: null,
      emptyContainerIcon: !1,
      blockType: null,
      blockConfigAttributeNames: [],
      controlsToCreate: [],
      blockControls: [],
      isEnabled: () => !0,
      emailInitialized(n) {},
      onSelectBlock(n, e) {},
      getBlockLayoutToDrop: () => "<td>Default block</td>",
      blockDropped(n) {},
      getBlockLabel: (n) => "Default block",
      getDefaultSettingsPanelState: (n) => ({}),
      onCleanLayout(n, e) {},
      onBlockCopy(n, e) {},
    },
    e = {
      en: { "block.name": "Bynder", "preview.label": "Bynder" },
      fr: { "block.name": "Bynder", "preview.label": "Bynder" },
    },
    t = ".bynderImage",
    l = ".bynderVideoLink";
  function s(n, s, a) {
    const { bynderConfig: o, locale: i } = n,
      c = o?.portalURL,
      d = o?.token,
      r = c && d;
    return {
      name: "BynderBlockSettings",
      iconClass: "es-icon-image",
      uniqueClassName: "bynder-block",
      canBeSavedToLibrary: !0,
      settingsCssPath: "/assets/css/settings.css",
      i18n: e,
      blockName: "block.name",
      blockType: "block",
      disableSettingsPanel: !0,
      isEnabled: () => r,
      getBlockLayoutToDrop: function () {
        return '<td class="esd-structure" align="left">\n  <script src="https://ucv.bynder.com/5.0.5/modules/compactview/bynder-compactview-3-latest.js"></script>\n  <table cellpadding="0" cellspacing="0" width="100%">\n    <tbody>\n      <tr>\n        <td width="560" class="esd-container-frame" align="center" valign="top">\n          <table cellpadding="0" cellspacing="0" width="100%">\n            <tbody>\n              <tr>\n                <td>\n                  <div class="bynderDefault">\n                    <div style="text-align: center; padding-top: 10px">\n                      <svg\n                        id="logosandtypes_com"\n                        xmlns="http://www.w3.org/2000/svg"\n                        viewBox="0 0 150 150"\n                        style="font-size: 30; width: 0.9em"\n                      >\n                        <path d="M0 0h150v150H0V0z" fill="none" />\n                        <path\n                          d="M112.5 21.1c-10 0-19.2 4.4-25.3 11.6L41.9 78 29.1 65.2c-2.4-2.4-3.6-5.6-3.2-9.2 0-7.6 6-13.6 13.6-13.6 3.6 0 6.4 1.2 8.8 3.2l1.2 1.2 1.6 1.6 11.2-11.2 3.2-3.2-2.8-2.8-1.2-1.2c-6-5.6-14-9.2-22.9-9.2C20.3 20.7 5 35.9 5 54.4c0 8.4 3.2 16.4 8.4 22.1l28.9 29.3 60.5-60.5c2.4-2.4 5.6-3.6 8.8-3.6 7.6 0 13.6 6 13.6 13.6 0 3.6-1.2 6.4-3.2 8.8l-40 40c-1.6 1.6-3.6 2.4-6 2.4s-4.4-1.2-6-2.8l-3.2-3.2-14.4 14.4 2.8 2.8c5.2 5.2 12.4 8.4 20.4 8.4 8 0 15.2-3.2 20.4-8.4l42.1-42.1c5.2-5.6 8.4-13.6 8.4-22.5-.3-16.8-15.6-32-34-32z"\n                          fill="#239fda"\n                        />\n                      </svg>\n                    </div>\n                    <p\n                      class="headerBlockContent"\n                      style="\n                        font-size: 18px;\n                        text-align: center;\n                        padding-bottom: 10px;\n                      "\n                    >\n                      Insert a new Bynder asset\n                    </p>\n                  </div>\n                  <img\n                    class="bynderImage"\n                    style="display: none"\n                    src=""\n                    width="100%"\n                  />\n                  <a\n                    class="bynderVideoLink"\n                    target="_blank"\n                    href=""\n                    style="display: none"\n                  >\n                    <img\n                      class="bynderVideo"\n                      src=""\n                      class="videoBlock"\n                      width="100%"\n                    />\n                  </a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</td>\n';
      },
      blockDropped: function (n) {
        n.find(">.esd-structure-type").html(s.translate("block.name"));
      },
      onSelectBlock: function (n, e) {
        e.showCustomBlockSettings ||
          (function (n, e, s, a) {
            window.BynderCompactView.open({
              language: a,
              theme: { colorButtonPrimary: "var(--color-primary-base)" },
              portal: { url: n },
              authentication: { getAccessToken: () => e, hideLogout: !0 },
              mode: "SingleSelectFile",
              assetTypes: ["image", "video"],
              onSuccess: (n) => {
                const e = n?.[0],
                  {
                    originalUrl: a,
                    type: o,
                    derivatives: i,
                    previewUrls: c,
                  } = e;
                switch ((s.find(".bynderDefault").css("display", "none"), o)) {
                  case "IMAGE":
                    s.find(l).css("display", "none"),
                      s.find(t).css("display", "inline").attr("src", a);
                    break;
                  case "VIDEO":
                    s.find(t).css("display", "none"),
                      s.find(l).css("display", "inline").attr("href", c[0].url),
                      s.find(".bynderVideo").attr("src", i?.webImage);
                }
              },
            });
          })(c, d, n, i);
      },
    };
  }
  const a = {
    create: (e, t, l) =>
      Object.assign({
        stripoConfig: e,
        stripoApi: t,
        extensionBasePath: l,
        ...n,
        ...s(e, t),
      }),
  };
  self.BynderBlockExtension = a;
})();
