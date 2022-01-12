class VamtamProductImages extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        container: ".elementor-widget-container",
        widget: ".elementor-widget-container",
        gallery:
          ".woocommerce-product-gallery, .woocommerce-product-gallery--vamtam",
        dummy: ".woocommerce-product-gallery--vamtam",
      },
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings("selectors");
    return {
      $container: this.$element.find(selectors.container),
      $widget: this.$element.find(selectors.widget),
      $gallery: this.$element.find(selectors.gallery),
      $dummy: this.$element.find(selectors.dummy),
    };
  }
  onInit(...args) {
    super.onInit(...args),
      this.wcFlexsliderHack(),
      this.handleProductImage(),
      this.reInitWCProductGallery(),
      this.ensureCorrectGallerySize();
  }
  ensureCorrectGallerySize() {
    const _this = this;
    let runOnImgLoad = !1;
    function doResize() {
      window.dispatchEvent(new Event("resize")),
        jQuery(window).trigger("resize");
    }
    jQuery(
      ".woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image:eq(0) .wp-post-image"
    ).one("load", function () {
      (runOnImgLoad = !0),
        _this.elements.$gallery.addClass("vamtam-hide"),
        setTimeout(() => {
          doResize(), _this.elements.$gallery.removeClass("vamtam-hide");
        }, 150);
    }),
      jQuery(window).load(() => {
        runOnImgLoad ||
          setTimeout(() => {
            doResize();
          }, 0);
      });
  }
  reInitWCProductGallery() {
    const wcLightboxActive = jQuery("body").hasClass(
        "wc-product-gallery-lightbox-active"
      ),
      isFullSizedGallery = this.$element.hasClass(
        "vamtam-has-full-sized-gallery"
      );
    if (!wcLightboxActive || !isFullSizedGallery) return;
    const galleryParams = {
      ...wc_single_product_params,
      flexslider_enabled: !1,
      zoom_enabled: !1,
    };
    this.elements.$gallery.trigger("wc-product-gallery-before-init", [
      this,
      galleryParams,
    ]),
      this.elements.$gallery.wc_product_gallery(galleryParams),
      this.elements.$gallery.trigger("wc-product-gallery-after-init", [
        this,
        galleryParams,
      ]);
  }
  wcFlexsliderHack() {
    this.elements.$dummy.length &&
      (this.elements.$gallery.removeClass(
        "woocommerce-product-gallery--vamtam"
      ),
      this.elements.$gallery.addClass("woocommerce-product-gallery"),
      this.elements.$gallery.css("opacity", "1"));
  }
  handleProductImage() {
    this.handleDisableLinkOption(),
      this.handleDoubleLightbox(),
      this.handleWcZoomElementorLightBoxConflict();
  }
  handleWcZoomElementorLightBoxConflict() {
    const wcZoomActive = jQuery("body").hasClass(
      "wc-product-gallery-zoom-active"
    );
    if (!wcZoomActive) return;
    const elementorLightboxActive = elementorFrontend.getKitSettings(
      "global_image_lightbox"
    );
    if (!elementorLightboxActive) return;
    const onZoomedImgClick = function (e) {
      const link = jQuery(e.target).siblings("a");
      link.length && link.click();
    };
    jQuery(document).on(
      "click",
      ".woocommerce-product-gallery__image img.zoomImg",
      onZoomedImgClick
    );
  }
  handleDoubleLightbox() {
    const wcLightboxActive = jQuery("body").hasClass(
      "wc-product-gallery-lightbox-active"
    );
    if (!wcLightboxActive) return;
    const elementorLightboxActive = elementorFrontend.getKitSettings(
      "global_image_lightbox"
    );
    elementorLightboxActive && this.disableImageLinks(wcLightboxActive);
  }
  disableImageLinks(wcLightboxActive = !1) {
    const links = this.$element.find("a > img").parent();
    links.length &&
      jQuery.each(links, function (i, link) {
        wcLightboxActive
          ? jQuery(link).attr("data-elementor-open-lightbox", "no")
          : jQuery(link).removeAttr("href");
      });
  }
  handleDisableLinkOption() {
    if (!this.$element.hasClass("vamtam-has-disable-image-link")) return;
    const wcLightboxActive = jQuery("body").hasClass(
      "wc-product-gallery-lightbox-active"
    );
    this.disableImageLinks(wcLightboxActive);
  }
}
jQuery(window).on("elementor/frontend/init", () => {
  let addHandler;
  (addHandler =
    elementorFrontend.elementsHandler &&
    elementorFrontend.elementsHandler.attachHandler
      ? elementorFrontend.elementsHandler.attachHandler(
          "woocommerce-product-images",
          VamtamProductImages
        )
      : ($element) => {
          elementorFrontend.elementsHandler.addHandler(VamtamProductImages, {
            $element: $element,
          });
        }),
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/woocommerce-product-images.default",
      addHandler,
      100
    );
});
