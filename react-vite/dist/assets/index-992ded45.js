function tf(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o &&
            Object.defineProperty(
              e,
              l,
              o.get ? o : { enumerable: !0, get: () => r[l] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function nf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var rf = { exports: {} },
  To = {},
  lf = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yl = Symbol.for("react.element"),
  yh = Symbol.for("react.portal"),
  gh = Symbol.for("react.fragment"),
  wh = Symbol.for("react.strict_mode"),
  Sh = Symbol.for("react.profiler"),
  xh = Symbol.for("react.provider"),
  Eh = Symbol.for("react.context"),
  Ch = Symbol.for("react.forward_ref"),
  kh = Symbol.for("react.suspense"),
  Ph = Symbol.for("react.memo"),
  Rh = Symbol.for("react.lazy"),
  Ss = Symbol.iterator;
function _h(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ss && e[Ss]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var of = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  uf = Object.assign,
  af = {};
function hr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = af),
    (this.updater = n || of);
}
hr.prototype.isReactComponent = {};
hr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
hr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function sf() {}
sf.prototype = hr.prototype;
function na(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = af),
    (this.updater = n || of);
}
var ra = (na.prototype = new sf());
ra.constructor = na;
uf(ra, hr.prototype);
ra.isPureReactComponent = !0;
var xs = Array.isArray,
  cf = Object.prototype.hasOwnProperty,
  la = { current: null },
  ff = { key: !0, ref: !0, __self: !0, __source: !0 };
function df(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      cf.call(t, r) && !ff.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), s = 0; s < u; s++) a[s] = arguments[s + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: yl,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: la.current,
  };
}
function Lh(e, t) {
  return {
    $$typeof: yl,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function oa(e) {
  return typeof e == "object" && e !== null && e.$$typeof === yl;
}
function Nh(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Es = /\/+/g;
function Ri(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Nh("" + e.key)
    : t.toString(36);
}
function Wl(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case yl:
          case yh:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + Ri(i, 0) : r),
      xs(l)
        ? ((n = ""),
          e != null && (n = e.replace(Es, "$&/") + "/"),
          Wl(l, t, n, "", function (s) {
            return s;
          }))
        : l != null &&
          (oa(l) &&
            (l = Lh(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(Es, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), xs(e)))
    for (var u = 0; u < e.length; u++) {
      o = e[u];
      var a = r + Ri(o, u);
      i += Wl(o, t, n, a, l);
    }
  else if (((a = _h(e)), typeof a == "function"))
    for (e = a.call(e), u = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + Ri(o, u++)), (i += Wl(o, t, n, a, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return i;
}
function Rl(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Wl(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function jh(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var $e = { current: null },
  Hl = { transition: null },
  Th = {
    ReactCurrentDispatcher: $e,
    ReactCurrentBatchConfig: Hl,
    ReactCurrentOwner: la,
  };
Q.Children = {
  map: Rl,
  forEach: function (e, t, n) {
    Rl(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Rl(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Rl(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!oa(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
Q.Component = hr;
Q.Fragment = gh;
Q.Profiler = Sh;
Q.PureComponent = na;
Q.StrictMode = wh;
Q.Suspense = kh;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Th;
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = uf({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = la.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (a in t)
      cf.call(t, a) &&
        !ff.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var s = 0; s < a; s++) u[s] = arguments[s + 2];
    r.children = u;
  }
  return { $$typeof: yl, type: e.type, key: l, ref: o, props: r, _owner: i };
};
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: Eh,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: xh, _context: e }),
    (e.Consumer = e)
  );
};
Q.createElement = df;
Q.createFactory = function (e) {
  var t = df.bind(null, e);
  return (t.type = e), t;
};
Q.createRef = function () {
  return { current: null };
};
Q.forwardRef = function (e) {
  return { $$typeof: Ch, render: e };
};
Q.isValidElement = oa;
Q.lazy = function (e) {
  return { $$typeof: Rh, _payload: { _status: -1, _result: e }, _init: jh };
};
Q.memo = function (e, t) {
  return { $$typeof: Ph, type: e, compare: t === void 0 ? null : t };
};
Q.startTransition = function (e) {
  var t = Hl.transition;
  Hl.transition = {};
  try {
    e();
  } finally {
    Hl.transition = t;
  }
};
Q.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
Q.useCallback = function (e, t) {
  return $e.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return $e.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return $e.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return $e.current.useEffect(e, t);
};
Q.useId = function () {
  return $e.current.useId();
};
Q.useImperativeHandle = function (e, t, n) {
  return $e.current.useImperativeHandle(e, t, n);
};
Q.useInsertionEffect = function (e, t) {
  return $e.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return $e.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return $e.current.useMemo(e, t);
};
Q.useReducer = function (e, t, n) {
  return $e.current.useReducer(e, t, n);
};
Q.useRef = function (e) {
  return $e.current.useRef(e);
};
Q.useState = function (e) {
  return $e.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, n) {
  return $e.current.useSyncExternalStore(e, t, n);
};
Q.useTransition = function () {
  return $e.current.useTransition();
};
Q.version = "18.2.0";
lf.exports = Q;
var E = lf.exports;
const Tt = nf(E),
  Mh = tf({ __proto__: null, default: Tt }, [E]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oh = E,
  Dh = Symbol.for("react.element"),
  zh = Symbol.for("react.fragment"),
  Fh = Object.prototype.hasOwnProperty,
  Ih = Oh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  $h = { key: !0, ref: !0, __self: !0, __source: !0 };
function pf(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) Fh.call(t, r) && !$h.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Dh,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: Ih.current,
  };
}
To.Fragment = zh;
To.jsx = pf;
To.jsxs = pf;
rf.exports = To;
var P = rf.exports,
  ru = {},
  hf = { exports: {} },
  Je = {},
  mf = { exports: {} },
  vf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(M, F) {
    var B = M.length;
    M.push(F);
    e: for (; 0 < B; ) {
      var b = (B - 1) >>> 1,
        Z = M[b];
      if (0 < l(Z, F)) (M[b] = F), (M[B] = Z), (B = b);
      else break e;
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0) return null;
    var F = M[0],
      B = M.pop();
    if (B !== F) {
      M[0] = B;
      e: for (var b = 0, Z = M.length, be = Z >>> 1; b < be; ) {
        var De = 2 * (b + 1) - 1,
          hn = M[De],
          Rt = De + 1,
          zn = M[Rt];
        if (0 > l(hn, B))
          Rt < Z && 0 > l(zn, hn)
            ? ((M[b] = zn), (M[Rt] = B), (b = Rt))
            : ((M[b] = hn), (M[De] = B), (b = De));
        else if (Rt < Z && 0 > l(zn, B)) (M[b] = zn), (M[Rt] = B), (b = Rt);
        else break e;
      }
    }
    return F;
  }
  function l(M, F) {
    var B = M.sortIndex - F.sortIndex;
    return B !== 0 ? B : M.id - F.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      u = i.now();
    e.unstable_now = function () {
      return i.now() - u;
    };
  }
  var a = [],
    s = [],
    c = 1,
    m = null,
    h = 3,
    S = !1,
    y = !1,
    w = !1,
    R = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(M) {
    for (var F = n(s); F !== null; ) {
      if (F.callback === null) r(s);
      else if (F.startTime <= M)
        r(s), (F.sortIndex = F.expirationTime), t(a, F);
      else break;
      F = n(s);
    }
  }
  function p(M) {
    if (((w = !1), v(M), !y))
      if (n(a) !== null) (y = !0), Bt(_);
      else {
        var F = n(s);
        F !== null && Pt(p, F.startTime - M);
      }
  }
  function _(M, F) {
    (y = !1), w && ((w = !1), d(T), (T = -1)), (S = !0);
    var B = h;
    try {
      for (
        v(F), m = n(a);
        m !== null && (!(m.expirationTime > F) || (M && !X()));

      ) {
        var b = m.callback;
        if (typeof b == "function") {
          (m.callback = null), (h = m.priorityLevel);
          var Z = b(m.expirationTime <= F);
          (F = e.unstable_now()),
            typeof Z == "function" ? (m.callback = Z) : m === n(a) && r(a),
            v(F);
        } else r(a);
        m = n(a);
      }
      if (m !== null) var be = !0;
      else {
        var De = n(s);
        De !== null && Pt(p, De.startTime - F), (be = !1);
      }
      return be;
    } finally {
      (m = null), (h = B), (S = !1);
    }
  }
  var N = !1,
    k = null,
    T = -1,
    I = 5,
    $ = -1;
  function X() {
    return !(e.unstable_now() - $ < I);
  }
  function ke() {
    if (k !== null) {
      var M = e.unstable_now();
      $ = M;
      var F = !0;
      try {
        F = k(!0, M);
      } finally {
        F ? Se() : ((N = !1), (k = null));
      }
    } else N = !1;
  }
  var Se;
  if (typeof f == "function")
    Se = function () {
      f(ke);
    };
  else if (typeof MessageChannel < "u") {
    var kt = new MessageChannel(),
      ce = kt.port2;
    (kt.port1.onmessage = ke),
      (Se = function () {
        ce.postMessage(null);
      });
  } else
    Se = function () {
      R(ke, 0);
    };
  function Bt(M) {
    (k = M), N || ((N = !0), Se());
  }
  function Pt(M, F) {
    T = R(function () {
      M(e.unstable_now());
    }, F);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      y || S || ((y = !0), Bt(_));
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (I = 0 < M ? Math.floor(1e3 / M) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (M) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = h;
      }
      var B = h;
      h = F;
      try {
        return M();
      } finally {
        h = B;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, F) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var B = h;
      h = M;
      try {
        return F();
      } finally {
        h = B;
      }
    }),
    (e.unstable_scheduleCallback = function (M, F, B) {
      var b = e.unstable_now();
      switch (
        (typeof B == "object" && B !== null
          ? ((B = B.delay), (B = typeof B == "number" && 0 < B ? b + B : b))
          : (B = b),
        M)
      ) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return (
        (Z = B + Z),
        (M = {
          id: c++,
          callback: F,
          priorityLevel: M,
          startTime: B,
          expirationTime: Z,
          sortIndex: -1,
        }),
        B > b
          ? ((M.sortIndex = B),
            t(s, M),
            n(a) === null &&
              M === n(s) &&
              (w ? (d(T), (T = -1)) : (w = !0), Pt(p, B - b)))
          : ((M.sortIndex = Z), t(a, M), y || S || ((y = !0), Bt(_))),
        M
      );
    }),
    (e.unstable_shouldYield = X),
    (e.unstable_wrapCallback = function (M) {
      var F = h;
      return function () {
        var B = h;
        h = F;
        try {
          return M.apply(this, arguments);
        } finally {
          h = B;
        }
      };
    });
})(vf);
mf.exports = vf;
var Uh = mf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yf = E,
  Ge = Uh;
function L(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var gf = new Set(),
  qr = {};
function Mn(e, t) {
  or(e, t), or(e + "Capture", t);
}
function or(e, t) {
  for (qr[e] = t, e = 0; e < t.length; e++) gf.add(t[e]);
}
var Dt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  lu = Object.prototype.hasOwnProperty,
  Ah =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Cs = {},
  ks = {};
function Bh(e) {
  return lu.call(ks, e)
    ? !0
    : lu.call(Cs, e)
      ? !1
      : Ah.test(e)
        ? (ks[e] = !0)
        : ((Cs[e] = !0), !1);
}
function Vh(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Wh(e, t, n, r) {
  if (t === null || typeof t > "u" || Vh(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ue(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var Le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Le[e] = new Ue(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Le[t] = new Ue(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Le[e] = new Ue(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Le[e] = new Ue(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Le[e] = new Ue(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Le[e] = new Ue(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Le[e] = new Ue(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Le[e] = new Ue(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Le[e] = new Ue(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ia = /[\-:]([a-z])/g;
function ua(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ia, ua);
    Le[t] = new Ue(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ia, ua);
    Le[t] = new Ue(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ia, ua);
  Le[t] = new Ue(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Le[e] = new Ue(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Le.xlinkHref = new Ue(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Le[e] = new Ue(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function aa(e, t, n, r) {
  var l = Le.hasOwnProperty(t) ? Le[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Wh(t, n, l, r) && (n = null),
    r || l === null
      ? Bh(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var $t = yf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  _l = Symbol.for("react.element"),
  Un = Symbol.for("react.portal"),
  An = Symbol.for("react.fragment"),
  sa = Symbol.for("react.strict_mode"),
  ou = Symbol.for("react.profiler"),
  wf = Symbol.for("react.provider"),
  Sf = Symbol.for("react.context"),
  ca = Symbol.for("react.forward_ref"),
  iu = Symbol.for("react.suspense"),
  uu = Symbol.for("react.suspense_list"),
  fa = Symbol.for("react.memo"),
  Kt = Symbol.for("react.lazy"),
  xf = Symbol.for("react.offscreen"),
  Ps = Symbol.iterator;
function kr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ps && e[Ps]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var se = Object.assign,
  _i;
function Ir(e) {
  if (_i === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      _i = (t && t[1]) || "";
    }
  return (
    `
` +
    _i +
    e
  );
}
var Li = !1;
function Ni(e, t) {
  if (!e || Li) return "";
  Li = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var l = s.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          u = o.length - 1;
        1 <= i && 0 <= u && l[i] !== o[u];

      )
        u--;
      for (; 1 <= i && 0 <= u; i--, u--)
        if (l[i] !== o[u]) {
          if (i !== 1 || u !== 1)
            do
              if ((i--, u--, 0 > u || l[i] !== o[u])) {
                var a =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= i && 0 <= u);
          break;
        }
    }
  } finally {
    (Li = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Ir(e) : "";
}
function Hh(e) {
  switch (e.tag) {
    case 5:
      return Ir(e.type);
    case 16:
      return Ir("Lazy");
    case 13:
      return Ir("Suspense");
    case 19:
      return Ir("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ni(e.type, !1)), e;
    case 11:
      return (e = Ni(e.type.render, !1)), e;
    case 1:
      return (e = Ni(e.type, !0)), e;
    default:
      return "";
  }
}
function au(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case An:
      return "Fragment";
    case Un:
      return "Portal";
    case ou:
      return "Profiler";
    case sa:
      return "StrictMode";
    case iu:
      return "Suspense";
    case uu:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Sf:
        return (e.displayName || "Context") + ".Consumer";
      case wf:
        return (e._context.displayName || "Context") + ".Provider";
      case ca:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case fa:
        return (
          (t = e.displayName || null), t !== null ? t : au(e.type) || "Memo"
        );
      case Kt:
        (t = e._payload), (e = e._init);
        try {
          return au(e(t));
        } catch {}
    }
  return null;
}
function Qh(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return au(t);
    case 8:
      return t === sa ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function un(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ef(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Kh(e) {
  var t = Ef(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Ll(e) {
  e._valueTracker || (e._valueTracker = Kh(e));
}
function Cf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Ef(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function to(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function su(e, t) {
  var n = t.checked;
  return se({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Rs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = un(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function kf(e, t) {
  (t = t.checked), t != null && aa(e, "checked", t, !1);
}
function cu(e, t) {
  kf(e, t);
  var n = un(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? fu(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && fu(e, t.type, un(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function _s(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function fu(e, t, n) {
  (t !== "number" || to(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var $r = Array.isArray;
function qn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + un(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function du(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
  return se({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ls(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(L(92));
      if ($r(n)) {
        if (1 < n.length) throw Error(L(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: un(n) };
}
function Pf(e, t) {
  var n = un(t.value),
    r = un(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Ns(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Rf(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function pu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Rf(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Nl,
  _f = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Nl = Nl || document.createElement("div"),
          Nl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Nl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function br(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Br = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Yh = ["Webkit", "ms", "Moz", "O"];
Object.keys(Br).forEach(function (e) {
  Yh.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Br[t] = Br[e]);
  });
});
function Lf(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Br.hasOwnProperty(e) && Br[e])
      ? ("" + t).trim()
      : t + "px";
}
function Nf(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Lf(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var Xh = se(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function hu(e, t) {
  if (t) {
    if (Xh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(L(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(L(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(L(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(L(62));
  }
}
function mu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var vu = null;
function da(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var yu = null,
  bn = null,
  er = null;
function js(e) {
  if ((e = Sl(e))) {
    if (typeof yu != "function") throw Error(L(280));
    var t = e.stateNode;
    t && ((t = Fo(t)), yu(e.stateNode, e.type, t));
  }
}
function jf(e) {
  bn ? (er ? er.push(e) : (er = [e])) : (bn = e);
}
function Tf() {
  if (bn) {
    var e = bn,
      t = er;
    if (((er = bn = null), js(e), t)) for (e = 0; e < t.length; e++) js(t[e]);
  }
}
function Mf(e, t) {
  return e(t);
}
function Of() {}
var ji = !1;
function Df(e, t, n) {
  if (ji) return e(t, n);
  ji = !0;
  try {
    return Mf(e, t, n);
  } finally {
    (ji = !1), (bn !== null || er !== null) && (Of(), Tf());
  }
}
function el(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Fo(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(L(231, t, typeof n));
  return n;
}
var gu = !1;
if (Dt)
  try {
    var Pr = {};
    Object.defineProperty(Pr, "passive", {
      get: function () {
        gu = !0;
      },
    }),
      window.addEventListener("test", Pr, Pr),
      window.removeEventListener("test", Pr, Pr);
  } catch {
    gu = !1;
  }
function Gh(e, t, n, r, l, o, i, u, a) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (c) {
    this.onError(c);
  }
}
var Vr = !1,
  no = null,
  ro = !1,
  wu = null,
  Jh = {
    onError: function (e) {
      (Vr = !0), (no = e);
    },
  };
function Zh(e, t, n, r, l, o, i, u, a) {
  (Vr = !1), (no = null), Gh.apply(Jh, arguments);
}
function qh(e, t, n, r, l, o, i, u, a) {
  if ((Zh.apply(this, arguments), Vr)) {
    if (Vr) {
      var s = no;
      (Vr = !1), (no = null);
    } else throw Error(L(198));
    ro || ((ro = !0), (wu = s));
  }
}
function On(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function zf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ts(e) {
  if (On(e) !== e) throw Error(L(188));
}
function bh(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = On(e)), t === null)) throw Error(L(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return Ts(l), e;
        if (o === r) return Ts(l), t;
        o = o.sibling;
      }
      throw Error(L(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (u === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (u === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(L(189));
      }
    }
    if (n.alternate !== r) throw Error(L(190));
  }
  if (n.tag !== 3) throw Error(L(188));
  return n.stateNode.current === n ? e : t;
}
function Ff(e) {
  return (e = bh(e)), e !== null ? If(e) : null;
}
function If(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = If(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var $f = Ge.unstable_scheduleCallback,
  Ms = Ge.unstable_cancelCallback,
  em = Ge.unstable_shouldYield,
  tm = Ge.unstable_requestPaint,
  me = Ge.unstable_now,
  nm = Ge.unstable_getCurrentPriorityLevel,
  pa = Ge.unstable_ImmediatePriority,
  Uf = Ge.unstable_UserBlockingPriority,
  lo = Ge.unstable_NormalPriority,
  rm = Ge.unstable_LowPriority,
  Af = Ge.unstable_IdlePriority,
  Mo = null,
  Et = null;
function lm(e) {
  if (Et && typeof Et.onCommitFiberRoot == "function")
    try {
      Et.onCommitFiberRoot(Mo, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var mt = Math.clz32 ? Math.clz32 : um,
  om = Math.log,
  im = Math.LN2;
function um(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((om(e) / im) | 0)) | 0;
}
var jl = 64,
  Tl = 4194304;
function Ur(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function oo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? (r = Ur(u)) : ((o &= i), o !== 0 && (r = Ur(o)));
  } else (i = n & ~l), i !== 0 ? (r = Ur(i)) : o !== 0 && (r = Ur(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - mt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function am(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function sm(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - mt(o),
      u = 1 << i,
      a = l[i];
    a === -1
      ? (!(u & n) || u & r) && (l[i] = am(u, t))
      : a <= t && (e.expiredLanes |= u),
      (o &= ~u);
  }
}
function Su(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Bf() {
  var e = jl;
  return (jl <<= 1), !(jl & 4194240) && (jl = 64), e;
}
function Ti(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function gl(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - mt(t)),
    (e[t] = n);
}
function cm(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - mt(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function ha(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - mt(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var G = 0;
function Vf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Wf,
  ma,
  Hf,
  Qf,
  Kf,
  xu = !1,
  Ml = [],
  qt = null,
  bt = null,
  en = null,
  tl = new Map(),
  nl = new Map(),
  Xt = [],
  fm =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Os(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      qt = null;
      break;
    case "dragenter":
    case "dragleave":
      bt = null;
      break;
    case "mouseover":
    case "mouseout":
      en = null;
      break;
    case "pointerover":
    case "pointerout":
      tl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      nl.delete(t.pointerId);
  }
}
function Rr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = Sl(t)), t !== null && ma(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function dm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (qt = Rr(qt, e, t, n, r, l)), !0;
    case "dragenter":
      return (bt = Rr(bt, e, t, n, r, l)), !0;
    case "mouseover":
      return (en = Rr(en, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return tl.set(o, Rr(tl.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), nl.set(o, Rr(nl.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Yf(e) {
  var t = wn(e.target);
  if (t !== null) {
    var n = On(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = zf(n)), t !== null)) {
          (e.blockedOn = t),
            Kf(e.priority, function () {
              Hf(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ql(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Eu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (vu = r), n.target.dispatchEvent(r), (vu = null);
    } else return (t = Sl(n)), t !== null && ma(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Ds(e, t, n) {
  Ql(e) && n.delete(t);
}
function pm() {
  (xu = !1),
    qt !== null && Ql(qt) && (qt = null),
    bt !== null && Ql(bt) && (bt = null),
    en !== null && Ql(en) && (en = null),
    tl.forEach(Ds),
    nl.forEach(Ds);
}
function _r(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    xu ||
      ((xu = !0),
      Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority, pm)));
}
function rl(e) {
  function t(l) {
    return _r(l, e);
  }
  if (0 < Ml.length) {
    _r(Ml[0], e);
    for (var n = 1; n < Ml.length; n++) {
      var r = Ml[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    qt !== null && _r(qt, e),
      bt !== null && _r(bt, e),
      en !== null && _r(en, e),
      tl.forEach(t),
      nl.forEach(t),
      n = 0;
    n < Xt.length;
    n++
  )
    (r = Xt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Xt.length && ((n = Xt[0]), n.blockedOn === null); )
    Yf(n), n.blockedOn === null && Xt.shift();
}
var tr = $t.ReactCurrentBatchConfig,
  io = !0;
function hm(e, t, n, r) {
  var l = G,
    o = tr.transition;
  tr.transition = null;
  try {
    (G = 1), va(e, t, n, r);
  } finally {
    (G = l), (tr.transition = o);
  }
}
function mm(e, t, n, r) {
  var l = G,
    o = tr.transition;
  tr.transition = null;
  try {
    (G = 4), va(e, t, n, r);
  } finally {
    (G = l), (tr.transition = o);
  }
}
function va(e, t, n, r) {
  if (io) {
    var l = Eu(e, t, n, r);
    if (l === null) Bi(e, t, r, uo, n), Os(e, r);
    else if (dm(l, e, t, n, r)) r.stopPropagation();
    else if ((Os(e, r), t & 4 && -1 < fm.indexOf(e))) {
      for (; l !== null; ) {
        var o = Sl(l);
        if (
          (o !== null && Wf(o),
          (o = Eu(e, t, n, r)),
          o === null && Bi(e, t, r, uo, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Bi(e, t, r, null, n);
  }
}
var uo = null;
function Eu(e, t, n, r) {
  if (((uo = null), (e = da(r)), (e = wn(e)), e !== null))
    if (((t = On(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = zf(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (uo = e), null;
}
function Xf(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (nm()) {
        case pa:
          return 1;
        case Uf:
          return 4;
        case lo:
        case rm:
          return 16;
        case Af:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Jt = null,
  ya = null,
  Kl = null;
function Gf() {
  if (Kl) return Kl;
  var e,
    t = ya,
    n = t.length,
    r,
    l = "value" in Jt ? Jt.value : Jt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Kl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Yl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Ol() {
  return !0;
}
function zs() {
  return !1;
}
function Ze(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Ol
        : zs),
      (this.isPropagationStopped = zs),
      this
    );
  }
  return (
    se(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Ol));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Ol));
      },
      persist: function () {},
      isPersistent: Ol,
    }),
    t
  );
}
var mr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ga = Ze(mr),
  wl = se({}, mr, { view: 0, detail: 0 }),
  vm = Ze(wl),
  Mi,
  Oi,
  Lr,
  Oo = se({}, wl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: wa,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Lr &&
            (Lr && e.type === "mousemove"
              ? ((Mi = e.screenX - Lr.screenX), (Oi = e.screenY - Lr.screenY))
              : (Oi = Mi = 0),
            (Lr = e)),
          Mi);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Oi;
    },
  }),
  Fs = Ze(Oo),
  ym = se({}, Oo, { dataTransfer: 0 }),
  gm = Ze(ym),
  wm = se({}, wl, { relatedTarget: 0 }),
  Di = Ze(wm),
  Sm = se({}, mr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  xm = Ze(Sm),
  Em = se({}, mr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Cm = Ze(Em),
  km = se({}, mr, { data: 0 }),
  Is = Ze(km),
  Pm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Rm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  _m = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Lm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = _m[e]) ? !!t[e] : !1;
}
function wa() {
  return Lm;
}
var Nm = se({}, wl, {
    key: function (e) {
      if (e.key) {
        var t = Pm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Yl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Rm[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: wa,
    charCode: function (e) {
      return e.type === "keypress" ? Yl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Yl(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  jm = Ze(Nm),
  Tm = se({}, Oo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  $s = Ze(Tm),
  Mm = se({}, wl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: wa,
  }),
  Om = Ze(Mm),
  Dm = se({}, mr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  zm = Ze(Dm),
  Fm = se({}, Oo, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Im = Ze(Fm),
  $m = [9, 13, 27, 32],
  Sa = Dt && "CompositionEvent" in window,
  Wr = null;
Dt && "documentMode" in document && (Wr = document.documentMode);
var Um = Dt && "TextEvent" in window && !Wr,
  Jf = Dt && (!Sa || (Wr && 8 < Wr && 11 >= Wr)),
  Us = String.fromCharCode(32),
  As = !1;
function Zf(e, t) {
  switch (e) {
    case "keyup":
      return $m.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function qf(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Bn = !1;
function Am(e, t) {
  switch (e) {
    case "compositionend":
      return qf(t);
    case "keypress":
      return t.which !== 32 ? null : ((As = !0), Us);
    case "textInput":
      return (e = t.data), e === Us && As ? null : e;
    default:
      return null;
  }
}
function Bm(e, t) {
  if (Bn)
    return e === "compositionend" || (!Sa && Zf(e, t))
      ? ((e = Gf()), (Kl = ya = Jt = null), (Bn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Jf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Vm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Bs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Vm[e.type] : t === "textarea";
}
function bf(e, t, n, r) {
  jf(r),
    (t = ao(t, "onChange")),
    0 < t.length &&
      ((n = new ga("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Hr = null,
  ll = null;
function Wm(e) {
  cd(e, 0);
}
function Do(e) {
  var t = Hn(e);
  if (Cf(t)) return e;
}
function Hm(e, t) {
  if (e === "change") return t;
}
var ed = !1;
if (Dt) {
  var zi;
  if (Dt) {
    var Fi = "oninput" in document;
    if (!Fi) {
      var Vs = document.createElement("div");
      Vs.setAttribute("oninput", "return;"),
        (Fi = typeof Vs.oninput == "function");
    }
    zi = Fi;
  } else zi = !1;
  ed = zi && (!document.documentMode || 9 < document.documentMode);
}
function Ws() {
  Hr && (Hr.detachEvent("onpropertychange", td), (ll = Hr = null));
}
function td(e) {
  if (e.propertyName === "value" && Do(ll)) {
    var t = [];
    bf(t, ll, e, da(e)), Df(Wm, t);
  }
}
function Qm(e, t, n) {
  e === "focusin"
    ? (Ws(), (Hr = t), (ll = n), Hr.attachEvent("onpropertychange", td))
    : e === "focusout" && Ws();
}
function Km(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Do(ll);
}
function Ym(e, t) {
  if (e === "click") return Do(t);
}
function Xm(e, t) {
  if (e === "input" || e === "change") return Do(t);
}
function Gm(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var yt = typeof Object.is == "function" ? Object.is : Gm;
function ol(e, t) {
  if (yt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!lu.call(t, l) || !yt(e[l], t[l])) return !1;
  }
  return !0;
}
function Hs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Qs(e, t) {
  var n = Hs(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Hs(n);
  }
}
function nd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? nd(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function rd() {
  for (var e = window, t = to(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = to(e.document);
  }
  return t;
}
function xa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Jm(e) {
  var t = rd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    nd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && xa(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = Qs(n, o));
        var i = Qs(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Zm = Dt && "documentMode" in document && 11 >= document.documentMode,
  Vn = null,
  Cu = null,
  Qr = null,
  ku = !1;
function Ks(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ku ||
    Vn == null ||
    Vn !== to(r) ||
    ((r = Vn),
    "selectionStart" in r && xa(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Qr && ol(Qr, r)) ||
      ((Qr = r),
      (r = ao(Cu, "onSelect")),
      0 < r.length &&
        ((t = new ga("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Vn))));
}
function Dl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Wn = {
    animationend: Dl("Animation", "AnimationEnd"),
    animationiteration: Dl("Animation", "AnimationIteration"),
    animationstart: Dl("Animation", "AnimationStart"),
    transitionend: Dl("Transition", "TransitionEnd"),
  },
  Ii = {},
  ld = {};
Dt &&
  ((ld = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Wn.animationend.animation,
    delete Wn.animationiteration.animation,
    delete Wn.animationstart.animation),
  "TransitionEvent" in window || delete Wn.transitionend.transition);
function zo(e) {
  if (Ii[e]) return Ii[e];
  if (!Wn[e]) return e;
  var t = Wn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in ld) return (Ii[e] = t[n]);
  return e;
}
var od = zo("animationend"),
  id = zo("animationiteration"),
  ud = zo("animationstart"),
  ad = zo("transitionend"),
  sd = new Map(),
  Ys =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function fn(e, t) {
  sd.set(e, t), Mn(t, [e]);
}
for (var $i = 0; $i < Ys.length; $i++) {
  var Ui = Ys[$i],
    qm = Ui.toLowerCase(),
    bm = Ui[0].toUpperCase() + Ui.slice(1);
  fn(qm, "on" + bm);
}
fn(od, "onAnimationEnd");
fn(id, "onAnimationIteration");
fn(ud, "onAnimationStart");
fn("dblclick", "onDoubleClick");
fn("focusin", "onFocus");
fn("focusout", "onBlur");
fn(ad, "onTransitionEnd");
or("onMouseEnter", ["mouseout", "mouseover"]);
or("onMouseLeave", ["mouseout", "mouseover"]);
or("onPointerEnter", ["pointerout", "pointerover"]);
or("onPointerLeave", ["pointerout", "pointerover"]);
Mn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Mn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Mn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Mn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Mn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Mn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Ar =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ev = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ar));
function Xs(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), qh(r, t, void 0, e), (e.currentTarget = null);
}
function cd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i],
            a = u.instance,
            s = u.currentTarget;
          if (((u = u.listener), a !== o && l.isPropagationStopped())) break e;
          Xs(l, u, s), (o = a);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((u = r[i]),
            (a = u.instance),
            (s = u.currentTarget),
            (u = u.listener),
            a !== o && l.isPropagationStopped())
          )
            break e;
          Xs(l, u, s), (o = a);
        }
    }
  }
  if (ro) throw ((e = wu), (ro = !1), (wu = null), e);
}
function re(e, t) {
  var n = t[Nu];
  n === void 0 && (n = t[Nu] = new Set());
  var r = e + "__bubble";
  n.has(r) || (fd(t, e, 2, !1), n.add(r));
}
function Ai(e, t, n) {
  var r = 0;
  t && (r |= 4), fd(n, e, r, t);
}
var zl = "_reactListening" + Math.random().toString(36).slice(2);
function il(e) {
  if (!e[zl]) {
    (e[zl] = !0),
      gf.forEach(function (n) {
        n !== "selectionchange" && (ev.has(n) || Ai(n, !1, e), Ai(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[zl] || ((t[zl] = !0), Ai("selectionchange", !1, t));
  }
}
function fd(e, t, n, r) {
  switch (Xf(t)) {
    case 1:
      var l = hm;
      break;
    case 4:
      l = mm;
      break;
    default:
      l = va;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !gu ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1);
}
function Bi(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var a = i.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = i.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; u !== null; ) {
          if (((i = wn(u)), i === null)) return;
          if (((a = i.tag), a === 5 || a === 6)) {
            r = o = i;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  Df(function () {
    var s = o,
      c = da(n),
      m = [];
    e: {
      var h = sd.get(e);
      if (h !== void 0) {
        var S = ga,
          y = e;
        switch (e) {
          case "keypress":
            if (Yl(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = jm;
            break;
          case "focusin":
            (y = "focus"), (S = Di);
            break;
          case "focusout":
            (y = "blur"), (S = Di);
            break;
          case "beforeblur":
          case "afterblur":
            S = Di;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = Fs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = gm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = Om;
            break;
          case od:
          case id:
          case ud:
            S = xm;
            break;
          case ad:
            S = zm;
            break;
          case "scroll":
            S = vm;
            break;
          case "wheel":
            S = Im;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = Cm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = $s;
        }
        var w = (t & 4) !== 0,
          R = !w && e === "scroll",
          d = w ? (h !== null ? h + "Capture" : null) : h;
        w = [];
        for (var f = s, v; f !== null; ) {
          v = f;
          var p = v.stateNode;
          if (
            (v.tag === 5 &&
              p !== null &&
              ((v = p),
              d !== null && ((p = el(f, d)), p != null && w.push(ul(f, p, v)))),
            R)
          )
            break;
          f = f.return;
        }
        0 < w.length &&
          ((h = new S(h, y, null, n, c)), m.push({ event: h, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (S = e === "mouseout" || e === "pointerout"),
          h &&
            n !== vu &&
            (y = n.relatedTarget || n.fromElement) &&
            (wn(y) || y[zt]))
        )
          break e;
        if (
          (S || h) &&
          ((h =
            c.window === c
              ? c
              : (h = c.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          S
            ? ((y = n.relatedTarget || n.toElement),
              (S = s),
              (y = y ? wn(y) : null),
              y !== null &&
                ((R = On(y)), y !== R || (y.tag !== 5 && y.tag !== 6)) &&
                (y = null))
            : ((S = null), (y = s)),
          S !== y)
        ) {
          if (
            ((w = Fs),
            (p = "onMouseLeave"),
            (d = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = $s),
              (p = "onPointerLeave"),
              (d = "onPointerEnter"),
              (f = "pointer")),
            (R = S == null ? h : Hn(S)),
            (v = y == null ? h : Hn(y)),
            (h = new w(p, f + "leave", S, n, c)),
            (h.target = R),
            (h.relatedTarget = v),
            (p = null),
            wn(c) === s &&
              ((w = new w(d, f + "enter", y, n, c)),
              (w.target = v),
              (w.relatedTarget = R),
              (p = w)),
            (R = p),
            S && y)
          )
            t: {
              for (w = S, d = y, f = 0, v = w; v; v = $n(v)) f++;
              for (v = 0, p = d; p; p = $n(p)) v++;
              for (; 0 < f - v; ) (w = $n(w)), f--;
              for (; 0 < v - f; ) (d = $n(d)), v--;
              for (; f--; ) {
                if (w === d || (d !== null && w === d.alternate)) break t;
                (w = $n(w)), (d = $n(d));
              }
              w = null;
            }
          else w = null;
          S !== null && Gs(m, h, S, w, !1),
            y !== null && R !== null && Gs(m, R, y, w, !0);
        }
      }
      e: {
        if (
          ((h = s ? Hn(s) : window),
          (S = h.nodeName && h.nodeName.toLowerCase()),
          S === "select" || (S === "input" && h.type === "file"))
        )
          var _ = Hm;
        else if (Bs(h))
          if (ed) _ = Xm;
          else {
            _ = Km;
            var N = Qm;
          }
        else
          (S = h.nodeName) &&
            S.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (_ = Ym);
        if (_ && (_ = _(e, s))) {
          bf(m, _, n, c);
          break e;
        }
        N && N(e, h, s),
          e === "focusout" &&
            (N = h._wrapperState) &&
            N.controlled &&
            h.type === "number" &&
            fu(h, "number", h.value);
      }
      switch (((N = s ? Hn(s) : window), e)) {
        case "focusin":
          (Bs(N) || N.contentEditable === "true") &&
            ((Vn = N), (Cu = s), (Qr = null));
          break;
        case "focusout":
          Qr = Cu = Vn = null;
          break;
        case "mousedown":
          ku = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (ku = !1), Ks(m, n, c);
          break;
        case "selectionchange":
          if (Zm) break;
        case "keydown":
        case "keyup":
          Ks(m, n, c);
      }
      var k;
      if (Sa)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        Bn
          ? Zf(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T &&
        (Jf &&
          n.locale !== "ko" &&
          (Bn || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && Bn && (k = Gf())
            : ((Jt = c),
              (ya = "value" in Jt ? Jt.value : Jt.textContent),
              (Bn = !0))),
        (N = ao(s, T)),
        0 < N.length &&
          ((T = new Is(T, e, null, n, c)),
          m.push({ event: T, listeners: N }),
          k ? (T.data = k) : ((k = qf(n)), k !== null && (T.data = k)))),
        (k = Um ? Am(e, n) : Bm(e, n)) &&
          ((s = ao(s, "onBeforeInput")),
          0 < s.length &&
            ((c = new Is("onBeforeInput", "beforeinput", null, n, c)),
            m.push({ event: c, listeners: s }),
            (c.data = k)));
    }
    cd(m, t);
  });
}
function ul(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ao(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = el(e, n)),
      o != null && r.unshift(ul(e, o, l)),
      (o = el(e, t)),
      o != null && r.push(ul(e, o, l))),
      (e = e.return);
  }
  return r;
}
function $n(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Gs(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n,
      a = u.alternate,
      s = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 &&
      s !== null &&
      ((u = s),
      l
        ? ((a = el(n, o)), a != null && i.unshift(ul(n, a, u)))
        : l || ((a = el(n, o)), a != null && i.push(ul(n, a, u)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var tv = /\r\n?/g,
  nv = /\u0000|\uFFFD/g;
function Js(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      tv,
      `
`,
    )
    .replace(nv, "");
}
function Fl(e, t, n) {
  if (((t = Js(t)), Js(e) !== t && n)) throw Error(L(425));
}
function so() {}
var Pu = null,
  Ru = null;
function _u(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Lu = typeof setTimeout == "function" ? setTimeout : void 0,
  rv = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Zs = typeof Promise == "function" ? Promise : void 0,
  lv =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Zs < "u"
        ? function (e) {
            return Zs.resolve(null).then(e).catch(ov);
          }
        : Lu;
function ov(e) {
  setTimeout(function () {
    throw e;
  });
}
function Vi(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), rl(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  rl(t);
}
function tn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function qs(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var vr = Math.random().toString(36).slice(2),
  xt = "__reactFiber$" + vr,
  al = "__reactProps$" + vr,
  zt = "__reactContainer$" + vr,
  Nu = "__reactEvents$" + vr,
  iv = "__reactListeners$" + vr,
  uv = "__reactHandles$" + vr;
function wn(e) {
  var t = e[xt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[zt] || n[xt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = qs(e); e !== null; ) {
          if ((n = e[xt])) return n;
          e = qs(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Sl(e) {
  return (
    (e = e[xt] || e[zt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Hn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(L(33));
}
function Fo(e) {
  return e[al] || null;
}
var ju = [],
  Qn = -1;
function dn(e) {
  return { current: e };
}
function le(e) {
  0 > Qn || ((e.current = ju[Qn]), (ju[Qn] = null), Qn--);
}
function ne(e, t) {
  Qn++, (ju[Qn] = e.current), (e.current = t);
}
var an = {},
  Oe = dn(an),
  Ve = dn(!1),
  Pn = an;
function ir(e, t) {
  var n = e.type.contextTypes;
  if (!n) return an;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function We(e) {
  return (e = e.childContextTypes), e != null;
}
function co() {
  le(Ve), le(Oe);
}
function bs(e, t, n) {
  if (Oe.current !== an) throw Error(L(168));
  ne(Oe, t), ne(Ve, n);
}
function dd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(L(108, Qh(e) || "Unknown", l));
  return se({}, n, r);
}
function fo(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || an),
    (Pn = Oe.current),
    ne(Oe, e),
    ne(Ve, Ve.current),
    !0
  );
}
function ec(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(L(169));
  n
    ? ((e = dd(e, t, Pn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      le(Ve),
      le(Oe),
      ne(Oe, e))
    : le(Ve),
    ne(Ve, n);
}
var Lt = null,
  Io = !1,
  Wi = !1;
function pd(e) {
  Lt === null ? (Lt = [e]) : Lt.push(e);
}
function av(e) {
  (Io = !0), pd(e);
}
function pn() {
  if (!Wi && Lt !== null) {
    Wi = !0;
    var e = 0,
      t = G;
    try {
      var n = Lt;
      for (G = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Lt = null), (Io = !1);
    } catch (l) {
      throw (Lt !== null && (Lt = Lt.slice(e + 1)), $f(pa, pn), l);
    } finally {
      (G = t), (Wi = !1);
    }
  }
  return null;
}
var Kn = [],
  Yn = 0,
  po = null,
  ho = 0,
  nt = [],
  rt = 0,
  Rn = null,
  Nt = 1,
  jt = "";
function yn(e, t) {
  (Kn[Yn++] = ho), (Kn[Yn++] = po), (po = e), (ho = t);
}
function hd(e, t, n) {
  (nt[rt++] = Nt), (nt[rt++] = jt), (nt[rt++] = Rn), (Rn = e);
  var r = Nt;
  e = jt;
  var l = 32 - mt(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - mt(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (Nt = (1 << (32 - mt(t) + l)) | (n << l) | r),
      (jt = o + e);
  } else (Nt = (1 << o) | (n << l) | r), (jt = e);
}
function Ea(e) {
  e.return !== null && (yn(e, 1), hd(e, 1, 0));
}
function Ca(e) {
  for (; e === po; )
    (po = Kn[--Yn]), (Kn[Yn] = null), (ho = Kn[--Yn]), (Kn[Yn] = null);
  for (; e === Rn; )
    (Rn = nt[--rt]),
      (nt[rt] = null),
      (jt = nt[--rt]),
      (nt[rt] = null),
      (Nt = nt[--rt]),
      (nt[rt] = null);
}
var Xe = null,
  Ye = null,
  oe = !1,
  ht = null;
function md(e, t) {
  var n = lt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function tc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Xe = e), (Ye = tn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Xe = e), (Ye = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Rn !== null ? { id: Nt, overflow: jt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = lt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Xe = e),
            (Ye = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Tu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Mu(e) {
  if (oe) {
    var t = Ye;
    if (t) {
      var n = t;
      if (!tc(e, t)) {
        if (Tu(e)) throw Error(L(418));
        t = tn(n.nextSibling);
        var r = Xe;
        t && tc(e, t)
          ? md(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (oe = !1), (Xe = e));
      }
    } else {
      if (Tu(e)) throw Error(L(418));
      (e.flags = (e.flags & -4097) | 2), (oe = !1), (Xe = e);
    }
  }
}
function nc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Xe = e;
}
function Il(e) {
  if (e !== Xe) return !1;
  if (!oe) return nc(e), (oe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !_u(e.type, e.memoizedProps))),
    t && (t = Ye))
  ) {
    if (Tu(e)) throw (vd(), Error(L(418)));
    for (; t; ) md(e, t), (t = tn(t.nextSibling));
  }
  if ((nc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(L(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ye = tn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ye = null;
    }
  } else Ye = Xe ? tn(e.stateNode.nextSibling) : null;
  return !0;
}
function vd() {
  for (var e = Ye; e; ) e = tn(e.nextSibling);
}
function ur() {
  (Ye = Xe = null), (oe = !1);
}
function ka(e) {
  ht === null ? (ht = [e]) : ht.push(e);
}
var sv = $t.ReactCurrentBatchConfig;
function ft(e, t) {
  if (e && e.defaultProps) {
    (t = se({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var mo = dn(null),
  vo = null,
  Xn = null,
  Pa = null;
function Ra() {
  Pa = Xn = vo = null;
}
function _a(e) {
  var t = mo.current;
  le(mo), (e._currentValue = t);
}
function Ou(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function nr(e, t) {
  (vo = e),
    (Pa = Xn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Be = !0), (e.firstContext = null));
}
function it(e) {
  var t = e._currentValue;
  if (Pa !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Xn === null)) {
      if (vo === null) throw Error(L(308));
      (Xn = e), (vo.dependencies = { lanes: 0, firstContext: e });
    } else Xn = Xn.next = e;
  return t;
}
var Sn = null;
function La(e) {
  Sn === null ? (Sn = [e]) : Sn.push(e);
}
function yd(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), La(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Ft(e, r)
  );
}
function Ft(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Yt = !1;
function Na(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function gd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Mt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function nn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Y & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Ft(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), La(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Ft(e, n)
  );
}
function Xl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ha(e, n);
  }
}
function rc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function yo(e, t, n, r) {
  var l = e.updateQueue;
  Yt = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u,
      s = a.next;
    (a.next = null), i === null ? (o = s) : (i.next = s), (i = a);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (u = c.lastBaseUpdate),
      u !== i &&
        (u === null ? (c.firstBaseUpdate = s) : (u.next = s),
        (c.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var m = l.baseState;
    (i = 0), (c = s = a = null), (u = o);
    do {
      var h = u.lane,
        S = u.eventTime;
      if ((r & h) === h) {
        c !== null &&
          (c = c.next =
            {
              eventTime: S,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var y = e,
            w = u;
          switch (((h = t), (S = n), w.tag)) {
            case 1:
              if (((y = w.payload), typeof y == "function")) {
                m = y.call(S, m, h);
                break e;
              }
              m = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = w.payload),
                (h = typeof y == "function" ? y.call(S, m, h) : y),
                h == null)
              )
                break e;
              m = se({}, m, h);
              break e;
            case 2:
              Yt = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (h = l.effects),
          h === null ? (l.effects = [u]) : h.push(u));
      } else
        (S = {
          eventTime: S,
          lane: h,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          c === null ? ((s = c = S), (a = m)) : (c = c.next = S),
          (i |= h);
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        (h = u),
          (u = h.next),
          (h.next = null),
          (l.lastBaseUpdate = h),
          (l.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (a = m),
      (l.baseState = a),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = c),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (Ln |= i), (e.lanes = i), (e.memoizedState = m);
  }
}
function lc(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(L(191, l));
        l.call(r);
      }
    }
}
var wd = new yf.Component().refs;
function Du(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : se({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $o = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? On(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ie(),
      l = ln(e),
      o = Mt(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = nn(e, o, l)),
      t !== null && (vt(t, e, l, r), Xl(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ie(),
      l = ln(e),
      o = Mt(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = nn(e, o, l)),
      t !== null && (vt(t, e, l, r), Xl(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ie(),
      r = ln(e),
      l = Mt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = nn(e, l, r)),
      t !== null && (vt(t, e, r, n), Xl(t, e, r));
  },
};
function oc(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !ol(n, r) || !ol(l, o)
        : !0
  );
}
function Sd(e, t, n) {
  var r = !1,
    l = an,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = it(o))
      : ((l = We(t) ? Pn : Oe.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? ir(e, l) : an)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = $o),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function ic(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && $o.enqueueReplaceState(t, t.state, null);
}
function zu(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = wd), Na(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = it(o))
    : ((o = We(t) ? Pn : Oe.current), (l.context = ir(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Du(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && $o.enqueueReplaceState(l, l.state, null),
      yo(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Nr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(L(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(L(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var u = l.refs;
            u === wd && (u = l.refs = {}),
              i === null ? delete u[o] : (u[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(L(284));
    if (!n._owner) throw Error(L(290, e));
  }
  return e;
}
function $l(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      L(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function uc(e) {
  var t = e._init;
  return t(e._payload);
}
function xd(e) {
  function t(d, f) {
    if (e) {
      var v = d.deletions;
      v === null ? ((d.deletions = [f]), (d.flags |= 16)) : v.push(f);
    }
  }
  function n(d, f) {
    if (!e) return null;
    for (; f !== null; ) t(d, f), (f = f.sibling);
    return null;
  }
  function r(d, f) {
    for (d = new Map(); f !== null; )
      f.key !== null ? d.set(f.key, f) : d.set(f.index, f), (f = f.sibling);
    return d;
  }
  function l(d, f) {
    return (d = on(d, f)), (d.index = 0), (d.sibling = null), d;
  }
  function o(d, f, v) {
    return (
      (d.index = v),
      e
        ? ((v = d.alternate),
          v !== null
            ? ((v = v.index), v < f ? ((d.flags |= 2), f) : v)
            : ((d.flags |= 2), f))
        : ((d.flags |= 1048576), f)
    );
  }
  function i(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function u(d, f, v, p) {
    return f === null || f.tag !== 6
      ? ((f = Ji(v, d.mode, p)), (f.return = d), f)
      : ((f = l(f, v)), (f.return = d), f);
  }
  function a(d, f, v, p) {
    var _ = v.type;
    return _ === An
      ? c(d, f, v.props.children, p, v.key)
      : f !== null &&
          (f.elementType === _ ||
            (typeof _ == "object" &&
              _ !== null &&
              _.$$typeof === Kt &&
              uc(_) === f.type))
        ? ((p = l(f, v.props)), (p.ref = Nr(d, f, v)), (p.return = d), p)
        : ((p = eo(v.type, v.key, v.props, null, d.mode, p)),
          (p.ref = Nr(d, f, v)),
          (p.return = d),
          p);
  }
  function s(d, f, v, p) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== v.containerInfo ||
      f.stateNode.implementation !== v.implementation
      ? ((f = Zi(v, d.mode, p)), (f.return = d), f)
      : ((f = l(f, v.children || [])), (f.return = d), f);
  }
  function c(d, f, v, p, _) {
    return f === null || f.tag !== 7
      ? ((f = kn(v, d.mode, p, _)), (f.return = d), f)
      : ((f = l(f, v)), (f.return = d), f);
  }
  function m(d, f, v) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return (f = Ji("" + f, d.mode, v)), (f.return = d), f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case _l:
          return (
            (v = eo(f.type, f.key, f.props, null, d.mode, v)),
            (v.ref = Nr(d, null, f)),
            (v.return = d),
            v
          );
        case Un:
          return (f = Zi(f, d.mode, v)), (f.return = d), f;
        case Kt:
          var p = f._init;
          return m(d, p(f._payload), v);
      }
      if ($r(f) || kr(f))
        return (f = kn(f, d.mode, v, null)), (f.return = d), f;
      $l(d, f);
    }
    return null;
  }
  function h(d, f, v, p) {
    var _ = f !== null ? f.key : null;
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return _ !== null ? null : u(d, f, "" + v, p);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case _l:
          return v.key === _ ? a(d, f, v, p) : null;
        case Un:
          return v.key === _ ? s(d, f, v, p) : null;
        case Kt:
          return (_ = v._init), h(d, f, _(v._payload), p);
      }
      if ($r(v) || kr(v)) return _ !== null ? null : c(d, f, v, p, null);
      $l(d, v);
    }
    return null;
  }
  function S(d, f, v, p, _) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (d = d.get(v) || null), u(f, d, "" + p, _);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case _l:
          return (d = d.get(p.key === null ? v : p.key) || null), a(f, d, p, _);
        case Un:
          return (d = d.get(p.key === null ? v : p.key) || null), s(f, d, p, _);
        case Kt:
          var N = p._init;
          return S(d, f, v, N(p._payload), _);
      }
      if ($r(p) || kr(p)) return (d = d.get(v) || null), c(f, d, p, _, null);
      $l(f, p);
    }
    return null;
  }
  function y(d, f, v, p) {
    for (
      var _ = null, N = null, k = f, T = (f = 0), I = null;
      k !== null && T < v.length;
      T++
    ) {
      k.index > T ? ((I = k), (k = null)) : (I = k.sibling);
      var $ = h(d, k, v[T], p);
      if ($ === null) {
        k === null && (k = I);
        break;
      }
      e && k && $.alternate === null && t(d, k),
        (f = o($, f, T)),
        N === null ? (_ = $) : (N.sibling = $),
        (N = $),
        (k = I);
    }
    if (T === v.length) return n(d, k), oe && yn(d, T), _;
    if (k === null) {
      for (; T < v.length; T++)
        (k = m(d, v[T], p)),
          k !== null &&
            ((f = o(k, f, T)), N === null ? (_ = k) : (N.sibling = k), (N = k));
      return oe && yn(d, T), _;
    }
    for (k = r(d, k); T < v.length; T++)
      (I = S(k, d, T, v[T], p)),
        I !== null &&
          (e && I.alternate !== null && k.delete(I.key === null ? T : I.key),
          (f = o(I, f, T)),
          N === null ? (_ = I) : (N.sibling = I),
          (N = I));
    return (
      e &&
        k.forEach(function (X) {
          return t(d, X);
        }),
      oe && yn(d, T),
      _
    );
  }
  function w(d, f, v, p) {
    var _ = kr(v);
    if (typeof _ != "function") throw Error(L(150));
    if (((v = _.call(v)), v == null)) throw Error(L(151));
    for (
      var N = (_ = null), k = f, T = (f = 0), I = null, $ = v.next();
      k !== null && !$.done;
      T++, $ = v.next()
    ) {
      k.index > T ? ((I = k), (k = null)) : (I = k.sibling);
      var X = h(d, k, $.value, p);
      if (X === null) {
        k === null && (k = I);
        break;
      }
      e && k && X.alternate === null && t(d, k),
        (f = o(X, f, T)),
        N === null ? (_ = X) : (N.sibling = X),
        (N = X),
        (k = I);
    }
    if ($.done) return n(d, k), oe && yn(d, T), _;
    if (k === null) {
      for (; !$.done; T++, $ = v.next())
        ($ = m(d, $.value, p)),
          $ !== null &&
            ((f = o($, f, T)), N === null ? (_ = $) : (N.sibling = $), (N = $));
      return oe && yn(d, T), _;
    }
    for (k = r(d, k); !$.done; T++, $ = v.next())
      ($ = S(k, d, T, $.value, p)),
        $ !== null &&
          (e && $.alternate !== null && k.delete($.key === null ? T : $.key),
          (f = o($, f, T)),
          N === null ? (_ = $) : (N.sibling = $),
          (N = $));
    return (
      e &&
        k.forEach(function (ke) {
          return t(d, ke);
        }),
      oe && yn(d, T),
      _
    );
  }
  function R(d, f, v, p) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === An &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case _l:
          e: {
            for (var _ = v.key, N = f; N !== null; ) {
              if (N.key === _) {
                if (((_ = v.type), _ === An)) {
                  if (N.tag === 7) {
                    n(d, N.sibling),
                      (f = l(N, v.props.children)),
                      (f.return = d),
                      (d = f);
                    break e;
                  }
                } else if (
                  N.elementType === _ ||
                  (typeof _ == "object" &&
                    _ !== null &&
                    _.$$typeof === Kt &&
                    uc(_) === N.type)
                ) {
                  n(d, N.sibling),
                    (f = l(N, v.props)),
                    (f.ref = Nr(d, N, v)),
                    (f.return = d),
                    (d = f);
                  break e;
                }
                n(d, N);
                break;
              } else t(d, N);
              N = N.sibling;
            }
            v.type === An
              ? ((f = kn(v.props.children, d.mode, p, v.key)),
                (f.return = d),
                (d = f))
              : ((p = eo(v.type, v.key, v.props, null, d.mode, p)),
                (p.ref = Nr(d, f, v)),
                (p.return = d),
                (d = p));
          }
          return i(d);
        case Un:
          e: {
            for (N = v.key; f !== null; ) {
              if (f.key === N)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === v.containerInfo &&
                  f.stateNode.implementation === v.implementation
                ) {
                  n(d, f.sibling),
                    (f = l(f, v.children || [])),
                    (f.return = d),
                    (d = f);
                  break e;
                } else {
                  n(d, f);
                  break;
                }
              else t(d, f);
              f = f.sibling;
            }
            (f = Zi(v, d.mode, p)), (f.return = d), (d = f);
          }
          return i(d);
        case Kt:
          return (N = v._init), R(d, f, N(v._payload), p);
      }
      if ($r(v)) return y(d, f, v, p);
      if (kr(v)) return w(d, f, v, p);
      $l(d, v);
    }
    return (typeof v == "string" && v !== "") || typeof v == "number"
      ? ((v = "" + v),
        f !== null && f.tag === 6
          ? (n(d, f.sibling), (f = l(f, v)), (f.return = d), (d = f))
          : (n(d, f), (f = Ji(v, d.mode, p)), (f.return = d), (d = f)),
        i(d))
      : n(d, f);
  }
  return R;
}
var ar = xd(!0),
  Ed = xd(!1),
  xl = {},
  Ct = dn(xl),
  sl = dn(xl),
  cl = dn(xl);
function xn(e) {
  if (e === xl) throw Error(L(174));
  return e;
}
function ja(e, t) {
  switch ((ne(cl, t), ne(sl, e), ne(Ct, xl), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : pu(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = pu(t, e));
  }
  le(Ct), ne(Ct, t);
}
function sr() {
  le(Ct), le(sl), le(cl);
}
function Cd(e) {
  xn(cl.current);
  var t = xn(Ct.current),
    n = pu(t, e.type);
  t !== n && (ne(sl, e), ne(Ct, n));
}
function Ta(e) {
  sl.current === e && (le(Ct), le(sl));
}
var ue = dn(0);
function go(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Hi = [];
function Ma() {
  for (var e = 0; e < Hi.length; e++)
    Hi[e]._workInProgressVersionPrimary = null;
  Hi.length = 0;
}
var Gl = $t.ReactCurrentDispatcher,
  Qi = $t.ReactCurrentBatchConfig,
  _n = 0,
  ae = null,
  ge = null,
  xe = null,
  wo = !1,
  Kr = !1,
  fl = 0,
  cv = 0;
function Ne() {
  throw Error(L(321));
}
function Oa(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!yt(e[n], t[n])) return !1;
  return !0;
}
function Da(e, t, n, r, l, o) {
  if (
    ((_n = o),
    (ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Gl.current = e === null || e.memoizedState === null ? hv : mv),
    (e = n(r, l)),
    Kr)
  ) {
    o = 0;
    do {
      if (((Kr = !1), (fl = 0), 25 <= o)) throw Error(L(301));
      (o += 1),
        (xe = ge = null),
        (t.updateQueue = null),
        (Gl.current = vv),
        (e = n(r, l));
    } while (Kr);
  }
  if (
    ((Gl.current = So),
    (t = ge !== null && ge.next !== null),
    (_n = 0),
    (xe = ge = ae = null),
    (wo = !1),
    t)
  )
    throw Error(L(300));
  return e;
}
function za() {
  var e = fl !== 0;
  return (fl = 0), e;
}
function St() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return xe === null ? (ae.memoizedState = xe = e) : (xe = xe.next = e), xe;
}
function ut() {
  if (ge === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ge.next;
  var t = xe === null ? ae.memoizedState : xe.next;
  if (t !== null) (xe = t), (ge = e);
  else {
    if (e === null) throw Error(L(310));
    (ge = e),
      (e = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null,
      }),
      xe === null ? (ae.memoizedState = xe = e) : (xe = xe.next = e);
  }
  return xe;
}
function dl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ki(e) {
  var t = ut(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = ge,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var u = (i = null),
      a = null,
      s = o;
    do {
      var c = s.lane;
      if ((_n & c) === c)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var m = {
          lane: c,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        a === null ? ((u = a = m), (i = r)) : (a = a.next = m),
          (ae.lanes |= c),
          (Ln |= c);
      }
      s = s.next;
    } while (s !== null && s !== o);
    a === null ? (i = r) : (a.next = u),
      yt(r, t.memoizedState) || (Be = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (ae.lanes |= o), (Ln |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Yi(e) {
  var t = ut(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    yt(o, t.memoizedState) || (Be = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function kd() {}
function Pd(e, t) {
  var n = ae,
    r = ut(),
    l = t(),
    o = !yt(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (Be = !0)),
    (r = r.queue),
    Fa(Ld.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (xe !== null && xe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      pl(9, _d.bind(null, n, r, l, t), void 0, null),
      Ee === null)
    )
      throw Error(L(349));
    _n & 30 || Rd(n, t, l);
  }
  return l;
}
function Rd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function _d(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Nd(t) && jd(e);
}
function Ld(e, t, n) {
  return n(function () {
    Nd(t) && jd(e);
  });
}
function Nd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !yt(e, n);
  } catch {
    return !0;
  }
}
function jd(e) {
  var t = Ft(e, 1);
  t !== null && vt(t, e, 1, -1);
}
function ac(e) {
  var t = St();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: dl,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = pv.bind(null, ae, e)),
    [t.memoizedState, e]
  );
}
function pl(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Td() {
  return ut().memoizedState;
}
function Jl(e, t, n, r) {
  var l = St();
  (ae.flags |= e),
    (l.memoizedState = pl(1 | t, n, void 0, r === void 0 ? null : r));
}
function Uo(e, t, n, r) {
  var l = ut();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ge !== null) {
    var i = ge.memoizedState;
    if (((o = i.destroy), r !== null && Oa(r, i.deps))) {
      l.memoizedState = pl(t, n, o, r);
      return;
    }
  }
  (ae.flags |= e), (l.memoizedState = pl(1 | t, n, o, r));
}
function sc(e, t) {
  return Jl(8390656, 8, e, t);
}
function Fa(e, t) {
  return Uo(2048, 8, e, t);
}
function Md(e, t) {
  return Uo(4, 2, e, t);
}
function Od(e, t) {
  return Uo(4, 4, e, t);
}
function Dd(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function zd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Uo(4, 4, Dd.bind(null, t, e), n)
  );
}
function Ia() {}
function Fd(e, t) {
  var n = ut();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oa(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Id(e, t) {
  var n = ut();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oa(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function $d(e, t, n) {
  return _n & 21
    ? (yt(n, t) || ((n = Bf()), (ae.lanes |= n), (Ln |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Be = !0)), (e.memoizedState = n));
}
function fv(e, t) {
  var n = G;
  (G = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Qi.transition;
  Qi.transition = {};
  try {
    e(!1), t();
  } finally {
    (G = n), (Qi.transition = r);
  }
}
function Ud() {
  return ut().memoizedState;
}
function dv(e, t, n) {
  var r = ln(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Ad(e))
  )
    Bd(t, n);
  else if (((n = yd(e, t, n, r)), n !== null)) {
    var l = Ie();
    vt(n, e, r, l), Vd(n, t, r);
  }
}
function pv(e, t, n) {
  var r = ln(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ad(e)) Bd(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          u = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), yt(u, i))) {
          var a = t.interleaved;
          a === null
            ? ((l.next = l), La(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = yd(e, t, l, r)),
      n !== null && ((l = Ie()), vt(n, e, r, l), Vd(n, t, r));
  }
}
function Ad(e) {
  var t = e.alternate;
  return e === ae || (t !== null && t === ae);
}
function Bd(e, t) {
  Kr = wo = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Vd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ha(e, n);
  }
}
var So = {
    readContext: it,
    useCallback: Ne,
    useContext: Ne,
    useEffect: Ne,
    useImperativeHandle: Ne,
    useInsertionEffect: Ne,
    useLayoutEffect: Ne,
    useMemo: Ne,
    useReducer: Ne,
    useRef: Ne,
    useState: Ne,
    useDebugValue: Ne,
    useDeferredValue: Ne,
    useTransition: Ne,
    useMutableSource: Ne,
    useSyncExternalStore: Ne,
    useId: Ne,
    unstable_isNewReconciler: !1,
  },
  hv = {
    readContext: it,
    useCallback: function (e, t) {
      return (St().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: it,
    useEffect: sc,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Jl(4194308, 4, Dd.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Jl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Jl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = St();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = St();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = dv.bind(null, ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = St();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ac,
    useDebugValue: Ia,
    useDeferredValue: function (e) {
      return (St().memoizedState = e);
    },
    useTransition: function () {
      var e = ac(!1),
        t = e[0];
      return (e = fv.bind(null, e[1])), (St().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        l = St();
      if (oe) {
        if (n === void 0) throw Error(L(407));
        n = n();
      } else {
        if (((n = t()), Ee === null)) throw Error(L(349));
        _n & 30 || Rd(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        sc(Ld.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        pl(9, _d.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = St(),
        t = Ee.identifierPrefix;
      if (oe) {
        var n = jt,
          r = Nt;
        (n = (r & ~(1 << (32 - mt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = fl++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = cv++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  mv = {
    readContext: it,
    useCallback: Fd,
    useContext: it,
    useEffect: Fa,
    useImperativeHandle: zd,
    useInsertionEffect: Md,
    useLayoutEffect: Od,
    useMemo: Id,
    useReducer: Ki,
    useRef: Td,
    useState: function () {
      return Ki(dl);
    },
    useDebugValue: Ia,
    useDeferredValue: function (e) {
      var t = ut();
      return $d(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Ki(dl)[0],
        t = ut().memoizedState;
      return [e, t];
    },
    useMutableSource: kd,
    useSyncExternalStore: Pd,
    useId: Ud,
    unstable_isNewReconciler: !1,
  },
  vv = {
    readContext: it,
    useCallback: Fd,
    useContext: it,
    useEffect: Fa,
    useImperativeHandle: zd,
    useInsertionEffect: Md,
    useLayoutEffect: Od,
    useMemo: Id,
    useReducer: Yi,
    useRef: Td,
    useState: function () {
      return Yi(dl);
    },
    useDebugValue: Ia,
    useDeferredValue: function (e) {
      var t = ut();
      return ge === null ? (t.memoizedState = e) : $d(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Yi(dl)[0],
        t = ut().memoizedState;
      return [e, t];
    },
    useMutableSource: kd,
    useSyncExternalStore: Pd,
    useId: Ud,
    unstable_isNewReconciler: !1,
  };
function cr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Hh(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Xi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Fu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var yv = typeof WeakMap == "function" ? WeakMap : Map;
function Wd(e, t, n) {
  (n = Mt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Eo || ((Eo = !0), (Ku = r)), Fu(e, t);
    }),
    n
  );
}
function Hd(e, t, n) {
  (n = Mt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Fu(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Fu(e, t),
          typeof r != "function" &&
            (rn === null ? (rn = new Set([this])) : rn.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function cc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new yv();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = Tv.bind(null, e, t, n)), t.then(e, e));
}
function fc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function dc(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Mt(-1, 1)), (t.tag = 2), nn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var gv = $t.ReactCurrentOwner,
  Be = !1;
function Fe(e, t, n, r) {
  t.child = e === null ? Ed(t, null, n, r) : ar(t, e.child, n, r);
}
function pc(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    nr(t, l),
    (r = Da(e, t, n, r, o, l)),
    (n = za()),
    e !== null && !Be
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        It(e, t, l))
      : (oe && n && Ea(t), (t.flags |= 1), Fe(e, t, r, l), t.child)
  );
}
function hc(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Qa(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Qd(e, t, o, r, l))
      : ((e = eo(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ol), n(i, r) && e.ref === t.ref)
    )
      return It(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = on(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Qd(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (ol(o, r) && e.ref === t.ref)
      if (((Be = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (Be = !0);
      else return (t.lanes = e.lanes), It(e, t, l);
  }
  return Iu(e, t, n, r, l);
}
function Kd(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ne(Jn, Ke),
        (Ke |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          ne(Jn, Ke),
          (Ke |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        ne(Jn, Ke),
        (Ke |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      ne(Jn, Ke),
      (Ke |= r);
  return Fe(e, t, l, n), t.child;
}
function Yd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Iu(e, t, n, r, l) {
  var o = We(n) ? Pn : Oe.current;
  return (
    (o = ir(t, o)),
    nr(t, l),
    (n = Da(e, t, n, r, o, l)),
    (r = za()),
    e !== null && !Be
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        It(e, t, l))
      : (oe && r && Ea(t), (t.flags |= 1), Fe(e, t, n, l), t.child)
  );
}
function mc(e, t, n, r, l) {
  if (We(n)) {
    var o = !0;
    fo(t);
  } else o = !1;
  if ((nr(t, l), t.stateNode === null))
    Zl(e, t), Sd(t, n, r), zu(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      u = t.memoizedProps;
    i.props = u;
    var a = i.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = it(s))
      : ((s = We(n) ? Pn : Oe.current), (s = ir(t, s)));
    var c = n.getDerivedStateFromProps,
      m =
        typeof c == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    m ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((u !== r || a !== s) && ic(t, i, r, s)),
      (Yt = !1);
    var h = t.memoizedState;
    (i.state = h),
      yo(t, r, i, l),
      (a = t.memoizedState),
      u !== r || h !== a || Ve.current || Yt
        ? (typeof c == "function" && (Du(t, n, c, r), (a = t.memoizedState)),
          (u = Yt || oc(t, n, u, r, h, a, s))
            ? (m ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (i.props = r),
          (i.state = a),
          (i.context = s),
          (r = u))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      gd(e, t),
      (u = t.memoizedProps),
      (s = t.type === t.elementType ? u : ft(t.type, u)),
      (i.props = s),
      (m = t.pendingProps),
      (h = i.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = it(a))
        : ((a = We(n) ? Pn : Oe.current), (a = ir(t, a)));
    var S = n.getDerivedStateFromProps;
    (c =
      typeof S == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((u !== m || h !== a) && ic(t, i, r, a)),
      (Yt = !1),
      (h = t.memoizedState),
      (i.state = h),
      yo(t, r, i, l);
    var y = t.memoizedState;
    u !== m || h !== y || Ve.current || Yt
      ? (typeof S == "function" && (Du(t, n, S, r), (y = t.memoizedState)),
        (s = Yt || oc(t, n, s, r, h, y, a) || !1)
          ? (c ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, y, a),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, y, a)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (u === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = y)),
        (i.props = r),
        (i.state = y),
        (i.context = a),
        (r = s))
      : (typeof i.componentDidUpdate != "function" ||
          (u === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return $u(e, t, n, r, o, l);
}
function $u(e, t, n, r, l, o) {
  Yd(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && ec(t, n, !1), It(e, t, o);
  (r = t.stateNode), (gv.current = t);
  var u =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = ar(t, e.child, null, o)), (t.child = ar(t, null, u, o)))
      : Fe(e, t, u, o),
    (t.memoizedState = r.state),
    l && ec(t, n, !0),
    t.child
  );
}
function Xd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? bs(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && bs(e, t.context, !1),
    ja(e, t.containerInfo);
}
function vc(e, t, n, r, l) {
  return ur(), ka(l), (t.flags |= 256), Fe(e, t, n, r), t.child;
}
var Uu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Au(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Gd(e, t, n) {
  var r = t.pendingProps,
    l = ue.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    u;
  if (
    ((u = i) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    ne(ue, l & 1),
    e === null)
  )
    return (
      Mu(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = Vo(i, r, 0, null)),
              (e = kn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Au(n)),
              (t.memoizedState = Uu),
              e)
            : $a(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return wv(e, t, i, r, u, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = on(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (o = on(u, o)) : ((o = kn(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Au(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Uu),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = on(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function $a(e, t) {
  return (
    (t = Vo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ul(e, t, n, r) {
  return (
    r !== null && ka(r),
    ar(t, e.child, null, n),
    (e = $a(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function wv(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Xi(Error(L(422)))), Ul(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (l = t.mode),
          (r = Vo({ mode: "visible", children: r.children }, l, 0, null)),
          (o = kn(o, l, i, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && ar(t, e.child, null, i),
          (t.child.memoizedState = Au(i)),
          (t.memoizedState = Uu),
          o);
  if (!(t.mode & 1)) return Ul(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (r = u), (o = Error(L(419))), (r = Xi(o, r, void 0)), Ul(e, t, i, r);
  }
  if (((u = (i & e.childLanes) !== 0), Be || u)) {
    if (((r = Ee), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), Ft(e, l), vt(r, e, l, -1));
    }
    return Ha(), (r = Xi(Error(L(421)))), Ul(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Mv.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ye = tn(l.nextSibling)),
      (Xe = t),
      (oe = !0),
      (ht = null),
      e !== null &&
        ((nt[rt++] = Nt),
        (nt[rt++] = jt),
        (nt[rt++] = Rn),
        (Nt = e.id),
        (jt = e.overflow),
        (Rn = t)),
      (t = $a(t, r.children)),
      (t.flags |= 4096),
      t);
}
function yc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ou(e.return, t, n);
}
function Gi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function Jd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((Fe(e, t, r.children, n), (r = ue.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && yc(e, n, t);
        else if (e.tag === 19) yc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((ne(ue, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && go(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Gi(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && go(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Gi(t, !0, n, null, o);
        break;
      case "together":
        Gi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Zl(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function It(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ln |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(L(153));
  if (t.child !== null) {
    for (
      e = t.child, n = on(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = on(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Sv(e, t, n) {
  switch (t.tag) {
    case 3:
      Xd(t), ur();
      break;
    case 5:
      Cd(t);
      break;
    case 1:
      We(t.type) && fo(t);
      break;
    case 4:
      ja(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      ne(mo, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ne(ue, ue.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Gd(e, t, n)
            : (ne(ue, ue.current & 1),
              (e = It(e, t, n)),
              e !== null ? e.sibling : null);
      ne(ue, ue.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Jd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        ne(ue, ue.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Kd(e, t, n);
  }
  return It(e, t, n);
}
var Zd, Bu, qd, bd;
Zd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Bu = function () {};
qd = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), xn(Ct.current);
    var o = null;
    switch (n) {
      case "input":
        (l = su(e, l)), (r = su(e, r)), (o = []);
        break;
      case "select":
        (l = se({}, l, { value: void 0 })),
          (r = se({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = du(e, l)), (r = du(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = so);
    }
    hu(n, r);
    var i;
    n = null;
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === "style") {
          var u = l[s];
          for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (qr.hasOwnProperty(s)
              ? o || (o = [])
              : (o = o || []).push(s, null));
    for (s in r) {
      var a = r[s];
      if (
        ((u = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && a !== u && (a != null || u != null))
      )
        if (s === "style")
          if (u) {
            for (i in u)
              !u.hasOwnProperty(i) ||
                (a && a.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in a)
              a.hasOwnProperty(i) &&
                u[i] !== a[i] &&
                (n || (n = {}), (n[i] = a[i]));
          } else n || (o || (o = []), o.push(s, n)), (n = a);
        else
          s === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (u = u ? u.__html : void 0),
              a != null && u !== a && (o = o || []).push(s, a))
            : s === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (o = o || []).push(s, "" + a)
              : s !== "suppressContentEditableWarning" &&
                s !== "suppressHydrationWarning" &&
                (qr.hasOwnProperty(s)
                  ? (a != null && s === "onScroll" && re("scroll", e),
                    o || u === a || (o = []))
                  : (o = o || []).push(s, a));
    }
    n && (o = o || []).push("style", n);
    var s = o;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
bd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function jr(e, t) {
  if (!oe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function je(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function xv(e, t, n) {
  var r = t.pendingProps;
  switch ((Ca(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return je(t), null;
    case 1:
      return We(t.type) && co(), je(t), null;
    case 3:
      return (
        (r = t.stateNode),
        sr(),
        le(Ve),
        le(Oe),
        Ma(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Il(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), ht !== null && (Gu(ht), (ht = null)))),
        Bu(e, t),
        je(t),
        null
      );
    case 5:
      Ta(t);
      var l = xn(cl.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        qd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(L(166));
          return je(t), null;
        }
        if (((e = xn(Ct.current)), Il(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[xt] = t), (r[al] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              re("cancel", r), re("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              re("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ar.length; l++) re(Ar[l], r);
              break;
            case "source":
              re("error", r);
              break;
            case "img":
            case "image":
            case "link":
              re("error", r), re("load", r);
              break;
            case "details":
              re("toggle", r);
              break;
            case "input":
              Rs(r, o), re("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                re("invalid", r);
              break;
            case "textarea":
              Ls(r, o), re("invalid", r);
          }
          hu(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (o.suppressHydrationWarning !== !0 &&
                      Fl(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (o.suppressHydrationWarning !== !0 &&
                      Fl(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : qr.hasOwnProperty(i) &&
                  u != null &&
                  i === "onScroll" &&
                  re("scroll", r);
            }
          switch (n) {
            case "input":
              Ll(r), _s(r, o, !0);
              break;
            case "textarea":
              Ll(r), Ns(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = so);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Rf(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    n === "select" &&
                      ((i = e),
                      r.multiple
                        ? (i.multiple = !0)
                        : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[xt] = t),
            (e[al] = r),
            Zd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = mu(n, r)), n)) {
              case "dialog":
                re("cancel", e), re("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                re("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ar.length; l++) re(Ar[l], e);
                l = r;
                break;
              case "source":
                re("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                re("error", e), re("load", e), (l = r);
                break;
              case "details":
                re("toggle", e), (l = r);
                break;
              case "input":
                Rs(e, r), (l = su(e, r)), re("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = se({}, r, { value: void 0 })),
                  re("invalid", e);
                break;
              case "textarea":
                Ls(e, r), (l = du(e, r)), re("invalid", e);
                break;
              default:
                l = r;
            }
            hu(n, l), (u = l);
            for (o in u)
              if (u.hasOwnProperty(o)) {
                var a = u[o];
                o === "style"
                  ? Nf(e, a)
                  : o === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && _f(e, a))
                    : o === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && br(e, a)
                        : typeof a == "number" && br(e, "" + a)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (qr.hasOwnProperty(o)
                          ? a != null && o === "onScroll" && re("scroll", e)
                          : a != null && aa(e, o, a, i));
              }
            switch (n) {
              case "input":
                Ll(e), _s(e, r, !1);
                break;
              case "textarea":
                Ll(e), Ns(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + un(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? qn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      qn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = so);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return je(t), null;
    case 6:
      if (e && t.stateNode != null) bd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
        if (((n = xn(cl.current)), xn(Ct.current), Il(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[xt] = t),
            (o = r.nodeValue !== n) && ((e = Xe), e !== null))
          )
            switch (e.tag) {
              case 3:
                Fl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Fl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[xt] = t),
            (t.stateNode = r);
      }
      return je(t), null;
    case 13:
      if (
        (le(ue),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (oe && Ye !== null && t.mode & 1 && !(t.flags & 128))
          vd(), ur(), (t.flags |= 98560), (o = !1);
        else if (((o = Il(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(L(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(L(317));
            o[xt] = t;
          } else
            ur(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          je(t), (o = !1);
        } else ht !== null && (Gu(ht), (ht = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ue.current & 1 ? we === 0 && (we = 3) : Ha())),
          t.updateQueue !== null && (t.flags |= 4),
          je(t),
          null);
    case 4:
      return (
        sr(), Bu(e, t), e === null && il(t.stateNode.containerInfo), je(t), null
      );
    case 10:
      return _a(t.type._context), je(t), null;
    case 17:
      return We(t.type) && co(), je(t), null;
    case 19:
      if ((le(ue), (o = t.memoizedState), o === null)) return je(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) jr(o, !1);
        else {
          if (we !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = go(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    jr(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return ne(ue, (ue.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            me() > fr &&
            ((t.flags |= 128), (r = !0), jr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = go(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              jr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !oe)
            )
              return je(t), null;
          } else
            2 * me() - o.renderingStartTime > fr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), jr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = me()),
          (t.sibling = null),
          (n = ue.current),
          ne(ue, r ? (n & 1) | 2 : n & 1),
          t)
        : (je(t), null);
    case 22:
    case 23:
      return (
        Wa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ke & 1073741824 && (je(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : je(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, t.tag));
}
function Ev(e, t) {
  switch ((Ca(t), t.tag)) {
    case 1:
      return (
        We(t.type) && co(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        sr(),
        le(Ve),
        le(Oe),
        Ma(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ta(t), null;
    case 13:
      if (
        (le(ue), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(L(340));
        ur();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return le(ue), null;
    case 4:
      return sr(), null;
    case 10:
      return _a(t.type._context), null;
    case 22:
    case 23:
      return Wa(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Al = !1,
  Me = !1,
  Cv = typeof WeakSet == "function" ? WeakSet : Set,
  O = null;
function Gn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        fe(e, t, r);
      }
    else n.current = null;
}
function Vu(e, t, n) {
  try {
    n();
  } catch (r) {
    fe(e, t, r);
  }
}
var gc = !1;
function kv(e, t) {
  if (((Pu = io), (e = rd()), xa(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            u = -1,
            a = -1,
            s = 0,
            c = 0,
            m = e,
            h = null;
          t: for (;;) {
            for (
              var S;
              m !== n || (l !== 0 && m.nodeType !== 3) || (u = i + l),
                m !== o || (r !== 0 && m.nodeType !== 3) || (a = i + r),
                m.nodeType === 3 && (i += m.nodeValue.length),
                (S = m.firstChild) !== null;

            )
              (h = m), (m = S);
            for (;;) {
              if (m === e) break t;
              if (
                (h === n && ++s === l && (u = i),
                h === o && ++c === r && (a = i),
                (S = m.nextSibling) !== null)
              )
                break;
              (m = h), (h = m.parentNode);
            }
            m = S;
          }
          n = u === -1 || a === -1 ? null : { start: u, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ru = { focusedElem: e, selectionRange: n }, io = !1, O = t; O !== null; )
    if (((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (O = e);
    else
      for (; O !== null; ) {
        t = O;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var w = y.memoizedProps,
                    R = y.memoizedState,
                    d = t.stateNode,
                    f = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : ft(t.type, w),
                      R,
                    );
                  d.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(L(163));
            }
        } catch (p) {
          fe(t, t.return, p);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (O = e);
          break;
        }
        O = t.return;
      }
  return (y = gc), (gc = !1), y;
}
function Yr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && Vu(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Ao(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Wu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function ep(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), ep(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[xt], delete t[al], delete t[Nu], delete t[iv], delete t[uv])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function tp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function wc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || tp(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Hu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = so));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Hu(e, t, n), e = e.sibling; e !== null; ) Hu(e, t, n), (e = e.sibling);
}
function Qu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Qu(e, t, n), e = e.sibling; e !== null; ) Qu(e, t, n), (e = e.sibling);
}
var Re = null,
  dt = !1;
function Ht(e, t, n) {
  for (n = n.child; n !== null; ) np(e, t, n), (n = n.sibling);
}
function np(e, t, n) {
  if (Et && typeof Et.onCommitFiberUnmount == "function")
    try {
      Et.onCommitFiberUnmount(Mo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Me || Gn(n, t);
    case 6:
      var r = Re,
        l = dt;
      (Re = null),
        Ht(e, t, n),
        (Re = r),
        (dt = l),
        Re !== null &&
          (dt
            ? ((e = Re),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Re.removeChild(n.stateNode));
      break;
    case 18:
      Re !== null &&
        (dt
          ? ((e = Re),
            (n = n.stateNode),
            e.nodeType === 8
              ? Vi(e.parentNode, n)
              : e.nodeType === 1 && Vi(e, n),
            rl(e))
          : Vi(Re, n.stateNode));
      break;
    case 4:
      (r = Re),
        (l = dt),
        (Re = n.stateNode.containerInfo),
        (dt = !0),
        Ht(e, t, n),
        (Re = r),
        (dt = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Me &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && Vu(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      Ht(e, t, n);
      break;
    case 1:
      if (
        !Me &&
        (Gn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (u) {
          fe(n, t, u);
        }
      Ht(e, t, n);
      break;
    case 21:
      Ht(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Me = (r = Me) || n.memoizedState !== null), Ht(e, t, n), (Me = r))
        : Ht(e, t, n);
      break;
    default:
      Ht(e, t, n);
  }
}
function Sc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Cv()),
      t.forEach(function (r) {
        var l = Ov.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function ct(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          u = i;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (Re = u.stateNode), (dt = !1);
              break e;
            case 3:
              (Re = u.stateNode.containerInfo), (dt = !0);
              break e;
            case 4:
              (Re = u.stateNode.containerInfo), (dt = !0);
              break e;
          }
          u = u.return;
        }
        if (Re === null) throw Error(L(160));
        np(o, i, l), (Re = null), (dt = !1);
        var a = l.alternate;
        a !== null && (a.return = null), (l.return = null);
      } catch (s) {
        fe(l, t, s);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) rp(t, e), (t = t.sibling);
}
function rp(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ct(t, e), wt(e), r & 4)) {
        try {
          Yr(3, e, e.return), Ao(3, e);
        } catch (w) {
          fe(e, e.return, w);
        }
        try {
          Yr(5, e, e.return);
        } catch (w) {
          fe(e, e.return, w);
        }
      }
      break;
    case 1:
      ct(t, e), wt(e), r & 512 && n !== null && Gn(n, n.return);
      break;
    case 5:
      if (
        (ct(t, e),
        wt(e),
        r & 512 && n !== null && Gn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          br(l, "");
        } catch (w) {
          fe(e, e.return, w);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          u = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            u === "input" && o.type === "radio" && o.name != null && kf(l, o),
              mu(u, i);
            var s = mu(u, o);
            for (i = 0; i < a.length; i += 2) {
              var c = a[i],
                m = a[i + 1];
              c === "style"
                ? Nf(l, m)
                : c === "dangerouslySetInnerHTML"
                  ? _f(l, m)
                  : c === "children"
                    ? br(l, m)
                    : aa(l, c, m, s);
            }
            switch (u) {
              case "input":
                cu(l, o);
                break;
              case "textarea":
                Pf(l, o);
                break;
              case "select":
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var S = o.value;
                S != null
                  ? qn(l, !!o.multiple, S, !1)
                  : h !== !!o.multiple &&
                    (o.defaultValue != null
                      ? qn(l, !!o.multiple, o.defaultValue, !0)
                      : qn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[al] = o;
          } catch (w) {
            fe(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((ct(t, e), wt(e), r & 4)) {
        if (e.stateNode === null) throw Error(L(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (w) {
          fe(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (ct(t, e), wt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          rl(t.containerInfo);
        } catch (w) {
          fe(e, e.return, w);
        }
      break;
    case 4:
      ct(t, e), wt(e);
      break;
    case 13:
      ct(t, e),
        wt(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Ba = me())),
        r & 4 && Sc(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Me = (s = Me) || c), ct(t, e), (Me = s)) : ct(t, e),
        wt(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !c && e.mode & 1)
        )
          for (O = e, c = e.child; c !== null; ) {
            for (m = O = c; O !== null; ) {
              switch (((h = O), (S = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Yr(4, h, h.return);
                  break;
                case 1:
                  Gn(h, h.return);
                  var y = h.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    (r = h), (n = h.return);
                    try {
                      (t = r),
                        (y.props = t.memoizedProps),
                        (y.state = t.memoizedState),
                        y.componentWillUnmount();
                    } catch (w) {
                      fe(r, n, w);
                    }
                  }
                  break;
                case 5:
                  Gn(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    Ec(m);
                    continue;
                  }
              }
              S !== null ? ((S.return = h), (O = S)) : Ec(m);
            }
            c = c.sibling;
          }
        e: for (c = null, m = e; ; ) {
          if (m.tag === 5) {
            if (c === null) {
              c = m;
              try {
                (l = m.stateNode),
                  s
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((u = m.stateNode),
                      (a = m.memoizedProps.style),
                      (i =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (u.style.display = Lf("display", i)));
              } catch (w) {
                fe(e, e.return, w);
              }
            }
          } else if (m.tag === 6) {
            if (c === null)
              try {
                m.stateNode.nodeValue = s ? "" : m.memoizedProps;
              } catch (w) {
                fe(e, e.return, w);
              }
          } else if (
            ((m.tag !== 22 && m.tag !== 23) ||
              m.memoizedState === null ||
              m === e) &&
            m.child !== null
          ) {
            (m.child.return = m), (m = m.child);
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            c === m && (c = null), (m = m.return);
          }
          c === m && (c = null), (m.sibling.return = m.return), (m = m.sibling);
        }
      }
      break;
    case 19:
      ct(t, e), wt(e), r & 4 && Sc(e);
      break;
    case 21:
      break;
    default:
      ct(t, e), wt(e);
  }
}
function wt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (tp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(L(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (br(l, ""), (r.flags &= -33));
          var o = wc(e);
          Qu(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            u = wc(e);
          Hu(e, u, i);
          break;
        default:
          throw Error(L(161));
      }
    } catch (a) {
      fe(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Pv(e, t, n) {
  (O = e), lp(e);
}
function lp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; O !== null; ) {
    var l = O,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Al;
      if (!i) {
        var u = l.alternate,
          a = (u !== null && u.memoizedState !== null) || Me;
        u = Al;
        var s = Me;
        if (((Al = i), (Me = a) && !s))
          for (O = l; O !== null; )
            (i = O),
              (a = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Cc(l)
                : a !== null
                  ? ((a.return = i), (O = a))
                  : Cc(l);
        for (; o !== null; ) (O = o), lp(o), (o = o.sibling);
        (O = l), (Al = u), (Me = s);
      }
      xc(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (O = o)) : xc(e);
  }
}
function xc(e) {
  for (; O !== null; ) {
    var t = O;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Me || Ao(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Me)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : ft(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var o = t.updateQueue;
              o !== null && lc(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                lc(t, i, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var c = s.memoizedState;
                  if (c !== null) {
                    var m = c.dehydrated;
                    m !== null && rl(m);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(L(163));
          }
        Me || (t.flags & 512 && Wu(t));
      } catch (h) {
        fe(t, t.return, h);
      }
    }
    if (t === e) {
      O = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (O = n);
      break;
    }
    O = t.return;
  }
}
function Ec(e) {
  for (; O !== null; ) {
    var t = O;
    if (t === e) {
      O = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (O = n);
      break;
    }
    O = t.return;
  }
}
function Cc(e) {
  for (; O !== null; ) {
    var t = O;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ao(4, t);
          } catch (a) {
            fe(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              fe(t, l, a);
            }
          }
          var o = t.return;
          try {
            Wu(t);
          } catch (a) {
            fe(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Wu(t);
          } catch (a) {
            fe(t, i, a);
          }
      }
    } catch (a) {
      fe(t, t.return, a);
    }
    if (t === e) {
      O = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      (u.return = t.return), (O = u);
      break;
    }
    O = t.return;
  }
}
var Rv = Math.ceil,
  xo = $t.ReactCurrentDispatcher,
  Ua = $t.ReactCurrentOwner,
  ot = $t.ReactCurrentBatchConfig,
  Y = 0,
  Ee = null,
  ye = null,
  _e = 0,
  Ke = 0,
  Jn = dn(0),
  we = 0,
  hl = null,
  Ln = 0,
  Bo = 0,
  Aa = 0,
  Xr = null,
  Ae = null,
  Ba = 0,
  fr = 1 / 0,
  _t = null,
  Eo = !1,
  Ku = null,
  rn = null,
  Bl = !1,
  Zt = null,
  Co = 0,
  Gr = 0,
  Yu = null,
  ql = -1,
  bl = 0;
function Ie() {
  return Y & 6 ? me() : ql !== -1 ? ql : (ql = me());
}
function ln(e) {
  return e.mode & 1
    ? Y & 2 && _e !== 0
      ? _e & -_e
      : sv.transition !== null
        ? (bl === 0 && (bl = Bf()), bl)
        : ((e = G),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Xf(e.type))),
          e)
    : 1;
}
function vt(e, t, n, r) {
  if (50 < Gr) throw ((Gr = 0), (Yu = null), Error(L(185)));
  gl(e, n, r),
    (!(Y & 2) || e !== Ee) &&
      (e === Ee && (!(Y & 2) && (Bo |= n), we === 4 && Gt(e, _e)),
      He(e, r),
      n === 1 && Y === 0 && !(t.mode & 1) && ((fr = me() + 500), Io && pn()));
}
function He(e, t) {
  var n = e.callbackNode;
  sm(e, t);
  var r = oo(e, e === Ee ? _e : 0);
  if (r === 0)
    n !== null && Ms(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ms(n), t === 1))
      e.tag === 0 ? av(kc.bind(null, e)) : pd(kc.bind(null, e)),
        lv(function () {
          !(Y & 6) && pn();
        }),
        (n = null);
    else {
      switch (Vf(r)) {
        case 1:
          n = pa;
          break;
        case 4:
          n = Uf;
          break;
        case 16:
          n = lo;
          break;
        case 536870912:
          n = Af;
          break;
        default:
          n = lo;
      }
      n = dp(n, op.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function op(e, t) {
  if (((ql = -1), (bl = 0), Y & 6)) throw Error(L(327));
  var n = e.callbackNode;
  if (rr() && e.callbackNode !== n) return null;
  var r = oo(e, e === Ee ? _e : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ko(e, r);
  else {
    t = r;
    var l = Y;
    Y |= 2;
    var o = up();
    (Ee !== e || _e !== t) && ((_t = null), (fr = me() + 500), Cn(e, t));
    do
      try {
        Nv();
        break;
      } catch (u) {
        ip(e, u);
      }
    while (1);
    Ra(),
      (xo.current = o),
      (Y = l),
      ye !== null ? (t = 0) : ((Ee = null), (_e = 0), (t = we));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Su(e)), l !== 0 && ((r = l), (t = Xu(e, l)))), t === 1)
    )
      throw ((n = hl), Cn(e, 0), Gt(e, r), He(e, me()), n);
    if (t === 6) Gt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !_v(l) &&
          ((t = ko(e, r)),
          t === 2 && ((o = Su(e)), o !== 0 && ((r = o), (t = Xu(e, o)))),
          t === 1))
      )
        throw ((n = hl), Cn(e, 0), Gt(e, r), He(e, me()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          gn(e, Ae, _t);
          break;
        case 3:
          if (
            (Gt(e, r), (r & 130023424) === r && ((t = Ba + 500 - me()), 10 < t))
          ) {
            if (oo(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Ie(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Lu(gn.bind(null, e, Ae, _t), t);
            break;
          }
          gn(e, Ae, _t);
          break;
        case 4:
          if ((Gt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - mt(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = me() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Rv(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Lu(gn.bind(null, e, Ae, _t), r);
            break;
          }
          gn(e, Ae, _t);
          break;
        case 5:
          gn(e, Ae, _t);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return He(e, me()), e.callbackNode === n ? op.bind(null, e) : null;
}
function Xu(e, t) {
  var n = Xr;
  return (
    e.current.memoizedState.isDehydrated && (Cn(e, t).flags |= 256),
    (e = ko(e, t)),
    e !== 2 && ((t = Ae), (Ae = n), t !== null && Gu(t)),
    e
  );
}
function Gu(e) {
  Ae === null ? (Ae = e) : Ae.push.apply(Ae, e);
}
function _v(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!yt(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Gt(e, t) {
  for (
    t &= ~Aa,
      t &= ~Bo,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - mt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function kc(e) {
  if (Y & 6) throw Error(L(327));
  rr();
  var t = oo(e, 0);
  if (!(t & 1)) return He(e, me()), null;
  var n = ko(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Su(e);
    r !== 0 && ((t = r), (n = Xu(e, r)));
  }
  if (n === 1) throw ((n = hl), Cn(e, 0), Gt(e, t), He(e, me()), n);
  if (n === 6) throw Error(L(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    gn(e, Ae, _t),
    He(e, me()),
    null
  );
}
function Va(e, t) {
  var n = Y;
  Y |= 1;
  try {
    return e(t);
  } finally {
    (Y = n), Y === 0 && ((fr = me() + 500), Io && pn());
  }
}
function Nn(e) {
  Zt !== null && Zt.tag === 0 && !(Y & 6) && rr();
  var t = Y;
  Y |= 1;
  var n = ot.transition,
    r = G;
  try {
    if (((ot.transition = null), (G = 1), e)) return e();
  } finally {
    (G = r), (ot.transition = n), (Y = t), !(Y & 6) && pn();
  }
}
function Wa() {
  (Ke = Jn.current), le(Jn);
}
function Cn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), rv(n)), ye !== null))
    for (n = ye.return; n !== null; ) {
      var r = n;
      switch ((Ca(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && co();
          break;
        case 3:
          sr(), le(Ve), le(Oe), Ma();
          break;
        case 5:
          Ta(r);
          break;
        case 4:
          sr();
          break;
        case 13:
          le(ue);
          break;
        case 19:
          le(ue);
          break;
        case 10:
          _a(r.type._context);
          break;
        case 22:
        case 23:
          Wa();
      }
      n = n.return;
    }
  if (
    ((Ee = e),
    (ye = e = on(e.current, null)),
    (_e = Ke = t),
    (we = 0),
    (hl = null),
    (Aa = Bo = Ln = 0),
    (Ae = Xr = null),
    Sn !== null)
  ) {
    for (t = 0; t < Sn.length; t++)
      if (((n = Sn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    Sn = null;
  }
  return e;
}
function ip(e, t) {
  do {
    var n = ye;
    try {
      if ((Ra(), (Gl.current = So), wo)) {
        for (var r = ae.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        wo = !1;
      }
      if (
        ((_n = 0),
        (xe = ge = ae = null),
        (Kr = !1),
        (fl = 0),
        (Ua.current = null),
        n === null || n.return === null)
      ) {
        (we = 1), (hl = t), (ye = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          u = n,
          a = t;
        if (
          ((t = _e),
          (u.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var s = a,
            c = u,
            m = c.tag;
          if (!(c.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = c.alternate;
            h
              ? ((c.updateQueue = h.updateQueue),
                (c.memoizedState = h.memoizedState),
                (c.lanes = h.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var S = fc(i);
          if (S !== null) {
            (S.flags &= -257),
              dc(S, i, u, o, t),
              S.mode & 1 && cc(o, s, t),
              (t = S),
              (a = s);
            var y = t.updateQueue;
            if (y === null) {
              var w = new Set();
              w.add(a), (t.updateQueue = w);
            } else y.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              cc(o, s, t), Ha();
              break e;
            }
            a = Error(L(426));
          }
        } else if (oe && u.mode & 1) {
          var R = fc(i);
          if (R !== null) {
            !(R.flags & 65536) && (R.flags |= 256),
              dc(R, i, u, o, t),
              ka(cr(a, u));
            break e;
          }
        }
        (o = a = cr(a, u)),
          we !== 4 && (we = 2),
          Xr === null ? (Xr = [o]) : Xr.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var d = Wd(o, a, t);
              rc(o, d);
              break e;
            case 1:
              u = a;
              var f = o.type,
                v = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch == "function" &&
                    (rn === null || !rn.has(v))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var p = Hd(o, u, t);
                rc(o, p);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      sp(n);
    } catch (_) {
      (t = _), ye === n && n !== null && (ye = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function up() {
  var e = xo.current;
  return (xo.current = So), e === null ? So : e;
}
function Ha() {
  (we === 0 || we === 3 || we === 2) && (we = 4),
    Ee === null || (!(Ln & 268435455) && !(Bo & 268435455)) || Gt(Ee, _e);
}
function ko(e, t) {
  var n = Y;
  Y |= 2;
  var r = up();
  (Ee !== e || _e !== t) && ((_t = null), Cn(e, t));
  do
    try {
      Lv();
      break;
    } catch (l) {
      ip(e, l);
    }
  while (1);
  if ((Ra(), (Y = n), (xo.current = r), ye !== null)) throw Error(L(261));
  return (Ee = null), (_e = 0), we;
}
function Lv() {
  for (; ye !== null; ) ap(ye);
}
function Nv() {
  for (; ye !== null && !em(); ) ap(ye);
}
function ap(e) {
  var t = fp(e.alternate, e, Ke);
  (e.memoizedProps = e.pendingProps),
    t === null ? sp(e) : (ye = t),
    (Ua.current = null);
}
function sp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ev(n, t)), n !== null)) {
        (n.flags &= 32767), (ye = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (we = 6), (ye = null);
        return;
      }
    } else if (((n = xv(n, t, Ke)), n !== null)) {
      ye = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ye = t;
      return;
    }
    ye = t = e;
  } while (t !== null);
  we === 0 && (we = 5);
}
function gn(e, t, n) {
  var r = G,
    l = ot.transition;
  try {
    (ot.transition = null), (G = 1), jv(e, t, n, r);
  } finally {
    (ot.transition = l), (G = r);
  }
  return null;
}
function jv(e, t, n, r) {
  do rr();
  while (Zt !== null);
  if (Y & 6) throw Error(L(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(L(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (cm(e, o),
    e === Ee && ((ye = Ee = null), (_e = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Bl ||
      ((Bl = !0),
      dp(lo, function () {
        return rr(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = ot.transition), (ot.transition = null);
    var i = G;
    G = 1;
    var u = Y;
    (Y |= 4),
      (Ua.current = null),
      kv(e, n),
      rp(n, e),
      Jm(Ru),
      (io = !!Pu),
      (Ru = Pu = null),
      (e.current = n),
      Pv(n),
      tm(),
      (Y = u),
      (G = i),
      (ot.transition = o);
  } else e.current = n;
  if (
    (Bl && ((Bl = !1), (Zt = e), (Co = l)),
    (o = e.pendingLanes),
    o === 0 && (rn = null),
    lm(n.stateNode),
    He(e, me()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Eo) throw ((Eo = !1), (e = Ku), (Ku = null), e);
  return (
    Co & 1 && e.tag !== 0 && rr(),
    (o = e.pendingLanes),
    o & 1 ? (e === Yu ? Gr++ : ((Gr = 0), (Yu = e))) : (Gr = 0),
    pn(),
    null
  );
}
function rr() {
  if (Zt !== null) {
    var e = Vf(Co),
      t = ot.transition,
      n = G;
    try {
      if (((ot.transition = null), (G = 16 > e ? 16 : e), Zt === null))
        var r = !1;
      else {
        if (((e = Zt), (Zt = null), (Co = 0), Y & 6)) throw Error(L(331));
        var l = Y;
        for (Y |= 4, O = e.current; O !== null; ) {
          var o = O,
            i = o.child;
          if (O.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var s = u[a];
                for (O = s; O !== null; ) {
                  var c = O;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yr(8, c, o);
                  }
                  var m = c.child;
                  if (m !== null) (m.return = c), (O = m);
                  else
                    for (; O !== null; ) {
                      c = O;
                      var h = c.sibling,
                        S = c.return;
                      if ((ep(c), c === s)) {
                        O = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = S), (O = h);
                        break;
                      }
                      O = S;
                    }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var w = y.child;
                if (w !== null) {
                  y.child = null;
                  do {
                    var R = w.sibling;
                    (w.sibling = null), (w = R);
                  } while (w !== null);
                }
              }
              O = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (O = i);
          else
            e: for (; O !== null; ) {
              if (((o = O), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Yr(9, o, o.return);
                }
              var d = o.sibling;
              if (d !== null) {
                (d.return = o.return), (O = d);
                break e;
              }
              O = o.return;
            }
        }
        var f = e.current;
        for (O = f; O !== null; ) {
          i = O;
          var v = i.child;
          if (i.subtreeFlags & 2064 && v !== null) (v.return = i), (O = v);
          else
            e: for (i = f; O !== null; ) {
              if (((u = O), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ao(9, u);
                  }
                } catch (_) {
                  fe(u, u.return, _);
                }
              if (u === i) {
                O = null;
                break e;
              }
              var p = u.sibling;
              if (p !== null) {
                (p.return = u.return), (O = p);
                break e;
              }
              O = u.return;
            }
        }
        if (
          ((Y = l), pn(), Et && typeof Et.onPostCommitFiberRoot == "function")
        )
          try {
            Et.onPostCommitFiberRoot(Mo, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (G = n), (ot.transition = t);
    }
  }
  return !1;
}
function Pc(e, t, n) {
  (t = cr(n, t)),
    (t = Wd(e, t, 1)),
    (e = nn(e, t, 1)),
    (t = Ie()),
    e !== null && (gl(e, 1, t), He(e, t));
}
function fe(e, t, n) {
  if (e.tag === 3) Pc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Pc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (rn === null || !rn.has(r)))
        ) {
          (e = cr(n, e)),
            (e = Hd(t, e, 1)),
            (t = nn(t, e, 1)),
            (e = Ie()),
            t !== null && (gl(t, 1, e), He(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Tv(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ie()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ee === e &&
      (_e & n) === n &&
      (we === 4 || (we === 3 && (_e & 130023424) === _e && 500 > me() - Ba)
        ? Cn(e, 0)
        : (Aa |= n)),
    He(e, t);
}
function cp(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Tl), (Tl <<= 1), !(Tl & 130023424) && (Tl = 4194304))
      : (t = 1));
  var n = Ie();
  (e = Ft(e, t)), e !== null && (gl(e, t, n), He(e, n));
}
function Mv(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), cp(e, n);
}
function Ov(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(L(314));
  }
  r !== null && r.delete(t), cp(e, n);
}
var fp;
fp = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ve.current) Be = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Be = !1), Sv(e, t, n);
      Be = !!(e.flags & 131072);
    }
  else (Be = !1), oe && t.flags & 1048576 && hd(t, ho, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Zl(e, t), (e = t.pendingProps);
      var l = ir(t, Oe.current);
      nr(t, n), (l = Da(null, t, r, e, l, n));
      var o = za();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            We(r) ? ((o = !0), fo(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Na(t),
            (l.updater = $o),
            (t.stateNode = l),
            (l._reactInternals = t),
            zu(t, r, e, n),
            (t = $u(null, t, r, !0, o, n)))
          : ((t.tag = 0), oe && o && Ea(t), Fe(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Zl(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = zv(r)),
          (e = ft(r, e)),
          l)
        ) {
          case 0:
            t = Iu(null, t, r, e, n);
            break e;
          case 1:
            t = mc(null, t, r, e, n);
            break e;
          case 11:
            t = pc(null, t, r, e, n);
            break e;
          case 14:
            t = hc(null, t, r, ft(r.type, e), n);
            break e;
        }
        throw Error(L(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        Iu(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        mc(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Xd(t), e === null)) throw Error(L(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          gd(e, t),
          yo(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = cr(Error(L(423)), t)), (t = vc(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = cr(Error(L(424)), t)), (t = vc(e, t, r, n, l));
            break e;
          } else
            for (
              Ye = tn(t.stateNode.containerInfo.firstChild),
                Xe = t,
                oe = !0,
                ht = null,
                n = Ed(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((ur(), r === l)) {
            t = It(e, t, n);
            break e;
          }
          Fe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Cd(t),
        e === null && Mu(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        _u(r, l) ? (i = null) : o !== null && _u(r, o) && (t.flags |= 32),
        Yd(e, t),
        Fe(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Mu(t), null;
    case 13:
      return Gd(e, t, n);
    case 4:
      return (
        ja(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = ar(t, null, r, n)) : Fe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        pc(e, t, r, l, n)
      );
    case 7:
      return Fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return Fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          ne(mo, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (yt(o.value, i)) {
            if (o.children === l.children && !Ve.current) {
              t = It(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var u = o.dependencies;
              if (u !== null) {
                i = o.child;
                for (var a = u.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = Mt(-1, n & -n)), (a.tag = 2);
                      var s = o.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var c = s.pending;
                        c === null
                          ? (a.next = a)
                          : ((a.next = c.next), (c.next = a)),
                          (s.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      Ou(o.return, n, t),
                      (u.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(L(341));
                (i.lanes |= n),
                  (u = i.alternate),
                  u !== null && (u.lanes |= n),
                  Ou(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        Fe(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        nr(t, n),
        (l = it(l)),
        (r = r(l)),
        (t.flags |= 1),
        Fe(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = ft(r, t.pendingProps)),
        (l = ft(r.type, l)),
        hc(e, t, r, l, n)
      );
    case 15:
      return Qd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        Zl(e, t),
        (t.tag = 1),
        We(r) ? ((e = !0), fo(t)) : (e = !1),
        nr(t, n),
        Sd(t, r, l),
        zu(t, r, l, n),
        $u(null, t, r, !0, e, n)
      );
    case 19:
      return Jd(e, t, n);
    case 22:
      return Kd(e, t, n);
  }
  throw Error(L(156, t.tag));
};
function dp(e, t) {
  return $f(e, t);
}
function Dv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function lt(e, t, n, r) {
  return new Dv(e, t, n, r);
}
function Qa(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function zv(e) {
  if (typeof e == "function") return Qa(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ca)) return 11;
    if (e === fa) return 14;
  }
  return 2;
}
function on(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = lt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function eo(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) Qa(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case An:
        return kn(n.children, l, o, t);
      case sa:
        (i = 8), (l |= 8);
        break;
      case ou:
        return (
          (e = lt(12, n, t, l | 2)), (e.elementType = ou), (e.lanes = o), e
        );
      case iu:
        return (e = lt(13, n, t, l)), (e.elementType = iu), (e.lanes = o), e;
      case uu:
        return (e = lt(19, n, t, l)), (e.elementType = uu), (e.lanes = o), e;
      case xf:
        return Vo(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case wf:
              i = 10;
              break e;
            case Sf:
              i = 9;
              break e;
            case ca:
              i = 11;
              break e;
            case fa:
              i = 14;
              break e;
            case Kt:
              (i = 16), (r = null);
              break e;
          }
        throw Error(L(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = lt(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function kn(e, t, n, r) {
  return (e = lt(7, e, r, t)), (e.lanes = n), e;
}
function Vo(e, t, n, r) {
  return (
    (e = lt(22, e, r, t)),
    (e.elementType = xf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ji(e, t, n) {
  return (e = lt(6, e, null, t)), (e.lanes = n), e;
}
function Zi(e, t, n) {
  return (
    (t = lt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Fv(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ti(0)),
    (this.expirationTimes = Ti(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ti(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Ka(e, t, n, r, l, o, i, u, a) {
  return (
    (e = new Fv(e, t, n, u, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = lt(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Na(o),
    e
  );
}
function Iv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Un,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function pp(e) {
  if (!e) return an;
  e = e._reactInternals;
  e: {
    if (On(e) !== e || e.tag !== 1) throw Error(L(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (We(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(L(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (We(n)) return dd(e, n, t);
  }
  return t;
}
function hp(e, t, n, r, l, o, i, u, a) {
  return (
    (e = Ka(n, r, !0, e, l, o, i, u, a)),
    (e.context = pp(null)),
    (n = e.current),
    (r = Ie()),
    (l = ln(n)),
    (o = Mt(r, l)),
    (o.callback = t ?? null),
    nn(n, o, l),
    (e.current.lanes = l),
    gl(e, l, r),
    He(e, r),
    e
  );
}
function Wo(e, t, n, r) {
  var l = t.current,
    o = Ie(),
    i = ln(l);
  return (
    (n = pp(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Mt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = nn(l, t, i)),
    e !== null && (vt(e, l, i, o), Xl(e, l, i)),
    i
  );
}
function Po(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Rc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ya(e, t) {
  Rc(e, t), (e = e.alternate) && Rc(e, t);
}
function $v() {
  return null;
}
var mp =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Xa(e) {
  this._internalRoot = e;
}
Ho.prototype.render = Xa.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(L(409));
  Wo(e, t, null, null);
};
Ho.prototype.unmount = Xa.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Nn(function () {
      Wo(null, e, null, null);
    }),
      (t[zt] = null);
  }
};
function Ho(e) {
  this._internalRoot = e;
}
Ho.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Qf();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Xt.length && t !== 0 && t < Xt[n].priority; n++);
    Xt.splice(n, 0, e), n === 0 && Yf(e);
  }
};
function Ga(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Qo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function _c() {}
function Uv(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var s = Po(i);
        o.call(s);
      };
    }
    var i = hp(t, r, e, 0, null, !1, !1, "", _c);
    return (
      (e._reactRootContainer = i),
      (e[zt] = i.current),
      il(e.nodeType === 8 ? e.parentNode : e),
      Nn(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var s = Po(a);
      u.call(s);
    };
  }
  var a = Ka(e, 0, !1, null, null, !1, !1, "", _c);
  return (
    (e._reactRootContainer = a),
    (e[zt] = a.current),
    il(e.nodeType === 8 ? e.parentNode : e),
    Nn(function () {
      Wo(t, a, n, r);
    }),
    a
  );
}
function Ko(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function () {
        var a = Po(i);
        u.call(a);
      };
    }
    Wo(t, i, e, l);
  } else i = Uv(n, t, e, l, r);
  return Po(i);
}
Wf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ur(t.pendingLanes);
        n !== 0 &&
          (ha(t, n | 1), He(t, me()), !(Y & 6) && ((fr = me() + 500), pn()));
      }
      break;
    case 13:
      Nn(function () {
        var r = Ft(e, 1);
        if (r !== null) {
          var l = Ie();
          vt(r, e, 1, l);
        }
      }),
        Ya(e, 1);
  }
};
ma = function (e) {
  if (e.tag === 13) {
    var t = Ft(e, 134217728);
    if (t !== null) {
      var n = Ie();
      vt(t, e, 134217728, n);
    }
    Ya(e, 134217728);
  }
};
Hf = function (e) {
  if (e.tag === 13) {
    var t = ln(e),
      n = Ft(e, t);
    if (n !== null) {
      var r = Ie();
      vt(n, e, t, r);
    }
    Ya(e, t);
  }
};
Qf = function () {
  return G;
};
Kf = function (e, t) {
  var n = G;
  try {
    return (G = e), t();
  } finally {
    G = n;
  }
};
yu = function (e, t, n) {
  switch (t) {
    case "input":
      if ((cu(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Fo(r);
            if (!l) throw Error(L(90));
            Cf(r), cu(r, l);
          }
        }
      }
      break;
    case "textarea":
      Pf(e, n);
      break;
    case "select":
      (t = n.value), t != null && qn(e, !!n.multiple, t, !1);
  }
};
Mf = Va;
Of = Nn;
var Av = { usingClientEntryPoint: !1, Events: [Sl, Hn, Fo, jf, Tf, Va] },
  Tr = {
    findFiberByHostInstance: wn,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  Bv = {
    bundleType: Tr.bundleType,
    version: Tr.version,
    rendererPackageName: Tr.rendererPackageName,
    rendererConfig: Tr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: $t.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Ff(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Tr.findFiberByHostInstance || $v,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Vl.isDisabled && Vl.supportsFiber)
    try {
      (Mo = Vl.inject(Bv)), (Et = Vl);
    } catch {}
}
Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Av;
Je.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ga(t)) throw Error(L(200));
  return Iv(e, t, null, n);
};
Je.createRoot = function (e, t) {
  if (!Ga(e)) throw Error(L(299));
  var n = !1,
    r = "",
    l = mp;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Ka(e, 1, !1, null, null, n, !1, r, l)),
    (e[zt] = t.current),
    il(e.nodeType === 8 ? e.parentNode : e),
    new Xa(t)
  );
};
Je.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(L(188))
      : ((e = Object.keys(e).join(",")), Error(L(268, e)));
  return (e = Ff(t)), (e = e === null ? null : e.stateNode), e;
};
Je.flushSync = function (e) {
  return Nn(e);
};
Je.hydrate = function (e, t, n) {
  if (!Qo(t)) throw Error(L(200));
  return Ko(null, e, t, !0, n);
};
Je.hydrateRoot = function (e, t, n) {
  if (!Ga(e)) throw Error(L(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = mp;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = hp(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[zt] = t.current),
    il(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new Ho(t);
};
Je.render = function (e, t, n) {
  if (!Qo(t)) throw Error(L(200));
  return Ko(null, e, t, !1, n);
};
Je.unmountComponentAtNode = function (e) {
  if (!Qo(e)) throw Error(L(40));
  return e._reactRootContainer
    ? (Nn(function () {
        Ko(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[zt] = null);
        });
      }),
      !0)
    : !1;
};
Je.unstable_batchedUpdates = Va;
Je.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Qo(n)) throw Error(L(200));
  if (e == null || e._reactInternals === void 0) throw Error(L(38));
  return Ko(e, t, n, !1, r);
};
Je.version = "18.2.0-next-9e3b772b8-20220608";
function vp() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vp);
    } catch (e) {
      console.error(e);
    }
}
vp(), (hf.exports = Je);
var Yo = hf.exports;
const yp = nf(Yo),
  Vv = tf({ __proto__: null, default: yp }, [Yo]);
var Lc = Yo;
(ru.createRoot = Lc.createRoot), (ru.hydrateRoot = Lc.hydrateRoot);
var gp = { exports: {} },
  wp = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dr = E;
function Wv(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Hv = typeof Object.is == "function" ? Object.is : Wv,
  Qv = dr.useState,
  Kv = dr.useEffect,
  Yv = dr.useLayoutEffect,
  Xv = dr.useDebugValue;
function Gv(e, t) {
  var n = t(),
    r = Qv({ inst: { value: n, getSnapshot: t } }),
    l = r[0].inst,
    o = r[1];
  return (
    Yv(
      function () {
        (l.value = n), (l.getSnapshot = t), qi(l) && o({ inst: l });
      },
      [e, n, t],
    ),
    Kv(
      function () {
        return (
          qi(l) && o({ inst: l }),
          e(function () {
            qi(l) && o({ inst: l });
          })
        );
      },
      [e],
    ),
    Xv(n),
    n
  );
}
function qi(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Hv(e, n);
  } catch {
    return !0;
  }
}
function Jv(e, t) {
  return t();
}
var Zv =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? Jv
    : Gv;
wp.useSyncExternalStore =
  dr.useSyncExternalStore !== void 0 ? dr.useSyncExternalStore : Zv;
gp.exports = wp;
var qv = gp.exports,
  Sp = { exports: {} },
  xp = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xo = E,
  bv = qv;
function ey(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ty = typeof Object.is == "function" ? Object.is : ey,
  ny = bv.useSyncExternalStore,
  ry = Xo.useRef,
  ly = Xo.useEffect,
  oy = Xo.useMemo,
  iy = Xo.useDebugValue;
xp.useSyncExternalStoreWithSelector = function (e, t, n, r, l) {
  var o = ry(null);
  if (o.current === null) {
    var i = { hasValue: !1, value: null };
    o.current = i;
  } else i = o.current;
  o = oy(
    function () {
      function a(S) {
        if (!s) {
          if (((s = !0), (c = S), (S = r(S)), l !== void 0 && i.hasValue)) {
            var y = i.value;
            if (l(y, S)) return (m = y);
          }
          return (m = S);
        }
        if (((y = m), ty(c, S))) return y;
        var w = r(S);
        return l !== void 0 && l(y, w) ? y : ((c = S), (m = w));
      }
      var s = !1,
        c,
        m,
        h = n === void 0 ? null : n;
      return [
        function () {
          return a(t());
        },
        h === null
          ? void 0
          : function () {
              return a(h());
            },
      ];
    },
    [t, n, r, l],
  );
  var u = ny(e, o[0], o[1]);
  return (
    ly(
      function () {
        (i.hasValue = !0), (i.value = u);
      },
      [u],
    ),
    iy(u),
    u
  );
};
Sp.exports = xp;
var uy = Sp.exports;
function ay(e) {
  e();
}
let Ep = ay;
const sy = (e) => (Ep = e),
  cy = () => Ep,
  Nc = Symbol.for("react-redux-context"),
  jc = typeof globalThis < "u" ? globalThis : {};
function fy() {
  var e;
  if (!E.createContext) return {};
  const t = (e = jc[Nc]) != null ? e : (jc[Nc] = new Map());
  let n = t.get(E.createContext);
  return n || ((n = E.createContext(null)), t.set(E.createContext, n)), n;
}
const sn = fy();
function Ja(e = sn) {
  return function () {
    return E.useContext(e);
  };
}
const Cp = Ja(),
  dy = () => {
    throw new Error("uSES not initialized!");
  };
let kp = dy;
const py = (e) => {
    kp = e;
  },
  hy = (e, t) => e === t;
function my(e = sn) {
  const t = e === sn ? Cp : Ja(e);
  return function (r, l = {}) {
    const {
        equalityFn: o = hy,
        stabilityCheck: i = void 0,
        noopCheck: u = void 0,
      } = typeof l == "function" ? { equalityFn: l } : l,
      {
        store: a,
        subscription: s,
        getServerState: c,
        stabilityCheck: m,
        noopCheck: h,
      } = t();
    E.useRef(!0);
    const S = E.useCallback(
        {
          [r.name](w) {
            return r(w);
          },
        }[r.name],
        [r, m, i],
      ),
      y = kp(s.addNestedSub, a.getState, c || a.getState, S, o);
    return E.useDebugValue(y), y;
  };
}
const Za = my();
var Pp = { exports: {} },
  J = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ce = typeof Symbol == "function" && Symbol.for,
  qa = Ce ? Symbol.for("react.element") : 60103,
  ba = Ce ? Symbol.for("react.portal") : 60106,
  Go = Ce ? Symbol.for("react.fragment") : 60107,
  Jo = Ce ? Symbol.for("react.strict_mode") : 60108,
  Zo = Ce ? Symbol.for("react.profiler") : 60114,
  qo = Ce ? Symbol.for("react.provider") : 60109,
  bo = Ce ? Symbol.for("react.context") : 60110,
  es = Ce ? Symbol.for("react.async_mode") : 60111,
  ei = Ce ? Symbol.for("react.concurrent_mode") : 60111,
  ti = Ce ? Symbol.for("react.forward_ref") : 60112,
  ni = Ce ? Symbol.for("react.suspense") : 60113,
  vy = Ce ? Symbol.for("react.suspense_list") : 60120,
  ri = Ce ? Symbol.for("react.memo") : 60115,
  li = Ce ? Symbol.for("react.lazy") : 60116,
  yy = Ce ? Symbol.for("react.block") : 60121,
  gy = Ce ? Symbol.for("react.fundamental") : 60117,
  wy = Ce ? Symbol.for("react.responder") : 60118,
  Sy = Ce ? Symbol.for("react.scope") : 60119;
function qe(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case qa:
        switch (((e = e.type), e)) {
          case es:
          case ei:
          case Go:
          case Zo:
          case Jo:
          case ni:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case bo:
              case ti:
              case li:
              case ri:
              case qo:
                return e;
              default:
                return t;
            }
        }
      case ba:
        return t;
    }
  }
}
function Rp(e) {
  return qe(e) === ei;
}
J.AsyncMode = es;
J.ConcurrentMode = ei;
J.ContextConsumer = bo;
J.ContextProvider = qo;
J.Element = qa;
J.ForwardRef = ti;
J.Fragment = Go;
J.Lazy = li;
J.Memo = ri;
J.Portal = ba;
J.Profiler = Zo;
J.StrictMode = Jo;
J.Suspense = ni;
J.isAsyncMode = function (e) {
  return Rp(e) || qe(e) === es;
};
J.isConcurrentMode = Rp;
J.isContextConsumer = function (e) {
  return qe(e) === bo;
};
J.isContextProvider = function (e) {
  return qe(e) === qo;
};
J.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === qa;
};
J.isForwardRef = function (e) {
  return qe(e) === ti;
};
J.isFragment = function (e) {
  return qe(e) === Go;
};
J.isLazy = function (e) {
  return qe(e) === li;
};
J.isMemo = function (e) {
  return qe(e) === ri;
};
J.isPortal = function (e) {
  return qe(e) === ba;
};
J.isProfiler = function (e) {
  return qe(e) === Zo;
};
J.isStrictMode = function (e) {
  return qe(e) === Jo;
};
J.isSuspense = function (e) {
  return qe(e) === ni;
};
J.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Go ||
    e === ei ||
    e === Zo ||
    e === Jo ||
    e === ni ||
    e === vy ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === li ||
        e.$$typeof === ri ||
        e.$$typeof === qo ||
        e.$$typeof === bo ||
        e.$$typeof === ti ||
        e.$$typeof === gy ||
        e.$$typeof === wy ||
        e.$$typeof === Sy ||
        e.$$typeof === yy))
  );
};
J.typeOf = qe;
Pp.exports = J;
var xy = Pp.exports,
  _p = xy,
  Ey = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  Cy = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  Lp = {};
Lp[_p.ForwardRef] = Ey;
Lp[_p.Memo] = Cy;
var q = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ts = Symbol.for("react.element"),
  ns = Symbol.for("react.portal"),
  oi = Symbol.for("react.fragment"),
  ii = Symbol.for("react.strict_mode"),
  ui = Symbol.for("react.profiler"),
  ai = Symbol.for("react.provider"),
  si = Symbol.for("react.context"),
  ky = Symbol.for("react.server_context"),
  ci = Symbol.for("react.forward_ref"),
  fi = Symbol.for("react.suspense"),
  di = Symbol.for("react.suspense_list"),
  pi = Symbol.for("react.memo"),
  hi = Symbol.for("react.lazy"),
  Py = Symbol.for("react.offscreen"),
  Np;
Np = Symbol.for("react.module.reference");
function at(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ts:
        switch (((e = e.type), e)) {
          case oi:
          case ui:
          case ii:
          case fi:
          case di:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case ky:
              case si:
              case ci:
              case hi:
              case pi:
              case ai:
                return e;
              default:
                return t;
            }
        }
      case ns:
        return t;
    }
  }
}
q.ContextConsumer = si;
q.ContextProvider = ai;
q.Element = ts;
q.ForwardRef = ci;
q.Fragment = oi;
q.Lazy = hi;
q.Memo = pi;
q.Portal = ns;
q.Profiler = ui;
q.StrictMode = ii;
q.Suspense = fi;
q.SuspenseList = di;
q.isAsyncMode = function () {
  return !1;
};
q.isConcurrentMode = function () {
  return !1;
};
q.isContextConsumer = function (e) {
  return at(e) === si;
};
q.isContextProvider = function (e) {
  return at(e) === ai;
};
q.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === ts;
};
q.isForwardRef = function (e) {
  return at(e) === ci;
};
q.isFragment = function (e) {
  return at(e) === oi;
};
q.isLazy = function (e) {
  return at(e) === hi;
};
q.isMemo = function (e) {
  return at(e) === pi;
};
q.isPortal = function (e) {
  return at(e) === ns;
};
q.isProfiler = function (e) {
  return at(e) === ui;
};
q.isStrictMode = function (e) {
  return at(e) === ii;
};
q.isSuspense = function (e) {
  return at(e) === fi;
};
q.isSuspenseList = function (e) {
  return at(e) === di;
};
q.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === oi ||
    e === ui ||
    e === ii ||
    e === fi ||
    e === di ||
    e === Py ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === hi ||
        e.$$typeof === pi ||
        e.$$typeof === ai ||
        e.$$typeof === si ||
        e.$$typeof === ci ||
        e.$$typeof === Np ||
        e.getModuleId !== void 0))
  );
};
q.typeOf = at;
function Ry() {
  const e = cy();
  let t = null,
    n = null;
  return {
    clear() {
      (t = null), (n = null);
    },
    notify() {
      e(() => {
        let r = t;
        for (; r; ) r.callback(), (r = r.next);
      });
    },
    get() {
      let r = [],
        l = t;
      for (; l; ) r.push(l), (l = l.next);
      return r;
    },
    subscribe(r) {
      let l = !0,
        o = (n = { callback: r, next: null, prev: n });
      return (
        o.prev ? (o.prev.next = o) : (t = o),
        function () {
          !l ||
            t === null ||
            ((l = !1),
            o.next ? (o.next.prev = o.prev) : (n = o.prev),
            o.prev ? (o.prev.next = o.next) : (t = o.next));
        }
      );
    },
  };
}
const Tc = { notify() {}, get: () => [] };
function _y(e, t) {
  let n,
    r = Tc,
    l = 0,
    o = !1;
  function i(w) {
    c();
    const R = r.subscribe(w);
    let d = !1;
    return () => {
      d || ((d = !0), R(), m());
    };
  }
  function u() {
    r.notify();
  }
  function a() {
    y.onStateChange && y.onStateChange();
  }
  function s() {
    return o;
  }
  function c() {
    l++, n || ((n = t ? t.addNestedSub(a) : e.subscribe(a)), (r = Ry()));
  }
  function m() {
    l--, n && l === 0 && (n(), (n = void 0), r.clear(), (r = Tc));
  }
  function h() {
    o || ((o = !0), c());
  }
  function S() {
    o && ((o = !1), m());
  }
  const y = {
    addNestedSub: i,
    notifyNestedSubs: u,
    handleChangeWrapper: a,
    isSubscribed: s,
    trySubscribe: h,
    tryUnsubscribe: S,
    getListeners: () => r,
  };
  return y;
}
const Ly =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Ny = Ly ? E.useLayoutEffect : E.useEffect;
function jy({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: l = "once",
  noopCheck: o = "once",
}) {
  const i = E.useMemo(() => {
      const s = _y(e);
      return {
        store: e,
        subscription: s,
        getServerState: r ? () => r : void 0,
        stabilityCheck: l,
        noopCheck: o,
      };
    }, [e, r, l, o]),
    u = E.useMemo(() => e.getState(), [e]);
  Ny(() => {
    const { subscription: s } = i;
    return (
      (s.onStateChange = s.notifyNestedSubs),
      s.trySubscribe(),
      u !== e.getState() && s.notifyNestedSubs(),
      () => {
        s.tryUnsubscribe(), (s.onStateChange = void 0);
      }
    );
  }, [i, u]);
  const a = t || sn;
  return E.createElement(a.Provider, { value: i }, n);
}
function jp(e = sn) {
  const t = e === sn ? Cp : Ja(e);
  return function () {
    const { store: r } = t();
    return r;
  };
}
const Ty = jp();
function My(e = sn) {
  const t = e === sn ? Ty : jp(e);
  return function () {
    return t().dispatch;
  };
}
const yr = My();
py(uy.useSyncExternalStoreWithSelector);
sy(Yo.unstable_batchedUpdates);
/**
 * @remix-run/router v1.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function de() {
  return (
    (de = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    de.apply(this, arguments)
  );
}
var pe;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(pe || (pe = {}));
const Mc = "popstate";
function Oy(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: o, search: i, hash: u } = r.location;
    return ml(
      "",
      { pathname: o, search: i, hash: u },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : Tn(l);
  }
  return zy(t, n, null, e);
}
function V(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function jn(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Dy() {
  return Math.random().toString(36).substr(2, 8);
}
function Oc(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ml(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    de(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Ut(t) : t,
      { state: n, key: (t && t.key) || r || Dy() },
    )
  );
}
function Tn(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Ut(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function zy(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    u = pe.Pop,
    a = null,
    s = c();
  s == null && ((s = 0), i.replaceState(de({}, i.state, { idx: s }), ""));
  function c() {
    return (i.state || { idx: null }).idx;
  }
  function m() {
    u = pe.Pop;
    let R = c(),
      d = R == null ? null : R - s;
    (s = R), a && a({ action: u, location: w.location, delta: d });
  }
  function h(R, d) {
    u = pe.Push;
    let f = ml(w.location, R, d);
    n && n(f, R), (s = c() + 1);
    let v = Oc(f, s),
      p = w.createHref(f);
    try {
      i.pushState(v, "", p);
    } catch (_) {
      if (_ instanceof DOMException && _.name === "DataCloneError") throw _;
      l.location.assign(p);
    }
    o && a && a({ action: u, location: w.location, delta: 1 });
  }
  function S(R, d) {
    u = pe.Replace;
    let f = ml(w.location, R, d);
    n && n(f, R), (s = c());
    let v = Oc(f, s),
      p = w.createHref(f);
    i.replaceState(v, "", p),
      o && a && a({ action: u, location: w.location, delta: 0 });
  }
  function y(R) {
    let d = l.location.origin !== "null" ? l.location.origin : l.location.href,
      f = typeof R == "string" ? R : Tn(R);
    return (
      V(
        d,
        "No window.location.(origin|href) available to create URL for href: " +
          f,
      ),
      new URL(f, d)
    );
  }
  let w = {
    get action() {
      return u;
    },
    get location() {
      return e(l, i);
    },
    listen(R) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Mc, m),
        (a = R),
        () => {
          l.removeEventListener(Mc, m), (a = null);
        }
      );
    },
    createHref(R) {
      return t(l, R);
    },
    createURL: y,
    encodeLocation(R) {
      let d = y(R);
      return { pathname: d.pathname, search: d.search, hash: d.hash };
    },
    push: h,
    replace: S,
    go(R) {
      return i.go(R);
    },
  };
  return w;
}
var he;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(he || (he = {}));
const Fy = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function Iy(e) {
  return e.index === !0;
}
function Ju(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((l, o) => {
      let i = [...n, o],
        u = typeof l.id == "string" ? l.id : i.join("-");
      if (
        (V(
          l.index !== !0 || !l.children,
          "Cannot specify children on an index route",
        ),
        V(
          !r[u],
          'Found a route id collision on id "' +
            u +
            `".  Route id's must be globally unique within Data Router usages`,
        ),
        Iy(l))
      ) {
        let a = de({}, l, t(l), { id: u });
        return (r[u] = a), a;
      } else {
        let a = de({}, l, t(l), { id: u, children: void 0 });
        return (
          (r[u] = a), l.children && (a.children = Ju(l.children, t, i, r)), a
        );
      }
    })
  );
}
function Zn(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? Ut(t) : t,
    l = cn(r.pathname || "/", n);
  if (l == null) return null;
  let o = Tp(e);
  Uy(o);
  let i = null;
  for (let u = 0; i == null && u < o.length; ++u) i = Xy(o[u], Jy(l));
  return i;
}
function $y(e, t) {
  let { route: n, pathname: r, params: l } = e;
  return { id: n.id, pathname: r, params: l, data: t[n.id], handle: n.handle };
}
function Tp(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (o, i, u) => {
    let a = {
      relativePath: u === void 0 ? o.path || "" : u,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    a.relativePath.startsWith("/") &&
      (V(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let s = Ot([r, a.relativePath]),
      c = n.concat(a);
    o.children &&
      o.children.length > 0 &&
      (V(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + s + '".'),
      ),
      Tp(o.children, t, c, s)),
      !(o.path == null && !o.index) &&
        t.push({ path: s, score: Ky(s, o.index), routesMeta: c });
  };
  return (
    e.forEach((o, i) => {
      var u;
      if (o.path === "" || !((u = o.path) != null && u.includes("?"))) l(o, i);
      else for (let a of Mp(o.path)) l(o, i, a);
    }),
    t
  );
}
function Mp(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [o, ""] : [o];
  let i = Mp(r.join("/")),
    u = [];
  return (
    u.push(...i.map((a) => (a === "" ? o : [o, a].join("/")))),
    l && u.push(...i),
    u.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function Uy(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Yy(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const Ay = /^:\w+$/,
  By = 3,
  Vy = 2,
  Wy = 1,
  Hy = 10,
  Qy = -2,
  Dc = (e) => e === "*";
function Ky(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Dc) && (r += Qy),
    t && (r += Vy),
    n
      .filter((l) => !Dc(l))
      .reduce((l, o) => l + (Ay.test(o) ? By : o === "" ? Wy : Hy), r)
  );
}
function Yy(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Xy(e, t) {
  let { routesMeta: n } = e,
    r = {},
    l = "/",
    o = [];
  for (let i = 0; i < n.length; ++i) {
    let u = n[i],
      a = i === n.length - 1,
      s = l === "/" ? t : t.slice(l.length) || "/",
      c = Zu(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: a },
        s,
      );
    if (!c) return null;
    Object.assign(r, c.params);
    let m = u.route;
    o.push({
      params: r,
      pathname: Ot([l, c.pathname]),
      pathnameBase: eg(Ot([l, c.pathnameBase])),
      route: m,
    }),
      c.pathnameBase !== "/" && (l = Ot([l, c.pathnameBase]));
  }
  return o;
}
function Zu(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Gy(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let o = l[0],
    i = o.replace(/(.)\/+$/, "$1"),
    u = l.slice(1);
  return {
    params: r.reduce((s, c, m) => {
      let { paramName: h, isOptional: S } = c;
      if (h === "*") {
        let w = u[m] || "";
        i = o.slice(0, o.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const y = u[m];
      return S && !y ? (s[h] = void 0) : (s[h] = Zy(y || "", h)), s;
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function Gy(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    jn(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:(\w+)(\?)?/g,
          (i, u, a) => (
            r.push({ paramName: u, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function Jy(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      jn(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function Zy(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      jn(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ")."),
      ),
      e
    );
  }
}
function cn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function qy(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? Ut(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : by(n, t)) : t,
    search: tg(r),
    hash: ng(l),
  };
}
function by(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function bi(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Op(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function mi(e) {
  return Op(e).map((t, n) =>
    n === e.length - 1 ? t.pathname : t.pathnameBase,
  );
}
function vi(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = Ut(e))
    : ((l = de({}, e)),
      V(
        !l.pathname || !l.pathname.includes("?"),
        bi("?", "pathname", "search", l),
      ),
      V(
        !l.pathname || !l.pathname.includes("#"),
        bi("#", "pathname", "hash", l),
      ),
      V(!l.search || !l.search.includes("#"), bi("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    i = o ? "/" : l.pathname,
    u;
  if (i == null) u = n;
  else if (r) {
    let m = t[t.length - 1].replace(/^\//, "").split("/");
    if (i.startsWith("..")) {
      let h = i.split("/");
      for (; h[0] === ".."; ) h.shift(), m.pop();
      l.pathname = h.join("/");
    }
    u = "/" + m.join("/");
  } else {
    let m = t.length - 1;
    if (i.startsWith("..")) {
      let h = i.split("/");
      for (; h[0] === ".."; ) h.shift(), (m -= 1);
      l.pathname = h.join("/");
    }
    u = m >= 0 ? t[m] : "/";
  }
  let a = qy(l, u),
    s = i && i !== "/" && i.endsWith("/"),
    c = (o || i === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (s || c) && (a.pathname += "/"), a;
}
const Ot = (e) => e.join("/").replace(/\/\/+/g, "/"),
  eg = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  tg = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  ng = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class rs {
  constructor(t, n, r, l) {
    l === void 0 && (l = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = l),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function Dp(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const zp = ["post", "put", "patch", "delete"],
  rg = new Set(zp),
  lg = ["get", ...zp],
  og = new Set(lg),
  ig = new Set([301, 302, 303, 307, 308]),
  ug = new Set([307, 308]),
  eu = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  ag = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Mr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Fp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  sg = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  Ip = "remix-router-transitions";
function cg(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  V(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter",
  );
  let l;
  if (e.mapRouteProperties) l = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let g = e.detectErrorBoundary;
    l = (x) => ({ hasErrorBoundary: g(x) });
  } else l = sg;
  let o = {},
    i = Ju(e.routes, l, void 0, o),
    u,
    a = e.basename || "/",
    s = de(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_prependBasename: !1,
      },
      e.future,
    ),
    c = null,
    m = new Set(),
    h = null,
    S = null,
    y = null,
    w = e.hydrationData != null,
    R = Zn(i, e.history.location, a),
    d = null;
  if (R == null) {
    let g = tt(404, { pathname: e.history.location.pathname }),
      { matches: x, route: C } = Vc(i);
    (R = x), (d = { [C.id]: g });
  }
  let f =
      !R.some((g) => g.route.lazy) &&
      (!R.some((g) => g.route.loader) || e.hydrationData != null),
    v,
    p = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: R,
      initialized: f,
      navigation: eu,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || d,
      fetchers: new Map(),
      blockers: new Map(),
    },
    _ = pe.Pop,
    N = !1,
    k,
    T = !1,
    I = new Map(),
    $ = null,
    X = !1,
    ke = !1,
    Se = [],
    kt = [],
    ce = new Map(),
    Bt = 0,
    Pt = -1,
    M = new Map(),
    F = new Set(),
    B = new Map(),
    b = new Map(),
    Z = new Set(),
    be = new Map(),
    De = new Map(),
    hn = !1;
  function Rt() {
    if (
      ((c = e.history.listen((g) => {
        let { action: x, location: C, delta: j } = g;
        if (hn) {
          hn = !1;
          return;
        }
        jn(
          De.size === 0 || j != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let D = vs({
          currentLocation: p.location,
          nextLocation: C,
          historyAction: x,
        });
        if (D && j != null) {
          (hn = !0),
            e.history.go(j * -1),
            kl(D, {
              state: "blocked",
              location: C,
              proceed() {
                kl(D, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: C,
                }),
                  e.history.go(j);
              },
              reset() {
                let W = new Map(p.blockers);
                W.set(D, Mr), Qe({ blockers: W });
              },
            });
          return;
        }
        return mn(x, C);
      })),
      n)
    ) {
      xg(t, I);
      let g = () => Eg(t, I);
      t.addEventListener("pagehide", g),
        ($ = () => t.removeEventListener("pagehide", g));
    }
    return p.initialized || mn(pe.Pop, p.location), v;
  }
  function zn() {
    c && c(),
      $ && $(),
      m.clear(),
      k && k.abort(),
      p.fetchers.forEach((g, x) => Cl(x)),
      p.blockers.forEach((g, x) => ms(x));
  }
  function lh(g) {
    return m.add(g), () => m.delete(g);
  }
  function Qe(g, x) {
    x === void 0 && (x = {}), (p = de({}, p, g));
    let C = [],
      j = [];
    s.v7_fetcherPersist &&
      p.fetchers.forEach((D, W) => {
        D.state === "idle" && (Z.has(W) ? j.push(W) : C.push(W));
      }),
      [...m].forEach((D) =>
        D(p, {
          deletedFetchers: j,
          unstable_viewTransitionOpts: x.viewTransitionOpts,
          unstable_flushSync: x.flushSync === !0,
        }),
      ),
      s.v7_fetcherPersist &&
        (C.forEach((D) => p.fetchers.delete(D)), j.forEach((D) => Cl(D)));
  }
  function Sr(g, x, C) {
    var j, D;
    let { flushSync: W } = C === void 0 ? {} : C,
      A =
        p.actionData != null &&
        p.navigation.formMethod != null &&
        pt(p.navigation.formMethod) &&
        p.navigation.state === "loading" &&
        ((j = g.state) == null ? void 0 : j._isRedirect) !== !0,
      U;
    x.actionData
      ? Object.keys(x.actionData).length > 0
        ? (U = x.actionData)
        : (U = null)
      : A
        ? (U = p.actionData)
        : (U = null);
    let z = x.loaderData
        ? Bc(p.loaderData, x.loaderData, x.matches || [], x.errors)
        : p.loaderData,
      K = p.blockers;
    K.size > 0 && ((K = new Map(K)), K.forEach((ee, ie) => K.set(ie, Mr)));
    let Pe =
      N === !0 ||
      (p.navigation.formMethod != null &&
        pt(p.navigation.formMethod) &&
        ((D = g.state) == null ? void 0 : D._isRedirect) !== !0);
    u && ((i = u), (u = void 0)),
      X ||
        _ === pe.Pop ||
        (_ === pe.Push
          ? e.history.push(g, g.state)
          : _ === pe.Replace && e.history.replace(g, g.state));
    let H;
    if (_ === pe.Pop) {
      let ee = I.get(p.location.pathname);
      ee && ee.has(g.pathname)
        ? (H = { currentLocation: p.location, nextLocation: g })
        : I.has(g.pathname) &&
          (H = { currentLocation: g, nextLocation: p.location });
    } else if (T) {
      let ee = I.get(p.location.pathname);
      ee
        ? ee.add(g.pathname)
        : ((ee = new Set([g.pathname])), I.set(p.location.pathname, ee)),
        (H = { currentLocation: p.location, nextLocation: g });
    }
    Qe(
      de({}, x, {
        actionData: U,
        loaderData: z,
        historyAction: _,
        location: g,
        initialized: !0,
        navigation: eu,
        revalidation: "idle",
        restoreScrollPosition: gs(g, x.matches || p.matches),
        preventScrollReset: Pe,
        blockers: K,
      }),
      { viewTransitionOpts: H, flushSync: W === !0 },
    ),
      (_ = pe.Pop),
      (N = !1),
      (T = !1),
      (X = !1),
      (ke = !1),
      (Se = []),
      (kt = []);
  }
  async function ss(g, x) {
    if (typeof g == "number") {
      e.history.go(g);
      return;
    }
    let C = qu(
        p.location,
        p.matches,
        a,
        s.v7_prependBasename,
        g,
        x == null ? void 0 : x.fromRouteId,
        x == null ? void 0 : x.relative,
      ),
      {
        path: j,
        submission: D,
        error: W,
      } = zc(s.v7_normalizeFormMethod, !1, C, x),
      A = p.location,
      U = ml(p.location, j, x && x.state);
    U = de({}, U, e.history.encodeLocation(U));
    let z = x && x.replace != null ? x.replace : void 0,
      K = pe.Push;
    z === !0
      ? (K = pe.Replace)
      : z === !1 ||
        (D != null &&
          pt(D.formMethod) &&
          D.formAction === p.location.pathname + p.location.search &&
          (K = pe.Replace));
    let Pe =
        x && "preventScrollReset" in x ? x.preventScrollReset === !0 : void 0,
      H = (x && x.unstable_flushSync) === !0,
      ee = vs({ currentLocation: A, nextLocation: U, historyAction: K });
    if (ee) {
      kl(ee, {
        state: "blocked",
        location: U,
        proceed() {
          kl(ee, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: U,
          }),
            ss(g, x);
        },
        reset() {
          let ie = new Map(p.blockers);
          ie.set(ee, Mr), Qe({ blockers: ie });
        },
      });
      return;
    }
    return await mn(K, U, {
      submission: D,
      pendingError: W,
      preventScrollReset: Pe,
      replace: x && x.replace,
      enableViewTransition: x && x.unstable_viewTransition,
      flushSync: H,
    });
  }
  function oh() {
    if (
      (Si(),
      Qe({ revalidation: "loading" }),
      p.navigation.state !== "submitting")
    ) {
      if (p.navigation.state === "idle") {
        mn(p.historyAction, p.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      mn(_ || p.historyAction, p.navigation.location, {
        overrideNavigation: p.navigation,
      });
    }
  }
  async function mn(g, x, C) {
    k && k.abort(),
      (k = null),
      (_ = g),
      (X = (C && C.startUninterruptedRevalidation) === !0),
      hh(p.location, p.matches),
      (N = (C && C.preventScrollReset) === !0),
      (T = (C && C.enableViewTransition) === !0);
    let j = u || i,
      D = C && C.overrideNavigation,
      W = Zn(j, x, a),
      A = (C && C.flushSync) === !0;
    if (!W) {
      let ie = tt(404, { pathname: x.pathname }),
        { matches: ze, route: gt } = Vc(j);
      xi(),
        Sr(
          x,
          { matches: ze, loaderData: {}, errors: { [gt.id]: ie } },
          { flushSync: A },
        );
      return;
    }
    if (
      p.initialized &&
      !ke &&
      mg(p.location, x) &&
      !(C && C.submission && pt(C.submission.formMethod))
    ) {
      Sr(x, { matches: W }, { flushSync: A });
      return;
    }
    k = new AbortController();
    let U = Dr(e.history, x, k.signal, C && C.submission),
      z,
      K;
    if (C && C.pendingError) K = { [Jr(W).route.id]: C.pendingError };
    else if (C && C.submission && pt(C.submission.formMethod)) {
      let ie = await ih(U, x, C.submission, W, {
        replace: C.replace,
        flushSync: A,
      });
      if (ie.shortCircuited) return;
      (z = ie.pendingActionData),
        (K = ie.pendingActionError),
        (D = tu(x, C.submission)),
        (A = !1),
        (U = new Request(U.url, { signal: U.signal }));
    }
    let {
      shortCircuited: Pe,
      loaderData: H,
      errors: ee,
    } = await uh(
      U,
      x,
      W,
      D,
      C && C.submission,
      C && C.fetcherSubmission,
      C && C.replace,
      A,
      z,
      K,
    );
    Pe ||
      ((k = null),
      Sr(
        x,
        de({ matches: W }, z ? { actionData: z } : {}, {
          loaderData: H,
          errors: ee,
        }),
      ));
  }
  async function ih(g, x, C, j, D) {
    D === void 0 && (D = {}), Si();
    let W = wg(x, C);
    Qe({ navigation: W }, { flushSync: D.flushSync === !0 });
    let A,
      U = ea(j, x);
    if (!U.route.action && !U.route.lazy)
      A = {
        type: he.error,
        error: tt(405, {
          method: g.method,
          pathname: x.pathname,
          routeId: U.route.id,
        }),
      };
    else if (((A = await Or("action", g, U, j, o, l, a)), g.signal.aborted))
      return { shortCircuited: !0 };
    if (lr(A)) {
      let z;
      return (
        D && D.replace != null
          ? (z = D.replace)
          : (z = A.location === p.location.pathname + p.location.search),
        await xr(p, A, { submission: C, replace: z }),
        { shortCircuited: !0 }
      );
    }
    if (Zr(A)) {
      let z = Jr(j, U.route.id);
      return (
        (D && D.replace) !== !0 && (_ = pe.Push),
        { pendingActionData: {}, pendingActionError: { [z.route.id]: A.error } }
      );
    }
    if (En(A)) throw tt(400, { type: "defer-action" });
    return { pendingActionData: { [U.route.id]: A.data } };
  }
  async function uh(g, x, C, j, D, W, A, U, z, K) {
    let Pe = j || tu(x, D),
      H = D || W || Qc(Pe),
      ee = u || i,
      [ie, ze] = Fc(e.history, p, C, H, x, ke, Se, kt, Z, B, F, ee, a, z, K);
    if (
      (xi(
        (te) =>
          !(C && C.some((et) => et.route.id === te)) ||
          (ie && ie.some((et) => et.route.id === te)),
      ),
      (Pt = ++Bt),
      ie.length === 0 && ze.length === 0)
    ) {
      let te = ps();
      return (
        Sr(
          x,
          de(
            { matches: C, loaderData: {}, errors: K || null },
            z ? { actionData: z } : {},
            te ? { fetchers: new Map(p.fetchers) } : {},
          ),
          { flushSync: U },
        ),
        { shortCircuited: !0 }
      );
    }
    if (!X) {
      ze.forEach((et) => {
        let ve = p.fetchers.get(et.key),
          vn = zr(void 0, ve ? ve.data : void 0);
        p.fetchers.set(et.key, vn);
      });
      let te = z || p.actionData;
      Qe(
        de(
          { navigation: Pe },
          te
            ? Object.keys(te).length === 0
              ? { actionData: null }
              : { actionData: te }
            : {},
          ze.length > 0 ? { fetchers: new Map(p.fetchers) } : {},
        ),
        { flushSync: U },
      );
    }
    ze.forEach((te) => {
      ce.has(te.key) && Wt(te.key),
        te.controller && ce.set(te.key, te.controller);
    });
    let gt = () => ze.forEach((te) => Wt(te.key));
    k && k.signal.addEventListener("abort", gt);
    let {
      results: Cr,
      loaderResults: Ei,
      fetcherResults: Fn,
    } = await cs(p.matches, C, ie, ze, g);
    if (g.signal.aborted) return { shortCircuited: !0 };
    k && k.signal.removeEventListener("abort", gt),
      ze.forEach((te) => ce.delete(te.key));
    let st = Wc(Cr);
    if (st) {
      if (st.idx >= ie.length) {
        let te = ze[st.idx - ie.length].key;
        F.add(te);
      }
      return await xr(p, st.result, { replace: A }), { shortCircuited: !0 };
    }
    let { loaderData: Pl, errors: Ci } = Ac(p, C, ie, Ei, K, ze, Fn, be);
    be.forEach((te, et) => {
      te.subscribe((ve) => {
        (ve || te.done) && be.delete(et);
      });
    });
    let ki = ps(),
      Pi = hs(Pt),
      In = ki || Pi || ze.length > 0;
    return de(
      { loaderData: Pl, errors: Ci },
      In ? { fetchers: new Map(p.fetchers) } : {},
    );
  }
  function ah(g, x, C, j) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.",
      );
    ce.has(g) && Wt(g);
    let D = (j && j.unstable_flushSync) === !0,
      W = u || i,
      A = qu(
        p.location,
        p.matches,
        a,
        s.v7_prependBasename,
        C,
        x,
        j == null ? void 0 : j.relative,
      ),
      U = Zn(W, A, a);
    if (!U) {
      Er(g, x, tt(404, { pathname: A }), { flushSync: D });
      return;
    }
    let {
      path: z,
      submission: K,
      error: Pe,
    } = zc(s.v7_normalizeFormMethod, !0, A, j);
    if (Pe) {
      Er(g, x, Pe, { flushSync: D });
      return;
    }
    let H = ea(U, z);
    if (((N = (j && j.preventScrollReset) === !0), K && pt(K.formMethod))) {
      sh(g, x, z, H, U, D, K);
      return;
    }
    B.set(g, { routeId: x, path: z }), ch(g, x, z, H, U, D, K);
  }
  async function sh(g, x, C, j, D, W, A) {
    if ((Si(), B.delete(g), !j.route.action && !j.route.lazy)) {
      let ve = tt(405, { method: A.formMethod, pathname: C, routeId: x });
      Er(g, x, ve, { flushSync: W });
      return;
    }
    let U = p.fetchers.get(g);
    Vt(g, Sg(A, U), { flushSync: W });
    let z = new AbortController(),
      K = Dr(e.history, C, z.signal, A);
    ce.set(g, z);
    let Pe = Bt,
      H = await Or("action", K, j, D, o, l, a);
    if (K.signal.aborted) {
      ce.get(g) === z && ce.delete(g);
      return;
    }
    if (Z.has(g)) {
      Vt(g, Qt(void 0));
      return;
    }
    if (lr(H))
      if ((ce.delete(g), Pt > Pe)) {
        Vt(g, Qt(void 0));
        return;
      } else return F.add(g), Vt(g, zr(A)), xr(p, H, { fetcherSubmission: A });
    if (Zr(H)) {
      Er(g, x, H.error);
      return;
    }
    if (En(H)) throw tt(400, { type: "defer-action" });
    let ee = p.navigation.location || p.location,
      ie = Dr(e.history, ee, z.signal),
      ze = u || i,
      gt =
        p.navigation.state !== "idle"
          ? Zn(ze, p.navigation.location, a)
          : p.matches;
    V(gt, "Didn't find any matches after fetcher action");
    let Cr = ++Bt;
    M.set(g, Cr);
    let Ei = zr(A, H.data);
    p.fetchers.set(g, Ei);
    let [Fn, st] = Fc(
      e.history,
      p,
      gt,
      A,
      ee,
      ke,
      Se,
      kt,
      Z,
      B,
      F,
      ze,
      a,
      { [j.route.id]: H.data },
      void 0,
    );
    st
      .filter((ve) => ve.key !== g)
      .forEach((ve) => {
        let vn = ve.key,
          ws = p.fetchers.get(vn),
          vh = zr(void 0, ws ? ws.data : void 0);
        p.fetchers.set(vn, vh),
          ce.has(vn) && Wt(vn),
          ve.controller && ce.set(vn, ve.controller);
      }),
      Qe({ fetchers: new Map(p.fetchers) });
    let Pl = () => st.forEach((ve) => Wt(ve.key));
    z.signal.addEventListener("abort", Pl);
    let {
      results: Ci,
      loaderResults: ki,
      fetcherResults: Pi,
    } = await cs(p.matches, gt, Fn, st, ie);
    if (z.signal.aborted) return;
    z.signal.removeEventListener("abort", Pl),
      M.delete(g),
      ce.delete(g),
      st.forEach((ve) => ce.delete(ve.key));
    let In = Wc(Ci);
    if (In) {
      if (In.idx >= Fn.length) {
        let ve = st[In.idx - Fn.length].key;
        F.add(ve);
      }
      return xr(p, In.result);
    }
    let { loaderData: te, errors: et } = Ac(
      p,
      p.matches,
      Fn,
      ki,
      void 0,
      st,
      Pi,
      be,
    );
    if (p.fetchers.has(g)) {
      let ve = Qt(H.data);
      p.fetchers.set(g, ve);
    }
    hs(Cr),
      p.navigation.state === "loading" && Cr > Pt
        ? (V(_, "Expected pending action"),
          k && k.abort(),
          Sr(p.navigation.location, {
            matches: gt,
            loaderData: te,
            errors: et,
            fetchers: new Map(p.fetchers),
          }))
        : (Qe({
            errors: et,
            loaderData: Bc(p.loaderData, te, gt, et),
            fetchers: new Map(p.fetchers),
          }),
          (ke = !1));
  }
  async function ch(g, x, C, j, D, W, A) {
    let U = p.fetchers.get(g);
    Vt(g, zr(A, U ? U.data : void 0), { flushSync: W });
    let z = new AbortController(),
      K = Dr(e.history, C, z.signal);
    ce.set(g, z);
    let Pe = Bt,
      H = await Or("loader", K, j, D, o, l, a);
    if (
      (En(H) && (H = (await Ap(H, K.signal, !0)) || H),
      ce.get(g) === z && ce.delete(g),
      !K.signal.aborted)
    ) {
      if (Z.has(g)) {
        Vt(g, Qt(void 0));
        return;
      }
      if (lr(H))
        if (Pt > Pe) {
          Vt(g, Qt(void 0));
          return;
        } else {
          F.add(g), await xr(p, H);
          return;
        }
      if (Zr(H)) {
        Er(g, x, H.error);
        return;
      }
      V(!En(H), "Unhandled fetcher deferred data"), Vt(g, Qt(H.data));
    }
  }
  async function xr(g, x, C) {
    let {
      submission: j,
      fetcherSubmission: D,
      replace: W,
    } = C === void 0 ? {} : C;
    x.revalidate && (ke = !0);
    let A = ml(g.location, x.location, { _isRedirect: !0 });
    if ((V(A, "Expected a location on the redirect navigation"), n)) {
      let ee = !1;
      if (x.reloadDocument) ee = !0;
      else if (Fp.test(x.location)) {
        const ie = e.history.createURL(x.location);
        ee = ie.origin !== t.location.origin || cn(ie.pathname, a) == null;
      }
      if (ee) {
        W ? t.location.replace(x.location) : t.location.assign(x.location);
        return;
      }
    }
    k = null;
    let U = W === !0 ? pe.Replace : pe.Push,
      { formMethod: z, formAction: K, formEncType: Pe } = g.navigation;
    !j && !D && z && K && Pe && (j = Qc(g.navigation));
    let H = j || D;
    if (ug.has(x.status) && H && pt(H.formMethod))
      await mn(U, A, {
        submission: de({}, H, { formAction: x.location }),
        preventScrollReset: N,
      });
    else {
      let ee = tu(A, j);
      await mn(U, A, {
        overrideNavigation: ee,
        fetcherSubmission: D,
        preventScrollReset: N,
      });
    }
  }
  async function cs(g, x, C, j, D) {
    let W = await Promise.all([
        ...C.map((z) => Or("loader", D, z, x, o, l, a)),
        ...j.map((z) =>
          z.matches && z.match && z.controller
            ? Or(
                "loader",
                Dr(e.history, z.path, z.controller.signal),
                z.match,
                z.matches,
                o,
                l,
                a,
              )
            : { type: he.error, error: tt(404, { pathname: z.path }) },
        ),
      ]),
      A = W.slice(0, C.length),
      U = W.slice(C.length);
    return (
      await Promise.all([
        Hc(
          g,
          C,
          A,
          A.map(() => D.signal),
          !1,
          p.loaderData,
        ),
        Hc(
          g,
          j.map((z) => z.match),
          U,
          j.map((z) => (z.controller ? z.controller.signal : null)),
          !0,
        ),
      ]),
      { results: W, loaderResults: A, fetcherResults: U }
    );
  }
  function Si() {
    (ke = !0),
      Se.push(...xi()),
      B.forEach((g, x) => {
        ce.has(x) && (kt.push(x), Wt(x));
      });
  }
  function Vt(g, x, C) {
    C === void 0 && (C = {}),
      p.fetchers.set(g, x),
      Qe(
        { fetchers: new Map(p.fetchers) },
        { flushSync: (C && C.flushSync) === !0 },
      );
  }
  function Er(g, x, C, j) {
    j === void 0 && (j = {});
    let D = Jr(p.matches, x);
    Cl(g),
      Qe(
        { errors: { [D.route.id]: C }, fetchers: new Map(p.fetchers) },
        { flushSync: (j && j.flushSync) === !0 },
      );
  }
  function fs(g) {
    return (
      s.v7_fetcherPersist &&
        (b.set(g, (b.get(g) || 0) + 1), Z.has(g) && Z.delete(g)),
      p.fetchers.get(g) || ag
    );
  }
  function Cl(g) {
    let x = p.fetchers.get(g);
    ce.has(g) && !(x && x.state === "loading" && M.has(g)) && Wt(g),
      B.delete(g),
      M.delete(g),
      F.delete(g),
      Z.delete(g),
      p.fetchers.delete(g);
  }
  function fh(g) {
    if (s.v7_fetcherPersist) {
      let x = (b.get(g) || 0) - 1;
      x <= 0 ? (b.delete(g), Z.add(g)) : b.set(g, x);
    } else Cl(g);
    Qe({ fetchers: new Map(p.fetchers) });
  }
  function Wt(g) {
    let x = ce.get(g);
    V(x, "Expected fetch controller: " + g), x.abort(), ce.delete(g);
  }
  function ds(g) {
    for (let x of g) {
      let C = fs(x),
        j = Qt(C.data);
      p.fetchers.set(x, j);
    }
  }
  function ps() {
    let g = [],
      x = !1;
    for (let C of F) {
      let j = p.fetchers.get(C);
      V(j, "Expected fetcher: " + C),
        j.state === "loading" && (F.delete(C), g.push(C), (x = !0));
    }
    return ds(g), x;
  }
  function hs(g) {
    let x = [];
    for (let [C, j] of M)
      if (j < g) {
        let D = p.fetchers.get(C);
        V(D, "Expected fetcher: " + C),
          D.state === "loading" && (Wt(C), M.delete(C), x.push(C));
      }
    return ds(x), x.length > 0;
  }
  function dh(g, x) {
    let C = p.blockers.get(g) || Mr;
    return De.get(g) !== x && De.set(g, x), C;
  }
  function ms(g) {
    p.blockers.delete(g), De.delete(g);
  }
  function kl(g, x) {
    let C = p.blockers.get(g) || Mr;
    V(
      (C.state === "unblocked" && x.state === "blocked") ||
        (C.state === "blocked" && x.state === "blocked") ||
        (C.state === "blocked" && x.state === "proceeding") ||
        (C.state === "blocked" && x.state === "unblocked") ||
        (C.state === "proceeding" && x.state === "unblocked"),
      "Invalid blocker state transition: " + C.state + " -> " + x.state,
    );
    let j = new Map(p.blockers);
    j.set(g, x), Qe({ blockers: j });
  }
  function vs(g) {
    let { currentLocation: x, nextLocation: C, historyAction: j } = g;
    if (De.size === 0) return;
    De.size > 1 && jn(!1, "A router only supports one blocker at a time");
    let D = Array.from(De.entries()),
      [W, A] = D[D.length - 1],
      U = p.blockers.get(W);
    if (
      !(U && U.state === "proceeding") &&
      A({ currentLocation: x, nextLocation: C, historyAction: j })
    )
      return W;
  }
  function xi(g) {
    let x = [];
    return (
      be.forEach((C, j) => {
        (!g || g(j)) && (C.cancel(), x.push(j), be.delete(j));
      }),
      x
    );
  }
  function ph(g, x, C) {
    if (((h = g), (y = x), (S = C || null), !w && p.navigation === eu)) {
      w = !0;
      let j = gs(p.location, p.matches);
      j != null && Qe({ restoreScrollPosition: j });
    }
    return () => {
      (h = null), (y = null), (S = null);
    };
  }
  function ys(g, x) {
    return (
      (S &&
        S(
          g,
          x.map((j) => $y(j, p.loaderData)),
        )) ||
      g.key
    );
  }
  function hh(g, x) {
    if (h && y) {
      let C = ys(g, x);
      h[C] = y();
    }
  }
  function gs(g, x) {
    if (h) {
      let C = ys(g, x),
        j = h[C];
      if (typeof j == "number") return j;
    }
    return null;
  }
  function mh(g) {
    (o = {}), (u = Ju(g, l, void 0, o));
  }
  return (
    (v = {
      get basename() {
        return a;
      },
      get state() {
        return p;
      },
      get routes() {
        return i;
      },
      get window() {
        return t;
      },
      initialize: Rt,
      subscribe: lh,
      enableScrollRestoration: ph,
      navigate: ss,
      fetch: ah,
      revalidate: oh,
      createHref: (g) => e.history.createHref(g),
      encodeLocation: (g) => e.history.encodeLocation(g),
      getFetcher: fs,
      deleteFetcher: fh,
      dispose: zn,
      getBlocker: dh,
      deleteBlocker: ms,
      _internalFetchControllers: ce,
      _internalActiveDeferreds: be,
      _internalSetRoutes: mh,
    }),
    v
  );
}
function fg(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function qu(e, t, n, r, l, o, i) {
  let u, a;
  if (o) {
    u = [];
    for (let c of t)
      if ((u.push(c), c.route.id === o)) {
        a = c;
        break;
      }
  } else (u = t), (a = t[t.length - 1]);
  let s = vi(l || ".", mi(u), cn(e.pathname, n) || e.pathname, i === "path");
  return (
    l == null && ((s.search = e.search), (s.hash = e.hash)),
    (l == null || l === "" || l === ".") &&
      a &&
      a.route.index &&
      !ls(s.search) &&
      (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"),
    r &&
      n !== "/" &&
      (s.pathname = s.pathname === "/" ? n : Ot([n, s.pathname])),
    Tn(s)
  );
}
function zc(e, t, n, r) {
  if (!r || !fg(r)) return { path: n };
  if (r.formMethod && !gg(r.formMethod))
    return { path: n, error: tt(405, { method: r.formMethod }) };
  let l = () => ({ path: n, error: tt(400, { type: "invalid-body" }) }),
    o = r.formMethod || "get",
    i = e ? o.toUpperCase() : o.toLowerCase(),
    u = Up(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!pt(i)) return l();
      let h =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce((S, y) => {
                let [w, R] = y;
                return (
                  "" +
                  S +
                  w +
                  "=" +
                  R +
                  `
`
                );
              }, "")
            : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: i,
          formAction: u,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: h,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!pt(i)) return l();
      try {
        let h = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: i,
            formAction: u,
            formEncType: r.formEncType,
            formData: void 0,
            json: h,
            text: void 0,
          },
        };
      } catch {
        return l();
      }
    }
  }
  V(
    typeof FormData == "function",
    "FormData is not available in this environment",
  );
  let a, s;
  if (r.formData) (a = bu(r.formData)), (s = r.formData);
  else if (r.body instanceof FormData) (a = bu(r.body)), (s = r.body);
  else if (r.body instanceof URLSearchParams) (a = r.body), (s = Uc(a));
  else if (r.body == null) (a = new URLSearchParams()), (s = new FormData());
  else
    try {
      (a = new URLSearchParams(r.body)), (s = Uc(a));
    } catch {
      return l();
    }
  let c = {
    formMethod: i,
    formAction: u,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (pt(c.formMethod)) return { path: n, submission: c };
  let m = Ut(n);
  return (
    t && m.search && ls(m.search) && a.append("index", ""),
    (m.search = "?" + a),
    { path: Tn(m), submission: c }
  );
}
function dg(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((l) => l.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function Fc(e, t, n, r, l, o, i, u, a, s, c, m, h, S, y) {
  let w = y ? Object.values(y)[0] : S ? Object.values(S)[0] : void 0,
    R = e.createURL(t.location),
    d = e.createURL(l),
    f = y ? Object.keys(y)[0] : void 0,
    p = dg(n, f).filter((N, k) => {
      if (N.route.lazy) return !0;
      if (N.route.loader == null) return !1;
      if (pg(t.loaderData, t.matches[k], N) || i.some(($) => $ === N.route.id))
        return !0;
      let T = t.matches[k],
        I = N;
      return Ic(
        N,
        de(
          {
            currentUrl: R,
            currentParams: T.params,
            nextUrl: d,
            nextParams: I.params,
          },
          r,
          {
            actionResult: w,
            defaultShouldRevalidate:
              o ||
              R.pathname + R.search === d.pathname + d.search ||
              R.search !== d.search ||
              $p(T, I),
          },
        ),
      );
    }),
    _ = [];
  return (
    s.forEach((N, k) => {
      if (!n.some((ke) => ke.route.id === N.routeId) || a.has(k)) return;
      let T = Zn(m, N.path, h);
      if (!T) {
        _.push({
          key: k,
          routeId: N.routeId,
          path: N.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let I = t.fetchers.get(k),
        $ = ea(T, N.path),
        X = !1;
      c.has(k)
        ? (X = !1)
        : u.includes(k)
          ? (X = !0)
          : I && I.state !== "idle" && I.data === void 0
            ? (X = o)
            : (X = Ic(
                $,
                de(
                  {
                    currentUrl: R,
                    currentParams: t.matches[t.matches.length - 1].params,
                    nextUrl: d,
                    nextParams: n[n.length - 1].params,
                  },
                  r,
                  { actionResult: w, defaultShouldRevalidate: o },
                ),
              )),
        X &&
          _.push({
            key: k,
            routeId: N.routeId,
            path: N.path,
            matches: T,
            match: $,
            controller: new AbortController(),
          });
    }),
    [p, _]
  );
}
function pg(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    l = e[n.route.id] === void 0;
  return r || l;
}
function $p(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function Ic(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
async function $c(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let l = n[e.id];
  V(l, "No route found in manifest");
  let o = {};
  for (let i in r) {
    let a = l[i] !== void 0 && i !== "hasErrorBoundary";
    jn(
      !a,
      'Route "' +
        l.id +
        '" has a static property "' +
        i +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + i + '" will be ignored.'),
    ),
      !a && !Fy.has(i) && (o[i] = r[i]);
  }
  Object.assign(l, o), Object.assign(l, de({}, t(l), { lazy: void 0 }));
}
async function Or(e, t, n, r, l, o, i, u) {
  u === void 0 && (u = {});
  let a,
    s,
    c,
    m = (y) => {
      let w,
        R = new Promise((d, f) => (w = f));
      return (
        (c = () => w()),
        t.signal.addEventListener("abort", c),
        Promise.race([
          y({ request: t, params: n.params, context: u.requestContext }),
          R,
        ])
      );
    };
  try {
    let y = n.route[e];
    if (n.route.lazy)
      if (y) {
        let w,
          R = await Promise.all([
            m(y).catch((d) => {
              w = d;
            }),
            $c(n.route, o, l),
          ]);
        if (w) throw w;
        s = R[0];
      } else if ((await $c(n.route, o, l), (y = n.route[e]), y)) s = await m(y);
      else if (e === "action") {
        let w = new URL(t.url),
          R = w.pathname + w.search;
        throw tt(405, { method: t.method, pathname: R, routeId: n.route.id });
      } else return { type: he.data, data: void 0 };
    else if (y) s = await m(y);
    else {
      let w = new URL(t.url),
        R = w.pathname + w.search;
      throw tt(404, { pathname: R });
    }
    V(
      s !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`.",
    );
  } catch (y) {
    (a = he.error), (s = y);
  } finally {
    c && t.signal.removeEventListener("abort", c);
  }
  if (yg(s)) {
    let y = s.status;
    if (ig.has(y)) {
      let d = s.headers.get("Location");
      if (
        (V(
          d,
          "Redirects returned/thrown from loaders/actions must have a Location header",
        ),
        !Fp.test(d))
      )
        d = qu(new URL(t.url), r.slice(0, r.indexOf(n) + 1), i, !0, d);
      else if (!u.isStaticRequest) {
        let f = new URL(t.url),
          v = d.startsWith("//") ? new URL(f.protocol + d) : new URL(d),
          p = cn(v.pathname, i) != null;
        v.origin === f.origin && p && (d = v.pathname + v.search + v.hash);
      }
      if (u.isStaticRequest) throw (s.headers.set("Location", d), s);
      return {
        type: he.redirect,
        status: y,
        location: d,
        revalidate: s.headers.get("X-Remix-Revalidate") !== null,
        reloadDocument: s.headers.get("X-Remix-Reload-Document") !== null,
      };
    }
    if (u.isRouteRequest)
      throw { type: a === he.error ? he.error : he.data, response: s };
    let w,
      R = s.headers.get("Content-Type");
    return (
      R && /\bapplication\/json\b/.test(R)
        ? (w = await s.json())
        : (w = await s.text()),
      a === he.error
        ? { type: a, error: new rs(y, s.statusText, w), headers: s.headers }
        : { type: he.data, data: w, statusCode: s.status, headers: s.headers }
    );
  }
  if (a === he.error) return { type: a, error: s };
  if (vg(s)) {
    var h, S;
    return {
      type: he.deferred,
      deferredData: s,
      statusCode: (h = s.init) == null ? void 0 : h.status,
      headers:
        ((S = s.init) == null ? void 0 : S.headers) &&
        new Headers(s.init.headers),
    };
  }
  return { type: he.data, data: s };
}
function Dr(e, t, n, r) {
  let l = e.createURL(Up(t)).toString(),
    o = { signal: n };
  if (r && pt(r.formMethod)) {
    let { formMethod: i, formEncType: u } = r;
    (o.method = i.toUpperCase()),
      u === "application/json"
        ? ((o.headers = new Headers({ "Content-Type": u })),
          (o.body = JSON.stringify(r.json)))
        : u === "text/plain"
          ? (o.body = r.text)
          : u === "application/x-www-form-urlencoded" && r.formData
            ? (o.body = bu(r.formData))
            : (o.body = r.formData);
  }
  return new Request(l, o);
}
function bu(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function Uc(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function hg(e, t, n, r, l) {
  let o = {},
    i = null,
    u,
    a = !1,
    s = {};
  return (
    n.forEach((c, m) => {
      let h = t[m].route.id;
      if (
        (V(!lr(c), "Cannot handle redirect results in processLoaderData"),
        Zr(c))
      ) {
        let S = Jr(e, h),
          y = c.error;
        r && ((y = Object.values(r)[0]), (r = void 0)),
          (i = i || {}),
          i[S.route.id] == null && (i[S.route.id] = y),
          (o[h] = void 0),
          a || ((a = !0), (u = Dp(c.error) ? c.error.status : 500)),
          c.headers && (s[h] = c.headers);
      } else
        En(c)
          ? (l.set(h, c.deferredData), (o[h] = c.deferredData.data))
          : (o[h] = c.data),
          c.statusCode != null &&
            c.statusCode !== 200 &&
            !a &&
            (u = c.statusCode),
          c.headers && (s[h] = c.headers);
    }),
    r && ((i = r), (o[Object.keys(r)[0]] = void 0)),
    { loaderData: o, errors: i, statusCode: u || 200, loaderHeaders: s }
  );
}
function Ac(e, t, n, r, l, o, i, u) {
  let { loaderData: a, errors: s } = hg(t, n, r, l, u);
  for (let c = 0; c < o.length; c++) {
    let { key: m, match: h, controller: S } = o[c];
    V(
      i !== void 0 && i[c] !== void 0,
      "Did not find corresponding fetcher result",
    );
    let y = i[c];
    if (!(S && S.signal.aborted))
      if (Zr(y)) {
        let w = Jr(e.matches, h == null ? void 0 : h.route.id);
        (s && s[w.route.id]) || (s = de({}, s, { [w.route.id]: y.error })),
          e.fetchers.delete(m);
      } else if (lr(y)) V(!1, "Unhandled fetcher revalidation redirect");
      else if (En(y)) V(!1, "Unhandled fetcher deferred data");
      else {
        let w = Qt(y.data);
        e.fetchers.set(m, w);
      }
  }
  return { loaderData: a, errors: s };
}
function Bc(e, t, n, r) {
  let l = de({}, t);
  for (let o of n) {
    let i = o.route.id;
    if (
      (t.hasOwnProperty(i)
        ? t[i] !== void 0 && (l[i] = t[i])
        : e[i] !== void 0 && o.route.loader && (l[i] = e[i]),
      r && r.hasOwnProperty(i))
    )
      break;
  }
  return l;
}
function Jr(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Vc(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function tt(e, t) {
  let { pathname: n, routeId: r, method: l, type: o } = t === void 0 ? {} : t,
    i = "Unknown Server Error",
    u = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((i = "Bad Request"),
        l && n && r
          ? (u =
              "You made a " +
              l +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : o === "defer-action"
            ? (u = "defer() is not supported in actions")
            : o === "invalid-body" && (u = "Unable to encode submission body"))
      : e === 403
        ? ((i = "Forbidden"),
          (u = 'Route "' + r + '" does not match URL "' + n + '"'))
        : e === 404
          ? ((i = "Not Found"), (u = 'No route matches URL "' + n + '"'))
          : e === 405 &&
            ((i = "Method Not Allowed"),
            l && n && r
              ? (u =
                  "You made a " +
                  l.toUpperCase() +
                  ' request to "' +
                  n +
                  '" but ' +
                  ('did not provide an `action` for route "' + r + '", ') +
                  "so there is no way to handle the request.")
              : l && (u = 'Invalid request method "' + l.toUpperCase() + '"')),
    new rs(e || 500, i, new Error(u), !0)
  );
}
function Wc(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (lr(n)) return { result: n, idx: t };
  }
}
function Up(e) {
  let t = typeof e == "string" ? Ut(e) : e;
  return Tn(de({}, t, { hash: "" }));
}
function mg(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
      ? t.hash !== ""
      : e.hash === t.hash
        ? !0
        : t.hash !== "";
}
function En(e) {
  return e.type === he.deferred;
}
function Zr(e) {
  return e.type === he.error;
}
function lr(e) {
  return (e && e.type) === he.redirect;
}
function vg(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function yg(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function gg(e) {
  return og.has(e.toLowerCase());
}
function pt(e) {
  return rg.has(e.toLowerCase());
}
async function Hc(e, t, n, r, l, o) {
  for (let i = 0; i < n.length; i++) {
    let u = n[i],
      a = t[i];
    if (!a) continue;
    let s = e.find((m) => m.route.id === a.route.id),
      c = s != null && !$p(s, a) && (o && o[a.route.id]) !== void 0;
    if (En(u) && (l || c)) {
      let m = r[i];
      V(m, "Expected an AbortSignal for revalidating fetcher deferred result"),
        await Ap(u, m, l).then((h) => {
          h && (n[i] = h || n[i]);
        });
    }
  }
}
async function Ap(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: he.data, data: e.deferredData.unwrappedData };
      } catch (l) {
        return { type: he.error, error: l };
      }
    return { type: he.data, data: e.deferredData.data };
  }
}
function ls(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function ea(e, t) {
  let n = typeof t == "string" ? Ut(t).search : t.search;
  if (e[e.length - 1].route.index && ls(n || "")) return e[e.length - 1];
  let r = Op(e);
  return r[r.length - 1];
}
function Qc(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: l,
    formData: o,
    json: i,
  } = e;
  if (!(!t || !n || !r)) {
    if (l != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: l,
      };
    if (o != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: o,
        json: void 0,
        text: void 0,
      };
    if (i !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: i,
        text: void 0,
      };
  }
}
function tu(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function wg(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function zr(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function Sg(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function Qt(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function xg(e, t) {
  try {
    let n = e.sessionStorage.getItem(Ip);
    if (n) {
      let r = JSON.parse(n);
      for (let [l, o] of Object.entries(r || {}))
        o && Array.isArray(o) && t.set(l, new Set(o || []));
    }
  } catch {}
}
function Eg(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, l] of t) n[r] = [...l];
    try {
      e.sessionStorage.setItem(Ip, JSON.stringify(n));
    } catch (r) {
      jn(
        !1,
        "Failed to save applied view transitions in sessionStorage (" +
          r +
          ").",
      );
    }
  }
}
/**
 * React Router v6.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ro() {
  return (
    (Ro = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ro.apply(this, arguments)
  );
}
const El = E.createContext(null),
  os = E.createContext(null),
  Dn = E.createContext(null),
  yi = E.createContext(null),
  At = E.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Bp = E.createContext(null);
function Cg(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  gr() || V(!1);
  let { basename: r, navigator: l } = E.useContext(Dn),
    { hash: o, pathname: i, search: u } = wi(e, { relative: n }),
    a = i;
  return (
    r !== "/" && (a = i === "/" ? r : Ot([r, i])),
    l.createHref({ pathname: a, search: u, hash: o })
  );
}
function gr() {
  return E.useContext(yi) != null;
}
function wr() {
  return gr() || V(!1), E.useContext(yi).location;
}
function Vp(e) {
  E.useContext(Dn).static || E.useLayoutEffect(e);
}
function gi() {
  let { isDataRoute: e } = E.useContext(At);
  return e ? Ig() : kg();
}
function kg() {
  gr() || V(!1);
  let e = E.useContext(El),
    { basename: t, navigator: n } = E.useContext(Dn),
    { matches: r } = E.useContext(At),
    { pathname: l } = wr(),
    o = JSON.stringify(mi(r)),
    i = E.useRef(!1);
  return (
    Vp(() => {
      i.current = !0;
    }),
    E.useCallback(
      function (a, s) {
        if ((s === void 0 && (s = {}), !i.current)) return;
        if (typeof a == "number") {
          n.go(a);
          return;
        }
        let c = vi(a, JSON.parse(o), l, s.relative === "path");
        e == null &&
          t !== "/" &&
          (c.pathname = c.pathname === "/" ? t : Ot([t, c.pathname])),
          (s.replace ? n.replace : n.push)(c, s.state, s);
      },
      [t, n, o, l, e],
    )
  );
}
const Pg = E.createContext(null);
function Rg(e) {
  let t = E.useContext(At).outlet;
  return t && E.createElement(Pg.Provider, { value: e }, t);
}
function wi(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { matches: r } = E.useContext(At),
    { pathname: l } = wr(),
    o = JSON.stringify(mi(r));
  return E.useMemo(() => vi(e, JSON.parse(o), l, n === "path"), [e, o, l, n]);
}
function _g(e, t, n) {
  gr() || V(!1);
  let { navigator: r } = E.useContext(Dn),
    { matches: l } = E.useContext(At),
    o = l[l.length - 1],
    i = o ? o.params : {};
  o && o.pathname;
  let u = o ? o.pathnameBase : "/";
  o && o.route;
  let a = wr(),
    s;
  if (t) {
    var c;
    let w = typeof t == "string" ? Ut(t) : t;
    u === "/" || ((c = w.pathname) != null && c.startsWith(u)) || V(!1),
      (s = w);
  } else s = a;
  let m = s.pathname || "/",
    h = u === "/" ? m : m.slice(u.length) || "/",
    S = Zn(e, { pathname: h }),
    y = Mg(
      S &&
        S.map((w) =>
          Object.assign({}, w, {
            params: Object.assign({}, i, w.params),
            pathname: Ot([
              u,
              r.encodeLocation
                ? r.encodeLocation(w.pathname).pathname
                : w.pathname,
            ]),
            pathnameBase:
              w.pathnameBase === "/"
                ? u
                : Ot([
                    u,
                    r.encodeLocation
                      ? r.encodeLocation(w.pathnameBase).pathname
                      : w.pathnameBase,
                  ]),
          }),
        ),
      l,
      n,
    );
  return t && y
    ? E.createElement(
        yi.Provider,
        {
          value: {
            location: Ro(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              s,
            ),
            navigationType: pe.Pop,
          },
        },
        y,
      )
    : y;
}
function Lg() {
  let e = Fg(),
    t = Dp(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    o = null;
  return E.createElement(
    E.Fragment,
    null,
    E.createElement("h2", null, "Unexpected Application Error!"),
    E.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? E.createElement("pre", { style: l }, n) : null,
    o,
  );
}
const Ng = E.createElement(Lg, null);
class jg extends E.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error || n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error
      ? E.createElement(
          At.Provider,
          { value: this.props.routeContext },
          E.createElement(Bp.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Tg(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = E.useContext(El);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    E.createElement(At.Provider, { value: t }, r)
  );
}
function Mg(e, t, n) {
  var r;
  if ((t === void 0 && (t = []), n === void 0 && (n = null), e == null)) {
    var l;
    if ((l = n) != null && l.errors) e = n.matches;
    else return null;
  }
  let o = e,
    i = (r = n) == null ? void 0 : r.errors;
  if (i != null) {
    let u = o.findIndex(
      (a) => a.route.id && (i == null ? void 0 : i[a.route.id]),
    );
    u >= 0 || V(!1), (o = o.slice(0, Math.min(o.length, u + 1)));
  }
  return o.reduceRight((u, a, s) => {
    let c = a.route.id ? (i == null ? void 0 : i[a.route.id]) : null,
      m = null;
    n && (m = a.route.errorElement || Ng);
    let h = t.concat(o.slice(0, s + 1)),
      S = () => {
        let y;
        return (
          c
            ? (y = m)
            : a.route.Component
              ? (y = E.createElement(a.route.Component, null))
              : a.route.element
                ? (y = a.route.element)
                : (y = u),
          E.createElement(Tg, {
            match: a,
            routeContext: { outlet: u, matches: h, isDataRoute: n != null },
            children: y,
          })
        );
      };
    return n && (a.route.ErrorBoundary || a.route.errorElement || s === 0)
      ? E.createElement(jg, {
          location: n.location,
          revalidation: n.revalidation,
          component: m,
          error: c,
          children: S(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
        })
      : S();
  }, null);
}
var Wp = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Wp || {}),
  _o = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(_o || {});
function Og(e) {
  let t = E.useContext(El);
  return t || V(!1), t;
}
function Dg(e) {
  let t = E.useContext(os);
  return t || V(!1), t;
}
function zg(e) {
  let t = E.useContext(At);
  return t || V(!1), t;
}
function Hp(e) {
  let t = zg(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || V(!1), n.route.id;
}
function Fg() {
  var e;
  let t = E.useContext(Bp),
    n = Dg(_o.UseRouteError),
    r = Hp(_o.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function Ig() {
  let { router: e } = Og(Wp.UseNavigateStable),
    t = Hp(_o.UseNavigateStable),
    n = E.useRef(!1);
  return (
    Vp(() => {
      n.current = !0;
    }),
    E.useCallback(
      function (l, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, Ro({ fromRouteId: t }, o)));
      },
      [e, t],
    )
  );
}
function Qp(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  gr() || V(!1);
  let { matches: o } = E.useContext(At),
    { pathname: i } = wr(),
    u = gi(),
    a = vi(t, mi(o), i, l === "path"),
    s = JSON.stringify(a);
  return (
    E.useEffect(
      () => u(JSON.parse(s), { replace: n, state: r, relative: l }),
      [u, s, l, n, r],
    ),
    null
  );
}
function $g(e) {
  return Rg(e.context);
}
function Ug(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = pe.Pop,
    navigator: o,
    static: i = !1,
  } = e;
  gr() && V(!1);
  let u = t.replace(/^\/*/, "/"),
    a = E.useMemo(() => ({ basename: u, navigator: o, static: i }), [u, o, i]);
  typeof r == "string" && (r = Ut(r));
  let {
      pathname: s = "/",
      search: c = "",
      hash: m = "",
      state: h = null,
      key: S = "default",
    } = r,
    y = E.useMemo(() => {
      let w = cn(s, u);
      return w == null
        ? null
        : {
            location: { pathname: w, search: c, hash: m, state: h, key: S },
            navigationType: l,
          };
    }, [u, s, c, m, h, S, l]);
  return y == null
    ? null
    : E.createElement(
        Dn.Provider,
        { value: a },
        E.createElement(yi.Provider, { children: n, value: y }),
      );
}
new Promise(() => {});
function Ag(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: E.createElement(e.Component),
        Component: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: E.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
/**
 * React Router DOM v6.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function pr() {
  return (
    (pr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    pr.apply(this, arguments)
  );
}
function Kp(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function Bg(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Vg(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Bg(e);
}
const Wg = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  Hg = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ];
function Qg(e, t) {
  return cg({
    basename: t == null ? void 0 : t.basename,
    future: pr({}, t == null ? void 0 : t.future, { v7_prependBasename: !0 }),
    history: Oy({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || Kg(),
    routes: e,
    mapRouteProperties: Ag,
    window: t == null ? void 0 : t.window,
  }).initialize();
}
function Kg() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = pr({}, t, { errors: Yg(t.errors) })), t;
}
function Yg(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, l] of t)
    if (l && l.__type === "RouteErrorResponse")
      n[r] = new rs(l.status, l.statusText, l.data, l.internal === !0);
    else if (l && l.__type === "Error") {
      if (l.__subType) {
        let o = window[l.__subType];
        if (typeof o == "function")
          try {
            let i = new o(l.message);
            (i.stack = ""), (n[r] = i);
          } catch {}
      }
      if (n[r] == null) {
        let o = new Error(l.message);
        (o.stack = ""), (n[r] = o);
      }
    } else n[r] = l;
  return n;
}
const Yp = E.createContext({ isTransitioning: !1 }),
  Xg = E.createContext(new Map()),
  Gg = "startTransition",
  Kc = Mh[Gg],
  Jg = "flushSync",
  Yc = Vv[Jg];
function Zg(e) {
  Kc ? Kc(e) : e();
}
function Fr(e) {
  Yc ? Yc(e) : e();
}
class qg {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          });
      }));
  }
}
function bg(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [l, o] = E.useState(n.state),
    [i, u] = E.useState(),
    [a, s] = E.useState({ isTransitioning: !1 }),
    [c, m] = E.useState(),
    [h, S] = E.useState(),
    [y, w] = E.useState(),
    R = E.useRef(new Map()),
    { v7_startTransition: d } = r || {},
    f = E.useCallback(
      (k) => {
        d ? Zg(k) : k();
      },
      [d],
    ),
    v = E.useCallback(
      (k, T) => {
        let {
          deletedFetchers: I,
          unstable_flushSync: $,
          unstable_viewTransitionOpts: X,
        } = T;
        I.forEach((Se) => R.current.delete(Se)),
          k.fetchers.forEach((Se, kt) => {
            Se.data !== void 0 && R.current.set(kt, Se.data);
          });
        let ke =
          n.window == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!X || ke) {
          $ ? Fr(() => o(k)) : f(() => o(k));
          return;
        }
        if ($) {
          Fr(() => {
            h && (c && c.resolve(), h.skipTransition()),
              s({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: X.currentLocation,
                nextLocation: X.nextLocation,
              });
          });
          let Se = n.window.document.startViewTransition(() => {
            Fr(() => o(k));
          });
          Se.finished.finally(() => {
            Fr(() => {
              m(void 0), S(void 0), u(void 0), s({ isTransitioning: !1 });
            });
          }),
            Fr(() => S(Se));
          return;
        }
        h
          ? (c && c.resolve(),
            h.skipTransition(),
            w({
              state: k,
              currentLocation: X.currentLocation,
              nextLocation: X.nextLocation,
            }))
          : (u(k),
            s({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: X.currentLocation,
              nextLocation: X.nextLocation,
            }));
      },
      [n.window, h, c, R, f],
    );
  E.useLayoutEffect(() => n.subscribe(v), [n, v]),
    E.useEffect(() => {
      a.isTransitioning && !a.flushSync && m(new qg());
    }, [a]),
    E.useEffect(() => {
      if (c && i && n.window) {
        let k = i,
          T = c.promise,
          I = n.window.document.startViewTransition(async () => {
            f(() => o(k)), await T;
          });
        I.finished.finally(() => {
          m(void 0), S(void 0), u(void 0), s({ isTransitioning: !1 });
        }),
          S(I);
      }
    }, [f, i, c, n.window]),
    E.useEffect(() => {
      c && i && l.location.key === i.location.key && c.resolve();
    }, [c, h, l.location, i]),
    E.useEffect(() => {
      !a.isTransitioning &&
        y &&
        (u(y.state),
        s({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: y.currentLocation,
          nextLocation: y.nextLocation,
        }),
        w(void 0));
    }, [a.isTransitioning, y]);
  let p = E.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (k) => n.navigate(k),
        push: (k, T, I) =>
          n.navigate(k, {
            state: T,
            preventScrollReset: I == null ? void 0 : I.preventScrollReset,
          }),
        replace: (k, T, I) =>
          n.navigate(k, {
            replace: !0,
            state: T,
            preventScrollReset: I == null ? void 0 : I.preventScrollReset,
          }),
      }),
      [n],
    ),
    _ = n.basename || "/",
    N = E.useMemo(
      () => ({ router: n, navigator: p, static: !1, basename: _ }),
      [n, p, _],
    );
  return E.createElement(
    E.Fragment,
    null,
    E.createElement(
      El.Provider,
      { value: N },
      E.createElement(
        os.Provider,
        { value: l },
        E.createElement(
          Xg.Provider,
          { value: R.current },
          E.createElement(
            Yp.Provider,
            { value: a },
            E.createElement(
              Ug,
              {
                basename: _,
                location: l.location,
                navigationType: l.historyAction,
                navigator: p,
              },
              l.initialized
                ? E.createElement(e0, { routes: n.routes, state: l })
                : t,
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
function e0(e) {
  let { routes: t, state: n } = e;
  return _g(t, void 0, n);
}
const t0 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  n0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  r0 = E.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: o,
        replace: i,
        state: u,
        target: a,
        to: s,
        preventScrollReset: c,
        unstable_viewTransition: m,
      } = t,
      h = Kp(t, Wg),
      { basename: S } = E.useContext(Dn),
      y,
      w = !1;
    if (typeof s == "string" && n0.test(s) && ((y = s), t0))
      try {
        let v = new URL(window.location.href),
          p = s.startsWith("//") ? new URL(v.protocol + s) : new URL(s),
          _ = cn(p.pathname, S);
        p.origin === v.origin && _ != null
          ? (s = _ + p.search + p.hash)
          : (w = !0);
      } catch {}
    let R = Cg(s, { relative: l }),
      d = i0(s, {
        replace: i,
        state: u,
        target: a,
        preventScrollReset: c,
        relative: l,
        unstable_viewTransition: m,
      });
    function f(v) {
      r && r(v), v.defaultPrevented || d(v);
    }
    return E.createElement(
      "a",
      pr({}, h, { href: y || R, onClick: w || o ? r : f, ref: n, target: a }),
    );
  }),
  l0 = E.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: o = "",
        end: i = !1,
        style: u,
        to: a,
        unstable_viewTransition: s,
        children: c,
      } = t,
      m = Kp(t, Hg),
      h = wi(a, { relative: m.relative }),
      S = wr(),
      y = E.useContext(os),
      { navigator: w } = E.useContext(Dn),
      R = y != null && u0(h) && s === !0,
      d = w.encodeLocation ? w.encodeLocation(h).pathname : h.pathname,
      f = S.pathname,
      v =
        y && y.navigation && y.navigation.location
          ? y.navigation.location.pathname
          : null;
    l ||
      ((f = f.toLowerCase()),
      (v = v ? v.toLowerCase() : null),
      (d = d.toLowerCase()));
    const p = d !== "/" && d.endsWith("/") ? d.length - 1 : d.length;
    let _ = f === d || (!i && f.startsWith(d) && f.charAt(p) === "/"),
      N =
        v != null &&
        (v === d || (!i && v.startsWith(d) && v.charAt(d.length) === "/")),
      k = { isActive: _, isPending: N, isTransitioning: R },
      T = _ ? r : void 0,
      I;
    typeof o == "function"
      ? (I = o(k))
      : (I = [
          o,
          _ ? "active" : null,
          N ? "pending" : null,
          R ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let $ = typeof u == "function" ? u(k) : u;
    return E.createElement(
      r0,
      pr({}, m, {
        "aria-current": T,
        className: I,
        ref: n,
        style: $,
        to: a,
        unstable_viewTransition: s,
      }),
      typeof c == "function" ? c(k) : c,
    );
  });
var ta;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(ta || (ta = {}));
var Xc;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Xc || (Xc = {}));
function o0(e) {
  let t = E.useContext(El);
  return t || V(!1), t;
}
function i0(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: o,
      relative: i,
      unstable_viewTransition: u,
    } = t === void 0 ? {} : t,
    a = gi(),
    s = wr(),
    c = wi(e, { relative: i });
  return E.useCallback(
    (m) => {
      if (Vg(m, n)) {
        m.preventDefault();
        let h = r !== void 0 ? r : Tn(s) === Tn(c);
        a(e, {
          replace: h,
          state: l,
          preventScrollReset: o,
          relative: i,
          unstable_viewTransition: u,
        });
      }
    },
    [s, a, c, r, l, n, e, o, i, u],
  );
}
function u0(e, t) {
  t === void 0 && (t = {});
  let n = E.useContext(Yp);
  n == null && V(!1);
  let { basename: r } = o0(ta.useViewTransitionState),
    l = wi(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let o = cn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = cn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Zu(l.pathname, i) != null || Zu(l.pathname, o) != null;
}
function vl(e) {
  "@babel/helpers - typeof";
  return (
    (vl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    vl(e)
  );
}
function a0(e, t) {
  if (vl(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (vl(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function s0(e) {
  var t = a0(e, "string");
  return vl(t) === "symbol" ? t : String(t);
}
function c0(e, t, n) {
  return (
    (t = s0(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Gc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Jc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Gc(Object(n), !0).forEach(function (r) {
          c0(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Gc(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Te(e) {
  return (
    "Minified Redux error #" +
    e +
    "; visit https://redux.js.org/Errors?code=" +
    e +
    " for the full message or use the non-minified dev environment for full errors. "
  );
}
var Zc = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })(),
  nu = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  Lo = {
    INIT: "@@redux/INIT" + nu(),
    REPLACE: "@@redux/REPLACE" + nu(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + nu();
    },
  };
function f0(e) {
  if (typeof e != "object" || e === null) return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function Xp(e, t, n) {
  var r;
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(Te(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(Te(1));
    return n(Xp)(e, t);
  }
  if (typeof e != "function") throw new Error(Te(2));
  var l = e,
    o = t,
    i = [],
    u = i,
    a = !1;
  function s() {
    u === i && (u = i.slice());
  }
  function c() {
    if (a) throw new Error(Te(3));
    return o;
  }
  function m(w) {
    if (typeof w != "function") throw new Error(Te(4));
    if (a) throw new Error(Te(5));
    var R = !0;
    return (
      s(),
      u.push(w),
      function () {
        if (R) {
          if (a) throw new Error(Te(6));
          (R = !1), s();
          var f = u.indexOf(w);
          u.splice(f, 1), (i = null);
        }
      }
    );
  }
  function h(w) {
    if (!f0(w)) throw new Error(Te(7));
    if (typeof w.type > "u") throw new Error(Te(8));
    if (a) throw new Error(Te(9));
    try {
      (a = !0), (o = l(o, w));
    } finally {
      a = !1;
    }
    for (var R = (i = u), d = 0; d < R.length; d++) {
      var f = R[d];
      f();
    }
    return w;
  }
  function S(w) {
    if (typeof w != "function") throw new Error(Te(10));
    (l = w), h({ type: Lo.REPLACE });
  }
  function y() {
    var w,
      R = m;
    return (
      (w = {
        subscribe: function (f) {
          if (typeof f != "object" || f === null) throw new Error(Te(11));
          function v() {
            f.next && f.next(c());
          }
          v();
          var p = R(v);
          return { unsubscribe: p };
        },
      }),
      (w[Zc] = function () {
        return this;
      }),
      w
    );
  }
  return (
    h({ type: Lo.INIT }),
    (r = { dispatch: h, subscribe: m, getState: c, replaceReducer: S }),
    (r[Zc] = y),
    r
  );
}
var d0 = Xp;
function p0(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, { type: Lo.INIT });
    if (typeof r > "u") throw new Error(Te(12));
    if (typeof n(void 0, { type: Lo.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(Te(13));
  });
}
function h0(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var l = t[r];
    typeof e[l] == "function" && (n[l] = e[l]);
  }
  var o = Object.keys(n),
    i;
  try {
    p0(n);
  } catch (u) {
    i = u;
  }
  return function (a, s) {
    if ((a === void 0 && (a = {}), i)) throw i;
    for (var c = !1, m = {}, h = 0; h < o.length; h++) {
      var S = o[h],
        y = n[S],
        w = a[S],
        R = y(w, s);
      if (typeof R > "u") throw (s && s.type, new Error(Te(14)));
      (m[S] = R), (c = c || R !== w);
    }
    return (c = c || o.length !== Object.keys(a).length), c ? m : a;
  };
}
function m0() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return t.length === 0
    ? function (r) {
        return r;
      }
    : t.length === 1
      ? t[0]
      : t.reduce(function (r, l) {
          return function () {
            return r(l.apply(void 0, arguments));
          };
        });
}
function v0() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function (r) {
    return function () {
      var l = r.apply(void 0, arguments),
        o = function () {
          throw new Error(Te(15));
        },
        i = {
          getState: l.getState,
          dispatch: function () {
            return o.apply(void 0, arguments);
          },
        },
        u = t.map(function (a) {
          return a(i);
        });
      return (
        (o = m0.apply(void 0, u)(l.dispatch)),
        Jc(Jc({}, l), {}, { dispatch: o })
      );
    };
  };
}
function Gp(e) {
  var t = function (r) {
    var l = r.dispatch,
      o = r.getState;
    return function (i) {
      return function (u) {
        return typeof u == "function" ? u(l, o, e) : i(u);
      };
    };
  };
  return t;
}
var Jp = Gp();
Jp.withExtraArgument = Gp;
const y0 = Jp,
  Zp = "session/setUser",
  qp = "session/removeUser",
  is = (e) => ({ type: Zp, payload: e }),
  g0 = () => ({ type: qp }),
  w0 = () => async (e) => {
    const t = await fetch("/api/auth/");
    if (t.ok) {
      const n = await t.json();
      if (n.errors) return;
      e(is(n));
    }
  },
  bp = (e) => async (t) => {
    const n = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    if (n.ok) {
      const r = await n.json();
      t(is(r));
    } else
      return n.status < 500
        ? await n.json()
        : { server: "Something went wrong. Please try again" };
  },
  eh = (e) => async (t) => {
    const n = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    if (n.ok) {
      const r = await n.json();
      t(is(r));
    } else
      return n.status < 500
        ? await n.json()
        : { server: "Something went wrong. Please try again" };
  },
  S0 = () => async (e) => {
    await fetch("/api/auth/logout"), e(g0());
  },
  x0 = { user: null };
function E0(e = x0, t) {
  switch (t.type) {
    case Zp:
      return { ...e, user: t.payload };
    case qp:
      return { ...e, user: null };
    default:
      return e;
  }
}
const C0 = h0({ session: E0 });
let th;
th = v0(y0);
const k0 = (e) => d0(C0, e, th);
function P0() {
  const e = gi(),
    t = yr(),
    n = Za((c) => c.session.user),
    [r, l] = E.useState(""),
    [o, i] = E.useState(""),
    [u, a] = E.useState({});
  if (n) return P.jsx(Qp, { to: "/", replace: !0 });
  const s = async (c) => {
    c.preventDefault();
    const m = await t(bp({ email: r, password: o }));
    m ? a(m) : e("/");
  };
  return P.jsxs(P.Fragment, {
    children: [
      P.jsx("h1", { children: "Log In" }),
      u.length > 0 && u.map((c) => P.jsx("p", { children: c }, c)),
      P.jsxs("form", {
        onSubmit: s,
        children: [
          P.jsxs("label", {
            children: [
              "Email",
              P.jsx("input", {
                type: "text",
                value: r,
                onChange: (c) => l(c.target.value),
                required: !0,
              }),
            ],
          }),
          u.email && P.jsx("p", { children: u.email }),
          P.jsxs("label", {
            children: [
              "Password",
              P.jsx("input", {
                type: "password",
                value: o,
                onChange: (c) => i(c.target.value),
                required: !0,
              }),
            ],
          }),
          u.password && P.jsx("p", { children: u.password }),
          P.jsx("button", { type: "submit", children: "Log In" }),
        ],
      }),
    ],
  });
}
function R0() {
  const e = yr(),
    t = gi(),
    n = Za((y) => y.session.user),
    [r, l] = E.useState(""),
    [o, i] = E.useState(""),
    [u, a] = E.useState(""),
    [s, c] = E.useState(""),
    [m, h] = E.useState({});
  if (n) return P.jsx(Qp, { to: "/", replace: !0 });
  const S = async (y) => {
    if ((y.preventDefault(), u !== s))
      return h({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    const w = await e(eh({ email: r, username: o, password: u }));
    w ? h(w) : t("/");
  };
  return P.jsxs(P.Fragment, {
    children: [
      P.jsx("h1", { children: "Sign Up" }),
      m.server && P.jsx("p", { children: m.server }),
      P.jsxs("form", {
        onSubmit: S,
        children: [
          P.jsxs("label", {
            children: [
              "Email",
              P.jsx("input", {
                type: "text",
                value: r,
                onChange: (y) => l(y.target.value),
                required: !0,
              }),
            ],
          }),
          m.email && P.jsx("p", { children: m.email }),
          P.jsxs("label", {
            children: [
              "Username",
              P.jsx("input", {
                type: "text",
                value: o,
                onChange: (y) => i(y.target.value),
                required: !0,
              }),
            ],
          }),
          m.username && P.jsx("p", { children: m.username }),
          P.jsxs("label", {
            children: [
              "Password",
              P.jsx("input", {
                type: "password",
                value: u,
                onChange: (y) => a(y.target.value),
                required: !0,
              }),
            ],
          }),
          m.password && P.jsx("p", { children: m.password }),
          P.jsxs("label", {
            children: [
              "Confirm Password",
              P.jsx("input", {
                type: "password",
                value: s,
                onChange: (y) => c(y.target.value),
                required: !0,
              }),
            ],
          }),
          m.confirmPassword && P.jsx("p", { children: m.confirmPassword }),
          P.jsx("button", { type: "submit", children: "Sign Up" }),
        ],
      }),
    ],
  });
}
const us = E.createContext();
function _0({ children: e }) {
  const t = E.useRef(),
    [n, r] = E.useState(null),
    [l, o] = E.useState(null),
    u = {
      modalRef: t,
      modalContent: n,
      setModalContent: r,
      setOnModalClose: o,
      closeModal: () => {
        r(null), typeof l == "function" && (o(null), l());
      },
    };
  return P.jsxs(P.Fragment, {
    children: [
      P.jsx(us.Provider, { value: u, children: e }),
      P.jsx("div", { ref: t }),
    ],
  });
}
function L0() {
  const { modalRef: e, modalContent: t, closeModal: n } = E.useContext(us);
  return !e || !e.current || !t
    ? null
    : yp.createPortal(
        P.jsxs("div", {
          id: "modal",
          children: [
            P.jsx("div", { id: "modal-background", onClick: n }),
            P.jsx("div", { id: "modal-content", children: t }),
          ],
        }),
        e.current,
      );
}
const as = () => E.useContext(us);
var nh = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  qc = Tt.createContext && Tt.createContext(nh),
  N0 = ["attr", "size", "title"];
function j0(e, t) {
  if (e == null) return {};
  var n = T0(e, t),
    r,
    l;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (l = 0; l < o.length; l++)
      (r = o[l]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function T0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function No() {
  return (
    (No = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    No.apply(this, arguments)
  );
}
function bc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function jo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? bc(Object(n), !0).forEach(function (r) {
          M0(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : bc(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function M0(e, t, n) {
  return (
    (t = O0(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function O0(e) {
  var t = D0(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function D0(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rh(e) {
  return (
    e &&
    e.map((t, n) =>
      Tt.createElement(t.tag, jo({ key: n }, t.attr), rh(t.child)),
    )
  );
}
function z0(e) {
  return (t) =>
    Tt.createElement(F0, No({ attr: jo({}, e.attr) }, t), rh(e.child));
}
function F0(e) {
  var t = (n) => {
    var { attr: r, size: l, title: o } = e,
      i = j0(e, N0),
      u = l || n.size || "1em",
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + " " : "") + e.className),
      Tt.createElement(
        "svg",
        No(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          i,
          {
            className: a,
            style: jo(jo({ color: e.color || n.color }, n.style), e.style),
            height: u,
            width: u,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        o && Tt.createElement("title", null, o),
        e.children,
      )
    );
  };
  return qc !== void 0
    ? Tt.createElement(qc.Consumer, null, (n) => t(n))
    : t(nh);
}
function I0(e) {
  return z0({
    tag: "svg",
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z",
        },
        child: [],
      },
    ],
  })(e);
}
function ef({
  modalComponent: e,
  itemText: t,
  onItemClick: n,
  onModalClose: r,
}) {
  const { setModalContent: l, setOnModalClose: o } = as(),
    i = () => {
      r && o(r), l(e), typeof n == "function" && n();
    };
  return P.jsx("li", { onClick: i, children: t });
}
function $0() {
  const e = yr(),
    [t, n] = E.useState(""),
    [r, l] = E.useState(""),
    [o, i] = E.useState({}),
    { closeModal: u } = as(),
    a = async (s) => {
      s.preventDefault();
      const c = await e(bp({ email: t, password: r }));
      c ? i(c) : u();
    };
  return P.jsxs(P.Fragment, {
    children: [
      P.jsx("h1", { children: "Log In" }),
      P.jsxs("form", {
        onSubmit: a,
        children: [
          P.jsxs("label", {
            children: [
              "Email",
              P.jsx("input", {
                type: "text",
                value: t,
                onChange: (s) => n(s.target.value),
                required: !0,
              }),
            ],
          }),
          o.email && P.jsx("p", { children: o.email }),
          P.jsxs("label", {
            children: [
              "Password",
              P.jsx("input", {
                type: "password",
                value: r,
                onChange: (s) => l(s.target.value),
                required: !0,
              }),
            ],
          }),
          o.password && P.jsx("p", { children: o.password }),
          P.jsx("button", { type: "submit", children: "Log In" }),
        ],
      }),
    ],
  });
}
function U0() {
  const e = yr(),
    [t, n] = E.useState(""),
    [r, l] = E.useState(""),
    [o, i] = E.useState(""),
    [u, a] = E.useState(""),
    [s, c] = E.useState({}),
    { closeModal: m } = as(),
    h = async (S) => {
      if ((S.preventDefault(), o !== u))
        return c({
          confirmPassword:
            "Confirm Password field must be the same as the Password field",
        });
      const y = await e(eh({ email: t, username: r, password: o }));
      y ? c(y) : m();
    };
  return P.jsxs(P.Fragment, {
    children: [
      P.jsx("h1", { children: "Sign Up" }),
      s.server && P.jsx("p", { children: s.server }),
      P.jsxs("form", {
        onSubmit: h,
        children: [
          P.jsxs("label", {
            children: [
              "Email",
              P.jsx("input", {
                type: "text",
                value: t,
                onChange: (S) => n(S.target.value),
                required: !0,
              }),
            ],
          }),
          s.email && P.jsx("p", { children: s.email }),
          P.jsxs("label", {
            children: [
              "Username",
              P.jsx("input", {
                type: "text",
                value: r,
                onChange: (S) => l(S.target.value),
                required: !0,
              }),
            ],
          }),
          s.username && P.jsx("p", { children: s.username }),
          P.jsxs("label", {
            children: [
              "Password",
              P.jsx("input", {
                type: "password",
                value: o,
                onChange: (S) => i(S.target.value),
                required: !0,
              }),
            ],
          }),
          s.password && P.jsx("p", { children: s.password }),
          P.jsxs("label", {
            children: [
              "Confirm Password",
              P.jsx("input", {
                type: "password",
                value: u,
                onChange: (S) => a(S.target.value),
                required: !0,
              }),
            ],
          }),
          s.confirmPassword && P.jsx("p", { children: s.confirmPassword }),
          P.jsx("button", { type: "submit", children: "Sign Up" }),
        ],
      }),
    ],
  });
}
function A0() {
  const e = yr(),
    [t, n] = E.useState(!1),
    r = Za((a) => a.session.user),
    l = E.useRef(),
    o = (a) => {
      a.stopPropagation(), n(!t);
    };
  E.useEffect(() => {
    if (!t) return;
    const a = (s) => {
      l.current && !l.current.contains(s.target) && n(!1);
    };
    return (
      document.addEventListener("click", a),
      () => document.removeEventListener("click", a)
    );
  }, [t]);
  const i = () => n(!1),
    u = (a) => {
      a.preventDefault(), e(S0()), i();
    };
  return P.jsxs(P.Fragment, {
    children: [
      P.jsx("button", { onClick: o, children: P.jsx(I0, {}) }),
      t &&
        P.jsx("ul", {
          className: "profile-dropdown",
          ref: l,
          children: r
            ? P.jsxs(P.Fragment, {
                children: [
                  P.jsx("li", { children: r.username }),
                  P.jsx("li", { children: r.email }),
                  P.jsx("li", {
                    children: P.jsx("button", {
                      onClick: u,
                      children: "Log Out",
                    }),
                  }),
                ],
              })
            : P.jsxs(P.Fragment, {
                children: [
                  P.jsx(ef, {
                    itemText: "Log In",
                    onItemClick: i,
                    modalComponent: P.jsx($0, {}),
                  }),
                  P.jsx(ef, {
                    itemText: "Sign Up",
                    onItemClick: i,
                    modalComponent: P.jsx(U0, {}),
                  }),
                ],
              }),
        }),
    ],
  });
}
function B0() {
  return P.jsxs("ul", {
    children: [
      P.jsx("li", { children: P.jsx(l0, { to: "/", children: "Home" }) }),
      P.jsx("li", { children: P.jsx(A0, {}) }),
    ],
  });
}
function V0() {
  const e = yr(),
    [t, n] = E.useState(!1);
  return (
    E.useEffect(() => {
      e(w0()).then(() => n(!0));
    }, [e]),
    P.jsx(P.Fragment, {
      children: P.jsxs(_0, {
        children: [P.jsx(B0, {}), t && P.jsx($g, {}), P.jsx(L0, {})],
      }),
    })
  );
}
const W0 = Qg([
  {
    element: P.jsx(V0, {}),
    children: [
      { path: "/", element: P.jsx("h1", { children: "Welcome!" }) },
      { path: "login", element: P.jsx(P0, {}) },
      { path: "signup", element: P.jsx(R0, {}) },
    ],
  },
]);
const H0 = k0();
ru.createRoot(document.getElementById("root")).render(
  P.jsx(Tt.StrictMode, {
    children: P.jsx(jy, { store: H0, children: P.jsx(bg, { router: W0 }) }),
  }),
);
