var sbi_js_exists = void 0 !== sbi_js_exists;
if (!sbi_js_exists) {
  !(function (t, e) {
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("jquery")))
      : (t.jQueryBridget = e(t, t.jQuery));
  })(window, function (t, e) {
    "use strict";
    function i(i, o, r) {
      (r = r || e || t.jQuery) &&
        (o.prototype.option ||
          (o.prototype.option = function (t) {
            r.isPlainObject(t) &&
              (this.options = r.extend(!0, this.options, t));
          }),
        (r.fn[i] = function (t) {
          return "string" == typeof t
            ? (function (t, e, s) {
                var n,
                  o = "$()." + i + '("' + e + '")';
                return (
                  t.each(function (t, h) {
                    var l = r.data(h, i);
                    if (l) {
                      var d = l[e];
                      if (d && "_" != e.charAt(0)) {
                        var u = d.apply(l, s);
                        n = void 0 === n ? u : n;
                      } else a(o + " is not a valid method");
                    } else a(i + " not initialized. Cannot call methods, i.e. " + o);
                  }),
                  void 0 !== n ? n : t
                );
              })(this, t, n.call(arguments, 1))
            : ((function (t, e) {
                t.each(function (t, s) {
                  var n = r.data(s, i);
                  n
                    ? (n.option(e), n._init())
                    : ((n = new o(s, e)), r.data(s, i, n));
                });
              })(this, t),
              this);
        }),
        s(r));
    }
    function s(t) {
      !t || (t && t.bridget) || (t.bridget = i);
    }
    var n = Array.prototype.slice,
      o = t.console,
      a =
        void 0 === o
          ? function () {}
          : function (t) {
              o.error(t);
            };
    return s(e || t.jQuery), i;
  }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define("ev-emitter/ev-emitter", e)
        : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
      function t() {}
      var e = t.prototype;
      return (
        (e.on = function (t, e) {
          if (t && e) {
            var i = (this._events = this._events || {}),
              s = (i[t] = i[t] || []);
            return -1 == s.indexOf(e) && s.push(e), this;
          }
        }),
        (e.once = function (t, e) {
          if (t && e) {
            this.on(t, e);
            var i = (this._onceEvents = this._onceEvents || {});
            return ((i[t] = i[t] || {})[e] = !0), this;
          }
        }),
        (e.off = function (t, e) {
          var i = this._events && this._events[t];
          if (i && i.length) {
            var s = i.indexOf(e);
            return -1 != s && i.splice(s, 1), this;
          }
        }),
        (e.emitEvent = function (t, e) {
          var i = this._events && this._events[t];
          if (i && i.length) {
            (i = i.slice(0)), (e = e || []);
            for (
              var s = this._onceEvents && this._onceEvents[t], n = 0;
              n < i.length;
              n++
            ) {
              var o = i[n];
              s && s[o] && (this.off(t, o), delete s[o]), o.apply(this, e);
            }
            return this;
          }
        }),
        (e.allOff = function () {
          delete this._events, delete this._onceEvents;
        }),
        t
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define("get-size/get-size", e)
        : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.getSize = e());
    })(window, function () {
      "use strict";
      function t(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e;
      }
      function e(t) {
        var e = getComputedStyle(t);
        return (
          e ||
            o(
              "Style returned " +
                e +
                ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
            ),
          e
        );
      }
      function i() {
        if (!h) {
          h = !0;
          var i = document.createElement("div");
          (i.style.width = "200px"),
            (i.style.padding = "1px 2px 3px 4px"),
            (i.style.borderStyle = "solid"),
            (i.style.borderWidth = "1px 2px 3px 4px"),
            (i.style.boxSizing = "border-box");
          var o = document.body || document.documentElement;
          o.appendChild(i);
          var a = e(i);
          (n = 200 == Math.round(t(a.width))),
            (s.isBoxSizeOuter = n),
            o.removeChild(i);
        }
      }
      function s(s) {
        if (
          (i(),
          "string" == typeof s && (s = document.querySelector(s)),
          s && "object" == typeof s && s.nodeType)
        ) {
          var o = e(s);
          if ("none" == o.display)
            return (function () {
              for (
                var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0,
                  },
                  e = 0;
                e < r;
                e++
              )
                t[a[e]] = 0;
              return t;
            })();
          var h = {};
          (h.width = s.offsetWidth), (h.height = s.offsetHeight);
          for (
            var l = (h.isBorderBox = "border-box" == o.boxSizing), d = 0;
            d < r;
            d++
          ) {
            var u = a[d],
              c = o[u],
              p = parseFloat(c);
            h[u] = isNaN(p) ? 0 : p;
          }
          var m = h.paddingLeft + h.paddingRight,
            f = h.paddingTop + h.paddingBottom,
            g = h.marginLeft + h.marginRight,
            _ = h.marginTop + h.marginBottom,
            b = h.borderLeftWidth + h.borderRightWidth,
            v = h.borderTopWidth + h.borderBottomWidth,
            y = l && n,
            w = t(o.width);
          !1 !== w && (h.width = w + (y ? 0 : m + b));
          var x = t(o.height);
          return (
            !1 !== x && (h.height = x + (y ? 0 : f + v)),
            (h.innerWidth = h.width - (m + b)),
            (h.innerHeight = h.height - (f + v)),
            (h.outerWidth = h.width + g),
            (h.outerHeight = h.height + _),
            h
          );
        }
      }
      var n,
        o =
          "undefined" == typeof console
            ? function () {}
            : function (t) {
                console.error(t);
              },
        a = [
          "paddingLeft",
          "paddingRight",
          "paddingTop",
          "paddingBottom",
          "marginLeft",
          "marginRight",
          "marginTop",
          "marginBottom",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth",
          "borderBottomWidth",
        ],
        r = a.length,
        h = !1;
      return s;
    }),
    (function (t, e) {
      "use strict";
      "function" == typeof define && define.amd
        ? define("desandro-matches-selector/matches-selector", e)
        : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.matchesSelector = e());
    })(window, function () {
      "use strict";
      var t = (function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
          var s = e[i] + "MatchesSelector";
          if (t[s]) return s;
        }
      })();
      return function (e, i) {
        return e[t](i);
      };
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "fizzy-ui-utils/utils",
            ["desandro-matches-selector/matches-selector"],
            function (i) {
              return e(t, i);
            }
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(t, require("desandro-matches-selector")))
        : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function (t, e) {
      var i = {
          extend: function (t, e) {
            for (var i in e) t[i] = e[i];
            return t;
          },
          modulo: function (t, e) {
            return ((t % e) + e) % e;
          },
        },
        s = Array.prototype.slice;
      (i.makeArray = function (t) {
        return Array.isArray(t)
          ? t
          : null == t
          ? []
          : "object" == typeof t && "number" == typeof t.length
          ? s.call(t)
          : [t];
      }),
        (i.removeFrom = function (t, e) {
          var i = t.indexOf(e);
          -1 != i && t.splice(i, 1);
        }),
        (i.getParent = function (t, i) {
          for (; t.parentNode && t != document.body; )
            if (((t = t.parentNode), e(t, i))) return t;
        }),
        (i.getQueryElement = function (t) {
          return "string" == typeof t ? document.querySelector(t) : t;
        }),
        (i.handleEvent = function (t) {
          var e = "on" + t.type;
          this[e] && this[e](t);
        }),
        (i.filterFindElements = function (t, s) {
          t = i.makeArray(t);
          var n = [];
          return (
            t.forEach(function (t) {
              if (t instanceof HTMLElement) {
                if (!s) return void n.push(t);
                e(t, s) && n.push(t);
                for (var i = t.querySelectorAll(s), o = 0; o < i.length; o++)
                  n.push(i[o]);
              }
            }),
            n
          );
        }),
        (i.debounceMethod = function (t, e, i) {
          i = i || 100;
          var s = t.prototype[e],
            n = e + "Timeout";
          t.prototype[e] = function () {
            var t = this[n];
            clearTimeout(t);
            var e = arguments,
              o = this;
            this[n] = setTimeout(function () {
              s.apply(o, e), delete o[n];
            }, i);
          };
        }),
        (i.docReady = function (t) {
          var e = document.readyState;
          "complete" == e || "interactive" == e
            ? setTimeout(t)
            : document.addEventListener("DOMContentLoaded", t);
        }),
        (i.toDashed = function (t) {
          return t
            .replace(/(.)([A-Z])/g, function (t, e, i) {
              return e + "-" + i;
            })
            .toLowerCase();
        });
      var n = t.console;
      return (
        (i.htmlInit = function (e, s) {
          i.docReady(function () {
            var o = i.toDashed(s),
              a = "data-" + o,
              r = document.querySelectorAll("[" + a + "]"),
              h = document.querySelectorAll(".js-" + o),
              l = i.makeArray(r).concat(i.makeArray(h)),
              d = a + "-options",
              u = t.jQuery;
            l.forEach(function (t) {
              var i,
                o = t.getAttribute(a) || t.getAttribute(d);
              try {
                i = o && JSON.parse(o);
              } catch (e) {
                return void (
                  n &&
                  n.error(
                    "Error parsing " + a + " on " + t.className + ": " + e
                  )
                );
              }
              var r = new e(t, i);
              u && u.data(t, s, r);
            });
          });
        }),
        i
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "outlayer/item",
            ["ev-emitter/ev-emitter", "get-size/get-size"],
            e
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(require("ev-emitter"), require("get-size")))
        : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
    })(window, function (t, e) {
      "use strict";
      function i(t, e) {
        t &&
          ((this.element = t),
          (this.layout = e),
          (this.position = { x: 0, y: 0 }),
          this._create());
      }
      var s = document.documentElement.style,
        n = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        o = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        a = {
          WebkitTransition: "webkitTransitionEnd",
          transition: "transitionend",
        }[n],
        r = {
          transform: o,
          transition: n,
          transitionDuration: n + "Duration",
          transitionProperty: n + "Property",
          transitionDelay: n + "Delay",
        },
        h = (i.prototype = Object.create(t.prototype));
      (h.constructor = i),
        (h._create = function () {
          (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
            this.css({ position: "absolute" });
        }),
        (h.handleEvent = function (t) {
          var e = "on" + t.type;
          this[e] && this[e](t);
        }),
        (h.getSize = function () {
          this.size = e(this.element);
        }),
        (h.css = function (t) {
          var e = this.element.style;
          for (var i in t) {
            e[r[i] || i] = t[i];
          }
        }),
        (h.getPosition = function () {
          var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            s = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            o = parseFloat(s),
            a = parseFloat(n),
            r = this.layout.size;
          -1 != s.indexOf("%") && (o = (o / 100) * r.width),
            -1 != n.indexOf("%") && (a = (a / 100) * r.height),
            (o = isNaN(o) ? 0 : o),
            (a = isNaN(a) ? 0 : a),
            (o -= e ? r.paddingLeft : r.paddingRight),
            (a -= i ? r.paddingTop : r.paddingBottom),
            (this.position.x = o),
            (this.position.y = a);
        }),
        (h.layoutPosition = function () {
          var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            s = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            o = i ? "left" : "right",
            a = i ? "right" : "left",
            r = this.position.x + t[n];
          (e[o] = this.getXValue(r)), (e[a] = "");
          var h = s ? "paddingTop" : "paddingBottom",
            l = s ? "top" : "bottom",
            d = s ? "bottom" : "top",
            u = this.position.y + t[h];
          (e[l] = this.getYValue(u)),
            (e[d] = ""),
            this.css(e),
            this.emitEvent("layout", [this]);
        }),
        (h.getXValue = function (t) {
          var e = this.layout._getOption("horizontal");
          return this.layout.options.percentPosition && !e
            ? (t / this.layout.size.width) * 100 + "%"
            : t + "px";
        }),
        (h.getYValue = function (t) {
          var e = this.layout._getOption("horizontal");
          return this.layout.options.percentPosition && e
            ? (t / this.layout.size.height) * 100 + "%"
            : t + "px";
        }),
        (h._transitionTo = function (t, e) {
          this.getPosition();
          var i = this.position.x,
            s = this.position.y,
            n = t == this.position.x && e == this.position.y;
          if ((this.setPosition(t, e), !n || this.isTransitioning)) {
            var o = t - i,
              a = e - s,
              r = {};
            (r.transform = this.getTranslate(o, a)),
              this.transition({
                to: r,
                onTransitionEnd: { transform: this.layoutPosition },
                isCleaning: !0,
              });
          } else this.layoutPosition();
        }),
        (h.getTranslate = function (t, e) {
          return (
            "translate3d(" +
            (t = this.layout._getOption("originLeft") ? t : -t) +
            "px, " +
            (e = this.layout._getOption("originTop") ? e : -e) +
            "px, 0)"
          );
        }),
        (h.goTo = function (t, e) {
          this.setPosition(t, e), this.layoutPosition();
        }),
        (h.moveTo = h._transitionTo),
        (h.setPosition = function (t, e) {
          (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
        }),
        (h._nonTransition = function (t) {
          for (var e in (this.css(t.to),
          t.isCleaning && this._removeStyles(t.to),
          t.onTransitionEnd))
            t.onTransitionEnd[e].call(this);
        }),
        (h.transition = function (t) {
          if (parseFloat(this.layout.options.transitionDuration)) {
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)
              (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
              this.css(t.from);
              this.element.offsetHeight;
              null;
            }
            this.enableTransition(t.to),
              this.css(t.to),
              (this.isTransitioning = !0);
          } else this._nonTransition(t);
        });
      var l =
        "opacity," +
        (function (t) {
          return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase();
          });
        })(o);
      (h.enableTransition = function () {
        if (!this.isTransitioning) {
          var t = this.layout.options.transitionDuration;
          (t = "number" == typeof t ? t + "ms" : t),
            this.css({
              transitionProperty: l,
              transitionDuration: t,
              transitionDelay: this.staggerDelay || 0,
            }),
            this.element.addEventListener(a, this, !1);
        }
      }),
        (h.onwebkitTransitionEnd = function (t) {
          this.ontransitionend(t);
        }),
        (h.onotransitionend = function (t) {
          this.ontransitionend(t);
        });
      var d = { "-webkit-transform": "transform" };
      (h.ontransitionend = function (t) {
        if (t.target === this.element) {
          var e = this._transn,
            i = d[t.propertyName] || t.propertyName;
          if (
            (delete e.ingProperties[i],
            (function (t) {
              for (var e in t) return !1;
              return !0;
            })(e.ingProperties) && this.disableTransition(),
            i in e.clean &&
              ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
            i in e.onEnd)
          )
            e.onEnd[i].call(this), delete e.onEnd[i];
          this.emitEvent("transitionEnd", [this]);
        }
      }),
        (h.disableTransition = function () {
          this.removeTransitionStyles(),
            this.element.removeEventListener(a, this, !1),
            (this.isTransitioning = !1);
        }),
        (h._removeStyles = function (t) {
          var e = {};
          for (var i in t) e[i] = "";
          this.css(e);
        });
      var u = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: "",
      };
      return (
        (h.removeTransitionStyles = function () {
          this.css(u);
        }),
        (h.stagger = function (t) {
          (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
        }),
        (h.removeElem = function () {
          this.element.parentNode.removeChild(this.element),
            this.css({ display: "" }),
            this.emitEvent("remove", [this]);
        }),
        (h.remove = function () {
          return n && parseFloat(this.layout.options.transitionDuration)
            ? (this.once("transitionEnd", function () {
                this.removeElem();
              }),
              void this.hide())
            : void this.removeElem();
        }),
        (h.reveal = function () {
          delete this.isHidden, this.css({ display: "" });
          var t = this.layout.options,
            e = {};
          (e[this.getHideRevealTransitionEndProperty("visibleStyle")] =
            this.onRevealTransitionEnd),
            this.transition({
              from: t.hiddenStyle,
              to: t.visibleStyle,
              isCleaning: !0,
              onTransitionEnd: e,
            });
        }),
        (h.onRevealTransitionEnd = function () {
          this.isHidden || this.emitEvent("reveal");
        }),
        (h.getHideRevealTransitionEndProperty = function (t) {
          var e = this.layout.options[t];
          if (e.opacity) return "opacity";
          for (var i in e) return i;
        }),
        (h.hide = function () {
          (this.isHidden = !0), this.css({ display: "" });
          var t = this.layout.options,
            e = {};
          (e[this.getHideRevealTransitionEndProperty("hiddenStyle")] =
            this.onHideTransitionEnd),
            this.transition({
              from: t.visibleStyle,
              to: t.hiddenStyle,
              isCleaning: !0,
              onTransitionEnd: e,
            });
        }),
        (h.onHideTransitionEnd = function () {
          this.isHidden &&
            (this.css({ display: "none" }), this.emitEvent("hide"));
        }),
        (h.destroy = function () {
          this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: "",
          });
        }),
        i
      );
    }),
    (function (t, e) {
      "use strict";
      "function" == typeof define && define.amd
        ? define(
            "outlayer/outlayer",
            [
              "ev-emitter/ev-emitter",
              "get-size/get-size",
              "fizzy-ui-utils/utils",
              "./item",
            ],
            function (i, s, n, o) {
              return e(t, i, s, n, o);
            }
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(
            t,
            require("ev-emitter"),
            require("get-size"),
            require("fizzy-ui-utils"),
            require("./item")
          ))
        : (t.Outlayer = e(
            t,
            t.EvEmitter,
            t.getSize,
            t.fizzyUIUtils,
            t.Outlayer.Item
          ));
    })(window, function (t, e, i, s, n) {
      "use strict";
      function o(t, e) {
        var i = s.getQueryElement(t);
        if (i) {
          (this.element = i),
            h && (this.$element = h(this.element)),
            (this.options = s.extend({}, this.constructor.defaults)),
            this.option(e);
          var n = ++d;
          (this.element.outlayerGUID = n),
            (u[n] = this),
            this._create(),
            this._getOption("initLayout") && this.layout();
        } else r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
      }
      function a(t) {
        function e() {
          t.apply(this, arguments);
        }
        return (
          (e.prototype = Object.create(t.prototype)),
          (e.prototype.constructor = e),
          e
        );
      }
      var r = t.console,
        h = t.jQuery,
        l = function () {},
        d = 0,
        u = {};
      (o.namespace = "outlayer"),
        (o.Item = n),
        (o.defaults = {
          containerStyle: { position: "relative" },
          initLayout: !0,
          originLeft: !0,
          originTop: !0,
          resize: !0,
          resizeContainer: !0,
          transitionDuration: "0.4s",
          hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
          visibleStyle: { opacity: 1, transform: "scale(1)" },
        });
      var c = o.prototype;
      s.extend(c, e.prototype),
        (c.option = function (t) {
          s.extend(this.options, t);
        }),
        (c._getOption = function (t) {
          var e = this.constructor.compatOptions[t];
          return e && void 0 !== this.options[e]
            ? this.options[e]
            : this.options[t];
        }),
        (o.compatOptions = {
          initLayout: "isInitLayout",
          horizontal: "isHorizontal",
          layoutInstant: "isLayoutInstant",
          originLeft: "isOriginLeft",
          originTop: "isOriginTop",
          resize: "isResizeBound",
          resizeContainer: "isResizingContainer",
        }),
        (c._create = function () {
          this.reloadItems(),
            (this.stamps = []),
            this.stamp(this.options.stamp),
            s.extend(this.element.style, this.options.containerStyle),
            this._getOption("resize") && this.bindResize();
        }),
        (c.reloadItems = function () {
          this.items = this._itemize(this.element.children);
        }),
        (c._itemize = function (t) {
          for (
            var e = this._filterFindItemElements(t),
              i = this.constructor.Item,
              s = [],
              n = 0;
            n < e.length;
            n++
          ) {
            var o = new i(e[n], this);
            s.push(o);
          }
          return s;
        }),
        (c._filterFindItemElements = function (t) {
          return s.filterFindElements(t, this.options.itemSelector);
        }),
        (c.getItemElements = function () {
          return this.items.map(function (t) {
            return t.element;
          });
        }),
        (c.layout = function () {
          this._resetLayout(), this._manageStamps();
          var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
          this.layoutItems(this.items, e), (this._isLayoutInited = !0);
        }),
        (c._init = c.layout),
        (c._resetLayout = function () {
          this.getSize();
        }),
        (c.getSize = function () {
          this.size = i(this.element);
        }),
        (c._getMeasurement = function (t, e) {
          var s,
            n = this.options[t];
          n
            ? ("string" == typeof n
                ? (s = this.element.querySelector(n))
                : n instanceof HTMLElement && (s = n),
              (this[t] = s ? i(s)[e] : n))
            : (this[t] = 0);
        }),
        (c.layoutItems = function (t, e) {
          (t = this._getItemsForLayout(t)),
            this._layoutItems(t, e),
            this._postLayout();
        }),
        (c._getItemsForLayout = function (t) {
          return t.filter(function (t) {
            return !t.isIgnored;
          });
        }),
        (c._layoutItems = function (t, e) {
          if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
            var i = [];
            t.forEach(function (t) {
              var s = this._getItemLayoutPosition(t);
              (s.item = t), (s.isInstant = e || t.isLayoutInstant), i.push(s);
            }, this),
              this._processLayoutQueue(i);
          }
        }),
        (c._getItemLayoutPosition = function () {
          return { x: 0, y: 0 };
        }),
        (c._processLayoutQueue = function (t) {
          this.updateStagger(),
            t.forEach(function (t, e) {
              this._positionItem(t.item, t.x, t.y, t.isInstant, e);
            }, this);
        }),
        (c.updateStagger = function () {
          var t = this.options.stagger;
          return null == t
            ? void (this.stagger = 0)
            : ((this.stagger = (function (t) {
                if ("number" == typeof t) return t;
                var e = t.match(/(^\d*\.?\d*)(\w*)/),
                  i = e && e[1],
                  s = e && e[2];
                return i.length ? (i = parseFloat(i)) * (p[s] || 1) : 0;
              })(t)),
              this.stagger);
        }),
        (c._positionItem = function (t, e, i, s, n) {
          s ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
        }),
        (c._postLayout = function () {
          this.resizeContainer();
        }),
        (c.resizeContainer = function () {
          if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t &&
              (this._setContainerMeasure(t.width, !0),
              this._setContainerMeasure(t.height, !1));
          }
        }),
        (c._getContainerSize = l),
        (c._setContainerMeasure = function (t, e) {
          if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox &&
              (t += e
                ? i.paddingLeft +
                  i.paddingRight +
                  i.borderLeftWidth +
                  i.borderRightWidth
                : i.paddingBottom +
                  i.paddingTop +
                  i.borderTopWidth +
                  i.borderBottomWidth),
              (t = Math.max(t, 0)),
              (this.element.style[e ? "width" : "height"] = t + "px");
          }
        }),
        (c._emitCompleteOnItems = function (t, e) {
          function i() {
            n.dispatchEvent(t + "Complete", null, [e]);
          }
          function s() {
            ++a == o && i();
          }
          var n = this,
            o = e.length;
          if (e && o) {
            var a = 0;
            e.forEach(function (e) {
              e.once(t, s);
            });
          } else i();
        }),
        (c.dispatchEvent = function (t, e, i) {
          var s = e ? [e].concat(i) : i;
          if ((this.emitEvent(t, s), h))
            if (((this.$element = this.$element || h(this.element)), e)) {
              var n = h.Event(e);
              (n.type = t), this.$element.trigger(n, i);
            } else this.$element.trigger(t, i);
        }),
        (c.ignore = function (t) {
          var e = this.getItem(t);
          e && (e.isIgnored = !0);
        }),
        (c.unignore = function (t) {
          var e = this.getItem(t);
          e && delete e.isIgnored;
        }),
        (c.stamp = function (t) {
          (t = this._find(t)) &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
        }),
        (c.unstamp = function (t) {
          (t = this._find(t)) &&
            t.forEach(function (t) {
              s.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
        }),
        (c._find = function (t) {
          if (t)
            return (
              "string" == typeof t && (t = this.element.querySelectorAll(t)),
              s.makeArray(t)
            );
        }),
        (c._manageStamps = function () {
          this.stamps &&
            this.stamps.length &&
            (this._getBoundingRect(),
            this.stamps.forEach(this._manageStamp, this));
        }),
        (c._getBoundingRect = function () {
          var t = this.element.getBoundingClientRect(),
            e = this.size;
          this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
          };
        }),
        (c._manageStamp = l),
        (c._getElementOffset = function (t) {
          var e = t.getBoundingClientRect(),
            s = this._boundingRect,
            n = i(t);
          return {
            left: e.left - s.left - n.marginLeft,
            top: e.top - s.top - n.marginTop,
            right: s.right - e.right - n.marginRight,
            bottom: s.bottom - e.bottom - n.marginBottom,
          };
        }),
        (c.handleEvent = s.handleEvent),
        (c.bindResize = function () {
          t.addEventListener("resize", this), (this.isResizeBound = !0);
        }),
        (c.unbindResize = function () {
          t.removeEventListener("resize", this), (this.isResizeBound = !1);
        }),
        (c.onresize = function () {
          this.resize();
        }),
        s.debounceMethod(o, "onresize", 100),
        (c.resize = function () {
          this.isResizeBound && this.needsResizeLayout() && this.layout();
        }),
        (c.needsResizeLayout = function () {
          var t = i(this.element);
          return this.size && t && t.innerWidth !== this.size.innerWidth;
        }),
        (c.addItems = function (t) {
          var e = this._itemize(t);
          return e.length && (this.items = this.items.concat(e)), e;
        }),
        (c.appended = function (t) {
          var e = this.addItems(t);
          e.length && (this.layoutItems(e, !0), this.reveal(e));
        }),
        (c.prepended = function (t) {
          var e = this._itemize(t);
          if (e.length) {
            var i = this.items.slice(0);
            (this.items = e.concat(i)),
              this._resetLayout(),
              this._manageStamps(),
              this.layoutItems(e, !0),
              this.reveal(e),
              this.layoutItems(i);
          }
        }),
        (c.reveal = function (t) {
          if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
              t.stagger(i * e), t.reveal();
            });
          }
        }),
        (c.hide = function (t) {
          if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
              t.stagger(i * e), t.hide();
            });
          }
        }),
        (c.revealItemElements = function (t) {
          var e = this.getItems(t);
          this.reveal(e);
        }),
        (c.hideItemElements = function (t) {
          var e = this.getItems(t);
          this.hide(e);
        }),
        (c.getItem = function (t) {
          for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i;
          }
        }),
        (c.getItems = function (t) {
          t = s.makeArray(t);
          var e = [];
          return (
            t.forEach(function (t) {
              var i = this.getItem(t);
              i && e.push(i);
            }, this),
            e
          );
        }),
        (c.remove = function (t) {
          var e = this.getItems(t);
          this._emitCompleteOnItems("remove", e),
            e &&
              e.length &&
              e.forEach(function (t) {
                t.remove(), s.removeFrom(this.items, t);
              }, this);
        }),
        (c.destroy = function () {
          var t = this.element.style;
          (t.height = ""),
            (t.position = ""),
            (t.width = ""),
            this.items.forEach(function (t) {
              t.destroy();
            }),
            this.unbindResize();
          var e = this.element.outlayerGUID;
          delete u[e],
            delete this.element.outlayerGUID,
            h && h.removeData(this.element, this.constructor.namespace);
        }),
        (o.data = function (t) {
          var e = (t = s.getQueryElement(t)) && t.outlayerGUID;
          return e && u[e];
        }),
        (o.create = function (t, e) {
          var i = a(o);
          return (
            (i.defaults = s.extend({}, o.defaults)),
            s.extend(i.defaults, e),
            (i.compatOptions = s.extend({}, o.compatOptions)),
            (i.namespace = t),
            (i.data = o.data),
            (i.Item = a(n)),
            s.htmlInit(i, t),
            h && h.bridget && h.bridget(t, i),
            i
          );
        });
      var p = { ms: 1, s: 1e3 };
      return (o.Item = n), o;
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
        : "object" == typeof module && module.exports
        ? (module.exports = e(require("outlayer")))
        : ((t.Smashotope = t.Smashotope || {}),
          (t.Smashotope.Item = e(t.Outlayer)));
    })(window, function (t) {
      "use strict";
      function e() {
        t.Item.apply(this, arguments);
      }
      var i = (e.prototype = Object.create(t.Item.prototype)),
        s = i._create;
      (i._create = function () {
        (this.id = this.layout.itemGUID++), s.call(this), (this.sortData = {});
      }),
        (i.updateSortData = function () {
          if (!this.isIgnored) {
            (this.sortData.id = this.id),
              (this.sortData["original-order"] = this.id),
              (this.sortData.random = Math.random());
            var t = this.layout.options.getSortData,
              e = this.layout._sorters;
            for (var i in t) {
              var s = e[i];
              this.sortData[i] = s(this.element, this);
            }
          }
        });
      var n = i.destroy;
      return (
        (i.destroy = function () {
          n.apply(this, arguments), this.css({ display: "" });
        }),
        e
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "isotope-layout/js/layout-mode",
            ["get-size/get-size", "outlayer/outlayer"],
            e
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(require("get-size"), require("outlayer")))
        : ((t.Smashotope = t.Smashotope || {}),
          (t.Smashotope.LayoutMode = e(t.getSize, t.Outlayer)));
    })(window, function (t, e) {
      "use strict";
      function i(t) {
        (this.smashotope = t),
          t &&
            ((this.options = t.options[this.namespace]),
            (this.element = t.element),
            (this.items = t.filteredItems),
            (this.size = t.size));
      }
      var s = i.prototype;
      return (
        [
          "_resetLayout",
          "_getItemLayoutPosition",
          "_manageStamp",
          "_getContainerSize",
          "_getElementOffset",
          "needsResizeLayout",
          "_getOption",
        ].forEach(function (t) {
          s[t] = function () {
            return e.prototype[t].apply(this.smashotope, arguments);
          };
        }),
        (s.needsVerticalResizeLayout = function () {
          var e = t(this.smashotope.element);
          return (
            this.smashotope.size &&
            e &&
            e.innerHeight != this.smashotope.size.innerHeight
          );
        }),
        (s._getMeasurement = function () {
          this.smashotope._getMeasurement.apply(this, arguments);
        }),
        (s.getColumnWidth = function () {
          this.getSegmentSize("column", "Width");
        }),
        (s.getRowHeight = function () {
          this.getSegmentSize("row", "Height");
        }),
        (s.getSegmentSize = function (t, e) {
          var i = t + e,
            s = "outer" + e;
          if ((this._getMeasurement(i, s), !this[i])) {
            var n = this.getFirstItemSize();
            this[i] = (n && n[s]) || this.smashotope.size["inner" + e];
          }
        }),
        (s.getFirstItemSize = function () {
          var e = this.smashotope.filteredItems[0];
          return e && e.element && t(e.element);
        }),
        (s.layout = function () {
          this.smashotope.layout.apply(this.smashotope, arguments);
        }),
        (s.getSize = function () {
          this.smashotope.getSize(), (this.size = this.smashotope.size);
        }),
        (i.modes = {}),
        (i.create = function (t, e) {
          function n() {
            i.apply(this, arguments);
          }
          return (
            (n.prototype = Object.create(s)),
            (n.prototype.constructor = n),
            e && (n.options = e),
            (n.prototype.namespace = t),
            (i.modes[t] = n),
            n
          );
        }),
        i
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "masonry-layout/masonry",
            ["outlayer/outlayer", "get-size/get-size"],
            e
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(require("outlayer"), require("get-size")))
        : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window, function (t, e) {
      var i = t.create("masonry");
      i.compatOptions.fitWidth = "isFitWidth";
      var s = i.prototype;
      return (
        (s._resetLayout = function () {
          this.getSize(),
            this._getMeasurement("columnWidth", "outerWidth"),
            this._getMeasurement("gutter", "outerWidth"),
            this.measureColumns(),
            (this.colYs = []);
          for (var t = 0; t < this.cols; t++) this.colYs.push(0);
          (this.maxY = 0), (this.horizontalColIndex = 0);
        }),
        (s.measureColumns = function () {
          if ((this.getContainerWidth(), !this.columnWidth)) {
            var t = this.items[0],
              i = t && t.element;
            this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
          }
          var s = (this.columnWidth += this.gutter),
            n = this.containerWidth + this.gutter,
            o = n / s,
            a = s - (n % s);
          (o = Math[a && a < 1 ? "round" : "floor"](o)),
            (this.cols = Math.max(o, 1));
        }),
        (s.getContainerWidth = function () {
          var t = this._getOption("fitWidth")
              ? this.element.parentNode
              : this.element,
            i = e(t);
          this.containerWidth = i && i.innerWidth;
        }),
        (s._getItemLayoutPosition = function (t) {
          t.getSize();
          var e = t.size.outerWidth % this.columnWidth,
            i = Math[e && e < 1 ? "round" : "ceil"](
              t.size.outerWidth / this.columnWidth
            );
          i = Math.min(i, this.cols);
          for (
            var s = this[
                this.options.horizontalOrder
                  ? "_getHorizontalColPosition"
                  : "_getTopColPosition"
              ](i, t),
              n = { x: this.columnWidth * s.col, y: s.y },
              o = s.y + t.size.outerHeight,
              a = i + s.col,
              r = s.col;
            r < a;
            r++
          )
            this.colYs[r] = o;
          return n;
        }),
        (s._getTopColPosition = function (t) {
          var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
          return { col: e.indexOf(i), y: i };
        }),
        (s._getTopColGroup = function (t) {
          if (t < 2) return this.colYs;
          for (var e = [], i = this.cols + 1 - t, s = 0; s < i; s++)
            e[s] = this._getColGroupY(s, t);
          return e;
        }),
        (s._getColGroupY = function (t, e) {
          if (e < 2) return this.colYs[t];
          var i = this.colYs.slice(t, t + e);
          return Math.max.apply(Math, i);
        }),
        (s._getHorizontalColPosition = function (t, e) {
          var i = this.horizontalColIndex % this.cols;
          i = t > 1 && i + t > this.cols ? 0 : i;
          var s = e.size.outerWidth && e.size.outerHeight;
          return (
            (this.horizontalColIndex = s ? i + t : this.horizontalColIndex),
            { col: i, y: this._getColGroupY(i, t) }
          );
        }),
        (s._manageStamp = function (t) {
          var i = e(t),
            s = this._getElementOffset(t),
            n = this._getOption("originLeft") ? s.left : s.right,
            o = n + i.outerWidth,
            a = Math.floor(n / this.columnWidth);
          a = Math.max(0, a);
          var r = Math.floor(o / this.columnWidth);
          (r -= o % this.columnWidth ? 0 : 1), (r = Math.min(this.cols - 1, r));
          for (
            var h =
                (this._getOption("originTop") ? s.top : s.bottom) +
                i.outerHeight,
              l = a;
            l <= r;
            l++
          )
            this.colYs[l] = Math.max(h, this.colYs[l]);
        }),
        (s._getContainerSize = function () {
          this.maxY = Math.max.apply(Math, this.colYs);
          var t = { height: this.maxY };
          return (
            this._getOption("fitWidth") &&
              (t.width = this._getContainerFitWidth()),
            t
          );
        }),
        (s._getContainerFitWidth = function () {
          for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
          return (this.cols - t) * this.columnWidth - this.gutter;
        }),
        (s.needsResizeLayout = function () {
          var t = this.containerWidth;
          return this.getContainerWidth(), t != this.containerWidth;
        }),
        i
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "isotope-layout/js/layout-modes/masonry",
            ["../layout-mode", "masonry-layout/masonry"],
            e
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(
            require("../layout-mode"),
            require("masonry-layout")
          ))
        : e(t.Smashotope.LayoutMode, t.Masonry);
    })(window, function (t, e) {
      "use strict";
      var i = t.create("masonry"),
        s = i.prototype,
        n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
      for (var o in e.prototype) n[o] || (s[o] = e.prototype[o]);
      var a = s.measureColumns;
      s.measureColumns = function () {
        (this.items = this.smashotope.filteredItems), a.call(this);
      };
      var r = s._getOption;
      return (
        (s._getOption = function (t) {
          return "fitWidth" == t
            ? void 0 !== this.options.isFitWidth
              ? this.options.isFitWidth
              : this.options.fitWidth
            : r.apply(this.smashotope, arguments);
        }),
        i
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "isotope-layout/js/layout-modes/fit-rows",
            ["../layout-mode"],
            e
          )
        : "object" == typeof exports
        ? (module.exports = e(require("../layout-mode")))
        : e(t.Smashotope.LayoutMode);
    })(window, function (t) {
      "use strict";
      var e = t.create("fitRows"),
        i = e.prototype;
      return (
        (i._resetLayout = function () {
          (this.x = 0),
            (this.y = 0),
            (this.maxY = 0),
            this._getMeasurement("gutter", "outerWidth");
        }),
        (i._getItemLayoutPosition = function (t) {
          t.getSize();
          var e = t.size.outerWidth + this.gutter,
            i = this.smashotope.size.innerWidth + this.gutter;
          0 !== this.x &&
            e + this.x > i &&
            ((this.x = 0), (this.y = this.maxY));
          var s = { x: this.x, y: this.y };
          return (
            (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
            (this.x += e),
            s
          );
        }),
        (i._getContainerSize = function () {
          return { height: this.maxY };
        }),
        e
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "isotope-layout/js/layout-modes/vertical",
            ["../layout-mode"],
            e
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(require("../layout-mode")))
        : e(t.Smashotope.LayoutMode);
    })(window, function (t) {
      "use strict";
      var e = t.create("vertical", { horizontalAlignment: 0 }),
        i = e.prototype;
      return (
        (i._resetLayout = function () {
          this.y = 0;
        }),
        (i._getItemLayoutPosition = function (t) {
          t.getSize();
          var e =
              (this.smashotope.size.innerWidth - t.size.outerWidth) *
              this.options.horizontalAlignment,
            i = this.y;
          return (this.y += t.size.outerHeight), { x: e, y: i };
        }),
        (i._getContainerSize = function () {
          return { height: this.y };
        }),
        e
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            [
              "outlayer/outlayer",
              "get-size/get-size",
              "desandro-matches-selector/matches-selector",
              "fizzy-ui-utils/utils",
              "isotope-layout/js/item",
              "isotope-layout/js/layout-mode",
              "isotope-layout/js/layout-modes/masonry",
              "isotope-layout/js/layout-modes/fit-rows",
              "isotope-layout/js/layout-modes/vertical",
            ],
            function (i, s, n, o, a, r) {
              return e(t, i, s, n, o, a, r);
            }
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(
            t,
            require("outlayer"),
            require("get-size"),
            require("desandro-matches-selector"),
            require("fizzy-ui-utils"),
            require("isotope-layout/js/item"),
            require("isotope-layout/js/layout-mode"),
            require("isotope-layout/js/layout-modes/masonry"),
            require("isotope-layout/js/layout-modes/fit-rows"),
            require("isotope-layout/js/layout-modes/vertical")
          ))
        : (t.Smashotope = e(
            t,
            t.Outlayer,
            t.getSize,
            t.matchesSelector,
            t.fizzyUIUtils,
            t.Smashotope.Item,
            t.Smashotope.LayoutMode
          ));
    })(window, function (t, e, i, s, n, o, a) {
      var r = t.jQuery,
        h = String.prototype.trim
          ? function (t) {
              return t.trim();
            }
          : function (t) {
              return t.replace(/^\s+|\s+$/g, "");
            },
        l = e.create("smashotope", {
          layoutMode: "masonry",
          isJQueryFiltering: !0,
          sortAscending: !0,
        });
      (l.Item = o), (l.LayoutMode = a);
      var d = l.prototype;
      (d._create = function () {
        for (var t in ((this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        e.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ["original-order"]),
        a.modes))
          this._initLayoutMode(t);
      }),
        (d.reloadItems = function () {
          (this.itemGUID = 0), e.prototype.reloadItems.call(this);
        }),
        (d._itemize = function () {
          for (
            var t = e.prototype._itemize.apply(this, arguments), i = 0;
            i < t.length;
            i++
          ) {
            t[i].id = this.itemGUID++;
          }
          return this._updateItemsSortData(t), t;
        }),
        (d._initLayoutMode = function (t) {
          var e = a.modes[t],
            i = this.options[t] || {};
          (this.options[t] = e.options ? n.extend(e.options, i) : i),
            (this.modes[t] = new e(this));
        }),
        (d.layout = function () {
          return !this._isLayoutInited && this._getOption("initLayout")
            ? void this.arrange()
            : void this._layout();
        }),
        (d._layout = function () {
          var t = this._getIsInstant();
          this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(this.filteredItems, t),
            (this._isLayoutInited = !0);
        }),
        (d.arrange = function (t) {
          this.option(t), this._getIsInstant();
          var e = this._filter(this.items);
          (this.filteredItems = e.matches),
            this._bindArrangeComplete(),
            this._isInstant
              ? this._noTransition(this._hideReveal, [e])
              : this._hideReveal(e),
            this._sort(),
            this._layout();
        }),
        (d._init = d.arrange),
        (d._hideReveal = function (t) {
          this.reveal(t.needReveal), this.hide(t.needHide);
        }),
        (d._getIsInstant = function () {
          var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
          return (this._isInstant = e), e;
        }),
        (d._bindArrangeComplete = function () {
          function t() {
            e &&
              i &&
              s &&
              n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
          }
          var e,
            i,
            s,
            n = this;
          this.once("layoutComplete", function () {
            (e = !0), t();
          }),
            this.once("hideComplete", function () {
              (i = !0), t();
            }),
            this.once("revealComplete", function () {
              (s = !0), t();
            });
        }),
        (d._filter = function (t) {
          var e = this.options.filter;
          e = e || "*";
          for (
            var i = [], s = [], n = [], o = this._getFilterTest(e), a = 0;
            a < t.length;
            a++
          ) {
            var r = t[a];
            if (!r.isIgnored) {
              var h = o(r);
              h && i.push(r),
                h && r.isHidden ? s.push(r) : h || r.isHidden || n.push(r);
            }
          }
          return { matches: i, needReveal: s, needHide: n };
        }),
        (d._getFilterTest = function (t) {
          return r && this.options.isJQueryFiltering
            ? function (e) {
                return r(e.element).is(t);
              }
            : "function" == typeof t
            ? function (e) {
                return t(e.element);
              }
            : function (e) {
                return s(e.element, t);
              };
        }),
        (d.updateSortData = function (t) {
          var e;
          t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
            this._getSorters(),
            this._updateItemsSortData(e);
        }),
        (d._getSorters = function () {
          var t = this.options.getSortData;
          for (var e in t) {
            var i = t[e];
            this._sorters[e] = u(i);
          }
        }),
        (d._updateItemsSortData = function (t) {
          for (var e = t && t.length, i = 0; e && i < e; i++) {
            t[i].updateSortData();
          }
        });
      var u = (function () {
        return function (t) {
          if ("string" != typeof t) return t;
          var e = h(t).split(" "),
            i = e[0],
            s = i.match(/^\[(.+)\]$/),
            n = (function (t, e) {
              return t
                ? function (e) {
                    return e.getAttribute(t);
                  }
                : function (t) {
                    var i = t.querySelector(e);
                    return i && i.textContent;
                  };
            })(s && s[1], i),
            o = l.sortDataParsers[e[1]];
          return o
            ? function (t) {
                return t && o(n(t));
              }
            : function (t) {
                return t && n(t);
              };
        };
      })();
      (l.sortDataParsers = {
        parseInt: function (t) {
          return parseInt(t, 10);
        },
        parseFloat: function (t) {
          return parseFloat(t);
        },
      }),
        (d._sort = function () {
          if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) ||
              (this.sortHistory = t.concat(this.sortHistory));
            var e = (function (t, e) {
              return function (i, s) {
                for (var n = 0; n < t.length; n++) {
                  var o = t[n],
                    a = i.sortData[o],
                    r = s.sortData[o];
                  if (a > r || a < r)
                    return (
                      (a > r ? 1 : -1) * ((void 0 !== e[o] ? e[o] : e) ? 1 : -1)
                    );
                }
                return 0;
              };
            })(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e);
          }
        }),
        (d._getIsSameSortBy = function (t) {
          for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
          return !0;
        }),
        (d._mode = function () {
          var t = this.options.layoutMode,
            e = this.modes[t];
          if (!e) throw new Error("No layout mode: " + t);
          return (e.options = this.options[t]), e;
        }),
        (d._resetLayout = function () {
          e.prototype._resetLayout.call(this), this._mode()._resetLayout();
        }),
        (d._getItemLayoutPosition = function (t) {
          return this._mode()._getItemLayoutPosition(t);
        }),
        (d._manageStamp = function (t) {
          this._mode()._manageStamp(t);
        }),
        (d._getContainerSize = function () {
          return this._mode()._getContainerSize();
        }),
        (d.needsResizeLayout = function () {
          return this._mode().needsResizeLayout();
        }),
        (d.appended = function (t) {
          var e = this.addItems(t);
          if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i);
          }
        }),
        (d.prepended = function (t) {
          var e = this._itemize(t);
          if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems),
              (this.filteredItems = i.concat(this.filteredItems)),
              (this.items = e.concat(this.items));
          }
        }),
        (d._filterRevealAdded = function (t) {
          var e = this._filter(t);
          return (
            this.hide(e.needHide),
            this.reveal(e.matches),
            this.layoutItems(e.matches, !0),
            e.matches
          );
        }),
        (d.insert = function (t) {
          var e = this.addItems(t);
          if (e.length) {
            var i,
              s,
              n = e.length;
            for (i = 0; i < n; i++)
              (s = e[i]), this.element.appendChild(s.element);
            var o = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(o);
          }
        });
      var c = d.remove;
      return (
        (d.remove = function (t) {
          t = n.makeArray(t);
          var e = this.getItems(t);
          c.call(this, t);
          for (var i = e && e.length, s = 0; i && s < i; s++) {
            var o = e[s];
            n.removeFrom(this.filteredItems, o);
          }
        }),
        (d.shuffle = function () {
          for (var t = 0; t < this.items.length; t++) {
            this.items[t].sortData.random = Math.random();
          }
          (this.options.sortBy = "random"), this._sort(), this._layout();
        }),
        (d._noTransition = function (t, e) {
          var i = this.options.transitionDuration;
          this.options.transitionDuration = 0;
          var s = t.apply(this, e);
          return (this.options.transitionDuration = i), s;
        }),
        (d.getFilteredItemElements = function () {
          return this.filteredItems.map(function (t) {
            return t.element;
          });
        }),
        l
      );
    }),
    !(function (t, e, i, s) {
      function n(e, i) {
        (this.settings = null),
          (this.options = t.extend({}, n.Defaults, i)),
          (this.$element = t(e)),
          (this._handlers = {}),
          (this._plugins = {}),
          (this._supress = {}),
          (this._current = null),
          (this._speed = null),
          (this._coordinates = []),
          (this._breakpoint = null),
          (this._width = null),
          (this._items = []),
          (this._clones = []),
          (this._mergers = []),
          (this._widths = []),
          (this._invalidated = {}),
          (this._pipe = []),
          (this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: { start: null, current: null },
            direction: null,
          }),
          (this._states = {
            current: {},
            tags: {
              initializing: ["busy"],
              animating: ["busy"],
              dragging: ["interacting"],
            },
          }),
          t.each(
            ["onResize", "onThrottledResize"],
            t.proxy(function (e, i) {
              this._handlers[i] = t.proxy(this[i], this);
            }, this)
          ),
          t.each(
            n.Plugins,
            t.proxy(function (t, e) {
              this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(
                this
              );
            }, this)
          ),
          t.each(
            n.Workers,
            t.proxy(function (e, i) {
              this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) });
            }, this)
          ),
          this.setup(),
          this.initialize();
      }
      (n.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "sbi-owl-refresh",
        loadedClass: "sbi-owl-loaded",
        loadingClass: "sbi-owl-loading",
        rtlClass: "sbi-owl-rtl",
        responsiveClass: "sbi-owl-responsive",
        dragClass: "sbi-owl-drag",
        itemClass: "sbi-owl-item",
        stageClass: "sbi-owl-stage",
        stageOuterClass: "sbi-owl-stage-outer",
        grabClass: "sbi-owl-grab",
      }),
        (n.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (n.Type = { Event: "event", State: "state" }),
        (n.Plugins = {}),
        (n.Workers = [
          {
            filter: ["width", "settings"],
            run: function () {
              this._width = this.$element.width();
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              t.current =
                this._items && this._items[this.relative(this._current)];
            },
          },
          {
            filter: ["items", "settings"],
            run: function () {
              this.$stage.children(".cloned").remove();
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              var e = this.settings.margin || "",
                i = !this.settings.autoWidth,
                s = this.settings.rtl,
                n = {
                  width: "auto",
                  "margin-left": s ? e : "",
                  "margin-right": s ? "" : e,
                };
              !i && this.$stage.children().css(n), (t.css = n);
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              var e =
                  (this.width() / this.settings.items).toFixed(3) -
                  this.settings.margin,
                i = null,
                s = this._items.length,
                n = !this.settings.autoWidth,
                o = [];
              for (t.items = { merge: !1, width: e }; s--; )
                (i = this._mergers[s]),
                  (i =
                    (this.settings.mergeFit &&
                      Math.min(i, this.settings.items)) ||
                    i),
                  (t.items.merge = i > 1 || t.items.merge),
                  (o[s] = n ? e * i : this._items[s].width());
              this._widths = o;
            },
          },
          {
            filter: ["items", "settings"],
            run: function () {
              var e = [],
                i = this._items,
                s = this.settings,
                n = Math.max(2 * s.items, 4),
                o = 2 * Math.ceil(i.length / 2),
                a = s.loop && i.length ? (s.rewind ? n : Math.max(n, o)) : 0,
                r = "",
                h = "";
              for (a /= 2; a--; )
                e.push(this.normalize(e.length / 2, !0)),
                  (r += i[e[e.length - 1]][0].outerHTML),
                  e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)),
                  (h = i[e[e.length - 1]][0].outerHTML + h);
              (this._clones = e),
                t(r).addClass("cloned").appendTo(this.$stage),
                t(h).addClass("cloned").prependTo(this.$stage);
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function () {
              for (
                var t = this.settings.rtl ? 1 : -1,
                  e = this._clones.length + this._items.length,
                  i = -1,
                  s = 0,
                  n = 0,
                  o = [];
                ++i < e;

              )
                (s = o[i - 1] || 0),
                  (n = this._widths[this.relative(i)] + this.settings.margin),
                  o.push(s + n * t);
              this._coordinates = o;
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function () {
              var t = this.settings.stagePadding,
                e = this._coordinates,
                i = {
                  width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                  "padding-left": t || "",
                  "padding-right": t || "",
                };
              this.$stage.css(i);
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              var e = this._coordinates.length,
                i = !this.settings.autoWidth,
                s = this.$stage.children();
              if (i && t.items.merge)
                for (; e--; )
                  (t.css.width = this._widths[this.relative(e)]),
                    s.eq(e).css(t.css);
              else i && ((t.css.width = t.items.width), s.css(t.css));
            },
          },
          {
            filter: ["items"],
            run: function () {
              this._coordinates.length < 1 && this.$stage.removeAttr("style");
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              (t.current = t.current
                ? this.$stage.children().index(t.current)
                : 0),
                (t.current = Math.max(
                  this.minimum(),
                  Math.min(this.maximum(), t.current)
                )),
                this.reset(t.current);
            },
          },
          {
            filter: ["position"],
            run: function () {
              this.animate(this.coordinates(this._current));
            },
          },
          {
            filter: ["width", "position", "items", "settings"],
            run: function () {
              var t,
                e,
                i,
                s,
                n = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                a = this.coordinates(this.current()) + o,
                r = a + this.width() * n,
                h = [];
              for (i = 0, s = this._coordinates.length; i < s; i++)
                (t = this._coordinates[i - 1] || 0),
                  (e = Math.abs(this._coordinates[i]) + o * n),
                  ((this.op(t, "<=", a) && this.op(t, ">", r)) ||
                    (this.op(e, "<", a) && this.op(e, ">", r))) &&
                    h.push(i);
              this.$stage.children(".active").removeClass("active"),
                this.$stage
                  .children(":eq(" + h.join("), :eq(") + ")")
                  .addClass("active"),
                this.settings.center &&
                  (this.$stage.children(".center").removeClass("center"),
                  this.$stage.children().eq(this.current()).addClass("center"));
            },
          },
        ]),
        (n.prototype.initialize = function () {
          var e, i, n;
          (this.enter("initializing"),
          this.trigger("initialize"),
          this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
          this.settings.autoWidth && !this.is("pre-loading")) &&
            ((e = this.$element.find("img")),
            (i = this.settings.nestedItemSelector
              ? "." + this.settings.nestedItemSelector
              : s),
            (n = this.$element.children(i).width()),
            e.length && n <= 0 && this.preloadAutoWidthImages(e));
          this.$element.addClass(this.options.loadingClass),
            (this.$stage = t(
              "<" +
                this.settings.stageElement +
                ' class="' +
                this.settings.stageClass +
                '"/>'
            ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
            this.$element.append(this.$stage.parent()),
            this.replace(this.$element.children().not(this.$stage.parent())),
            this.$element.is(":visible")
              ? this.refresh()
              : this.invalidate("width"),
            this.$element
              .removeClass(this.options.loadingClass)
              .addClass(this.options.loadedClass),
            this.registerEventHandlers(),
            this.leave("initializing"),
            this.trigger("initialized");
        }),
        (n.prototype.setup = function () {
          var e = this.viewport(),
            i = this.options.responsive,
            s = -1,
            n = null;
          i
            ? (t.each(i, function (t) {
                t <= e && t > s && (s = Number(t));
              }),
              "function" ==
                typeof (n = t.extend({}, this.options, i[s])).stagePadding &&
                (n.stagePadding = n.stagePadding()),
              delete n.responsive,
              n.responsiveClass &&
                this.$element.attr(
                  "class",
                  this.$element
                    .attr("class")
                    .replace(
                      new RegExp(
                        "(" + this.options.responsiveClass + "-)\\S+\\s",
                        "g"
                      ),
                      "$1" + s
                    )
                ))
            : (n = t.extend({}, this.options)),
            this.trigger("change", {
              property: { name: "settings", value: n },
            }),
            (this._breakpoint = s),
            (this.settings = n),
            this.invalidate("settings"),
            this.trigger("changed", {
              property: { name: "settings", value: this.settings },
            });
        }),
        (n.prototype.optionsLogic = function () {
          this.settings.autoWidth &&
            ((this.settings.stagePadding = !1), (this.settings.merge = !1));
        }),
        (n.prototype.prepare = function (e) {
          var i = this.trigger("prepare", { content: e });
          return (
            i.data ||
              (i.data = t("<" + this.settings.itemElement + "/>")
                .addClass(this.options.itemClass)
                .append(e)),
            this.trigger("prepared", { content: i.data }),
            i.data
          );
        }),
        (n.prototype.update = function () {
          for (
            var e = 0,
              i = this._pipe.length,
              s = t.proxy(function (t) {
                return this[t];
              }, this._invalidated),
              n = {};
            e < i;

          )
            (this._invalidated.all ||
              t.grep(this._pipe[e].filter, s).length > 0) &&
              this._pipe[e].run(n),
              e++;
          (this._invalidated = {}), !this.is("valid") && this.enter("valid");
        }),
        (n.prototype.width = function (t) {
          switch ((t = t || n.Width.Default)) {
            case n.Width.Inner:
            case n.Width.Outer:
              return this._width;
            default:
              return (
                this._width -
                2 * this.settings.stagePadding +
                this.settings.margin
              );
          }
        }),
        (n.prototype.refresh = function () {
          this.enter("refreshing"),
            this.trigger("refresh"),
            this.setup(),
            this.optionsLogic(),
            this.$element.addClass(this.options.refreshClass),
            this.update(),
            this.$element.removeClass(this.options.refreshClass),
            this.leave("refreshing"),
            this.trigger("refreshed");
        }),
        (n.prototype.onThrottledResize = function () {
          e.clearTimeout(this.resizeTimer),
            (this.resizeTimer = e.setTimeout(
              this._handlers.onResize,
              this.settings.responsiveRefreshRate
            ));
        }),
        (n.prototype.onResize = function () {
          return (
            !!this._items.length &&
            this._width !== this.$element.width() &&
            !!this.$element.is(":visible") &&
            (this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented()
              ? (this.leave("resizing"), !1)
              : (this.invalidate("width"),
                this.refresh(),
                this.leave("resizing"),
                void this.trigger("resized")))
          );
        }),
        (n.prototype.registerEventHandlers = function () {
          t.support.transition &&
            this.$stage.on(
              t.support.transition.end + ".owl.core",
              t.proxy(this.onTransitionEnd, this)
            ),
            !1 !== this.settings.responsive &&
              this.on(e, "resize", this._handlers.onThrottledResize),
            this.settings.mouseDrag &&
              (this.$element.addClass(this.options.dragClass),
              this.$stage.on(
                "mousedown.owl.core",
                t.proxy(this.onDragStart, this)
              ),
              this.$stage.on(
                "dragstart.owl.core selectstart.owl.core",
                function () {
                  return !1;
                }
              )),
            this.settings.touchDrag &&
              (this.$stage.on(
                "touchstart.owl.core",
                t.proxy(this.onDragStart, this)
              ),
              this.$stage.on(
                "touchcancel.owl.core",
                t.proxy(this.onDragEnd, this)
              ));
        }),
        (n.prototype.onDragStart = function (e) {
          var s = null;
          3 !== e.which &&
            (t.support.transform
              ? (s = {
                  x: (s = this.$stage
                    .css("transform")
                    .replace(/.*\(|\)| /g, "")
                    .split(","))[16 === s.length ? 12 : 4],
                  y: s[16 === s.length ? 13 : 5],
                })
              : ((s = this.$stage.position()),
                (s = {
                  x: this.settings.rtl
                    ? s.left +
                      this.$stage.width() -
                      this.width() +
                      this.settings.margin
                    : s.left,
                  y: s.top,
                })),
            this.is("animating") &&
              (t.support.transform ? this.animate(s.x) : this.$stage.stop(),
              this.invalidate("position")),
            this.$element.toggleClass(
              this.options.grabClass,
              "mousedown" === e.type
            ),
            this.speed(0),
            (this._drag.time = new Date().getTime()),
            (this._drag.target = t(e.target)),
            (this._drag.stage.start = s),
            (this._drag.stage.current = s),
            (this._drag.pointer = this.pointer(e)),
            t(i).on(
              "mouseup.owl.core touchend.owl.core",
              t.proxy(this.onDragEnd, this)
            ),
            t(i).one(
              "mousemove.owl.core touchmove.owl.core",
              t.proxy(function (e) {
                var s = this.difference(this._drag.pointer, this.pointer(e));
                t(i).on(
                  "mousemove.owl.core touchmove.owl.core",
                  t.proxy(this.onDragMove, this)
                ),
                  (Math.abs(s.x) < Math.abs(s.y) && this.is("valid")) ||
                    (e.preventDefault(),
                    this.enter("dragging"),
                    this.trigger("drag"));
              }, this)
            ));
        }),
        (n.prototype.onDragMove = function (t) {
          var e = null,
            i = null,
            s = null,
            n = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, n);
          this.is("dragging") &&
            (t.preventDefault(),
            this.settings.loop
              ? ((e = this.coordinates(this.minimum())),
                (i = this.coordinates(this.maximum() + 1) - e),
                (o.x = ((((o.x - e) % i) + i) % i) + e))
              : ((e = this.settings.rtl
                  ? this.coordinates(this.maximum())
                  : this.coordinates(this.minimum())),
                (i = this.settings.rtl
                  ? this.coordinates(this.minimum())
                  : this.coordinates(this.maximum())),
                (s = this.settings.pullDrag ? (-1 * n.x) / 5 : 0),
                (o.x = Math.max(Math.min(o.x, e + s), i + s))),
            (this._drag.stage.current = o),
            this.animate(o.x));
        }),
        (n.prototype.onDragEnd = function (e) {
          var s = this.difference(this._drag.pointer, this.pointer(e)),
            n = this._drag.stage.current,
            o = (s.x > 0) ^ this.settings.rtl ? "left" : "right";
          t(i).off(".owl.core"),
            this.$element.removeClass(this.options.grabClass),
            ((0 !== s.x && this.is("dragging")) || !this.is("valid")) &&
              (this.speed(
                this.settings.dragEndSpeed || this.settings.smartSpeed
              ),
              this.current(
                this.closest(n.x, 0 !== s.x ? o : this._drag.direction)
              ),
              this.invalidate("position"),
              this.update(),
              (this._drag.direction = o),
              (Math.abs(s.x) > 3 ||
                new Date().getTime() - this._drag.time > 300) &&
                this._drag.target.one("click.owl.core", function () {
                  return !1;
                })),
            this.is("dragging") &&
              (this.leave("dragging"), this.trigger("dragged"));
        }),
        (n.prototype.closest = function (e, i) {
          var s = -1,
            n = this.width(),
            o = this.coordinates();
          return (
            this.settings.freeDrag ||
              t.each(
                o,
                t.proxy(function (t, a) {
                  return (
                    "left" === i && e > a - 30 && e < a + 30
                      ? (s = t)
                      : "right" === i && e > a - n - 30 && e < a - n + 30
                      ? (s = t + 1)
                      : this.op(e, "<", a) &&
                        this.op(e, ">", o[t + 1] || a - n) &&
                        (s = "left" === i ? t + 1 : t),
                    -1 === s
                  );
                }, this)
              ),
            this.settings.loop ||
              (this.op(e, ">", o[this.minimum()])
                ? (s = e = this.minimum())
                : this.op(e, "<", o[this.maximum()]) &&
                  (s = e = this.maximum())),
            s
          );
        }),
        (n.prototype.animate = function (e) {
          var i = this.speed() > 0;
          this.is("animating") && this.onTransitionEnd(),
            i && (this.enter("animating"), this.trigger("translate")),
            t.support.transform3d && t.support.transition
              ? this.$stage.css({
                  transform: "translate3d(" + e + "px,0px,0px)",
                  transition: this.speed() / 1e3 + "s",
                })
              : i
              ? this.$stage.animate(
                  { left: e + "px" },
                  this.speed(),
                  this.settings.fallbackEasing,
                  t.proxy(this.onTransitionEnd, this)
                )
              : this.$stage.css({ left: e + "px" });
        }),
        (n.prototype.is = function (t) {
          return this._states.current[t] && this._states.current[t] > 0;
        }),
        (n.prototype.current = function (t) {
          if (t === s) return this._current;
          if (0 === this._items.length) return s;
          if (((t = this.normalize(t)), this._current !== t)) {
            var e = this.trigger("change", {
              property: { name: "position", value: t },
            });
            e.data !== s && (t = this.normalize(e.data)),
              (this._current = t),
              this.invalidate("position"),
              this.trigger("changed", {
                property: { name: "position", value: this._current },
              });
          }
          return this._current;
        }),
        (n.prototype.invalidate = function (e) {
          return (
            "string" == typeof e &&
              ((this._invalidated[e] = !0),
              this.is("valid") && this.leave("valid")),
            t.map(this._invalidated, function (t, e) {
              return e;
            })
          );
        }),
        (n.prototype.reset = function (t) {
          (t = this.normalize(t)) !== s &&
            ((this._speed = 0),
            (this._current = t),
            this.suppress(["translate", "translated"]),
            this.animate(this.coordinates(t)),
            this.release(["translate", "translated"]));
        }),
        (n.prototype.normalize = function (t, e) {
          var i = this._items.length,
            n = e ? 0 : this._clones.length;
          return (
            !this.isNumeric(t) || i < 1
              ? (t = s)
              : (t < 0 || t >= i + n) &&
                (t = ((((t - n / 2) % i) + i) % i) + n / 2),
            t
          );
        }),
        (n.prototype.relative = function (t) {
          return (t -= this._clones.length / 2), this.normalize(t, !0);
        }),
        (n.prototype.maximum = function (t) {
          var e,
            i,
            s,
            n = this.settings,
            o = this._coordinates.length;
          if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
          else if (n.autoWidth || n.merge) {
            for (
              e = this._items.length,
                i = this._items[--e].width(),
                s = this.$element.width();
              e-- &&
              !((i += this._items[e].width() + this.settings.margin) > s);

            );
            o = e + 1;
          } else
            o = n.center
              ? this._items.length - 1
              : this._items.length - n.items;
          return t && (o -= this._clones.length / 2), Math.max(o, 0);
        }),
        (n.prototype.minimum = function (t) {
          return t ? 0 : this._clones.length / 2;
        }),
        (n.prototype.items = function (t) {
          return t === s
            ? this._items.slice()
            : ((t = this.normalize(t, !0)), this._items[t]);
        }),
        (n.prototype.mergers = function (t) {
          return t === s
            ? this._mergers.slice()
            : ((t = this.normalize(t, !0)), this._mergers[t]);
        }),
        (n.prototype.clones = function (e) {
          var i = this._clones.length / 2,
            n = i + this._items.length,
            o = function (t) {
              return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2;
            };
          return e === s
            ? t.map(this._clones, function (t, e) {
                return o(e);
              })
            : t.map(this._clones, function (t, i) {
                return t === e ? o(i) : null;
              });
        }),
        (n.prototype.speed = function (t) {
          return t !== s && (this._speed = t), this._speed;
        }),
        (n.prototype.coordinates = function (e) {
          var i,
            n = 1,
            o = e - 1;
          return e === s
            ? t.map(
                this._coordinates,
                t.proxy(function (t, e) {
                  return this.coordinates(e);
                }, this)
              )
            : (this.settings.center
                ? (this.settings.rtl && ((n = -1), (o = e + 1)),
                  (i = this._coordinates[e]),
                  (i +=
                    ((this.width() - i + (this._coordinates[o] || 0)) / 2) * n))
                : (i = this._coordinates[o] || 0),
              (i = Math.ceil(i)));
        }),
        (n.prototype.duration = function (t, e, i) {
          return 0 === i
            ? 0
            : Math.min(Math.max(Math.abs(e - t), 1), 6) *
                Math.abs(i || this.settings.smartSpeed);
        }),
        (n.prototype.to = function (t, e) {
          var i = this.current(),
            s = null,
            n = t - this.relative(i),
            o = (n > 0) - (n < 0),
            a = this._items.length,
            r = this.minimum(),
            h = this.maximum();
          this.settings.loop
            ? (!this.settings.rewind &&
                Math.abs(n) > a / 2 &&
                (n += -1 * o * a),
              (s = (((((t = i + n) - r) % a) + a) % a) + r) !== t &&
                s - n <= h &&
                s - n > 0 &&
                ((i = s - n), (t = s), this.reset(i)))
            : this.settings.rewind
            ? (t = ((t % (h += 1)) + h) % h)
            : (t = Math.max(r, Math.min(h, t))),
            this.speed(this.duration(i, t, e)),
            this.current(t),
            this.$element.is(":visible") && this.update();
        }),
        (n.prototype.next = function (t) {
          (t = t || !1), this.to(this.relative(this.current()) + 1, t);
        }),
        (n.prototype.prev = function (t) {
          (t = t || !1), this.to(this.relative(this.current()) - 1, t);
        }),
        (n.prototype.onTransitionEnd = function (t) {
          if (
            t !== s &&
            (t.stopPropagation(),
            (t.target || t.srcElement || t.originalTarget) !==
              this.$stage.get(0))
          )
            return !1;
          this.leave("animating"), this.trigger("translated");
        }),
        (n.prototype.viewport = function () {
          var s;
          return (
            this.options.responsiveBaseElement !== e
              ? (s = t(this.options.responsiveBaseElement).width())
              : e.innerWidth
              ? (s = e.innerWidth)
              : i.documentElement && i.documentElement.clientWidth
              ? (s = i.documentElement.clientWidth)
              : console.warn("Can not detect viewport width."),
            s
          );
        }),
        (n.prototype.replace = function (e) {
          this.$stage.empty(),
            (this._items = []),
            e && (e = e instanceof jQuery ? e : t(e)),
            this.settings.nestedItemSelector &&
              (e = e.find("." + this.settings.nestedItemSelector)),
            e
              .filter(function () {
                return 1 === this.nodeType;
              })
              .each(
                t.proxy(function (t, e) {
                  (e = this.prepare(e)),
                    this.$stage.append(e),
                    this._items.push(e),
                    this._mergers.push(
                      1 *
                        e
                          .find("[data-merge]")
                          .addBack("[data-merge]")
                          .attr("data-merge") || 1
                    );
                }, this)
              ),
            this.reset(
              this.isNumeric(this.settings.startPosition)
                ? this.settings.startPosition
                : 0
            ),
            this.invalidate("items");
        }),
        (n.prototype.add = function (e, i) {
          var n = this.relative(this._current);
          (i = i === s ? this._items.length : this.normalize(i, !0)),
            (e = e instanceof jQuery ? e : t(e)),
            this.trigger("add", { content: e, position: i }),
            (e = this.prepare(e)),
            0 === this._items.length || i === this._items.length
              ? (0 === this._items.length && this.$stage.append(e),
                0 !== this._items.length && this._items[i - 1].after(e),
                this._items.push(e),
                this._mergers.push(
                  1 *
                    e
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                ))
              : (this._items[i].before(e),
                this._items.splice(i, 0, e),
                this._mergers.splice(
                  i,
                  0,
                  1 *
                    e
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                )),
            this._items[n] && this.reset(this._items[n].index()),
            this.invalidate("items"),
            this.trigger("added", { content: e, position: i });
        }),
        (n.prototype.remove = function (t) {
          (t = this.normalize(t, !0)) !== s &&
            (this.trigger("remove", { content: this._items[t], position: t }),
            this._items[t].remove(),
            this._items.splice(t, 1),
            this._mergers.splice(t, 1),
            this.invalidate("items"),
            this.trigger("removed", { content: null, position: t }));
        }),
        (n.prototype.preloadAutoWidthImages = function (e) {
          e.each(
            t.proxy(function (e, i) {
              this.enter("pre-loading"),
                (i = t(i)),
                t(new Image())
                  .one(
                    "load",
                    t.proxy(function (t) {
                      i.attr("src", t.target.src),
                        i.css("opacity", 1),
                        this.leave("pre-loading"),
                        !this.is("pre-loading") &&
                          !this.is("initializing") &&
                          this.refresh();
                    }, this)
                  )
                  .attr(
                    "src",
                    i.attr("src") ||
                      i.attr("data-src") ||
                      i.attr("data-src-retina")
                  );
            }, this)
          );
        }),
        (n.prototype.destroy = function () {
          for (var s in (this.$element.off(".owl.core"),
          this.$stage.off(".owl.core"),
          t(i).off(".owl.core"),
          !1 !== this.settings.responsive &&
            (e.clearTimeout(this.resizeTimer),
            this.off(e, "resize", this._handlers.onThrottledResize)),
          this._plugins))
            this._plugins[s].destroy();
          this.$stage.children(".cloned").remove(),
            this.$stage.unwrap(),
            this.$stage.children().contents().unwrap(),
            this.$stage.children().unwrap(),
            this.$element
              .removeClass(this.options.refreshClass)
              .removeClass(this.options.loadingClass)
              .removeClass(this.options.loadedClass)
              .removeClass(this.options.rtlClass)
              .removeClass(this.options.dragClass)
              .removeClass(this.options.grabClass)
              .attr(
                "class",
                this.$element
                  .attr("class")
                  .replace(
                    new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                    ""
                  )
              )
              .removeData("owl.carousel");
        }),
        (n.prototype.op = function (t, e, i) {
          var s = this.settings.rtl;
          switch (e) {
            case "<":
              return s ? t > i : t < i;
            case ">":
              return s ? t < i : t > i;
            case ">=":
              return s ? t <= i : t >= i;
            case "<=":
              return s ? t >= i : t <= i;
          }
        }),
        (n.prototype.on = function (t, e, i, s) {
          t.addEventListener
            ? t.addEventListener(e, i, s)
            : t.attachEvent && t.attachEvent("on" + e, i);
        }),
        (n.prototype.off = function (t, e, i, s) {
          t.removeEventListener
            ? t.removeEventListener(e, i, s)
            : t.detachEvent && t.detachEvent("on" + e, i);
        }),
        (n.prototype.trigger = function (e, i, s, o, a) {
          var r = {
              item: { count: this._items.length, index: this.current() },
            },
            h = t.camelCase(
              t
                .grep(["on", e, s], function (t) {
                  return t;
                })
                .join("-")
                .toLowerCase()
            ),
            l = t.Event(
              [e, "owl", s || "carousel"].join(".").toLowerCase(),
              t.extend({ relatedTarget: this }, r, i)
            );
          return (
            this._supress[e] ||
              (t.each(this._plugins, function (t, e) {
                e.onTrigger && e.onTrigger(l);
              }),
              this.register({ type: n.Type.Event, name: e }),
              this.$element.trigger(l),
              this.settings &&
                "function" == typeof this.settings[h] &&
                this.settings[h].call(this, l)),
            l
          );
        }),
        (n.prototype.enter = function (e) {
          t.each(
            [e].concat(this._states.tags[e] || []),
            t.proxy(function (t, e) {
              this._states.current[e] === s && (this._states.current[e] = 0),
                this._states.current[e]++;
            }, this)
          );
        }),
        (n.prototype.leave = function (e) {
          t.each(
            [e].concat(this._states.tags[e] || []),
            t.proxy(function (t, e) {
              this._states.current[e]--;
            }, this)
          );
        }),
        (n.prototype.register = function (e) {
          if (e.type === n.Type.Event) {
            if (
              (t.event.special[e.name] || (t.event.special[e.name] = {}),
              !t.event.special[e.name].owl)
            ) {
              var i = t.event.special[e.name]._default;
              (t.event.special[e.name]._default = function (t) {
                return !i ||
                  !i.apply ||
                  (t.namespace && -1 !== t.namespace.indexOf("owl"))
                  ? t.namespace && t.namespace.indexOf("owl") > -1
                  : i.apply(this, arguments);
              }),
                (t.event.special[e.name].owl = !0);
            }
          } else
            e.type === n.Type.State &&
              (this._states.tags[e.name]
                ? (this._states.tags[e.name] = this._states.tags[e.name].concat(
                    e.tags
                  ))
                : (this._states.tags[e.name] = e.tags),
              (this._states.tags[e.name] = t.grep(
                this._states.tags[e.name],
                t.proxy(function (i, s) {
                  return t.inArray(i, this._states.tags[e.name]) === s;
                }, this)
              )));
        }),
        (n.prototype.suppress = function (e) {
          t.each(
            e,
            t.proxy(function (t, e) {
              this._supress[e] = !0;
            }, this)
          );
        }),
        (n.prototype.release = function (e) {
          t.each(
            e,
            t.proxy(function (t, e) {
              delete this._supress[e];
            }, this)
          );
        }),
        (n.prototype.pointer = function (t) {
          var i = { x: null, y: null };
          return (
            (t =
              (t = t.originalEvent || t || e.event).touches && t.touches.length
                ? t.touches[0]
                : t.changedTouches && t.changedTouches.length
                ? t.changedTouches[0]
                : t).pageX
              ? ((i.x = t.pageX), (i.y = t.pageY))
              : ((i.x = t.clientX), (i.y = t.clientY)),
            i
          );
        }),
        (n.prototype.isNumeric = function (t) {
          return !isNaN(parseFloat(t));
        }),
        (n.prototype.difference = function (t, e) {
          return { x: t.x - e.x, y: t.y - e.y };
        }),
        (t.fn.sbiOwlCarousel = function (e) {
          var i = Array.prototype.slice.call(arguments, 1);
          return this.each(function () {
            var s = t(this),
              o = s.data("owl.carousel");
            o ||
              ((o = new n(this, "object" == typeof e && e)),
              s.data("owl.carousel", o),
              t.each(
                [
                  "next",
                  "prev",
                  "to",
                  "destroy",
                  "refresh",
                  "replace",
                  "add",
                  "remove",
                ],
                function (e, i) {
                  o.register({ type: n.Type.Event, name: i }),
                    o.$element.on(
                      i + ".owl.carousel.core",
                      t.proxy(function (t) {
                        t.namespace &&
                          t.relatedTarget !== this &&
                          (this.suppress([i]),
                          o[i].apply(this, [].slice.call(arguments, 1)),
                          this.release([i]));
                      }, o)
                    );
                }
              )),
              "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i);
          });
        }),
        (t.fn.sbiOwlCarousel.Constructor = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function (e) {
        (this._core = e),
          (this._interval = null),
          (this._visible = null),
          (this._handlers = {
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace && this._core.settings.autoRefresh && this.watch();
            }, this),
          }),
          (this._core.options = t.extend({}, n.Defaults, this._core.options)),
          this._core.$element.on(this._handlers);
      };
      (n.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
        (n.prototype.watch = function () {
          this._interval ||
            ((this._visible = this._core.$element.is(":visible")),
            (this._interval = e.setInterval(
              t.proxy(this.refresh, this),
              this._core.settings.autoRefreshInterval
            )));
        }),
        (n.prototype.refresh = function () {
          this._core.$element.is(":visible") !== this._visible &&
            ((this._visible = !this._visible),
            this._core.$element.toggleClass("sbi-owl-hidden", !this._visible),
            this._visible &&
              this._core.invalidate("width") &&
              this._core.refresh());
        }),
        (n.prototype.destroy = function () {
          var t, i;
          for (t in (e.clearInterval(this._interval), this._handlers))
            this._core.$element.off(t, this._handlers[t]);
          for (i in Object.getOwnPropertyNames(this))
            "function" != typeof this[i] && (this[i] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.AutoRefresh = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function (e) {
        (this._core = e),
          (this._loaded = []),
          (this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
              t.proxy(function (e) {
                if (
                  e.namespace &&
                  this._core.settings &&
                  this._core.settings.lazyLoad &&
                  ((e.property && "position" == e.property.name) ||
                    "initialized" == e.type)
                )
                  for (
                    var i = this._core.settings,
                      s = (i.center && Math.ceil(i.items / 2)) || i.items,
                      n = (i.center && -1 * s) || 0,
                      o =
                        (e.property && void 0 !== e.property.value
                          ? e.property.value
                          : this._core.current()) + n,
                      a = this._core.clones().length,
                      r = t.proxy(function (t, e) {
                        this.load(e);
                      }, this);
                    n++ < s;

                  )
                    this.load(a / 2 + this._core.relative(o)),
                      a && t.each(this._core.clones(this._core.relative(o)), r),
                      o++;
              }, this),
          }),
          (this._core.options = t.extend({}, n.Defaults, this._core.options)),
          this._core.$element.on(this._handlers);
      };
      (n.Defaults = { lazyLoad: !1 }),
        (n.prototype.load = function (i) {
          var s = this._core.$stage.children().eq(i),
            n = s && s.find(".sbi-owl-lazy");
          !n ||
            t.inArray(s.get(0), this._loaded) > -1 ||
            (n.each(
              t.proxy(function (i, s) {
                var n,
                  o = t(s),
                  a =
                    (e.devicePixelRatio > 1 && o.attr("data-src-retina")) ||
                    o.attr("data-src");
                this._core.trigger("load", { element: o, url: a }, "lazy"),
                  o.is("img")
                    ? o
                        .one(
                          "load.owl.lazy",
                          t.proxy(function () {
                            o.css("opacity", 1),
                              this._core.trigger(
                                "loaded",
                                { element: o, url: a },
                                "lazy"
                              );
                          }, this)
                        )
                        .attr("src", a)
                    : (((n = new Image()).onload = t.proxy(function () {
                        o.css({
                          "background-image": 'url("' + a + '")',
                          opacity: "1",
                        }),
                          this._core.trigger(
                            "loaded",
                            { element: o, url: a },
                            "lazy"
                          );
                      }, this)),
                      (n.src = a));
              }, this)
            ),
            this._loaded.push(s.get(0)));
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.Lazy = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function (e) {
        (this._core = e),
          (this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": t.proxy(
              function (t) {
                t.namespace && this._core.settings.autoHeight && this.update();
              },
              this
            ),
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.autoHeight &&
                "position" == t.property.name &&
                this.update();
            }, this),
            "loaded.owl.lazy": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.autoHeight &&
                t.element
                  .closest("." + this._core.settings.itemClass)
                  .index() === this._core.current() &&
                this.update();
            }, this),
          }),
          (this._core.options = t.extend({}, n.Defaults, this._core.options)),
          this._core.$element.on(this._handlers);
      };
      (n.Defaults = { autoHeight: !1, autoHeightClass: "sbi-owl-height" }),
        (n.prototype.update = function () {
          var e,
            i = this._core._current,
            s = i + this._core.settings.items,
            n = this._core.$stage.children().toArray().slice(i, s),
            o = [];
          t.each(n, function (e, i) {
            o.push(t(i).height());
          }),
            (e = Math.max.apply(null, o)),
            this._core.$stage
              .parent()
              .height(e)
              .addClass(this._core.settings.autoHeightClass);
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in this._handlers)
            this._core.$element.off(t, this._handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.AutoHeight = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function (e) {
        (this._core = e),
          (this._videos = {}),
          (this._playing = null),
          (this._handlers = {
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.register({
                  type: "state",
                  name: "playing",
                  tags: ["interacting"],
                });
            }, this),
            "resize.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.video &&
                this.isInFullScreen() &&
                t.preventDefault();
            }, this),
            "refreshed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.is("resizing") &&
                this._core.$stage.find(".cloned .sbi-owl-video-frame").remove();
            }, this),
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                "position" === t.property.name &&
                this._playing &&
                this.stop();
            }, this),
            "prepared.owl.carousel": t.proxy(function (e) {
              if (e.namespace) {
                var i = t(e.content).find(".sbi-owl-video");
                i.length &&
                  (i.css("display", "none"), this.fetch(i, t(e.content)));
              }
            }, this),
          }),
          (this._core.options = t.extend({}, n.Defaults, this._core.options)),
          this._core.$element.on(this._handlers),
          this._core.$element.on(
            "click.owl.video",
            ".sbi-owl-video-play-icon",
            t.proxy(function (t) {
              this.play(t);
            }, this)
          );
      };
      (n.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
        (n.prototype.fetch = function (t, e) {
          var i = t.attr("data-vimeo-id")
              ? "vimeo"
              : t.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube",
            s =
              t.attr("data-vimeo-id") ||
              t.attr("data-youtube-id") ||
              t.attr("data-vzaar-id"),
            n = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight,
            a = t.attr("href");
          if (!a) throw new Error("Missing video URL.");
          if (
            (s = a.match(
              /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
            ))[3].indexOf("youtu") > -1
          )
            i = "youtube";
          else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
          else {
            if (!(s[3].indexOf("vzaar") > -1))
              throw new Error("Video URL not supported.");
            i = "vzaar";
          }
          (s = s[6]),
            (this._videos[a] = { type: i, id: s, width: n, height: o }),
            e.attr("data-video", a),
            this.thumbnail(t, this._videos[a]);
        }),
        (n.prototype.thumbnail = function (e, i) {
          var s,
            n,
            o =
              i.width && i.height
                ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"'
                : "",
            a = e.find("img"),
            r = "src",
            h = "",
            l = this._core.settings,
            d = function (t) {
              '<div class="sbi-owl-video-play-icon"></div>',
                (s = l.lazyLoad
                  ? '<div class="sbi-owl-video-tn ' +
                    h +
                    '" ' +
                    r +
                    '="' +
                    t +
                    '"></div>'
                  : '<div class="sbi-owl-video-tn" style="opacity:1;background-image:url(' +
                    t +
                    ')"></div>'),
                e.after(s),
                e.after('<div class="sbi-owl-video-play-icon"></div>');
            };
          if (
            (e.wrap('<div class="sbi-owl-video-wrapper"' + o + "></div>"),
            this._core.settings.lazyLoad &&
              ((r = "data-src"), (h = "sbi-owl-lazy")),
            a.length)
          )
            return d(a.attr(r)), a.remove(), !1;
          "youtube" === i.type
            ? ((n = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg"), d(n))
            : "vimeo" === i.type
            ? t.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                  (n = t[0].thumbnail_large), d(n);
                },
              })
            : "vzaar" === i.type &&
              t.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                  (n = t.framegrab_url), d(n);
                },
              });
        }),
        (n.prototype.stop = function () {
          this._core.trigger("stop", null, "video"),
            this._playing.find(".sbi-owl-video-frame").remove(),
            this._playing.removeClass("sbi-owl-video-playing"),
            (this._playing = null),
            this._core.leave("playing"),
            this._core.trigger("stopped", null, "video");
        }),
        (n.prototype.play = function (e) {
          var i,
            s = t(e.target).closest("." + this._core.settings.itemClass),
            n = this._videos[s.attr("data-video")],
            o = n.width || "100%",
            a = n.height || this._core.$stage.height();
          this._playing ||
            (this._core.enter("playing"),
            this._core.trigger("play", null, "video"),
            (s = this._core.items(this._core.relative(s.index()))),
            this._core.reset(s.index()),
            "youtube" === n.type
              ? (i =
                  '<iframe width="' +
                  o +
                  '" height="' +
                  a +
                  '" src="//www.youtube.com/embed/' +
                  n.id +
                  "?autoplay=1&rel=0&v=" +
                  n.id +
                  '" frameborder="0" allowfullscreen></iframe>')
              : "vimeo" === n.type
              ? (i =
                  '<iframe src="//player.vimeo.com/video/' +
                  n.id +
                  '?autoplay=1" width="' +
                  o +
                  '" height="' +
                  a +
                  '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
              : "vzaar" === n.type &&
                (i =
                  '<iframe frameborder="0"height="' +
                  a +
                  '"width="' +
                  o +
                  '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                  n.id +
                  '/player?autoplay=true"></iframe>'),
            t('<div class="sbi-owl-video-frame">' + i + "</div>").insertAfter(
              s.find(".sbi-owl-video")
            ),
            (this._playing = s.addClass("sbi-owl-video-playing")));
        }),
        (n.prototype.isInFullScreen = function () {
          var e =
            i.fullscreenElement ||
            i.mozFullScreenElement ||
            i.webkitFullscreenElement;
          return e && t(e).parent().hasClass("sbi-owl-video-frame");
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in (this._core.$element.off("click.owl.video"),
          this._handlers))
            this._core.$element.off(t, this._handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.Video = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function (e) {
        (this.core = e),
          (this.core.options = t.extend({}, n.Defaults, this.core.options)),
          (this.swapping = !0),
          (this.previous = s),
          (this.next = s),
          (this.handlers = {
            "change.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                "position" == t.property.name &&
                ((this.previous = this.core.current()),
                (this.next = t.property.value));
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
              t.proxy(function (t) {
                t.namespace && (this.swapping = "translated" == t.type);
              }, this),
            "translate.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this.swapping &&
                (this.core.options.animateOut || this.core.options.animateIn) &&
                this.swap();
            }, this),
          }),
          this.core.$element.on(this.handlers);
      };
      (n.Defaults = { animateOut: !1, animateIn: !1 }),
        (n.prototype.swap = function () {
          if (
            1 === this.core.settings.items &&
            t.support.animation &&
            t.support.transition
          ) {
            this.core.speed(0);
            var e,
              i = t.proxy(this.clear, this),
              s = this.core.$stage.children().eq(this.previous),
              n = this.core.$stage.children().eq(this.next),
              o = this.core.settings.animateIn,
              a = this.core.settings.animateOut;
            this.core.current() !== this.previous &&
              (a &&
                ((e =
                  this.core.coordinates(this.previous) -
                  this.core.coordinates(this.next)),
                s
                  .one(t.support.animation.end, i)
                  .css({ left: e + "px" })
                  .addClass("animated sbi-owl-animated-out")
                  .addClass(a)),
              o &&
                n
                  .one(t.support.animation.end, i)
                  .addClass("animated sbi-owl-animated-in")
                  .addClass(o));
          }
        }),
        (n.prototype.clear = function (e) {
          t(e.target)
            .css({ left: "" })
            .removeClass("animated sbi-owl-animated-out sbi-owl-animated-in")
            .removeClass(this.core.settings.animateIn)
            .removeClass(this.core.settings.animateOut),
            this.core.onTransitionEnd();
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.Animate = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function (e) {
        (this._core = e),
          (this._timeout = null),
          (this._paused = !1),
          (this._handlers = {
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace && "settings" === t.property.name
                ? this._core.settings.autoplay
                  ? this.play()
                  : this.stop()
                : t.namespace &&
                  "position" === t.property.name &&
                  this._core.settings.autoplay &&
                  this._setAutoPlayInterval();
            }, this),
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace && this._core.settings.autoplay && this.play();
            }, this),
            "play.owl.autoplay": t.proxy(function (t, e, i) {
              t.namespace && this.play(e, i);
            }, this),
            "stop.owl.autoplay": t.proxy(function (t) {
              t.namespace && this.stop();
            }, this),
            "mouseover.owl.autoplay": t.proxy(function () {
              this._core.settings.autoplayHoverPause &&
                this._core.is("rotating") &&
                this.pause();
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function () {
              this._core.settings.autoplayHoverPause &&
                this._core.is("rotating") &&
                this.play();
            }, this),
            "touchstart.owl.core": t.proxy(function () {
              this._core.settings.autoplayHoverPause &&
                this._core.is("rotating") &&
                this.pause();
            }, this),
            "touchend.owl.core": t.proxy(function () {
              this._core.settings.autoplayHoverPause && this.play();
            }, this),
          }),
          this._core.$element.on(this._handlers),
          (this._core.options = t.extend({}, n.Defaults, this._core.options));
      };
      (n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1,
      }),
        (n.prototype.play = function (t, e) {
          (this._paused = !1),
            this._core.is("rotating") ||
              (this._core.enter("rotating"), this._setAutoPlayInterval());
        }),
        (n.prototype._getNextTimeout = function (s, n) {
          return (
            this._timeout && e.clearTimeout(this._timeout),
            e.setTimeout(
              t.proxy(function () {
                this._paused ||
                  this._core.is("busy") ||
                  this._core.is("interacting") ||
                  i.hidden ||
                  this._core.next(n || this._core.settings.autoplaySpeed);
              }, this),
              s || this._core.settings.autoplayTimeout
            )
          );
        }),
        (n.prototype._setAutoPlayInterval = function () {
          this._timeout = this._getNextTimeout();
        }),
        (n.prototype.stop = function () {
          this._core.is("rotating") &&
            (e.clearTimeout(this._timeout), this._core.leave("rotating"));
        }),
        (n.prototype.pause = function () {
          this._core.is("rotating") && (this._paused = !0);
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in (this.stop(), this._handlers))
            this._core.$element.off(t, this._handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.autoplay = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      "use strict";
      var n = function (e) {
        (this._core = e),
          (this._initialized = !1),
          (this._pages = []),
          (this._controls = {}),
          (this._templates = []),
          (this.$element = this._core.$element),
          (this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to,
          }),
          (this._handlers = {
            "prepared.owl.carousel": t.proxy(function (e) {
              e.namespace &&
                this._core.settings.dotsData &&
                this._templates.push(
                  '<div class="' +
                    this._core.settings.dotClass +
                    '">' +
                    t(e.content)
                      .find("[data-dot]")
                      .addBack("[data-dot]")
                      .attr("data-dot") +
                    "</div>"
                );
            }, this),
            "added.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.dotsData &&
                this._templates.splice(t.position, 0, this._templates.pop());
            }, this),
            "remove.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.dotsData &&
                this._templates.splice(t.position, 1);
            }, this),
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace && "position" == t.property.name && this.draw();
            }, this),
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                !this._initialized &&
                (this._core.trigger("initialize", null, "navigation"),
                this.initialize(),
                this.update(),
                this.draw(),
                (this._initialized = !0),
                this._core.trigger("initialized", null, "navigation"));
            }, this),
            "refreshed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._initialized &&
                (this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation"));
            }, this),
          }),
          (this._core.options = t.extend({}, n.Defaults, this._core.options)),
          this.$element.on(this._handlers);
      };
      (n.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "sbi-owl-nav",
        navClass: ["sbi-owl-prev", "sbi-owl-next"],
        slideBy: 1,
        dotClass: "sbi-owl-dot",
        dotsClass: "sbi-owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
      }),
        (n.prototype.initialize = function () {
          var e,
            i = this._core.settings;
          for (e in ((this._controls.$relative = (
            i.navContainer
              ? t(i.navContainer)
              : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)
          ).addClass("disabled")),
          (this._controls.$previous = t("<" + i.navElement + ">")
            .addClass(i.navClass[0])
            .html(i.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              t.proxy(function (t) {
                this.prev(i.navSpeed);
              }, this)
            )),
          (this._controls.$next = t("<" + i.navElement + ">")
            .addClass(i.navClass[1])
            .html(i.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              t.proxy(function (t) {
                this.next(i.navSpeed);
              }, this)
            )),
          i.dotsData ||
            (this._templates = [
              t("<div>")
                .addClass(i.dotClass)
                .append(t("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            i.dotsContainer
              ? t(i.dotsContainer)
              : t("<div>").addClass(i.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "div",
            t.proxy(function (e) {
              var s = t(e.target).parent().is(this._controls.$absolute)
                ? t(e.target).index()
                : t(e.target).parent().index();
              e.preventDefault(), this.to(s, i.dotsSpeed);
            }, this)
          ),
          this._overrides))
            this._core[e] = t.proxy(this[e], this);
        }),
        (n.prototype.destroy = function () {
          var t, e, i, s;
          for (t in this._handlers) this.$element.off(t, this._handlers[t]);
          for (e in this._controls) this._controls[e].remove();
          for (s in this.overides) this._core[s] = this._overrides[s];
          for (i in Object.getOwnPropertyNames(this))
            "function" != typeof this[i] && (this[i] = null);
        }),
        (n.prototype.update = function () {
          var t,
            e,
            i = this._core.clones().length / 2,
            s = i + this._core.items().length,
            n = this._core.maximum(!0),
            o = this._core.settings,
            a =
              o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
          if (
            ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)),
            o.dots || "page" == o.slideBy)
          )
            for (this._pages = [], t = i, e = 0, 0; t < s; t++) {
              if (e >= a || 0 === e) {
                if (
                  (this._pages.push({
                    start: Math.min(n, t - i),
                    end: t - i + a - 1,
                  }),
                  Math.min(n, t - i) === n)
                )
                  break;
                (e = 0), 0;
              }
              e += this._core.mergers(this._core.relative(t));
            }
        }),
        (n.prototype.draw = function () {
          var e,
            i = this._core.settings,
            s = this._core.items().length <= i.items,
            n = this._core.relative(this._core.current()),
            o = i.loop || i.rewind;
          this._controls.$relative.toggleClass("disabled", !i.nav || s),
            i.nav &&
              (this._controls.$previous.toggleClass(
                "disabled",
                !o && n <= this._core.minimum(!0)
              ),
              this._controls.$next.toggleClass(
                "disabled",
                !o && n >= this._core.maximum(!0)
              )),
            this._controls.$absolute.toggleClass("disabled", !i.dots || s),
            i.dots &&
              ((e =
                this._pages.length -
                this._controls.$absolute.children().length),
              i.dotsData && 0 !== e
                ? this._controls.$absolute.html(this._templates.join(""))
                : e > 0
                ? this._controls.$absolute.append(
                    new Array(e + 1).join(this._templates[0])
                  )
                : e < 0 &&
                  this._controls.$absolute.children().slice(e).remove(),
              this._controls.$absolute.find(".active").removeClass("active"),
              this._controls.$absolute
                .children()
                .eq(t.inArray(this.current(), this._pages))
                .addClass("active"));
        }),
        (n.prototype.onTrigger = function (e) {
          var i = this._core.settings;
          e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size:
              i &&
              (i.center || i.autoWidth || i.dotsData
                ? 1
                : i.dotsEach || i.items),
          };
        }),
        (n.prototype.current = function () {
          var e = this._core.relative(this._core.current());
          return t
            .grep(
              this._pages,
              t.proxy(function (t, i) {
                return t.start <= e && t.end >= e;
              }, this)
            )
            .pop();
        }),
        (n.prototype.getPosition = function (e) {
          var i,
            s,
            n = this._core.settings;
          return (
            "page" == n.slideBy
              ? ((i = t.inArray(this.current(), this._pages)),
                (s = this._pages.length),
                e ? ++i : --i,
                (i = this._pages[((i % s) + s) % s].start))
              : ((i = this._core.relative(this._core.current())),
                (s = this._core.items().length),
                e ? (i += n.slideBy) : (i -= n.slideBy)),
            i
          );
        }),
        (n.prototype.next = function (e) {
          t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
        }),
        (n.prototype.prev = function (e) {
          t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
        }),
        (n.prototype.to = function (e, i, s) {
          var n;
          !s && this._pages.length
            ? ((n = this._pages.length),
              t.proxy(this._overrides.to, this._core)(
                this._pages[((e % n) + n) % n].start,
                i
              ))
            : t.proxy(this._overrides.to, this._core)(e, i);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.Navigation = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      "use strict";
      var n = function (i) {
        (this._core = i),
          (this._hashes = {}),
          (this.$element = this._core.$element),
          (this._handlers = {
            "initialized.owl.carousel": t.proxy(function (i) {
              i.namespace &&
                "URLHash" === this._core.settings.startPosition &&
                t(e).trigger("hashchange.owl.navigation");
            }, this),
            "prepared.owl.carousel": t.proxy(function (e) {
              if (e.namespace) {
                var i = t(e.content)
                  .find("[data-hash]")
                  .addBack("[data-hash]")
                  .attr("data-hash");
                if (!i) return;
                this._hashes[i] = e.content;
              }
            }, this),
            "changed.owl.carousel": t.proxy(function (i) {
              if (i.namespace && "position" === i.property.name) {
                var s = this._core.items(
                    this._core.relative(this._core.current())
                  ),
                  n = t
                    .map(this._hashes, function (t, e) {
                      return t === s ? e : null;
                    })
                    .join();
                if (!n || e.location.hash.slice(1) === n) return;
                e.location.hash = n;
              }
            }, this),
          }),
          (this._core.options = t.extend({}, n.Defaults, this._core.options)),
          this.$element.on(this._handlers),
          t(e).on(
            "hashchange.owl.navigation",
            t.proxy(function (t) {
              var i = e.location.hash.substring(1),
                s = this._core.$stage.children(),
                n = this._hashes[i] && s.index(this._hashes[i]);
              void 0 !== n &&
                n !== this._core.current() &&
                this._core.to(this._core.relative(n), !1, !0);
            }, this)
          );
      };
      (n.Defaults = { URLhashListener: !1 }),
        (n.prototype.destroy = function () {
          var i, s;
          for (i in (t(e).off("hashchange.owl.navigation"), this._handlers))
            this._core.$element.off(i, this._handlers[i]);
          for (s in Object.getOwnPropertyNames(this))
            "function" != typeof this[s] && (this[s] = null);
        }),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.Hash = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      function n(e, i) {
        var n = !1,
          o = e.charAt(0).toUpperCase() + e.slice(1);
        return (
          t.each((e + " " + r.join(o + " ") + o).split(" "), function (t, e) {
            if (a[e] !== s) return (n = !i || e), !1;
          }),
          n
        );
      }
      function o(t) {
        return n(t, !0);
      }
      var a = t("<support>").get(0).style,
        r = "Webkit Moz O ms".split(" "),
        h = {
          transition: {
            end: {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd",
              transition: "transitionend",
            },
          },
          animation: {
            end: {
              WebkitAnimation: "webkitAnimationEnd",
              MozAnimation: "animationend",
              OAnimation: "oAnimationEnd",
              animation: "animationend",
            },
          },
        },
        l = function () {
          return !!n("transform");
        },
        d = function () {
          return !!n("perspective");
        },
        u = function () {
          return !!n("animation");
        };
      (function () {
        return !!n("transition");
      })() &&
        ((t.support.transition = new String(o("transition"))),
        (t.support.transition.end = h.transition.end[t.support.transition])),
        u() &&
          ((t.support.animation = new String(o("animation"))),
          (t.support.animation.end = h.animation.end[t.support.animation])),
        l() &&
          ((t.support.transform = new String(o("transform"))),
          (t.support.transform3d = d()));
    })(window.Zepto || window.jQuery, window, document),
    !(function (t, e) {
      "function" == typeof define && define.amd
        ? define("packery/js/rect", e)
        : "object" == typeof module && module.exports
        ? (module.exports = e())
        : ((t.Packery = t.Packery || {}), (t.Packery.Rect = e()));
    })(window, function () {
      function t(e) {
        for (var i in t.defaults) this[i] = t.defaults[i];
        for (i in e) this[i] = e[i];
      }
      t.defaults = { x: 0, y: 0, width: 0, height: 0 };
      var e = t.prototype;
      return (
        (e.contains = function (t) {
          var e = t.width || 0,
            i = t.height || 0;
          return (
            this.x <= t.x &&
            this.y <= t.y &&
            this.x + this.width >= t.x + e &&
            this.y + this.height >= t.y + i
          );
        }),
        (e.overlaps = function (t) {
          var e = this.x + this.width,
            i = this.y + this.height,
            s = t.x + t.width,
            n = t.y + t.height;
          return this.x < s && e > t.x && this.y < n && i > t.y;
        }),
        (e.getMaximalFreeRects = function (e) {
          if (!this.overlaps(e)) return !1;
          var i,
            s = [],
            n = this.x + this.width,
            o = this.y + this.height,
            a = e.x + e.width,
            r = e.y + e.height;
          return (
            this.y < e.y &&
              ((i = new t({
                x: this.x,
                y: this.y,
                width: this.width,
                height: e.y - this.y,
              })),
              s.push(i)),
            n > a &&
              ((i = new t({
                x: a,
                y: this.y,
                width: n - a,
                height: this.height,
              })),
              s.push(i)),
            o > r &&
              ((i = new t({
                x: this.x,
                y: r,
                width: this.width,
                height: o - r,
              })),
              s.push(i)),
            this.x < e.x &&
              ((i = new t({
                x: this.x,
                y: this.y,
                width: e.x - this.x,
                height: this.height,
              })),
              s.push(i)),
            s
          );
        }),
        (e.canFit = function (t) {
          return this.width >= t.width && this.height >= t.height;
        }),
        t
      );
    }),
    (function (t, e) {
      if ("function" == typeof define && define.amd)
        define("packery/js/packer", ["./rect"], e);
      else if ("object" == typeof module && module.exports)
        module.exports = e(require("./rect"));
      else {
        var i = (t.Packery = t.Packery || {});
        i.Packer = e(i.Rect);
      }
    })(window, function (t) {
      function e(t, e, i) {
        (this.width = t || 0),
          (this.height = e || 0),
          (this.sortDirection = i || "downwardLeftToRight"),
          this.reset();
      }
      var i = e.prototype;
      (i.reset = function () {
        this.spaces = [];
        var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
        this.spaces.push(e),
          (this.sorter = s[this.sortDirection] || s.downwardLeftToRight);
      }),
        (i.pack = function (t) {
          for (var e = 0; e < this.spaces.length; e++) {
            var i = this.spaces[e];
            if (i.canFit(t)) {
              this.placeInSpace(t, i);
              break;
            }
          }
        }),
        (i.columnPack = function (t) {
          for (var e = 0; e < this.spaces.length; e++) {
            var i = this.spaces[e];
            if (
              i.x <= t.x &&
              i.x + i.width >= t.x + t.width &&
              i.height >= t.height - 0.01
            ) {
              (t.y = i.y), this.placed(t);
              break;
            }
          }
        }),
        (i.rowPack = function (t) {
          for (var e = 0; e < this.spaces.length; e++) {
            var i = this.spaces[e];
            if (
              i.y <= t.y &&
              i.y + i.height >= t.y + t.height &&
              i.width >= t.width - 0.01
            ) {
              (t.x = i.x), this.placed(t);
              break;
            }
          }
        }),
        (i.placeInSpace = function (t, e) {
          (t.x = e.x), (t.y = e.y), this.placed(t);
        }),
        (i.placed = function (t) {
          for (var e = [], i = 0; i < this.spaces.length; i++) {
            var s = this.spaces[i],
              n = s.getMaximalFreeRects(t);
            n ? e.push.apply(e, n) : e.push(s);
          }
          (this.spaces = e), this.mergeSortSpaces();
        }),
        (i.mergeSortSpaces = function () {
          e.mergeRects(this.spaces), this.spaces.sort(this.sorter);
        }),
        (i.addSpace = function (t) {
          this.spaces.push(t), this.mergeSortSpaces();
        }),
        (e.mergeRects = function (t) {
          var e = 0,
            i = t[e];
          t: for (; i; ) {
            for (var s = 0, n = t[e + s]; n; ) {
              if (n == i) s++;
              else {
                if (n.contains(i)) {
                  t.splice(e, 1), (i = t[e]);
                  continue t;
                }
                i.contains(n) ? t.splice(e + s, 1) : s++;
              }
              n = t[e + s];
            }
            i = t[++e];
          }
          return t;
        });
      var s = {
        downwardLeftToRight: function (t, e) {
          return t.y - e.y || t.x - e.x;
        },
        rightwardTopToBottom: function (t, e) {
          return t.x - e.x || t.y - e.y;
        },
      };
      return e;
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define("packery/js/item", ["outlayer/outlayer", "./rect"], e)
        : "object" == typeof module && module.exports
        ? (module.exports = e(require("outlayer"), require("./rect")))
        : (t.Packery.Item = e(t.Outlayer, t.Packery.Rect));
    })(window, function (t, e) {
      var i =
          "string" == typeof document.documentElement.style.transform
            ? "transform"
            : "WebkitTransform",
        s = function () {
          t.Item.apply(this, arguments);
        },
        n = (s.prototype = Object.create(t.Item.prototype)),
        o = n._create;
      n._create = function () {
        o.call(this), (this.rect = new e());
      };
      var a = n.moveTo;
      return (
        (n.moveTo = function (t, e) {
          var i = Math.abs(this.position.x - t),
            s = Math.abs(this.position.y - e);
          return this.layout.dragItemCount &&
            !this.isPlacing &&
            !this.isTransitioning &&
            1 > i &&
            1 > s
            ? void this.goTo(t, e)
            : void a.apply(this, arguments);
        }),
        (n.enablePlacing = function () {
          this.removeTransitionStyles(),
            this.isTransitioning && i && (this.element.style[i] = "none"),
            (this.isTransitioning = !1),
            this.getSize(),
            this.layout._setRectSize(this.element, this.rect),
            (this.isPlacing = !0);
        }),
        (n.disablePlacing = function () {
          this.isPlacing = !1;
        }),
        (n.removeElem = function () {
          this.element.parentNode.removeChild(this.element),
            this.layout.packer.addSpace(this.rect),
            this.emitEvent("remove", [this]);
        }),
        (n.showDropPlaceholder = function () {
          var t = this.dropPlaceholder;
          t ||
            (((t = this.dropPlaceholder =
              document.createElement("div")).className =
              "packery-drop-placeholder"),
            (t.style.position = "absolute")),
            (t.style.width = this.size.width + "px"),
            (t.style.height = this.size.height + "px"),
            this.positionDropPlaceholder(),
            this.layout.element.appendChild(t);
        }),
        (n.positionDropPlaceholder = function () {
          this.dropPlaceholder.style[i] =
            "translate(" + this.rect.x + "px, " + this.rect.y + "px)";
        }),
        (n.hideDropPlaceholder = function () {
          this.layout.element.removeChild(this.dropPlaceholder);
        }),
        s
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(
            "packery/js/packery",
            [
              "get-size/get-size",
              "outlayer/outlayer",
              "./rect",
              "./packer",
              "./item",
            ],
            e
          )
        : "object" == typeof module && module.exports
        ? (module.exports = e(
            require("get-size"),
            require("outlayer"),
            require("./rect"),
            require("./packer"),
            require("./item")
          ))
        : (t.Packery = e(
            t.getSize,
            t.Outlayer,
            t.Packery.Rect,
            t.Packery.Packer,
            t.Packery.Item
          ));
    })(window, function (t, e, i, s, n) {
      function o(t, e) {
        return t.position.y - e.position.y || t.position.x - e.position.x;
      }
      function a(t, e) {
        return t.position.x - e.position.x || t.position.y - e.position.y;
      }
      i.prototype.canFit = function (t) {
        return this.width >= t.width - 1 && this.height >= t.height - 1;
      };
      var r = e.create("packery");
      r.Item = n;
      var h = r.prototype;
      (h._create = function () {
        e.prototype._create.call(this),
          (this.packer = new s()),
          (this.shiftPacker = new s()),
          (this.isEnabled = !0),
          (this.dragItemCount = 0);
        var t = this;
        (this.handleDraggabilly = {
          dragStart: function () {
            t.itemDragStart(this.element);
          },
          dragMove: function () {
            t.itemDragMove(this.element, this.position.x, this.position.y);
          },
          dragEnd: function () {
            t.itemDragEnd(this.element);
          },
        }),
          (this.handleUIDraggable = {
            start: function (e, i) {
              i && t.itemDragStart(e.currentTarget);
            },
            drag: function (e, i) {
              i &&
                t.itemDragMove(
                  e.currentTarget,
                  i.position.left,
                  i.position.top
                );
            },
            stop: function (e, i) {
              i && t.itemDragEnd(e.currentTarget);
            },
          });
      }),
        (h._resetLayout = function () {
          var t, e, i;
          this.getSize(),
            this._getMeasurements(),
            this._getOption("horizontal")
              ? ((t = 1 / 0),
                (e = this.size.innerHeight + this.gutter),
                (i = "rightwardTopToBottom"))
              : ((t = this.size.innerWidth + this.gutter),
                (e = 1 / 0),
                (i = "downwardLeftToRight")),
            (this.packer.width = this.shiftPacker.width = t),
            (this.packer.height = this.shiftPacker.height = e),
            (this.packer.sortDirection = this.shiftPacker.sortDirection = i),
            this.packer.reset(),
            (this.maxY = 0),
            (this.maxX = 0);
        }),
        (h._getMeasurements = function () {
          this._getMeasurement("columnWidth", "width"),
            this._getMeasurement("rowHeight", "height"),
            this._getMeasurement("gutter", "width");
        }),
        (h._getItemLayoutPosition = function (t) {
          if (
            (this._setRectSize(t.element, t.rect),
            this.isShifting || this.dragItemCount > 0)
          ) {
            var e = this._getPackMethod();
            this.packer[e](t.rect);
          } else this.packer.pack(t.rect);
          return this._setMaxXY(t.rect), t.rect;
        }),
        (h.shiftLayout = function () {
          (this.isShifting = !0), this.layout(), delete this.isShifting;
        }),
        (h._getPackMethod = function () {
          return this._getOption("horizontal") ? "rowPack" : "columnPack";
        }),
        (h._setMaxXY = function (t) {
          (this.maxX = Math.max(t.x + t.width, this.maxX)),
            (this.maxY = Math.max(t.y + t.height, this.maxY));
        }),
        (h._setRectSize = function (e, i) {
          var s = t(e),
            n = s.outerWidth,
            o = s.outerHeight;
          (n || o) &&
            ((n = this._applyGridGutter(n, this.columnWidth)),
            (o = this._applyGridGutter(o, this.rowHeight))),
            (i.width = Math.min(n, this.packer.width)),
            (i.height = Math.min(o, this.packer.height));
        }),
        (h._applyGridGutter = function (t, e) {
          if (!e) return t + this.gutter;
          var i = t % (e += this.gutter);
          return Math[i && 1 > i ? "round" : "ceil"](t / e) * e;
        }),
        (h._getContainerSize = function () {
          return this._getOption("horizontal")
            ? { width: this.maxX - this.gutter }
            : { height: this.maxY - this.gutter };
        }),
        (h._manageStamp = function (t) {
          var e,
            s = this.getItem(t);
          if (s && s.isPlacing) e = s.rect;
          else {
            var n = this._getElementOffset(t);
            e = new i({
              x: this._getOption("originLeft") ? n.left : n.right,
              y: this._getOption("originTop") ? n.top : n.bottom,
            });
          }
          this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e);
        }),
        (h.sortItemsByPosition = function () {
          var t = this._getOption("horizontal") ? a : o;
          this.items.sort(t);
        }),
        (h.fit = function (t, e, i) {
          var s = this.getItem(t);
          s &&
            (this.stamp(s.element),
            s.enablePlacing(),
            this.updateShiftTargets(s),
            (e = void 0 === e ? s.rect.x : e),
            (i = void 0 === i ? s.rect.y : i),
            this.shift(s, e, i),
            this._bindFitEvents(s),
            s.moveTo(s.rect.x, s.rect.y),
            this.shiftLayout(),
            this.unstamp(s.element),
            this.sortItemsByPosition(),
            s.disablePlacing());
        }),
        (h._bindFitEvents = function (t) {
          function e() {
            2 == ++s && i.dispatchEvent("fitComplete", null, [t]);
          }
          var i = this,
            s = 0;
          t.once("layout", e), this.once("layoutComplete", e);
        }),
        (h.resize = function () {
          this.isResizeBound &&
            this.needsResizeLayout() &&
            (this.options.shiftPercentResize
              ? this.resizeShiftPercentLayout()
              : this.layout());
        }),
        (h.needsResizeLayout = function () {
          var e = t(this.element),
            i = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
          return e[i] != this.size[i];
        }),
        (h.resizeShiftPercentLayout = function () {
          var e = this._getItemsForLayout(this.items),
            i = this._getOption("horizontal"),
            s = i ? "y" : "x",
            n = i ? "height" : "width",
            o = i ? "rowHeight" : "columnWidth",
            a = i ? "innerHeight" : "innerWidth",
            r = this[o];
          if ((r = r && r + this.gutter)) {
            this._getMeasurements();
            var h = this[o] + this.gutter;
            e.forEach(function (t) {
              var e = Math.round(t.rect[s] / r);
              t.rect[s] = e * h;
            });
          } else {
            var l = t(this.element)[a] + this.gutter,
              d = this.packer[n];
            e.forEach(function (t) {
              t.rect[s] = (t.rect[s] / d) * l;
            });
          }
          this.shiftLayout();
        }),
        (h.itemDragStart = function (t) {
          if (this.isEnabled) {
            this.stamp(t);
            var e = this.getItem(t);
            e &&
              (e.enablePlacing(),
              e.showDropPlaceholder(),
              this.dragItemCount++,
              this.updateShiftTargets(e));
          }
        }),
        (h.updateShiftTargets = function (t) {
          this.shiftPacker.reset(), this._getBoundingRect();
          var e = this._getOption("originLeft"),
            s = this._getOption("originTop");
          this.stamps.forEach(function (t) {
            var n = this.getItem(t);
            if (!n || !n.isPlacing) {
              var o = this._getElementOffset(t),
                a = new i({ x: e ? o.left : o.right, y: s ? o.top : o.bottom });
              this._setRectSize(t, a), this.shiftPacker.placed(a);
            }
          }, this);
          var n = this._getOption("horizontal"),
            o = n ? "rowHeight" : "columnWidth",
            a = n ? "height" : "width";
          (this.shiftTargetKeys = []), (this.shiftTargets = []);
          var r,
            h = this[o];
          if ((h = h && h + this.gutter)) {
            var l = Math.ceil(t.rect[a] / h),
              d = Math.floor((this.shiftPacker[a] + this.gutter) / h);
            r = (d - l) * h;
            for (var u = 0; d > u; u++) this._addShiftTarget(u * h, 0, r);
          } else
            (r = this.shiftPacker[a] + this.gutter - t.rect[a]),
              this._addShiftTarget(0, 0, r);
          var c = this._getItemsForLayout(this.items),
            p = this._getPackMethod();
          c.forEach(function (t) {
            var e = t.rect;
            this._setRectSize(t.element, e),
              this.shiftPacker[p](e),
              this._addShiftTarget(e.x, e.y, r);
            var i = n ? e.x + e.width : e.x,
              s = n ? e.y : e.y + e.height;
            if ((this._addShiftTarget(i, s, r), h))
              for (var o = Math.round(e[a] / h), l = 1; o > l; l++) {
                var d = n ? i : e.x + h * l,
                  u = n ? e.y + h * l : s;
                this._addShiftTarget(d, u, r);
              }
          }, this);
        }),
        (h._addShiftTarget = function (t, e, i) {
          var s = this._getOption("horizontal") ? e : t;
          if (!(0 !== s && s > i)) {
            var n = t + "," + e;
            -1 != this.shiftTargetKeys.indexOf(n) ||
              (this.shiftTargetKeys.push(n),
              this.shiftTargets.push({ x: t, y: e }));
          }
        }),
        (h.shift = function (t, e, i) {
          var s,
            n = 1 / 0,
            o = { x: e, y: i };
          this.shiftTargets.forEach(function (t) {
            var e = (function (t, e) {
              var i = e.x - t.x,
                s = e.y - t.y;
              return Math.sqrt(i * i + s * s);
            })(t, o);
            n > e && ((s = t), (n = e));
          }),
            (t.rect.x = s.x),
            (t.rect.y = s.y);
        });
      (h.itemDragMove = function (t, e, i) {
        function s() {
          o.shift(n, e, i), n.positionDropPlaceholder(), o.layout();
        }
        var n = this.isEnabled && this.getItem(t);
        if (n) {
          (e -= this.size.paddingLeft), (i -= this.size.paddingTop);
          var o = this,
            a = new Date();
          this._itemDragTime && a - this._itemDragTime < 120
            ? (clearTimeout(this.dragTimeout),
              (this.dragTimeout = setTimeout(s, 120)))
            : (s(), (this._itemDragTime = a));
        }
      }),
        (h.itemDragEnd = function (t) {
          function e() {
            2 == ++s &&
              (i.element.classList.remove("is-positioning-post-drag"),
              i.hideDropPlaceholder(),
              n.dispatchEvent("dragItemPositioned", null, [i]));
          }
          var i = this.isEnabled && this.getItem(t);
          if (i) {
            clearTimeout(this.dragTimeout),
              i.element.classList.add("is-positioning-post-drag");
            var s = 0,
              n = this;
            i.once("layout", e),
              this.once("layoutComplete", e),
              i.moveTo(i.rect.x, i.rect.y),
              this.layout(),
              (this.dragItemCount = Math.max(0, this.dragItemCount - 1)),
              this.sortItemsByPosition(),
              i.disablePlacing(),
              this.unstamp(i.element);
          }
        }),
        (h.bindDraggabillyEvents = function (t) {
          this._bindDraggabillyEvents(t, "on");
        }),
        (h.unbindDraggabillyEvents = function (t) {
          this._bindDraggabillyEvents(t, "off");
        }),
        (h._bindDraggabillyEvents = function (t, e) {
          var i = this.handleDraggabilly;
          t[e]("dragStart", i.dragStart),
            t[e]("dragMove", i.dragMove),
            t[e]("dragEnd", i.dragEnd);
        }),
        (h.bindUIDraggableEvents = function (t) {
          this._bindUIDraggableEvents(t, "on");
        }),
        (h.unbindUIDraggableEvents = function (t) {
          this._bindUIDraggableEvents(t, "off");
        }),
        (h._bindUIDraggableEvents = function (t, e) {
          var i = this.handleUIDraggable;
          t[e]("dragstart", i.start)[e]("drag", i.drag)[e]("dragstop", i.stop);
        });
      var l = h.destroy;
      return (
        (h.destroy = function () {
          l.apply(this, arguments), (this.isEnabled = !1);
        }),
        (r.Rect = i),
        (r.Packer = s),
        r
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(["isotope-layout/js/layout-mode", "packery/js/packery"], e)
        : "object" == typeof module && module.exports
        ? (module.exports = e(
            require("isotope-layout/js/layout-mode"),
            require("packery")
          ))
        : e(t.Smashotope.LayoutMode, t.Packery);
    })(window, function (t, e) {
      var i = t.create("packery"),
        s = i.prototype,
        n = { _getElementOffset: !0, _getMeasurement: !0 };
      for (var o in e.prototype) n[o] || (s[o] = e.prototype[o]);
      var a = s._resetLayout;
      s._resetLayout = function () {
        (this.packer = this.packer || new e.Packer()),
          (this.shiftPacker = this.shiftPacker || new e.Packer()),
          a.apply(this, arguments);
      };
      var r = s._getItemLayoutPosition;
      s._getItemLayoutPosition = function (t) {
        return (t.rect = t.rect || new e.Rect()), r.call(this, t);
      };
      var h = s.needsResizeLayout;
      s.needsResizeLayout = function () {
        return this._getOption("horizontal")
          ? this.needsVerticalResizeLayout()
          : h.call(this);
      };
      var l = s._getOption;
      return (
        (s._getOption = function (t) {
          return "horizontal" == t
            ? void 0 !== this.options.isHorizontal
              ? this.options.isHorizontal
              : this.options.horizontal
            : l.apply(this.smashotope, arguments);
        }),
        i
      );
    }),
    (function (t, e, i, s) {
      (Owl2row = function (e) {
        (this.owl = e),
          (this.owl.options = t.extend({}, Owl2row.Defaults, this.owl.options)),
          (this.handlers = {
            "initialize.owl.carousel": t.proxy(function (t) {
              this.owl.settings.owl2row && this.build2row(this);
            }, this),
          }),
          this.owl.$element.on(this.handlers);
      }),
        (Owl2row.Defaults = {
          owl2row: !1,
          owl2rowTarget: "sbi_item",
          owl2rowContainer: "sbi_owl2row-item",
          owl2rowDirection: "utd",
        }),
        (Owl2row.prototype.build2row = function (e) {
          var i = t(e.owl.$element),
            s = i.find("." + e.owl.options.owl2rowTarget),
            n = [],
            o = [];
          switch (
            (t.each(s, function (t, e) {
              t % 2 == 0 ? n.push(e) : o.push(e);
            }),
            e.owl.options.owl2rowDirection)
          ) {
            case "ltr":
              e.leftToright(e, i, s);
              break;
            default:
              e.upTodown(e, n, o, i);
          }
        }),
        (Owl2row.prototype.leftToright = function (e, i, s) {
          var n = e.owl.options.owl2rowContainer,
            o = e.owl.options.margin,
            a = s.length,
            r = [],
            h = [];
          a % 2 == 1 ? (a = (a - 1) / 2 + 1) : (a /= 2),
            t.each(s, function (t, e) {
              t < a ? r.push(e) : h.push(e);
            }),
            t.each(r, function (e, s) {
              var a = t('<div class="' + n + '"/>'),
                l = r[e];
              (l.style.marginBottom = o + "px"),
                a.append(l).append(h[e]),
                i.append(a);
            });
        }),
        (Owl2row.prototype.upTodown = function (e, i, s, n) {
          var o = e.owl.options.owl2rowContainer,
            a = e.owl.options.margin;
          t.each(i, function (e, r) {
            var h = t('<div class="' + o + '"/>'),
              l = i[e];
            (l.style.marginBottom = a + "px"),
              h.append(l).append(s[e]),
              n.append(h);
          });
        }),
        (Owl2row.prototype.destroy = function () {}),
        (t.fn.sbiOwlCarousel.Constructor.Plugins.owl2row = Owl2row);
    })(window.Zepto || window.jQuery, window, document);
  var sbIconSVG = {
    "fa-clock":
      'class="svg-inline--fa fa-clock fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="far" data-icon="clock" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>',
    "fa-play":
      'class="svg-inline--fa fa-play fa-w-14 sbi_playbtn" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="play" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>',
    "fa-image":
      'class="svg-inline--fa fa-image fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="far" data-icon="image" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>',
    "fa-user":
      'class="svg-inline--fa fa-user fa-w-16" style="margin-right: 3px;" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="user" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M96 160C96 71.634 167.635 0 256 0s160 71.634 160 160-71.635 160-160 160S96 248.366 96 160zm304 192h-28.556c-71.006 42.713-159.912 42.695-230.888 0H112C50.144 352 0 402.144 0 464v24c0 13.255 10.745 24 24 24h464c13.255 0 24-10.745 24-24v-24c0-61.856-50.144-112-112-112z"></path></svg>',
    "fa-comment":
      'class="svg-inline--fa fa-comment fa-w-18" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="comment" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M576 240c0 115-129 208-288 208-48.3 0-93.9-8.6-133.9-23.8-40.3 31.2-89.8 50.3-142.4 55.7-5.2.6-10.2-2.8-11.5-7.7-1.3-5 2.7-8.1 6.6-11.8 19.3-18.4 42.7-32.8 51.9-94.6C21.9 330.9 0 287.3 0 240 0 125.1 129 32 288 32s288 93.1 288 208z"></path></svg>',
    "fa-heart":
      'class="svg-inline--fa fa-heart fa-w-18" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="heart" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"></path></svg>',
    "fa-check":
      'class="svg-inline--fa fa-check fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="check" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>',
    "fa-exclamation-circle":
      'class="svg-inline--fa fa-exclamation-circle fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="exclamation-circle" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>',
    "fa-map-marker":
      'class="svg-inline--fa fa-map-marker fa-w-12" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="map-marker" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg>',
    "fa-clone":
      'class="svg-inline--fa fa-clone fa-w-16 sbi_lightbox_carousel_icon" aria-hidden="true" data-fa-processed="" data-prefix="far" data-icon="clone" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>',
    "fa-chevron-right":
      'class="svg-inline--fa fa-chevron-right fa-w-10" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="chevron-right" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>',
    "fa-chevron-left":
      'class="svg-inline--fa fa-chevron-left fa-w-10" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="chevron-left" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>',
    "fa-share":
      'class="svg-inline--fa fa-share fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="share" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path></svg>',
    "fa-times":
      'class="svg-inline--fa fa-times fa-w-12" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="times" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M323.1 441l53.9-53.9c9.4-9.4 9.4-24.5 0-33.9L279.8 256l97.2-97.2c9.4-9.4 9.4-24.5 0-33.9L323.1 71c-9.4-9.4-24.5-9.4-33.9 0L192 168.2 94.8 71c-9.4-9.4-24.5-9.4-33.9 0L7 124.9c-9.4 9.4-9.4 24.5 0 33.9l97.2 97.2L7 353.2c-9.4 9.4-9.4 24.5 0 33.9L60.9 441c9.4 9.4 24.5 9.4 33.9 0l97.2-97.2 97.2 97.2c9.3 9.3 24.5 9.3 33.9 0z"></path></svg>',
    "fa-envelope":
      'class="svg-inline--fa fa-envelope fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="envelope" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>',
    "fa-edit":
      'class="svg-inline--fa fa-edit fa-w-18" aria-hidden="true" data-fa-processed="" data-prefix="far" data-icon="edit" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>',
    "fa-arrows-alt":
      'class="svg-inline--fa fa-arrows-alt fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="arrows-alt" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z"></path></svg>',
    "fa-check-circle":
      'class="svg-inline--fa fa-check-circle fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="check-circle" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>',
    "fa-ban":
      'class="svg-inline--fa fa-ban fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="ban" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path></svg>',
    "fa-facebook-square":
      'class="svg-inline--fa fa-facebook-square fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fab" data-icon="facebook-square" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"></path></svg>',
    "fa-twitter":
      'class="svg-inline--fa fa-twitter fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fab" data-icon="twitter" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>',
    "fa-google-plus":
      'class="svg-inline--fa fa-google-plus fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fab" data-icon="google-plus" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm-70.7 372c-68.8 0-124-55.5-124-124s55.2-124 124-124c31.3 0 60.1 11 83 32.3l-33.6 32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9 0-77.2 35.5-77.2 78.1s34.2 78.1 77.2 78.1c32.6 0 64.9-19.1 70.1-53.3h-70.1v-42.6h116.9c1.3 6.8 1.9 13.6 1.9 20.7 0 70.8-47.5 121.2-118.8 121.2zm230.2-106.2v35.5H372v-35.5h-35.5v-35.5H372v-35.5h35.5v35.5h35.2v35.5h-35.2z"></path></svg>',
    "fa-instagram":
      'class="svg-inline--fa fa-instagram fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fab" data-icon="instagram" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>',
    "fa-linkedin":
      'class="svg-inline--fa fa-linkedin fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fab" data-icon="linkedin" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>',
    "fa-pinterest":
      'class="svg-inline--fa fa-pinterest fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fab" data-icon="pinterest" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path></svg>',
    "fa-spinner":
      'class="svg-inline--fa fa-spinner fa-w-16 fa-pulse" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="spinner" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>',
    "fa-spin":
      'class="svg-inline--fa fa-spin fa-w-16 fa-pulse" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="spinner" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>',
  };
  function sbSVGify(t) {
    "fontfile" != sb_instagram_js_options.font_method &&
      (void 0 === t && (t = jQuery(".sbi")),
      t.each(function () {
        jQuery(this)
          .find("i.fa")
          .each(function () {
            var t = jQuery(this)
                .attr("class")
                .match(/fa-[a-z-]+/),
              e = jQuery(this).attr("style");
            if (t && void 0 !== sbIconSVG[t[0]]) {
              var i = void 0 !== e ? 'style="' + e + '" ' : "";
              jQuery(this).replaceWith("<svg " + i + sbIconSVG[t[0]]);
            } else console.log(t, "missing");
          });
      }));
  }
  if (
    ((window.sbiLinkify = (function () {
      var t = "[a-z\\d.-]+://",
        e = "mailto:",
        i = new RegExp(
          "(?:\\b[a-z\\d.-]+://[^<>\\s]+|\\b(?:(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)|(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5]))(?:[;/][^#?<>\\s]*)?(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?(?!\\w)|(?:mailto:)?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)|(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5]))(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?(?!\\w))",
          "ig"
        ),
        s = new RegExp("^" + t, "i"),
        n = {
          "'": "`",
          ">": "<",
          ")": "(",
          "]": "[",
          "}": "{",
          "B;": "B+",
          "b:": "b9",
        },
        o = {
          callback: function (t, e) {
            return e
              ? '<a href="' +
                  e +
                  '" title="' +
                  e +
                  '" target="_blank" rel="noopener">' +
                  t +
                  "</a>"
              : t;
          },
          punct_regexp:
            /(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/,
        };
      return function (t, a) {
        a = a || {};
        var r,
          h,
          l,
          d,
          u,
          c,
          p,
          m,
          f,
          g,
          _,
          b,
          v = "",
          y = [];
        for (h in o) void 0 === a[h] && (a[h] = o[h]);
        for (; (r = i.exec(t)); )
          if (
            ((l = r[0]),
            (p = (c = i.lastIndex) - l.length),
            !/[\/:]/.test(t.charAt(p - 1)))
          ) {
            do {
              (m = l),
                (b = l.substr(-1)),
                (_ = n[b]) &&
                  ((f = l.match(new RegExp("\\" + _ + "(?!$)", "g"))),
                  (g = l.match(new RegExp("\\" + b, "g"))),
                  (f ? f.length : 0) < (g ? g.length : 0) &&
                    ((l = l.substr(0, l.length - 1)), c--)),
                a.punct_regexp &&
                  (l = l.replace(a.punct_regexp, function (t) {
                    return (c -= t.length), "";
                  }));
            } while (l.length && l !== m);
            (d = l),
              s.test(d) ||
                (d =
                  (-1 !== d.indexOf("@")
                    ? d.indexOf(e)
                      ? e
                      : ""
                    : d.indexOf("irc.")
                    ? d.indexOf("ftp.")
                      ? "http://"
                      : "ftp://"
                    : "irc://") + d),
              u != p && (y.push([t.slice(u, p)]), (u = c)),
              y.push([l, d]);
          }
        for (y.push([t.substr(u)]), h = 0; h < y.length; h++)
          v += a.callback.apply(window, y[h]);
        return v || t;
      };
    })()),
    (function () {
      "use strict";
      var t = Array.prototype.slice;
      try {
        t.call(document.documentElement);
      } catch (e) {
        Array.prototype.slice = function (e, i) {
          if (
            ((i = void 0 !== i ? i : this.length),
            "[object Array]" === Object.prototype.toString.call(this))
          )
            return t.call(this, e, i);
          var s,
            n,
            o = [],
            a = this.length,
            r = e || 0,
            h = i || a;
          if ((i < 0 && (h = a + i), (n = h - (r = r >= 0 ? r : a + r)) > 0))
            if (((o = new Array(n)), this.charAt))
              for (s = 0; s < n; s++) o[s] = this.charAt(r + s);
            else for (s = 0; s < n; s++) o[s] = this[r + s];
          return o;
        };
      }
    })(),
    Function.prototype.bind ||
      (Function.prototype.bind = function (t) {
        if ("function" != typeof this)
          throw new TypeError(
            "Function.prototype.bind - what is trying to be bound is not callable"
          );
        var e = Array.prototype.slice.call(arguments, 1),
          i = this,
          s = function () {},
          n = function () {
            return i.apply(
              this instanceof s && t ? this : t,
              e.concat(Array.prototype.slice.call(arguments))
            );
          };
        return (s.prototype = this.prototype), (n.prototype = new s()), n;
      }),
    void 0 === sb_instagram_js_options.no_mob_swipe)
  )
    !(function (t, e, i, s) {
      "use strict";
      function n(t, e, i) {
        return setTimeout(l(t, i), e);
      }
      function o(t, e, i) {
        return !!Array.isArray(t) && (a(t, i[e], i), !0);
      }
      function a(t, e, i) {
        var n;
        if (t)
          if (t.forEach) t.forEach(e, i);
          else if (t.length !== s)
            for (n = 0; n < t.length; ) e.call(i, t[n], n, t), n++;
          else for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t);
      }
      function r(e, i, s) {
        var n = "DEPRECATED METHOD: " + i + "\n" + s + " AT \n";
        return function () {
          var i = new Error("get-stack-trace"),
            s =
              i && i.stack
                ? i.stack
                    .replace(/^[^\(]+?[\n$]/gm, "")
                    .replace(/^\s+at\s+/gm, "")
                    .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
                : "Unknown Stack Trace",
            o = t.console && (t.console.warn || t.console.log);
          return o && o.call(t.console, n, s), e.apply(this, arguments);
        };
      }
      function h(t, e, i) {
        var s,
          n = e.prototype;
        ((s = t.prototype = Object.create(n)).constructor = t),
          (s._super = n),
          i && K(s, i);
      }
      function l(t, e) {
        return function () {
          return t.apply(e, arguments);
        };
      }
      function d(t, e) {
        return typeof t == it ? t.apply((e && e[0]) || s, e) : t;
      }
      function u(t, e) {
        return t === s ? e : t;
      }
      function c(t, e, i) {
        a(g(e), function (e) {
          t.addEventListener(e, i, !1);
        });
      }
      function p(t, e, i) {
        a(g(e), function (e) {
          t.removeEventListener(e, i, !1);
        });
      }
      function m(t, e) {
        for (; t; ) {
          if (t == e) return !0;
          t = t.parentNode;
        }
        return !1;
      }
      function f(t, e) {
        return t.indexOf(e) > -1;
      }
      function g(t) {
        return t.trim().split(/\s+/g);
      }
      function _(t, e, i) {
        if (t.indexOf && !i) return t.indexOf(e);
        for (var s = 0; s < t.length; ) {
          if ((i && t[s][i] == e) || (!i && t[s] === e)) return s;
          s++;
        }
        return -1;
      }
      function b(t) {
        return Array.prototype.slice.call(t, 0);
      }
      function v(t, e, i) {
        for (var s = [], n = [], o = 0; o < t.length; ) {
          var a = e ? t[o][e] : t[o];
          _(n, a) < 0 && s.push(t[o]), (n[o] = a), o++;
        }
        return (
          i &&
            (s = e
              ? s.sort(function (t, i) {
                  return t[e] > i[e];
                })
              : s.sort()),
          s
        );
      }
      function y(t, e) {
        for (
          var i, n, o = e[0].toUpperCase() + e.slice(1), a = 0;
          a < tt.length;

        ) {
          if ((n = (i = tt[a]) ? i + o : e) in t) return n;
          a++;
        }
        return s;
      }
      function w(e) {
        var i = e.ownerDocument || e;
        return i.defaultView || i.parentWindow || t;
      }
      function x(t, e) {
        var i = this;
        (this.manager = t),
          (this.callback = e),
          (this.element = t.element),
          (this.target = t.options.inputTarget),
          (this.domHandler = function (e) {
            d(t.options.enable, [t]) && i.handler(e);
          }),
          this.init();
      }
      function C(t, e, i) {
        var s = i.pointers.length,
          n = i.changedPointers.length,
          o = e & ft && s - n == 0,
          a = e & (_t | bt) && s - n == 0;
        (i.isFirst = !!o),
          (i.isFinal = !!a),
          o && (t.session = {}),
          (i.eventType = e),
          (function (t, e) {
            var i = t.session,
              s = e.pointers,
              n = s.length;
            i.firstInput || (i.firstInput = z(e)),
              n > 1 && !i.firstMultiple
                ? (i.firstMultiple = z(e))
                : 1 === n && (i.firstMultiple = !1);
            var o = i.firstInput,
              a = i.firstMultiple,
              r = a ? a.center : o.center,
              h = (e.center = j(s));
            (e.timeStamp = ot()),
              (e.deltaTime = e.timeStamp - o.timeStamp),
              (e.angle = E(r, h)),
              (e.distance = T(r, h)),
              (function (t, e) {
                var i = e.center,
                  s = t.offsetDelta || {},
                  n = t.prevDelta || {},
                  o = t.prevInput || {};
                (e.eventType !== ft && o.eventType !== _t) ||
                  ((n = t.prevDelta = { x: o.deltaX || 0, y: o.deltaY || 0 }),
                  (s = t.offsetDelta = { x: i.x, y: i.y })),
                  (e.deltaX = n.x + (i.x - s.x)),
                  (e.deltaY = n.y + (i.y - s.y));
              })(i, e),
              (e.offsetDirection = A(e.deltaX, e.deltaY));
            var l = k(e.deltaTime, e.deltaX, e.deltaY);
            (e.overallVelocityX = l.x),
              (e.overallVelocityY = l.y),
              (e.overallVelocity = nt(l.x) > nt(l.y) ? l.x : l.y),
              (e.scale = a
                ? (function (t, e) {
                    return T(e[0], e[1], At) / T(t[0], t[1], At);
                  })(a.pointers, s)
                : 1),
              (e.rotation = a
                ? (function (t, e) {
                    return E(e[1], e[0], At) + E(t[1], t[0], At);
                  })(a.pointers, s)
                : 0),
              (e.maxPointers = i.prevInput
                ? e.pointers.length > i.prevInput.maxPointers
                  ? e.pointers.length
                  : i.prevInput.maxPointers
                : e.pointers.length),
              I(i, e);
            var d = t.element;
            m(e.srcEvent.target, d) && (d = e.srcEvent.target), (e.target = d);
          })(t, i),
          t.emit("hammer.input", i),
          t.recognize(i),
          (t.session.prevInput = i);
      }
      function I(t, e) {
        var i,
          n,
          o,
          a,
          r = t.lastInterval || e,
          h = e.timeStamp - r.timeStamp;
        if (e.eventType != bt && (h > mt || r.velocity === s)) {
          var l = e.deltaX - r.deltaX,
            d = e.deltaY - r.deltaY,
            u = k(h, l, d);
          (n = u.x),
            (o = u.y),
            (i = nt(u.x) > nt(u.y) ? u.x : u.y),
            (a = A(l, d)),
            (t.lastInterval = e);
        } else
          (i = r.velocity),
            (n = r.velocityX),
            (o = r.velocityY),
            (a = r.direction);
        (e.velocity = i),
          (e.velocityX = n),
          (e.velocityY = o),
          (e.direction = a);
      }
      function z(t) {
        for (var e = [], i = 0; i < t.pointers.length; )
          (e[i] = {
            clientX: st(t.pointers[i].clientX),
            clientY: st(t.pointers[i].clientY),
          }),
            i++;
        return {
          timeStamp: ot(),
          pointers: e,
          center: j(e),
          deltaX: t.deltaX,
          deltaY: t.deltaY,
        };
      }
      function j(t) {
        var e = t.length;
        if (1 === e) return { x: st(t[0].clientX), y: st(t[0].clientY) };
        for (var i = 0, s = 0, n = 0; e > n; )
          (i += t[n].clientX), (s += t[n].clientY), n++;
        return { x: st(i / e), y: st(s / e) };
      }
      function k(t, e, i) {
        return { x: e / t || 0, y: i / t || 0 };
      }
      function A(t, e) {
        return t === e
          ? vt
          : nt(t) >= nt(e)
          ? 0 > t
            ? yt
            : wt
          : 0 > e
          ? xt
          : Ct;
      }
      function T(t, e, i) {
        i || (i = kt);
        var s = e[i[0]] - t[i[0]],
          n = e[i[1]] - t[i[1]];
        return Math.sqrt(s * s + n * n);
      }
      function E(t, e, i) {
        i || (i = kt);
        var s = e[i[0]] - t[i[0]],
          n = e[i[1]] - t[i[1]];
        return (180 * Math.atan2(n, s)) / Math.PI;
      }
      function D() {
        (this.evEl = Et),
          (this.evWin = Dt),
          (this.pressed = !1),
          x.apply(this, arguments);
      }
      function S() {
        (this.evEl = Lt),
          (this.evWin = Ft),
          x.apply(this, arguments),
          (this.store = this.manager.session.pointerEvents = []);
      }
      function O() {
        (this.evTarget = Pt),
          (this.evWin = Qt),
          (this.started = !1),
          x.apply(this, arguments);
      }
      function L() {
        (this.evTarget = $t), (this.targetIds = {}), x.apply(this, arguments);
      }
      function F() {
        x.apply(this, arguments);
        var t = l(this.handler, this);
        (this.touch = new L(this.manager, t)),
          (this.mouse = new D(this.manager, t)),
          (this.primaryTouch = null),
          (this.lastTouches = []);
      }
      function B(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
          var i = { x: e.clientX, y: e.clientY };
          this.lastTouches.push(i);
          var s = this.lastTouches;
          setTimeout(function () {
            var t = s.indexOf(i);
            t > -1 && s.splice(t, 1);
          }, Rt);
        }
      }
      function P(t, e) {
        (this.manager = t), this.set(e);
      }
      function Q(t) {
        (this.options = K({}, this.defaults, t || {})),
          (this.id = ht++),
          (this.manager = null),
          (this.options.enable = u(this.options.enable, !0)),
          (this.state = Jt),
          (this.simultaneous = {}),
          (this.requireFail = []);
      }
      function M(t) {
        return t & se
          ? "cancel"
          : t & ee
          ? "end"
          : t & te
          ? "move"
          : t & Kt
          ? "start"
          : "";
      }
      function $(t) {
        return t == Ct
          ? "down"
          : t == xt
          ? "up"
          : t == yt
          ? "left"
          : t == wt
          ? "right"
          : "";
      }
      function R(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t;
      }
      function W() {
        Q.apply(this, arguments);
      }
      function H() {
        W.apply(this, arguments), (this.pX = null), (this.pY = null);
      }
      function q() {
        W.apply(this, arguments);
      }
      function N() {
        Q.apply(this, arguments), (this._timer = null), (this._input = null);
      }
      function U() {
        W.apply(this, arguments);
      }
      function V() {
        W.apply(this, arguments);
      }
      function Y() {
        Q.apply(this, arguments),
          (this.pTime = !1),
          (this.pCenter = !1),
          (this._timer = null),
          (this._input = null),
          (this.count = 0);
      }
      function G(t, e) {
        return (
          ((e = e || {}).recognizers = u(e.recognizers, G.defaults.preset)),
          new X(t, e)
        );
      }
      function X(t, e) {
        (this.options = K({}, G.defaults, e || {})),
          (this.options.inputTarget = this.options.inputTarget || t),
          (this.handlers = {}),
          (this.session = {}),
          (this.recognizers = []),
          (this.oldCssProps = {}),
          (this.element = t),
          (this.input = (function (t) {
            var e = t.options.inputClass;
            return new (e || (dt ? S : ut ? L : lt ? F : D))(t, C);
          })(this)),
          (this.touchAction = new P(this, this.options.touchAction)),
          Z(this, !0),
          a(
            this.options.recognizers,
            function (t) {
              var e = this.add(new t[0](t[1]));
              t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3]);
            },
            this
          );
      }
      function Z(t, e) {
        var i,
          s = t.element;
        s.style &&
          (a(t.options.cssProps, function (n, o) {
            (i = y(s.style, o)),
              e
                ? ((t.oldCssProps[i] = s.style[i]), (s.style[i] = n))
                : (s.style[i] = t.oldCssProps[i] || "");
          }),
          e || (t.oldCssProps = {}));
      }
      function J(t, i) {
        var s = e.createEvent("Event");
        s.initEvent(t, !0, !0), (s.gesture = i), i.target.dispatchEvent(s);
      }
      var K,
        tt = ["", "webkit", "Moz", "MS", "ms", "o"],
        et = e.createElement("div"),
        it = "function",
        st = Math.round,
        nt = Math.abs,
        ot = Date.now;
      K =
        "function" != typeof Object.assign
          ? function (t) {
              if (t === s || null === t)
                throw new TypeError(
                  "Cannot convert undefined or null to object"
                );
              for (var e = Object(t), i = 1; i < arguments.length; i++) {
                var n = arguments[i];
                if (n !== s && null !== n)
                  for (var o in n) n.hasOwnProperty(o) && (e[o] = n[o]);
              }
              return e;
            }
          : Object.assign;
      var at = r(
          function (t, e, i) {
            for (var n = Object.keys(e), o = 0; o < n.length; )
              (!i || (i && t[n[o]] === s)) && (t[n[o]] = e[n[o]]), o++;
            return t;
          },
          "extend",
          "Use `assign`."
        ),
        rt = r(
          function (t, e) {
            return at(t, e, !0);
          },
          "merge",
          "Use `assign`."
        ),
        ht = 1,
        lt = "ontouchstart" in t,
        dt = y(t, "PointerEvent") !== s,
        ut =
          lt &&
          /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
        ct = "touch",
        pt = "mouse",
        mt = 25,
        ft = 1,
        gt = 2,
        _t = 4,
        bt = 8,
        vt = 1,
        yt = 2,
        wt = 4,
        xt = 8,
        Ct = 16,
        It = yt | wt,
        zt = xt | Ct,
        jt = It | zt,
        kt = ["x", "y"],
        At = ["clientX", "clientY"];
      x.prototype = {
        handler: function () {},
        init: function () {
          this.evEl && c(this.element, this.evEl, this.domHandler),
            this.evTarget && c(this.target, this.evTarget, this.domHandler),
            this.evWin && c(w(this.element), this.evWin, this.domHandler);
        },
        destroy: function () {
          this.evEl && p(this.element, this.evEl, this.domHandler),
            this.evTarget && p(this.target, this.evTarget, this.domHandler),
            this.evWin && p(w(this.element), this.evWin, this.domHandler);
        },
      };
      var Tt = { mousedown: ft, mousemove: gt, mouseup: _t },
        Et = "mousedown",
        Dt = "mousemove mouseup";
      h(D, x, {
        handler: function (t) {
          var e = Tt[t.type];
          e & ft && 0 === t.button && (this.pressed = !0),
            e & gt && 1 !== t.which && (e = _t),
            this.pressed &&
              (e & _t && (this.pressed = !1),
              this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: pt,
                srcEvent: t,
              }));
        },
      });
      var St = {
          pointerdown: ft,
          pointermove: gt,
          pointerup: _t,
          pointercancel: bt,
          pointerout: bt,
        },
        Ot = { 2: ct, 3: "pen", 4: pt, 5: "kinect" },
        Lt = "pointerdown",
        Ft = "pointermove pointerup pointercancel";
      t.MSPointerEvent &&
        !t.PointerEvent &&
        ((Lt = "MSPointerDown"),
        (Ft = "MSPointerMove MSPointerUp MSPointerCancel")),
        h(S, x, {
          handler: function (t) {
            var e = this.store,
              i = !1,
              s = t.type.toLowerCase().replace("ms", ""),
              n = St[s],
              o = Ot[t.pointerType] || t.pointerType,
              a = o == ct,
              r = _(e, t.pointerId, "pointerId");
            n & ft && (0 === t.button || a)
              ? 0 > r && (e.push(t), (r = e.length - 1))
              : n & (_t | bt) && (i = !0),
              0 > r ||
                ((e[r] = t),
                this.callback(this.manager, n, {
                  pointers: e,
                  changedPointers: [t],
                  pointerType: o,
                  srcEvent: t,
                }),
                i && e.splice(r, 1));
          },
        });
      var Bt = { touchstart: ft, touchmove: gt, touchend: _t, touchcancel: bt },
        Pt = "touchstart",
        Qt = "touchstart touchmove touchend touchcancel";
      h(O, x, {
        handler: function (t) {
          var e = Bt[t.type];
          if ((e === ft && (this.started = !0), this.started)) {
            var i = function (t, e) {
              var i = b(t.touches),
                s = b(t.changedTouches);
              return (
                e & (_t | bt) && (i = v(i.concat(s), "identifier", !0)), [i, s]
              );
            }.call(this, t, e);
            e & (_t | bt) &&
              i[0].length - i[1].length == 0 &&
              (this.started = !1),
              this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: ct,
                srcEvent: t,
              });
          }
        },
      });
      var Mt = { touchstart: ft, touchmove: gt, touchend: _t, touchcancel: bt },
        $t = "touchstart touchmove touchend touchcancel";
      h(L, x, {
        handler: function (t) {
          var e = Mt[t.type],
            i = function (t, e) {
              var i = b(t.touches),
                s = this.targetIds;
              if (e & (ft | gt) && 1 === i.length)
                return (s[i[0].identifier] = !0), [i, i];
              var n,
                o,
                a = b(t.changedTouches),
                r = [],
                h = this.target;
              if (
                ((o = i.filter(function (t) {
                  return m(t.target, h);
                })),
                e === ft)
              )
                for (n = 0; n < o.length; ) (s[o[n].identifier] = !0), n++;
              for (n = 0; n < a.length; )
                s[a[n].identifier] && r.push(a[n]),
                  e & (_t | bt) && delete s[a[n].identifier],
                  n++;
              return r.length ? [v(o.concat(r), "identifier", !0), r] : void 0;
            }.call(this, t, e);
          i &&
            this.callback(this.manager, e, {
              pointers: i[0],
              changedPointers: i[1],
              pointerType: ct,
              srcEvent: t,
            });
        },
      });
      var Rt = 2500,
        Wt = 25;
      h(F, x, {
        handler: function (t, e, i) {
          var s = i.pointerType == ct,
            n = i.pointerType == pt;
          if (
            !(
              n &&
              i.sourceCapabilities &&
              i.sourceCapabilities.firesTouchEvents
            )
          ) {
            if (s)
              (function (t, e) {
                t & ft
                  ? ((this.primaryTouch = e.changedPointers[0].identifier),
                    B.call(this, e))
                  : t & (_t | bt) && B.call(this, e);
              }.call(this, e, i));
            else if (
              n &&
              function (t) {
                for (
                  var e = t.srcEvent.clientX, i = t.srcEvent.clientY, s = 0;
                  s < this.lastTouches.length;
                  s++
                ) {
                  var n = this.lastTouches[s],
                    o = Math.abs(e - n.x),
                    a = Math.abs(i - n.y);
                  if (Wt >= o && Wt >= a) return !0;
                }
                return !1;
              }.call(this, i)
            )
              return;
            this.callback(t, e, i);
          }
        },
        destroy: function () {
          this.touch.destroy(), this.mouse.destroy();
        },
      });
      var Ht = y(et.style, "touchAction"),
        qt = Ht !== s,
        Nt = "compute",
        Ut = "auto",
        Vt = "manipulation",
        Yt = "none",
        Gt = "pan-x",
        Xt = "pan-y",
        Zt = (function () {
          if (!qt) return !1;
          var e = {},
            i = t.CSS && t.CSS.supports;
          return (
            [
              "auto",
              "manipulation",
              "pan-y",
              "pan-x",
              "pan-x pan-y",
              "none",
            ].forEach(function (s) {
              e[s] = !i || t.CSS.supports("touch-action", s);
            }),
            e
          );
        })();
      P.prototype = {
        set: function (t) {
          t == Nt && (t = this.compute()),
            qt &&
              this.manager.element.style &&
              Zt[t] &&
              (this.manager.element.style[Ht] = t),
            (this.actions = t.toLowerCase().trim());
        },
        update: function () {
          this.set(this.manager.options.touchAction);
        },
        compute: function () {
          var t = [];
          return (
            a(this.manager.recognizers, function (e) {
              d(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()));
            }),
            (function (t) {
              if (f(t, Yt)) return Yt;
              var e = f(t, Gt),
                i = f(t, Xt);
              return e && i ? Yt : e || i ? (e ? Gt : Xt) : f(t, Vt) ? Vt : Ut;
            })(t.join(" "))
          );
        },
        preventDefaults: function (t) {
          var e = t.srcEvent,
            i = t.offsetDirection;
          if (!this.manager.session.prevented) {
            var s = this.actions,
              n = f(s, Yt) && !Zt[Yt],
              o = f(s, Xt) && !Zt[Xt],
              a = f(s, Gt) && !Zt[Gt];
            if (n) {
              var r = 1 === t.pointers.length,
                h = t.distance < 2,
                l = t.deltaTime < 250;
              if (r && h && l) return;
            }
            return a && o
              ? void 0
              : n || (o && i & It) || (a && i & zt)
              ? this.preventSrc(e)
              : void 0;
          }
          e.preventDefault();
        },
        preventSrc: function (t) {
          (this.manager.session.prevented = !0), t.preventDefault();
        },
      };
      var Jt = 1,
        Kt = 2,
        te = 4,
        ee = 8,
        ie = ee,
        se = 16;
      (Q.prototype = {
        defaults: {},
        set: function (t) {
          return (
            K(this.options, t),
            this.manager && this.manager.touchAction.update(),
            this
          );
        },
        recognizeWith: function (t) {
          if (o(t, "recognizeWith", this)) return this;
          var e = this.simultaneous;
          return (
            e[(t = R(t, this)).id] || ((e[t.id] = t), t.recognizeWith(this)),
            this
          );
        },
        dropRecognizeWith: function (t) {
          return o(t, "dropRecognizeWith", this)
            ? this
            : ((t = R(t, this)), delete this.simultaneous[t.id], this);
        },
        requireFailure: function (t) {
          if (o(t, "requireFailure", this)) return this;
          var e = this.requireFail;
          return (
            -1 === _(e, (t = R(t, this))) &&
              (e.push(t), t.requireFailure(this)),
            this
          );
        },
        dropRequireFailure: function (t) {
          if (o(t, "dropRequireFailure", this)) return this;
          t = R(t, this);
          var e = _(this.requireFail, t);
          return e > -1 && this.requireFail.splice(e, 1), this;
        },
        hasRequireFailures: function () {
          return this.requireFail.length > 0;
        },
        canRecognizeWith: function (t) {
          return !!this.simultaneous[t.id];
        },
        emit: function (t) {
          function e(e) {
            i.manager.emit(e, t);
          }
          var i = this,
            s = this.state;
          ee > s && e(i.options.event + M(s)),
            e(i.options.event),
            t.additionalEvent && e(t.additionalEvent),
            s >= ee && e(i.options.event + M(s));
        },
        tryEmit: function (t) {
          return this.canEmit() ? this.emit(t) : void (this.state = 32);
        },
        canEmit: function () {
          for (var t = 0; t < this.requireFail.length; ) {
            if (!(this.requireFail[t].state & (32 | Jt))) return !1;
            t++;
          }
          return !0;
        },
        recognize: function (t) {
          var e = K({}, t);
          return d(this.options.enable, [this, e])
            ? (this.state & (ie | se | 32) && (this.state = Jt),
              (this.state = this.process(e)),
              void (this.state & (Kt | te | ee | se) && this.tryEmit(e)))
            : (this.reset(), void (this.state = 32));
        },
        process: function (t) {},
        getTouchAction: function () {},
        reset: function () {},
      }),
        h(W, Q, {
          defaults: { pointers: 1 },
          attrTest: function (t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e;
          },
          process: function (t) {
            var e = this.state,
              i = t.eventType,
              s = e & (Kt | te),
              n = this.attrTest(t);
            return s && (i & bt || !n)
              ? e | se
              : s || n
              ? i & _t
                ? e | ee
                : e & Kt
                ? e | te
                : Kt
              : 32;
          },
        }),
        h(H, W, {
          defaults: { event: "pan", threshold: 10, pointers: 1, direction: jt },
          getTouchAction: function () {
            var t = this.options.direction,
              e = [];
            return t & It && e.push(Xt), t & zt && e.push(Gt), e;
          },
          directionTest: function (t) {
            var e = this.options,
              i = !0,
              s = t.distance,
              n = t.direction,
              o = t.deltaX,
              a = t.deltaY;
            return (
              n & e.direction ||
                (e.direction & It
                  ? ((n = 0 === o ? vt : 0 > o ? yt : wt),
                    (i = o != this.pX),
                    (s = Math.abs(t.deltaX)))
                  : ((n = 0 === a ? vt : 0 > a ? xt : Ct),
                    (i = a != this.pY),
                    (s = Math.abs(t.deltaY)))),
              (t.direction = n),
              i && s > e.threshold && n & e.direction
            );
          },
          attrTest: function (t) {
            return (
              W.prototype.attrTest.call(this, t) &&
              (this.state & Kt || (!(this.state & Kt) && this.directionTest(t)))
            );
          },
          emit: function (t) {
            (this.pX = t.deltaX), (this.pY = t.deltaY);
            var e = $(t.direction);
            e && (t.additionalEvent = this.options.event + e),
              this._super.emit.call(this, t);
          },
        }),
        h(q, W, {
          defaults: { event: "pinch", threshold: 0, pointers: 2 },
          getTouchAction: function () {
            return [Yt];
          },
          attrTest: function (t) {
            return (
              this._super.attrTest.call(this, t) &&
              (Math.abs(t.scale - 1) > this.options.threshold ||
                this.state & Kt)
            );
          },
          emit: function (t) {
            if (1 !== t.scale) {
              var e = t.scale < 1 ? "in" : "out";
              t.additionalEvent = this.options.event + e;
            }
            this._super.emit.call(this, t);
          },
        }),
        h(N, Q, {
          defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
          getTouchAction: function () {
            return [Ut];
          },
          process: function (t) {
            var e = this.options,
              i = t.pointers.length === e.pointers,
              s = t.distance < e.threshold,
              o = t.deltaTime > e.time;
            if (
              ((this._input = t), !s || !i || (t.eventType & (_t | bt) && !o))
            )
              this.reset();
            else if (t.eventType & ft)
              this.reset(),
                (this._timer = n(
                  function () {
                    (this.state = ie), this.tryEmit();
                  },
                  e.time,
                  this
                ));
            else if (t.eventType & _t) return ie;
            return 32;
          },
          reset: function () {
            clearTimeout(this._timer);
          },
          emit: function (t) {
            this.state === ie &&
              (t && t.eventType & _t
                ? this.manager.emit(this.options.event + "up", t)
                : ((this._input.timeStamp = ot()),
                  this.manager.emit(this.options.event, this._input)));
          },
        }),
        h(U, W, {
          defaults: { event: "rotate", threshold: 0, pointers: 2 },
          getTouchAction: function () {
            return [Yt];
          },
          attrTest: function (t) {
            return (
              this._super.attrTest.call(this, t) &&
              (Math.abs(t.rotation) > this.options.threshold || this.state & Kt)
            );
          },
        }),
        h(V, W, {
          defaults: {
            event: "swipe",
            threshold: 10,
            velocity: 0.3,
            direction: It | zt,
            pointers: 1,
          },
          getTouchAction: function () {
            return H.prototype.getTouchAction.call(this);
          },
          attrTest: function (t) {
            var e,
              i = this.options.direction;
            return (
              i & (It | zt)
                ? (e = t.overallVelocity)
                : i & It
                ? (e = t.overallVelocityX)
                : i & zt && (e = t.overallVelocityY),
              this._super.attrTest.call(this, t) &&
                i & t.offsetDirection &&
                t.distance > this.options.threshold &&
                t.maxPointers == this.options.pointers &&
                nt(e) > this.options.velocity &&
                t.eventType & _t
            );
          },
          emit: function (t) {
            var e = $(t.offsetDirection);
            e && this.manager.emit(this.options.event + e, t),
              this.manager.emit(this.options.event, t);
          },
        }),
        h(Y, Q, {
          defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10,
          },
          getTouchAction: function () {
            return [Vt];
          },
          process: function (t) {
            var e = this.options,
              i = t.pointers.length === e.pointers,
              s = t.distance < e.threshold,
              o = t.deltaTime < e.time;
            if ((this.reset(), t.eventType & ft && 0 === this.count))
              return this.failTimeout();
            if (s && o && i) {
              if (t.eventType != _t) return this.failTimeout();
              var a = !this.pTime || t.timeStamp - this.pTime < e.interval,
                r = !this.pCenter || T(this.pCenter, t.center) < e.posThreshold;
              if (
                ((this.pTime = t.timeStamp),
                (this.pCenter = t.center),
                r && a ? (this.count += 1) : (this.count = 1),
                (this._input = t),
                0 === this.count % e.taps)
              )
                return this.hasRequireFailures()
                  ? ((this._timer = n(
                      function () {
                        (this.state = ie), this.tryEmit();
                      },
                      e.interval,
                      this
                    )),
                    Kt)
                  : ie;
            }
            return 32;
          },
          failTimeout: function () {
            return (
              (this._timer = n(
                function () {
                  this.state = 32;
                },
                this.options.interval,
                this
              )),
              32
            );
          },
          reset: function () {
            clearTimeout(this._timer);
          },
          emit: function () {
            this.state == ie &&
              ((this._input.tapCount = this.count),
              this.manager.emit(this.options.event, this._input));
          },
        }),
        (G.VERSION = "2.0.8"),
        (G.defaults = {
          domEvents: !1,
          touchAction: Nt,
          enable: !0,
          inputTarget: null,
          inputClass: null,
          preset: [
            [U, { enable: !1 }],
            [q, { enable: !1 }, ["rotate"]],
            [V, { direction: It }],
            [H, { direction: It }, ["swipe"]],
            [Y],
            [Y, { event: "doubletap", taps: 2 }, ["tap"]],
            [N],
          ],
          cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)",
          },
        });
      (X.prototype = {
        set: function (t) {
          return (
            K(this.options, t),
            t.touchAction && this.touchAction.update(),
            t.inputTarget &&
              (this.input.destroy(),
              (this.input.target = t.inputTarget),
              this.input.init()),
            this
          );
        },
        stop: function (t) {
          this.session.stopped = t ? 2 : 1;
        },
        recognize: function (t) {
          var e = this.session;
          if (!e.stopped) {
            this.touchAction.preventDefaults(t);
            var i,
              s = this.recognizers,
              n = e.curRecognizer;
            (!n || (n && n.state & ie)) && (n = e.curRecognizer = null);
            for (var o = 0; o < s.length; )
              (i = s[o]),
                2 === e.stopped || (n && i != n && !i.canRecognizeWith(n))
                  ? i.reset()
                  : i.recognize(t),
                !n && i.state & (Kt | te | ee) && (n = e.curRecognizer = i),
                o++;
          }
        },
        get: function (t) {
          if (t instanceof Q) return t;
          for (var e = this.recognizers, i = 0; i < e.length; i++)
            if (e[i].options.event == t) return e[i];
          return null;
        },
        add: function (t) {
          if (o(t, "add", this)) return this;
          var e = this.get(t.options.event);
          return (
            e && this.remove(e),
            this.recognizers.push(t),
            (t.manager = this),
            this.touchAction.update(),
            t
          );
        },
        remove: function (t) {
          if (o(t, "remove", this)) return this;
          if ((t = this.get(t))) {
            var e = this.recognizers,
              i = _(e, t);
            -1 !== i && (e.splice(i, 1), this.touchAction.update());
          }
          return this;
        },
        on: function (t, e) {
          if (t !== s && e !== s) {
            var i = this.handlers;
            return (
              a(g(t), function (t) {
                (i[t] = i[t] || []), i[t].push(e);
              }),
              this
            );
          }
        },
        off: function (t, e) {
          if (t !== s) {
            var i = this.handlers;
            return (
              a(g(t), function (t) {
                e ? i[t] && i[t].splice(_(i[t], e), 1) : delete i[t];
              }),
              this
            );
          }
        },
        emit: function (t, e) {
          this.options.domEvents && J(t, e);
          var i = this.handlers[t] && this.handlers[t].slice();
          if (i && i.length) {
            (e.type = t),
              (e.preventDefault = function () {
                e.srcEvent.preventDefault();
              });
            for (var s = 0; s < i.length; ) i[s](e), s++;
          }
        },
        destroy: function () {
          this.element && Z(this, !1),
            (this.handlers = {}),
            (this.session = {}),
            this.input.destroy(),
            (this.element = null);
        },
      }),
        K(G, {
          INPUT_START: ft,
          INPUT_MOVE: gt,
          INPUT_END: _t,
          INPUT_CANCEL: bt,
          STATE_POSSIBLE: Jt,
          STATE_BEGAN: Kt,
          STATE_CHANGED: te,
          STATE_ENDED: ee,
          STATE_RECOGNIZED: ie,
          STATE_CANCELLED: se,
          STATE_FAILED: 32,
          DIRECTION_NONE: vt,
          DIRECTION_LEFT: yt,
          DIRECTION_RIGHT: wt,
          DIRECTION_UP: xt,
          DIRECTION_DOWN: Ct,
          DIRECTION_HORIZONTAL: It,
          DIRECTION_VERTICAL: zt,
          DIRECTION_ALL: jt,
          Manager: X,
          Input: x,
          TouchAction: P,
          TouchInput: L,
          MouseInput: D,
          PointerEventInput: S,
          TouchMouseInput: F,
          SingleTouchInput: O,
          Recognizer: Q,
          AttrRecognizer: W,
          Tap: Y,
          Pan: H,
          Swipe: V,
          Pinch: q,
          Rotate: U,
          Press: N,
          on: c,
          off: p,
          each: a,
          merge: rt,
          extend: at,
          assign: K,
          inherit: h,
          bindFn: l,
          prefixed: y,
        }),
        ((void 0 !== t ? t : "undefined" != typeof self ? self : {}).Hammer =
          G),
        "function" == typeof define && define.amd
          ? define(function () {
              return G;
            })
          : "undefined" != typeof module && module.exports
          ? (module.exports = G)
          : (t.Hammer = G);
    })(window, document),
      (function (t) {
        "function" == typeof define && define.amd
          ? define(["jquery", "hammerjs"], t)
          : "object" == typeof exports
          ? t(require("jquery"), require("hammerjs"))
          : t(jQuery, Hammer);
      })(function (t, e) {
        var i;
        (t.fn.hammer = function (i) {
          return this.each(function () {
            !(function (i, s) {
              var n = t(i);
              n.data("hammer") || n.data("hammer", new e(n[0], s));
            })(this, i);
          });
        }),
          (e.Manager.prototype.emit =
            ((i = e.Manager.prototype.emit),
            function (e, s) {
              i.call(this, e, s),
                t(this.element).trigger({ type: e, gesture: s });
            }));
      });
  else {
    var Hammer = { Manager: { prototype: {} } };
    !(function (t) {
      "function" == typeof define && define.amd
        ? define(["jquery", "hammerjs"], t)
        : "object" == typeof exports
        ? t(require("jquery"), require("hammerjs"))
        : t(jQuery, Hammer);
    })(function (t, e) {
      var i;
      (t.fn.hammer = function (t) {
        return this.each(function () {});
      }),
        (e.Manager.prototype.emit =
          ((i = e.Manager.prototype.emit),
          function (e, s) {
            i.call(this, e, s),
              t(this.element).trigger({ type: e, gesture: s });
          }));
    });
  }
  function sbi_supports_video() {
    return !!document.createElement("video").canPlayType;
  }
  function sbiTranslate(t) {
    if ("undefined" == typeof sbiTranslations) return t;
    var e = t.toLowerCase().replace(/ /g, "");
    return void 0 !== sbiTranslations[e] ? sbiTranslations[e] : t;
  }
  (function () {
    var t = jQuery,
      e = (function () {
        function t() {
          (this.fadeDuration = 400),
            (this.fitImagesInViewport = !0),
            (this.resizeDuration = 400),
            (this.positionFromTop = 50),
            (this.showImageNumberLabel = !0),
            (this.alwaysShowNavOnTouchDevices = !1),
            (this.wrapAround = !1);
        }
        return (
          (t.prototype.albumLabel = function (t, e) {
            return t + " / " + e;
          }),
          t
        );
      })(),
      i = (function () {
        function e(t) {
          (this.options = t),
            (this.album = []),
            (this.currentImageIndex = void 0),
            this.init();
        }
        return (
          (e.prototype.init = function () {
            this.enable(), this.build();
          }),
          (e.prototype.enable = function () {
            var e = this;
            t("body").on("click", "a[data-lightbox-sbi]", function (i) {
              return e.start(t(i.currentTarget)), !1;
            });
          }),
          (e.prototype.build = function () {
            var e,
              i = this,
              s = function () {
                jQuery("#sbi_lightbox .sbi_lb_lightbox-image").remove(),
                  jQuery("#sbi_lightbox .sbi_lb-image-wrap").length &&
                    (jQuery("#sbi_lightbox .sbi_lb-image-wrap").sbiOwlCarousel(
                      "destroy"
                    ),
                    jQuery("#sbi_lightbox .sbi-owl-item").remove()),
                  jQuery("#sbi_lightbox.sbi_had_error").removeClass(
                    "sbi_had_error"
                  ),
                  jQuery("#sbi_lightbox").find("video").remove(),
                  jQuery(".sbi_lb-container").prepend(
                    "<video class='sbi_video' src='' poster='' controls></video>"
                  ),
                  clearTimeout(i.moveSlide);
              };
            if (
              "function" !=
              typeof t("#sbi_lightbox").find(".sbi_lb-container").hammer
            ) {
              var n = { Manager: { prototype: {} } };
              (e = function (t, e) {
                var i;
                (t.fn.hammer = function (t) {
                  return this.each(function () {});
                }),
                  (e.Manager.prototype.emit =
                    ((i = e.Manager.prototype.emit),
                    function (e, s) {
                      i.call(this, e, s),
                        t(this.element).trigger({ type: e, gesture: s });
                    }));
              }),
                "function" == typeof define && define.amd
                  ? define(["jquery", "hammerjs"], e)
                  : "object" == typeof exports
                  ? e(require("jquery"), require("hammerjs"))
                  : e(jQuery, n);
            }
            t(
              "<div id='sbi_lightboxOverlay' class='sbi_lightboxOverlay'></div><div id='sbi_lightbox' class='sbi_lightbox'><div class='sbi_lb-outerContainer'><div class='sbi_lb-nav'><a class='sbi_lb-prev' href='#' ><p class='sbi-screenreader'>Previous Slide</p><span></span></a><a class='sbi_lb-next' href='#' ><p class='sbi-screenreader'>Next Slide</p><span></span></a></div><div class='sbi_lb-container-wrapper'><div class='sbi_lb-container'><div class='sbi_lb-image-wrap-outer'><div class='sbi_lb-image-wrap'><img class='sbi_lb-image' src='' alt='Lightbox image placeholder'/></div></div><div class='sbi_lb-loader'><i class='fa fa-spin'></i></div></div><div class='sbi_lb-dataContainer'><div class='sbi_lb-data'><div class='sbi_lb-details'><span class='sbi_lb-caption'></span><span class='sbi_lb-number'></span><div class='sbi_lightbox_action sbi_share'><a href='JavaScript:void(0);'><i class='fa fa-share'></i>" +
                sbiTranslate("Share") +
                "</a><p class='sbi_lightbox_tooltip sbi_tooltip_social'><a href='' target='_blank' rel='noopener' id='sbi_facebook_icon'><span class='sbi-screenreader'>Facebook</span><i class='fa fab fa-facebook-square'></i></a><a href='' target='_blank' rel='noopener' id='sbi_twitter_icon'><span class='sbi-screenreader'>Twitter</span><i class='fa fab fa-twitter'></i></a><a href='' target='_blank' rel='noopener' id='sbi_linkedin_icon'><span class='sbi-screenreader'>Linkedin</span><i class='fa fab fa-linkedin'></i></a><a href='' id='sbi_pinterest_icon' target='_blank' rel='noopener'><span class='sbi-screenreader'>Pinterest</span><i class='fa fab fa-pinterest'></i></a><a href='' id='sbi_email_icon' target='_blank' rel='noopener'><span class='sbi-screenreader'>Email</span><i class='fa fa-envelope'></i></a><a class=\"sbi_share_close\"><svg class=\"svg-inline--fa fa-times fa-w-12\" aria-hidden=\"true\" data-fa-processed=\"\" data-prefix=\"fa\" data-icon=\"times\" role=\"presentation\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><path fill=\"currentColor\" d=\"M323.1 441l53.9-53.9c9.4-9.4 9.4-24.5 0-33.9L279.8 256l97.2-97.2c9.4-9.4 9.4-24.5 0-33.9L323.1 71c-9.4-9.4-24.5-9.4-33.9 0L192 168.2 94.8 71c-9.4-9.4-24.5-9.4-33.9 0L7 124.9c-9.4 9.4-9.4 24.5 0 33.9l97.2 97.2L7 353.2c-9.4 9.4-9.4 24.5 0 33.9L60.9 441c9.4 9.4 24.5 9.4 33.9 0l97.2-97.2 97.2 97.2c9.3 9.3 24.5 9.3 33.9 0z\"></path></svg></a></p></div><div class='sbi_lightbox_action sbi_instagram'><a href='https://www.instagram.com/' target='_blank' rel='noopener nofollow'><i class='fa fab fa-instagram'></i>Instagram</a></div><div id='sbi_mod_link' class='sbi_lightbox_action'><a href='JavaScript:void(0);'><i class='fa fa-times'></i>Hide photo (admin)</a><p id='sbi_mod_box' class='sbi_lightbox_tooltip'>Add ID to the <strong>Hide Specific Photos</strong> setting: <span id='sbi_photo_id'></span></p></div></div><div class='sbi_lb-closeContainer'><a class='sbi_lb-close'><i class='fa fa-times'></i></a></div></div></div></div>"
            ).appendTo(t("body")),
              (this.$lightbox = t("#sbi_lightbox")),
              (this.$overlay = t("#sbi_lightboxOverlay")),
              (this.$outerContainer = this.$lightbox.find(
                ".sbi_lb-outerContainer"
              )),
              (this.$container = this.$lightbox.find(".sbi_lb-container")),
              (this.containerTopPadding = parseInt(
                this.$container.css("padding-top"),
                10
              )),
              (this.containerRightPadding = parseInt(
                this.$container.css("padding-right"),
                10
              )),
              (this.containerBottomPadding = parseInt(
                this.$container.css("padding-bottom"),
                10
              )),
              (this.containerLeftPadding = parseInt(
                this.$container.css("padding-left"),
                10
              )),
              this.$overlay.hide().on("click", function () {
                return i.end(), !1;
              }),
              jQuery(document).on("click", function (t, e, i) {
                jQuery(t.target).closest(".sbi_lb-outerContainer").length ||
                  jQuery(t.target).closest(".sbi_lb-dataContainer").length ||
                  (jQuery("#sbi_lightboxOverlay, #sbi_lightbox").fadeOut(),
                  sbi_supports_video() &&
                    jQuery("#sbi_lightbox video.sbi_video").length &&
                    jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                  s(),
                  jQuery("body").length &&
                    jQuery("body").removeClass("sbi_no_scroll"));
              }),
              this.$lightbox.hide(),
              jQuery("#sbi_lightboxOverlay").on("click", function (e) {
                return (
                  s(),
                  sbi_supports_video() &&
                    jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                  "sbi_lightbox" === t(e.target).attr("id") && i.end(),
                  !1
                );
              }),
              this.$lightbox.find(".sbi_lb-prev").on("click", function () {
                return (
                  s(),
                  sbi_supports_video() &&
                    jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                  i.changeImage(
                    0 === i.currentImageIndex
                      ? i.album.length - 1
                      : i.currentImageIndex - 1
                  ),
                  !1
                );
              }),
              this.$lightbox
                .find(".sbi_lb-container")
                .hammer()
                .on("swiperight", function () {
                  return (
                    s(),
                    sbi_supports_video() &&
                      jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                    i.changeImage(
                      0 === i.currentImageIndex
                        ? i.album.length - 1
                        : i.currentImageIndex - 1
                    ),
                    !1
                  );
                }),
              this.$lightbox.find(".sbi_lb-next").on("click", function () {
                return (
                  s(),
                  sbi_supports_video() &&
                    jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                  i.changeImage(
                    i.currentImageIndex === i.album.length - 1
                      ? 0
                      : i.currentImageIndex + 1
                  ),
                  !1
                );
              }),
              this.$lightbox
                .find(".sbi_lb-container")
                .hammer()
                .on("swipeleft", function () {
                  return (
                    s(),
                    sbi_supports_video() &&
                      jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                    i.changeImage(
                      i.currentImageIndex === i.album.length - 1
                        ? 0
                        : i.currentImageIndex + 1
                    ),
                    !1
                  );
                }),
              this.$lightbox
                .find(".sbi_lb-loader, .sbi_lb-close")
                .on("click", function () {
                  return (
                    s(),
                    sbi_supports_video() &&
                      jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                    jQuery("body").length &&
                      jQuery("body").removeClass("sbi_no_scroll"),
                    i.end(),
                    !1
                  );
                });
          }),
          (e.prototype.start = function (e) {
            function i(t) {
              jQuery("body").length && jQuery("body").addClass("sbi_no_scroll");
              var e = !!t.closest(".sbi").length && t.closest(".sbi");
              !e &&
                t.closest(".sb_instagram_header").next().hasClass("sbi") &&
                (e = t.closest(".sb_instagram_header").next());
              var i = e.attr("data-sbi-index"),
                n = window.sbi.feeds[parseInt(i) - 1],
                o = n.settings.general;
              if (t.hasClass("sbi_header_link") && !1 !== typeof n.storyData) {
                var a = n.storyData,
                  r = "undefined" !== n.storyWait ? parseInt(n.storyWait) : 5e3;
                jQuery(".sbi_lightbox")
                  .removeClass("sbi_lb-comments-enabled")
                  .addClass("sbi_lb-story"),
                  jQuery.each(a, function (e, i) {
                    (s.album[e] = {
                      link: i.media_url,
                      avatar: n.storyAvatar,
                      title: t.attr("data-title") || t.attr("title"),
                      video: "",
                      id: "",
                      url: t.attr("href"),
                      user: t.attr("title").replace("@", ""),
                      lightboxcomments: !1,
                      carousel: {},
                      feedID: "story",
                      type: "story",
                      wait: r,
                    }),
                      "VIDEO" === i.media_type &&
                        void 0 !== i.media_url &&
                        ((s.album[e].video = i.media_url),
                        (s.album[e].link =
                          sb_instagram_js_options.placeholder.replace(
                            "placeholder",
                            "stories-placeholder"
                          )));
                  });
              } else {
                jQuery(".sbi_lightbox").removeClass("sbi_lb-story");
                var h = {},
                  l =
                    void 0 !== o.lightboxcomments &&
                    parseInt(o.lightboxcomments);
                void 0 !== t.attr("data-carousel") &&
                  t.attr("data-carousel").length > -1 &&
                  t.attr("data-carousel").indexOf("{") > -1 &&
                  (h = JSON.parse(t.attr("data-carousel")));
                var d =
                    void 0 !== t.attr("data-video") ? t.attr("data-video") : "",
                  u = n.getAvatarUrl(t.attr("data-user")),
                  c = n.getImageUrls(t.closest(".sbi_item"));
                n.settings.consentGiven || ((h = {}), "" !== d && (d = "link")),
                  s.album.push({
                    link: t.attr("href"),
                    local: c[640],
                    title: t.attr("data-title") || t.attr("title"),
                    video: d,
                    id: t.attr("data-id"),
                    url: t.attr("data-url"),
                    user: t.attr("data-user"),
                    avatar: u,
                    accounttype: t.attr("data-account-type"),
                    lightboxcomments: l,
                    numcomments: l,
                    carousel: h,
                    type: o.type,
                  });
              }
            }
            var s = this,
              n = t(window);
            n.on("resize", t.proxy(this.sizeOverlay, this)),
              t("select, object, embed").css({ visibility: "hidden" }),
              this.sizeOverlay(),
              (this.album = []);
            var o,
              a = 0,
              r = e.attr("data-lightbox-sbi");
            if (r) {
              o = t(e.prop("tagName") + '[data-lightbox-sbi="' + r + '"]');
              for (var h = 0; h < o.length; h = ++h)
                i(t(o[h])), o[h] === e[0] && (a = h);
            } else if ("lightbox" === e.attr("rel")) i(e);
            else {
              o = t(e.prop("tagName") + '[rel="' + e.attr("rel") + '"]');
              for (var l = 0; l < o.length; l = ++l)
                i(t(o[l])), o[l] === e[0] && (a = l);
            }
            var d = n.scrollTop() + this.options.positionFromTop,
              u = n.scrollLeft();
            this.$lightbox
              .css({ top: d + "px", left: u + "px" })
              .fadeIn(this.options.fadeDuration),
              this.changeImage(a);
          }),
          (e.prototype.changeImage = function (e) {
            var i = this;
            this.disableKeyboardNav();
            var s = this.$lightbox.find(".sbi_lb-image");
            this.$overlay.fadeIn(this.options.fadeDuration),
              t(".sbi_lb-loader").fadeIn("slow"),
              this.$lightbox
                .find(
                  ".sbi_lb-image, .sbi_lb-nav, .sbi_lb-prev, .sbi_lb-next, .sbi_lb-dataContainer, .sbi_lb-numbers, .sbi_lb-caption"
                )
                .hide(),
              this.$outerContainer.addClass("animating");
            var n = new Image();
            (n.onerror = function () {
              i.$lightbox.hasClass("sbi_had_error")
                ? (console.log("image loading error"), i.end())
                : (i.$lightbox.addClass("sbi_had_error"),
                  jQuery.each(i.album, function (t, e) {
                    i.album[t].link = e.local;
                  }),
                  i.changeImage(e));
            }),
              (n.onload = function () {
                var o,
                  a,
                  r,
                  h,
                  l,
                  d,
                  u = 0,
                  c = 0,
                  p =
                    void 0 !== jQuery(".sbi").attr("data-options")
                      ? JSON.parse(jQuery(".sbi").attr("data-options"))
                      : {};
                window.innerWidth > 640 &&
                  void 0 !== p.lightboxcomments &&
                  (u = 300),
                  window.innerWidth < 740 + u &&
                    window.innerWidth > 640 &&
                    (c = 100),
                  s.attr("src", i.album[e].link),
                  t(n),
                  s.width(n.width),
                  s.height(n.height),
                  i.options.fitImagesInViewport &&
                    ((d = t(window).width()),
                    (l = t(window).height()),
                    (h =
                      d -
                      i.containerLeftPadding -
                      i.containerRightPadding -
                      20 -
                      u -
                      c),
                    (r =
                      l -
                      i.containerTopPadding -
                      i.containerBottomPadding -
                      150),
                    (n.width > h || n.height > r) &&
                      (n.width / h > n.height / r
                        ? ((a = h),
                          (o = parseInt(n.height / (n.width / a), 10)),
                          s.width(a),
                          s.height(o))
                        : ((o = r),
                          (a = parseInt(n.width / (n.height / o), 10)),
                          s.width(a),
                          s.height(o)))),
                  i.sizeContainer(s.width(), s.height());
              }),
              (n.src = this.album[e].link),
              (this.currentImageIndex = e);
          }),
          (e.prototype.sizeOverlay = function () {
            this.$overlay.width(t(window).width()).height(t(document).height());
          }),
          (e.prototype.sizeContainer = function (t, e) {
            function i() {
              s.$lightbox.find(".sbi_lb-dataContainer").width(a),
                s.$lightbox.find(".sbi_lb-prevLink").height(r),
                s.$lightbox.find(".sbi_lb-nextLink").height(r),
                s.showImage();
            }
            var s = this,
              n = this.$outerContainer.outerWidth(),
              o = this.$outerContainer.outerHeight(),
              a = t + this.containerLeftPadding + this.containerRightPadding,
              r = e + this.containerTopPadding + this.containerBottomPadding;
            n !== a || o !== r
              ? this.$outerContainer.animate(
                  { width: a, height: r },
                  this.options.resizeDuration,
                  "swing",
                  function () {
                    i();
                  }
                )
              : i();
          }),
          (e.prototype.showImage = function () {
            this.$lightbox.find(".sbi_lb-loader").hide(),
              this.$lightbox.find(".sbi_lb-image").fadeIn("slow"),
              this.updateNav(),
              this.updateDetails(),
              this.preloadNeighboringImages(),
              this.enableKeyboardNav();
          }),
          (e.prototype.updateNav = function () {
            var t = !1;
            try {
              document.createEvent("TouchEvent"),
                (t = !!this.options.alwaysShowNavOnTouchDevices);
            } catch (t) {}
            this.$lightbox.find(".sbi_lb-nav").show(),
              this.album.length > 1 &&
                (this.options.wrapAround
                  ? (t &&
                      this.$lightbox
                        .find(".sbi_lb-prev, .sbi_lb-next")
                        .css("opacity", "1"),
                    this.$lightbox.find(".sbi_lb-prev, .sbi_lb-next").show())
                  : (this.currentImageIndex > 0 &&
                      (this.$lightbox.find(".sbi_lb-prev").show(),
                      t &&
                        this.$lightbox
                          .find(".sbi_lb-prev")
                          .css("opacity", "1")),
                    this.currentImageIndex < this.album.length - 1 &&
                      (this.$lightbox.find(".sbi_lb-next").show(),
                      t &&
                        this.$lightbox
                          .find(".sbi_lb-next")
                          .css("opacity", "1"))));
          }),
          (e.prototype.updateDetails = function () {
            var t = this;
            if (
              (jQuery(".sbi_share_close").on("click", function () {
                jQuery(".sbi_lightbox_tooltip.sbi_tooltip_social").hide();
              }),
              sbi_supports_video() &&
                (jQuery("#sbi_lightbox").removeClass("sbi_video_lightbox"),
                this.album[this.currentImageIndex].video.length &&
                "missing" !== this.album[this.currentImageIndex].video
                  ? "link" === this.album[this.currentImageIndex].video ||
                    (jQuery("#sbi_lightbox").addClass("sbi_video_lightbox"),
                    0 == jQuery(".sbi_lightbox .sbi_video").length
                      ? jQuery(".sbi_lb-container").prepend(
                          "<video class='sbi_video' src='" +
                            this.album[this.currentImageIndex].video +
                            "' poster='" +
                            this.album[this.currentImageIndex].link +
                            "' controls autoplay></video>"
                        )
                      : jQuery(".sbi_video").attr({
                          src: this.album[this.currentImageIndex].video,
                          poster: this.album[this.currentImageIndex].link,
                          autoplay: "true",
                        }))
                  : jQuery(".sbi_lb-container .sbi_video").remove()),
              "link" !== this.album[this.currentImageIndex].video ||
              jQuery(".sbi_lb-container-wrapper .sbi_gdpr_notice").length
                ? "link" !== this.album[this.currentImageIndex].video &&
                  jQuery(".sbi_gdpr_notice").remove()
                : jQuery(".sbi_lb-container-wrapper").prepend(
                    '<a href="' +
                      this.album[this.currentImageIndex].url +
                      '" target="_blank" rel="noopener noreferrer" class="sbi_gdpr_notice"><svg style="color: rgba(255,255,255,1)" class="svg-inline--fa fa-play fa-w-14 sbi_playbtn" aria-label="Play" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="play" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></a>'
                  ),
              jQuery(".sbi_video").css("opacity", "0"),
              jQuery("#sbi_lightbox .sbi_instagram a").attr(
                "href",
                this.album[this.currentImageIndex].url
              ),
              jQuery("#sbi_lightbox .sbi_lightbox_tooltip").hide(),
              jQuery("#sbi_lightbox #sbi_mod_box")
                .find("#sbi_photo_id")
                .text(this.album[this.currentImageIndex].id),
              jQuery("#sbi_lightbox #sbi_facebook_icon").attr(
                "href",
                "https://www.facebook.com/sharer/sharer.php?u=" +
                  this.album[this.currentImageIndex].url +
                  "&t=Text"
              ),
              jQuery("#sbi_lightbox #sbi_twitter_icon").attr(
                "href",
                "https://twitter.com/intent/tweet?text=" +
                  this.album[this.currentImageIndex].url +
                  " " +
                  this.album[this.currentImageIndex].title
              ),
              jQuery("#sbi_lightbox #sbi_linkedin_icon").attr(
                "href",
                "https://www.linkedin.com/shareArticle?mini=true&url=" +
                  this.album[this.currentImageIndex].url +
                  "&title=" +
                  this.album[this.currentImageIndex].title
              ),
              jQuery("#sbi_lightbox #sbi_pinterest_icon").attr(
                "href",
                "https://pinterest.com/pin/create/button/?url=" +
                  encodeURIComponent(this.album[this.currentImageIndex].url) +
                  "&media=" +
                  encodeURIComponent(this.album[this.currentImageIndex].link) +
                  "&description=" +
                  encodeURIComponent(this.album[this.currentImageIndex].title)
              ),
              jQuery("#sbi_lightbox #sbi_email_icon").attr(
                "href",
                "mailto:?subject=Instagram&body=" +
                  this.album[this.currentImageIndex].title +
                  " " +
                  this.album[this.currentImageIndex].url
              ),
              jQuery(".sbi_lb-container-wrapper").find(".fa-clone").remove(),
              void 0 !== jQuery(".sbi_lb-image-wrap").sbiOwlCarousel &&
                "" !== this.album[this.currentImageIndex].carousel &&
                void 0 !== this.album[this.currentImageIndex].carousel.data &&
                void 0 !== this.album[this.currentImageIndex].carousel.data[0])
            ) {
              var e = jQuery(".sbi_lb-image-wrap"),
                i =
                  jQuery(".sbi_lb-image").attr("style") +
                  "opacity: 1 !important; min-width: " +
                  jQuery(".sbi_lb-image-wrap-outer").width() +
                  "px;",
                s = this.album[this.currentImageIndex].link,
                n = this.album[this.currentImageIndex].carousel.data,
                o = "video" == n[0].type;
              jQuery.each(n, function (t, n) {
                t > 0 &&
                  ("image" === n.type
                    ? e.append(
                        '<img class="sbi_lb-image sbi_lb_lightbox-image" src="' +
                          n.media +
                          '" style="' +
                          i +
                          '" alt="Lightbox Image"/>'
                      )
                    : sbi_supports_video() &&
                      "video" === n.type &&
                      e.append(
                        '<video class="sbi_video sbi_lb_lightbox-image sbi_lb_lightbox-carousel-video added" src="' +
                          n.media +
                          '" style="' +
                          i +
                          '" poster="' +
                          s +
                          '" controls="" autoplay="autoplay"></video>'
                      ));
              }),
                jQuery(".sbi_lb-image-wrap-outer").prepend(
                  '<i class="fa fa-clone sbi_lightbox_carousel_icon" aria-hidden="true"></i>'
                ),
                e.sbiOwlCarousel({
                  items: 1,
                  rewind: !0,
                  nav: !0,
                  navText: [
                    '<i class="fa fa-chevron-left"></i>',
                    '<i class="fa fa-chevron-right"></i>',
                  ],
                  dots: !0,
                  autoPlay: !1,
                  stopOnHover: !0,
                  onInitialized: function (t) {
                    setTimeout(function () {
                      jQuery(".sbi_lb-image-wrap").width() >
                        jQuery(".sbi_lb-image-wrap")
                          .find(".sbi-owl-item")
                          .width() && e.trigger("refresh.owl.carousel");
                    }, 1e3),
                      setTimeout(function () {
                        jQuery(".sbi_lb-image-wrap").width() >
                          jQuery(".sbi_lb-image-wrap")
                            .find(".sbi-owl-item")
                            .width() && e.trigger("refresh.owl.carousel");
                      }, 2500),
                      o &&
                        (jQuery(".sbi_lb-image-wrap")
                          .find(".sbi-owl-item")
                          .first()
                          .find("img")
                          .before(jQuery("#sbi_lightbox .sbi_video").first()),
                        jQuery("#sbi_lightbox .sbi_video")
                          .first()
                          .get(0)
                          .play()),
                      "svg" === window.sb_instagram_js_options.font_method &&
                        sbSVGify(e);
                  },
                  onChanged: function (t) {
                    var e = jQuery(t.target),
                      i = e
                        .find(".sbi-owl-item:eq(" + t.item.index + ")")
                        .find(".sbi_video");
                    e.find(".sbi_video").length &&
                      e.find(".sbi_video").each(function () {
                        jQuery(this).get(0).pause();
                      }),
                      i.length && i.get(0).play();
                  },
                });
              var a = e.find(".sbi-owl-buttons");
              window.width > 640 &&
                (a.addClass("onhover").hide(),
                e.on({
                  mouseenter: function () {
                    a.fadeIn();
                  },
                  mouseleave: function () {
                    a.fadeOut();
                  },
                }));
            }
            if (
              (jQuery(".sbi_lb-container-wrapper")
                .find("#sbi_mod_error")
                .remove(),
              this.album[this.currentImageIndex].video.length &&
                "missing" === this.album[this.currentImageIndex].video &&
                jQuery(".sbi_lb-container-wrapper").prepend(
                  '<div id="sbi_mod_error"><strong>This message is only visible to admins.</strong> No video available. The content of the video may contain copyrighted material and can only be viewed on instagram.com.</div>'
                ),
              "story" === this.album[this.currentImageIndex].type
                ? jQuery(".sbi_lightbox").removeClass("sbi_lb-comments-enabled")
                : !1 !== this.album[this.currentImageIndex].lightboxcomments &&
                  jQuery(".sbi_lightbox").addClass("sbi_lb-comments-enabled"),
              "story" === this.album[this.currentImageIndex].type &&
                (clearTimeout(this.moveSlide),
                this.currentImageIndex !== this.album.length - 1
                  ? this.album[this.currentImageIndex].video.length
                    ? jQuery(".sbi_lightbox .sbi_video").on(
                        "ended",
                        function () {
                          setTimeout(function () {
                            jQuery(".sbi_lb-next").trigger("click");
                          }, 150);
                        }
                      )
                    : void 0 !== this.album[this.currentImageIndex].wait &&
                      (this.moveSlide = setTimeout(function () {
                        jQuery(".sbi_lb-next").trigger("click");
                      }, this.album[this.currentImageIndex].wait))
                  : this.album[this.currentImageIndex].video.length
                  ? jQuery(".sbi_lightbox .sbi_video").on("ended", function () {
                      setTimeout(function () {
                        jQuery("#sbi_lightboxOverlay, #sbi_lightbox").fadeOut(),
                          sbi_supports_video() &&
                            jQuery("#sbi_lightbox video.sbi_video").length &&
                            jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                          jQuery(
                            "#sbi_lightbox .sbi_lb_lightbox-image"
                          ).remove(),
                          jQuery("#sbi_lightbox .sbi_lb-image-wrap").length &&
                            (jQuery(
                              "#sbi_lightbox .sbi_lb-image-wrap"
                            ).sbiOwlCarousel("destroy"),
                            jQuery("#sbi_lightbox .sbi-owl-item").remove()),
                          jQuery("#sbi_lightbox").find("video").remove(),
                          jQuery(".sbi_lb-container").prepend(
                            "<video class='sbi_video' src='' poster='' controls></video>"
                          );
                      }, 150);
                    })
                  : void 0 !== this.album[this.currentImageIndex].wait &&
                    (this.moveSlide = setTimeout(function () {
                      jQuery("#sbi_lightboxOverlay, #sbi_lightbox").fadeOut(),
                        sbi_supports_video() &&
                          jQuery("#sbi_lightbox video.sbi_video").length &&
                          jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                        jQuery("#sbi_lightbox .sbi_lb_lightbox-image").remove(),
                        jQuery("#sbi_lightbox .sbi_lb-image-wrap").length &&
                          (jQuery(
                            "#sbi_lightbox .sbi_lb-image-wrap"
                          ).sbiOwlCarousel("destroy"),
                          jQuery("#sbi_lightbox .sbi-owl-item").remove()),
                        jQuery("#sbi_lightbox").find("video").remove(),
                        jQuery(".sbi_lb-container").prepend(
                          "<video class='sbi_video' src='' poster='' controls></video>"
                        );
                    }, this.album[this.currentImageIndex].wait))),
              setTimeout(function () {
                jQuery(".sbi_video").css("opacity", "1").css("z-index", 1);
              }, 500),
              setTimeout(function () {
                jQuery(".sbi_lb-caption")
                  .find('a[href^="mailto:"]')
                  .each(function () {
                    jQuery(this).replaceWith(jQuery(this).text());
                  });
              }, 101),
              jQuery(".sbi_lb-commentBox").remove(),
              !1 !== this.album[this.currentImageIndex].lightboxcomments &&
                this.album[this.currentImageIndex].numcomments > 0)
            ) {
              var r = {
                postID: "",
                thisAlbum: this.album[this.currentImageIndex],
                maxNumComments: this.album[this.currentImageIndex].numcomments,
                disableCache:
                  this.album[this.currentImageIndex].disablecache ||
                  "true" === this.album[this.currentImageIndex].disablecache,
                numCommentsOnPage:
                  void 0 !==
                    jQuery("#" + this.album[this.currentImageIndex].id).attr(
                      "data-numcomments"
                    ) &&
                  parseInt(
                    jQuery("#" + this.album[this.currentImageIndex].id).attr(
                      "data-numcomments"
                    )
                  ),
                commentObj: [],
                getRemoteComments: function (t, e, i) {
                  jQuery(".sbi_lb-dataContainer").append(
                    '<p class="sbi_loading_comments"><svg class="svg-inline--fa fa-spinner fa-w-16 fa-pulse" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="spinner" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg></p>'
                  );
                  var s = {
                    url: sbiajaxurl,
                    type: "POST",
                    async: !0,
                    cache: !1,
                    data: {
                      action: "sbi_remote_comments_needed",
                      post_id: this.postID,
                      user: i,
                      type: e,
                    },
                    success: function (e) {
                      jQuery(".sbi_lb-dataContainer")
                        .find(".sbi_loading_comments")
                        .remove(),
                        e.indexOf("{") > -1 &&
                          ((r.commentObj = JSON.parse(e)),
                          void 0 === window.sbi.commentCache &&
                            (window.sbi.commentCache = []),
                          (window.sbi.commentCache[r.postID] = [
                            r.commentObj,
                            new Date().getTime() / 1e3 + 6e3,
                            r.numCommentsOnPage,
                          ]),
                          "all" !== t
                            ? r.replaceWithNewComments(r.commentObj)
                            : r.appendExistingComments());
                    },
                    error: function (t, e, i) {
                      console.log(i);
                    },
                  };
                  jQuery.ajax(s);
                },
                getCommentHtml: function (t) {
                  var e = "",
                    i = t.text
                      .replace(/(\\')/g, "'")
                      .replace(/(\\")/g, '"')
                      .replace(/&lt;br\/&gt;|&lt;br \/&gt;/g, "<br>");
                  return (
                    (e +=
                      '<p class="sbi_lb-comment" id="sbi_com_' +
                      t.id +
                      '" data-sbi-created="">'),
                    (e +=
                      '<a class="sbi_lb-commenter" href="https://www.instagram.com/' +
                      t.username +
                      '/" target="_blank" rel="noopener">' +
                      t.username +
                      "</a>"),
                    (e += '<span class="sbi_lb-comment-text">' + i + "</span>"),
                    (e += "</p>")
                  );
                },
                appendExistingComments: function () {
                  var t = this.postID,
                    e =
                      void 0 !== window.sbi.commentCache[t]
                        ? window.sbi.commentCache[t][0]
                        : [],
                    i =
                      void 0 !== window.sbi.commentCache[t]
                        ? window.sbi.commentCache[t][1]
                        : 0,
                    s = new Date().getTime() / 1e3,
                    n = parseInt(this.maxNumComments),
                    o =
                      void 0 !== window.sbi.commentCache[t]
                        ? r.numCommentsOnPage -
                          parseInt(window.sbi.commentCache[t][2])
                        : 0,
                    a = "";
                  i > s
                    ? (o = 0)
                    : o > 0 &&
                      ((a =
                        '<p class="sbi_loading_comments"><svg class="svg-inline--fa fa-spinner fa-w-16 fa-pulse" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="spinner" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg></p>'),
                      r.getRemoteComments(o, r.accountType, r.user));
                  var h = "";
                  if (void 0 !== e[0]) {
                    h += '<div class="sbi_lb-commentBox">';
                    var l = -1;
                    e.length + o < n
                      ? (l = 0 - e.length)
                      : n - o > 0 && (l = 0 - (n - o)),
                      o < n &&
                        ((e = e.slice(l)),
                        jQuery.each(e, function () {
                          h += r.getCommentHtml(this);
                        })),
                      (h += a),
                      (h += "</div>"),
                      jQuery(".sbi_lb-dataContainer").append(h);
                  }
                },
                replaceWithNewComments: function (t) {
                  var e = "",
                    i = Math.max(
                      0 - parseInt(this.maxNumComments),
                      0 - t.length
                    ),
                    s = t.slice(i);
                  jQuery.each(s, function () {
                    e += r.getCommentHtml(this);
                  }),
                    jQuery(".sbi_lb-commentBox").html(e);
                },
                cacheComments: function (t, e) {
                  var i = {
                    action: "sbi_update_comment_cache",
                    post_id: this.postID,
                    comments: t,
                    total_comments: e,
                  };
                  jQuery.ajax({
                    url: sbiajaxurl,
                    type: "post",
                    data: i,
                    success: function (t) {},
                  });
                },
              };
              function h(t, e, i) {
                if (0 !== r.numCommentsOnPage) {
                  var s = t.split("_")[1];
                  if (
                    ((r.postID = s),
                    (r.accountType = e),
                    (r.user = i),
                    void 0 === window.sbi.commentCache)
                  ) {
                    window.sbi.commentCache = { waiting: !0 };
                    jQuery(".sbi_lb-dataContainer").append(
                      '<p class="sbi_loading_comments"><svg class="svg-inline--fa fa-spinner fa-w-16 fa-pulse" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="spinner" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg></p>'
                    );
                    var n = {
                      url: sbiajaxurl,
                      type: "POST",
                      async: !0,
                      cache: !1,
                      data: { action: "sbi_get_comment_cache" },
                      success: function (t) {
                        jQuery(".sbi_lb-dataContainer")
                          .find(".sbi_loading_comments")
                          .remove(),
                          t.indexOf("{") > -1
                            ? ((t = (t = t.replace(/\\'/g, "'")).replace(
                                /\\'/g,
                                "'"
                              )),
                              (window.sbi.commentCache = JSON.parse(t)),
                              window.sbi.commentCache &&
                              window.sbi.commentCache.hasOwnProperty(s)
                                ? (r.appendExistingComments(),
                                  r.numCommentsOnPage >
                                    window.sbi.commentCache[s][2] &&
                                    r.getRemoteComments(
                                      r.numCommentsOnPage -
                                        window.sbi.commentCache[s][2],
                                      e,
                                      i
                                    ))
                                : r.getRemoteComments("all", e, i))
                            : (window.sbi.commentCache = {});
                      },
                      error: function (t, e, i) {
                        console.log(i);
                      },
                    };
                    jQuery.ajax(n);
                  } else
                    void 0 === window.sbi.commentCache.waiting &&
                      (window.sbi.commentCache &&
                      window.sbi.commentCache.hasOwnProperty(
                        r.postID.replace("sbi_", "")
                      )
                        ? r.appendExistingComments()
                        : r.getRemoteComments("all", e, i));
                }
              }
              void 0 !== this.album[this.currentImageIndex].id
                ? h(
                    this.album[this.currentImageIndex].id,
                    this.album[this.currentImageIndex].accounttype,
                    this.album[this.currentImageIndex].user
                  )
                : setTimeout(function () {
                    void 0 !== this.album[this.currentImageIndex].id &&
                      h(
                        this.album[this.currentImageIndex].id,
                        this.album[this.currentImageIndex].accounttype,
                        this.album[this.currentImageIndex].user
                      );
                  }, 500);
            }
            var l = window.sbi.encodeHTML(
              this.album[this.currentImageIndex].title
            );
            void 0 !== l && "" !== l && (l = l.replace(/(>#)/g, "> #")),
              (l = (l = (l = l ? sbiLinkify(l) : "").replace(
                /(^|\s)#(\w[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC+0-9_]+)|(#[a-я]+)|(#[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+)/gi,
                function (t) {
                  var e = t.trim();
                  return /^#[0-9A-F]{6}$/i.test(e)
                    ? e
                    : ' <a href="https://www.instagram.com/explore/tags/' +
                        e.substring(1) +
                        '/" target="_blank" rel="nofollow noopener">' +
                        e +
                        "</a>";
                }
              )).replace(/[@]+[A-Za-z0-9-_\."<]+/g, function (t) {
                var e = t.trim();
                return -1 == e.indexOf("<br>") && /["<]+/g.test(e)
                  ? e
                  : ' <a href="https://www.instagram.com/' +
                      e.substring(1).replace(/</g, "") +
                      '/" target="_blank" rel="nofollow noopener">' +
                      e.replace(/</g, "") +
                      "</a>";
              })),
              "function" == typeof sbiLightboxAction &&
                setTimeout(function () {
                  sbiLightboxAction();
                }, 100);
            var d = "",
              u = "",
              c = this.album,
              p = this.currentImageIndex;
            void 0 !== this.album[this.currentImageIndex].avatar &&
            "" !== this.album[this.currentImageIndex].avatar &&
            void 0 !== this.album[this.currentImageIndex].user
              ? ((d =
                  "undefined" !== this.album[this.currentImageIndex].avatar
                    ? '<img src="' +
                      this.album[this.currentImageIndex].avatar +
                      '" />'
                    : ""),
                (u =
                  '<a class="sbi_lightbox_username" href="https://www.instagram.com/' +
                  this.album[this.currentImageIndex].user +
                  '/" target="_blank" rel="noopener">' +
                  d +
                  "<p>@" +
                  this.album[this.currentImageIndex].user +
                  "</p></a> "))
              : void 0 !== this.album[this.currentImageIndex].user &&
                jQuery.each(window.sbi.feeds, function () {
                  void 0 !== this.availableAvatarUrls &&
                    void 0 !== this.availableAvatarUrls[c[p].user] &&
                    "undefined" !== this.availableAvatarUrls[c[p].user] &&
                    (d =
                      '<img src="' +
                      this.availableAvatarUrls[c[p].user] +
                      '" />');
                }),
              sbSVGify(jQuery(".sbi_lightbox")),
              this.$lightbox
                .find(".sbi_lb-caption")
                .html(u + '<span class="sbi_caption_text">' + l + "</span>")
                .fadeIn("fast"),
              this.album.length > 1 && this.options.showImageNumberLabel
                ? this.$lightbox
                    .find(".sbi_lb-number")
                    .text(
                      this.options.albumLabel(
                        this.currentImageIndex + 1,
                        this.album.length
                      )
                    )
                    .fadeIn("fast")
                : this.$lightbox.find(".sbi_lb-number").hide(),
              this.$outerContainer.removeClass("animating"),
              this.$lightbox
                .find(".sbi_lb-dataContainer")
                .fadeIn(this.options.resizeDuration, function () {
                  return t.sizeOverlay();
                });
          }),
          (e.prototype.preloadNeighboringImages = function () {
            this.album.length > this.currentImageIndex + 1 &&
              (new Image().src = this.album[this.currentImageIndex + 1].link);
            this.currentImageIndex > 0 &&
              (new Image().src = this.album[this.currentImageIndex - 1].link);
          }),
          (e.prototype.enableKeyboardNav = function () {
            t(document).on(
              "keyup.keyboard",
              t.proxy(this.keyboardAction, this)
            );
          }),
          (e.prototype.disableKeyboardNav = function () {
            t(document).off(".keyboard");
          }),
          (e.prototype.keyboardAction = function (t) {
            var e = function () {
                jQuery(".sbi_lightbox_carousel_icon").remove(),
                  jQuery(
                    "#sbi_lightbox .sbi_lb_lightbox-image, .sbi_lb-image-wrap video"
                  ).remove(),
                  jQuery("#sbi_lightbox .sbi_lb-image-wrap").sbiOwlCarousel(
                    "destroy"
                  ),
                  jQuery("#sbi_lightbox .sbi-owl-item").remove();
              },
              i = event.keyCode,
              s = String.fromCharCode(i).toLowerCase();
            27 === i || s.match(/x|o|c/)
              ? (e(),
                sbi_supports_video() &&
                  void 0 !== jQuery("#sbi_lightbox video.sbi_video")[0] &&
                  jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                jQuery("#sbi_lightbox video.sbi_video").css("opacity", 0),
                jQuery("#sbi_lightbox iframe").attr("src", ""),
                jQuery(".sbi_gdpr_notice").remove(),
                this.end())
              : "p" === s || 37 === i
              ? (0 !== this.currentImageIndex
                  ? this.changeImage(this.currentImageIndex - 1)
                  : this.options.wrapAround &&
                    this.album.length > 1 &&
                    this.changeImage(this.album.length - 1),
                e(),
                sbi_supports_video() &&
                  jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                jQuery("#sbi_lightbox video.sbi_video").css("opacity", 0),
                jQuery("#sbi_lightbox iframe").attr("src", ""),
                jQuery(".sbi_gdpr_notice").remove())
              : ("n" !== s && 39 !== i) ||
                (this.currentImageIndex !== this.album.length - 1
                  ? this.changeImage(this.currentImageIndex + 1)
                  : this.options.wrapAround &&
                    this.album.length > 1 &&
                    this.changeImage(0),
                e(),
                sbi_supports_video() &&
                  jQuery("#sbi_lightbox video.sbi_video")[0].pause(),
                jQuery("#sbi_lightbox video.sbi_video").css("opacity", 0),
                jQuery("#sbi_lightbox iframe").attr("src", ""),
                jQuery(".sbi_gdpr_notice").remove());
          }),
          (e.prototype.end = function () {
            this.disableKeyboardNav(),
              t(window).off("resize", this.sizeOverlay),
              this.$lightbox.fadeOut(this.options.fadeDuration),
              this.$overlay.fadeOut(this.options.fadeDuration),
              t("select, object, embed").css({ visibility: "visible" });
          }),
          e
        );
      })();
    t(function () {
      var t = new e();
      new i(t);
    });
  }.call(this),
    (function (t) {
      function e() {
        var t,
          e,
          i,
          s = s || { VER: "0.9.944" };
        (s.bgs_Available = !1),
          (s.bgs_CheckRunned = !1),
          (function (t) {
            t.fn.extend({
              sbi_imgLiquid: function (e) {
                (this.defaults = {
                  fill: !0,
                  verticalAlign: "center",
                  horizontalAlign: "center",
                  useBackgroundSize: !0,
                  useDataHtmlAttr: !0,
                  responsive: !0,
                  delay: 0,
                  fadeInTime: 0,
                  removeBoxBackground: !0,
                  hardPixels: !0,
                  responsiveCheckTime: 500,
                  timecheckvisibility: 500,
                  onStart: null,
                  onFinish: null,
                  onItemStart: null,
                  onItemFinish: null,
                  onItemError: null,
                }),
                  (function () {
                    if (!s.bgs_CheckRunned) {
                      s.bgs_CheckRunned = !0;
                      var e = t('<span style="background-size:cover" />');
                      t("body").append(e),
                        (function () {
                          var t = e[0];
                          if (t && window.getComputedStyle) {
                            var i = window.getComputedStyle(t, null);
                            i &&
                              i.backgroundSize &&
                              (s.bgs_Available = "cover" === i.backgroundSize);
                          }
                        })(),
                        e.remove();
                    }
                  })();
                var i = this;
                return (
                  (this.options = e),
                  (this.settings = t.extend({}, this.defaults, this.options)),
                  this.settings.onStart && this.settings.onStart(),
                  this.each(function (e) {
                    function n() {
                      (h.responsive || d.data("sbi_imgLiquid_oldProcessed")) &&
                        d.data("sbi_imgLiquid_settings") &&
                        ((h = d.data("sbi_imgLiquid_settings")),
                        (l.actualSize =
                          l.get(0).offsetWidth + l.get(0).offsetHeight / 1e4),
                        l.sizeOld && l.actualSize !== l.sizeOld && a(),
                        (l.sizeOld = l.actualSize),
                        setTimeout(n, h.responsiveCheckTime));
                    }
                    function o() {
                      d.data("sbi_imgLiquid_error", !0),
                        l.addClass("sbi_imgLiquid_error"),
                        h.onItemError && h.onItemError(e, l, d),
                        r();
                    }
                    function a() {
                      var t,
                        i,
                        s,
                        n,
                        o,
                        a,
                        u,
                        c,
                        p = 0,
                        m = 0,
                        f = l.width(),
                        g = l.height();
                      void 0 === d.data("owidth") &&
                        d.data("owidth", d[0].width),
                        void 0 === d.data("oheight") &&
                          d.data("oheight", d[0].height),
                        h.fill === f / g >= d.data("owidth") / d.data("oheight")
                          ? ((t = "100%"),
                            (i = "auto"),
                            (s = Math.floor(f)),
                            (n = Math.floor(
                              f * (d.data("oheight") / d.data("owidth"))
                            )))
                          : ((t = "auto"),
                            (i = "100%"),
                            (s = Math.floor(
                              g * (d.data("owidth") / d.data("oheight"))
                            )),
                            (n = Math.floor(g))),
                        (u = f - s),
                        "left" === (o = h.horizontalAlign.toLowerCase()) &&
                          (m = 0),
                        "center" === o && (m = 0.5 * u),
                        "right" === o && (m = u),
                        -1 !== o.indexOf("%") &&
                          (o = parseInt(o.replace("%", ""), 10)) > 0 &&
                          (m = u * o * 0.01),
                        (c = g - n),
                        "left" === (a = h.verticalAlign.toLowerCase()) &&
                          (p = 0),
                        "center" === a && (p = 0.5 * c),
                        "bottom" === a && (p = c),
                        -1 !== a.indexOf("%") &&
                          (a = parseInt(a.replace("%", ""), 10)) > 0 &&
                          (p = c * a * 0.01),
                        h.hardPixels && ((t = s), (i = n)),
                        d.css({
                          width: t,
                          height: i,
                          "margin-left": Math.floor(m),
                          "margin-top": Math.floor(p),
                        }),
                        d.data("sbi_imgLiquid_oldProcessed") ||
                          (d.fadeTo(h.fadeInTime, 1),
                          d.data("sbi_imgLiquid_oldProcessed", !0),
                          h.removeBoxBackground &&
                            l.css("background-image", "none"),
                          l.addClass("sbi_imgLiquid_nobgSize"),
                          l.addClass("sbi_imgLiquid_ready")),
                        h.onItemFinish && h.onItemFinish(e, l, d),
                        r();
                    }
                    function r() {
                      e === i.length - 1 &&
                        i.settings.onFinish &&
                        i.settings.onFinish();
                    }
                    var h = i.settings,
                      l = t(this),
                      d = t("img:first", l);
                    return d.length
                      ? (d.data("sbi_imgLiquid_settings")
                          ? (l
                              .removeClass("sbi_imgLiquid_error")
                              .removeClass("sbi_imgLiquid_ready"),
                            (h = t.extend(
                              {},
                              d.data("sbi_imgLiquid_settings"),
                              i.options
                            )))
                          : (h = t.extend(
                              {},
                              i.settings,
                              (function () {
                                var t = {};
                                if (i.settings.useDataHtmlAttr) {
                                  var e = l.attr("data-sbi_imgLiquid-fill"),
                                    n = l.attr(
                                      "data-sbi_imgLiquid-horizontalAlign"
                                    ),
                                    o = l.attr(
                                      "data-sbi_imgLiquid-verticalAlign"
                                    );
                                  ("true" === e || "false" === e) &&
                                    (t.fill = Boolean("true" === e)),
                                    void 0 === n ||
                                      ("left" !== n &&
                                        "center" !== n &&
                                        "right" !== n &&
                                        -1 === n.indexOf("%")) ||
                                      (t.horizontalAlign = n),
                                    void 0 === o ||
                                      ("top" !== o &&
                                        "bottom" !== o &&
                                        "center" !== o &&
                                        -1 === o.indexOf("%")) ||
                                      (t.verticalAlign = o);
                                }
                                return (
                                  s.isIE &&
                                    i.settings.ieFadeInDisabled &&
                                    (t.fadeInTime = 0),
                                  t
                                );
                              })()
                            )),
                        d.data("sbi_imgLiquid_settings", h),
                        h.onItemStart && h.onItemStart(e, l, d),
                        void (s.bgs_Available && h.useBackgroundSize
                          ? (-1 ===
                              l
                                .css("background-image")
                                .indexOf(encodeURI(d.attr("src"))) &&
                              l.css({
                                "background-image":
                                  'url("' + encodeURI(d.attr("src")) + '")',
                              }),
                            l.css({
                              "background-size": h.fill ? "cover" : "contain",
                              "background-position": (
                                h.horizontalAlign +
                                " " +
                                h.verticalAlign
                              ).toLowerCase(),
                              "background-repeat": "no-repeat",
                              "padding-bottom": 0,
                            }),
                            t("a:first", l).css({
                              display: "block",
                              width: "100%",
                              height: "100%",
                            }),
                            t("img", l).css({ display: "none" }),
                            h.onItemFinish && h.onItemFinish(e, l, d),
                            l.addClass("sbi_imgLiquid_bgSize"),
                            l.addClass("sbi_imgLiquid_ready"),
                            r())
                          : (function i() {
                              if (
                                d.data("oldSrc") &&
                                d.data("oldSrc") !== d.attr("src")
                              ) {
                                var s = d.clone().removeAttr("style");
                                return (
                                  s.data(
                                    "sbi_imgLiquid_settings",
                                    d.data("sbi_imgLiquid_settings")
                                  ),
                                  d.parent().prepend(s),
                                  d.remove(),
                                  ((d = s)[0].width = 0),
                                  void setTimeout(i, 10)
                                );
                              }
                              return d.data("sbi_imgLiquid_oldProcessed")
                                ? void a()
                                : (d.data("sbi_imgLiquid_oldProcessed", !1),
                                  d.data("oldSrc", d.attr("src")),
                                  t("img:not(:first)", l).css(
                                    "display",
                                    "none"
                                  ),
                                  l.css({ overflow: "hidden" }),
                                  d
                                    .fadeTo(0, 0)
                                    .removeAttr("width")
                                    .removeAttr("height")
                                    .css({
                                      visibility: "visible",
                                      "max-width": "none",
                                      "max-height": "none",
                                      width: "auto",
                                      height: "auto",
                                      display: "block",
                                    }),
                                  d.on("error", o),
                                  (d[0].onerror = o),
                                  (function t() {
                                    d.data("sbi_imgLiquid_error") ||
                                      d.data("sbi_imgLiquid_loaded") ||
                                      d.data("sbi_imgLiquid_oldProcessed") ||
                                      (l.is(":visible") &&
                                      d[0].complete &&
                                      d[0].width > 0 &&
                                      d[0].height > 0
                                        ? (d.data("sbi_imgLiquid_loaded", !0),
                                          setTimeout(a, e * h.delay))
                                        : setTimeout(t, h.timecheckvisibility));
                                  })(),
                                  void n());
                            })()))
                      : void o();
                  })
                );
              },
            });
          })(jQuery),
          (t = s.injectCss),
          (e = document.getElementsByTagName("head")[0]),
          ((i = document.createElement("style")).type = "text/css"),
          i.styleSheet
            ? (i.styleSheet.cssText = t)
            : i.appendChild(document.createTextNode(t)),
          e.appendChild(i);
      }
      function i() {
        (this.feeds = {}), (this.options = sb_instagram_js_options);
      }
      function s(t, e, i) {
        (this.el = t),
          (this.index = e),
          (this.settings = i),
          (this.minImageWidth = 0),
          (this.imageResolution = 150),
          (this.resizedImages = {}),
          (this.needsResizing = []),
          (this.outOfPages = !1),
          (this.page = 1),
          (this.isInitialized = !1);
      }
      function n(e, i, n) {
        s.call(this, e, i, n),
          (this.initLayout = function () {
            var e = this,
              i = t(this.el),
              s = "grid",
              a = n.cols,
              r = n.general.colsmobile;
            if (
              ((this.$header = !1),
              i.find(".sb_instagram_header").length
                ? (this.$header = i.find(".sb_instagram_header"))
                : i.prev(".sb_instagram_header").length &&
                  (this.$header = i.prev(".sb_instagram_header")),
              (this.storyData = !1),
              !1 !== this.$header &&
                void 0 !== this.$header.attr("data-story-data") &&
                ((this.storyData = JSON.parse(
                  this.$header.attr("data-story-data")
                )),
                (this.storyAvatar =
                  void 0 !== this.$header.attr("data-story-avatar")
                    ? this.$header.attr("data-story-avatar")
                    : ""),
                (this.storyWait =
                  void 0 !== this.$header.attr("data-story-wait")
                    ? this.$header.attr("data-story-wait")
                    : ""),
                this.$header.addClass("sbi_story"),
                this.$header
                  .find(".sbi_new_logo")
                  .replaceWith('<span class="sbi_new_logo"></span>'),
                this.$header
                  .find(".sbi_header_link")
                  .attr(
                    "data-lightbox-sbi",
                    "story" + i.attr("data-sbi-index")
                  )),
              void 0 !== n.general.moderationLink &&
                (i.prepend(
                  '<a href="javascript:void(0);" class="sbi_moderation_link"><svg class="svg-inline--fa fa-edit fa-w-18" style="max-width: 24px;" aria-hidden="true" data-fa-processed="" data-prefix="far" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>Moderate feed</a>'
                ),
                i.find(".sbi_moderation_link").on("click", function () {
                  var t = i.attr("data-sbi-index"),
                    e = window.location.href;
                  (t = t.substring(0, 10)),
                    -1 == e.indexOf("sbi_moderation_mode=true") &&
                      (e.indexOf("?") > -1
                        ? (e +=
                            "&sbi_moderation_mode=true&sbi_moderation_index=" +
                            t)
                        : (e +=
                            "?sbi_moderation_mode=true&sbi_moderation_index=" +
                            t)),
                    (window.location.href = e);
                })),
              void 0 !== e.settings.general.mediavine &&
                i.addClass("sbi_mediavine"),
              void 0 !== e.settings.general.modindex)
            ) {
              i.css({ width: "100%", height: "100%", background: "#fff" }),
                i.find("#sbi_images").css({ padding: "5px" }),
                i.addClass("sbi_moderation_mode"),
                (e.settings.general.autoscroll = !1),
                (e.settings.general.captionlinks = !1);
              var h = i.attr("data-sbi-index");
              parseInt(e.settings.general.modindex) === parseInt(h) ||
              i.hasClass("sbi_mod_merged") ||
              jQuery(".sbi").length < 2
                ? (o.setStatus(!0), i.find(".sbi_moderation_link").remove())
                : o.setStatus(!1),
                !0 === o.status &&
                  ((o.$self = i),
                  o.$self.hasClass("sbi_mod_merged") ||
                    (void 0 !== e.settings.general.whiteListName &&
                      o.setWhiteListData(
                        n.general.whiteListName,
                        n.general.whiteListIDs
                      ),
                    void 0 !== e.settings.general.hidePhotos &&
                      (o.dbHidePhotos = n.general.hidePhotos)),
                  o.mergeDBAndSelected()),
                jQuery(".sbi_moderation_link").on("click", function () {
                  var t = "b";
                  t =
                    void 0 !==
                    jQuery(this).closest(".sbi").attr("data-sbi-index")
                      ? jQuery(this).closest(".sbi").attr("data-sbi-index")
                      : "noclass";
                  var e = window.location.href;
                  (t = t.substring(0, 10)),
                    -1 == e.indexOf("sbi_moderation_mode=true") &&
                      (e.indexOf("?") > -1
                        ? (e +=
                            "&sbi_moderation_mode=true&sbi_moderation_index=" +
                            t)
                        : (e +=
                            "?sbi_moderation_mode=true&sbi_moderation_index=" +
                            t)),
                    (window.location.href = e);
                });
            } else
              void 0 !== e.settings.general.carousel
                ? (s = "carousel")
                : void 0 !== e.settings.general.highlight
                ? (s = "highlight")
                : void 0 !== e.settings.general.masonry && (s = "masonry");
            if (((this.layout = s), "carousel" === s)) {
              i
                .find("#sbi_images")
                .addClass("sbi_carousel")
                .attr("role", "carousel"),
                i.find(".sbi_load_btn").remove(),
                i.find(".sbi_item").css({
                  "padding-top": i.find("#sbi_images").css("padding-top"),
                  "padding-right": i.find("#sbi_images").css("padding-top"),
                  "padding-bottom": i.find("#sbi_images").css("padding-top"),
                  "padding-left": i.find("#sbi_images").css("padding-top"),
                }),
                i.find(".sbi_item").each(function () {
                  t(this).attr(
                    "style",
                    t(this)
                      .attr("style")
                      .replace(
                        "padding: " + i.find("#sbi_images").css("padding-top"),
                        "padding: " +
                          i.find("#sbi_images").css("padding-top") +
                          " !important"
                      )
                  );
                });
              var l = e.settings.general.carousel[0],
                d = e.settings.general.carousel[1],
                u = e.settings.general.carousel[2],
                c = e.settings.general.carousel[3],
                p = e.settings.general.carousel[4],
                m = e.settings.general.carousel[5];
              u || (c = !1);
              var f = a,
                g = a,
                _ = ((l = l ? "onhover" : "hide"), (u = !1 !== c), 2 == m);
              p = !p;
              i.hasClass("sbi_mob_col_auto")
                ? ((f = 2),
                  2 != parseInt(a) && (g = 1),
                  2 == parseInt(a) && (g = 2))
                : (g = r),
                (this.carouselArgs = {
                  items: a,
                  loop: p,
                  rewind: !p,
                  autoplay: u,
                  autoplayTimeout: Math.max(c, 2e3),
                  autoplayHoverPause: !0,
                  nav: !0,
                  navText: [
                    '<i class="fa fa-chevron-left"></i>',
                    '<i class="fa fa-chevron-right"></i>',
                  ],
                  dots: d,
                  owl2row: _,
                  responsive: {
                    0: { items: g },
                    480: { items: f },
                    640: { items: a },
                  },
                  onChange: function () {
                    setTimeout(function () {
                      e.afterResize();
                    }, 250);
                  },
                  onInitialize: function () {
                    var t = jQuery(e.el);
                    t.find("#sbi_images.sbi_carousel").fadeIn(),
                      setTimeout(function () {
                        t.find(
                          "#sbi_images.sbi_carousel .sbi_info, .sbi_owl2row-item,#sb_instagram #sbi_images.sbi_carousel"
                        ).fadeIn();
                      }, 50),
                      setTimeout(function () {
                        var e = t.find(".sbi-owl-nav");
                        if ("onhover" === l);
                        else if ("below" === l) {
                          var i = t.find(".ctf-owl-dots"),
                            s = t.find(".ctf-owl-prev"),
                            n = t.find(".ctf-owl-next"),
                            o = t.find(".ctf-owl-nav"),
                            a = t.find(".ctf-owl-dot"),
                            r = a.length * a.innerWidth();
                          t.innerWidth(),
                            s.after(i),
                            o.css("position", "relative"),
                            n
                              .css("position", "absolute")
                              .css("top", "-6px")
                              .css(
                                "right",
                                Math.max(
                                  0.5 * o.innerWidth() -
                                    0.5 * r -
                                    n.innerWidth() -
                                    6,
                                  0
                                )
                              ),
                            s
                              .css("position", "absolute")
                              .css("top", "-6px")
                              .css(
                                "left",
                                Math.max(
                                  0.5 * o.innerWidth() -
                                    0.5 * r -
                                    s.innerWidth() -
                                    6,
                                  0
                                )
                              );
                        } else "hide" === l && e.addClass("hide").hide();
                        "svg" === window.sb_instagram_js_options.font_method &&
                          sbSVGify(t.find("#sbi_images.sbi_carousel"));
                      }, 100);
                  },
                });
            } else
              ("highlight" !== s && "masonry" !== s) ||
                ("highlight" === s
                  ? i.addClass("sbi_highlight")
                  : (i.addClass("sbi_masonry"),
                    (this.settings.autoMinRes = 150)),
                i.find("#sbi_images").data("smashotope") &&
                  i.find("#sbi_images").smashotope("layout"),
                (this.isotopeArgs = {
                  itemSelector: ".sbi_item",
                  layoutMode: "packery",
                  transitionDuration: 0,
                  resizable: !1,
                }));
            var b = jQuery.Event("sbiafterlayoutinit");
            (b.feed = this),
              jQuery(window).trigger(b),
              "highlight" === this.layout || "masonry" === this.layout
                ? this.smashotopeInit()
                : "carousel" === this.layout &&
                  (i.find(".sbi_carousel").sbiOwlCarousel(this.carouselArgs),
                  2 === parseInt(n.general.carousel[5]) &&
                    i.addClass("sbi_carousel_2_row"));
          }),
          (this.appendNewPosts = function (e) {
            var i = t(this.el);
            i.find("#sbi_images .sbi_item").length
              ? i.find("#sbi_images .sbi_item").last().after(e)
              : i.find("#sbi_images").append(e),
              ("highlight" !== this.layout && "masonry" !== this.layout) ||
                this.appendSmashotope();
          }),
          (this.setImageHeight = function () {
            var e = t(this.el);
            if (!e.hasClass("sbi_masonry")) {
              var i = e.find(".sbi_photo").eq(0).innerWidth(),
                s = this.getColumnCount(),
                n =
                  e.find("#sbi_images").innerWidth() -
                  e.find("#sbi_images").width(),
                o = n / 2;
              (sbi_photo_width_manual = e.find("#sbi_images").width() / s - n),
                e.find(".sbi_photo").css("height", i),
                e.find(".sbi-owl-nav").length &&
                  setTimeout(function () {
                    var t = 2;
                    e.find(".sbi_owl2row-item").length && (t = 1);
                    var i = e.find(".sbi_photo").eq(0).innerWidth() / t;
                    (i += parseInt(o) * (2 - t + 2)),
                      e.find(".sbi-owl-nav div").css("top", i);
                  }, 100);
            }
            "highlight" === this.layout
              ? this.setHighlight()
              : "masonry" === this.layout && this.setMasonry(),
              ("highlight" !== this.layout && "masonry" !== this.layout) ||
                this.smashotopeInit();
          }),
          (this.smashotopeInit = function () {
            var e = t(this.el),
              i = e.find("#sbi_images"),
              s = ".sbi_item",
              n = this.getColumnCount();
            "highlight" === this.layout && (s = i.width() / n);
            i = e.find("#sbi_images");
            (this.isotopeArgs.masonry = { columnWidth: s }),
              i.smashotope(this.isotopeArgs);
          }),
          (this.setHighlight = function () {
            var e = t(this.el),
              i = this.settings.general.highlight,
              s = e.innerWidth(),
              n =
                parseInt(
                  e.find("#sbi_images").outerWidth() -
                    e.find("#sbi_images").width()
                ) / 2,
              o = this.getColumnCount(),
              a = s - n * (o + 2);
            e.hasClass("sbi_fixed_height") && (a -= 24);
            var r = a / o,
              h = "object" == typeof i ? i[0] : "",
              l = "pattern" === h ? parseInt(i[2]) : 0,
              d =
                e.find("#sbi_images").css("padding").indexOf(".") > -1 ? 1 : 0;
            1 !== o || e.hasClass("sbi_mob_col_auto")
              ? (2 * r > a &&
                  (e.hasClass("sbi_mob_col_auto") && (o = 2),
                  (r = (a = s - n * (o + 2)) / o)),
                e.find(".sbi_item").each(function (t) {
                  var e = !1;
                  if ("pattern" === h)
                    (t === l || (t > l && t % parseInt(i[1]) == 0)) && (e = !0);
                  else if ("hashtag" === h) {
                    var s = (s = i[3]).split("|"),
                      o = jQuery(this).find(".sbi_photo img").attr("alt");
                    s.length > 0 &&
                      jQuery.each(s, function (t, i) {
                        var s = " " + o + " ",
                          n = encodeURI(i.trim().toLowerCase()).replace(
                            / /g,
                            "%20"
                          ),
                          a = encodeURI(s.toLowerCase().replace("#", " #")),
                          r = new RegExp("%20#" + n + "\\b");
                        (a = (a = a.replace(/#/g, "%20#")).replace(
                          /%E2%A0%80%0A/g,
                          "%20"
                        )),
                          r.test(a) && (e = !0);
                      });
                  } else if ("id" === h) {
                    var a = (a = i[4].replace(/ /g, "")).split("|"),
                      u = jQuery(this).attr("id").replace("sbi_", "").trim();
                    a.indexOf(u) > -1 && (e = !0);
                  } else e = jQuery(this).hasClass("sbi_highlighted");
                  e
                    ? (jQuery(this).css({
                        height: 2 * r - d + "px",
                        width: 2 * r - d + "px",
                      }),
                      jQuery(this)
                        .find(".sbi_photo")
                        .css({ height: 2 * r + "px" }))
                    : (jQuery(this).css({
                        width: r - n + "px",
                        height: r - n + "px",
                      }),
                      jQuery(this)
                        .find(".sbi_photo")
                        .css({ height: r - n + "px" }));
                }))
              : e.find(".sbi_item").each(function (t) {
                  jQuery(this).css({
                    width: r - n + "px",
                    height: r - n + "px",
                  }),
                    jQuery(this)
                      .find(".sbi_photo")
                      .css({ height: r - n + "px" });
                });
          }),
          (this.setMasonry = function () {
            var e = t(this.el),
              i = e.innerWidth(),
              s =
                parseInt(
                  e.find("#sbi_images").outerWidth() -
                    e.find("#sbi_images").width()
                ) / 2,
              n = this.getColumnCount(),
              o = (i - s * (n + 2)) / n;
            e.find("#sbi_images").css("padding").indexOf(".");
            e.find(".sbi_item").each(function (t) {
              jQuery(this).css({ width: o - s + "px" });
            });
          }),
          (this.appendSmashotope = function () {
            ($self = t(this.el)),
              $self.find("#sbi_images").data("smashotope") &&
                $self
                  .find("#sbi_images")
                  .smashotope("appended", jQuery(".sbi_new"));
          }),
          (this.bindLoadMoreOnScroll = function () {
            var e = this,
              i = t(this.el),
              s = Math.max(1, this.settings.general.autoscroll),
              n = 0;
            i.hasClass("sbi_fixed_height")
              ? i.on("scroll.instagram-feed", function () {
                  var t = i.scrollTop(),
                    o = i.innerHeight();
                  t > i[0].scrollHeight - s - o &&
                    (i.unbind("scroll.instagram-feed"),
                    0 === n && ((n = 1), e.getNewPostSet()));
                })
              : jQuery(window).on("scroll.instagram-feed", function () {
                  var t = window.pageYOffset,
                    i = window.innerHeight;
                  t > document.body.offsetHeight - s - i &&
                    (jQuery(window).unbind("scroll.instagram-feed"),
                    0 === n && ((n = 1), e.getNewPostSet()));
                });
          }),
          (this.revealNewImages = function () {
            var e = t(this.el),
              i = this;
            e.find(".sbi-screenreader").each(function () {
              t(this).find("img").remove();
            }),
              "function" == typeof sbi_custom_js &&
                setTimeout(function () {
                  sbi_custom_js();
                }, 100),
              "masonry" !== this.layout
                ? this.applyImageLiquid()
                : e.find(".sbi_photo").css({
                    "background-image": "",
                    "background-size": "",
                    "background-position": "",
                    "background-repeat": "",
                    opacity: 1,
                    height: "auto",
                    "padding-bottom": 0,
                  }),
              e
                .find(".sbi_item")
                .find(".sbi_link_area")
                .attr("data-lightbox-sbi", e.attr("data-sbi-index")),
              e.find(".sbi_item.sbi_js_load_disabled").length &&
                e.find(".sbi_item.sbi_js_load_disabled").addClass("sbi_new"),
              e.find(".sbi_item.sbi_new").each(function (e) {
                t(this).hasClass("sbi_js_load_disabled") &&
                  t(this).removeClass("sbi_js_load_disabled");
                var s = jQuery(this),
                  n = s.find(".sbi_link_area");
                !0 === o.status &&
                  s.append(o.addModHtml("", s.attr("id").replace("sbi_", "")));
                var a =
                    void 0 !== i.settings.general.disablelightbox &&
                    i.settings.general.disablelightbox,
                  r =
                    void 0 !== i.settings.general.captionlinks &&
                    i.settings.general.captionlinks;
                void 0 === window.sbi.touchDevice
                  ? s
                      .find(".sbi_photo")
                      .on("mouseenter mouseleave", function (t) {
                        switch (t.type) {
                          case "mouseenter":
                            jQuery(this).fadeTo(200, 0.85);
                            break;
                          case "mouseleave":
                            jQuery(this).stop().fadeTo(500, 1);
                        }
                      })
                  : a ||
                    r ||
                    (s.find(".sbi_photo_wrap").prepend(n),
                    s.find(".sbi_link").remove());
                var h = jQuery("#sbi_lightbox");
                if (
                  (s.find(".sbi_lightbox_link").on("click", function () {
                    h.removeClass("sbi_video_lightbox"),
                      s.hasClass("sbi_type_video") &&
                        (h.addClass("sbi_video_lightbox"),
                        jQuery(".sbi_video").attr({
                          poster: jQuery(this).attr("href"),
                        }));
                  }),
                  s.find(".sbi_info .sbi_caption").length)
                ) {
                  var l = s.find(".sbi_info .sbi_caption"),
                    d =
                      void 0 !== i.settings.general.captionlength
                        ? parseInt(i.settings.general.captionlength)
                        : 50;
                  d < 1 && (d = 99999);
                  var u = void 0 !== l ? l.html() : "",
                    c = (u.match(/<br>/g) || []).length;
                  if (
                    (void 0 === sb_instagram_js_options.br_adjust ||
                      "1" === sb_instagram_js_options.br_adjust ||
                      !0 === sb_instagram_js_options.br_adjust) &&
                    c > 0 &&
                    u.indexOf("<br>") < d
                  ) {
                    var p = l.closest(".sbi_caption_wrap").css("padding-left"),
                      m =
                        l.closest(".sbi_caption_wrap").width() -
                        2 * parseInt(p),
                      f = l.css("font-size"),
                      g = (m / parseInt(f)) * 1.85,
                      _ = Math.floor(g),
                      b = Math.ceil(d / g),
                      v = u.split("<br>"),
                      y = 0,
                      w = 0;
                    jQuery.each(v, function () {
                      var t = b - y;
                      if (t > 0) {
                        var e = Math.max(1, Math.ceil(this.length / g));
                        (w += Math.min(this.length + 4, t * _)), (y += e);
                      }
                    }),
                      (d = w);
                  }
                  var x = u.substring(0, d);
                  l.html(x),
                    u.length > d && s.find(".sbi_expand").show(),
                    s
                      .find(".sbi_expand a")
                      .off("click")
                      .on("click", function (t) {
                        t.preventDefault();
                        jQuery(this);
                        s.hasClass("sbi_caption_full")
                          ? (l.html(x), s.removeClass("sbi_caption_full"))
                          : (l.html(u), s.addClass("sbi_caption_full")),
                          i.afterResize();
                      });
                }
                if (a || r) {
                  if (r) {
                    var C = "";
                    void 0 !== s.find(".sbi_link_area").attr("data-title")
                      ? (C = s.find(".sbi_link_area").attr("data-title"))
                      : void 0 !== s.find("img").attr("alt")
                      ? (C = s.find("img").attr("alt"))
                      : void 0 !== s.find("video").attr("alt") &&
                        (C = s.find("video").attr("alt"));
                    var I = C.match(
                      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g
                    );
                    I && s.find("a").attr("href", I);
                  }
                  s.find(".sbi_link").addClass("sbi_disable_lightbox"),
                    s.find(".sbi_playbtn").prependTo(s.find(".sbi_photo"));
                } else {
                  var z = s.find(".sbi_photo_wrap"),
                    j = z.find(".sbi_link");
                  (feedOptions = { hovereffect: "true" }),
                    "none" == feedOptions.hovereffect
                      ? (j.css("background", "none").show(),
                        j.find("*").hide().end().find(".sbi_link_area").show())
                      : z.on("mouseenter mouseleave", function (t) {
                          switch (t.type) {
                            case "mouseenter":
                              s.addClass("sbi_animate");
                              break;
                            case "mouseleave":
                              s.removeClass("sbi_animate");
                          }
                        });
                }
              }),
              jQuery(".sbi_lightbox_action a")
                .off()
                .on("click", function () {
                  jQuery(this).parent().find(".sbi_lightbox_tooltip").toggle();
                }),
              setTimeout(function () {
                if (
                  (jQuery("#sbi_images .sbi_item.sbi_new").removeClass(
                    "sbi_new"
                  ),
                  e.hasClass("sbi_masonry") ||
                    e.hasClass("sbi_highlight") ||
                    e.find(".sbi_carousel").length)
                ) {
                  if (!e.find(".sbi_carousel").length) {
                    e.hasClass("sbi_highlight");
                    var t = e.hasClass("sbi_masonry");
                    e.find("#sbi_images").data("smashotope") &&
                      e.find("#sbi_images").smashotope("layout");
                    var i = 0;
                    t &&
                      ((i = 1e3), e.find("#sbi_images").smashotope("layout")),
                      setTimeout(function () {
                        e.find("#sbi_images").smashotope("layout");
                        var t = 10;
                        e.find(".sbi_transition").each(function () {
                          var e = jQuery(this);
                          setTimeout(function () {
                            e.removeClass("sbi_transition");
                          }, t),
                            (t += 10);
                        });
                      }, i),
                      setTimeout(function () {
                        e.find("#sbi_images").smashotope("layout");
                      }, 1500),
                      setTimeout(function () {
                        e.find("#sbi_images").smashotope("layout");
                      }, 2e3);
                  }
                } else {
                  var s = 10;
                  e.find(".sbi_transition").each(function () {
                    var t = jQuery(this);
                    setTimeout(function () {
                      t.removeClass("sbi_transition");
                    }, s),
                      (s += 10);
                  });
                }
                e.find(".sbi_carousel") &&
                  setTimeout(function () {
                    var t = 10;
                    e.find(".sbi_transition").each(function () {
                      var e = jQuery(this);
                      setTimeout(function () {
                        e.removeClass("sbi_transition");
                      }, t),
                        (t += 10);
                    });
                  }, 100);
              }, 500),
              !0 === o.status &&
                (o.$self.hasClass("sbi_mod_merged") ||
                  (o.setOriginalPosition(), o.resizeFeed()),
                setTimeout(function () {
                  o.$self.find(".sbi_item .sbi_photo").each(function () {
                    jQuery(this).hasClass("sbi_mod_changed") ||
                      (jQuery(this).on("click", function (t) {
                        o.changeClickEvent(jQuery(this), t);
                      }),
                      jQuery(this).addClass("sbi_mod_changed"));
                  }),
                    setTimeout(function () {
                      o.addModSettingsHtml(),
                        o.$self
                          .find(".sbi_mod_submit_mod")
                          .hasClass("sbi_initialized") ||
                          o.$self
                            .find(".sbi_mod_submit_mod")
                            .on("click", function () {
                              o.submitSelected();
                            }),
                        o.$self
                          .find(".sbi_mod_submit_mod")
                          .addClass("sbi_initialized"),
                        o.$self
                          .find(".sbi_hide_show_radio")
                          .on("click", function () {
                            o.updateHideOrShow(jQuery(this).val()),
                              o.updateDisplay();
                          }),
                        o.$self.find(".sbi_mod_block_user").each(function () {
                          jQuery(this).hasClass("sbi_mod_changed") ||
                            (jQuery(this).on("click", function () {
                              o.updateBlockUser(jQuery(this)),
                                o.updateDisplay();
                            }),
                            jQuery(this).addClass("sbi_mod_changed"));
                        }),
                        o.$self.find(".sbi_close_mod").on("click", function () {
                          o.closeMod();
                        }),
                        o.replaceInfoHtml(),
                        o.updateDisplay(),
                        o.$self.addClass("sbi_mod_merged"),
                        o.$self.find(".sbi_info").removeClass("sbi_info"),
                        o.initClickCopy(),
                        i.afterResize();
                    }, 600);
                }, 350)),
              "carousel" !== i.layout &&
                void 0 !== i.settings.general.autoscroll &&
                !1 !== i.settings.general.autoscroll &&
                this.bindLoadMoreOnScroll();
          });
      }
      (i.prototype = {
        createPage: function (e, i) {
          (void 0 !== window.sbiajaxurl &&
            -1 !== window.sbiajaxurl.indexOf(window.location.hostname)) ||
            (window.sbiajaxurl =
              location.protocol +
              "//" +
              window.location.hostname +
              "/wp-admin/admin-ajax.php"),
            t(".sbi_no_js_error_message").remove(),
            t(".sbi_no_js").removeClass("sbi_no_js"),
            e(i);
        },
        createFeeds: function (e) {
          e.whenFeedsCreated(
            t(".sbi").each(function (e) {
              t(this).attr("data-sbi-index", e + 1);
              var i = t(this),
                s =
                  void 0 !== i.attr("data-sbi-flags")
                    ? i.attr("data-sbi-flags").split(",")
                    : [],
                o =
                  void 0 !== i.attr("data-options")
                    ? JSON.parse(i.attr("data-options"))
                    : {};
              if (s.indexOf("testAjax") > -1) {
                window.sbi.triggeredTest = !0;
                a({ action: "sbi_on_ajax_test_trigger" }, function (t) {
                  console.log("did test");
                });
              }
              var r = {
                cols: i.attr("data-cols"),
                colsmobile:
                  void 0 !== i.attr("data-colsmobile") &&
                  "same" !== i.attr("data-colsmobile")
                    ? i.attr("data-colsmobile")
                    : i.attr("data-cols"),
                num: i.attr("data-num"),
                imgRes: i.attr("data-res"),
                feedID: i.attr("data-feedid"),
                postID:
                  "undefind" != typeof i.attr("data-postid")
                    ? i.attr("data-postid")
                    : "unknown",
                shortCodeAtts: i.attr("data-shortcode-atts"),
                resizingEnabled: -1 === s.indexOf("resizeDisable"),
                imageLoadEnabled: -1 === s.indexOf("imageLoadDisable"),
                debugEnabled: s.indexOf("debug") > -1,
                favorLocal: s.indexOf("favorLocal") > -1,
                ajaxPostLoad: s.indexOf("ajaxPostLoad") > -1,
                gdpr: s.indexOf("gdpr") > -1,
                consentGiven: -1 === s.indexOf("gdpr"),
                locator: s.indexOf("locator") > -1,
                overrideBlockCDN: s.indexOf("overrideBlockCDN") > -1,
                disableMobileHover: !0,
                autoMinRes: 1,
                general: o,
              };
              (window.sbi.feeds[e] = (function (t, e, i) {
                return new n(t, e, i);
              })(this, e, r)),
                window.sbi.feeds[e].setResizedImages(),
                window.sbi.feeds[e].init();
              var h = jQuery.Event("sbiafterfeedcreate");
              (h.feed = window.sbi.feeds[e]),
                jQuery(window).trigger(h),
                -1 === s.indexOf("disableOnTouch") &&
                  window.addEventListener(
                    "touchstart",
                    function e() {
                      void 0 === window.sbi.touchDevice &&
                        ((window.sbi.touchDevice = !0),
                        t(".sbi_item").each(function () {
                          var t = jQuery(this);
                          t
                            .find(".sbi_link")
                            .hasClass("sbi_disable_lightbox") ||
                            (t
                              .find(".sbi_photo_wrap")
                              .prepend(t.find(".sbi_link_area")),
                            t.find(".sbi_link").remove());
                        })),
                        window.removeEventListener("touchstart", e, !1);
                    },
                    !1
                  );
            })
          );
        },
        afterFeedsCreated: function () {
          t(".sb_instagram_header").each(function () {
            var e = t(this);
            e.find(".sbi_header_link").on(
              "mouseenter mouseleave",
              function (t) {
                switch (t.type) {
                  case "mouseenter":
                    e.find(".sbi_header_img_hover").addClass("sbi_fade_in");
                    break;
                  case "mouseleave":
                    e.find(".sbi_header_img_hover").removeClass("sbi_fade_in");
                }
              }
            );
          });
        },
        encodeHTML: function (t) {
          return void 0 === t
            ? ""
            : t
                .replace(/(>)/g, "&gt;")
                .replace(/(<)/g, "&lt;")
                .replace(/(&lt;br\/&gt;)/g, "<br>")
                .replace(/(&lt;br&gt;)/g, "<br>");
        },
        urlDetect: function (t) {
          return t.match(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g
          );
        },
      }),
        (s.prototype = {
          init: function () {
            var e = this;
            (e.settings.consentGiven = e.checkConsent()),
              t(this.el).find(".sbi_photo").parent("p").length &&
                t(this.el).addClass("sbi_no_autop"),
              t(this.el).find("#sbi_mod_error").length &&
                t(this.el).prepend(t(this.el).find("#sbi_mod_error")),
              this.settings.ajaxPostLoad
                ? this.getNewPostSet()
                : this.afterInitialImagesLoaded();
            var i,
              s =
                ((i = 0),
                function (t, e) {
                  clearTimeout(i), (i = setTimeout(t, e));
                });
            jQuery(window).on("resize", function () {
              s(function () {
                e.afterResize();
              }, 500);
            }),
              t(this.el)
                .find(".sbi_item")
                .each(function () {
                  e.lazyLoadCheck(t(this));
                });
          },
          initLayout: function () {},
          afterInitialImagesLoaded: function () {
            this.initLayout(),
              this.loadMoreButtonInit(),
              this.hideExtraImagesForWidth(),
              this.beforeNewImagesRevealed(),
              this.revealNewImages(),
              this.afterNewImagesRevealed();
          },
          afterResize: function () {
            this.setImageHeight(),
              this.setImageResolution(),
              this.maybeRaiseImageResolution(),
              this.setImageSizeClass();
          },
          afterLoadMoreClicked: function (t) {
            t.find(".sbi_loader").removeClass("sbi_hidden"),
              t.find(".sbi_btn_text").addClass("sbi_hidden"),
              t
                .closest(".sbi")
                .find(".sbi_num_diff_hide")
                .addClass("sbi_transition")
                .removeClass("sbi_num_diff_hide");
          },
          afterNewImagesLoaded: function () {
            var e = t(this.el),
              i = this;
            this.beforeNewImagesRevealed(),
              this.revealNewImages(),
              this.afterNewImagesRevealed(),
              setTimeout(function () {
                e.find(".sbi_loader").addClass("sbi_hidden"),
                  e.find(".sbi_btn_text").removeClass("sbi_hidden"),
                  i.maybeRaiseImageResolution();
              }, 500);
          },
          beforeNewImagesRevealed: function () {
            this.setImageHeight(),
              this.maybeRaiseImageResolution(!0),
              this.setImageSizeClass();
          },
          revealNewImages: function () {
            var e = t(this.el);
            e.find(".sbi-screenreader").each(function () {
              t(this).find("img").remove();
            }),
              "function" == typeof sbi_custom_js &&
                setTimeout(function () {
                  sbi_custom_js();
                }, 100),
              this.applyImageLiquid(),
              e.find(".sbi_item").each(function (t) {
                jQuery(this)
                  .find(".sbi_photo")
                  .hover(
                    function () {
                      jQuery(this).fadeTo(200, 0.85);
                    },
                    function () {
                      jQuery(this).stop().fadeTo(500, 1);
                    }
                  );
              }),
              setTimeout(function () {
                jQuery("#sbi_images .sbi_item.sbi_new").removeClass("sbi_new");
                var t = 10;
                e.find(".sbi_transition").each(function () {
                  var e = jQuery(this);
                  setTimeout(function () {
                    e.removeClass("sbi_transition");
                  }, t),
                    (t += 10);
                });
              }, 500);
          },
          lazyLoadCheck: function (e) {
            if (
              e.find(".sbi_photo").length &&
              !e.closest(".sbi").hasClass("sbi-no-ll-check")
            ) {
              var i = this.getImageUrls(e),
                s =
                  void 0 !== i[640]
                    ? i[640]
                    : e.find(".sbi_photo").attr("data-full-res");
              if (!this.settings.consentGiven && s.indexOf("scontent") > -1)
                return;
              e.find(".sbi_photo img").each(function () {
                s &&
                  void 0 !== t(this).attr("data-src") &&
                  t(this).attr("data-src", s),
                  s &&
                    void 0 !== t(this).attr("data-orig-src") &&
                    t(this).attr("data-orig-src", s),
                  t(this).on("load", function () {
                    !t(this).hasClass("sbi-replaced") &&
                      t(this).attr("src").indexOf("placeholder") > -1 &&
                      (t(this).addClass("sbi-replaced"),
                      s &&
                        (t(this).attr("src", s),
                        t(this).closest(".sbi_imgLiquid_bgSize").length &&
                          t(this)
                            .closest(".sbi_imgLiquid_bgSize")
                            .css("background-image", "url(" + s + ")")));
                  });
              });
            }
          },
          afterNewImagesRevealed: function () {
            this.listenForVisibilityChange(),
              this.sendNeedsResizingToServer(),
              this.settings.imageLoadEnabled ||
                t(".sbi_no_resraise").removeClass("sbi_no_resraise");
            var e = t.Event("sbiafterimagesloaded");
            (e.el = t(this.el)), t(window).trigger(e);
          },
          setResizedImages: function () {
            t(this.el).find(".sbi_resized_image_data").length &&
              void 0 !==
                t(this.el)
                  .find(".sbi_resized_image_data")
                  .attr("data-resized") &&
              0 ===
                t(this.el)
                  .find(".sbi_resized_image_data")
                  .attr("data-resized")
                  .indexOf('{"') &&
              ((this.resizedImages = JSON.parse(
                t(this.el).find(".sbi_resized_image_data").attr("data-resized")
              )),
              t(this.el).find(".sbi_resized_image_data").remove());
          },
          sendNeedsResizingToServer: function () {
            var e = this;
            if (e.needsResizing.length > 0 && e.settings.resizingEnabled) {
              var i = t(this.el).find(".sbi_item").length,
                s =
                  void 0 !== e.settings.general.cache_all &&
                  e.settings.general.cache_all;
              a(
                {
                  action: "sbi_resized_images_submit",
                  needs_resizing: e.needsResizing,
                  offset: i,
                  feed_id: e.settings.feedID,
                  atts: e.settings.shortCodeAtts,
                  location: e.locationGuess(),
                  post_id: e.settings.postID,
                  cache_all: s,
                },
                function (t) {
                  if (0 === t.trim().indexOf("{")) {
                    var i = JSON.parse(t);
                    for (var s in (e.settings.debugEnabled && console.log(i),
                    i))
                      i.hasOwnProperty(s) && (e.resizedImages[s] = i[s]);
                    e.maybeRaiseImageResolution(),
                      setTimeout(function () {
                        e.afterResize();
                      }, 500);
                  }
                }
              );
            } else if (e.settings.locator) {
              a(
                {
                  action: "sbi_do_locator",
                  feed_id: e.settings.feedID,
                  atts: e.settings.shortCodeAtts,
                  location: e.locationGuess(),
                  post_id: e.settings.postID,
                },
                function (t) {}
              );
            }
          },
          loadMoreButtonInit: function () {
            var e = t(this.el),
              i = this;
            e.find("#sbi_load .sbi_load_btn")
              .off()
              .on("click", function () {
                i.afterLoadMoreClicked(jQuery(this)), i.getNewPostSet();
              });
          },
          getNewPostSet: function () {
            var e = t(this.el),
              i = this;
            i.page++;
            a(
              {
                action: "sbi_load_more_clicked",
                offset: e.find(".sbi_item").length,
                page: i.page,
                feed_id: i.settings.feedID,
                atts: i.settings.shortCodeAtts,
                location: i.locationGuess(),
                post_id: i.settings.postID,
                current_resolution: i.imageResolution,
              },
              function (s) {
                if (0 === s.trim().indexOf("{")) {
                  var n = JSON.parse(s);
                  i.settings.debugEnabled && console.log(n),
                    i.appendNewPosts(n.html),
                    i.addResizedImages(n.resizedImages),
                    i.settings.ajaxPostLoad
                      ? ((i.settings.ajaxPostLoad = !1),
                        i.afterInitialImagesLoaded())
                      : i.afterNewImagesLoaded(),
                    n.feedStatus.shouldPaginate
                      ? (i.outOfPages = !1)
                      : ((i.outOfPages = !0), e.find(".sbi_load_btn").hide()),
                    t(".sbi_no_js").removeClass("sbi_no_js");
                }
              }
            );
          },
          appendNewPosts: function (e) {
            var i = t(this.el);
            i.find("#sbi_images .sbi_item").length
              ? i.find("#sbi_images .sbi_item").last().after(e)
              : i.find("#sbi_images").append(e);
          },
          addResizedImages: function (t) {
            for (var e in t) this.resizedImages[e] = t[e];
          },
          setImageHeight: function () {
            var e = t(this.el),
              i = e.find(".sbi_photo").eq(0).innerWidth(),
              s = this.getColumnCount(),
              n =
                e.find("#sbi_images").innerWidth() -
                e.find("#sbi_images").width(),
              o = n / 2;
            (sbi_photo_width_manual = e.find("#sbi_images").width() / s - n),
              e.find(".sbi_photo").css("height", i),
              e.find(".sbi-owl-nav").length &&
                setTimeout(function () {
                  var t = 2;
                  e.find(".sbi_owl2row-item").length && (t = 1);
                  var i = e.find(".sbi_photo").eq(0).innerWidth() / t;
                  (i += parseInt(o) * (2 - t + 2)),
                    e.find(".sbi-owl-nav div").css("top", i);
                }, 100);
          },
          maybeRaiseSingleImageResolution: function (e, i, s) {
            var n = this,
              o = n.getImageUrls(e),
              a = e.find(".sbi_photo img").attr("src"),
              r = 150,
              h = e.find("img").get(0),
              l =
                a === window.sbi.options.placeholder
                  ? 1
                  : h.naturalWidth / h.naturalHeight;
            s = void 0 !== s && s;
            if (
              !(
                e.hasClass("sbi_no_resraise") ||
                e.hasClass("sbi_had_error") ||
                (e.find(".sbi_link_area").length &&
                  e.find(".sbi_link_area").hasClass("sbi_had_error"))
              )
            )
              if (o.length < 1)
                e.find(".sbi_link_area").length &&
                  e
                    .find(".sbi_link_area")
                    .attr(
                      "href",
                      window.sbi.options.placeholder.replace(
                        "placeholder.png",
                        "thumb-placeholder.png"
                      )
                    );
              else {
                ((e.find(".sbi_link_area").length &&
                  e.find(".sbi_link_area").attr("href") ===
                    window.sbi.options.placeholder.replace(
                      "placeholder.png",
                      "thumb-placeholder.png"
                    )) ||
                  !n.settings.consentGiven) &&
                  e.find(".sbi_link_area").attr("href", o[o.length - 1]),
                  void 0 !== o[640] &&
                    e.find(".sbi_photo").attr("data-full-res", o[640]),
                  t.each(o, function (t, e) {
                    e === a && ((r = parseInt(t)), (s = !1));
                  });
                var d = 640;
                switch (n.settings.imgRes) {
                  case "thumb":
                    d = 150;
                    break;
                  case "medium":
                    d = 320;
                    break;
                  case "full":
                    d = 640;
                    break;
                  default:
                    var u = Math.max(
                        n.settings.autoMinRes,
                        e.find(".sbi_photo").innerWidth()
                      ),
                      c = n.getBestResolutionForAuto(u, l, e);
                    switch (c) {
                      case 320:
                        d = 320;
                        break;
                      case 150:
                        d = 150;
                    }
                }
                if (d > r || a === window.sbi.options.placeholder || s) {
                  if (n.settings.debugEnabled) {
                    var p =
                      a === window.sbi.options.placeholder
                        ? "was placeholder"
                        : "too small";
                    console.log("rais res for " + a, p);
                  }
                  var m = o[d].split("?ig_cache_key")[0];
                  if (
                    (a !== m &&
                      (e.find(".sbi_photo img").attr("src", m),
                      e
                        .find(".sbi_photo")
                        .css("background-image", 'url("' + m + '")')),
                    (r = d),
                    "auto" === n.settings.imgRes)
                  ) {
                    var f = !1;
                    e.find(".sbi_photo img").on("load", function () {
                      var i = t(this),
                        s = i.get(0).naturalWidth / i.get(0).naturalHeight;
                      if (1e3 !== i.get(0).naturalWidth && s > l && !f) {
                        switch (
                          (n.settings.debugEnabled &&
                            console.log(
                              "rais res again for aspect ratio change " + a
                            ),
                          (f = !0),
                          (u = e.find(".sbi_photo").innerWidth()),
                          (c = n.getBestResolutionForAuto(u, s, e)),
                          (d = 640),
                          c)
                        ) {
                          case 320:
                            d = 320;
                            break;
                          case 150:
                            d = 150;
                        }
                        d > r &&
                          ((m = o[d].split("?ig_cache_key")[0]),
                          i.attr("src", m),
                          i
                            .closest(".sbi_photo")
                            .css("background-image", 'url("' + m + '")')),
                          ("masonry" !== n.layout &&
                            "highlight" !== n.layout) ||
                            (t(n.el)
                              .find("#sbi_images")
                              .smashotope(n.isotopeArgs),
                            setTimeout(function () {
                              t(n.el)
                                .find("#sbi_images")
                                .smashotope(n.isotopeArgs);
                            }, 500));
                      } else if (n.settings.debugEnabled) {
                        var h = f
                          ? "already checked"
                          : "no aspect ratio change";
                        console.log("not raising res for replacement  " + a, h);
                      }
                    });
                  }
                }
                e.find("img").on("error", function () {
                  if (t(this).hasClass("sbi_img_error"))
                    console.log("unfixed error " + t(this).attr("src"));
                  else {
                    var e;
                    if (
                      (t(this).addClass("sbi_img_error"),
                      t(this).attr("src").indexOf("media/?size=") > -1 ||
                        t(this).attr("src").indexOf("cdninstagram") > -1 ||
                        t(this).attr("src").indexOf("fbcdn") > -1)
                    )
                      (n.settings.favorLocal = !0),
                        void 0 !==
                          (e = n.getImageUrls(
                            t(this).closest(".sbi_item")
                          ))[640] &&
                          (t(this).attr("src", e[640]),
                          t(this)
                            .closest(".sbi_photo")
                            .css("background-image", "url(" + e[640] + ")"),
                          t(this)
                            .closest(".sbi_item")
                            .addClass("sbi_had_error")
                            .find(".sbi_link_area")
                            .attr("href", e[640])
                            .addClass("sbi_had_error"));
                    else if (
                      "undefined" !==
                      t(this).closest(".sbi_photo").attr("data-img-src-set")
                    )
                      void 0 !==
                        (e = JSON.parse(
                          t(this)
                            .closest(".sbi_photo")
                            .attr("data-img-src-set")
                            .replace(/\\\//g, "/")
                        )).d &&
                        (t(this).attr("src", e.d),
                        t(this)
                          .closest(".sbi_photo")
                          .css("background-image", "url(" + e.d + ")"),
                        t(this)
                          .closest(".sbi_item")
                          .addClass("sbi_had_error")
                          .find(".sbi_link_area")
                          .attr("href", e[640])
                          .addClass("sbi_had_error"));
                    setTimeout(function () {
                      n.afterResize();
                    }, 1500);
                  }
                });
              }
          },
          maybeRaiseImageResolution: function (e) {
            var i = this,
              s = void 0 !== e && !0 === e ? ".sbi_item.sbi_new" : ".sbi_item",
              n = !i.isInitialized;
            t(i.el)
              .find(s)
              .each(function (e) {
                !t(this).hasClass("sbi_num_diff_hide") &&
                  t(this).find(".sbi_photo").length &&
                  void 0 !==
                    t(this).find(".sbi_photo").attr("data-img-src-set") &&
                  i.maybeRaiseSingleImageResolution(t(this), e, n);
              }),
              (i.isInitialized = !0);
          },
          getBestResolutionForAuto: function (e, i, s) {
            (isNaN(i) || i < 1) && (i = 1);
            var n = e * i,
              o = 10 * Math.ceil(n / 10),
              a = [150, 320, 640];
            if (
              (s.hasClass("sbi_highlighted") && (o *= 2),
              -1 === a.indexOf(parseInt(o)))
            ) {
              var r = !1;
              t.each(a, function (t, e) {
                e > parseInt(o) && !r && ((o = e), (r = !0));
              });
            }
            return o;
          },
          hideExtraImagesForWidth: function () {
            if ("carousel" !== this.layout) {
              var e = t(this.el),
                i =
                  void 0 !== e.attr("data-num") && "" !== e.attr("data-num")
                    ? parseInt(e.attr("data-num"))
                    : 1,
                s =
                  void 0 !== e.attr("data-nummobile") &&
                  "" !== e.attr("data-nummobile")
                    ? parseInt(e.attr("data-nummobile"))
                    : i;
              t(window).width() < 480
                ? s < e.find(".sbi_item").length &&
                  e
                    .find(".sbi_item")
                    .slice(s - e.find(".sbi_item").length)
                    .addClass("sbi_num_diff_hide")
                : i < e.find(".sbi_item").length &&
                  e
                    .find(".sbi_item")
                    .slice(i - e.find(".sbi_item").length)
                    .addClass("sbi_num_diff_hide");
            }
          },
          setImageSizeClass: function () {
            var e = t(this.el);
            e.removeClass("sbi_small sbi_medium");
            var i = e.innerWidth(),
              s =
                parseInt(
                  e.find("#sbi_images").outerWidth() -
                    e.find("#sbi_images").width()
                ) / 2,
              n = this.getColumnCount(),
              o = (i - s * (n + 2)) / n;
            o > 120 && o < 240
              ? e.addClass("sbi_medium")
              : o <= 120 && e.addClass("sbi_small");
          },
          setMinImageWidth: function () {
            t(this.el).find(".sbi_item .sbi_photo").first().length
              ? (this.minImageWidth = t(this.el)
                  .find(".sbi_item .sbi_photo")
                  .first()
                  .innerWidth())
              : (this.minImageWidth = 150);
          },
          setImageResolution: function () {
            if ("auto" === this.settings.imgRes) this.imageResolution = "auto";
            else
              switch (this.settings.imgRes) {
                case "thumb":
                  this.imageResolution = 150;
                  break;
                case "medium":
                  this.imageResolution = 320;
                  break;
                default:
                  this.imageResolution = 640;
              }
          },
          getImageUrls: function (t) {
            var e = JSON.parse(
                t
                  .find(".sbi_photo")
                  .attr("data-img-src-set")
                  .replace(/\\\//g, "/")
              ),
              i = t.attr("id").replace("sbi_", "");
            if (
              (this.settings.consentGiven ||
                this.settings.overrideBlockCDN ||
                (e = []),
              void 0 !== this.resizedImages[i] &&
                "video" !== this.resizedImages[i] &&
                "pending" !== this.resizedImages[i] &&
                "error" !== this.resizedImages[i].id &&
                "video" !== this.resizedImages[i].id &&
                "pending" !== this.resizedImages[i].id)
            ) {
              if (void 0 !== this.resizedImages[i].sizes) {
                var s = [];
                void 0 !== this.resizedImages[i].sizes.full &&
                  ((e[640] =
                    sb_instagram_js_options.resized_url +
                    this.resizedImages[i].id +
                    "full.jpg"),
                  s.push(640)),
                  void 0 !== this.resizedImages[i].sizes.low &&
                    ((e[320] =
                      sb_instagram_js_options.resized_url +
                      this.resizedImages[i].id +
                      "low.jpg"),
                    s.push(320)),
                  void 0 !== this.resizedImages[i].sizes.thumb &&
                    (s.push(150),
                    (e[150] =
                      sb_instagram_js_options.resized_url +
                      this.resizedImages[i].id +
                      "thumb.jpg")),
                  this.settings.favorLocal &&
                    (-1 === s.indexOf(640) &&
                      s.indexOf(320) > -1 &&
                      (e[640] =
                        sb_instagram_js_options.resized_url +
                        this.resizedImages[i].id +
                        "low.jpg"),
                    -1 === s.indexOf(320) &&
                      (s.indexOf(640) > -1
                        ? (e[320] =
                            sb_instagram_js_options.resized_url +
                            this.resizedImages[i].id +
                            "full.jpg")
                        : s.indexOf(150) > -1 &&
                          (e[320] =
                            sb_instagram_js_options.resized_url +
                            this.resizedImages[i].id +
                            "thumb.jpg")),
                    -1 === s.indexOf(150) &&
                      (s.indexOf(320) > -1
                        ? (e[150] =
                            sb_instagram_js_options.resized_url +
                            this.resizedImages[i].id +
                            "low.jpg")
                        : s.indexOf(640) > -1 &&
                          (e[150] =
                            sb_instagram_js_options.resized_url +
                            this.resizedImages[i].id +
                            "full.jpg")));
              }
            } else
              (void 0 === this.resizedImages[i] ||
                (void 0 !== this.resizedImages[i].id &&
                  "pending" !== this.resizedImages[i].id &&
                  "error" !== this.resizedImages[i].id)) &&
                this.addToNeedsResizing(i);
            return e;
          },
          getAvatarUrl: function (t, e) {
            if ("" === t) return "";
            var i = this.settings.general.avatars;
            return "local" === (e = void 0 !== e ? e : "local")
              ? void 0 !== i["LCL" + t] && 1 === parseInt(i["LCL" + t])
                ? sb_instagram_js_options.resized_url + t + ".jpg"
                : void 0 !== i[t]
                ? i[t]
                : ""
              : void 0 !== i[t]
              ? i[t]
              : void 0 !== i["LCL" + t] && 1 === parseInt(i["LCL" + t])
              ? sb_instagram_js_options.resized_url + t + ".jpg"
              : "";
          },
          addToNeedsResizing: function (t) {
            -1 === this.needsResizing.indexOf(t) && this.needsResizing.push(t);
          },
          applyImageLiquid: function () {
            var i = t(this.el);
            e(),
              "function" == typeof i.find(".sbi_photo").sbi_imgLiquid &&
                i.find(".sbi_photo").sbi_imgLiquid({ fill: !0 });
          },
          listenForVisibilityChange: function () {
            var e,
              i,
              s,
              n = this;
            (e = jQuery),
              (i = {
                callback: function () {},
                runOnLoad: !0,
                frequency: 100,
                sbiPreviousVisibility: null,
              }),
              (s = {
                sbiCheckVisibility: function (t, e) {
                  if (jQuery.contains(document, t[0])) {
                    var i = e.sbiPreviousVisibility,
                      n = t.is(":visible");
                    (e.sbiPreviousVisibility = n),
                      null == i
                        ? e.runOnLoad && e.callback(t, n)
                        : i !== n && e.callback(t, n),
                      setTimeout(function () {
                        s.sbiCheckVisibility(t, e);
                      }, e.frequency);
                  }
                },
              }),
              (e.fn.sbiVisibilityChanged = function (t) {
                var n = e.extend({}, i, t);
                return this.each(function () {
                  s.sbiCheckVisibility(e(this), n);
                });
              }),
              "function" ==
                typeof t(this.el).filter(":hidden").sbiVisibilityChanged &&
                t(this.el)
                  .filter(":hidden")
                  .sbiVisibilityChanged({
                    callback: function (t, e) {
                      n.afterResize();
                    },
                    runOnLoad: !1,
                  });
          },
          getColumnCount: function () {
            var e = t(this.el),
              i = this.settings.cols,
              s = this.settings.colsmobile,
              n = i;
            return (
              (sbiWindowWidth = window.innerWidth),
              e.hasClass("sbi_mob_col_auto")
                ? (sbiWindowWidth < 640 &&
                    parseInt(i) > 2 &&
                    parseInt(i) < 7 &&
                    (n = 2),
                  sbiWindowWidth < 640 &&
                    parseInt(i) > 6 &&
                    parseInt(i) < 11 &&
                    (n = 4),
                  sbiWindowWidth <= 480 && parseInt(i) > 2 && (n = 1))
                : sbiWindowWidth <= 480 && (n = s),
              parseInt(n)
            );
          },
          checkConsent: function () {
            if (this.settings.consentGiven || !this.settings.gdpr) return !0;
            if ("undefined" != typeof CLI_Cookie)
              null !== CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME) &&
                (this.settings.consentGiven =
                  "yes" ===
                  CLI_Cookie.read("cookielawinfo-checkbox-non-necessary"));
            else if (void 0 !== window.cnArgs) {
              var t = ("; " + document.cookie).split(
                "; cookie_notice_accepted="
              );
              if (2 === t.length) {
                var e = t.pop().split(";").shift();
                this.settings.consentGiven = "true" === e;
              }
            } else
              void 0 !== window.cookieconsent
                ? (this.settings.consentGiven =
                    "allow" ===
                    (function (t) {
                      for (
                        var e = t + "=",
                          i = window.document.cookie.split(";"),
                          s = 0;
                        s < i.length;
                        s++
                      ) {
                        var n = i[s].trim();
                        if (0 == n.indexOf(e))
                          return n.substring(e.length, n.length);
                      }
                      return "";
                    })("complianz_consent_status"))
                : void 0 !== window.Cookiebot
                ? (this.settings.consentGiven = Cookiebot.consented)
                : void 0 !== window.BorlabsCookie &&
                  (this.settings.consentGiven =
                    window.BorlabsCookie.checkCookieConsent("instagram"));
            var i = jQuery.Event("sbicheckconsent");
            return (
              (i.feed = this),
              jQuery(window).trigger(i),
              this.settings.consentGiven
            );
          },
          afterConsentToggled: function () {
            if (this.checkConsent()) {
              var t = this;
              t.maybeRaiseImageResolution(),
                setTimeout(function () {
                  t.afterResize();
                }, 500);
            }
          },
          locationGuess: function () {
            var e = t(this.el),
              i = "content";
            return (
              e.closest("footer").length
                ? (i = "footer")
                : e.closest(".header").length || e.closest("header").length
                ? (i = "header")
                : (e.closest(".sidebar").length || e.closest("aside").length) &&
                  (i = "sidebar"),
              i
            );
          },
        });
      var o = {
        status: !1,
        usingDB: !0,
        $self: jQuery(".sbi_moderation_mode"),
        originalParent: jQuery(".sbi_moderation_mode").parent(),
        hideOrShow: "hide",
        dbHidePhotos: [],
        dbBlockUsers: [],
        dbWhiteList: [],
        whiteListIndex: "",
        selectedHide: [],
        selectedShow: [],
        selectedUsers: [],
        isPermanent: !1,
        isPermanentDb: !1,
        setStatus: function (t) {
          this.status = t;
        },
        setPermanent: function (t, e) {
          (this.isPermanent = void 0 !== t),
            (this.isPermanentDb = void 0 !== e);
        },
        setUsingDB: function (t) {
          this.usingDB = t;
        },
        setSelf: function (t) {
          t.hasClass("sbi")
            ? (this.$self = t)
            : (this.$self = t.closest(".sbi"));
        },
        setOriginalPosition: function () {
          this.originalParent = this.$self.parent();
        },
        updateHideOrShow: function (t) {
          (this.hideOrShow = t), o.afterTypeChange(t);
        },
        afterTypeChange: function (t) {
          "show" === t
            ? (jQuery("#sbi_mod_permanent_toggle")
                .closest(".sbi_mod_row")
                .slideDown(),
              (jQuery("#sbi_mod_permanent_toggle").is(":checked") ||
                o.isPermanentDb) &&
                jQuery("#sb_mod_is_permanent_warning").slideDown())
            : (jQuery("#sbi_mod_permanent_toggle")
                .closest(".sbi_mod_row")
                .slideUp(),
              jQuery("#sb_mod_is_permanent_warning").slideUp());
        },
        mergeDBAndSelected: function () {
          if (!this.$self.hasClass("sbi_mod_merged")) {
            for (var t = 0; t < o.dbHidePhotos.length; t++)
              "" == o.dbHidePhotos[t] && o.dbHidePhotos.splice(t, 1);
            for (t = 0; t < o.dbHidePhotos.length; t++)
              -1 ==
                o.selectedHide.indexOf(o.dbHidePhotos[t].replace("sbi_", "")) &&
                o.selectedHide.push(o.dbHidePhotos[t].replace("sbi_", ""));
            for (t = 0; t < o.dbWhiteList.length; t++)
              "" == o.dbWhiteList[t] && o.dbWhiteList.splice(t, 1);
            for (t = 0; t < o.dbWhiteList.length; t++)
              -1 ==
                o.selectedShow.indexOf(o.dbWhiteList[t].replace("sbi_", "")) &&
                o.selectedShow.push(o.dbWhiteList[t].replace("sbi_", ""));
            for (t = 0; t < o.dbBlockUsers.length; t++)
              "" == o.dbBlockUsers[t] && o.dbBlockUsers.splice(t, 1);
            for (t = 0; t < o.dbBlockUsers.length; t++)
              -1 == o.selectedUsers.indexOf(o.dbBlockUsers[t]) &&
                o.selectedUsers.push(o.dbBlockUsers[t]);
          }
        },
        setWhiteListData: function (t, e) {
          (this.whiteListIndex = t), (this.dbWhiteList = e);
        },
        updateBlockUser: function (t) {
          var e = t.val();
          t.is(":checked")
            ? o.selectedUsers.indexOf(e) < 0 && o.selectedUsers.push(e)
            : o.selectedUsers.splice(o.selectedUsers.indexOf(e), 1);
        },
        addModSettingsHtml: function () {
          if (!this.$self.find(".sbi_mod_mode_wrapper").length) {
            var t =
                '<a href="javascript:void(0);" class="sbi_mod_submit_mod"><i class="fa fa-check-circle"></i> Save Settings</a>',
              e = "",
              i = "";
            o.isPermanent &&
              (o.isPermanentDb && (i = " checked"),
              (e =
                '<div id="sb_mod_is_permanent_warning" class="sbi_mod_new_white_list sbi_warning" style="display: block;"><p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> This feed is permanent. Uncheck the setting above and remove the shortcode setting <b>permanent=true</b> before updating your white list.</p></div>')),
              o.$self
                .append(
                  '<div class="sbi_mod_mode_wrapper sbi_mod_mode_wrapper_bottom">' +
                    t +
                    "</div>"
                )
                .find(".sb_instagram_header")
                .before(
                  '<div class="sbi_mod_mode_wrapper"><a href="javascript:void(0);" class="sbi_close_mod" style="display: block;"><i class="fa fa-times"></i> Exit moderation mode</a><p class="sbi_mod_type_header">Moderation Type</p><div class="sbi_mod_row"><input id="sbi_hide_show" name="sbi_hide_show" type="radio" value="hide" class="sbi_hide_show_radio" checked> <label for="sbi_hide_show">Hide selected posts</label></div><div class="sbi_mod_row"><input id="sbi_hs_show" name="sbi_hide_show" type="radio" value="show" class="sbi_hide_show_radio"> <label for="sbi_hs_show">Only show selected posts (create a "White List")</label></div><div class="sbi_mod_row" style="margin-top: 15px; font-size: 12px;"><input id="sbi_mod_permanent_toggle" name="sbi_mod_permanent_toggle" type="checkbox" value="1" class=""' +
                    i +
                    '> <label for="sbi_mod_permanent_toggle">This is a permanent white list (never needs to update)</label></div>' +
                    t +
                    '<div class="sbi_mod_row" style="margin-top: 15px; font-size: 12px;"><input id="sbi_mod_id_toggle" name="sbi_mod_id_toggle" type="checkbox" value="show" class=""> <label for="sbi_mod_id_toggle">Show post ID under image</label></div>' +
                    e +
                    "</div>"
                ),
              "" !== this.whiteListIndex &&
                (o.$self.find("#sbi_hs_show").prop("checked", !0),
                (o.hideOrShow = "show")),
              o.updateHideOrShow(o.hideOrShow);
          }
          jQuery("body").append(
            '<p class="sbi_mod_saved"><i class="fa fa-check"></i> Saved</p>'
          );
        },
        addModHtml: function (t, e) {
          return (
            '<div class="sbi_mod"><span class="sbi_mod_user sbi_mod_id"><input type="text" value="' +
            e +
            '" readonly></span></div>'
          );
        },
        toggleID: function (t) {
          t.is(":checked")
            ? (jQuery(".sbi_mod_id_toggle").prop("checked", !0),
              jQuery(".sbi_mod_id").show())
            : (jQuery(".sbi_mod_id_toggle").prop("checked", !1),
              jQuery(".sbi_mod_id").hide());
        },
        initClickCopy: function () {
          jQuery(".sbi_mod_user input").on("click", function () {
            jQuery(this).trigger("select");
          }),
            jQuery("#sbi_mod_id_toggle").on("click", function () {
              o.toggleID(jQuery(this));
            }),
            o.toggleID(jQuery("#sbi_mod_id_toggle").first());
        },
        closeMod: function () {
          var t = window.location.href;
          t.indexOf("sbi_moderation_mode=true") > -1 &&
            (t = (t = t.replace("?sbi_moderation_mode=true", "")).replace(
              "&sbi_moderation_mode=true",
              ""
            )),
            t.indexOf("sbi_moderation_index=") > -1 &&
              (t = t.split("&sbi_moderation_index=")[0]),
            (window.location.href = t);
        },
        resizeFeed: function () {
          o.$self.closest("body").css("position", "relative").prepend(o.$self);
        },
        replaceInfoHtml: function () {
          o.$self.find(".sbi_mod").each(function () {
            jQuery(this)
              .closest(".sbi_item")
              .find(".sbi_info")
              .html(jQuery(this)),
              jQuery(this).children().css("font-size", "14px");
          });
        },
        styleImage: function (t, e) {
          "hide" == e
            ? t
                .append(
                  '<span class="sbi_mod_post_status sbi_mod_exclude"><i class="fa fa-times"></i></span>'
                )
                .css("outline", "3px solid #e5593d")
            : t
                .append(
                  '<span class="sbi_mod_post_status sbi_mod_include"><i class="fa fa-check"></i></span>'
                )
                .css("outline", "3px solid #4e9c2b");
        },
        changeClickEvent: function (t, e) {
          e.preventDefault();
          var i = t.closest(".sbi_item").attr("id").replace("sbi_", "");
          "hide" === o.hideOrShow
            ? -1 === o.selectedUsers.indexOf("") &&
              (o.selectedHide.indexOf(i) > -1
                ? o.selectedHide.splice(o.selectedHide.indexOf(i), 1)
                : o.selectedHide.push(i))
            : o.selectedShow.indexOf(i) > -1
            ? o.selectedShow.splice(o.selectedShow.indexOf(i), 1)
            : o.selectedShow.push(i),
            o.updateDisplay(o.$self);
        },
        updateDisplay: function () {
          o.$self
            .find(".sbi_photo")
            .css("outline", "")
            .find(".sbi_mod_post_status")
            .remove();
          var t = o.selectedUsers;
          o.$self.find(".sbi_item").each(function () {
            var e = jQuery(this).find(".sbi_mod_user").text(),
              i = jQuery(this).find(".sbi_photo");
            if (t.indexOf(e) > -1)
              o.styleImage(i, "hide"),
                i
                  .closest(".sbi_item")
                  .find(".sbi_mod_block_user")
                  .prop("checked", !0);
            else {
              i.closest(".sbi_item")
                .find(".sbi_mod_block_user")
                .prop("checked", !1);
              var s = jQuery(this).attr("id").replace("sbi_", ""),
                n = "sbi_" + s;
              "hide" === o.hideOrShow
                ? (o.selectedHide.indexOf(s) > -1 ||
                    o.selectedHide.indexOf(n) > -1) &&
                  o.styleImage(i, "hide")
                : (o.selectedShow.indexOf(s) > -1 ||
                    o.selectedShow.indexOf(n) > -1) &&
                  o.styleImage(i, "show");
            }
          }),
            sbSVGify(o.$self);
        },
        ajaxSubmit: function () {
          if (
            (o.$self.find(".sbi_mod_submit_mod").next("span").remove(),
            o.$self
              .fadeTo("fast", 0.3)
              .find(".sbi_mod_submit_mod")
              .attr("disabled", "true"),
            "hide" === o.hideOrShow)
          ) {
            o.$self.find(".sbi_mod_new_white_list").hide();
            var t = {
              ids: o.selectedHide,
              blocked_users: o.selectedUsers,
              action: "sbi_update_mod_mode_settings",
            };
            jQuery.ajax({
              url: sbiajaxurl,
              type: "post",
              data: t,
              success: function (t) {
                setTimeout(function () {
                  o.$self.fadeTo(500, 1),
                    o.$self.find(".sbi_mod_submit_mod").prop("disabled", !1);
                }, 500),
                  jQuery(".sbi_mod_saved").fadeIn(),
                  setTimeout(function () {
                    jQuery(".sbi_mod_saved").fadeOut();
                  }, 3e3);
              },
            });
          } else {
            t = {
              ids: o.selectedShow,
              db_index: o.whiteListIndex,
              blocked_users: o.selectedUsers,
              permanent: jQuery("#sbi_mod_permanent_toggle").is(":checked"),
              action: "sbi_update_mod_mode_white_list",
            };
            jQuery.ajax({
              url: sbiajaxurl,
              type: "post",
              data: t,
              success: function (t) {
                t.length &&
                  (o.$self.find(".sbi_mod_new_white_list").remove(),
                  o.$self
                    .find(".sbi_mod_submit_mod")
                    .after(
                      '<div class="sbi_mod_new_white_list" style="display: block;"><p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this shortcode to apply your white list:</p><code>[instagram-feed <span style="font-weight: bold;">whitelist="' +
                        t +
                        '"</span>]</code></div>'
                    ),
                  (o.whiteListIndex = t)),
                  setTimeout(function () {
                    o.$self.find(".sbi_mod_new_white_list").show(),
                      o.$self.css("opacity", 1),
                      o.$self.find(".sbi_mod_submit_mod").prop("disabled", !0);
                  }, 500),
                  jQuery(".sbi_mod_saved").fadeIn(),
                  setTimeout(function () {
                    jQuery(".sbi_mod_saved").fadeOut();
                  }, 3e3);
              },
            });
          }
        },
        showOnPageSubmit: function () {
          if (
            (o.$self.find(".sbi_mod_submit_mod").next("span").remove(),
            o.$self.find(".sbi_mod_submit_mod").attr("disabled", "true"),
            "hide" === o.hideOrShow)
          ) {
            if (
              (o.$self.find(".sbi_mod_new_white_list").hide(),
              (i = {
                ids: o.selectedHide,
                blocked_users: o.selectedUsers,
                action: "sbi_update_mod_mode_settings",
              }).ids.length || i.blocked_users.length)
            ) {
              var t = i.ids.join(", "),
                e = i.blocked_users.join(", ");
              o.$self.find(".sbi_mod_new_white_list").remove(),
                o.$self
                  .find(".sbi_mod_submit_mod")
                  .after(
                    '<div class="sbi_mod_new_white_list" style="display: block;"><p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sb_instagram_hide_photos</strong> setting</p><code><strong>' +
                      t +
                      '</strong></code></div><div class="sbi_mod_new_white_list" style="display: block;"><p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sb_instagram_block_users</strong> setting</p><code><strong>' +
                      e +
                      "</strong></code></div>"
                  );
            }
            o.$self.find(".sbi_mod_new_white_list").show(),
              o.$self.find(".sbi_mod_submit_mod").prop("disabled", !1);
          } else {
            var i;
            if (
              (i = {
                ids: o.selectedShow,
                db_index: o.whiteListIndex,
                blocked_users: o.selectedUsers,
                action: "sbi_update_mod_mode_white_list",
              }).ids.length ||
              i.blocked_users.length
            ) {
              (t = i.ids.join(", ")), (e = i.blocked_users.join(", "));
              o.$self.find(".sbi_mod_new_white_list").remove(),
                o.$self
                  .find(".sbi_mod_submit_mod")
                  .after(
                    '<div class="sbi_mod_new_white_list" style="display: block;"><p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sbiWhiteListIds</strong> setting</p><code><strong>' +
                      t +
                      '</strong></code></div><div class="sbi_mod_new_white_list" style="display: block;"><p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sb_instagram_block_users</strong> setting</p><code><strong>' +
                      e +
                      "</strong></code></div>"
                  );
            }
            o.$self.find(".sbi_mod_new_white_list").show(),
              o.$self.find(".sbi_mod_submit_mod").prop("disabled", !1);
          }
        },
        submitSelected: function () {
          o.usingDB ? o.ajaxSubmit() : o.showOnPageSubmit();
        },
      };
      function a(e, i) {
        t.ajax({ url: sbiajaxurl, type: "post", data: e, success: i });
      }
      (n.prototype = Object.create(s.prototype)),
        (window.sbi_init = function () {
          (window.sbi = new i()),
            window.sbi.createPage(window.sbi.createFeeds, {
              whenFeedsCreated: window.sbi.afterFeedsCreated,
            });
        });
    })(jQuery),
    jQuery(document).ready(function (t) {
      void 0 === window.sb_instagram_js_options &&
        (window.sb_instagram_js_options = {
          font_method: "svg",
          resized_url:
            location.protocol +
            "//" +
            window.location.hostname +
            "/wp-content/uploads/sb-instagram-feed-images/",
          placeholder:
            location.protocol +
            "//" +
            window.location.hostname +
            "/wp-content/plugins/instagram-feed/img/placeholder.png",
          br_adjust: "",
        }),
        void 0 !== window.sb_instagram_js_options.resized_url &&
          -1 ===
            window.sb_instagram_js_options.resized_url.indexOf(
              location.protocol
            ) &&
          ("http:" === location.protocol
            ? (window.sb_instagram_js_options.resized_url =
                window.sb_instagram_js_options.resized_url.replace(
                  "https:",
                  "http:"
                ))
            : (window.sb_instagram_js_options.resized_url =
                window.sb_instagram_js_options.resized_url.replace(
                  "http:",
                  "https:"
                ))),
        sbi_init(),
        t("#cookie-notice a").on("click", function () {
          setTimeout(function () {
            t.each(window.sbi.feeds, function (t) {
              window.sbi.feeds[t].afterConsentToggled();
            });
          }, 1e3);
        }),
        t("#cookie-law-info-bar a").on("click", function () {
          setTimeout(function () {
            t.each(window.sbi.feeds, function (t) {
              window.sbi.feeds[t].afterConsentToggled();
            });
          }, 1e3);
        }),
        t(".cli-user-preference-checkbox").on("click", function () {
          setTimeout(function () {
            t.each(window.sbi.feeds, function (t) {
              (window.sbi.feeds[t].settings.consentGiven = !1),
                window.sbi.feeds[t].afterConsentToggled();
            });
          }, 1e3);
        }),
        t(window).on("CookiebotOnAccept", function (e) {
          t.each(window.sbi.feeds, function (t) {
            (window.sbi.feeds[t].settings.consentGiven = !0),
              window.sbi.feeds[t].afterConsentToggled();
          });
        }),
        t(document).on("cmplzAcceptAll", function (e) {
          t.each(window.sbi.feeds, function (t) {
            (window.sbi.feeds[t].settings.consentGiven = !0),
              window.sbi.feeds[t].afterConsentToggled();
          });
        }),
        t(document).on("cmplzRevoke", function (e) {
          t.each(window.sbi.feeds, function (t) {
            (window.sbi.feeds[t].settings.consentGiven = !1),
              window.sbi.feeds[t].afterConsentToggled();
          });
        }),
        t(document).on("borlabs-cookie-consent-saved", function (e) {
          t.each(window.sbi.feeds, function (t) {
            (window.sbi.feeds[t].settings.consentGiven = !1),
              window.sbi.feeds[t].afterConsentToggled();
          });
        });
    }));
}
