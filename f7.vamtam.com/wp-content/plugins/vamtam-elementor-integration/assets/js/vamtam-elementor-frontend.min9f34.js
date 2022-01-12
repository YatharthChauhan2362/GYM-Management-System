!(function ($, undefined) {
  "use strict";
  $(function () {
    window.VAMTAM_FRONT.elementor = window.VAMTAM_FRONT.elementor || {};
    var VAMTAM_ELEMENTOR = {
      domLoaded: function () {
        this.VamtamMainNavHandler.init(),
          this.VamtamActionLinksHandler.init(),
          this.VamtamPopupToggleHandler.init();
      },
      pageLoaded: function () {},
      VamtamMainNavHandler: {
        init: function () {
          this.fixMenuDrodownScrolling();
        },
        fixMenuDrodownScrolling: function () {
          var $mainMenuDropdown = $(
              ".elementor-location-header .elementor-nav-menu--dropdown-tablet .elementor-nav-menu--dropdown.elementor-nav-menu__container"
            ).first(),
            menuToggle = $mainMenuDropdown.siblings(
              ".elementor-menu-toggle"
            )[0];
          if ($mainMenuDropdown.length && menuToggle.length) {
            var onMenuToggleClick = function () {
              if ($(menuToggle).hasClass("elementor-active")) {
                var height = $("html").hasClass("ios-safari")
                  ? $mainMenuDropdown[0].getBoundingClientRect().top + 100
                  : $mainMenuDropdown[0].getBoundingClientRect().top;
                $mainMenuDropdown.css(
                  "max-height",
                  "calc(100vh - " + height + "px)"
                ),
                  menuToggle.removeEventListener("click", onMenuToggleClick);
              }
            };
            menuToggle.addEventListener("click", onMenuToggleClick);
          }
        },
      },
      VamtamActionLinksHandler: {
        init: function () {
          this.popupActionLinks();
        },
        popupActionLinks: function () {
          var _self = this,
            prevIsBelowMax = window.VAMTAM.isBelowMaxDeviceWidth(),
            alignedPopups = [],
            handleAlignWithParent = function (
              popupId,
              popupParent,
              clearPrevPos
            ) {
              var popupWrapper = $("#elementor-popup-modal-" + popupId),
                popup = $(popupWrapper).find(".dialog-widget-content"),
                adminBarHeight = window.VAMTAM.adminBarHeight;
              if (popup.length && popupParent) {
                var parentPos = popupParent.getBoundingClientRect(),
                  visibilityCheck;
                clearPrevPos
                  ? $(popup).css({ top: "", left: "" })
                  : ($(popup).css({
                      top: parentPos.bottom - adminBarHeight,
                      left: parentPos.left,
                    }),
                    (visibilityCheck = setInterval(function () {
                      "none" === $(popupWrapper).css("display") &&
                        ($(popup).css({ top: "", left: "" }),
                        clearInterval(visibilityCheck));
                    }, 500)));
              }
            },
            repositionAlignedPopups = function (clear) {
              alignedPopups.forEach(function (popup) {
                clear
                  ? handleAlignWithParent(popup.id, popup.parent, !0)
                  : handleAlignWithParent(popup.id, popup.parent);
              });
            },
            popupResizeHandler = function () {
              var isBelowMax = window.VAMTAM.isBelowMaxDeviceWidth();
              prevIsBelowMax !== isBelowMax
                ? (isBelowMax
                    ? repositionAlignedPopups(!0)
                    : repositionAlignedPopups(),
                  (prevIsBelowMax = isBelowMax))
                : isBelowMax || repositionAlignedPopups();
            },
            storePopup = function (popupId, popupParent) {
              var done;
              alignedPopups.forEach(function (popup) {
                popup.id === popupId &&
                  ((popup.parent = popupParent), (done = !0));
              }),
                done ||
                  alignedPopups.push({ id: popupId, parent: popupParent });
            },
            checkAlignWithParent = function (e) {
              var actionLink = $(e.currentTarget).attr("href");
              if (actionLink) {
                var settings =
                  _self.utils.getSettingsFromActionLink(actionLink);
                settings &&
                  settings.align_with_parent &&
                  (storePopup(settings.id, e.currentTarget),
                  window.VAMTAM.isMaxDeviceWidth() &&
                    handleAlignWithParent(settings.id, e.currentTarget),
                  window.removeEventListener("resize", popupResizeHandler),
                  window.addEventListener("resize", popupResizeHandler, !1));
              }
            };
          elementorFrontend.elements.$document.on(
            "click",
            'a[href^="#elementor-action"]',
            checkAlignWithParent
          );
        },
        utils: {
          getSettingsFromActionLink: function (url) {
            if ((url = decodeURIComponent(url))) {
              var settingsMatch = url.match(/settings=(.+)/),
                settings = {};
              return (
                settingsMatch &&
                  (settings = JSON.parse(atob(settingsMatch[1]))),
                settings
              );
            }
          },
          getActionFromActionLink: function (url) {
            if ((url = decodeURIComponent(url))) {
              var actionMatch = url.match(/action=(.+?)&/),
                action;
              if (actionMatch) return this.actions[actionMatch[1]];
            }
          },
        },
      },
      VamtamPopupToggleHandler: {
        init: function () {
          var popupToggles = document.querySelectorAll(".vamtam-popup-toggle"),
            popupTogglesStates = [],
            prevIsBelowMax = window.VAMTAM.isBelowMaxDeviceWidth();
          if (!popupToggles.length) return;
          const onClickHandler = function (e, toggleFound, maybeClose = !1) {
              var curToggle,
                isResize = !0;
              e && (maybeClose || e.preventDefault(), (isResize = !1)),
                popupTogglesStates.forEach(function (toggle) {
                  (toggleFound.isSameNode(toggle.toggle) ||
                    toggleFound.isSameNode(toggle.toggleClone)) &&
                    (curToggle = toggle);
                });
              var curTogglePos = curToggle.toggle.getBoundingClientRect(),
                curInnermostElPos =
                  curToggle.innermostEl.getBoundingClientRect();
              if (
                (maybeClose ||
                  requestAnimationFrame(() => {
                    Object.assign(curToggle.toggleClone.style, {
                      top: curTogglePos.top + "px",
                      left: curTogglePos.left + "px",
                    }),
                      Object.assign(curToggle.innermostElClone.style, {
                        position: "fixed",
                        top: curInnermostElPos.top + "px",
                        left: curInnermostElPos.left + "px",
                      });
                  }),
                isResize)
              )
                return;
              const setToggleData = () => {
                if (
                  ((curToggle.modalParent = $(
                    `#elementor-popup-modal-${curToggle.modalId}`
                  )),
                  (curToggle.modalContent =
                    curToggle.modalParent &&
                    $(curToggle.modalParent).find(
                      ".dialog-message.dialog-lightbox-message"
                    )),
                  !curToggle.modalSettings)
                ) {
                  const popup = $(curToggle.modalContent).find(
                    `[data-elementor-id="${curToggle.modalId}"]`
                  );
                  popup.length &&
                    (curToggle.modalSettings = JSON.parse(
                      $(popup).attr("data-elementor-settings")
                    ));
                }
              };
              if ((setToggleData(), curToggle.popupToggleActive)) {
                if (!curToggle.toggleClone.classList.contains("is-clickable"))
                  return;
                if (maybeClose && curToggle.modalId)
                  if ("keyup" === e.type) {
                    if (
                      curToggle.modalSettings &&
                      "yes" === curToggle.modalSettings.prevent_close_on_esc_key
                    )
                      return;
                  } else if ("click" === e.type) {
                    if (
                      curToggle.modalSettings &&
                      "yes" ===
                        curToggle.modalSettings
                          .prevent_close_on_background_click
                    )
                      return;
                    if (
                      curToggle.modalContent.length &&
                      curToggle.modalContent[0] &&
                      (e.target.isSameNode(curToggle.modalContent[0]) ||
                        curToggle.modalContent[0].contains(e.target))
                    )
                      return;
                  }
                requestAnimationFrame(function () {
                  curToggle.toggle.classList.remove("clone-active"),
                    curToggle.toggleClone.classList.remove("is-active"),
                    curToggle.toggleClone.classList.remove("is-clickable"),
                    curToggle.toggleClone.classList.add("is-closed"),
                    (curToggle.popupToggleActive = !1);
                });
              } else
                requestAnimationFrame(function () {
                  curToggle.toggleClone.classList.remove("is-closed"),
                    curToggle.toggleClone.classList.add("is-active"),
                    curToggle.toggle.classList.add("clone-active"),
                    curToggle.toggleClone.classList.add("is-clickable"),
                    (curToggle.popupToggleActive = !0);
                });
              !maybeClose &&
                curToggle.modalId &&
                setTimeout(() => {
                  setToggleData();
                }, 1e3);
            },
            onResizeHandler = function () {
              const activeClones = document.querySelectorAll(
                  ".vamtam-popup-toggle-clone.is-active"
                ),
                isBelowMax = window.VAMTAM.isBelowMaxDeviceWidth(),
                forceDisablePopups = () => {
                  activeClones.forEach(function (activeClone) {
                    $(activeClone).click();
                  });
                };
              prevIsBelowMax !== isBelowMax &&
                (forceDisablePopups(),
                popupTogglesStates.forEach(function (toggle) {
                  copyToggleStyles(toggle.toggle, toggle.toggleClone);
                }),
                (prevIsBelowMax = isBelowMax)),
                activeClones.forEach(function (clone) {
                  requestAnimationFrame(() => {
                    clone.classList.add("hidden");
                  }),
                    onClickHandler(null, clone),
                    setTimeout(() => {
                      clone.classList.remove("hidden");
                    }, 700);
                });
            };
          function updateInnerElsForToggle(toggle, clone, innermostEl) {
            var newInnermostEl, newInnermostElClone;
            if (
              (toggle.classList.contains("elementor-widget-icon") &&
                ((newInnermostEl = $(toggle)
                  .find(".elementor-icon svg, .elementor-icon")
                  .first()[0]),
                (newInnermostElClone = $(clone)
                  .find(".elementor-icon svg, .elementor-icon")
                  .first()[0])),
              newInnermostEl && innermostEl !== newInnermostEl)
            )
              return {
                innermostEl: newInnermostEl,
                innermostElClone: newInnermostElClone,
              };
          }
          function copyToggleStyles(toggle, clone) {
            toggle.classList.contains("elementor-widget-button")
              ? copyRequiredStyles(toggle, clone, "button")
              : toggle.classList.contains("elementor-widget-icon")
              ? copyRequiredStyles(toggle, clone, "icon")
              : copyRequiredStyles(toggle, clone);
          }
          function copyRequiredStyles(toggle, clone, type) {
            var innermostEl = $(toggle).find('*:not(:has("*"))').first()[0],
              innermostElClone = $(clone).find('*:not(:has("*"))').first()[0];
            switch (type) {
              case "button":
                var btn, btnClone;
                copyStylesFromTo(innermostEl, innermostElClone, type),
                  copyStylesFromTo(
                    $(toggle).find(".elementor-button").first()[0],
                    $(clone).find(".elementor-button").first()[0],
                    type
                  ),
                  copyStylesFromTo(toggle, clone, type);
                break;
              case "icon":
                var icon, iconClone;
                copyStylesFromTo(
                  $(toggle)
                    .find(".elementor-icon svg, .elementor-icon i")
                    .first()[0],
                  $(clone)
                    .find(".elementor-icon svg, .elementor-icon i")
                    .first()[0],
                  type
                ),
                  copyStylesFromTo(toggle, clone, type);
                break;
              default:
                copyStylesFromTo(innermostEl, innermostElClone),
                  copyStylesFromTo(toggle, clone);
            }
          }
          function copyStylesFromTo(el, cloneEl, type) {
            if (el && cloneEl) {
              var styles = window.getComputedStyle(el, null);
              switch (type) {
                case "icon":
                  Object.assign(cloneEl.style, {
                    font:
                      "" !== styles.getPropertyValue("font")
                        ? styles.getPropertyValue("font")
                        : `${styles.getPropertyValue(
                            "font-style"
                          )} ${styles.getPropertyValue(
                            "font-variant"
                          )} ${styles.getPropertyValue(
                            "font-weight"
                          )} ${styles.getPropertyValue(
                            "font-size"
                          )}/${styles.getPropertyValue(
                            "line-height"
                          )} ${styles.getPropertyValue("font-family")}`,
                    width: styles.getPropertyValue("width"),
                    height: styles.getPropertyValue("height"),
                    color: styles.getPropertyValue("color"),
                    fill: styles.getPropertyValue("fill"),
                    stroke: styles.getPropertyValue("stroke"),
                  });
                  break;
                case "button":
                default:
                  Object.assign(cloneEl.style, {
                    font:
                      "" !== styles.getPropertyValue("font")
                        ? styles.getPropertyValue("font")
                        : `${styles.getPropertyValue(
                            "font-style"
                          )} ${styles.getPropertyValue(
                            "font-variant"
                          )} ${styles.getPropertyValue(
                            "font-weight"
                          )} ${styles.getPropertyValue(
                            "font-size"
                          )}/${styles.getPropertyValue(
                            "line-height"
                          )} ${styles.getPropertyValue("font-family")}`,
                    width: styles.getPropertyValue("width"),
                    height: styles.getPropertyValue("height"),
                    color: styles.getPropertyValue("color"),
                  });
              }
            }
          }
          popupToggles.forEach(function (toggle) {
            var clone = toggle.cloneNode(!0),
              innermostEl = $(toggle).find('*:not(:has("*"))').first()[0],
              innermostElClone = $(clone).find('*:not(:has("*"))').first()[0],
              actionLink = $(toggle).find(
                'a[href^="%23elementor-action"], a[href^="#elementor-action"]'
              ),
              actionSettings =
                actionLink.length &&
                window.VAMTAM_FRONT.elementor.urlActions.getSettingsFromActionLink(
                  $(actionLink).attr("href")
                ),
              modalId = actionSettings && actionSettings.id;
            clone.classList.add("vamtam-popup-toggle-clone");
            const newInnerEls = updateInnerElsForToggle(
              toggle,
              clone,
              innermostEl
            );
            newInnerEls &&
              ((innermostEl = newInnerEls.innermostEl),
              (innermostElClone = newInnerEls.innermostElClone)),
              copyToggleStyles(toggle, clone),
              popupTogglesStates.push({
                popupToggleActive: !1,
                toggle: toggle,
                toggleClone: clone,
                innermostEl: innermostEl,
                innermostElClone: innermostElClone,
                modalId: modalId,
                modalParent: void 0,
                modalContent: void 0,
                modalSettings: void 0,
              }),
              document.body.appendChild(clone);
          }),
            document.body.addEventListener("click", function (e) {
              var popupToggle =
                  (!!e.target.classList.contains("vamtam-popup-toggle") &&
                    e.target) ||
                  e.target.closest(".vamtam-popup-toggle"),
                activeClones = document.querySelectorAll(
                  ".vamtam-popup-toggle-clone.is-active"
                ),
                isClone =
                  popupToggle &&
                  popupToggle.classList.contains("vamtam-popup-toggle-clone");
              const enableActivePopupClone = () => {
                  let isActionLinkOrInisdeActionLink = !1,
                    href = $(e.target).attr("href");
                  (isActionLinkOrInisdeActionLink = href
                    ? href.startsWith("%23elementor-action") ||
                      href.startsWith("#elementor-action")
                    : e.target.closest(
                        'a[href^="%23elementor-action"], a[href^="#elementor-action"]'
                      )),
                    isActionLinkOrInisdeActionLink &&
                      onClickHandler(e, popupToggle);
                },
                maybeDisablePopupClones = () => {
                  activeClones.forEach(function (clone) {
                    onClickHandler(e, clone, !0);
                  });
                };
              !popupToggle || isClone || activeClones.length
                ? activeClones.length &&
                  (maybeDisablePopupClones(),
                  popupToggle && !isClone && enableActivePopupClone())
                : enableActivePopupClone();
            }),
            document.body.addEventListener("keyup", function (e) {
              var activeClones;
              "Escape" === e.key &&
                document
                  .querySelectorAll(".vamtam-popup-toggle-clone.is-active")
                  .forEach(function (clone) {
                    onClickHandler(e, clone, !0);
                  });
            }),
            window.addEventListener(
              "resize",
              window.VAMTAM.debounce(onResizeHandler, 100),
              !1
            );
        },
      },
    };
    (window.VAMTAM_FRONT.elementor.urlActions =
      VAMTAM_ELEMENTOR.VamtamActionLinksHandler.utils),
      $(document).ready(function () {
        VAMTAM_ELEMENTOR.domLoaded();
      }),
      $(window).load(function () {
        VAMTAM_ELEMENTOR.pageLoaded();
      });
  });
})(jQuery);
