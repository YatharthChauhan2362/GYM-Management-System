/* flatpickr v4.1.4,, @license MIT */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.flatpickr = t());
})(this, function () {
  "use strict";
  function e(e, t, n) {
    return !1 !== n
      ? new Date(e.getTime()).setHours(0, 0, 0, 0) -
          new Date(t.getTime()).setHours(0, 0, 0, 0)
      : e.getTime() - t.getTime();
  }
  function t(e, t, n) {
    void 0 === n && (n = !1);
    var a;
    return function () {
      var i = this,
        o = arguments;
      null !== a && clearTimeout(a),
        (a = window.setTimeout(function () {
          (a = null), n || e.apply(i, o);
        }, t)),
        n && !a && e.apply(i, o);
    };
  }
  function n(e, t, n) {
    if (!0 === n) return e.classList.add(t);
    e.classList.remove(t);
  }
  function a(e, t, n) {
    var a = window.document.createElement(e);
    return (
      (t = t || ""),
      (n = n || ""),
      (a.className = t),
      void 0 !== n && (a.textContent = n),
      a
    );
  }
  function i(e, t) {
    return t(e) ? e : e.parentNode ? i(e.parentNode, t) : void 0;
  }
  function o(e) {
    var t = a("div", "numInputWrapper"),
      n = a("input", "numInput " + e),
      i = a("span", "arrowUp"),
      o = a("span", "arrowDown");
    return (
      (n.type = "text"),
      (n.pattern = "\\d*"),
      t.appendChild(n),
      t.appendChild(i),
      t.appendChild(o),
      t
    );
  }
  function r(r, s) {
    for (
      var u = Array.prototype.slice.call(r), p = [], w = 0;
      w < u.length;
      w++
    ) {
      var M = u[w];
      try {
        if (null !== M.getAttribute("data-fp-omit")) continue;
        void 0 !== M._flatpickr &&
          (M._flatpickr.destroy(), (M._flatpickr = void 0)),
          (M._flatpickr = (function (r, s) {
            function u(e) {
              return e.bind(X);
            }
            function p(e) {
              if (X.config.noCalendar && 0 === X.selectedDates.length) {
                var t = X.config.minDate;
                X.setDate(
                  new Date().setHours(
                    t ? t.getHours() : X.config.defaultHour,
                    t ? t.getMinutes() : X.config.defaultMinute,
                    t && X.config.enableSeconds
                      ? t.getSeconds()
                      : X.config.defaultSeconds
                  ),
                  !1
                ),
                  w(),
                  Q();
              }
              !(function (e) {
                e.preventDefault();
                var t = "keydown" === e.type,
                  n = e.target;
                void 0 !== X.amPM &&
                  e.target === X.amPM &&
                  (X.amPM.textContent =
                    X.l10n.amPM[m(X.amPM.textContent === X.l10n.amPM[0])]);
                var a = Number(n.min),
                  i = Number(n.max),
                  o = Number(n.step),
                  r = parseInt(n.value, 10),
                  l =
                    e.delta ||
                    (t
                      ? 38 === e.which
                        ? 1
                        : -1
                      : Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) ||
                        0),
                  c = r + o * l;
                if (void 0 !== n.value && 2 === n.value.length) {
                  var d = n === X.hourElement,
                    s = n === X.minuteElement;
                  c < a
                    ? ((c = i + c + m(!d) + (m(d) && m(!X.amPM))),
                      s && S(void 0, -1, X.hourElement))
                    : c > i &&
                      ((c = n === X.hourElement ? c - i - m(!X.amPM) : a),
                      s && S(void 0, 1, X.hourElement)),
                    X.amPM &&
                      d &&
                      (1 === o ? c + r === 23 : Math.abs(c - r) > o) &&
                      (X.amPM.textContent =
                        X.l10n.amPM[m(X.amPM.textContent === X.l10n.amPM[0])]),
                    (n.value = f(c));
                }
              })(e),
                0 !== X.selectedDates.length &&
                  (!X.minDateHasTime ||
                  "input" !== e.type ||
                  e.target.value.length >= 2
                    ? (w(), Q())
                    : setTimeout(function () {
                        w(), Q();
                      }, 1e3));
            }
            function w() {
              if (void 0 !== X.hourElement && void 0 !== X.minuteElement) {
                var t = (parseInt(X.hourElement.value.slice(-2), 10) || 0) % 24,
                  n = (parseInt(X.minuteElement.value, 10) || 0) % 60,
                  a =
                    void 0 !== X.secondElement
                      ? (parseInt(X.secondElement.value, 10) || 0) % 60
                      : 0;
                void 0 !== X.amPM &&
                  (t = (function (e, t) {
                    return (e % 12) + 12 * m(t === X.l10n.amPM[1]);
                  })(t, X.amPM.textContent)),
                  X.config.minDate &&
                    X.minDateHasTime &&
                    X.latestSelectedDateObj &&
                    0 === e(X.latestSelectedDateObj, X.config.minDate) &&
                    (t = Math.max(t, X.config.minDate.getHours())) ===
                      X.config.minDate.getHours() &&
                    (n = Math.max(n, X.config.minDate.getMinutes())),
                  X.config.maxDate &&
                    X.maxDateHasTime &&
                    X.latestSelectedDateObj &&
                    0 === e(X.latestSelectedDateObj, X.config.maxDate) &&
                    (t = Math.min(t, X.config.maxDate.getHours())) ===
                      X.config.maxDate.getHours() &&
                    (n = Math.min(n, X.config.maxDate.getMinutes())),
                  b(t, n, a);
              }
            }
            function M(e) {
              var t = e || X.latestSelectedDateObj;
              t && b(t.getHours(), t.getMinutes(), t.getSeconds());
            }
            function b(e, t, n) {
              void 0 !== X.latestSelectedDateObj &&
                X.latestSelectedDateObj.setHours(e % 24, t, n || 0, 0),
                X.hourElement &&
                  X.minuteElement &&
                  !X.isMobile &&
                  ((X.hourElement.value = f(
                    X.config.time_24hr
                      ? e
                      : ((12 + e) % 12) + 12 * m(e % 12 == 0)
                  )),
                  (X.minuteElement.value = f(t)),
                  void 0 !== X.amPM &&
                    (X.amPM.textContent = X.l10n.amPM[m(e >= 12)]),
                  void 0 !== X.secondElement && (X.secondElement.value = f(n)));
            }
            function y(e, t, n) {
              return t instanceof Array
                ? t.forEach(function (t) {
                    return y(e, t, n);
                  })
                : e instanceof Array
                ? e.forEach(function (e) {
                    return y(e, t, n);
                  })
                : (e.addEventListener(t, n),
                  void X._handlers.push({ element: e, event: t, handler: n }));
            }
            function x(e) {
              return function (t) {
                1 === t.which && e(t);
              };
            }
            function E() {
              z("onChange");
            }
            function N() {
              X._animationLoop.forEach(function (e) {
                return e();
              }),
                (X._animationLoop = []);
            }
            function k(e) {
              var t =
                void 0 !== e
                  ? q(e)
                  : X.latestSelectedDateObj ||
                    (X.config.minDate && X.config.minDate > X.now
                      ? X.config.minDate
                      : X.config.maxDate && X.config.maxDate < X.now
                      ? X.config.maxDate
                      : X.now);
              try {
                void 0 !== t &&
                  ((X.currentYear = t.getFullYear()),
                  (X.currentMonth = t.getMonth()));
              } catch (e) {
                (e.message = "Invalid date supplied: " + t),
                  X.config.errorHandler(e);
              }
              X.redraw();
            }
            function S(e, t, n) {
              var a = e && e.target,
                i = n || (a && a.parentNode && a.parentNode.firstChild),
                o = G("increment");
              (o.delta = t), i && i.dispatchEvent(o);
            }
            function T(t, i, o, r) {
              var l = j(i, !0),
                c = a("span", "flatpickr-day " + t, i.getDate().toString());
              return (
                (c.dateObj = i),
                (c.$i = r),
                c.setAttribute(
                  "aria-label",
                  X.formatDate(i, X.config.ariaDateFormat)
                ),
                0 === e(i, X.now) &&
                  ((X.todayDateElem = c), c.classList.add("today")),
                l
                  ? ((c.tabIndex = -1),
                    V(i) &&
                      (c.classList.add("selected"),
                      (X.selectedDateElem = c),
                      "range" === X.config.mode &&
                        (n(
                          c,
                          "startRange",
                          X.selectedDates[0] && 0 === e(i, X.selectedDates[0])
                        ),
                        n(
                          c,
                          "endRange",
                          X.selectedDates[1] && 0 === e(i, X.selectedDates[1])
                        ))))
                  : (c.classList.add("disabled"),
                    X.selectedDates[0] &&
                    X.minRangeDate &&
                    i > X.minRangeDate &&
                    i < X.selectedDates[0]
                      ? (X.minRangeDate = i)
                      : X.selectedDates[0] &&
                        X.maxRangeDate &&
                        i < X.maxRangeDate &&
                        i > X.selectedDates[0] &&
                        (X.maxRangeDate = i)),
                "range" === X.config.mode &&
                  ((function (t) {
                    return (
                      !(
                        "range" !== X.config.mode || X.selectedDates.length < 2
                      ) &&
                      e(t, X.selectedDates[0]) >= 0 &&
                      e(t, X.selectedDates[1]) <= 0
                    );
                  })(i) &&
                    !V(i) &&
                    c.classList.add("inRange"),
                  1 === X.selectedDates.length &&
                    void 0 !== X.minRangeDate &&
                    void 0 !== X.maxRangeDate &&
                    (i < X.minRangeDate || i > X.maxRangeDate) &&
                    c.classList.add("notAllowed")),
                X.weekNumbers &&
                  "prevMonthDay" !== t &&
                  o % 7 == 1 &&
                  X.weekNumbers.insertAdjacentHTML(
                    "beforeend",
                    "<span class='disabled flatpickr-day'>" +
                      X.config.getWeek(i) +
                      "</span>"
                  ),
                z("onDayCreate", c),
                c
              );
            }
            function I(e, t) {
              var n = e + t || 0,
                a =
                  void 0 !== e
                    ? X.days.childNodes[n]
                    : X.selectedDateElem ||
                      X.todayDateElem ||
                      X.days.childNodes[0],
                i = function () {
                  (a = a || X.days.childNodes[n]).focus(),
                    "range" === X.config.mode && R(a);
                };
              if (void 0 === a && 0 !== t)
                return (
                  t > 0
                    ? (X.changeMonth(1, !0, void 0, !0), (n %= 42))
                    : t < 0 && (X.changeMonth(-1, !0, void 0, !0), (n += 42)),
                  Y(i)
                );
              i();
            }
            function Y(e) {
              !0 === X.config.animate ? X._animationLoop.push(e) : e();
            }
            function _(e) {
              if (void 0 !== X.daysContainer) {
                var t =
                    (new Date(X.currentYear, X.currentMonth, 1).getDay() -
                      X.l10n.firstDayOfWeek +
                      7) %
                    7,
                  n = "range" === X.config.mode,
                  i = X.utils.getDaysInMonth((X.currentMonth - 1 + 12) % 12),
                  o = X.utils.getDaysInMonth(),
                  r = window.document.createDocumentFragment(),
                  l = i + 1 - t,
                  c = 0;
                for (
                  X.weekNumbers &&
                    X.weekNumbers.firstChild &&
                    (X.weekNumbers.textContent = ""),
                    n &&
                      ((X.minRangeDate = new Date(
                        X.currentYear,
                        X.currentMonth - 1,
                        l
                      )),
                      (X.maxRangeDate = new Date(
                        X.currentYear,
                        X.currentMonth + 1,
                        (42 - t) % o
                      )));
                  l <= i;
                  l++, c++
                )
                  r.appendChild(
                    T(
                      "prevMonthDay",
                      new Date(X.currentYear, X.currentMonth - 1, l),
                      l,
                      c
                    )
                  );
                for (l = 1; l <= o; l++, c++)
                  r.appendChild(
                    T("", new Date(X.currentYear, X.currentMonth, l), l, c)
                  );
                for (var d = o + 1; d <= 42 - t; d++, c++)
                  r.appendChild(
                    T(
                      "nextMonthDay",
                      new Date(X.currentYear, X.currentMonth + 1, d % o),
                      d,
                      c
                    )
                  );
                n && 1 === X.selectedDates.length && r.childNodes[0]
                  ? ((X._hidePrevMonthArrow =
                      X._hidePrevMonthArrow ||
                      (!!X.minRangeDate &&
                        X.minRangeDate > r.childNodes[0].dateObj)),
                    (X._hideNextMonthArrow =
                      X._hideNextMonthArrow ||
                      (!!X.maxRangeDate &&
                        X.maxRangeDate <
                          new Date(X.currentYear, X.currentMonth + 1, 1))))
                  : Z();
                var s = a("div", "dayContainer");
                if ((s.appendChild(r), X.config.animate && void 0 !== e))
                  for (; X.daysContainer.childNodes.length > 1; )
                    X.daysContainer.removeChild(X.daysContainer.firstChild);
                else
                  !(function (e) {
                    for (; e.firstChild; ) e.removeChild(e.firstChild);
                  })(X.daysContainer);
                e && e >= 0
                  ? X.daysContainer.appendChild(s)
                  : X.daysContainer.insertBefore(s, X.daysContainer.firstChild),
                  (X.days = X.daysContainer.childNodes[0]);
              }
            }
            function O() {
              X.weekdayContainer ||
                (X.weekdayContainer = a("div", "flatpickr-weekdays"));
              var e = X.l10n.firstDayOfWeek,
                t = X.l10n.weekdays.shorthand.slice();
              return (
                e > 0 &&
                  e < t.length &&
                  (t = t.splice(e, t.length).concat(t.splice(0, e))),
                (X.weekdayContainer.innerHTML =
                  "\n    <span class=flatpickr-weekday>\n      " +
                  t.join("</span><span class=flatpickr-weekday>") +
                  "\n    </span>\n    "),
                X.weekdayContainer
              );
            }
            function P(e, t, n, a) {
              void 0 === t && (t = !0),
                void 0 === n && (n = X.config.animate),
                void 0 === a && (a = !1);
              var i = t ? e : e - X.currentMonth;
              if (
                !(
                  (i < 0 && X._hidePrevMonthArrow) ||
                  (i > 0 && X._hideNextMonthArrow)
                )
              ) {
                if (
                  ((X.currentMonth += i),
                  (X.currentMonth < 0 || X.currentMonth > 11) &&
                    ((X.currentYear += X.currentMonth > 11 ? 1 : -1),
                    (X.currentMonth = (X.currentMonth + 12) % 12),
                    z("onYearChange")),
                  _(n ? i : void 0),
                  !n)
                )
                  return z("onMonthChange"), Z();
                var o = X.navigationCurrentMonth;
                if (i < 0)
                  for (
                    ;
                    o.nextSibling && /curr/.test(o.nextSibling.className);

                  )
                    X.monthNav.removeChild(o.nextSibling);
                else if (i > 0)
                  for (
                    ;
                    o.previousSibling &&
                    /curr/.test(o.previousSibling.className);

                  )
                    X.monthNav.removeChild(o.previousSibling);
                (X.oldCurMonth = X.navigationCurrentMonth),
                  (X.navigationCurrentMonth = X.monthNav.insertBefore(
                    X.oldCurMonth.cloneNode(!0),
                    i > 0 ? X.oldCurMonth.nextSibling : X.oldCurMonth
                  ));
                var r = X.daysContainer;
                if (
                  (r.firstChild &&
                    r.lastChild &&
                    (i > 0
                      ? (r.firstChild.classList.add("slideLeft"),
                        r.lastChild.classList.add("slideLeftNew"),
                        X.oldCurMonth.classList.add("slideLeft"),
                        X.navigationCurrentMonth.classList.add("slideLeftNew"))
                      : i < 0 &&
                        (r.firstChild.classList.add("slideRightNew"),
                        r.lastChild.classList.add("slideRight"),
                        X.oldCurMonth.classList.add("slideRight"),
                        X.navigationCurrentMonth.classList.add(
                          "slideRightNew"
                        ))),
                  (X.currentMonthElement = X.navigationCurrentMonth.firstChild),
                  (X.currentYearElement =
                    X.navigationCurrentMonth.lastChild.childNodes[0]),
                  Z(),
                  X.oldCurMonth.firstChild &&
                    (X.oldCurMonth.firstChild.textContent = c(
                      X.currentMonth - i,
                      X.config.shorthandCurrentMonth,
                      X.l10n
                    )),
                  Y(function () {
                    return z("onMonthChange");
                  }),
                  a && document.activeElement && document.activeElement.$i)
                ) {
                  var l = document.activeElement.$i;
                  Y(function () {
                    I(l, 0);
                  });
                }
              }
            }
            function F(e) {
              return (
                !(!X.config.appendTo || !X.config.appendTo.contains(e)) ||
                X.calendarContainer.contains(e)
              );
            }
            function L(e) {
              if (X.isOpen && !X.config.inline) {
                var t = F(e.target),
                  n =
                    e.target === X.input ||
                    e.target === X.altInput ||
                    X.element.contains(e.target) ||
                    (e.path &&
                      e.path.indexOf &&
                      (~e.path.indexOf(X.input) ||
                        ~e.path.indexOf(X.altInput)));
                ("blur" === e.type
                  ? n && e.relatedTarget && !F(e.relatedTarget)
                  : !n && !t) &&
                  -1 === X.config.ignoredFocusElements.indexOf(e.target) &&
                  (X.close(),
                  "range" === X.config.mode &&
                    1 === X.selectedDates.length &&
                    (X.clear(!1), X.redraw()));
              }
            }
            function A(e) {
              if (
                !(
                  !e ||
                  (X.currentYearElement.min &&
                    e < parseInt(X.currentYearElement.min)) ||
                  (X.currentYearElement.max &&
                    e > parseInt(X.currentYearElement.max))
                )
              ) {
                var t = e,
                  n = X.currentYear !== t;
                (X.currentYear = t || X.currentYear),
                  X.config.maxDate &&
                  X.currentYear === X.config.maxDate.getFullYear()
                    ? (X.currentMonth = Math.min(
                        X.config.maxDate.getMonth(),
                        X.currentMonth
                      ))
                    : X.config.minDate &&
                      X.currentYear === X.config.minDate.getFullYear() &&
                      (X.currentMonth = Math.max(
                        X.config.minDate.getMonth(),
                        X.currentMonth
                      )),
                  n && (X.redraw(), z("onYearChange"));
              }
            }
            function j(t, n) {
              void 0 === n && (n = !0);
              var a = X.parseDate(t, void 0, n);
              if (
                (X.config.minDate &&
                  a &&
                  e(a, X.config.minDate, void 0 !== n ? n : !X.minDateHasTime) <
                    0) ||
                (X.config.maxDate &&
                  a &&
                  e(a, X.config.maxDate, void 0 !== n ? n : !X.maxDateHasTime) >
                    0)
              )
                return !1;
              if (!X.config.enable.length && !X.config.disable.length)
                return !0;
              if (void 0 === a) return !1;
              for (
                var i = X.config.enable.length > 0,
                  o = i ? X.config.enable : X.config.disable,
                  r = 0,
                  l = void 0;
                r < o.length;
                r++
              ) {
                if ("function" == typeof (l = o[r]) && l(a)) return i;
                if (
                  l instanceof Date &&
                  void 0 !== a &&
                  l.getTime() === a.getTime()
                )
                  return i;
                if ("string" == typeof l && void 0 !== a) {
                  var c = X.parseDate(l, void 0, !0);
                  return c && c.getTime() === a.getTime() ? i : !i;
                }
                if (
                  "object" == typeof l &&
                  void 0 !== a &&
                  l.from &&
                  l.to &&
                  a.getTime() >= l.from.getTime() &&
                  a.getTime() <= l.to.getTime()
                )
                  return i;
              }
              return !i;
            }
            function H(e) {
              var t = e.target === X._input,
                n = F(e.target),
                a = X.config.allowInput,
                i = X.isOpen && (!a || !t),
                o = X.config.inline && t && !a;
              if ("Enter" === e.key && t) {
                if (a)
                  return (
                    X.setDate(
                      X._input.value,
                      !0,
                      e.target === X.altInput
                        ? X.config.altFormat
                        : X.config.dateFormat
                    ),
                    e.target.blur()
                  );
                X.open();
              } else if (n || i || o) {
                var r = !!X.timeContainer && X.timeContainer.contains(e.target);
                switch (e.key) {
                  case "Enter":
                    r ? Q() : K(e);
                    break;
                  case "Escape":
                    e.preventDefault(), X.close();
                    break;
                  case "Backspace":
                  case "Delete":
                    t && !X.config.allowInput && X.clear();
                    break;
                  case "ArrowLeft":
                  case "ArrowRight":
                    if (r) X.hourElement && X.hourElement.focus();
                    else if ((e.preventDefault(), X.daysContainer)) {
                      var l = "ArrowRight" === e.key ? 1 : -1;
                      e.ctrlKey ? P(l, !0, void 0, !0) : I(e.target.$i, l);
                    }
                    break;
                  case "ArrowUp":
                  case "ArrowDown":
                    e.preventDefault();
                    var c = "ArrowDown" === e.key ? 1 : -1;
                    X.daysContainer && void 0 !== e.target.$i
                      ? e.ctrlKey
                        ? (A(X.currentYear - c), I(e.target.$i, 0))
                        : r || I(e.target.$i, 7 * c)
                      : X.config.enableTime &&
                        (!r && X.hourElement && X.hourElement.focus(),
                        p(e),
                        X._debouncedChange());
                    break;
                  case "Tab":
                    e.target === X.hourElement
                      ? (e.preventDefault(), X.minuteElement.select())
                      : e.target === X.minuteElement &&
                        (X.secondElement || X.amPM)
                      ? (e.preventDefault(),
                        void 0 !== X.secondElement
                          ? X.secondElement.focus()
                          : void 0 !== X.amPM && X.amPM.focus())
                      : e.target === X.secondElement &&
                        X.amPM &&
                        (e.preventDefault(), X.amPM.focus());
                    break;
                  case X.l10n.amPM[0].charAt(0):
                    void 0 !== X.amPM &&
                      e.target === X.amPM &&
                      ((X.amPM.textContent = X.l10n.amPM[0]), w(), Q());
                    break;
                  case X.l10n.amPM[1].charAt(0):
                    void 0 !== X.amPM &&
                      e.target === X.amPM &&
                      ((X.amPM.textContent = X.l10n.amPM[1]), w(), Q());
                }
                z("onKeyDown", e);
              }
            }
            function R(e) {
              if (
                1 === X.selectedDates.length &&
                e.classList.contains("flatpickr-day") &&
                void 0 !== X.minRangeDate &&
                void 0 !== X.maxRangeDate
              ) {
                for (
                  var t = e.dateObj,
                    n = X.parseDate(X.selectedDates[0], void 0, !0),
                    a = Math.min(t.getTime(), X.selectedDates[0].getTime()),
                    i = Math.max(t.getTime(), X.selectedDates[0].getTime()),
                    o = !1,
                    r = a;
                  r < i;
                  r += d.DAY
                )
                  if (!j(new Date(r))) {
                    o = !0;
                    break;
                  }
                for (
                  var l = 0, c = X.days.childNodes[l].dateObj;
                  l < 42;
                  l++, c = X.days.childNodes[l] && X.days.childNodes[l].dateObj
                )
                  !(function (r, l) {
                    var c = l.getTime(),
                      d =
                        c < X.minRangeDate.getTime() ||
                        c > X.maxRangeDate.getTime(),
                      s = X.days.childNodes[r];
                    if (d)
                      return (
                        s.classList.add("notAllowed"),
                        ["inRange", "startRange", "endRange"].forEach(function (
                          e
                        ) {
                          s.classList.remove(e);
                        }),
                        "continue"
                      );
                    if (o && !d) return "continue";
                    ["startRange", "inRange", "endRange", "notAllowed"].forEach(
                      function (e) {
                        s.classList.remove(e);
                      }
                    );
                    var u = Math.max(X.minRangeDate.getTime(), a),
                      f = Math.min(X.maxRangeDate.getTime(), i);
                    e.classList.add(
                      t < X.selectedDates[0] ? "startRange" : "endRange"
                    ),
                      n < t && c === n.getTime()
                        ? s.classList.add("startRange")
                        : n > t &&
                          c === n.getTime() &&
                          s.classList.add("endRange"),
                      c >= u && c <= f && s.classList.add("inRange");
                  })(l, c);
              }
            }
            function W(e) {
              return function (t) {
                var n = (X.config["_" + e + "Date"] = X.parseDate(t)),
                  a = X.config["_" + ("min" === e ? "max" : "min") + "Date"];
                void 0 !== n &&
                  (X["min" === e ? "minDateHasTime" : "maxDateHasTime"] =
                    n.getHours() > 0 ||
                    n.getMinutes() > 0 ||
                    n.getSeconds() > 0),
                  X.selectedDates &&
                    ((X.selectedDates = X.selectedDates.filter(function (e) {
                      return j(e);
                    })),
                    X.selectedDates.length || "min" !== e || M(n),
                    Q()),
                  X.daysContainer &&
                    (J(),
                    void 0 !== n
                      ? (X.currentYearElement[e] = n.getFullYear().toString())
                      : X.currentYearElement.removeAttribute(e),
                    (X.currentYearElement.disabled =
                      !!a &&
                      void 0 !== n &&
                      a.getFullYear() === n.getFullYear()));
              };
            }
            function B(e) {
              if (
                (void 0 === e && (e = X._positionElement),
                void 0 !== X.calendarContainer)
              ) {
                var t = X.calendarContainer.offsetHeight,
                  a = X.calendarContainer.offsetWidth,
                  i = X.config.position,
                  o = e.getBoundingClientRect(),
                  r = window.innerHeight - o.bottom,
                  l = "above" === i || ("below" !== i && r < t && o.top > t),
                  c =
                    window.pageYOffset +
                    o.top +
                    (l ? -t - 2 : e.offsetHeight + 2);
                if (
                  (n(X.calendarContainer, "arrowTop", !l),
                  n(X.calendarContainer, "arrowBottom", l),
                  !X.config.inline)
                ) {
                  var d = window.pageXOffset + o.left,
                    s = window.document.body.offsetWidth - o.right,
                    u = d + a > window.document.body.offsetWidth;
                  n(X.calendarContainer, "rightMost", u),
                    X.config.static ||
                      ((X.calendarContainer.style.top = c + "px"),
                      u
                        ? ((X.calendarContainer.style.left = "auto"),
                          (X.calendarContainer.style.right = s + "px"))
                        : ((X.calendarContainer.style.left = d + "px"),
                          (X.calendarContainer.style.right = "auto")));
                }
              }
            }
            function J() {
              X.config.noCalendar || X.isMobile || (O(), Z(), _());
            }
            function K(t) {
              t.preventDefault(), t.stopPropagation();
              var n = i(t.target, function (e) {
                return (
                  e.classList &&
                  e.classList.contains("flatpickr-day") &&
                  !e.classList.contains("disabled") &&
                  !e.classList.contains("notAllowed")
                );
              });
              if (void 0 !== n) {
                var a = n,
                  o = (X.latestSelectedDateObj = new Date(a.dateObj.getTime())),
                  r =
                    o.getMonth() !== X.currentMonth &&
                    "range" !== X.config.mode;
                if (((X.selectedDateElem = a), "single" === X.config.mode))
                  X.selectedDates = [o];
                else if ("multiple" === X.config.mode) {
                  var l = V(o);
                  l
                    ? X.selectedDates.splice(parseInt(l), 1)
                    : X.selectedDates.push(o);
                } else
                  "range" === X.config.mode &&
                    (2 === X.selectedDates.length && X.clear(),
                    X.selectedDates.push(o),
                    0 !== e(o, X.selectedDates[0], !0) &&
                      X.selectedDates.sort(function (e, t) {
                        return e.getTime() - t.getTime();
                      }));
                if ((w(), r)) {
                  var c = X.currentYear !== o.getFullYear();
                  (X.currentYear = o.getFullYear()),
                    (X.currentMonth = o.getMonth()),
                    c && z("onYearChange"),
                    z("onMonthChange");
                }
                if (
                  (_(),
                  X.config.minDate &&
                    X.minDateHasTime &&
                    X.config.enableTime &&
                    0 === e(o, X.config.minDate) &&
                    M(X.config.minDate),
                  Q(),
                  X.config.enableTime &&
                    setTimeout(function () {
                      return (X.showTimeInput = !0);
                    }, 50),
                  "range" === X.config.mode &&
                    (1 === X.selectedDates.length
                      ? (R(a),
                        (X._hidePrevMonthArrow =
                          X._hidePrevMonthArrow ||
                          (void 0 !== X.minRangeDate &&
                            X.minRangeDate > X.days.childNodes[0].dateObj)),
                        (X._hideNextMonthArrow =
                          X._hideNextMonthArrow ||
                          (void 0 !== X.maxRangeDate &&
                            X.maxRangeDate <
                              new Date(X.currentYear, X.currentMonth + 1, 1))))
                      : Z()),
                  z("onChange"),
                  r
                    ? Y(function () {
                        return X.selectedDateElem && X.selectedDateElem.focus();
                      })
                    : I(a.$i, 0),
                  void 0 !== X.hourElement &&
                    setTimeout(function () {
                      return void 0 !== X.hourElement && X.hourElement.select();
                    }, 451),
                  X.config.closeOnSelect)
                ) {
                  var d = "single" === X.config.mode && !X.config.enableTime,
                    s =
                      "range" === X.config.mode &&
                      2 === X.selectedDates.length &&
                      !X.config.enableTime;
                  (d || s) && X.close();
                }
              }
            }
            function U(e, t) {
              var n = [];
              if (e instanceof Array)
                n = e.map(function (e) {
                  return X.parseDate(e, t);
                });
              else if (e instanceof Date || "number" == typeof e)
                n = [X.parseDate(e, t)];
              else if ("string" == typeof e)
                switch (X.config.mode) {
                  case "single":
                    n = [X.parseDate(e, t)];
                    break;
                  case "multiple":
                    n = e.split(X.config.conjunction).map(function (e) {
                      return X.parseDate(e, t);
                    });
                    break;
                  case "range":
                    n = e.split(X.l10n.rangeSeparator).map(function (e) {
                      return X.parseDate(e, t);
                    });
                }
              else
                X.config.errorHandler(
                  new Error("Invalid date supplied: " + JSON.stringify(e))
                );
              (X.selectedDates = n.filter(function (e) {
                return e instanceof Date && j(e, !1);
              })),
                X.selectedDates.sort(function (e, t) {
                  return e.getTime() - t.getTime();
                });
            }
            function $(e) {
              return e
                .map(function (e) {
                  return "string" == typeof e ||
                    "number" == typeof e ||
                    e instanceof Date
                    ? X.parseDate(e, void 0, !0)
                    : e && "object" == typeof e && e.from && e.to
                    ? {
                        from: X.parseDate(e.from, void 0),
                        to: X.parseDate(e.to, void 0),
                      }
                    : e;
                })
                .filter(function (e) {
                  return e;
                });
            }
            function q(e, t, n) {
              if (0 === e || e) {
                var a,
                  i = e;
                if (e instanceof Date) a = new Date(e.getTime());
                else if ("string" != typeof e && void 0 !== e.toFixed)
                  a = new Date(e);
                else if ("string" == typeof e) {
                  var o = t || (X.config || C.defaultConfig).dateFormat,
                    r = String(e).trim();
                  if ("today" === r) (a = new Date()), (n = !0);
                  else if (/Z$/.test(r) || /GMT$/.test(r)) a = new Date(e);
                  else if (X.config && X.config.parseDate)
                    a = X.config.parseDate(e, o);
                  else {
                    a =
                      X.config && X.config.noCalendar
                        ? new Date(new Date().setHours(0, 0, 0, 0))
                        : new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
                    for (
                      var l = void 0, c = [], d = 0, s = 0, u = "";
                      d < o.length;
                      d++
                    ) {
                      var f = o[d],
                        m = "\\" === f,
                        g = "\\" === o[d - 1] || m;
                      if (v[f] && !g) {
                        u += v[f];
                        var p = new RegExp(u).exec(e);
                        p &&
                          (l = !0) &&
                          c["Y" !== f ? "push" : "unshift"]({
                            fn: h[f],
                            val: p[++s],
                          });
                      } else m || (u += ".");
                      c.forEach(function (e) {
                        var t = e.fn,
                          n = e.val;
                        return (a = t(a, n, X.l10n) || a);
                      });
                    }
                    a = l ? a : void 0;
                  }
                }
                if (a instanceof Date)
                  return !0 === n && a.setHours(0, 0, 0, 0), a;
                X.config.errorHandler(new Error("Invalid date provided: " + i));
              }
            }
            function z(e, t) {
              var n = X.config[e];
              if (void 0 !== n && n.length > 0)
                for (var a = 0; n[a] && a < n.length; a++)
                  n[a](X.selectedDates, X.input.value, X, t);
              "onChange" === e &&
                (X.input.dispatchEvent(G("change")),
                X.input.dispatchEvent(G("input")));
            }
            function G(e) {
              var t = document.createEvent("Event");
              return t.initEvent(e, !0, !0), t;
            }
            function V(t) {
              for (var n = 0; n < X.selectedDates.length; n++)
                if (0 === e(X.selectedDates[n], t)) return "" + n;
              return !1;
            }
            function Z() {
              X.config.noCalendar ||
                X.isMobile ||
                !X.monthNav ||
                ((X.currentMonthElement.textContent =
                  c(X.currentMonth, X.config.shorthandCurrentMonth, X.l10n) +
                  " "),
                (X.currentYearElement.value = X.currentYear.toString()),
                (X._hidePrevMonthArrow =
                  void 0 !== X.config.minDate &&
                  (X.currentYear === X.config.minDate.getFullYear()
                    ? X.currentMonth <= X.config.minDate.getMonth()
                    : X.currentYear < X.config.minDate.getFullYear())),
                (X._hideNextMonthArrow =
                  void 0 !== X.config.maxDate &&
                  (X.currentYear === X.config.maxDate.getFullYear()
                    ? X.currentMonth + 1 > X.config.maxDate.getMonth()
                    : X.currentYear > X.config.maxDate.getFullYear())));
            }
            function Q(e) {
              if ((void 0 === e && (e = !0), !X.selectedDates.length))
                return X.clear(e);
              void 0 !== X.mobileInput &&
                X.mobileFormatStr &&
                (X.mobileInput.value =
                  void 0 !== X.latestSelectedDateObj
                    ? X.formatDate(X.latestSelectedDateObj, X.mobileFormatStr)
                    : "");
              var t =
                "range" !== X.config.mode
                  ? X.config.conjunction
                  : X.l10n.rangeSeparator;
              (X.input.value = X.selectedDates
                .map(function (e) {
                  return X.formatDate(e, X.config.dateFormat);
                })
                .join(t)),
                void 0 !== X.altInput &&
                  (X.altInput.value = X.selectedDates
                    .map(function (e) {
                      return X.formatDate(e, X.config.altFormat);
                    })
                    .join(t)),
                !1 !== e && z("onValueUpdate");
            }
            var X = {};
            return (
              (X.parseDate = q),
              (X.formatDate = function (e, t) {
                return void 0 !== X.config && void 0 !== X.config.formatDate
                  ? X.config.formatDate(e, t)
                  : t
                      .split("")
                      .map(function (t, n, a) {
                        return D[t] && "\\" !== a[n - 1]
                          ? D[t](e, X.l10n, X.config)
                          : "\\" !== t
                          ? t
                          : "";
                      })
                      .join("");
              }),
              (X._animationLoop = []),
              (X._handlers = []),
              (X._bind = y),
              (X._setHoursFromDate = M),
              (X.changeMonth = P),
              (X.changeYear = A),
              (X.clear = function (e) {
                void 0 === e && (e = !0),
                  (X.input.value = ""),
                  X.altInput && (X.altInput.value = ""),
                  X.mobileInput && (X.mobileInput.value = ""),
                  (X.selectedDates = []),
                  (X.latestSelectedDateObj = void 0),
                  (X.showTimeInput = !1),
                  X.redraw(),
                  e && z("onChange");
              }),
              (X.close = function () {
                (X.isOpen = !1),
                  X.isMobile ||
                    (X.calendarContainer.classList.remove("open"),
                    X._input.classList.remove("active")),
                  z("onClose");
              }),
              (X._createElement = a),
              (X.destroy = function () {
                void 0 !== X.config && z("onDestroy");
                for (var e = X._handlers.length; e--; ) {
                  var t = X._handlers[e];
                  t.element.removeEventListener(t.event, t.handler);
                }
                (X._handlers = []),
                  X.mobileInput
                    ? (X.mobileInput.parentNode &&
                        X.mobileInput.parentNode.removeChild(X.mobileInput),
                      (X.mobileInput = void 0))
                    : X.calendarContainer &&
                      X.calendarContainer.parentNode &&
                      X.calendarContainer.parentNode.removeChild(
                        X.calendarContainer
                      ),
                  X.altInput &&
                    ((X.input.type = "text"),
                    X.altInput.parentNode &&
                      X.altInput.parentNode.removeChild(X.altInput),
                    delete X.altInput),
                  X.input &&
                    ((X.input.type = X.input._type),
                    X.input.classList.remove("flatpickr-input"),
                    X.input.removeAttribute("readonly"),
                    (X.input.value = "")),
                  [
                    "_showTimeInput",
                    "latestSelectedDateObj",
                    "_hideNextMonthArrow",
                    "_hidePrevMonthArrow",
                    "__hideNextMonthArrow",
                    "__hidePrevMonthArrow",
                    "isMobile",
                    "isOpen",
                    "selectedDateElem",
                    "minDateHasTime",
                    "maxDateHasTime",
                    "days",
                    "daysContainer",
                    "_input",
                    "_positionElement",
                    "innerContainer",
                    "rContainer",
                    "monthNav",
                    "todayDateElem",
                    "calendarContainer",
                    "weekdayContainer",
                    "prevMonthNav",
                    "nextMonthNav",
                    "currentMonthElement",
                    "currentYearElement",
                    "navigationCurrentMonth",
                    "selectedDateElem",
                    "config",
                  ].forEach(function (e) {
                    try {
                      delete X[e];
                    } catch (e) {}
                  });
              }),
              (X.isEnabled = j),
              (X.jumpToDate = k),
              (X.open = function (e, t) {
                if ((void 0 === t && (t = X._input), X.isMobile))
                  return (
                    e && (e.preventDefault(), e.target && e.target.blur()),
                    setTimeout(function () {
                      void 0 !== X.mobileInput && X.mobileInput.click();
                    }, 0),
                    void z("onOpen")
                  );
                if (!X._input.disabled && !X.config.inline) {
                  var n = X.isOpen;
                  (X.isOpen = !0),
                    B(t),
                    X.calendarContainer.classList.add("open"),
                    X._input.classList.add("active"),
                    !n && z("onOpen");
                }
              }),
              (X.redraw = J),
              (X.set = function (e, t) {
                null !== e && "object" == typeof e
                  ? Object.assign(X.config, e)
                  : (X.config[e] = t),
                  X.redraw(),
                  k();
              }),
              (X.setDate = function (e, t, n) {
                if ((void 0 === t && (t = !1), 0 !== e && !e))
                  return X.clear(t);
                U(e, n),
                  (X.showTimeInput = X.selectedDates.length > 0),
                  (X.latestSelectedDateObj = X.selectedDates[0]),
                  X.redraw(),
                  k(),
                  M(),
                  Q(t),
                  t && z("onChange");
              }),
              (X.toggle = function () {
                if (X.isOpen) return X.close();
                X.open();
              }),
              (function () {
                (X.element = X.input = r),
                  (X.isOpen = !1),
                  (function () {
                    var e = [
                        "wrap",
                        "weekNumbers",
                        "allowInput",
                        "clickOpens",
                        "time_24hr",
                        "enableTime",
                        "noCalendar",
                        "altInput",
                        "shorthandCurrentMonth",
                        "inline",
                        "static",
                        "enableSeconds",
                        "disableMobile",
                      ],
                      t = [
                        "onChange",
                        "onClose",
                        "onDayCreate",
                        "onDestroy",
                        "onKeyDown",
                        "onMonthChange",
                        "onOpen",
                        "onParseConfig",
                        "onReady",
                        "onValueUpdate",
                        "onYearChange",
                      ];
                    X.config = l({}, C.defaultConfig);
                    var n = l(
                        {},
                        s,
                        JSON.parse(JSON.stringify(r.dataset || {}))
                      ),
                      a = {};
                    for (
                      Object.defineProperty(X.config, "enable", {
                        get: function () {
                          return X.config._enable || [];
                        },
                        set: function (e) {
                          X.config._enable = $(e);
                        },
                      }),
                        Object.defineProperty(X.config, "disable", {
                          get: function () {
                            return X.config._disable || [];
                          },
                          set: function (e) {
                            X.config._disable = $(e);
                          },
                        }),
                        !n.dateFormat &&
                          n.enableTime &&
                          (a.dateFormat = n.noCalendar
                            ? "H:i" + (n.enableSeconds ? ":S" : "")
                            : C.defaultConfig.dateFormat +
                              " H:i" +
                              (n.enableSeconds ? ":S" : "")),
                        n.altInput &&
                          n.enableTime &&
                          !n.altFormat &&
                          (a.altFormat = n.noCalendar
                            ? "h:i" + (n.enableSeconds ? ":S K" : " K")
                            : C.defaultConfig.altFormat +
                              " h:i" +
                              (n.enableSeconds ? ":S" : "") +
                              " K"),
                        Object.defineProperty(X.config, "minDate", {
                          get: function () {
                            return X.config._minDate;
                          },
                          set: W("min"),
                        }),
                        Object.defineProperty(X.config, "maxDate", {
                          get: function () {
                            return X.config._maxDate;
                          },
                          set: W("max"),
                        }),
                        Object.assign(X.config, a, n),
                        i = 0;
                      i < e.length;
                      i++
                    )
                      X.config[e[i]] =
                        !0 === X.config[e[i]] || "true" === X.config[e[i]];
                    for (i = t.length; i--; )
                      void 0 !== X.config[t[i]] &&
                        (X.config[t[i]] = g(X.config[t[i]] || []).map(u));
                    for (var i = 0; i < X.config.plugins.length; i++) {
                      var o = X.config.plugins[i](X) || {};
                      for (var c in o)
                        ~t.indexOf(c)
                          ? (X.config[c] = g(o[c]).map(u).concat(X.config[c]))
                          : void 0 === n[c] && (X.config[c] = o[c]);
                    }
                    (X.isMobile =
                      !X.config.disableMobile &&
                      !X.config.inline &&
                      "single" === X.config.mode &&
                      !X.config.disable.length &&
                      !X.config.enable.length &&
                      !X.config.weekNumbers &&
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                        navigator.userAgent
                      )),
                      z("onParseConfig");
                  })(),
                  "object" != typeof X.config.locale &&
                    void 0 === C.l10ns[X.config.locale] &&
                    X.config.errorHandler(
                      new Error("flatpickr: invalid locale " + X.config.locale)
                    ),
                  (X.l10n = l(
                    {},
                    C.l10ns.default,
                    "object" == typeof X.config.locale
                      ? X.config.locale
                      : "default" !== X.config.locale
                      ? C.l10ns[X.config.locale]
                      : void 0
                  )),
                  (v.K =
                    "(" +
                    X.l10n.amPM[0] +
                    "|" +
                    X.l10n.amPM[1] +
                    "|" +
                    X.l10n.amPM[0].toLowerCase() +
                    "|" +
                    X.l10n.amPM[1].toLowerCase() +
                    ")"),
                  (X.input = X.config.wrap
                    ? r.querySelector("[data-input]")
                    : r),
                  X.input
                    ? ((X.input._type = X.input.type),
                      (X.input.type = "text"),
                      X.input.classList.add("flatpickr-input"),
                      (X._input = X.input),
                      X.config.altInput &&
                        ((X.altInput = a(
                          X.input.nodeName,
                          X.input.className + " " + X.config.altInputClass
                        )),
                        (X._input = X.altInput),
                        (X.altInput.placeholder = X.input.placeholder),
                        (X.altInput.disabled = X.input.disabled),
                        (X.altInput.required = X.input.required),
                        (X.altInput.type = "text"),
                        (X.input.type = "hidden"),
                        !X.config.static &&
                          X.input.parentNode &&
                          X.input.parentNode.insertBefore(
                            X.altInput,
                            X.input.nextSibling
                          )),
                      X.config.allowInput ||
                        X._input.setAttribute("readonly", "readonly"),
                      (X._positionElement =
                        X.config.positionElement || X._input))
                    : X.config.errorHandler(
                        new Error("Invalid input element specified")
                      ),
                  (function () {
                    (X.selectedDates = []), (X.now = new Date());
                    var e = X.config.defaultDate || X.input.value;
                    e && U(e, X.config.dateFormat);
                    var t = X.selectedDates.length
                      ? X.selectedDates[0]
                      : X.config.minDate &&
                        X.config.minDate.getTime() > X.now.getTime()
                      ? X.config.minDate
                      : X.config.maxDate &&
                        X.config.maxDate.getTime() < X.now.getTime()
                      ? X.config.maxDate
                      : X.now;
                    (X.currentYear = t.getFullYear()),
                      (X.currentMonth = t.getMonth()),
                      X.selectedDates.length &&
                        (X.latestSelectedDateObj = X.selectedDates[0]),
                      (X.minDateHasTime =
                        !!X.config.minDate &&
                        (X.config.minDate.getHours() > 0 ||
                          X.config.minDate.getMinutes() > 0 ||
                          X.config.minDate.getSeconds() > 0)),
                      (X.maxDateHasTime =
                        !!X.config.maxDate &&
                        (X.config.maxDate.getHours() > 0 ||
                          X.config.maxDate.getMinutes() > 0 ||
                          X.config.maxDate.getSeconds() > 0)),
                      Object.defineProperty(X, "showTimeInput", {
                        get: function () {
                          return X._showTimeInput;
                        },
                        set: function (e) {
                          (X._showTimeInput = e),
                            X.calendarContainer &&
                              n(X.calendarContainer, "showTimeInput", e),
                            B();
                        },
                      });
                  })(),
                  (X.utils = {
                    getDaysInMonth: function (e, t) {
                      return (
                        void 0 === e && (e = X.currentMonth),
                        void 0 === t && (t = X.currentYear),
                        1 === e &&
                        ((t % 4 == 0 && t % 100 != 0) || t % 400 == 0)
                          ? 29
                          : X.l10n.daysInMonth[e]
                      );
                    },
                  }),
                  X.isMobile ||
                    (function () {
                      var e = window.document.createDocumentFragment();
                      if (
                        ((X.calendarContainer = a("div", "flatpickr-calendar")),
                        (X.calendarContainer.tabIndex = -1),
                        !X.config.noCalendar)
                      ) {
                        if (
                          (e.appendChild(
                            (function () {
                              var e = window.document.createDocumentFragment();
                              (X.monthNav = a("div", "flatpickr-month")),
                                (X.prevMonthNav = a(
                                  "span",
                                  "flatpickr-prev-month"
                                )),
                                (X.prevMonthNav.innerHTML = X.config.prevArrow),
                                (X.currentMonthElement = a(
                                  "span",
                                  "cur-month"
                                )),
                                (X.currentMonthElement.title =
                                  X.l10n.scrollTitle);
                              var t = o("cur-year");
                              return (
                                (X.currentYearElement = t.childNodes[0]),
                                (X.currentYearElement.title =
                                  X.l10n.scrollTitle),
                                X.config.minDate &&
                                  (X.currentYearElement.min = X.config.minDate
                                    .getFullYear()
                                    .toString()),
                                X.config.maxDate &&
                                  ((X.currentYearElement.max = X.config.maxDate
                                    .getFullYear()
                                    .toString()),
                                  (X.currentYearElement.disabled =
                                    !!X.config.minDate &&
                                    X.config.minDate.getFullYear() ===
                                      X.config.maxDate.getFullYear())),
                                (X.nextMonthNav = a(
                                  "span",
                                  "flatpickr-next-month"
                                )),
                                (X.nextMonthNav.innerHTML = X.config.nextArrow),
                                (X.navigationCurrentMonth = a(
                                  "div",
                                  "flatpickr-current-month"
                                )),
                                X.navigationCurrentMonth.appendChild(
                                  X.currentMonthElement
                                ),
                                X.navigationCurrentMonth.appendChild(t),
                                e.appendChild(X.prevMonthNav),
                                e.appendChild(X.navigationCurrentMonth),
                                e.appendChild(X.nextMonthNav),
                                X.monthNav.appendChild(e),
                                Object.defineProperty(
                                  X,
                                  "_hidePrevMonthArrow",
                                  {
                                    get: function () {
                                      return X.__hidePrevMonthArrow;
                                    },
                                    set: function (e) {
                                      X.__hidePrevMonthArrow !== e &&
                                        (X.prevMonthNav.style.display = e
                                          ? "none"
                                          : "block"),
                                        (X.__hidePrevMonthArrow = e);
                                    },
                                  }
                                ),
                                Object.defineProperty(
                                  X,
                                  "_hideNextMonthArrow",
                                  {
                                    get: function () {
                                      return X.__hideNextMonthArrow;
                                    },
                                    set: function (e) {
                                      X.__hideNextMonthArrow !== e &&
                                        (X.nextMonthNav.style.display = e
                                          ? "none"
                                          : "block"),
                                        (X.__hideNextMonthArrow = e);
                                    },
                                  }
                                ),
                                Z(),
                                X.monthNav
                              );
                            })()
                          ),
                          (X.innerContainer = a(
                            "div",
                            "flatpickr-innerContainer"
                          )),
                          X.config.weekNumbers)
                        ) {
                          var t = (function () {
                              X.calendarContainer.classList.add("hasWeeks");
                              var e = a("div", "flatpickr-weekwrapper");
                              e.appendChild(
                                a(
                                  "span",
                                  "flatpickr-weekday",
                                  X.l10n.weekAbbreviation
                                )
                              );
                              var t = a("div", "flatpickr-weeks");
                              return (
                                e.appendChild(t),
                                { weekWrapper: e, weekNumbers: t }
                              );
                            })(),
                            i = t.weekWrapper,
                            r = t.weekNumbers;
                          X.innerContainer.appendChild(i),
                            (X.weekNumbers = r),
                            (X.weekWrapper = i);
                        }
                        (X.rContainer = a("div", "flatpickr-rContainer")),
                          X.rContainer.appendChild(O()),
                          X.daysContainer ||
                            ((X.daysContainer = a("div", "flatpickr-days")),
                            (X.daysContainer.tabIndex = -1)),
                          _(),
                          X.rContainer.appendChild(X.daysContainer),
                          X.innerContainer.appendChild(X.rContainer),
                          e.appendChild(X.innerContainer);
                      }
                      X.config.enableTime &&
                        e.appendChild(
                          (function () {
                            X.calendarContainer.classList.add("hasTime"),
                              X.config.noCalendar &&
                                X.calendarContainer.classList.add("noCalendar"),
                              (X.timeContainer = a("div", "flatpickr-time")),
                              (X.timeContainer.tabIndex = -1);
                            var e = a("span", "flatpickr-time-separator", ":"),
                              t = o("flatpickr-hour");
                            X.hourElement = t.childNodes[0];
                            var n = o("flatpickr-minute");
                            if (
                              ((X.minuteElement = n.childNodes[0]),
                              (X.hourElement.tabIndex =
                                X.minuteElement.tabIndex =
                                  -1),
                              (X.hourElement.value = f(
                                X.latestSelectedDateObj
                                  ? X.latestSelectedDateObj.getHours()
                                  : X.config.time_24hr
                                  ? X.config.defaultHour
                                  : (function (e) {
                                      switch (e % 24) {
                                        case 0:
                                        case 12:
                                          return 12;
                                        default:
                                          return e % 12;
                                      }
                                    })(X.config.defaultHour)
                              )),
                              (X.minuteElement.value = f(
                                X.latestSelectedDateObj
                                  ? X.latestSelectedDateObj.getMinutes()
                                  : X.config.defaultMinute
                              )),
                              (X.hourElement.step =
                                X.config.hourIncrement.toString()),
                              (X.minuteElement.step =
                                X.config.minuteIncrement.toString()),
                              (X.hourElement.min = X.config.time_24hr
                                ? "0"
                                : "1"),
                              (X.hourElement.max = X.config.time_24hr
                                ? "23"
                                : "12"),
                              (X.minuteElement.min = "0"),
                              (X.minuteElement.max = "59"),
                              (X.hourElement.title = X.minuteElement.title =
                                X.l10n.scrollTitle),
                              X.timeContainer.appendChild(t),
                              X.timeContainer.appendChild(e),
                              X.timeContainer.appendChild(n),
                              X.config.time_24hr &&
                                X.timeContainer.classList.add("time24hr"),
                              X.config.enableSeconds)
                            ) {
                              X.timeContainer.classList.add("hasSeconds");
                              var i = o("flatpickr-second");
                              (X.secondElement = i.childNodes[0]),
                                (X.secondElement.value = f(
                                  X.latestSelectedDateObj
                                    ? X.latestSelectedDateObj.getSeconds()
                                    : X.config.defaultSeconds
                                )),
                                (X.secondElement.step = X.minuteElement.step),
                                (X.secondElement.min = X.minuteElement.min),
                                (X.secondElement.max = X.minuteElement.max),
                                X.timeContainer.appendChild(
                                  a("span", "flatpickr-time-separator", ":")
                                ),
                                X.timeContainer.appendChild(i);
                            }
                            return (
                              X.config.time_24hr ||
                                ((X.amPM = a(
                                  "span",
                                  "flatpickr-am-pm",
                                  X.l10n.amPM[
                                    m(
                                      (X.latestSelectedDateObj
                                        ? X.hourElement.value
                                        : X.config.defaultHour) > 11
                                    )
                                  ]
                                )),
                                (X.amPM.title = X.l10n.toggleTitle),
                                (X.amPM.tabIndex = -1),
                                X.timeContainer.appendChild(X.amPM)),
                              X.timeContainer
                            );
                          })()
                        ),
                        n(
                          X.calendarContainer,
                          "rangeMode",
                          "range" === X.config.mode
                        ),
                        n(X.calendarContainer, "animate", X.config.animate),
                        X.calendarContainer.appendChild(e);
                      var l =
                        void 0 !== X.config.appendTo &&
                        X.config.appendTo.nodeType;
                      if (
                        (X.config.inline || X.config.static) &&
                        (X.calendarContainer.classList.add(
                          X.config.inline ? "inline" : "static"
                        ),
                        X.config.inline &&
                          (!l && X.element.parentNode
                            ? X.element.parentNode.insertBefore(
                                X.calendarContainer,
                                X._input.nextSibling
                              )
                            : void 0 !== X.config.appendTo &&
                              X.config.appendTo.appendChild(
                                X.calendarContainer
                              )),
                        X.config.static)
                      ) {
                        var c = a("div", "flatpickr-wrapper");
                        X.element.parentNode &&
                          X.element.parentNode.insertBefore(c, X.element),
                          c.appendChild(X.element),
                          X.altInput && c.appendChild(X.altInput),
                          c.appendChild(X.calendarContainer);
                      }
                      X.config.static ||
                        X.config.inline ||
                        (void 0 !== X.config.appendTo
                          ? X.config.appendTo
                          : window.document.body
                        ).appendChild(X.calendarContainer);
                    })(),
                  (function () {
                    if (
                      (X.config.wrap &&
                        ["open", "close", "toggle", "clear"].forEach(function (
                          e
                        ) {
                          Array.prototype.forEach.call(
                            X.element.querySelectorAll("[data-" + e + "]"),
                            function (t) {
                              return y(t, "click", X[e]);
                            }
                          );
                        }),
                      X.isMobile)
                    )
                      !(function () {
                        var e = X.config.enableTime
                          ? X.config.noCalendar
                            ? "time"
                            : "datetime-local"
                          : "date";
                        (X.mobileInput = a(
                          "input",
                          X.input.className + " flatpickr-mobile"
                        )),
                          (X.mobileInput.step =
                            X.input.getAttribute("step") || "any"),
                          (X.mobileInput.tabIndex = 1),
                          (X.mobileInput.type = e),
                          (X.mobileInput.disabled = X.input.disabled),
                          (X.mobileInput.placeholder = X.input.placeholder),
                          (X.mobileFormatStr =
                            "datetime-local" === e
                              ? "Y-m-d\\TH:i:S"
                              : "date" === e
                              ? "Y-m-d"
                              : "H:i:S"),
                          X.selectedDates.length &&
                            (X.mobileInput.defaultValue = X.mobileInput.value =
                              X.formatDate(
                                X.selectedDates[0],
                                X.mobileFormatStr
                              )),
                          X.config.minDate &&
                            (X.mobileInput.min = X.formatDate(
                              X.config.minDate,
                              "Y-m-d"
                            )),
                          X.config.maxDate &&
                            (X.mobileInput.max = X.formatDate(
                              X.config.maxDate,
                              "Y-m-d"
                            )),
                          (X.input.type = "hidden"),
                          void 0 !== X.altInput && (X.altInput.type = "hidden");
                        try {
                          X.input.parentNode &&
                            X.input.parentNode.insertBefore(
                              X.mobileInput,
                              X.input.nextSibling
                            );
                        } catch (e) {}
                        y(X.mobileInput, "change", function (e) {
                          X.setDate(e.target.value, !1, X.mobileFormatStr),
                            z("onChange"),
                            z("onClose");
                        });
                      })();
                    else {
                      var e = t(function () {
                        !X.isOpen || X.config.static || X.config.inline || B();
                      }, 50);
                      (X._debouncedChange = t(E, 300)),
                        "range" === X.config.mode &&
                          X.daysContainer &&
                          !/iPhone|iPad|iPod/i.test(navigator.userAgent) &&
                          y(X.daysContainer, "mouseover", function (e) {
                            return R(e.target);
                          }),
                        y(window.document.body, "keydown", H),
                        X.config.static || y(X._input, "keydown", H),
                        X.config.inline ||
                          X.config.static ||
                          y(window, "resize", e),
                        void 0 !== window.ontouchstart &&
                          y(window.document.body, "touchstart", L),
                        y(window.document.body, "mousedown", x(L)),
                        y(X._input, "blur", L),
                        !0 === X.config.clickOpens &&
                          (y(X._input, "focus", X.open),
                          y(X._input, "mousedown", x(X.open))),
                        void 0 !== X.daysContainer &&
                          (X.monthNav.addEventListener("wheel", function (e) {
                            return e.preventDefault();
                          }),
                          y(
                            X.monthNav,
                            "wheel",
                            t(function (e) {
                              e.preventDefault();
                              var t =
                                X.currentYearElement.parentNode &&
                                X.currentYearElement.parentNode.contains(
                                  e.target
                                );
                              if (e.target === X.currentMonthElement || t) {
                                var n = (function (e) {
                                  return (e.wheelDelta || -e.deltaY) >= 0
                                    ? 1
                                    : -1;
                                })(e);
                                t
                                  ? (A(X.currentYear + n),
                                    (e.target.value = X.currentYear.toString()))
                                  : X.changeMonth(n, !0, !1);
                              }
                            }, 10)
                          ),
                          y(
                            X.monthNav,
                            "mousedown",
                            x(function (e) {
                              var t = X.prevMonthNav.contains(e.target),
                                n = X.nextMonthNav.contains(e.target);
                              t || n
                                ? P(t ? -1 : 1)
                                : e.target === X.currentYearElement
                                ? (e.preventDefault(),
                                  X.currentYearElement.select())
                                : "arrowUp" === e.target.className
                                ? X.changeYear(X.currentYear + 1)
                                : "arrowDown" === e.target.className &&
                                  X.changeYear(X.currentYear - 1);
                            })
                          ),
                          y(X.monthNav, ["keyup", "increment"], function (e) {
                            var t = parseInt(e.target.value) + (e.delta || 0);
                            (4 !== t.toString().length && "Enter" !== e.key) ||
                              (X.currentYearElement.blur(),
                              /[^\d]/.test(t.toString()) || A(t));
                          }),
                          y(X.daysContainer, "mousedown", x(K)),
                          X.config.animate &&
                            (y(
                              X.daysContainer,
                              ["webkitAnimationEnd", "animationend"],
                              function (e) {
                                if (
                                  X.daysContainer &&
                                  X.daysContainer.childNodes.length > 1
                                )
                                  switch (e.animationName) {
                                    case "fpSlideLeft":
                                      X.daysContainer.lastChild &&
                                        X.daysContainer.lastChild.classList.remove(
                                          "slideLeftNew"
                                        ),
                                        X.daysContainer.removeChild(
                                          X.daysContainer.firstChild
                                        ),
                                        (X.days = X.daysContainer.firstChild),
                                        N();
                                      break;
                                    case "fpSlideRight":
                                      X.daysContainer.firstChild &&
                                        X.daysContainer.firstChild.classList.remove(
                                          "slideRightNew"
                                        ),
                                        X.daysContainer.removeChild(
                                          X.daysContainer.lastChild
                                        ),
                                        (X.days = X.daysContainer.firstChild),
                                        N();
                                  }
                              }
                            ),
                            y(
                              X.monthNav,
                              ["webkitAnimationEnd", "animationend"],
                              function (e) {
                                switch (e.animationName) {
                                  case "fpSlideLeftNew":
                                  case "fpSlideRightNew":
                                    X.navigationCurrentMonth.classList.remove(
                                      "slideLeftNew"
                                    ),
                                      X.navigationCurrentMonth.classList.remove(
                                        "slideRightNew"
                                      );
                                    for (
                                      var t = X.navigationCurrentMonth;
                                      t.nextSibling &&
                                      /curr/.test(t.nextSibling.className);

                                    )
                                      X.monthNav.removeChild(t.nextSibling);
                                    for (
                                      ;
                                      t.previousSibling &&
                                      /curr/.test(t.previousSibling.className);

                                    )
                                      X.monthNav.removeChild(t.previousSibling);
                                    X.oldCurMonth = void 0;
                                }
                              }
                            ))),
                        void 0 !== X.timeContainer &&
                          void 0 !== X.minuteElement &&
                          void 0 !== X.hourElement &&
                          (y(
                            X.timeContainer,
                            ["wheel", "input", "increment"],
                            p
                          ),
                          y(
                            X.timeContainer,
                            "mousedown",
                            x(function (e) {
                              ~e.target.className.indexOf("arrow") &&
                                S(
                                  e,
                                  e.target.classList.contains("arrowUp")
                                    ? 1
                                    : -1
                                );
                            })
                          ),
                          y(
                            X.timeContainer,
                            ["wheel", "increment"],
                            X._debouncedChange
                          ),
                          y(X.timeContainer, "input", E),
                          y(
                            [X.hourElement, X.minuteElement],
                            ["focus", "click"],
                            function (e) {
                              return e.target.select();
                            }
                          ),
                          void 0 !== X.secondElement &&
                            y(X.secondElement, "focus", function () {
                              return (
                                X.secondElement && X.secondElement.select()
                              );
                            }),
                          void 0 !== X.amPM &&
                            y(
                              X.amPM,
                              "mousedown",
                              x(function (e) {
                                p(e), E();
                              })
                            ));
                    }
                  })(),
                  (X.selectedDates.length || X.config.noCalendar) &&
                    (X.config.enableTime &&
                      M(
                        X.config.noCalendar
                          ? X.latestSelectedDateObj || X.config.minDate
                          : void 0
                      ),
                    Q(!1)),
                  (X.showTimeInput =
                    X.selectedDates.length > 0 || X.config.noCalendar),
                  void 0 !== X.weekWrapper &&
                    void 0 !== X.daysContainer &&
                    (X.calendarContainer.style.width =
                      X.daysContainer.offsetWidth +
                      X.weekWrapper.offsetWidth +
                      "px"),
                  X.isMobile || B(),
                  z("onReady");
              })(),
              X
            );
          })(M, s || {})),
          p.push(M._flatpickr);
      } catch (e) {
        console.error(e);
      }
    }
    return 1 === p.length ? p[0] : p;
  }
  var l =
      Object.assign ||
      function (e) {
        for (var t, n = 1, a = arguments.length; n < a; n++) {
          t = arguments[n];
          for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        }
        return e;
      },
    c = function (e, t, n) {
      return n.months[t ? "shorthand" : "longhand"][e];
    },
    d = { DAY: 864e5 },
    s = {
      _disable: [],
      _enable: [],
      allowInput: !1,
      altFormat: "F j, Y",
      altInput: !1,
      altInputClass: "form-control input",
      animate:
        "object" == typeof window &&
        -1 === window.navigator.userAgent.indexOf("MSIE"),
      ariaDateFormat: "F j, Y",
      clickOpens: !0,
      closeOnSelect: !0,
      conjunction: ", ",
      dateFormat: "Y-m-d",
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: !1,
      enable: [],
      enableSeconds: !1,
      enableTime: !1,
      errorHandler: console.warn,
      getWeek: function (e) {
        var t = new Date(e.getFullYear(), 0, 1);
        return Math.ceil(
          ((e.getTime() - t.getTime()) / 864e5 + t.getDay() + 1) / 7
        );
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: !1,
      locale: "default",
      minuteIncrement: 5,
      mode: "single",
      nextArrow:
        "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: !1,
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      plugins: [],
      position: "auto",
      positionElement: void 0,
      prevArrow:
        "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: !1,
      static: !1,
      time_24hr: !1,
      weekNumbers: !1,
      wrap: !1,
    },
    u = {
      weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      months: {
        shorthand: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        longhand: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: function (e) {
        var t = e % 100;
        if (t > 3 && t < 21) return "th";
        switch (t % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      },
      rangeSeparator: " to ",
      weekAbbreviation: "Wk",
      scrollTitle: "Scroll to increment",
      toggleTitle: "Click to toggle",
      amPM: ["AM", "PM"],
    },
    f = function (e) {
      return ("0" + e).slice(-2);
    },
    m = function (e) {
      return !0 === e ? 1 : 0;
    },
    g = function (e) {
      return e instanceof Array ? e : [e];
    },
    p = function () {},
    h = {
      D: p,
      F: function (e, t, n) {
        e.setMonth(n.months.longhand.indexOf(t));
      },
      G: function (e, t) {
        e.setHours(parseFloat(t));
      },
      H: function (e, t) {
        e.setHours(parseFloat(t));
      },
      J: function (e, t) {
        e.setDate(parseFloat(t));
      },
      K: function (e, t, n) {
        e.setHours(
          (e.getHours() % 12) + 12 * m(new RegExp(n.amPM[1], "i").test(t))
        );
      },
      M: function (e, t, n) {
        e.setMonth(n.months.shorthand.indexOf(t));
      },
      S: function (e, t) {
        e.setSeconds(parseFloat(t));
      },
      U: function (e, t) {
        return new Date(1e3 * parseFloat(t));
      },
      W: function (e, t) {
        var n = parseInt(t);
        return new Date(e.getFullYear(), 0, 2 + 7 * (n - 1), 0, 0, 0, 0);
      },
      Y: function (e, t) {
        e.setFullYear(parseFloat(t));
      },
      Z: function (e, t) {
        return new Date(t);
      },
      d: function (e, t) {
        e.setDate(parseFloat(t));
      },
      h: function (e, t) {
        e.setHours(parseFloat(t));
      },
      i: function (e, t) {
        e.setMinutes(parseFloat(t));
      },
      j: function (e, t) {
        e.setDate(parseFloat(t));
      },
      l: p,
      m: function (e, t) {
        e.setMonth(parseFloat(t) - 1);
      },
      n: function (e, t) {
        e.setMonth(parseFloat(t) - 1);
      },
      s: function (e, t) {
        e.setSeconds(parseFloat(t));
      },
      w: p,
      y: function (e, t) {
        e.setFullYear(2e3 + parseFloat(t));
      },
    },
    v = {
      D: "(\\w+)",
      F: "(\\w+)",
      G: "(\\d\\d|\\d)",
      H: "(\\d\\d|\\d)",
      J: "(\\d\\d|\\d)\\w+",
      K: "",
      M: "(\\w+)",
      S: "(\\d\\d|\\d)",
      U: "(.+)",
      W: "(\\d\\d|\\d)",
      Y: "(\\d{4})",
      Z: "(.+)",
      d: "(\\d\\d|\\d)",
      h: "(\\d\\d|\\d)",
      i: "(\\d\\d|\\d)",
      j: "(\\d\\d|\\d)",
      l: "(\\w+)",
      m: "(\\d\\d|\\d)",
      n: "(\\d\\d|\\d)",
      s: "(\\d\\d|\\d)",
      w: "(\\d\\d|\\d)",
      y: "(\\d{2})",
    },
    D = {
      Z: function (e) {
        return e.toISOString();
      },
      D: function (e, t, n) {
        return t.weekdays.shorthand[D.w(e, t, n)];
      },
      F: function (e, t, n) {
        return c(D.n(e, t, n) - 1, !1, t);
      },
      G: function (e, t, n) {
        return f(D.h(e, t, n));
      },
      H: function (e) {
        return f(e.getHours());
      },
      J: function (e, t) {
        return void 0 !== t.ordinal
          ? e.getDate() + t.ordinal(e.getDate())
          : e.getDate();
      },
      K: function (e, t) {
        return t.amPM[m(e.getHours() > 11)];
      },
      M: function (e, t) {
        return c(e.getMonth(), !0, t);
      },
      S: function (e) {
        return f(e.getSeconds());
      },
      U: function (e) {
        return e.getTime() / 1e3;
      },
      W: function (e, t, n) {
        return n.getWeek(e);
      },
      Y: function (e) {
        return e.getFullYear();
      },
      d: function (e) {
        return f(e.getDate());
      },
      h: function (e) {
        return e.getHours() % 12 ? e.getHours() % 12 : 12;
      },
      i: function (e) {
        return f(e.getMinutes());
      },
      j: function (e) {
        return e.getDate();
      },
      l: function (e, t) {
        return t.weekdays.longhand[e.getDay()];
      },
      m: function (e) {
        return f(e.getMonth() + 1);
      },
      n: function (e) {
        return e.getMonth() + 1;
      },
      s: function (e) {
        return e.getSeconds();
      },
      w: function (e) {
        return e.getDay();
      },
      y: function (e) {
        return String(e.getFullYear()).substring(2);
      },
    };
  "function" != typeof Object.assign &&
    (Object.assign = function (e) {
      for (var t = [], n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      if (!e) throw TypeError("Cannot convert undefined or null to object");
      for (var a = 0, i = t; a < i.length; a++)
        !(function (t) {
          t &&
            Object.keys(t).forEach(function (n) {
              return (e[n] = t[n]);
            });
        })(i[a]);
      return e;
    }),
    "undefined" != typeof HTMLElement &&
      ((HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr =
        function (e) {
          return r(this, e);
        }),
      (HTMLElement.prototype.flatpickr = function (e) {
        return r([this], e);
      }));
  var C;
  return (
    (C = function (e, t) {
      return e instanceof NodeList
        ? r(e, t)
        : "string" == typeof e
        ? r(window.document.querySelectorAll(e), t)
        : r([e], t);
    }),
    "object" == typeof window && (window.flatpickr = C),
    (C.defaultConfig = s),
    (C.l10ns = { en: l({}, u), default: l({}, u) }),
    (C.localize = function (e) {
      C.l10ns.default = l({}, C.l10ns.default, e);
    }),
    (C.setDefaults = function (e) {
      C.defaultConfig = l({}, C.defaultConfig, e);
    }),
    "undefined" != typeof jQuery &&
      (jQuery.fn.flatpickr = function (e) {
        return r(this, e);
      }),
    (Date.prototype.fp_incr = function (e) {
      return new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate() + ("string" == typeof e ? parseInt(e, 10) : e)
      );
    }),
    C
  );
});
