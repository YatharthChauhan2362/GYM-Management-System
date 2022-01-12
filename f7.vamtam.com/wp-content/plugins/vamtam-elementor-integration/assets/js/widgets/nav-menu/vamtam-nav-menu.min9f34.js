class VamtamNavMenu extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        toggle: ".elementor-menu-toggle",
        dropdownMenu:
          ".elementor-nav-menu__container.elementor-nav-menu--dropdown",
      },
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings("selectors");
    return {
      $toggle: this.$element.find(selectors.toggle),
      $dropdownMenu: this.$element.find(selectors.dropdownMenu),
    };
  }
  onInit(...args) {
    super.onInit(...args),
      this.toggleDimensionsDiscrepancyFix(),
      this.handleMobileDisableScroll();
  }
  toggleDimensionsDiscrepancyFix() {
    this.elements.$toggle.on("click", this.stretchMenu.bind(this)),
      this.initStretchElement();
  }
  initStretchElement() {
    this.stretchElement = new elementorModules.frontend.tools.StretchElement({
      element: this.elements.$dropdownMenu,
    });
  }
  stretchMenu() {
    const _this = this,
      ms = jQuery("html").hasClass("ios-safari") ? 100 : 50;
    setTimeout(() => {
      _this.elements.$toggle.hasClass("elementor-active") &&
        (_this.getElementSettings("full_width")
          ? _this.stretchElement.stretch()
          : _this.stretchElement.reset());
    }, ms);
  }
  handleMobileDisableScroll() {
    const $el = this.$element,
      _this = this;
    let lockedScroll = !1,
      prevIsBelowMax = window.VAMTAM.isBelowMaxDeviceWidth();
    const disableScroll = function (implicit = !1) {
        jQuery("html, body").addClass("vamtam-disable-scroll"),
          implicit || (lockedScroll = !0);
      },
      enableScroll = function (implicit = !1) {
        jQuery("html, body").removeClass("vamtam-disable-scroll"),
          implicit || (lockedScroll = !1);
      },
      toggleHandler = function (e) {
        setTimeout(() => {
          e.target.closest(".vamtam-has-mobile-disable-scroll") &&
            (_this.elements.$toggle.hasClass("elementor-active")
              ? disableScroll()
              : enableScroll());
        }, 50);
      };
    var resizeHandler = function () {
      var isBelowMax = window.VAMTAM.isBelowMaxDeviceWidth();
      prevIsBelowMax !== isBelowMax &&
        lockedScroll &&
        (isBelowMax ? disableScroll(!0) : enableScroll(!0),
        (prevIsBelowMax = isBelowMax));
    };
    $el.hasClass("vamtam-has-mobile-disable-scroll") &&
      (this.elements.$toggle.on("click", toggleHandler),
      window.addEventListener(
        "resize",
        window.VAMTAM.debounce(resizeHandler, 200),
        !1
      ));
  }
}
jQuery(window).on("elementor/frontend/init", () => {
  let addHandler;
  (addHandler =
    elementorFrontend.elementsHandler &&
    elementorFrontend.elementsHandler.attachHandler
      ? elementorFrontend.elementsHandler.attachHandler(
          "nav-menu",
          VamtamNavMenu
        )
      : ($element) => {
          elementorFrontend.elementsHandler.addHandler(VamtamNavMenu, {
            $element: $element,
          });
        }),
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nav-menu.default",
      addHandler,
      100
    );
});
