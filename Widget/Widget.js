import { jsxs as Xt, jsx as N, Fragment as Qt } from "react/jsx-runtime";
import { useState as Zt, useEffect as er } from "react";
let ae;
function ft(r) {
    return [
        ...r.v,
        (r.i ? "!" : "") + r.n
    ].join(":");
}
function $r(r, e = ",") {
    return r.map(ft).join(e);
}
let tr = typeof CSS < "u" && CSS.escape || // Simplified: escaping only special characters
    // Needed for NodeJS and Edge <79 (https://caniuse.com/mdn-api_css_escape)
    ((r) => r.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
function ze(r) {
    for (var e = 9, t = r.length; t--;)
        e = Math.imul(e ^ r.charCodeAt(t), 1597334677);
    return "#" + ((e ^ e >>> 9) >>> 0).toString(36);
}
function pt(r, e = "@media ") {
    return e + O(r).map((t) => (typeof t == "string" && (t = {
        min: t
    }), t.raw || Object.keys(t).map((i) => `(${i}-width:${t[i]})`).join(" and "))).join(",");
}
function O(r = []) {
    return Array.isArray(r) ? r : r == null ? [] : [
        r
    ];
}
function Tt(r) {
    return r;
}
function Re() {
}
let j = {
    /**
    * 1. `default` (public)
    */
    d: (
        /* efaults */
        0
    ),
    /* Shifts.layer */
    /**
    * 2. `base` (public) — for things like reset rules or default styles applied to plain HTML elements.
    */
    b: (
        /* ase */
        134217728
    ),
    /* Shifts.layer */
    /**
    * 3. `components` (public, used by `style()`) — is for class-based styles that you want to be able to override with utilities.
    */
    c: (
        /* omponents */
        268435456
    ),
    /* Shifts.layer */
    // reserved for style():
    // - props: 0b011
    // - when: 0b100
    /**
    * 6. `aliases` (public, used by `apply()`) — `~(...)`
    */
    a: (
        /* liases */
        671088640
    ),
    /* Shifts.layer */
    /**
    * 6. `utilities` (public) — for small, single-purpose classes
    */
    u: (
        /* tilities */
        805306368
    ),
    /* Shifts.layer */
    /**
    * 7. `overrides` (public, used by `css()`)
    */
    o: (
        /* verrides */
        939524096
    )
};
function rr(r) {
    var e;
    return ((e = r.match(/[-=:;]/g)) == null ? void 0 : e.length) || 0;
}
function rt(r) {
    return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(r) ? Math.max(0, 29.63 * (+RegExp.$1 / (RegExp.$2 ? 15 : 1)) ** 0.137 - 43) : 0, 15) << 22 | /* Shifts.responsive */
        Math.min(rr(r), 15) << 18;
}
let Or = [
    /* fi */
    "rst-c",
    /* hild: 0 */
    /* la */
    "st-ch",
    /* ild: 1 */
    // even and odd use: nth-child
    /* nt */
    "h-chi",
    /* ld: 2 */
    /* an */
    "y-lin",
    /* k: 3 */
    /* li */
    "nk",
    /* : 4 */
    /* vi */
    "sited",
    /* : 5 */
    /* ch */
    "ecked",
    /* : 6 */
    /* em */
    "pty",
    /* : 7 */
    /* re */
    "ad-on",
    /* ly: 8 */
    /* fo */
    "cus-w",
    /* ithin : 9 */
    /* ho */
    "ver",
    /* : 10 */
    /* fo */
    "cus",
    /* : 11 */
    /* fo */
    "cus-v",
    /* isible : 12 */
    /* ac */
    "tive",
    /* : 13 */
    /* di */
    "sable",
    /* d : 14 */
    /* op */
    "tiona",
    /* l: 15 */
    /* re */
    "quire"
];
function gt({ n: r, i: e, v: t = [] }, i, s, n) {
    r && (r = ft({
        n: r,
        i: e,
        v: t
    })), n = [
        ...O(n)
    ];
    for (let a of t) {
        let l = i.theme("screens", a);
        for (let c of O(l && pt(l) || i.v(a))) {
            var o;
            n.push(c), s |= l ? 67108864 | /* Shifts.screens */
                rt(c) : a == "dark" ? 1073741824 : (
                    /* Shifts.darkMode */
                    c[0] == "@" ? rt(c) : (o = c, // use first found pseudo-class
                        1 << ~(/:([a-z-]+)/.test(o) && ~Or.indexOf(RegExp.$1.slice(2, 7)) || -18))
                );
        }
    }
    return {
        n: r,
        p: s,
        r: n,
        i: e
    };
}
let ir = /* @__PURE__ */ new Map();
function it(r) {
    if (r.d) {
        let e = [], t = We(
            // merge all conditions into a selector string
            r.r.reduce((i, s) => s[0] == "@" ? (e.push(s), i) : (
                // Go over the selector and replace the matching multiple selectors if any
                s ? We(i, (n) => We(
                    s,
                    // If the current condition has a nested selector replace it
                    (o) => {
                        let a = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(o);
                        if (a) {
                            let l = n.indexOf(a[1]);
                            return ~l ? (
                                // [':merge(.group):hover .rule', ':merge(.group):focus &'] -> ':merge(.group):focus:hover .rule'
                                // ':merge(.group)' + ':focus' + ':hover .rule'
                                n.slice(0, l) + a[0] + n.slice(l + a[1].length)
                            ) : (
                                // [':merge(.peer):focus~&', ':merge(.group):hover &'] -> ':merge(.peer):focus~:merge(.group):hover &'
                                Ve(n, o)
                            );
                        }
                        return Ve(o, n);
                    }
                )) : i
            ), "&"),
            // replace '&' with rule name or an empty string
            (i) => Ve(i, r.n ? "." + tr(r.n) : "")
        );
        return t && e.push(t.replace(/:merge\((.+?)\)/g, "$1")), e.reduceRight((i, s) => s + "{" + i + "}", r.d);
    }
}
function We(r, e) {
    return r.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (t, i, s) => e(i) + s);
}
function Ve(r, e) {
    return r.replace(/&/g, e);
}
let $t = new Intl.Collator("en", {
    numeric: !0
});
function sr(r, e) {
    for (var t = 0, i = r.length; t < i;) {
        let s = i + t >> 1;
        0 >= nr(r[s], e) ? t = s + 1 : i = s;
    }
    return i;
}
function nr(r, e) {
    let t = r.p & j.o;
    return t == (e.p & j.o) && (t == j.b || t == j.o) ? 0 : r.p - e.p || r.o - e.o || $t.compare(Ot(r.n), Ot(e.n)) || $t.compare(Et(r.n), Et(e.n));
}
function Ot(r) {
    return (r || "").split(/:/).pop().split("/").pop() || "\0";
}
function Et(r) {
    return (r || "").replace(/\W/g, (e) => String.fromCharCode(127 + e.charCodeAt(0))) + "\0";
}
function He(r, e) {
    return Math.round(parseInt(r, 16) * e);
}
function Q(r, e = {}) {
    if (typeof r == "function")
        return r(e);
    let { opacityValue: t = "1", opacityVariable: i } = e, s = i ? `var(${i})` : t;
    if (r.includes("<alpha-value>"))
        return r.replace("<alpha-value>", s);
    if (r[0] == "#" && (r.length == 4 || r.length == 7)) {
        let n = (r.length - 1) / 3, o = [
            17,
            1,
            0.062272
        ][n - 1];
        return `rgba(${[
            He(r.substr(1, n), o),
            He(r.substr(1 + n, n), o),
            He(r.substr(1 + 2 * n, n), o),
            s
        ]})`;
    }
    return s == "1" ? r : s == "0" ? "#0000" : (
        // convert rgb and hsl to alpha variant
        r.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${s})`)
    );
}
function or(r, e, t, i, s = []) {
    return function n(o, { n: a, p: l, r: c = [], i: h }, d) {
        let u = [], g = "", b = 0, m = 0;
        for (let w in o || {}) {
            var y, E;
            let S = o[w];
            if (w[0] == "@") {
                if (!S)
                    continue;
                if (w[1] == "a") {
                    u.push(...bt(a, l, Me("" + S), d, l, c, h, !0));
                    continue;
                }
                if (w[1] == "l") {
                    for (let x of O(S))
                        u.push(...n(x, {
                            n: a,
                            p: (y = j[w[7]], // Set layer (first reset, than set)
                                l & ~j.o | y),
                            r: w[7] == "d" ? [] : c,
                            i: h
                        }, d));
                    continue;
                }
                if (w[1] == "i") {
                    u.push(...O(S).map((x) => ({
                        // before all layers
                        p: -1,
                        o: 0,
                        r: [],
                        d: w + " " + x
                    })));
                    continue;
                }
                if (w[1] == "k") {
                    u.push({
                        p: j.d,
                        o: 0,
                        r: [
                            w
                        ],
                        d: n(S, {
                            p: j.d
                        }, d).map(it).join("")
                    });
                    continue;
                }
                if (w[1] == "f") {
                    u.push(...O(S).map((x) => ({
                        p: j.d,
                        o: 0,
                        r: [
                            w
                        ],
                        d: n(x, {
                            p: j.d
                        }, d).map(it).join("")
                    })));
                    continue;
                }
            }
            if (typeof S != "object" || Array.isArray(S))
                w == "label" && S ? a = S + ze(JSON.stringify([
                    l,
                    h,
                    o
                ])) : (S || S === 0) && (w = w.replace(/[A-Z]/g, (x) => "-" + x.toLowerCase()), m += 1, b = Math.max(b, (E = w)[0] == "-" ? 0 : rr(E) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(E) ? +!!RegExp.$1 || /* +1 */
                    -!!RegExp.$2 : (
                    /* -1 */
                    0
                )) + 1), g += (g ? ";" : "") + O(S).map((x) => d.s(
                    w,
                    // support theme(...) function in values
                    // calc(100vh - theme('spacing.12'))
                    mt("" + x, d.theme) + (h ? " !important" : "")
                )).join(";"));
            else if (w[0] == "@" || w.includes("&")) {
                let x = l;
                w[0] == "@" && (w = w.replace(/\bscreen\(([^)]+)\)/g, (G, ce) => {
                    let V = d.theme("screens", ce);
                    return V ? (x |= 67108864, /* Shifts.screens */
                        pt(V, "")) : G;
                }), x |= rt(w)), u.push(...n(S, {
                    n: a,
                    p: x,
                    r: [
                        ...c,
                        w
                    ],
                    i: h
                }, d));
            } else
                u.push(...n(S, {
                    p: l,
                    r: [
                        ...c,
                        w
                    ]
                }, d));
        }
        return (
            // PERF: prevent unshift using `rules = [{}]` above and then `rules[0] = {...}`
            u.unshift({
                n: a,
                p: l,
                o: (
                    // number of declarations (descending)
                    Math.max(0, 15 - m) + // greatest precedence of properties
                    // if there is no property precedence this is most likely a custom property only declaration
                    // these have the highest precedence
                    1.5 * Math.min(b || 15, 15)
                ),
                r: c,
                // stringified declarations
                d: g
            }), u.sort(nr)
        );
    }(r, gt(e, t, i, s), t);
}
function mt(r, e) {
    return r.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (t, i, s, n, o = "") => {
        let a = e(s, o);
        return typeof a == "function" && /color|fill|stroke/i.test(s) ? Q(a) : "" + O(a).filter((l) => Object(l) !== l);
    });
}
function ar(r, e) {
    let t, i = [];
    for (let s of r)
        s.d && s.n ? (t == null ? void 0 : t.p) == s.p && "" + t.r == "" + s.r ? (t.c = [
            t.c,
            s.c
        ].filter(Boolean).join(" "), t.d = t.d + ";" + s.d) : i.push(t = {
            ...s,
            n: s.n && e
        }) : i.push({
            ...s,
            n: s.n && e
        });
    return i;
}
function Ne(r, e, t = j.u, i, s) {
    let n = [];
    for (let o of r)
        for (let a of function (l, c, h, d, u) {
            l = {
                ...l,
                i: l.i || u
            };
            let g = function (b, m) {
                let y = ir.get(b.n);
                return y ? y(b, m) : m.r(b.n, b.v[0] == "dark");
            }(l, c);
            return g ? (
                // a list of class names
                typeof g == "string" ? ({ r: d, p: h } = gt(l, c, h, d), ar(Ne(Me(g), c, h, d, l.i), l.n)) : Array.isArray(g) ? g.map((b) => {
                    var m, y;
                    return {
                        o: 0,
                        ...b,
                        r: [
                            ...O(d),
                            ...O(b.r)
                        ],
                        p: (m = h, y = b.p ?? h, m & ~j.o | y)
                    };
                }) : or(g, l, c, h, d)
            ) : (
                // propagate className as is
                [
                    {
                        c: ft(l),
                        p: 0,
                        o: 0,
                        r: []
                    }
                ]
            );
        }(o, e, t, i, s))
            n.splice(sr(n, a), 0, a);
    return n;
}
function bt(r, e, t, i, s, n, o, a) {
    return ar((a ? t.flatMap((l) => Ne([
        l
    ], i, s, n, o)) : Ne(t, i, s, n, o)).map((l) => (
        // do not move defaults
        // move only rules with a name unless they are in the base layer
        l.p & j.o && (l.n || e == j.b) ? {
            ...l,
            p: l.p & ~j.o | e,
            o: 0
        } : l
    )), r);
}
function Er(r, e, t, i) {
    var s;
    return s = (n, o) => {
        let { n: a, p: l, r: c, i: h } = gt(n, o, e);
        return t && bt(a, e, t, o, l, c, h, i);
    }, ir.set(r, s), r;
}
function Ge(r, e, t) {
    if (r[r.length - 1] != "(") {
        let i = [], s = !1, n = !1, o = "";
        for (let a of r)
            if (!(a == "(" || /[~@]$/.test(a))) {
                if (a[0] == "!" && (a = a.slice(1), s = !s), a.endsWith(":")) {
                    i[a == "dark:" ? "unshift" : "push"](a.slice(0, -1));
                    continue;
                }
                a[0] == "-" && (a = a.slice(1), n = !n), a.endsWith("-") && (a = a.slice(0, -1)), a && a != "&" && (o += (o && "-") + a);
            }
        o && (n && (o = "-" + o), e[0].push({
            n: o,
            v: i.filter(jr),
            i: s
        }));
    }
}
function jr(r, e, t) {
    return t.indexOf(r) == e;
}
let jt = /* @__PURE__ */ new Map();
function Me(r) {
    let e = jt.get(r);
    if (!e) {
        let t = [], i = [
            []
        ], s = 0, n = 0, o = null, a = 0, l = (c, h = 0) => {
            s != a && (t.push(r.slice(s, a + h)), c && Ge(t, i)), s = a + 1;
        };
        for (; a < r.length; a++) {
            let c = r[a];
            if (n)
                r[a - 1] != "\\" && (n += +(c == "[") || -(c == "]"));
            else if (c == "[")
                n += 1;
            else if (o)
                r[a - 1] != "\\" && o.test(r.slice(a)) && (o = null, s = a + RegExp.lastMatch.length);
            else if (c == "/" && r[a - 1] != "\\" && (r[a + 1] == "*" || r[a + 1] == "/"))
                o = r[a + 1] == "*" ? /^\*\// : /^[\r\n]/;
            else if (c == "(")
                l(), t.push(c);
            else if (c == ":")
                r[a + 1] != ":" && l(!1, 1);
            else if (/[\s,)]/.test(c)) {
                l(!0);
                let h = t.lastIndexOf("(");
                if (c == ")") {
                    let d = t[h - 1];
                    if (/[~@]$/.test(d)) {
                        let u = i.shift();
                        t.length = h, Ge([
                            ...t,
                            "#"
                        ], i);
                        let { v: g } = i[0].pop();
                        for (let b of u)
                            b.v.splice(+(b.v[0] == "dark") - +(g[0] == "dark"), g.length);
                        Ge([
                            ...t,
                            Er(
                                // named nested
                                d.length > 1 ? d.slice(0, -1) + ze(JSON.stringify([
                                    d,
                                    u
                                ])) : d + "(" + $r(u) + ")",
                                j.a,
                                u,
                                /@$/.test(d)
                            )
                        ], i);
                    }
                    h = t.lastIndexOf("(", h - 1);
                }
                t.length = h + 1;
            } else
                /[~@]/.test(c) && r[a + 1] == "(" && // start nested block
                    // ~(...) or button~(...)
                    // @(...) or button@(...)
                    i.unshift([]);
        }
        l(!0), jt.set(r, e = i[0]);
    }
    return e;
}
function f(r, e, t) {
    return [
        r,
        st(e, t)
    ];
}
function st(r, e) {
    return typeof r == "function" ? r : typeof r == "string" && /^[\w-]+$/.test(r) ? (
        // a CSS property alias
        (t, i) => ({
            [r]: e ? e(t, i) : nt(t, 1)
        })
    ) : (t) => (
        // CSSObject, shortcut or apply
        r || {
            [t[1]]: nt(t, 2)
        }
    );
}
function nt(r, e, t = r.slice(e).find(Boolean) || r.$$ || r.input) {
    return r.input[0] == "-" ? `calc(${t} * -1)` : t;
}
function p(r, e, t, i) {
    return [
        r,
        Ar(e, t, i)
    ];
}
function Ar(r, e, t) {
    let i = typeof e == "string" ? (s, n) => ({
        [e]: t ? t(s, n) : s._
    }) : e || (({ 1: s, _: n }, o, a) => ({
        [s || a]: n
    }));
    return (s, n) => {
        let o = lr(r || s[1]), a = n.theme(o, s.$$) ?? Z(s.$$, o, n);
        if (a != null)
            return s._ = nt(s, 0, a), i(s, n, o);
    };
}
function A(r, e = {}, t) {
    return [
        r,
        Cr(e, t)
    ];
}
function Cr(r = {}, e) {
    return (t, i) => {
        let { section: s = lr(t[0]).replace("-", "") + "Color" } = r, [n, o] = Rr(t.$$);
        if (!n)
            return;
        let a = i.theme(s, n) || Z(n, s, i);
        if (!a || typeof a == "object")
            return;
        let {
            // text- -> --tw-text-opacity
            // ring-offset(?:-|$) -> --tw-ring-offset-opacity
            // TODO move this default into preset-tailwind?
            opacityVariable: l = `--tw-${t[0].replace(/-$/, "")}-opacity`,
            opacitySection: c = s.replace("Color", "Opacity"),
            property: h = s,
            selector: d
        } = r, u = i.theme(c, o || "DEFAULT") || o && Z(o, c, i), g = e || (({ _: m }) => {
            let y = Fe(h, m);
            return d ? {
                [d]: y
            } : y;
        });
        t._ = {
            value: Q(a, {
                opacityVariable: l || void 0,
                opacityValue: u || void 0
            }),
            color: (m) => Q(a, m),
            opacityVariable: l || void 0,
            opacityValue: u || void 0
        };
        let b = g(t, i);
        if (!t.dark) {
            let m = i.d(s, n, a);
            m && m !== a && (t._ = {
                value: Q(m, {
                    opacityVariable: l || void 0,
                    opacityValue: u || "1"
                }),
                color: (y) => Q(m, y),
                opacityVariable: l || void 0,
                opacityValue: u || void 0
            }, b = {
                "&": b,
                [i.v("dark")]: g(t, i)
            });
        }
        return b;
    };
}
function Rr(r) {
    return (r.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/) || []).slice(1);
}
function Fe(r, e) {
    let t = {};
    return typeof e == "string" ? t[r] = e : (e.opacityVariable && e.value.includes(e.opacityVariable) && (t[e.opacityVariable] = e.opacityValue || "1"), t[r] = e.value), t;
}
function Z(r, e, t) {
    if (r[0] == "[" && r.slice(-1) == "]") {
        if (r = Ae(mt(r.slice(1, -1), t.theme)), !e)
            return r;
        if (
            // Respect type hints from the user on ambiguous arbitrary values - https://tailwindcss.com/docs/adding-custom-styles#resolving-ambiguities
            !// If this is a color section and the value is a hex color, color function or color name
            (/color|fill|stroke/i.test(e) && !(/^color:/.test(r) || /^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(r)) || // url(, [a-z]-gradient(, image(, cross-fade(, image-set(
                /image/i.test(e) && !(/^image:/.test(r) || /^[a-z-]+\(/.test(r)) || // font-*
                // - fontWeight (type: ['lookup', 'number', 'any'])
                // - fontFamily (type: ['lookup', 'generic-name', 'family-name'])
                /weight/i.test(e) && !(/^(number|any):/.test(r) || /^\d+$/.test(r)) || // bg-*
                // - backgroundPosition (type: ['lookup', ['position', { preferOnConflict: true }]])
                // - backgroundSize (type: ['lookup', 'length', 'percentage', 'size'])
                /position/i.test(e) && /^(length|size):/.test(r))
        )
            return r.replace(/^[a-z-]+:/, "");
    }
}
function lr(r) {
    return r.replace(/-./g, (e) => e[1].toUpperCase());
}
function Ae(r) {
    return (
        // Keep raw strings if it starts with `url(`
        r.includes("url(") ? r.replace(/(.*?)(url\(.*?\))(.*?)/g, (e, t = "", i, s = "") => Ae(t) + i + Ae(s)) : r.replace(/(^|[^\\])_+/g, (e, t) => t + " ".repeat(e.length - t.length)).replace(/\\_/g, "_").replace(/(calc|min|max|clamp)\(.+\)/g, (e) => e.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 "))
    );
}
function cr({ presets: r = [], ...e }) {
    let t = {
        darkMode: void 0,
        darkColor: void 0,
        preflight: e.preflight !== !1 && [],
        theme: {},
        variants: O(e.variants),
        rules: O(e.rules),
        ignorelist: O(e.ignorelist),
        hash: void 0,
        stringify: (i, s) => i + ":" + s,
        finalize: []
    };
    for (let i of O([
        ...r,
        {
            darkMode: e.darkMode,
            darkColor: e.darkColor,
            preflight: e.preflight !== !1 && O(e.preflight),
            theme: e.theme,
            hash: e.hash,
            stringify: e.stringify,
            finalize: e.finalize
        }
    ])) {
        let { preflight: s, darkMode: n = t.darkMode, darkColor: o = t.darkColor, theme: a, variants: l, rules: c, ignorelist: h, hash: d = t.hash, stringify: u = t.stringify, finalize: g } = typeof i == "function" ? i(t) : i;
        t = {
            // values defined by user or previous presets take precedence
            preflight: t.preflight !== !1 && s !== !1 && [
                ...t.preflight,
                ...O(s)
            ],
            darkMode: n,
            darkColor: o,
            theme: {
                ...t.theme,
                ...a,
                extend: {
                    ...t.theme.extend,
                    ...a == null ? void 0 : a.extend
                }
            },
            variants: [
                ...t.variants,
                ...O(l)
            ],
            rules: [
                ...t.rules,
                ...O(c)
            ],
            ignorelist: [
                ...t.ignorelist,
                ...O(h)
            ],
            hash: d,
            stringify: u,
            finalize: [
                ...t.finalize,
                ...O(g)
            ]
        };
    }
    return t;
}
function At(r, e, t, i, s, n) {
    for (let o of e) {
        let a = t.get(o);
        a || t.set(o, a = i(o));
        let l = a(r, s, n);
        if (l)
            return l;
    }
}
function Pr(r) {
    var e;
    return ot(r[0], typeof (e = r[1]) == "function" ? e : () => e);
}
function Ir(r) {
    var e, t;
    return Array.isArray(r) ? ot(r[0], st(r[1], r[2])) : ot(r, st(e, t));
}
function ot(r, e) {
    return hr(r, (t, i, s, n) => {
        let o = i.exec(t);
        if (o)
            return (
                // MATCH.$_ = value
                o.$$ = t.slice(o[0].length), o.dark = n, e(o, s)
            );
    });
}
function hr(r, e) {
    let t = O(r).map(Lr);
    return (i, s, n) => {
        for (let o of t) {
            let a = e(i, o, s, n);
            if (a)
                return a;
        }
    };
}
function Lr(r) {
    return typeof r == "string" ? RegExp("^" + r + (r.includes("$") || r.slice(-1) == "-" ? "" : "$")) : r;
}
function Dr(r, e) {
    let t = cr(r), i = function ({ theme: l, darkMode: c, darkColor: h = Re, variants: d, rules: u, hash: g, stringify: b, ignorelist: m, finalize: y }) {
        let E = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), G = hr(m, (T, R) => R.test(T));
        d.push([
            "dark",
            Array.isArray(c) || c == "class" ? `${O(c)[1] || ".dark"} &` : typeof c == "string" && c != "media" ? c : (
                // a custom selector
                "@media (prefers-color-scheme:dark)"
            )
        ]);
        let ce = typeof g == "function" ? (T) => g(T, ze) : g ? ze : Tt;
        ce !== Tt && y.push((T) => {
            var R;
            return {
                ...T,
                n: T.n && ce(T.n),
                d: (R = T.d) == null ? void 0 : R.replace(/--(tw(?:-[\w-]+)?)\b/g, (M, Je) => "--" + ce(Je).replace("#", ""))
            };
        });
        let V = {
            theme: function ({ extend: T = {}, ...R }) {
                let M = {}, Je = {
                    get colors() {
                        return _e("colors");
                    },
                    theme: _e,
                    // Stub implementation as negated values are automatically infered and do _not_ need to be in the theme
                    negative() {
                        return {};
                    },
                    breakpoints(C) {
                        let I = {};
                        for (let L in C)
                            typeof C[L] == "string" && (I["screen-" + L] = C[L]);
                        return I;
                    }
                };
                return _e;
                function _e(C, I, L, ke) {
                    if (C) {
                        if ({ 1: C, 2: ke } = // eslint-disable-next-line no-sparse-arrays
                            /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(C) || [
                                ,
                                C
                            ], /[.[]/.test(C)) {
                            let q = [];
                            C.replace(/\[([^\]]+)\]|([^.[]+)/g, (te, Se, Tr = Se) => q.push(Tr)), C = q.shift(), L = I, I = q.join("-");
                        }
                        let H = M[C] || // two-step deref to allow extend section to reference base section
                            Object.assign(Object.assign(
                                // Make sure to not get into recursive calls
                                M[C] = {},
                                St(R, C)
                            ), St(T, C));
                        if (I == null)
                            return H;
                        I || (I = "DEFAULT");
                        let ee = H[I] ?? I.split("-").reduce((q, te) => q == null ? void 0 : q[te], H) ?? L;
                        return ke ? Q(ee, {
                            opacityValue: mt(ke, _e)
                        }) : ee;
                    }
                    let xe = {};
                    for (let H of [
                        ...Object.keys(R),
                        ...Object.keys(T)
                    ])
                        xe[H] = _e(H);
                    return xe;
                }
                function St(C, I) {
                    let L = C[I];
                    return typeof L == "function" && (L = L(Je)), L && /color|fill|stroke/i.test(I) ? function ke(xe, H = []) {
                        let ee = {};
                        for (let q in xe) {
                            let te = xe[q], Se = [
                                ...H,
                                q
                            ];
                            ee[Se.join("-")] = te, q == "DEFAULT" && (Se = H, ee[H.join("-")] = te), typeof te == "object" && Object.assign(ee, ke(te, Se));
                        }
                        return ee;
                    }(L) : L;
                }
            }(l),
            e: tr,
            h: ce,
            s(T, R) {
                return b(T, R, V);
            },
            d(T, R, M) {
                return h(T, R, V, M);
            },
            v(T) {
                return E.has(T) || E.set(T, At(T, d, w, Pr, V) || "&:" + T), E.get(T);
            },
            r(T, R) {
                let M = JSON.stringify([
                    T,
                    R
                ]);
                return S.has(M) || S.set(M, !G(T, V) && At(T, u, x, Ir, V, R)), S.get(M);
            },
            f(T) {
                return y.reduce((R, M) => M(R, V), T);
            }
        };
        return V;
    }(t), s = /* @__PURE__ */ new Map(), n = [], o = /* @__PURE__ */ new Set();
    e.resume((l) => s.set(l, l), (l, c) => {
        e.insert(l, n.length, c), n.push(c), o.add(l);
    });
    function a(l) {
        let c = i.f(l), h = it(c);
        if (h && !o.has(h)) {
            o.add(h);
            let d = sr(n, l);
            e.insert(h, d, l), n.splice(d, 0, l);
        }
        return c.n;
    }
    return Object.defineProperties(function (c) {
        if (!s.size)
            for (let d of O(t.preflight))
                typeof d == "function" && (d = d(i)), d && (typeof d == "string" ? bt("", j.b, Me(d), i, j.b, [], !1, !0) : or(d, {}, i, j.b)).forEach(a);
        c = "" + c;
        let h = s.get(c);
        if (!h) {
            let d = /* @__PURE__ */ new Set();
            for (let u of Ne(Me(c), i))
                d.add(u.c).add(a(u));
            h = [
                ...d
            ].filter(Boolean).join(" "), s.set(c, h).set(h, h);
        }
        return h;
    }, Object.getOwnPropertyDescriptors({
        get target() {
            return e.target;
        },
        theme: i.theme,
        config: t,
        snapshot() {
            let l = e.snapshot(), c = new Set(o), h = new Map(s), d = [
                ...n
            ];
            return () => {
                l(), o = c, s = h, n = d;
            };
        },
        clear() {
            e.clear(), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map(), n = [];
        },
        destroy() {
            this.clear(), e.destroy();
        }
    }));
}
function Ur(r, e) {
    return r != e && "" + r.split(" ").sort() != "" + e.split(" ").sort();
}
function Fr(r) {
    let e = new MutationObserver(t);
    return {
        observe(s) {
            e.observe(s, {
                attributeFilter: [
                    "class"
                ],
                subtree: !0,
                childList: !0
            }), i(s), t([
                {
                    target: s,
                    type: ""
                }
            ]);
        },
        disconnect() {
            e.disconnect();
        }
    };
    function t(s) {
        for (let { type: n, target: o } of s)
            if (n[0] == "a")
                i(o);
            else
                for (let a of o.querySelectorAll("[class]"))
                    i(a);
        e.takeRecords();
    }
    function i(s) {
        var a;
        let n, o = (a = s.getAttribute) == null ? void 0 : a.call(s, "class");
        o && Ur(o, n = r(o)) && // Not using `target.className = ...` as that is read-only for SVGElements
            s.setAttribute("class", n);
    }
}
function zr(r = Wr, e = typeof document < "u" && document.documentElement) {
    if (e) {
        let t = Fr(r);
        t.observe(e);
        let { destroy: i } = r;
        r.destroy = () => {
            t.disconnect(), i.call(r);
        };
    }
    return r;
}
function dr(r) {
    let e = document.querySelector(r || 'style[data-twind=""]');
    return (!e || e.tagName != "STYLE") && (e = document.createElement("style"), document.head.prepend(e)), e.dataset.twind = "claimed", e;
}
function Nr(r) {
    let e = r != null && r.cssRules ? r : (r && typeof r != "string" ? r : dr(r)).sheet;
    return {
        target: e,
        snapshot() {
            let t = Array.from(e.cssRules, (i) => i.cssText);
            return () => {
                this.clear(), t.forEach(this.insert);
            };
        },
        clear() {
            for (let t = e.cssRules.length; t--;)
                e.deleteRule(t);
        },
        destroy() {
            var t;
            (t = e.ownerNode) == null || t.remove();
        },
        insert(t, i) {
            try {
                e.insertRule(t, i);
            } catch {
                e.insertRule(":root{}", i);
            }
        },
        resume: Re
    };
}
function Mr(r) {
    let e = r && typeof r != "string" ? r : dr(r);
    return {
        target: e,
        snapshot() {
            let t = Array.from(e.childNodes, (i) => i.textContent);
            return () => {
                this.clear(), t.forEach(this.insert);
            };
        },
        clear() {
            e.textContent = "";
        },
        destroy() {
            e.remove();
        },
        insert(t, i) {
            e.insertBefore(document.createTextNode(t), e.childNodes[i] || null);
        },
        resume: Re
    };
}
function qr(r) {
    let e = [];
    return {
        target: e,
        snapshot() {
            let t = [
                ...e
            ];
            return () => {
                e.splice(0, e.length, ...t);
            };
        },
        clear() {
            e.length = 0;
        },
        destroy() {
            this.clear();
        },
        insert(t, i, s) {
            e.splice(i, 0, r ? `/*!${s.p.toString(36)},${(2 * s.o).toString(36)}${s.n ? "," + s.n : ""}*/${t}` : t);
        },
        resume: Re
    };
}
function ur(r, e) {
    let t = typeof document > "u" ? qr(!e) : r ? Mr() : Nr();
    return e || (t.resume = Jr), t;
}
function Br(r) {
    return (
        // prefer the raw text content of a CSSStyleSheet as it may include the resume data
        (r.ownerNode || r).textContent || (r.cssRules ? Array.from(r.cssRules, (e) => e.cssText) : O(r)).join("")
    );
}
function Jr(r, e) {
    let t = Br(this.target), i = /\/\*!([\da-z]+),([\da-z]+)(?:,(.+?))?\*\//g;
    if (i.test(t)) {
        var s;
        let n;
        if (i.lastIndex = 0, this.clear(), typeof document < "u")
            for (let o of document.querySelectorAll("[class]"))
                r(o.getAttribute("class"));
        for (; s = i.exec(t), n && e(
            // grep the cssText from the previous match end up to this match start
            t.slice(n.index + n[0].length, s == null ? void 0 : s.index),
            {
                p: parseInt(n[1], 36),
                o: parseInt(n[2], 36) / 2,
                n: n[3]
            }
        ), n = s;)
            ;
    }
}
let Wr = /* @__PURE__ */ new Proxy(
    // just exposing the active as tw should work with most bundlers
    // as ES module export can be re-assigned BUT some bundlers to not honor this
    // -> using a delegation proxy here
    Re,
    {
        apply(r, e, t) {
            return ae(t[0]);
        },
        get(r, e) {
            let t = ae[e];
            return typeof t == "function" ? function () {
                return t.apply(ae, arguments);
            } : t;
        }
    }
);
function Vr(r = {}, e = ur, t) {
    return ae == null || ae.destroy(), ae = zr(Dr(r, typeof e == "function" ? e() : e), t);
}
function Hr(r, e = !0) {
    let t = cr(r);
    return Vr({
        ...t,
        // in production use short hashed class names
        hash: t.hash ?? e
    }, () => ur(!e));
}
var Gr = /* @__PURE__ */ new Map([["align-self", "-ms-grid-row-align"], ["color-adjust", "-webkit-print-color-adjust"], ["column-gap", "grid-column-gap"], ["forced-color-adjust", "-ms-high-contrast-adjust"], ["gap", "grid-gap"], ["grid-template-columns", "-ms-grid-columns"], ["grid-template-rows", "-ms-grid-rows"], ["justify-self", "-ms-grid-column-align"], ["margin-inline-end", "-webkit-margin-end"], ["margin-inline-start", "-webkit-margin-start"], ["mask-border", "-webkit-mask-box-image"], ["mask-border-outset", "-webkit-mask-box-image-outset"], ["mask-border-slice", "-webkit-mask-box-image-slice"], ["mask-border-source", "-webkit-mask-box-image-source"], ["mask-border-repeat", "-webkit-mask-box-image-repeat"], ["mask-border-width", "-webkit-mask-box-image-width"], ["overflow-wrap", "word-wrap"], ["padding-inline-end", "-webkit-padding-end"], ["padding-inline-start", "-webkit-padding-start"], ["print-color-adjust", "color-adjust"], ["row-gap", "grid-row-gap"], ["scroll-margin-bottom", "scroll-snap-margin-bottom"], ["scroll-margin-left", "scroll-snap-margin-left"], ["scroll-margin-right", "scroll-snap-margin-right"], ["scroll-margin-top", "scroll-snap-margin-top"], ["scroll-margin", "scroll-snap-margin"], ["text-combine-upright", "-ms-text-combine-horizontal"]]);
function Kr(r) {
    return Gr.get(r);
}
function Yr(r) {
    var e = /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(r);
    return e ? e[1] ? 1 : e[2] ? 2 : e[3] ? 3 : 5 : 0;
}
function Xr(r, e) {
    var t = /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(r);
    return t ? t[1] ? /^sti/i.test(e) ? 1 : 0 : t[2] ? /^pat/i.test(e) ? 1 : 0 : t[3] ? /^image-/i.test(e) ? 1 : 0 : t[4] ? e[3] === "-" ? 2 : 0 : /^(?:inline-)?grid$/i.test(e) ? 4 : 0 : 0;
}
let Qr = [
    [
        "-webkit-",
        1
    ],
    // 0b001
    [
        "-moz-",
        2
    ],
    // 0b010
    [
        "-ms-",
        4
    ]
];
function Zr() {
    return ({ stringify: r }) => ({
        stringify(e, t, i) {
            let s = "", n = Kr(e);
            n && (s += r(n, t, i) + ";");
            let o = Yr(e), a = Xr(e, t);
            for (let l of Qr)
                o & l[1] && (s += r(l[0] + e, t, i) + ";"), a & l[1] && (s += r(e, l[0] + t, i) + ";");
            return s + r(e, t, i);
        }
    });
}
let at = {
    screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
    },
    columns: {
        auto: "auto",
        // Handled by plugin,
        // 1: '1',
        // 2: '2',
        // 3: '3',
        // 4: '4',
        // 5: '5',
        // 6: '6',
        // 7: '7',
        // 8: '8',
        // 9: '9',
        // 10: '10',
        // 11: '11',
        // 12: '12',
        "3xs": "16rem",
        "2xs": "18rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem"
    },
    spacing: {
        px: "1px",
        0: "0px",
        .../* @__PURE__ */ D(4, "rem", 4, 0.5, 0.5),
        // 0.5: '0.125rem',
        // 1: '0.25rem',
        // 1.5: '0.375rem',
        // 2: '0.5rem',
        // 2.5: '0.625rem',
        // 3: '0.75rem',
        // 3.5: '0.875rem',
        // 4: '1rem',
        .../* @__PURE__ */ D(12, "rem", 4, 5),
        // 5: '1.25rem',
        // 6: '1.5rem',
        // 7: '1.75rem',
        // 8: '2rem',
        // 9: '2.25rem',
        // 10: '2.5rem',
        // 11: '2.75rem',
        // 12: '3rem',
        14: "3.5rem",
        .../* @__PURE__ */ D(64, "rem", 4, 16, 4),
        // 16: '4rem',
        // 20: '5rem',
        // 24: '6rem',
        // 28: '7rem',
        // 32: '8rem',
        // 36: '9rem',
        // 40: '10rem',
        // 44: '11rem',
        // 48: '12rem',
        // 52: '13rem',
        // 56: '14rem',
        // 60: '15rem',
        // 64: '16rem',
        72: "18rem",
        80: "20rem",
        96: "24rem"
    },
    durations: {
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms"
    },
    animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        bounce: "bounce 1s infinite"
    },
    aspectRatio: {
        auto: "auto",
        square: "1/1",
        video: "16/9"
    },
    backdropBlur: /* @__PURE__ */ k("blur"),
    backdropBrightness: /* @__PURE__ */ k("brightness"),
    backdropContrast: /* @__PURE__ */ k("contrast"),
    backdropGrayscale: /* @__PURE__ */ k("grayscale"),
    backdropHueRotate: /* @__PURE__ */ k("hueRotate"),
    backdropInvert: /* @__PURE__ */ k("invert"),
    backdropOpacity: /* @__PURE__ */ k("opacity"),
    backdropSaturate: /* @__PURE__ */ k("saturate"),
    backdropSepia: /* @__PURE__ */ k("sepia"),
    backgroundColor: /* @__PURE__ */ k("colors"),
    backgroundImage: {
        none: "none"
    },
    // These are built-in
    // 'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
    // 'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
    // 'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
    // 'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
    // 'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
    // 'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
    // 'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
    // 'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    backgroundOpacity: /* @__PURE__ */ k("opacity"),
    // backgroundPosition: {
    //   // The following are already handled by the plugin:
    //   // center, right, left, bottom, top
    //   // 'bottom-10px-right-20px' -> bottom 10px right 20px
    // },
    backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain"
    },
    blur: {
        none: "none",
        0: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px"
    },
    brightness: {
        .../* @__PURE__ */ D(200, "", 100, 0, 50),
        // 0: '0',
        // 50: '.5',
        // 150: '1.5',
        // 200: '2',
        .../* @__PURE__ */ D(110, "", 100, 90, 5),
        // 90: '.9',
        // 95: '.95',
        // 100: '1',
        // 105: '1.05',
        // 110: '1.1',
        75: "0.75",
        125: "1.25"
    },
    borderColor: ({ theme: r }) => ({
        DEFAULT: r("colors.gray.200", "currentColor"),
        ...r("colors")
    }),
    borderOpacity: /* @__PURE__ */ k("opacity"),
    borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "1/2": "50%",
        full: "9999px"
    },
    borderSpacing: /* @__PURE__ */ k("spacing"),
    borderWidth: {
        DEFAULT: "1px",
        .../* @__PURE__ */ F(8, "px")
    },
    // 0: '0px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',
    boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
        "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
        inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)",
        none: "0 0 #0000"
    },
    boxShadowColor: k("colors"),
    // container: {},
    // cursor: {
    //   // Default values are handled by plugin
    // },
    caretColor: /* @__PURE__ */ k("colors"),
    accentColor: ({ theme: r }) => ({
        auto: "auto",
        ...r("colors")
    }),
    contrast: {
        .../* @__PURE__ */ D(200, "", 100, 0, 50),
        // 0: '0',
        // 50: '.5',
        // 150: '1.5',
        // 200: '2',
        75: "0.75",
        125: "1.25"
    },
    content: {
        none: "none"
    },
    divideColor: /* @__PURE__ */ k("borderColor"),
    divideOpacity: /* @__PURE__ */ k("borderOpacity"),
    divideWidth: /* @__PURE__ */ k("borderWidth"),
    dropShadow: {
        sm: "0 1px 1px rgba(0,0,0,0.05)",
        DEFAULT: [
            "0 1px 2px rgba(0,0,0,0.1)",
            "0 1px 1px rgba(0,0,0,0.06)"
        ],
        md: [
            "0 4px 3px rgba(0,0,0,0.07)",
            "0 2px 2px rgba(0,0,0,0.06)"
        ],
        lg: [
            "0 10px 8px rgba(0,0,0,0.04)",
            "0 4px 3px rgba(0,0,0,0.1)"
        ],
        xl: [
            "0 20px 13px rgba(0,0,0,0.03)",
            "0 8px 5px rgba(0,0,0,0.08)"
        ],
        "2xl": "0 25px 25px rgba(0,0,0,0.15)",
        none: "0 0 #0000"
    },
    fill: ({ theme: r }) => ({
        ...r("colors"),
        none: "none"
    }),
    grayscale: {
        DEFAULT: "100%",
        0: "0"
    },
    hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg"
    },
    invert: {
        DEFAULT: "100%",
        0: "0"
    },
    flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none"
    },
    flexBasis: ({ theme: r }) => ({
        ...r("spacing"),
        ...Te(2, 6),
        // '1/2': '50%',
        // '1/3': '33.333333%',
        // '2/3': '66.666667%',
        // '1/4': '25%',
        // '2/4': '50%',
        // '3/4': '75%',
        // '1/5': '20%',
        // '2/5': '40%',
        // '3/5': '60%',
        // '4/5': '80%',
        // '1/6': '16.666667%',
        // '2/6': '33.333333%',
        // '3/6': '50%',
        // '4/6': '66.666667%',
        // '5/6': '83.333333%',
        ...Te(12, 12),
        // '1/12': '8.333333%',
        // '2/12': '16.666667%',
        // '3/12': '25%',
        // '4/12': '33.333333%',
        // '5/12': '41.666667%',
        // '6/12': '50%',
        // '7/12': '58.333333%',
        // '8/12': '66.666667%',
        // '9/12': '75%',
        // '10/12': '83.333333%',
        // '11/12': '91.666667%',
        auto: "auto",
        full: "100%"
    }),
    flexGrow: {
        DEFAULT: 1,
        0: 0
    },
    flexShrink: {
        DEFAULT: 1,
        0: 0
    },
    fontFamily: {
        sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(","),
        serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(","),
        mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(",")
    },
    fontSize: {
        xs: [
            "0.75rem",
            "1rem"
        ],
        sm: [
            "0.875rem",
            "1.25rem"
        ],
        base: [
            "1rem",
            "1.5rem"
        ],
        lg: [
            "1.125rem",
            "1.75rem"
        ],
        xl: [
            "1.25rem",
            "1.75rem"
        ],
        "2xl": [
            "1.5rem",
            "2rem"
        ],
        "3xl": [
            "1.875rem",
            "2.25rem"
        ],
        "4xl": [
            "2.25rem",
            "2.5rem"
        ],
        "5xl": [
            "3rem",
            "1"
        ],
        "6xl": [
            "3.75rem",
            "1"
        ],
        "7xl": [
            "4.5rem",
            "1"
        ],
        "8xl": [
            "6rem",
            "1"
        ],
        "9xl": [
            "8rem",
            "1"
        ]
    },
    fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900"
    },
    gap: /* @__PURE__ */ k("spacing"),
    gradientColorStops: /* @__PURE__ */ k("colors"),
    gridAutoColumns: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)"
    },
    gridAutoRows: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)"
    },
    gridColumn: {
        // span-X is handled by the plugin: span-1 -> span 1 / span 1
        auto: "auto",
        "span-full": "1 / -1"
    },
    // gridColumnEnd: {
    //   // Defaults handled by plugin
    // },
    // gridColumnStart: {
    //   // Defaults handled by plugin
    // },
    gridRow: {
        // span-X is handled by the plugin: span-1 -> span 1 / span 1
        auto: "auto",
        "span-full": "1 / -1"
    },
    // gridRowStart: {
    //   // Defaults handled by plugin
    // },
    // gridRowEnd: {
    //   // Defaults handled by plugin
    // },
    gridTemplateColumns: {
        // numbers are handled by the plugin: 1 -> repeat(1, minmax(0, 1fr))
        none: "none"
    },
    gridTemplateRows: {
        // numbers are handled by the plugin: 1 -> repeat(1, minmax(0, 1fr))
        none: "none"
    },
    height: ({ theme: r }) => ({
        ...r("spacing"),
        ...Te(2, 6),
        // '1/2': '50%',
        // '1/3': '33.333333%',
        // '2/3': '66.666667%',
        // '1/4': '25%',
        // '2/4': '50%',
        // '3/4': '75%',
        // '1/5': '20%',
        // '2/5': '40%',
        // '3/5': '60%',
        // '4/5': '80%',
        // '1/6': '16.666667%',
        // '2/6': '33.333333%',
        // '3/6': '50%',
        // '4/6': '66.666667%',
        // '5/6': '83.333333%',
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        auto: "auto",
        full: "100%",
        screen: "100vh"
    }),
    inset: ({ theme: r }) => ({
        ...r("spacing"),
        ...Te(2, 4),
        // '1/2': '50%',
        // '1/3': '33.333333%',
        // '2/3': '66.666667%',
        // '1/4': '25%',
        // '2/4': '50%',
        // '3/4': '75%',
        auto: "auto",
        full: "100%"
    }),
    keyframes: {
        spin: {
            from: {
                transform: "rotate(0deg)"
            },
            to: {
                transform: "rotate(360deg)"
            }
        },
        ping: {
            "0%": {
                transform: "scale(1)",
                opacity: "1"
            },
            "75%,100%": {
                transform: "scale(2)",
                opacity: "0"
            }
        },
        pulse: {
            "0%,100%": {
                opacity: "1"
            },
            "50%": {
                opacity: ".5"
            }
        },
        bounce: {
            "0%, 100%": {
                transform: "translateY(-25%)",
                animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
            },
            "50%": {
                transform: "none",
                animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
            }
        }
    },
    letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
    },
    lineHeight: {
        .../* @__PURE__ */ D(10, "rem", 4, 3),
        // 3: '.75rem',
        // 4: '1rem',
        // 5: '1.25rem',
        // 6: '1.5rem',
        // 7: '1.75rem',
        // 8: '2rem',
        // 9: '2.25rem',
        // 10: '2.5rem',
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2"
    },
    // listStyleType: {
    //   // Defaults handled by plugin
    // },
    margin: ({ theme: r }) => ({
        auto: "auto",
        ...r("spacing")
    }),
    maxHeight: ({ theme: r }) => ({
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        screen: "100vh",
        ...r("spacing")
    }),
    maxWidth: ({ theme: r, breakpoints: e }) => ({
        ...e(r("screens")),
        none: "none",
        0: "0rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch"
    }),
    minHeight: {
        0: "0px",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        screen: "100vh"
    },
    minWidth: {
        0: "0px",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
    },
    // objectPosition: {
    //   // The plugins joins all arguments by default
    // },
    opacity: {
        .../* @__PURE__ */ D(100, "", 100, 0, 10),
        // 0: '0',
        // 10: '0.1',
        // 20: '0.2',
        // 30: '0.3',
        // 40: '0.4',
        // 60: '0.6',
        // 70: '0.7',
        // 80: '0.8',
        // 90: '0.9',
        // 100: '1',
        5: "0.05",
        25: "0.25",
        75: "0.75",
        95: "0.95"
    },
    order: {
        // Handled by plugin
        // 1: '1',
        // 2: '2',
        // 3: '3',
        // 4: '4',
        // 5: '5',
        // 6: '6',
        // 7: '7',
        // 8: '8',
        // 9: '9',
        // 10: '10',
        // 11: '11',
        // 12: '12',
        first: "-9999",
        last: "9999",
        none: "0"
    },
    padding: /* @__PURE__ */ k("spacing"),
    placeholderColor: /* @__PURE__ */ k("colors"),
    placeholderOpacity: /* @__PURE__ */ k("opacity"),
    outlineColor: /* @__PURE__ */ k("colors"),
    outlineOffset: /* @__PURE__ */ F(8, "px"),
    // 0: '0px',
    // 1: '1px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',,
    outlineWidth: /* @__PURE__ */ F(8, "px"),
    // 0: '0px',
    // 1: '1px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',,
    ringColor: ({ theme: r }) => ({
        ...r("colors"),
        DEFAULT: "#3b82f6"
    }),
    ringOffsetColor: /* @__PURE__ */ k("colors"),
    ringOffsetWidth: /* @__PURE__ */ F(8, "px"),
    // 0: '0px',
    // 1: '1px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',,
    ringOpacity: ({ theme: r }) => ({
        ...r("opacity"),
        DEFAULT: "0.5"
    }),
    ringWidth: {
        DEFAULT: "3px",
        .../* @__PURE__ */ F(8, "px")
    },
    // 0: '0px',
    // 1: '1px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',
    rotate: {
        .../* @__PURE__ */ F(2, "deg"),
        // 0: '0deg',
        // 1: '1deg',
        // 2: '2deg',
        .../* @__PURE__ */ F(12, "deg", 3),
        // 3: '3deg',
        // 6: '6deg',
        // 12: '12deg',
        .../* @__PURE__ */ F(180, "deg", 45)
    },
    // 45: '45deg',
    // 90: '90deg',
    // 180: '180deg',
    saturate: /* @__PURE__ */ D(200, "", 100, 0, 50),
    // 0: '0',
    // 50: '.5',
    // 100: '1',
    // 150: '1.5',
    // 200: '2',
    scale: {
        .../* @__PURE__ */ D(150, "", 100, 0, 50),
        // 0: '0',
        // 50: '.5',
        // 150: '1.5',
        .../* @__PURE__ */ D(110, "", 100, 90, 5),
        // 90: '.9',
        // 95: '.95',
        // 100: '1',
        // 105: '1.05',
        // 110: '1.1',
        75: "0.75",
        125: "1.25"
    },
    scrollMargin: /* @__PURE__ */ k("spacing"),
    scrollPadding: /* @__PURE__ */ k("spacing"),
    sepia: {
        0: "0",
        DEFAULT: "100%"
    },
    skew: {
        .../* @__PURE__ */ F(2, "deg"),
        // 0: '0deg',
        // 1: '1deg',
        // 2: '2deg',
        .../* @__PURE__ */ F(12, "deg", 3)
    },
    // 3: '3deg',
    // 6: '6deg',
    // 12: '12deg',
    space: /* @__PURE__ */ k("spacing"),
    stroke: ({ theme: r }) => ({
        ...r("colors"),
        none: "none"
    }),
    strokeWidth: /* @__PURE__ */ D(2),
    // 0: '0',
    // 1: '1',
    // 2: '2',,
    textColor: /* @__PURE__ */ k("colors"),
    textDecorationColor: /* @__PURE__ */ k("colors"),
    textDecorationThickness: {
        "from-font": "from-font",
        auto: "auto",
        .../* @__PURE__ */ F(8, "px")
    },
    // 0: '0px',
    // 1: '1px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',
    textUnderlineOffset: {
        auto: "auto",
        .../* @__PURE__ */ F(8, "px")
    },
    // 0: '0px',
    // 1: '1px',
    // 2: '2px',
    // 4: '4px',
    // 8: '8px',
    textIndent: /* @__PURE__ */ k("spacing"),
    textOpacity: /* @__PURE__ */ k("opacity"),
    // transformOrigin: {
    //   // The following are already handled by the plugin:
    //   // center, right, left, bottom, top
    //   // 'bottom-10px-right-20px' -> bottom 10px right 20px
    // },
    transitionDuration: ({ theme: r }) => ({
        ...r("durations"),
        DEFAULT: "150ms"
    }),
    transitionDelay: /* @__PURE__ */ k("durations"),
    transitionProperty: {
        none: "none",
        all: "all",
        DEFAULT: "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
        colors: "color,background-color,border-color,text-decoration-color,fill,stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform"
    },
    transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
        linear: "linear",
        in: "cubic-bezier(0.4,0,1,1)",
        out: "cubic-bezier(0,0,0.2,1)",
        "in-out": "cubic-bezier(0.4,0,0.2,1)"
    },
    translate: ({ theme: r }) => ({
        ...r("spacing"),
        ...Te(2, 4),
        // '1/2': '50%',
        // '1/3': '33.333333%',
        // '2/3': '66.666667%',
        // '1/4': '25%',
        // '2/4': '50%',
        // '3/4': '75%',
        full: "100%"
    }),
    width: ({ theme: r }) => ({
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        screen: "100vw",
        ...r("flexBasis")
    }),
    willChange: {
        scroll: "scroll-position"
    },
    // other options handled by rules
    // auto: 'auto',
    // contents: 'contents',
    // transform: 'transform',
    zIndex: {
        .../* @__PURE__ */ D(50, "", 1, 0, 10),
        // 0: '0',
        // 10: '10',
        // 20: '20',
        // 30: '30',
        // 40: '40',
        // 50: '50',
        auto: "auto"
    }
};
function Te(r, e) {
    let t = {};
    do
        for (var i = 1; i < r; i++)
            t[`${i}/${r}`] = Number((i / r * 100).toFixed(6)) + "%";
    while (++r <= e);
    return t;
}
function F(r, e, t = 0) {
    let i = {};
    for (; t <= r; t = 2 * t || 1)
        i[t] = t + e;
    return i;
}
function D(r, e = "", t = 1, i = 0, s = 1, n = {}) {
    for (; i <= r; i += s)
        n[i] = i / t + e;
    return n;
}
function k(r) {
    return ({ theme: e }) => e(r);
}
let ei = {
    /*
    1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
    2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
    */
    "*,::before,::after": {
        boxSizing: "border-box",
        /* 1 */
        borderWidth: "0",
        /* 2 */
        borderStyle: "solid",
        /* 2 */
        borderColor: "theme(borderColor.DEFAULT, currentColor)"
    },
    /* 2 */
    "::before,::after": {
        "--tw-content": "''"
    },
    /*
    1. Use a consistent sensible line-height in all browsers.
    2. Prevent adjustments of font size after orientation changes in iOS.
    3. Use a more readable tab size.
    4. Use the user's configured `sans` font-family by default.
    5. Use the user's configured `sans` font-feature-settings by default.
    */
    html: {
        lineHeight: 1.5,
        /* 1 */
        WebkitTextSizeAdjust: "100%",
        /* 2 */
        MozTabSize: "4",
        /* 3 */
        tabSize: 4,
        /* 3 */
        fontFamily: `theme(fontFamily.sans, ${at.fontFamily.sans})`,
        /* 4 */
        fontFeatureSettings: "theme(fontFamily.sans[1].fontFeatureSettings, normal)"
    },
    /* 5 */
    /*
    1. Remove the margin in all browsers.
    2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
    */
    body: {
        margin: "0",
        /* 1 */
        lineHeight: "inherit"
    },
    /* 2 */
    /*
    1. Add the correct height in Firefox.
    2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
    3. Ensure horizontal rules are visible by default.
    */
    hr: {
        height: "0",
        /* 1 */
        color: "inherit",
        /* 2 */
        borderTopWidth: "1px"
    },
    /* 3 */
    /*
    Add the correct text decoration in Chrome, Edge, and Safari.
    */
    "abbr:where([title])": {
        textDecoration: "underline dotted"
    },
    /*
    Remove the default font size and weight for headings.
    */
    "h1,h2,h3,h4,h5,h6": {
        fontSize: "inherit",
        fontWeight: "inherit"
    },
    /*
    Reset links to optimize for opt-in styling instead of opt-out.
    */
    a: {
        color: "inherit",
        textDecoration: "inherit"
    },
    /*
    Add the correct font weight in Edge and Safari.
    */
    "b,strong": {
        fontWeight: "bolder"
    },
    /*
    1. Use the user's configured `mono` font family by default.
    2. Use the user's configured `mono` font-feature-settings by default.
    3. Correct the odd `em` font sizing in all browsers.
    */
    "code,kbd,samp,pre": {
        fontFamily: `theme(fontFamily.mono, ${at.fontFamily.mono})`,
        fontFeatureSettings: "theme(fontFamily.mono[1].fontFeatureSettings, normal)",
        fontSize: "1em"
    },
    /*
    Add the correct font size in all browsers.
    */
    small: {
        fontSize: "80%"
    },
    /*
    Prevent `sub` and `sup` elements from affecting the line height in all browsers.
    */
    "sub,sup": {
        fontSize: "75%",
        lineHeight: 0,
        position: "relative",
        verticalAlign: "baseline"
    },
    sub: {
        bottom: "-0.25em"
    },
    sup: {
        top: "-0.5em"
    },
    /*
    1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
    2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
    3. Remove gaps between table borders by default.
    */
    table: {
        textIndent: "0",
        /* 1 */
        borderColor: "inherit",
        /* 2 */
        borderCollapse: "collapse"
    },
    /* 3 */
    /*
    1. Change the font styles in all browsers.
    2. Remove the margin in Firefox and Safari.
    3. Remove default padding in all browsers.
    */
    "button,input,optgroup,select,textarea": {
        fontFamily: "inherit",
        /* 1 */
        fontSize: "100%",
        /* 1 */
        lineHeight: "inherit",
        /* 1 */
        color: "inherit",
        /* 1 */
        margin: "0",
        /* 2 */
        padding: "0"
    },
    /* 3 */
    /*
    Remove the inheritance of text transform in Edge and Firefox.
    */
    "button,select": {
        textTransform: "none"
    },
    /*
    1. Correct the inability to style clickable types in iOS and Safari.
    2. Remove default button styles.
    */
    "button,[type='button'],[type='reset'],[type='submit']": {
        WebkitAppearance: "button",
        /* 1 */
        backgroundColor: "transparent",
        /* 2 */
        backgroundImage: "none"
    },
    /* 4 */
    /*
    Use the modern Firefox focus style for all focusable elements.
    */
    ":-moz-focusring": {
        outline: "auto"
    },
    /*
    Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
    */
    ":-moz-ui-invalid": {
        boxShadow: "none"
    },
    /*
    Add the correct vertical alignment in Chrome and Firefox.
    */
    progress: {
        verticalAlign: "baseline"
    },
    /*
    Correct the cursor style of increment and decrement buttons in Safari.
    */
    "::-webkit-inner-spin-button,::-webkit-outer-spin-button": {
        height: "auto"
    },
    /*
    1. Correct the odd appearance in Chrome and Safari.
    2. Correct the outline style in Safari.
    */
    "[type='search']": {
        WebkitAppearance: "textfield",
        /* 1 */
        outlineOffset: "-2px"
    },
    /* 2 */
    /*
    Remove the inner padding in Chrome and Safari on macOS.
    */
    "::-webkit-search-decoration": {
        WebkitAppearance: "none"
    },
    /*
    1. Correct the inability to style clickable types in iOS and Safari.
    2. Change font properties to `inherit` in Safari.
    */
    "::-webkit-file-upload-button": {
        WebkitAppearance: "button",
        /* 1 */
        font: "inherit"
    },
    /* 2 */
    /*
    Add the correct display in Chrome and Safari.
    */
    summary: {
        display: "list-item"
    },
    /*
    Removes the default spacing and border for appropriate elements.
    */
    "blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre": {
        margin: "0"
    },
    fieldset: {
        margin: "0",
        padding: "0"
    },
    legend: {
        padding: "0"
    },
    "ol,ul,menu": {
        listStyle: "none",
        margin: "0",
        padding: "0"
    },
    /*
    Prevent resizing textareas horizontally by default.
    */
    textarea: {
        resize: "vertical"
    },
    /*
    1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
    2. Set the default placeholder color to the user's configured gray 400 color.
    */
    "input::placeholder,textarea::placeholder": {
        opacity: 1,
        /* 1 */
        color: "theme(colors.gray.400, #9ca3af)"
    },
    /* 2 */
    /*
    Set the default cursor for buttons.
    */
    'button,[role="button"]': {
        cursor: "pointer"
    },
    /*
    Make sure disabled buttons don't get the pointer cursor.
    */
    ":disabled": {
        cursor: "default"
    },
    /*
    1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
    2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
      This can trigger a poorly considered lint error in some tools but is included by design.
    */
    "img,svg,video,canvas,audio,iframe,embed,object": {
        display: "block",
        /* 1 */
        verticalAlign: "middle"
    },
    /* 2 */
    /*
    Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
    */
    "img,video": {
        maxWidth: "100%",
        height: "auto"
    },
    /* Make elements with the HTML hidden attribute stay hidden by default */
    "[hidden]": {
        display: "none"
    }
}, ti = [
    /* arbitrary properties: [paint-order:markers] */
    f("\\[([-\\w]+):(.+)]", ({ 1: r, 2: e }, t) => ({
        "@layer overrides": {
            "&": {
                [r]: Z(`[${e}]`, "", t)
            }
        }
    })),
    /* Styling based on parent and peer state */
    f("(group|peer)([~/][^-[]+)?", ({ input: r }, { h: e }) => [
        {
            c: e(r)
        }
    ]),
    /* LAYOUT */
    p("aspect-", "aspectRatio"),
    f("container", (r, { theme: e }) => {
        let { screens: t = e("screens"), center: i, padding: s } = e("container"), n = {
            width: "100%",
            marginRight: i && "auto",
            marginLeft: i && "auto",
            ...o("xs")
        };
        for (let a in t) {
            let l = t[a];
            typeof l == "string" && (n[pt(l)] = {
                "&": {
                    maxWidth: l,
                    ...o(a)
                }
            });
        }
        return n;
        function o(a) {
            let l = s && (typeof s == "string" ? s : s[a] || s.DEFAULT);
            if (l)
                return {
                    paddingRight: l,
                    paddingLeft: l
                };
        }
    }),
    // Content
    p("content-", "content", ({ _: r }) => ({
        "--tw-content": r,
        content: "var(--tw-content)"
    })),
    // Box Decoration Break
    f("(?:box-)?decoration-(slice|clone)", "boxDecorationBreak"),
    // Box Sizing
    f("box-(border|content)", "boxSizing", ({ 1: r }) => r + "-box"),
    // Display
    f("hidden", {
        display: "none"
    }),
    // Table Layout
    f("table-(auto|fixed)", "tableLayout"),
    f([
        "(block|flex|table|grid|inline|contents|flow-root|list-item)",
        "(inline-(block|flex|table|grid))",
        "(table-(caption|cell|column|row|(column|row|footer|header)-group))"
    ], "display"),
    // Floats
    "(float)-(left|right|none)",
    // Clear
    "(clear)-(left|right|none|both)",
    // Overflow
    "(overflow(?:-[xy])?)-(auto|hidden|clip|visible|scroll)",
    // Isolation
    "(isolation)-(auto)",
    // Isolation
    f("isolate", "isolation"),
    // Object Fit
    f("object-(contain|cover|fill|none|scale-down)", "objectFit"),
    // Object Position
    p("object-", "objectPosition"),
    f("object-(top|bottom|center|(left|right)(-(top|bottom))?)", "objectPosition", Ie),
    // Overscroll Behavior
    f("overscroll(-[xy])?-(auto|contain|none)", ({ 1: r = "", 2: e }) => ({
        ["overscroll-behavior" + r]: e
    })),
    // Position
    f("(static|fixed|absolute|relative|sticky)", "position"),
    // Top / Right / Bottom / Left
    p("-?inset(-[xy])?(?:$|-)", "inset", ({ 1: r, _: e }) => ({
        top: r != "-x" && e,
        right: r != "-y" && e,
        bottom: r != "-x" && e,
        left: r != "-y" && e
    })),
    p("-?(top|bottom|left|right)(?:$|-)", "inset"),
    // Visibility
    f("(visible|collapse)", "visibility"),
    f("invisible", {
        visibility: "hidden"
    }),
    // Z-Index
    p("-?z-", "zIndex"),
    /* FLEXBOX */
    // Flex Direction
    f("flex-((row|col)(-reverse)?)", "flexDirection", Ct),
    f("flex-(wrap|wrap-reverse|nowrap)", "flexWrap"),
    p("(flex-(?:grow|shrink))(?:$|-)"),
    /*, 'flex-grow' | flex-shrink */
    p("(flex)-"),
    /*, 'flex' */
    p("grow(?:$|-)", "flexGrow"),
    p("shrink(?:$|-)", "flexShrink"),
    p("basis-", "flexBasis"),
    p("-?(order)-"),
    /*, 'order' */
    "-?(order)-(\\d+)",
    /* GRID */
    // Grid Template Columns
    p("grid-cols-", "gridTemplateColumns"),
    f("grid-cols-(\\d+)", "gridTemplateColumns", Lt),
    // Grid Column Start / End
    p("col-", "gridColumn"),
    f("col-(span)-(\\d+)", "gridColumn", It),
    p("col-start-", "gridColumnStart"),
    f("col-start-(auto|\\d+)", "gridColumnStart"),
    p("col-end-", "gridColumnEnd"),
    f("col-end-(auto|\\d+)", "gridColumnEnd"),
    // Grid Template Rows
    p("grid-rows-", "gridTemplateRows"),
    f("grid-rows-(\\d+)", "gridTemplateRows", Lt),
    // Grid Row Start / End
    p("row-", "gridRow"),
    f("row-(span)-(\\d+)", "gridRow", It),
    p("row-start-", "gridRowStart"),
    f("row-start-(auto|\\d+)", "gridRowStart"),
    p("row-end-", "gridRowEnd"),
    f("row-end-(auto|\\d+)", "gridRowEnd"),
    // Grid Auto Flow
    f("grid-flow-((row|col)(-dense)?)", "gridAutoFlow", (r) => Ie(Ct(r))),
    f("grid-flow-(dense)", "gridAutoFlow"),
    // Grid Auto Columns
    p("auto-cols-", "gridAutoColumns"),
    // Grid Auto Rows
    p("auto-rows-", "gridAutoRows"),
    // Gap
    p("gap-x(?:$|-)", "gap", "columnGap"),
    p("gap-y(?:$|-)", "gap", "rowGap"),
    p("gap(?:$|-)", "gap"),
    /* BOX ALIGNMENT */
    // Justify Items
    // Justify Self
    "(justify-(?:items|self))-",
    // Justify Content
    f("justify-", "justifyContent", Rt),
    // Align Content
    // Align Items
    // Align Self
    f("(content|items|self)-", (r) => ({
        ["align-" + r[1]]: Rt(r)
    })),
    // Place Content
    // Place Items
    // Place Self
    f("(place-(content|items|self))-", ({ 1: r, $$: e }) => ({
        [r]: ("wun".includes(e[3]) ? "space-" : "") + e
    })),
    /* SPACING */
    // Padding
    p("p([xytrbl])?(?:$|-)", "padding", he("padding")),
    // Margin
    p("-?m([xytrbl])?(?:$|-)", "margin", he("margin")),
    // Space Between
    p("-?space-(x|y)(?:$|-)", "space", ({ 1: r, _: e }) => ({
        "&>:not([hidden])~:not([hidden])": {
            [`--tw-space-${r}-reverse`]: "0",
            ["margin-" + {
                y: "top",
                x: "left"
            }[r]]: `calc(${e} * calc(1 - var(--tw-space-${r}-reverse)))`,
            ["margin-" + {
                y: "bottom",
                x: "right"
            }[r]]: `calc(${e} * var(--tw-space-${r}-reverse))`
        }
    })),
    f("space-(x|y)-reverse", ({ 1: r }) => ({
        "&>:not([hidden])~:not([hidden])": {
            [`--tw-space-${r}-reverse`]: "1"
        }
    })),
    /* SIZING */
    // Width
    p("w-", "width"),
    // Min-Width
    p("min-w-", "minWidth"),
    // Max-Width
    p("max-w-", "maxWidth"),
    // Height
    p("h-", "height"),
    // Min-Height
    p("min-h-", "minHeight"),
    // Max-Height
    p("max-h-", "maxHeight"),
    /* TYPOGRAPHY */
    // Font Weight
    p("font-", "fontWeight"),
    // Font Family
    p("font-", "fontFamily", ({ _: r }) => typeof (r = O(r))[1] == "string" ? {
        fontFamily: B(r)
    } : {
        fontFamily: B(r[0]),
        ...r[1]
    }),
    // Font Smoothing
    f("antialiased", {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
    }),
    f("subpixel-antialiased", {
        WebkitFontSmoothing: "auto",
        MozOsxFontSmoothing: "auto"
    }),
    // Font Style
    f("italic", "fontStyle"),
    f("not-italic", {
        fontStyle: "normal"
    }),
    // Font Variant Numeric
    f("(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)", ({ 1: r, 2: e = "", 3: t }) => (
        // normal-nums
        e == "normal" ? {
            fontVariantNumeric: "normal"
        } : {
            ["--tw-" + (t ? (
                // diagonal-fractions, stacked-fractions
                "numeric-fraction"
            ) : "pt".includes(e[0]) ? (
                // proportional-nums, tabular-nums
                "numeric-spacing"
            ) : e ? (
                // lining-nums, oldstyle-nums
                "numeric-figure"
            ) : (
                // ordinal, slashed-zero
                r
            ))]: r,
            fontVariantNumeric: "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
            ...K({
                "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
                "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
                "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
                "--tw-numeric-spacing": "var(--tw-empty,/*!*/ /*!*/)",
                "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)"
            })
        }
    )),
    // Letter Spacing
    p("tracking-", "letterSpacing"),
    // Line Height
    p("leading-", "lineHeight"),
    // List Style Position
    f("list-(inside|outside)", "listStylePosition"),
    // List Style Type
    p("list-", "listStyleType"),
    f("list-", "listStyleType"),
    // Placeholder Opacity
    p("placeholder-opacity-", "placeholderOpacity", ({ _: r }) => ({
        "&::placeholder": {
            "--tw-placeholder-opacity": r
        }
    })),
    // Placeholder Color
    A("placeholder-", {
        property: "color",
        selector: "&::placeholder"
    }),
    // Text Alignment
    f("text-(left|center|right|justify|start|end)", "textAlign"),
    f("text-(ellipsis|clip)", "textOverflow"),
    // Text Opacity
    p("text-opacity-", "textOpacity", "--tw-text-opacity"),
    // Text Color
    A("text-", {
        property: "color"
    }),
    // Font Size
    p("text-", "fontSize", ({ _: r }) => typeof r == "string" ? {
        fontSize: r
    } : {
        fontSize: r[0],
        ...typeof r[1] == "string" ? {
            lineHeight: r[1]
        } : r[1]
    }),
    // Text Indent
    p("indent-", "textIndent"),
    // Text Decoration
    f("(overline|underline|line-through)", "textDecorationLine"),
    f("no-underline", {
        textDecorationLine: "none"
    }),
    // Text Underline offset
    p("underline-offset-", "textUnderlineOffset"),
    // Text Decoration Color
    A("decoration-", {
        section: "textDecorationColor",
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    // Text Decoration Thickness
    p("decoration-", "textDecorationThickness"),
    // Text Decoration Style
    f("decoration-", "textDecorationStyle"),
    // Text Transform
    f("(uppercase|lowercase|capitalize)", "textTransform"),
    f("normal-case", {
        textTransform: "none"
    }),
    // Text Overflow
    f("truncate", {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    }),
    // Vertical Alignment
    f("align-", "verticalAlign"),
    // Whitespace
    f("whitespace-", "whiteSpace"),
    // Word Break
    f("break-normal", {
        wordBreak: "normal",
        overflowWrap: "normal"
    }),
    f("break-words", {
        overflowWrap: "break-word"
    }),
    f("break-all", {
        wordBreak: "break-all"
    }),
    f("break-keep", {
        wordBreak: "keep-all"
    }),
    // Caret Color
    A("caret-", {
        // section: 'caretColor',
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    // Accent Color
    A("accent-", {
        // section: 'accentColor',
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    // Gradient Color Stops
    f("bg-gradient-to-([trbl]|[tb][rl])", "backgroundImage", ({ 1: r }) => `linear-gradient(to ${ne(r, " ")},var(--tw-gradient-stops))`),
    A("from-", {
        section: "gradientColorStops",
        opacityVariable: !1,
        opacitySection: "opacity"
    }, ({ _: r }) => ({
        "--tw-gradient-from": r.value,
        "--tw-gradient-to": r.color({
            opacityValue: "0"
        }),
        "--tw-gradient-stops": "var(--tw-gradient-from),var(--tw-gradient-to)"
    })),
    A("via-", {
        section: "gradientColorStops",
        opacityVariable: !1,
        opacitySection: "opacity"
    }, ({ _: r }) => ({
        "--tw-gradient-to": r.color({
            opacityValue: "0"
        }),
        "--tw-gradient-stops": `var(--tw-gradient-from),${r.value},var(--tw-gradient-to)`
    })),
    A("to-", {
        section: "gradientColorStops",
        property: "--tw-gradient-to",
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    /* BACKGROUNDS */
    // Background Attachment
    f("bg-(fixed|local|scroll)", "backgroundAttachment"),
    // Background Origin
    f("bg-origin-(border|padding|content)", "backgroundOrigin", ({ 1: r }) => r + "-box"),
    // Background Repeat
    f([
        "bg-(no-repeat|repeat(-[xy])?)",
        "bg-repeat-(round|space)"
    ], "backgroundRepeat"),
    // Background Blend Mode
    f("bg-blend-", "backgroundBlendMode"),
    // Background Clip
    f("bg-clip-(border|padding|content|text)", "backgroundClip", ({ 1: r }) => r + (r == "text" ? "" : "-box")),
    // Background Opacity
    p("bg-opacity-", "backgroundOpacity", "--tw-bg-opacity"),
    // Background Color
    // bg-${backgroundColor}/${backgroundOpacity}
    A("bg-", {
        section: "backgroundColor"
    }),
    // Background Image
    // supported arbitrary types are: length, color, angle, list
    p("bg-", "backgroundImage"),
    // Background Position
    p("bg-", "backgroundPosition"),
    f("bg-(top|bottom|center|(left|right)(-(top|bottom))?)", "backgroundPosition", Ie),
    // Background Size
    p("bg-", "backgroundSize"),
    /* BORDERS */
    // Border Radius
    p("rounded(?:$|-)", "borderRadius"),
    p("rounded-([trbl]|[tb][rl])(?:$|-)", "borderRadius", ({ 1: r, _: e }) => {
        let t = {
            t: [
                "tl",
                "tr"
            ],
            r: [
                "tr",
                "br"
            ],
            b: [
                "bl",
                "br"
            ],
            l: [
                "bl",
                "tl"
            ]
        }[r] || [
                r,
                r
            ];
        return {
            [`border-${ne(t[0])}-radius`]: e,
            [`border-${ne(t[1])}-radius`]: e
        };
    }),
    // Border Collapse
    f("border-(collapse|separate)", "borderCollapse"),
    // Border Opacity
    p("border-opacity(?:$|-)", "borderOpacity", "--tw-border-opacity"),
    // Border Style
    f("border-(solid|dashed|dotted|double|none)", "borderStyle"),
    // Border Spacing
    p("border-spacing(-[xy])?(?:$|-)", "borderSpacing", ({ 1: r, _: e }) => ({
        ...K({
            "--tw-border-spacing-x": "0",
            "--tw-border-spacing-y": "0"
        }),
        ["--tw-border-spacing" + (r || "-x")]: e,
        ["--tw-border-spacing" + (r || "-y")]: e,
        "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
    })),
    // Border Color
    A("border-([xytrbl])-", {
        section: "borderColor"
    }, he("border", "Color")),
    A("border-"),
    // Border Width
    p("border-([xytrbl])(?:$|-)", "borderWidth", he("border", "Width")),
    p("border(?:$|-)", "borderWidth"),
    // Divide Opacity
    p("divide-opacity(?:$|-)", "divideOpacity", ({ _: r }) => ({
        "&>:not([hidden])~:not([hidden])": {
            "--tw-divide-opacity": r
        }
    })),
    // Divide Style
    f("divide-(solid|dashed|dotted|double|none)", ({ 1: r }) => ({
        "&>:not([hidden])~:not([hidden])": {
            borderStyle: r
        }
    })),
    // Divide Width
    f("divide-([xy]-reverse)", ({ 1: r }) => ({
        "&>:not([hidden])~:not([hidden])": {
            ["--tw-divide-" + r]: "1"
        }
    })),
    p("divide-([xy])(?:$|-)", "divideWidth", ({ 1: r, _: e }) => {
        let t = {
            x: "lr",
            y: "tb"
        }[r];
        return {
            "&>:not([hidden])~:not([hidden])": {
                [`--tw-divide-${r}-reverse`]: "0",
                [`border-${ne(t[0])}Width`]: `calc(${e} * calc(1 - var(--tw-divide-${r}-reverse)))`,
                [`border-${ne(t[1])}Width`]: `calc(${e} * var(--tw-divide-${r}-reverse))`
            }
        };
    }),
    // Divide Color
    A("divide-", {
        // section: $0.replace('-', 'Color') -> 'divideColor'
        property: "borderColor",
        // opacityVariable: '--tw-border-opacity',
        // opacitySection: section.replace('Color', 'Opacity') -> 'divideOpacity'
        selector: "&>:not([hidden])~:not([hidden])"
    }),
    // Ring Offset Opacity
    p("ring-opacity(?:$|-)", "ringOpacity", "--tw-ring-opacity"),
    // Ring Offset Color
    A("ring-offset-", {
        // section: 'ringOffsetColor',
        property: "--tw-ring-offset-color",
        opacityVariable: !1
    }),
    // opacitySection: section.replace('Color', 'Opacity') -> 'ringOffsetOpacity'
    // Ring Offset Width
    p("ring-offset(?:$|-)", "ringOffsetWidth", "--tw-ring-offset-width"),
    // Ring Inset
    f("ring-inset", {
        "--tw-ring-inset": "inset"
    }),
    // Ring Color
    A("ring-", {
        // section: 'ringColor',
        property: "--tw-ring-color"
    }),
    // opacityVariable: '--tw-ring-opacity',
    // opacitySection: section.replace('Color', 'Opacity') -> 'ringOpacity'
    // Ring Width
    p("ring(?:$|-)", "ringWidth", ({ _: r }, { theme: e }) => ({
        ...K({
            "--tw-ring-offset-shadow": "0 0 #0000",
            "--tw-ring-shadow": "0 0 #0000",
            "--tw-shadow": "0 0 #0000",
            "--tw-shadow-colored": "0 0 #0000",
            // Within own declaration to have the defaults above to be merged with defaults from shadow
            "&": {
                "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
                "--tw-ring-offset-width": e("ringOffsetWidth", "", "0px"),
                "--tw-ring-offset-color": Q(e("ringOffsetColor", "", "#fff")),
                "--tw-ring-color": Q(e("ringColor", "", "#93c5fd"), {
                    opacityVariable: "--tw-ring-opacity"
                }),
                "--tw-ring-opacity": e("ringOpacity", "", "0.5")
            }
        }),
        "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${r} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
    })),
    /* EFFECTS */
    // Box Shadow Color
    A("shadow-", {
        section: "boxShadowColor",
        opacityVariable: !1,
        opacitySection: "opacity"
    }, ({ _: r }) => ({
        "--tw-shadow-color": r.value,
        "--tw-shadow": "var(--tw-shadow-colored)"
    })),
    // Box Shadow
    p("shadow(?:$|-)", "boxShadow", ({ _: r }) => ({
        ...K({
            "--tw-ring-offset-shadow": "0 0 #0000",
            "--tw-ring-shadow": "0 0 #0000",
            "--tw-shadow": "0 0 #0000",
            "--tw-shadow-colored": "0 0 #0000"
        }),
        "--tw-shadow": B(r),
        // replace all colors with reference to --tw-shadow-colored
        // this matches colors after non-comma char (keyword, offset) before comma or the end
        "--tw-shadow-colored": B(r).replace(/([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g, "$1var(--tw-shadow-color)$2"),
        boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
    })),
    // Opacity
    p("(opacity)-"),
    /*, 'opacity' */
    // Mix Blend Mode
    f("mix-blend-", "mixBlendMode"),
    /* FILTERS */
    ...Pt(),
    ...Pt("backdrop-"),
    /* TRANSITIONS AND ANIMATION */
    // Transition Property
    p("transition(?:$|-)", "transitionProperty", (r, { theme: e }) => ({
        transitionProperty: B(r),
        transitionTimingFunction: r._ == "none" ? void 0 : B(e("transitionTimingFunction", "")),
        transitionDuration: r._ == "none" ? void 0 : B(e("transitionDuration", ""))
    })),
    // Transition Duration
    p("duration(?:$|-)", "transitionDuration", "transitionDuration", B),
    // Transition Timing Function
    p("ease(?:$|-)", "transitionTimingFunction", "transitionTimingFunction", B),
    // Transition Delay
    p("delay(?:$|-)", "transitionDelay", "transitionDelay", B),
    p("animate(?:$|-)", "animation", (r, { theme: e, h: t, e: i }) => {
        let s = B(r), n = s.split(" "), o = e("keyframes", n[0]);
        return o ? {
            ["@keyframes " + (n[0] = i(t(n[0])))]: o,
            animation: n.join(" ")
        } : {
            animation: s
        };
    }),
    /* TRANSFORMS */
    // Transform
    "(transform)-(none)",
    f("transform", lt),
    f("transform-(cpu|gpu)", ({ 1: r }) => ({
        "--tw-transform": fr(r == "gpu")
    })),
    // Scale
    p("scale(-[xy])?-", "scale", ({ 1: r, _: e }) => ({
        ["--tw-scale" + (r || "-x")]: e,
        ["--tw-scale" + (r || "-y")]: e,
        ...lt()
    })),
    // Rotate
    p("-?(rotate)-", "rotate", Ke),
    // Translate
    p("-?(translate-[xy])-", "translate", Ke),
    // Skew
    p("-?(skew-[xy])-", "skew", Ke),
    // Transform Origin
    f("origin-(center|((top|bottom)(-(left|right))?)|left|right)", "transformOrigin", Ie),
    /* INTERACTIVITY */
    // Appearance
    "(appearance)-",
    // Columns
    p("(columns)-"),
    /*, 'columns' */
    "(columns)-(\\d+)",
    // Break Before, After and Inside
    "(break-(?:before|after|inside))-",
    // Cursor
    p("(cursor)-"),
    /*, 'cursor' */
    "(cursor)-",
    // Scroll Snap Type
    f("snap-(none)", "scroll-snap-type"),
    f("snap-(x|y|both)", ({ 1: r }) => ({
        ...K({
            "--tw-scroll-snap-strictness": "proximity"
        }),
        "scroll-snap-type": r + " var(--tw-scroll-snap-strictness)"
    })),
    f("snap-(mandatory|proximity)", "--tw-scroll-snap-strictness"),
    // Scroll Snap Align
    f("snap-(?:(start|end|center)|align-(none))", "scroll-snap-align"),
    // Scroll Snap Stop
    f("snap-(normal|always)", "scroll-snap-stop"),
    f("scroll-(auto|smooth)", "scroll-behavior"),
    // Scroll Margin
    // Padding
    p("scroll-p([xytrbl])?(?:$|-)", "padding", he("scroll-padding")),
    // Margin
    p("-?scroll-m([xytrbl])?(?:$|-)", "scroll-margin", he("scroll-margin")),
    // Touch Action
    f("touch-(auto|none|manipulation)", "touch-action"),
    f("touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))", ({ 1: r, 2: e, 3: t }) => ({
        ...K({
            "--tw-pan-x": "var(--tw-empty,/*!*/ /*!*/)",
            "--tw-pan-y": "var(--tw-empty,/*!*/ /*!*/)",
            "--tw-pinch-zoom": "var(--tw-empty,/*!*/ /*!*/)",
            "--tw-touch-action": "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)"
        }),
        // x, left, right -> pan-x
        // y, up, down -> pan-y
        // -> pinch-zoom
        [`--tw-${e ? "pan-x" : t ? "pan-y" : r}`]: r,
        "touch-action": "var(--tw-touch-action)"
    })),
    // Outline Style
    f("outline-none", {
        outline: "2px solid transparent",
        "outline-offset": "2px"
    }),
    f("outline", {
        outlineStyle: "solid"
    }),
    f("outline-(dashed|dotted|double)", "outlineStyle"),
    // Outline Offset
    p("-?(outline-offset)-"),
    /*, 'outlineOffset'*/
    // Outline Color
    A("outline-", {
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    // Outline Width
    p("outline-", "outlineWidth"),
    // Pointer Events
    "(pointer-events)-",
    // Will Change
    p("(will-change)-"),
    /*, 'willChange' */
    "(will-change)-",
    // Resize
    [
        "resize(?:-(none|x|y))?",
        "resize",
        ({ 1: r }) => ({
            x: "horizontal",
            y: "vertical"
        })[r] || r || "both"
    ],
    // User Select
    f("select-(none|text|all|auto)", "userSelect"),
    /* SVG */
    // Fill, Stroke
    A("fill-", {
        section: "fill",
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    A("stroke-", {
        section: "stroke",
        opacityVariable: !1,
        opacitySection: "opacity"
    }),
    // Stroke Width
    p("stroke-", "strokeWidth"),
    /* ACCESSIBILITY */
    // Screen Readers
    f("sr-only", {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        clip: "rect(0,0,0,0)",
        borderWidth: "0"
    }),
    f("not-sr-only", {
        position: "static",
        width: "auto",
        height: "auto",
        padding: "0",
        margin: "0",
        overflow: "visible",
        whiteSpace: "normal",
        clip: "auto"
    })
];
function Ie(r) {
    return (typeof r == "string" ? r : r[1]).replace(/-/g, " ").trim();
}
function Ct(r) {
    return (typeof r == "string" ? r : r[1]).replace("col", "column");
}
function ne(r, e = "-") {
    let t = [];
    for (let i of r)
        t.push({
            t: "top",
            r: "right",
            b: "bottom",
            l: "left"
        }[i]);
    return t.join(e);
}
function B(r) {
    return r && "" + (r._ || r);
}
function Rt({ $$: r }) {
    return ({
        // /* aut*/ o: '',
        /* sta*/
        r: (
            /*t*/
            "flex-"
        ),
        /* end*/
        "": "flex-",
        // /* cen*/ t /*er*/: '',
        /* bet*/
        w: (
            /*een*/
            "space-"
        ),
        /* aro*/
        u: (
            /*nd*/
            "space-"
        ),
        /* eve*/
        n: (
            /*ly*/
            "space-"
        )
    }[r[3] || ""] || "") + r;
}
function he(r, e = "") {
    return ({ 1: t, _: i }) => {
        let s = {
            x: "lr",
            y: "tb"
        }[t] || t + t;
        return s ? {
            ...Fe(r + "-" + ne(s[0]) + e, i),
            ...Fe(r + "-" + ne(s[1]) + e, i)
        } : Fe(r + e, i);
    };
}
function Pt(r = "") {
    let e = [
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "hue-rotate",
        "invert",
        r && "opacity",
        "saturate",
        "sepia",
        !r && "drop-shadow"
    ].filter(Boolean), t = {};
    for (let i of e)
        t[`--tw-${r}${i}`] = "var(--tw-empty,/*!*/ /*!*/)";
    return t = {
        // move defaults
        ...K(t),
        // add default filter which allows standalone usage
        [`${r}filter`]: e.map((i) => `var(--tw-${r}${i})`).join(" ")
    }, [
            `(${r}filter)-(none)`,
            f(`${r}filter`, t),
            ...e.map((i) => p(
                // hue-rotate can be negated
                `${i[0] == "h" ? "-?" : ""}(${r}${i})(?:$|-)`,
                i,
                ({ 1: s, _: n }) => ({
                    [`--tw-${s}`]: O(n).map((o) => `${i}(${o})`).join(" "),
                    ...t
                })
            ))
        ];
}
function Ke({ 1: r, _: e }) {
    return {
        ["--tw-" + r]: e,
        ...lt()
    };
}
function lt() {
    return {
        ...K({
            "--tw-translate-x": "0",
            "--tw-translate-y": "0",
            "--tw-rotate": "0",
            "--tw-skew-x": "0",
            "--tw-skew-y": "0",
            "--tw-scale-x": "1",
            "--tw-scale-y": "1",
            "--tw-transform": fr()
        }),
        transform: "var(--tw-transform)"
    };
}
function fr(r) {
    return [
        r ? (
            // -gpu
            "translate3d(var(--tw-translate-x),var(--tw-translate-y),0)"
        ) : "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))",
        "rotate(var(--tw-rotate))",
        "skewX(var(--tw-skew-x))",
        "skewY(var(--tw-skew-y))",
        "scaleX(var(--tw-scale-x))",
        "scaleY(var(--tw-scale-y))"
    ].join(" ");
}
function It({ 1: r, 2: e }) {
    return `${r} ${e} / ${r} ${e}`;
}
function Lt({ 1: r }) {
    return `repeat(${r},minmax(0,1fr))`;
}
function K(r) {
    return {
        "@layer defaults": {
            "*,::before,::after": r,
            "::backdrop": r
        }
    };
}
let ri = [
    [
        "sticky",
        "@supports ((position: -webkit-sticky) or (position:sticky))"
    ],
    [
        "motion-reduce",
        "@media (prefers-reduced-motion:reduce)"
    ],
    [
        "motion-safe",
        "@media (prefers-reduced-motion:no-preference)"
    ],
    [
        "print",
        "@media print"
    ],
    [
        "(portrait|landscape)",
        ({ 1: r }) => `@media (orientation:${r})`
    ],
    [
        "contrast-(more|less)",
        ({ 1: r }) => `@media (prefers-contrast:${r})`
    ],
    [
        "(first-(letter|line)|placeholder|backdrop|before|after)",
        ({ 1: r }) => `&::${r}`
    ],
    [
        "(marker|selection)",
        ({ 1: r }) => `& *::${r},&::${r}`
    ],
    [
        "file",
        "&::file-selector-button"
    ],
    [
        "(first|last|only)",
        ({ 1: r }) => `&:${r}-child`
    ],
    [
        "even",
        "&:nth-child(2n)"
    ],
    [
        "odd",
        "&:nth-child(odd)"
    ],
    [
        "open",
        "&[open]"
    ],
    // All other pseudo classes are already supported by twind
    [
        "(aria|data)-",
        ({
            1: r,
            /* aria or data */
            $$: e
        }, t) => e && `&[${r}-${// aria-asc or data-checked -> from theme
        t.theme(r, e) || // aria-[...] or data-[...]
        Z(e, "", t) || // default handling
        `${e}="true"`}]`
    ],
    /* Styling based on parent and peer state */
    // Groups classes like: group-focus and group-hover
    // these need to add a marker selector with the pseudo class
    // => '.group:focus .group-focus:selector'
    [
        "((group|peer)(~[^-[]+)?)(-\\[(.+)]|[-[].+?)(\\/.+)?",
        ({ 2: r, 3: e = "", 4: t, 5: i = "", 6: s = e }, { e: n, h: o, v: a }) => {
            let l = Ae(i) || (t[0] == "[" ? t : a(t.slice(1)));
            return `${(l.includes("&") ? l : "&" + l).replace(/&/g, `:merge(.${n(o(r + s))})`)}${r[0] == "p" ? "~" : " "}&`;
        }
    ],
    // direction variants
    [
        "(ltr|rtl)",
        ({ 1: r }) => `[dir="${r}"] &`
    ],
    [
        "supports-",
        ({ $$: r }, e) => {
            if (r && (r = e.theme("supports", r) || Z(r, "", e)), r)
                return r.includes(":") || (r += ":var(--tw)"), /^\w*\s*\(/.test(r) || (r = `(${r})`), // Chrome has a bug where `(condtion1)or(condition2)` is not valid
                    // But `(condition1) or (condition2)` is supported.
                    `@supports ${r.replace(/\b(and|or|not)\b/g, " $1 ").trim()}`;
        }
    ],
    [
        "max-",
        ({ $$: r }, e) => {
            if (r && (r = e.theme("screens", r) || Z(r, "", e)), typeof r == "string")
                return `@media not all and (min-width:${r})`;
        }
    ],
    [
        "min-",
        ({ $$: r }, e) => (r && (r = Z(r, "", e)), r && `@media (min-width:${r})`)
    ],
    // Arbitrary variants
    [
        /^\[(.+)]$/,
        ({ 1: r }) => /[&@]/.test(r) && Ae(r).replace(/[}]+$/, "").split("{")
    ]
];
function ii({ colors: r, disablePreflight: e } = {}) {
    return {
        // allow other preflight to run
        preflight: e ? void 0 : ei,
        theme: {
            ...at,
            colors: {
                inherit: "inherit",
                current: "currentColor",
                transparent: "transparent",
                black: "#000",
                white: "#fff",
                ...r
            }
        },
        variants: ri,
        rules: ti,
        finalize(t) {
            return (
                // automatically add `content: ''` to before and after so you don’t have to specify it unless you want a different value
                // ignore global, preflight, and auto added rules
                t.n && // only if there are declarations
                    t.d && // and it has a ::before or ::after selector
                    t.r.some((i) => /^&::(before|after)$/.test(i)) && // there is no content property yet
                    !/(^|;)content:/.test(t.d) ? {
                    ...t,
                    d: "content:var(--tw-content);" + t.d
                } : t
            );
        }
    };
}
let si = {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a"
}, ni = {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827"
}, oi = {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b"
}, ai = {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717"
}, li = {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917"
}, ci = {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d"
}, hi = {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12"
}, di = {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f"
}, ui = {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12"
}, fi = {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314"
}, pi = {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d"
}, gi = {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b"
}, mi = {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a"
}, bi = {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63"
}, yi = {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e"
}, wi = {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a"
}, vi = {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81"
}, _i = {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95"
}, ki = {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87"
}, xi = {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75"
}, Si = {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843"
}, Ti = {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337"
}, $i = {
    __proto__: null,
    slate: si,
    gray: ni,
    zinc: oi,
    neutral: ai,
    stone: li,
    red: ci,
    orange: hi,
    amber: di,
    yellow: ui,
    lime: fi,
    green: pi,
    emerald: gi,
    teal: mi,
    cyan: bi,
    sky: yi,
    blue: wi,
    indigo: vi,
    violet: _i,
    purple: ki,
    fuchsia: xi,
    pink: Si,
    rose: Ti
};
function Oi({ disablePreflight: r } = {}) {
    return ii({
        colors: $i,
        disablePreflight: r
    });
}
const Ei = (r) => {
    let e;
    return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => Pe).then(({ default: i }) => i(...t)) : e = fetch, (...t) => e(...t);
};
class yt extends Error {
    constructor(e, t = "FunctionsError", i) {
        super(e), this.name = t, this.context = i;
    }
}
class ji extends yt {
    constructor(e) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", e);
    }
}
class Ai extends yt {
    constructor(e) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
    }
}
class Ci extends yt {
    constructor(e) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e);
    }
}
var Ri = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
class Pi {
    constructor(e, { headers: t = {}, customFetch: i } = {}) {
        this.url = e, this.headers = t, this.fetch = Ei(i);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */
    setAuth(e) {
        this.headers.Authorization = `Bearer ${e}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */
    invoke(e, t = {}) {
        var i;
        return Ri(this, void 0, void 0, function* () {
            try {
                const { headers: s, method: n, body: o } = t;
                let a = {}, l;
                o && (s && !Object.prototype.hasOwnProperty.call(s, "Content-Type") || !s) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (a["Content-Type"] = "application/octet-stream", l = o) : typeof o == "string" ? (a["Content-Type"] = "text/plain", l = o) : typeof FormData < "u" && o instanceof FormData ? l = o : (a["Content-Type"] = "application/json", l = JSON.stringify(o)));
                const c = yield this.fetch(`${this.url}/${e}`, {
                    method: n || "POST",
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, a), this.headers), s),
                    body: l
                }).catch((g) => {
                    throw new ji(g);
                }), h = c.headers.get("x-relay-error");
                if (h && h === "true")
                    throw new Ai(c);
                if (!c.ok)
                    throw new Ci(c);
                let d = ((i = c.headers.get("Content-Type")) !== null && i !== void 0 ? i : "text/plain").split(";")[0].trim(), u;
                return d === "application/json" ? u = yield c.json() : d === "application/octet-stream" ? u = yield c.blob() : d === "multipart/form-data" ? u = yield c.formData() : u = yield c.text(), { data: u, error: null };
            } catch (s) {
                return { data: null, error: s };
            }
        });
    }
}
var Ii = function () {
    if (typeof self < "u")
        return self;
    if (typeof window < "u")
        return window;
    if (typeof global < "u")
        return global;
    throw new Error("unable to locate global object");
}, we = Ii();
const Li = we.fetch, wt = we.fetch.bind(we), pr = we.Headers, Di = we.Request, Ui = we.Response, Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Headers: pr,
    Request: Di,
    Response: Ui,
    default: wt,
    fetch: Li
}, Symbol.toStringTag, { value: "Module" }));
class Fi extends Error {
    constructor(e) {
        super(e.message), this.name = "PostgrestError", this.details = e.details, this.hint = e.hint, this.code = e.code;
    }
}
class zi {
    constructor(e) {
        this.shouldThrowOnError = !1, this.method = e.method, this.url = e.url, this.headers = e.headers, this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = e.shouldThrowOnError, this.signal = e.signal, this.isMaybeSingle = e.isMaybeSingle, e.fetch ? this.fetch = e.fetch : typeof fetch > "u" ? this.fetch = wt : this.fetch = fetch;
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError() {
        return this.shouldThrowOnError = !0, this;
    }
    then(e, t) {
        this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers["Accept-Profile"] = this.schema : this.headers["Content-Profile"] = this.schema), this.method !== "GET" && this.method !== "HEAD" && (this.headers["Content-Type"] = "application/json");
        const i = this.fetch;
        let s = i(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal
        }).then(async (n) => {
            var o, a, l;
            let c = null, h = null, d = null, u = n.status, g = n.statusText;
            if (n.ok) {
                if (this.method !== "HEAD") {
                    const E = await n.text();
                    E === "" || (this.headers.Accept === "text/csv" || this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text") ? h = E : h = JSON.parse(E));
                }
                const m = (o = this.headers.Prefer) === null || o === void 0 ? void 0 : o.match(/count=(exact|planned|estimated)/), y = (a = n.headers.get("content-range")) === null || a === void 0 ? void 0 : a.split("/");
                m && y && y.length > 1 && (d = parseInt(y[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(h) && (h.length > 1 ? (c = {
                    // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                    code: "PGRST116",
                    details: `Results contain ${h.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                    hint: null,
                    message: "JSON object requested, multiple (or no) rows returned"
                }, h = null, d = null, u = 406, g = "Not Acceptable") : h.length === 1 ? h = h[0] : h = null);
            } else {
                const m = await n.text();
                try {
                    c = JSON.parse(m), Array.isArray(c) && n.status === 404 && (h = [], c = null, u = 200, g = "OK");
                } catch {
                    n.status === 404 && m === "" ? (u = 204, g = "No Content") : c = {
                        message: m
                    };
                }
                if (c && this.isMaybeSingle && (!((l = c == null ? void 0 : c.details) === null || l === void 0) && l.includes("0 rows")) && (c = null, u = 200, g = "OK"), c && this.shouldThrowOnError)
                    throw new Fi(c);
            }
            return {
                error: c,
                data: h,
                count: d,
                status: u,
                statusText: g
            };
        });
        return this.shouldThrowOnError || (s = s.catch((n) => {
            var o, a, l;
            return {
                error: {
                    message: `${(o = n == null ? void 0 : n.name) !== null && o !== void 0 ? o : "FetchError"}: ${n == null ? void 0 : n.message}`,
                    details: `${(a = n == null ? void 0 : n.stack) !== null && a !== void 0 ? a : ""}`,
                    hint: "",
                    code: `${(l = n == null ? void 0 : n.code) !== null && l !== void 0 ? l : ""}`
                },
                data: null,
                count: null,
                status: 0,
                statusText: ""
            };
        })), s.then(e, t);
    }
}
class Ni extends zi {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */
    select(e) {
        let t = !1;
        const i = (e ?? "*").split("").map((s) => /\s/.test(s) && !t ? "" : (s === '"' && (t = !t), s)).join("");
        return this.url.searchParams.set("select", i), this.headers.Prefer && (this.headers.Prefer += ","), this.headers.Prefer += "return=representation", this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order referenced tables, but it only affects the ordering of the
     * parent table if you use `!inner` in the query.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.referencedTable - Set this to order a referenced table by
     * its columns
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    order(e, { ascending: t = !0, nullsFirst: i, foreignTable: s, referencedTable: n = s } = {}) {
        const o = n ? `${n}.order` : "order", a = this.url.searchParams.get(o);
        return this.url.searchParams.set(o, `${a ? `${a},` : ""}${e}.${t ? "asc" : "desc"}${i === void 0 ? "" : i ? ".nullsfirst" : ".nullslast"}`), this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    limit(e, { foreignTable: t, referencedTable: i = t } = {}) {
        const s = typeof i > "u" ? "limit" : `${i}.limit`;
        return this.url.searchParams.set(s, `${e}`), this;
    }
    /**
     * Limit the query result by starting at an offset (`from`) and ending at the offset (`from + to`).
     * Only records within this range are returned.
     * This respects the query order and if there is no order clause the range could behave unexpectedly.
     * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
     * and fourth rows of the query.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    range(e, t, { foreignTable: i, referencedTable: s = i } = {}) {
        const n = typeof s > "u" ? "offset" : `${s}.offset`, o = typeof s > "u" ? "limit" : `${s}.limit`;
        return this.url.searchParams.set(n, `${e}`), this.url.searchParams.set(o, `${t - e + 1}`), this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(e) {
        return this.signal = e, this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */
    single() {
        return this.headers.Accept = "application/vnd.pgrst.object+json", this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */
    maybeSingle() {
        return this.method === "GET" ? this.headers.Accept = "application/json" : this.headers.Accept = "application/vnd.pgrst.object+json", this.isMaybeSingle = !0, this;
    }
    /**
     * Return `data` as a string in CSV format.
     */
    csv() {
        return this.headers.Accept = "text/csv", this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */
    geojson() {
        return this.headers.Accept = "application/geo+json", this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * You need to enable the
     * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
     * setting before using this method.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */
    explain({ analyze: e = !1, verbose: t = !1, settings: i = !1, buffers: s = !1, wal: n = !1, format: o = "text" } = {}) {
        var a;
        const l = [
            e ? "analyze" : null,
            t ? "verbose" : null,
            i ? "settings" : null,
            s ? "buffers" : null,
            n ? "wal" : null
        ].filter(Boolean).join("|"), c = (a = this.headers.Accept) !== null && a !== void 0 ? a : "application/json";
        return this.headers.Accept = `application/vnd.pgrst.plan+${o}; for="${c}"; options=${l};`, o === "json" ? this : this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */
    rollback() {
        var e;
        return ((e = this.headers.Prefer) !== null && e !== void 0 ? e : "").trim().length > 0 ? this.headers.Prefer += ",tx=rollback" : this.headers.Prefer = "tx=rollback", this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     */
    returns() {
        return this;
    }
}
class me extends Ni {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(e, t) {
        return this.url.searchParams.append(e, `eq.${t}`), this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(e, t) {
        return this.url.searchParams.append(e, `neq.${t}`), this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(e, t) {
        return this.url.searchParams.append(e, `gt.${t}`), this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(e, t) {
        return this.url.searchParams.append(e, `gte.${t}`), this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(e, t) {
        return this.url.searchParams.append(e, `lt.${t}`), this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(e, t) {
        return this.url.searchParams.append(e, `lte.${t}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(e, t) {
        return this.url.searchParams.append(e, `like.${t}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(e, t) {
        return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(e, t) {
        return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(e, t) {
        return this.url.searchParams.append(e, `ilike.${t}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(e, t) {
        return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(e, t) {
        return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    is(e, t) {
        return this.url.searchParams.append(e, `is.${t}`), this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(e, t) {
        const i = t.map((s) => typeof s == "string" && new RegExp("[,()]").test(s) ? `"${s}"` : `${s}`).join(",");
        return this.url.searchParams.append(e, `in.(${i})`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(e, t) {
        return this.url.searchParams.append(e, `sr.${t}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(e, t) {
        return this.url.searchParams.append(e, `nxl.${t}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(e, t) {
        return this.url.searchParams.append(e, `sl.${t}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(e, t) {
        return this.url.searchParams.append(e, `nxr.${t}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(e, t) {
        return this.url.searchParams.append(e, `adj.${t}`), this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */
    textSearch(e, t, { config: i, type: s } = {}) {
        let n = "";
        s === "plain" ? n = "pl" : s === "phrase" ? n = "ph" : s === "websearch" && (n = "w");
        const o = i === void 0 ? "" : `(${i})`;
        return this.url.searchParams.append(e, `${n}fts${o}.${t}`), this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(e) {
        return Object.entries(e).forEach(([t, i]) => {
            this.url.searchParams.append(t, `eq.${i}`);
        }), this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    not(e, t, i) {
        return this.url.searchParams.append(e, `not.${t}.${i}`), this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param options - Named parameters
     * @param options.referencedTable - Set this to filter on referenced tables
     * instead of the parent table
     * @param options.foreignTable - Deprecated, use `referencedTable` instead
     */
    or(e, { foreignTable: t, referencedTable: i = t } = {}) {
        const s = i ? `${i}.or` : "or";
        return this.url.searchParams.append(s, `(${e})`), this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    filter(e, t, i) {
        return this.url.searchParams.append(e, `${t}.${i}`), this;
    }
}
class Mi {
    constructor(e, { headers: t = {}, schema: i, fetch: s }) {
        this.url = e, this.headers = t, this.schema = i, this.fetch = s;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    select(e, { head: t = !1, count: i } = {}) {
        const s = t ? "HEAD" : "GET";
        let n = !1;
        const o = (e ?? "*").split("").map((a) => /\s/.test(a) && !n ? "" : (a === '"' && (n = !n), a)).join("");
        return this.url.searchParams.set("select", o), i && (this.headers.Prefer = `count=${i}`), new me({
            method: s,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: !1
        });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. Only applies for bulk
     * inserts.
     */
    insert(e, { count: t, defaultToNull: i = !0 } = {}) {
        const s = "POST", n = [];
        if (this.headers.Prefer && n.push(this.headers.Prefer), t && n.push(`count=${t}`), i || n.push("missing=default"), this.headers.Prefer = n.join(","), Array.isArray(e)) {
            const o = e.reduce((a, l) => a.concat(Object.keys(l)), []);
            if (o.length > 0) {
                const a = [...new Set(o)].map((l) => `"${l}"`);
                this.url.searchParams.set("columns", a.join(","));
            }
        }
        return new me({
            method: s,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1
        });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
     */
    upsert(e, { onConflict: t, ignoreDuplicates: i = !1, count: s, defaultToNull: n = !0 } = {}) {
        const o = "POST", a = [`resolution=${i ? "ignore" : "merge"}-duplicates`];
        if (t !== void 0 && this.url.searchParams.set("on_conflict", t), this.headers.Prefer && a.push(this.headers.Prefer), s && a.push(`count=${s}`), n || a.push("missing=default"), this.headers.Prefer = a.join(","), Array.isArray(e)) {
            const l = e.reduce((c, h) => c.concat(Object.keys(h)), []);
            if (l.length > 0) {
                const c = [...new Set(l)].map((h) => `"${h}"`);
                this.url.searchParams.set("columns", c.join(","));
            }
        }
        return new me({
            method: o,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1
        });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    update(e, { count: t } = {}) {
        const i = "PATCH", s = [];
        return this.headers.Prefer && s.push(this.headers.Prefer), t && s.push(`count=${t}`), this.headers.Prefer = s.join(","), new me({
            method: i,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1
        });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    delete({ count: e } = {}) {
        const t = "DELETE", i = [];
        return e && i.push(`count=${e}`), this.headers.Prefer && i.unshift(this.headers.Prefer), this.headers.Prefer = i.join(","), new me({
            method: t,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: !1
        });
    }
}
const qi = "1.9.2", Bi = { "X-Client-Info": `postgrest-js/${qi}` };
class vt {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */
    constructor(e, { headers: t = {}, schema: i, fetch: s } = {}) {
        this.url = e, this.headers = Object.assign(Object.assign({}, Bi), t), this.schemaName = i, this.fetch = s;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(e) {
        const t = new URL(`${this.url}/${e}`);
        return new Mi(t, {
            headers: Object.assign({}, this.headers),
            schema: this.schemaName,
            fetch: this.fetch
        });
    }
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(e) {
        return new vt(this.url, {
            headers: this.headers,
            schema: e,
            fetch: this.fetch
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(e, t = {}, { head: i = !1, count: s } = {}) {
        let n;
        const o = new URL(`${this.url}/rpc/${e}`);
        let a;
        i ? (n = "HEAD", Object.entries(t).forEach(([c, h]) => {
            o.searchParams.append(c, `${h}`);
        })) : (n = "POST", a = t);
        const l = Object.assign({}, this.headers);
        return s && (l.Prefer = `count=${s}`), new me({
            method: n,
            url: o,
            headers: l,
            schema: this.schemaName,
            body: a,
            fetch: this.fetch,
            allowEmpty: !1
        });
    }
}
const Ji = "2.9.3", Wi = { "X-Client-Info": `realtime-js/${Ji}` }, Vi = "1.0.0", gr = 1e4, Hi = 1e3;
var ye;
(function (r) {
    r[r.connecting = 0] = "connecting", r[r.open = 1] = "open", r[r.closing = 2] = "closing", r[r.closed = 3] = "closed";
})(ye || (ye = {}));
var U;
(function (r) {
    r.closed = "closed", r.errored = "errored", r.joined = "joined", r.joining = "joining", r.leaving = "leaving";
})(U || (U = {}));
var W;
(function (r) {
    r.close = "phx_close", r.error = "phx_error", r.join = "phx_join", r.reply = "phx_reply", r.leave = "phx_leave", r.access_token = "access_token";
})(W || (W = {}));
var ct;
(function (r) {
    r.websocket = "websocket";
})(ct || (ct = {}));
var oe;
(function (r) {
    r.Connecting = "connecting", r.Open = "open", r.Closing = "closing", r.Closed = "closed";
})(oe || (oe = {}));
class mr {
    constructor(e, t) {
        this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0, this.callback = e, this.timerCalc = t;
    }
    reset() {
        this.tries = 0, clearTimeout(this.timer);
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
        clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
        }, this.timerCalc(this.tries + 1));
    }
}
class Gi {
    constructor() {
        this.HEADER_LENGTH = 1;
    }
    decode(e, t) {
        return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t(typeof e == "string" ? JSON.parse(e) : {});
    }
    _binaryDecode(e) {
        const t = new DataView(e), i = new TextDecoder();
        return this._decodeBroadcast(e, t, i);
    }
    _decodeBroadcast(e, t, i) {
        const s = t.getUint8(1), n = t.getUint8(2);
        let o = this.HEADER_LENGTH + 2;
        const a = i.decode(e.slice(o, o + s));
        o = o + s;
        const l = i.decode(e.slice(o, o + n));
        o = o + n;
        const c = JSON.parse(i.decode(e.slice(o, e.byteLength)));
        return { ref: null, topic: a, event: l, payload: c };
    }
}
class Ye {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */
    constructor(e, t, i = {}, s = gr) {
        this.channel = e, this.event = t, this.payload = i, this.timeout = s, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
    }
    resend(e) {
        this.timeout = e, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = !1, this.send();
    }
    send() {
        this._hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef()
        }));
    }
    updatePayload(e) {
        this.payload = Object.assign(Object.assign({}, this.payload), e);
    }
    receive(e, t) {
        var i;
        return this._hasReceived(e) && t((i = this.receivedResp) === null || i === void 0 ? void 0 : i.response), this.recHooks.push({ status: e, callback: t }), this;
    }
    startTimeout() {
        if (this.timeoutTimer)
            return;
        this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref);
        const e = (t) => {
            this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = t, this._matchReceive(t);
        };
        this.channel._on(this.refEvent, {}, e), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
        }, this.timeout);
    }
    trigger(e, t) {
        this.refEvent && this.channel._trigger(this.refEvent, { status: e, response: t });
    }
    destroy() {
        this._cancelRefEvent(), this._cancelTimeout();
    }
    _cancelRefEvent() {
        this.refEvent && this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
    }
    _matchReceive({ status: e, response: t }) {
        this.recHooks.filter((i) => i.status === e).forEach((i) => i.callback(t));
    }
    _hasReceived(e) {
        return this.receivedResp && this.receivedResp.status === e;
    }
}
var Dt;
(function (r) {
    r.SYNC = "sync", r.JOIN = "join", r.LEAVE = "leave";
})(Dt || (Dt = {}));
class Ee {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */
    constructor(e, t) {
        this.channel = e, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.caller = {
            onJoin: () => {
            },
            onLeave: () => {
            },
            onSync: () => {
            }
        };
        const i = (t == null ? void 0 : t.events) || {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.channel._on(i.state, {}, (s) => {
            const { onJoin: n, onLeave: o, onSync: a } = this.caller;
            this.joinRef = this.channel._joinRef(), this.state = Ee.syncState(this.state, s, n, o), this.pendingDiffs.forEach((l) => {
                this.state = Ee.syncDiff(this.state, l, n, o);
            }), this.pendingDiffs = [], a();
        }), this.channel._on(i.diff, {}, (s) => {
            const { onJoin: n, onLeave: o, onSync: a } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = Ee.syncDiff(this.state, s, n, o), a());
        }), this.onJoin((s, n, o) => {
            this.channel._trigger("presence", {
                event: "join",
                key: s,
                currentPresences: n,
                newPresences: o
            });
        }), this.onLeave((s, n, o) => {
            this.channel._trigger("presence", {
                event: "leave",
                key: s,
                currentPresences: n,
                leftPresences: o
            });
        }), this.onSync(() => {
            this.channel._trigger("presence", { event: "sync" });
        });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */
    static syncState(e, t, i, s) {
        const n = this.cloneDeep(e), o = this.transformState(t), a = {}, l = {};
        return this.map(n, (c, h) => {
            o[c] || (l[c] = h);
        }), this.map(o, (c, h) => {
            const d = n[c];
            if (d) {
                const u = h.map((y) => y.presence_ref), g = d.map((y) => y.presence_ref), b = h.filter((y) => g.indexOf(y.presence_ref) < 0), m = d.filter((y) => u.indexOf(y.presence_ref) < 0);
                b.length > 0 && (a[c] = b), m.length > 0 && (l[c] = m);
            } else
                a[c] = h;
        }), this.syncDiff(n, { joins: a, leaves: l }, i, s);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */
    static syncDiff(e, t, i, s) {
        const { joins: n, leaves: o } = {
            joins: this.transformState(t.joins),
            leaves: this.transformState(t.leaves)
        };
        return i || (i = () => {
        }), s || (s = () => {
        }), this.map(n, (a, l) => {
            var c;
            const h = (c = e[a]) !== null && c !== void 0 ? c : [];
            if (e[a] = this.cloneDeep(l), h.length > 0) {
                const d = e[a].map((g) => g.presence_ref), u = h.filter((g) => d.indexOf(g.presence_ref) < 0);
                e[a].unshift(...u);
            }
            i(a, h, l);
        }), this.map(o, (a, l) => {
            let c = e[a];
            if (!c)
                return;
            const h = l.map((d) => d.presence_ref);
            c = c.filter((d) => h.indexOf(d.presence_ref) < 0), e[a] = c, s(a, c, l), c.length === 0 && delete e[a];
        }), e;
    }
    /** @internal */
    static map(e, t) {
        return Object.getOwnPropertyNames(e).map((i) => t(i, e[i]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */
    static transformState(e) {
        return e = this.cloneDeep(e), Object.getOwnPropertyNames(e).reduce((t, i) => {
            const s = e[i];
            return "metas" in s ? t[i] = s.metas.map((n) => (n.presence_ref = n.phx_ref, delete n.phx_ref, delete n.phx_ref_prev, n)) : t[i] = s, t;
        }, {});
    }
    /** @internal */
    static cloneDeep(e) {
        return JSON.parse(JSON.stringify(e));
    }
    /** @internal */
    onJoin(e) {
        this.caller.onJoin = e;
    }
    /** @internal */
    onLeave(e) {
        this.caller.onLeave = e;
    }
    /** @internal */
    onSync(e) {
        this.caller.onSync = e;
    }
    /** @internal */
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
}
var $;
(function (r) {
    r.abstime = "abstime", r.bool = "bool", r.date = "date", r.daterange = "daterange", r.float4 = "float4", r.float8 = "float8", r.int2 = "int2", r.int4 = "int4", r.int4range = "int4range", r.int8 = "int8", r.int8range = "int8range", r.json = "json", r.jsonb = "jsonb", r.money = "money", r.numeric = "numeric", r.oid = "oid", r.reltime = "reltime", r.text = "text", r.time = "time", r.timestamp = "timestamp", r.timestamptz = "timestamptz", r.timetz = "timetz", r.tsrange = "tsrange", r.tstzrange = "tstzrange";
})($ || ($ = {}));
const Ut = (r, e, t = {}) => {
    var i;
    const s = (i = t.skipTypes) !== null && i !== void 0 ? i : [];
    return Object.keys(e).reduce((n, o) => (n[o] = Ki(o, r, e, s), n), {});
}, Ki = (r, e, t, i) => {
    const s = e.find((a) => a.name === r), n = s == null ? void 0 : s.type, o = t[r];
    return n && !i.includes(n) ? br(n, o) : ht(o);
}, br = (r, e) => {
    if (r.charAt(0) === "_") {
        const t = r.slice(1, r.length);
        return Zi(e, t);
    }
    switch (r) {
        case $.bool:
            return Yi(e);
        case $.float4:
        case $.float8:
        case $.int2:
        case $.int4:
        case $.int8:
        case $.numeric:
        case $.oid:
            return Xi(e);
        case $.json:
        case $.jsonb:
            return Qi(e);
        case $.timestamp:
            return es(e);
        case $.abstime:
        case $.date:
        case $.daterange:
        case $.int4range:
        case $.int8range:
        case $.money:
        case $.reltime:
        case $.text:
        case $.time:
        case $.timestamptz:
        case $.timetz:
        case $.tsrange:
        case $.tstzrange:
            return ht(e);
        default:
            return ht(e);
    }
}, ht = (r) => r, Yi = (r) => {
    switch (r) {
        case "t":
            return !0;
        case "f":
            return !1;
        default:
            return r;
    }
}, Xi = (r) => {
    if (typeof r == "string") {
        const e = parseFloat(r);
        if (!Number.isNaN(e))
            return e;
    }
    return r;
}, Qi = (r) => {
    if (typeof r == "string")
        try {
            return JSON.parse(r);
        } catch (e) {
            return console.log(`JSON parse error: ${e}`), r;
        }
    return r;
}, Zi = (r, e) => {
    if (typeof r != "string")
        return r;
    const t = r.length - 1, i = r[t];
    if (r[0] === "{" && i === "}") {
        let n;
        const o = r.slice(1, t);
        try {
            n = JSON.parse("[" + o + "]");
        } catch {
            n = o ? o.split(",") : [];
        }
        return n.map((a) => br(e, a));
    }
    return r;
}, es = (r) => typeof r == "string" ? r.replace(" ", "T") : r;
var Ft;
(function (r) {
    r.ALL = "*", r.INSERT = "INSERT", r.UPDATE = "UPDATE", r.DELETE = "DELETE";
})(Ft || (Ft = {}));
var zt;
(function (r) {
    r.BROADCAST = "broadcast", r.PRESENCE = "presence", r.POSTGRES_CHANGES = "postgres_changes";
})(zt || (zt = {}));
var Nt;
(function (r) {
    r.SUBSCRIBED = "SUBSCRIBED", r.TIMED_OUT = "TIMED_OUT", r.CLOSED = "CLOSED", r.CHANNEL_ERROR = "CHANNEL_ERROR";
})(Nt || (Nt = {}));
class _t {
    constructor(e, t = { config: {} }, i) {
        this.topic = e, this.params = t, this.socket = i, this.bindings = {}, this.state = U.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
            broadcast: { ack: !1, self: !1 },
            presence: { key: "" }
        }, t.config), this.timeout = this.socket.timeout, this.joinPush = new Ye(this, W.join, this.params, this.timeout), this.rejoinTimer = new mr(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
            this.state = U.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((s) => s.send()), this.pushBuffer = [];
        }), this._onClose(() => {
            this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = U.closed, this.socket._remove(this);
        }), this._onError((s) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, s), this.state = U.errored, this.rejoinTimer.scheduleTimeout());
        }), this.joinPush.receive("timeout", () => {
            this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = U.errored, this.rejoinTimer.scheduleTimeout());
        }), this._on(W.reply, {}, (s, n) => {
            this._trigger(this._replyEventName(n), s);
        }), this.presence = new Ee(this), this.broadcastEndpointURL = this._broadcastEndpointURL();
    }
    /** Subscribe registers your client with the server */
    subscribe(e, t = this.timeout) {
        var i, s;
        if (this.socket.isConnected() || this.socket.connect(), this.joinedOnce)
            throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
        {
            const { config: { broadcast: n, presence: o } } = this.params;
            this._onError((c) => e && e("CHANNEL_ERROR", c)), this._onClose(() => e && e("CLOSED"));
            const a = {}, l = {
                broadcast: n,
                presence: o,
                postgres_changes: (s = (i = this.bindings.postgres_changes) === null || i === void 0 ? void 0 : i.map((c) => c.filter)) !== null && s !== void 0 ? s : []
            };
            this.socket.accessToken && (a.access_token = this.socket.accessToken), this.updateJoinPayload(Object.assign({ config: l }, a)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", ({ postgres_changes: c }) => {
                var h;
                if (this.socket.accessToken && this.socket.setAuth(this.socket.accessToken), c === void 0) {
                    e && e("SUBSCRIBED");
                    return;
                } else {
                    const d = this.bindings.postgres_changes, u = (h = d == null ? void 0 : d.length) !== null && h !== void 0 ? h : 0, g = [];
                    for (let b = 0; b < u; b++) {
                        const m = d[b], { filter: { event: y, schema: E, table: w, filter: S } } = m, x = c && c[b];
                        if (x && x.event === y && x.schema === E && x.table === w && x.filter === S)
                            g.push(Object.assign(Object.assign({}, m), { id: x.id }));
                        else {
                            this.unsubscribe(), e && e("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                            return;
                        }
                    }
                    this.bindings.postgres_changes = g, e && e("SUBSCRIBED");
                    return;
                }
            }).receive("error", (c) => {
                e && e("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(c).join(", ") || "error")));
            }).receive("timeout", () => {
                e && e("TIMED_OUT");
            });
        }
        return this;
    }
    presenceState() {
        return this.presence.state;
    }
    async track(e, t = {}) {
        return await this.send({
            type: "presence",
            event: "track",
            payload: e
        }, t.timeout || this.timeout);
    }
    async untrack(e = {}) {
        return await this.send({
            type: "presence",
            event: "untrack"
        }, e);
    }
    on(e, t, i) {
        return this._on(e, t, i);
    }
    /**
     * Sends a message into the channel.
     *
     * @param args Arguments to send to channel
     * @param args.type The type of event to send
     * @param args.event The name of the event being sent
     * @param args.payload Payload to be sent
     * @param opts Options to be used during the send process
     */
    async send(e, t = {}) {
        var i, s;
        if (!this._canPush() && e.type === "broadcast") {
            const { event: n, payload: o } = e, a = {
                method: "POST",
                headers: {
                    apikey: (i = this.socket.apiKey) !== null && i !== void 0 ? i : "",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        { topic: this.subTopic, event: n, payload: o }
                    ]
                })
            };
            try {
                return (await this._fetchWithTimeout(this.broadcastEndpointURL, a, (s = t.timeout) !== null && s !== void 0 ? s : this.timeout)).ok ? "ok" : "error";
            } catch (l) {
                return l.name === "AbortError" ? "timed out" : "error";
            }
        } else
            return new Promise((n) => {
                var o, a, l;
                const c = this._push(e.type, e, t.timeout || this.timeout);
                e.type === "broadcast" && !(!((l = (a = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null || a === void 0 ? void 0 : a.broadcast) === null || l === void 0) && l.ack) && n("ok"), c.receive("ok", () => n("ok")), c.receive("timeout", () => n("timed out"));
            });
    }
    updateJoinPayload(e) {
        this.joinPush.updatePayload(e);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */
    unsubscribe(e = this.timeout) {
        this.state = U.leaving;
        const t = () => {
            this.socket.log("channel", `leave ${this.topic}`), this._trigger(W.close, "leave", this._joinRef());
        };
        return this.rejoinTimer.reset(), this.joinPush.destroy(), new Promise((i) => {
            const s = new Ye(this, W.leave, {}, e);
            s.receive("ok", () => {
                t(), i("ok");
            }).receive("timeout", () => {
                t(), i("timed out");
            }).receive("error", () => {
                i("error");
            }), s.send(), this._canPush() || s.trigger("ok", {});
        });
    }
    /** @internal */
    _broadcastEndpointURL() {
        let e = this.socket.endPoint;
        return e = e.replace(/^ws/i, "http"), e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, ""), e.replace(/\/+$/, "") + "/api/broadcast";
    }
    async _fetchWithTimeout(e, t, i) {
        const s = new AbortController(), n = setTimeout(() => s.abort(), i), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: s.signal }));
        return clearTimeout(n), o;
    }
    /** @internal */
    _push(e, t, i = this.timeout) {
        if (!this.joinedOnce)
            throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        let s = new Ye(this, e, t, i);
        return this._canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */
    _onMessage(e, t, i) {
        return t;
    }
    /** @internal */
    _isMember(e) {
        return this.topic === e;
    }
    /** @internal */
    _joinRef() {
        return this.joinPush.ref;
    }
    /** @internal */
    _trigger(e, t, i) {
        var s, n;
        const o = e.toLocaleLowerCase(), { close: a, error: l, leave: c, join: h } = W;
        if (i && [a, l, c, h].indexOf(o) >= 0 && i !== this._joinRef())
            return;
        let u = this._onMessage(o, t, i);
        if (t && !u)
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
        ["insert", "update", "delete"].includes(o) ? (s = this.bindings.postgres_changes) === null || s === void 0 || s.filter((g) => {
            var b, m, y;
            return ((b = g.filter) === null || b === void 0 ? void 0 : b.event) === "*" || ((y = (m = g.filter) === null || m === void 0 ? void 0 : m.event) === null || y === void 0 ? void 0 : y.toLocaleLowerCase()) === o;
        }).map((g) => g.callback(u, i)) : (n = this.bindings[o]) === null || n === void 0 || n.filter((g) => {
            var b, m, y, E, w, S;
            if (["broadcast", "presence", "postgres_changes"].includes(o))
                if ("id" in g) {
                    const x = g.id, G = (b = g.filter) === null || b === void 0 ? void 0 : b.event;
                    return x && ((m = t.ids) === null || m === void 0 ? void 0 : m.includes(x)) && (G === "*" || (G == null ? void 0 : G.toLocaleLowerCase()) === ((y = t.data) === null || y === void 0 ? void 0 : y.type.toLocaleLowerCase()));
                } else {
                    const x = (w = (E = g == null ? void 0 : g.filter) === null || E === void 0 ? void 0 : E.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase();
                    return x === "*" || x === ((S = t == null ? void 0 : t.event) === null || S === void 0 ? void 0 : S.toLocaleLowerCase());
                }
            else
                return g.type.toLocaleLowerCase() === o;
        }).map((g) => {
            if (typeof u == "object" && "ids" in u) {
                const b = u.data, { schema: m, table: y, commit_timestamp: E, type: w, errors: S } = b;
                u = Object.assign(Object.assign({}, {
                    schema: m,
                    table: y,
                    commit_timestamp: E,
                    eventType: w,
                    new: {},
                    old: {},
                    errors: S
                }), this._getPayloadRecords(b));
            }
            g.callback(u, i);
        });
    }
    /** @internal */
    _isClosed() {
        return this.state === U.closed;
    }
    /** @internal */
    _isJoined() {
        return this.state === U.joined;
    }
    /** @internal */
    _isJoining() {
        return this.state === U.joining;
    }
    /** @internal */
    _isLeaving() {
        return this.state === U.leaving;
    }
    /** @internal */
    _replyEventName(e) {
        return `chan_reply_${e}`;
    }
    /** @internal */
    _on(e, t, i) {
        const s = e.toLocaleLowerCase(), n = {
            type: s,
            filter: t,
            callback: i
        };
        return this.bindings[s] ? this.bindings[s].push(n) : this.bindings[s] = [n], this;
    }
    /** @internal */
    _off(e, t) {
        const i = e.toLocaleLowerCase();
        return this.bindings[i] = this.bindings[i].filter((s) => {
            var n;
            return !(((n = s.type) === null || n === void 0 ? void 0 : n.toLocaleLowerCase()) === i && _t.isEqual(s.filter, t));
        }), this;
    }
    /** @internal */
    static isEqual(e, t) {
        if (Object.keys(e).length !== Object.keys(t).length)
            return !1;
        for (const i in e)
            if (e[i] !== t[i])
                return !1;
        return !0;
    }
    /** @internal */
    _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */
    _onClose(e) {
        this._on(W.close, {}, e);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */
    _onError(e) {
        this._on(W.error, {}, (t) => e(t));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */
    _canPush() {
        return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */
    _rejoin(e = this.timeout) {
        this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = U.joining, this.joinPush.resend(e));
    }
    /** @internal */
    _getPayloadRecords(e) {
        const t = {
            new: {},
            old: {}
        };
        return (e.type === "INSERT" || e.type === "UPDATE") && (t.new = Ut(e.columns, e.record)), (e.type === "UPDATE" || e.type === "DELETE") && (t.old = Ut(e.columns, e.old_record)), t;
    }
}
const ts = () => {
}, rs = typeof WebSocket < "u";
class is {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     */
    constructor(e, t) {
        var i;
        this.accessToken = null, this.apiKey = null, this.channels = [], this.endPoint = "", this.headers = Wi, this.params = {}, this.timeout = gr, this.heartbeatIntervalMs = 3e4, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.ref = 0, this.logger = ts, this.conn = null, this.sendBuffer = [], this.serializer = new Gi(), this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        }, this._resolveFetch = (n) => {
            let o;
            return n ? o = n : typeof fetch > "u" ? o = (...a) => Promise.resolve().then(() => Pe).then(({ default: l }) => l(...a)) : o = fetch, (...a) => o(...a);
        }, this.endPoint = `${e}/${ct.websocket}`, t != null && t.transport ? this.transport = t.transport : this.transport = null, t != null && t.params && (this.params = t.params), t != null && t.headers && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)), t != null && t.timeout && (this.timeout = t.timeout), t != null && t.logger && (this.logger = t.logger), t != null && t.heartbeatIntervalMs && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
        const s = (i = t == null ? void 0 : t.params) === null || i === void 0 ? void 0 : i.apikey;
        s && (this.accessToken = s, this.apiKey = s), this.reconnectAfterMs = t != null && t.reconnectAfterMs ? t.reconnectAfterMs : (n) => [1e3, 2e3, 5e3, 1e4][n - 1] || 1e4, this.encode = t != null && t.encode ? t.encode : (n, o) => o(JSON.stringify(n)), this.decode = t != null && t.decode ? t.decode : this.serializer.decode.bind(this.serializer), this.reconnectTimer = new mr(async () => {
            this.disconnect(), this.connect();
        }, this.reconnectAfterMs), this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch);
    }
    /**
     * Connects the socket, unless already connected.
     */
    connect() {
        if (!this.conn) {
            if (this.transport) {
                this.conn = new this.transport(this._endPointURL(), void 0, {
                    headers: this.headers
                });
                return;
            }
            if (rs) {
                this.conn = new WebSocket(this._endPointURL()), this.setupConnection();
                return;
            }
            this.conn = new ss(this._endPointURL(), void 0, {
                close: () => {
                    this.conn = null;
                }
            }), import("./browser-VE8b5Mrx.js").then((e) => e.b).then(({ default: e }) => {
                this.conn = new e(this._endPointURL(), void 0, {
                    headers: this.headers
                }), this.setupConnection();
            });
        }
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */
    disconnect(e, t) {
        this.conn && (this.conn.onclose = function () {
        }, e ? this.conn.close(e, t ?? "") : this.conn.close(), this.conn = null, this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.reset());
    }
    /**
     * Returns all created channels
     */
    getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */
    async removeChannel(e) {
        const t = await e.unsubscribe();
        return this.channels.length === 0 && this.disconnect(), t;
    }
    /**
     * Unsubscribes and removes all channels
     */
    async removeAllChannels() {
        const e = await Promise.all(this.channels.map((t) => t.unsubscribe()));
        return this.disconnect(), e;
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */
    log(e, t, i) {
        this.logger(e, t, i);
    }
    /**
     * Returns the current state of the socket.
     */
    connectionState() {
        switch (this.conn && this.conn.readyState) {
            case ye.connecting:
                return oe.Connecting;
            case ye.open:
                return oe.Open;
            case ye.closing:
                return oe.Closing;
            default:
                return oe.Closed;
        }
    }
    /**
     * Returns `true` is the connection is open.
     */
    isConnected() {
        return this.connectionState() === oe.Open;
    }
    channel(e, t = { config: {} }) {
        const i = new _t(`realtime:${e}`, t, this);
        return this.channels.push(i), i;
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */
    push(e) {
        const { topic: t, event: i, payload: s, ref: n } = e, o = () => {
            this.encode(e, (a) => {
                var l;
                (l = this.conn) === null || l === void 0 || l.send(a);
            });
        };
        this.log("push", `${t} ${i} (${n})`, s), this.isConnected() ? o() : this.sendBuffer.push(o);
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * @param token A JWT string.
     */
    setAuth(e) {
        this.accessToken = e, this.channels.forEach((t) => {
            e && t.updateJoinPayload({ access_token: e }), t.joinedOnce && t._isJoined() && t._push(W.access_token, { access_token: e });
        });
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */
    _makeRef() {
        let e = this.ref + 1;
        return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */
    _leaveOpenTopic(e) {
        let t = this.channels.find((i) => i.topic === e && (i._isJoined() || i._isJoining()));
        t && (this.log("transport", `leaving duplicate topic "${e}"`), t.unsubscribe());
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */
    _remove(e) {
        this.channels = this.channels.filter((t) => t._joinRef() !== e._joinRef());
    }
    /**
     * Sets up connection handlers.
     *
     * @internal
     */
    setupConnection() {
        this.conn && (this.conn.binaryType = "arraybuffer", this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e) => this._onConnError(e), this.conn.onmessage = (e) => this._onConnMessage(e), this.conn.onclose = (e) => this._onConnClose(e));
    }
    /**
     * Returns the URL of the websocket.
     *
     * @internal
     */
    _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: Vi }));
    }
    /** @internal */
    _onConnMessage(e) {
        this.decode(e.data, (t) => {
            let { topic: i, event: s, payload: n, ref: o } = t;
            (o && o === this.pendingHeartbeatRef || s === (n == null ? void 0 : n.type)) && (this.pendingHeartbeatRef = null), this.log("receive", `${n.status || ""} ${i} ${s} ${o && "(" + o + ")" || ""}`, n), this.channels.filter((a) => a._isMember(i)).forEach((a) => a._trigger(s, n, o)), this.stateChangeCallbacks.message.forEach((a) => a(t));
        });
    }
    /** @internal */
    _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`), this._flushSendBuffer(), this.reconnectTimer.reset(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs), this.stateChangeCallbacks.open.forEach((e) => e());
    }
    /** @internal */
    _onConnClose(e) {
        this.log("transport", "close", e), this._triggerChanError(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach((t) => t(e));
    }
    /** @internal */
    _onConnError(e) {
        this.log("transport", e.message), this._triggerChanError(), this.stateChangeCallbacks.error.forEach((t) => t(e));
    }
    /** @internal */
    _triggerChanError() {
        this.channels.forEach((e) => e._trigger(W.error));
    }
    /** @internal */
    _appendParams(e, t) {
        if (Object.keys(t).length === 0)
            return e;
        const i = e.match(/\?/) ? "&" : "?", s = new URLSearchParams(t);
        return `${e}${i}${s}`;
    }
    /** @internal */
    _flushSendBuffer() {
        this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), this.sendBuffer = []);
    }
    /** @internal */
    _sendHeartbeat() {
        var e;
        if (this.isConnected()) {
            if (this.pendingHeartbeatRef) {
                this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), (e = this.conn) === null || e === void 0 || e.close(Hi, "hearbeat timeout");
                return;
            }
            this.pendingHeartbeatRef = this._makeRef(), this.push({
                topic: "phoenix",
                event: "heartbeat",
                payload: {},
                ref: this.pendingHeartbeatRef
            }), this.setAuth(this.accessToken);
        }
    }
}
class ss {
    constructor(e, t, i) {
        this.binaryType = "arraybuffer", this.onclose = () => {
        }, this.onerror = () => {
        }, this.onmessage = () => {
        }, this.onopen = () => {
        }, this.readyState = ye.connecting, this.send = () => {
        }, this.url = null, this.url = e, this.close = i.close;
    }
}
class kt extends Error {
    constructor(e) {
        super(e), this.__isStorageError = !0, this.name = "StorageError";
    }
}
function P(r) {
    return typeof r == "object" && r !== null && "__isStorageError" in r;
}
class ns extends kt {
    constructor(e, t) {
        super(e), this.name = "StorageApiError", this.status = t;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
class Mt extends kt {
    constructor(e, t) {
        super(e), this.name = "StorageUnknownError", this.originalError = t;
    }
}
var os = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
const yr = (r) => {
    let e;
    return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => Pe).then(({ default: i }) => i(...t)) : e = fetch, (...t) => e(...t);
}, as = () => os(void 0, void 0, void 0, function* () {
    return typeof Response > "u" ? (yield Promise.resolve().then(() => Pe)).Response : Response;
});
var ve = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
const Xe = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), ls = (r, e) => ve(void 0, void 0, void 0, function* () {
    const t = yield as();
    r instanceof t ? r.json().then((i) => {
        e(new ns(Xe(i), r.status || 500));
    }).catch((i) => {
        e(new Mt(Xe(i), i));
    }) : e(new Mt(Xe(r), r));
}), cs = (r, e, t, i) => {
    const s = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
    return r === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), s.body = JSON.stringify(i), Object.assign(Object.assign({}, s), t));
};
function qe(r, e, t, i, s, n) {
    return ve(this, void 0, void 0, function* () {
        return new Promise((o, a) => {
            r(t, cs(e, i, s, n)).then((l) => {
                if (!l.ok)
                    throw l;
                return i != null && i.noResolveJson ? l : l.json();
            }).then((l) => o(l)).catch((l) => ls(l, a));
        });
    });
}
function dt(r, e, t, i) {
    return ve(this, void 0, void 0, function* () {
        return qe(r, "GET", e, t, i);
    });
}
function Y(r, e, t, i, s) {
    return ve(this, void 0, void 0, function* () {
        return qe(r, "POST", e, i, s, t);
    });
}
function hs(r, e, t, i, s) {
    return ve(this, void 0, void 0, function* () {
        return qe(r, "PUT", e, i, s, t);
    });
}
function wr(r, e, t, i, s) {
    return ve(this, void 0, void 0, function* () {
        return qe(r, "DELETE", e, i, s, t);
    });
}
var z = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
const ds = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: "name",
        order: "asc"
    }
}, qt = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: !1
};
class us {
    constructor(e, t = {}, i, s) {
        this.url = e, this.headers = t, this.bucketId = i, this.fetch = yr(s);
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadOrUpdate(e, t, i, s) {
        return z(this, void 0, void 0, function* () {
            try {
                let n;
                const o = Object.assign(Object.assign({}, qt), s), a = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(o.upsert) });
                typeof Blob < "u" && i instanceof Blob ? (n = new FormData(), n.append("cacheControl", o.cacheControl), n.append("", i)) : typeof FormData < "u" && i instanceof FormData ? (n = i, n.append("cacheControl", o.cacheControl)) : (n = i, a["cache-control"] = `max-age=${o.cacheControl}`, a["content-type"] = o.contentType);
                const l = this._removeEmptyFolders(t), c = this._getFinalPath(l), h = yield this.fetch(`${this.url}/object/${c}`, Object.assign({ method: e, body: n, headers: a }, o != null && o.duplex ? { duplex: o.duplex } : {})), d = yield h.json();
                return h.ok ? {
                    data: { path: l, id: d.Id, fullPath: d.Key },
                    error: null
                } : { data: null, error: d };
            } catch (n) {
                if (P(n))
                    return { data: null, error: n };
                throw n;
            }
        });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    upload(e, t, i) {
        return z(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("POST", e, t, i);
        });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadToSignedUrl(e, t, i, s) {
        return z(this, void 0, void 0, function* () {
            const n = this._removeEmptyFolders(e), o = this._getFinalPath(n), a = new URL(this.url + `/object/upload/sign/${o}`);
            a.searchParams.set("token", t);
            try {
                let l;
                const c = Object.assign({ upsert: qt.upsert }, s), h = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(c.upsert) });
                typeof Blob < "u" && i instanceof Blob ? (l = new FormData(), l.append("cacheControl", c.cacheControl), l.append("", i)) : typeof FormData < "u" && i instanceof FormData ? (l = i, l.append("cacheControl", c.cacheControl)) : (l = i, h["cache-control"] = `max-age=${c.cacheControl}`, h["content-type"] = c.contentType);
                const d = yield this.fetch(a.toString(), {
                    method: "PUT",
                    body: l,
                    headers: h
                }), u = yield d.json();
                return d.ok ? {
                    data: { path: n, fullPath: u.Key },
                    error: null
                } : { data: null, error: u };
            } catch (l) {
                if (P(l))
                    return { data: null, error: l };
                throw l;
            }
        });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for 2 hours.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     */
    createSignedUploadUrl(e) {
        return z(this, void 0, void 0, function* () {
            try {
                let t = this._getFinalPath(e);
                const i = yield Y(this.fetch, `${this.url}/object/upload/sign/${t}`, {}, { headers: this.headers }), s = new URL(this.url + i.url), n = s.searchParams.get("token");
                if (!n)
                    throw new kt("No token returned by API");
                return { data: { signedUrl: s.toString(), path: e, token: n }, error: null };
            } catch (t) {
                if (P(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    update(e, t, i) {
        return z(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("PUT", e, t, i);
        });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     */
    move(e, t) {
        return z(this, void 0, void 0, function* () {
            try {
                return { data: yield Y(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: e, destinationKey: t }, { headers: this.headers }), error: null };
            } catch (i) {
                if (P(i))
                    return { data: null, error: i };
                throw i;
            }
        });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     */
    copy(e, t) {
        return z(this, void 0, void 0, function* () {
            try {
                return { data: { path: (yield Y(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: e, destinationKey: t }, { headers: this.headers })).Key }, error: null };
            } catch (i) {
                if (P(i))
                    return { data: null, error: i };
                throw i;
            }
        });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    createSignedUrl(e, t, i) {
        return z(this, void 0, void 0, function* () {
            try {
                let s = this._getFinalPath(e), n = yield Y(this.fetch, `${this.url}/object/sign/${s}`, Object.assign({ expiresIn: t }, i != null && i.transform ? { transform: i.transform } : {}), { headers: this.headers });
                const o = i != null && i.download ? `&download=${i.download === !0 ? "" : i.download}` : "";
                return n = { signedUrl: encodeURI(`${this.url}${n.signedURL}${o}`) }, { data: n, error: null };
            } catch (s) {
                if (P(s))
                    return { data: null, error: s };
                throw s;
            }
        });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */
    createSignedUrls(e, t, i) {
        return z(this, void 0, void 0, function* () {
            try {
                const s = yield Y(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), n = i != null && i.download ? `&download=${i.download === !0 ? "" : i.download}` : "";
                return {
                    data: s.map((o) => Object.assign(Object.assign({}, o), { signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${n}`) : null })),
                    error: null
                };
            } catch (s) {
                if (P(s))
                    return { data: null, error: s };
                throw s;
            }
        });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */
    download(e, t) {
        return z(this, void 0, void 0, function* () {
            const s = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", n = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), o = n ? `?${n}` : "";
            try {
                const a = this._getFinalPath(e);
                return {
                    data: yield (yield dt(this.fetch, `${this.url}/${s}/${a}${o}`, {
                        headers: this.headers,
                        noResolveJson: !0
                    })).blob(), error: null
                };
            } catch (a) {
                if (P(a))
                    return { data: null, error: a };
                throw a;
            }
        });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    getPublicUrl(e, t) {
        const i = this._getFinalPath(e), s = [], n = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
        n !== "" && s.push(n);
        const a = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", l = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
        l !== "" && s.push(l);
        let c = s.join("&");
        return c !== "" && (c = `?${c}`), {
            data: { publicUrl: encodeURI(`${this.url}/${a}/public/${i}${c}`) }
        };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */
    remove(e) {
        return z(this, void 0, void 0, function* () {
            try {
                return { data: yield wr(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
            } catch (t) {
                if (P(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */
    // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */
    // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files within a bucket.
     * @param path The folder path.
     */
    list(e, t, i) {
        return z(this, void 0, void 0, function* () {
            try {
                const s = Object.assign(Object.assign(Object.assign({}, ds), t), { prefix: e || "" });
                return { data: yield Y(this.fetch, `${this.url}/object/list/${this.bucketId}`, s, { headers: this.headers }, i), error: null };
            } catch (s) {
                if (P(s))
                    return { data: null, error: s };
                throw s;
            }
        });
    }
    _getFinalPath(e) {
        return `${this.bucketId}/${e}`;
    }
    _removeEmptyFolders(e) {
        return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    transformOptsToQueryString(e) {
        const t = [];
        return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), e.resize && t.push(`resize=${e.resize}`), e.format && t.push(`format=${e.format}`), e.quality && t.push(`quality=${e.quality}`), t.join("&");
    }
}
const fs = "2.5.5", ps = { "X-Client-Info": `storage-js/${fs}` };
var de = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
class gs {
    constructor(e, t = {}, i) {
        this.url = e, this.headers = Object.assign(Object.assign({}, ps), t), this.fetch = yr(i);
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */
    listBuckets() {
        return de(this, void 0, void 0, function* () {
            try {
                return { data: yield dt(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
            } catch (e) {
                if (P(e))
                    return { data: null, error: e };
                throw e;
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */
    getBucket(e) {
        return de(this, void 0, void 0, function* () {
            try {
                return { data: yield dt(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
            } catch (t) {
                if (P(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     */
    createBucket(e, t = {
        public: !1
    }) {
        return de(this, void 0, void 0, function* () {
            try {
                return {
                    data: yield Y(this.fetch, `${this.url}/bucket`, {
                        id: e,
                        name: e,
                        public: t.public,
                        file_size_limit: t.fileSizeLimit,
                        allowed_mime_types: t.allowedMimeTypes
                    }, { headers: this.headers }), error: null
                };
            } catch (i) {
                if (P(i))
                    return { data: null, error: i };
                throw i;
            }
        });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */
    updateBucket(e, t) {
        return de(this, void 0, void 0, function* () {
            try {
                return {
                    data: yield hs(this.fetch, `${this.url}/bucket/${e}`, {
                        id: e,
                        name: e,
                        public: t.public,
                        file_size_limit: t.fileSizeLimit,
                        allowed_mime_types: t.allowedMimeTypes
                    }, { headers: this.headers }), error: null
                };
            } catch (i) {
                if (P(i))
                    return { data: null, error: i };
                throw i;
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */
    emptyBucket(e) {
        return de(this, void 0, void 0, function* () {
            try {
                return { data: yield Y(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
            } catch (t) {
                if (P(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */
    deleteBucket(e) {
        return de(this, void 0, void 0, function* () {
            try {
                return { data: yield wr(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
            } catch (t) {
                if (P(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
}
class ms extends gs {
    constructor(e, t = {}, i) {
        super(e, t, i);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(e) {
        return new us(this.url, this.headers, e, this.fetch);
    }
}
const bs = "2.39.3";
let Oe = "";
typeof Deno < "u" ? Oe = "deno" : typeof document < "u" ? Oe = "web" : typeof navigator < "u" && navigator.product === "ReactNative" ? Oe = "react-native" : Oe = "node";
const ys = { "X-Client-Info": `supabase-js-${Oe}/${bs}` };
var ws = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
const vs = (r) => {
    let e;
    return r ? e = r : typeof fetch > "u" ? e = wt : e = fetch, (...t) => e(...t);
}, _s = () => typeof Headers > "u" ? pr : Headers, ks = (r, e, t) => {
    const i = vs(t), s = _s();
    return (n, o) => ws(void 0, void 0, void 0, function* () {
        var a;
        const l = (a = yield e()) !== null && a !== void 0 ? a : r;
        let c = new s(o == null ? void 0 : o.headers);
        return c.has("apikey") || c.set("apikey", r), c.has("Authorization") || c.set("Authorization", `Bearer ${l}`), i(n, Object.assign(Object.assign({}, o), { headers: c }));
    });
};
function xs(r) {
    return r.replace(/\/$/, "");
}
function Ss(r, e) {
    const { db: t, auth: i, realtime: s, global: n } = r, { db: o, auth: a, realtime: l, global: c } = e;
    return {
        db: Object.assign(Object.assign({}, o), t),
        auth: Object.assign(Object.assign({}, a), i),
        realtime: Object.assign(Object.assign({}, l), s),
        global: Object.assign(Object.assign({}, c), n)
    };
}
function Ts(r) {
    return Math.round(Date.now() / 1e3) + r;
}
function $s() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (r) {
        const e = Math.random() * 16 | 0;
        return (r == "x" ? e : e & 3 | 8).toString(16);
    });
}
const J = () => typeof document < "u", re = {
    tested: !1,
    writable: !1
}, je = () => {
    if (!J())
        return !1;
    try {
        if (typeof globalThis.localStorage != "object")
            return !1;
    } catch {
        return !1;
    }
    if (re.tested)
        return re.writable;
    const r = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(r, r), globalThis.localStorage.removeItem(r), re.tested = !0, re.writable = !0;
    } catch {
        re.tested = !0, re.writable = !1;
    }
    return re.writable;
};
function Qe(r) {
    const e = {}, t = new URL(r);
    if (t.hash && t.hash[0] === "#")
        try {
            new URLSearchParams(t.hash.substring(1)).forEach((s, n) => {
                e[n] = s;
            });
        } catch {
        }
    return t.searchParams.forEach((i, s) => {
        e[s] = i;
    }), e;
}
const vr = (r) => {
    let e;
    return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => Pe).then(({ default: i }) => i(...t)) : e = fetch, (...t) => e(...t);
}, Os = (r) => typeof r == "object" && r !== null && "status" in r && "ok" in r && "json" in r && typeof r.json == "function", ie = async (r, e, t) => {
    await r.setItem(e, JSON.stringify(t));
}, Le = async (r, e) => {
    const t = await r.getItem(e);
    if (!t)
        return null;
    try {
        return JSON.parse(t);
    } catch {
        return t;
    }
}, Ze = async (r, e) => {
    await r.removeItem(e);
};
function Es(r) {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let t = "", i, s, n, o, a, l, c, h = 0;
    for (r = r.replace("-", "+").replace("_", "/"); h < r.length;)
        o = e.indexOf(r.charAt(h++)), a = e.indexOf(r.charAt(h++)), l = e.indexOf(r.charAt(h++)), c = e.indexOf(r.charAt(h++)), i = o << 2 | a >> 4, s = (a & 15) << 4 | l >> 2, n = (l & 3) << 6 | c, t = t + String.fromCharCode(i), l != 64 && s != 0 && (t = t + String.fromCharCode(s)), c != 64 && n != 0 && (t = t + String.fromCharCode(n));
    return t;
}
class Be {
    constructor() {
        this.promise = new Be.promiseConstructor((e, t) => {
            this.resolve = e, this.reject = t;
        });
    }
}
Be.promiseConstructor = Promise;
function Bt(r) {
    const e = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i, t = r.split(".");
    if (t.length !== 3)
        throw new Error("JWT is not valid: not a JWT structure");
    if (!e.test(t[1]))
        throw new Error("JWT is not valid: payload is not in base64url format");
    const i = t[1];
    return JSON.parse(Es(i));
}
async function js(r) {
    return await new Promise((e) => {
        setTimeout(() => e(null), r);
    });
}
function As(r, e) {
    return new Promise((i, s) => {
        (async () => {
            for (let n = 0; n < 1 / 0; n++)
                try {
                    const o = await r(n);
                    if (!e(n, null, o)) {
                        i(o);
                        return;
                    }
                } catch (o) {
                    if (!e(n, o)) {
                        s(o);
                        return;
                    }
                }
        })();
    });
}
function Cs(r) {
    return ("0" + r.toString(16)).substr(-2);
}
function ue() {
    const e = new Uint32Array(56);
    if (typeof crypto > "u") {
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", i = t.length;
        let s = "";
        for (let n = 0; n < 56; n++)
            s += t.charAt(Math.floor(Math.random() * i));
        return s;
    }
    return crypto.getRandomValues(e), Array.from(e, Cs).join("");
}
async function Rs(r) {
    const t = new TextEncoder().encode(r), i = await crypto.subtle.digest("SHA-256", t), s = new Uint8Array(i);
    return Array.from(s).map((n) => String.fromCharCode(n)).join("");
}
function Ps(r) {
    return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function fe(r) {
    if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
        return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), r;
    const t = await Rs(r);
    return Ps(t);
}
class xt extends Error {
    constructor(e, t) {
        super(e), this.__isAuthError = !0, this.name = "AuthError", this.status = t;
    }
}
function v(r) {
    return typeof r == "object" && r !== null && "__isAuthError" in r;
}
class Is extends xt {
    constructor(e, t) {
        super(e, t), this.name = "AuthApiError", this.status = t;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
function Ls(r) {
    return v(r) && r.name === "AuthApiError";
}
class _r extends xt {
    constructor(e, t) {
        super(e), this.name = "AuthUnknownError", this.originalError = t;
    }
}
class le extends xt {
    constructor(e, t, i) {
        super(e), this.name = t, this.status = i;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
class pe extends le {
    constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400);
    }
}
class et extends le {
    constructor() {
        super("Auth session or user missing", "AuthInvalidTokenResponseError", 500);
    }
}
class De extends le {
    constructor(e) {
        super(e, "AuthInvalidCredentialsError", 400);
    }
}
class Ue extends le {
    constructor(e, t = null) {
        super(e, "AuthImplicitGrantRedirectError", 500), this.details = null, this.details = t;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        };
    }
}
class Jt extends le {
    constructor(e, t = null) {
        super(e, "AuthPKCEGrantCodeExchangeError", 500), this.details = null, this.details = t;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        };
    }
}
class ut extends le {
    constructor(e, t) {
        super(e, "AuthRetryableFetchError", t);
    }
}
function tt(r) {
    return v(r) && r.name === "AuthRetryableFetchError";
}
class Ds extends le {
    constructor(e, t, i) {
        super(e, "AuthWeakPasswordError", t), this.reasons = i;
    }
}
var Us = function (r, e) {
    var t = {};
    for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && e.indexOf(i) < 0 && (t[i] = r[i]);
    if (r != null && typeof Object.getOwnPropertySymbols == "function")
        for (var s = 0, i = Object.getOwnPropertySymbols(r); s < i.length; s++)
            e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(r, i[s]) && (t[i[s]] = r[i[s]]);
    return t;
};
const be = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), Fs = [502, 503, 504];
async function Wt(r) {
    if (!Os(r))
        throw new ut(be(r), 0);
    if (Fs.includes(r.status))
        throw new ut(be(r), r.status);
    let e;
    try {
        e = await r.json();
    } catch (t) {
        throw new _r(be(t), t);
    }
    throw typeof e == "object" && e && typeof e.weak_password == "object" && e.weak_password && Array.isArray(e.weak_password.reasons) && e.weak_password.reasons.length && e.weak_password.reasons.reduce((t, i) => t && typeof i == "string", !0) ? new Ds(be(e), r.status, e.weak_password.reasons) : new Is(be(e), r.status || 500);
}
const zs = (r, e, t, i) => {
    const s = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
    return r === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), s.body = JSON.stringify(i), Object.assign(Object.assign({}, s), t));
};
async function _(r, e, t, i) {
    var s;
    const n = Object.assign({}, i == null ? void 0 : i.headers);
    i != null && i.jwt && (n.Authorization = `Bearer ${i.jwt}`);
    const o = (s = i == null ? void 0 : i.query) !== null && s !== void 0 ? s : {};
    i != null && i.redirectTo && (o.redirect_to = i.redirectTo);
    const a = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", l = await Ns(r, e, t + a, { headers: n, noResolveJson: i == null ? void 0 : i.noResolveJson }, {}, i == null ? void 0 : i.body);
    return i != null && i.xform ? i == null ? void 0 : i.xform(l) : { data: Object.assign({}, l), error: null };
}
async function Ns(r, e, t, i, s, n) {
    const o = zs(e, i, s, n);
    let a;
    try {
        a = await r(t, o);
    } catch (l) {
        throw console.error(l), new ut(be(l), 0);
    }
    if (a.ok || await Wt(a), i != null && i.noResolveJson)
        return a;
    try {
        return await a.json();
    } catch (l) {
        await Wt(l);
    }
}
function se(r) {
    var e;
    let t = null;
    Js(r) && (t = Object.assign({}, r), r.expires_at || (t.expires_at = Ts(r.expires_in)));
    const i = (e = r.user) !== null && e !== void 0 ? e : r;
    return { data: { session: t, user: i }, error: null };
}
function Vt(r) {
    const e = se(r);
    return !e.error && r.weak_password && typeof r.weak_password == "object" && Array.isArray(r.weak_password.reasons) && r.weak_password.reasons.length && r.weak_password.message && typeof r.weak_password.message == "string" && r.weak_password.reasons.reduce((t, i) => t && typeof i == "string", !0) && (e.data.weak_password = r.weak_password), e;
}
function X(r) {
    var e;
    return { data: { user: (e = r.user) !== null && e !== void 0 ? e : r }, error: null };
}
function Ms(r) {
    return { data: r, error: null };
}
function qs(r) {
    const { action_link: e, email_otp: t, hashed_token: i, redirect_to: s, verification_type: n } = r, o = Us(r, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), a = {
        action_link: e,
        email_otp: t,
        hashed_token: i,
        redirect_to: s,
        verification_type: n
    }, l = Object.assign({}, o);
    return {
        data: {
            properties: a,
            user: l
        },
        error: null
    };
}
function Bs(r) {
    return r;
}
function Js(r) {
    return r.access_token && r.refresh_token && r.expires_in;
}
var Ws = function (r, e) {
    var t = {};
    for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && e.indexOf(i) < 0 && (t[i] = r[i]);
    if (r != null && typeof Object.getOwnPropertySymbols == "function")
        for (var s = 0, i = Object.getOwnPropertySymbols(r); s < i.length; s++)
            e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(r, i[s]) && (t[i[s]] = r[i[s]]);
    return t;
};
class Vs {
    constructor({ url: e = "", headers: t = {}, fetch: i }) {
        this.url = e, this.headers = t, this.fetch = vr(i), this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this)
        };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     * @param scope The logout sope.
     */
    async signOut(e, t = "global") {
        try {
            return await _(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
                headers: this.headers,
                jwt: e,
                noResolveJson: !0
            }), { data: null, error: null };
        } catch (i) {
            if (v(i))
                return { data: null, error: i };
            throw i;
        }
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */
    async inviteUserByEmail(e, t = {}) {
        try {
            return await _(this.fetch, "POST", `${this.url}/invite`, {
                body: { email: e, data: t.data },
                headers: this.headers,
                redirectTo: t.redirectTo,
                xform: X
            });
        } catch (i) {
            if (v(i))
                return { data: { user: null }, error: i };
            throw i;
        }
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */
    async generateLink(e) {
        try {
            const { options: t } = e, i = Ws(e, ["options"]), s = Object.assign(Object.assign({}, i), t);
            return "newEmail" in i && (s.new_email = i == null ? void 0 : i.newEmail, delete s.newEmail), await _(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                body: s,
                headers: this.headers,
                xform: qs,
                redirectTo: t == null ? void 0 : t.redirectTo
            });
        } catch (t) {
            if (v(t))
                return {
                    data: {
                        properties: null,
                        user: null
                    },
                    error: t
                };
            throw t;
        }
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async createUser(e) {
        try {
            return await _(this.fetch, "POST", `${this.url}/admin/users`, {
                body: e,
                headers: this.headers,
                xform: X
            });
        } catch (t) {
            if (v(t))
                return { data: { user: null }, error: t };
            throw t;
        }
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */
    async listUsers(e) {
        var t, i, s, n, o, a, l;
        try {
            const c = { nextPage: null, lastPage: 0, total: 0 }, h = await _(this.fetch, "GET", `${this.url}/admin/users`, {
                headers: this.headers,
                noResolveJson: !0,
                query: {
                    page: (i = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && i !== void 0 ? i : "",
                    per_page: (n = (s = e == null ? void 0 : e.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && n !== void 0 ? n : ""
                },
                xform: Bs
            });
            if (h.error)
                throw h.error;
            const d = await h.json(), u = (o = h.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, g = (l = (a = h.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && l !== void 0 ? l : [];
            return g.length > 0 && (g.forEach((b) => {
                const m = parseInt(b.split(";")[0].split("=")[1].substring(0, 1)), y = JSON.parse(b.split(";")[1].split("=")[1]);
                c[`${y}Page`] = m;
            }), c.total = parseInt(u)), { data: Object.assign(Object.assign({}, d), c), error: null };
        } catch (c) {
            if (v(c))
                return { data: { users: [] }, error: c };
            throw c;
        }
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async getUserById(e) {
        try {
            return await _(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
                headers: this.headers,
                xform: X
            });
        } catch (t) {
            if (v(t))
                return { data: { user: null }, error: t };
            throw t;
        }
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async updateUserById(e, t) {
        try {
            return await _(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
                body: t,
                headers: this.headers,
                xform: X
            });
        } catch (i) {
            if (v(i))
                return { data: { user: null }, error: i };
            throw i;
        }
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted (setting `deleted_at` to the current timestamp and disabling their account while preserving their data) from the auth schema.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async deleteUser(e, t = !1) {
        try {
            return await _(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
                headers: this.headers,
                body: {
                    should_soft_delete: t
                },
                xform: X
            });
        } catch (i) {
            if (v(i))
                return { data: { user: null }, error: i };
            throw i;
        }
    }
    async _listFactors(e) {
        try {
            const { data: t, error: i } = await _(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
                headers: this.headers,
                xform: (s) => ({ data: { factors: s }, error: null })
            });
            return { data: t, error: i };
        } catch (t) {
            if (v(t))
                return { data: null, error: t };
            throw t;
        }
    }
    async _deleteFactor(e) {
        try {
            return {
                data: await _(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, {
                    headers: this.headers
                }), error: null
            };
        } catch (t) {
            if (v(t))
                return { data: null, error: t };
            throw t;
        }
    }
}
const kr = "0.0.0", Hs = "http://localhost:9999", Gs = "supabase.auth.token", Ks = { "X-Client-Info": `gotrue-js/${kr}` }, Ht = 10, Ys = {
    getItem: (r) => je() ? globalThis.localStorage.getItem(r) : null,
    setItem: (r, e) => {
        je() && globalThis.localStorage.setItem(r, e);
    },
    removeItem: (r) => {
        je() && globalThis.localStorage.removeItem(r);
    }
};
function Gt(r = {}) {
    return {
        getItem: (e) => r[e] || null,
        setItem: (e, t) => {
            r[e] = t;
        },
        removeItem: (e) => {
            delete r[e];
        }
    };
}
function Xs() {
    if (typeof globalThis != "object")
        try {
            Object.defineProperty(Object.prototype, "__magic__", {
                get: function () {
                    return this;
                },
                configurable: !0
            }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
        } catch {
            typeof self < "u" && (self.globalThis = self);
        }
}
const ge = {
    /**
     * @experimental
     */
    debug: !!(globalThis && je() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
class xr extends Error {
    constructor(e) {
        super(e), this.isAcquireTimeout = !0;
    }
}
class Qs extends xr {
}
async function Zs(r, e, t) {
    ge.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", r, e);
    const i = new globalThis.AbortController();
    return e > 0 && setTimeout(() => {
        i.abort(), ge.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", r);
    }, e), await globalThis.navigator.locks.request(r, e === 0 ? {
        mode: "exclusive",
        ifAvailable: !0
    } : {
        mode: "exclusive",
        signal: i.signal
    }, async (s) => {
        if (s) {
            ge.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", r, s.name);
            try {
                return await t();
            } finally {
                ge.debug && console.log("@supabase/gotrue-js: navigatorLock: released", r, s.name);
            }
        } else {
            if (e === 0)
                throw ge.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", r), new Qs(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);
            if (ge.debug)
                try {
                    const n = await globalThis.navigator.locks.query();
                    console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(n, null, "  "));
                } catch (n) {
                    console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", n);
                }
            return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await t();
        }
    });
}
Xs();
const en = {
    url: Hs,
    storageKey: Gs,
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    headers: Ks,
    flowType: "implicit",
    debug: !1
}, $e = 30 * 1e3, Kt = 3;
async function Yt(r, e, t) {
    return await t();
}
class Ce {
    /**
     * Create a new client for use in the browser.
     */
    constructor(e) {
        var t, i;
        this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = Ce.nextInstanceID, Ce.nextInstanceID += 1, this.instanceID > 0 && J() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
        const s = Object.assign(Object.assign({}, en), e);
        if (this.logDebugMessages = !!s.debug, typeof s.debug == "function" && (this.logger = s.debug), this.persistSession = s.persistSession, this.storageKey = s.storageKey, this.autoRefreshToken = s.autoRefreshToken, this.admin = new Vs({
            url: s.url,
            headers: s.headers,
            fetch: s.fetch
        }), this.url = s.url, this.headers = s.headers, this.fetch = vr(s.fetch), this.lock = s.lock || Yt, this.detectSessionInUrl = s.detectSessionInUrl, this.flowType = s.flowType, s.lock ? this.lock = s.lock : J() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = Zs : this.lock = Yt, this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        }, this.persistSession ? s.storage ? this.storage = s.storage : je() ? this.storage = Ys : (this.memoryStorage = {}, this.storage = Gt(this.memoryStorage)) : (this.memoryStorage = {}, this.storage = Gt(this.memoryStorage)), J() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
                this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (n) {
                console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", n);
            }
            (i = this.broadcastChannel) === null || i === void 0 || i.addEventListener("message", async (n) => {
                this._debug("received broadcast notification from other tab or client", n), await this._notifyAllSubscribers(n.data.event, n.data.session, !1);
            });
        }
        this.initialize();
    }
    _debug(...e) {
        return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${kr}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e), this;
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */
    async initialize() {
        return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))(), await this.initializePromise);
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */
    async _initialize() {
        try {
            const e = J() ? await this._isPKCEFlow() : !1;
            if (this._debug("#_initialize()", "begin", "is PKCE flow", e), e || this.detectSessionInUrl && this._isImplicitGrantFlow()) {
                const { data: t, error: i } = await this._getSessionFromURL(e);
                if (i)
                    return this._debug("#_initialize()", "error detecting session from URL", i), (i == null ? void 0 : i.message) === "Identity is already linked" || (i == null ? void 0 : i.message) === "Identity is already linked to another user" ? { error: i } : (await this._removeSession(), { error: i });
                const { session: s, redirectType: n } = t;
                return this._debug("#_initialize()", "detected session in URL", s, "redirect type", n), await this._saveSession(s), setTimeout(async () => {
                    n === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", s) : await this._notifyAllSubscribers("SIGNED_IN", s);
                }, 0), { error: null };
            }
            return await this._recoverAndRefresh(), { error: null };
        } catch (e) {
            return v(e) ? { error: e } : {
                error: new _r("Unexpected error during initialization", e)
            };
        } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
        }
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */
    async signUp(e) {
        var t, i, s;
        try {
            await this._removeSession();
            let n;
            if ("email" in e) {
                const { email: h, password: d, options: u } = e;
                let g = null, b = null;
                if (this.flowType === "pkce") {
                    const m = ue();
                    await ie(this.storage, `${this.storageKey}-code-verifier`, m), g = await fe(m), b = m === g ? "plain" : "s256";
                }
                n = await _(this.fetch, "POST", `${this.url}/signup`, {
                    headers: this.headers,
                    redirectTo: u == null ? void 0 : u.emailRedirectTo,
                    body: {
                        email: h,
                        password: d,
                        data: (t = u == null ? void 0 : u.data) !== null && t !== void 0 ? t : {},
                        gotrue_meta_security: { captcha_token: u == null ? void 0 : u.captchaToken },
                        code_challenge: g,
                        code_challenge_method: b
                    },
                    xform: se
                });
            } else if ("phone" in e) {
                const { phone: h, password: d, options: u } = e;
                n = await _(this.fetch, "POST", `${this.url}/signup`, {
                    headers: this.headers,
                    body: {
                        phone: h,
                        password: d,
                        data: (i = u == null ? void 0 : u.data) !== null && i !== void 0 ? i : {},
                        channel: (s = u == null ? void 0 : u.channel) !== null && s !== void 0 ? s : "sms",
                        gotrue_meta_security: { captcha_token: u == null ? void 0 : u.captchaToken }
                    },
                    xform: se
                });
            } else
                throw new De("You must provide either an email or phone number and a password");
            const { data: o, error: a } = n;
            if (a || !o)
                return { data: { user: null, session: null }, error: a };
            const l = o.session, c = o.user;
            return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
        } catch (n) {
            if (v(n))
                return { data: { user: null, session: null }, error: n };
            throw n;
        }
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */
    async signInWithPassword(e) {
        try {
            await this._removeSession();
            let t;
            if ("email" in e) {
                const { email: n, password: o, options: a } = e;
                t = await _(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                    headers: this.headers,
                    body: {
                        email: n,
                        password: o,
                        gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
                    },
                    xform: Vt
                });
            } else if ("phone" in e) {
                const { phone: n, password: o, options: a } = e;
                t = await _(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                    headers: this.headers,
                    body: {
                        phone: n,
                        password: o,
                        gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
                    },
                    xform: Vt
                });
            } else
                throw new De("You must provide either an email or phone number and a password");
            const { data: i, error: s } = t;
            return s ? { data: { user: null, session: null }, error: s } : !i || !i.session || !i.user ? { data: { user: null, session: null }, error: new et() } : (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), {
                data: Object.assign({ user: i.user, session: i.session }, i.weak_password ? { weakPassword: i.weak_password } : null),
                error: s
            });
        } catch (t) {
            if (v(t))
                return { data: { user: null, session: null }, error: t };
            throw t;
        }
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */
    async signInWithOAuth(e) {
        var t, i, s, n;
        return await this._removeSession(), await this._handleProviderSignIn(e.provider, {
            redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
            scopes: (i = e.options) === null || i === void 0 ? void 0 : i.scopes,
            queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
            skipBrowserRedirect: (n = e.options) === null || n === void 0 ? void 0 : n.skipBrowserRedirect
        });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */
    async exchangeCodeForSession(e) {
        return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
    }
    async _exchangeCodeForSession(e) {
        const t = await Le(this.storage, `${this.storageKey}-code-verifier`), [i, s] = (t ?? "").split("/"), { data: n, error: o } = await _(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
            headers: this.headers,
            body: {
                auth_code: e,
                code_verifier: i
            },
            xform: se
        });
        return await Ze(this.storage, `${this.storageKey}-code-verifier`), o ? { data: { user: null, session: null, redirectType: null }, error: o } : !n || !n.session || !n.user ? {
            data: { user: null, session: null, redirectType: null },
            error: new et()
        } : (n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", n.session)), { data: Object.assign(Object.assign({}, n), { redirectType: s ?? null }), error: o });
    }
    /**
     * Allows signing in with an OIDC ID token. The authentication provider used
     * should be enabled and configured.
     */
    async signInWithIdToken(e) {
        await this._removeSession();
        try {
            const { options: t, provider: i, token: s, access_token: n, nonce: o } = e, a = await _(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
                headers: this.headers,
                body: {
                    provider: i,
                    id_token: s,
                    access_token: n,
                    nonce: o,
                    gotrue_meta_security: { captcha_token: t == null ? void 0 : t.captchaToken }
                },
                xform: se
            }), { data: l, error: c } = a;
            return c ? { data: { user: null, session: null }, error: c } : !l || !l.session || !l.user ? {
                data: { user: null, session: null },
                error: new et()
            } : (l.session && (await this._saveSession(l.session), await this._notifyAllSubscribers("SIGNED_IN", l.session)), { data: l, error: c });
        } catch (t) {
            if (v(t))
                return { data: { user: null, session: null }, error: t };
            throw t;
        }
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */
    async signInWithOtp(e) {
        var t, i, s, n, o;
        try {
            if (await this._removeSession(), "email" in e) {
                const { email: a, options: l } = e;
                let c = null, h = null;
                if (this.flowType === "pkce") {
                    const u = ue();
                    await ie(this.storage, `${this.storageKey}-code-verifier`, u), c = await fe(u), h = u === c ? "plain" : "s256";
                }
                const { error: d } = await _(this.fetch, "POST", `${this.url}/otp`, {
                    headers: this.headers,
                    body: {
                        email: a,
                        data: (t = l == null ? void 0 : l.data) !== null && t !== void 0 ? t : {},
                        create_user: (i = l == null ? void 0 : l.shouldCreateUser) !== null && i !== void 0 ? i : !0,
                        gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
                        code_challenge: c,
                        code_challenge_method: h
                    },
                    redirectTo: l == null ? void 0 : l.emailRedirectTo
                });
                return { data: { user: null, session: null }, error: d };
            }
            if ("phone" in e) {
                const { phone: a, options: l } = e, { data: c, error: h } = await _(this.fetch, "POST", `${this.url}/otp`, {
                    headers: this.headers,
                    body: {
                        phone: a,
                        data: (s = l == null ? void 0 : l.data) !== null && s !== void 0 ? s : {},
                        create_user: (n = l == null ? void 0 : l.shouldCreateUser) !== null && n !== void 0 ? n : !0,
                        gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
                        channel: (o = l == null ? void 0 : l.channel) !== null && o !== void 0 ? o : "sms"
                    }
                });
                return { data: { user: null, session: null, messageId: c == null ? void 0 : c.message_id }, error: h };
            }
            throw new De("You must provide either an email or phone number.");
        } catch (a) {
            if (v(a))
                return { data: { user: null, session: null }, error: a };
            throw a;
        }
    }
    /**
     * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
     */
    async verifyOtp(e) {
        var t, i;
        try {
            e.type !== "email_change" && e.type !== "phone_change" && await this._removeSession();
            let s, n;
            "options" in e && (s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, n = (i = e.options) === null || i === void 0 ? void 0 : i.captchaToken);
            const { data: o, error: a } = await _(this.fetch, "POST", `${this.url}/verify`, {
                headers: this.headers,
                body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: n } }),
                redirectTo: s,
                xform: se
            });
            if (a)
                throw a;
            if (!o)
                throw new Error("An error occurred on token verification.");
            const l = o.session, c = o.user;
            return l != null && l.access_token && (await this._saveSession(l), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
        } catch (s) {
            if (v(s))
                return { data: { user: null, session: null }, error: s };
            throw s;
        }
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */
    async signInWithSSO(e) {
        var t, i, s;
        try {
            await this._removeSession();
            let n = null, o = null;
            if (this.flowType === "pkce") {
                const a = ue();
                await ie(this.storage, `${this.storageKey}-code-verifier`, a), n = await fe(a), o = a === n ? "plain" : "s256";
            }
            return await _(this.fetch, "POST", `${this.url}/sso`, {
                body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (i = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && i !== void 0 ? i : void 0 }), !((s = e == null ? void 0 : e.options) === null || s === void 0) && s.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: n, code_challenge_method: o }),
                headers: this.headers,
                xform: Ms
            });
        } catch (n) {
            if (v(n))
                return { data: null, error: n };
            throw n;
        }
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */
    async reauthenticate() {
        return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
    }
    async _reauthenticate() {
        try {
            return await this._useSession(async (e) => {
                const { data: { session: t }, error: i } = e;
                if (i)
                    throw i;
                if (!t)
                    throw new pe();
                const { error: s } = await _(this.fetch, "GET", `${this.url}/reauthenticate`, {
                    headers: this.headers,
                    jwt: t.access_token
                });
                return { data: { user: null, session: null }, error: s };
            });
        } catch (e) {
            if (v(e))
                return { data: { user: null, session: null }, error: e };
            throw e;
        }
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */
    async resend(e) {
        try {
            e.type != "email_change" && e.type != "phone_change" && await this._removeSession();
            const t = `${this.url}/resend`;
            if ("email" in e) {
                const { email: i, type: s, options: n } = e, { error: o } = await _(this.fetch, "POST", t, {
                    headers: this.headers,
                    body: {
                        email: i,
                        type: s,
                        gotrue_meta_security: { captcha_token: n == null ? void 0 : n.captchaToken }
                    },
                    redirectTo: n == null ? void 0 : n.emailRedirectTo
                });
                return { data: { user: null, session: null }, error: o };
            } else if ("phone" in e) {
                const { phone: i, type: s, options: n } = e, { data: o, error: a } = await _(this.fetch, "POST", t, {
                    headers: this.headers,
                    body: {
                        phone: i,
                        type: s,
                        gotrue_meta_security: { captcha_token: n == null ? void 0 : n.captchaToken }
                    }
                });
                return { data: { user: null, session: null, messageId: o == null ? void 0 : o.message_id }, error: a };
            }
            throw new De("You must provide either an email or phone number and a type");
        } catch (t) {
            if (v(t))
                return { data: { user: null, session: null }, error: t };
            throw t;
        }
    }
    /**
     * Returns the session, refreshing it if necessary.
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     */
    async getSession() {
        return await this.initializePromise, this._acquireLock(-1, async () => this._useSession(async (e) => e));
    }
    /**
     * Acquires a global lock based on the storage key.
     */
    async _acquireLock(e, t) {
        this._debug("#_acquireLock", "begin", e);
        try {
            if (this.lockAcquired) {
                const i = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), s = (async () => (await i, await t()))();
                return this.pendingInLock.push((async () => {
                    try {
                        await s;
                    } catch {
                    }
                })()), s;
            }
            return await this.lock(`lock:${this.storageKey}`, e, async () => {
                this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
                try {
                    this.lockAcquired = !0;
                    const i = t();
                    for (this.pendingInLock.push((async () => {
                        try {
                            await i;
                        } catch {
                        }
                    })()), await i; this.pendingInLock.length;) {
                        const s = [...this.pendingInLock];
                        await Promise.all(s), this.pendingInLock.splice(0, s.length);
                    }
                    return await i;
                } finally {
                    this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1;
                }
            });
        } finally {
            this._debug("#_acquireLock", "end");
        }
    }
    /**
     * Use instead of {@link #getSession} inside the library. It is
     * semantically usually what you want, as getting a session involves some
     * processing afterwards that requires only one client operating on the
     * session at once across multiple tabs or processes.
     */
    async _useSession(e) {
        this._debug("#_useSession", "begin");
        try {
            const t = await this.__loadSession();
            return await e(t);
        } finally {
            this._debug("#_useSession", "end");
        }
    }
    /**
     * NEVER USE DIRECTLY!
     *
     * Always use {@link #_useSession}.
     */
    async __loadSession() {
        this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
        try {
            let e = null;
            const t = await Le(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", t), t !== null && (this._isValidSession(t) ? e = t : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e)
                return { data: { session: null }, error: null };
            const i = e.expires_at ? e.expires_at <= Date.now() / 1e3 : !1;
            if (this._debug("#__loadSession()", `session has${i ? "" : " not"} expired`, "expires_at", e.expires_at), !i)
                return { data: { session: e }, error: null };
            const { session: s, error: n } = await this._callRefreshToken(e.refresh_token);
            return n ? { data: { session: null }, error: n } : { data: { session: s }, error: null };
        } finally {
            this._debug("#__loadSession()", "end");
        }
    }
    /**
     * Gets the current user details if there is an existing session.
     * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
     */
    async getUser(e) {
        return e ? await this._getUser(e) : (await this.initializePromise, this._acquireLock(-1, async () => await this._getUser()));
    }
    async _getUser(e) {
        try {
            return e ? await _(this.fetch, "GET", `${this.url}/user`, {
                headers: this.headers,
                jwt: e,
                xform: X
            }) : await this._useSession(async (t) => {
                var i, s;
                const { data: n, error: o } = t;
                if (o)
                    throw o;
                return await _(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt: (s = (i = n.session) === null || i === void 0 ? void 0 : i.access_token) !== null && s !== void 0 ? s : void 0,
                    xform: X
                });
            });
        } catch (t) {
            if (v(t))
                return { data: { user: null }, error: t };
            throw t;
        }
    }
    /**
     * Updates user data for a logged in user.
     */
    async updateUser(e, t = {}) {
        return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e, t));
    }
    async _updateUser(e, t = {}) {
        try {
            return await this._useSession(async (i) => {
                const { data: s, error: n } = i;
                if (n)
                    throw n;
                if (!s.session)
                    throw new pe();
                const o = s.session;
                let a = null, l = null;
                if (this.flowType === "pkce" && e.email != null) {
                    const d = ue();
                    await ie(this.storage, `${this.storageKey}-code-verifier`, d), a = await fe(d), l = d === a ? "plain" : "s256";
                }
                const { data: c, error: h } = await _(this.fetch, "PUT", `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: t == null ? void 0 : t.emailRedirectTo,
                    body: Object.assign(Object.assign({}, e), { code_challenge: a, code_challenge_method: l }),
                    jwt: o.access_token,
                    xform: X
                });
                if (h)
                    throw h;
                return o.user = c.user, await this._saveSession(o), await this._notifyAllSubscribers("USER_UPDATED", o), { data: { user: o.user }, error: null };
            });
        } catch (i) {
            if (v(i))
                return { data: { user: null }, error: i };
            throw i;
        }
    }
    /**
     * Decodes a JWT (without performing any validation).
     */
    _decodeJWT(e) {
        return Bt(e);
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */
    async setSession(e) {
        return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e));
    }
    async _setSession(e) {
        try {
            if (!e.access_token || !e.refresh_token)
                throw new pe();
            const t = Date.now() / 1e3;
            let i = t, s = !0, n = null;
            const o = Bt(e.access_token);
            if (o.exp && (i = o.exp, s = i <= t), s) {
                const { session: a, error: l } = await this._callRefreshToken(e.refresh_token);
                if (l)
                    return { data: { user: null, session: null }, error: l };
                if (!a)
                    return { data: { user: null, session: null }, error: null };
                n = a;
            } else {
                const { data: a, error: l } = await this._getUser(e.access_token);
                if (l)
                    throw l;
                n = {
                    access_token: e.access_token,
                    refresh_token: e.refresh_token,
                    user: a.user,
                    token_type: "bearer",
                    expires_in: i - t,
                    expires_at: i
                }, await this._saveSession(n), await this._notifyAllSubscribers("SIGNED_IN", n);
            }
            return { data: { user: n.user, session: n }, error: null };
        } catch (t) {
            if (v(t))
                return { data: { session: null, user: null }, error: t };
            throw t;
        }
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */
    async refreshSession(e) {
        return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e));
    }
    async _refreshSession(e) {
        try {
            return await this._useSession(async (t) => {
                var i;
                if (!e) {
                    const { data: o, error: a } = t;
                    if (a)
                        throw a;
                    e = (i = o.session) !== null && i !== void 0 ? i : void 0;
                }
                if (!(e != null && e.refresh_token))
                    throw new pe();
                const { session: s, error: n } = await this._callRefreshToken(e.refresh_token);
                return n ? { data: { user: null, session: null }, error: n } : s ? { data: { user: s.user, session: s }, error: null } : { data: { user: null, session: null }, error: null };
            });
        } catch (t) {
            if (v(t))
                return { data: { user: null, session: null }, error: t };
            throw t;
        }
    }
    /**
     * Gets the session data from a URL string
     */
    async _getSessionFromURL(e) {
        try {
            if (!J())
                throw new Ue("No browser detected.");
            if (this.flowType === "implicit" && !this._isImplicitGrantFlow())
                throw new Ue("Not a valid implicit grant flow url.");
            if (this.flowType == "pkce" && !e)
                throw new Jt("Not a valid PKCE flow url.");
            const t = Qe(window.location.href);
            if (e) {
                if (!t.code)
                    throw new Jt("No code detected.");
                const { data: w, error: S } = await this._exchangeCodeForSession(t.code);
                if (S)
                    throw S;
                const x = new URL(window.location.href);
                return x.searchParams.delete("code"), window.history.replaceState(window.history.state, "", x.toString()), { data: { session: w.session, redirectType: null }, error: null };
            }
            if (t.error || t.error_description || t.error_code)
                throw new Ue(t.error_description || "Error in URL with unspecified error_description", {
                    error: t.error || "unspecified_error",
                    code: t.error_code || "unspecified_code"
                });
            const { provider_token: i, provider_refresh_token: s, access_token: n, refresh_token: o, expires_in: a, expires_at: l, token_type: c } = t;
            if (!n || !a || !o || !c)
                throw new Ue("No session defined in URL");
            const h = Math.round(Date.now() / 1e3), d = parseInt(a);
            let u = h + d;
            l && (u = parseInt(l));
            const g = u - h;
            g * 1e3 <= $e && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${d}s`);
            const b = u - d;
            h - b >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", b, u, h) : h - b < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clok for skew", b, u, h);
            const { data: m, error: y } = await this._getUser(n);
            if (y)
                throw y;
            const E = {
                provider_token: i,
                provider_refresh_token: s,
                access_token: n,
                expires_in: d,
                expires_at: u,
                refresh_token: o,
                token_type: c,
                user: m.user
            };
            return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: E, redirectType: t.type }, error: null };
        } catch (t) {
            if (v(t))
                return { data: { session: null, redirectType: null }, error: t };
            throw t;
        }
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */
    _isImplicitGrantFlow() {
        const e = Qe(window.location.href);
        return !!(J() && (e.access_token || e.error_description));
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */
    async _isPKCEFlow() {
        const e = Qe(window.location.href), t = await Le(this.storage, `${this.storageKey}-code-verifier`);
        return !!(e.code && t);
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     *
     * If using `others` scope, no `SIGNED_OUT` event is fired!
     */
    async signOut(e = { scope: "global" }) {
        return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e));
    }
    async _signOut({ scope: e } = { scope: "global" }) {
        return await this._useSession(async (t) => {
            var i;
            const { data: s, error: n } = t;
            if (n)
                return { error: n };
            const o = (i = s.session) === null || i === void 0 ? void 0 : i.access_token;
            if (o) {
                const { error: a } = await this.admin.signOut(o, e);
                if (a && !(Ls(a) && (a.status === 404 || a.status === 401)))
                    return { error: a };
            }
            return e !== "others" && (await this._removeSession(), await Ze(this.storage, `${this.storageKey}-code-verifier`), await this._notifyAllSubscribers("SIGNED_OUT", null)), { error: null };
        });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */
    onAuthStateChange(e) {
        const t = $s(), i = {
            id: t,
            callback: e,
            unsubscribe: () => {
                this._debug("#unsubscribe()", "state change callback with id removed", t), this.stateChangeEmitters.delete(t);
            }
        };
        return this._debug("#onAuthStateChange()", "registered callback with id", t), this.stateChangeEmitters.set(t, i), (async () => (await this.initializePromise, await this._acquireLock(-1, async () => {
            this._emitInitialSession(t);
        })))(), { data: { subscription: i } };
    }
    async _emitInitialSession(e) {
        return await this._useSession(async (t) => {
            var i, s;
            try {
                const { data: { session: n }, error: o } = t;
                if (o)
                    throw o;
                await ((i = this.stateChangeEmitters.get(e)) === null || i === void 0 ? void 0 : i.callback("INITIAL_SESSION", n)), this._debug("INITIAL_SESSION", "callback id", e, "session", n);
            } catch (n) {
                await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", n), console.error(n);
            }
        });
    }
    /**
     * Sends a password reset request to an email address. This method supports the PKCE flow.
     *
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */
    async resetPasswordForEmail(e, t = {}) {
        let i = null, s = null;
        if (this.flowType === "pkce") {
            const n = ue();
            await ie(this.storage, `${this.storageKey}-code-verifier`, `${n}/PASSWORD_RECOVERY`), i = await fe(n), s = n === i ? "plain" : "s256";
        }
        try {
            return await _(this.fetch, "POST", `${this.url}/recover`, {
                body: {
                    email: e,
                    code_challenge: i,
                    code_challenge_method: s,
                    gotrue_meta_security: { captcha_token: t.captchaToken }
                },
                headers: this.headers,
                redirectTo: t.redirectTo
            });
        } catch (n) {
            if (v(n))
                return { data: null, error: n };
            throw n;
        }
    }
    /**
     * Gets all the identities linked to a user.
     */
    async getUserIdentities() {
        var e;
        try {
            const { data: t, error: i } = await this.getUser();
            if (i)
                throw i;
            return { data: { identities: (e = t.user.identities) !== null && e !== void 0 ? e : [] }, error: null };
        } catch (t) {
            if (v(t))
                return { data: null, error: t };
            throw t;
        }
    }
    /**
     * Links an oauth identity to an existing user.
     * This method supports the PKCE flow.
     */
    async linkIdentity(e) {
        var t;
        try {
            const { data: i, error: s } = await this._useSession(async (n) => {
                var o, a, l, c, h;
                const { data: d, error: u } = n;
                if (u)
                    throw u;
                const g = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
                    redirectTo: (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
                    scopes: (a = e.options) === null || a === void 0 ? void 0 : a.scopes,
                    queryParams: (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
                    skipBrowserRedirect: !0
                });
                return await _(this.fetch, "GET", g, {
                    headers: this.headers,
                    jwt: (h = (c = d.session) === null || c === void 0 ? void 0 : c.access_token) !== null && h !== void 0 ? h : void 0
                });
            });
            if (s)
                throw s;
            return J() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(i == null ? void 0 : i.url), { data: { provider: e.provider, url: i == null ? void 0 : i.url }, error: null };
        } catch (i) {
            if (v(i))
                return { data: { provider: e.provider, url: null }, error: i };
            throw i;
        }
    }
    /**
     * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
     */
    async unlinkIdentity(e) {
        try {
            return await this._useSession(async (t) => {
                var i, s;
                const { data: n, error: o } = t;
                if (o)
                    throw o;
                return await _(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
                    headers: this.headers,
                    jwt: (s = (i = n.session) === null || i === void 0 ? void 0 : i.access_token) !== null && s !== void 0 ? s : void 0
                });
            });
        } catch (t) {
            if (v(t))
                return { data: null, error: t };
            throw t;
        }
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */
    async _refreshAccessToken(e) {
        const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
        this._debug(t, "begin");
        try {
            const i = Date.now();
            return await As(async (s) => (await js(s * 200), this._debug(t, "refreshing attempt", s), await _(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
                body: { refresh_token: e },
                headers: this.headers,
                xform: se
            })), (s, n, o) => o && o.error && tt(o.error) && // retryable only if the request can be sent before the backoff overflows the tick duration
                Date.now() + (s + 1) * 200 - i < $e);
        } catch (i) {
            if (this._debug(t, "error", i), v(i))
                return { data: { session: null, user: null }, error: i };
            throw i;
        } finally {
            this._debug(t, "end");
        }
    }
    _isValidSession(e) {
        return typeof e == "object" && e !== null && "access_token" in e && "refresh_token" in e && "expires_at" in e;
    }
    async _handleProviderSignIn(e, t) {
        const i = await this._getUrlForProvider(`${this.url}/authorize`, e, {
            redirectTo: t.redirectTo,
            scopes: t.scopes,
            queryParams: t.queryParams
        });
        return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", i), J() && !t.skipBrowserRedirect && window.location.assign(i), { data: { provider: e, url: i }, error: null };
    }
    /**
     * Recovers the session from LocalStorage and refreshes
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */
    async _recoverAndRefresh() {
        var e;
        const t = "#_recoverAndRefresh()";
        this._debug(t, "begin");
        try {
            const i = await Le(this.storage, this.storageKey);
            if (this._debug(t, "session from storage", i), !this._isValidSession(i)) {
                this._debug(t, "session is not valid"), i !== null && await this._removeSession();
                return;
            }
            const s = Math.round(Date.now() / 1e3), n = ((e = i.expires_at) !== null && e !== void 0 ? e : 1 / 0) < s + Ht;
            if (this._debug(t, `session has${n ? "" : " not"} expired with margin of ${Ht}s`), n) {
                if (this.autoRefreshToken && i.refresh_token) {
                    const { error: o } = await this._callRefreshToken(i.refresh_token);
                    o && (console.error(o), tt(o) || (this._debug(t, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
                }
            } else
                await this._notifyAllSubscribers("SIGNED_IN", i);
        } catch (i) {
            this._debug(t, "error", i), console.error(i);
            return;
        } finally {
            this._debug(t, "end");
        }
    }
    async _callRefreshToken(e) {
        var t, i;
        if (!e)
            throw new pe();
        if (this.refreshingDeferred)
            return this.refreshingDeferred.promise;
        const s = `#_callRefreshToken(${e.substring(0, 5)}...)`;
        this._debug(s, "begin");
        try {
            this.refreshingDeferred = new Be();
            const { data: n, error: o } = await this._refreshAccessToken(e);
            if (o)
                throw o;
            if (!n.session)
                throw new pe();
            await this._saveSession(n.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", n.session);
            const a = { session: n.session, error: null };
            return this.refreshingDeferred.resolve(a), a;
        } catch (n) {
            if (this._debug(s, "error", n), v(n)) {
                const o = { session: null, error: n };
                return tt(n) || (await this._removeSession(), await this._notifyAllSubscribers("SIGNED_OUT", null)), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(o), o;
            }
            throw (i = this.refreshingDeferred) === null || i === void 0 || i.reject(n), n;
        } finally {
            this.refreshingDeferred = null, this._debug(s, "end");
        }
    }
    async _notifyAllSubscribers(e, t, i = !0) {
        const s = `#_notifyAllSubscribers(${e})`;
        this._debug(s, "begin", t, `broadcast = ${i}`);
        try {
            this.broadcastChannel && i && this.broadcastChannel.postMessage({ event: e, session: t });
            const n = [], o = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
                try {
                    await a.callback(e, t);
                } catch (l) {
                    n.push(l);
                }
            });
            if (await Promise.all(o), n.length > 0) {
                for (let a = 0; a < n.length; a += 1)
                    console.error(n[a]);
                throw n[0];
            }
        } finally {
            this._debug(s, "end");
        }
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */
    async _saveSession(e) {
        this._debug("#_saveSession()", e), await ie(this.storage, this.storageKey, e);
    }
    async _removeSession() {
        this._debug("#_removeSession()"), await Ze(this.storage, this.storageKey);
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */
    _removeVisibilityChangedCallback() {
        this._debug("#_removeVisibilityChangedCallback()");
        const e = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            e && J() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", e);
        } catch (t) {
            console.error("removing visibilitychange callback failed", t);
        }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */
    async _startAutoRefresh() {
        await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
        const e = setInterval(() => this._autoRefreshTokenTick(), $e);
        this.autoRefreshTicker = e, e && typeof e == "object" && typeof e.unref == "function" ? e.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(e), setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
        }, 0);
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */
    async _stopAutoRefresh() {
        this._debug("#_stopAutoRefresh()");
        const e = this.autoRefreshTicker;
        this.autoRefreshTicker = null, e && clearInterval(e);
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */
    async startAutoRefresh() {
        this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */
    async stopAutoRefresh() {
        this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
    }
    /**
     * Runs the auto refresh token tick.
     */
    async _autoRefreshTokenTick() {
        this._debug("#_autoRefreshTokenTick()", "begin");
        try {
            await this._acquireLock(0, async () => {
                try {
                    const e = Date.now();
                    try {
                        return await this._useSession(async (t) => {
                            const { data: { session: i } } = t;
                            if (!i || !i.refresh_token || !i.expires_at) {
                                this._debug("#_autoRefreshTokenTick()", "no session");
                                return;
                            }
                            const s = Math.floor((i.expires_at * 1e3 - e) / $e);
                            this._debug("#_autoRefreshTokenTick()", `access token expires in ${s} ticks, a tick lasts ${$e}ms, refresh threshold is ${Kt} ticks`), s <= Kt && await this._callRefreshToken(i.refresh_token);
                        });
                    } catch (t) {
                        console.error("Auto refresh tick failed with error. This is likely a transient error.", t);
                    }
                } finally {
                    this._debug("#_autoRefreshTokenTick()", "end");
                }
            });
        } catch (e) {
            if (e.isAcquireTimeout || e instanceof xr)
                this._debug("auto refresh token tick lock not available");
            else
                throw e;
        }
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */
    async _handleVisibilityChange() {
        if (this._debug("#_handleVisibilityChange()"), !J() || !(window != null && window.addEventListener))
            return this.autoRefreshToken && this.startAutoRefresh(), !1;
        try {
            this.visibilityChangedCallback = async () => await this._onVisibilityChanged(!1), window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0);
        } catch (e) {
            console.error("_handleVisibilityChange", e);
        }
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */
    async _onVisibilityChanged(e) {
        const t = `#_onVisibilityChanged(${e})`;
        this._debug(t, "visibilityState", document.visibilityState), document.visibilityState === "visible" ? (this.autoRefreshToken && this._startAutoRefresh(), e || (await this.initializePromise, await this._acquireLock(-1, async () => {
            if (document.visibilityState !== "visible") {
                this._debug(t, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                return;
            }
            await this._recoverAndRefresh();
        }))) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh();
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */
    async _getUrlForProvider(e, t, i) {
        const s = [`provider=${encodeURIComponent(t)}`];
        if (i != null && i.redirectTo && s.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`), i != null && i.scopes && s.push(`scopes=${encodeURIComponent(i.scopes)}`), this.flowType === "pkce") {
            const n = ue();
            await ie(this.storage, `${this.storageKey}-code-verifier`, n);
            const o = await fe(n), a = n === o ? "plain" : "s256";
            this._debug("PKCE", "code verifier", `${n.substring(0, 5)}...`, "code challenge", o, "method", a);
            const l = new URLSearchParams({
                code_challenge: `${encodeURIComponent(o)}`,
                code_challenge_method: `${encodeURIComponent(a)}`
            });
            s.push(l.toString());
        }
        if (i != null && i.queryParams) {
            const n = new URLSearchParams(i.queryParams);
            s.push(n.toString());
        }
        return i != null && i.skipBrowserRedirect && s.push(`skip_http_redirect=${i.skipBrowserRedirect}`), `${e}?${s.join("&")}`;
    }
    async _unenroll(e) {
        try {
            return await this._useSession(async (t) => {
                var i;
                const { data: s, error: n } = t;
                return n ? { data: null, error: n } : await _(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
                    headers: this.headers,
                    jwt: (i = s == null ? void 0 : s.session) === null || i === void 0 ? void 0 : i.access_token
                });
            });
        } catch (t) {
            if (v(t))
                return { data: null, error: t };
            throw t;
        }
    }
    /**
     * {@see GoTrueMFAApi#enroll}
     */
    async _enroll(e) {
        try {
            return await this._useSession(async (t) => {
                var i, s;
                const { data: n, error: o } = t;
                if (o)
                    return { data: null, error: o };
                const { data: a, error: l } = await _(this.fetch, "POST", `${this.url}/factors`, {
                    body: {
                        friendly_name: e.friendlyName,
                        factor_type: e.factorType,
                        issuer: e.issuer
                    },
                    headers: this.headers,
                    jwt: (i = n == null ? void 0 : n.session) === null || i === void 0 ? void 0 : i.access_token
                });
                return l ? { data: null, error: l } : (!((s = a == null ? void 0 : a.totp) === null || s === void 0) && s.qr_code && (a.totp.qr_code = `data:image/svg+xml;utf-8,${a.totp.qr_code}`), { data: a, error: null });
            });
        } catch (t) {
            if (v(t))
                return { data: null, error: t };
            throw t;
        }
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */
    async _verify(e) {
        return this._acquireLock(-1, async () => {
            try {
                return await this._useSession(async (t) => {
                    var i;
                    const { data: s, error: n } = t;
                    if (n)
                        return { data: null, error: n };
                    const { data: o, error: a } = await _(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
                        body: { code: e.code, challenge_id: e.challengeId },
                        headers: this.headers,
                        jwt: (i = s == null ? void 0 : s.session) === null || i === void 0 ? void 0 : i.access_token
                    });
                    return a ? { data: null, error: a } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + o.expires_in }, o)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o), { data: o, error: a });
                });
            } catch (t) {
                if (v(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */
    async _challenge(e) {
        return this._acquireLock(-1, async () => {
            try {
                return await this._useSession(async (t) => {
                    var i;
                    const { data: s, error: n } = t;
                    return n ? { data: null, error: n } : await _(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
                        headers: this.headers,
                        jwt: (i = s == null ? void 0 : s.session) === null || i === void 0 ? void 0 : i.access_token
                    });
                });
            } catch (t) {
                if (v(t))
                    return { data: null, error: t };
                throw t;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */
    async _challengeAndVerify(e) {
        const { data: t, error: i } = await this._challenge({
            factorId: e.factorId
        });
        return i ? { data: null, error: i } : await this._verify({
            factorId: e.factorId,
            challengeId: t.id,
            code: e.code
        });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */
    async _listFactors() {
        const { data: { user: e }, error: t } = await this.getUser();
        if (t)
            return { data: null, error: t };
        const i = (e == null ? void 0 : e.factors) || [], s = i.filter((n) => n.factor_type === "totp" && n.status === "verified");
        return {
            data: {
                all: i,
                totp: s
            },
            error: null
        };
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */
    async _getAuthenticatorAssuranceLevel() {
        return this._acquireLock(-1, async () => await this._useSession(async (e) => {
            var t, i;
            const { data: { session: s }, error: n } = e;
            if (n)
                return { data: null, error: n };
            if (!s)
                return {
                    data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
                    error: null
                };
            const o = this._decodeJWT(s.access_token);
            let a = null;
            o.aal && (a = o.aal);
            let l = a;
            ((i = (t = s.user.factors) === null || t === void 0 ? void 0 : t.filter((d) => d.status === "verified")) !== null && i !== void 0 ? i : []).length > 0 && (l = "aal2");
            const h = o.amr || [];
            return { data: { currentLevel: a, nextLevel: l, currentAuthenticationMethods: h }, error: null };
        }));
    }
}
Ce.nextInstanceID = 0;
class tn extends Ce {
    constructor(e) {
        super(e);
    }
}
var rn = function (r, e, t, i) {
    function s(n) {
        return n instanceof t ? n : new t(function (o) {
            o(n);
        });
    }
    return new (t || (t = Promise))(function (n, o) {
        function a(h) {
            try {
                c(i.next(h));
            } catch (d) {
                o(d);
            }
        }
        function l(h) {
            try {
                c(i.throw(h));
            } catch (d) {
                o(d);
            }
        }
        function c(h) {
            h.done ? n(h.value) : s(h.value).then(a, l);
        }
        c((i = i.apply(r, e || [])).next());
    });
};
const sn = {
    headers: ys
}, nn = {
    schema: "public"
}, on = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    flowType: "implicit"
}, an = {};
class ln {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */
    constructor(e, t, i) {
        var s, n, o, a, l, c, h, d;
        if (this.supabaseUrl = e, this.supabaseKey = t, this.from = (y) => this.rest.from(y), this.schema = (y) => this.rest.schema(y), this.rpc = (y, E = {}, w) => this.rest.rpc(y, E, w), !e)
            throw new Error("supabaseUrl is required.");
        if (!t)
            throw new Error("supabaseKey is required.");
        const u = xs(e);
        this.realtimeUrl = `${u}/realtime/v1`.replace(/^http/i, "ws"), this.authUrl = `${u}/auth/v1`, this.storageUrl = `${u}/storage/v1`, this.functionsUrl = `${u}/functions/v1`;
        const g = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`, b = {
            db: nn,
            realtime: an,
            auth: Object.assign(Object.assign({}, on), { storageKey: g }),
            global: sn
        }, m = Ss(i ?? {}, b);
        this.storageKey = (n = (s = m.auth) === null || s === void 0 ? void 0 : s.storageKey) !== null && n !== void 0 ? n : "", this.headers = (a = (o = m.global) === null || o === void 0 ? void 0 : o.headers) !== null && a !== void 0 ? a : {}, this.auth = this._initSupabaseAuthClient((l = m.auth) !== null && l !== void 0 ? l : {}, this.headers, (c = m.global) === null || c === void 0 ? void 0 : c.fetch), this.fetch = ks(t, this._getAccessToken.bind(this), (h = m.global) === null || h === void 0 ? void 0 : h.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, m.realtime)), this.rest = new vt(`${u}/rest/v1`, {
            headers: this.headers,
            schema: (d = m.db) === null || d === void 0 ? void 0 : d.schema,
            fetch: this.fetch
        }), this._listenForAuthEvents();
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */
    get functions() {
        return new Pi(this.functionsUrl, {
            headers: this.headers,
            customFetch: this.fetch
        });
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */
    get storage() {
        return new ms(this.storageUrl, this.headers, this.fetch);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */
    channel(e, t = { config: {} }) {
        return this.realtime.channel(e, t);
    }
    /**
     * Returns all Realtime channels.
     */
    getChannels() {
        return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */
    removeChannel(e) {
        return this.realtime.removeChannel(e);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */
    removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
        var e, t;
        return rn(this, void 0, void 0, function* () {
            const { data: i } = yield this.auth.getSession();
            return (t = (e = i.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : null;
        });
    }
    _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: i, storage: s, storageKey: n, flowType: o, debug: a }, l, c) {
        const h = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new tn({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, h), l),
            storageKey: n,
            autoRefreshToken: e,
            persistSession: t,
            detectSessionInUrl: i,
            storage: s,
            flowType: o,
            debug: a,
            fetch: c
        });
    }
    _initRealtimeClient(e) {
        return new is(this.realtimeUrl, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
    }
    _listenForAuthEvents() {
        return this.auth.onAuthStateChange((t, i) => {
            this._handleTokenChanged(t, "CLIENT", i == null ? void 0 : i.access_token);
        });
    }
    _handleTokenChanged(e, t, i) {
        (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== i ? (this.realtime.setAuth(i ?? null), this.changedAccessToken = i) : e === "SIGNED_OUT" && (this.realtime.setAuth(this.supabaseKey), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
    }
}
const Sr = (r, e, t) => new ln(r, e, t);
function cn({ poll: r, sendResponse: e }) {
    return /* @__PURE__ */ Xt("div", {
        className: "flex bg-white dark:bg-neutral-900 flex-col gap-3 p-6 w-full h-full", children: [
    /* @__PURE__ */ N("p", { className: "font-bold tracking-tight text-neutral-900 text-lg dark:text-neutral-100", children: r.poll_data.title }),
    /* @__PURE__ */ N("p", { className: "text-neutral-600 dark:text-neutral-400 text-sm", children: r.poll_data.subtitle }),
    /* @__PURE__ */ N("div", {
            className: "w-full  text-sm gap-2.5 grid grid-cols-2  ", children: r.poll_data.options.map((t, i) => /* @__PURE__ */ N(
                "button",
                {
                    onClick: () => {
                        e({ option_id: t.id });
                    },
                    className: "w-full h-10  py-2 rounded-md border dark:hover:bg-neutral-700 dark:border-neutral-700 border-neutral-300 justify-start items-center p-3 flex hover:bg-neutral-100 transition",
                    children: /* @__PURE__ */ N("div", { className: "dark:text-white text-black", children: t.title })
                },
                i
            ))
        })
        ]
    });
}
function hn({ poll: r, user: e }) {
    const t = Sr(
        "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
    ), [i, s] = Zt(!1), n = 9999, o = async () => {
        let { data: l, error: c } = await t.from("responses").select("*").eq("user_id", e.id).eq("poll_id", r.id);
        return l;
    };
    er(() => {
        var l = new Date((/* @__PURE__ */ new Date()).getTime() - 6048e5);
        r.active && (e.created_at && new Date(e.created_at) > l || new Date(r.active_until) < /* @__PURE__ */ new Date() || o().then((c) => {
            if (c.length)
                return;
            const h = setTimeout(() => {
                s(!0);
            }, r.time_delay_ms);
            return () => clearTimeout(h);
        }));
    }, []);
    const a = async (l) => {
        s(!1), await t.from("responses").insert({ user_id: e.id, poll_id: r.id, response_data: l });
    };
    return /* @__PURE__ */ N(Qt, {
        children: /* @__PURE__ */ Xt(
            "div",
            {
                style: {
                    opacity: i ? 1 : 0,
                    pointerEvents: i ? "all" : "none"
                },
                className: "transition duration-150 ease-in-out",
                children: [
        /* @__PURE__ */ N(
                    "div",
                    {
                        onClick: () => {
                            s(!1), a({});
                        },
                        style: {
                            zIndex: n - 1
                        },
                        className: "fixed inset-0 z-50 bg-white/80 w-full h-full dark:bg-neutral-950/60"
                    }
                ),
        /* @__PURE__ */ N(
                    "div",
                    {
                        style: {
                            zIndex: n
                        },
                        className: " select-none  w-[500px] min-h-[100px] rounded-lg border  dark:border-neutral-700 border-neutral-300 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ",
                        children: /* @__PURE__ */ N(cn, { poll: r, sendResponse: a })
                    }
                )
                ]
            }
        )
    });
}
function fn({ user: r }) {
    const [e, t] = Zt([]), i = Sr(
        "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
    );
    return er(() => {
        i.from("polls").select("*").then((s) => {
            t(s.data);
        });
    }, []), /* @__PURE__ */ N("div", { className: "dark", children: /* @__PURE__ */ N(Qt, { children: e.length ? /* @__PURE__ */ N(hn, { user: r, poll: e[0] }) : null }) });
}
function pn(r) {
    return `Hello ${r}!`;
}
Hr(
    {
        /* config */
        presets: [Zr(), Oi()]
    },
    !0
);
export {
    fn as Index,
    cn as MCQ,
    pn as helloAnything
};
