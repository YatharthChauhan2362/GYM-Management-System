jQuery(function (u) {
  if ("undefined" == typeof wc_country_select_params) return !1;
  var t;
  u().selectWoo &&
    ((t = function () {
      u("select.country_select:visible, select.state_select:visible").each(
        function () {
          var t = u(this),
            t = u.extend(
              {
                placeholder:
                  t.attr("data-placeholder") || t.attr("placeholder") || "",
                label: t.attr("data-label") || null,
                width: "100%",
              },
              {
                language: {
                  errorLoading: function () {
                    return wc_country_select_params.i18n_searching;
                  },
                  inputTooLong: function (t) {
                    t = t.input.length - t.maximum;
                    return 1 == t
                      ? wc_country_select_params.i18n_input_too_long_1
                      : wc_country_select_params.i18n_input_too_long_n.replace(
                          "%qty%",
                          t
                        );
                  },
                  inputTooShort: function (t) {
                    t = t.minimum - t.input.length;
                    return 1 == t
                      ? wc_country_select_params.i18n_input_too_short_1
                      : wc_country_select_params.i18n_input_too_short_n.replace(
                          "%qty%",
                          t
                        );
                  },
                  loadingMore: function () {
                    return wc_country_select_params.i18n_load_more;
                  },
                  maximumSelected: function (t) {
                    return 1 === t.maximum
                      ? wc_country_select_params.i18n_selection_too_long_1
                      : wc_country_select_params.i18n_selection_too_long_n.replace(
                          "%qty%",
                          t.maximum
                        );
                  },
                  noResults: function () {
                    return wc_country_select_params.i18n_no_matches;
                  },
                  searching: function () {
                    return wc_country_select_params.i18n_searching;
                  },
                },
              }
            );
          u(this)
            .on("select2:select", function () {
              u(this).trigger("focus");
            })
            .selectWoo(t);
        }
      );
    })(),
    u(document.body).on("country_to_state_changed", function () {
      t();
    }));
  var e = wc_country_select_params.countries.replace(/&quot;/g, '"'),
    d = JSON.parse(e),
    h =
      ".woocommerce-billing-fields,.woocommerce-shipping-fields,.woocommerce-address-fields,.woocommerce-shipping-calculator";
  u(document.body).on(
    "change refresh",
    "select.country_to_state, input.country_to_state",
    function () {
      var t = u(this).closest(h);
      t.length || (t = u(this).closest(".form-row").parent());
      var e,
        n,
        o,
        c = u(this).val(),
        a = t.find("#billing_state, #shipping_state, #calc_shipping_state"),
        r = a.closest(".form-row"),
        i = a.attr("name"),
        s = a.attr("id"),
        _ = a.attr("data-input-classes"),
        l = a.val(),
        p = a.attr("placeholder") || a.attr("data-placeholder") || "";
      d[c]
        ? (u.isEmptyObject(d[c])
            ? ((e = u('<input type="hidden" />')
                .prop("id", s)
                .prop("name", i)
                .prop("placeholder", p)
                .attr("data-input-classes", _)
                .addClass("hidden " + _)),
              r.hide().find(".select2-container").remove(),
              a.replaceWith(e))
            : ((n = d[c]),
              (o = u('<option value=""></option>').text(
                wc_country_select_params.i18n_select_state_text
              )),
              (p = p || wc_country_select_params.i18n_select_state_text),
              r.show(),
              a.is("input") &&
                ((e = u("<select></select>")
                  .prop("id", s)
                  .prop("name", i)
                  .data("placeholder", p)
                  .attr("data-input-classes", _)
                  .addClass("state_select " + _)),
                a.replaceWith(e),
                (a = t.find(
                  "#billing_state, #shipping_state, #calc_shipping_state"
                ))),
              a.empty().append(o),
              u.each(n, function (t) {
                t = u("<option></option>").prop("value", t).text(n[t]);
                a.append(t);
              }),
              a.val(l).trigger("change")),
          u(document.body).trigger("country_to_state_changed", [c, t]))
        : a.is('select, input[type="hidden"]') &&
          ((e = u('<input type="text" />')
            .prop("id", s)
            .prop("name", i)
            .prop("placeholder", p)
            .attr("data-input-classes", _)
            .addClass("input-text  " + _)),
          r.show().find(".select2-container").remove(),
          a.replaceWith(e),
          u(document.body).trigger("country_to_state_changed", [c, t])),
        u(document.body).trigger("country_to_state_changing", [c, t]);
    }
  ),
    u(document.body).on("wc_address_i18n_ready", function () {
      u(h).each(function () {
        var t = u(this).find(
          "#billing_country, #shipping_country, #calc_shipping_country"
        );
        0 !== t.length && 0 !== t.val().length && t.trigger("refresh");
      });
    });
});
