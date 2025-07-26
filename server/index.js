import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useRef, useEffect, useState, Children } from "react";
import { onCLS, onINP, onLCP } from "web-vitals";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const Axe = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    Promise.all([import("@axe-core/react"), import("react-dom")]).then(
      ([axe, ReactDOM]) => {
        axe.default(React, ReactDOM, 1e3, void 0, void 0, (results) => {
          console.log("Axe core results", results);
        });
      }
    );
  }
  return null;
};
const links = () => [];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "public/favicon.ico"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Axe, {}), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(async function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  return /* @__PURE__ */ jsxs("div", { className: "header flex justify-between text-center gap-24 ptb-8 plr-8 lg:ptb-16 lg:plr-0", children: [
    /* @__PURE__ */ jsxs(
      "h1",
      {
        className: "logo flex flex-col h-50 w-50 p-4",
        "aria-label": "Bhavin Kumar Patel's portfolio",
        tabIndex: 0,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "leading-none", children: "B" }),
            /* @__PURE__ */ jsx("div", { className: "leading-none", children: "K" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "leading-none", children: "P" }),
            /* @__PURE__ */ jsx("div", { className: "leading-none", children: "   " })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "navigation-links flex flex-wrap gap-8 lg:gap-16 text-xs items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: "#about", children: "About" }),
      /* @__PURE__ */ jsx(Link, { to: "#projects", children: "Projects" }),
      /* @__PURE__ */ jsx(Link, { to: "#skills", children: "Skills" }),
      /* @__PURE__ */ jsx(Link, { to: "#career", children: "Career" }),
      /* @__PURE__ */ jsx(Link, { to: "#awards", children: "Awards" })
    ] })
  ] });
}
const profileImage = "/assets/Linkedin%20profile%20pic-UQY1v19s.jpeg";
const resume = "/assets/Resume-Bhavinkumar-Patel-DXyam0xV.pdf";
const Dialog = ({
  open,
  title,
  children,
  onClose
}) => {
  const ref = useRef(null);
  useEffect(() => {
    var _a2, _b;
    if (open) {
      (_a2 = ref.current) == null ? void 0 : _a2.showModal();
    } else {
      (_b = ref.current) == null ? void 0 : _b.close();
    }
  }, [open]);
  return /* @__PURE__ */ jsxs("dialog", { ref, onClose, children: [
    /* @__PURE__ */ jsxs("div", { className: "dialog__title flex items-center justify-between p-16 pb-0", children: [
      /* @__PURE__ */ jsx("h2", { children: title }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "close-button",
          onClick: onClose,
          "aria-label": "Close button",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "dialog__body p-16 pt-8", children })
  ] });
};
const metricURLMap = {
  CLS: "https://web.dev/articles/cls",
  INP: "https://web.dev/articles/inp",
  LCP: "https://web.dev/articles/lcp"
};
const Vitals = () => {
  const queue = useRef(
    /* @__PURE__ */ new Set()
  );
  const [time, setTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState(
    []
  );
  const addToQueue = (metric) => {
    queue.current.add(metric);
  };
  const flushQueue = () => {
    if (queue.current.size > 0) {
      setMetrics([...queue.current]);
    }
  };
  useEffect(() => {
    const perfData = window.performance.timing;
    setTime(perfData.loadEventEnd - perfData.navigationStart);
    onCLS(addToQueue, {
      reportAllChanges: true
    });
    onINP(
      (metric) => {
        queue.current.add(metric);
        flushQueue();
      },
      {
        reportAllChanges: true
      }
    );
    onLCP(addToQueue, {
      reportAllChanges: true
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "vitals", children: [
    /* @__PURE__ */ jsxs("div", { className: "webpage-info text-sm flex gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "a11y-info", children: "100% accessible webpage" }),
      /* @__PURE__ */ jsx("div", { children: " | " }),
      /* @__PURE__ */ jsxs("div", { children: [
        "Page loaded in ",
        time,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "see-more", children: /* @__PURE__ */ jsx("button", { className: "text-xs underline", onClick: () => setOpen(true), children: "See more" }) }),
    /* @__PURE__ */ jsxs(Dialog, { open, title: "Vitals", onClose: () => setOpen(false), children: [
      /* @__PURE__ */ jsx("div", { className: "body metrics flex gap-8", children: metrics.map((metric, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border p-8 rounded-lg text-left capitalize",
          tabIndex: 0,
          "aria-label": `Metric: ${metric.name}; Rating: ${metric.rating}`,
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "secondary-text", children: "Metric: " }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "underline",
                  href: metricURLMap[metric.name],
                  target: "_blank",
                  "aria-label": `Learn about ${metric.name}`,
                  rel: "noreferrer",
                  children: metric.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "secondary-text", children: "Rating: " }),
              /* @__PURE__ */ jsx("span", { className: "text-green-600", children: metric.rating })
            ] })
          ]
        },
        idx
      )) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "credit text-xs flex items-center justify-start mt-4",
          tabIndex: 0,
          "aria-label": "Measured using web-vitals",
          children: [
            "Measured using ",
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "underline",
                href: "https://github.com/GoogleChrome/web-vitals",
                target: "_blank",
                "aria-label": "Learn about web-vitals",
                rel: "noreferrer",
                children: "web-vitals"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "footer flex items-center justify-end w-[100%] mt-8", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "plr-16 ptb-4 border rounded-2xl",
          onClick: () => setOpen(false),
          children: "Close"
        }
      ) })
    ] })
  ] });
};
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "about flex flex-col lg:flex-row lg:justify-between text-center lg:h-full plr-16 lg:plr-0 xxl:plr-32 lg:w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "profile-pic flex flex-col gap-24 items-center h-full w-full lg:w-[50%] mtb-8 lg:mtb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "picture flex justify-center rounded-full h-200 w-200 lg:h-300 lg:w-300 xl:h-450 xl:w-450", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: profileImage,
          alt: "Bhavin Kumar Patel profile picture",
          className: "rounded-full h-full shadow-md"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "links flex gap-8 items-center justify-center w-full", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            target: "_blank",
            href: "https://www.linkedin.com/in/bhavinpatel04/",
            "aria-label": "Go to Bhavin's LinkedIn",
            rel: "noreferrer",
            children: /* @__PURE__ */ jsx("svg", { className: "icon__linkedin size-32", children: /* @__PURE__ */ jsx("use", { href: "#icon-linkedin" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            target: "_blank",
            href: "https://github.com/BhavinPatel04",
            "aria-label": "Go to Bhavin's Github",
            rel: "noreferrer",
            children: /* @__PURE__ */ jsx("svg", { className: "icon__github size-32", children: /* @__PURE__ */ jsx("use", { href: "#icon-github" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Vitals, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "info flex flex-col gap-8 lg:gap-16 justify-end mt-8 lg:mb-200", children: [
      /* @__PURE__ */ jsx("div", { className: "name font-bold text-2xl lg:text-5xl", children: "Bhavin Kumar Patel" }),
      /* @__PURE__ */ jsx("div", { className: "designation", children: "Staff front-end engineer" }),
      /* @__PURE__ */ jsx("div", { className: "download-button flex justify-center", children: /* @__PURE__ */ jsxs(
        "a",
        {
          type: "button",
          href: resume,
          download: "Bhavin Kumar Patel - Resume",
          className: "flex justify-center items-center gap-8 ptb-8 plr-16",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "icon__download size-24", children: /* @__PURE__ */ jsx("use", { href: "#icon-download" }) }),
            /* @__PURE__ */ jsx("div", { children: "Download CV" })
          ]
        }
      ) })
    ] })
  ] });
}
var ga = { exports: {} }, wt = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pr;
function mn() {
  if (pr)
    return wt;
  pr = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function a(r, s, n) {
    var i = null;
    if (n !== void 0 && (i = "" + n), s.key !== void 0 && (i = "" + s.key), "key" in s) {
      n = {};
      for (var o in s)
        o !== "key" && (n[o] = s[o]);
    } else
      n = s;
    return s = n.ref, {
      $$typeof: e,
      type: r,
      key: i,
      ref: s !== void 0 ? s : null,
      props: n
    };
  }
  return wt.Fragment = t, wt.jsx = a, wt.jsxs = a, wt;
}
var Tt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wr;
function yn() {
  return wr || (wr = 1, process.env.NODE_ENV !== "production" && function() {
    function e(c) {
      if (c == null)
        return null;
      if (typeof c == "function")
        return c.$$typeof === He ? null : c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case W:
          return "Fragment";
        case ee:
          return "Profiler";
        case V:
          return "StrictMode";
        case ne:
          return "Suspense";
        case B:
          return "SuspenseList";
        case Fe:
          return "Activity";
      }
      if (typeof c == "object")
        switch (typeof c.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), c.$$typeof) {
          case k:
            return "Portal";
          case Q:
            return (c.displayName || "Context") + ".Provider";
          case te:
            return (c._context.displayName || "Context") + ".Consumer";
          case ae:
            var g = c.render;
            return c = c.displayName, c || (c = g.displayName || g.name || "", c = c !== "" ? "ForwardRef(" + c + ")" : "ForwardRef"), c;
          case X:
            return g = c.displayName || null, g !== null ? g : e(c.type) || "Memo";
          case re:
            g = c._payload, c = c._init;
            try {
              return e(c(g));
            } catch {
            }
        }
      return null;
    }
    function t(c) {
      return "" + c;
    }
    function a(c) {
      try {
        t(c);
        var g = false;
      } catch {
        g = true;
      }
      if (g) {
        g = console;
        var A = g.error, Z = typeof Symbol == "function" && Symbol.toStringTag && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return A.call(
          g,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          Z
        ), t(c);
      }
    }
    function r(c) {
      if (c === W)
        return "<>";
      if (typeof c == "object" && c !== null && c.$$typeof === re)
        return "<...>";
      try {
        var g = e(c);
        return g ? "<" + g + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function s() {
      var c = Be.A;
      return c === null ? null : c.getOwner();
    }
    function n() {
      return Error("react-stack-top-frame");
    }
    function i(c) {
      if (ut.call(c, "key")) {
        var g = Object.getOwnPropertyDescriptor(c, "key").get;
        if (g && g.isReactWarning)
          return false;
      }
      return c.key !== void 0;
    }
    function o(c, g) {
      function A() {
        dt || (dt = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          g
        ));
      }
      A.isReactWarning = true, Object.defineProperty(c, "key", {
        get: A,
        configurable: true
      });
    }
    function d() {
      var c = e(this.type);
      return ct[c] || (ct[c] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), c = this.props.ref, c !== void 0 ? c : null;
    }
    function h(c, g, A, Z, we, le, J, he) {
      return A = le.ref, c = {
        $$typeof: y,
        type: c,
        key: g,
        props: le,
        _owner: we
      }, (A !== void 0 ? A : null) !== null ? Object.defineProperty(c, "ref", {
        enumerable: false,
        get: d
      }) : Object.defineProperty(c, "ref", { enumerable: false, value: null }), c._store = {}, Object.defineProperty(c._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      }), Object.defineProperty(c, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      }), Object.defineProperty(c, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: J
      }), Object.defineProperty(c, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: he
      }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
    }
    function m(c, g, A, Z, we, le, J, he) {
      var q = g.children;
      if (q !== void 0)
        if (Z)
          if (Ct(q)) {
            for (Z = 0; Z < q.length; Z++)
              D(q[Z]);
            Object.freeze && Object.freeze(q);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else
          D(q);
      if (ut.call(g, "key")) {
        q = e(c);
        var Ae = Object.keys(g).filter(function(ma) {
          return ma !== "key";
        });
        Z = 0 < Ae.length ? "{key: someKey, " + Ae.join(": ..., ") + ": ...}" : "{key: someKey}", mt[q + Z] || (Ae = 0 < Ae.length ? "{" + Ae.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          Z,
          q,
          Ae,
          q
        ), mt[q + Z] = true);
      }
      if (q = null, A !== void 0 && (a(A), q = "" + A), i(g) && (a(g.key), q = "" + g.key), "key" in g) {
        A = {};
        for (var yt in g)
          yt !== "key" && (A[yt] = g[yt]);
      } else
        A = g;
      return q && o(
        A,
        typeof c == "function" ? c.displayName || c.name || "Unknown" : c
      ), h(
        c,
        q,
        le,
        we,
        s(),
        A,
        J,
        he
      );
    }
    function D(c) {
      typeof c == "object" && c !== null && c.$$typeof === y && c._store && (c._store.validated = 1);
    }
    var v = React, y = Symbol.for("react.transitional.element"), k = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), V = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), te = Symbol.for("react.consumer"), Q = Symbol.for("react.context"), ae = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), Fe = Symbol.for("react.activity"), He = Symbol.for("react.client.reference"), Be = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ut = Object.prototype.hasOwnProperty, Ct = Array.isArray, Je = console.createTask ? console.createTask : function() {
      return null;
    };
    v = {
      "react-stack-bottom-frame": function(c) {
        return c();
      }
    };
    var dt, ct = {}, ft = v["react-stack-bottom-frame"].bind(
      v,
      n
    )(), ht = Je(r(n)), mt = {};
    Tt.Fragment = W, Tt.jsx = function(c, g, A, Z, we) {
      var le = 1e4 > Be.recentlyCreatedOwnerStacks++;
      return m(
        c,
        g,
        A,
        false,
        Z,
        we,
        le ? Error("react-stack-top-frame") : ft,
        le ? Je(r(c)) : ht
      );
    }, Tt.jsxs = function(c, g, A, Z, we) {
      var le = 1e4 > Be.recentlyCreatedOwnerStacks++;
      return m(
        c,
        g,
        A,
        true,
        Z,
        we,
        le ? Error("react-stack-top-frame") : ft,
        le ? Je(r(c)) : ht
      );
    };
  }()), Tt;
}
process.env.NODE_ENV === "production" ? ga.exports = mn() : ga.exports = yn();
var w = ga.exports;
//! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Pr;
function l() {
  return Pr.apply(null, arguments);
}
function Dn(e) {
  Pr = e;
}
function De(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function ze(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function C(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ia(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (C(e, t))
      return false;
  return true;
}
function se(e) {
  return e === void 0;
}
function Re(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function Nt(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Cr(e, t) {
  var a = [], r, s = e.length;
  for (r = 0; r < s; ++r)
    a.push(t(e[r], r));
  return a;
}
function je(e, t) {
  for (var a in t)
    C(t, a) && (e[a] = t[a]);
  return C(t, "toString") && (e.toString = t.toString), C(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ke(e, t, a, r) {
  return rs(e, t, a, r, true).utc();
}
function vn() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function Y(e) {
  return e._pf == null && (e._pf = vn()), e._pf;
}
var Ya;
Array.prototype.some ? Ya = Array.prototype.some : Ya = function(e) {
  var t = Object(this), a = t.length >>> 0, r;
  for (r = 0; r < a; r++)
    if (r in t && e.call(this, t[r], r, t))
      return true;
  return false;
};
function ja(e) {
  var t = null, a = false, r = e._d && !isNaN(e._d.getTime());
  if (r && (t = Y(e), a = Ya.call(t.parsedDateParts, function(s) {
    return s != null;
  }), r = t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && a), e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(e))
    e._isValid = r;
  else
    return r;
  return e._isValid;
}
function ra(e) {
  var t = ke(NaN);
  return e != null ? je(Y(t), e) : Y(t).userInvalidated = true, t;
}
var Tr = l.momentProperties = [], _a = false;
function La(e, t) {
  var a, r, s, n = Tr.length;
  if (se(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), se(t._i) || (e._i = t._i), se(t._f) || (e._f = t._f), se(t._l) || (e._l = t._l), se(t._strict) || (e._strict = t._strict), se(t._tzm) || (e._tzm = t._tzm), se(t._isUTC) || (e._isUTC = t._isUTC), se(t._offset) || (e._offset = t._offset), se(t._pf) || (e._pf = Y(t)), se(t._locale) || (e._locale = t._locale), n > 0)
    for (a = 0; a < n; a++)
      r = Tr[a], s = t[r], se(s) || (e[r] = s);
  return e;
}
function Rt(e) {
  La(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), _a === false && (_a = true, l.updateOffset(this), _a = false);
}
function ve(e) {
  return e instanceof Rt || e != null && e._isAMomentObject != null;
}
function Fr(e) {
  l.suppressDeprecationWarnings === false && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function ce(e, t) {
  var a = true;
  return je(function() {
    if (l.deprecationHandler != null && l.deprecationHandler(null, e), a) {
      var r = [], s, n, i, o = arguments.length;
      for (n = 0; n < o; n++) {
        if (s = "", typeof arguments[n] == "object") {
          s += `
[` + n + "] ";
          for (i in arguments[0])
            C(arguments[0], i) && (s += i + ": " + arguments[0][i] + ", ");
          s = s.slice(0, -2);
        } else
          s = arguments[n];
        r.push(s);
      }
      Fr(
        e + `
Arguments: ` + Array.prototype.slice.call(r).join("") + `
` + new Error().stack
      ), a = false;
    }
    return t.apply(this, arguments);
  }, t);
}
var _r = {};
function Ar(e, t) {
  l.deprecationHandler != null && l.deprecationHandler(e, t), _r[e] || (Fr(t), _r[e] = true);
}
l.suppressDeprecationWarnings = false;
l.deprecationHandler = null;
function Se(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function pn(e) {
  var t, a;
  for (a in e)
    C(e, a) && (t = e[a], Se(t) ? this[a] = t : this["_" + a] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function ba(e, t) {
  var a = je({}, e), r;
  for (r in t)
    C(t, r) && (ze(e[r]) && ze(t[r]) ? (a[r] = {}, je(a[r], e[r]), je(a[r], t[r])) : t[r] != null ? a[r] = t[r] : delete a[r]);
  for (r in e)
    C(e, r) && !C(t, r) && ze(e[r]) && (a[r] = je({}, a[r]));
  return a;
}
function $a(e) {
  e != null && this.set(e);
}
var xa;
Object.keys ? xa = Object.keys : xa = function(e) {
  var t, a = [];
  for (t in e)
    C(e, t) && a.push(t);
  return a;
};
var wn = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Tn(e, t, a) {
  var r = this._calendar[e] || this._calendar.sameElse;
  return Se(r) ? r.call(t, a) : r;
}
function _e(e, t, a) {
  var r = "" + Math.abs(e), s = t - r.length, n = e >= 0;
  return (n ? a ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + r;
}
var Ua = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, jt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, ka = {}, rt = {};
function O(e, t, a, r) {
  var s = r;
  typeof r == "string" && (s = function() {
    return this[r]();
  }), e && (rt[e] = s), t && (rt[t[0]] = function() {
    return _e(s.apply(this, arguments), t[1], t[2]);
  }), a && (rt[a] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function _n(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function kn(e) {
  var t = e.match(Ua), a, r;
  for (a = 0, r = t.length; a < r; a++)
    rt[t[a]] ? t[a] = rt[t[a]] : t[a] = _n(t[a]);
  return function(s) {
    var n = "", i;
    for (i = 0; i < r; i++)
      n += Se(t[i]) ? t[i].call(s, e) : t[i];
    return n;
  };
}
function Ht(e, t) {
  return e.isValid() ? (t = Wr(t, e.localeData()), ka[t] = ka[t] || kn(t), ka[t](e)) : e.localeData().invalidDate();
}
function Wr(e, t) {
  var a = 5;
  function r(s) {
    return t.longDateFormat(s) || s;
  }
  for (jt.lastIndex = 0; a >= 0 && jt.test(e); )
    e = e.replace(
      jt,
      r
    ), jt.lastIndex = 0, a -= 1;
  return e;
}
var Sn = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function On(e) {
  var t = this._longDateFormat[e], a = this._longDateFormat[e.toUpperCase()];
  return t || !a ? t : (this._longDateFormat[e] = a.match(Ua).map(function(r) {
    return r === "MMMM" || r === "MM" || r === "DD" || r === "dddd" ? r.slice(1) : r;
  }).join(""), this._longDateFormat[e]);
}
var Mn = "Invalid date";
function gn() {
  return this._invalidDate;
}
var Yn = "%d", bn = /\d{1,2}/;
function xn(e) {
  return this._ordinal.replace("%d", e);
}
var Nn = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function Rn(e, t, a, r) {
  var s = this._relativeTime[a];
  return Se(s) ? s(e, t, a, r) : s.replace(/%d/i, e);
}
function En(e, t) {
  var a = this._relativeTime[e > 0 ? "future" : "past"];
  return Se(a) ? a(t) : a.replace(/%s/i, t);
}
var kr = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function fe(e) {
  return typeof e == "string" ? kr[e] || kr[e.toLowerCase()] : void 0;
}
function Ha(e) {
  var t = {}, a, r;
  for (r in e)
    C(e, r) && (a = fe(r), a && (t[a] = e[r]));
  return t;
}
var Pn = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function Cn(e) {
  var t = [], a;
  for (a in e)
    C(e, a) && t.push({ unit: a, priority: Pn[a] });
  return t.sort(function(r, s) {
    return r.priority - s.priority;
  }), t;
}
var Ir = /\d/, ie = /\d\d/, jr = /\d{3}/, Va = /\d{4}/, sa = /[+-]?\d{6}/, L = /\d\d?/, Lr = /\d\d\d\d?/, $r = /\d\d\d\d\d\d?/, na = /\d{1,3}/, Ga = /\d{1,4}/, ia = /[+-]?\d{1,6}/, it = /\d+/, la = /[+-]?\d+/, Fn = /Z|[+-]\d\d:?\d\d/gi, oa = /Z|[+-]\d\d(?::?\d\d)?/gi, An = /[+-]?\d+(\.\d{1,3})?/, Et = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, lt = /^[1-9]\d?/, za = /^([1-9]\d|\d)/, Bt;
Bt = {};
function p(e, t, a) {
  Bt[e] = Se(t) ? t : function(r, s) {
    return r && a ? a : t;
  };
}
function Wn(e, t) {
  return C(Bt, e) ? Bt[e](t._strict, t._locale) : new RegExp(In(e));
}
function In(e) {
  return xe(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, a, r, s, n) {
        return a || r || s || n;
      }
    )
  );
}
function xe(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function oe(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function R(e) {
  var t = +e, a = 0;
  return t !== 0 && isFinite(t) && (a = oe(t)), a;
}
var Na = {};
function I(e, t) {
  var a, r = t, s;
  for (typeof e == "string" && (e = [e]), Re(t) && (r = function(n, i) {
    i[t] = R(n);
  }), s = e.length, a = 0; a < s; a++)
    Na[e[a]] = r;
}
function Pt(e, t) {
  I(e, function(a, r, s, n) {
    s._w = s._w || {}, t(a, s._w, s, n);
  });
}
function jn(e, t, a) {
  t != null && C(Na, e) && Na[e](t, a._a, a, e);
}
function ua(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
var K = 0, ge = 1, Te = 2, z = 3, ye = 4, Ye = 5, Ge = 6, Ln = 7, $n = 8;
O("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? _e(e, 4) : "+" + e;
});
O(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
O(0, ["YYYY", 4], 0, "year");
O(0, ["YYYYY", 5], 0, "year");
O(0, ["YYYYYY", 6, true], 0, "year");
p("Y", la);
p("YY", L, ie);
p("YYYY", Ga, Va);
p("YYYYY", ia, sa);
p("YYYYYY", ia, sa);
I(["YYYYY", "YYYYYY"], K);
I("YYYY", function(e, t) {
  t[K] = e.length === 2 ? l.parseTwoDigitYear(e) : R(e);
});
I("YY", function(e, t) {
  t[K] = l.parseTwoDigitYear(e);
});
I("Y", function(e, t) {
  t[K] = parseInt(e, 10);
});
function Ot(e) {
  return ua(e) ? 366 : 365;
}
l.parseTwoDigitYear = function(e) {
  return R(e) + (R(e) > 68 ? 1900 : 2e3);
};
var Ur = ot("FullYear", true);
function Un() {
  return ua(this.year());
}
function ot(e, t) {
  return function(a) {
    return a != null ? (Hr(this, e, a), l.updateOffset(this, t), this) : Mt(this, e);
  };
}
function Mt(e, t) {
  if (!e.isValid())
    return NaN;
  var a = e._d, r = e._isUTC;
  switch (t) {
    case "Milliseconds":
      return r ? a.getUTCMilliseconds() : a.getMilliseconds();
    case "Seconds":
      return r ? a.getUTCSeconds() : a.getSeconds();
    case "Minutes":
      return r ? a.getUTCMinutes() : a.getMinutes();
    case "Hours":
      return r ? a.getUTCHours() : a.getHours();
    case "Date":
      return r ? a.getUTCDate() : a.getDate();
    case "Day":
      return r ? a.getUTCDay() : a.getDay();
    case "Month":
      return r ? a.getUTCMonth() : a.getMonth();
    case "FullYear":
      return r ? a.getUTCFullYear() : a.getFullYear();
    default:
      return NaN;
  }
}
function Hr(e, t, a) {
  var r, s, n, i, o;
  if (!(!e.isValid() || isNaN(a))) {
    switch (r = e._d, s = e._isUTC, t) {
      case "Milliseconds":
        return void (s ? r.setUTCMilliseconds(a) : r.setMilliseconds(a));
      case "Seconds":
        return void (s ? r.setUTCSeconds(a) : r.setSeconds(a));
      case "Minutes":
        return void (s ? r.setUTCMinutes(a) : r.setMinutes(a));
      case "Hours":
        return void (s ? r.setUTCHours(a) : r.setHours(a));
      case "Date":
        return void (s ? r.setUTCDate(a) : r.setDate(a));
      case "FullYear":
        break;
      default:
        return;
    }
    n = a, i = e.month(), o = e.date(), o = o === 29 && i === 1 && !ua(n) ? 28 : o, s ? r.setUTCFullYear(n, i, o) : r.setFullYear(n, i, o);
  }
}
function Hn(e) {
  return e = fe(e), Se(this[e]) ? this[e]() : this;
}
function Vn(e, t) {
  if (typeof e == "object") {
    e = Ha(e);
    var a = Cn(e), r, s = a.length;
    for (r = 0; r < s; r++)
      this[a[r].unit](e[a[r].unit]);
  } else if (e = fe(e), Se(this[e]))
    return this[e](t);
  return this;
}
function Gn(e, t) {
  return (e % t + t) % t;
}
var H;
Array.prototype.indexOf ? H = Array.prototype.indexOf : H = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function Za(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var a = Gn(t, 12);
  return e += (t - a) / 12, a === 1 ? ua(e) ? 29 : 28 : 31 - a % 7 % 2;
}
O("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
O("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
O("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
p("M", L, lt);
p("MM", L, ie);
p("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
p("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
I(["M", "MM"], function(e, t) {
  t[ge] = R(e) - 1;
});
I(["MMM", "MMMM"], function(e, t, a, r) {
  var s = a._locale.monthsParse(e, r, a._strict);
  s != null ? t[ge] = s : Y(a).invalidMonth = e;
});
var zn = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Vr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Gr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Zn = Et, qn = Et;
function Bn(e, t) {
  return e ? De(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Gr).test(t) ? "format" : "standalone"][e.month()] : De(this._months) ? this._months : this._months.standalone;
}
function Jn(e, t) {
  return e ? De(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Gr.test(t) ? "format" : "standalone"][e.month()] : De(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Qn(e, t, a) {
  var r, s, n, i = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      n = ke([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        n,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(n, "").toLocaleLowerCase();
  return a ? t === "MMM" ? (s = H.call(this._shortMonthsParse, i), s !== -1 ? s : null) : (s = H.call(this._longMonthsParse, i), s !== -1 ? s : null) : t === "MMM" ? (s = H.call(this._shortMonthsParse, i), s !== -1 ? s : (s = H.call(this._longMonthsParse, i), s !== -1 ? s : null)) : (s = H.call(this._longMonthsParse, i), s !== -1 ? s : (s = H.call(this._shortMonthsParse, i), s !== -1 ? s : null));
}
function Xn(e, t, a) {
  var r, s, n;
  if (this._monthsParseExact)
    return Qn.call(this, e, t, a);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++) {
    if (s = ke([2e3, r]), a && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp(
      "^" + this.months(s, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[r] = new RegExp(
      "^" + this.monthsShort(s, "").replace(".", "") + "$",
      "i"
    )), !a && !this._monthsParse[r] && (n = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[r] = new RegExp(n.replace(".", ""), "i")), a && t === "MMMM" && this._longMonthsParse[r].test(e))
      return r;
    if (a && t === "MMM" && this._shortMonthsParse[r].test(e))
      return r;
    if (!a && this._monthsParse[r].test(e))
      return r;
  }
}
function zr(e, t) {
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = R(t);
    else if (t = e.localeData().monthsParse(t), !Re(t))
      return e;
  }
  var a = t, r = e.date();
  return r = r < 29 ? r : Math.min(r, Za(e.year(), a)), e._isUTC ? e._d.setUTCMonth(a, r) : e._d.setMonth(a, r), e;
}
function Zr(e) {
  return e != null ? (zr(this, e), l.updateOffset(this, true), this) : Mt(this, "Month");
}
function Kn() {
  return Za(this.year(), this.month());
}
function ei(e) {
  return this._monthsParseExact ? (C(this, "_monthsRegex") || qr.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (C(this, "_monthsShortRegex") || (this._monthsShortRegex = Zn), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function ti(e) {
  return this._monthsParseExact ? (C(this, "_monthsRegex") || qr.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (C(this, "_monthsRegex") || (this._monthsRegex = qn), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function qr() {
  function e(d, h) {
    return h.length - d.length;
  }
  var t = [], a = [], r = [], s, n, i, o;
  for (s = 0; s < 12; s++)
    n = ke([2e3, s]), i = xe(this.monthsShort(n, "")), o = xe(this.months(n, "")), t.push(i), a.push(o), r.push(o), r.push(i);
  t.sort(e), a.sort(e), r.sort(e), this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + a.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function ai(e, t, a, r, s, n, i) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, a, r, s, n, i), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, a, r, s, n, i), o;
}
function gt(e) {
  var t, a;
  return e < 100 && e >= 0 ? (a = Array.prototype.slice.call(arguments), a[0] = e + 400, t = new Date(Date.UTC.apply(null, a)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function Jt(e, t, a) {
  var r = 7 + t - a, s = (7 + gt(e, 0, r).getUTCDay() - t) % 7;
  return -s + r - 1;
}
function Br(e, t, a, r, s) {
  var n = (7 + a - r) % 7, i = Jt(e, r, s), o = 1 + 7 * (t - 1) + n + i, d, h;
  return o <= 0 ? (d = e - 1, h = Ot(d) + o) : o > Ot(e) ? (d = e + 1, h = o - Ot(e)) : (d = e, h = o), {
    year: d,
    dayOfYear: h
  };
}
function Yt(e, t, a) {
  var r = Jt(e.year(), t, a), s = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, n, i;
  return s < 1 ? (i = e.year() - 1, n = s + Ne(i, t, a)) : s > Ne(e.year(), t, a) ? (n = s - Ne(e.year(), t, a), i = e.year() + 1) : (i = e.year(), n = s), {
    week: n,
    year: i
  };
}
function Ne(e, t, a) {
  var r = Jt(e, t, a), s = Jt(e + 1, t, a);
  return (Ot(e) - r + s) / 7;
}
O("w", ["ww", 2], "wo", "week");
O("W", ["WW", 2], "Wo", "isoWeek");
p("w", L, lt);
p("ww", L, ie);
p("W", L, lt);
p("WW", L, ie);
Pt(
  ["w", "ww", "W", "WW"],
  function(e, t, a, r) {
    t[r.substr(0, 1)] = R(e);
  }
);
function ri(e) {
  return Yt(e, this._week.dow, this._week.doy).week;
}
var si = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function ni() {
  return this._week.dow;
}
function ii() {
  return this._week.doy;
}
function li(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function oi(e) {
  var t = Yt(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
O("d", 0, "do", "day");
O("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
O("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
O("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
O("e", 0, 0, "weekday");
O("E", 0, 0, "isoWeekday");
p("d", L);
p("e", L);
p("E", L);
p("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
p("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
p("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
Pt(["dd", "ddd", "dddd"], function(e, t, a, r) {
  var s = a._locale.weekdaysParse(e, r, a._strict);
  s != null ? t.d = s : Y(a).invalidWeekday = e;
});
Pt(["d", "e", "E"], function(e, t, a, r) {
  t[r] = R(e);
});
function ui(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function di(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function qa(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var ci = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Jr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), fi = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), hi = Et, mi = Et, yi = Et;
function Di(e, t) {
  var a = De(this._weekdays) ? this._weekdays : this._weekdays[e && e !== true && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === true ? qa(a, this._week.dow) : e ? a[e.day()] : a;
}
function vi(e) {
  return e === true ? qa(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function pi(e) {
  return e === true ? qa(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function wi(e, t, a) {
  var r, s, n, i = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      n = ke([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        n,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        n,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(n, "").toLocaleLowerCase();
  return a ? t === "dddd" ? (s = H.call(this._weekdaysParse, i), s !== -1 ? s : null) : t === "ddd" ? (s = H.call(this._shortWeekdaysParse, i), s !== -1 ? s : null) : (s = H.call(this._minWeekdaysParse, i), s !== -1 ? s : null) : t === "dddd" ? (s = H.call(this._weekdaysParse, i), s !== -1 || (s = H.call(this._shortWeekdaysParse, i), s !== -1) ? s : (s = H.call(this._minWeekdaysParse, i), s !== -1 ? s : null)) : t === "ddd" ? (s = H.call(this._shortWeekdaysParse, i), s !== -1 || (s = H.call(this._weekdaysParse, i), s !== -1) ? s : (s = H.call(this._minWeekdaysParse, i), s !== -1 ? s : null)) : (s = H.call(this._minWeekdaysParse, i), s !== -1 || (s = H.call(this._weekdaysParse, i), s !== -1) ? s : (s = H.call(this._shortWeekdaysParse, i), s !== -1 ? s : null));
}
function Ti(e, t, a) {
  var r, s, n;
  if (this._weekdaysParseExact)
    return wi.call(this, e, t, a);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; r < 7; r++) {
    if (s = ke([2e3, 1]).day(r), a && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp(
      "^" + this.weekdays(s, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[r] || (n = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[r] = new RegExp(n.replace(".", ""), "i")), a && t === "dddd" && this._fullWeekdaysParse[r].test(e))
      return r;
    if (a && t === "ddd" && this._shortWeekdaysParse[r].test(e))
      return r;
    if (a && t === "dd" && this._minWeekdaysParse[r].test(e))
      return r;
    if (!a && this._weekdaysParse[r].test(e))
      return r;
  }
}
function _i(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = Mt(this, "Day");
  return e != null ? (e = ui(e, this.localeData()), this.add(e - t, "d")) : t;
}
function ki(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Si(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = di(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Oi(e) {
  return this._weekdaysParseExact ? (C(this, "_weekdaysRegex") || Ba.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (C(this, "_weekdaysRegex") || (this._weekdaysRegex = hi), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Mi(e) {
  return this._weekdaysParseExact ? (C(this, "_weekdaysRegex") || Ba.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (C(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = mi), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function gi(e) {
  return this._weekdaysParseExact ? (C(this, "_weekdaysRegex") || Ba.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (C(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = yi), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Ba() {
  function e(m, D) {
    return D.length - m.length;
  }
  var t = [], a = [], r = [], s = [], n, i, o, d, h;
  for (n = 0; n < 7; n++)
    i = ke([2e3, 1]).day(n), o = xe(this.weekdaysMin(i, "")), d = xe(this.weekdaysShort(i, "")), h = xe(this.weekdays(i, "")), t.push(o), a.push(d), r.push(h), s.push(o), s.push(d), s.push(h);
  t.sort(e), a.sort(e), r.sort(e), s.sort(e), this._weekdaysRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + a.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function Ja() {
  return this.hours() % 12 || 12;
}
function Yi() {
  return this.hours() || 24;
}
O("H", ["HH", 2], 0, "hour");
O("h", ["hh", 2], 0, Ja);
O("k", ["kk", 2], 0, Yi);
O("hmm", 0, 0, function() {
  return "" + Ja.apply(this) + _e(this.minutes(), 2);
});
O("hmmss", 0, 0, function() {
  return "" + Ja.apply(this) + _e(this.minutes(), 2) + _e(this.seconds(), 2);
});
O("Hmm", 0, 0, function() {
  return "" + this.hours() + _e(this.minutes(), 2);
});
O("Hmmss", 0, 0, function() {
  return "" + this.hours() + _e(this.minutes(), 2) + _e(this.seconds(), 2);
});
function Qr(e, t) {
  O(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Qr("a", true);
Qr("A", false);
function Xr(e, t) {
  return t._meridiemParse;
}
p("a", Xr);
p("A", Xr);
p("H", L, za);
p("h", L, lt);
p("k", L, lt);
p("HH", L, ie);
p("hh", L, ie);
p("kk", L, ie);
p("hmm", Lr);
p("hmmss", $r);
p("Hmm", Lr);
p("Hmmss", $r);
I(["H", "HH"], z);
I(["k", "kk"], function(e, t, a) {
  var r = R(e);
  t[z] = r === 24 ? 0 : r;
});
I(["a", "A"], function(e, t, a) {
  a._isPm = a._locale.isPM(e), a._meridiem = e;
});
I(["h", "hh"], function(e, t, a) {
  t[z] = R(e), Y(a).bigHour = true;
});
I("hmm", function(e, t, a) {
  var r = e.length - 2;
  t[z] = R(e.substr(0, r)), t[ye] = R(e.substr(r)), Y(a).bigHour = true;
});
I("hmmss", function(e, t, a) {
  var r = e.length - 4, s = e.length - 2;
  t[z] = R(e.substr(0, r)), t[ye] = R(e.substr(r, 2)), t[Ye] = R(e.substr(s)), Y(a).bigHour = true;
});
I("Hmm", function(e, t, a) {
  var r = e.length - 2;
  t[z] = R(e.substr(0, r)), t[ye] = R(e.substr(r));
});
I("Hmmss", function(e, t, a) {
  var r = e.length - 4, s = e.length - 2;
  t[z] = R(e.substr(0, r)), t[ye] = R(e.substr(r, 2)), t[Ye] = R(e.substr(s));
});
function bi(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var xi = /[ap]\.?m?\.?/i, Ni = ot("Hours", true);
function Ri(e, t, a) {
  return e > 11 ? a ? "pm" : "PM" : a ? "am" : "AM";
}
var Kr = {
  calendar: wn,
  longDateFormat: Sn,
  invalidDate: Mn,
  ordinal: Yn,
  dayOfMonthOrdinalParse: bn,
  relativeTime: Nn,
  months: zn,
  monthsShort: Vr,
  week: si,
  weekdays: ci,
  weekdaysMin: fi,
  weekdaysShort: Jr,
  meridiemParse: xi
}, $ = {}, _t = {}, bt;
function Ei(e, t) {
  var a, r = Math.min(e.length, t.length);
  for (a = 0; a < r; a += 1)
    if (e[a] !== t[a])
      return a;
  return r;
}
function Sr(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Pi(e) {
  for (var t = 0, a, r, s, n; t < e.length; ) {
    for (n = Sr(e[t]).split("-"), a = n.length, r = Sr(e[t + 1]), r = r ? r.split("-") : null; a > 0; ) {
      if (s = da(n.slice(0, a).join("-")), s)
        return s;
      if (r && r.length >= a && Ei(n, r) >= a - 1)
        break;
      a--;
    }
    t++;
  }
  return bt;
}
function Ci(e) {
  return !!(e && e.match("^[^/\\\\]*$"));
}
function da(e) {
  var t = null, a;
  if ($[e] === void 0 && typeof module < "u" && module && module.exports && Ci(e))
    try {
      t = bt._abbr, a = require, a("./locale/" + e), Ue(t);
    } catch {
      $[e] = null;
    }
  return $[e];
}
function Ue(e, t) {
  var a;
  return e && (se(t) ? a = Ee(e) : a = Qa(e, t), a ? bt = a : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), bt._abbr;
}
function Qa(e, t) {
  if (t !== null) {
    var a, r = Kr;
    if (t.abbr = e, $[e] != null)
      Ar(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), r = $[e]._config;
    else if (t.parentLocale != null)
      if ($[t.parentLocale] != null)
        r = $[t.parentLocale]._config;
      else if (a = da(t.parentLocale), a != null)
        r = a._config;
      else
        return _t[t.parentLocale] || (_t[t.parentLocale] = []), _t[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return $[e] = new $a(ba(r, t)), _t[e] && _t[e].forEach(function(s) {
      Qa(s.name, s.config);
    }), Ue(e), $[e];
  } else
    return delete $[e], null;
}
function Fi(e, t) {
  if (t != null) {
    var a, r, s = Kr;
    $[e] != null && $[e].parentLocale != null ? $[e].set(ba($[e]._config, t)) : (r = da(e), r != null && (s = r._config), t = ba(s, t), r == null && (t.abbr = e), a = new $a(t), a.parentLocale = $[e], $[e] = a), Ue(e);
  } else
    $[e] != null && ($[e].parentLocale != null ? ($[e] = $[e].parentLocale, e === Ue() && Ue(e)) : $[e] != null && delete $[e]);
  return $[e];
}
function Ee(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return bt;
  if (!De(e)) {
    if (t = da(e), t)
      return t;
    e = [e];
  }
  return Pi(e);
}
function Ai() {
  return xa($);
}
function Xa(e) {
  var t, a = e._a;
  return a && Y(e).overflow === -2 && (t = a[ge] < 0 || a[ge] > 11 ? ge : a[Te] < 1 || a[Te] > Za(a[K], a[ge]) ? Te : a[z] < 0 || a[z] > 24 || a[z] === 24 && (a[ye] !== 0 || a[Ye] !== 0 || a[Ge] !== 0) ? z : a[ye] < 0 || a[ye] > 59 ? ye : a[Ye] < 0 || a[Ye] > 59 ? Ye : a[Ge] < 0 || a[Ge] > 999 ? Ge : -1, Y(e)._overflowDayOfYear && (t < K || t > Te) && (t = Te), Y(e)._overflowWeeks && t === -1 && (t = Ln), Y(e)._overflowWeekday && t === -1 && (t = $n), Y(e).overflow = t), e;
}
var Wi = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ii = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ji = /Z|[+-]\d\d(?::?\d\d)?/, Lt = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], Sa = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], Li = /^\/?Date\((-?\d+)/i, $i = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Ui = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function es(e) {
  var t, a, r = e._i, s = Wi.exec(r) || Ii.exec(r), n, i, o, d, h = Lt.length, m = Sa.length;
  if (s) {
    for (Y(e).iso = true, t = 0, a = h; t < a; t++)
      if (Lt[t][1].exec(s[1])) {
        i = Lt[t][0], n = Lt[t][2] !== false;
        break;
      }
    if (i == null) {
      e._isValid = false;
      return;
    }
    if (s[3]) {
      for (t = 0, a = m; t < a; t++)
        if (Sa[t][1].exec(s[3])) {
          o = (s[2] || " ") + Sa[t][0];
          break;
        }
      if (o == null) {
        e._isValid = false;
        return;
      }
    }
    if (!n && o != null) {
      e._isValid = false;
      return;
    }
    if (s[4])
      if (ji.exec(s[4]))
        d = "Z";
      else {
        e._isValid = false;
        return;
      }
    e._f = i + (o || "") + (d || ""), er(e);
  } else
    e._isValid = false;
}
function Hi(e, t, a, r, s, n) {
  var i = [
    Vi(e),
    Vr.indexOf(t),
    parseInt(a, 10),
    parseInt(r, 10),
    parseInt(s, 10)
  ];
  return n && i.push(parseInt(n, 10)), i;
}
function Vi(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Gi(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function zi(e, t, a) {
  if (e) {
    var r = Jr.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (r !== s)
      return Y(a).weekdayMismatch = true, a._isValid = false, false;
  }
  return true;
}
function Zi(e, t, a) {
  if (e)
    return Ui[e];
  if (t)
    return 0;
  var r = parseInt(a, 10), s = r % 100, n = (r - s) / 100;
  return n * 60 + s;
}
function ts(e) {
  var t = $i.exec(Gi(e._i)), a;
  if (t) {
    if (a = Hi(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !zi(t[1], a, e))
      return;
    e._a = a, e._tzm = Zi(t[8], t[9], t[10]), e._d = gt.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), Y(e).rfc2822 = true;
  } else
    e._isValid = false;
}
function qi(e) {
  var t = Li.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (es(e), e._isValid === false)
    delete e._isValid;
  else
    return;
  if (ts(e), e._isValid === false)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = false : l.createFromInputFallback(e);
}
l.createFromInputFallback = ce(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function et(e, t, a) {
  return e ?? t ?? a;
}
function Bi(e) {
  var t = new Date(l.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Ka(e) {
  var t, a, r = [], s, n, i;
  if (!e._d) {
    for (s = Bi(e), e._w && e._a[Te] == null && e._a[ge] == null && Ji(e), e._dayOfYear != null && (i = et(e._a[K], s[K]), (e._dayOfYear > Ot(i) || e._dayOfYear === 0) && (Y(e)._overflowDayOfYear = true), a = gt(i, 0, e._dayOfYear), e._a[ge] = a.getUTCMonth(), e._a[Te] = a.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = r[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[z] === 24 && e._a[ye] === 0 && e._a[Ye] === 0 && e._a[Ge] === 0 && (e._nextDay = true, e._a[z] = 0), e._d = (e._useUTC ? gt : ai).apply(
      null,
      r
    ), n = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[z] = 24), e._w && typeof e._w.d < "u" && e._w.d !== n && (Y(e).weekdayMismatch = true);
  }
}
function Ji(e) {
  var t, a, r, s, n, i, o, d, h;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (n = 1, i = 4, a = et(
    t.GG,
    e._a[K],
    Yt(j(), 1, 4).year
  ), r = et(t.W, 1), s = et(t.E, 1), (s < 1 || s > 7) && (d = true)) : (n = e._locale._week.dow, i = e._locale._week.doy, h = Yt(j(), n, i), a = et(t.gg, e._a[K], h.year), r = et(t.w, h.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (d = true)) : t.e != null ? (s = t.e + n, (t.e < 0 || t.e > 6) && (d = true)) : s = n), r < 1 || r > Ne(a, n, i) ? Y(e)._overflowWeeks = true : d != null ? Y(e)._overflowWeekday = true : (o = Br(a, r, s, n, i), e._a[K] = o.year, e._dayOfYear = o.dayOfYear);
}
l.ISO_8601 = function() {
};
l.RFC_2822 = function() {
};
function er(e) {
  if (e._f === l.ISO_8601) {
    es(e);
    return;
  }
  if (e._f === l.RFC_2822) {
    ts(e);
    return;
  }
  e._a = [], Y(e).empty = true;
  var t = "" + e._i, a, r, s, n, i, o = t.length, d = 0, h, m;
  for (s = Wr(e._f, e._locale).match(Ua) || [], m = s.length, a = 0; a < m; a++)
    n = s[a], r = (t.match(Wn(n, e)) || [])[0], r && (i = t.substr(0, t.indexOf(r)), i.length > 0 && Y(e).unusedInput.push(i), t = t.slice(
      t.indexOf(r) + r.length
    ), d += r.length), rt[n] ? (r ? Y(e).empty = false : Y(e).unusedTokens.push(n), jn(n, r, e)) : e._strict && !r && Y(e).unusedTokens.push(n);
  Y(e).charsLeftOver = o - d, t.length > 0 && Y(e).unusedInput.push(t), e._a[z] <= 12 && Y(e).bigHour === true && e._a[z] > 0 && (Y(e).bigHour = void 0), Y(e).parsedDateParts = e._a.slice(0), Y(e).meridiem = e._meridiem, e._a[z] = Qi(
    e._locale,
    e._a[z],
    e._meridiem
  ), h = Y(e).era, h !== null && (e._a[K] = e._locale.erasConvertYear(h, e._a[K])), Ka(e), Xa(e);
}
function Qi(e, t, a) {
  var r;
  return a == null ? t : e.meridiemHour != null ? e.meridiemHour(t, a) : (e.isPM != null && (r = e.isPM(a), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function Xi(e) {
  var t, a, r, s, n, i, o = false, d = e._f.length;
  if (d === 0) {
    Y(e).invalidFormat = true, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < d; s++)
    n = 0, i = false, t = La({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], er(t), ja(t) && (i = true), n += Y(t).charsLeftOver, n += Y(t).unusedTokens.length * 10, Y(t).score = n, o ? n < r && (r = n, a = t) : (r == null || n < r || i) && (r = n, a = t, i && (o = true));
  je(e, a || t);
}
function Ki(e) {
  if (!e._d) {
    var t = Ha(e._i), a = t.day === void 0 ? t.date : t.day;
    e._a = Cr(
      [t.year, t.month, a, t.hour, t.minute, t.second, t.millisecond],
      function(r) {
        return r && parseInt(r, 10);
      }
    ), Ka(e);
  }
}
function el(e) {
  var t = new Rt(Xa(as(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function as(e) {
  var t = e._i, a = e._f;
  return e._locale = e._locale || Ee(e._l), t === null || a === void 0 && t === "" ? ra({ nullInput: true }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), ve(t) ? new Rt(Xa(t)) : (Nt(t) ? e._d = t : De(a) ? Xi(e) : a ? er(e) : tl(e), ja(e) || (e._d = null), e));
}
function tl(e) {
  var t = e._i;
  se(t) ? e._d = new Date(l.now()) : Nt(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? qi(e) : De(t) ? (e._a = Cr(t.slice(0), function(a) {
    return parseInt(a, 10);
  }), Ka(e)) : ze(t) ? Ki(e) : Re(t) ? e._d = new Date(t) : l.createFromInputFallback(e);
}
function rs(e, t, a, r, s) {
  var n = {};
  return (t === true || t === false) && (r = t, t = void 0), (a === true || a === false) && (r = a, a = void 0), (ze(e) && Ia(e) || De(e) && e.length === 0) && (e = void 0), n._isAMomentObject = true, n._useUTC = n._isUTC = s, n._l = a, n._i = e, n._f = t, n._strict = r, el(n);
}
function j(e, t, a, r) {
  return rs(e, t, a, r, false);
}
var al = ce(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = j.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : ra();
  }
), rl = ce(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = j.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : ra();
  }
);
function ss(e, t) {
  var a, r;
  if (t.length === 1 && De(t[0]) && (t = t[0]), !t.length)
    return j();
  for (a = t[0], r = 1; r < t.length; ++r)
    (!t[r].isValid() || t[r][e](a)) && (a = t[r]);
  return a;
}
function sl() {
  var e = [].slice.call(arguments, 0);
  return ss("isBefore", e);
}
function nl() {
  var e = [].slice.call(arguments, 0);
  return ss("isAfter", e);
}
var il = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, kt = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function ll(e) {
  var t, a = false, r, s = kt.length;
  for (t in e)
    if (C(e, t) && !(H.call(kt, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return false;
  for (r = 0; r < s; ++r)
    if (e[kt[r]]) {
      if (a)
        return false;
      parseFloat(e[kt[r]]) !== R(e[kt[r]]) && (a = true);
    }
  return true;
}
function ol() {
  return this._isValid;
}
function ul() {
  return pe(NaN);
}
function ca(e) {
  var t = Ha(e), a = t.year || 0, r = t.quarter || 0, s = t.month || 0, n = t.week || t.isoWeek || 0, i = t.day || 0, o = t.hour || 0, d = t.minute || 0, h = t.second || 0, m = t.millisecond || 0;
  this._isValid = ll(t), this._milliseconds = +m + h * 1e3 + // 1000
  d * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +i + n * 7, this._months = +s + r * 3 + a * 12, this._data = {}, this._locale = Ee(), this._bubble();
}
function Vt(e) {
  return e instanceof ca;
}
function Ra(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function dl(e, t, a) {
  var r = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), n = 0, i;
  for (i = 0; i < r; i++)
    R(e[i]) !== R(t[i]) && n++;
  return n + s;
}
function ns(e, t) {
  O(e, 0, 0, function() {
    var a = this.utcOffset(), r = "+";
    return a < 0 && (a = -a, r = "-"), r + _e(~~(a / 60), 2) + t + _e(~~a % 60, 2);
  });
}
ns("Z", ":");
ns("ZZ", "");
p("Z", oa);
p("ZZ", oa);
I(["Z", "ZZ"], function(e, t, a) {
  a._useUTC = true, a._tzm = tr(oa, e);
});
var cl = /([\+\-]|\d\d)/gi;
function tr(e, t) {
  var a = (t || "").match(e), r, s, n;
  return a === null ? null : (r = a[a.length - 1] || [], s = (r + "").match(cl) || ["-", 0, 0], n = +(s[1] * 60) + R(s[2]), n === 0 ? 0 : s[0] === "+" ? n : -n);
}
function ar(e, t) {
  var a, r;
  return t._isUTC ? (a = t.clone(), r = (ve(e) || Nt(e) ? e.valueOf() : j(e).valueOf()) - a.valueOf(), a._d.setTime(a._d.valueOf() + r), l.updateOffset(a, false), a) : j(e).local();
}
function Ea(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
l.updateOffset = function() {
};
function fl(e, t, a) {
  var r = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = tr(oa, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !a && (e = e * 60);
    return !this._isUTC && t && (s = Ea(this)), this._offset = e, this._isUTC = true, s != null && this.add(s, "m"), r !== e && (!t || this._changeInProgress ? os(
      this,
      pe(e - r, "m"),
      1,
      false
    ) : this._changeInProgress || (this._changeInProgress = true, l.updateOffset(this, true), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? r : Ea(this);
}
function hl(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function ml(e) {
  return this.utcOffset(0, e);
}
function yl(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = false, e && this.subtract(Ea(this), "m")), this;
}
function Dl() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, false, true);
  else if (typeof this._i == "string") {
    var e = tr(Fn, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, true);
  }
  return this;
}
function vl(e) {
  return this.isValid() ? (e = e ? j(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : false;
}
function pl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function wl() {
  if (!se(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return La(e, this), e = as(e), e._a ? (t = e._isUTC ? ke(e._a) : j(e._a), this._isDSTShifted = this.isValid() && dl(e._a, t.toArray()) > 0) : this._isDSTShifted = false, this._isDSTShifted;
}
function Tl() {
  return this.isValid() ? !this._isUTC : false;
}
function _l() {
  return this.isValid() ? this._isUTC : false;
}
function is() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var kl = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Sl = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function pe(e, t) {
  var a = e, r = null, s, n, i;
  return Vt(e) ? a = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : Re(e) || !isNaN(+e) ? (a = {}, t ? a[t] = +e : a.milliseconds = +e) : (r = kl.exec(e)) ? (s = r[1] === "-" ? -1 : 1, a = {
    y: 0,
    d: R(r[Te]) * s,
    h: R(r[z]) * s,
    m: R(r[ye]) * s,
    s: R(r[Ye]) * s,
    ms: R(Ra(r[Ge] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (r = Sl.exec(e)) ? (s = r[1] === "-" ? -1 : 1, a = {
    y: Ve(r[2], s),
    M: Ve(r[3], s),
    w: Ve(r[4], s),
    d: Ve(r[5], s),
    h: Ve(r[6], s),
    m: Ve(r[7], s),
    s: Ve(r[8], s)
  }) : a == null ? a = {} : typeof a == "object" && ("from" in a || "to" in a) && (i = Ol(
    j(a.from),
    j(a.to)
  ), a = {}, a.ms = i.milliseconds, a.M = i.months), n = new ca(a), Vt(e) && C(e, "_locale") && (n._locale = e._locale), Vt(e) && C(e, "_isValid") && (n._isValid = e._isValid), n;
}
pe.fn = ca.prototype;
pe.invalid = ul;
function Ve(e, t) {
  var a = e && parseFloat(e.replace(",", "."));
  return (isNaN(a) ? 0 : a) * t;
}
function Or(e, t) {
  var a = {};
  return a.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(a.months, "M").isAfter(t) && --a.months, a.milliseconds = +t - +e.clone().add(a.months, "M"), a;
}
function Ol(e, t) {
  var a;
  return e.isValid() && t.isValid() ? (t = ar(t, e), e.isBefore(t) ? a = Or(e, t) : (a = Or(t, e), a.milliseconds = -a.milliseconds, a.months = -a.months), a) : { milliseconds: 0, months: 0 };
}
function ls(e, t) {
  return function(a, r) {
    var s, n;
    return r !== null && !isNaN(+r) && (Ar(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), n = a, a = r, r = n), s = pe(a, r), os(this, s, e), this;
  };
}
function os(e, t, a, r) {
  var s = t._milliseconds, n = Ra(t._days), i = Ra(t._months);
  e.isValid() && (r = r ?? true, i && zr(e, Mt(e, "Month") + i * a), n && Hr(e, "Date", Mt(e, "Date") + n * a), s && e._d.setTime(e._d.valueOf() + s * a), r && l.updateOffset(e, n || i));
}
var Ml = ls(1, "add"), gl = ls(-1, "subtract");
function us(e) {
  return typeof e == "string" || e instanceof String;
}
function Yl(e) {
  return ve(e) || Nt(e) || us(e) || Re(e) || xl(e) || bl(e) || e === null || e === void 0;
}
function bl(e) {
  var t = ze(e) && !Ia(e), a = false, r = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], s, n, i = r.length;
  for (s = 0; s < i; s += 1)
    n = r[s], a = a || C(e, n);
  return t && a;
}
function xl(e) {
  var t = De(e), a = false;
  return t && (a = e.filter(function(r) {
    return !Re(r) && us(e);
  }).length === 0), t && a;
}
function Nl(e) {
  var t = ze(e) && !Ia(e), a = false, r = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], s, n;
  for (s = 0; s < r.length; s += 1)
    n = r[s], a = a || C(e, n);
  return t && a;
}
function Rl(e, t) {
  var a = e.diff(t, "days", true);
  return a < -6 ? "sameElse" : a < -1 ? "lastWeek" : a < 0 ? "lastDay" : a < 1 ? "sameDay" : a < 2 ? "nextDay" : a < 7 ? "nextWeek" : "sameElse";
}
function El(e, t) {
  arguments.length === 1 && (arguments[0] ? Yl(arguments[0]) ? (e = arguments[0], t = void 0) : Nl(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var a = e || j(), r = ar(a, this).startOf("day"), s = l.calendarFormat(this, r) || "sameElse", n = t && (Se(t[s]) ? t[s].call(this, a) : t[s]);
  return this.format(
    n || this.localeData().calendar(s, this, j(a))
  );
}
function Pl() {
  return new Rt(this);
}
function Cl(e, t) {
  var a = ve(e) ? e : j(e);
  return this.isValid() && a.isValid() ? (t = fe(t) || "millisecond", t === "millisecond" ? this.valueOf() > a.valueOf() : a.valueOf() < this.clone().startOf(t).valueOf()) : false;
}
function Fl(e, t) {
  var a = ve(e) ? e : j(e);
  return this.isValid() && a.isValid() ? (t = fe(t) || "millisecond", t === "millisecond" ? this.valueOf() < a.valueOf() : this.clone().endOf(t).valueOf() < a.valueOf()) : false;
}
function Al(e, t, a, r) {
  var s = ve(e) ? e : j(e), n = ve(t) ? t : j(t);
  return this.isValid() && s.isValid() && n.isValid() ? (r = r || "()", (r[0] === "(" ? this.isAfter(s, a) : !this.isBefore(s, a)) && (r[1] === ")" ? this.isBefore(n, a) : !this.isAfter(n, a))) : false;
}
function Wl(e, t) {
  var a = ve(e) ? e : j(e), r;
  return this.isValid() && a.isValid() ? (t = fe(t) || "millisecond", t === "millisecond" ? this.valueOf() === a.valueOf() : (r = a.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf())) : false;
}
function Il(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function jl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Ll(e, t, a) {
  var r, s, n;
  if (!this.isValid())
    return NaN;
  if (r = ar(e, this), !r.isValid())
    return NaN;
  switch (s = (r.utcOffset() - this.utcOffset()) * 6e4, t = fe(t), t) {
    case "year":
      n = Gt(this, r) / 12;
      break;
    case "month":
      n = Gt(this, r);
      break;
    case "quarter":
      n = Gt(this, r) / 3;
      break;
    case "second":
      n = (this - r) / 1e3;
      break;
    case "minute":
      n = (this - r) / 6e4;
      break;
    case "hour":
      n = (this - r) / 36e5;
      break;
    case "day":
      n = (this - r - s) / 864e5;
      break;
    case "week":
      n = (this - r - s) / 6048e5;
      break;
    default:
      n = this - r;
  }
  return a ? n : oe(n);
}
function Gt(e, t) {
  if (e.date() < t.date())
    return -Gt(t, e);
  var a = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(a, "months"), s, n;
  return t - r < 0 ? (s = e.clone().add(a - 1, "months"), n = (t - r) / (r - s)) : (s = e.clone().add(a + 1, "months"), n = (t - r) / (s - r)), -(a + n) || 0;
}
l.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
l.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function $l() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function Ul(e) {
  if (!this.isValid())
    return null;
  var t = e !== true, a = t ? this.clone().utc() : this;
  return a.year() < 0 || a.year() > 9999 ? Ht(
    a,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : Se(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Ht(a, "Z")) : Ht(
    a,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Hl() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", a, r, s, n;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), a = "[" + e + '("]', r = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", n = t + '[")]', this.format(a + r + s + n);
}
function Vl(e) {
  e || (e = this.isUtc() ? l.defaultFormatUtc : l.defaultFormat);
  var t = Ht(this, e);
  return this.localeData().postformat(t);
}
function Gl(e, t) {
  return this.isValid() && (ve(e) && e.isValid() || j(e).isValid()) ? pe({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function zl(e) {
  return this.from(j(), e);
}
function Zl(e, t) {
  return this.isValid() && (ve(e) && e.isValid() || j(e).isValid()) ? pe({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function ql(e) {
  return this.to(j(), e);
}
function ds(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = Ee(e), t != null && (this._locale = t), this);
}
var cs = ce(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function fs() {
  return this._locale;
}
var Qt = 1e3, st = 60 * Qt, Xt = 60 * st, hs = (365 * 400 + 97) * 24 * Xt;
function nt(e, t) {
  return (e % t + t) % t;
}
function ms(e, t, a) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, a) - hs : new Date(e, t, a).valueOf();
}
function ys(e, t, a) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, a) - hs : Date.UTC(e, t, a);
}
function Bl(e) {
  var t, a;
  if (e = fe(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (a = this._isUTC ? ys : ms, e) {
    case "year":
      t = a(this.year(), 0, 1);
      break;
    case "quarter":
      t = a(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = a(this.year(), this.month(), 1);
      break;
    case "week":
      t = a(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = a(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = a(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= nt(
        t + (this._isUTC ? 0 : this.utcOffset() * st),
        Xt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= nt(t, st);
      break;
    case "second":
      t = this._d.valueOf(), t -= nt(t, Qt);
      break;
  }
  return this._d.setTime(t), l.updateOffset(this, true), this;
}
function Jl(e) {
  var t, a;
  if (e = fe(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (a = this._isUTC ? ys : ms, e) {
    case "year":
      t = a(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = a(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = a(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = a(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = a(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = a(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += Xt - nt(
        t + (this._isUTC ? 0 : this.utcOffset() * st),
        Xt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += st - nt(t, st) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Qt - nt(t, Qt) - 1;
      break;
  }
  return this._d.setTime(t), l.updateOffset(this, true), this;
}
function Ql() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Xl() {
  return Math.floor(this.valueOf() / 1e3);
}
function Kl() {
  return new Date(this.valueOf());
}
function eo() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function to() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function ao() {
  return this.isValid() ? this.toISOString() : null;
}
function ro() {
  return ja(this);
}
function so() {
  return je({}, Y(this));
}
function no() {
  return Y(this).overflow;
}
function io() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
O("N", 0, 0, "eraAbbr");
O("NN", 0, 0, "eraAbbr");
O("NNN", 0, 0, "eraAbbr");
O("NNNN", 0, 0, "eraName");
O("NNNNN", 0, 0, "eraNarrow");
O("y", ["y", 1], "yo", "eraYear");
O("y", ["yy", 2], 0, "eraYear");
O("y", ["yyy", 3], 0, "eraYear");
O("y", ["yyyy", 4], 0, "eraYear");
p("N", rr);
p("NN", rr);
p("NNN", rr);
p("NNNN", po);
p("NNNNN", wo);
I(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, a, r) {
    var s = a._locale.erasParse(e, r, a._strict);
    s ? Y(a).era = s : Y(a).invalidEra = e;
  }
);
p("y", it);
p("yy", it);
p("yyy", it);
p("yyyy", it);
p("yo", To);
I(["y", "yy", "yyy", "yyyy"], K);
I(["yo"], function(e, t, a, r) {
  var s;
  a._locale._eraYearOrdinalRegex && (s = e.match(a._locale._eraYearOrdinalRegex)), a._locale.eraYearOrdinalParse ? t[K] = a._locale.eraYearOrdinalParse(e, s) : t[K] = parseInt(e, 10);
});
function lo(e, t) {
  var a, r, s, n = this._eras || Ee("en")._eras;
  for (a = 0, r = n.length; a < r; ++a) {
    switch (typeof n[a].since) {
      case "string":
        s = l(n[a].since).startOf("day"), n[a].since = s.valueOf();
        break;
    }
    switch (typeof n[a].until) {
      case "undefined":
        n[a].until = 1 / 0;
        break;
      case "string":
        s = l(n[a].until).startOf("day").valueOf(), n[a].until = s.valueOf();
        break;
    }
  }
  return n;
}
function oo(e, t, a) {
  var r, s, n = this.eras(), i, o, d;
  for (e = e.toUpperCase(), r = 0, s = n.length; r < s; ++r)
    if (i = n[r].name.toUpperCase(), o = n[r].abbr.toUpperCase(), d = n[r].narrow.toUpperCase(), a)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return n[r];
          break;
        case "NNNN":
          if (i === e)
            return n[r];
          break;
        case "NNNNN":
          if (d === e)
            return n[r];
          break;
      }
    else if ([i, o, d].indexOf(e) >= 0)
      return n[r];
}
function uo(e, t) {
  var a = e.since <= e.until ? 1 : -1;
  return t === void 0 ? l(e.since).year() : l(e.since).year() + (t - e.offset) * a;
}
function co() {
  var e, t, a, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (a = this.clone().startOf("day").valueOf(), r[e].since <= a && a <= r[e].until || r[e].until <= a && a <= r[e].since)
      return r[e].name;
  return "";
}
function fo() {
  var e, t, a, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (a = this.clone().startOf("day").valueOf(), r[e].since <= a && a <= r[e].until || r[e].until <= a && a <= r[e].since)
      return r[e].narrow;
  return "";
}
function ho() {
  var e, t, a, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (a = this.clone().startOf("day").valueOf(), r[e].since <= a && a <= r[e].until || r[e].until <= a && a <= r[e].since)
      return r[e].abbr;
  return "";
}
function mo() {
  var e, t, a, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (a = s[e].since <= s[e].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return (this.year() - l(s[e].since).year()) * a + s[e].offset;
  return this.year();
}
function yo(e) {
  return C(this, "_erasNameRegex") || sr.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Do(e) {
  return C(this, "_erasAbbrRegex") || sr.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function vo(e) {
  return C(this, "_erasNarrowRegex") || sr.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function rr(e, t) {
  return t.erasAbbrRegex(e);
}
function po(e, t) {
  return t.erasNameRegex(e);
}
function wo(e, t) {
  return t.erasNarrowRegex(e);
}
function To(e, t) {
  return t._eraYearOrdinalRegex || it;
}
function sr() {
  var e = [], t = [], a = [], r = [], s, n, i, o, d, h = this.eras();
  for (s = 0, n = h.length; s < n; ++s)
    i = xe(h[s].name), o = xe(h[s].abbr), d = xe(h[s].narrow), t.push(i), e.push(o), a.push(d), r.push(i), r.push(o), r.push(d);
  this._erasRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + a.join("|") + ")",
    "i"
  );
}
O(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
O(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function fa(e, t) {
  O(0, [e, e.length], 0, t);
}
fa("gggg", "weekYear");
fa("ggggg", "weekYear");
fa("GGGG", "isoWeekYear");
fa("GGGGG", "isoWeekYear");
p("G", la);
p("g", la);
p("GG", L, ie);
p("gg", L, ie);
p("GGGG", Ga, Va);
p("gggg", Ga, Va);
p("GGGGG", ia, sa);
p("ggggg", ia, sa);
Pt(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, a, r) {
    t[r.substr(0, 2)] = R(e);
  }
);
Pt(["gg", "GG"], function(e, t, a, r) {
  t[r] = l.parseTwoDigitYear(e);
});
function _o(e) {
  return Ds.call(
    this,
    e,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function ko(e) {
  return Ds.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function So() {
  return Ne(this.year(), 1, 4);
}
function Oo() {
  return Ne(this.isoWeekYear(), 1, 4);
}
function Mo() {
  var e = this.localeData()._week;
  return Ne(this.year(), e.dow, e.doy);
}
function go() {
  var e = this.localeData()._week;
  return Ne(this.weekYear(), e.dow, e.doy);
}
function Ds(e, t, a, r, s) {
  var n;
  return e == null ? Yt(this, r, s).year : (n = Ne(e, r, s), t > n && (t = n), Yo.call(this, e, t, a, r, s));
}
function Yo(e, t, a, r, s) {
  var n = Br(e, t, a, r, s), i = gt(n.year, 0, n.dayOfYear);
  return this.year(i.getUTCFullYear()), this.month(i.getUTCMonth()), this.date(i.getUTCDate()), this;
}
O("Q", 0, "Qo", "quarter");
p("Q", Ir);
I("Q", function(e, t) {
  t[ge] = (R(e) - 1) * 3;
});
function bo(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
O("D", ["DD", 2], "Do", "date");
p("D", L, lt);
p("DD", L, ie);
p("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
I(["D", "DD"], Te);
I("Do", function(e, t) {
  t[Te] = R(e.match(L)[0]);
});
var vs = ot("Date", true);
O("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
p("DDD", na);
p("DDDD", jr);
I(["DDD", "DDDD"], function(e, t, a) {
  a._dayOfYear = R(e);
});
function xo(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
O("m", ["mm", 2], 0, "minute");
p("m", L, za);
p("mm", L, ie);
I(["m", "mm"], ye);
var No = ot("Minutes", false);
O("s", ["ss", 2], 0, "second");
p("s", L, za);
p("ss", L, ie);
I(["s", "ss"], Ye);
var Ro = ot("Seconds", false);
O("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
O(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
O(0, ["SSS", 3], 0, "millisecond");
O(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
O(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
O(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
O(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
O(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
O(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
p("S", na, Ir);
p("SS", na, ie);
p("SSS", na, jr);
var Le, ps;
for (Le = "SSSS"; Le.length <= 9; Le += "S")
  p(Le, it);
function Eo(e, t) {
  t[Ge] = R(("0." + e) * 1e3);
}
for (Le = "S"; Le.length <= 9; Le += "S")
  I(Le, Eo);
ps = ot("Milliseconds", false);
O("z", 0, 0, "zoneAbbr");
O("zz", 0, 0, "zoneName");
function Po() {
  return this._isUTC ? "UTC" : "";
}
function Co() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var f = Rt.prototype;
f.add = Ml;
f.calendar = El;
f.clone = Pl;
f.diff = Ll;
f.endOf = Jl;
f.format = Vl;
f.from = Gl;
f.fromNow = zl;
f.to = Zl;
f.toNow = ql;
f.get = Hn;
f.invalidAt = no;
f.isAfter = Cl;
f.isBefore = Fl;
f.isBetween = Al;
f.isSame = Wl;
f.isSameOrAfter = Il;
f.isSameOrBefore = jl;
f.isValid = ro;
f.lang = cs;
f.locale = ds;
f.localeData = fs;
f.max = rl;
f.min = al;
f.parsingFlags = so;
f.set = Vn;
f.startOf = Bl;
f.subtract = gl;
f.toArray = eo;
f.toObject = to;
f.toDate = Kl;
f.toISOString = Ul;
f.inspect = Hl;
typeof Symbol < "u" && Symbol.for != null && (f[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
f.toJSON = ao;
f.toString = $l;
f.unix = Xl;
f.valueOf = Ql;
f.creationData = io;
f.eraName = co;
f.eraNarrow = fo;
f.eraAbbr = ho;
f.eraYear = mo;
f.year = Ur;
f.isLeapYear = Un;
f.weekYear = _o;
f.isoWeekYear = ko;
f.quarter = f.quarters = bo;
f.month = Zr;
f.daysInMonth = Kn;
f.week = f.weeks = li;
f.isoWeek = f.isoWeeks = oi;
f.weeksInYear = Mo;
f.weeksInWeekYear = go;
f.isoWeeksInYear = So;
f.isoWeeksInISOWeekYear = Oo;
f.date = vs;
f.day = f.days = _i;
f.weekday = ki;
f.isoWeekday = Si;
f.dayOfYear = xo;
f.hour = f.hours = Ni;
f.minute = f.minutes = No;
f.second = f.seconds = Ro;
f.millisecond = f.milliseconds = ps;
f.utcOffset = fl;
f.utc = ml;
f.local = yl;
f.parseZone = Dl;
f.hasAlignedHourOffset = vl;
f.isDST = pl;
f.isLocal = Tl;
f.isUtcOffset = _l;
f.isUtc = is;
f.isUTC = is;
f.zoneAbbr = Po;
f.zoneName = Co;
f.dates = ce(
  "dates accessor is deprecated. Use date instead.",
  vs
);
f.months = ce(
  "months accessor is deprecated. Use month instead",
  Zr
);
f.years = ce(
  "years accessor is deprecated. Use year instead",
  Ur
);
f.zone = ce(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  hl
);
f.isDSTShifted = ce(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  wl
);
function Fo(e) {
  return j(e * 1e3);
}
function Ao() {
  return j.apply(null, arguments).parseZone();
}
function ws(e) {
  return e;
}
var F = $a.prototype;
F.calendar = Tn;
F.longDateFormat = On;
F.invalidDate = gn;
F.ordinal = xn;
F.preparse = ws;
F.postformat = ws;
F.relativeTime = Rn;
F.pastFuture = En;
F.set = pn;
F.eras = lo;
F.erasParse = oo;
F.erasConvertYear = uo;
F.erasAbbrRegex = Do;
F.erasNameRegex = yo;
F.erasNarrowRegex = vo;
F.months = Bn;
F.monthsShort = Jn;
F.monthsParse = Xn;
F.monthsRegex = ti;
F.monthsShortRegex = ei;
F.week = ri;
F.firstDayOfYear = ii;
F.firstDayOfWeek = ni;
F.weekdays = Di;
F.weekdaysMin = pi;
F.weekdaysShort = vi;
F.weekdaysParse = Ti;
F.weekdaysRegex = Oi;
F.weekdaysShortRegex = Mi;
F.weekdaysMinRegex = gi;
F.isPM = bi;
F.meridiem = Ri;
function Kt(e, t, a, r) {
  var s = Ee(), n = ke().set(r, t);
  return s[a](n, e);
}
function Ts(e, t, a) {
  if (Re(e) && (t = e, e = void 0), e = e || "", t != null)
    return Kt(e, t, a, "month");
  var r, s = [];
  for (r = 0; r < 12; r++)
    s[r] = Kt(e, r, a, "month");
  return s;
}
function nr(e, t, a, r) {
  typeof e == "boolean" ? (Re(t) && (a = t, t = void 0), t = t || "") : (t = e, a = t, e = false, Re(t) && (a = t, t = void 0), t = t || "");
  var s = Ee(), n = e ? s._week.dow : 0, i, o = [];
  if (a != null)
    return Kt(t, (a + n) % 7, r, "day");
  for (i = 0; i < 7; i++)
    o[i] = Kt(t, (i + n) % 7, r, "day");
  return o;
}
function Wo(e, t) {
  return Ts(e, t, "months");
}
function Io(e, t) {
  return Ts(e, t, "monthsShort");
}
function jo(e, t, a) {
  return nr(e, t, a, "weekdays");
}
function Lo(e, t, a) {
  return nr(e, t, a, "weekdaysShort");
}
function $o(e, t, a) {
  return nr(e, t, a, "weekdaysMin");
}
Ue("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, a = R(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + a;
  }
});
l.lang = ce(
  "moment.lang is deprecated. Use moment.locale instead.",
  Ue
);
l.langData = ce(
  "moment.langData is deprecated. Use moment.localeData instead.",
  Ee
);
var Oe = Math.abs;
function Uo() {
  var e = this._data;
  return this._milliseconds = Oe(this._milliseconds), this._days = Oe(this._days), this._months = Oe(this._months), e.milliseconds = Oe(e.milliseconds), e.seconds = Oe(e.seconds), e.minutes = Oe(e.minutes), e.hours = Oe(e.hours), e.months = Oe(e.months), e.years = Oe(e.years), this;
}
function _s(e, t, a, r) {
  var s = pe(t, a);
  return e._milliseconds += r * s._milliseconds, e._days += r * s._days, e._months += r * s._months, e._bubble();
}
function Ho(e, t) {
  return _s(this, e, t, 1);
}
function Vo(e, t) {
  return _s(this, e, t, -1);
}
function Mr(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Go() {
  var e = this._milliseconds, t = this._days, a = this._months, r = this._data, s, n, i, o, d;
  return e >= 0 && t >= 0 && a >= 0 || e <= 0 && t <= 0 && a <= 0 || (e += Mr(Pa(a) + t) * 864e5, t = 0, a = 0), r.milliseconds = e % 1e3, s = oe(e / 1e3), r.seconds = s % 60, n = oe(s / 60), r.minutes = n % 60, i = oe(n / 60), r.hours = i % 24, t += oe(i / 24), d = oe(ks(t)), a += d, t -= Mr(Pa(d)), o = oe(a / 12), a %= 12, r.days = t, r.months = a, r.years = o, this;
}
function ks(e) {
  return e * 4800 / 146097;
}
function Pa(e) {
  return e * 146097 / 4800;
}
function zo(e) {
  if (!this.isValid())
    return NaN;
  var t, a, r = this._milliseconds;
  if (e = fe(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + r / 864e5, a = this._months + ks(t), e) {
      case "month":
        return a;
      case "quarter":
        return a / 3;
      case "year":
        return a / 12;
    }
  else
    switch (t = this._days + Math.round(Pa(this._months)), e) {
      case "week":
        return t / 7 + r / 6048e5;
      case "day":
        return t + r / 864e5;
      case "hour":
        return t * 24 + r / 36e5;
      case "minute":
        return t * 1440 + r / 6e4;
      case "second":
        return t * 86400 + r / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + r;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function Pe(e) {
  return function() {
    return this.as(e);
  };
}
var Ss = Pe("ms"), Zo = Pe("s"), qo = Pe("m"), Bo = Pe("h"), Jo = Pe("d"), Qo = Pe("w"), Xo = Pe("M"), Ko = Pe("Q"), eu = Pe("y"), tu = Ss;
function au() {
  return pe(this);
}
function ru(e) {
  return e = fe(e), this.isValid() ? this[e + "s"]() : NaN;
}
function qe(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var su = qe("milliseconds"), nu = qe("seconds"), iu = qe("minutes"), lu = qe("hours"), ou = qe("days"), uu = qe("months"), du = qe("years");
function cu() {
  return oe(this.days() / 7);
}
var Me = Math.round, tt = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function fu(e, t, a, r, s) {
  return s.relativeTime(t || 1, !!a, e, r);
}
function hu(e, t, a, r) {
  var s = pe(e).abs(), n = Me(s.as("s")), i = Me(s.as("m")), o = Me(s.as("h")), d = Me(s.as("d")), h = Me(s.as("M")), m = Me(s.as("w")), D = Me(s.as("y")), v = n <= a.ss && ["s", n] || n < a.s && ["ss", n] || i <= 1 && ["m"] || i < a.m && ["mm", i] || o <= 1 && ["h"] || o < a.h && ["hh", o] || d <= 1 && ["d"] || d < a.d && ["dd", d];
  return a.w != null && (v = v || m <= 1 && ["w"] || m < a.w && ["ww", m]), v = v || h <= 1 && ["M"] || h < a.M && ["MM", h] || D <= 1 && ["y"] || ["yy", D], v[2] = t, v[3] = +e > 0, v[4] = r, fu.apply(null, v);
}
function mu(e) {
  return e === void 0 ? Me : typeof e == "function" ? (Me = e, true) : false;
}
function yu(e, t) {
  return tt[e] === void 0 ? false : t === void 0 ? tt[e] : (tt[e] = t, e === "s" && (tt.ss = t - 1), true);
}
function Du(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var a = false, r = tt, s, n;
  return typeof e == "object" && (t = e, e = false), typeof e == "boolean" && (a = e), typeof t == "object" && (r = Object.assign({}, tt, t), t.s != null && t.ss == null && (r.ss = t.s - 1)), s = this.localeData(), n = hu(this, !a, r, s), a && (n = s.pastFuture(+this, n)), s.postformat(n);
}
var Oa = Math.abs;
function Xe(e) {
  return (e > 0) - (e < 0) || +e;
}
function ha() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = Oa(this._milliseconds) / 1e3, t = Oa(this._days), a = Oa(this._months), r, s, n, i, o = this.asSeconds(), d, h, m, D;
  return o ? (r = oe(e / 60), s = oe(r / 60), e %= 60, r %= 60, n = oe(a / 12), a %= 12, i = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", d = o < 0 ? "-" : "", h = Xe(this._months) !== Xe(o) ? "-" : "", m = Xe(this._days) !== Xe(o) ? "-" : "", D = Xe(this._milliseconds) !== Xe(o) ? "-" : "", d + "P" + (n ? h + n + "Y" : "") + (a ? h + a + "M" : "") + (t ? m + t + "D" : "") + (s || r || e ? "T" : "") + (s ? D + s + "H" : "") + (r ? D + r + "M" : "") + (e ? D + i + "S" : "")) : "P0D";
}
var E = ca.prototype;
E.isValid = ol;
E.abs = Uo;
E.add = Ho;
E.subtract = Vo;
E.as = zo;
E.asMilliseconds = Ss;
E.asSeconds = Zo;
E.asMinutes = qo;
E.asHours = Bo;
E.asDays = Jo;
E.asWeeks = Qo;
E.asMonths = Xo;
E.asQuarters = Ko;
E.asYears = eu;
E.valueOf = tu;
E._bubble = Go;
E.clone = au;
E.get = ru;
E.milliseconds = su;
E.seconds = nu;
E.minutes = iu;
E.hours = lu;
E.days = ou;
E.weeks = cu;
E.months = uu;
E.years = du;
E.humanize = Du;
E.toISOString = ha;
E.toString = ha;
E.toJSON = ha;
E.locale = ds;
E.localeData = fs;
E.toIsoString = ce(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  ha
);
E.lang = cs;
O("X", 0, 0, "unix");
O("x", 0, 0, "valueOf");
p("x", la);
p("X", An);
I("X", function(e, t, a) {
  a._d = new Date(parseFloat(e) * 1e3);
});
I("x", function(e, t, a) {
  a._d = new Date(R(e));
});
//! moment.js
l.version = "2.30.1";
Dn(j);
l.fn = f;
l.min = sl;
l.max = nl;
l.now = il;
l.utc = ke;
l.unix = Fo;
l.months = Wo;
l.isDate = Nt;
l.locale = Ue;
l.invalid = ra;
l.duration = pe;
l.isMoment = ve;
l.weekdays = jo;
l.parseZone = Ao;
l.localeData = Ee;
l.isDuration = Vt;
l.monthsShort = Io;
l.weekdaysMin = $o;
l.defineLocale = Qa;
l.updateLocale = Fi;
l.locales = Ai;
l.weekdaysShort = Lo;
l.normalizeUnits = fe;
l.relativeTimeRounding = mu;
l.relativeTimeThreshold = yu;
l.calendarFormat = Rl;
l.prototype = f;
l.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
var ue = /* @__PURE__ */ ((e) => (e.daily = "daily", e.weekly = "weekly", e.monthly = "monthly", e.quarterly = "quarterly", e.yearly = "yearly", e))(ue || {}), Ca = /* @__PURE__ */ ((e) => (e[e.focus = 1] = "focus", e[e.blur = 2] = "blur", e))(Ca || {});
const vu = (...e) => e, gr = vu("daily", "weekly", "monthly", "quarterly", "yearly"), Yr = "EST", zt = "MST", $t = "PST", St = "CET";
function pu() {
  return (/\((.*)\)/.exec((/* @__PURE__ */ new Date()).toString()) ?? [])[1] === "Central Europe Standard Time" ? St : zt;
}
const u = "YYYY-MM-DD", br = "00:00", xr = "23:59", Ce = {
  DEFAULT: {
    OPTIONS: {
      dateArray: [],
      startDate: l().format("YYYY-MM-DD"),
      endDate: l().format("YYYY-MM-DD"),
      minDate: l().subtract(2, "year").startOf("year").format("YYYY-MM-DD"),
      maxDate: l().format("YYYY-MM-DD"),
      startTime: br,
      endTime: xr,
      minTime: br,
      maxTime: xr
    },
    SETTINGS: {
      type: "daily",
      modelKeys: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      showTimezoneSelect: false,
      useLocalTimezone: false,
      timePicker: false,
      inputClass: "m1drp",
      inputDateFormat: "",
      viewDateFormat: u,
      outputDateFormat: u,
      singleDatePicker: false,
      componentDisabled: false,
      placeholder: "Select Date",
      showRowNumber: false,
      availableRanges: {},
      showRanges: true,
      disableWeekends: false,
      disableWeekdays: false,
      displayBeginDate: false,
      displayEndDate: false,
      ariaLabels: {
        inputField: "Date Range Input Field"
      }
    },
    STATE: {
      activeEndDate: "",
      activeItem: {
        left: {},
        right: {}
      },
      activeRange: "",
      activeStartDate: "",
      calendarAvailable: {
        left: false,
        right: false
      },
      customRange: false,
      dates: {
        left: {},
        right: {}
      },
      dateTitleText: {
        left: "",
        right: ""
      },
      frequencyColumnHeader: "",
      isCalendarVisible: false,
      isValidFilter: false,
      isUserModelChange: true,
      localTimezone: pu(),
      selectedDateText: "",
      selectedHour: {
        left: l().format("hh"),
        right: l().format("hh")
      },
      selectedMeridian: {
        left: "",
        right: ""
      },
      selectedMinute: {
        left: l().format("mm"),
        right: l().format("mm")
      },
      selectedMonth: {
        left: l().format("MMM"),
        right: l().format("MMM")
      },
      selectedTimezone: "PST",
      // Since "useLocalTimezone: false" by default;
      selectedYear: {
        left: l().format("YYYY"),
        right: l().format("YYYY")
      },
      sides: [],
      timeItems: ["hour", "minute"],
      times: {
        left: "",
        right: ""
      },
      timeZones: [Yr, zt, $t, St],
      todayTime: "",
      weekDayOptions: ["su", "mo", "tu", "we", "th", "fr", "sa"]
    },
    TIME_FORMAT: "HH:mm",
    RANGES: {
      daily: [
        { label: "Last 7 Days", count: 6 },
        { label: "Last 30 Days", count: 29 },
        { label: "Last 90 Days", count: 89 }
      ],
      weekly: [
        { label: "Last 4 Weeks", count: 3 },
        { label: "Last 13 Weeks", count: 12 },
        { label: "Last 26 Weeks", count: 25 }
      ],
      monthly: [
        { label: "Last 3 Months", count: 2 },
        { label: "Last 6 Months", count: 5 },
        { label: "Last 9 Months", count: 8 }
      ],
      quarterly: [
        { label: "Last 2 Quarters", count: 1 },
        { label: "Last 4 Quarters", count: 3 }
      ],
      yearly: [{ label: "Last Year", count: 1 }]
    }
  },
  CONSTANT: {
    MONTHS_AVAILABLE: [
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
      "Dec"
    ],
    MOMENT_CONVERSION_MAP: {
      daily: "day",
      weekly: "week",
      monthly: "month",
      quarterly: "quarter",
      yearly: "year"
    },
    USA_TZ_CODE: $t,
    TZ_NAMES: {
      [zt]: "America/Phoenix",
      [$t]: "America/Los_Angeles",
      [St]: "Europe/Berlin"
    }
  }
}, Fa = Ce.DEFAULT.TIME_FORMAT, be = Ce.CONSTANT.USA_TZ_CODE, Ke = Ce.CONSTANT.MONTHS_AVAILABLE, wu = Ce.CONSTANT.TZ_NAMES, Tu = Ce.DEFAULT.RANGES, ir = Ce.CONSTANT.MOMENT_CONVERSION_MAP, Os = () => P(Ce.DEFAULT.OPTIONS), _u = () => P(Ce.DEFAULT.SETTINGS), Nr = () => P(Ce.DEFAULT.STATE), ku = (e) => {
  if (e.type && !gr.includes(e.type)) {
    const t = `${e.type} is an invalid calendar type. It should one of ${[...gr].join(",")}`;
    throw new Error(t);
  }
}, de = (e, t) => {
  let a = null;
  if (e)
    return isNaN(Number(e)) ? a = l(e, t).format(u) : a = l(e).format(u), a;
}, $e = (e, t) => {
  let a = null;
  return e ? (e.includes(":") ? e.includes("AM") || e.includes("PM") ? a = l(gs(l().valueOf(), t), "h:mm A").format(
    Fa
  ) : a = e : console.warn(
    `WARN_NGX_DATETIME_RANGE_PICKER:
          The provided time is not in correct format.
          Format: HH:mm or hh:mm A
      `
  ), a) : null;
}, Su = (e, t) => (() => {
  switch (e) {
    case "daily":
      return `W${t}`;
    case "weekly":
      return "";
    case "monthly":
      return `Q${t}`;
    case "quarterly":
      return `${t}`;
    case "yearly":
      return "";
  }
})(), Ou = (e) => {
  const t = {}, a = e.type, r = P(e.maxDate);
  return Tu[a].forEach((s) => {
    t[s.label] = {
      startDate: l(r, u).subtract(
        s.count,
        ir[a]
      ).format(u),
      endDate: r
    };
  }), t["Custom Range"] = { startDate: null, endDate: null }, t;
}, Mu = (e) => {
  const t = [], a = e.type, r = e.dateArray, s = e.inputDateFormat;
  return r.forEach((n) => {
    if (!n)
      return;
    let i = "";
    isNaN(Number(n)) && (s ? i = s : i = l(n)._f), s !== l(n)._f && console.warn(
      `ERR_NGX_DATETIME_RANGE_PICKER:
            inputDateFormat !== dateFormat in dateArray.
            Converted dates might not be as expected
          `
    );
    const o = i ? l(n, i) : l(n);
    if (o) {
      const d = o.endOf(ir[a]).format(u);
      t.push(d);
    } else
      console.warn(
        `ERR_NGX_DATETIME_RANGE_PICKER:
            dateArray values are in unknown format.
            Pass the format or pass the dates in known format
          `
      );
  }), [...new Set(t)];
}, gu = (e) => {
  if (!e)
    return;
  const t = l(e, u).startOf("month").day(), a = Number(l(e, u).endOf("month").format("D"));
  return Math.ceil((t + a) / 7);
}, Yu = (e) => {
  if (!e)
    return;
  const t = l(e, "YYYY").startOf("year").format(u), a = l(e, "YYYY").endOf("year").format(u), r = l(a, u).startOf("week").format(u), s = l(t, u).endOf("week").format(u), n = ta(s);
  return ta(r) - n + 1;
}, bu = (e, t, a) => {
  const r = [];
  if (!e || !t || !a)
    return [];
  const s = l(e, u).startOf("month"), n = l(t, u).startOf("month");
  let i = l(s, u).valueOf(), o = l(n, u).valueOf();
  const d = l().year(a).startOf("year").valueOf(), h = l().year(a).endOf("year").valueOf();
  i < d && (i = d), o > h && (o = h);
  let m = l(i).month();
  const D = l(o).diff(l(i), "months"), v = D < Ke.length ? D : Ke.length;
  for (let y = 0; y <= v; y++)
    m >= Ke.length ? r.push(Ke[m - Ke.length]) : r.push(Ke[m]), m++;
  return r;
}, xu = (e) => {
  const t = e ? e.minDate : "", a = e ? e.maxDate : "", r = [];
  if (t && a) {
    const s = Number(Aa(t)), i = Number(Aa(a)) - s;
    for (let o = 0; o <= i; o++)
      r.push(`${s + o}`);
  }
  return r.reverse();
}, Nu = (e, t, a, r, s, n, i, o) => {
  var v;
  let d = false;
  const h = o.type, m = o.disableWeekends, D = o.disableWeekdays;
  return h === "daily" && (t = t > n ? t : n, a = a < i ? a : i), e >= t && e <= a && (d = true, d && (m && (d = !Ms(e)), D && (d = !Cu(e)), (v = o.dateArray) != null && v.length && (d = Fu(e, o.dateArray, u)))), d;
}, Ru = (e, t, a, r, s, n, i, o, d) => {
  let h = false;
  const m = d.type;
  return d.singleDatePicker || (m === "daily" && (t = n, a = i), e >= r && e <= s && e >= t && e <= a && o && (h = true)), h;
}, Eu = (e, t, a, r) => e === t && r === "left" || e === a && r === "right", Pu = (e, t) => {
  const a = l().format(u), r = t.type, { firstDay: s, lastDay: n } = ea(a, r), i = l(s, u).valueOf(), o = l(n, u).valueOf();
  return e >= i && e <= o;
}, Cu = (e, t) => !Ms(e, t), Ms = (e, t) => {
  t || (t = "");
  const a = l(e, t).day();
  return a === 0 || a === 6;
}, Fu = (e, t, a) => t.find((r) => l(r, a).valueOf() === e) !== void 0, Au = (e) => {
  const t = {
    rowNumber: "",
    columns: 0
  }, a = e.type, r = e.monthStartWeekNumber, s = e.dateRows, n = `${e.year}`;
  return a === "daily" ? (t.rowNumber = `${r + s}`, t.columns = 6) : a === "weekly" ? (t.rowNumber = "", t.columns = 6) : a === "monthly" ? (t.rowNumber = `${s + 1}`, t.columns = 2) : a === "quarterly" ? (t.rowNumber = n.charAt(s), t.columns = 0) : a === "yearly" && (t.rowNumber = "", t.columns = 0), t;
}, Wu = (e) => {
  const { type: t, monthStartWeekNumber: a, yearStartDate: r, year: s, rowItem: n, dateRows: i, columns: o } = e, d = n + i * o + i;
  let h = "", m = "";
  if (t === "daily") {
    if (!me(a) && !me(i) && !me(s)) {
      const y = l().year(s).startOf("year").format(u);
      h = l(y, u).add(a + i - 1, "week").startOf("week").add(n, "day").format(u), m = l(h, u).format("D");
    }
  } else
    t === "weekly" ? !me(r) && !me(d) && (h = l(r, u).add(d, "week").endOf("week").format(u), m = `W${d + 1}`) : t === "monthly" ? !me(d) && !me(s) && (h = l().year(s).month(d).endOf("month").format(u), m = l(h, u).format("MMM")) : t === "quarterly" && !me(d) && !me(s) && (h = l().year(s).quarter(d + 1).endOf("quarter").format(u), m = `Quarter ${d + 1}`);
  const { firstDay: D, lastDay: v } = ea(h, t);
  return {
    itemCount: d,
    currentItemDate: h,
    rowItemText: m,
    firstDay: D,
    lastDay: v
  };
}, Iu = (e) => {
  let t = false;
  const a = e.type, r = e.year, s = e.itemCount, n = Yu(r);
  return a === "daily" ? t = true : a === "weekly" ? s < n && (t = true) : (a === "monthly" || a === "quarterly") && (t = true), t;
}, Zt = (e, t) => {
  const a = e.startDate, r = e.type;
  let s = "";
  return a && (s = l(a, u).startOf(ir[r]).format(t)), s;
}, Aa = (e) => Number(l(e, u).format("YYYY")), ea = (e, t) => {
  let a = "", r = "";
  return t === "daily" ? a = r = e : t === "weekly" ? (a = l(e, u).startOf("week").format(u), r = l(e, u).endOf("week").format(u)) : t === "monthly" ? (a = l(e, u).startOf("month").format(u), r = l(e, u).endOf("month").format(u)) : t === "quarterly" ? (a = l(e, u).startOf("quarter").format(u), r = l(e, u).endOf("quarter").format(u)) : t === "yearly" && (a = l(e, u).startOf("year").format(u), r = l(e, u).endOf("year").format(u)), { firstDay: a, lastDay: r };
}, gs = (e, t) => new Date(e).toLocaleString("en-US", {
  timeZone: wu[t]
}), Ys = (e, t, a) => {
  let r = l().valueOf();
  a && (r = l(a, t).startOf("day").valueOf());
  const s = gs(r, e);
  return l(s, "MM/DD/YYYY, hh:mm:ss A");
}, bs = (e, t) => {
  const a = Ys(e, t);
  return l(a).format(`${t}  hh:mm A`);
}, Rr = (e, t, a) => {
  const r = Ys(e, t, a);
  return l(r).format(`${t}`);
}, at = (e) => {
  let t = e + "";
  return t.length === 1 && (t = `0${t}`), t;
}, ta = (e) => {
  if (e) {
    const t = l(e, "YYYY-MM-DD").year(), a = l(e, "YYYY-MM-DD").month(), r = Number(l(e, "YYYY-MM-DD").format("D")), s = new Date(t, 0, 1), n = new Date(t, a, r);
    return Math.ceil(
      ((n.getTime() - s.getTime()) / 864e5 + s.getDay() + 1) / 7
    );
  } else
    return console.warn(`
      WARN_NGX_DATETIME_RANGE_PICKER | getWeekNumber:
      Invalid date
    `), Lu();
}, Er = (e, t) => {
  for (const a in e)
    a && e[a].itemRows.forEach((s) => {
      s.items.forEach((n) => {
        t(n);
      });
    });
}, ju = (e, t, a, r, s) => {
  const n = l(a, u).startOf("day").valueOf();
  let i = de(e.minDate, u);
  const o = l(i, u).startOf("day").valueOf();
  i = de(e.maxDate, u);
  const d = l(i, u).startOf("day").valueOf();
  i = de(e.startDate, u);
  const h = l(i, u).startOf("day").valueOf();
  i = de(e.endDate, u);
  const m = l(i, u).startOf("day").valueOf(), D = l(r, "MMM YYYY").startOf("month").startOf("day").valueOf(), v = l(r, "MMM YYYY").endOf("month").startOf("day").valueOf(), y = Nu(
    n,
    o,
    d,
    h,
    m,
    D,
    v,
    e
  ), k = Ru(
    n,
    o,
    d,
    h,
    m,
    D,
    v,
    y,
    e
  ), W = Eu(n, h, m, s), V = Pu(n, e);
  return n === h && s === "left" ? t.activeStartDate = a : n === m && s === "right" && (t.activeEndDate = a), { available: y, inRange: k, active: W, today: V };
}, Ut = (e, t, a) => {
  let r, s, n;
  return t === "daily" ? (r = `${e.selectedMonth[a]} ${e.selectedYear[a]}`, s = "MMM YYYY", n = "month") : (r = `${e.selectedYear[a]}`, s = "YYYY", n = "year"), { label: r, labelFormat: s, type: n };
}, Lu = () => "N/A", P = (e) => e ? JSON.parse(JSON.stringify(e)) : {}, xs = (e) => e ? Object.keys(e).length <= 0 : false, qt = (...e) => {
  const t = (a) => a && typeof a == "object";
  return e.reduce((a, r) => (Object.keys(r).forEach((s) => {
    const n = a[s], i = r[s];
    Array.isArray(n) && Array.isArray(i) ? a[s] = n.concat(...i) : t(n) && t(i) ? a[s] = qt(n, i) : i != null && (a[s] = i);
  }), a), {});
}, me = (e) => e == null || e === void 0, $u = (e, t) => t === "array" ? [`${e}`] : t === "string" ? `${e}` : t === "number" ? Number(e) : e, Uu = (e, t, a) => {
  let r = P(e), s = P(t);
  return r !== void 0 && Object.keys(r).forEach((n) => {
    me(r[n]) ? console.warn(`WARN_NGX_DATETIME_RANGE_PICKER:
          'options.${n}' is undefined or null. Setting default value.
        `) : r = {
      ...r,
      [n]: r[n]
    };
  }), s !== void 0 && Object.keys(s).forEach((n) => {
    me(s[n]) ? console.warn(`WARN_NGX_DATETIME_RANGE_PICKER:
          'settings.${n}' is undefined or null. Setting default value.
        `) : s = {
      ...s,
      [n]: s[n]
    };
  }), { ...r, ...s, ...a };
}, Hu = (e, t, a) => {
  t.inputDateFormat || (console.warn(`WARN_NGX_DATETIME_RANGE_PICKER:
      'inputDateFormat' is required to convert dates.
      'inputDateFormat' not provided. Setting it to YYYY-MM-DD.
    `), t.inputDateFormat = u), (t.type === "weekly" || t.type === "yearly") && (t.showRowNumber = false), t.singleDatePicker && t.endDate && (t.startDate = P(t.endDate));
  const r = Vu(e, t);
  e = r.state;
  const s = r.config;
  e = Gu(e, s), s.startTime = `${e.selectedHour.left || ""}:${e.selectedMinute.left || ""}`, s.endTime = `${e.selectedHour.right || ""}:${e.selectedMinute.right || ""}`;
  const n = Qu(s), i = Zu(n, a), o = (i == null ? void 0 : i.config) ?? n;
  a = (i == null ? void 0 : i.dateRangeModel) ?? a;
  const d = zu(o);
  return e = Bu(d, e), a = Rs(
    t,
    e,
    a,
    d.inputDateFormat
  ), e = Ns(e, d), d.startTime = `${e.selectedHour.left || ""}:${e.selectedMinute.left || ""}`, d.endTime = `${e.selectedHour.right || ""}:${e.selectedMinute.right || ""}`, {
    config: d,
    state: e,
    dateRangeModel: a
  };
}, Vu = (e, t) => (t.timezoneSupport && (t.defaultTimezone || (t.defaultTimezone = be), e.selectedTimezone = t.defaultTimezone), t.useLocalTimezone && (e.selectedTimezone = e.localTimezone), e.todayTime = bs(e.selectedTimezone, t.viewDateFormat ?? ""), {
  config: t,
  state: e
}), Gu = (e, t) => (e.sides.forEach((a) => {
  let r = t.startDate, s = t.startTime;
  if (a === "right" && (r = t.endDate, s = t.endTime), e = Ze(e, t, r ?? "", a), t.timePicker) {
    const i = xt(e, t, s ?? "", a);
    e = i.state, e.times[a] = i.timeObject;
  }
}), e), zu = (e) => {
  const t = P(e), a = 0, r = (s) => {
    t.minDate = l(t.minDate, u).endOf(s).format(u), t.maxDate = s === "week" ? l(t.maxDate, u).subtract(a, "week").endOf(s).format(u) : l(t.maxDate, u).endOf(s).format(u), t.startDate = l(t.startDate, u).endOf(s).format(u), t.endDate = s === "week" ? l(t.endDate, u).subtract(a, "week").endOf(s).format(u) : l(t.endDate, u).endOf(s).format(u);
  };
  return t.type === ue.weekly ? r.bind(void 0)("week") : t.type === ue.monthly ? r.bind(void 0)("month") : t.type === ue.quarterly ? r.bind(void 0)("quarter") : t.type === ue.yearly && r.bind(void 0)("year"), l(t.startDate, u).valueOf() < l(t.minDate, u).valueOf() && (t.minDate = t.startDate), l(t.endDate, u).valueOf() > l(t.maxDate, u).valueOf() && (t.maxDate = t.endDate), t;
}, Zu = (e, t) => {
  var d, h, m, D, v, y, k, W, V, ee, te, Q, ae, ne;
  if (t === void 0 || xs(t))
    return;
  if (e.type && !t[e.type]) {
    const B = Object.keys(Os());
    let X = {};
    if (Object.keys(t).forEach((re) => {
      B.includes(re) && (X = {
        ...X,
        [re]: t[re]
      }, delete t[re]);
    }), t[e.type] = X, !t[e.type])
      return;
  }
  e.dateArray = (e.type && ((d = t[e.type]) == null ? void 0 : d.dateArray)) ?? e.dateArray;
  const a = qu(e), r = a.type;
  (h = a.dateArray) != null && h.length && r && t[r] && ((m = t[r]) != null && m.minDate || (t[r].minDate = a.dateArray[0] || a.minDate), (D = t[r]) != null && D.maxDate || (t[r].maxDate = a.dateArray[a.dateArray.length - 1] || a.maxDate), (v = t[r]) != null && v.startDate || (t[r].startDate = a.dateArray[0] || a.startDate), (y = t[r]) != null && y.endDate || (t[r].endDate = a.dateArray[a.dateArray.length - 1] || a.endDate));
  const s = a.type ? ((k = t[a.type]) == null ? void 0 : k.minDate) ?? a.minDate ?? "" : "", n = a.type ? ((W = t[a.type]) == null ? void 0 : W.maxDate) ?? a.maxDate ?? "" : "", i = a.type ? ((V = t[a.type]) == null ? void 0 : V.startDate) ?? a.startDate ?? "" : "", o = a.type ? ((ee = t[a.type]) == null ? void 0 : ee.endDate) ?? a.endDate ?? "" : "";
  if (a.minDate = de(s, a.inputDateFormat ?? ""), a.maxDate = de(n, a.inputDateFormat ?? ""), a.startDate = de(i, a.inputDateFormat ?? ""), a.endDate = de(o, a.inputDateFormat ?? ""), a.timePicker) {
    const B = a.type ? ((te = t[a.type]) == null ? void 0 : te.minTime) ?? a.minTime ?? "" : "", X = a.type ? ((Q = t[a.type]) == null ? void 0 : Q.maxTime) ?? a.maxTime ?? "" : "", re = a.type ? ((ae = t[a.type]) == null ? void 0 : ae.startTime) ?? a.startTime ?? "" : "", Fe = a.type ? ((ne = t[a.type]) == null ? void 0 : ne.endTime) ?? a.endTime ?? "" : "";
    a.minTime = $e(B, a.defaultTimezone ?? be) ?? void 0, a.maxTime = $e(X, a.defaultTimezone ?? be) ?? void 0, a.startTime = $e(re, a.defaultTimezone ?? be) ?? void 0, a.endTime = $e(Fe, a.defaultTimezone ?? be) ?? void 0;
  }
  return {
    config: a,
    dateRangeModel: t
  };
}, qu = (e) => {
  var t;
  return (t = e.dateArray) != null && t.length && (e.dateArray = Mu(e), e.dateArray = e.dateArray.sort((a, r) => {
    const s = l(a, u).valueOf(), n = l(r, u).valueOf();
    return s - n;
  })), e;
}, Bu = (e, t) => {
  let a = P(t);
  return e.showRanges && !e.singleDatePicker ? (e.availableRanges = Ou(e), a = Ju(a, e)) : (a.activeRange = "Custom Range", a = lr(e, a, a.activeRange, null), a = aa(e, a)), a;
}, lr = (e, t, a, r) => (t.activeRange = a, a === "Custom Range" ? t.customRange = true : (t.customRange = false, r && (e.startDate = r.startDate, e.endDate = r.endDate), e.timePicker && (t.times = {})), t), aa = (e, t) => {
  const a = ea(e.startDate, e.type), r = ea(e.endDate, e.type);
  return e.type === ue.weekly ? (a.rowItemText = `W${ta(a.firstDay)}`, r.rowItemText = `W${ta(r.firstDay)}`) : e.type === ue.monthly ? (a.rowItemText = `${l(a.firstDay, u).format("MMM")}`, r.rowItemText = `${l(r.firstDay, u).format("MMM")}`) : e.type === ue.quarterly && (a.rowItemText = `Quarter ${l(a.firstDay, u).quarter()}`, r.rowItemText = `Quarter ${l(r.firstDay, u).quarter()}`), Object.assign(t.activeItem.left, a), Object.assign(t.activeItem.right, r), t;
}, Ju = (e, t) => {
  let a = P(e);
  for (const r in t.availableRanges)
    if (r) {
      const s = t.availableRanges[r];
      t.startDate === s.startDate && t.endDate === s.endDate && (a.activeRange = r, a = aa(t, a));
    }
  return a.activeRange || (a.activeRange = "Custom Range", a = lr(t, a, a.activeRange, null), a = aa(t, a)), a;
}, Ns = (e, t) => {
  if (e.sides.length = 0, e.dates = {}, !t.singleDatePicker && (e.sides.push("left"), e = Ze(e, t, t.startDate, "left"), t.timePicker)) {
    const s = xt(e, t, t.startTime, "left");
    e = s.state, e.times.left = s.timeObject;
  }
  if (e.sides.push("right"), e = Ze(e, t, t.endDate, "right"), t.timePicker) {
    const r = xt(e, t, t.endTime, "right");
    e = r.state, e.times.right = r.timeObject;
  }
  return e;
}, Qu = (e) => (e.minDate = de(e.minDate, e.inputDateFormat), e.maxDate = de(e.maxDate, e.inputDateFormat), e.startDate = de(e.startDate, e.inputDateFormat), e.endDate = de(e.endDate, e.inputDateFormat), e.timePicker && (e.minTime = $e(e.minTime ?? "", e.defaultTimezone ?? be) ?? void 0, e.maxTime = $e(e.maxTime ?? "", e.defaultTimezone ?? be) ?? void 0, e.startTime = $e(e.startTime ?? "", e.defaultTimezone ?? be) ?? void 0, e.endTime = $e(e.endTime ?? "", e.defaultTimezone ?? be) ?? void 0), e), Ze = (e, t, a, r) => {
  const s = P(e);
  s.selectedMonth[r] = l(a, u).format("MMM"), s.selectedYear[r] = Aa(a);
  const n = `${s.selectedMonth[r]} ${s.selectedYear[r]}`, i = {
    label: n,
    months: bu(
      t.minDate,
      t.maxDate,
      s.selectedYear[r]
    ),
    years: xu(t),
    itemRows: []
  };
  if (s.weekDayOptions = [""], t.type !== "yearly") {
    const o = l(a, u).year(s.selectedYear[r]).startOf("month").week(), d = l(s.selectedYear[r], "YYYY").startOf("year").format(u);
    let h = 1;
    t.type === "daily" ? (h = gu(a), s.weekDayOptions = ["su", "mo", "tu", "we", "th", "fr", "sa"]) : t.type === "weekly" ? (h = 8, s.weekDayOptions = ["", "", "", "", "", "", ""]) : t.type === "monthly" ? (h = 4, s.weekDayOptions = ["", "", ""]) : t.type === "quarterly" && (h = 4, s.weekDayOptions = [""]);
    for (let m = 0; m < h; m++) {
      const D = {
        rowNumber: null,
        rowNumberText: null,
        items: []
      }, v = {
        type: t.type,
        monthStartWeekNumber: o,
        dateRows: m,
        year: s.selectedYear[r],
        itemCount: null
      }, { rowNumber: y, columns: k } = Au(v);
      D.rowNumber = y, D.rowNumberText = Su(t.type ?? "", Number(y));
      for (let W = 0; W <= k; W++) {
        const V = {
          type: t.type,
          monthStartWeekNumber: o,
          dateRows: m,
          yearStartDate: d,
          year: s.selectedYear[r],
          rowItem: W,
          columns: k
        }, { currentItemDate: ee, rowItemText: te, firstDay: Q, lastDay: ae, itemCount: ne } = Wu(V);
        v.itemCount = ne;
        const { available: B, inRange: X, active: re, today: Fe } = ju(
          t,
          s,
          ee,
          n,
          r
        ), He = {
          date: ee,
          rowItemText: te,
          firstDay: Q,
          lastDay: ae,
          available: B,
          inRange: X,
          active: re,
          today: Fe
        };
        Iu(v) && (re && (s.activeItem[r] = He), D.items.push(He));
      }
      i.itemRows.push(D);
    }
  }
  return s.calendarAvailable[r] = true, s.dates[r] = i, s;
}, xt = (e, t, a, r) => {
  const s = {
    hour: [],
    minute: [],
    meridian: []
  };
  let n = 0;
  const i = 23;
  let o = 0;
  const d = 59;
  let h = r === "left" ? n : i, m = r === "left" ? o : d;
  const D = l(t.startDate, u).valueOf(), v = l(t.endDate, u).valueOf();
  a && (h = Number(l(a, Fa).format("H")), m = Number(l(a, Fa).format("m")), r === "right" && D === v && (n = h, o = m));
  for (let y = n; y <= 23; y++) {
    const k = at(y);
    s.hour.push(k);
  }
  for (let y = o; y <= 59; y++) {
    const k = at(y);
    s.minute.push(k);
  }
  return e.selectedHour[r] = at(h), e.selectedMinute[r] = at(m), {
    state: e,
    timeObject: s
  };
}, Rs = (e, t, a, r) => {
  let s = {};
  return a !== void 0 && !xs(a) && (s = P(a)), e.type && (s[e.type] = Es(e, t, r)), s;
}, Es = (e, t, a) => {
  let r, s = e.outputDateFormat;
  a !== void 0 && (s = a);
  let n = Zt(e, s), i = l(e.endDate, u).format(s);
  if (e.selectedTimezone && (n = Rr(e.selectedTimezone, s, n), i = Rr(e.selectedTimezone, s, i)), r = {
    activeRange: t.activeRange,
    startDate: n,
    endDate: i
  }, e.timePicker) {
    const o = e.startTime, d = e.endTime;
    r = {
      activeRange: t.activeRange,
      startDate: n,
      endDate: i,
      startTime: o,
      endTime: d
    };
  }
  return r;
}, Xu = ({ state: e, config: t, setState: a }) => {
  const r = (s) => {
    a({
      ...e,
      selectedTimezone: s,
      todayTime: bs(s, t.viewDateFormat ?? u)
    });
  };
  return /* @__PURE__ */ w.jsxs("div", { className: "list-inline timezone-select", children: [
    /* @__PURE__ */ w.jsx("div", { className: "timeZones", children: e.timeZones.map((s, n) => /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
      /* @__PURE__ */ w.jsx(
        "div",
        {
          className: `timezone ${e.selectedTimezone === s ? "active-timezone" : ""}`,
          onClick: () => {
            r(s);
          },
          children: s
        },
        `tz-${n}`
      ),
      n !== e.timeZones.length - 1 && /* @__PURE__ */ w.jsx("div", { className: "vertical-divider" }, `divider-${n}`)
    ] })) }),
    /* @__PURE__ */ w.jsxs("div", { className: "currentTime", children: [
      /* @__PURE__ */ w.jsx("span", { className: "today-text", children: "Today" }),
      ":",
      " ",
      /* @__PURE__ */ w.jsx("span", { className: "active-timezone", children: e.todayTime })
    ] })
  ] });
}, Ku = Xu, ed = ({ state: e, side: t }) => /* @__PURE__ */ w.jsx("div", { className: "dateTitleInput", children: /* @__PURE__ */ w.jsx("div", { className: "dateSelect", children: e.dateTitleText[t] }) }), td = ed, ad = ({
  selectAs: e,
  options: t,
  selectedValue: a,
  classes: r = "",
  onChange: s
}) => {
  const n = (e == null ? void 0 : e.tag) ?? "select", i = (e == null ? void 0 : e.optionTag) ?? "option", o = (e == null ? void 0 : e.selectedAttributeName) ?? "value", d = (e == null ? void 0 : e.selectedAttributeValueType) ?? "string";
  return /* @__PURE__ */ w.jsx(
    n,
    {
      className: `${r} ngx-datetime-range-picker-select-panel ${e != null && e.classNames ? e.classNames : "default-select-class"}`,
      [o]: $u(
        a,
        d
      ),
      onChange: s,
      children: t.map((h) => /* @__PURE__ */ w.jsx(i, { className: "dropdown-item", value: h, children: h }, h))
    }
  );
}, Wa = ad, rd = ({
  state: e,
  config: t,
  side: a,
  selectAs: r,
  setState: s,
  onCalendarLabelChange: n
}) => {
  const i = (m) => {
    const { label: D, labelFormat: v, type: y } = Ut(e, t.type, m), k = l(D, v).add(1, y).endOf(y).format(u), V = Ze(e, t, k, m);
    s(V);
  }, o = (m) => {
    const { label: D, labelFormat: v, type: y } = Ut(e, t.type, m);
    return l(D, v).startOf(y).valueOf() > l(t.minDate, u).startOf(y).valueOf();
  }, d = (m) => {
    const { label: D, labelFormat: v, type: y } = Ut(e, t.type, m), k = l(D, v).subtract(1, y).startOf(y).format(u);
    e = Ze(e, t, k, m), s(e);
  }, h = (m) => {
    const { label: D, labelFormat: v, type: y } = Ut(e, t.type, m);
    return l(D, v).endOf(y).valueOf() < l(t.maxDate, u).endOf(y).valueOf();
  };
  return /* @__PURE__ */ w.jsxs("div", { className: "calendar-label-container", children: [
    /* @__PURE__ */ w.jsx("div", { className: "prev", children: /* @__PURE__ */ w.jsx(
      "div",
      {
        className: `${o(a) ? "available" : "disabled"}`,
        onClick: () => {
          d(a);
        },
        children: /* @__PURE__ */ w.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24",
            viewBox: "0 -960 960 960",
            width: "24",
            fill: `${o(a) ? null : "#e6e6e6"}`,
            children: /* @__PURE__ */ w.jsx("path", { d: "M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" })
          }
        )
      }
    ) }),
    /* @__PURE__ */ w.jsx(
      "div",
      {
        className: "calendar-label",
        children: /* @__PURE__ */ w.jsxs("div", { className: "date-dropdown-container", style: { position: "relative" }, children: [
          t.type === ue.daily && /* @__PURE__ */ w.jsx("div", { className: "date-dropdown ngx-datetime-range-picker-select-panel month-select-panel", children: /* @__PURE__ */ w.jsx(
            Wa,
            {
              classes: "month-select",
              selectAs: r,
              options: e.dates[a].months,
              selectedValue: `${e.selectedMonth[a]}`,
              onChange: (m) => {
                n(m.target.value, a, "month");
              }
            }
          ) }),
          /* @__PURE__ */ w.jsx("div", { className: "date-dropdown ngx-datetime-range-picker-select-panel year-select-panel", children: /* @__PURE__ */ w.jsx(
            Wa,
            {
              classes: "year-select",
              selectAs: r,
              options: e.dates[a].years,
              selectedValue: `${e.selectedYear[a]}`,
              onChange: (m) => {
                n(m.target.value, a, "year");
              }
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ w.jsx("div", { className: "next", children: /* @__PURE__ */ w.jsx(
      "div",
      {
        className: `${h(a) ? "available" : "disabled"}`,
        onClick: () => {
          i(a);
        },
        children: /* @__PURE__ */ w.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24",
            viewBox: "0 -960 960 960",
            width: "24",
            fill: `${h(a) ? null : "#e6e6e6"}`,
            children: /* @__PURE__ */ w.jsx("path", { d: "M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" })
          }
        )
      }
    ) })
  ] });
}, sd = rd, nd = ({
  state: e,
  config: t,
  side: a,
  setState: r,
  setConfig: s,
  handleDateChange: n,
  updateActiveItemInputField: i
}) => {
  const o = useRef({}), d = (D, v) => {
    let y = P(e), k = P(t);
    const W = l(D.date, u).valueOf(), V = l(k.startDate, u).valueOf(), ee = l(k.endDate, u).valueOf(), te = l(k.minDate, u).valueOf(), Q = l(k.maxDate, u).valueOf();
    if (!D.available) {
      if (W < te || W > Q)
        return;
      y = Ze(
        y,
        k,
        D.date,
        v
      );
    }
    ee || W < V ? (k.endDate = "", k.startDate = D.date, y.activeItem.left = D) : !ee && W < V ? (k.endDate = P(k.startDate), y.activeItem.right = D) : (k.endDate = D.date, y.activeItem.right = D), k.singleDatePicker && k.startDate && (k.endDate = P(k.startDate), y.activeItem.right = y.activeItem.left = D);
    const { _state: ae, _config: ne } = n(
      y,
      k
    );
    y = ae, k = ne, r(y), s(k);
  }, h = (D, v) => {
    if (!D.available)
      return;
    const y = P(e), k = l(D.date, u).valueOf(), W = l(t.startDate, u).valueOf(), V = l(t.endDate, u).valueOf(), ee = v ? v.innerText : "";
    let te = v ? (v == null ? void 0 : v.getAttribute("data-firstday")) ?? "" : "", Q = v ? (v == null ? void 0 : v.getAttribute("data-lastday")) ?? "" : "";
    te = l(te, u).format(
      t.viewDateFormat
    ), Q = l(Q, u).format(
      t.viewDateFormat
    );
    let ae = `${ee} (${te} - ${Q})`;
    if (t.type === ue.daily && (ae = `${Q}`), V)
      y.dateTitleText[a] = ae;
    else {
      const ne = (B) => {
        if (B.available) {
          const X = (B.date, l(B.date, u).valueOf());
          (X > W && X < k || k === X) && (B.inRange = true, y.dateTitleText.right = ae);
        }
      };
      Er(y.dates, ne.bind(void 0));
    }
    r(y);
  }, m = () => {
    if (t.endDate)
      i(e, t);
    else {
      const D = (v) => {
        v.inRange = false;
      };
      Er(e.dates, D.bind(void 0));
    }
  };
  return /* @__PURE__ */ w.jsxs("table", { children: [
    /* @__PURE__ */ w.jsx("thead", { children: /* @__PURE__ */ w.jsxs("tr", { children: [
      t.showRowNumber && /* @__PURE__ */ w.jsx("th", { className: "rowNumber" }),
      e.weekDayOptions.map((D, v) => /* @__PURE__ */ w.jsx("th", { className: "calendar-week-day capitalize", children: D }, `day-${v}`))
    ] }) }),
    /* @__PURE__ */ w.jsx("tbody", { children: e.dates[a].itemRows.map((D, v) => /* @__PURE__ */ w.jsxs("tr", { children: [
      t.showRowNumber && D.rowNumberText && /* @__PURE__ */ w.jsx("td", { className: "rowNumber", children: D.rowNumberText }),
      D.items.map((y, k) => /* @__PURE__ */ w.jsx(
        "td",
        {
          ref: (W) => {
            o.current && (o.current[`td-${v}-${k}`] = W);
          },
          "data-firstday": y.firstDay,
          "data-lastday": y.lastDay,
          className: `${y.available ? "available" : ""} ${y.inRange ? "in-range" : ""} ${e.activeStartDate === y.date && a === "left" || e.activeEndDate === y.date && a === "right" ? "active" : ""} ${y.today ? "today" : ""}`,
          onClick: () => {
            d(y, a);
          },
          onMouseOver: () => {
            h(y, o.current[`td-${v}-${k}`]);
          },
          onMouseLeave: () => {
            m();
          },
          children: /* @__PURE__ */ w.jsx("div", { children: y.rowItemText })
        },
        `td-${v}-${k}`
      ))
    ] }, `tr-${v}`)) })
  ] });
}, id = nd, ld = ({ state: e, config: t, selectAs: a, side: r, onTimeLabelChange: s }) => {
  const n = (i, o) => i === "hour" ? e.selectedHour[o] : i === "minute" ? e.selectedMinute[o] : "";
  return /* @__PURE__ */ w.jsxs("div", { className: `time-select ${r}`, children: [
    /* @__PURE__ */ w.jsx("div", { className: "clock-icon-container", children: /* @__PURE__ */ w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", viewBox: "0 -960 960 960", width: "20", children: /* @__PURE__ */ w.jsx("path", { d: "m614-310 51-51-149-149v-210h-72v240l170 170ZM480-96q-79.376 0-149.188-30Q261-156 208.5-208.5T126-330.958q-30-69.959-30-149.5Q96-560 126-630t82.5-122q52.5-52 122.458-82 69.959-30 149.5-30 79.542 0 149.548 30.24 70.007 30.24 121.792 82.08 51.786 51.84 81.994 121.92T864-480q0 79.376-30 149.188Q804-261 752-208.5T629.869-126Q559.738-96 480-96Zm0-384Zm.477 312q129.477 0 220.5-91.5T792-480.477q0-129.477-91.023-220.5T480.477-792Q351-792 259.5-700.977t-91.5 220.5Q168-351 259.5-259.5T480.477-168Z" }) }) }),
    e.timeItems.map((i, o) => /* @__PURE__ */ w.jsx("div", { className: "d-inline-block time-item-container", children: /* @__PURE__ */ w.jsx(
      Wa,
      {
        classes: "timeItem-select",
        selectAs: a,
        options: e.times[r][i],
        selectedValue: n(i, r),
        onChange: (d) => {
          s(e, t, i, r, d.target.value);
        }
      }
    ) }, `time-item-${o}`))
  ] });
}, od = ld, ud = ({
  state: e,
  config: t,
  buttonAs: a,
  dateRangeSelected: r,
  setState: s,
  setConfig: n,
  updateInputField: i,
  doApply: o
}) => {
  const d = (a == null ? void 0 : a.tag) ?? "button", h = (m, D, v, y) => {
    let k = lr(m, D, v, y);
    k = aa(m, k), k = Ns(k, m);
    const { state: W, config: V } = o(k, m);
    s(W), n(V);
  };
  return /* @__PURE__ */ w.jsx("div", { className: "ranges", children: Object.keys(t.availableRanges).map((m, D) => /* @__PURE__ */ w.jsx(
    d,
    {
      className: `calendar-range ${m === e.activeRange ? "active-range" : ""} ${a != null && a.classNames ? a.classNames : "default-button-class"}`,
      onClick: () => {
        h(t, e, m, t.availableRanges[m]);
      },
      children: m
    },
    `button-${D}`
  )) });
}, dd = ud, cd = ({
  config: e,
  state: t,
  selectAs: a,
  buttonAs: r,
  dateRangeSelected: s,
  setState: n,
  setConfig: i,
  updateInputField: o,
  doApply: d,
  handleDateChange: h,
  updateActiveItemInputField: m,
  onCalendarLabelChange: D,
  onTimeLabelChange: v
}) => /* @__PURE__ */ w.jsx("div", { className: "calendar-view", children: /* @__PURE__ */ w.jsxs("div", { className: "date-select", children: [
  /* @__PURE__ */ w.jsxs("div", { style: { position: "relative" }, children: [
    !!e.timezoneSupport && /* @__PURE__ */ w.jsx(Ku, { state: t, config: e, setState: n }),
    /* @__PURE__ */ w.jsx("ul", { className: "list-inline calendar-container", children: t.sides.map((y, k) => /* @__PURE__ */ w.jsxs("li", { className: `calendar ${y}`, children: [
      /* @__PURE__ */ w.jsx(td, { state: t, side: y }, `calendar-${k}`),
      /* @__PURE__ */ w.jsx("div", { className: "divider" }),
      /* @__PURE__ */ w.jsx("div", { className: "calendar-table", children: t.calendarAvailable[y] && /* @__PURE__ */ w.jsxs(
        "div",
        {
          className: "calendar-side-container",
          style: { minWidth: "250px", position: "relative" },
          children: [
            /* @__PURE__ */ w.jsx(
              sd,
              {
                config: e,
                state: t,
                side: y,
                selectAs: a,
                onCalendarLabelChange: D,
                setState: n
              },
              `month-year-select-${k}`
            ),
            /* @__PURE__ */ w.jsx(
              id,
              {
                config: e,
                state: t,
                side: y,
                setState: n,
                setConfig: i,
                handleDateChange: h,
                updateActiveItemInputField: m
              },
              `date-select-${k}`
            )
          ]
        }
      ) }),
      e.timePicker && /* @__PURE__ */ w.jsxs("div", { className: "time-picker-container", children: [
        /* @__PURE__ */ w.jsx("div", { className: "divider" }),
        /* @__PURE__ */ w.jsx(
          od,
          {
            state: t,
            side: y,
            config: e,
            selectAs: a,
            onTimeLabelChange: v
          },
          `time-select-${k}`
        )
      ] })
    ] }, `calendar-${k}`)) })
  ] }),
  ((!e.singleDatePicker && e.showRanges) ?? e.timePicker) && /* @__PURE__ */ w.jsx(
    dd,
    {
      config: e,
      state: t,
      buttonAs: r,
      setState: n,
      setConfig: i,
      updateInputField: o,
      dateRangeSelected: s,
      doApply: d
    }
  )
] }) }), fd = cd, hd = ({
  dateArray: e,
  startDate: t,
  endDate: a,
  minDate: r,
  maxDate: s,
  startTime: n,
  endTime: i,
  minTime: o,
  maxTime: d,
  type: h = ue.daily,
  modelKeys: m,
  useLocalTimezone: D,
  showTimezoneSelect: v,
  timePicker: y,
  timezoneSupport: k,
  defaultTimezone: W,
  inputClass: V,
  inputDateFormat: ee,
  viewDateFormat: te,
  outputDateFormat: Q,
  singleDatePicker: ae,
  componentDisabled: ne,
  label: B,
  placeholder: X,
  showRowNumber: re,
  availableRanges: Fe,
  showRanges: He,
  disableWeekends: Be,
  disableWeekdays: ut,
  displayBeginDate: Ct,
  displayEndDate: Je,
  ariaLabels: dt,
  dateRangeModel: ct,
  canBeEmpty: ft,
  onDateRangeModelChange: ht,
  onDateRangeChange: mt,
  onInputBlur: c,
  onDateSelect: g,
  inputAs: A,
  selectAs: Z,
  buttonAs: we
}) => {
  var mr;
  const le = (A == null ? void 0 : A.tag) ?? "input", [J, he] = useState({}), [q, Ae] = useState({}), [yt, ma] = useState({}), [U, Ft] = useState({}), [At, or] = useState({}), [Ps, Cs] = useState(false), Dt = useRef(null), vt = useRef(null), ya = () => {
    var b;
    if (U.startDate && U.endDate) {
      Dt && ((b = Dt.current) == null || b.classList.remove("empty-filter"));
      let _ = P(J);
      _ = pt(_, U), Wt(_, U), pt(_, U);
    }
  }, Fs = (b, _, S, T, x, N, M, G, We, Ie, Da, va, It, Hs, Vs, Gs, zs, Zs, qs, Bs, Js, Qs, Xs, Ks, en, tn, an, rn, sn, nn, ln, on, un, dn) => {
    Cs(b);
    const yr = {
      type: va ?? ue.daily,
      modelKeys: It,
      useLocalTimezone: Hs,
      showTimezoneSelect: Vs,
      timePicker: Gs,
      timezoneSupport: zs,
      defaultTimezone: Zs,
      inputClass: qs,
      inputDateFormat: Bs,
      viewDateFormat: Js,
      outputDateFormat: Qs,
      singleDatePicker: Xs,
      componentDisabled: Ks,
      label: en,
      placeholder: tn,
      showRowNumber: an,
      availableRanges: rn,
      showRanges: sn,
      disableWeekends: nn,
      disableWeekdays: ln,
      displayBeginDate: on,
      displayEndDate: un,
      ariaLabels: dn
    }, pa = qt(_u(), yt, yr);
    ku(yr);
    const cn = {
      dateArray: S,
      startDate: T,
      endDate: x,
      minDate: N,
      maxDate: M,
      startTime: G,
      endTime: We,
      minTime: Ie,
      maxTime: Da
    }, wa = qt(Os(), q, cn), fn = P(_);
    let Ta = Object.assign(wa, pa);
    const Dr = Object.assign(Nr(), J);
    Dr.isValidFilter = false, Ta = Uu(wa, pa, Ta), ma(pa), Ae(wa), ur(Dr, Ta, fn);
  }, ur = (b, _, S) => {
    let T = P(b), x = P(_), N = P(S);
    const M = Hu(T, x, N);
    T = M.state, x = M.config, N = M.dateRangeModel, T = pt(T, x), or(Object.assign(At, N)), Ft(Object.assign(U, x)), he(Object.assign(Nr(), T));
  }, As = () => {
    const b = P(J);
    b.isCalendarVisible = !J.isCalendarVisible, b.isCalendarVisible ? (he(b), ur(b, U, At)) : ya();
  }, Ws = (b) => {
    c && c({
      reason: Ca.focus,
      value: b.target.value
    });
  }, Is = (b) => {
    const _ = b.target.value;
    he({
      ...J,
      selectedDateText: _
    }), c && c({
      reason: Ca.blur,
      value: _
    });
  }, js = (b) => {
    Wt(J, U);
  }, Wt = (b, _) => {
    var T;
    const S = Es(
      _,
      b
    );
    Dt && ((T = Dt.current) == null || T.classList.remove("empty-filter")), Ls(), mt && mt(S), he({
      ...b,
      isCalendarVisible: false
    }), or(
      qt(At, {
        [U.type]: {
          startDate: S.startDate,
          endDate: S.endDate,
          startTime: S.startTime,
          endTime: S.endTime
        }
      })
    );
  }, Ls = () => {
    const b = Rs(
      U,
      J,
      At,
      U.inputDateFormat
    );
    ht && ht(b);
  }, dr = (b, _) => {
    const { _state: S, _config: T } = cr(b, _);
    return {
      state: pt(S, T),
      config: T
    };
  }, cr = (b, _) => {
    let S = P(b);
    const T = P(_), x = T.startDate, N = T.endDate;
    S.activeStartDate = x, S.activeEndDate = N, T.startDate && T.endDate && (T.timePicker ? T.timePicker && S.sides.forEach((We) => {
      const Ie = xt(S, T, null, We);
      S = Ie.state, S.times[We] = Ie.timeObject;
    }) : Wt(b, _));
    let M = x ? l(x, u).valueOf() : null, G = N ? l(N, u).valueOf() : null;
    return T.outputDateFormat && (M = x ? l(x, u).format(T.outputDateFormat) : null, G = N ? l(N, u).format(T.outputDateFormat) : null), g && g({
      startDate: M,
      endDate: G
    }), T.startTime = `${S.selectedHour.left}:${S.selectedMinute.left}`, T.endTime = `${S.selectedHour.right}:${S.selectedMinute.right}`, {
      _state: S,
      _config: T
    };
  }, pt = (b, _) => {
    let S = P(b);
    const T = Zt(_, _.viewDateFormat), x = _.endDate ? l(_.endDate, u).format(_.viewDateFormat) : "";
    if (_.singleDatePicker) {
      let N = T, M = x, G = "";
      _.timePicker && (N = `${T} ${_.startTime}`, M = `${x} ${_.endTime}`), _.displayBeginDate ? G = `${N}` : _.displayEndDate ? G = `${M}` : G = `${N} - ${M}`, S.selectedDateText = G;
    } else {
      let N = T, M = x;
      _.timePicker && (N = `${T} ${_.startTime}`, M = `${x} ${_.endTime}`), S.selectedDateText = `${N} - ${M}`;
    }
    return (Ps || !S.selectedDateText.includes("nvalid")) && (S.isValidFilter = true), _.type === "yearly" ? (S.dateTitleText.left = T, S.dateTitleText.right = x) : S = fr(S, _), S;
  }, fr = (b, _) => {
    let S = P(b);
    return _.singleDatePicker || (S = hr(S, _, "left")), S = hr(S, _, "right"), S;
  }, hr = (b, _, S) => {
    const T = P(b);
    let x = T.activeItem[S].firstDay, N = T.activeItem[S].lastDay;
    const M = T.activeItem[S].rowItemText;
    return x = l(x, u).format(_.viewDateFormat), N = l(N, u).format(_.viewDateFormat), _.type !== "daily" ? T.dateTitleText[S] = `${M} (${x} - ${N})` : T.dateTitleText[S] = `${x}`, T;
  }, $s = (b, _, S) => {
    let T = P(J), x = P(U);
    if (T.isCalendarVisible = true, S === "month" ? T.selectedMonth[_] = b : S === "year" && (T.selectedYear[_] = Number(b)), x.type !== "daily" && (T.selectedMonth[_] = "Jun"), x.type !== "yearly") {
      const N = `${T.selectedMonth[_]} ${T.selectedYear[_]}`, M = l(N, "MMM YYYY").startOf("month").format(u);
      T = Ze(T, x, M, _);
    } else {
      if (T.selectedYear.left <= T.selectedYear.right && _ === "right") {
        x.startDate = l(T.selectedYear.left, "YYYY").startOf("year").format(u), x.endDate = l(T.selectedYear.right, "YYYY").endOf("year").format(u);
        const { state: We, config: Ie } = dr(T, x);
        T = We, x = Ie;
      }
      const N = {
        startDate: l(T.selectedYear.left, "YYYY").startOf("year").format(u),
        type: "yearly"
      }, M = Zt(N, U.viewDateFormat), G = U.endDate ? l(U.endDate, u).format(U.viewDateFormat) : "";
      T.dateTitleText.left = M, T.dateTitleText.right = G;
    }
    he(T), Ft(x);
  }, Us = (b, _, S, T, x) => {
    let N = P(b);
    const M = P(_);
    let G = null;
    if (T === "left") {
      G = M.startTime.split(":"), S === "hour" ? M.startTime = `${x}:${G[1]}` : M.startTime = `${G[0]}:${x}`;
      const Da = l(M.startDate, u).valueOf(), va = l(M.endDate, u).valueOf();
      if (Da === va) {
        const It = xt(N, M, M.startTime, "right");
        N = It.state, N.times.right = It.timeObject;
      }
    } else
      G = M.endTime.split(":"), S === "hour" ? M.endTime = `${x}:${G[1]}` : M.endTime = `${G[0]}:${x}`;
    S === "hour" ? N.selectedHour[T] = at(x) : N.selectedMinute[T] = at(x), M.startTime = `${N.selectedHour.left}:${N.selectedMinute.left}`, M.endTime = `${N.selectedHour.right}:${N.selectedMinute.right}`;
    const We = Zt(M, M.viewDateFormat), Ie = M.endDate ? l(M.endDate, u).format(M.viewDateFormat) : "";
    N.dateTitleText.left = We, N.dateTitleText.right = Ie, M.singleDatePicker && (M.startTime = P(M.endTime)), he(N), Ft(M);
  };
  return useEffect(() => {
    Fs(
      ft,
      ct,
      e,
      t,
      a,
      r,
      s,
      n,
      i,
      o,
      d,
      h,
      m,
      D,
      v,
      y,
      k,
      W,
      V,
      ee,
      te,
      Q,
      ae,
      ne,
      B,
      X,
      re,
      Fe,
      He,
      Be,
      ut,
      Ct,
      Je,
      dt
    );
  }, [
    ft,
    ct,
    e,
    t,
    a,
    r,
    s,
    n,
    i,
    o,
    d,
    h,
    m,
    D,
    v,
    y,
    k,
    W,
    V,
    ee,
    te,
    Q,
    ae,
    ne,
    B,
    X,
    re,
    Fe,
    He,
    Be,
    ut,
    Ct,
    Je,
    dt
  ]), useEffect(() => {
    const b = (_) => {
      var S;
      J.isCalendarVisible && _.target && !((S = _.target.parentElement) != null && S.getElementsByClassName(
        "ngx-datetime-range-picker-select-panel"
      ).length) && !_.target.closest(".dropdown-item") && vt.current && vt.current !== _.target && !vt.current.contains(_.target) && ya();
    };
    return document.addEventListener("click", b), () => {
      document.removeEventListener("click", b);
    };
  }, [vt, J]), /* @__PURE__ */ w.jsxs("div", { ref: vt, className: "ngx-datetime-range-picker", children: [
    /* @__PURE__ */ w.jsx("div", { className: "date-input", children: /* @__PURE__ */ w.jsx(
      le,
      {
        ref: Dt,
        className: `dateSelect full-width ${U.inputClass ?? ""} ${A != null && A.classNames ? A.classNames : "default-input-class"}`,
        label: U.label,
        "aria-label": (mr = U.ariaLabels) == null ? void 0 : mr.inputField,
        onClick: As,
        placeholder: U.placeholder,
        value: J.selectedDateText,
        onChange: js,
        onKeyUp: ya,
        onFocus: Ws,
        onBlur: Is,
        disabled: U.componentDisabled,
        autoComplete: "off",
        autoCorrect: "off",
        readOnly: true
      }
    ) }),
    !!J.isCalendarVisible && /* @__PURE__ */ w.jsx(
      fd,
      {
        config: U,
        state: J,
        selectAs: Z,
        buttonAs: we,
        dateRangeSelected: Wt,
        setState: he,
        setConfig: Ft,
        updateInputField: pt,
        doApply: dr,
        handleDateChange: cr,
        updateActiveItemInputField: fr,
        onCalendarLabelChange: $s,
        onTimeLabelChange: Us
      }
    )
  ] });
}, yd = hd;
const DTRP_TYPES = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly"
];
const DTRP_OPTIONS = ["timepicker", "timezone"];
function HeroItem({ className = "" }) {
  const [datetimeRangePickerType, setDatetimeRangePickerType] = useState("daily");
  const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(false);
  const [isTimezoneSupportEnabled, setIsTimezoneSupportEnabled] = useState(false);
  const handleTypeChange = (type) => {
    setDatetimeRangePickerType(type);
  };
  const handleOptionChanges = (checked, option) => {
    console.log("=====> checked", checked);
    if (option === "timepicker") {
      setIsTimePickerEnabled(checked);
    }
    if (option === "timezone") {
      setIsTimezoneSupportEnabled(checked);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `hero-item project flex flex-col justify-between h-full w-full ${className}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "image-container flex flex-col gap-16 justify-start items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "types-container", children: /* @__PURE__ */ jsx("fieldset", { id: "types", className: "flex flex-wrap gap-8", children: DTRP_TYPES.map((type, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex gap-4 text-sm items-center type-container",
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: type,
                    type: "radio",
                    value: type,
                    name: "types",
                    checked: datetimeRangePickerType === type,
                    onChange: (e) => handleTypeChange(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("label", { htmlFor: type, className: "type-label", children: type })
              ]
            },
            idx
          )) }) }),
          /* @__PURE__ */ jsx("div", { className: "options-container flex gap-8", children: DTRP_OPTIONS.map((option, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex gap-4 text-sm items-center type-container",
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: option,
                    type: "checkbox",
                    value: option,
                    name: "types",
                    checked: option === "timepicker" && isTimePickerEnabled && true || option === "timezone" && isTimezoneSupportEnabled && true,
                    onChange: (e) => handleOptionChanges(e.target.checked, option)
                  }
                ),
                /* @__PURE__ */ jsx("label", { htmlFor: option, className: "option-label", children: option })
              ]
            },
            idx
          )) }),
          /* @__PURE__ */ jsx("div", { className: "component-container", children: /* @__PURE__ */ jsx(
            yd,
            {
              canBeEmpty: false,
              type: datetimeRangePickerType,
              timePicker: isTimePickerEnabled,
              timezoneSupport: isTimezoneSupportEnabled,
              dateRangeModel: {
                daily: {
                  endDate: "2025-07-18",
                  startDate: "2025-07-18"
                },
                weekly: {
                  endDate: "2025-07-18",
                  startDate: "2025-07-12"
                },
                monthly: {
                  endDate: "2025-07-18",
                  startDate: "2025-07-12"
                },
                quarterly: {
                  endDate: "2025-07-18",
                  startDate: "2025-07-12"
                },
                yearly: {
                  endDate: "2025-07-18",
                  startDate: "2025-07-12"
                }
              },
              displayEndDate: true,
              inputDateFormat: "YYYY-MM-DD",
              label: "Date",
              onDateRangeChange: () => {
              },
              onDateRangeModelChange: () => {
              },
              onDateSelect: () => {
              },
              onInputBlur: () => {
              },
              placeholder: "Date",
              showRowNumber: true,
              singleDatePicker: true,
              viewDateFormat: "MMM D, YYYY"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "info mt-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "name", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                target: "_blank",
                href: "https://github.com/BhavinPatel04/ngx-datetime-range-picker",
                className: "underline",
                rel: "noreferrer",
                children: "Angular Datetime range picker"
              }
            ),
            " | ",
            /* @__PURE__ */ jsx(
              "a",
              {
                target: "_blank",
                href: "https://github.com/BhavinPatel04/ngx-datetime-range-picker",
                className: "underline",
                rel: "noreferrer",
                children: "React Datetime range picker"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "description", children: "This plugin uses bootstrap and moment.js. This plugin can render the components from any UI library you are using in your app as long as the UI library exports Input, Select and Button components." }),
          /* @__PURE__ */ jsxs("div", { className: "tech-stack", children: [
            /* @__PURE__ */ jsx("i", { children: "React" }),
            " | ",
            /* @__PURE__ */ jsx("i", { children: "Angular" })
          ] })
        ] })
      ]
    }
  );
}
function Item({ className = "", name, href, description, techStack }) {
  return /* @__PURE__ */ jsx("div", { className: `item project flex flex-col w-full justify-between h-[50%] ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "info", children: [
    /* @__PURE__ */ jsx("div", { className: "name", children: /* @__PURE__ */ jsx("a", { target: "_blank", href, className: "underline", rel: "noreferrer", children: name }) }),
    /* @__PURE__ */ jsx("div", { className: "description", children: description }),
    /* @__PURE__ */ jsx("div", { className: "tech-stack", children: /* @__PURE__ */ jsx("i", { children: techStack }) })
  ] }) });
}
function OpenSource() {
  return /* @__PURE__ */ jsxs("div", { className: "open-source", children: [
    /* @__PURE__ */ jsx("div", { className: "title flex justify-between", children: /* @__PURE__ */ jsx("div", { className: "title section-title", children: "Projects" }) }),
    /* @__PURE__ */ jsxs("div", { className: "projects flex w-full gap-8 grid grid-cols-1 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "project-container hero-container w-full", children: /* @__PURE__ */ jsx(HeroItem, { className: "p-16 bg-position-[-859px_-256px] md:bg-position-[-10px_-256px] lg:bg-position-[-10px_-256px]" }) }),
      /* @__PURE__ */ jsxs("div", { className: "project-container items-container flex flex-col w-full h-350 gap-8", children: [
        /* @__PURE__ */ jsx(
          Item,
          {
            className: "budget-watcher p-16 bg-position-[-859px_-256px] md:bg-position-[-650px_-256px] lg:bg-position-[-698px_-256px]",
            name: "Budget watcher",
            href: "https://github.com/BhavinPatel04/budget-watcher",
            description: "Developed an OCR-based receipt scanning app with auto-categorization and monthly spending summaries",
            techStack: "React-native"
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            className: "json-schema p-16 bg-position-[-859px_-434px] md:bg-position-[-650px_-434px] lg:bg-position-[-698px_-434px]",
            name: "JSON schema",
            href: "https://github.com/BhavinPatel04/ngx-antd-json-schema-form",
            description: "Angular form using antd",
            techStack: "Angular"
          }
        )
      ] })
    ] })
  ] });
}
function Skills() {
  return /* @__PURE__ */ jsxs("div", { className: "skills", children: [
    /* @__PURE__ */ jsx("div", { className: "title flex justify-between", children: /* @__PURE__ */ jsx("div", { className: "title section-title", children: "Skills" }) }),
    /* @__PURE__ */ jsxs("div", { className: "categories grid gap-16 grid-cols-1 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "language-and-frameworks flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("div", { className: "title", children: "Languages and frameworks" }),
        /* @__PURE__ */ jsx("div", { className: "items secondary-text", children: "JavaScript, TypeScript, ReactJS, Angular, MarkoJS, Redux, GraphQL, Node.js, Spring MVC" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "testing-and-tools flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "title", children: "Testing & Tooling" }),
        /* @__PURE__ */ jsx("div", { className: "items secondary-text", children: "Playwright, Percy, Jest, React Testing Library, Wdio" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "developer-tools flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "title", children: "Developer Tools" }),
        /* @__PURE__ */ jsx("div", { className: "items secondary-text", children: "Git, VS Code, Figma, IntelliJ, Postman, Android Studio" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "other flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "title", children: "Other" }),
        /* @__PURE__ */ jsx("div", { className: "items secondary-text", children: "Accessibility (WCAG), CI/CD pipelines, Slackbot/GitHub/JIRA integrations, UX optimization" })
      ] })
    ] })
  ] });
}
function Carousel({ children, slideCount }) {
  const slides = Children.toArray(children);
  const [current, setCurrent] = useState(0);
  const prevSlide = () => {
    setCurrent(current === 0 ? slideCount - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === slideCount - 1 ? 0 : current + 1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "carousel relative w-full overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex transition-transform duration-500",
        style: { transform: `translateX(-${current * 100}%)` },
        children: slides.map((child, idx) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "slide w-full flex-shrink-0 overflow-hidden lg:overflow-visible",
            children: child
          },
          idx
        ))
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: prevSlide,
        className: "slide-button absolute top-1/2 left-2 -translate-y-1/2 bg-gray-50 bg-opacity-50 text-black rounded-full hover:bg-opacity-70 shadow-md h-40 w-40 lg:hidden",
        children: "←"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: nextSlide,
        className: "slide-button absolute top-1/2 right-2 -translate-y-1/2 bg-gray-50 bg-opacity-50 text-black rounded-full hover:bg-opacity-70 shadow-md h-40 w-40 lg:hidden",
        children: "→"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center items-center gap-4 mt-16", children: Array.from({ length: slideCount }).map((_, idx) => /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setCurrent(idx),
        className: `rounded-full cursor-pointer shadow-md ${current === idx ? "w-10 h-10 bg-white" : "w-6 h-6 bg-gray-400"}`
      },
      idx
    )) })
  ] });
}
function Career() {
  const items = [
    {
      company: "ebay Canada",
      duration: "April 2021 - Present",
      location: "Toronto, ON",
      team: "My Collection (BGE)",
      points: [
        "Led development of a new front-end application for eBay Vault using MarkoJS; launched v1.0 on schedule with zero critical post-release bugs",
        "Among the first in the org to adopt GraphQL, improving efficiency and consistency in front-end data access",
        "Built and maintained accessible shared UI components in MarkoJS and React for scalable use across business units",
        "Automated visual and integration testing at PR level and reduced test run time by 78%, accelerating deployment speed and quality",
        "Designed and developed internal tools to streamline workflows, enable rule management, and boost team productivity",
        "Supported eBay’s homepage initiatives with UX enhancements that positively impacted engagement and revenue",
        "Collaborated cross-functionally with designers and product managers to deliver key features for “My Collection” and MyEbay",
        "Mentored and onboarded new hires and contractors, providing architectural guidance and resolving day-to-day blockers"
      ]
    },
    {
      company: "ebay",
      duration: "June 2019 - April 2021",
      location: "San Jose, CA",
      team: "MyEbay (BGE)",
      points: [
        "Drove migration and modernization of legacy Java pages in the MyEbay section of ebay.com using MarkoJS, aligning with current UI and accessibility standards",
        "Delivered multiple new features with zero post-release bugs by collaborating closely with design and product stakeholders",
        "Implemented a scalable theming system in MarkoJS, reducing long-term maintenance effort during UI revamps",
        "Optimized front-end performance by removing Lodash, significantly reducing bundle size and improving load times",
        "Adopted and integrated ebayui-components into the MyEbay MarkoJS application, ensuring compliance with platform-wide design guidelines",
        "Mentored junior developers and facilitated onboarding for offshore teams, supporting timely delivery and consistent code quality"
      ]
    },
    {
      company: "ebay",
      duration: "January 2017 - June 2019",
      location: "Bellevue, WA",
      team: "M1 (DSS)",
      points: [
        "Built a QA automation tool using Angular and Puppeteer to validate dashboard performance, generate JIRA tickets for front-end issues, and manage on-call schedules",
        "Contributed to a React-based internal dashboard builder enabling self-service analytics",
        "Developed a marketing data visualization app in AngularJS to support business decision-making",
        "Created core UI components aligned with internal style guides to maintain design consistency and reusability",
        "Active contributor to eBay’s open source initiatives including MarkoJS and internal UI libraries"
      ]
    },
    {
      company: "Technumen",
      duration: "March 2014 - December 2016",
      location: "",
      team: "",
      points: [
        "Built internal tools using Spring MVC and JavaScript to support campaign tracking and marketing analytics",
        "Improved login performance of AT&T's mobile app using lazy loading techniques",
        "Created performance monitoring and health check tools to support production systems"
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "career", children: [
    /* @__PURE__ */ jsx("div", { className: "title flex justify-between", children: /* @__PURE__ */ jsx("div", { className: "title section-title", children: "Career" }) }),
    /* @__PURE__ */ jsx("div", { className: "items", children: /* @__PURE__ */ jsx(Carousel, { slideCount: items.length, children: items.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "item w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "item__title text-2xl", children: item.company }),
      /* @__PURE__ */ jsxs("div", { className: "item__sub-title flex justify-between text-xs mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "sub-title__duration", children: item.duration }),
        /* @__PURE__ */ jsx("div", { className: "sub-title__location", children: item.location })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "item__team text-sm mb-4", children: item.team }),
      /* @__PURE__ */ jsx("div", { className: "item__points secondary-text text-sm overflow-hidden", children: /* @__PURE__ */ jsx("ul", { className: "ml-16 lg:mlr-16 list-disc", children: item.points.map((point, idx2) => /* @__PURE__ */ jsx("li", { children: point }, idx2)) }) })
    ] }, idx)) }) })
  ] });
}
function Awards() {
  const items = [
    "Innovation Award for internal tooling",
    "Skunkworks 4th Place (out of 40 teams) – Developed object detection model using TensorFlow to improve mobile buying experience",
    "Spot Award for delivery, teamwork, and initiative"
  ];
  return /* @__PURE__ */ jsxs("div", { className: "awards", children: [
    /* @__PURE__ */ jsx("div", { className: "title flex justify-between", children: /* @__PURE__ */ jsx("div", { className: "title section-title", children: "Awards" }) }),
    /* @__PURE__ */ jsx("ul", { className: "list-disc text-sm mlr-16", children: items.map((item, idx) => /* @__PURE__ */ jsx("li", { children: item }, idx)) })
  ] });
}
function meta() {
  return [{
    title: "Bhavin Kumar Patel- Resume"
  }];
}
const index = UNSAFE_withComponentProps(function Home() {
  const sections = [{
    id: "header",
    component: /* @__PURE__ */ jsx(Header, {}),
    className: "header-container sticky top-0 z-10"
  }, {
    id: "about",
    component: /* @__PURE__ */ jsx(About, {}),
    className: "about-container lg:h-[100vh]"
  }, {
    id: "projects",
    component: /* @__PURE__ */ jsx(OpenSource, {}),
    className: "projects-container"
  }, {
    id: "skills",
    component: /* @__PURE__ */ jsx(Skills, {}),
    className: "skills-container"
  }, {
    id: "career",
    component: /* @__PURE__ */ jsx(Career, {}),
    className: "career-container"
  }, {
    id: "awards",
    component: /* @__PURE__ */ jsx(Awards, {}),
    className: "awards-container"
  }];
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [location.hash]);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("svg", {
      style: {
        position: "absolute",
        width: "0px",
        height: "0px"
      },
      children: [/* @__PURE__ */ jsx("symbol", {
        viewBox: "0 0 50 50",
        id: "icon-linkedin",
        children: /* @__PURE__ */ jsx("path", {
          d: "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
        })
      }), /* @__PURE__ */ jsx("symbol", {
        viewBox: "0 0 64 64",
        id: "icon-github",
        children: /* @__PURE__ */ jsx("path", {
          d: "M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"
        })
      }), /* @__PURE__ */ jsx("symbol", {
        viewBox: "0 0 25 25",
        id: "icon-download",
        children: /* @__PURE__ */ jsx("path", {
          d: "M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "home font-sans flex flex-col gap-24",
      children: [/* @__PURE__ */ jsx("main", {
        className: "flex flex-col gap-24",
        children: sections.map((section, idx) => /* @__PURE__ */ jsx("section", {
          id: section.id,
          className: `section-container plr-16 lg:plr-64 ${section.className}`,
          children: section.component
        }, idx))
      }), /* @__PURE__ */ jsxs("footer", {
        className: "text-center text-sm secondary-text p-4",
        children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " Bhavin Kumar Patel. All rights reserved."]
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CDpSVxuY.js", "imports": ["/assets/chunk-EF7DTUVF-CZPsOLRn.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CkdS9JoV.js", "imports": ["/assets/chunk-EF7DTUVF-CZPsOLRn.js"], "css": ["/assets/root-D96SVOXQ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home/index": { "id": "routes/home/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-XXHjG2zR.js", "imports": ["/assets/chunk-EF7DTUVF-CZPsOLRn.js"], "css": ["/assets/index-ChgnAp_F.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a5318612.js", "version": "a5318612", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home/index": {
    id: "routes/home/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
