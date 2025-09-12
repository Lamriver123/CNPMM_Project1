import oe, { useState as M } from "react";
var h = { exports: {} }, v = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var q;
function ae() {
  if (q) return v;
  q = 1;
  var n = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment");
  function c(m, l, f) {
    var b = null;
    if (f !== void 0 && (b = "" + f), l.key !== void 0 && (b = "" + l.key), "key" in l) {
      f = {};
      for (var s in l)
        s !== "key" && (f[s] = l[s]);
    } else f = l;
    return l = f.ref, {
      $$typeof: n,
      type: m,
      key: b,
      ref: l !== void 0 ? l : null,
      props: f
    };
  }
  return v.Fragment = u, v.jsx = c, v.jsxs = c, v;
}
var x = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var L;
function se() {
  return L || (L = 1, process.env.NODE_ENV !== "production" && (function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === re ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case g:
          return "Fragment";
        case V:
          return "Profiler";
        case G:
          return "StrictMode";
        case Q:
          return "Suspense";
        case Z:
          return "SuspenseList";
        case ee:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case z:
            return "Portal";
          case B:
            return (e.displayName || "Context") + ".Provider";
          case X:
            return (e._context.displayName || "Context") + ".Consumer";
          case H:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case K:
            return r = e.displayName || null, r !== null ? r : n(e.type) || "Memo";
          case C:
            r = e._payload, e = e._init;
            try {
              return n(e(r));
            } catch {
            }
        }
      return null;
    }
    function u(e) {
      return "" + e;
    }
    function c(e) {
      try {
        u(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, o = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          o
        ), u(e);
      }
    }
    function m(e) {
      if (e === g) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === C)
        return "<...>";
      try {
        var r = n(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function l() {
      var e = k.A;
      return e === null ? null : e.getOwner();
    }
    function f() {
      return Error("react-stack-top-frame");
    }
    function b(e) {
      if (N.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function s(e, r) {
      function t() {
        I || (I = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function E() {
      var e = n(this.type);
      return Y[e] || (Y[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function _(e, r, t, o, p, d, w, y) {
      return t = d.ref, e = {
        $$typeof: P,
        type: e,
        key: r,
        props: d,
        _owner: p
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: E
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: w
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: y
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function A(e, r, t, o, p, d, w, y) {
      var a = r.children;
      if (a !== void 0)
        if (o)
          if (te(a)) {
            for (o = 0; o < a.length; o++)
              S(a[o]);
            Object.freeze && Object.freeze(a);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else S(a);
      if (N.call(r, "key")) {
        a = n(e);
        var R = Object.keys(r).filter(function(ne) {
          return ne !== "key";
        });
        o = 0 < R.length ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}", D[a + o] || (R = 0 < R.length ? "{" + R.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          o,
          a,
          R,
          a
        ), D[a + o] = !0);
      }
      if (a = null, t !== void 0 && (c(t), a = "" + t), b(r) && (c(r.key), a = "" + r.key), "key" in r) {
        t = {};
        for (var O in r)
          O !== "key" && (t[O] = r[O]);
      } else t = r;
      return a && s(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), _(
        e,
        a,
        d,
        p,
        l(),
        t,
        w,
        y
      );
    }
    function S(e) {
      typeof e == "object" && e !== null && e.$$typeof === P && e._store && (e._store.validated = 1);
    }
    var T = oe, P = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), G = Symbol.for("react.strict_mode"), V = Symbol.for("react.profiler"), X = Symbol.for("react.consumer"), B = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), re = Symbol.for("react.client.reference"), k = T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, N = Object.prototype.hasOwnProperty, te = Array.isArray, j = console.createTask ? console.createTask : function() {
      return null;
    };
    T = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var I, Y = {}, F = T.react_stack_bottom_frame.bind(
      T,
      f
    )(), $ = j(m(f)), D = {};
    x.Fragment = g, x.jsx = function(e, r, t, o, p) {
      var d = 1e4 > k.recentlyCreatedOwnerStacks++;
      return A(
        e,
        r,
        t,
        !1,
        o,
        p,
        d ? Error("react-stack-top-frame") : F,
        d ? j(m(e)) : $
      );
    }, x.jsxs = function(e, r, t, o, p) {
      var d = 1e4 > k.recentlyCreatedOwnerStacks++;
      return A(
        e,
        r,
        t,
        !0,
        o,
        p,
        d ? Error("react-stack-top-frame") : F,
        d ? j(m(e)) : $
      );
    };
  })()), x;
}
var W;
function ue() {
  return W || (W = 1, process.env.NODE_ENV === "production" ? h.exports = ae() : h.exports = se()), h.exports;
}
var i = ue();
const U = ({ children: n, onClick: u }) => /* @__PURE__ */ i.jsx(
  "button",
  {
    onClick: u,
    style: {
      padding: "10px 16px",
      borderRadius: "8px",
      border: "none",
      background: "#4CAF50",
      color: "white",
      cursor: "pointer"
    },
    children: n
  }
), J = ({ value: n, onChange: u }) => /* @__PURE__ */ i.jsx(
  "input",
  {
    value: n,
    onChange: (c) => u(c.target.value),
    style: {
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "100%"
    }
  }
), ie = ({ children: n }) => /* @__PURE__ */ i.jsx(
  "div",
  {
    style: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "12px"
    },
    children: n
  }
), le = ({ open: n, onClose: u, children: c }) => n ? /* @__PURE__ */ i.jsx(
  "div",
  {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    children: /* @__PURE__ */ i.jsxs("div", { style: { background: "#fff", padding: "20px", borderRadius: "8px" }, children: [
      c,
      /* @__PURE__ */ i.jsx("button", { onClick: u, style: { marginTop: "10px" }, children: "Đóng" })
    ] })
  }
) : null, fe = () => {
  const [n, u] = M([]), [c, m] = M(""), l = () => {
    c && (u([...n, { id: Date.now(), name: c, quantity: 1 }]), m(""));
  }, f = (s, E) => {
    u(n.map((_) => _.id === s ? { ..._, quantity: E } : _));
  }, b = (s) => {
    u(n.filter((E) => E.id !== s));
  };
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Giỏ hàng" }),
    /* @__PURE__ */ i.jsx(J, { value: c, onChange: m }),
    /* @__PURE__ */ i.jsx(U, { onClick: l, children: "Thêm sản phẩm" }),
    n.map((s) => /* @__PURE__ */ i.jsxs(ie, { children: [
      /* @__PURE__ */ i.jsx("p", { children: s.name }),
      /* @__PURE__ */ i.jsx(J, { value: String(s.quantity), onChange: (E) => f(s.id, Number(E)) }),
      /* @__PURE__ */ i.jsx(U, { onClick: () => b(s.id), children: "Xóa" })
    ] }, s.id))
  ] });
};
export {
  U as Button,
  ie as Card,
  fe as Cart,
  J as Input,
  le as Modal
};
