!(function (e) {
  "use strict";
  var t = (window.VAMTAM = window.VAMTAM || {});
  (t.debounce = function (e, t, n) {
    var o;
    return function () {
      var a = this,
        i = arguments,
        r = n && !o;
      clearTimeout(o),
        (o = setTimeout(function () {
          (o = null), n || e.apply(a, i);
        }, t)),
        r && e.apply(a, i);
    };
  }),
    (t.offset = function (e) {
      var t = e.getBoundingClientRect(),
        n = window.pageXOffset || document.documentElement.scrollLeft,
        o = window.pageYOffset || document.documentElement.scrollTop;
      return { top: t.top + o, left: t.left + n };
    }),
    (t.scroll_handlers = []),
    (t.latestKnownScrollY = 0);
  var n = !1;
  (t.addScrollHandler = function (e) {
    requestAnimationFrame(function () {
      e.init(),
        t.scroll_handlers.push(e),
        e.measure(t.latestKnownScrollY),
        e.mutate(t.latestKnownScrollY);
    });
  }),
    (t.onScroll = function () {
      (t.latestKnownScrollY = window.pageYOffset),
        n ||
          ((n = !0),
          requestAnimationFrame(function () {
            var e;
            for (e = 0; e < t.scroll_handlers.length; e++)
              t.scroll_handlers[e].measure(t.latestKnownScrollY);
            for (e = 0; e < t.scroll_handlers.length; e++)
              t.scroll_handlers[e].mutate(t.latestKnownScrollY);
            n = !1;
          }));
    }),
    window.addEventListener("scroll", t.onScroll, { passive: !0 }),
    (t.load_script = function (e, t) {
      var n = document.createElement("script");
      (n.type = "text/javascript"),
        (n.async = !0),
        (n.src = e),
        t && (n.onload = t),
        document.getElementsByTagName("script")[0].before(n);
    }),
    (t.load_style = function (e, t, n, o) {
      var a = document.createElement("link");
      (a.rel = "stylesheet"),
        (a.type = "text/css"),
        (a.media = t),
        (a.href = e),
        n && (a.onload = n),
        o ? o.after(a) : document.getElementsByTagName("link")[0].before(a);
    }),
    (t.isBelowMaxDeviceWidth = function () {
      return !window.matchMedia(
        "(min-width: " + VAMTAM_FRONT.max_breakpoint + "px)"
      ).matches;
    }),
    (t.isMaxDeviceWidth = function () {
      return window.matchMedia(
        "(min-width: " + VAMTAM_FRONT.max_breakpoint + "px)"
      ).matches;
    }),
    (t.isMobileBrowser =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)),
    (t.getScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth);
})(),
  (function (e, t, n) {
    "use strict";
    var o,
      a,
      i = e("header.main-header").find(".header-contents"),
      r = document.getElementById("vamtam-fallback-main-menu-toggle"),
      s = document.querySelector(
        "#main-menu > .mega-menu-wrap > .mega-menu-toggle"
      ),
      c = function () {
        clearTimeout(o), (o = setTimeout(d, 200));
      },
      d = function () {
        window.removeEventListener("scroll", c, { passive: !0 }),
          (t.blockStickyHeaderAnimation = !1),
          a && a();
      },
      l = function (e, n, o) {
        requestAnimationFrame(function () {
          var n = e.offset().top;
          t.blockStickyHeaderAnimation = !0;
          var d;
          d = i.height();
          var l = n - t.adminBarHeight - d;
          (a = o),
            window.addEventListener("scroll", c, { passive: !0 }),
            window.scroll({ left: 0, top: l, behavior: "smooth" }),
            e.attr("id") &&
              (history.pushState
                ? history.pushState(null, null, "#" + e.attr("id"))
                : (window.location.hash = e.attr("id"))),
            r && r.classList.remove("mega-menu-open"),
            s && s.classList.remove("mega-menu-open");
        });
      };
    if (
      (e(document.body).on(
        "click",
        ".vamtam-animated-page-scroll[href], .vamtam-animated-page-scroll [href], .vamtam-animated-page-scroll [data-href]",
        function (t) {
          var n = e(this).prop("href") || e(this).data("href"),
            o = e("#" + n.split("#")[1]),
            a = document.createElement("a");
          (a.href = n),
            o.length &&
              a.pathname === window.location.pathname &&
              (r.classList.remove("mega-menu-open"),
              s.classList.remove("mega-menu-open"),
              l(o),
              t.preventDefault());
        }
      ),
      "" !== window.location.hash &&
        (e('.vamtam-animated-page-scroll[href*="' + window.location.hash + '"]')
          .length ||
          e(
            '.vamtam-animated-page-scroll [href*="' +
              window.location.hash +
              '"]'
          ).length ||
          e(
            '.vamtam-animated-page-scroll [data-href*="' +
              window.location.hash +
              '"]'
          ).length))
    ) {
      var m = e(window.location.hash);
      m.length > 0 && e(window).add("html, body, #page").scrollTop(0),
        setTimeout(function () {
          l(m);
        }, 400);
    }
    document.addEventListener("DOMContentLoaded", function () {
      if (
        "elementorFrontend" in window &&
        !window.elementorFrontend.isEditMode()
      ) {
        let t,
          n,
          o = document.querySelectorAll(".vamtam-menu-click-on-hover a"),
          a = document.querySelector(".elementor-location-header"),
          i = !1,
          r = null;
        const s = function () {
          (a.style.zIndex = void 0),
            (a.style.position = void 0),
            e(document.body).click(),
            (r = null),
            (i = !1);
        };
        e(document.body).on(
          "mouseenter",
          ".dialog-widget-content",
          function () {
            clearTimeout(t);
          }
        ),
          e(document.body).on(
            "mouseleave",
            ".dialog-widget-content",
            function () {
              t = setTimeout(s, 500);
            }
          ),
          e(document.body).on(
            "mouseenter",
            ".menu-item-has-children",
            function () {
              clearTimeout(t), clearTimeout(n), s();
            }
          ),
          o.forEach(function (o) {
            o.addEventListener("mouseenter", function (s) {
              s.preventDefault(),
                s.stopPropagation(),
                r === o || i
                  ? clearTimeout(t)
                  : ((r = o),
                    (n = setTimeout(() => {
                      (a.style.zIndex = 9999),
                        (a.style.position = "relative"),
                        (i = !0),
                        e(o).click();
                    }, 200)));
            }),
              o.addEventListener("mouseleave", function () {
                clearTimeout(n),
                  i ? (t = setTimeout(s, 500)) : ((r = null), (i = !1));
              });
          });
      }
    });
  })(jQuery, window.VAMTAM),
  (function (e, t) {
    "use strict";
    (window.VAMTAM = window.VAMTAM || {}),
      e(function () {
        var t, n;
        (window.VAMTAM.adminBarHeight = document.body.classList.contains(
          "admin-bar"
        )
          ? 32
          : 0),
          /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !window.MSStream &&
            requestAnimationFrame(function () {
              document.documentElement.classList.add("ios-safari");
            }),
          navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome") &&
            requestAnimationFrame(function () {
              document.documentElement.classList.add("safari");
            }),
          navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome") &&
            requestAnimationFrame(function () {
              document.documentElement.classList.add("safari");
            }),
          (n = document.body),
          window.addEventListener(
            "scroll",
            function () {
              clearTimeout(t),
                requestAnimationFrame(function () {
                  n.classList.add("disable-hover"),
                    (t = setTimeout(function () {
                      n.classList.remove("disable-hover");
                    }, 300));
                });
            },
            { passive: !0 }
          ),
          document.addEventListener("click", function (e) {
            e.target.closest(".vamtam-trigger-print") &&
              (window.print(), e.preventDefault());
          }),
          (window.VAMTAM.resizeElements = function () {
            e(
              "#page .media-inner,\t\t\t\t.wp-block-embed-vimeo:not(.wp-has-aspect-ratio),\t\t\t\t:not(.wp-block-embed__wrapper) > .vamtam-video-frame"
            )
              .find("iframe, object, embed, video")
              .each(function () {
                setTimeout(
                  function () {
                    requestAnimationFrame(
                      function () {
                        var t = this.offsetWidth;
                        (this.style.width = "100%"),
                          "0" === this.width && "0" === this.height
                            ? (this.style.height = (9 * t) / 16 + "px")
                            : (this.style.height =
                                (this.height * t) / this.width + "px"),
                          e(this).trigger("vamtam-video-resized");
                      }.bind(this)
                    );
                  }.bind(this),
                  50
                );
              }),
              setTimeout(function () {
                requestAnimationFrame(function () {
                  e(".mejs-time-rail").css("width", "-=1px");
                });
              }, 100);
          }),
          window.addEventListener(
            "resize",
            window.VAMTAM.debounce(window.VAMTAM.resizeElements, 100),
            !1
          ),
          window.VAMTAM.resizeElements();
      });
    var n = function () {
      var t = document.querySelectorAll(".vamtam-overlay-trigger"),
        n = [],
        o = window.VAMTAM.isBelowMaxDeviceWidth(),
        a = function (t) {
          var o = t.currentTarget;
          if (e(o).hasClass("elementor-menu-toggle")) {
            var i = e(o).closest(".elementor-row");
            i.length || (i = e(o).closest(".elementor-container")),
              i.hasClass("vamtam-overlay-trigger--overlay") &&
                (i.removeClass("vamtam-overlay-trigger--overlay"),
                o.removeEventListener("click", a),
                n.forEach(function (e) {
                  (e.overlayTarget !== o && e.closeTrigger !== o) ||
                    (e.isActive = !1);
                }));
          }
          e(".vamtam-overlay-trigger--overlay .vamtam-overlay-element:visible")
            .length < 2 &&
            (e("html, body").removeClass("vamtam-disable-scroll"),
            e("#scroll-to-top").removeClass("hidden"));
        },
        i = function (t) {
          var o = t.currentTarget;
          if (e(o).hasClass("elementor-menu-toggle")) {
            var i = e(o).closest(".elementor-row");
            if (
              (i.length || (i = e(o).closest(".elementor-container")),
              i.hasClass("vamtam-menu-nav-overlay-inside") ||
                (i.addClass("vamtam-menu-nav-overlay-inside"),
                e(i)
                  .find(".vamtam-overlay-element")
                  .css(
                    "top",
                    e(i)[0].getBoundingClientRect().top + e(i).height() + "px"
                  )),
              i.hasClass("vamtam-overlay-trigger--overlay"))
            )
              return;
            i.addClass("vamtam-overlay-trigger--overlay"),
              n.forEach(function (e) {
                (e.overlayTarget !== o && e.closeTrigger !== o) ||
                  (e.isActive = !0);
              });
          }
          e("html, body").addClass("vamtam-disable-scroll"),
            e("#scroll-to-top").addClass("hidden"),
            (function (t) {
              if (e(t).hasClass("elementor-menu-toggle"))
                t.removeEventListener("click", a),
                  t.addEventListener("click", a);
            })(o);
        };
      if (
        (t.forEach(function (t) {
          if (e(t).hasClass("elementor-widget-nav-menu")) {
            var o = e(t).find(".elementor-menu-toggle")[0];
            o.removeEventListener("click", i),
              o.addEventListener("click", i),
              n.push({ overlayTarget: t, closeTrigger: o, isActive: !1 });
            var a = e(t).closest(".elementor-row");
            return (
              a.length || (a = e(t).closest(".elementor-container")),
              void e('<span class="vamtam-overlay-element"></span>').appendTo(a)
            );
          }
        }),
        t.length)
      ) {
        document.addEventListener(
          "click",
          function (e) {
            n.forEach(function (t) {
              t.isActive &&
                (e.target === t.overlayTarget ||
                  t.overlayTarget.contains(e.target) ||
                  t.closeTrigger.click());
            });
          },
          !0
        ),
          window.addEventListener(
            "resize",
            window.VAMTAM.debounce(function () {
              var e = window.VAMTAM.isBelowMaxDeviceWidth();
              o !== e &&
                (n.forEach(function (e) {
                  e.isActive && e.closeTrigger.click();
                }),
                (o = e));
            }, 200),
            !1
          );
      }
    };
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        window.VAMTAM.load_script(VAMTAM_FRONT.jspath + "low-priority.js"),
          n(),
          jQuery("html").css(
            "--vamtam-scrollbar-width",
            window.VAMTAM.getScrollbarWidth() + "px"
          );
      },
      { passive: !0 }
    );
  })(jQuery),
  (function (e, t, n) {
    "use strict";
    (window.Cookies = window.Cookies || {
      get: function (e) {
        var t = ("; " + document.cookie).split("; " + e + "=");
        if (2 === t.length) return t.pop().split(";").shift();
      },
    }),
      e(function () {
        var t = e(".fixed-header-box .cart-dropdown"),
          n = e(".vamtam-cart-dropdown-link"),
          o = e(".products", n),
          a = e(".elementor-widget-woocommerce-menu-cart"),
          i = a.length,
          r = i && e(a).find(".vamtam-elementor-menu-cart__header .item-count"),
          s =
            "wc_add_to_cart_params" in window &&
            window.wc_add_to_cart_params.is_cart;
        function c() {
          s &&
            document
              .querySelectorAll(".woocommerce-cart-form__contents")
              .forEach(function (t) {
                !e(t).hasClass("shop_table") &&
                  !e(t).parent().hasClass("vamtam-cart-main") &&
                  e(t).removeClass("woocommerce-cart-form__contents");
              });
        }
        function d() {
          const t = e("#elementor-menu-cart__toggle_button:visible");
          e.each(t, function (e, t) {
            t.click();
          });
        }
        !(
          "elementorFrontend" in window && window.elementorFrontend.isEditMode()
        )
          ? e(document).ready(function () {})
          : e(window).on("elementor/frontend/init", function () {
              window.elementor.on("document:loaded", function () {
                setTimeout(function () {}, 1e3);
              });
            });
        var l = function (t) {
            if ((t.preventDefault(), s))
              return t.stopImmediatePropagation(), !1;
            if (window.VAMTAM.isMobileBrowser)
              return (
                t.stopImmediatePropagation(),
                (window.location = window.wc_add_to_cart_params.cart_url),
                !1
              );
            e("body").addClass("vamtam-disable-scroll"),
              e("#scroll-to-top").addClass("hidden");
            var n = e(t.target)
              .closest(".elementor-section-wrap")
              .find("section.elementor-element")
              .first();
            n.css("will-change", "transform"), n.css("z-index", "1000");
          },
          m = function (t, n) {
            (e(t.target).hasClass("elementor-menu-cart__container") ||
              e(t.target).hasClass("vamtam-close-cart") ||
              ("no-target" === t && n)) &&
              (e("body").removeClass("vamtam-disable-scroll"),
              e("#scroll-to-top").removeClass("hidden"),
              e(t.target)
                .closest("section.elementor-element")
                .css("z-index", ""));
          };
        function u() {
          document
            .querySelectorAll("#elementor-menu-cart__toggle_button")
            .forEach(function (e) {
              e.removeEventListener("click", l),
                e.addEventListener("click", l, !0);
            }),
            document
              .querySelectorAll(
                ".elementor-menu-cart__container .elementor-menu-cart__close-button, .elementor-menu-cart__container"
              )
              .forEach(function (e) {
                e.removeEventListener("click", m),
                  e.addEventListener("click", m);
              });
        }
        function f(t) {
          var n = e("#scroll-to-top.vamtam-scroll-to-top");
          n.length && (t ? n.css("bottom", "10px") : n.css("bottom", "95px"));
        }
        function v(t) {
          if (t) {
            e(".woocommerce-notices-wrapper").empty().append(t);
            var n = e(".woocommerce-notices-wrapper").find(
              ".vamtam-close-notice-btn"
            );
            if (!n.length) return;
            n[0].addEventListener("click", function () {
              var t = e(this).closest(".woocommerce-message");
              t.fadeOut("fast"),
                f(!0),
                setTimeout(function () {
                  t.remove();
                }, 2e3);
            }),
              setTimeout(function () {
                var e = n.closest(".woocommerce-message");
                e.fadeOut("fast"),
                  setTimeout(function () {
                    e.remove(), f(!0);
                  }, 2e3);
              }, 1e4);
          }
        }
        e(document.body).on(
          "added_to_cart removed_from_cart wc_fragments_refreshed wc_fragments_loaded",
          function () {
            if (parseInt(Cookies.get("woocommerce_items_in_cart") || 0, 10) > 0)
              if (i) {
                a.removeClass("hidden");
                var n = 0;
                a[0]
                  .querySelectorAll(".cart_item .quantity select")
                  .forEach(function (e) {
                    n += parseInt(e.value, 10);
                  }),
                  r.text("(" + n + ")");
              } else {
                var s = 0,
                  d = document.querySelector(".widget_shopping_cart"),
                  l = d ? d.querySelectorAll("li .quantity") : [];
                if (d) {
                  for (var v = 0; v < l.length; v++)
                    s += parseInt(
                      l[v].innerHTML.split("<span")[0].replace(/[^\d]/g, ""),
                      10
                    );
                  (s = s >= 0 ? s : ""),
                    o.text(s),
                    o.removeClass("cart-empty"),
                    t.removeClass("hidden");
                }
              }
            else if (i) {
              var h = a.hasClass("elementor-menu-cart--empty-indicator-hide");
              a.toggleClass("hidden", h), r.text("(0)"), m("no-target", !0);
            } else {
              var w = t.hasClass("show-if-empty");
              o.addClass("cart-empty"),
                o.text("0"),
                t.toggleClass("hidden", !w);
            }
            !!e("body").hasClass("single-product") &&
              e(".woocommerce-notices-wrapper .woocommerce-message").length &&
              f(),
              u(),
              c();
          }
        ),
          e(document).on(
            "click",
            '.woocommerce-cart button[name="apply_coupon"]',
            function (t) {
              t.preventDefault(),
                e('input[type="submit"][name="apply_coupon"]').trigger("click");
            }
          ),
          "yes" === window.VAMTAM_FRONT.enable_ajax_add_to_cart &&
            e(document).on(
              "click",
              ".single_add_to_cart_button, .products.vamtam-wc.table-layout .add_to_cart_button:not(.product_type_variable)",
              function (t) {
                var n = e(this),
                  o = n.closest("form.cart"),
                  a = n.val(),
                  r = o.find("input[name=quantity]").val() || 1,
                  s = o.find("input[name=product_id]").val() || a,
                  c = o.find("input[name=variation_id]").val() || 0,
                  l = c,
                  m = o
                    .find("input[name=add-to-cart].wc-booking-product-id")
                    .val(),
                  u = o.hasClass("grouped_form"),
                  f =
                    o.parent(".elementor-product-external").length &&
                    "get" === o.attr("method"),
                  h = n.closest(".products.vamtam-wc.table-layout").length,
                  w = {};
                if (l) {
                  if (
                    n.parents(
                      ".elementor-widget-woocommerce-product-add-to-cart.vamtam-has-disable-theme-ajax-vars"
                    ).length
                  )
                    return;
                }
                if ((t.preventDefault(), !f)) {
                  if (u) {
                    s = parseInt(o.find("input[name=add-to-cart]").val());
                    var p = o.find('[id^="product-"]');
                    e.each(p, function (t, n) {
                      var o,
                        a = e(n).find(".add_to_cart_button"),
                        i = e(n).attr("id").substr(8);
                      (o = a.length
                        ? parseInt(a.attr("data-quantity")) || 0
                        : parseInt(e(n).find("input.qty").val()) || 0),
                        (w[i] = o);
                    });
                  }
                  if (h) {
                    const e = n.closest("tr.vamtam-product");
                    e.length &&
                      ((r = e.find("input[name=quantity]").val() || 1),
                      (s = n.attr("data-product_id") || a));
                  }
                  var g = {};
                  if (m) {
                    new FormData(o[0]).forEach(function (e, t) {
                      "add-to-cart" === t
                        ? (g.product_id = e)
                        : (g[t.replace("wc_bookings_field", "")] = e),
                        (g[t] = e);
                    }),
                      (g.is_wc_booking = !0);
                  } else if (u)
                    g = { product_id: s, products: w, is_grouped: !0 };
                  else if (l) {
                    (g = { product_id: s, is_variable: !0 }),
                      new FormData(o[0]).forEach(function (e, t) {
                        "add-to-cart" === t ? (g.product_id = e) : (g[t] = e);
                      });
                  } else g = { product_id: s };
                  return (
                    (g.product_sku = ""),
                    (g.quantity = r),
                    (g.variation_id = c),
                    (g.action = "woocommerce_ajax_add_to_cart"),
                    e(document.body).trigger("adding_to_cart", [n, g]),
                    e.ajax({
                      type: "post",
                      url: window.wc_add_to_cart_params.ajax_url,
                      data: g,
                      beforeSend: function () {
                        n.removeClass("added").addClass("loading");
                      },
                      complete: function (e) {
                        e.error
                          ? n.removeClass("loading")
                          : n.addClass("added").removeClass("loading");
                      },
                      success: function (t) {
                        if (t.error)
                          v(t.notice),
                            e(document.body).trigger("wc_fragments_refreshed");
                        else {
                          if (i)
                            if (h) {
                              !window.VAMTAM.isMobileBrowser &&
                                n.parents(
                                  '.vamtam-has-adc-triggers-menu-cart[data-widget_type="woocommerce-products.products_table_layout"]'
                                ).length &&
                                d();
                            } else {
                              !window.VAMTAM.isMobileBrowser && d();
                            }
                          else v(t.fragments.notice);
                          e(document.body).trigger("added_to_cart", [
                            t.fragments,
                            t.cart_hash,
                            n,
                          ]);
                        }
                      },
                    }),
                    !1
                  );
                }
                window.open(o.attr("action"), "_blank");
              }
            ),
          e(document).on(
            "click",
            ".mini_cart_item a.remove, .woocommerce-mini-cart .woocommerce-cart-form__cart-item .product-remove > a:not([class])",
            function (t) {
              t.preventDefault();
              var n = e(this),
                o = e(this).attr("data-product_id"),
                a = e(this).attr("data-cart_item_key"),
                i = e(this).parents(
                  ".mini_cart_item, .woocommerce-cart-form__cart-item"
                );
              e.ajax({
                type: "post",
                dataType: "json",
                url: window.wc_add_to_cart_params.ajax_url,
                data: {
                  action: "product_remove",
                  product_id: o,
                  cart_item_key: a,
                },
                beforeSend: function () {
                  i.css("pointer-events", "none").css("opacity", "0.5"),
                    e("body").css("cursor", "wait");
                },
                complete: function () {
                  e("body").css("cursor", "default");
                },
                success: function (t) {
                  t && t.fragments
                    ? e(document.body).trigger("removed_from_cart", [
                        t.fragments,
                        t.cart_hash,
                        n,
                      ])
                    : (window.location = n.attr("href"));
                },
                error: function () {
                  window.location = n.attr("href");
                },
              });
            }
          ),
          e(document).on(
            "change",
            ".woocommerce-cart-form__cart-item .vamtam-quantity > select",
            function (t) {
              t.preventDefault();
              var n = e(".woocommerce-cart").length,
                o = e(this).val(),
                a = e(this).attr("data-product_id"),
                i = e(this).attr("data-cart_item_key"),
                r = e(this).parents(
                  ".mini_cart_item, .woocommerce-cart-form__cart-item"
                );
              if (n) {
                var s = e('input[type="submit"][name="update_cart"]');
                return s.prop("disabled", !1), void s.trigger("click");
              }
              e.ajax({
                type: "post",
                dataType: "json",
                url: window.wc_add_to_cart_params.ajax_url,
                data: {
                  action: "update_item_from_cart",
                  product_id: a,
                  cart_item_key: i,
                  product_quantity: o,
                },
                beforeSend: function () {
                  r.css("pointer-events", "none").css("opacity", "0.5"),
                    e("body").css("cursor", "wait");
                },
                complete: function () {
                  r.css("pointer-events", "auto").css("opacity", "1"),
                    e("body").css("cursor", "default");
                },
                success: function (t) {
                  t &&
                    t.fragments &&
                    e(document.body).trigger("wc_fragment_refresh");
                },
                error: function () {},
              });
            }
          ),
          window.addEventListener("load", function () {
            !(function () {
              const t = e(document.body).hasClass("woocommerce-checkout"),
                n = t && e("form.checkout"),
                o =
                  t && e(".woocommerce > .woocommerce-notices-wrapper").first();
              if (!t || !n.length || !o.length) return;
              e(document.body).on("checkout_error", function () {
                const e = n.find(
                  ".woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout"
                );
                o.append(e);
              });
            })(),
              i && (u(), c());
          });
      });
  })(jQuery, window.VAMTAM),
  (function (e, t) {
    "use strict";
    (window.VAMTAM = window.VAMTAM || {}),
      (window.VAMTAM.CUSTOM_ANIMATIONS = {}),
      e(function () {
        (window.VAMTAM.CUSTOM_ANIMATIONS = {
          init: function () {
            this.VamtamCustomAnimations.init();
          },
          onDomReady: function () {
            this.VamtamCustomAnimations.scrollBasedAnims();
          },
          VamtamCustomAnimations: {
            init: function () {
              this.registerAnimations(), this.utils.watchScrollDirection();
            },
            registerAnimations: function () {
              var e = this;
              ["stickyHeader"].forEach(function (t) {
                e[t].apply(e);
              });
            },
            stickyHeader: function () {
              var t = e(".vamtam-sticky-header"),
                n = this;
              t.length &&
                (t.length > 1 && (t = t[0]),
                (function () {
                  var o,
                    a = e(t).hasClass(
                      "vamtam-sticky-header--transparent-header"
                    ),
                    i = !window.elementorFrontend.isEditMode(),
                    r = function () {
                      e(t).removeClass("vamtam-sticky-header--fixed-shown"),
                        e(t).hasClass("vamtam-sticky-header--fixed-hidden") ||
                          e(t).addClass("vamtam-sticky-header--fixed-hidden"),
                        (o = "fixedHiddenState");
                    },
                    s = function () {
                      e(t).removeClass("vamtam-sticky-header--fixed-shown"),
                        e(t).removeClass("vamtam-sticky-header--fixed-hidden"),
                        (o = "noAnimState");
                    };
                  function c() {
                    if (i) {
                      var n = e(t).innerHeight();
                      e(t).css("margin-bottom", "-" + n + "px"),
                        e(t)
                          .next(".vamtam-prevent-scroll-jumps")
                          .css("padding-top", n + "px");
                    }
                  }
                  i &&
                    e(t).after(
                      '<div class="vamtam-prevent-scroll-jumps"></div>'
                    ),
                    window.VAMTAM.isMaxDeviceWidth() && c(),
                    window.pageYOffset >= 300 && r();
                  var d,
                    l = null,
                    m = window.scrollY;
                  window.addEventListener("scroll", function (i) {
                    null !== l && clearTimeout(l),
                      (l = setTimeout(function () {
                        m = window.scrollY;
                      }, 500));
                    var u = window.VAMTAM.debounce(function () {
                      if ("#document" === i.target.nodeName) {
                        var c = n.utils.getScrollDirection();
                        if (
                          (d !== c && (m = window.scrollY),
                          (d = c),
                          Math.abs(window.scrollY - m) < 80 &&
                            window.scrollY > 80)
                        )
                          return;
                        if ("up" === c)
                          return void (window.pageYOffset >= 300
                            ? "fixedShownState" !== o &&
                              (e(t).removeClass(
                                "vamtam-sticky-header--fixed-hidden"
                              ),
                              e(t).hasClass(
                                "vamtam-sticky-header--fixed-shown"
                              ) ||
                                e(t).addClass(
                                  "vamtam-sticky-header--fixed-shown"
                                ),
                              (o = "fixedShownState"))
                            : "noAnimState" !== o && s());
                        if ("down" === c && (window.pageYOffset >= 300 || a)) {
                          var l = !e(t).find(".elementor-menu-cart--shown")
                            .length;
                          "fixedHiddenState" !== o && l && r();
                        }
                      }
                    }, 200);
                    window.VAMTAM.isMaxDeviceWidth()
                      ? (c(), requestAnimationFrame(u))
                      : "noAnimState" !== o && s();
                  });
                })());
            },
            observedAnims: function () {
              var t = "vamtam-animate",
                n = document.querySelectorAll(".vamtam-observe");
              if (n.length) {
                var o,
                  a = function (n, o) {
                    n.forEach(function (n) {
                      var a = !1,
                        i = n.target,
                        r = i && e(i);
                      n.isIntersecting && (a = !0),
                        a
                          ? (r.hasClass(t) ||
                              (r.addClass(t), r.trigger("vamtam:animate")),
                            r.hasClass("vamtam-looped") ||
                              (o && o.unobserve && o.unobserve(i)))
                          : r.hasClass(t) && r.removeClass(t);
                    });
                  };
                n.forEach(function (n) {
                  e(n).removeClass(t),
                    o || (o = new IntersectionObserver(a)),
                    o.observe(n);
                });
              }
            },
            scrollBasedAnims: function () {
              var t = document.querySelectorAll(
                [
                  '[data-settings*="growFromLeftScroll"]',
                  '[data-settings*="growFromRightScroll"]',
                ].join(", ")
              );
              if (!t.length) return;
              var n,
                o = {},
                a = this,
                i = function (e) {
                  e.forEach(function (e) {
                    var t = e.boundingClientRect.y,
                      n = e.isIntersecting,
                      i = e.target,
                      r = Math.abs(
                        parseFloat((100 * e.intersectionRatio).toFixed(2))
                      ),
                      s = o[i.dataset.vamtam_anim_id].lastScrollPercentage,
                      c = o[i.dataset.vamtam_anim_id].lastScrollY,
                      d = o[i.dataset.vamtam_anim_id].animateEl,
                      l = function () {
                        window.requestAnimationFrame(function () {
                          d.style.setProperty("--vamtam-scroll-ratio", r + "%");
                        });
                      };
                    n &&
                      c !== t &&
                      ("down" === a.utils.getScrollDirection()
                        ? s < r && l()
                        : l()),
                      (o[i.dataset.vamtam_anim_id].lastScrollY = t),
                      (o[i.dataset.vamtam_anim_id].lastScrollPercentage = r);
                  });
                };
              const r = (function () {
                var e,
                  t = [];
                for (e = 1; e <= 50; e++) {
                  var n = e / 50;
                  t.push(n);
                }
                return t.push(0), t;
              })();
              t.forEach(function (t) {
                var a;
                n ||
                  (n = new IntersectionObserver(i, {
                    root: null,
                    rootMargin: "20% 0% 20% 0%",
                    threshold: r,
                  }));
                if (
                  (t.style.setProperty("--vamtam-scroll-ratio", "1%"),
                  t.classList.contains("elementor-widget") ||
                    t.classList.contains("elementor-column"))
                )
                  (a = t.parentElement).setAttribute(
                    "data-vamtam_anim_id",
                    t.dataset.id
                  );
                else {
                  e(t).before(
                    '<div class="vamtam-scroll-anim-wrap" data-vamtam_anim_id="' +
                      t.dataset.id +
                      '"></div>'
                  );
                  var s = e(t).prev(".vamtam-scroll-anim-wrap");
                  e(s).append(t), (a = s[0]);
                }
                (o[t.dataset.id] = {
                  lastScrollY: "",
                  lastScrollPercentage: "",
                  observeEl: a,
                  animateEl: t,
                }),
                  n.observe(a);
              });
            },
            utils: {
              getAdminBarHeight: function () {
                return window.VAMTAM.adminBarHeight;
              },
              watchScrollDirection: function () {
                var e = function () {
                  return (
                    (this.lastScrollTop = 0),
                    (this.utils = this),
                    {
                      init: function () {},
                      measure: function (e) {
                        this.direction = e > this.lastScrollTop ? "down" : "up";
                      }.bind(this),
                      mutate: function (e) {
                        (this.utils.getScrollDirection = function () {
                          return this.direction;
                        }),
                          (this.lastScrollTop = e <= 0 ? 0 : e);
                      }.bind(this),
                    }
                  );
                }.bind(this);
                window.VAMTAM.addScrollHandler(e());
              },
              isTouchDevice: function () {
                const e = " -webkit- -moz- -o- -ms- ".split(" ");
                return (
                  !!(
                    "ontouchstart" in window ||
                    (window.DocumentTouch && document instanceof DocumentTouch)
                  ) ||
                  (function (e) {
                    return window.matchMedia(e).matches;
                  })(["(", e.join("touch-enabled),("), "heartz", ")"].join(""))
                );
              },
            },
          },
        }),
          window.VAMTAM.CUSTOM_ANIMATIONS.init(),
          e(window).ready(function () {
            window.VAMTAM.CUSTOM_ANIMATIONS.onDomReady();
          });
      });
  })(jQuery);
