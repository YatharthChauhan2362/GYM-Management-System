jQuery(function (l) {
  if ("undefined" == typeof wc_address_i18n_params) return !1;
  var e = wc_address_i18n_params.locale.replace(/&quot;/g, '"'),
    n = JSON.parse(e);
  function o(e, a) {
    a
      ? (e.find("label .optional").remove(),
        e.addClass("validate-required"),
        0 === e.find("label .required").length &&
          e
            .find("label")
            .append(
              '&nbsp;<abbr class="required" title="' +
                wc_address_i18n_params.i18n_required_text +
                '">*</abbr>'
            ))
      : (e.find("label .required").remove(),
        e.removeClass(
          "validate-required woocommerce-invalid woocommerce-invalid-required-field"
        ),
        0 === e.find("label .optional").length &&
          e
            .find("label")
            .append(
              '&nbsp;<span class="optional">(' +
                wc_address_i18n_params.i18n_optional_text +
                ")</span>"
            ));
  }
  l(document.body)
    .on("country_to_state_changing", function (e, a, i) {
      var d = i,
        r = "undefined" != typeof n[a] ? n[a] : n["default"],
        t = d.find("#billing_postcode_field, #shipping_postcode_field"),
        i = d.find("#billing_city_field, #shipping_city_field"),
        a = d.find("#billing_state_field, #shipping_state_field");
      t.attr("data-o_class") ||
        (t.attr("data-o_class", t.attr("class")),
        i.attr("data-o_class", i.attr("class")),
        a.attr("data-o_class", a.attr("class")));
      a = JSON.parse(wc_address_i18n_params.locale_fields);
      l.each(a, function (e, a) {
        var i = d.find(a),
          a = l.extend(!0, {}, n["default"][e], r[e]);
        "undefined" != typeof a.label && i.find("label").html(a.label),
          "undefined" != typeof a.placeholder &&
            (i.find(":input").attr("placeholder", a.placeholder),
            i.find(":input").attr("data-placeholder", a.placeholder),
            i.find(".select2-selection__placeholder").text(a.placeholder)),
          "undefined" != typeof a.placeholder ||
            "undefined" == typeof a.label ||
            i.find("label").length ||
            (i.find(":input").attr("placeholder", a.label),
            i.find(":input").attr("data-placeholder", a.label),
            i.find(".select2-selection__placeholder").text(a.label)),
          "undefined" != typeof a.required ? o(i, a.required) : o(i, !1),
          "undefined" != typeof a.priority && i.data("priority", a.priority),
          "state" !== e &&
            ("undefined" != typeof a.hidden && !0 === a.hidden
              ? i.hide().find(":input").val("")
              : i.show()),
          Array.isArray(a["class"]) &&
            (i.removeClass("form-row-first form-row-last form-row-wide"),
            i.addClass(a["class"].join(" ")));
      }),
        l(
          ".woocommerce-billing-fields__field-wrapper,.woocommerce-shipping-fields__field-wrapper,.woocommerce-address-fields__field-wrapper,.woocommerce-additional-fields__field-wrapper .woocommerce-account-fields"
        ).each(function (e, a) {
          var i = l(a).find(".form-row"),
            a = i.first().parent(),
            d = 0;
          i.each(function () {
            l(this).data("priority") || l(this).data("priority", d + 1),
              (d = l(this).data("priority"));
          }),
            i.sort(function (e, a) {
              (e = parseInt(l(e).data("priority"), 10)),
                (a = parseInt(l(a).data("priority"), 10));
              return a < e ? 1 : e < a ? -1 : 0;
            }),
            i.detach().appendTo(a);
        });
    })
    .trigger("wc_address_i18n_ready");
});
