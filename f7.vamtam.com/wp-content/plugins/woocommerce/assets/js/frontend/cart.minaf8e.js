jQuery(function (n) {
  if ("undefined" == typeof wc_cart_params) return !1;
  var r = function (t) {
      return wc_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", t);
    },
    i = function (t) {
      return t.is(".processing") || t.parents(".processing").length;
    },
    a = function (t) {
      i(t) ||
        t.addClass("processing").block({
          message: null,
          overlayCSS: { background: "#fff", opacity: 0.6 },
        });
    },
    s = function (t) {
      t.removeClass("processing").unblock();
    },
    o = function (t, e) {
      var o,
        c,
        i = n.parseHTML(t),
        r = n(".woocommerce-cart-form", i),
        a = n(".cart_totals", i),
        t =
          ((t = n(
            ".woocommerce-error, .woocommerce-message, .woocommerce-info",
            i
          )),
          (o = []),
          (c = t).each(function (t) {
            var e = n(this).text();
            "undefined" == typeof o[e] ? (o[e] = !0) : c.splice(t, 1);
          }),
          c);
      if (0 !== n(".woocommerce-cart-form").length) {
        if (
          (e ||
            n(
              ".woocommerce-error, .woocommerce-message, .woocommerce-info"
            ).remove(),
          0 === r.length)
        ) {
          if (n(".woocommerce-checkout").length)
            return void window.location.reload();
          i = n(".cart-empty", i).closest(".woocommerce");
          n(".woocommerce-cart-form__contents")
            .closest(".woocommerce")
            .replaceWith(i),
            0 < t.length && u(t),
            n(document.body).trigger("wc_cart_emptied");
        } else
          n(".woocommerce-checkout").length &&
            n(document.body).trigger("update_checkout"),
            n(".woocommerce-cart-form").replaceWith(r),
            n(".woocommerce-cart-form")
              .find(':input[name="update_cart"]')
              .prop("disabled", !0)
              .attr("aria-disabled", !0),
            0 < t.length && u(t),
            p(a);
        n(document.body).trigger("updated_wc_div");
      } else window.location.reload();
    },
    p = function (t) {
      n(".cart_totals").replaceWith(t),
        n(document.body).trigger("updated_cart_totals");
    },
    u = function (t, e) {
      (e =
        e ||
        n(".woocommerce-notices-wrapper:first") ||
        n(".cart-empty").closest(".woocommerce") ||
        n(".woocommerce-cart-form")).prepend(t);
    },
    t = {
      init: function () {
        (this.update_cart_totals = this.update_cart_totals.bind(this)),
          (this.input_keypress = this.input_keypress.bind(this)),
          (this.cart_submit = this.cart_submit.bind(this)),
          (this.submit_click = this.submit_click.bind(this)),
          (this.apply_coupon = this.apply_coupon.bind(this)),
          (this.remove_coupon_clicked = this.remove_coupon_clicked.bind(this)),
          (this.quantity_update = this.quantity_update.bind(this)),
          (this.item_remove_clicked = this.item_remove_clicked.bind(this)),
          (this.item_restore_clicked = this.item_restore_clicked.bind(this)),
          (this.update_cart = this.update_cart.bind(this)),
          n(document).on("wc_update_cart added_to_cart", function () {
            t.update_cart.apply(t, [].slice.call(arguments, 1));
          }),
          n(document).on(
            "click",
            ".woocommerce-cart-form :input[type=submit]",
            this.submit_click
          ),
          n(document).on(
            "keypress",
            ".woocommerce-cart-form :input[type=number]",
            this.input_keypress
          ),
          n(document).on("submit", ".woocommerce-cart-form", this.cart_submit),
          n(document).on(
            "click",
            "a.woocommerce-remove-coupon",
            this.remove_coupon_clicked
          ),
          n(document).on(
            "click",
            ".woocommerce-cart-form .product-remove > a",
            this.item_remove_clicked
          ),
          n(document).on(
            "click",
            ".woocommerce-cart .restore-item",
            this.item_restore_clicked
          ),
          n(document).on(
            "change input",
            ".woocommerce-cart-form .cart_item :input",
            this.input_changed
          ),
          n('.woocommerce-cart-form :input[name="update_cart"]')
            .prop("disabled", !0)
            .attr("aria-disabled", !0);
      },
      input_changed: function () {
        n('.woocommerce-cart-form :input[name="update_cart"]')
          .prop("disabled", !1)
          .attr("aria-disabled", !1);
      },
      update_cart: function (e) {
        var t = n(".woocommerce-cart-form");
        a(t),
          a(n("div.cart_totals")),
          n.ajax({
            type: t.attr("method"),
            url: t.attr("action"),
            data: t.serialize(),
            dataType: "html",
            success: function (t) {
              o(t, e);
            },
            complete: function () {
              s(t),
                s(n("div.cart_totals")),
                n.scroll_to_notices(n('[role="alert"]'));
            },
          });
      },
      update_cart_totals: function () {
        a(n("div.cart_totals")),
          n.ajax({
            url: r("get_cart_totals"),
            dataType: "html",
            success: function (t) {
              p(t);
            },
            complete: function () {
              s(n("div.cart_totals"));
            },
          });
      },
      input_keypress: function (t) {
        if (13 === t.keyCode) {
          var e = n(t.currentTarget).parents("form");
          try {
            e[0].checkValidity() && (t.preventDefault(), this.cart_submit(t));
          } catch (o) {
            t.preventDefault(), this.cart_submit(t);
          }
        }
      },
      cart_submit: function (t) {
        var e = n(document.activeElement),
          o = n(":input[type=submit][clicked=true]"),
          c = n(t.currentTarget);
        if (
          0 !==
          (c = !c.is("form") ? n(t.currentTarget).parents("form") : c).find(
            ".woocommerce-cart-form__contents"
          ).length
        )
          return (
            !i(c) &&
            void (o.is(':input[name="update_cart"]') || e.is("input.qty")
              ? (t.preventDefault(), this.quantity_update(c))
              : (o.is(':input[name="apply_coupon"]') || e.is("#coupon_code")) &&
                (t.preventDefault(), this.apply_coupon(c)))
          );
      },
      submit_click: function (t) {
        n(":input[type=submit]", n(t.target).parents("form")).removeAttr(
          "clicked"
        ),
          n(t.target).attr("clicked", "true");
      },
      apply_coupon: function (t) {
        a(t);
        var e = this,
          o = n("#coupon_code"),
          c = o.val(),
          i = { security: wc_cart_params.apply_coupon_nonce, coupon_code: c };
        n.ajax({
          type: "POST",
          url: r("apply_coupon"),
          data: i,
          dataType: "html",
          success: function (t) {
            n(
              ".woocommerce-error, .woocommerce-message, .woocommerce-info"
            ).remove(),
              u(t),
              n(document.body).trigger("applied_coupon", [c]);
          },
          complete: function () {
            s(t), o.val(""), e.update_cart(!0);
          },
        });
      },
      remove_coupon_clicked: function (t) {
        t.preventDefault();
        var e = this,
          o = n(t.currentTarget).closest(".cart_totals"),
          c = n(t.currentTarget).attr("data-coupon");
        a(o);
        t = { security: wc_cart_params.remove_coupon_nonce, coupon: c };
        n.ajax({
          type: "POST",
          url: r("remove_coupon"),
          data: t,
          dataType: "html",
          success: function (t) {
            n(
              ".woocommerce-error, .woocommerce-message, .woocommerce-info"
            ).remove(),
              u(t),
              n(document.body).trigger("removed_coupon", [c]),
              s(o);
          },
          complete: function () {
            e.update_cart(!0);
          },
        });
      },
      quantity_update: function (t) {
        a(t),
          a(n("div.cart_totals")),
          n("<input />")
            .attr("type", "hidden")
            .attr("name", "update_cart")
            .attr("value", "Update Cart")
            .appendTo(t),
          n.ajax({
            type: t.attr("method"),
            url: t.attr("action"),
            data: t.serialize(),
            dataType: "html",
            success: function (t) {
              o(t);
            },
            complete: function () {
              s(t),
                s(n("div.cart_totals")),
                n.scroll_to_notices(n('[role="alert"]'));
            },
          });
      },
      item_remove_clicked: function (t) {
        t.preventDefault();
        var t = n(t.currentTarget),
          e = t.parents("form");
        a(e),
          a(n("div.cart_totals")),
          n.ajax({
            type: "GET",
            url: t.attr("href"),
            dataType: "html",
            success: function (t) {
              o(t);
            },
            complete: function () {
              s(e),
                s(n("div.cart_totals")),
                n.scroll_to_notices(n('[role="alert"]'));
            },
          });
      },
      item_restore_clicked: function (t) {
        t.preventDefault();
        var t = n(t.currentTarget),
          e = n("form.woocommerce-cart-form");
        a(e),
          a(n("div.cart_totals")),
          n.ajax({
            type: "GET",
            url: t.attr("href"),
            dataType: "html",
            success: function (t) {
              o(t);
            },
            complete: function () {
              s(e), s(n("div.cart_totals"));
            },
          });
      },
    };
  ({
    init: function (t) {
      (this.cart = t),
        (this.toggle_shipping = this.toggle_shipping.bind(this)),
        (this.shipping_method_selected =
          this.shipping_method_selected.bind(this)),
        (this.shipping_calculator_submit =
          this.shipping_calculator_submit.bind(this)),
        n(document).on(
          "click",
          ".shipping-calculator-button",
          this.toggle_shipping
        ),
        n(document).on(
          "change",
          "select.shipping_method, :input[name^=shipping_method]",
          this.shipping_method_selected
        ),
        n(document).on(
          "submit",
          "form.woocommerce-shipping-calculator",
          this.shipping_calculator_submit
        ),
        n(".shipping-calculator-form").hide();
    },
    toggle_shipping: function () {
      return (
        n(".shipping-calculator-form").slideToggle("slow"),
        n("select.country_to_state, input.country_to_state").trigger("change"),
        n(document.body).trigger("country_to_state_changed"),
        !1
      );
    },
    shipping_method_selected: function () {
      var t = {};
      n(
        "select.shipping_method, :input[name^=shipping_method][type=radio]:checked, :input[name^=shipping_method][type=hidden]"
      ).each(function () {
        t[n(this).data("index")] = n(this).val();
      }),
        a(n("div.cart_totals"));
      var e = {
        security: wc_cart_params.update_shipping_method_nonce,
        shipping_method: t,
      };
      n.ajax({
        type: "post",
        url: r("update_shipping_method"),
        data: e,
        dataType: "html",
        success: function (t) {
          p(t);
        },
        complete: function () {
          s(n("div.cart_totals")),
            n(document.body).trigger("updated_shipping_method");
        },
      });
    },
    shipping_calculator_submit: function (t) {
      t.preventDefault();
      var e = n(t.currentTarget);
      a(n("div.cart_totals")),
        a(e),
        n("<input />")
          .attr("type", "hidden")
          .attr("name", "calc_shipping")
          .attr("value", "x")
          .appendTo(e),
        n.ajax({
          type: e.attr("method"),
          url: e.attr("action"),
          data: e.serialize(),
          dataType: "html",
          success: function (t) {
            o(t);
          },
          complete: function () {
            s(e), s(n("div.cart_totals"));
          },
        });
    },
  }.init(t),
    t.init());
});
