import { t as w, N as Us, s as lc, T as ge, a as gt, I as ll, b as ac, c as Ki, P as hc, h as cc, p as fc, d as uc } from "./@lezer.js";
import { c as I } from "./crelt.js";
import { S as Xt } from "./style-mod.js";
import { k as dc, b as pc, s as mc } from "./w3c-keyname.js";
class L {
  /**
  Get the line description around the given position.
  */
  lineAt(t) {
    if (t < 0 || t > this.length)
      throw new RangeError(`Invalid position ${t} in document of length ${this.length}`);
    return this.lineInner(t, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(t) {
    if (t < 1 || t > this.lines)
      throw new RangeError(`Invalid line number ${t} in ${this.lines}-line document`);
    return this.lineInner(t, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(t, e, i) {
    [t, e] = Ae(this, t, e);
    let s = [];
    return this.decompose(
      0,
      t,
      s,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      s,
      3
      /* Open.To */
    ), this.decompose(
      e,
      this.length,
      s,
      1
      /* Open.From */
    ), Ct.from(s, this.length - (e - t) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(t) {
    return this.replace(this.length, this.length, t);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(t, e = this.length) {
    [t, e] = Ae(this, t, e);
    let i = [];
    return this.decompose(t, e, i, 0), Ct.from(i, e - t);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(t) {
    if (t == this)
      return !0;
    if (t.length != this.length || t.lines != this.lines)
      return !1;
    let e = this.scanIdentical(t, 1), i = this.length - this.scanIdentical(t, -1), s = new Je(this), r = new Je(t);
    for (let o = e, l = e; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (l += s.value.length, s.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(t = 1) {
    return new Je(this, t);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(t, e = this.length) {
    return new al(this, t, e);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(t, e) {
    let i;
    if (t == null)
      i = this.iter();
    else {
      e == null && (e = this.lines + 1);
      let s = this.line(t).from;
      i = this.iterRange(s, Math.max(s, e == this.lines + 1 ? this.length : e <= 1 ? 0 : this.line(e - 1).to));
    }
    return new hl(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let t = [];
    return this.flatten(t), t;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(t) {
    if (t.length == 0)
      throw new RangeError("A document must have at least one line");
    return t.length == 1 && !t[0] ? L.empty : t.length <= 32 ? new W(t) : Ct.from(W.split(t, []));
  }
}
class W extends L {
  constructor(t, e = gc(t)) {
    super(), this.text = t, this.length = e;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(t, e, i, s) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = s + o.length;
      if ((e ? i : l) >= t)
        return new yc(s, l, i, o);
      s = l + 1, i++;
    }
  }
  decompose(t, e, i, s) {
    let r = t <= 0 && e >= this.length ? this : new W(Cr(this.text, t, e), Math.min(e, this.length) - Math.max(0, t));
    if (s & 1) {
      let o = i.pop(), l = ji(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        i.push(new W(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        i.push(new W(l.slice(0, a)), new W(l.slice(a)));
      }
    } else
      i.push(r);
  }
  replace(t, e, i) {
    if (!(i instanceof W))
      return super.replace(t, e, i);
    [t, e] = Ae(this, t, e);
    let s = ji(this.text, ji(i.text, Cr(this.text, 0, t)), e), r = this.length + i.length - (e - t);
    return s.length <= 32 ? new W(s, r) : Ct.from(W.split(s, []), r);
  }
  sliceString(t, e = this.length, i = `
`) {
    [t, e] = Ae(this, t, e);
    let s = "";
    for (let r = 0, o = 0; r <= e && o < this.text.length; o++) {
      let l = this.text[o], a = r + l.length;
      r > t && o && (s += i), t < a && e > r && (s += l.slice(Math.max(0, t - r), e - r)), r = a + 1;
    }
    return s;
  }
  flatten(t) {
    for (let e of this.text)
      t.push(e);
  }
  scanIdentical() {
    return 0;
  }
  static split(t, e) {
    let i = [], s = -1;
    for (let r of t)
      i.push(r), s += r.length + 1, i.length == 32 && (e.push(new W(i, s)), i = [], s = -1);
    return s > -1 && e.push(new W(i, s)), e;
  }
}
class Ct extends L {
  constructor(t, e) {
    super(), this.children = t, this.length = e, this.lines = 0;
    for (let i of t)
      this.lines += i.lines;
  }
  lineInner(t, e, i, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = s + o.length, a = i + o.lines - 1;
      if ((e ? a : l) >= t)
        return o.lineInner(t, e, i, s);
      s = l + 1, i = a + 1;
    }
  }
  decompose(t, e, i, s) {
    for (let r = 0, o = 0; o <= e && r < this.children.length; r++) {
      let l = this.children[r], a = o + l.length;
      if (t <= a && e >= o) {
        let c = s & ((o <= t ? 1 : 0) | (a >= e ? 2 : 0));
        o >= t && a <= e && !c ? i.push(l) : l.decompose(t - o, e - o, i, c);
      }
      o = a + 1;
    }
  }
  replace(t, e, i) {
    if ([t, e] = Ae(this, t, e), i.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (t >= r && e <= l) {
          let a = o.replace(t - r, e - r, i), c = this.lines - o.lines + a.lines;
          if (a.lines < c >> 4 && a.lines > c >> 6) {
            let h = this.children.slice();
            return h[s] = a, new Ct(h, this.length - (e - t) + i.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(t, e, i);
  }
  sliceString(t, e = this.length, i = `
`) {
    [t, e] = Ae(this, t, e);
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= e; r++) {
      let l = this.children[r], a = o + l.length;
      o > t && r && (s += i), t < a && e > o && (s += l.sliceString(t - o, e - o, i)), o = a + 1;
    }
    return s;
  }
  flatten(t) {
    for (let e of this.children)
      e.flatten(t);
  }
  scanIdentical(t, e) {
    if (!(t instanceof Ct))
      return 0;
    let i = 0, [s, r, o, l] = e > 0 ? [0, 0, this.children.length, t.children.length] : [this.children.length - 1, t.children.length - 1, -1, -1];
    for (; ; s += e, r += e) {
      if (s == o || r == l)
        return i;
      let a = this.children[s], c = t.children[r];
      if (a != c)
        return i + a.scanIdentical(c, e);
      i += a.length + 1;
    }
  }
  static from(t, e = t.reduce((i, s) => i + s.length + 1, -1)) {
    let i = 0;
    for (let d of t)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let p of t)
        p.flatten(d);
      return new W(d, e);
    }
    let s = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, l = [], a = 0, c = -1, h = [];
    function f(d) {
      let p;
      if (d.lines > r && d instanceof Ct)
        for (let m of d.children)
          f(m);
      else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof W && a && (p = h[h.length - 1]) instanceof W && d.lines + p.lines <= 32 ? (a += d.lines, c += d.length + 1, h[h.length - 1] = new W(p.text.concat(d.text), p.length + 1 + d.length)) : (a + d.lines > s && u(), a += d.lines, c += d.length + 1, h.push(d));
    }
    function u() {
      a != 0 && (l.push(h.length == 1 ? h[0] : Ct.from(h, c)), c = -1, a = h.length = 0);
    }
    for (let d of t)
      f(d);
    return u(), l.length == 1 ? l[0] : new Ct(l, e);
  }
}
L.empty = /* @__PURE__ */ new W([""], 0);
function gc(n) {
  let t = -1;
  for (let e of n)
    t += e.length + 1;
  return t;
}
function ji(n, t, e = 0, i = 1e9) {
  for (let s = 0, r = 0, o = !0; r < n.length && s <= i; r++) {
    let l = n[r], a = s + l.length;
    a >= e && (a > i && (l = l.slice(0, i - s)), s < e && (l = l.slice(e - s)), o ? (t[t.length - 1] += l, o = !1) : t.push(l)), s = a + 1;
  }
  return t;
}
function Cr(n, t, e) {
  return ji(n, [""], t, e);
}
class Je {
  constructor(t, e = 1) {
    this.dir = e, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [t], this.offsets = [e > 0 ? 1 : (t instanceof W ? t.text.length : t.children.length) << 1];
  }
  nextInner(t, e) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, s = this.nodes[i], r = this.offsets[i], o = r >> 1, l = s instanceof W ? s.text.length : s.children.length;
      if (o == (e > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        e > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (e > 0 ? 0 : 1)) {
        if (this.offsets[i] += e, t == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        t--;
      } else if (s instanceof W) {
        let a = s.text[o + (e < 0 ? -1 : 0)];
        if (this.offsets[i] += e, a.length > Math.max(0, t))
          return this.value = t == 0 ? a : e > 0 ? a.slice(t) : a.slice(0, a.length - t), this;
        t -= a.length;
      } else {
        let a = s.children[o + (e < 0 ? -1 : 0)];
        t > a.length ? (t -= a.length, this.offsets[i] += e) : (e < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(e > 0 ? 1 : (a instanceof W ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(t = 0) {
    return t < 0 && (this.nextInner(-t, -this.dir), t = this.value.length), this.nextInner(t, this.dir);
  }
}
class al {
  constructor(t, e, i) {
    this.value = "", this.done = !1, this.cursor = new Je(t, e > i ? -1 : 1), this.pos = e > i ? t.length : 0, this.from = Math.min(e, i), this.to = Math.max(e, i);
  }
  nextInner(t, e) {
    if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
    let i = e < 0 ? this.pos - this.from : this.to - this.pos;
    t > i && (t = i), i -= t;
    let { value: s } = this.cursor.next(t);
    return this.pos += (s.length + t) * e, this.value = s.length <= i ? s : e < 0 ? s.slice(s.length - i) : s.slice(0, i), this.done = !this.value, this;
  }
  next(t = 0) {
    return t < 0 ? t = Math.max(t, this.from - this.pos) : t > 0 && (t = Math.min(t, this.to - this.pos)), this.nextInner(t, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class hl {
  constructor(t) {
    this.inner = t, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(t = 0) {
    let { done: e, lineBreak: i, value: s } = this.inner.next(t);
    return e && this.afterBreak ? (this.value = "", this.afterBreak = !1) : e ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = s, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (L.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Je.prototype[Symbol.iterator] = al.prototype[Symbol.iterator] = hl.prototype[Symbol.iterator] = function() {
  return this;
});
class yc {
  /**
  @internal
  */
  constructor(t, e, i, s) {
    this.from = t, this.to = e, this.number = i, this.text = s;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function Ae(n, t, e) {
  return t = Math.max(0, Math.min(n.length, t)), [t, Math.max(t, Math.min(n.length, e))];
}
let xe = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((n) => n ? parseInt(n, 36) : 1);
for (let n = 1; n < xe.length; n++)
  xe[n] += xe[n - 1];
function bc(n) {
  for (let t = 1; t < xe.length; t += 2)
    if (xe[t] > n)
      return xe[t - 1] <= n;
  return !1;
}
function Mr(n) {
  return n >= 127462 && n <= 127487;
}
const Ar = 8205;
function Z(n, t, e = !0, i = !0) {
  return (e ? cl : wc)(n, t, i);
}
function cl(n, t, e) {
  if (t == n.length)
    return t;
  t && fl(n.charCodeAt(t)) && ul(n.charCodeAt(t - 1)) && t--;
  let i = J(n, t);
  for (t += dt(i); t < n.length; ) {
    let s = J(n, t);
    if (i == Ar || s == Ar || e && bc(s))
      t += dt(s), i = s;
    else if (Mr(s)) {
      let r = 0, o = t - 2;
      for (; o >= 0 && Mr(J(n, o)); )
        r++, o -= 2;
      if (r % 2 == 0)
        break;
      t += 2;
    } else
      break;
  }
  return t;
}
function wc(n, t, e) {
  for (; t > 0; ) {
    let i = cl(n, t - 2, e);
    if (i < t)
      return i;
    t--;
  }
  return 0;
}
function fl(n) {
  return n >= 56320 && n < 57344;
}
function ul(n) {
  return n >= 55296 && n < 56320;
}
function J(n, t) {
  let e = n.charCodeAt(t);
  if (!ul(e) || t + 1 == n.length)
    return e;
  let i = n.charCodeAt(t + 1);
  return fl(i) ? (e - 55296 << 10) + (i - 56320) + 65536 : e;
}
function Gs(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function dt(n) {
  return n < 65536 ? 1 : 2;
}
const ns = /\r\n?|\n/;
var Y = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(Y || (Y = {}));
class Tt {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(t) {
    this.sections = t;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let t = 0;
    for (let e = 0; e < this.sections.length; e += 2)
      t += this.sections[e];
    return t;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let t = 0;
    for (let e = 0; e < this.sections.length; e += 2) {
      let i = this.sections[e + 1];
      t += i < 0 ? this.sections[e] : i;
    }
    return t;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(t) {
    for (let e = 0, i = 0, s = 0; e < this.sections.length; ) {
      let r = this.sections[e++], o = this.sections[e++];
      o < 0 ? (t(i, s, r), s += r) : s += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(t, e = !1) {
    ss(this, t, e);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let t = [];
    for (let e = 0; e < this.sections.length; ) {
      let i = this.sections[e++], s = this.sections[e++];
      s < 0 ? t.push(i, s) : t.push(s, i);
    }
    return new Tt(t);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(t) {
    return this.empty ? t : t.empty ? this : dl(this, t);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `other` happened before the ones in `this`.
  */
  mapDesc(t, e = !1) {
    return t.empty ? this : rs(this, t, e);
  }
  mapPos(t, e = -1, i = Y.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], c = s + l;
      if (a < 0) {
        if (c > t)
          return r + (t - s);
        r += l;
      } else {
        if (i != Y.Simple && c >= t && (i == Y.TrackDel && s < t && c > t || i == Y.TrackBefore && s < t || i == Y.TrackAfter && c > t))
          return null;
        if (c > t || c == t && e < 0 && !l)
          return t == s || e < 0 ? r : r + a;
        r += a;
      }
      s = c;
    }
    if (t > s)
      throw new RangeError(`Position ${t} is out of range for changeset of length ${s}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(t, e = t) {
    for (let i = 0, s = 0; i < this.sections.length && s <= e; ) {
      let r = this.sections[i++], o = this.sections[i++], l = s + r;
      if (o >= 0 && s <= e && l >= t)
        return s < t && l > e ? "cover" : !0;
      s = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let t = "";
    for (let e = 0; e < this.sections.length; ) {
      let i = this.sections[e++], s = this.sections[e++];
      t += (t ? " " : "") + i + (s >= 0 ? ":" + s : "");
    }
    return t;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(t) {
    if (!Array.isArray(t) || t.length % 2 || t.some((e) => typeof e != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new Tt(t);
  }
  /**
  @internal
  */
  static create(t) {
    return new Tt(t);
  }
}
class K extends Tt {
  constructor(t, e) {
    super(t), this.inserted = e;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(t) {
    if (this.length != t.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return ss(this, (e, i, s, r, o) => t = t.replace(s, s + (i - e), o), !1), t;
  }
  mapDesc(t, e = !1) {
    return rs(this, t, e, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(t) {
    let e = this.sections.slice(), i = [];
    for (let s = 0, r = 0; s < e.length; s += 2) {
      let o = e[s], l = e[s + 1];
      if (l >= 0) {
        e[s] = l, e[s + 1] = o;
        let a = s >> 1;
        for (; i.length < a; )
          i.push(L.empty);
        i.push(o ? t.slice(r, r + o) : L.empty);
      }
      r += o;
    }
    return new K(e, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(t) {
    return this.empty ? t : t.empty ? this : dl(this, t, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(t, e = !1) {
    return t.empty ? this : rs(this, t, e, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(t, e = !1) {
    ss(this, t, e);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return Tt.create(this.sections);
  }
  /**
  @internal
  */
  filter(t) {
    let e = [], i = [], s = [], r = new ti(this);
    t: for (let o = 0, l = 0; ; ) {
      let a = o == t.length ? 1e9 : t[o++];
      for (; l < a || l == a && r.len == 0; ) {
        if (r.done)
          break t;
        let h = Math.min(r.len, a - l);
        _(s, h, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        _(e, h, f), f > 0 && qt(i, e, r.text), r.forward(h), l += h;
      }
      let c = t[o++];
      for (; l < c; ) {
        if (r.done)
          break t;
        let h = Math.min(r.len, c - l);
        _(e, h, -1), _(s, h, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(h), l += h;
      }
    }
    return {
      changes: new K(e, i),
      filtered: Tt.create(s)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let t = [];
    for (let e = 0; e < this.sections.length; e += 2) {
      let i = this.sections[e], s = this.sections[e + 1];
      s < 0 ? t.push(i) : s == 0 ? t.push([i]) : t.push([i].concat(this.inserted[e >> 1].toJSON()));
    }
    return t;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(t, e, i) {
    let s = [], r = [], o = 0, l = null;
    function a(h = !1) {
      if (!h && !s.length)
        return;
      o < e && _(s, e - o, -1);
      let f = new K(s, r);
      l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
    }
    function c(h) {
      if (Array.isArray(h))
        for (let f of h)
          c(f);
      else if (h instanceof K) {
        if (h.length != e)
          throw new RangeError(`Mismatched change set length (got ${h.length}, expected ${e})`);
        a(), l = l ? l.compose(h.map(l)) : h;
      } else {
        let { from: f, to: u = f, insert: d } = h;
        if (f > u || f < 0 || u > e)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${e})`);
        let p = d ? typeof d == "string" ? L.of(d.split(i || ns)) : d : L.empty, m = p.length;
        if (f == u && m == 0)
          return;
        f < o && a(), f > o && _(s, f - o, -1), _(s, u - f, m), qt(r, s, p), o = u;
      }
    }
    return c(t), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(t) {
    return new K(t ? [t, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(t) {
    if (!Array.isArray(t))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let e = [], i = [];
    for (let s = 0; s < t.length; s++) {
      let r = t[s];
      if (typeof r == "number")
        e.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          e.push(r[0], 0);
        else {
          for (; i.length < s; )
            i.push(L.empty);
          i[s] = L.of(r.slice(1)), e.push(r[0], i[s].length);
        }
      }
    }
    return new K(e, i);
  }
  /**
  @internal
  */
  static createSet(t, e) {
    return new K(t, e);
  }
}
function _(n, t, e, i = !1) {
  if (t == 0 && e <= 0)
    return;
  let s = n.length - 2;
  s >= 0 && e <= 0 && e == n[s + 1] ? n[s] += t : t == 0 && n[s] == 0 ? n[s + 1] += e : i ? (n[s] += t, n[s + 1] += e) : n.push(t, e);
}
function qt(n, t, e) {
  if (e.length == 0)
    return;
  let i = t.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(e);
  else {
    for (; n.length < i; )
      n.push(L.empty);
    n.push(e);
  }
}
function ss(n, t, e) {
  let i = n.inserted;
  for (let s = 0, r = 0, o = 0; o < n.sections.length; ) {
    let l = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      s += l, r += l;
    else {
      let c = s, h = r, f = L.empty;
      for (; c += l, h += a, a && i && (f = f.append(i[o - 2 >> 1])), !(e || o == n.sections.length || n.sections[o + 1] < 0); )
        l = n.sections[o++], a = n.sections[o++];
      t(s, c, r, h, f), s = c, r = h;
    }
  }
}
function rs(n, t, e, i = !1) {
  let s = [], r = i ? [] : null, o = new ti(n), l = new ti(t);
  for (let a = -1; ; )
    if (o.ins == -1 && l.ins == -1) {
      let c = Math.min(o.len, l.len);
      _(s, c, -1), o.forward(c), l.forward(c);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !e))) {
      let c = l.len;
      for (_(s, l.ins, -1); c; ) {
        let h = Math.min(o.len, c);
        o.ins >= 0 && a < o.i && o.len <= h && (_(s, 0, o.ins), r && qt(r, s, o.text), a = o.i), o.forward(h), c -= h;
      }
      l.next();
    } else if (o.ins >= 0) {
      let c = 0, h = o.len;
      for (; h; )
        if (l.ins == -1) {
          let f = Math.min(h, l.len);
          c += f, h -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < h)
          h -= l.len, l.next();
        else
          break;
      _(s, c, a < o.i ? o.ins : 0), r && a < o.i && qt(r, s, o.text), a = o.i, o.forward(o.len - h);
    } else {
      if (o.done && l.done)
        return r ? K.createSet(s, r) : Tt.create(s);
      throw new Error("Mismatched change set lengths");
    }
}
function dl(n, t, e = !1) {
  let i = [], s = e ? [] : null, r = new ti(n), o = new ti(t);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return s ? K.createSet(i, s) : Tt.create(i);
    if (r.ins == 0)
      _(i, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      _(i, 0, o.ins, l), s && qt(s, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), c = i.length;
        if (r.ins == -1) {
          let h = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          _(i, a, h, l), s && h && qt(s, i, o.text);
        } else o.ins == -1 ? (_(i, r.off ? 0 : r.len, a, l), s && qt(s, i, r.textBit(a))) : (_(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && qt(s, i, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > c), r.forward2(a), o.forward(a);
      }
    }
  }
}
class ti {
  constructor(t) {
    this.set = t, this.i = 0, this.next();
  }
  next() {
    let { sections: t } = this.set;
    this.i < t.length ? (this.len = t[this.i++], this.ins = t[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: t } = this.set, e = this.i - 2 >> 1;
    return e >= t.length ? L.empty : t[e];
  }
  textBit(t) {
    let { inserted: e } = this.set, i = this.i - 2 >> 1;
    return i >= e.length && !t ? L.empty : e[i].slice(this.off, t == null ? void 0 : this.off + t);
  }
  forward(t) {
    t == this.len ? this.next() : (this.len -= t, this.off += t);
  }
  forward2(t) {
    this.ins == -1 ? this.forward(t) : t == this.ins ? this.next() : (this.ins -= t, this.off += t);
  }
}
class se {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let t = this.flags & 7;
    return t == 7 ? null : t;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let t = this.flags >> 6;
    return t == 16777215 ? void 0 : t;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(t, e = -1) {
    let i, s;
    return this.empty ? i = s = t.mapPos(this.from, e) : (i = t.mapPos(this.from, 1), s = t.mapPos(this.to, -1)), i == this.from && s == this.to ? this : new se(i, s, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(t, e = t) {
    if (t <= this.anchor && e >= this.anchor)
      return b.range(t, e);
    let i = Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
    return b.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(t, e = !1) {
    return this.anchor == t.anchor && this.head == t.head && (!e || !this.empty || this.assoc == t.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(t) {
    if (!t || typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return b.range(t.anchor, t.head);
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new se(t, e, i);
  }
}
class b {
  constructor(t, e) {
    this.ranges = t, this.mainIndex = e;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(t, e = -1) {
    return t.empty ? this : b.create(this.ranges.map((i) => i.map(t, e)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(t, e = !1) {
    if (this.ranges.length != t.ranges.length || this.mainIndex != t.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(t.ranges[i], e))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new b([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(t, e = !0) {
    return b.create([t].concat(this.ranges), e ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(t, e = this.mainIndex) {
    let i = this.ranges.slice();
    return i[e] = t, b.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((t) => t.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(t) {
    if (!t || !Array.isArray(t.ranges) || typeof t.main != "number" || t.main >= t.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new b(t.ranges.map((e) => se.fromJSON(e)), t.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(t, e = t) {
    return new b([b.range(t, e)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(t, e = 0) {
    if (t.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, s = 0; s < t.length; s++) {
      let r = t[s];
      if (r.empty ? r.from <= i : r.from < i)
        return b.normalized(t.slice(), e);
      i = r.to;
    }
    return new b(t, e);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(t, e = 0, i, s) {
    return se.create(t, t, (e == 0 ? 0 : e < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (s ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(t, e, i, s) {
    let r = (i ?? 16777215) << 6 | (s == null ? 7 : Math.min(6, s));
    return e < t ? se.create(e, t, 48 | r) : se.create(t, e, (e > t ? 8 : 0) | r);
  }
  /**
  @internal
  */
  static normalized(t, e = 0) {
    let i = t[e];
    t.sort((s, r) => s.from - r.from), e = t.indexOf(i);
    for (let s = 1; s < t.length; s++) {
      let r = t[s], o = t[s - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let l = o.from, a = Math.max(r.to, o.to);
        s <= e && e--, t.splice(--s, 2, r.anchor > r.head ? b.range(a, l) : b.range(l, a));
      }
    }
    return new b(t, e);
  }
}
function pl(n, t) {
  for (let e of n.ranges)
    if (e.to > t)
      throw new RangeError("Selection points outside of document");
}
let Xs = 0;
class C {
  constructor(t, e, i, s, r) {
    this.combine = t, this.compareInput = e, this.compare = i, this.isStatic = s, this.id = Xs++, this.default = t([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(t = {}) {
    return new C(t.combine || ((e) => e), t.compareInput || ((e, i) => e === i), t.compare || (t.combine ? (e, i) => e === i : Js), !!t.static, t.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(t) {
    return new Ui([], this, 0, t);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(t, e) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Ui(t, this, 1, e);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(t, e) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Ui(t, this, 2, e);
  }
  from(t, e) {
    return e || (e = (i) => i), this.compute([t], (i) => e(i.field(t)));
  }
}
function Js(n, t) {
  return n == t || n.length == t.length && n.every((e, i) => e === t[i]);
}
class Ui {
  constructor(t, e, i, s) {
    this.dependencies = t, this.facet = e, this.type = i, this.value = s, this.id = Xs++;
  }
  dynamicSlot(t) {
    var e;
    let i = this.value, s = this.facet.compareInput, r = this.id, o = t[r] >> 1, l = this.type == 2, a = !1, c = !1, h = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? c = !0 : ((e = t[f.id]) !== null && e !== void 0 ? e : 1) & 1 || h.push(t[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, u) {
        if (a && u.docChanged || c && (u.docChanged || u.selection) || os(f, h)) {
          let d = i(f);
          if (l ? !Dr(d, f.values[o], s) : !s(d, f.values[o]))
            return f.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let d, p = u.config.address[r];
        if (p != null) {
          let m = en(u, p);
          if (this.dependencies.every((g) => g instanceof C ? u.facet(g) === f.facet(g) : g instanceof U ? u.field(g, !1) == f.field(g, !1) : !0) || (l ? Dr(d = i(f), m, s) : s(d = i(f), m)))
            return f.values[o] = m, 0;
        } else
          d = i(f);
        return f.values[o] = d, 1;
      }
    };
  }
}
function Dr(n, t, e) {
  if (n.length != t.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!e(n[i], t[i]))
      return !1;
  return !0;
}
function os(n, t) {
  let e = !1;
  for (let i of t)
    Ye(n, i) & 1 && (e = !0);
  return e;
}
function xc(n, t, e) {
  let i = e.map((a) => n[a.id]), s = e.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = n[t.id] >> 1;
  function l(a) {
    let c = [];
    for (let h = 0; h < i.length; h++) {
      let f = en(a, i[h]);
      if (s[h] == 2)
        for (let u of f)
          c.push(u);
      else
        c.push(f);
    }
    return t.combine(c);
  }
  return {
    create(a) {
      for (let c of i)
        Ye(a, c);
      return a.values[o] = l(a), 1;
    },
    update(a, c) {
      if (!os(a, r))
        return 0;
      let h = l(a);
      return t.compare(h, a.values[o]) ? 0 : (a.values[o] = h, 1);
    },
    reconfigure(a, c) {
      let h = os(a, i), f = c.config.facets[t.id], u = c.facet(t);
      if (f && !h && Js(e, f))
        return a.values[o] = u, 0;
      let d = l(a);
      return t.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
    }
  };
}
const Tr = /* @__PURE__ */ C.define({ static: !0 });
class U {
  constructor(t, e, i, s, r) {
    this.id = t, this.createF = e, this.updateF = i, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(t) {
    let e = new U(Xs++, t.create, t.update, t.compare || ((i, s) => i === s), t);
    return t.provide && (e.provides = t.provide(e)), e;
  }
  create(t) {
    let e = t.facet(Tr).find((i) => i.field == this);
    return ((e == null ? void 0 : e.create) || this.createF)(t);
  }
  /**
  @internal
  */
  slot(t) {
    let e = t[this.id] >> 1;
    return {
      create: (i) => (i.values[e] = this.create(i), 1),
      update: (i, s) => {
        let r = i.values[e], o = this.updateF(r, s);
        return this.compareF(r, o) ? 0 : (i.values[e] = o, 1);
      },
      reconfigure: (i, s) => s.config.address[this.id] != null ? (i.values[e] = s.field(this), 0) : (i.values[e] = this.create(i), 1)
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(t) {
    return [this, Tr.of({ field: this, create: t })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const ie = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function He(n) {
  return (t) => new ml(t, n);
}
const Zt = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ He(ie.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ He(ie.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ He(ie.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ He(ie.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ He(ie.lowest)
};
class ml {
  constructor(t, e) {
    this.inner = t, this.prec = e;
  }
}
class kn {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(t) {
    return new ls(this, t);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(t) {
    return kn.reconfigure.of({ compartment: this, extension: t });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(t) {
    return t.config.compartments.get(this);
  }
}
class ls {
  constructor(t, e) {
    this.compartment = t, this.inner = e;
  }
}
class tn {
  constructor(t, e, i, s, r, o) {
    for (this.base = t, this.compartments = e, this.dynamicSlots = i, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(t) {
    let e = this.address[t.id];
    return e == null ? t.default : this.staticValues[e >> 1];
  }
  static resolve(t, e, i) {
    let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of vc(t, e, o))
      u instanceof U ? s.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], c = [];
    for (let u of s)
      l[u.id] = c.length << 1, c.push((d) => u.slot(d));
    let h = i == null ? void 0 : i.config.facets;
    for (let u in r) {
      let d = r[u], p = d[0].facet, m = h && h[u] || [];
      if (d.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (l[p.id] = a.length << 1 | 1, Js(m, d))
          a.push(i.facet(p));
        else {
          let g = p.combine(d.map((y) => y.value));
          a.push(i && p.compare(g, i.facet(p)) ? i.facet(p) : g);
        }
      else {
        for (let g of d)
          g.type == 0 ? (l[g.id] = a.length << 1 | 1, a.push(g.value)) : (l[g.id] = c.length << 1, c.push((y) => g.dynamicSlot(y)));
        l[p.id] = c.length << 1, c.push((g) => xc(g, p, d));
      }
    }
    let f = c.map((u) => u(l));
    return new tn(t, o, f, l, a, r);
  }
}
function vc(n, t, e) {
  let i = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = s.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let c = i[a].indexOf(o);
      c > -1 && i[a].splice(c, 1), o instanceof ls && e.delete(o.compartment);
    }
    if (s.set(o, l), Array.isArray(o))
      for (let c of o)
        r(c, l);
    else if (o instanceof ls) {
      if (e.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let c = t.get(o.compartment) || o.inner;
      e.set(o.compartment, c), r(c, l);
    } else if (o instanceof ml)
      r(o.inner, o.prec);
    else if (o instanceof U)
      i[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof Ui)
      i[l].push(o), o.facet.extensions && r(o.facet.extensions, ie.default);
    else {
      let c = o.extension;
      if (!c)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(c, l);
    }
  }
  return r(n, ie.default), i.reduce((o, l) => o.concat(l));
}
function Ye(n, t) {
  if (t & 1)
    return 2;
  let e = t >> 1, i = n.status[e];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[e] = 4;
  let s = n.computeSlot(n, n.config.dynamicSlots[e]);
  return n.status[e] = 2 | s;
}
function en(n, t) {
  return t & 1 ? n.config.staticValues[t >> 1] : n.values[t >> 1];
}
const gl = /* @__PURE__ */ C.define(), as = /* @__PURE__ */ C.define({
  combine: (n) => n.some((t) => t),
  static: !0
}), yl = /* @__PURE__ */ C.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), bl = /* @__PURE__ */ C.define(), wl = /* @__PURE__ */ C.define(), xl = /* @__PURE__ */ C.define(), vl = /* @__PURE__ */ C.define({
  combine: (n) => n.length ? n[0] : !1
});
class Ht {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new kc();
  }
}
class kc {
  /**
  Create an instance of this annotation.
  */
  of(t) {
    return new Ht(this, t);
  }
}
class Sc {
  /**
  @internal
  */
  constructor(t) {
    this.map = t;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(t) {
    return new O(this, t);
  }
}
class O {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(t) {
    let e = this.type.map(this.value, t);
    return e === void 0 ? void 0 : e == this.value ? this : new O(this.type, e);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(t) {
    return this.type == t;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(t = {}) {
    return new Sc(t.map || ((e) => e));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(t, e) {
    if (!t.length)
      return t;
    let i = [];
    for (let s of t) {
      let r = s.map(e);
      r && i.push(r);
    }
    return i;
  }
}
O.reconfigure = /* @__PURE__ */ O.define();
O.appendConfig = /* @__PURE__ */ O.define();
class q {
  constructor(t, e, i, s, r, o) {
    this.startState = t, this.changes = e, this.selection = i, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && pl(i, e.newLength), r.some((l) => l.type == q.time) || (this.annotations = r.concat(q.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(t, e, i, s, r, o) {
    return new q(t, e, i, s, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(t) {
    for (let e of this.annotations)
      if (e.type == t)
        return e.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(t) {
    let e = this.annotation(q.userEvent);
    return !!(e && (e == t || e.length > t.length && e.slice(0, t.length) == t && e[t.length] == "."));
  }
}
q.time = /* @__PURE__ */ Ht.define();
q.userEvent = /* @__PURE__ */ Ht.define();
q.addToHistory = /* @__PURE__ */ Ht.define();
q.remote = /* @__PURE__ */ Ht.define();
function Cc(n, t) {
  let e = [];
  for (let i = 0, s = 0; ; ) {
    let r, o;
    if (i < n.length && (s == t.length || t[s] >= n[i]))
      r = n[i++], o = n[i++];
    else if (s < t.length)
      r = t[s++], o = t[s++];
    else
      return e;
    !e.length || e[e.length - 1] < r ? e.push(r, o) : e[e.length - 1] < o && (e[e.length - 1] = o);
  }
}
function kl(n, t, e) {
  var i;
  let s, r, o;
  return e ? (s = t.changes, r = K.empty(t.changes.length), o = n.changes.compose(t.changes)) : (s = t.changes.map(n.changes), r = n.changes.mapDesc(t.changes, !0), o = n.changes.compose(s)), {
    changes: o,
    selection: t.selection ? t.selection.map(r) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(s),
    effects: O.mapEffects(n.effects, s).concat(O.mapEffects(t.effects, r)),
    annotations: n.annotations.length ? n.annotations.concat(t.annotations) : t.annotations,
    scrollIntoView: n.scrollIntoView || t.scrollIntoView
  };
}
function hs(n, t, e) {
  let i = t.selection, s = ve(t.annotations);
  return t.userEvent && (s = s.concat(q.userEvent.of(t.userEvent))), {
    changes: t.changes instanceof K ? t.changes : K.of(t.changes || [], e, n.facet(yl)),
    selection: i && (i instanceof b ? i : b.single(i.anchor, i.head)),
    effects: ve(t.effects),
    annotations: s,
    scrollIntoView: !!t.scrollIntoView
  };
}
function Sl(n, t, e) {
  let i = hs(n, t.length ? t[0] : {}, n.doc.length);
  t.length && t[0].filter === !1 && (e = !1);
  for (let r = 1; r < t.length; r++) {
    t[r].filter === !1 && (e = !1);
    let o = !!t[r].sequential;
    i = kl(i, hs(n, t[r], o ? i.changes.newLength : n.doc.length), o);
  }
  let s = q.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return Ac(e ? Mc(s) : s);
}
function Mc(n) {
  let t = n.startState, e = !0;
  for (let s of t.facet(bl)) {
    let r = s(n);
    if (r === !1) {
      e = !1;
      break;
    }
    Array.isArray(r) && (e = e === !0 ? r : Cc(e, r));
  }
  if (e !== !0) {
    let s, r;
    if (e === !1)
      r = n.changes.invertedDesc, s = K.empty(t.doc.length);
    else {
      let o = n.changes.filter(e);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = q.create(t, s, n.selection && n.selection.map(r), O.mapEffects(n.effects, r), n.annotations, n.scrollIntoView);
  }
  let i = t.facet(wl);
  for (let s = i.length - 1; s >= 0; s--) {
    let r = i[s](n);
    r instanceof q ? n = r : Array.isArray(r) && r.length == 1 && r[0] instanceof q ? n = r[0] : n = Sl(t, ve(r), !1);
  }
  return n;
}
function Ac(n) {
  let t = n.startState, e = t.facet(xl), i = n;
  for (let s = e.length - 1; s >= 0; s--) {
    let r = e[s](n);
    r && Object.keys(r).length && (i = kl(i, hs(t, r, n.changes.newLength), !0));
  }
  return i == n ? n : q.create(t, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const Dc = [];
function ve(n) {
  return n == null ? Dc : Array.isArray(n) ? n : [n];
}
var V = /* @__PURE__ */ function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
}(V || (V = {}));
const Tc = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let cs;
try {
  cs = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Oc(n) {
  if (cs)
    return cs.test(n);
  for (let t = 0; t < n.length; t++) {
    let e = n[t];
    if (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Tc.test(e)))
      return !0;
  }
  return !1;
}
function Bc(n) {
  return (t) => {
    if (!/\S/.test(t))
      return V.Space;
    if (Oc(t))
      return V.Word;
    for (let e = 0; e < n.length; e++)
      if (t.indexOf(n[e]) > -1)
        return V.Word;
    return V.Other;
  };
}
class P {
  constructor(t, e, i, s, r, o) {
    this.config = t, this.doc = e, this.selection = i, this.values = s, this.status = t.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      Ye(this, l << 1);
    this.computeSlot = null;
  }
  field(t, e = !0) {
    let i = this.config.address[t.id];
    if (i == null) {
      if (e)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Ye(this, i), en(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...t) {
    return Sl(this, t, !0);
  }
  /**
  @internal
  */
  applyTransaction(t) {
    let e = this.config, { base: i, compartments: s } = e;
    for (let l of t.effects)
      l.is(kn.reconfigure) ? (e && (s = /* @__PURE__ */ new Map(), e.compartments.forEach((a, c) => s.set(c, a)), e = null), s.set(l.value.compartment, l.value.extension)) : l.is(O.reconfigure) ? (e = null, i = l.value) : l.is(O.appendConfig) && (e = null, i = ve(i).concat(l.value));
    let r;
    e ? r = t.startState.values.slice() : (e = tn.resolve(i, s, this), r = new P(e, this.doc, this.selection, e.dynamicSlots.map(() => null), (a, c) => c.reconfigure(a, this), null).values);
    let o = t.startState.facet(as) ? t.newSelection : t.newSelection.asSingle();
    new P(e, t.newDoc, o, r, (l, a) => a.update(l, t), t);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(t) {
    return typeof t == "string" && (t = this.toText(t)), this.changeByRange((e) => ({
      changes: { from: e.from, to: e.to, insert: t },
      range: b.cursor(e.from + t.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(t) {
    let e = this.selection, i = t(e.ranges[0]), s = this.changes(i.changes), r = [i.range], o = ve(i.effects);
    for (let l = 1; l < e.ranges.length; l++) {
      let a = t(e.ranges[l]), c = this.changes(a.changes), h = c.map(s);
      for (let u = 0; u < l; u++)
        r[u] = r[u].map(h);
      let f = s.mapDesc(c, !0);
      r.push(a.range.map(f)), s = s.compose(h), o = O.mapEffects(o, h).concat(O.mapEffects(ve(a.effects), f));
    }
    return {
      changes: s,
      selection: b.create(r, e.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(t = []) {
    return t instanceof K ? t : K.of(t, this.doc.length, this.facet(P.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(t) {
    return L.of(t.split(this.facet(P.lineSeparator) || ns));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(t = 0, e = this.doc.length) {
    return this.doc.sliceString(t, e, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(t) {
    let e = this.config.address[t.id];
    return e == null ? t.default : (Ye(this, e), en(this, e));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(t) {
    let e = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (t)
      for (let i in t) {
        let s = t[i];
        s instanceof U && this.config.address[s.id] != null && (e[i] = s.spec.toJSON(this.field(t[i]), this));
      }
    return e;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(t, e = {}, i) {
    if (!t || typeof t.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let s = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(t, r)) {
          let o = i[r], l = t[r];
          s.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return P.create({
      doc: t.doc,
      selection: b.fromJSON(t.selection),
      extensions: e.extensions ? s.concat([e.extensions]) : s
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(t = {}) {
    let e = tn.resolve(t.extensions || [], /* @__PURE__ */ new Map()), i = t.doc instanceof L ? t.doc : L.of((t.doc || "").split(e.staticFacet(P.lineSeparator) || ns)), s = t.selection ? t.selection instanceof b ? t.selection : b.single(t.selection.anchor, t.selection.head) : b.single(0);
    return pl(s, i.length), e.staticFacet(as) || (s = s.asSingle()), new P(e, i, s, e.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(P.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(P.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(vl);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(t, ...e) {
    for (let i of this.facet(P.phrases))
      if (Object.prototype.hasOwnProperty.call(i, t)) {
        t = i[t];
        break;
      }
    return e.length && (t = t.replace(/\$(\$|\d*)/g, (i, s) => {
      if (s == "$")
        return "$";
      let r = +(s || 1);
      return !r || r > e.length ? i : e[r - 1];
    })), t;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(t, e, i = -1) {
    let s = [];
    for (let r of this.facet(gl))
      for (let o of r(this, e, i))
        Object.prototype.hasOwnProperty.call(o, t) && s.push(o[t]);
    return s;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(t) {
    return Bc(this.languageDataAt("wordChars", t).join(""));
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(t) {
    let { text: e, from: i, length: s } = this.doc.lineAt(t), r = this.charCategorizer(t), o = t - i, l = t - i;
    for (; o > 0; ) {
      let a = Z(e, o, !1);
      if (r(e.slice(a, o)) != V.Word)
        break;
      o = a;
    }
    for (; l < s; ) {
      let a = Z(e, l);
      if (r(e.slice(l, a)) != V.Word)
        break;
      l = a;
    }
    return o == l ? null : b.range(o + i, l + i);
  }
}
P.allowMultipleSelections = as;
P.tabSize = /* @__PURE__ */ C.define({
  combine: (n) => n.length ? n[0] : 4
});
P.lineSeparator = yl;
P.readOnly = vl;
P.phrases = /* @__PURE__ */ C.define({
  compare(n, t) {
    let e = Object.keys(n), i = Object.keys(t);
    return e.length == i.length && e.every((s) => n[s] == t[s]);
  }
});
P.languageData = gl;
P.changeFilter = bl;
P.transactionFilter = wl;
P.transactionExtender = xl;
kn.reconfigure = /* @__PURE__ */ O.define();
function Ot(n, t, e = {}) {
  let i = {};
  for (let s of n)
    for (let r of Object.keys(s)) {
      let o = s[r], l = i[r];
      if (l === void 0)
        i[r] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(e, r))
        i[r] = e[r](l, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let s in t)
    i[s] === void 0 && (i[s] = t[s]);
  return i;
}
class le {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(t) {
    return this == t;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(t, e = t) {
    return ei.create(t, e, this);
  }
}
le.prototype.startSide = le.prototype.endSide = 0;
le.prototype.point = !1;
le.prototype.mapMode = Y.TrackDel;
class ei {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.value = i;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new ei(t, e, i);
  }
}
function fs(n, t) {
  return n.from - t.from || n.value.startSide - t.value.startSide;
}
class Ys {
  constructor(t, e, i, s) {
    this.from = t, this.to = e, this.value = i, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(t, e, i, s = 0) {
    let r = i ? this.to : this.from;
    for (let o = s, l = r.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, c = r[a] - t || (i ? this.value[a].endSide : this.value[a].startSide) - e;
      if (a == o)
        return c >= 0 ? o : l;
      c >= 0 ? l = a : o = a + 1;
    }
  }
  between(t, e, i, s) {
    for (let r = this.findIndex(e, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + t, this.to[r] + t, this.value[r]) === !1)
        return !1;
  }
  map(t, e) {
    let i = [], s = [], r = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let c = this.value[a], h = this.from[a] + t, f = this.to[a] + t, u, d;
      if (h == f) {
        let p = e.mapPos(h, c.startSide, c.mapMode);
        if (p == null || (u = d = p, c.startSide != c.endSide && (d = e.mapPos(h, c.endSide), d < u)))
          continue;
      } else if (u = e.mapPos(h, c.startSide), d = e.mapPos(f, c.endSide), u > d || u == d && c.startSide > 0 && c.endSide <= 0)
        continue;
      (d - u || c.endSide - c.startSide) < 0 || (o < 0 && (o = u), c.point && (l = Math.max(l, d - u)), i.push(c), s.push(u - o), r.push(d - o));
    }
    return { mapped: i.length ? new Ys(s, r, i, l) : null, pos: o };
  }
}
class B {
  constructor(t, e, i, s) {
    this.chunkPos = t, this.chunk = e, this.nextLayer = i, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(t, e, i, s) {
    return new B(t, e, i, s);
  }
  /**
  @internal
  */
  get length() {
    let t = this.chunk.length - 1;
    return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let t = this.nextLayer.size;
    for (let e of this.chunk)
      t += e.value.length;
    return t;
  }
  /**
  @internal
  */
  chunkEnd(t) {
    return this.chunkPos[t] + this.chunk[t].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(t) {
    let { add: e = [], sort: i = !1, filterFrom: s = 0, filterTo: r = this.length } = t, o = t.filter;
    if (e.length == 0 && !o)
      return this;
    if (i && (e = e.slice().sort(fs)), this.isEmpty)
      return e.length ? B.of(e) : this;
    let l = new Cl(this, null, -1).goto(0), a = 0, c = [], h = new Jt();
    for (; l.value || a < e.length; )
      if (a < e.length && (l.from - e[a].from || l.startSide - e[a].value.startSide) >= 0) {
        let f = e[a++];
        h.addInner(f.from, f.to, f.value) || c.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == e.length || this.chunkEnd(l.chunkIndex) < e[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && h.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (h.addInner(l.from, l.to, l.value) || c.push(ei.create(l.from, l.to, l.value))), l.next());
    return h.finishInner(this.nextLayer.isEmpty && !c.length ? B.empty : this.nextLayer.update({ add: c, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(t) {
    if (t.empty || this.isEmpty)
      return this;
    let e = [], i = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], c = t.touchesRange(l, l + a.length);
      if (c === !1)
        s = Math.max(s, a.maxPoint), e.push(a), i.push(t.mapPos(l));
      else if (c === !0) {
        let { mapped: h, pos: f } = a.map(l, t);
        h && (s = Math.max(s, h.maxPoint), e.push(h), i.push(f));
      }
    }
    let r = this.nextLayer.map(t);
    return e.length == 0 ? r : new B(i, e, r || B.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(t, e, i) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let r = this.chunkPos[s], o = this.chunk[s];
        if (e >= r && t <= r + o.length && o.between(r, t - r, e - r, i) === !1)
          return;
      }
      this.nextLayer.between(t, e, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(t = 0) {
    return ii.from([this]).goto(t);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(t, e = 0) {
    return ii.from(t).goto(e);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(t, e, i, s, r = -1) {
    let o = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = Or(o, l, i), c = new Ve(o, a, r), h = new Ve(l, a, r);
    i.iterGaps((f, u, d) => Br(c, f, h, u, d, s)), i.empty && i.length == 0 && Br(c, 0, h, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(t, e, i = 0, s) {
    s == null && (s = 999999999);
    let r = t.filter((h) => !h.isEmpty && e.indexOf(h) < 0), o = e.filter((h) => !h.isEmpty && t.indexOf(h) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = Or(r, o), a = new Ve(r, l, 0).goto(i), c = new Ve(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != c.to || !us(a.active, c.active) || a.point && (!c.point || !a.point.eq(c.point)))
        return !1;
      if (a.to > s)
        return !0;
      a.next(), c.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(t, e, i, s, r = -1) {
    let o = new Ve(t, null, r).goto(e), l = e, a = o.openStart;
    for (; ; ) {
      let c = Math.min(o.to, i);
      if (o.point) {
        let h = o.activeForPoint(o.to), f = o.pointFrom < e ? h.length + 1 : o.point.startSide < 0 ? h.length : Math.min(h.length, a);
        s.point(l, c, o.point, h, f, o.pointRank), a = Math.min(o.openEnd(c), h.length);
      } else c > l && (s.span(l, c, o.active, a), a = o.openEnd(c));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(t, e = !1) {
    let i = new Jt();
    for (let s of t instanceof ei ? [t] : e ? Lc(t) : t)
      i.add(s.from, s.to, s.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(t) {
    if (!t.length)
      return B.empty;
    let e = t[t.length - 1];
    for (let i = t.length - 2; i >= 0; i--)
      for (let s = t[i]; s != B.empty; s = s.nextLayer)
        e = new B(s.chunkPos, s.chunk, e, Math.max(s.maxPoint, e.maxPoint));
    return e;
  }
}
B.empty = /* @__PURE__ */ new B([], [], null, -1);
function Lc(n) {
  if (n.length > 1)
    for (let t = n[0], e = 1; e < n.length; e++) {
      let i = n[e];
      if (fs(t, i) > 0)
        return n.slice().sort(fs);
      t = i;
    }
  return n;
}
B.empty.nextLayer = B.empty;
class Jt {
  finishChunk(t) {
    this.chunks.push(new Ys(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, t && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(t, e, i) {
    this.addInner(t, e, i) || (this.nextLayer || (this.nextLayer = new Jt())).add(t, e, i);
  }
  /**
  @internal
  */
  addInner(t, e, i) {
    let s = t - this.lastTo || i.startSide - this.last.endSide;
    if (s <= 0 && (t - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = t), this.from.push(t - this.chunkStart), this.to.push(e - this.chunkStart), this.last = i, this.lastFrom = t, this.lastTo = e, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)), !0);
  }
  /**
  @internal
  */
  addChunk(t, e) {
    if ((t - this.lastTo || e.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint), this.chunks.push(e), this.chunkPos.push(t);
    let i = e.value.length - 1;
    return this.last = e.value[i], this.lastFrom = e.from[i] + t, this.lastTo = e.to[i] + t, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(B.empty);
  }
  /**
  @internal
  */
  finishInner(t) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return t;
    let e = B.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(t) : t, this.setMaxPoint);
    return this.from = null, e;
  }
}
function Or(n, t, e) {
  let i = /* @__PURE__ */ new Map();
  for (let r of n)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of t)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (e ? e.mapPos(l) : l) == r.chunkPos[o] && !(e != null && e.touchesRange(l, l + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
  return s;
}
class Cl {
  constructor(t, e, i, s = 0) {
    this.layer = t, this.skip = e, this.minPoint = i, this.rank = s;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(t, e = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(t, e, !1), this;
  }
  gotoInner(t, e, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < t || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(t - this.layer.chunkPos[this.chunkIndex], e, !0);
      (!i || this.rangeIndex < s) && this.setRangeIndex(s);
    }
    this.next();
  }
  forward(t, e) {
    (this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let t = this.layer.chunkPos[this.chunkIndex], e = this.layer.chunk[this.chunkIndex], i = t + e.from[this.rangeIndex];
        if (this.from = i, this.to = t + e.to[this.rangeIndex], this.value = e.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(t) {
    if (t == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = t;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(t) {
    return this.from - t.from || this.startSide - t.startSide || this.rank - t.rank || this.to - t.to || this.endSide - t.endSide;
  }
}
class ii {
  constructor(t) {
    this.heap = t;
  }
  static from(t, e = null, i = -1) {
    let s = [];
    for (let r = 0; r < t.length; r++)
      for (let o = t[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && s.push(new Cl(o, e, i, r));
    return s.length == 1 ? s[0] : new ii(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(t, e = -1e9) {
    for (let i of this.heap)
      i.goto(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Rn(this.heap, i);
    return this.next(), this;
  }
  forward(t, e) {
    for (let i of this.heap)
      i.forward(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Rn(this.heap, i);
    (this.to - t || this.value.endSide - e) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let t = this.heap[0];
      this.from = t.from, this.to = t.to, this.value = t.value, this.rank = t.rank, t.value && t.next(), Rn(this.heap, 0);
    }
  }
}
function Rn(n, t) {
  for (let e = n[t]; ; ) {
    let i = (t << 1) + 1;
    if (i >= n.length)
      break;
    let s = n[i];
    if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), e.compare(s) < 0)
      break;
    n[i] = e, n[t] = s, t = i;
  }
}
class Ve {
  constructor(t, e, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = ii.from(t, e, i);
  }
  goto(t, e = -1e9) {
    return this.cursor.goto(t, e), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = t, this.endSide = e, this.openStart = -1, this.next(), this;
  }
  forward(t, e) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - t || this.active[this.minActive].endSide - e) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(t, e);
  }
  removeActive(t) {
    Ai(this.active, t), Ai(this.activeTo, t), Ai(this.activeRank, t), this.minActive = Lr(this.active, this.activeTo);
  }
  addActive(t) {
    let e = 0, { value: i, to: s, rank: r } = this.cursor;
    for (; e < this.activeRank.length && (r - this.activeRank[e] || s - this.activeTo[e]) > 0; )
      e++;
    Di(this.active, e, i), Di(this.activeTo, e, s), Di(this.activeRank, e, r), t && Di(t, e, this.cursor.from), this.minActive = Lr(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let t = this.to, e = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > t) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), i && Ai(i, s);
      } else if (this.cursor.value)
        if (this.cursor.from > t) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (e && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let s = i.length - 1; s >= 0 && i[s] < t; s--)
        this.openStart++;
    }
  }
  activeForPoint(t) {
    if (!this.active.length)
      return this.active;
    let e = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > t || this.activeTo[i] == t && this.active[i].endSide >= this.point.endSide) && e.push(this.active[i]);
    return e.reverse();
  }
  openEnd(t) {
    let e = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > t; i--)
      e++;
    return e;
  }
}
function Br(n, t, e, i, s, r) {
  n.goto(t), e.goto(i);
  let o = i + s, l = i, a = i - t;
  for (; ; ) {
    let c = n.to + a - e.to || n.endSide - e.endSide, h = c < 0 ? n.to + a : e.to, f = Math.min(h, o);
    if (n.point || e.point ? n.point && e.point && (n.point == e.point || n.point.eq(e.point)) && us(n.activeForPoint(n.to), e.activeForPoint(e.to)) || r.comparePoint(l, f, n.point, e.point) : f > l && !us(n.active, e.active) && r.compareRange(l, f, n.active, e.active), h > o)
      break;
    l = h, c <= 0 && n.next(), c >= 0 && e.next();
  }
}
function us(n, t) {
  if (n.length != t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (n[e] != t[e] && !n[e].eq(t[e]))
      return !1;
  return !0;
}
function Ai(n, t) {
  for (let e = t, i = n.length - 1; e < i; e++)
    n[e] = n[e + 1];
  n.pop();
}
function Di(n, t, e) {
  for (let i = n.length - 1; i >= t; i--)
    n[i + 1] = n[i];
  n[t] = e;
}
function Lr(n, t) {
  let e = -1, i = 1e9;
  for (let s = 0; s < t.length; s++)
    (t[s] - i || n[s].endSide - n[e].endSide) < 0 && (e = s, i = t[s]);
  return e;
}
function Ee(n, t, e = n.length) {
  let i = 0;
  for (let s = 0; s < e; )
    n.charCodeAt(s) == 9 ? (i += t - i % t, s++) : (i++, s = Z(n, s));
  return i;
}
function ds(n, t, e, i) {
  for (let s = 0, r = 0; ; ) {
    if (r >= t)
      return s;
    if (s == n.length)
      break;
    r += n.charCodeAt(s) == 9 ? e - r % e : 1, s = Z(n, s);
  }
  return i === !0 ? -1 : n.length;
}
function ni(n) {
  let t;
  return n.nodeType == 11 ? t = n.getSelection ? n : n.ownerDocument : t = n, t.getSelection();
}
function ps(n, t) {
  return t ? n == t || n.contains(t.nodeType != 1 ? t.parentNode : t) : !1;
}
function Pc(n) {
  let t = n.activeElement;
  for (; t && t.shadowRoot; )
    t = t.shadowRoot.activeElement;
  return t;
}
function Gi(n, t) {
  if (!t.anchorNode)
    return !1;
  try {
    return ps(n, t.anchorNode);
  } catch {
    return !1;
  }
}
function De(n) {
  return n.nodeType == 3 ? he(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function Qe(n, t, e, i) {
  return e ? Pr(n, t, e, i, -1) || Pr(n, t, e, i, 1) : !1;
}
function ae(n) {
  for (var t = 0; ; t++)
    if (n = n.previousSibling, !n)
      return t;
}
function nn(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function Pr(n, t, e, i, s) {
  for (; ; ) {
    if (n == e && t == i)
      return !0;
    if (t == (s < 0 ? 0 : It(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let r = n.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      t = ae(n) + (s < 0 ? 0 : 1), n = r;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[t + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      t = s < 0 ? It(n) : 0;
    } else
      return !1;
  }
}
function It(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Sn(n, t) {
  let e = t ? n.left : n.right;
  return { left: e, right: e, top: n.top, bottom: n.bottom };
}
function Ec(n) {
  let t = n.visualViewport;
  return t ? {
    left: 0,
    right: t.width,
    top: 0,
    bottom: t.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function Ml(n, t) {
  let e = t.width / n.offsetWidth, i = t.height / n.offsetHeight;
  return (e > 0.995 && e < 1.005 || !isFinite(e) || Math.abs(t.width - n.offsetWidth) < 1) && (e = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(t.height - n.offsetHeight) < 1) && (i = 1), { scaleX: e, scaleY: i };
}
function Rc(n, t, e, i, s, r, o, l) {
  let a = n.ownerDocument, c = a.defaultView || window;
  for (let h = n, f = !1; h && !f; )
    if (h.nodeType == 1) {
      let u, d = h == a.body, p = 1, m = 1;
      if (d)
        u = Ec(c);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(h).position) && (f = !0), h.scrollHeight <= h.clientHeight && h.scrollWidth <= h.clientWidth) {
          h = h.assignedSlot || h.parentNode;
          continue;
        }
        let x = h.getBoundingClientRect();
        ({ scaleX: p, scaleY: m } = Ml(h, x)), u = {
          left: x.left,
          right: x.left + h.clientWidth * p,
          top: x.top,
          bottom: x.top + h.clientHeight * m
        };
      }
      let g = 0, y = 0;
      if (s == "nearest")
        t.top < u.top ? (y = -(u.top - t.top + o), e > 0 && t.bottom > u.bottom + y && (y = t.bottom - u.bottom + y + o)) : t.bottom > u.bottom && (y = t.bottom - u.bottom + o, e < 0 && t.top - y < u.top && (y = -(u.top + y - t.top + o)));
      else {
        let x = t.bottom - t.top, D = u.bottom - u.top;
        y = (s == "center" && x <= D ? t.top + x / 2 - D / 2 : s == "start" || s == "center" && e < 0 ? t.top - o : t.bottom - D + o) - u.top;
      }
      if (i == "nearest" ? t.left < u.left ? (g = -(u.left - t.left + r), e > 0 && t.right > u.right + g && (g = t.right - u.right + g + r)) : t.right > u.right && (g = t.right - u.right + r, e < 0 && t.left < u.left + g && (g = -(u.left + g - t.left + r))) : g = (i == "center" ? t.left + (t.right - t.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? t.left - r : t.right - (u.right - u.left) + r) - u.left, g || y)
        if (d)
          c.scrollBy(g, y);
        else {
          let x = 0, D = 0;
          if (y) {
            let v = h.scrollTop;
            h.scrollTop += y / m, D = (h.scrollTop - v) * m;
          }
          if (g) {
            let v = h.scrollLeft;
            h.scrollLeft += g / p, x = (h.scrollLeft - v) * p;
          }
          t = {
            left: t.left - x,
            top: t.top - D,
            right: t.right - x,
            bottom: t.bottom - D
          }, x && Math.abs(x - g) < 1 && (i = "nearest"), D && Math.abs(D - y) < 1 && (s = "nearest");
        }
      if (d)
        break;
      h = h.assignedSlot || h.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
}
function Ic(n) {
  let t = n.ownerDocument, e, i;
  for (let s = n.parentNode; s && !(s == t.body || e && i); )
    if (s.nodeType == 1)
      !i && s.scrollHeight > s.clientHeight && (i = s), !e && s.scrollWidth > s.clientWidth && (e = s), s = s.assignedSlot || s.parentNode;
    else if (s.nodeType == 11)
      s = s.host;
    else
      break;
  return { x: e, y: i };
}
class Nc {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(t) {
    return this.anchorNode == t.anchorNode && this.anchorOffset == t.anchorOffset && this.focusNode == t.focusNode && this.focusOffset == t.focusOffset;
  }
  setRange(t) {
    let { anchorNode: e, focusNode: i } = t;
    this.set(e, Math.min(t.anchorOffset, e ? It(e) : 0), i, Math.min(t.focusOffset, i ? It(i) : 0));
  }
  set(t, e, i, s) {
    this.anchorNode = t, this.anchorOffset = e, this.focusNode = i, this.focusOffset = s;
  }
}
let de = null;
function Al(n) {
  if (n.setActive)
    return n.setActive();
  if (de)
    return n.focus(de);
  let t = [];
  for (let e = n; e && (t.push(e, e.scrollTop, e.scrollLeft), e != e.ownerDocument); e = e.parentNode)
    ;
  if (n.focus(de == null ? {
    get preventScroll() {
      return de = { preventScroll: !0 }, !0;
    }
  } : void 0), !de) {
    de = !1;
    for (let e = 0; e < t.length; ) {
      let i = t[e++], s = t[e++], r = t[e++];
      i.scrollTop != s && (i.scrollTop = s), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let Er;
function he(n, t, e = t) {
  let i = Er || (Er = document.createRange());
  return i.setEnd(n, e), i.setStart(n, t), i;
}
function ke(n, t, e, i) {
  let s = { key: t, code: t, keyCode: e, which: e, cancelable: !0 };
  i && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = i);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, n.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, n.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Fc(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function Dl(n) {
  for (; n.attributes.length; )
    n.removeAttributeNode(n.attributes[0]);
}
function Hc(n, t) {
  let e = t.focusNode, i = t.focusOffset;
  if (!e || t.anchorNode != e || t.anchorOffset != i)
    return !1;
  for (i = Math.min(i, It(e)); ; )
    if (i) {
      if (e.nodeType != 1)
        return !1;
      let s = e.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (e = s, i = It(e));
    } else {
      if (e == n)
        return !0;
      i = ae(e), e = e.parentNode;
    }
}
function Tl(n) {
  return n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function Ol(n, t) {
  for (let e = n, i = t; ; ) {
    if (e.nodeType == 3 && i > 0)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i > 0) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i - 1], i = It(e);
    } else if (e.parentNode && !nn(e))
      i = ae(e), e = e.parentNode;
    else
      return null;
  }
}
function Bl(n, t) {
  for (let e = n, i = t; ; ) {
    if (e.nodeType == 3 && i < e.nodeValue.length)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i < e.childNodes.length) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i], i = 0;
    } else if (e.parentNode && !nn(e))
      i = ae(e) + 1, e = e.parentNode;
    else
      return null;
  }
}
class tt {
  constructor(t, e, i = !0) {
    this.node = t, this.offset = e, this.precise = i;
  }
  static before(t, e) {
    return new tt(t.parentNode, ae(t), e);
  }
  static after(t, e) {
    return new tt(t.parentNode, ae(t) + 1, e);
  }
}
const Qs = [];
class R {
  constructor() {
    this.parent = null, this.dom = null, this.flags = 2;
  }
  get overrideDOMText() {
    return null;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(t) {
    let e = this.posAtStart;
    for (let i of this.children) {
      if (i == t)
        return e;
      e += i.length + i.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(t) {
    return this.posBefore(t) + t.length;
  }
  sync(t, e) {
    if (this.flags & 2) {
      let i = this.dom, s = null, r;
      for (let o of this.children) {
        if (o.flags & 7) {
          if (!o.dom && (r = s ? s.nextSibling : i.firstChild)) {
            let l = R.get(r);
            (!l || !l.parent && l.canReuseDOM(o)) && o.reuseDOM(r);
          }
          o.sync(t, e), o.flags &= -8;
        }
        if (r = s ? s.nextSibling : i.firstChild, e && !e.written && e.node == i && r != o.dom && (e.written = !0), o.dom.parentNode == i)
          for (; r && r != o.dom; )
            r = Rr(r);
        else
          i.insertBefore(o.dom, r);
        s = o.dom;
      }
      for (r = s ? s.nextSibling : i.firstChild, r && e && e.node == i && (e.written = !0); r; )
        r = Rr(r);
    } else if (this.flags & 1)
      for (let i of this.children)
        i.flags & 7 && (i.sync(t, e), i.flags &= -8);
  }
  reuseDOM(t) {
  }
  localPosFromDOM(t, e) {
    let i;
    if (t == this.dom)
      i = this.dom.childNodes[e];
    else {
      let s = It(t) == 0 ? 0 : e == 0 ? -1 : 1;
      for (; ; ) {
        let r = t.parentNode;
        if (r == this.dom)
          break;
        s == 0 && r.firstChild != r.lastChild && (t == r.firstChild ? s = -1 : s = 1), t = r;
      }
      s < 0 ? i = t : i = t.nextSibling;
    }
    if (i == this.dom.firstChild)
      return 0;
    for (; i && !R.get(i); )
      i = i.nextSibling;
    if (!i)
      return this.length;
    for (let s = 0, r = 0; ; s++) {
      let o = this.children[s];
      if (o.dom == i)
        return r;
      r += o.length + o.breakAfter;
    }
  }
  domBoundsAround(t, e, i = 0) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let a = 0, c = i, h = i; a < this.children.length; a++) {
      let f = this.children[a], u = c + f.length;
      if (c < t && u > e)
        return f.domBoundsAround(t, e, c);
      if (u >= t && s == -1 && (s = a, r = c), c > e && f.dom.parentNode == this.dom) {
        o = a, l = h;
        break;
      }
      h = u, c = u + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + this.length : l,
      startDOM: (s ? this.children[s - 1].dom.nextSibling : null) || this.dom.firstChild,
      endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
    };
  }
  markDirty(t = !1) {
    this.flags |= 2, this.markParentsDirty(t);
  }
  markParentsDirty(t) {
    for (let e = this.parent; e; e = e.parent) {
      if (t && (e.flags |= 2), e.flags & 1)
        return;
      e.flags |= 1, t = !1;
    }
  }
  setParent(t) {
    this.parent != t && (this.parent = t, this.flags & 7 && this.markParentsDirty(!0));
  }
  setDOM(t) {
    this.dom != t && (this.dom && (this.dom.cmView = null), this.dom = t, t.cmView = this);
  }
  get rootView() {
    for (let t = this; ; ) {
      let e = t.parent;
      if (!e)
        return t;
      t = e;
    }
  }
  replaceChildren(t, e, i = Qs) {
    this.markDirty();
    for (let s = t; s < e; s++) {
      let r = this.children[s];
      r.parent == this && i.indexOf(r) < 0 && r.destroy();
    }
    this.children.splice(t, e - t, ...i);
    for (let s = 0; s < i.length; s++)
      i[s].setParent(this);
  }
  ignoreMutation(t) {
    return !1;
  }
  ignoreEvent(t) {
    return !1;
  }
  childCursor(t = this.length) {
    return new Ll(this.children, t, this.children.length);
  }
  childPos(t, e = 1) {
    return this.childCursor().findPos(t, e);
  }
  toString() {
    let t = this.constructor.name.replace("View", "");
    return t + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (t == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
  }
  static get(t) {
    return t.cmView;
  }
  get isEditable() {
    return !0;
  }
  get isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  merge(t, e, i, s, r, o) {
    return !1;
  }
  become(t) {
    return !1;
  }
  canReuseDOM(t) {
    return t.constructor == this.constructor && !((this.flags | t.flags) & 8);
  }
  // When this is a zero-length view with a side, this should return a
  // number <= 0 to indicate it is before its position, or a
  // number > 0 when after its position.
  getSide() {
    return 0;
  }
  destroy() {
    for (let t of this.children)
      t.parent == this && t.destroy();
    this.parent = null;
  }
}
R.prototype.breakAfter = 0;
function Rr(n) {
  let t = n.nextSibling;
  return n.parentNode.removeChild(n), t;
}
class Ll {
  constructor(t, e, i) {
    this.children = t, this.pos = e, this.i = i, this.off = 0;
  }
  findPos(t, e = 1) {
    for (; ; ) {
      if (t > this.pos || t == this.pos && (e > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
        return this.off = t - this.pos, this;
      let i = this.children[--this.i];
      this.pos -= i.length + i.breakAfter;
    }
  }
}
function Pl(n, t, e, i, s, r, o, l, a) {
  let { children: c } = n, h = c.length ? c[t] : null, f = r.length ? r[r.length - 1] : null, u = f ? f.breakAfter : o;
  if (!(t == i && h && !o && !u && r.length < 2 && h.merge(e, s, r.length ? f : null, e == 0, l, a))) {
    if (i < c.length) {
      let d = c[i];
      d && (s < d.length || d.breakAfter && (f != null && f.breakAfter)) ? (t == i && (d = d.split(s), s = 0), !u && f && d.merge(0, s, f, !0, 0, a) ? r[r.length - 1] = d : ((s || d.children.length && !d.children[0].length) && d.merge(0, s, null, !1, 0, a), r.push(d))) : d != null && d.breakAfter && (f ? f.breakAfter = 1 : o = 1), i++;
    }
    for (h && (h.breakAfter = o, e > 0 && (!o && r.length && h.merge(e, h.length, r[0], !1, l, 0) ? h.breakAfter = r.shift().breakAfter : (e < h.length || h.children.length && h.children[h.children.length - 1].length == 0) && h.merge(e, h.length, null, !1, l, 0), t++)); t < i && r.length; )
      if (c[i - 1].become(r[r.length - 1]))
        i--, r.pop(), a = r.length ? 0 : l;
      else if (c[t].become(r[0]))
        t++, r.shift(), l = r.length ? 0 : a;
      else
        break;
    !r.length && t && i < c.length && !c[t - 1].breakAfter && c[i].merge(0, 0, c[t - 1], !1, l, a) && t--, (t < i || r.length) && n.replaceChildren(t, i, r);
  }
}
function El(n, t, e, i, s, r) {
  let o = n.childCursor(), { i: l, off: a } = o.findPos(e, 1), { i: c, off: h } = o.findPos(t, -1), f = t - e;
  for (let u of i)
    f += u.length;
  n.length += f, Pl(n, c, h, l, a, i, 0, s, r);
}
let rt = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, ms = typeof document < "u" ? document : { documentElement: { style: {} } };
const gs = /* @__PURE__ */ /Edge\/(\d+)/.exec(rt.userAgent), Rl = /* @__PURE__ */ /MSIE \d/.test(rt.userAgent), ys = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(rt.userAgent), Cn = !!(Rl || ys || gs), Ir = !Cn && /* @__PURE__ */ /gecko\/(\d+)/i.test(rt.userAgent), In = !Cn && /* @__PURE__ */ /Chrome\/(\d+)/.exec(rt.userAgent), Nr = "webkitFontSmoothing" in ms.documentElement.style, Il = !Cn && /* @__PURE__ */ /Apple Computer/.test(rt.vendor), Fr = Il && (/* @__PURE__ */ /Mobile\/\w+/.test(rt.userAgent) || rt.maxTouchPoints > 2);
var S = {
  mac: Fr || /* @__PURE__ */ /Mac/.test(rt.platform),
  windows: /* @__PURE__ */ /Win/.test(rt.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(rt.platform),
  ie: Cn,
  ie_version: Rl ? ms.documentMode || 6 : ys ? +ys[1] : gs ? +gs[1] : 0,
  gecko: Ir,
  gecko_version: Ir ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(rt.userAgent) || [0, 0])[1] : 0,
  chrome: !!In,
  chrome_version: In ? +In[1] : 0,
  ios: Fr,
  android: /* @__PURE__ */ /Android\b/.test(rt.userAgent),
  webkit: Nr,
  safari: Il,
  webkit_version: Nr ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(rt.userAgent) || [0, 0])[1] : 0,
  tabSize: ms.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
const Vc = 256;
class xt extends R {
  constructor(t) {
    super(), this.text = t;
  }
  get length() {
    return this.text.length;
  }
  createDOM(t) {
    this.setDOM(t || document.createTextNode(this.text));
  }
  sync(t, e) {
    this.dom || this.createDOM(), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text);
  }
  reuseDOM(t) {
    t.nodeType == 3 && this.createDOM(t);
  }
  merge(t, e, i) {
    return this.flags & 8 || i && (!(i instanceof xt) || this.length - (e - t) + i.length > Vc || i.flags & 8) ? !1 : (this.text = this.text.slice(0, t) + (i ? i.text : "") + this.text.slice(e), this.markDirty(), !0);
  }
  split(t) {
    let e = new xt(this.text.slice(t));
    return this.text = this.text.slice(0, t), this.markDirty(), e.flags |= this.flags & 8, e;
  }
  localPosFromDOM(t, e) {
    return t == this.dom ? e : e ? this.text.length : 0;
  }
  domAtPos(t) {
    return new tt(this.dom, t);
  }
  domBoundsAround(t, e, i) {
    return { from: i, to: i + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
  }
  coordsAt(t, e) {
    return Wc(this.dom, t, e);
  }
}
class Nt extends R {
  constructor(t, e = [], i = 0) {
    super(), this.mark = t, this.children = e, this.length = i;
    for (let s of e)
      s.setParent(this);
  }
  setAttrs(t) {
    if (Dl(t), this.mark.class && (t.className = this.mark.class), this.mark.attrs)
      for (let e in this.mark.attrs)
        t.setAttribute(e, this.mark.attrs[e]);
    return t;
  }
  canReuseDOM(t) {
    return super.canReuseDOM(t) && !((this.flags | t.flags) & 8);
  }
  reuseDOM(t) {
    t.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(t), this.flags |= 6);
  }
  sync(t, e) {
    this.dom ? this.flags & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(t, e);
  }
  merge(t, e, i, s, r, o) {
    return i && (!(i instanceof Nt && i.mark.eq(this.mark)) || t && r <= 0 || e < this.length && o <= 0) ? !1 : (El(this, t, e, i ? i.children.slice() : [], r - 1, o - 1), this.markDirty(), !0);
  }
  split(t) {
    let e = [], i = 0, s = -1, r = 0;
    for (let l of this.children) {
      let a = i + l.length;
      a > t && e.push(i < t ? l.split(t - i) : l), s < 0 && i >= t && (s = r), i = a, r++;
    }
    let o = this.length - t;
    return this.length = t, s > -1 && (this.children.length = s, this.markDirty()), new Nt(this.mark, e, o);
  }
  domAtPos(t) {
    return Nl(this, t);
  }
  coordsAt(t, e) {
    return Hl(this, t, e);
  }
}
function Wc(n, t, e) {
  let i = n.nodeValue.length;
  t > i && (t = i);
  let s = t, r = t, o = 0;
  t == 0 && e < 0 || t == i && e >= 0 ? S.chrome || S.gecko || (t ? (s--, o = 1) : r < i && (r++, o = -1)) : e < 0 ? s-- : r < i && r++;
  let l = he(n, s, r).getClientRects();
  if (!l.length)
    return null;
  let a = l[(o ? o < 0 : e >= 0) ? 0 : l.length - 1];
  return S.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (c) => c.width) || a), o ? Sn(a, o < 0) : a || null;
}
class Kt extends R {
  static create(t, e, i) {
    return new Kt(t, e, i);
  }
  constructor(t, e, i) {
    super(), this.widget = t, this.length = e, this.side = i, this.prevWidget = null;
  }
  split(t) {
    let e = Kt.create(this.widget, this.length - t, this.side);
    return this.length -= t, e;
  }
  sync(t) {
    (!this.dom || !this.widget.updateDOM(this.dom, t)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(t)), this.widget.editable || (this.dom.contentEditable = "false"));
  }
  getSide() {
    return this.side;
  }
  merge(t, e, i, s, r, o) {
    return i && (!(i instanceof Kt) || !this.widget.compare(i.widget) || t > 0 && r <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
  }
  become(t) {
    return t instanceof Kt && t.side == this.side && this.widget.constructor == t.widget.constructor ? (this.widget.compare(t.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(t) {
    return this.widget.ignoreEvent(t);
  }
  get overrideDOMText() {
    if (this.length == 0)
      return L.empty;
    let t = this;
    for (; t.parent; )
      t = t.parent;
    let { view: e } = t, i = e && e.state.doc, s = this.posAtStart;
    return i ? i.slice(s, s + this.length) : L.empty;
  }
  domAtPos(t) {
    return (this.length ? t == 0 : this.side > 0) ? tt.before(this.dom) : tt.after(this.dom, t == this.length);
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(t, e) {
    let i = this.widget.coordsAt(this.dom, t, e);
    if (i)
      return i;
    let s = this.dom.getClientRects(), r = null;
    if (!s.length)
      return null;
    let o = this.side ? this.side < 0 : t > 0;
    for (let l = o ? s.length - 1 : 0; r = s[l], !(t > 0 ? l == 0 : l == s.length - 1 || r.top < r.bottom); l += o ? -1 : 1)
      ;
    return Sn(r, !o);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class Te extends R {
  constructor(t) {
    super(), this.side = t;
  }
  get length() {
    return 0;
  }
  merge() {
    return !1;
  }
  become(t) {
    return t instanceof Te && t.side == this.side;
  }
  split() {
    return new Te(this.side);
  }
  sync() {
    if (!this.dom) {
      let t = document.createElement("img");
      t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), this.setDOM(t);
    }
  }
  getSide() {
    return this.side;
  }
  domAtPos(t) {
    return this.side > 0 ? tt.before(this.dom) : tt.after(this.dom);
  }
  localPosFromDOM() {
    return 0;
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(t) {
    return this.dom.getBoundingClientRect();
  }
  get overrideDOMText() {
    return L.empty;
  }
  get isHidden() {
    return !0;
  }
}
xt.prototype.children = Kt.prototype.children = Te.prototype.children = Qs;
function Nl(n, t) {
  let e = n.dom, { children: i } = n, s = 0;
  for (let r = 0; s < i.length; s++) {
    let o = i[s], l = r + o.length;
    if (!(l == r && o.getSide() <= 0)) {
      if (t > r && t < l && o.dom.parentNode == e)
        return o.domAtPos(t - r);
      if (t <= r)
        break;
      r = l;
    }
  }
  for (let r = s; r > 0; r--) {
    let o = i[r - 1];
    if (o.dom.parentNode == e)
      return o.domAtPos(o.length);
  }
  for (let r = s; r < i.length; r++) {
    let o = i[r];
    if (o.dom.parentNode == e)
      return o.domAtPos(0);
  }
  return new tt(e, 0);
}
function Fl(n, t, e) {
  let i, { children: s } = n;
  e > 0 && t instanceof Nt && s.length && (i = s[s.length - 1]) instanceof Nt && i.mark.eq(t.mark) ? Fl(i, t.children[0], e - 1) : (s.push(t), t.setParent(n)), n.length += t.length;
}
function Hl(n, t, e) {
  let i = null, s = -1, r = null, o = -1;
  function l(c, h) {
    for (let f = 0, u = 0; f < c.children.length && u <= h; f++) {
      let d = c.children[f], p = u + d.length;
      p >= h && (d.children.length ? l(d, h - u) : (!r || r.isHidden && e > 0) && (p > h || u == p && d.getSide() > 0) ? (r = d, o = h - u) : (u < h || u == p && d.getSide() < 0 && !d.isHidden) && (i = d, s = h - u)), u = p;
    }
  }
  l(n, t);
  let a = (e < 0 ? i : r) || i || r;
  return a ? a.coordsAt(Math.max(0, a == i ? s : o), e) : $c(n);
}
function $c(n) {
  let t = n.dom.lastChild;
  if (!t)
    return n.dom.getBoundingClientRect();
  let e = De(t);
  return e[e.length - 1] || null;
}
function bs(n, t) {
  for (let e in n)
    e == "class" && t.class ? t.class += " " + n.class : e == "style" && t.style ? t.style += ";" + n.style : t[e] = n[e];
  return t;
}
const Hr = /* @__PURE__ */ Object.create(null);
function sn(n, t, e) {
  if (n == t)
    return !0;
  n || (n = Hr), t || (t = Hr);
  let i = Object.keys(n), s = Object.keys(t);
  if (i.length - (e && i.indexOf(e) > -1 ? 1 : 0) != s.length - (e && s.indexOf(e) > -1 ? 1 : 0))
    return !1;
  for (let r of i)
    if (r != e && (s.indexOf(r) == -1 || n[r] !== t[r]))
      return !1;
  return !0;
}
function ws(n, t, e) {
  let i = !1;
  if (t)
    for (let s in t)
      e && s in e || (i = !0, s == "style" ? n.style.cssText = "" : n.removeAttribute(s));
  if (e)
    for (let s in e)
      t && t[s] == e[s] || (i = !0, s == "style" ? n.style.cssText = e[s] : n.setAttribute(s, e[s]));
  return i;
}
function zc(n) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let e = 0; e < n.attributes.length; e++) {
    let i = n.attributes[e];
    t[i.name] = i.value;
  }
  return t;
}
class z extends R {
  constructor() {
    super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
  }
  // Consumes source
  merge(t, e, i, s, r, o) {
    if (i) {
      if (!(i instanceof z))
        return !1;
      this.dom || i.transferDOM(this);
    }
    return s && this.setDeco(i ? i.attrs : null), El(this, t, e, i ? i.children.slice() : [], r, o), !0;
  }
  split(t) {
    let e = new z();
    if (e.breakAfter = this.breakAfter, this.length == 0)
      return e;
    let { i, off: s } = this.childPos(t);
    s && (e.append(this.children[i].split(s), 0), this.children[i].merge(s, this.children[i].length, null, !1, 0, 0), i++);
    for (let r = i; r < this.children.length; r++)
      e.append(this.children[r], 0);
    for (; i > 0 && this.children[i - 1].length == 0; )
      this.children[--i].destroy();
    return this.children.length = i, this.markDirty(), this.length = t, e;
  }
  transferDOM(t) {
    this.dom && (this.markDirty(), t.setDOM(this.dom), t.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
  }
  setDeco(t) {
    sn(this.attrs, t) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = t);
  }
  append(t, e) {
    Fl(this, t, e);
  }
  // Only called when building a line view in ContentBuilder
  addLineDeco(t) {
    let e = t.spec.attributes, i = t.spec.class;
    e && (this.attrs = bs(e, this.attrs || {})), i && (this.attrs = bs({ class: i }, this.attrs || {}));
  }
  domAtPos(t) {
    return Nl(this, t);
  }
  reuseDOM(t) {
    t.nodeName == "DIV" && (this.setDOM(t), this.flags |= 6);
  }
  sync(t, e) {
    var i;
    this.dom ? this.flags & 4 && (Dl(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (ws(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(t, e);
    let s = this.dom.lastChild;
    for (; s && R.get(s) instanceof Nt; )
      s = s.lastChild;
    if (!s || !this.length || s.nodeName != "BR" && ((i = R.get(s)) === null || i === void 0 ? void 0 : i.isEditable) == !1 && (!S.ios || !this.children.some((r) => r instanceof xt))) {
      let r = document.createElement("BR");
      r.cmIgnore = !0, this.dom.appendChild(r);
    }
  }
  measureTextSize() {
    if (this.children.length == 0 || this.length > 20)
      return null;
    let t = 0, e;
    for (let i of this.children) {
      if (!(i instanceof xt) || /[^ -~]/.test(i.text))
        return null;
      let s = De(i.dom);
      if (s.length != 1)
        return null;
      t += s[0].width, e = s[0].height;
    }
    return t ? {
      lineHeight: this.dom.getBoundingClientRect().height,
      charWidth: t / this.length,
      textHeight: e
    } : null;
  }
  coordsAt(t, e) {
    let i = Hl(this, t, e);
    if (!this.children.length && i && this.parent) {
      let { heightOracle: s } = this.parent.view.viewState, r = i.bottom - i.top;
      if (Math.abs(r - s.lineHeight) < 2 && s.textHeight < r) {
        let o = (r - s.textHeight) / 2;
        return { top: i.top + o, bottom: i.bottom - o, left: i.left, right: i.left };
      }
    }
    return i;
  }
  become(t) {
    return t instanceof z && this.children.length == 0 && t.children.length == 0 && sn(this.attrs, t.attrs) && this.breakAfter == t.breakAfter;
  }
  covers() {
    return !0;
  }
  static find(t, e) {
    for (let i = 0, s = 0; i < t.children.length; i++) {
      let r = t.children[i], o = s + r.length;
      if (o >= e) {
        if (r instanceof z)
          return r;
        if (o > e)
          break;
      }
      s = o + r.breakAfter;
    }
    return null;
  }
}
class Rt extends R {
  constructor(t, e, i) {
    super(), this.widget = t, this.length = e, this.deco = i, this.breakAfter = 0, this.prevWidget = null;
  }
  merge(t, e, i, s, r, o) {
    return i && (!(i instanceof Rt) || !this.widget.compare(i.widget) || t > 0 && r <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
  }
  domAtPos(t) {
    return t == 0 ? tt.before(this.dom) : tt.after(this.dom, t == this.length);
  }
  split(t) {
    let e = this.length - t;
    this.length = t;
    let i = new Rt(this.widget, e, this.deco);
    return i.breakAfter = this.breakAfter, i;
  }
  get children() {
    return Qs;
  }
  sync(t) {
    (!this.dom || !this.widget.updateDOM(this.dom, t)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(t)), this.widget.editable || (this.dom.contentEditable = "false"));
  }
  get overrideDOMText() {
    return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : L.empty;
  }
  domBoundsAround() {
    return null;
  }
  become(t) {
    return t instanceof Rt && t.widget.constructor == this.widget.constructor ? (t.widget.compare(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, this.deco = t.deco, this.breakAfter = t.breakAfter, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(t) {
    return this.widget.ignoreEvent(t);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  coordsAt(t, e) {
    return this.widget.coordsAt(this.dom, t, e);
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
  covers(t) {
    let { startSide: e, endSide: i } = this.deco;
    return e == i ? !1 : t < 0 ? e < 0 : i > 0;
  }
}
class Bt {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(t) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(t, e) {
    return !1;
  }
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(t) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(t, e, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(t) {
  }
}
var it = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(it || (it = {}));
class A extends le {
  constructor(t, e, i, s) {
    super(), this.startSide = t, this.endSide = e, this.widget = i, this.spec = s;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(t) {
    return new mi(t);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(t) {
    let e = Math.max(-1e4, Math.min(1e4, t.side || 0)), i = !!t.block;
    return e += i && !t.inlineOrder ? e > 0 ? 3e8 : -4e8 : e > 0 ? 1e8 : -1e8, new Yt(t, e, e, i, t.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(t) {
    let e = !!t.block, i, s;
    if (t.isBlockGap)
      i = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = Vl(t, e);
      i = (r ? e ? -3e8 : -1 : 5e8) - 1, s = (o ? e ? 2e8 : 1 : -6e8) + 1;
    }
    return new Yt(t, i, s, e, t.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(t) {
    return new gi(t);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(t, e = !1) {
    return B.of(t, e);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
A.none = B.empty;
class mi extends A {
  constructor(t) {
    let { start: e, end: i } = Vl(t);
    super(e ? -1 : 5e8, i ? 1 : -6e8, null, t), this.tagName = t.tagName || "span", this.class = t.class || "", this.attrs = t.attributes || null;
  }
  eq(t) {
    var e, i;
    return this == t || t instanceof mi && this.tagName == t.tagName && (this.class || ((e = this.attrs) === null || e === void 0 ? void 0 : e.class)) == (t.class || ((i = t.attrs) === null || i === void 0 ? void 0 : i.class)) && sn(this.attrs, t.attrs, "class");
  }
  range(t, e = t) {
    if (t >= e)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(t, e);
  }
}
mi.prototype.point = !1;
class gi extends A {
  constructor(t) {
    super(-2e8, -2e8, null, t);
  }
  eq(t) {
    return t instanceof gi && this.spec.class == t.spec.class && sn(this.spec.attributes, t.spec.attributes);
  }
  range(t, e = t) {
    if (e != t)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(t, e);
  }
}
gi.prototype.mapMode = Y.TrackBefore;
gi.prototype.point = !0;
class Yt extends A {
  constructor(t, e, i, s, r, o) {
    super(e, i, r, t), this.block = s, this.isReplace = o, this.mapMode = s ? e <= 0 ? Y.TrackBefore : Y.TrackAfter : Y.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? it.WidgetRange : this.startSide <= 0 ? it.WidgetBefore : it.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(t) {
    return t instanceof Yt && qc(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
  }
  range(t, e = t) {
    if (this.isReplace && (t > e || t == e && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && e != t)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(t, e);
  }
}
Yt.prototype.point = !0;
function Vl(n, t = !1) {
  let { inclusiveStart: e, inclusiveEnd: i } = n;
  return e == null && (e = n.inclusive), i == null && (i = n.inclusive), { start: e ?? t, end: i ?? t };
}
function qc(n, t) {
  return n == t || !!(n && t && n.compare(t));
}
function xs(n, t, e, i = 0) {
  let s = e.length - 1;
  s >= 0 && e[s] + i >= n ? e[s] = Math.max(e[s], t) : e.push(n, t);
}
class Ze {
  constructor(t, e, i, s) {
    this.doc = t, this.pos = e, this.end = i, this.disallowBlockEffectsFor = s, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.bufferMarks = [], this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = t.iter(), this.skip = e;
  }
  posCovered() {
    if (this.content.length == 0)
      return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
    let t = this.content[this.content.length - 1];
    return !(t.breakAfter || t instanceof Rt && t.deco.endSide < 0);
  }
  getLine() {
    return this.curLine || (this.content.push(this.curLine = new z()), this.atCursorPos = !0), this.curLine;
  }
  flushBuffer(t = this.bufferMarks) {
    this.pendingBuffer && (this.curLine.append(Ti(new Te(-1), t), t.length), this.pendingBuffer = 0);
  }
  addBlockWidget(t) {
    this.flushBuffer(), this.curLine = null, this.content.push(t);
  }
  finish(t) {
    this.pendingBuffer && t <= this.bufferMarks.length ? this.flushBuffer() : this.pendingBuffer = 0, !this.posCovered() && !(t && this.content.length && this.content[this.content.length - 1] instanceof Rt) && this.getLine();
  }
  buildText(t, e, i) {
    for (; t > 0; ) {
      if (this.textOff == this.text.length) {
        let { value: r, lineBreak: o, done: l } = this.cursor.next(this.skip);
        if (this.skip = 0, l)
          throw new Error("Ran out of text content when drawing inline views");
        if (o) {
          this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer(), this.curLine = null, this.atCursorPos = !0, t--;
          continue;
        } else
          this.text = r, this.textOff = 0;
      }
      let s = Math.min(
        this.text.length - this.textOff,
        t,
        512
        /* T.Chunk */
      );
      this.flushBuffer(e.slice(e.length - i)), this.getLine().append(Ti(new xt(this.text.slice(this.textOff, this.textOff + s)), e), i), this.atCursorPos = !0, this.textOff += s, t -= s, i = 0;
    }
  }
  span(t, e, i, s) {
    this.buildText(e - t, i, s), this.pos = e, this.openStart < 0 && (this.openStart = s);
  }
  point(t, e, i, s, r, o) {
    if (this.disallowBlockEffectsFor[o] && i instanceof Yt) {
      if (i.block)
        throw new RangeError("Block decorations may not be specified via plugins");
      if (e > this.doc.lineAt(this.pos).to)
        throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
    }
    let l = e - t;
    if (i instanceof Yt)
      if (i.block)
        i.startSide > 0 && !this.posCovered() && this.getLine(), this.addBlockWidget(new Rt(i.widget || Oe.block, l, i));
      else {
        let a = Kt.create(i.widget || Oe.inline, l, l ? 0 : i.startSide), c = this.atCursorPos && !a.isEditable && r <= s.length && (t < e || i.startSide > 0), h = !a.isEditable && (t < e || r > s.length || i.startSide <= 0), f = this.getLine();
        this.pendingBuffer == 2 && !c && !a.isEditable && (this.pendingBuffer = 0), this.flushBuffer(s), c && (f.append(Ti(new Te(1), s), r), r = s.length + Math.max(0, r - s.length)), f.append(Ti(a, s), r), this.atCursorPos = h, this.pendingBuffer = h ? t < e || r > s.length ? 1 : 2 : 0, this.pendingBuffer && (this.bufferMarks = s.slice());
      }
    else this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
    l && (this.textOff + l <= this.text.length ? this.textOff += l : (this.skip += l - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = e), this.openStart < 0 && (this.openStart = r);
  }
  static build(t, e, i, s, r) {
    let o = new Ze(t, e, i, r);
    return o.openEnd = B.spans(s, e, i, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
  }
}
function Ti(n, t) {
  for (let e of t)
    n = new Nt(e, [n], n.length);
  return n;
}
class Oe extends Bt {
  constructor(t) {
    super(), this.tag = t;
  }
  eq(t) {
    return t.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(t) {
    return t.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
Oe.inline = /* @__PURE__ */ new Oe("span");
Oe.block = /* @__PURE__ */ new Oe("div");
var H = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(H || (H = {}));
const ce = H.LTR, Zs = H.RTL;
function Wl(n) {
  let t = [];
  for (let e = 0; e < n.length; e++)
    t.push(1 << +n[e]);
  return t;
}
const Kc = /* @__PURE__ */ Wl("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), jc = /* @__PURE__ */ Wl("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), vs = /* @__PURE__ */ Object.create(null), St = [];
for (let n of ["()", "[]", "{}"]) {
  let t = /* @__PURE__ */ n.charCodeAt(0), e = /* @__PURE__ */ n.charCodeAt(1);
  vs[t] = e, vs[e] = -t;
}
function $l(n) {
  return n <= 247 ? Kc[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? jc[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const Uc = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class jt {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Zs : ce;
  }
  /**
  @internal
  */
  constructor(t, e, i) {
    this.from = t, this.to = e, this.level = i;
  }
  /**
  @internal
  */
  side(t, e) {
    return this.dir == e == t ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(t, e) {
    return t == (this.dir == e);
  }
  /**
  @internal
  */
  static find(t, e, i, s) {
    let r = -1;
    for (let o = 0; o < t.length; o++) {
      let l = t[o];
      if (l.from <= e && l.to >= e) {
        if (l.level == i)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? l.from < e : l.to > e : t[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function zl(n, t) {
  if (n.length != t.length)
    return !1;
  for (let e = 0; e < n.length; e++) {
    let i = n[e], s = t[e];
    if (i.from != s.from || i.to != s.to || i.direction != s.direction || !zl(i.inner, s.inner))
      return !1;
  }
  return !0;
}
const E = [];
function Gc(n, t, e, i, s) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : t, l = r < i.length ? i[r].from : e, a = r ? 256 : s;
    for (let c = o, h = a, f = a; c < l; c++) {
      let u = $l(n.charCodeAt(c));
      u == 512 ? u = h : u == 8 && f == 4 && (u = 16), E[c] = u == 4 ? 2 : u, u & 7 && (f = u), h = u;
    }
    for (let c = o, h = a, f = a; c < l; c++) {
      let u = E[c];
      if (u == 128)
        c < l - 1 && h == E[c + 1] && h & 24 ? u = E[c] = h : E[c] = 256;
      else if (u == 64) {
        let d = c + 1;
        for (; d < l && E[d] == 64; )
          d++;
        let p = c && h == 8 || d < e && E[d] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let m = c; m < d; m++)
          E[m] = p;
        c = d - 1;
      } else u == 8 && f == 1 && (E[c] = 1);
      h = u, u & 7 && (f = u);
    }
  }
}
function Xc(n, t, e, i, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
    let c = o ? i[o - 1].to : t, h = o < i.length ? i[o].from : e;
    for (let f = c, u, d, p; f < h; f++)
      if (d = vs[u = n.charCodeAt(f)])
        if (d < 0) {
          for (let m = l - 3; m >= 0; m -= 3)
            if (St[m + 1] == -d) {
              let g = St[m + 2], y = g & 2 ? s : g & 4 ? g & 1 ? r : s : 0;
              y && (E[f] = E[St[m]] = y), l = m;
              break;
            }
        } else {
          if (St.length == 189)
            break;
          St[l++] = f, St[l++] = u, St[l++] = a;
        }
      else if ((p = E[f]) == 2 || p == 1) {
        let m = p == s;
        a = m ? 0 : 1;
        for (let g = l - 3; g >= 0; g -= 3) {
          let y = St[g + 2];
          if (y & 2)
            break;
          if (m)
            St[g + 2] |= 2;
          else {
            if (y & 4)
              break;
            St[g + 2] |= 4;
          }
        }
      }
  }
}
function Jc(n, t, e, i) {
  for (let s = 0, r = i; s <= e.length; s++) {
    let o = s ? e[s - 1].to : n, l = s < e.length ? e[s].from : t;
    for (let a = o; a < l; ) {
      let c = E[a];
      if (c == 256) {
        let h = a + 1;
        for (; ; )
          if (h == l) {
            if (s == e.length)
              break;
            h = e[s++].to, l = s < e.length ? e[s].from : t;
          } else if (E[h] == 256)
            h++;
          else
            break;
        let f = r == 1, u = (h < t ? E[h] : i) == 1, d = f == u ? f ? 1 : 2 : i;
        for (let p = h, m = s, g = m ? e[m - 1].to : n; p > a; )
          p == g && (p = e[--m].from, g = m ? e[m - 1].to : n), E[--p] = d;
        a = h;
      } else
        r = c, a++;
    }
  }
}
function ks(n, t, e, i, s, r, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == s % 2)
    for (let a = t, c = 0; a < e; ) {
      let h = !0, f = !1;
      if (c == r.length || a < r[c].from) {
        let m = E[a];
        m != l && (h = !1, f = m == 16);
      }
      let u = !h && l == 1 ? [] : null, d = h ? i : i + 1, p = a;
      t: for (; ; )
        if (c < r.length && p == r[c].from) {
          if (f)
            break t;
          let m = r[c];
          if (!h)
            for (let g = m.to, y = c + 1; ; ) {
              if (g == e)
                break t;
              if (y < r.length && r[y].from == g)
                g = r[y++].to;
              else {
                if (E[g] == l)
                  break t;
                break;
              }
            }
          if (c++, u)
            u.push(m);
          else {
            m.from > a && o.push(new jt(a, m.from, d));
            let g = m.direction == ce != !(d % 2);
            Ss(n, g ? i + 1 : i, s, m.inner, m.from, m.to, o), a = m.to;
          }
          p = m.to;
        } else {
          if (p == e || (h ? E[p] != l : E[p] == l))
            break;
          p++;
        }
      u ? ks(n, a, p, i + 1, s, u, o) : a < p && o.push(new jt(a, p, d)), a = p;
    }
  else
    for (let a = e, c = r.length; a > t; ) {
      let h = !0, f = !1;
      if (!c || a > r[c - 1].to) {
        let m = E[a - 1];
        m != l && (h = !1, f = m == 16);
      }
      let u = !h && l == 1 ? [] : null, d = h ? i : i + 1, p = a;
      t: for (; ; )
        if (c && p == r[c - 1].to) {
          if (f)
            break t;
          let m = r[--c];
          if (!h)
            for (let g = m.from, y = c; ; ) {
              if (g == t)
                break t;
              if (y && r[y - 1].to == g)
                g = r[--y].from;
              else {
                if (E[g - 1] == l)
                  break t;
                break;
              }
            }
          if (u)
            u.push(m);
          else {
            m.to < a && o.push(new jt(m.to, a, d));
            let g = m.direction == ce != !(d % 2);
            Ss(n, g ? i + 1 : i, s, m.inner, m.from, m.to, o), a = m.from;
          }
          p = m.from;
        } else {
          if (p == t || (h ? E[p - 1] != l : E[p - 1] == l))
            break;
          p--;
        }
      u ? ks(n, p, a, i + 1, s, u, o) : p < a && o.push(new jt(p, a, d)), a = p;
    }
}
function Ss(n, t, e, i, s, r, o) {
  let l = t % 2 ? 2 : 1;
  Gc(n, s, r, i, l), Xc(n, s, r, i, l), Jc(s, r, i, l), ks(n, s, r, t, e, i, o);
}
function Yc(n, t, e) {
  if (!n)
    return [new jt(0, 0, t == Zs ? 1 : 0)];
  if (t == ce && !e.length && !Uc.test(n))
    return ql(n.length);
  if (e.length)
    for (; n.length > E.length; )
      E[E.length] = 256;
  let i = [], s = t == ce ? 0 : 1;
  return Ss(n, s, s, e, 0, n.length, i), i;
}
function ql(n) {
  return [new jt(0, n, 0)];
}
let Kl = "";
function Qc(n, t, e, i, s) {
  var r;
  let o = i.head - n.from, l = jt.find(t, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), a = t[l], c = a.side(s, e);
  if (o == c) {
    let u = l += s ? 1 : -1;
    if (u < 0 || u >= t.length)
      return null;
    a = t[l = u], o = a.side(!s, e), c = a.side(s, e);
  }
  let h = Z(n.text, o, a.forward(s, e));
  (h < a.from || h > a.to) && (h = c), Kl = n.text.slice(Math.min(o, h), Math.max(o, h));
  let f = l == (s ? t.length - 1 : 0) ? null : t[l + (s ? 1 : -1)];
  return f && h == c && f.level + (s ? 0 : 1) < a.level ? b.cursor(f.side(!s, e) + n.from, f.forward(s, e) ? 1 : -1, f.level) : b.cursor(h + n.from, a.forward(s, e) ? -1 : 1, a.level);
}
function Zc(n, t, e) {
  for (let i = t; i < e; i++) {
    let s = $l(n.charCodeAt(i));
    if (s == 1)
      return ce;
    if (s == 2 || s == 4)
      return Zs;
  }
  return ce;
}
const jl = /* @__PURE__ */ C.define(), Ul = /* @__PURE__ */ C.define(), Gl = /* @__PURE__ */ C.define(), Xl = /* @__PURE__ */ C.define(), Cs = /* @__PURE__ */ C.define(), Jl = /* @__PURE__ */ C.define(), Yl = /* @__PURE__ */ C.define(), Ql = /* @__PURE__ */ C.define({
  combine: (n) => n.some((t) => t)
}), Zl = /* @__PURE__ */ C.define({
  combine: (n) => n.some((t) => t)
}), _l = /* @__PURE__ */ C.define();
class Se {
  constructor(t, e = "nearest", i = "nearest", s = 5, r = 5, o = !1) {
    this.range = t, this.y = e, this.x = i, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(t) {
    return t.empty ? this : new Se(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(t) {
    return this.range.to <= t.doc.length ? this : new Se(b.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Oi = /* @__PURE__ */ O.define({ map: (n, t) => n.map(t) }), ta = /* @__PURE__ */ O.define();
function lt(n, t, e) {
  let i = n.facet(Xl);
  i.length ? i[0](t) : window.onerror ? window.onerror(String(t), e, void 0, void 0, t) : e ? console.error(e + ":", t) : console.error(t);
}
const $t = /* @__PURE__ */ C.define({ combine: (n) => n.length ? n[0] : !0 });
let _c = 0;
const Ke = /* @__PURE__ */ C.define();
class $ {
  constructor(t, e, i, s, r) {
    this.id = t, this.create = e, this.domEventHandlers = i, this.domEventObservers = s, this.extension = r(this);
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(t, e) {
    const { eventHandlers: i, eventObservers: s, provide: r, decorations: o } = e || {};
    return new $(_c++, t, i, s, (l) => {
      let a = [Ke.of(l)];
      return o && a.push(si.of((c) => {
        let h = c.plugin(l);
        return h ? o(h) : A.none;
      })), r && a.push(r(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(t, e) {
    return $.define((i) => new t(i), e);
  }
}
class Nn {
  constructor(t) {
    this.spec = t, this.mustUpdate = null, this.value = null;
  }
  update(t) {
    if (this.value) {
      if (this.mustUpdate) {
        let e = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(e);
          } catch (i) {
            if (lt(e.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.create(t);
      } catch (e) {
        lt(t.state, e, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(t) {
    var e;
    if (!((e = this.value) === null || e === void 0) && e.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        lt(t.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const ea = /* @__PURE__ */ C.define(), _s = /* @__PURE__ */ C.define(), si = /* @__PURE__ */ C.define(), ia = /* @__PURE__ */ C.define(), tr = /* @__PURE__ */ C.define(), na = /* @__PURE__ */ C.define();
function Vr(n, t) {
  let e = n.state.facet(na);
  if (!e.length)
    return e;
  let i = e.map((r) => r instanceof Function ? r(n) : r), s = [];
  return B.spans(i, t.from, t.to, {
    point() {
    },
    span(r, o, l, a) {
      let c = r - t.from, h = o - t.from, f = s;
      for (let u = l.length - 1; u >= 0; u--, a--) {
        let d = l[u].spec.bidiIsolate, p;
        if (d == null && (d = Zc(t.text, c, h)), a > 0 && f.length && (p = f[f.length - 1]).to == c && p.direction == d)
          p.to = h, f = p.inner;
        else {
          let m = { from: c, to: h, direction: d, inner: [] };
          f.push(m), f = m.inner;
        }
      }
    }
  }), s;
}
const sa = /* @__PURE__ */ C.define();
function ra(n) {
  let t = 0, e = 0, i = 0, s = 0;
  for (let r of n.state.facet(sa)) {
    let o = r(n);
    o && (o.left != null && (t = Math.max(t, o.left)), o.right != null && (e = Math.max(e, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: t, right: e, top: i, bottom: s };
}
const je = /* @__PURE__ */ C.define();
class mt {
  constructor(t, e, i, s) {
    this.fromA = t, this.toA = e, this.fromB = i, this.toB = s;
  }
  join(t) {
    return new mt(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
  }
  addToSet(t) {
    let e = t.length, i = this;
    for (; e > 0; e--) {
      let s = t[e - 1];
      if (!(s.fromA > i.toA)) {
        if (s.toA < i.fromA)
          break;
        i = i.join(s), t.splice(e - 1, 1);
      }
    }
    return t.splice(e, 0, i), t;
  }
  static extendWithRanges(t, e) {
    if (e.length == 0)
      return t;
    let i = [];
    for (let s = 0, r = 0, o = 0, l = 0; ; s++) {
      let a = s == t.length ? null : t[s], c = o - l, h = a ? a.fromB : 1e9;
      for (; r < e.length && e[r] < h; ) {
        let f = e[r], u = e[r + 1], d = Math.max(l, f), p = Math.min(h, u);
        if (d <= p && new mt(d + c, p + c, d, p).addToSet(i), u > h)
          break;
        r += 2;
      }
      if (!a)
        return i;
      new mt(a.fromA, a.toA, a.fromB, a.toB).addToSet(i), o = a.toA, l = a.toB;
    }
  }
}
class rn {
  constructor(t, e, i) {
    this.view = t, this.state = e, this.transactions = i, this.flags = 0, this.startState = t.state, this.changes = K.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, a) => s.push(new mt(r, o, l, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new rn(t, e, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 10) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((t) => t.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
class Wr extends R {
  get length() {
    return this.view.state.doc.length;
  }
  constructor(t) {
    super(), this.view = t, this.decorations = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.markedForComposition = /* @__PURE__ */ new Set(), this.editContextFormatting = A.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(t.contentDOM), this.children = [new z()], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new mt(0, 0, 0, t.state.doc.length)], 0, null);
  }
  // Update the document view to a given state.
  update(t) {
    var e;
    let i = t.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: h }) => h < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(t);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((e = this.domChanged) === null || e === void 0) && e.newSel ? s = this.domChanged.newSel.head : !lf(t.changes, this.hasComposition) && !t.selectionSet && (s = t.state.selection.main.head));
    let r = s > -1 ? ef(this.view, t.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      this.markedForComposition.clear();
      let { from: c, to: h } = this.hasComposition;
      i = new mt(c, h, t.changes.mapPos(c, -1), t.changes.mapPos(h, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (S.ie || S.chrome) && !r && t && t.state.doc.lines != t.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.updateDeco(), a = rf(o, l, t.changes);
    return i = mt.extendWithRanges(i, a), !(this.flags & 7) && i.length == 0 ? !1 : (this.updateInner(i, t.startState.doc.length, r), t.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(t, e, i) {
    this.view.viewState.mustMeasureContent = !0, this.updateChildren(t, e, i);
    let { observer: s } = this.view;
    s.ignore(() => {
      this.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let o = S.chrome || S.ios ? { node: s.selectionRange.focusNode, written: !1 } : void 0;
      this.sync(this.view, o), this.flags &= -8, o && (o.written || s.selectionRange.focusNode != o.node) && (this.forceSelection = !0), this.dom.style.height = "";
    }), this.markedForComposition.forEach(
      (o) => o.flags &= -9
      /* ViewFlag.Composition */
    );
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let o of this.children)
        o instanceof Rt && o.widget instanceof $r && r.push(o.dom);
    s.updateGaps(r);
  }
  updateChildren(t, e, i) {
    let s = i ? i.range.addToSet(t.slice()) : t, r = this.childCursor(e);
    for (let o = s.length - 1; ; o--) {
      let l = o >= 0 ? s[o] : null;
      if (!l)
        break;
      let { fromA: a, toA: c, fromB: h, toB: f } = l, u, d, p, m;
      if (i && i.range.fromB < f && i.range.toB > h) {
        let v = Ze.build(this.view.state.doc, h, i.range.fromB, this.decorations, this.dynamicDecorationMap), M = Ze.build(this.view.state.doc, i.range.toB, f, this.decorations, this.dynamicDecorationMap);
        d = v.breakAtStart, p = v.openStart, m = M.openEnd;
        let T = this.compositionView(i);
        M.breakAtStart ? T.breakAfter = 1 : M.content.length && T.merge(T.length, T.length, M.content[0], !1, M.openStart, 0) && (T.breakAfter = M.content[0].breakAfter, M.content.shift()), v.content.length && T.merge(0, 0, v.content[v.content.length - 1], !0, 0, v.openEnd) && v.content.pop(), u = v.content.concat(T).concat(M.content);
      } else
        ({ content: u, breakAtStart: d, openStart: p, openEnd: m } = Ze.build(this.view.state.doc, h, f, this.decorations, this.dynamicDecorationMap));
      let { i: g, off: y } = r.findPos(c, 1), { i: x, off: D } = r.findPos(a, -1);
      Pl(this, x, D, g, y, u, d, p, m);
    }
    i && this.fixCompositionDOM(i);
  }
  updateEditContextFormatting(t) {
    this.editContextFormatting = this.editContextFormatting.map(t.changes);
    for (let e of t.transactions)
      for (let i of e.effects)
        i.is(ta) && (this.editContextFormatting = i.value);
  }
  compositionView(t) {
    let e = new xt(t.text.nodeValue);
    e.flags |= 8;
    for (let { deco: s } of t.marks)
      e = new Nt(s, [e], e.length);
    let i = new z();
    return i.append(e, 0), i;
  }
  fixCompositionDOM(t) {
    let e = (r, o) => {
      o.flags |= 8 | (o.children.some(
        (a) => a.flags & 7
        /* ViewFlag.Dirty */
      ) ? 1 : 0), this.markedForComposition.add(o);
      let l = R.get(r);
      l && l != o && (l.dom = null), o.setDOM(r);
    }, i = this.childPos(t.range.fromB, 1), s = this.children[i.i];
    e(t.line, s);
    for (let r = t.marks.length - 1; r >= -1; r--)
      i = s.childPos(i.off, 1), s = s.children[i.i], e(r >= 0 ? t.marks[r].node : t.text, s);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(t = !1, e = !1) {
    (t || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let i = this.view.root.activeElement, s = i == this.dom, r = !s && Gi(this.dom, this.view.observer.selectionRange) && !(i && this.dom.contains(i));
    if (!(s || e || r))
      return;
    let o = this.forceSelection;
    this.forceSelection = !1;
    let l = this.view.state.selection.main, a = this.moveToLine(this.domAtPos(l.anchor)), c = l.empty ? a : this.moveToLine(this.domAtPos(l.head));
    if (S.gecko && l.empty && !this.hasComposition && tf(a)) {
      let f = document.createTextNode("");
      this.view.observer.ignore(() => a.node.insertBefore(f, a.node.childNodes[a.offset] || null)), a = c = new tt(f, 0), o = !0;
    }
    let h = this.view.observer.selectionRange;
    (o || !h.focusNode || (!Qe(a.node, a.offset, h.anchorNode, h.anchorOffset) || !Qe(c.node, c.offset, h.focusNode, h.focusOffset)) && !this.suppressWidgetCursorChange(h, l)) && (this.view.observer.ignore(() => {
      S.android && S.chrome && this.dom.contains(h.focusNode) && of(h.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
      let f = ni(this.view.root);
      if (f) if (l.empty) {
        if (S.gecko) {
          let u = nf(a.node, a.offset);
          if (u && u != 3) {
            let d = (u == 1 ? Ol : Bl)(a.node, a.offset);
            d && (a = new tt(d.node, d.offset));
          }
        }
        f.collapse(a.node, a.offset), l.bidiLevel != null && f.caretBidiLevel !== void 0 && (f.caretBidiLevel = l.bidiLevel);
      } else if (f.extend) {
        f.collapse(a.node, a.offset);
        try {
          f.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let u = document.createRange();
        l.anchor > l.head && ([a, c] = [c, a]), u.setEnd(c.node, c.offset), u.setStart(a.node, a.offset), f.removeAllRanges(), f.addRange(u);
      }
      r && this.view.root.activeElement == this.dom && (this.dom.blur(), i && i.focus());
    }), this.view.observer.setSelectionRange(a, c)), this.impreciseAnchor = a.precise ? null : new tt(h.anchorNode, h.anchorOffset), this.impreciseHead = c.precise ? null : new tt(h.focusNode, h.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(t, e) {
    return this.hasComposition && e.empty && Qe(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset) && this.posFromDOM(t.focusNode, t.focusOffset) == e.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: t } = this, e = t.state.selection.main, i = ni(t.root), { anchorNode: s, anchorOffset: r } = t.observer.selectionRange;
    if (!i || !e.empty || !e.assoc || !i.modify)
      return;
    let o = z.find(this, e.head);
    if (!o)
      return;
    let l = o.posAtStart;
    if (e.head == l || e.head == l + o.length)
      return;
    let a = this.coordsAt(e.head, -1), c = this.coordsAt(e.head, 1);
    if (!a || !c || a.bottom > c.top)
      return;
    let h = this.domAtPos(e.head + e.assoc);
    i.collapse(h.node, h.offset), i.modify("move", e.assoc < 0 ? "forward" : "backward", "lineboundary"), t.observer.readSelectionRange();
    let f = t.observer.selectionRange;
    t.docView.posFromDOM(f.anchorNode, f.anchorOffset) != e.from && i.collapse(s, r);
  }
  // If a position is in/near a block widget, move it to a nearby text
  // line, since we don't want the cursor inside a block widget.
  moveToLine(t) {
    let e = this.dom, i;
    if (t.node != e)
      return t;
    for (let s = t.offset; !i && s < e.childNodes.length; s++) {
      let r = R.get(e.childNodes[s]);
      r instanceof z && (i = r.domAtPos(0));
    }
    for (let s = t.offset - 1; !i && s >= 0; s--) {
      let r = R.get(e.childNodes[s]);
      r instanceof z && (i = r.domAtPos(r.length));
    }
    return i ? new tt(i.node, i.offset, !0) : t;
  }
  nearest(t) {
    for (let e = t; e; ) {
      let i = R.get(e);
      if (i && i.rootView == this)
        return i;
      e = e.parentNode;
    }
    return null;
  }
  posFromDOM(t, e) {
    let i = this.nearest(t);
    if (!i)
      throw new RangeError("Trying to find position for a DOM position outside of the document");
    return i.localPosFromDOM(t, e) + i.posAtStart;
  }
  domAtPos(t) {
    let { i: e, off: i } = this.childCursor().findPos(t, -1);
    for (; e < this.children.length - 1; ) {
      let s = this.children[e];
      if (i < s.length || s instanceof z)
        break;
      e++, i = 0;
    }
    return this.children[e].domAtPos(i);
  }
  coordsAt(t, e) {
    let i = null, s = 0;
    for (let r = this.length, o = this.children.length - 1; o >= 0; o--) {
      let l = this.children[o], a = r - l.breakAfter, c = a - l.length;
      if (a < t)
        break;
      if (c <= t && (c < t || l.covers(-1)) && (a > t || l.covers(1)) && (!i || l instanceof z && !(i instanceof z && e >= 0)))
        i = l, s = c;
      else if (i && c == t && a == t && l instanceof Rt && Math.abs(e) < 2) {
        if (l.deco.startSide < 0)
          break;
        o && (i = null);
      }
      r = c;
    }
    return i ? i.coordsAt(t - s, e) : null;
  }
  coordsForChar(t) {
    let { i: e, off: i } = this.childPos(t, 1), s = this.children[e];
    if (!(s instanceof z))
      return null;
    for (; s.children.length; ) {
      let { i: l, off: a } = s.childPos(i, 1);
      for (; ; l++) {
        if (l == s.children.length)
          return null;
        if ((s = s.children[l]).length)
          break;
      }
      i = a;
    }
    if (!(s instanceof xt))
      return null;
    let r = Z(s.text, i);
    if (r == i)
      return null;
    let o = he(s.dom, i, r).getClientRects();
    for (let l = 0; l < o.length; l++) {
      let a = o[l];
      if (l == o.length - 1 || a.top < a.bottom && a.left < a.right)
        return a;
    }
    return null;
  }
  measureVisibleLineHeights(t) {
    let e = [], { from: i, to: s } = t, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == H.LTR;
    for (let c = 0, h = 0; h < this.children.length; h++) {
      let f = this.children[h], u = c + f.length;
      if (u > s)
        break;
      if (c >= i) {
        let d = f.dom.getBoundingClientRect();
        if (e.push(d.height), o) {
          let p = f.dom.lastChild, m = p ? De(p) : [];
          if (m.length) {
            let g = m[m.length - 1], y = a ? g.right - d.left : d.right - g.left;
            y > l && (l = y, this.minWidth = r, this.minWidthFrom = c, this.minWidthTo = u);
          }
        }
      }
      c = u + f.breakAfter;
    }
    return e;
  }
  textDirectionAt(t) {
    let { i: e } = this.childPos(t, 1);
    return getComputedStyle(this.children[e].dom).direction == "rtl" ? H.RTL : H.LTR;
  }
  measureTextSize() {
    for (let r of this.children)
      if (r instanceof z) {
        let o = r.measureTextSize();
        if (o)
          return o;
      }
    let t = document.createElement("div"), e, i, s;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.dom.appendChild(t);
      let r = De(t.firstChild)[0];
      e = t.getBoundingClientRect().height, i = r ? r.width / 27 : 7, s = r ? r.height : e, t.remove();
    }), { lineHeight: e, charWidth: i, textHeight: s };
  }
  childCursor(t = this.length) {
    let e = this.children.length;
    return e && (t -= this.children[--e].length), new Ll(this.children, t, e);
  }
  computeBlockGapDeco() {
    let t = [], e = this.view.viewState;
    for (let i = 0, s = 0; ; s++) {
      let r = s == e.viewports.length ? null : e.viewports[s], o = r ? r.from - 1 : this.length;
      if (o > i) {
        let l = (e.lineBlockAt(o).bottom - e.lineBlockAt(i).top) / this.view.scaleY;
        t.push(A.replace({
          widget: new $r(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return A.set(t);
  }
  updateDeco() {
    let t = 1, e = this.view.state.facet(si).map((r) => (this.dynamicDecorationMap[t++] = typeof r == "function") ? r(this.view) : r), i = !1, s = this.view.state.facet(ia).map((r, o) => {
      let l = typeof r == "function";
      return l && (i = !0), l ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[t++] = i, e.push(B.join(s))), this.decorations = [
      this.editContextFormatting,
      ...e,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; t < this.decorations.length; )
      this.dynamicDecorationMap[t++] = !1;
    return this.decorations;
  }
  scrollIntoView(t) {
    if (t.isSnapshot) {
      let c = this.view.viewState.lineBlockAt(t.range.head);
      this.view.scrollDOM.scrollTop = c.top - t.yMargin, this.view.scrollDOM.scrollLeft = t.xMargin;
      return;
    }
    for (let c of this.view.state.facet(_l))
      try {
        if (c(this.view, t.range, t))
          return !0;
      } catch (h) {
        lt(this.view.state, h, "scroll handler");
      }
    let { range: e } = t, i = this.coordsAt(e.head, e.empty ? e.assoc : e.head > e.anchor ? -1 : 1), s;
    if (!i)
      return;
    !e.empty && (s = this.coordsAt(e.anchor, e.anchor > e.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, s.left),
      top: Math.min(i.top, s.top),
      right: Math.max(i.right, s.right),
      bottom: Math.max(i.bottom, s.bottom)
    });
    let r = ra(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    Rc(this.view.scrollDOM, o, e.head < e.anchor ? -1 : 1, t.x, t.y, Math.max(Math.min(t.xMargin, l), -l), Math.max(Math.min(t.yMargin, a), -a), this.view.textDirection == H.LTR);
  }
}
function tf(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
class $r extends Bt {
  constructor(t) {
    super(), this.height = t;
  }
  toDOM() {
    let t = document.createElement("div");
    return t.className = "cm-gap", this.updateDOM(t), t;
  }
  eq(t) {
    return t.height == this.height;
  }
  updateDOM(t) {
    return t.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function oa(n, t) {
  let e = n.observer.selectionRange;
  if (!e.focusNode)
    return null;
  let i = Ol(e.focusNode, e.focusOffset), s = Bl(e.focusNode, e.focusOffset), r = i || s;
  if (s && i && s.node != i.node) {
    let l = R.get(s.node);
    if (!l || l instanceof xt && l.text != s.node.nodeValue)
      r = s;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = R.get(i.node);
      !a || a instanceof xt && a.text != i.node.nodeValue || (r = s);
    }
  }
  if (n.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = t - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function ef(n, t, e) {
  let i = oa(n, e);
  if (!i)
    return null;
  let { node: s, from: r, to: o } = i, l = s.nodeValue;
  if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let a = t.invertedDesc, c = new mt(a.mapPos(r), a.mapPos(o), r, o), h = [];
  for (let f = s.parentNode; ; f = f.parentNode) {
    let u = R.get(f);
    if (u instanceof Nt)
      h.push({ node: f, deco: u.mark });
    else {
      if (u instanceof z || f.nodeName == "DIV" && f.parentNode == n.contentDOM)
        return { range: c, text: s, marks: h, line: f };
      if (f != n.contentDOM)
        h.push({ node: f, deco: new mi({
          inclusive: !0,
          attributes: zc(f),
          tagName: f.tagName.toLowerCase()
        }) });
      else
        return null;
    }
  }
}
function nf(n, t) {
  return n.nodeType != 1 ? 0 : (t && n.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < n.childNodes.length && n.childNodes[t].contentEditable == "false" ? 2 : 0);
}
let sf = class {
  constructor() {
    this.changes = [];
  }
  compareRange(t, e) {
    xs(t, e, this.changes);
  }
  comparePoint(t, e) {
    xs(t, e, this.changes);
  }
};
function rf(n, t, e) {
  let i = new sf();
  return B.compare(n, t, e, i), i.changes;
}
function of(n, t) {
  for (let e = n; e && e != t; e = e.assignedSlot || e.parentNode)
    if (e.nodeType == 1 && e.contentEditable == "false")
      return !0;
  return !1;
}
function lf(n, t) {
  let e = !1;
  return t && n.iterChangedRanges((i, s) => {
    i < t.to && s > t.from && (e = !0);
  }), e;
}
function af(n, t, e = 1) {
  let i = n.charCategorizer(t), s = n.doc.lineAt(t), r = t - s.from;
  if (s.length == 0)
    return b.cursor(t);
  r == 0 ? e = 1 : r == s.length && (e = -1);
  let o = r, l = r;
  e < 0 ? o = Z(s.text, r, !1) : l = Z(s.text, r);
  let a = i(s.text.slice(o, l));
  for (; o > 0; ) {
    let c = Z(s.text, o, !1);
    if (i(s.text.slice(c, o)) != a)
      break;
    o = c;
  }
  for (; l < s.length; ) {
    let c = Z(s.text, l);
    if (i(s.text.slice(l, c)) != a)
      break;
    l = c;
  }
  return b.range(o + s.from, l + s.from);
}
function hf(n, t) {
  return t.left > n ? t.left - n : Math.max(0, n - t.right);
}
function cf(n, t) {
  return t.top > n ? t.top - n : Math.max(0, n - t.bottom);
}
function Fn(n, t) {
  return n.top < t.bottom - 1 && n.bottom > t.top + 1;
}
function zr(n, t) {
  return t < n.top ? { top: t, left: n.left, right: n.right, bottom: n.bottom } : n;
}
function qr(n, t) {
  return t > n.bottom ? { top: n.top, left: n.left, right: n.right, bottom: t } : n;
}
function Ms(n, t, e) {
  let i, s, r, o, l = !1, a, c, h, f;
  for (let p = n.firstChild; p; p = p.nextSibling) {
    let m = De(p);
    for (let g = 0; g < m.length; g++) {
      let y = m[g];
      s && Fn(s, y) && (y = zr(qr(y, s.bottom), s.top));
      let x = hf(t, y), D = cf(e, y);
      if (x == 0 && D == 0)
        return p.nodeType == 3 ? Kr(p, t, e) : Ms(p, t, e);
      if (!i || o > D || o == D && r > x) {
        i = p, s = y, r = x, o = D;
        let v = D ? e < y.top ? -1 : 1 : x ? t < y.left ? -1 : 1 : 0;
        l = !v || (v > 0 ? g < m.length - 1 : g > 0);
      }
      x == 0 ? e > y.bottom && (!h || h.bottom < y.bottom) ? (a = p, h = y) : e < y.top && (!f || f.top > y.top) && (c = p, f = y) : h && Fn(h, y) ? h = qr(h, y.bottom) : f && Fn(f, y) && (f = zr(f, y.top));
    }
  }
  if (h && h.bottom >= e ? (i = a, s = h) : f && f.top <= e && (i = c, s = f), !i)
    return { node: n, offset: 0 };
  let u = Math.max(s.left, Math.min(s.right, t));
  if (i.nodeType == 3)
    return Kr(i, u, e);
  if (l && i.contentEditable != "false")
    return Ms(i, u, e);
  let d = Array.prototype.indexOf.call(n.childNodes, i) + (t >= (s.left + s.right) / 2 ? 1 : 0);
  return { node: n, offset: d };
}
function Kr(n, t, e) {
  let i = n.nodeValue.length, s = -1, r = 1e9, o = 0;
  for (let l = 0; l < i; l++) {
    let a = he(n, l, l + 1).getClientRects();
    for (let c = 0; c < a.length; c++) {
      let h = a[c];
      if (h.top == h.bottom)
        continue;
      o || (o = t - h.left);
      let f = (h.top > e ? h.top - e : e - h.bottom) - 1;
      if (h.left - 1 <= t && h.right + 1 >= t && f < r) {
        let u = t >= (h.left + h.right) / 2, d = u;
        if ((S.chrome || S.gecko) && he(n, l).getBoundingClientRect().left == h.right && (d = !u), f <= 0)
          return { node: n, offset: l + (d ? 1 : 0) };
        s = l + (d ? 1 : 0), r = f;
      }
    }
  }
  return { node: n, offset: s > -1 ? s : o > 0 ? n.nodeValue.length : 0 };
}
function la(n, t, e, i = -1) {
  var s, r;
  let o = n.contentDOM.getBoundingClientRect(), l = o.top + n.viewState.paddingTop, a, { docHeight: c } = n.viewState, { x: h, y: f } = t, u = f - l;
  if (u < 0)
    return 0;
  if (u > c)
    return n.state.doc.length;
  for (let v = n.viewState.heightOracle.textHeight / 2, M = !1; a = n.elementAtHeight(u), a.type != it.Text; )
    for (; u = i > 0 ? a.bottom + v : a.top - v, !(u >= 0 && u <= c); ) {
      if (M)
        return e ? null : 0;
      M = !0, i = -i;
    }
  f = l + u;
  let d = a.from;
  if (d < n.viewport.from)
    return n.viewport.from == 0 ? 0 : e ? null : jr(n, o, a, h, f);
  if (d > n.viewport.to)
    return n.viewport.to == n.state.doc.length ? n.state.doc.length : e ? null : jr(n, o, a, h, f);
  let p = n.dom.ownerDocument, m = n.root.elementFromPoint ? n.root : p, g = m.elementFromPoint(h, f);
  g && !n.contentDOM.contains(g) && (g = null), g || (h = Math.max(o.left + 1, Math.min(o.right - 1, h)), g = m.elementFromPoint(h, f), g && !n.contentDOM.contains(g) && (g = null));
  let y, x = -1;
  if (g && ((s = n.docView.nearest(g)) === null || s === void 0 ? void 0 : s.isEditable) != !1) {
    if (p.caretPositionFromPoint) {
      let v = p.caretPositionFromPoint(h, f);
      v && ({ offsetNode: y, offset: x } = v);
    } else if (p.caretRangeFromPoint) {
      let v = p.caretRangeFromPoint(h, f);
      v && ({ startContainer: y, startOffset: x } = v, (!n.contentDOM.contains(y) || S.safari && ff(y, x, h) || S.chrome && uf(y, x, h)) && (y = void 0));
    }
  }
  if (!y || !n.docView.dom.contains(y)) {
    let v = z.find(n.docView, d);
    if (!v)
      return u > a.top + a.height / 2 ? a.to : a.from;
    ({ node: y, offset: x } = Ms(v.dom, h, f));
  }
  let D = n.docView.nearest(y);
  if (!D)
    return null;
  if (D.isWidget && ((r = D.dom) === null || r === void 0 ? void 0 : r.nodeType) == 1) {
    let v = D.dom.getBoundingClientRect();
    return t.y < v.top || t.y <= v.bottom && t.x <= (v.left + v.right) / 2 ? D.posAtStart : D.posAtEnd;
  } else
    return D.localPosFromDOM(y, x) + D.posAtStart;
}
function jr(n, t, e, i, s) {
  let r = Math.round((i - t.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && e.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, a = Math.floor((s - e.top - (n.defaultLineHeight - l) * 0.5) / l);
    r += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(e.from, e.to);
  return e.from + ds(o, r, n.state.tabSize);
}
function ff(n, t, e) {
  let i;
  if (n.nodeType != 3 || t != (i = n.nodeValue.length))
    return !1;
  for (let s = n.nextSibling; s; s = s.nextSibling)
    if (s.nodeType != 1 || s.nodeName != "BR")
      return !1;
  return he(n, i - 1, i).getBoundingClientRect().left > e;
}
function uf(n, t, e) {
  if (t != 0)
    return !1;
  for (let s = n; ; ) {
    let r = s.parentNode;
    if (!r || r.nodeType != 1 || r.firstChild != s)
      return !1;
    if (r.classList.contains("cm-line"))
      break;
    s = r;
  }
  let i = n.nodeType == 1 ? n.getBoundingClientRect() : he(n, 0, Math.max(n.nodeValue.length, 1)).getBoundingClientRect();
  return e - i.left > 5;
}
function As(n, t) {
  let e = n.lineBlockAt(t);
  if (Array.isArray(e.type)) {
    for (let i of e.type)
      if (i.to > t || i.to == t && (i.to == e.to || i.type == it.Text))
        return i;
  }
  return e;
}
function df(n, t, e, i) {
  let s = As(n, t.head), r = !i || s.type != it.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(t.assoc < 0 && t.head > s.from ? t.head - 1 : t.head);
  if (r) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(s.from), a = n.posAtCoords({
      x: e == (l == H.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return b.cursor(a, e ? -1 : 1);
  }
  return b.cursor(e ? s.to : s.from, e ? -1 : 1);
}
function Ur(n, t, e, i) {
  let s = n.state.doc.lineAt(t.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
  for (let l = t, a = null; ; ) {
    let c = Qc(s, r, o, l, e), h = Kl;
    if (!c) {
      if (s.number == (e ? n.state.doc.lines : 1))
        return l;
      h = `
`, s = n.state.doc.line(s.number + (e ? 1 : -1)), r = n.bidiSpans(s), c = n.visualLineSide(s, !e);
    }
    if (a) {
      if (!a(h))
        return l;
    } else {
      if (!i)
        return c;
      a = i(h);
    }
    l = c;
  }
}
function pf(n, t, e) {
  let i = n.state.charCategorizer(t), s = i(e);
  return (r) => {
    let o = i(r);
    return s == V.Space && (s = o), s == o;
  };
}
function mf(n, t, e, i) {
  let s = t.head, r = e ? 1 : -1;
  if (s == (e ? n.state.doc.length : 0))
    return b.cursor(s, t.assoc);
  let o = t.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), c = n.coordsAtPos(s, t.assoc || -1), h = n.documentTop;
  if (c)
    o == null && (o = c.left - a.left), l = r < 0 ? c.top : c.bottom;
  else {
    let d = n.viewState.lineBlockAt(s);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (s - d.from))), l = (r < 0 ? d.top : d.bottom) + h;
  }
  let f = a.left + o, u = i ?? n.viewState.heightOracle.textHeight >> 1;
  for (let d = 0; ; d += 10) {
    let p = l + (u + d) * r, m = la(n, { x: f, y: p }, !1, r);
    if (p < a.top || p > a.bottom || (r < 0 ? m < s : m > s)) {
      let g = n.docView.coordsForChar(m), y = !g || p < g.top ? -1 : 1;
      return b.cursor(m, y, void 0, o);
    }
  }
}
function Xi(n, t, e) {
  for (; ; ) {
    let i = 0;
    for (let s of n)
      s.between(t - 1, t + 1, (r, o, l) => {
        if (t > r && t < o) {
          let a = i || e || (t - r < o - t ? -1 : 1);
          t = a < 0 ? r : o, i = a;
        }
      });
    if (!i)
      return t;
  }
}
function Hn(n, t, e) {
  let i = Xi(n.state.facet(tr).map((s) => s(n)), e.from, t.head > e.from ? -1 : 1);
  return i == e.from ? e : b.cursor(i, i < e.from ? 1 : -1);
}
class gf {
  setSelectionOrigin(t) {
    this.lastSelectionOrigin = t, this.lastSelectionTime = Date.now();
  }
  constructor(t) {
    this.view = t, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = t.hasFocus, S.safari && t.contentDOM.addEventListener("input", () => null), S.gecko && Pf(t.contentDOM.ownerDocument);
  }
  handleEvent(t) {
    !Cf(this.view, t) || this.ignoreDuringComposition(t) || t.type == "keydown" && this.keydown(t) || this.runHandlers(t.type, t);
  }
  runHandlers(t, e) {
    let i = this.handlers[t];
    if (i) {
      for (let s of i.observers)
        s(this.view, e);
      for (let s of i.handlers) {
        if (e.defaultPrevented)
          break;
        if (s(this.view, e)) {
          e.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(t) {
    let e = yf(t), i = this.handlers, s = this.view.contentDOM;
    for (let r in e)
      if (r != "scroll") {
        let o = !e[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (s.removeEventListener(r, this.handleEvent), l = null), l || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !e[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = e;
  }
  keydown(t) {
    if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && t.keyCode != 27 && ha.indexOf(t.keyCode) < 0 && (this.tabFocusMode = -1), S.android && S.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8))
      return this.view.observer.delayAndroidKey(t.key, t.keyCode), !0;
    let e;
    return S.ios && !t.synthetic && !t.altKey && !t.metaKey && ((e = aa.find((i) => i.keyCode == t.keyCode)) && !t.ctrlKey || bf.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey) ? (this.pendingIOSKey = e || t, setTimeout(() => this.flushIOSKey(), 250), !0) : (t.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(t) {
    let e = this.pendingIOSKey;
    return !e || e.key == "Enter" && t && t.from < t.to && /^\S+$/.test(t.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, ke(this.view.contentDOM, e.key, e.keyCode, e instanceof KeyboardEvent ? e : void 0));
  }
  ignoreDuringComposition(t) {
    return /^key/.test(t.type) ? this.composing > 0 ? !0 : S.safari && !S.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1 : !1;
  }
  startMouseSelection(t) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = t;
  }
  update(t) {
    this.view.observer.update(t), this.mouseSelection && this.mouseSelection.update(t), this.draggedContent && t.docChanged && (this.draggedContent = this.draggedContent.map(t.changes)), t.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function Gr(n, t) {
  return (e, i) => {
    try {
      return t.call(n, i, e);
    } catch (s) {
      lt(e.state, s);
    }
  };
}
function yf(n) {
  let t = /* @__PURE__ */ Object.create(null);
  function e(i) {
    return t[i] || (t[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let s = i.spec;
    if (s && s.domEventHandlers)
      for (let r in s.domEventHandlers) {
        let o = s.domEventHandlers[r];
        o && e(r).handlers.push(Gr(i.value, o));
      }
    if (s && s.domEventObservers)
      for (let r in s.domEventObservers) {
        let o = s.domEventObservers[r];
        o && e(r).observers.push(Gr(i.value, o));
      }
  }
  for (let i in vt)
    e(i).handlers.push(vt[i]);
  for (let i in yt)
    e(i).observers.push(yt[i]);
  return t;
}
const aa = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], bf = "dthko", ha = [16, 17, 18, 20, 91, 92, 224, 225], Bi = 6;
function Li(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function wf(n, t) {
  return Math.max(Math.abs(n.clientX - t.clientX), Math.abs(n.clientY - t.clientY));
}
class xf {
  constructor(t, e, i, s) {
    this.view = t, this.startEvent = e, this.style = i, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = e, this.scrollParents = Ic(t.contentDOM), this.atoms = t.state.facet(tr).map((o) => o(t));
    let r = t.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = e.shiftKey, this.multiple = t.state.facet(P.allowMultipleSelections) && vf(t, e), this.dragging = Sf(t, e) && ua(e) == 1 ? null : !1;
  }
  start(t) {
    this.dragging === !1 && this.select(t);
  }
  move(t) {
    if (t.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && wf(this.startEvent, t) < 10)
      return;
    this.select(this.lastEvent = t);
    let e = 0, i = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = ra(this.view);
    t.clientX - a.left <= s + Bi ? e = -Li(s - t.clientX) : t.clientX + a.right >= o - Bi && (e = Li(t.clientX - o)), t.clientY - a.top <= r + Bi ? i = -Li(r - t.clientY) : t.clientY + a.bottom >= l - Bi && (i = Li(t.clientY - l)), this.setScrollSpeed(e, i);
  }
  up(t) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || t.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let t = this.view.contentDOM.ownerDocument;
    t.removeEventListener("mousemove", this.move), t.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(t, e) {
    this.scrollSpeed = { x: t, y: e }, t || e ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: t, y: e } = this.scrollSpeed;
    t && this.scrollParents.x && (this.scrollParents.x.scrollLeft += t, t = 0), e && this.scrollParents.y && (this.scrollParents.y.scrollTop += e, e = 0), (t || e) && this.view.win.scrollBy(t, e), this.dragging === !1 && this.select(this.lastEvent);
  }
  skipAtoms(t) {
    let e = null;
    for (let i = 0; i < t.ranges.length; i++) {
      let s = t.ranges[i], r = null;
      if (s.empty) {
        let o = Xi(this.atoms, s.from, 0);
        o != s.from && (r = b.cursor(o, -1));
      } else {
        let o = Xi(this.atoms, s.from, -1), l = Xi(this.atoms, s.to, 1);
        (o != s.from || l != s.to) && (r = b.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
      }
      r && (e || (e = t.ranges.slice()), e[i] = r);
    }
    return e ? b.create(e, t.mainIndex) : t;
  }
  select(t) {
    let { view: e } = this, i = this.skipAtoms(this.style.get(t, this.extend, this.multiple));
    (this.mustSelect || !i.eq(e.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(t) {
    t.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(t) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function vf(n, t) {
  let e = n.state.facet(jl);
  return e.length ? e[0](t) : S.mac ? t.metaKey : t.ctrlKey;
}
function kf(n, t) {
  let e = n.state.facet(Ul);
  return e.length ? e[0](t) : S.mac ? !t.altKey : !t.ctrlKey;
}
function Sf(n, t) {
  let { main: e } = n.state.selection;
  if (e.empty)
    return !1;
  let i = ni(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let s = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= t.clientX && o.right >= t.clientX && o.top <= t.clientY && o.bottom >= t.clientY)
      return !0;
  }
  return !1;
}
function Cf(n, t) {
  if (!t.bubbles)
    return !0;
  if (t.defaultPrevented)
    return !1;
  for (let e = t.target, i; e != n.contentDOM; e = e.parentNode)
    if (!e || e.nodeType == 11 || (i = R.get(e)) && i.ignoreEvent(t))
      return !1;
  return !0;
}
const vt = /* @__PURE__ */ Object.create(null), yt = /* @__PURE__ */ Object.create(null), ca = S.ie && S.ie_version < 15 || S.ios && S.webkit_version < 604;
function Mf(n) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let e = t.appendChild(document.createElement("textarea"));
  e.style.cssText = "position: fixed; left: -10000px; top: 10px", e.focus(), setTimeout(() => {
    n.focus(), e.remove(), fa(n, e.value);
  }, 50);
}
function fa(n, t) {
  let { state: e } = n, i, s = 1, r = e.toText(t), o = r.lines == e.selection.ranges.length;
  if (Ds != null && e.selection.ranges.every((a) => a.empty) && Ds == r.toString()) {
    let a = -1;
    i = e.changeByRange((c) => {
      let h = e.doc.lineAt(c.from);
      if (h.from == a)
        return { range: c };
      a = h.from;
      let f = e.toText((o ? r.line(s++).text : t) + e.lineBreak);
      return {
        changes: { from: h.from, insert: f },
        range: b.cursor(c.from + f.length)
      };
    });
  } else o ? i = e.changeByRange((a) => {
    let c = r.line(s++);
    return {
      changes: { from: a.from, to: a.to, insert: c.text },
      range: b.cursor(a.from + c.length)
    };
  }) : i = e.replaceSelection(r);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
yt.scroll = (n) => {
  n.inputState.lastScrollTop = n.scrollDOM.scrollTop, n.inputState.lastScrollLeft = n.scrollDOM.scrollLeft;
};
vt.keydown = (n, t) => (n.inputState.setSelectionOrigin("select"), t.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
yt.touchstart = (n, t) => {
  n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
};
yt.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
vt.mousedown = (n, t) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let e = null;
  for (let i of n.state.facet(Gl))
    if (e = i(n, t), e)
      break;
  if (!e && t.button == 0 && (e = Tf(n, t)), e) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new xf(n, t, e, i)), i && n.observer.ignore(() => {
      Al(n.contentDOM);
      let r = n.root.activeElement;
      r && !r.contains(n.contentDOM) && r.blur();
    });
    let s = n.inputState.mouseSelection;
    if (s)
      return s.start(t), s.dragging === !1;
  }
  return !1;
};
function Xr(n, t, e, i) {
  if (i == 1)
    return b.cursor(t, e);
  if (i == 2)
    return af(n.state, t, e);
  {
    let s = z.find(n.docView, t), r = n.state.doc.lineAt(s ? s.posAtEnd : t), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < n.state.doc.length && l == r.to && l++, b.range(o, l);
  }
}
let Jr = (n, t, e) => t >= e.top && t <= e.bottom && n >= e.left && n <= e.right;
function Af(n, t, e, i) {
  let s = z.find(n.docView, t);
  if (!s)
    return 1;
  let r = t - s.posAtStart;
  if (r == 0)
    return 1;
  if (r == s.length)
    return -1;
  let o = s.coordsAt(r, -1);
  if (o && Jr(e, i, o))
    return -1;
  let l = s.coordsAt(r, 1);
  return l && Jr(e, i, l) ? 1 : o && o.bottom >= i ? -1 : 1;
}
function Yr(n, t) {
  let e = n.posAtCoords({ x: t.clientX, y: t.clientY }, !1);
  return { pos: e, bias: Af(n, e, t.clientX, t.clientY) };
}
const Df = S.ie && S.ie_version <= 11;
let Qr = null, Zr = 0, _r = 0;
function ua(n) {
  if (!Df)
    return n.detail;
  let t = Qr, e = _r;
  return Qr = n, _r = Date.now(), Zr = !t || e > Date.now() - 400 && Math.abs(t.clientX - n.clientX) < 2 && Math.abs(t.clientY - n.clientY) < 2 ? (Zr + 1) % 3 : 1;
}
function Tf(n, t) {
  let e = Yr(n, t), i = ua(t), s = n.state.selection;
  return {
    update(r) {
      r.docChanged && (e.pos = r.changes.mapPos(e.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let a = Yr(n, r), c, h = Xr(n, a.pos, a.bias, i);
      if (e.pos != a.pos && !o) {
        let f = Xr(n, e.pos, e.bias, i), u = Math.min(f.from, h.from), d = Math.max(f.to, h.to);
        h = u < h.from ? b.range(u, d) : b.range(d, u);
      }
      return o ? s.replaceRange(s.main.extend(h.from, h.to)) : l && i == 1 && s.ranges.length > 1 && (c = Of(s, a.pos)) ? c : l ? s.addRange(h) : b.create([h]);
    }
  };
}
function Of(n, t) {
  for (let e = 0; e < n.ranges.length; e++) {
    let { from: i, to: s } = n.ranges[e];
    if (i <= t && s >= t)
      return b.create(n.ranges.slice(0, e).concat(n.ranges.slice(e + 1)), n.mainIndex == e ? 0 : n.mainIndex - (n.mainIndex > e ? 1 : 0));
  }
  return null;
}
vt.dragstart = (n, t) => {
  let { selection: { main: e } } = n.state;
  if (t.target.draggable) {
    let s = n.docView.nearest(t.target);
    if (s && s.isWidget) {
      let r = s.posAtStart, o = r + s.length;
      (r >= e.to || o <= e.from) && (e = b.range(r, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = e, t.dataTransfer && (t.dataTransfer.setData("Text", n.state.sliceDoc(e.from, e.to)), t.dataTransfer.effectAllowed = "copyMove"), !1;
};
vt.dragend = (n) => (n.inputState.draggedContent = null, !1);
function to(n, t, e, i) {
  if (!e)
    return;
  let s = n.posAtCoords({ x: t.clientX, y: t.clientY }, !1), { draggedContent: r } = n.inputState, o = i && r && kf(n, t) ? { from: r.from, to: r.to } : null, l = { from: s, insert: e }, a = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
vt.drop = (n, t) => {
  if (!t.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let e = t.dataTransfer.files;
  if (e && e.length) {
    let i = Array(e.length), s = 0, r = () => {
      ++s == e.length && to(n, t, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < e.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(e[o]);
    }
    return !0;
  } else {
    let i = t.dataTransfer.getData("Text");
    if (i)
      return to(n, t, i, !0), !0;
  }
  return !1;
};
vt.paste = (n, t) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let e = ca ? null : t.clipboardData;
  return e ? (fa(n, e.getData("text/plain") || e.getData("text/uri-list")), !0) : (Mf(n), !1);
};
function Bf(n, t) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let i = e.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = t, i.focus(), i.selectionEnd = t.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function Lf(n) {
  let t = [], e = [], i = !1;
  for (let s of n.selection.ranges)
    s.empty || (t.push(n.sliceDoc(s.from, s.to)), e.push(s));
  if (!t.length) {
    let s = -1;
    for (let { from: r } of n.selection.ranges) {
      let o = n.doc.lineAt(r);
      o.number > s && (t.push(o.text), e.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), s = o.number;
    }
    i = !0;
  }
  return { text: t.join(n.lineBreak), ranges: e, linewise: i };
}
let Ds = null;
vt.copy = vt.cut = (n, t) => {
  let { text: e, ranges: i, linewise: s } = Lf(n.state);
  if (!e && !s)
    return !1;
  Ds = s ? e : null, t.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = ca ? null : t.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", e), !0) : (Bf(n, e), !1);
};
const da = /* @__PURE__ */ Ht.define();
function pa(n, t) {
  let e = [];
  for (let i of n.facet(Yl)) {
    let s = i(n, t);
    s && e.push(s);
  }
  return e ? n.update({ effects: e, annotations: da.of(!0) }) : null;
}
function ma(n) {
  setTimeout(() => {
    let t = n.hasFocus;
    if (t != n.inputState.notifiedFocused) {
      let e = pa(n.state, t);
      e ? n.dispatch(e) : n.update([]);
    }
  }, 10);
}
yt.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), ma(n);
};
yt.blur = (n) => {
  n.observer.clearSelectionRange(), ma(n);
};
yt.compositionstart = yt.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
yt.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, S.chrome && S.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
yt.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
vt.beforeinput = (n, t) => {
  var e;
  let i;
  if (S.chrome && S.android && (i = aa.find((s) => s.inputType == t.inputType)) && (n.observer.delayAndroidKey(i.key, i.keyCode), i.key == "Backspace" || i.key == "Delete")) {
    let s = ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.height) || 0;
    setTimeout(() => {
      var r;
      (((r = window.visualViewport) === null || r === void 0 ? void 0 : r.height) || 0) > s + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return S.ios && t.inputType == "deleteContentForward" && n.observer.flushSoon(), S.safari && t.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => yt.compositionend(n, t), 20), !1;
};
const eo = /* @__PURE__ */ new Set();
function Pf(n) {
  eo.has(n) || (eo.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const io = ["pre-wrap", "normal", "pre-line", "break-spaces"];
class Ef {
  constructor(t) {
    this.lineWrapping = t, this.doc = L.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30, this.heightChanged = !1;
  }
  heightForGap(t, e) {
    let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((e - t - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(t) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((t - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(t) {
    return this.doc = t, this;
  }
  mustRefreshForWrapping(t) {
    return io.indexOf(t) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(t) {
    let e = !1;
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (e = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return e;
  }
  refresh(t, e, i, s, r, o) {
    let l = io.indexOf(t) > -1, a = Math.round(e) != Math.round(this.lineHeight) || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = e, this.charWidth = i, this.textHeight = s, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let c = 0; c < o.length; c++) {
        let h = o[c];
        h < 0 ? c++ : this.heightSamples[Math.floor(h * 10)] = !0;
      }
    }
    return a;
  }
}
class Rf {
  constructor(t, e) {
    this.from = t, this.heights = e, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Mt {
  /**
  @internal
  */
  constructor(t, e, i, s, r) {
    this.from = t, this.length = e, this.top = i, this.height = s, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? it.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof Yt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(t) {
    let e = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
    return new Mt(this.from, this.length + t.length, this.top, this.height + t.height, e);
  }
}
var F = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(F || (F = {}));
const Ji = 1e-3;
class nt {
  constructor(t, e, i = 2) {
    this.length = t, this.height = e, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(t) {
    this.flags = (t ? 2 : 0) | this.flags & -3;
  }
  setHeight(t, e) {
    this.height != e && (Math.abs(this.height - e) > Ji && (t.heightChanged = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(t, e, i) {
    return nt.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(t, e) {
    e.push(this);
  }
  decomposeRight(t, e) {
    e.push(this);
  }
  applyChanges(t, e, i, s) {
    let r = this, o = i.doc;
    for (let l = s.length - 1; l >= 0; l--) {
      let { fromA: a, toA: c, fromB: h, toB: f } = s[l], u = r.lineAt(a, F.ByPosNoHeight, i.setDoc(e), 0, 0), d = u.to >= c ? u : r.lineAt(c, F.ByPosNoHeight, i, 0, 0);
      for (f += d.to - c, c = d.to; l > 0 && u.from <= s[l - 1].toA; )
        a = s[l - 1].fromA, h = s[l - 1].fromB, l--, a < u.from && (u = r.lineAt(a, F.ByPosNoHeight, i, 0, 0));
      h += u.from - a, a = u.from;
      let p = er.build(i.setDoc(o), t, h, f);
      r = r.replace(a, c, p);
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new ct(0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(t) {
    if (t.length == 1)
      return t[0];
    let e = 0, i = t.length, s = 0, r = 0;
    for (; ; )
      if (e == i)
        if (s > r * 2) {
          let l = t[e - 1];
          l.break ? t.splice(--e, 1, l.left, null, l.right) : t.splice(--e, 1, l.left, l.right), i += 1 + l.break, s -= l.size;
        } else if (r > s * 2) {
          let l = t[i];
          l.break ? t.splice(i, 1, l.left, null, l.right) : t.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (s < r) {
        let l = t[e++];
        l && (s += l.size);
      } else {
        let l = t[--i];
        l && (r += l.size);
      }
    let o = 0;
    return t[e - 1] == null ? (o = 1, e--) : t[e] == null && (o = 1, i++), new If(nt.of(t.slice(0, e)), o, nt.of(t.slice(i)));
  }
}
nt.prototype.size = 1;
class ga extends nt {
  constructor(t, e, i) {
    super(t, e), this.deco = i;
  }
  blockAt(t, e, i, s) {
    return new Mt(s, this.length, i, this.height, this.deco || 0);
  }
  lineAt(t, e, i, s, r) {
    return this.blockAt(0, i, s, r);
  }
  forEachLine(t, e, i, s, r, o) {
    t <= r + this.length && e >= r && o(this.blockAt(0, i, s, r));
  }
  updateHeight(t, e = 0, i = !1, s) {
    return s && s.from <= e && s.more && this.setHeight(t, s.heights[s.index++]), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class ct extends ga {
  constructor(t, e) {
    super(t, e, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0;
  }
  blockAt(t, e, i, s) {
    return new Mt(s, this.length, i, this.height, this.breaks);
  }
  replace(t, e, i) {
    let s = i[0];
    return i.length == 1 && (s instanceof ct || s instanceof X && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof X ? s = new ct(s.length, this.height) : s.height = this.height, this.outdated || (s.outdated = !1), s) : nt.of(i);
  }
  updateHeight(t, e = 0, i = !1, s) {
    return s && s.from <= e && s.more ? this.setHeight(t, s.heights[s.index++]) : (i || this.outdated) && this.setHeight(t, Math.max(this.widgetHeight, t.heightForLine(this.length - this.collapsed)) + this.breaks * t.lineHeight), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class X extends nt {
  constructor(t) {
    super(t, 0);
  }
  heightMetrics(t, e) {
    let i = t.doc.lineAt(e).number, s = t.doc.lineAt(e + this.length).number, r = s - i + 1, o, l = 0;
    if (t.lineWrapping) {
      let a = Math.min(this.height, t.lineHeight * r);
      o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: s, perLine: o, perChar: l };
  }
  blockAt(t, e, i, s) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(e, s);
    if (e.lineWrapping) {
      let c = s + (t < e.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (t - i) / this.height)) * this.length)), h = e.doc.lineAt(c), f = l + h.length * a, u = Math.max(i, t - f / 2);
      return new Mt(h.from, h.length, u, f, 0);
    } else {
      let c = Math.max(0, Math.min(o - r, Math.floor((t - i) / l))), { from: h, length: f } = e.doc.line(r + c);
      return new Mt(h, f, i + l * c, l, 0);
    }
  }
  lineAt(t, e, i, s, r) {
    if (e == F.ByHeight)
      return this.blockAt(t, i, s, r);
    if (e == F.ByPosNoHeight) {
      let { from: d, to: p } = i.doc.lineAt(t);
      return new Mt(d, p - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, r), c = i.doc.lineAt(t), h = l + c.length * a, f = c.number - o, u = s + l * f + a * (c.from - r - f);
    return new Mt(c.from, c.length, Math.max(s, Math.min(u, s + this.height - h)), h, 0);
  }
  forEachLine(t, e, i, s, r, o) {
    t = Math.max(t, r), e = Math.min(e, r + this.length);
    let { firstLine: l, perLine: a, perChar: c } = this.heightMetrics(i, r);
    for (let h = t, f = s; h <= e; ) {
      let u = i.doc.lineAt(h);
      if (h == t) {
        let p = u.number - l;
        f += a * p + c * (t - r - p);
      }
      let d = a + c * u.length;
      o(new Mt(u.from, u.length, f, d, 0)), f += d, h = u.to + 1;
    }
  }
  replace(t, e, i) {
    let s = this.length - e;
    if (s > 0) {
      let r = i[i.length - 1];
      r instanceof X ? i[i.length - 1] = new X(r.length + s) : i.push(null, new X(s - 1));
    }
    if (t > 0) {
      let r = i[0];
      r instanceof X ? i[0] = new X(t + r.length) : i.unshift(new X(t - 1), null);
    }
    return nt.of(i);
  }
  decomposeLeft(t, e) {
    e.push(new X(t - 1), null);
  }
  decomposeRight(t, e) {
    e.push(null, new X(this.length - t - 1));
  }
  updateHeight(t, e = 0, i = !1, s) {
    let r = e + this.length;
    if (s && s.from <= e + this.length && s.more) {
      let o = [], l = Math.max(e, s.from), a = -1;
      for (s.from > e && o.push(new X(s.from - e - 1).updateHeight(t, e)); l <= r && s.more; ) {
        let h = t.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = s.heights[s.index++];
        a == -1 ? a = f : Math.abs(f - a) >= Ji && (a = -2);
        let u = new ct(h, f);
        u.outdated = !1, o.push(u), l += h + 1;
      }
      l <= r && o.push(null, new X(r - l).updateHeight(t, l));
      let c = nt.of(o);
      return (a < 0 || Math.abs(c.height - this.height) >= Ji || Math.abs(a - this.heightMetrics(t, e).perLine) >= Ji) && (t.heightChanged = !0), c;
    } else (i || this.outdated) && (this.setHeight(t, t.heightForGap(e, e + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class If extends nt {
  constructor(t, e, i) {
    super(t.length + e + i.length, t.height + i.height, e | (t.outdated || i.outdated ? 2 : 0)), this.left = t, this.right = i, this.size = t.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(t, e, i, s) {
    let r = i + this.left.height;
    return t < r ? this.left.blockAt(t, e, i, s) : this.right.blockAt(t, e, r, s + this.left.length + this.break);
  }
  lineAt(t, e, i, s, r) {
    let o = s + this.left.height, l = r + this.left.length + this.break, a = e == F.ByHeight ? t < o : t < l, c = a ? this.left.lineAt(t, e, i, s, r) : this.right.lineAt(t, e, i, o, l);
    if (this.break || (a ? c.to < l : c.from > l))
      return c;
    let h = e == F.ByPosNoHeight ? F.ByPosNoHeight : F.ByPos;
    return a ? c.join(this.right.lineAt(l, h, i, o, l)) : this.left.lineAt(l, h, i, s, r).join(c);
  }
  forEachLine(t, e, i, s, r, o) {
    let l = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      t < a && this.left.forEachLine(t, e, i, s, r, o), e >= a && this.right.forEachLine(t, e, i, l, a, o);
    else {
      let c = this.lineAt(a, F.ByPos, i, s, r);
      t < c.from && this.left.forEachLine(t, c.from - 1, i, s, r, o), c.to >= t && c.from <= e && o(c), e > c.to && this.right.forEachLine(c.to + 1, e, i, l, a, o);
    }
  }
  replace(t, e, i) {
    let s = this.left.length + this.break;
    if (e < s)
      return this.balanced(this.left.replace(t, e, i), this.right);
    if (t > this.left.length)
      return this.balanced(this.left, this.right.replace(t - s, e - s, i));
    let r = [];
    t > 0 && this.decomposeLeft(t, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (t > 0 && no(r, o - 1), e < this.length) {
      let l = r.length;
      this.decomposeRight(e, r), no(r, l);
    }
    return nt.of(r);
  }
  decomposeLeft(t, e) {
    let i = this.left.length;
    if (t <= i)
      return this.left.decomposeLeft(t, e);
    e.push(this.left), this.break && (i++, t >= i && e.push(null)), t > i && this.right.decomposeLeft(t - i, e);
  }
  decomposeRight(t, e) {
    let i = this.left.length, s = i + this.break;
    if (t >= s)
      return this.right.decomposeRight(t - s, e);
    t < i && this.left.decomposeRight(t, e), this.break && t < s && e.push(null), e.push(this.right);
  }
  balanced(t, e) {
    return t.size > 2 * e.size || e.size > 2 * t.size ? nt.of(this.break ? [t, null, e] : [t, e]) : (this.left = t, this.right = e, this.height = t.height + e.height, this.outdated = t.outdated || e.outdated, this.size = t.size + e.size, this.length = t.length + this.break + e.length, this);
  }
  updateHeight(t, e = 0, i = !1, s) {
    let { left: r, right: o } = this, l = e + r.length + this.break, a = null;
    return s && s.from <= e + r.length && s.more ? a = r = r.updateHeight(t, e, i, s) : r.updateHeight(t, e, i), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(t, l, i, s) : o.updateHeight(t, l, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function no(n, t) {
  let e, i;
  n[t] == null && (e = n[t - 1]) instanceof X && (i = n[t + 1]) instanceof X && n.splice(t - 1, 3, new X(e.length + 1 + i.length));
}
const Nf = 5;
class er {
  constructor(t, e) {
    this.pos = t, this.oracle = e, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = t;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(t, e) {
    if (this.lineStart > -1) {
      let i = Math.min(e, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof ct ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new ct(i - this.pos, -1)), this.writtenTo = i, e > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = e;
  }
  point(t, e, i) {
    if (t < e || i.heightRelevant) {
      let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = e - t;
      i.block ? this.addBlock(new ga(o, s, i)) : (o || r || s >= Nf) && this.addLineDeco(s, r, o);
    } else e > t && this.span(t, e);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = t, this.lineEnd = e, this.writtenTo < t && ((this.writtenTo < t - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, t - 1)), this.nodes.push(null)), this.pos > t && this.nodes.push(new ct(this.pos - t, -1)), this.writtenTo = this.pos;
  }
  blankContent(t, e) {
    let i = new X(e - t);
    return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (t instanceof ct)
      return t;
    let e = new ct(0, -1);
    return this.nodes.push(e), e;
  }
  addBlock(t) {
    this.enterLine();
    let e = t.deco;
    e && e.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(t), this.writtenTo = this.pos = this.pos + t.length, e && e.endSide > 0 && (this.covering = t);
  }
  addLineDeco(t, e, i) {
    let s = this.ensureLine();
    s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, t), s.breaks += e, this.writtenTo = this.pos = this.pos + i;
  }
  finish(t) {
    let e = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(e instanceof ct) && !this.isCovered ? this.nodes.push(new ct(0, -1)) : (this.writtenTo < this.pos || e == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = t;
    for (let s of this.nodes)
      s instanceof ct && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(t, e, i, s) {
    let r = new er(i, t);
    return B.spans(e, i, s, r, 0), r.finish(i);
  }
}
function Ff(n, t, e) {
  let i = new Hf();
  return B.compare(n, t, e, i, 0), i.changes;
}
class Hf {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(t, e, i, s) {
    (t < e || i && i.heightRelevant || s && s.heightRelevant) && xs(t, e, this.changes, 5);
  }
}
function Vf(n, t) {
  let e = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, e.left), o = Math.min(s.innerWidth, e.right), l = Math.max(0, e.top), a = Math.min(s.innerHeight, e.bottom);
  for (let c = n.parentNode; c && c != i.body; )
    if (c.nodeType == 1) {
      let h = c, f = window.getComputedStyle(h);
      if ((h.scrollHeight > h.clientHeight || h.scrollWidth > h.clientWidth) && f.overflow != "visible") {
        let u = h.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = c == n.parentNode ? u.bottom : Math.min(a, u.bottom);
      }
      c = f.position == "absolute" || f.position == "fixed" ? h.offsetParent : h.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
  return {
    left: r - e.left,
    right: Math.max(r, o) - e.left,
    top: l - (e.top + t),
    bottom: Math.max(l, a) - (e.top + t)
  };
}
function Wf(n, t) {
  let e = n.getBoundingClientRect();
  return {
    left: 0,
    right: e.right - e.left,
    top: t,
    bottom: e.bottom - (e.top + t)
  };
}
class Vn {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.size = i;
  }
  static same(t, e) {
    if (t.length != e.length)
      return !1;
    for (let i = 0; i < t.length; i++) {
      let s = t[i], r = e[i];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(t, e) {
    return A.replace({
      widget: new $f(this.size * (e ? t.scaleY : t.scaleX), e)
    }).range(this.from, this.to);
  }
}
class $f extends Bt {
  constructor(t, e) {
    super(), this.size = t, this.vertical = e;
  }
  eq(t) {
    return t.size == this.size && t.vertical == this.vertical;
  }
  toDOM() {
    let t = document.createElement("div");
    return this.vertical ? t.style.height = this.size + "px" : (t.style.width = this.size + "px", t.style.height = "2px", t.style.display = "inline-block"), t;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class so {
  constructor(t) {
    this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !1, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = ro, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = H.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let e = t.facet(_s).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new Ef(e), this.stateDeco = t.facet(si).filter((i) => typeof i != "function"), this.heightMap = nt.empty().applyChanges(this.stateDeco, L.empty, this.heightOracle.setDoc(t.doc), [new mt(0, 0, 0, t.doc.length)]);
    for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = A.set(this.lineGaps.map((i) => i.draw(this, !1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let t = [this.viewport], { main: e } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let s = i ? e.head : e.anchor;
      if (!t.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        t.push(new Pi(r, o));
      }
    }
    return this.viewports = t.sort((i, s) => i.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let t = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? ro : new ir(this.heightOracle, this.heightMap, this.viewports), t.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (t) => {
      this.viewportLines.push(Ue(t, this.scaler));
    });
  }
  update(t, e = null) {
    this.state = t.state;
    let i = this.stateDeco;
    this.stateDeco = this.state.facet(si).filter((h) => typeof h != "function");
    let s = t.changedRanges, r = mt.extendWithRanges(s, Ff(i, this.stateDeco, t ? t.changes : K.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    this.heightMap = this.heightMap.applyChanges(this.stateDeco, t.startState.doc, this.heightOracle.setDoc(this.state.doc), r), this.heightMap.height != o && (t.flags |= 2), l ? (this.scrollAnchorPos = t.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = this.heightMap.height);
    let a = r.length ? this.mapViewport(this.viewport, t.changes) : this.viewport;
    (e && (e.range.head < a.from || e.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, e));
    let c = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, t.flags |= this.updateForViewport(), (c || !t.changes.empty || t.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes))), t.flags |= this.computeVisibleRanges(), e && (this.scrollTarget = e), !this.mustEnforceCursorAssoc && t.selectionSet && t.view.lineWrapping && t.state.selection.main.empty && t.state.selection.main.assoc && !t.state.facet(Zl) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(t) {
    let e = t.contentDOM, i = window.getComputedStyle(e), s = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? H.RTL : H.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r), l = e.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let c = 0, h = 0;
    if (l.width && l.height) {
      let { scaleX: v, scaleY: M } = Ml(e, l);
      (v > 5e-3 && Math.abs(this.scaleX - v) > 5e-3 || M > 5e-3 && Math.abs(this.scaleY - M) > 5e-3) && (this.scaleX = v, this.scaleY = M, c |= 8, o = a = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, c |= 10), this.editorWidth != t.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = t.scrollDOM.clientWidth, c |= 8);
    let d = t.scrollDOM.scrollTop * this.scaleY;
    this.scrollTop != d && (this.scrollAnchorHeight = -1, this.scrollTop = d), this.scrolledToBottom = Tl(t.scrollDOM);
    let p = (this.printing ? Wf : Vf)(e, this.paddingTop), m = p.top - this.pixelViewport.top, g = p.bottom - this.pixelViewport.bottom;
    this.pixelViewport = p;
    let y = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (y != this.inView && (this.inView = y, y && (a = !0)), !this.inView && !this.scrollTarget)
      return 0;
    let x = l.width;
    if ((this.contentDOMWidth != x || this.editorHeight != t.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = t.scrollDOM.clientHeight, c |= 8), a) {
      let v = t.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(v) && (o = !0), o || s.lineWrapping && Math.abs(x - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: M, charWidth: T, textHeight: N } = t.docView.measureTextSize();
        o = M > 0 && s.refresh(r, M, T, N, x / T, v), o && (t.docView.minWidth = 0, c |= 8);
      }
      m > 0 && g > 0 ? h = Math.max(m, g) : m < 0 && g < 0 && (h = Math.min(m, g)), s.heightChanged = !1;
      for (let M of this.viewports) {
        let T = M.from == this.viewport.from ? v : t.docView.measureVisibleLineHeights(M);
        this.heightMap = (o ? nt.empty().applyChanges(this.stateDeco, L.empty, this.heightOracle, [new mt(0, 0, 0, t.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new Rf(M.from, T));
      }
      s.heightChanged && (c |= 2);
    }
    let D = !this.viewportIsAppropriate(this.viewport, h) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return D && (c & 2 && (c |= this.updateScaler()), this.viewport = this.getViewport(h, this.scrollTarget), c |= this.updateForViewport()), (c & 2 || D) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, t)), c |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, t.docView.enforceCursorAssoc()), c;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(t, e) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new Pi(s.lineAt(o - i * 1e3, F.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - i) * 1e3, F.ByHeight, r, 0, 0).to);
    if (e) {
      let { head: c } = e.range;
      if (c < a.from || c > a.to) {
        let h = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(c, F.ByPos, r, 0, 0), u;
        e.y == "center" ? u = (f.top + f.bottom) / 2 - h / 2 : e.y == "start" || e.y == "nearest" && c < a.from ? u = f.top : u = f.bottom - h, a = new Pi(s.lineAt(u - 1e3 / 2, F.ByHeight, r, 0, 0).from, s.lineAt(u + h + 1e3 / 2, F.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(t, e) {
    let i = e.mapPos(t.from, -1), s = e.mapPos(t.to, 1);
    return new Pi(this.heightMap.lineAt(i, F.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, F.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: t, to: e }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(t, F.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(e, F.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (t == 0 || s <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (e == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(t, e) {
    if (!t.length || e.empty)
      return t;
    let i = [];
    for (let s of t)
      e.touchesRange(s.from, s.to) || i.push(new Vn(e.mapPos(s.from), e.mapPos(s.to), s.size));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(t, e) {
    let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != H.LTR && !i)
      return [];
    let l = [], a = (h, f, u, d) => {
      if (f - h < r)
        return;
      let p = this.state.selection.main, m = [p.from];
      p.empty || m.push(p.to);
      for (let y of m)
        if (y > h && y < f) {
          a(h, y - 10, u, d), a(y + 10, f, u, d);
          return;
        }
      let g = qf(t, (y) => y.from >= u.from && y.to <= u.to && Math.abs(y.from - h) < r && Math.abs(y.to - f) < r && !m.some((x) => y.from < x && y.to > x));
      if (!g) {
        if (f < u.to && e && i && e.visibleRanges.some((y) => y.from <= f && y.to >= f)) {
          let y = e.moveToLineBoundary(b.cursor(f), !1, !0).head;
          y > h && (f = y);
        }
        g = new Vn(h, f, this.gapSize(u, h, f, d));
      }
      l.push(g);
    }, c = (h) => {
      if (h.length < o || h.type != it.Text)
        return;
      let f = zf(h.from, h.to, this.stateDeco);
      if (f.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, p;
      if (i) {
        let m = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, y;
        if (u != null) {
          let x = Ri(f, u), D = ((this.visibleBottom - this.visibleTop) / 2 + m) / h.height;
          g = x - D, y = x + D;
        } else
          g = (this.visibleTop - h.top - m) / h.height, y = (this.visibleBottom - h.top + m) / h.height;
        d = Ei(f, g), p = Ei(f, y);
      } else {
        let m = f.total * this.heightOracle.charWidth, g = s * this.heightOracle.charWidth, y, x;
        if (u != null) {
          let D = Ri(f, u), v = ((this.pixelViewport.right - this.pixelViewport.left) / 2 + g) / m;
          y = D - v, x = D + v;
        } else
          y = (this.pixelViewport.left - g) / m, x = (this.pixelViewport.right + g) / m;
        d = Ei(f, y), p = Ei(f, x);
      }
      d > h.from && a(h.from, d, h, f), p < h.to && a(p, h.to, h, f);
    };
    for (let h of this.viewportLines)
      Array.isArray(h.type) ? h.type.forEach(c) : c(h);
    return l;
  }
  gapSize(t, e, i, s) {
    let r = Ri(s, i) - Ri(s, e);
    return this.heightOracle.lineWrapping ? t.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(t) {
    Vn.same(t, this.lineGaps) || (this.lineGaps = t, this.lineGapDeco = A.set(t.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges() {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let e = [];
    B.spans(t, this.viewport.from, this.viewport.to, {
      span(s, r) {
        e.push({ from: s, to: r });
      },
      point() {
      }
    }, 20);
    let i = e.length != this.visibleRanges.length || this.visibleRanges.some((s, r) => s.from != e[r].from || s.to != e[r].to);
    return this.visibleRanges = e, i ? 4 : 0;
  }
  lineBlockAt(t) {
    return t >= this.viewport.from && t <= this.viewport.to && this.viewportLines.find((e) => e.from <= t && e.to >= t) || Ue(this.heightMap.lineAt(t, F.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(t) {
    return t >= this.viewportLines[0].top && t <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((e) => e.top <= t && e.bottom >= t) || Ue(this.heightMap.lineAt(this.scaler.fromDOM(t), F.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(t) {
    let e = this.lineBlockAtHeight(t + 8);
    return e.from >= this.viewport.from || this.viewportLines[0].top - t > 200 ? e : this.viewportLines[0];
  }
  elementAtHeight(t) {
    return Ue(this.heightMap.blockAt(this.scaler.fromDOM(t), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Pi {
  constructor(t, e) {
    this.from = t, this.to = e;
  }
}
function zf(n, t, e) {
  let i = [], s = n, r = 0;
  return B.spans(e, n, t, {
    span() {
    },
    point(o, l) {
      o > s && (i.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < t && (i.push({ from: s, to: t }), r += t - s), { total: r, ranges: i };
}
function Ei({ total: n, ranges: t }, e) {
  if (e <= 0)
    return t[0].from;
  if (e >= 1)
    return t[t.length - 1].to;
  let i = Math.floor(n * e);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = t[s], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Ri(n, t) {
  let e = 0;
  for (let { from: i, to: s } of n.ranges) {
    if (t <= s) {
      e += t - i;
      break;
    }
    e += s - i;
  }
  return e / n.total;
}
function qf(n, t) {
  for (let e of n)
    if (t(e))
      return e;
}
const ro = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
class ir {
  constructor(t, e, i) {
    let s = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let c = e.lineAt(l, F.ByPos, t, 0, 0).top, h = e.lineAt(a, F.ByPos, t, 0, 0).bottom;
      return s += h - c, { from: l, to: a, top: c, bottom: h, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (e.height - s);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(t) {
    for (let e = 0, i = 0, s = 0; ; e++) {
      let r = e < this.viewports.length ? this.viewports[e] : null;
      if (!r || t < r.top)
        return s + (t - i) * this.scale;
      if (t <= r.bottom)
        return r.domTop + (t - r.top);
      i = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(t) {
    for (let e = 0, i = 0, s = 0; ; e++) {
      let r = e < this.viewports.length ? this.viewports[e] : null;
      if (!r || t < r.domTop)
        return i + (t - s) / this.scale;
      if (t <= r.domBottom)
        return r.top + (t - r.domTop);
      i = r.bottom, s = r.domBottom;
    }
  }
  eq(t) {
    return t instanceof ir ? this.scale == t.scale && this.viewports.length == t.viewports.length && this.viewports.every((e, i) => e.from == t.viewports[i].from && e.to == t.viewports[i].to) : !1;
  }
}
function Ue(n, t) {
  if (t.scale == 1)
    return n;
  let e = t.toDOM(n.top), i = t.toDOM(n.bottom);
  return new Mt(n.from, n.length, e, i - e, Array.isArray(n._content) ? n._content.map((s) => Ue(s, t)) : n._content);
}
const Ii = /* @__PURE__ */ C.define({ combine: (n) => n.join(" ") }), Ts = /* @__PURE__ */ C.define({ combine: (n) => n.indexOf(!0) > -1 }), Os = /* @__PURE__ */ Xt.newName(), ya = /* @__PURE__ */ Xt.newName(), ba = /* @__PURE__ */ Xt.newName(), wa = { "&light": "." + ya, "&dark": "." + ba };
function Bs(n, t, e) {
  return new Xt(t, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (s) => {
        if (s == "&")
          return n;
        if (!e || !e[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return e[s];
      }) : n + " " + i;
    }
  });
}
const Kf = /* @__PURE__ */ Bs("." + Os, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#444"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    insetInlineStart: 0,
    zIndex: 200
  },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    borderRight: "1px solid #ddd"
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top"
  },
  ".cm-highlightSpace:before": {
    content: "attr(data-display)",
    position: "absolute",
    pointerEvents: "none",
    color: "#888"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, wa), Ge = "￿";
class jf {
  constructor(t, e) {
    this.points = t, this.text = "", this.lineSeparator = e.facet(P.lineSeparator);
  }
  append(t) {
    this.text += t;
  }
  lineBreak() {
    this.text += Ge;
  }
  readRange(t, e) {
    if (!t)
      return this;
    let i = t.parentNode;
    for (let s = t; ; ) {
      this.findPointBefore(i, s);
      let r = this.text.length;
      this.readNode(s);
      let o = s.nextSibling;
      if (o == e)
        break;
      let l = R.get(s), a = R.get(o);
      (l && a ? l.breakAfter : (l ? l.breakAfter : nn(s)) || nn(o) && (s.nodeName != "BR" || s.cmIgnore) && this.text.length > r) && this.lineBreak(), s = o;
    }
    return this.findPointBefore(i, e), this;
  }
  readTextNode(t) {
    let e = t.nodeValue;
    for (let i of this.points)
      i.node == t && (i.pos = this.text.length + Math.min(i.offset, e.length));
    for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = e.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = s.exec(e)) && (r = l.index, o = l[0].length), this.append(e.slice(i, r < 0 ? e.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == t && a.pos > this.text.length && (a.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(t) {
    if (t.cmIgnore)
      return;
    let e = R.get(t), i = e && e.overrideDOMText;
    if (i != null) {
      this.findPointInside(t, i.length);
      for (let s = i.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else t.nodeType == 3 ? this.readTextNode(t) : t.nodeName == "BR" ? t.nextSibling && this.lineBreak() : t.nodeType == 1 && this.readRange(t.firstChild, null);
  }
  findPointBefore(t, e) {
    for (let i of this.points)
      i.node == t && t.childNodes[i.offset] == e && (i.pos = this.text.length);
  }
  findPointInside(t, e) {
    for (let i of this.points)
      (t.nodeType == 3 ? i.node == t : t.contains(i.node)) && (i.pos = this.text.length + (Uf(t, i.node, i.offset) ? e : 0));
  }
}
function Uf(n, t, e) {
  for (; ; ) {
    if (!t || e < It(t))
      return !1;
    if (t == n)
      return !0;
    e = ae(t) + 1, t = t.parentNode;
  }
}
class oo {
  constructor(t, e) {
    this.node = t, this.offset = e, this.pos = -1;
  }
}
class Gf {
  constructor(t, e, i, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = e > -1;
    let { impreciseHead: r, impreciseAnchor: o } = t.docView;
    if (t.state.readOnly && e > -1)
      this.newSel = null;
    else if (e > -1 && (this.bounds = t.docView.domBoundsAround(e, i, 0))) {
      let l = r || o ? [] : Yf(t), a = new jf(l, t.state);
      a.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = a.text, this.newSel = Qf(l, this.bounds.from);
    } else {
      let l = t.observer.selectionRange, a = r && r.node == l.focusNode && r.offset == l.focusOffset || !ps(t.contentDOM, l.focusNode) ? t.state.selection.main.head : t.docView.posFromDOM(l.focusNode, l.focusOffset), c = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !ps(t.contentDOM, l.anchorNode) ? t.state.selection.main.anchor : t.docView.posFromDOM(l.anchorNode, l.anchorOffset), h = t.viewport;
      if ((S.ios || S.chrome) && t.state.selection.main.empty && a != c && (h.from > 0 || h.to < t.state.doc.length)) {
        let f = Math.min(a, c), u = Math.max(a, c), d = h.from - f, p = h.to - u;
        (d == 0 || d == 1 || f == 0) && (p == 0 || p == -1 || u == t.state.doc.length) && (a = 0, c = t.state.doc.length);
      }
      this.newSel = b.single(c, a);
    }
  }
}
function xa(n, t) {
  let e, { newSel: i } = t, s = n.state.selection.main, r = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (t.bounds) {
    let { from: o, to: l } = t.bounds, a = s.from, c = null;
    (r === 8 || S.android && t.text.length < l - o) && (a = s.to, c = "end");
    let h = Jf(n.state.doc.sliceString(o, l, Ge), t.text, a - o, c);
    h && (S.chrome && r == 13 && h.toB == h.from + 2 && t.text.slice(h.from, h.toB) == Ge + Ge && h.toB--, e = {
      from: o + h.from,
      to: o + h.toA,
      insert: L.of(t.text.slice(h.from, h.toB).split(Ge))
    });
  } else i && (!n.hasFocus && n.state.facet($t) || i.main.eq(s)) && (i = null);
  if (!e && !i)
    return !1;
  if (!e && t.typeOver && !s.empty && i && i.main.empty ? e = { from: s.from, to: s.to, insert: n.state.doc.slice(s.from, s.to) } : e && e.from >= s.from && e.to <= s.to && (e.from != s.from || e.to != s.to) && s.to - s.from - (e.to - e.from) <= 4 ? e = {
    from: s.from,
    to: s.to,
    insert: n.state.doc.slice(s.from, e.from).append(e.insert).append(n.state.doc.slice(e.to, s.to))
  } : (S.mac || S.android) && e && e.from == e.to && e.from == s.head - 1 && /^\. ?$/.test(e.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && e.insert.length == 2 && (i = b.single(i.main.anchor - 1, i.main.head - 1)), e = { from: s.from, to: s.to, insert: L.of([" "]) }) : S.chrome && e && e.from == e.to && e.from == s.head && e.insert.toString() == `
 ` && n.lineWrapping && (i && (i = b.single(i.main.anchor - 1, i.main.head - 1)), e = { from: s.from, to: s.to, insert: L.of([" "]) }), e)
    return va(n, e, i, r);
  if (i && !i.main.eq(s)) {
    let o = !1, l = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = !0), l = n.inputState.lastSelectionOrigin), n.dispatch({ selection: i, scrollIntoView: o, userEvent: l }), !0;
  } else
    return !1;
}
function va(n, t, e, i = -1) {
  if (S.ios && n.inputState.flushIOSKey(t))
    return !0;
  let s = n.state.selection.main;
  if (S.android && (t.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (t.from == s.from || t.from == s.from - 1 && n.state.sliceDoc(t.from, s.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && ke(n.contentDOM, "Enter", 13) || (t.from == s.from - 1 && t.to == s.to && t.insert.length == 0 || i == 8 && t.insert.length < t.to - t.from && t.to > s.head) && ke(n.contentDOM, "Backspace", 8) || t.from == s.from && t.to == s.to + 1 && t.insert.length == 0 && ke(n.contentDOM, "Delete", 46)))
    return !0;
  let r = t.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, l = () => o || (o = Xf(n, t, e));
  return n.state.facet(Jl).some((a) => a(n, t.from, t.to, r, l)) || n.dispatch(l()), !0;
}
function Xf(n, t, e) {
  let i, s = n.state, r = s.selection.main;
  if (t.from >= r.from && t.to <= r.to && t.to - t.from >= (r.to - r.from) / 3 && (!e || e.main.empty && e.main.from == t.from + t.insert.length) && n.inputState.composing < 0) {
    let l = r.from < t.from ? s.sliceDoc(r.from, t.from) : "", a = r.to > t.to ? s.sliceDoc(t.to, r.to) : "";
    i = s.replaceSelection(n.state.toText(l + t.insert.sliceString(0, void 0, n.state.lineBreak) + a));
  } else {
    let l = s.changes(t), a = e && e.main.to <= l.newLength ? e.main : void 0;
    if (s.selection.ranges.length > 1 && n.inputState.composing >= 0 && t.to <= r.to && t.to >= r.to - 10) {
      let c = n.state.sliceDoc(t.from, t.to), h, f = e && oa(n, e.main.head);
      if (f) {
        let p = t.insert.length - (t.to - t.from);
        h = { from: f.from, to: f.to - p };
      } else
        h = n.state.doc.lineAt(r.head);
      let u = r.to - t.to, d = r.to - r.from;
      i = s.changeByRange((p) => {
        if (p.from == r.from && p.to == r.to)
          return { changes: l, range: a || p.map(l) };
        let m = p.to - u, g = m - c.length;
        if (p.to - p.from != d || n.state.sliceDoc(g, m) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        p.to >= h.from && p.from <= h.to)
          return { range: p };
        let y = s.changes({ from: g, to: m, insert: t.insert }), x = p.to - r.to;
        return {
          changes: y,
          range: a ? b.range(Math.max(0, a.anchor + x), Math.max(0, a.head + x)) : p.map(y)
        };
      });
    } else
      i = {
        changes: l,
        selection: a && s.selection.replaceRange(a)
      };
  }
  let o = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, o += ".compose", n.inputState.compositionFirstChange && (o += ".start", n.inputState.compositionFirstChange = !1)), s.update(i, { userEvent: o, scrollIntoView: !0 });
}
function Jf(n, t, e, i) {
  let s = Math.min(n.length, t.length), r = 0;
  for (; r < s && n.charCodeAt(r) == t.charCodeAt(r); )
    r++;
  if (r == s && n.length == t.length)
    return null;
  let o = n.length, l = t.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == t.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, r - Math.min(o, l));
    e -= o + a - r;
  }
  if (o < r && n.length < t.length) {
    let a = e <= r && e >= o ? r - e : 0;
    r -= a, l = r + (l - o), o = r;
  } else if (l < r) {
    let a = e <= r && e >= l ? r - e : 0;
    r -= a, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function Yf(n) {
  let t = [];
  if (n.root.activeElement != n.contentDOM)
    return t;
  let { anchorNode: e, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
  return e && (t.push(new oo(e, i)), (s != e || r != i) && t.push(new oo(s, r))), t;
}
function Qf(n, t) {
  if (n.length == 0)
    return null;
  let e = n[0].pos, i = n.length == 2 ? n[1].pos : e;
  return e > -1 && i > -1 ? b.single(e + t, i + t) : null;
}
const Zf = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, Wn = S.ie && S.ie_version <= 11;
class _f {
  constructor(t) {
    this.view = t, this.active = !1, this.editContext = null, this.selectionRange = new Nc(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = t.contentDOM, this.observer = new MutationObserver((e) => {
      for (let i of e)
        this.queue.push(i);
      (S.ie && S.ie_version <= 11 || S.ios && t.composing) && e.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && t.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(S.chrome && S.chrome_version < 126) && (this.editContext = new eu(t), t.state.facet($t) && (t.contentDOM.editContext = this.editContext.editContext)), Wn && (this.onCharData = (e) => {
      this.queue.push({
        target: e.target,
        type: "characterData",
        oldValue: e.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var e;
      ((e = this.view.docView) === null || e === void 0 ? void 0 : e.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(t.scrollDOM)), this.addWindowListeners(this.win = t.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((e) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), e.length > 0 && e[e.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((e) => {
      e.length > 0 && e[e.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(t) {
    this.view.inputState.runHandlers("scroll", t), this.intersecting && this.view.measure();
  }
  onScroll(t) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(t);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(t) {
    t.type == "change" && !t.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(t) {
    if (this.gapIntersection && (t.length != this.gaps.length || this.gaps.some((e, i) => e != t[i]))) {
      this.gapIntersection.disconnect();
      for (let e of t)
        this.gapIntersection.observe(e);
      this.gaps = t;
    }
  }
  onSelectionChange(t) {
    let e = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, s = this.selectionRange;
    if (i.state.facet($t) ? i.root.activeElement != this.dom : !Gi(i.dom, s))
      return;
    let r = s.anchorNode && i.docView.nearest(s.anchorNode);
    if (r && r.ignoreEvent(t)) {
      e || (this.selectionChanged = !1);
      return;
    }
    (S.ie && S.ie_version <= 11 || S.android && S.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && Qe(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: t } = this, e = ni(t.root);
    if (!e)
      return !1;
    let i = S.safari && t.root.nodeType == 11 && Pc(this.dom.ownerDocument) == this.dom && tu(this.view, e) || e;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let s = Gi(this.dom, i);
    return s && !this.selectionChanged && t.inputState.lastFocusTime > Date.now() - 200 && t.inputState.lastTouchTime < Date.now() - 300 && Hc(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, t.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), s && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(t, e) {
    this.selectionRange.set(t.node, t.offset, e.node, e.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let t = 0, e = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !e && t < this.scrollTargets.length && this.scrollTargets[t] == i ? t++ : e || (e = this.scrollTargets.slice(0, t)), e && e.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (t < this.scrollTargets.length && !e && (e = this.scrollTargets.slice(0, t)), e) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = e)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(t) {
    if (!this.active)
      return t();
    try {
      return this.stop(), t();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, Zf), Wn && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), Wn && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(t, e) {
    var i;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && ke(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
    }
    (!this.delayedAndroidKey || t == "Enter") && (this.delayedAndroidKey = {
      key: t,
      keyCode: e,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let t of this.observer.takeRecords())
      this.queue.push(t);
    return this.queue;
  }
  processRecords() {
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let e = -1, i = -1, s = !1;
    for (let r of t) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), e == -1 ? { from: e, to: i } = o : (e = Math.min(o.from, e), i = Math.max(o.to, i)));
    }
    return { from: e, to: i, typeOver: s };
  }
  readChange() {
    let { from: t, to: e, typeOver: i } = this.processRecords(), s = this.selectionChanged && Gi(this.dom, this.selectionRange);
    if (t < 0 && !s)
      return null;
    t > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Gf(this.view, t, e, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(t = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    t && this.readSelectionRange();
    let e = this.readChange();
    if (!e)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, s = xa(this.view, e);
    return this.view.state == i && (e.domChanged || e.newSel && !e.newSel.main.eq(this.view.state.selection.main)) && this.view.update([]), s;
  }
  readMutation(t) {
    let e = this.view.docView.nearest(t.target);
    if (!e || e.ignoreMutation(t))
      return null;
    if (e.markDirty(t.type == "attributes"), t.type == "attributes" && (e.flags |= 4), t.type == "childList") {
      let i = lo(e, t.previousSibling || t.target.previousSibling, -1), s = lo(e, t.nextSibling || t.target.nextSibling, 1);
      return {
        from: i ? e.posAfter(i) : e.posAtStart,
        to: s ? e.posBefore(s) : e.posAtEnd,
        typeOver: !1
      };
    } else return t.type == "characterData" ? { from: e.posAtStart, to: e.posAtEnd, typeOver: t.target.nodeValue == t.oldValue } : null;
  }
  setWindow(t) {
    t != this.win && (this.removeWindowListeners(this.win), this.win = t, this.addWindowListeners(this.win));
  }
  addWindowListeners(t) {
    t.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener("change", this.onPrint) : t.addEventListener("beforeprint", this.onPrint), t.addEventListener("scroll", this.onScroll), t.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(t) {
    t.removeEventListener("scroll", this.onScroll), t.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener("change", this.onPrint) : t.removeEventListener("beforeprint", this.onPrint), t.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(t) {
    this.editContext && (this.editContext.update(t), t.startState.facet($t) != t.state.facet($t) && (t.view.contentDOM.editContext = t.state.facet($t) ? this.editContext.editContext : null));
  }
  destroy() {
    var t, e, i;
    this.stop(), (t = this.intersection) === null || t === void 0 || t.disconnect(), (e = this.gapIntersection) === null || e === void 0 || e.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function lo(n, t, e) {
  for (; t; ) {
    let i = R.get(t);
    if (i && i.parent == n)
      return i;
    let s = t.parentNode;
    t = s != n.dom ? s : e > 0 ? t.nextSibling : t.previousSibling;
  }
  return null;
}
function ao(n, t) {
  let e = t.startContainer, i = t.startOffset, s = t.endContainer, r = t.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor);
  return Qe(o.node, o.offset, s, r) && ([e, i, s, r] = [s, r, e, i]), { anchorNode: e, anchorOffset: i, focusNode: s, focusOffset: r };
}
function tu(n, t) {
  if (t.getComposedRanges) {
    let s = t.getComposedRanges(n.root)[0];
    if (s)
      return ao(n, s);
  }
  let e = null;
  function i(s) {
    s.preventDefault(), s.stopImmediatePropagation(), e = s.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), e ? ao(n, e) : null;
}
class eu {
  constructor(t) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.resetRange(t.state);
    let e = this.editContext = new window.EditContext({
      text: t.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, t.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(t.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let { anchor: s } = t.state.selection.main, r = {
        from: this.toEditorPos(i.updateRangeStart),
        to: this.toEditorPos(i.updateRangeEnd),
        insert: L.of(i.text.split(`
`))
      };
      r.from == this.from && s < this.from ? r.from = s : r.to == this.to && s > this.to && (r.to = s), !(r.from == r.to && !r.insert.length) && (this.pendingContextChange = r, t.state.readOnly || va(t, r, b.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd))), this.pendingContextChange && (this.revertPending(t.state), this.setSelection(t.state)));
    }, this.handlers.characterboundsupdate = (i) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let a = t.coordsForChar(o);
        r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), s.push(r);
      }
      e.updateCharacterBounds(i.rangeStart, s);
    }, this.handlers.textformatupdate = (i) => {
      let s = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (o != "None" && l != "None") {
          let a = `text-decoration: underline ${o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${l == "Thin" ? 1 : 2}px`;
          s.push(A.mark({ attributes: { style: a } }).range(this.toEditorPos(r.rangeStart), this.toEditorPos(r.rangeEnd)));
        }
      }
      t.dispatch({ effects: ta.of(A.set(s)) });
    }, this.handlers.compositionstart = () => {
      t.inputState.composing < 0 && (t.inputState.composing = 0, t.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      t.inputState.composing = -1, t.inputState.compositionFirstChange = null;
    };
    for (let i in this.handlers)
      e.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let s = ni(i.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(t) {
    let e = 0, i = !1, s = this.pendingContextChange;
    return t.changes.iterChanges((r, o, l, a, c) => {
      if (i)
        return;
      let h = c.length - (o - r);
      if (s && o >= s.to)
        if (s.from == r && s.to == o && s.insert.eq(c)) {
          s = this.pendingContextChange = null, e += h, this.to += h;
          return;
        } else
          s = null, this.revertPending(t.state);
      if (r += e, o += e, o <= this.from)
        this.from += h, this.to += h;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + c.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), c.toString()), this.to += h;
      }
      e += h;
    }), s && !i && this.revertPending(t.state), !i;
  }
  update(t) {
    let e = this.pendingContextChange;
    !this.applyEdits(t) || !this.rangeIsValid(t.state) ? (this.pendingContextChange = null, this.resetRange(t.state), this.editContext.updateText(0, this.editContext.text.length, t.state.doc.sliceString(this.from, this.to)), this.setSelection(t.state)) : (t.docChanged || t.selectionSet || e) && this.setSelection(t.state), (t.geometryChanged || t.docChanged || t.selectionSet) && t.view.requestMeasure(this.measureReq);
  }
  resetRange(t) {
    let { head: e } = t.selection.main;
    this.from = Math.max(
      0,
      e - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      t.doc.length,
      e + 1e4
      /* CxVp.Margin */
    );
  }
  revertPending(t) {
    let e = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(e.from), this.toContextPos(e.from + e.insert.length), t.doc.sliceString(e.from, e.to));
  }
  setSelection(t) {
    let { main: e } = t.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, e.anchor))), s = this.toContextPos(e.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != s) && this.editContext.updateSelection(i, s);
  }
  rangeIsValid(t) {
    let { head: e } = t.selection.main;
    return !(this.from > 0 && e - this.from < 500 || this.to < t.doc.length && this.to - e < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(t) {
    return t + this.from;
  }
  toContextPos(t) {
    return t - this.from;
  }
  destroy() {
    for (let t in this.handlers)
      this.editContext.removeEventListener(t, this.handlers[t]);
  }
}
class k {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(t = {}) {
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), t.parent && t.parent.appendChild(this.dom);
    let { dispatch: e } = t;
    this.dispatchTransactions = t.dispatchTransactions || e && ((i) => i.forEach((s) => e(s, this))) || ((i) => this.update(i)), this.dispatch = this.dispatch.bind(this), this._root = t.root || Fc(t.parent) || document, this.viewState = new so(t.state || P.create(t)), t.scrollTo && t.scrollTo.is(Oi) && (this.viewState.scrollTarget = t.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Ke).map((i) => new Nn(i));
    for (let i of this.plugins)
      i.update(this);
    this.observer = new _f(this), this.inputState = new gf(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Wr(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure();
  }
  dispatch(...t) {
    let e = t.length == 1 && t[0] instanceof q ? t : t.length == 1 && Array.isArray(t[0]) ? t[0] : [this.state.update(...t)];
    this.dispatchTransactions(e, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let e = !1, i = !1, s, r = this.state;
    for (let u of t) {
      if (u.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    t.some((u) => u.annotation(da)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = pa(r, o), a || (l = 1));
    let c = this.observer.delayedAndroidKey, h = null;
    if (c ? (this.observer.clearDelayedAndroidKey(), h = this.observer.readChange(), (h && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (h = null)) : this.observer.clear(), r.facet(P.phrases) != this.state.facet(P.phrases))
      return this.setState(r);
    s = rn.create(this, r, t), s.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of t) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection;
          f = new Se(d.empty ? d : b.cursor(d.head, d.head > d.anchor ? -1 : 1));
        }
        for (let d of u.effects)
          d.is(Oi) && (f = d.value.clip(this.state));
      }
      this.viewState.update(s, f), this.bidiCache = on.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), e = this.docView.update(s), this.state.facet(je) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(e, t.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(Ii) != s.state.facet(Ii) && (this.viewState.mustMeasureContent = !0), (e || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), e && this.docViewUpdate(), !s.empty)
      for (let u of this.state.facet(Cs))
        try {
          u(s);
        } catch (d) {
          lt(this.state, d, "update listener");
        }
    (a || h) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), h && !xa(this, h) && c.force && ke(this.contentDOM, c.key, c.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = t;
      return;
    }
    this.updateState = 2;
    let e = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new so(t), this.plugins = t.facet(Ke).map((i) => new Nn(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new Wr(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    e && this.focus(), this.requestMeasure();
  }
  updatePlugins(t) {
    let e = t.startState.facet(Ke), i = t.state.facet(Ke);
    if (e != i) {
      let s = [];
      for (let r of i) {
        let o = e.indexOf(r);
        if (o < 0)
          s.push(new Nn(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = t, s.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != t && r.destroy(this);
      this.plugins = s, this.pluginMap.clear();
    } else
      for (let s of this.plugins)
        s.mustUpdate = t;
    for (let s = 0; s < this.plugins.length; s++)
      this.plugins[s].update(this);
    e != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let t of this.plugins) {
      let e = t.value;
      if (e && e.docViewUpdate)
        try {
          e.docViewUpdate(this);
        } catch (i) {
          lt(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(t = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, t && this.observer.forceFlush();
    let e = null, i = this.scrollDOM, s = i.scrollTop * this.scaleY, { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(s - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (Tl(i))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(s);
            r = d.from, o = d.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure(this);
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let c = [];
        a & 4 || ([this.measureRequests, c] = [c, this.measureRequests]);
        let h = c.map((d) => {
          try {
            return d.read(this);
          } catch (p) {
            return lt(this.state, p), ho;
          }
        }), f = rn.create(this, this.state, []), u = !1;
        f.flags |= a, e ? e.flags |= a : e = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let d = 0; d < c.length; d++)
          if (h[d] != ho)
            try {
              let p = c[d];
              p.write && p.write(h[d], this);
            } catch (p) {
              lt(this.state, p);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = (r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o;
              if (p > 1 || p < -1) {
                s = s + p, i.scrollTop = s / this.scaleY, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (e && !e.empty)
      for (let l of this.state.facet(Cs))
        l(e);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Os + " " + (this.state.facet(Ts) ? ba : ya) + " " + this.state.facet(Ii);
  }
  updateAttrs() {
    let t = co(this, ea, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), e = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      translate: "no",
      contenteditable: this.state.facet($t) ? "true" : "false",
      class: "cm-content",
      style: `${S.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (e["aria-readonly"] = "true"), co(this, _s, e);
    let i = this.observer.ignore(() => {
      let s = ws(this.contentDOM, this.contentAttrs, e), r = ws(this.dom, this.editorAttrs, t);
      return s || r;
    });
    return this.editorAttrs = t, this.contentAttrs = e, i;
  }
  showAnnouncements(t) {
    let e = !0;
    for (let i of t)
      for (let s of i.effects)
        if (s.is(k.announce)) {
          e && (this.announceDOM.textContent = ""), e = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(je);
    let t = this.state.facet(k.cspNonce);
    Xt.mount(this.root, this.styleModules.concat(Kf).reverse(), t ? { nonce: t } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(t) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), t) {
      if (this.measureRequests.indexOf(t) > -1)
        return;
      if (t.key != null) {
        for (let e = 0; e < this.measureRequests.length; e++)
          if (this.measureRequests[e].key === t.key) {
            this.measureRequests[e] = t;
            return;
          }
      }
      this.measureRequests.push(t);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(t) {
    let e = this.pluginMap.get(t);
    return (e === void 0 || e && e.spec != t) && this.pluginMap.set(t, e = this.plugins.find((i) => i.spec == t) || null), e && e.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(t) {
    return this.readMeasured(), this.viewState.elementAtHeight(t);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(t) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line breaks, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(t) {
    return this.viewState.lineBlockAt(t);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(t, e, i) {
    return Hn(this, t, Ur(this, t, e, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(t, e) {
    return Hn(this, t, Ur(this, t, e, (i) => pf(this, t.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(t, e) {
    let i = this.bidiSpans(t), s = this.textDirectionAt(t.from), r = i[e ? i.length - 1 : 0];
    return b.cursor(r.side(e, s) + t.from, r.forward(!e, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(t, e, i = !0) {
    return df(this, t, e, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(t, e, i) {
    return Hn(this, t, mf(this, t, e, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(t) {
    return this.docView.domAtPos(t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(t, e = 0) {
    return this.docView.posFromDOM(t, e);
  }
  posAtCoords(t, e = !0) {
    return this.readMeasured(), la(this, t, e);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(t, e = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(t, e);
    if (!i || i.left == i.right)
      return i;
    let s = this.state.doc.lineAt(t), r = this.bidiSpans(s), o = r[jt.find(r, t - s.from, -1, e)];
    return Sn(i, o.dir == H.LTR == e > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(t) {
    return this.readMeasured(), this.docView.coordsForChar(t);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(t) {
    return !this.state.facet(Ql) || t < this.viewport.from || t > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(t));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(t) {
    if (t.length > iu)
      return ql(t.length);
    let e = this.textDirectionAt(t.from), i;
    for (let r of this.bidiCache)
      if (r.from == t.from && r.dir == e && (r.fresh || zl(r.isolates, i = Vr(this, t))))
        return r.order;
    i || (i = Vr(this, t));
    let s = Yc(t.text, e, i);
    return this.bidiCache.push(new on(t.from, t.to, e, i, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var t;
    return (this.dom.ownerDocument.hasFocus() || S.safari && ((t = this.inputState) === null || t === void 0 ? void 0 : t.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Al(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(t) {
    this._root != t && (this._root = t, this.observer.setWindow((t.nodeType == 9 ? t : t.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let t of this.plugins)
      t.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(t, e = {}) {
    return Oi.of(new Se(typeof t == "number" ? b.cursor(t) : t, e.y, e.x, e.yMargin, e.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: t, scrollLeft: e } = this.scrollDOM, i = this.viewState.scrollAnchorAt(t);
    return Oi.of(new Se(b.cursor(i.from), "start", "start", i.top - t, e, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(t) {
    t == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof t == "boolean" ? this.inputState.tabFocusMode = t ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + t);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(t) {
    return $.define(() => ({}), { eventHandlers: t });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(t) {
    return $.define(() => ({}), { eventObservers: t });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(t, e) {
    let i = Xt.newName(), s = [Ii.of(i), je.of(Bs(`.${i}`, t))];
    return e && e.dark && s.push(Ts.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(t) {
    return Zt.lowest(je.of(Bs("." + Os, t, wa)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(t) {
    var e;
    let i = t.querySelector(".cm-content"), s = i && R.get(i) || R.get(t);
    return ((e = s == null ? void 0 : s.rootView) === null || e === void 0 ? void 0 : e.view) || null;
  }
}
k.styleModule = je;
k.inputHandler = Jl;
k.scrollHandler = _l;
k.focusChangeEffect = Yl;
k.perLineTextDirection = Ql;
k.exceptionSink = Xl;
k.updateListener = Cs;
k.editable = $t;
k.mouseSelectionStyle = Gl;
k.dragMovesSelection = Ul;
k.clickAddsSelectionRange = jl;
k.decorations = si;
k.outerDecorations = ia;
k.atomicRanges = tr;
k.bidiIsolatedRanges = na;
k.scrollMargins = sa;
k.darkTheme = Ts;
k.cspNonce = /* @__PURE__ */ C.define({ combine: (n) => n.length ? n[0] : "" });
k.contentAttributes = _s;
k.editorAttributes = ea;
k.lineWrapping = /* @__PURE__ */ k.contentAttributes.of({ class: "cm-lineWrapping" });
k.announce = /* @__PURE__ */ O.define();
const iu = 4096, ho = {};
class on {
  constructor(t, e, i, s, r, o) {
    this.from = t, this.to = e, this.dir = i, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(t, e) {
    if (e.empty && !t.some((r) => r.fresh))
      return t;
    let i = [], s = t.length ? t[t.length - 1].dir : H.LTR;
    for (let r = Math.max(0, t.length - 10); r < t.length; r++) {
      let o = t[r];
      o.dir == s && !e.touchesRange(o.from, o.to) && i.push(new on(e.mapPos(o.from, 1), e.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function co(n, t, e) {
  for (let i = n.state.facet(t), s = i.length - 1; s >= 0; s--) {
    let r = i[s], o = typeof r == "function" ? r(n) : r;
    o && bs(o, e);
  }
  return e;
}
const nu = S.mac ? "mac" : S.windows ? "win" : S.linux ? "linux" : "key";
function su(n, t) {
  const e = n.split(/-(?!$)/);
  let i = e[e.length - 1];
  i == "Space" && (i = " ");
  let s, r, o, l;
  for (let a = 0; a < e.length - 1; ++a) {
    const c = e[a];
    if (/^(cmd|meta|m)$/i.test(c))
      l = !0;
    else if (/^a(lt)?$/i.test(c))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(c))
      r = !0;
    else if (/^s(hift)?$/i.test(c))
      o = !0;
    else if (/^mod$/i.test(c))
      t == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + c);
  }
  return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Ni(n, t, e) {
  return t.altKey && (n = "Alt-" + n), t.ctrlKey && (n = "Ctrl-" + n), t.metaKey && (n = "Meta-" + n), e !== !1 && t.shiftKey && (n = "Shift-" + n), n;
}
const ru = /* @__PURE__ */ Zt.default(/* @__PURE__ */ k.domEventHandlers({
  keydown(n, t) {
    return Sa(ka(t.state), n, t, "editor");
  }
})), nr = /* @__PURE__ */ C.define({ enables: ru }), fo = /* @__PURE__ */ new WeakMap();
function ka(n) {
  let t = n.facet(nr), e = fo.get(t);
  return e || fo.set(t, e = au(t.reduce((i, s) => i.concat(s), []))), e;
}
function ou(n, t, e) {
  return Sa(ka(n.state), t, n, e);
}
let zt = null;
const lu = 4e3;
function au(n, t = nu) {
  let e = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, c, h) => {
    var f, u;
    let d = e[o] || (e[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((y) => su(y, t));
    for (let y = 1; y < p.length; y++) {
      let x = p.slice(0, y).join(" ");
      s(x, !0), d[x] || (d[x] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(D) => {
          let v = zt = { view: D, prefix: x, scope: o };
          return setTimeout(() => {
            zt == v && (zt = null);
          }, lu), !0;
        }]
      });
    }
    let m = p.join(" ");
    s(m, !1);
    let g = d[m] || (d[m] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && g.run.push(a), c && (g.preventDefault = !0), h && (g.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let c of l) {
        let h = e[c] || (e[c] = /* @__PURE__ */ Object.create(null));
        h._any || (h._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let u in h)
          h[u].run.push((d) => f(d, Ls));
      }
    let a = o[t] || o.key;
    if (a)
      for (let c of l)
        r(c, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(c, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return e;
}
let Ls = null;
function Sa(n, t, e, i) {
  Ls = t;
  let s = dc(t), r = J(s, 0), o = dt(r) == s.length && s != " ", l = "", a = !1, c = !1, h = !1;
  zt && zt.view == e && zt.scope == i && (l = zt.prefix + " ", ha.indexOf(t.keyCode) < 0 && (c = !0, zt = null));
  let f = /* @__PURE__ */ new Set(), u = (g) => {
    if (g) {
      for (let y of g.run)
        if (!f.has(y) && (f.add(y), y(e)))
          return g.stopPropagation && (h = !0), !0;
      g.preventDefault && (g.stopPropagation && (h = !0), c = !0);
    }
    return !1;
  }, d = n[i], p, m;
  return d && (u(d[l + Ni(s, t, !o)]) ? a = !0 : o && (t.altKey || t.metaKey || t.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(S.windows && t.ctrlKey && t.altKey) && (p = pc[t.keyCode]) && p != s ? (u(d[l + Ni(p, t, !0)]) || t.shiftKey && (m = mc[t.keyCode]) != s && m != p && u(d[l + Ni(m, t, !1)])) && (a = !0) : o && t.shiftKey && u(d[l + Ni(s, t, !0)]) && (a = !0), !a && u(d._any) && (a = !0)), c && (a = !0), a && h && t.stopPropagation(), Ls = null, a;
}
class yi {
  /**
  Create a marker with the given class and dimensions. If `width`
  is null, the DOM element will get no width style.
  */
  constructor(t, e, i, s, r) {
    this.className = t, this.left = e, this.top = i, this.width = s, this.height = r;
  }
  draw() {
    let t = document.createElement("div");
    return t.className = this.className, this.adjust(t), t;
  }
  update(t, e) {
    return e.className != this.className ? !1 : (this.adjust(t), !0);
  }
  adjust(t) {
    t.style.left = this.left + "px", t.style.top = this.top + "px", this.width != null && (t.style.width = this.width + "px"), t.style.height = this.height + "px";
  }
  eq(t) {
    return this.left == t.left && this.top == t.top && this.width == t.width && this.height == t.height && this.className == t.className;
  }
  /**
  Create a set of rectangles for the given selection range,
  assigning them theclass`className`. Will create a single
  rectangle for empty ranges, and a set of selection-style
  rectangles covering the range's content (in a bidi-aware
  way) for non-empty ones.
  */
  static forRange(t, e, i) {
    if (i.empty) {
      let s = t.coordsAtPos(i.head, i.assoc || 1);
      if (!s)
        return [];
      let r = Ca(t);
      return [new yi(e, s.left - r.left, s.top - r.top, null, s.bottom - s.top)];
    } else
      return hu(t, e, i);
  }
}
function Ca(n) {
  let t = n.scrollDOM.getBoundingClientRect();
  return { left: (n.textDirection == H.LTR ? t.left : t.right - n.scrollDOM.clientWidth * n.scaleX) - n.scrollDOM.scrollLeft * n.scaleX, top: t.top - n.scrollDOM.scrollTop * n.scaleY };
}
function uo(n, t, e, i) {
  let s = n.coordsAtPos(t, e * 2);
  if (!s)
    return i;
  let r = n.dom.getBoundingClientRect(), o = (s.top + s.bottom) / 2, l = n.posAtCoords({ x: r.left + 1, y: o }), a = n.posAtCoords({ x: r.right - 1, y: o });
  return l == null || a == null ? i : { from: Math.max(i.from, Math.min(l, a)), to: Math.min(i.to, Math.max(l, a)) };
}
function hu(n, t, e) {
  if (e.to <= n.viewport.from || e.from >= n.viewport.to)
    return [];
  let i = Math.max(e.from, n.viewport.from), s = Math.min(e.to, n.viewport.to), r = n.textDirection == H.LTR, o = n.contentDOM, l = o.getBoundingClientRect(), a = Ca(n), c = o.querySelector(".cm-line"), h = c && window.getComputedStyle(c), f = l.left + (h ? parseInt(h.paddingLeft) + Math.min(0, parseInt(h.textIndent)) : 0), u = l.right - (h ? parseInt(h.paddingRight) : 0), d = As(n, i), p = As(n, s), m = d.type == it.Text ? d : null, g = p.type == it.Text ? p : null;
  if (m && (n.lineWrapping || d.widgetLineBreaks) && (m = uo(n, i, 1, m)), g && (n.lineWrapping || p.widgetLineBreaks) && (g = uo(n, s, -1, g)), m && g && m.from == g.from && m.to == g.to)
    return x(D(e.from, e.to, m));
  {
    let M = m ? D(e.from, null, m) : v(d, !1), T = g ? D(null, e.to, g) : v(p, !0), N = [];
    return (m || d).to < (g || p).from - (m && g ? 1 : 0) || d.widgetLineBreaks > 1 && M.bottom + n.defaultLineHeight / 2 < T.top ? N.push(y(f, M.bottom, u, T.top)) : M.bottom < T.top && n.elementAtHeight((M.bottom + T.top) / 2).type == it.Text && (M.bottom = T.top = (M.bottom + T.top) / 2), x(M).concat(N).concat(x(T));
  }
  function y(M, T, N, G) {
    return new yi(
      t,
      M - a.left,
      T - a.top - 0.01,
      N - M,
      G - T + 0.01
      /* C.Epsilon */
    );
  }
  function x({ top: M, bottom: T, horizontal: N }) {
    let G = [];
    for (let Vt = 0; Vt < N.length; Vt += 2)
      G.push(y(N[Vt], M, N[Vt + 1], T));
    return G;
  }
  function D(M, T, N) {
    let G = 1e9, Vt = -1e9, Si = [];
    function Sr(te, Wt, ue, ee, Fe) {
      let Pt = n.coordsAtPos(te, te == N.to ? -2 : 2), Et = n.coordsAtPos(ue, ue == N.from ? 2 : -2);
      !Pt || !Et || (G = Math.min(Pt.top, Et.top, G), Vt = Math.max(Pt.bottom, Et.bottom, Vt), Fe == H.LTR ? Si.push(r && Wt ? f : Pt.left, r && ee ? u : Et.right) : Si.push(!r && ee ? f : Et.left, !r && Wt ? u : Pt.right));
    }
    let Ci = M ?? N.from, Mi = T ?? N.to;
    for (let te of n.visibleRanges)
      if (te.to > Ci && te.from < Mi)
        for (let Wt = Math.max(te.from, Ci), ue = Math.min(te.to, Mi); ; ) {
          let ee = n.state.doc.lineAt(Wt);
          for (let Fe of n.bidiSpans(ee)) {
            let Pt = Fe.from + ee.from, Et = Fe.to + ee.from;
            if (Pt >= ue)
              break;
            Et > Wt && Sr(Math.max(Pt, Wt), M == null && Pt <= Ci, Math.min(Et, ue), T == null && Et >= Mi, Fe.dir);
          }
          if (Wt = ee.to + 1, Wt >= ue)
            break;
        }
    return Si.length == 0 && Sr(Ci, M == null, Mi, T == null, n.textDirection), { top: G, bottom: Vt, horizontal: Si };
  }
  function v(M, T) {
    let N = l.top + (T ? M.top : M.bottom);
    return { top: N, bottom: N, horizontal: [] };
  }
}
function cu(n, t) {
  return n.constructor == t.constructor && n.eq(t);
}
class fu {
  constructor(t, e) {
    this.view = t, this.layer = e, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = { read: this.measure.bind(this), write: this.draw.bind(this) }, this.dom = t.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), e.above && this.dom.classList.add("cm-layer-above"), e.class && this.dom.classList.add(e.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(t.state), t.requestMeasure(this.measureReq), e.mount && e.mount(this.dom, t);
  }
  update(t) {
    t.startState.facet(Yi) != t.state.facet(Yi) && this.setOrder(t.state), (this.layer.update(t, this.dom) || t.geometryChanged) && (this.scale(), t.view.requestMeasure(this.measureReq));
  }
  docViewUpdate(t) {
    this.layer.updateOnDocViewUpdate !== !1 && t.requestMeasure(this.measureReq);
  }
  setOrder(t) {
    let e = 0, i = t.facet(Yi);
    for (; e < i.length && i[e] != this.layer; )
      e++;
    this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - e);
  }
  measure() {
    return this.layer.markers(this.view);
  }
  scale() {
    let { scaleX: t, scaleY: e } = this.view;
    (t != this.scaleX || e != this.scaleY) && (this.scaleX = t, this.scaleY = e, this.dom.style.transform = `scale(${1 / t}, ${1 / e})`);
  }
  draw(t) {
    if (t.length != this.drawn.length || t.some((e, i) => !cu(e, this.drawn[i]))) {
      let e = this.dom.firstChild, i = 0;
      for (let s of t)
        s.update && e && s.constructor && this.drawn[i].constructor && s.update(e, this.drawn[i]) ? (e = e.nextSibling, i++) : this.dom.insertBefore(s.draw(), e);
      for (; e; ) {
        let s = e.nextSibling;
        e.remove(), e = s;
      }
      this.drawn = t;
    }
  }
  destroy() {
    this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
  }
}
const Yi = /* @__PURE__ */ C.define();
function Ma(n) {
  return [
    $.define((t) => new fu(t, n)),
    Yi.of(n)
  ];
}
const Aa = !S.ios, ri = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0
    }, {
      cursorBlinkRate: (t, e) => Math.min(t, e),
      drawRangeCursor: (t, e) => t || e
    });
  }
});
function Zg(n = {}) {
  return [
    ri.of(n),
    uu,
    du,
    pu,
    Zl.of(!0)
  ];
}
function Da(n) {
  return n.startState.facet(ri) != n.state.facet(ri);
}
const uu = /* @__PURE__ */ Ma({
  above: !0,
  markers(n) {
    let { state: t } = n, e = t.facet(ri), i = [];
    for (let s of t.selection.ranges) {
      let r = s == t.selection.main;
      if (s.empty ? !r || Aa : e.drawRangeCursor) {
        let o = r ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", l = s.empty ? s : b.cursor(s.head, s.head > s.anchor ? -1 : 1);
        for (let a of yi.forRange(n, o, l))
          i.push(a);
      }
    }
    return i;
  },
  update(n, t) {
    n.transactions.some((i) => i.selection) && (t.style.animationName = t.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
    let e = Da(n);
    return e && po(n.state, t), n.docChanged || n.selectionSet || e;
  },
  mount(n, t) {
    po(t.state, n);
  },
  class: "cm-cursorLayer"
});
function po(n, t) {
  t.style.animationDuration = n.facet(ri).cursorBlinkRate + "ms";
}
const du = /* @__PURE__ */ Ma({
  above: !1,
  markers(n) {
    return n.state.selection.ranges.map((t) => t.empty ? [] : yi.forRange(n, "cm-selectionBackground", t)).reduce((t, e) => t.concat(e));
  },
  update(n, t) {
    return n.docChanged || n.selectionSet || n.viewportChanged || Da(n);
  },
  class: "cm-selectionLayer"
}), Ps = {
  ".cm-line": {
    "& ::selection, &::selection": { backgroundColor: "transparent !important" }
  },
  ".cm-content": {
    "& :focus": {
      caretColor: "initial !important",
      "&::selection, & ::selection": {
        backgroundColor: "Highlight !important"
      }
    }
  }
};
Aa && (Ps[".cm-line"].caretColor = Ps[".cm-content"].caretColor = "transparent !important");
const pu = /* @__PURE__ */ Zt.highest(/* @__PURE__ */ k.theme(Ps)), Ta = /* @__PURE__ */ O.define({
  map(n, t) {
    return n == null ? null : t.mapPos(n);
  }
}), Xe = /* @__PURE__ */ U.define({
  create() {
    return null;
  },
  update(n, t) {
    return n != null && (n = t.changes.mapPos(n)), t.effects.reduce((e, i) => i.is(Ta) ? i.value : e, n);
  }
}), mu = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.cursor = null, this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
  }
  update(n) {
    var t;
    let e = n.state.field(Xe);
    e == null ? this.cursor != null && ((t = this.cursor) === null || t === void 0 || t.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (n.startState.field(Xe) != e || n.docChanged || n.geometryChanged) && this.view.requestMeasure(this.measureReq));
  }
  readPos() {
    let { view: n } = this, t = n.state.field(Xe), e = t != null && n.coordsAtPos(t);
    if (!e)
      return null;
    let i = n.scrollDOM.getBoundingClientRect();
    return {
      left: e.left - i.left + n.scrollDOM.scrollLeft * n.scaleX,
      top: e.top - i.top + n.scrollDOM.scrollTop * n.scaleY,
      height: e.bottom - e.top
    };
  }
  drawCursor(n) {
    if (this.cursor) {
      let { scaleX: t, scaleY: e } = this.view;
      n ? (this.cursor.style.left = n.left / t + "px", this.cursor.style.top = n.top / e + "px", this.cursor.style.height = n.height / e + "px") : this.cursor.style.left = "-100000px";
    }
  }
  destroy() {
    this.cursor && this.cursor.remove();
  }
  setDropPos(n) {
    this.view.state.field(Xe) != n && this.view.dispatch({ effects: Ta.of(n) });
  }
}, {
  eventObservers: {
    dragover(n) {
      this.setDropPos(this.view.posAtCoords({ x: n.clientX, y: n.clientY }));
    },
    dragleave(n) {
      (n.target == this.view.contentDOM || !this.view.contentDOM.contains(n.relatedTarget)) && this.setDropPos(null);
    },
    dragend() {
      this.setDropPos(null);
    },
    drop() {
      this.setDropPos(null);
    }
  }
});
function _g() {
  return [Xe, mu];
}
function mo(n, t, e, i, s) {
  t.lastIndex = 0;
  for (let r = n.iterRange(e, i), o = e, l; !r.next().done; o += r.value.length)
    if (!r.lineBreak)
      for (; l = t.exec(r.value); )
        s(o + l.index, l);
}
function gu(n, t) {
  let e = n.visibleRanges;
  if (e.length == 1 && e[0].from == n.viewport.from && e[0].to == n.viewport.to)
    return e;
  let i = [];
  for (let { from: s, to: r } of e)
    s = Math.max(n.state.doc.lineAt(s).from, s - t), r = Math.min(n.state.doc.lineAt(r).to, r + t), i.length && i[i.length - 1].to >= s ? i[i.length - 1].to = r : i.push({ from: s, to: r });
  return i;
}
class yu {
  /**
  Create a decorator.
  */
  constructor(t) {
    const { regexp: e, decoration: i, decorate: s, boundary: r, maxLength: o = 1e3 } = t;
    if (!e.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    if (this.regexp = e, s)
      this.addMatch = (l, a, c, h) => s(h, c, c + l[0].length, l, a);
    else if (typeof i == "function")
      this.addMatch = (l, a, c, h) => {
        let f = i(l, a, c);
        f && h(c, c + l[0].length, f);
      };
    else if (i)
      this.addMatch = (l, a, c, h) => h(c, c + l[0].length, i);
    else
      throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
    this.boundary = r, this.maxLength = o;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(t) {
    let e = new Jt(), i = e.add.bind(e);
    for (let { from: s, to: r } of gu(t, this.maxLength))
      mo(t.state.doc, this.regexp, s, r, (o, l) => this.addMatch(l, t, o, i));
    return e.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(t, e) {
    let i = 1e9, s = -1;
    return t.docChanged && t.changes.iterChanges((r, o, l, a) => {
      a > t.view.viewport.from && l < t.view.viewport.to && (i = Math.min(l, i), s = Math.max(a, s));
    }), t.viewportChanged || s - i > 1e3 ? this.createDeco(t.view) : s > -1 ? this.updateRange(t.view, e.map(t.changes), i, s) : e;
  }
  updateRange(t, e, i, s) {
    for (let r of t.visibleRanges) {
      let o = Math.max(r.from, i), l = Math.min(r.to, s);
      if (l > o) {
        let a = t.state.doc.lineAt(o), c = a.to < l ? t.state.doc.lineAt(l) : a, h = Math.max(r.from, a.from), f = Math.min(r.to, c.to);
        if (this.boundary) {
          for (; o > a.from; o--)
            if (this.boundary.test(a.text[o - 1 - a.from])) {
              h = o;
              break;
            }
          for (; l < c.to; l++)
            if (this.boundary.test(c.text[l - c.from])) {
              f = l;
              break;
            }
        }
        let u = [], d, p = (m, g, y) => u.push(y.range(m, g));
        if (a == c)
          for (this.regexp.lastIndex = h - a.from; (d = this.regexp.exec(a.text)) && d.index < f - a.from; )
            this.addMatch(d, t, d.index + a.from, p);
        else
          mo(t.state.doc, this.regexp, h, f, (m, g) => this.addMatch(g, t, m, p));
        e = e.update({ filterFrom: h, filterTo: f, filter: (m, g) => m < h || g > f, add: u });
      }
    }
    return e;
  }
}
const Es = /x/.unicode != null ? "gu" : "g", bu = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]`, Es), wu = {
  0: "null",
  7: "bell",
  8: "backspace",
  10: "newline",
  11: "vertical tab",
  13: "carriage return",
  27: "escape",
  8203: "zero width space",
  8204: "zero width non-joiner",
  8205: "zero width joiner",
  8206: "left-to-right mark",
  8207: "right-to-left mark",
  8232: "line separator",
  8237: "left-to-right override",
  8238: "right-to-left override",
  8294: "left-to-right isolate",
  8295: "right-to-left isolate",
  8297: "pop directional isolate",
  8233: "paragraph separator",
  65279: "zero width no-break space",
  65532: "object replacement"
};
let $n = null;
function xu() {
  var n;
  if ($n == null && typeof document < "u" && document.body) {
    let t = document.body.style;
    $n = ((n = t.tabSize) !== null && n !== void 0 ? n : t.MozTabSize) != null;
  }
  return $n || !1;
}
const Qi = /* @__PURE__ */ C.define({
  combine(n) {
    let t = Ot(n, {
      render: null,
      specialChars: bu,
      addSpecialChars: null
    });
    return (t.replaceTabs = !xu()) && (t.specialChars = new RegExp("	|" + t.specialChars.source, Es)), t.addSpecialChars && (t.specialChars = new RegExp(t.specialChars.source + "|" + t.addSpecialChars.source, Es)), t;
  }
});
function t0(n = {}) {
  return [Qi.of(n), vu()];
}
let go = null;
function vu() {
  return go || (go = $.fromClass(class {
    constructor(n) {
      this.view = n, this.decorations = A.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(n.state.facet(Qi)), this.decorations = this.decorator.createDeco(n);
    }
    makeDecorator(n) {
      return new yu({
        regexp: n.specialChars,
        decoration: (t, e, i) => {
          let { doc: s } = e.state, r = J(t[0], 0);
          if (r == 9) {
            let o = s.lineAt(i), l = e.state.tabSize, a = Ee(o.text, l, i - o.from);
            return A.replace({
              widget: new Mu((l - a % l) * this.view.defaultCharacterWidth / this.view.scaleX)
            });
          }
          return this.decorationCache[r] || (this.decorationCache[r] = A.replace({ widget: new Cu(n, r) }));
        },
        boundary: n.replaceTabs ? void 0 : /[^]/
      });
    }
    update(n) {
      let t = n.state.facet(Qi);
      n.startState.facet(Qi) != t ? (this.decorator = this.makeDecorator(t), this.decorations = this.decorator.createDeco(n.view)) : this.decorations = this.decorator.updateDeco(n, this.decorations);
    }
  }, {
    decorations: (n) => n.decorations
  }));
}
const ku = "•";
function Su(n) {
  return n >= 32 ? ku : n == 10 ? "␤" : String.fromCharCode(9216 + n);
}
class Cu extends Bt {
  constructor(t, e) {
    super(), this.options = t, this.code = e;
  }
  eq(t) {
    return t.code == this.code;
  }
  toDOM(t) {
    let e = Su(this.code), i = t.state.phrase("Control character") + " " + (wu[this.code] || "0x" + this.code.toString(16)), s = this.options.render && this.options.render(this.code, i, e);
    if (s)
      return s;
    let r = document.createElement("span");
    return r.textContent = e, r.title = i, r.setAttribute("aria-label", i), r.className = "cm-specialChar", r;
  }
  ignoreEvent() {
    return !1;
  }
}
class Mu extends Bt {
  constructor(t) {
    super(), this.width = t;
  }
  eq(t) {
    return t.width == this.width;
  }
  toDOM() {
    let t = document.createElement("span");
    return t.textContent = "	", t.className = "cm-tab", t.style.width = this.width + "px", t;
  }
  ignoreEvent() {
    return !1;
  }
}
function e0() {
  return Du;
}
const Au = /* @__PURE__ */ A.line({ class: "cm-activeLine" }), Du = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let t = -1, e = [];
    for (let i of n.state.selection.ranges) {
      let s = n.lineBlockAt(i.head);
      s.from > t && (e.push(Au.range(s.from)), t = s.from);
    }
    return A.set(e);
  }
}, {
  decorations: (n) => n.decorations
});
class Tu extends Bt {
  constructor(t) {
    super(), this.content = t;
  }
  toDOM() {
    let t = document.createElement("span");
    return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : this.content), typeof this.content == "string" ? t.setAttribute("aria-label", "placeholder " + this.content) : t.setAttribute("aria-hidden", "true"), t;
  }
  coordsAt(t) {
    let e = t.firstChild ? De(t.firstChild) : [];
    if (!e.length)
      return null;
    let i = window.getComputedStyle(t.parentNode), s = Sn(e[0], i.direction != "rtl"), r = parseInt(i.lineHeight);
    return s.bottom - s.top > r * 1.5 ? { left: s.left, right: s.right, top: s.top, bottom: s.top + r } : s;
  }
  ignoreEvent() {
    return !1;
  }
}
function i0(n) {
  return $.fromClass(class {
    constructor(t) {
      this.view = t, this.placeholder = n ? A.set([A.widget({ widget: new Tu(n), side: 1 }).range(0)]) : A.none;
    }
    get decorations() {
      return this.view.state.doc.length ? A.none : this.placeholder;
    }
  }, { decorations: (t) => t.decorations });
}
const Rs = 2e3;
function Ou(n, t, e) {
  let i = Math.min(t.line, e.line), s = Math.max(t.line, e.line), r = [];
  if (t.off > Rs || e.off > Rs || t.col < 0 || e.col < 0) {
    let o = Math.min(t.off, e.off), l = Math.max(t.off, e.off);
    for (let a = i; a <= s; a++) {
      let c = n.doc.line(a);
      c.length <= l && r.push(b.range(c.from + o, c.to + l));
    }
  } else {
    let o = Math.min(t.col, e.col), l = Math.max(t.col, e.col);
    for (let a = i; a <= s; a++) {
      let c = n.doc.line(a), h = ds(c.text, o, n.tabSize, !0);
      if (h < 0)
        r.push(b.cursor(c.to));
      else {
        let f = ds(c.text, l, n.tabSize);
        r.push(b.range(c.from + h, c.from + f));
      }
    }
  }
  return r;
}
function Bu(n, t) {
  let e = n.coordsAtPos(n.viewport.from);
  return e ? Math.round(Math.abs((e.left - t) / n.defaultCharacterWidth)) : -1;
}
function yo(n, t) {
  let e = n.posAtCoords({ x: t.clientX, y: t.clientY }, !1), i = n.state.doc.lineAt(e), s = e - i.from, r = s > Rs ? -1 : s == i.length ? Bu(n, t.clientX) : Ee(i.text, n.state.tabSize, e - i.from);
  return { line: i.number, col: r, off: s };
}
function Lu(n, t) {
  let e = yo(n, t), i = n.state.selection;
  return e ? {
    update(s) {
      if (s.docChanged) {
        let r = s.changes.mapPos(s.startState.doc.line(e.line).from), o = s.state.doc.lineAt(r);
        e = { line: o.number, col: e.col, off: Math.min(e.off, o.length) }, i = i.map(s.changes);
      }
    },
    get(s, r, o) {
      let l = yo(n, s);
      if (!l)
        return i;
      let a = Ou(n.state, e, l);
      return a.length ? o ? b.create(a.concat(i.ranges)) : b.create(a) : i;
    }
  } : null;
}
function n0(n) {
  let t = (e) => e.altKey && e.button == 0;
  return k.mouseSelectionStyle.of((e, i) => t(i) ? Lu(e, i) : null);
}
const Pu = {
  Alt: [18, (n) => !!n.altKey],
  Control: [17, (n) => !!n.ctrlKey],
  Shift: [16, (n) => !!n.shiftKey],
  Meta: [91, (n) => !!n.metaKey]
}, Eu = { style: "cursor: crosshair" };
function s0(n = {}) {
  let [t, e] = Pu[n.key || "Alt"], i = $.fromClass(class {
    constructor(s) {
      this.view = s, this.isDown = !1;
    }
    set(s) {
      this.isDown != s && (this.isDown = s, this.view.update([]));
    }
  }, {
    eventObservers: {
      keydown(s) {
        this.set(s.keyCode == t || e(s));
      },
      keyup(s) {
        (s.keyCode == t || !e(s)) && this.set(!1);
      },
      mousemove(s) {
        this.set(e(s));
      }
    }
  });
  return [
    i,
    k.contentAttributes.of((s) => {
      var r;
      return !((r = s.plugin(i)) === null || r === void 0) && r.isDown ? Eu : null;
    })
  ];
}
const We = "-10000px";
class Oa {
  constructor(t, e, i, s) {
    this.facet = e, this.createTooltipView = i, this.removeTooltipView = s, this.input = t.state.facet(e), this.tooltips = this.input.filter((o) => o);
    let r = null;
    this.tooltipViews = this.tooltips.map((o) => r = i(o, r));
  }
  update(t, e) {
    var i;
    let s = t.state.facet(this.facet), r = s.filter((a) => a);
    if (s === this.input) {
      for (let a of this.tooltipViews)
        a.update && a.update(t);
      return !1;
    }
    let o = [], l = e ? [] : null;
    for (let a = 0; a < r.length; a++) {
      let c = r[a], h = -1;
      if (c) {
        for (let f = 0; f < this.tooltips.length; f++) {
          let u = this.tooltips[f];
          u && u.create == c.create && (h = f);
        }
        if (h < 0)
          o[a] = this.createTooltipView(c, a ? o[a - 1] : null), l && (l[a] = !!c.above);
        else {
          let f = o[a] = this.tooltipViews[h];
          l && (l[a] = e[h]), f.update && f.update(t);
        }
      }
    }
    for (let a of this.tooltipViews)
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
    return e && (l.forEach((a, c) => e[c] = a), e.length = l.length), this.input = s, this.tooltips = r, this.tooltipViews = o, !0;
  }
}
function Ru(n) {
  let { win: t } = n;
  return { top: 0, left: 0, bottom: t.innerHeight, right: t.innerWidth };
}
const zn = /* @__PURE__ */ C.define({
  combine: (n) => {
    var t, e, i;
    return {
      position: S.ios ? "absolute" : ((t = n.find((s) => s.position)) === null || t === void 0 ? void 0 : t.position) || "fixed",
      parent: ((e = n.find((s) => s.parent)) === null || e === void 0 ? void 0 : e.parent) || null,
      tooltipSpace: ((i = n.find((s) => s.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || Ru
    };
  }
}), bo = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let t = n.state.facet(zn);
    this.position = t.position, this.parent = t.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new Oa(n, rr, (e, i) => this.createTooltip(e, i), (e) => {
      this.resizeObserver && this.resizeObserver.unobserve(e.dom), e.dom.remove();
    }), this.above = this.manager.tooltips.map((e) => !!e.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((e) => {
      Date.now() > this.lastTransaction - 50 && e.length > 0 && e[e.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let t = this.manager.update(n, this.above);
    t && this.observeIntersection();
    let e = t || n.geometryChanged, i = n.state.facet(zn);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let s of this.manager.tooltipViews)
        s.dom.style.position = this.position;
      e = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let s of this.manager.tooltipViews)
        this.container.appendChild(s.dom);
      e = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    e && this.maybeMeasure();
  }
  createTooltip(n, t) {
    let e = n.create(this.view), i = t ? t.dom : null;
    if (e.dom.classList.add("cm-tooltip"), n.arrow && !e.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let s = document.createElement("div");
      s.className = "cm-tooltip-arrow", e.dom.appendChild(s);
    }
    return e.dom.style.position = this.position, e.dom.style.top = We, e.dom.style.left = "0px", this.container.insertBefore(e.dom, i), e.mount && e.mount(this.view), this.resizeObserver && this.resizeObserver.observe(e.dom), e;
  }
  destroy() {
    var n, t, e;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
    this.parent && this.container.remove(), (t = this.resizeObserver) === null || t === void 0 || t.disconnect(), (e = this.intersectionObserver) === null || e === void 0 || e.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = this.view.dom.getBoundingClientRect(), t = 1, e = 1, i = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: s } = this.manager.tooltipViews[0];
      if (S.gecko)
        i = s.offsetParent != this.container.ownerDocument.body;
      else if (s.style.top == We && s.style.left == "0px") {
        let r = s.getBoundingClientRect();
        i = Math.abs(r.top + 1e4) > 1 || Math.abs(r.left) > 1;
      }
    }
    if (i || this.position == "absolute")
      if (this.parent) {
        let s = this.parent.getBoundingClientRect();
        s.width && s.height && (t = s.width / this.parent.offsetWidth, e = s.height / this.parent.offsetHeight);
      } else
        ({ scaleX: t, scaleY: e } = this.view.viewState);
    return {
      editor: n,
      parent: this.parent ? this.container.getBoundingClientRect() : n,
      pos: this.manager.tooltips.map((s, r) => {
        let o = this.manager.tooltipViews[r];
        return o.getCoords ? o.getCoords(s.pos) : this.view.coordsAtPos(s.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: s }) => s.getBoundingClientRect()),
      space: this.view.state.facet(zn).tooltipSpace(this.view),
      scaleX: t,
      scaleY: e,
      makeAbsolute: i
    };
  }
  writeMeasure(n) {
    var t;
    if (n.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let l of this.manager.tooltipViews)
        l.dom.style.position = "absolute";
    }
    let { editor: e, space: i, scaleX: s, scaleY: r } = n, o = [];
    for (let l = 0; l < this.manager.tooltips.length; l++) {
      let a = this.manager.tooltips[l], c = this.manager.tooltipViews[l], { dom: h } = c, f = n.pos[l], u = n.size[l];
      if (!f || f.bottom <= Math.max(e.top, i.top) || f.top >= Math.min(e.bottom, i.bottom) || f.right < Math.max(e.left, i.left) - 0.1 || f.left > Math.min(e.right, i.right) + 0.1) {
        h.style.top = We;
        continue;
      }
      let d = a.arrow ? c.dom.querySelector(".cm-tooltip-arrow") : null, p = d ? 7 : 0, m = u.right - u.left, g = (t = bo.get(c)) !== null && t !== void 0 ? t : u.bottom - u.top, y = c.offset || Nu, x = this.view.textDirection == H.LTR, D = u.width > i.right - i.left ? x ? i.left : i.right - u.width : x ? Math.max(i.left, Math.min(f.left - (d ? 14 : 0) + y.x, i.right - m)) : Math.min(Math.max(i.left, f.left - m + (d ? 14 : 0) - y.x), i.right - m), v = this.above[l];
      !a.strictSide && (v ? f.top - (u.bottom - u.top) - y.y < i.top : f.bottom + (u.bottom - u.top) + y.y > i.bottom) && v == i.bottom - f.bottom > f.top - i.top && (v = this.above[l] = !v);
      let M = (v ? f.top - i.top : i.bottom - f.bottom) - p;
      if (M < g && c.resize !== !1) {
        if (M < this.view.defaultLineHeight) {
          h.style.top = We;
          continue;
        }
        bo.set(c, g), h.style.height = (g = M) / r + "px";
      } else h.style.height && (h.style.height = "");
      let T = v ? f.top - g - p - y.y : f.bottom + p + y.y, N = D + m;
      if (c.overlap !== !0)
        for (let G of o)
          G.left < N && G.right > D && G.top < T + g && G.bottom > T && (T = v ? G.top - g - 2 - p : G.bottom + p + 2);
      if (this.position == "absolute" ? (h.style.top = (T - n.parent.top) / r + "px", h.style.left = (D - n.parent.left) / s + "px") : (h.style.top = T / r + "px", h.style.left = D / s + "px"), d) {
        let G = f.left + (x ? y.x : -y.x) - (D + 14 - 7);
        d.style.left = G / s + "px";
      }
      c.overlap !== !0 && o.push({ left: D, top: T, right: N, bottom: T + g }), h.classList.toggle("cm-tooltip-above", v), h.classList.toggle("cm-tooltip-below", !v), c.positioned && c.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = We;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
}), Iu = /* @__PURE__ */ k.baseTheme({
  ".cm-tooltip": {
    zIndex: 100,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), Nu = { x: 0, y: 0 }, rr = /* @__PURE__ */ C.define({
  enables: [sr, Iu]
}), ln = /* @__PURE__ */ C.define({
  combine: (n) => n.reduce((t, e) => t.concat(e), [])
});
class Mn {
  // Needs to be static so that host tooltip instances always match
  static create(t) {
    return new Mn(t);
  }
  constructor(t) {
    this.view = t, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new Oa(t, ln, (e, i) => this.createHostedView(e, i), (e) => e.dom.remove());
  }
  createHostedView(t, e) {
    let i = t.create(this.view);
    return i.dom.classList.add("cm-tooltip-section"), this.dom.insertBefore(i.dom, e ? e.dom.nextSibling : this.dom.firstChild), this.mounted && i.mount && i.mount(this.view), i;
  }
  mount(t) {
    for (let e of this.manager.tooltipViews)
      e.mount && e.mount(t);
    this.mounted = !0;
  }
  positioned(t) {
    for (let e of this.manager.tooltipViews)
      e.positioned && e.positioned(t);
  }
  update(t) {
    this.manager.update(t);
  }
  destroy() {
    var t;
    for (let e of this.manager.tooltipViews)
      (t = e.destroy) === null || t === void 0 || t.call(e);
  }
  passProp(t) {
    let e;
    for (let i of this.manager.tooltipViews) {
      let s = i[t];
      if (s !== void 0) {
        if (e === void 0)
          e = s;
        else if (e !== s)
          return;
      }
    }
    return e;
  }
  get offset() {
    return this.passProp("offset");
  }
  get getCoords() {
    return this.passProp("getCoords");
  }
  get overlap() {
    return this.passProp("overlap");
  }
  get resize() {
    return this.passProp("resize");
  }
}
const Fu = /* @__PURE__ */ rr.compute([ln], (n) => {
  let t = n.facet(ln);
  return t.length === 0 ? null : {
    pos: Math.min(...t.map((e) => e.pos)),
    end: Math.max(...t.map((e) => {
      var i;
      return (i = e.end) !== null && i !== void 0 ? i : e.pos;
    })),
    create: Mn.create,
    above: t[0].above,
    arrow: t.some((e) => e.arrow)
  };
});
class Hu {
  constructor(t, e, i, s, r) {
    this.view = t, this.source = e, this.field = i, this.setHover = s, this.hoverTime = r, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = { x: 0, y: 0, target: t.dom, time: 0 }, this.checkHover = this.checkHover.bind(this), t.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), t.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
  }
  update() {
    this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
  }
  get active() {
    return this.view.state.field(this.field);
  }
  checkHover() {
    if (this.hoverTimeout = -1, this.active.length)
      return;
    let t = Date.now() - this.lastMove.time;
    t < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - t) : this.startHover();
  }
  startHover() {
    clearTimeout(this.restartTimeout);
    let { view: t, lastMove: e } = this, i = t.docView.nearest(e.target);
    if (!i)
      return;
    let s, r = 1;
    if (i instanceof Kt)
      s = i.posAtStart;
    else {
      if (s = t.posAtCoords(e), s == null)
        return;
      let l = t.coordsAtPos(s);
      if (!l || e.y < l.top || e.y > l.bottom || e.x < l.left - t.defaultCharacterWidth || e.x > l.right + t.defaultCharacterWidth)
        return;
      let a = t.bidiSpans(t.state.doc.lineAt(s)).find((h) => h.from <= s && h.to >= s), c = a && a.dir == H.RTL ? -1 : 1;
      r = e.x < l.left ? -c : c;
    }
    let o = this.source(t, s, r);
    if (o != null && o.then) {
      let l = this.pending = { pos: s };
      o.then((a) => {
        this.pending == l && (this.pending = null, a && !(Array.isArray(a) && !a.length) && t.dispatch({ effects: this.setHover.of(Array.isArray(a) ? a : [a]) }));
      }, (a) => lt(t.state, a, "hover tooltip"));
    } else o && !(Array.isArray(o) && !o.length) && t.dispatch({ effects: this.setHover.of(Array.isArray(o) ? o : [o]) });
  }
  get tooltip() {
    let t = this.view.plugin(sr), e = t ? t.manager.tooltips.findIndex((i) => i.create == Mn.create) : -1;
    return e > -1 ? t.manager.tooltipViews[e] : null;
  }
  mousemove(t) {
    var e, i;
    this.lastMove = { x: t.clientX, y: t.clientY, target: t.target, time: Date.now() }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
    let { active: s, tooltip: r } = this;
    if (s.length && r && !Vu(r.dom, t) || this.pending) {
      let { pos: o } = s[0] || this.pending, l = (i = (e = s[0]) === null || e === void 0 ? void 0 : e.end) !== null && i !== void 0 ? i : o;
      (o == l ? this.view.posAtCoords(this.lastMove) != o : !Wu(this.view, o, l, t.clientX, t.clientY)) && (this.view.dispatch({ effects: this.setHover.of([]) }), this.pending = null);
    }
  }
  mouseleave(t) {
    clearTimeout(this.hoverTimeout), this.hoverTimeout = -1;
    let { active: e } = this;
    if (e.length) {
      let { tooltip: i } = this;
      i && i.dom.contains(t.relatedTarget) ? this.watchTooltipLeave(i.dom) : this.view.dispatch({ effects: this.setHover.of([]) });
    }
  }
  watchTooltipLeave(t) {
    let e = (i) => {
      t.removeEventListener("mouseleave", e), this.active.length && !this.view.dom.contains(i.relatedTarget) && this.view.dispatch({ effects: this.setHover.of([]) });
    };
    t.addEventListener("mouseleave", e);
  }
  destroy() {
    clearTimeout(this.hoverTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
  }
}
const Fi = 4;
function Vu(n, t) {
  let e = n.getBoundingClientRect();
  return t.clientX >= e.left - Fi && t.clientX <= e.right + Fi && t.clientY >= e.top - Fi && t.clientY <= e.bottom + Fi;
}
function Wu(n, t, e, i, s, r) {
  let o = n.scrollDOM.getBoundingClientRect(), l = n.documentTop + n.documentPadding.top + n.contentHeight;
  if (o.left > i || o.right < i || o.top > s || Math.min(o.bottom, l) < s)
    return !1;
  let a = n.posAtCoords({ x: i, y: s }, !1);
  return a >= t && a <= e;
}
function $u(n, t = {}) {
  let e = O.define(), i = U.define({
    create() {
      return [];
    },
    update(s, r) {
      if (s.length && (t.hideOnChange && (r.docChanged || r.selection) ? s = [] : t.hideOn && (s = s.filter((o) => !t.hideOn(r, o))), r.docChanged)) {
        let o = [];
        for (let l of s) {
          let a = r.changes.mapPos(l.pos, -1, Y.TrackDel);
          if (a != null) {
            let c = Object.assign(/* @__PURE__ */ Object.create(null), l);
            c.pos = a, c.end != null && (c.end = r.changes.mapPos(c.end)), o.push(c);
          }
        }
        s = o;
      }
      for (let o of r.effects)
        o.is(e) && (s = o.value), o.is(zu) && (s = []);
      return s;
    },
    provide: (s) => ln.from(s)
  });
  return [
    i,
    $.define((s) => new Hu(
      s,
      n,
      i,
      e,
      t.hoverTime || 300
      /* Hover.Time */
    )),
    Fu
  ];
}
function Ba(n, t) {
  let e = n.plugin(sr);
  if (!e)
    return null;
  let i = e.manager.tooltips.indexOf(t);
  return i < 0 ? null : e.manager.tooltipViews[i];
}
const zu = /* @__PURE__ */ O.define(), wo = /* @__PURE__ */ C.define({
  combine(n) {
    let t, e;
    for (let i of n)
      t = t || i.topContainer, e = e || i.bottomContainer;
    return { topContainer: t, bottomContainer: e };
  }
});
function oi(n, t) {
  let e = n.plugin(La), i = e ? e.specs.indexOf(t) : -1;
  return i > -1 ? e.panels[i] : null;
}
const La = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.input = n.state.facet(li), this.specs = this.input.filter((e) => e), this.panels = this.specs.map((e) => e(n));
    let t = n.state.facet(wo);
    this.top = new Hi(n, !0, t.topContainer), this.bottom = new Hi(n, !1, t.bottomContainer), this.top.sync(this.panels.filter((e) => e.top)), this.bottom.sync(this.panels.filter((e) => !e.top));
    for (let e of this.panels)
      e.dom.classList.add("cm-panel"), e.mount && e.mount();
  }
  update(n) {
    let t = n.state.facet(wo);
    this.top.container != t.topContainer && (this.top.sync([]), this.top = new Hi(n.view, !0, t.topContainer)), this.bottom.container != t.bottomContainer && (this.bottom.sync([]), this.bottom = new Hi(n.view, !1, t.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let e = n.state.facet(li);
    if (e != this.input) {
      let i = e.filter((a) => a), s = [], r = [], o = [], l = [];
      for (let a of i) {
        let c = this.specs.indexOf(a), h;
        c < 0 ? (h = a(n.view), l.push(h)) : (h = this.panels[c], h.update && h.update(n)), s.push(h), (h.top ? r : o).push(h);
      }
      this.specs = i, this.panels = s, this.top.sync(r), this.bottom.sync(o);
      for (let a of l)
        a.dom.classList.add("cm-panel"), a.mount && a.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(n);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (n) => k.scrollMargins.of((t) => {
    let e = t.plugin(n);
    return e && { top: e.top.scrollMargin(), bottom: e.bottom.scrollMargin() };
  })
});
class Hi {
  constructor(t, e, i) {
    this.view = t, this.top = e, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(t) {
    for (let e of this.panels)
      e.destroy && t.indexOf(e) < 0 && e.destroy();
    this.panels = t, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
      let e = this.container || this.view.dom;
      e.insertBefore(this.dom, this.top ? e.firstChild : null);
    }
    let t = this.dom.firstChild;
    for (let e of this.panels)
      if (e.dom.parentNode == this.dom) {
        for (; t != e.dom; )
          t = xo(t);
        t = t.nextSibling;
      } else
        this.dom.insertBefore(e.dom, t);
    for (; t; )
      t = xo(t);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let t of this.classes.split(" "))
        t && this.container.classList.remove(t);
      for (let t of (this.classes = this.view.themeClasses).split(" "))
        t && this.container.classList.add(t);
    }
  }
}
function xo(n) {
  let t = n.nextSibling;
  return n.remove(), t;
}
const li = /* @__PURE__ */ C.define({
  enables: La
});
class Ft extends le {
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(t) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(t) {
  }
}
Ft.prototype.elementClass = "";
Ft.prototype.toDOM = void 0;
Ft.prototype.mapMode = Y.TrackBefore;
Ft.prototype.startSide = Ft.prototype.endSide = -1;
Ft.prototype.point = !0;
const Zi = /* @__PURE__ */ C.define(), qu = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => B.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {}
}, _e = /* @__PURE__ */ C.define();
function Ku(n) {
  return [Pa(), _e.of(Object.assign(Object.assign({}, qu), n))];
}
const vo = /* @__PURE__ */ C.define({
  combine: (n) => n.some((t) => t)
});
function Pa(n) {
  return [
    ju
  ];
}
const ju = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(_e).map((t) => new So(n, t));
    for (let t of this.gutters)
      this.dom.appendChild(t.dom);
    this.fixed = !n.state.facet(vo), this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  update(n) {
    if (this.updateGutters(n)) {
      let t = this.prevViewport, e = n.view.viewport, i = Math.min(t.to, e.to) - Math.max(t.from, e.from);
      this.syncGutters(i < (e.to - e.from) * 0.8);
    }
    n.geometryChanged && (this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px"), this.view.state.facet(vo) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : ""), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let t = this.dom.nextSibling;
    n && this.dom.remove();
    let e = B.iter(this.view.state.facet(Zi), this.view.viewport.from), i = [], s = this.gutters.map((r) => new Uu(r, this.view.viewport, -this.view.documentPadding.top));
    for (let r of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(r.type)) {
        let o = !0;
        for (let l of r.type)
          if (l.type == it.Text && o) {
            Is(e, i, l.from);
            for (let a of s)
              a.line(this.view, l, i);
            o = !1;
          } else if (l.widget)
            for (let a of s)
              a.widget(this.view, l);
      } else if (r.type == it.Text) {
        Is(e, i, r.from);
        for (let o of s)
          o.line(this.view, r, i);
      } else if (r.widget)
        for (let o of s)
          o.widget(this.view, r);
    for (let r of s)
      r.finish();
    n && this.view.scrollDOM.insertBefore(this.dom, t);
  }
  updateGutters(n) {
    let t = n.startState.facet(_e), e = n.state.facet(_e), i = n.docChanged || n.heightChanged || n.viewportChanged || !B.eq(n.startState.facet(Zi), n.state.facet(Zi), n.view.viewport.from, n.view.viewport.to);
    if (t == e)
      for (let s of this.gutters)
        s.update(n) && (i = !0);
    else {
      i = !0;
      let s = [];
      for (let r of e) {
        let o = t.indexOf(r);
        o < 0 ? s.push(new So(this.view, r)) : (this.gutters[o].update(n), s.push(this.gutters[o]));
      }
      for (let r of this.gutters)
        r.dom.remove(), s.indexOf(r) < 0 && r.destroy();
      for (let r of s)
        this.dom.appendChild(r.dom);
      this.gutters = s;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove();
  }
}, {
  provide: (n) => k.scrollMargins.of((t) => {
    let e = t.plugin(n);
    return !e || e.gutters.length == 0 || !e.fixed ? null : t.textDirection == H.LTR ? { left: e.dom.offsetWidth * t.scaleX } : { right: e.dom.offsetWidth * t.scaleX };
  })
});
function ko(n) {
  return Array.isArray(n) ? n : [n];
}
function Is(n, t, e) {
  for (; n.value && n.from <= e; )
    n.from == e && t.push(n.value), n.next();
}
class Uu {
  constructor(t, e, i) {
    this.gutter = t, this.height = i, this.i = 0, this.cursor = B.iter(t.markers, e.from);
  }
  addElement(t, e, i) {
    let { gutter: s } = this, r = (e.top - this.height) / t.scaleY, o = e.height / t.scaleY;
    if (this.i == s.elements.length) {
      let l = new Ea(t, o, r, i);
      s.elements.push(l), s.dom.appendChild(l.dom);
    } else
      s.elements[this.i].update(t, o, r, i);
    this.height = e.bottom, this.i++;
  }
  line(t, e, i) {
    let s = [];
    Is(this.cursor, s, e.from), i.length && (s = s.concat(i));
    let r = this.gutter.config.lineMarker(t, e, s);
    r && s.unshift(r);
    let o = this.gutter;
    s.length == 0 && !o.config.renderEmptyElements || this.addElement(t, e, s);
  }
  widget(t, e) {
    let i = this.gutter.config.widgetMarker(t, e.widget, e);
    i && this.addElement(t, e, [i]);
  }
  finish() {
    let t = this.gutter;
    for (; t.elements.length > this.i; ) {
      let e = t.elements.pop();
      t.dom.removeChild(e.dom), e.destroy();
    }
  }
}
class So {
  constructor(t, e) {
    this.view = t, this.config = e, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in e.domEventHandlers)
      this.dom.addEventListener(i, (s) => {
        let r = s.target, o;
        if (r != this.dom && this.dom.contains(r)) {
          for (; r.parentNode != this.dom; )
            r = r.parentNode;
          let a = r.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else
          o = s.clientY;
        let l = t.lineBlockAtHeight(o - t.documentTop);
        e.domEventHandlers[i](t, l, s) && s.preventDefault();
      });
    this.markers = ko(e.markers(t)), e.initialSpacer && (this.spacer = new Ea(t, 0, 0, [e.initialSpacer(t)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(t) {
    let e = this.markers;
    if (this.markers = ko(this.config.markers(t.view)), this.spacer && this.config.updateSpacer) {
      let s = this.config.updateSpacer(this.spacer.markers[0], t);
      s != this.spacer.markers[0] && this.spacer.update(t.view, 0, 0, [s]);
    }
    let i = t.view.viewport;
    return !B.eq(this.markers, e, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(t) : !1);
  }
  destroy() {
    for (let t of this.elements)
      t.destroy();
  }
}
class Ea {
  constructor(t, e, i, s) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(t, e, i, s);
  }
  update(t, e, i, s) {
    this.height != e && (this.height = e, this.dom.style.height = e + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Gu(this.markers, s) || this.setMarkers(t, s);
  }
  setMarkers(t, e) {
    let i = "cm-gutterElement", s = this.dom.firstChild;
    for (let r = 0, o = 0; ; ) {
      let l = o, a = r < e.length ? e[r++] : null, c = !1;
      if (a) {
        let h = a.elementClass;
        h && (i += " " + h);
        for (let f = o; f < this.markers.length; f++)
          if (this.markers[f].compare(a)) {
            l = f, c = !0;
            break;
          }
      } else
        l = this.markers.length;
      for (; o < l; ) {
        let h = this.markers[o++];
        if (h.toDOM) {
          h.destroy(s);
          let f = s.nextSibling;
          s.remove(), s = f;
        }
      }
      if (!a)
        break;
      a.toDOM && (c ? s = s.nextSibling : this.dom.insertBefore(a.toDOM(t), s)), c && o++;
    }
    this.dom.className = i, this.markers = e;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function Gu(n, t) {
  if (n.length != t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (!n[e].compare(t[e]))
      return !1;
  return !0;
}
const Xu = /* @__PURE__ */ C.define(), ye = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(t, e) {
        let i = Object.assign({}, t);
        for (let s in e) {
          let r = i[s], o = e[s];
          i[s] = r ? (l, a, c) => r(l, a, c) || o(l, a, c) : o;
        }
        return i;
      }
    });
  }
});
class qn extends Ft {
  constructor(t) {
    super(), this.number = t;
  }
  eq(t) {
    return this.number == t.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function Kn(n, t) {
  return n.state.facet(ye).formatNumber(t, n.state);
}
const Ju = /* @__PURE__ */ _e.compute([ye], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(t) {
    return t.state.facet(Xu);
  },
  lineMarker(t, e, i) {
    return i.some((s) => s.toDOM) ? null : new qn(Kn(t, t.state.doc.lineAt(e.from).number));
  },
  widgetMarker: () => null,
  lineMarkerChange: (t) => t.startState.facet(ye) != t.state.facet(ye),
  initialSpacer(t) {
    return new qn(Kn(t, Co(t.state.doc.lines)));
  },
  updateSpacer(t, e) {
    let i = Kn(e.view, Co(e.view.state.doc.lines));
    return i == t.number ? t : new qn(i);
  },
  domEventHandlers: n.facet(ye).domEventHandlers
}));
function r0(n = {}) {
  return [
    ye.of(n),
    Pa(),
    Ju
  ];
}
function Co(n) {
  let t = 9;
  for (; t < n; )
    t = t * 10 + 9;
  return t;
}
const Yu = /* @__PURE__ */ new class extends Ft {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), Qu = /* @__PURE__ */ Zi.compute(["selection"], (n) => {
  let t = [], e = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.head).from;
    s > e && (e = s, t.push(Yu.range(s)));
  }
  return B.of(t);
});
function o0() {
  return Qu;
}
var jn;
const be = /* @__PURE__ */ new gt();
function Ra(n) {
  return C.define({
    combine: n ? (t) => t.concat(n) : void 0
  });
}
const or = /* @__PURE__ */ new gt();
class wt {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(t, e, i = [], s = "") {
    this.data = t, this.name = s, P.prototype.hasOwnProperty("tree") || Object.defineProperty(P.prototype, "tree", { get() {
      return j(this);
    } }), this.parser = e, this.extension = [
      Qt.of(this),
      P.languageData.of((r, o, l) => {
        let a = Mo(r, o, l), c = a.type.prop(be);
        if (!c)
          return [];
        let h = r.facet(c), f = a.type.prop(or);
        if (f) {
          let u = a.resolve(o - a.from, l);
          for (let d of f)
            if (d.test(u, r)) {
              let p = r.facet(d.facet);
              return d.type == "replace" ? p : p.concat(h);
            }
        }
        return h;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(t, e, i = -1) {
    return Mo(t, e, i).type.prop(be) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(t) {
    let e = t.facet(Qt);
    if ((e == null ? void 0 : e.data) == this.data)
      return [{ from: 0, to: t.doc.length }];
    if (!e || !e.allowsNesting)
      return [];
    let i = [], s = (r, o) => {
      if (r.prop(be) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(gt.mounted);
      if (l) {
        if (l.tree.prop(be) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (s(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let c = r.children[a];
        c instanceof ge && s(c, r.positions[a] + o);
      }
    };
    return s(j(t), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
wt.setState = /* @__PURE__ */ O.define();
function Mo(n, t, e) {
  let i = n.facet(Qt), s = j(n).topNode;
  if (!i || i.allowsNesting)
    for (let r = s; r; r = r.enter(t, e, ll.ExcludeBuffers))
      r.type.isTop && (s = r);
  return s;
}
class an extends wt {
  constructor(t, e, i) {
    super(t, e, [], i), this.parser = e;
  }
  /**
  Define a language from a parser.
  */
  static define(t) {
    let e = Ra(t.languageData);
    return new an(e, t.parser.configure({
      props: [be.add((i) => i.isTop ? e : void 0)]
    }), t.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(t, e) {
    return new an(this.data, this.parser.configure(t), e || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function j(n) {
  let t = n.field(wt.state, !1);
  return t ? t.tree : ge.empty;
}
class Zu {
  /**
  Create an input object for the given document.
  */
  constructor(t) {
    this.doc = t, this.cursorPos = 0, this.string = "", this.cursor = t.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(t) {
    return this.string = this.cursor.next(t - this.cursorPos).value, this.cursorPos = t + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(t) {
    return this.syncTo(t), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(t, e) {
    let i = this.cursorPos - this.string.length;
    return t < i || e >= this.cursorPos ? this.doc.sliceString(t, e) : this.string.slice(t - i, e - i);
  }
}
let $e = null;
class hn {
  constructor(t, e, i = [], s, r, o, l, a) {
    this.parser = t, this.state = e, this.fragments = i, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new hn(t, e, [], ge.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new Zu(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(t, e) {
    return e != null && e >= this.state.doc.length && (e = void 0), this.tree != ge.empty && this.isDone(e ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof t == "number") {
        let s = Date.now() + t;
        t = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), e != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > e) && e < this.state.doc.length && this.parse.stopAt(e); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(Ki.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (e ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (t())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let t, e;
    this.parse && (t = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > t) && this.parse.stopAt(t), this.withContext(() => {
      for (; !(e = this.parse.advance()); )
        ;
    }), this.treeLen = t, this.tree = e, this.fragments = this.withoutTempSkipped(Ki.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(t) {
    let e = $e;
    $e = this;
    try {
      return t();
    } finally {
      $e = e;
    }
  }
  withoutTempSkipped(t) {
    for (let e; e = this.tempSkipped.pop(); )
      t = Ao(t, e.from, e.to);
    return t;
  }
  /**
  @internal
  */
  changes(t, e) {
    let { fragments: i, tree: s, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !t.empty) {
      let a = [];
      if (t.iterChangedRanges((c, h, f, u) => a.push({ fromA: c, toA: h, fromB: f, toB: u })), i = Ki.applyChanges(i, a), s = ge.empty, r = 0, o = { from: t.mapPos(o.from, -1), to: t.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let c of this.skipped) {
          let h = t.mapPos(c.from, 1), f = t.mapPos(c.to, -1);
          h < f && l.push({ from: h, to: f });
        }
      }
    }
    return new hn(this.parser, e, i, s, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(t) {
    if (this.viewport.from == t.from && this.viewport.to == t.to)
      return !1;
    this.viewport = t;
    let e = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: s, to: r } = this.skipped[i];
      s < t.to && r > t.from && (this.fragments = Ao(this.fragments, s, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= e ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(t, e) {
    this.skipped.push({ from: t, to: e });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(t) {
    return new class extends hc {
      createParse(e, i, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = $e;
            if (a) {
              for (let c of s)
                a.tempSkipped.push(c);
              t && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, t]) : t);
            }
            return this.parsedPos = o, new ge(Us.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(t) {
    t = Math.min(t, this.state.doc.length);
    let e = this.fragments;
    return this.treeLen >= t && e.length && e[0].from == 0 && e[0].to >= t;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return $e;
  }
}
function Ao(n, t, e) {
  return Ki.applyChanges(n, [{ fromA: t, toA: e, fromB: t, toB: e }]);
}
class Be {
  constructor(t) {
    this.context = t, this.tree = t.tree;
  }
  apply(t) {
    if (!t.docChanged && this.tree == this.context.tree)
      return this;
    let e = this.context.changes(t.changes, t.state), i = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), e.viewport.to);
    return e.work(20, i) || e.takeTree(), new Be(e);
  }
  static init(t) {
    let e = Math.min(3e3, t.doc.length), i = hn.create(t.facet(Qt).parser, t, { from: 0, to: e });
    return i.work(20, e) || i.takeTree(), new Be(i);
  }
}
wt.state = /* @__PURE__ */ U.define({
  create: Be.init,
  update(n, t) {
    for (let e of t.effects)
      if (e.is(wt.setState))
        return e.value;
    return t.startState.facet(Qt) != t.state.facet(Qt) ? Be.init(t.state) : n.apply(t);
  }
});
let Ia = (n) => {
  let t = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(t);
};
typeof requestIdleCallback < "u" && (Ia = (n) => {
  let t = -1, e = setTimeout(
    () => {
      t = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => t < 0 ? clearTimeout(e) : cancelIdleCallback(t);
});
const Un = typeof navigator < "u" && (!((jn = navigator.scheduling) === null || jn === void 0) && jn.isInputPending) ? () => navigator.scheduling.isInputPending() : null, _u = /* @__PURE__ */ $.fromClass(class {
  constructor(t) {
    this.view = t, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(t) {
    let e = this.view.state.field(wt.state).context;
    (e.updateViewport(t.view.viewport) || this.view.viewport.to > e.treeLen) && this.scheduleWork(), (t.docChanged || t.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(e);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: t } = this.view, e = t.field(wt.state);
    (e.tree != e.context.tree || !e.context.isDone(t.doc.length)) && (this.working = Ia(this.work));
  }
  work(t) {
    this.working = null;
    let e = Date.now();
    if (this.chunkEnd < e && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = e + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: s } } = this.view, r = i.field(wt.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, t && !Un ? Math.max(25, t.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && i.doc.length > s + 1e3, a = r.context.work(() => Un && Un() || Date.now() > o, s + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - e, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: wt.setState.of(new Be(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(t) {
    t.scheduleOn && (this.workScheduled++, t.scheduleOn.then(() => this.scheduleWork()).catch((e) => lt(this.view.state, e)).then(() => this.workScheduled--), t.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Qt = /* @__PURE__ */ C.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    wt.state,
    _u,
    k.contentAttributes.compute([n], (t) => {
      let e = t.facet(n);
      return e && e.name ? { "data-language": e.name } : {};
    })
  ]
});
class td {
  /**
  Create a language support object.
  */
  constructor(t, e = []) {
    this.language = t, this.support = e, this.extension = [t, e];
  }
}
const ed = /* @__PURE__ */ C.define(), An = /* @__PURE__ */ C.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let t = n[0];
    if (!t || /\S/.test(t) || Array.from(t).some((e) => e != t[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return t;
  }
});
function cn(n) {
  let t = n.facet(An);
  return t.charCodeAt(0) == 9 ? n.tabSize * t.length : t.length;
}
function ai(n, t) {
  let e = "", i = n.tabSize, s = n.facet(An)[0];
  if (s == "	") {
    for (; t >= i; )
      e += "	", t -= i;
    s = " ";
  }
  for (let r = 0; r < t; r++)
    e += s;
  return e;
}
function lr(n, t) {
  n instanceof P && (n = new Dn(n));
  for (let i of n.state.facet(ed)) {
    let s = i(n, t);
    if (s !== void 0)
      return s;
  }
  let e = j(n.state);
  return e.length >= t ? id(n, e, t) : null;
}
class Dn {
  /**
  Create an indent context.
  */
  constructor(t, e = {}) {
    this.state = t, this.options = e, this.unit = cn(t);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(t, e = 1) {
    let i = this.state.doc.lineAt(t), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
    return s != null && s >= i.from && s <= i.to ? r && s == t ? { text: "", from: t } : (e < 0 ? s < t : s <= t) ? { text: i.text.slice(s - i.from), from: s } : { text: i.text.slice(0, s - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(t, e = 1) {
    if (this.options.simulateDoubleBreak && t == this.options.simulateBreak)
      return "";
    let { text: i, from: s } = this.lineAt(t, e);
    return i.slice(t - s, Math.min(i.length, t + 100 - s));
  }
  /**
  Find the column for the given position.
  */
  column(t, e = 1) {
    let { text: i, from: s } = this.lineAt(t, e), r = this.countColumn(i, t - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
    return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(t, e = t.length) {
    return Ee(t, this.state.tabSize, e);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(t, e = 1) {
    let { text: i, from: s } = this.lineAt(t, e), r = this.options.overrideIndentation;
    if (r) {
      let o = r(s);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Na = /* @__PURE__ */ new gt();
function id(n, t, e) {
  let i = t.resolveStack(e), s = i.node.enterUnfinishedNodesBefore(e);
  if (s != i.node) {
    let r = [];
    for (let o = s; o != i.node; o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      i = { node: r[o], next: i };
  }
  return Fa(i, n, e);
}
function Fa(n, t, e) {
  for (let i = n; i; i = i.next) {
    let s = sd(i.node);
    if (s)
      return s(ar.create(t, e, i));
  }
  return 0;
}
function nd(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function sd(n) {
  let t = n.type.prop(Na);
  if (t)
    return t;
  let e = n.firstChild, i;
  if (e && (i = e.type.prop(gt.closedBy))) {
    let s = n.lastChild, r = s && i.indexOf(s.name) > -1;
    return (o) => Ha(o, !0, 1, void 0, r && !nd(o) ? s.from : void 0);
  }
  return n.parent == null ? rd : null;
}
function rd() {
  return 0;
}
class ar extends Dn {
  constructor(t, e, i) {
    super(t.state, t.options), this.base = t, this.pos = e, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new ar(t, e, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(t) {
    let e = this.state.doc.lineAt(t.from);
    for (; ; ) {
      let i = t.resolve(e.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (od(i, t))
        break;
      e = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(e.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return Fa(this.context.next, this.base, this.pos);
  }
}
function od(n, t) {
  for (let e = t; e; e = e.parent)
    if (n == e)
      return !0;
  return !1;
}
function ld(n) {
  let t = n.node, e = t.childAfter(t.from), i = t.lastChild;
  if (!e)
    return null;
  let s = n.options.simulateBreak, r = n.state.doc.lineAt(e.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let l = e.to; ; ) {
    let a = t.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped)
      return a.from < o ? e : null;
    l = a.to;
  }
}
function ad({ closing: n, align: t = !0, units: e = 1 }) {
  return (i) => Ha(i, t, e, n);
}
function Ha(n, t, e, i, s) {
  let r = n.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || s == n.pos + o, a = t ? ld(n) : null;
  return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * e);
}
const hd = (n) => n.baseIndent;
function Gn({ except: n, units: t = 1 } = {}) {
  return (e) => {
    let i = n && n.test(e.textAfter);
    return e.baseIndent + (i ? 0 : t * e.unit);
  };
}
const cd = 200;
function a0() {
  return P.transactionFilter.of((n) => {
    if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete"))
      return n;
    let t = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
    if (!t.length)
      return n;
    let e = n.newDoc, { head: i } = n.newSelection.main, s = e.lineAt(i);
    if (i > s.from + cd)
      return n;
    let r = e.sliceString(s.from, i);
    if (!t.some((c) => c.test(r)))
      return n;
    let { state: o } = n, l = -1, a = [];
    for (let { head: c } of o.selection.ranges) {
      let h = o.doc.lineAt(c);
      if (h.from == l)
        continue;
      l = h.from;
      let f = lr(o, h.from);
      if (f == null)
        continue;
      let u = /^\s*/.exec(h.text)[0], d = ai(o, f);
      u != d && a.push({ from: h.from, to: h.from + u.length, insert: d });
    }
    return a.length ? [n, { changes: a, sequential: !0 }] : n;
  });
}
const fd = /* @__PURE__ */ C.define(), Va = /* @__PURE__ */ new gt();
function ud(n) {
  let t = n.firstChild, e = n.lastChild;
  return t && t.to < e.from ? { from: t.to, to: e.type.isError ? n.to : e.from } : null;
}
function dd(n, t, e) {
  let i = j(n);
  if (i.length < e)
    return null;
  let s = i.resolveStack(e, 1), r = null;
  for (let o = s; o; o = o.next) {
    let l = o.node;
    if (l.to <= e || l.from > e)
      continue;
    if (r && l.from < t)
      break;
    let a = l.type.prop(Va);
    if (a && (l.to < i.length - 50 || i.length == n.doc.length || !pd(l))) {
      let c = a(l, n);
      c && c.from <= e && c.from >= t && c.to > e && (r = c);
    }
  }
  return r;
}
function pd(n) {
  let t = n.lastChild;
  return t && t.to == n.to && t.type.isError;
}
function fn(n, t, e) {
  for (let i of n.facet(fd)) {
    let s = i(n, t, e);
    if (s)
      return s;
  }
  return dd(n, t, e);
}
function Wa(n, t) {
  let e = t.mapPos(n.from, 1), i = t.mapPos(n.to, -1);
  return e >= i ? void 0 : { from: e, to: i };
}
const Tn = /* @__PURE__ */ O.define({ map: Wa }), bi = /* @__PURE__ */ O.define({ map: Wa });
function $a(n) {
  let t = [];
  for (let { head: e } of n.state.selection.ranges)
    t.some((i) => i.from <= e && i.to >= e) || t.push(n.lineBlockAt(e));
  return t;
}
const fe = /* @__PURE__ */ U.define({
  create() {
    return A.none;
  },
  update(n, t) {
    n = n.map(t.changes);
    for (let e of t.effects)
      if (e.is(Tn) && !md(n, e.value.from, e.value.to)) {
        let { preparePlaceholder: i } = t.state.facet(Ka), s = i ? A.replace({ widget: new vd(i(t.state, e.value)) }) : Do;
        n = n.update({ add: [s.range(e.value.from, e.value.to)] });
      } else e.is(bi) && (n = n.update({
        filter: (i, s) => e.value.from != i || e.value.to != s,
        filterFrom: e.value.from,
        filterTo: e.value.to
      }));
    if (t.selection) {
      let e = !1, { head: i } = t.selection.main;
      n.between(i, i, (s, r) => {
        s < i && r > i && (e = !0);
      }), e && (n = n.update({
        filterFrom: i,
        filterTo: i,
        filter: (s, r) => r <= i || s >= i
      }));
    }
    return n;
  },
  provide: (n) => k.decorations.from(n),
  toJSON(n, t) {
    let e = [];
    return n.between(0, t.doc.length, (i, s) => {
      e.push(i, s);
    }), e;
  },
  fromJSON(n) {
    if (!Array.isArray(n) || n.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let t = [];
    for (let e = 0; e < n.length; ) {
      let i = n[e++], s = n[e++];
      if (typeof i != "number" || typeof s != "number")
        throw new RangeError("Invalid JSON for fold state");
      t.push(Do.range(i, s));
    }
    return A.set(t, !0);
  }
});
function un(n, t, e) {
  var i;
  let s = null;
  return (i = n.field(fe, !1)) === null || i === void 0 || i.between(t, e, (r, o) => {
    (!s || s.from > r) && (s = { from: r, to: o });
  }), s;
}
function md(n, t, e) {
  let i = !1;
  return n.between(t, t, (s, r) => {
    s == t && r == e && (i = !0);
  }), i;
}
function za(n, t) {
  return n.field(fe, !1) ? t : t.concat(O.appendConfig.of(ja()));
}
const gd = (n) => {
  for (let t of $a(n)) {
    let e = fn(n.state, t.from, t.to);
    if (e)
      return n.dispatch({ effects: za(n.state, [Tn.of(e), qa(n, e)]) }), !0;
  }
  return !1;
}, yd = (n) => {
  if (!n.state.field(fe, !1))
    return !1;
  let t = [];
  for (let e of $a(n)) {
    let i = un(n.state, e.from, e.to);
    i && t.push(bi.of(i), qa(n, i, !1));
  }
  return t.length && n.dispatch({ effects: t }), t.length > 0;
};
function qa(n, t, e = !0) {
  let i = n.state.doc.lineAt(t.from).number, s = n.state.doc.lineAt(t.to).number;
  return k.announce.of(`${n.state.phrase(e ? "Folded lines" : "Unfolded lines")} ${i} ${n.state.phrase("to")} ${s}.`);
}
const bd = (n) => {
  let { state: t } = n, e = [];
  for (let i = 0; i < t.doc.length; ) {
    let s = n.lineBlockAt(i), r = fn(t, s.from, s.to);
    r && e.push(Tn.of(r)), i = (r ? n.lineBlockAt(r.to) : s).to + 1;
  }
  return e.length && n.dispatch({ effects: za(n.state, e) }), !!e.length;
}, wd = (n) => {
  let t = n.state.field(fe, !1);
  if (!t || !t.size)
    return !1;
  let e = [];
  return t.between(0, n.state.doc.length, (i, s) => {
    e.push(bi.of({ from: i, to: s }));
  }), n.dispatch({ effects: e }), !0;
}, h0 = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: gd },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: yd },
  { key: "Ctrl-Alt-[", run: bd },
  { key: "Ctrl-Alt-]", run: wd }
], xd = {
  placeholderDOM: null,
  preparePlaceholder: null,
  placeholderText: "…"
}, Ka = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, xd);
  }
});
function ja(n) {
  return [fe, Sd];
}
function Ua(n, t) {
  let { state: e } = n, i = e.facet(Ka), s = (o) => {
    let l = n.lineBlockAt(n.posAtDOM(o.target)), a = un(n.state, l.from, l.to);
    a && n.dispatch({ effects: bi.of(a) }), o.preventDefault();
  };
  if (i.placeholderDOM)
    return i.placeholderDOM(n, s, t);
  let r = document.createElement("span");
  return r.textContent = i.placeholderText, r.setAttribute("aria-label", e.phrase("folded code")), r.title = e.phrase("unfold"), r.className = "cm-foldPlaceholder", r.onclick = s, r;
}
const Do = /* @__PURE__ */ A.replace({ widget: /* @__PURE__ */ new class extends Bt {
  toDOM(n) {
    return Ua(n, null);
  }
}() });
class vd extends Bt {
  constructor(t) {
    super(), this.value = t;
  }
  eq(t) {
    return this.value == t.value;
  }
  toDOM(t) {
    return Ua(t, this.value);
  }
}
const kd = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {},
  foldingChanged: () => !1
};
class Xn extends Ft {
  constructor(t, e) {
    super(), this.config = t, this.open = e;
  }
  eq(t) {
    return this.config == t.config && this.open == t.open;
  }
  toDOM(t) {
    if (this.config.markerDOM)
      return this.config.markerDOM(this.open);
    let e = document.createElement("span");
    return e.textContent = this.open ? this.config.openText : this.config.closedText, e.title = t.state.phrase(this.open ? "Fold line" : "Unfold line"), e;
  }
}
function c0(n = {}) {
  let t = Object.assign(Object.assign({}, kd), n), e = new Xn(t, !0), i = new Xn(t, !1), s = $.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(Qt) != o.state.facet(Qt) || o.startState.field(fe, !1) != o.state.field(fe, !1) || j(o.startState) != j(o.state) || t.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let l = new Jt();
      for (let a of o.viewportLineBlocks) {
        let c = un(o.state, a.from, a.to) ? i : fn(o.state, a.from, a.to) ? e : null;
        c && l.add(a.from, a.from, c);
      }
      return l.finish();
    }
  }), { domEventHandlers: r } = t;
  return [
    s,
    Ku({
      class: "cm-foldGutter",
      markers(o) {
        var l;
        return ((l = o.plugin(s)) === null || l === void 0 ? void 0 : l.markers) || B.empty;
      },
      initialSpacer() {
        return new Xn(t, !1);
      },
      domEventHandlers: Object.assign(Object.assign({}, r), { click: (o, l, a) => {
        if (r.click && r.click(o, l, a))
          return !0;
        let c = un(o.state, l.from, l.to);
        if (c)
          return o.dispatch({ effects: bi.of(c) }), !0;
        let h = fn(o.state, l.from, l.to);
        return h ? (o.dispatch({ effects: Tn.of(h) }), !0) : !1;
      } })
    }),
    ja()
  ];
}
const Sd = /* @__PURE__ */ k.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class wi {
  constructor(t, e) {
    this.specs = t;
    let i;
    function s(l) {
      let a = Xt.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
    }
    const r = typeof e.all == "string" ? e.all : e.all ? s(e.all) : void 0, o = e.scope;
    this.scope = o instanceof wt ? (l) => l.prop(be) == o.data : o ? (l) => l == o : void 0, this.style = ac(t.map((l) => ({
      tag: l.tag,
      class: l.class || s(Object.assign({}, l, { tag: null }))
    })), {
      all: r
    }).style, this.module = i ? new Xt(i) : null, this.themeType = e.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(t, e) {
    return new wi(t, e || {});
  }
}
const Ns = /* @__PURE__ */ C.define(), Ga = /* @__PURE__ */ C.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function Jn(n) {
  let t = n.facet(Ns);
  return t.length ? t : n.facet(Ga);
}
function Cd(n, t) {
  let e = [Ad], i;
  return n instanceof wi && (n.module && e.push(k.styleModule.of(n.module)), i = n.themeType), t != null && t.fallback ? e.push(Ga.of(n)) : i ? e.push(Ns.computeN([k.darkTheme], (s) => s.facet(k.darkTheme) == (i == "dark") ? [n] : [])) : e.push(Ns.of(n)), e;
}
class Md {
  constructor(t) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = j(t.state), this.decorations = this.buildDeco(t, Jn(t.state)), this.decoratedTo = t.viewport.to;
  }
  update(t) {
    let e = j(t.state), i = Jn(t.state), s = i != Jn(t.startState), { viewport: r } = t.view, o = t.changes.mapPos(this.decoratedTo, 1);
    e.length < r.to && !s && e.type == this.tree.type && o >= r.to ? (this.decorations = this.decorations.map(t.changes), this.decoratedTo = o) : (e != this.tree || t.viewportChanged || s) && (this.tree = e, this.decorations = this.buildDeco(t.view, i), this.decoratedTo = r.to);
  }
  buildDeco(t, e) {
    if (!e || !this.tree.length)
      return A.none;
    let i = new Jt();
    for (let { from: s, to: r } of t.visibleRanges)
      cc(this.tree, e, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = A.mark({ class: a })));
      }, s, r);
    return i.finish();
  }
}
const Ad = /* @__PURE__ */ Zt.high(/* @__PURE__ */ $.fromClass(Md, {
  decorations: (n) => n.decorations
})), f0 = /* @__PURE__ */ wi.define([
  {
    tag: w.meta,
    color: "#404740"
  },
  {
    tag: w.link,
    textDecoration: "underline"
  },
  {
    tag: w.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: w.emphasis,
    fontStyle: "italic"
  },
  {
    tag: w.strong,
    fontWeight: "bold"
  },
  {
    tag: w.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: w.keyword,
    color: "#708"
  },
  {
    tag: [w.atom, w.bool, w.url, w.contentSeparator, w.labelName],
    color: "#219"
  },
  {
    tag: [w.literal, w.inserted],
    color: "#164"
  },
  {
    tag: [w.string, w.deleted],
    color: "#a11"
  },
  {
    tag: [w.regexp, w.escape, /* @__PURE__ */ w.special(w.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ w.definition(w.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ w.local(w.variableName),
    color: "#30a"
  },
  {
    tag: [w.typeName, w.namespace],
    color: "#085"
  },
  {
    tag: w.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ w.special(w.variableName), w.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ w.definition(w.propertyName),
    color: "#00c"
  },
  {
    tag: w.comment,
    color: "#940"
  },
  {
    tag: w.invalid,
    color: "#f00"
  }
]), Dd = /* @__PURE__ */ k.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Xa = 1e4, Ja = "()[]{}", Ya = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, {
      afterCursor: !0,
      brackets: Ja,
      maxScanDistance: Xa,
      renderMatch: Bd
    });
  }
}), Td = /* @__PURE__ */ A.mark({ class: "cm-matchingBracket" }), Od = /* @__PURE__ */ A.mark({ class: "cm-nonmatchingBracket" });
function Bd(n) {
  let t = [], e = n.matched ? Td : Od;
  return t.push(e.range(n.start.from, n.start.to)), n.end && t.push(e.range(n.end.from, n.end.to)), t;
}
const Ld = /* @__PURE__ */ U.define({
  create() {
    return A.none;
  },
  update(n, t) {
    if (!t.docChanged && !t.selection)
      return n;
    let e = [], i = t.state.facet(Ya);
    for (let s of t.state.selection.ranges) {
      if (!s.empty)
        continue;
      let r = At(t.state, s.head, -1, i) || s.head > 0 && At(t.state, s.head - 1, 1, i) || i.afterCursor && (At(t.state, s.head, 1, i) || s.head < t.state.doc.length && At(t.state, s.head + 1, -1, i));
      r && (e = e.concat(i.renderMatch(r, t.state)));
    }
    return A.set(e, !0);
  },
  provide: (n) => k.decorations.from(n)
}), Pd = [
  Ld,
  Dd
];
function u0(n = {}) {
  return [Ya.of(n), Pd];
}
const Ed = /* @__PURE__ */ new gt();
function Fs(n, t, e) {
  let i = n.prop(t < 0 ? gt.openedBy : gt.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let s = e.indexOf(n.name);
    if (s > -1 && s % 2 == (t < 0 ? 1 : 0))
      return [e[s + t]];
  }
  return null;
}
function Hs(n) {
  let t = n.type.prop(Ed);
  return t ? t(n.node) : n;
}
function At(n, t, e, i = {}) {
  let s = i.maxScanDistance || Xa, r = i.brackets || Ja, o = j(n), l = o.resolveInner(t, e);
  for (let a = l; a; a = a.parent) {
    let c = Fs(a.type, e, r);
    if (c && a.from < a.to) {
      let h = Hs(a);
      if (h && (e > 0 ? t >= h.from && t < h.to : t > h.from && t <= h.to))
        return Rd(n, t, e, a, h, c, r);
    }
  }
  return Id(n, t, e, o, l.type, s, r);
}
function Rd(n, t, e, i, s, r, o) {
  let l = i.parent, a = { from: s.from, to: s.to }, c = 0, h = l == null ? void 0 : l.cursor();
  if (h && (e < 0 ? h.childBefore(i.from) : h.childAfter(i.to)))
    do
      if (e < 0 ? h.to <= i.from : h.from >= i.to) {
        if (c == 0 && r.indexOf(h.type.name) > -1 && h.from < h.to) {
          let f = Hs(h);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (Fs(h.type, e, o))
          c++;
        else if (Fs(h.type, -e, o)) {
          if (c == 0) {
            let f = Hs(h);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          c--;
        }
      }
    while (e < 0 ? h.prevSibling() : h.nextSibling());
  return { start: a, matched: !1 };
}
function Id(n, t, e, i, s, r, o) {
  let l = e < 0 ? n.sliceDoc(t - 1, t) : n.sliceDoc(t, t + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != e > 0)
    return null;
  let c = { from: e < 0 ? t - 1 : t, to: e > 0 ? t + 1 : t }, h = n.doc.iterRange(t, e > 0 ? n.doc.length : 0), f = 0;
  for (let u = 0; !h.next().done && u <= r; ) {
    let d = h.value;
    e < 0 && (u += d.length);
    let p = t + u * e;
    for (let m = e > 0 ? 0 : d.length - 1, g = e > 0 ? d.length : -1; m != g; m += e) {
      let y = o.indexOf(d[m]);
      if (!(y < 0 || i.resolveInner(p + m, 1).type != s))
        if (y % 2 == 0 == e > 0)
          f++;
        else {
          if (f == 1)
            return { start: c, end: { from: p + m, to: p + m + 1 }, matched: y >> 1 == a >> 1 };
          f--;
        }
    }
    e > 0 && (u += d.length);
  }
  return h.done ? { start: c, matched: !1 } : null;
}
const Nd = /* @__PURE__ */ Object.create(null), To = [Us.none], Oo = [], Bo = /* @__PURE__ */ Object.create(null), Fd = /* @__PURE__ */ Object.create(null);
for (let [n, t] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  Fd[n] = /* @__PURE__ */ Hd(Nd, t);
function Yn(n, t) {
  Oo.indexOf(n) > -1 || (Oo.push(n), console.warn(t));
}
function Hd(n, t) {
  let e = [];
  for (let l of t.split(" ")) {
    let a = [];
    for (let c of l.split(".")) {
      let h = n[c] || w[c];
      h ? typeof h == "function" ? a.length ? a = a.map(h) : Yn(c, `Modifier ${c} used at start of tag`) : a.length ? Yn(c, `Tag ${c} used as modifier`) : a = Array.isArray(h) ? h : [h] : Yn(c, `Unknown highlighting tag ${c}`);
    }
    for (let c of a)
      e.push(c);
  }
  if (!e.length)
    return 0;
  let i = t.replace(/ /g, "_"), s = i + " " + e.map((l) => l.id), r = Bo[s];
  if (r)
    return r.id;
  let o = Bo[s] = Us.define({
    id: To.length,
    name: i,
    props: [lc({ [i]: e })]
  });
  return To.push(o), o.id;
}
H.RTL, H.LTR;
const Vd = (n) => {
  let { state: t } = n, e = t.doc.lineAt(t.selection.main.from), i = cr(n.state, e.from);
  return i.line ? Wd(n) : i.block ? zd(n) : !1;
};
function hr(n, t) {
  return ({ state: e, dispatch: i }) => {
    if (e.readOnly)
      return !1;
    let s = n(t, e);
    return s ? (i(e.update(s)), !0) : !1;
  };
}
const Wd = /* @__PURE__ */ hr(
  jd,
  0
  /* CommentOption.Toggle */
), $d = /* @__PURE__ */ hr(
  Qa,
  0
  /* CommentOption.Toggle */
), zd = /* @__PURE__ */ hr(
  (n, t) => Qa(n, t, Kd(t)),
  0
  /* CommentOption.Toggle */
);
function cr(n, t) {
  let e = n.languageDataAt("commentTokens", t);
  return e.length ? e[0] : {};
}
const ze = 50;
function qd(n, { open: t, close: e }, i, s) {
  let r = n.sliceDoc(i - ze, i), o = n.sliceDoc(s, s + ze), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, c = r.length - l;
  if (r.slice(c - t.length, c) == t && o.slice(a, a + e.length) == e)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let h, f;
  s - i <= 2 * ze ? h = f = n.sliceDoc(i, s) : (h = n.sliceDoc(i, i + ze), f = n.sliceDoc(s - ze, s));
  let u = /^\s*/.exec(h)[0].length, d = /\s*$/.exec(f)[0].length, p = f.length - d - e.length;
  return h.slice(u, u + t.length) == t && f.slice(p, p + e.length) == e ? {
    open: {
      pos: i + u + t.length,
      margin: /\s/.test(h.charAt(u + t.length)) ? 1 : 0
    },
    close: {
      pos: s - d - e.length,
      margin: /\s/.test(f.charAt(p - 1)) ? 1 : 0
    }
  } : null;
}
function Kd(n) {
  let t = [];
  for (let e of n.selection.ranges) {
    let i = n.doc.lineAt(e.from), s = e.to <= i.to ? i : n.doc.lineAt(e.to), r = t.length - 1;
    r >= 0 && t[r].to > i.from ? t[r].to = s.to : t.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: s.to });
  }
  return t;
}
function Qa(n, t, e = t.selection.ranges) {
  let i = e.map((r) => cr(t, r.from).block);
  if (!i.every((r) => r))
    return null;
  let s = e.map((r, o) => qd(t, i[o], r.from, r.to));
  if (n != 2 && !s.every((r) => r))
    return { changes: t.changes(e.map((r, o) => s[o] ? [] : [{ from: r.from, insert: i[o].open + " " }, { from: r.to, insert: " " + i[o].close }])) };
  if (n != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, l; o < s.length; o++)
      if (l = s[o]) {
        let a = i[o], { open: c, close: h } = l;
        r.push({ from: c.pos - a.open.length, to: c.pos + c.margin }, { from: h.pos - h.margin, to: h.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function jd(n, t, e = t.selection.ranges) {
  let i = [], s = -1;
  for (let { from: r, to: o } of e) {
    let l = i.length, a = 1e9, c = cr(t, r).line;
    if (c) {
      for (let h = r; h <= o; ) {
        let f = t.doc.lineAt(h);
        if (f.from > s && (r == o || o > f.from)) {
          s = f.from;
          let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, p = f.text.slice(u, u + c.length) == c ? u : -1;
          u < f.text.length && u < a && (a = u), i.push({ line: f, comment: p, token: c, indent: u, empty: d, single: !1 });
        }
        h = f.to + 1;
      }
      if (a < 1e9)
        for (let h = l; h < i.length; h++)
          i[h].indent < i[h].line.text.length && (i[h].indent = a);
      i.length == l + 1 && (i[l].single = !0);
    }
  }
  if (n != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: l, token: a, indent: c, empty: h, single: f } of i)
      (f || !h) && r.push({ from: l.from + c, insert: a + " " });
    let o = t.changes(r);
    return { changes: o, selection: t.selection.map(o, 1) };
  } else if (n != 1 && i.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let c = o.from + l, h = c + a.length;
        o.text[h - o.from] == " " && h++, r.push({ from: c, to: h });
      }
    return { changes: r };
  }
  return null;
}
const Vs = /* @__PURE__ */ Ht.define(), Ud = /* @__PURE__ */ Ht.define(), Gd = /* @__PURE__ */ C.define(), Za = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (t, e) => e
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (t, e) => (i, s) => t(i, s) || e(i, s)
    });
  }
}), _a = /* @__PURE__ */ U.define({
  create() {
    return Dt.empty;
  },
  update(n, t) {
    let e = t.state.facet(Za), i = t.annotation(Vs);
    if (i) {
      let a = at.fromTransaction(t, i.selection), c = i.side, h = c == 0 ? n.undone : n.done;
      return a ? h = dn(h, h.length, e.minDepth, a) : h = ih(h, t.startState.selection), new Dt(c == 0 ? i.rest : h, c == 0 ? h : i.rest);
    }
    let s = t.annotation(Ud);
    if ((s == "full" || s == "before") && (n = n.isolate()), t.annotation(q.addToHistory) === !1)
      return t.changes.empty ? n : n.addMapping(t.changes.desc);
    let r = at.fromTransaction(t), o = t.annotation(q.time), l = t.annotation(q.userEvent);
    return r ? n = n.addChanges(r, o, l, e, t) : t.selection && (n = n.addSelection(t.startState.selection, o, l, e.newGroupDelay)), (s == "full" || s == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((t) => t.toJSON()), undone: n.undone.map((t) => t.toJSON()) };
  },
  fromJSON(n) {
    return new Dt(n.done.map(at.fromJSON), n.undone.map(at.fromJSON));
  }
});
function d0(n = {}) {
  return [
    _a,
    Za.of(n),
    k.domEventHandlers({
      beforeinput(t, e) {
        let i = t.inputType == "historyUndo" ? th : t.inputType == "historyRedo" ? Ws : null;
        return i ? (t.preventDefault(), i(e)) : !1;
      }
    })
  ];
}
function On(n, t) {
  return function({ state: e, dispatch: i }) {
    if (!t && e.readOnly)
      return !1;
    let s = e.field(_a, !1);
    if (!s)
      return !1;
    let r = s.pop(n, e, t);
    return r ? (i(r), !0) : !1;
  };
}
const th = /* @__PURE__ */ On(0, !1), Ws = /* @__PURE__ */ On(1, !1), Xd = /* @__PURE__ */ On(0, !0), Jd = /* @__PURE__ */ On(1, !0);
class at {
  constructor(t, e, i, s, r) {
    this.changes = t, this.effects = e, this.mapped = i, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(t) {
    return new at(this.changes, this.effects, this.mapped, this.startSelection, t);
  }
  toJSON() {
    var t, e, i;
    return {
      changes: (t = this.changes) === null || t === void 0 ? void 0 : t.toJSON(),
      mapped: (e = this.mapped) === null || e === void 0 ? void 0 : e.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(t) {
    return new at(t.changes && K.fromJSON(t.changes), [], t.mapped && Tt.fromJSON(t.mapped), t.startSelection && b.fromJSON(t.startSelection), t.selectionsAfter.map(b.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(t, e) {
    let i = pt;
    for (let s of t.startState.facet(Gd)) {
      let r = s(t);
      r.length && (i = i.concat(r));
    }
    return !i.length && t.changes.empty ? null : new at(t.changes.invert(t.startState.doc), i, void 0, e || t.startState.selection, pt);
  }
  static selection(t) {
    return new at(void 0, pt, void 0, void 0, t);
  }
}
function dn(n, t, e, i) {
  let s = t + 1 > e + 20 ? t - e - 1 : 0, r = n.slice(s, t);
  return r.push(i), r;
}
function Yd(n, t) {
  let e = [], i = !1;
  return n.iterChangedRanges((s, r) => e.push(s, r)), t.iterChangedRanges((s, r, o, l) => {
    for (let a = 0; a < e.length; ) {
      let c = e[a++], h = e[a++];
      l >= c && o <= h && (i = !0);
    }
  }), i;
}
function Qd(n, t) {
  return n.ranges.length == t.ranges.length && n.ranges.filter((e, i) => e.empty != t.ranges[i].empty).length === 0;
}
function eh(n, t) {
  return n.length ? t.length ? n.concat(t) : n : t;
}
const pt = [], Zd = 200;
function ih(n, t) {
  if (n.length) {
    let e = n[n.length - 1], i = e.selectionsAfter.slice(Math.max(0, e.selectionsAfter.length - Zd));
    return i.length && i[i.length - 1].eq(t) ? n : (i.push(t), dn(n, n.length - 1, 1e9, e.setSelAfter(i)));
  } else
    return [at.selection([t])];
}
function _d(n) {
  let t = n[n.length - 1], e = n.slice();
  return e[n.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), e;
}
function Qn(n, t) {
  if (!n.length)
    return n;
  let e = n.length, i = pt;
  for (; e; ) {
    let s = tp(n[e - 1], t, i);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = n.slice(0, e);
      return r[e - 1] = s, r;
    } else
      t = s.mapped, e--, i = s.selectionsAfter;
  }
  return i.length ? [at.selection(i)] : pt;
}
function tp(n, t, e) {
  let i = eh(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(t)) : pt, e);
  if (!n.changes)
    return at.selection(i);
  let s = n.changes.map(t), r = t.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(r) : r;
  return new at(s, O.mapEffects(n.effects, t), o, n.startSelection.map(r), i);
}
const ep = /^(input\.type|delete)($|\.)/;
class Dt {
  constructor(t, e, i = 0, s = void 0) {
    this.done = t, this.undone = e, this.prevTime = i, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new Dt(this.done, this.undone) : this;
  }
  addChanges(t, e, i, s, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && t.changes && (!i || ep.test(i)) && (!l.selectionsAfter.length && e - this.prevTime < s.newGroupDelay && s.joinToEvent(r, Yd(l.changes, t.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = dn(o, o.length - 1, s.minDepth, new at(t.changes.compose(l.changes), eh(t.effects, l.effects), l.mapped, l.startSelection, pt)) : o = dn(o, o.length, s.minDepth, t), new Dt(o, pt, e, i);
  }
  addSelection(t, e, i, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : pt;
    return r.length > 0 && e - this.prevTime < s && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Qd(r[r.length - 1], t) ? this : new Dt(ih(this.done, t), this.undone, e, i);
  }
  addMapping(t) {
    return new Dt(Qn(this.done, t), Qn(this.undone, t), this.prevTime, this.prevUserEvent);
  }
  pop(t, e, i) {
    let s = t == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || e.selection;
    if (i && r.selectionsAfter.length)
      return e.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: Vs.of({ side: t, rest: _d(s), selection: o }),
        userEvent: t == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let l = s.length == 1 ? pt : s.slice(0, s.length - 1);
      return r.mapped && (l = Qn(l, r.mapped)), e.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: Vs.of({ side: t, rest: l, selection: o }),
        filter: !1,
        userEvent: t == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
Dt.empty = /* @__PURE__ */ new Dt(pt, pt);
const p0 = [
  { key: "Mod-z", run: th, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: Ws, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: Ws, preventDefault: !0 },
  { key: "Mod-u", run: Xd, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: Jd, preventDefault: !0 }
];
function Re(n, t) {
  return b.create(n.ranges.map(t), n.mainIndex);
}
function Lt(n, t) {
  return n.update({ selection: t, scrollIntoView: !0, userEvent: "select" });
}
function kt({ state: n, dispatch: t }, e) {
  let i = Re(n.selection, e);
  return i.eq(n.selection, !0) ? !1 : (t(Lt(n, i)), !0);
}
function Bn(n, t) {
  return b.cursor(t ? n.to : n.from);
}
function nh(n, t) {
  return kt(n, (e) => e.empty ? n.moveByChar(e, t) : Bn(e, t));
}
function et(n) {
  return n.textDirectionAt(n.state.selection.main.head) == H.LTR;
}
const sh = (n) => nh(n, !et(n)), rh = (n) => nh(n, et(n));
function oh(n, t) {
  return kt(n, (e) => e.empty ? n.moveByGroup(e, t) : Bn(e, t));
}
const ip = (n) => oh(n, !et(n)), np = (n) => oh(n, et(n));
function sp(n, t, e) {
  if (t.type.prop(e))
    return !0;
  let i = t.to - t.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(t.from, t.to))) || t.firstChild;
}
function Ln(n, t, e) {
  let i = j(n).resolveInner(t.head), s = e ? gt.closedBy : gt.openedBy;
  for (let a = t.head; ; ) {
    let c = e ? i.childAfter(a) : i.childBefore(a);
    if (!c)
      break;
    sp(n, c, s) ? i = c : a = e ? c.to : c.from;
  }
  let r = i.type.prop(s), o, l;
  return r && (o = e ? At(n, i.from, 1) : At(n, i.to, -1)) && o.matched ? l = e ? o.end.to : o.end.from : l = e ? i.to : i.from, b.cursor(l, e ? -1 : 1);
}
const rp = (n) => kt(n, (t) => Ln(n.state, t, !et(n))), op = (n) => kt(n, (t) => Ln(n.state, t, et(n)));
function lh(n, t) {
  return kt(n, (e) => {
    if (!e.empty)
      return Bn(e, t);
    let i = n.moveVertically(e, t);
    return i.head != e.head ? i : n.moveToLineBoundary(e, t);
  });
}
const ah = (n) => lh(n, !1), hh = (n) => lh(n, !0);
function ch(n) {
  let t = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, e = 0, i = 0, s;
  if (t) {
    for (let r of n.state.facet(k.scrollMargins)) {
      let o = r(n);
      o != null && o.top && (e = Math.max(o == null ? void 0 : o.top, e)), o != null && o.bottom && (i = Math.max(o == null ? void 0 : o.bottom, i));
    }
    s = n.scrollDOM.clientHeight - e - i;
  } else
    s = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: e,
    marginBottom: i,
    selfScroll: t,
    height: Math.max(n.defaultLineHeight, s - 5)
  };
}
function fh(n, t) {
  let e = ch(n), { state: i } = n, s = Re(i.selection, (o) => o.empty ? n.moveVertically(o, t, e.height) : Bn(o, t));
  if (s.eq(i.selection))
    return !1;
  let r;
  if (e.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + e.marginTop, c = l.bottom - e.marginBottom;
    o && o.top > a && o.bottom < c && (r = k.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(Lt(i, s), { effects: r }), !0;
}
const Lo = (n) => fh(n, !1), $s = (n) => fh(n, !0);
function _t(n, t, e) {
  let i = n.lineBlockAt(t.head), s = n.moveToLineBoundary(t, e);
  if (s.head == t.head && s.head != (e ? i.to : i.from) && (s = n.moveToLineBoundary(t, e, !1)), !e && s.head == i.from && i.length) {
    let r = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    r && t.head != i.from + r && (s = b.cursor(i.from + r));
  }
  return s;
}
const lp = (n) => kt(n, (t) => _t(n, t, !0)), ap = (n) => kt(n, (t) => _t(n, t, !1)), hp = (n) => kt(n, (t) => _t(n, t, !et(n))), cp = (n) => kt(n, (t) => _t(n, t, et(n))), fp = (n) => kt(n, (t) => b.cursor(n.lineBlockAt(t.head).from, 1)), up = (n) => kt(n, (t) => b.cursor(n.lineBlockAt(t.head).to, -1));
function dp(n, t, e) {
  let i = !1, s = Re(n.selection, (r) => {
    let o = At(n, r.head, -1) || At(n, r.head, 1) || r.head > 0 && At(n, r.head - 1, 1) || r.head < n.doc.length && At(n, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    i = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return b.cursor(l);
  });
  return i ? (t(Lt(n, s)), !0) : !1;
}
const pp = ({ state: n, dispatch: t }) => dp(n, t);
function bt(n, t) {
  let e = Re(n.state.selection, (i) => {
    let s = t(i);
    return b.range(i.anchor, s.head, s.goalColumn, s.bidiLevel || void 0);
  });
  return e.eq(n.state.selection) ? !1 : (n.dispatch(Lt(n.state, e)), !0);
}
function uh(n, t) {
  return bt(n, (e) => n.moveByChar(e, t));
}
const dh = (n) => uh(n, !et(n)), ph = (n) => uh(n, et(n));
function mh(n, t) {
  return bt(n, (e) => n.moveByGroup(e, t));
}
const mp = (n) => mh(n, !et(n)), gp = (n) => mh(n, et(n)), yp = (n) => bt(n, (t) => Ln(n.state, t, !et(n))), bp = (n) => bt(n, (t) => Ln(n.state, t, et(n)));
function gh(n, t) {
  return bt(n, (e) => n.moveVertically(e, t));
}
const yh = (n) => gh(n, !1), bh = (n) => gh(n, !0);
function wh(n, t) {
  return bt(n, (e) => n.moveVertically(e, t, ch(n).height));
}
const Po = (n) => wh(n, !1), Eo = (n) => wh(n, !0), wp = (n) => bt(n, (t) => _t(n, t, !0)), xp = (n) => bt(n, (t) => _t(n, t, !1)), vp = (n) => bt(n, (t) => _t(n, t, !et(n))), kp = (n) => bt(n, (t) => _t(n, t, et(n))), Sp = (n) => bt(n, (t) => b.cursor(n.lineBlockAt(t.head).from)), Cp = (n) => bt(n, (t) => b.cursor(n.lineBlockAt(t.head).to)), Ro = ({ state: n, dispatch: t }) => (t(Lt(n, { anchor: 0 })), !0), Io = ({ state: n, dispatch: t }) => (t(Lt(n, { anchor: n.doc.length })), !0), No = ({ state: n, dispatch: t }) => (t(Lt(n, { anchor: n.selection.main.anchor, head: 0 })), !0), Fo = ({ state: n, dispatch: t }) => (t(Lt(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), Mp = ({ state: n, dispatch: t }) => (t(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), Ap = ({ state: n, dispatch: t }) => {
  let e = Pn(n).map(({ from: i, to: s }) => b.range(i, Math.min(s + 1, n.doc.length)));
  return t(n.update({ selection: b.create(e), userEvent: "select" })), !0;
}, Dp = ({ state: n, dispatch: t }) => {
  let e = Re(n.selection, (i) => {
    var s;
    let r = j(n).resolveStack(i.from, 1);
    for (let o = r; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && (!((s = l.parent) === null || s === void 0) && s.parent))
        return b.range(l.to, l.from);
    }
    return i;
  });
  return t(Lt(n, e)), !0;
}, Tp = ({ state: n, dispatch: t }) => {
  let e = n.selection, i = null;
  return e.ranges.length > 1 ? i = b.create([e.main]) : e.main.empty || (i = b.create([b.cursor(e.main.head)])), i ? (t(Lt(n, i)), !0) : !1;
};
function xi(n, t) {
  if (n.state.readOnly)
    return !1;
  let e = "delete.selection", { state: i } = n, s = i.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = t(r);
      a < o ? (e = "delete.backward", a = Vi(n, a, !1)) : a > o && (e = "delete.forward", a = Vi(n, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = Vi(n, o, !1), l = Vi(n, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: b.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (n.dispatch(i.update(s, {
    scrollIntoView: !0,
    userEvent: e,
    effects: e == "delete.selection" ? k.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function Vi(n, t, e) {
  if (n instanceof k)
    for (let i of n.state.facet(k.atomicRanges).map((s) => s(n)))
      i.between(t, t, (s, r) => {
        s < t && r > t && (t = e ? r : s);
      });
  return t;
}
const xh = (n, t, e) => xi(n, (i) => {
  let s = i.from, { state: r } = n, o = r.doc.lineAt(s), l, a;
  if (e && !t && s > o.from && s < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, s - o.from))) {
    if (l[l.length - 1] == "	")
      return s - 1;
    let c = Ee(l, r.tabSize), h = c % cn(r) || cn(r);
    for (let f = 0; f < h && l[l.length - 1 - f] == " "; f++)
      s--;
    a = s;
  } else
    a = Z(o.text, s - o.from, t, t) + o.from, a == s && o.number != (t ? r.doc.lines : 1) ? a += t ? 1 : -1 : !t && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = Z(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), zs = (n) => xh(n, !1, !0), vh = (n) => xh(n, !0, !1), kh = (n, t) => xi(n, (e) => {
  let i = e.head, { state: s } = n, r = s.doc.lineAt(i), o = s.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (t ? r.to : r.from)) {
      i == e.head && r.number != (t ? s.doc.lines : 1) && (i += t ? 1 : -1);
      break;
    }
    let a = Z(r.text, i - r.from, t) + r.from, c = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), h = o(c);
    if (l != null && h != l)
      break;
    (c != " " || i != e.head) && (l = h), i = a;
  }
  return i;
}), Sh = (n) => kh(n, !1), Op = (n) => kh(n, !0), Bp = (n) => xi(n, (t) => {
  let e = n.lineBlockAt(t.head).to;
  return t.head < e ? e : Math.min(n.state.doc.length, t.head + 1);
}), Lp = (n) => xi(n, (t) => {
  let e = n.moveToLineBoundary(t, !1).head;
  return t.head > e ? e : Math.max(0, t.head - 1);
}), Pp = (n) => xi(n, (t) => {
  let e = n.moveToLineBoundary(t, !0).head;
  return t.head < e ? e : Math.min(n.state.doc.length, t.head + 1);
}), Ep = ({ state: n, dispatch: t }) => {
  if (n.readOnly)
    return !1;
  let e = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: L.of(["", ""]) },
    range: b.cursor(i.from)
  }));
  return t(n.update(e, { scrollIntoView: !0, userEvent: "input" })), !0;
}, Rp = ({ state: n, dispatch: t }) => {
  if (n.readOnly)
    return !1;
  let e = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let s = i.from, r = n.doc.lineAt(s), o = s == r.from ? s - 1 : Z(r.text, s - r.from, !1) + r.from, l = s == r.to ? s + 1 : Z(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: n.doc.slice(s, l).append(n.doc.slice(o, s)) },
      range: b.cursor(l)
    };
  });
  return e.changes.empty ? !1 : (t(n.update(e, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Pn(n) {
  let t = [], e = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.from), r = n.doc.lineAt(i.to);
    if (!i.empty && i.to == r.from && (r = n.doc.lineAt(i.to - 1)), e >= s.number) {
      let o = t[t.length - 1];
      o.to = r.to, o.ranges.push(i);
    } else
      t.push({ from: s.from, to: r.to, ranges: [i] });
    e = r.number + 1;
  }
  return t;
}
function Ch(n, t, e) {
  if (n.readOnly)
    return !1;
  let i = [], s = [];
  for (let r of Pn(n)) {
    if (e ? r.to == n.doc.length : r.from == 0)
      continue;
    let o = n.doc.lineAt(e ? r.to + 1 : r.from - 1), l = o.length + 1;
    if (e) {
      i.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + n.lineBreak });
      for (let a of r.ranges)
        s.push(b.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: r.from }, { from: r.to, insert: n.lineBreak + o.text });
      for (let a of r.ranges)
        s.push(b.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (t(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: b.create(s, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const Ip = ({ state: n, dispatch: t }) => Ch(n, t, !1), Np = ({ state: n, dispatch: t }) => Ch(n, t, !0);
function Mh(n, t, e) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let s of Pn(n))
    e ? i.push({ from: s.from, insert: n.doc.slice(s.from, s.to) + n.lineBreak }) : i.push({ from: s.to, insert: n.lineBreak + n.doc.slice(s.from, s.to) });
  return t(n.update({ changes: i, scrollIntoView: !0, userEvent: "input.copyline" })), !0;
}
const Fp = ({ state: n, dispatch: t }) => Mh(n, t, !1), Hp = ({ state: n, dispatch: t }) => Mh(n, t, !0), Vp = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: t } = n, e = t.changes(Pn(t).map(({ from: s, to: r }) => (s > 0 ? s-- : r < t.doc.length && r++, { from: s, to: r }))), i = Re(t.selection, (s) => {
    let r;
    if (n.lineWrapping) {
      let o = n.lineBlockAt(s.head), l = n.coordsAtPos(s.head, s.assoc || 1);
      l && (r = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(s, !0, r);
  }).map(e);
  return n.dispatch({ changes: e, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Wp(n, t) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(t - 1, t + 1)))
    return { from: t, to: t };
  let e = j(n).resolveInner(t), i = e.childBefore(t), s = e.childAfter(t), r;
  return i && s && i.to <= t && s.from >= t && (r = i.type.prop(gt.closedBy)) && r.indexOf(s.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(s.from).from && !/\S/.test(n.sliceDoc(i.to, s.from)) ? { from: i.to, to: s.from } : null;
}
const $p = /* @__PURE__ */ Ah(!1), zp = /* @__PURE__ */ Ah(!0);
function Ah(n) {
  return ({ state: t, dispatch: e }) => {
    if (t.readOnly)
      return !1;
    let i = t.changeByRange((s) => {
      let { from: r, to: o } = s, l = t.doc.lineAt(r), a = !n && r == o && Wp(t, r);
      n && (r = o = (o <= l.to ? l : t.doc.lineAt(o)).to);
      let c = new Dn(t, { simulateBreak: r, simulateDoubleBreak: !!a }), h = lr(c, r);
      for (h == null && (h = Ee(/^\s*/.exec(t.doc.lineAt(r).text)[0], t.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let f = ["", ai(t, h)];
      return a && f.push(ai(t, c.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: L.of(f) },
        range: b.cursor(r + 1 + f[1].length)
      };
    });
    return e(t.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function fr(n, t) {
  let e = -1;
  return n.changeByRange((i) => {
    let s = [];
    for (let o = i.from; o <= i.to; ) {
      let l = n.doc.lineAt(o);
      l.number > e && (i.empty || i.to > l.from) && (t(l, s, i), e = l.number), o = l.to + 1;
    }
    let r = n.changes(s);
    return {
      changes: s,
      range: b.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const qp = ({ state: n, dispatch: t }) => {
  if (n.readOnly)
    return !1;
  let e = /* @__PURE__ */ Object.create(null), i = new Dn(n, { overrideIndentation: (r) => {
    let o = e[r];
    return o ?? -1;
  } }), s = fr(n, (r, o, l) => {
    let a = lr(i, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let c = /^\s*/.exec(r.text)[0], h = ai(n, a);
    (c != h || l.from < r.from + c.length) && (e[r.from] = a, o.push({ from: r.from, to: r.from + c.length, insert: h }));
  });
  return s.changes.empty || t(n.update(s, { userEvent: "indent" })), !0;
}, Dh = ({ state: n, dispatch: t }) => n.readOnly ? !1 : (t(n.update(fr(n, (e, i) => {
  i.push({ from: e.from, insert: n.facet(An) });
}), { userEvent: "input.indent" })), !0), Th = ({ state: n, dispatch: t }) => n.readOnly ? !1 : (t(n.update(fr(n, (e, i) => {
  let s = /^\s*/.exec(e.text)[0];
  if (!s)
    return;
  let r = Ee(s, n.tabSize), o = 0, l = ai(n, Math.max(0, r - cn(n)));
  for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: e.from + o, to: e.from + s.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), Kp = (n) => (n.setTabFocusMode(), !0), jp = [
  { key: "Ctrl-b", run: sh, shift: dh, preventDefault: !0 },
  { key: "Ctrl-f", run: rh, shift: ph },
  { key: "Ctrl-p", run: ah, shift: yh },
  { key: "Ctrl-n", run: hh, shift: bh },
  { key: "Ctrl-a", run: fp, shift: Sp },
  { key: "Ctrl-e", run: up, shift: Cp },
  { key: "Ctrl-d", run: vh },
  { key: "Ctrl-h", run: zs },
  { key: "Ctrl-k", run: Bp },
  { key: "Ctrl-Alt-h", run: Sh },
  { key: "Ctrl-o", run: Ep },
  { key: "Ctrl-t", run: Rp },
  { key: "Ctrl-v", run: $s }
], Up = /* @__PURE__ */ [
  { key: "ArrowLeft", run: sh, shift: dh, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: ip, shift: mp, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: hp, shift: vp, preventDefault: !0 },
  { key: "ArrowRight", run: rh, shift: ph, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: np, shift: gp, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: cp, shift: kp, preventDefault: !0 },
  { key: "ArrowUp", run: ah, shift: yh, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Ro, shift: No },
  { mac: "Ctrl-ArrowUp", run: Lo, shift: Po },
  { key: "ArrowDown", run: hh, shift: bh, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: Io, shift: Fo },
  { mac: "Ctrl-ArrowDown", run: $s, shift: Eo },
  { key: "PageUp", run: Lo, shift: Po },
  { key: "PageDown", run: $s, shift: Eo },
  { key: "Home", run: ap, shift: xp, preventDefault: !0 },
  { key: "Mod-Home", run: Ro, shift: No },
  { key: "End", run: lp, shift: wp, preventDefault: !0 },
  { key: "Mod-End", run: Io, shift: Fo },
  { key: "Enter", run: $p },
  { key: "Mod-a", run: Mp },
  { key: "Backspace", run: zs, shift: zs },
  { key: "Delete", run: vh },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: Sh },
  { key: "Mod-Delete", mac: "Alt-Delete", run: Op },
  { mac: "Mod-Backspace", run: Lp },
  { mac: "Mod-Delete", run: Pp }
].concat(/* @__PURE__ */ jp.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), m0 = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: rp, shift: yp },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: op, shift: bp },
  { key: "Alt-ArrowUp", run: Ip },
  { key: "Shift-Alt-ArrowUp", run: Fp },
  { key: "Alt-ArrowDown", run: Np },
  { key: "Shift-Alt-ArrowDown", run: Hp },
  { key: "Escape", run: Tp },
  { key: "Mod-Enter", run: zp },
  { key: "Alt-l", mac: "Ctrl-l", run: Ap },
  { key: "Mod-i", run: Dp, preventDefault: !0 },
  { key: "Mod-[", run: Th },
  { key: "Mod-]", run: Dh },
  { key: "Mod-Alt-\\", run: qp },
  { key: "Shift-Mod-k", run: Vp },
  { key: "Shift-Mod-\\", run: pp },
  { key: "Mod-/", run: Vd },
  { key: "Alt-A", run: $d },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: Kp }
].concat(Up), g0 = { key: "Tab", run: Dh, shift: Th }, Ho = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class Le {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(t, e, i = 0, s = t.length, r, o) {
    this.test = o, this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = t.iterRange(i, s), this.bufferStart = i, this.normalize = r ? (l) => r(Ho(l)) : Ho, this.query = this.normalize(e);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return J(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let t = this.peek();
      if (t < 0)
        return this.done = !0, this;
      let e = Gs(t), i = this.bufferStart + this.bufferPos;
      this.bufferPos += dt(t);
      let s = this.normalize(e);
      for (let r = 0, o = i; ; r++) {
        let l = s.charCodeAt(r), a = this.match(l, o, this.bufferPos + this.bufferStart);
        if (r == s.length - 1) {
          if (a)
            return this.value = a, this;
          break;
        }
        o == i && r < e.length && e.charCodeAt(r) == l && o++;
      }
    }
  }
  match(t, e, i) {
    let s = null;
    for (let r = 0; r < this.matches.length; r += 2) {
      let o = this.matches[r], l = !1;
      this.query.charCodeAt(o) == t && (o == this.query.length - 1 ? s = { from: this.matches[r + 1], to: i } : (this.matches[r]++, l = !0)), l || (this.matches.splice(r, 2), r -= 2);
    }
    return this.query.charCodeAt(0) == t && (this.query.length == 1 ? s = { from: e, to: i } : this.matches.push(1, e)), s && this.test && !this.test(s.from, s.to, this.buffer, this.bufferStart) && (s = null), s;
  }
}
typeof Symbol < "u" && (Le.prototype[Symbol.iterator] = function() {
  return this;
});
const Oh = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, ur = "gm" + (/x/.unicode == null ? "" : "u");
class Bh {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(t, e, i, s = 0, r = t.length) {
    if (this.text = t, this.to = r, this.curLine = "", this.done = !1, this.value = Oh, /\\[sWDnr]|\n|\r|\[\^/.test(e))
      return new Lh(t, e, i, s, r);
    this.re = new RegExp(e, ur + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.iter = t.iter();
    let o = t.lineAt(s);
    this.curLineStart = o.from, this.matchPos = pn(t, s), this.getLine(this.curLineStart);
  }
  getLine(t) {
    this.iter.next(t), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let t = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = t;
      let e = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (e) {
        let i = this.curLineStart + e.index, s = i + e[0].length;
        if (this.matchPos = pn(this.text, s + (i == s ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < s || i > this.value.to) && (!this.test || this.test(i, s, e)))
          return this.value = { from: i, to: s, match: e }, this;
        t = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), t = 0;
      else
        return this.done = !0, this;
    }
  }
}
const Zn = /* @__PURE__ */ new WeakMap();
class Ce {
  constructor(t, e) {
    this.from = t, this.text = e;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(t, e, i) {
    let s = Zn.get(t);
    if (!s || s.from >= i || s.to <= e) {
      let l = new Ce(e, t.sliceString(e, i));
      return Zn.set(t, l), l;
    }
    if (s.from == e && s.to == i)
      return s;
    let { text: r, from: o } = s;
    return o > e && (r = t.sliceString(e, o) + r, o = e), s.to < i && (r += t.sliceString(s.to, i)), Zn.set(t, new Ce(o, r)), new Ce(e, r.slice(e - o, i - o));
  }
}
class Lh {
  constructor(t, e, i, s, r) {
    this.text = t, this.to = r, this.done = !1, this.value = Oh, this.matchPos = pn(t, s), this.re = new RegExp(e, ur + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.flat = Ce.get(t, s, this.chunkEnd(
      s + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(t) {
    return t >= this.to ? this.to : this.text.lineAt(t).to;
  }
  next() {
    for (; ; ) {
      let t = this.re.lastIndex = this.matchPos - this.flat.from, e = this.re.exec(this.flat.text);
      if (e && !e[0] && e.index == t && (this.re.lastIndex = t + 1, e = this.re.exec(this.flat.text)), e) {
        let i = this.flat.from + e.index, s = i + e[0].length;
        if ((this.flat.to >= this.to || e.index + e[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, s, e)))
          return this.value = { from: i, to: s, match: e }, this.matchPos = pn(this.text, s + (i == s ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = Ce.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (Bh.prototype[Symbol.iterator] = Lh.prototype[Symbol.iterator] = function() {
  return this;
});
function Gp(n) {
  try {
    return new RegExp(n, ur), !0;
  } catch {
    return !1;
  }
}
function pn(n, t) {
  if (t >= n.length)
    return t;
  let e = n.lineAt(t), i;
  for (; t < e.to && (i = e.text.charCodeAt(t - e.from)) >= 56320 && i < 57344; )
    t++;
  return t;
}
function qs(n) {
  let t = String(n.state.doc.lineAt(n.state.selection.main.head).number), e = I("input", { class: "cm-textfield", name: "line", value: t }), i = I("form", {
    class: "cm-gotoLine",
    onkeydown: (r) => {
      r.keyCode == 27 ? (r.preventDefault(), n.dispatch({ effects: mn.of(!1) }), n.focus()) : r.keyCode == 13 && (r.preventDefault(), s());
    },
    onsubmit: (r) => {
      r.preventDefault(), s();
    }
  }, I("label", n.state.phrase("Go to line"), ": ", e), " ", I("button", { class: "cm-button", type: "submit" }, n.state.phrase("go")));
  function s() {
    let r = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(e.value);
    if (!r)
      return;
    let { state: o } = n, l = o.doc.lineAt(o.selection.main.head), [, a, c, h, f] = r, u = h ? +h.slice(1) : 0, d = c ? +c : l.number;
    if (c && f) {
      let g = d / 100;
      a && (g = g * (a == "-" ? -1 : 1) + l.number / o.doc.lines), d = Math.round(o.doc.lines * g);
    } else c && a && (d = d * (a == "-" ? -1 : 1) + l.number);
    let p = o.doc.line(Math.max(1, Math.min(o.doc.lines, d))), m = b.cursor(p.from + Math.max(0, Math.min(u, p.length)));
    n.dispatch({
      effects: [mn.of(!1), k.scrollIntoView(m.from, { y: "center" })],
      selection: m
    }), n.focus();
  }
  return { dom: i };
}
const mn = /* @__PURE__ */ O.define(), Vo = /* @__PURE__ */ U.define({
  create() {
    return !0;
  },
  update(n, t) {
    for (let e of t.effects)
      e.is(mn) && (n = e.value);
    return n;
  },
  provide: (n) => li.from(n, (t) => t ? qs : null)
}), Xp = (n) => {
  let t = oi(n, qs);
  if (!t) {
    let e = [mn.of(!0)];
    n.state.field(Vo, !1) == null && e.push(O.appendConfig.of([Vo, Jp])), n.dispatch({ effects: e }), t = oi(n, qs);
  }
  return t && t.dom.querySelector("input").select(), !0;
}, Jp = /* @__PURE__ */ k.baseTheme({
  ".cm-panel.cm-gotoLine": {
    padding: "2px 6px 4px",
    "& label": { fontSize: "80%" }
  }
}), Yp = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !1
}, Qp = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, Yp, {
      highlightWordAroundCursor: (t, e) => t || e,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function y0(n) {
  return [im, em];
}
const Zp = /* @__PURE__ */ A.mark({ class: "cm-selectionMatch" }), _p = /* @__PURE__ */ A.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function Wo(n, t, e, i) {
  return (e == 0 || n(t.sliceDoc(e - 1, e)) != V.Word) && (i == t.doc.length || n(t.sliceDoc(i, i + 1)) != V.Word);
}
function tm(n, t, e, i) {
  return n(t.sliceDoc(e, e + 1)) == V.Word && n(t.sliceDoc(i - 1, i)) == V.Word;
}
const em = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.selectionSet || n.docChanged || n.viewportChanged) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let t = n.state.facet(Qp), { state: e } = n, i = e.selection;
    if (i.ranges.length > 1)
      return A.none;
    let s = i.main, r, o = null;
    if (s.empty) {
      if (!t.highlightWordAroundCursor)
        return A.none;
      let a = e.wordAt(s.head);
      if (!a)
        return A.none;
      o = e.charCategorizer(s.head), r = e.sliceDoc(a.from, a.to);
    } else {
      let a = s.to - s.from;
      if (a < t.minSelectionLength || a > 200)
        return A.none;
      if (t.wholeWords) {
        if (r = e.sliceDoc(s.from, s.to), o = e.charCategorizer(s.head), !(Wo(o, e, s.from, s.to) && tm(o, e, s.from, s.to)))
          return A.none;
      } else if (r = e.sliceDoc(s.from, s.to), !r)
        return A.none;
    }
    let l = [];
    for (let a of n.visibleRanges) {
      let c = new Le(e.doc, r, a.from, a.to);
      for (; !c.next().done; ) {
        let { from: h, to: f } = c.value;
        if ((!o || Wo(o, e, h, f)) && (s.empty && h <= s.from && f >= s.to ? l.push(_p.range(h, f)) : (h >= s.to || f <= s.from) && l.push(Zp.range(h, f)), l.length > t.maxMatches))
          return A.none;
      }
    }
    return A.set(l);
  }
}, {
  decorations: (n) => n.decorations
}), im = /* @__PURE__ */ k.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), nm = ({ state: n, dispatch: t }) => {
  let { selection: e } = n, i = b.create(e.ranges.map((s) => n.wordAt(s.head) || b.cursor(s.head)), e.mainIndex);
  return i.eq(e) ? !1 : (t(n.update({ selection: i })), !0);
};
function sm(n, t) {
  let { main: e, ranges: i } = n.selection, s = n.wordAt(e.head), r = s && s.from == e.from && s.to == e.to;
  for (let o = !1, l = new Le(n.doc, t, i[i.length - 1].to); ; )
    if (l.next(), l.done) {
      if (o)
        return null;
      l = new Le(n.doc, t, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
    } else {
      if (o && i.some((a) => a.from == l.value.from))
        continue;
      if (r) {
        let a = n.wordAt(l.value.from);
        if (!a || a.from != l.value.from || a.to != l.value.to)
          continue;
      }
      return l.value;
    }
}
const rm = ({ state: n, dispatch: t }) => {
  let { ranges: e } = n.selection;
  if (e.some((r) => r.from === r.to))
    return nm({ state: n, dispatch: t });
  let i = n.sliceDoc(e[0].from, e[0].to);
  if (n.selection.ranges.some((r) => n.sliceDoc(r.from, r.to) != i))
    return !1;
  let s = sm(n, i);
  return s ? (t(n.update({
    selection: n.selection.addRange(b.range(s.from, s.to), !1),
    effects: k.scrollIntoView(s.to)
  })), !0) : !1;
}, Ie = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, {
      top: !1,
      caseSensitive: !1,
      literal: !1,
      regexp: !1,
      wholeWord: !1,
      createPanel: (t) => new gm(t),
      scrollToMatch: (t) => k.scrollIntoView(t)
    });
  }
});
class Ph {
  /**
  Create a query object.
  */
  constructor(t) {
    this.search = t.search, this.caseSensitive = !!t.caseSensitive, this.literal = !!t.literal, this.regexp = !!t.regexp, this.replace = t.replace || "", this.valid = !!this.search && (!this.regexp || Gp(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!t.wholeWord;
  }
  /**
  @internal
  */
  unquote(t) {
    return this.literal ? t : t.replace(/\\([nrt\\])/g, (e, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(t) {
    return this.search == t.search && this.replace == t.replace && this.caseSensitive == t.caseSensitive && this.regexp == t.regexp && this.wholeWord == t.wholeWord;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new hm(this) : new lm(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(t, e = 0, i) {
    let s = t.doc ? t : P.create({ doc: t });
    return i == null && (i = s.doc.length), this.regexp ? me(this, s, e, i) : pe(this, s, e, i);
  }
}
class Eh {
  constructor(t) {
    this.spec = t;
  }
}
function pe(n, t, e, i) {
  return new Le(t.doc, n.unquoted, e, i, n.caseSensitive ? void 0 : (s) => s.toLowerCase(), n.wholeWord ? om(t.doc, t.charCategorizer(t.selection.main.head)) : void 0);
}
function om(n, t) {
  return (e, i, s, r) => ((r > e || r + s.length < i) && (r = Math.max(0, e - 2), s = n.sliceString(r, Math.min(n.length, i + 2))), (t(gn(s, e - r)) != V.Word || t(yn(s, e - r)) != V.Word) && (t(yn(s, i - r)) != V.Word || t(gn(s, i - r)) != V.Word));
}
class lm extends Eh {
  constructor(t) {
    super(t);
  }
  nextMatch(t, e, i) {
    let s = pe(this.spec, t, i, t.doc.length).nextOverlapping();
    return s.done && (s = pe(this.spec, t, 0, e).nextOverlapping()), s.done ? null : s.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(t, e, i) {
    for (let s = i; ; ) {
      let r = Math.max(e, s - 1e4 - this.spec.unquoted.length), o = pe(this.spec, t, r, s), l = null;
      for (; !o.nextOverlapping().done; )
        l = o.value;
      if (l)
        return l;
      if (r == e)
        return null;
      s -= 1e4;
    }
  }
  prevMatch(t, e, i) {
    return this.prevMatchInRange(t, 0, e) || this.prevMatchInRange(t, i, t.doc.length);
  }
  getReplacement(t) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(t, e) {
    let i = pe(this.spec, t, 0, t.doc.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= e)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(t, e, i, s) {
    let r = pe(this.spec, t, Math.max(0, e - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, t.doc.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
function me(n, t, e, i) {
  return new Bh(t.doc, n.search, {
    ignoreCase: !n.caseSensitive,
    test: n.wholeWord ? am(t.charCategorizer(t.selection.main.head)) : void 0
  }, e, i);
}
function gn(n, t) {
  return n.slice(Z(n, t, !1), t);
}
function yn(n, t) {
  return n.slice(t, Z(n, t));
}
function am(n) {
  return (t, e, i) => !i[0].length || (n(gn(i.input, i.index)) != V.Word || n(yn(i.input, i.index)) != V.Word) && (n(yn(i.input, i.index + i[0].length)) != V.Word || n(gn(i.input, i.index + i[0].length)) != V.Word);
}
class hm extends Eh {
  nextMatch(t, e, i) {
    let s = me(this.spec, t, i, t.doc.length).next();
    return s.done && (s = me(this.spec, t, 0, e).next()), s.done ? null : s.value;
  }
  prevMatchInRange(t, e, i) {
    for (let s = 1; ; s++) {
      let r = Math.max(
        e,
        i - s * 1e4
        /* FindPrev.ChunkSize */
      ), o = me(this.spec, t, r, i), l = null;
      for (; !o.next().done; )
        l = o.value;
      if (l && (r == e || l.from > r + 10))
        return l;
      if (r == e)
        return null;
    }
  }
  prevMatch(t, e, i) {
    return this.prevMatchInRange(t, 0, e) || this.prevMatchInRange(t, i, t.doc.length);
  }
  getReplacement(t) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&\d+])/g, (e, i) => i == "$" ? "$" : i == "&" ? t.match[0] : i != "0" && +i < t.match.length ? t.match[i] : e);
  }
  matchAll(t, e) {
    let i = me(this.spec, t, 0, t.doc.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= e)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(t, e, i, s) {
    let r = me(this.spec, t, Math.max(
      0,
      e - 250
      /* RegExp.HighlightMargin */
    ), Math.min(i + 250, t.doc.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
const hi = /* @__PURE__ */ O.define(), dr = /* @__PURE__ */ O.define(), Ut = /* @__PURE__ */ U.define({
  create(n) {
    return new _n(Ks(n).create(), null);
  },
  update(n, t) {
    for (let e of t.effects)
      e.is(hi) ? n = new _n(e.value.create(), n.panel) : e.is(dr) && (n = new _n(n.query, e.value ? pr : null));
    return n;
  },
  provide: (n) => li.from(n, (t) => t.panel)
});
class _n {
  constructor(t, e) {
    this.query = t, this.panel = e;
  }
}
const cm = /* @__PURE__ */ A.mark({ class: "cm-searchMatch" }), fm = /* @__PURE__ */ A.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), um = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.decorations = this.highlight(n.state.field(Ut));
  }
  update(n) {
    let t = n.state.field(Ut);
    (t != n.startState.field(Ut) || n.docChanged || n.selectionSet || n.viewportChanged) && (this.decorations = this.highlight(t));
  }
  highlight({ query: n, panel: t }) {
    if (!t || !n.spec.valid)
      return A.none;
    let { view: e } = this, i = new Jt();
    for (let s = 0, r = e.visibleRanges, o = r.length; s < o; s++) {
      let { from: l, to: a } = r[s];
      for (; s < o - 1 && a > r[s + 1].from - 2 * 250; )
        a = r[++s].to;
      n.highlight(e.state, l, a, (c, h) => {
        let f = e.state.selection.ranges.some((u) => u.from == c && u.to == h);
        i.add(c, h, f ? fm : cm);
      });
    }
    return i.finish();
  }
}, {
  decorations: (n) => n.decorations
});
function vi(n) {
  return (t) => {
    let e = t.state.field(Ut, !1);
    return e && e.query.spec.valid ? n(t, e) : Nh(t);
  };
}
const bn = /* @__PURE__ */ vi((n, { query: t }) => {
  let { to: e } = n.state.selection.main, i = t.nextMatch(n.state, e, e);
  if (!i)
    return !1;
  let s = b.single(i.from, i.to), r = n.state.facet(Ie);
  return n.dispatch({
    selection: s,
    effects: [mr(n, i), r.scrollToMatch(s.main, n)],
    userEvent: "select.search"
  }), Ih(n), !0;
}), wn = /* @__PURE__ */ vi((n, { query: t }) => {
  let { state: e } = n, { from: i } = e.selection.main, s = t.prevMatch(e, i, i);
  if (!s)
    return !1;
  let r = b.single(s.from, s.to), o = n.state.facet(Ie);
  return n.dispatch({
    selection: r,
    effects: [mr(n, s), o.scrollToMatch(r.main, n)],
    userEvent: "select.search"
  }), Ih(n), !0;
}), dm = /* @__PURE__ */ vi((n, { query: t }) => {
  let e = t.matchAll(n.state, 1e3);
  return !e || !e.length ? !1 : (n.dispatch({
    selection: b.create(e.map((i) => b.range(i.from, i.to))),
    userEvent: "select.search.matches"
  }), !0);
}), pm = ({ state: n, dispatch: t }) => {
  let e = n.selection;
  if (e.ranges.length > 1 || e.main.empty)
    return !1;
  let { from: i, to: s } = e.main, r = [], o = 0;
  for (let l = new Le(n.doc, n.sliceDoc(i, s)); !l.next().done; ) {
    if (r.length > 1e3)
      return !1;
    l.value.from == i && (o = r.length), r.push(b.range(l.value.from, l.value.to));
  }
  return t(n.update({
    selection: b.create(r, o),
    userEvent: "select.search.matches"
  })), !0;
}, $o = /* @__PURE__ */ vi((n, { query: t }) => {
  let { state: e } = n, { from: i, to: s } = e.selection.main;
  if (e.readOnly)
    return !1;
  let r = t.nextMatch(e, i, i);
  if (!r)
    return !1;
  let o = [], l, a, c = [];
  if (r.from == i && r.to == s && (a = e.toText(t.getReplacement(r)), o.push({ from: r.from, to: r.to, insert: a }), r = t.nextMatch(e, r.from, r.to), c.push(k.announce.of(e.phrase("replaced match on line $", e.doc.lineAt(i).number) + "."))), r) {
    let h = o.length == 0 || o[0].from >= r.to ? 0 : r.to - r.from - a.length;
    l = b.single(r.from - h, r.to - h), c.push(mr(n, r)), c.push(e.facet(Ie).scrollToMatch(l.main, n));
  }
  return n.dispatch({
    changes: o,
    selection: l,
    effects: c,
    userEvent: "input.replace"
  }), !0;
}), mm = /* @__PURE__ */ vi((n, { query: t }) => {
  if (n.state.readOnly)
    return !1;
  let e = t.matchAll(n.state, 1e9).map((s) => {
    let { from: r, to: o } = s;
    return { from: r, to: o, insert: t.getReplacement(s) };
  });
  if (!e.length)
    return !1;
  let i = n.state.phrase("replaced $ matches", e.length) + ".";
  return n.dispatch({
    changes: e,
    effects: k.announce.of(i),
    userEvent: "input.replace.all"
  }), !0;
});
function pr(n) {
  return n.state.facet(Ie).createPanel(n);
}
function Ks(n, t) {
  var e, i, s, r, o;
  let l = n.selection.main, a = l.empty || l.to > l.from + 100 ? "" : n.sliceDoc(l.from, l.to);
  if (t && !a)
    return t;
  let c = n.facet(Ie);
  return new Ph({
    search: ((e = t == null ? void 0 : t.literal) !== null && e !== void 0 ? e : c.literal) ? a : a.replace(/\n/g, "\\n"),
    caseSensitive: (i = t == null ? void 0 : t.caseSensitive) !== null && i !== void 0 ? i : c.caseSensitive,
    literal: (s = t == null ? void 0 : t.literal) !== null && s !== void 0 ? s : c.literal,
    regexp: (r = t == null ? void 0 : t.regexp) !== null && r !== void 0 ? r : c.regexp,
    wholeWord: (o = t == null ? void 0 : t.wholeWord) !== null && o !== void 0 ? o : c.wholeWord
  });
}
function Rh(n) {
  let t = oi(n, pr);
  return t && t.dom.querySelector("[main-field]");
}
function Ih(n) {
  let t = Rh(n);
  t && t == n.root.activeElement && t.select();
}
const Nh = (n) => {
  let t = n.state.field(Ut, !1);
  if (t && t.panel) {
    let e = Rh(n);
    if (e && e != n.root.activeElement) {
      let i = Ks(n.state, t.query.spec);
      i.valid && n.dispatch({ effects: hi.of(i) }), e.focus(), e.select();
    }
  } else
    n.dispatch({ effects: [
      dr.of(!0),
      t ? hi.of(Ks(n.state, t.query.spec)) : O.appendConfig.of(bm)
    ] });
  return !0;
}, Fh = (n) => {
  let t = n.state.field(Ut, !1);
  if (!t || !t.panel)
    return !1;
  let e = oi(n, pr);
  return e && e.dom.contains(n.root.activeElement) && n.focus(), n.dispatch({ effects: dr.of(!1) }), !0;
}, b0 = [
  { key: "Mod-f", run: Nh, scope: "editor search-panel" },
  { key: "F3", run: bn, shift: wn, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: bn, shift: wn, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: Fh, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: pm },
  { key: "Mod-Alt-g", run: Xp },
  { key: "Mod-d", run: rm, preventDefault: !0 }
];
class gm {
  constructor(t) {
    this.view = t;
    let e = this.query = t.state.field(Ut).query.spec;
    this.commit = this.commit.bind(this), this.searchField = I("input", {
      value: e.search,
      placeholder: ht(t, "Find"),
      "aria-label": ht(t, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = I("input", {
      value: e.replace,
      placeholder: ht(t, "Replace"),
      "aria-label": ht(t, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = I("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: e.caseSensitive,
      onchange: this.commit
    }), this.reField = I("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: e.regexp,
      onchange: this.commit
    }), this.wordField = I("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: e.wholeWord,
      onchange: this.commit
    });
    function i(s, r, o) {
      return I("button", { class: "cm-button", name: s, onclick: r, type: "button" }, o);
    }
    this.dom = I("div", { onkeydown: (s) => this.keydown(s), class: "cm-search" }, [
      this.searchField,
      i("next", () => bn(t), [ht(t, "next")]),
      i("prev", () => wn(t), [ht(t, "previous")]),
      i("select", () => dm(t), [ht(t, "all")]),
      I("label", null, [this.caseField, ht(t, "match case")]),
      I("label", null, [this.reField, ht(t, "regexp")]),
      I("label", null, [this.wordField, ht(t, "by word")]),
      ...t.state.readOnly ? [] : [
        I("br"),
        this.replaceField,
        i("replace", () => $o(t), [ht(t, "replace")]),
        i("replaceAll", () => mm(t), [ht(t, "replace all")])
      ],
      I("button", {
        name: "close",
        onclick: () => Fh(t),
        "aria-label": ht(t, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let t = new Ph({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    t.eq(this.query) || (this.query = t, this.view.dispatch({ effects: hi.of(t) }));
  }
  keydown(t) {
    ou(this.view, t, "search-panel") ? t.preventDefault() : t.keyCode == 13 && t.target == this.searchField ? (t.preventDefault(), (t.shiftKey ? wn : bn)(this.view)) : t.keyCode == 13 && t.target == this.replaceField && (t.preventDefault(), $o(this.view));
  }
  update(t) {
    for (let e of t.transactions)
      for (let i of e.effects)
        i.is(hi) && !i.value.eq(this.query) && this.setQuery(i.value);
  }
  setQuery(t) {
    this.query = t, this.searchField.value = t.search, this.replaceField.value = t.replace, this.caseField.checked = t.caseSensitive, this.reField.checked = t.regexp, this.wordField.checked = t.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(Ie).top;
  }
}
function ht(n, t) {
  return n.state.phrase(t);
}
const Wi = 30, $i = /[\s\.,:;?!]/;
function mr(n, { from: t, to: e }) {
  let i = n.state.doc.lineAt(t), s = n.state.doc.lineAt(e).to, r = Math.max(i.from, t - Wi), o = Math.min(s, e + Wi), l = n.state.sliceDoc(r, o);
  if (r != i.from) {
    for (let a = 0; a < Wi; a++)
      if (!$i.test(l[a + 1]) && $i.test(l[a])) {
        l = l.slice(a);
        break;
      }
  }
  if (o != s) {
    for (let a = l.length - 1; a > l.length - Wi; a--)
      if (!$i.test(l[a - 1]) && $i.test(l[a])) {
        l = l.slice(0, a);
        break;
      }
  }
  return k.announce.of(`${n.state.phrase("current match")}. ${l} ${n.state.phrase("on line")} ${i.number}.`);
}
const ym = /* @__PURE__ */ k.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), bm = [
  Ut,
  /* @__PURE__ */ Zt.low(um),
  ym
];
class Hh {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(t, e, i, s) {
    this.state = t, this.pos = e, this.explicit = i, this.view = s, this.abortListeners = [];
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(t) {
    let e = j(this.state).resolveInner(this.pos, -1);
    for (; e && t.indexOf(e.name) < 0; )
      e = e.parent;
    return e ? {
      from: e.from,
      to: this.pos,
      text: this.state.sliceDoc(e.from, this.pos),
      type: e.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(t) {
    let e = this.state.doc.lineAt(this.pos), i = Math.max(e.from, this.pos - 250), s = e.text.slice(i - e.from, this.pos - e.from), r = s.search(Wh(t, !1));
    return r < 0 ? null : { from: i + r, to: this.pos, text: s.slice(r) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  */
  addEventListener(t, e) {
    t == "abort" && this.abortListeners && this.abortListeners.push(e);
  }
}
function zo(n) {
  let t = Object.keys(n).join(""), e = /\w/.test(t);
  return e && (t = t.replace(/\w/g, "")), `[${e ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function wm(n) {
  let t = /* @__PURE__ */ Object.create(null), e = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of n) {
    t[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      e[s[r]] = !0;
  }
  let i = zo(t) + zo(e) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function Vh(n) {
  let t = n.map((s) => typeof s == "string" ? { label: s } : s), [e, i] = t.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : wm(t);
  return (s) => {
    let r = s.matchBefore(i);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: t, validFor: e } : null;
  };
}
function xm(n, t) {
  return (e) => {
    for (let i = j(e.state).resolveInner(e.pos, -1); i; i = i.parent) {
      if (n.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return t(e);
  };
}
class qo {
  constructor(t, e, i, s) {
    this.completion = t, this.source = e, this.match = i, this.score = s;
  }
}
function Gt(n) {
  return n.selection.main.from;
}
function Wh(n, t) {
  var e;
  let { source: i } = n, s = t && i[0] != "^", r = i[i.length - 1] != "$";
  return !s && !r ? n : new RegExp(`${s ? "^" : ""}(?:${i})${r ? "$" : ""}`, (e = n.flags) !== null && e !== void 0 ? e : n.ignoreCase ? "i" : "");
}
const gr = /* @__PURE__ */ Ht.define();
function vm(n, t, e, i) {
  let { main: s } = n.selection, r = e - s.from, o = i - s.from;
  return Object.assign(Object.assign({}, n.changeByRange((l) => l != s && e != i && n.sliceDoc(l.from + r, l.from + o) != n.sliceDoc(e, i) ? { range: l } : {
    changes: { from: l.from + r, to: i == s.from ? l.to : l.from + o, insert: t },
    range: b.cursor(l.from + r + t.length)
  })), { scrollIntoView: !0, userEvent: "input.complete" });
}
const Ko = /* @__PURE__ */ new WeakMap();
function km(n) {
  if (!Array.isArray(n))
    return n;
  let t = Ko.get(n);
  return t || Ko.set(n, t = Vh(n)), t;
}
const xn = /* @__PURE__ */ O.define(), ci = /* @__PURE__ */ O.define();
class Sm {
  constructor(t) {
    this.pattern = t, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let e = 0; e < t.length; ) {
      let i = J(t, e), s = dt(i);
      this.chars.push(i);
      let r = t.slice(e, e + s), o = r.toUpperCase();
      this.folded.push(J(o == r ? r.toLowerCase() : o, 0)), e += s;
    }
    this.astral = t.length != this.chars.length;
  }
  ret(t, e) {
    return this.score = t, this.matched = e, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(t) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (t.length < this.pattern.length)
      return null;
    let { chars: e, folded: i, any: s, precise: r, byWord: o } = this;
    if (e.length == 1) {
      let x = J(t, 0), D = dt(x), v = D == t.length ? 0 : -100;
      if (x != e[0]) if (x == i[0])
        v += -200;
      else
        return null;
      return this.ret(v, [0, D]);
    }
    let l = t.indexOf(this.pattern);
    if (l == 0)
      return this.ret(t.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = e.length, c = 0;
    if (l < 0) {
      for (let x = 0, D = Math.min(t.length, 200); x < D && c < a; ) {
        let v = J(t, x);
        (v == e[c] || v == i[c]) && (s[c++] = x), x += dt(v);
      }
      if (c < a)
        return null;
    }
    let h = 0, f = 0, u = !1, d = 0, p = -1, m = -1, g = /[a-z]/.test(t), y = !0;
    for (let x = 0, D = Math.min(t.length, 200), v = 0; x < D && f < a; ) {
      let M = J(t, x);
      l < 0 && (h < a && M == e[h] && (r[h++] = x), d < a && (M == e[d] || M == i[d] ? (d == 0 && (p = x), m = x + 1, d++) : d = 0));
      let T, N = M < 255 ? M >= 48 && M <= 57 || M >= 97 && M <= 122 ? 2 : M >= 65 && M <= 90 ? 1 : 0 : (T = Gs(M)) != T.toLowerCase() ? 1 : T != T.toUpperCase() ? 2 : 0;
      (!x || N == 1 && g || v == 0 && N != 0) && (e[f] == M || i[f] == M && (u = !0) ? o[f++] = x : o.length && (y = !1)), v = N, x += dt(M);
    }
    return f == a && o[0] == 0 && y ? this.result(-100 + (u ? -200 : 0), o, t) : d == a && p == 0 ? this.ret(-200 - t.length + (m == t.length ? 0 : -100), [0, m]) : l > -1 ? this.ret(-700 - t.length, [l, l + this.pattern.length]) : d == a ? this.ret(-900 - t.length, [p, m]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (y ? 0 : -1100), o, t) : e.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, t);
  }
  result(t, e, i) {
    let s = [], r = 0;
    for (let o of e) {
      let l = o + (this.astral ? dt(J(i, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
    }
    return this.ret(t - i.length, s);
  }
}
class Cm {
  constructor(t) {
    this.pattern = t, this.matched = [], this.score = 0, this.folded = t.toLowerCase();
  }
  match(t) {
    if (t.length < this.pattern.length)
      return null;
    let e = t.slice(0, this.pattern.length), i = e == this.pattern ? 0 : e.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, e.length], this.score = i + (t.length == this.pattern.length ? 0 : -100), this);
  }
}
const Q = /* @__PURE__ */ C.define({
  combine(n) {
    return Ot(n, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: Mm,
      filterStrict: !1,
      compareCompletions: (t, e) => t.label.localeCompare(e.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (t, e) => t && e,
      closeOnBlur: (t, e) => t && e,
      icons: (t, e) => t && e,
      tooltipClass: (t, e) => (i) => jo(t(i), e(i)),
      optionClass: (t, e) => (i) => jo(t(i), e(i)),
      addToOptions: (t, e) => t.concat(e),
      filterStrict: (t, e) => t || e
    });
  }
});
function jo(n, t) {
  return n ? t ? n + " " + t : n : t;
}
function Mm(n, t, e, i, s, r) {
  let o = n.textDirection == H.RTL, l = o, a = !1, c = "top", h, f, u = t.left - s.left, d = s.right - t.right, p = i.right - i.left, m = i.bottom - i.top;
  if (l && u < Math.min(p, d) ? l = !1 : !l && d < Math.min(p, u) && (l = !0), p <= (l ? u : d))
    h = Math.max(s.top, Math.min(e.top, s.bottom - m)) - t.top, f = Math.min(400, l ? u : d);
  else {
    a = !0, f = Math.min(
      400,
      (o ? t.right : s.right - t.left) - 30
      /* Info.Margin */
    );
    let x = s.bottom - t.bottom;
    x >= m || x > t.top ? h = e.bottom - t.top : (c = "bottom", h = t.bottom - e.top);
  }
  let g = (t.bottom - t.top) / r.offsetHeight, y = (t.right - t.left) / r.offsetWidth;
  return {
    style: `${c}: ${h / g}px; max-width: ${f / y}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
function Am(n) {
  let t = n.addToOptions.slice();
  return n.icons && t.push({
    render(e) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), e.type && i.classList.add(...e.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), t.push({
    render(e, i, s, r) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let l = e.displayLabel || e.label, a = 0;
      for (let c = 0; c < r.length; ) {
        let h = r[c++], f = r[c++];
        h > a && o.appendChild(document.createTextNode(l.slice(a, h)));
        let u = o.appendChild(document.createElement("span"));
        u.appendChild(document.createTextNode(l.slice(h, f))), u.className = "cm-completionMatchedText", a = f;
      }
      return a < l.length && o.appendChild(document.createTextNode(l.slice(a))), o;
    },
    position: 50
  }, {
    render(e) {
      if (!e.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = e.detail, i;
    },
    position: 80
  }), t.sort((e, i) => e.position - i.position).map((e) => e.render);
}
function ts(n, t, e) {
  if (n <= e)
    return { from: 0, to: n };
  if (t < 0 && (t = 0), t <= n >> 1) {
    let s = Math.floor(t / e);
    return { from: s * e, to: (s + 1) * e };
  }
  let i = Math.floor((n - t) / e);
  return { from: n - (i + 1) * e, to: n - i * e };
}
class Dm {
  constructor(t, e, i) {
    this.view = t, this.stateField = e, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = t.state.field(e), { options: r, selected: o } = s.open, l = t.state.facet(Q);
    this.optionContent = Am(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = ts(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(t.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: c } = t.state.field(e).open;
      for (let h = a.target, f; h && h != this.dom; h = h.parentNode)
        if (h.nodeName == "LI" && (f = /-(\d+)$/.exec(h.id)) && +f[1] < c.length) {
          this.applyCompletion(t, c[+f[1]]), a.preventDefault();
          return;
        }
    }), this.dom.addEventListener("focusout", (a) => {
      let c = t.state.field(this.stateField, !1);
      c && c.tooltip && t.state.facet(Q).closeOnBlur && a.relatedTarget != t.contentDOM && t.dispatch({ effects: ci.of(null) });
    }), this.showOptions(r, s.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(t, e) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(t, e, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(t) {
    var e;
    let i = t.state.field(this.stateField), s = t.startState.field(this.stateField);
    if (this.updateTooltipClass(t.state), i != s) {
      let { options: r, selected: o, disabled: l } = i.open;
      (!s.open || s.open.options != r) && (this.range = ts(r.length, o, t.state.facet(Q).maxRenderedOptions), this.showOptions(r, i.id)), this.updateSel(), l != ((e = s.open) === null || e === void 0 ? void 0 : e.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
    }
  }
  updateTooltipClass(t) {
    let e = this.tooltipClass(t);
    if (e != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of e.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = e;
    }
  }
  positioned(t) {
    this.space = t, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let t = this.view.state.field(this.stateField), e = t.open;
    if ((e.selected > -1 && e.selected < this.range.from || e.selected >= this.range.to) && (this.range = ts(e.options.length, e.selected, this.view.state.facet(Q).maxRenderedOptions), this.showOptions(e.options, t.id)), this.updateSelectedOption(e.selected)) {
      this.destroyInfo();
      let { completion: i } = e.options[e.selected], { info: s } = i;
      if (!s)
        return;
      let r = typeof s == "string" ? document.createTextNode(s) : s(i);
      if (!r)
        return;
      "then" in r ? r.then((o) => {
        o && this.view.state.field(this.stateField, !1) == t && this.addInfoPane(o, i);
      }).catch((o) => lt(this.view.state, o, "completion info")) : this.addInfoPane(r, i);
    }
  }
  addInfoPane(t, e) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", t.nodeType != null)
      i.appendChild(t), this.infoDestroy = null;
    else {
      let { dom: s, destroy: r } = t;
      i.appendChild(s), this.infoDestroy = r || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(t) {
    let e = null;
    for (let i = this.list.firstChild, s = this.range.from; i; i = i.nextSibling, s++)
      i.nodeName != "LI" || !i.id ? s-- : s == t ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), e = i) : i.hasAttribute("aria-selected") && i.removeAttribute("aria-selected");
    return e && Om(this.list, e), e;
  }
  measureInfo() {
    let t = this.dom.querySelector("[aria-selected]");
    if (!t || !this.info)
      return null;
    let e = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), s = t.getBoundingClientRect(), r = this.space;
    if (!r) {
      let o = this.dom.ownerDocument.defaultView || window;
      r = { left: 0, top: 0, right: o.innerWidth, bottom: o.innerHeight };
    }
    return s.top > Math.min(r.bottom, e.bottom) - 10 || s.bottom < Math.max(r.top, e.top) + 10 ? null : this.view.state.facet(Q).positionInfo(this.view, e, s, i, r, this.dom);
  }
  placeInfo(t) {
    this.info && (t ? (t.style && (this.info.style.cssText = t.style), this.info.className = "cm-tooltip cm-completionInfo " + (t.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(t, e, i) {
    const s = document.createElement("ul");
    s.id = e, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions"));
    let r = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: l, match: a } = t[o], { section: c } = l;
      if (c) {
        let u = typeof c == "string" ? c : c.name;
        if (u != r && (o > i.from || i.from == 0))
          if (r = u, typeof c != "string" && c.header)
            s.appendChild(c.header(c));
          else {
            let d = s.appendChild(document.createElement("completion-section"));
            d.textContent = u;
          }
      }
      const h = s.appendChild(document.createElement("li"));
      h.id = e + "-" + o, h.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (h.className = f);
      for (let u of this.optionContent) {
        let d = u(l, this.view.state, this.view, a);
        d && h.appendChild(d);
      }
    }
    return i.from && s.classList.add("cm-completionListIncompleteTop"), i.to < t.length && s.classList.add("cm-completionListIncompleteBottom"), s;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function Tm(n, t) {
  return (e) => new Dm(e, n, t);
}
function Om(n, t) {
  let e = n.getBoundingClientRect(), i = t.getBoundingClientRect(), s = e.height / n.offsetHeight;
  i.top < e.top ? n.scrollTop -= (e.top - i.top) / s : i.bottom > e.bottom && (n.scrollTop += (i.bottom - e.bottom) / s);
}
function Uo(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function Bm(n, t) {
  let e = [], i = null, s = (c) => {
    e.push(c);
    let { section: h } = c.completion;
    if (h) {
      i || (i = []);
      let f = typeof h == "string" ? h : h.name;
      i.some((u) => u.name == f) || i.push(typeof h == "string" ? { name: f } : h);
    }
  }, r = t.facet(Q);
  for (let c of n)
    if (c.hasResult()) {
      let h = c.result.getMatch;
      if (c.result.filter === !1)
        for (let f of c.result.options)
          s(new qo(f, c.source, h ? h(f) : [], 1e9 - e.length));
      else {
        let f = t.sliceDoc(c.from, c.to), u, d = r.filterStrict ? new Cm(f) : new Sm(f);
        for (let p of c.result.options)
          if (u = d.match(p.label)) {
            let m = p.displayLabel ? h ? h(p, u.matched) : [] : u.matched;
            s(new qo(p, c.source, m, u.score + (p.boost || 0)));
          }
      }
    }
  if (i) {
    let c = /* @__PURE__ */ Object.create(null), h = 0, f = (u, d) => {
      var p, m;
      return ((p = u.rank) !== null && p !== void 0 ? p : 1e9) - ((m = d.rank) !== null && m !== void 0 ? m : 1e9) || (u.name < d.name ? -1 : 1);
    };
    for (let u of i.sort(f))
      h -= 1e5, c[u.name] = h;
    for (let u of e) {
      let { section: d } = u.completion;
      d && (u.score += c[typeof d == "string" ? d : d.name]);
    }
  }
  let o = [], l = null, a = r.compareCompletions;
  for (let c of e.sort((h, f) => f.score - h.score || a(h.completion, f.completion))) {
    let h = c.completion;
    !l || l.label != h.label || l.detail != h.detail || l.type != null && h.type != null && l.type != h.type || l.apply != h.apply || l.boost != h.boost ? o.push(c) : Uo(c.completion) > Uo(l) && (o[o.length - 1] = c), l = c.completion;
  }
  return o;
}
class we {
  constructor(t, e, i, s, r, o) {
    this.options = t, this.attrs = e, this.tooltip = i, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(t, e) {
    return t == this.selected || t >= this.options.length ? this : new we(this.options, Go(e, t), this.tooltip, this.timestamp, t, this.disabled);
  }
  static build(t, e, i, s, r) {
    let o = Bm(t, e);
    if (!o.length)
      return s && t.some(
        (a) => a.state == 1
        /* State.Pending */
      ) ? new we(s.options, s.attrs, s.tooltip, s.timestamp, s.selected, !0) : null;
    let l = e.facet(Q).selectOnOpen ? 0 : -1;
    if (s && s.selected != l && s.selected != -1) {
      let a = s.options[s.selected].completion;
      for (let c = 0; c < o.length; c++)
        if (o[c].completion == a) {
          l = c;
          break;
        }
    }
    return new we(o, Go(i, l), {
      pos: t.reduce((a, c) => c.hasResult() ? Math.min(a, c.from) : a, 1e8),
      create: Nm,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), l, !1);
  }
  map(t) {
    return new we(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: t.mapPos(this.tooltip.pos) }), this.timestamp, this.selected, this.disabled);
  }
}
class vn {
  constructor(t, e, i) {
    this.active = t, this.id = e, this.open = i;
  }
  static start() {
    return new vn(Rm, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(t) {
    let { state: e } = t, i = e.facet(Q), r = (i.override || e.languageDataAt("autocomplete", Gt(e)).map(km)).map((l) => (this.active.find((c) => c.source == l) || new ft(
      l,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(t, i));
    r.length == this.active.length && r.every((l, a) => l == this.active[a]) && (r = this.active);
    let o = this.open;
    o && t.docChanged && (o = o.map(t.changes)), t.selection || r.some((l) => l.hasResult() && t.changes.touchesRange(l.from, l.to)) || !Lm(r, this.active) ? o = we.build(r, e, this.id, o, i) : o && o.disabled && !r.some(
      (l) => l.state == 1
      /* State.Pending */
    ) && (o = null), !o && r.every(
      (l) => l.state != 1
      /* State.Pending */
    ) && r.some((l) => l.hasResult()) && (r = r.map((l) => l.hasResult() ? new ft(
      l.source,
      0
      /* State.Inactive */
    ) : l));
    for (let l of t.effects)
      l.is(qh) && (o = o && o.setSelected(l.value, this.id));
    return r == this.active && o == this.open ? this : new vn(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? Pm : Em;
  }
}
function Lm(n, t) {
  if (n == t)
    return !0;
  for (let e = 0, i = 0; ; ) {
    for (; e < n.length && !n[e].hasResult; )
      e++;
    for (; i < t.length && !t[i].hasResult; )
      i++;
    let s = e == n.length, r = i == t.length;
    if (s || r)
      return s == r;
    if (n[e++].result != t[i++].result)
      return !1;
  }
}
const Pm = {
  "aria-autocomplete": "list"
}, Em = {};
function Go(n, t) {
  let e = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return t > -1 && (e["aria-activedescendant"] = n + "-" + t), e;
}
const Rm = [];
function $h(n, t) {
  if (n.isUserEvent("input.complete")) {
    let i = n.annotation(gr);
    if (i && t.activateOnCompletion(i))
      return 12;
  }
  let e = n.isUserEvent("input.type");
  return e && t.activateOnTyping ? 5 : e ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
}
class ft {
  constructor(t, e, i = -1) {
    this.source = t, this.state = e, this.explicitPos = i;
  }
  hasResult() {
    return !1;
  }
  update(t, e) {
    let i = $h(t, e), s = this;
    (i & 8 || i & 16 && this.touches(t)) && (s = new ft(
      s.source,
      0
      /* State.Inactive */
    )), i & 4 && s.state == 0 && (s = new ft(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(t, i);
    for (let r of t.effects)
      if (r.is(xn))
        s = new ft(s.source, 1, r.value ? Gt(t.state) : -1);
      else if (r.is(ci))
        s = new ft(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(zh))
        for (let o of r.value)
          o.source == s.source && (s = o);
    return s;
  }
  updateFor(t, e) {
    return this.map(t.changes);
  }
  map(t) {
    return t.empty || this.explicitPos < 0 ? this : new ft(this.source, this.state, t.mapPos(this.explicitPos));
  }
  touches(t) {
    return t.changes.touchesRange(Gt(t.state));
  }
}
class Me extends ft {
  constructor(t, e, i, s, r) {
    super(t, 2, e), this.result = i, this.from = s, this.to = r;
  }
  hasResult() {
    return !0;
  }
  updateFor(t, e) {
    var i;
    if (!(e & 3))
      return this.map(t.changes);
    let s = this.result;
    s.map && !t.changes.empty && (s = s.map(s, t.changes));
    let r = t.changes.mapPos(this.from), o = t.changes.mapPos(this.to, 1), l = Gt(t.state);
    if ((this.explicitPos < 0 ? l <= r : l < this.from) || l > o || !s || e & 2 && Gt(t.startState) == this.from)
      return new ft(
        this.source,
        e & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = this.explicitPos < 0 ? -1 : t.changes.mapPos(this.explicitPos);
    return Im(s.validFor, t.state, r, o) ? new Me(this.source, a, s, r, o) : s.update && (s = s.update(s, r, o, new Hh(t.state, l, a >= 0))) ? new Me(this.source, a, s, s.from, (i = s.to) !== null && i !== void 0 ? i : Gt(t.state)) : new ft(this.source, 1, a);
  }
  map(t) {
    return t.empty ? this : (this.result.map ? this.result.map(this.result, t) : this.result) ? new Me(this.source, this.explicitPos < 0 ? -1 : t.mapPos(this.explicitPos), this.result, t.mapPos(this.from), t.mapPos(this.to, 1)) : new ft(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(t) {
    return t.changes.touchesRange(this.from, this.to);
  }
}
function Im(n, t, e, i) {
  if (!n)
    return !1;
  let s = t.sliceDoc(e, i);
  return typeof n == "function" ? n(s, e, i, t) : Wh(n, !0).test(s);
}
const zh = /* @__PURE__ */ O.define({
  map(n, t) {
    return n.map((e) => e.map(t));
  }
}), qh = /* @__PURE__ */ O.define(), ot = /* @__PURE__ */ U.define({
  create() {
    return vn.start();
  },
  update(n, t) {
    return n.update(t);
  },
  provide: (n) => [
    rr.from(n, (t) => t.tooltip),
    k.contentAttributes.from(n, (t) => t.attrs)
  ]
});
function yr(n, t) {
  const e = t.completion.apply || t.completion.label;
  let i = n.state.field(ot).active.find((s) => s.source == t.source);
  return i instanceof Me ? (typeof e == "string" ? n.dispatch(Object.assign(Object.assign({}, vm(n.state, e, i.from, i.to)), { annotations: gr.of(t.completion) })) : e(n, t.completion, i.from, i.to), !0) : !1;
}
const Nm = /* @__PURE__ */ Tm(ot, yr);
function zi(n, t = "option") {
  return (e) => {
    let i = e.state.field(ot, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < e.state.facet(Q).interactionDelay)
      return !1;
    let s = 1, r;
    t == "page" && (r = Ba(e, i.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + s * (n ? 1 : -1) : n ? 0 : o - 1;
    return l < 0 ? l = t == "page" ? 0 : o - 1 : l >= o && (l = t == "page" ? o - 1 : 0), e.dispatch({ effects: qh.of(l) }), !0;
  };
}
const Fm = (n) => {
  let t = n.state.field(ot, !1);
  return n.state.readOnly || !t || !t.open || t.open.selected < 0 || t.open.disabled || Date.now() - t.open.timestamp < n.state.facet(Q).interactionDelay ? !1 : yr(n, t.open.options[t.open.selected]);
}, Hm = (n) => n.state.field(ot, !1) ? (n.dispatch({ effects: xn.of(!0) }), !0) : !1, Vm = (n) => {
  let t = n.state.field(ot, !1);
  return !t || !t.active.some(
    (e) => e.state != 0
    /* State.Inactive */
  ) ? !1 : (n.dispatch({ effects: ci.of(null) }), !0);
};
class Wm {
  constructor(t, e) {
    this.active = t, this.context = e, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const $m = 50, zm = 1e3, qm = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let t of n.state.field(ot).active)
      t.state == 1 && this.startQuery(t);
  }
  update(n) {
    let t = n.state.field(ot), e = n.state.facet(Q);
    if (!n.selectionSet && !n.docChanged && n.startState.field(ot) == t)
      return;
    let i = n.transactions.some((r) => {
      let o = $h(r, e);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (i || o.updates.length + n.transactions.length > $m && Date.now() - o.time > zm) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            lt(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...n.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((r) => r.effects.some((o) => o.is(xn))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : e.activateOnTypingDelay;
    if (this.debounceUpdate = t.active.some((r) => r.state == 1 && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of n.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: n } = this.view, t = n.field(ot);
    for (let e of t.active)
      e.state == 1 && !this.running.some((i) => i.active.source == e.source) && this.startQuery(e);
  }
  startQuery(n) {
    let { state: t } = this.view, e = Gt(t), i = new Hh(t, e, n.explicitPos == e, this.view), s = new Wm(n, i);
    this.running.push(s), Promise.resolve(n.source(i)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: ci.of(null) }), lt(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Q).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let t = [], e = this.view.state.facet(Q);
    for (let i = 0; i < this.running.length; i++) {
      let s = this.running[i];
      if (s.done === void 0)
        continue;
      if (this.running.splice(i--, 1), s.done) {
        let o = new Me(s.active.source, s.active.explicitPos, s.done, s.done.from, (n = s.done.to) !== null && n !== void 0 ? n : Gt(s.updates.length ? s.updates[0].startState : this.view.state));
        for (let l of s.updates)
          o = o.update(l, e);
        if (o.hasResult()) {
          t.push(o);
          continue;
        }
      }
      let r = this.view.state.field(ot).active.find((o) => o.source == s.active.source);
      if (r && r.state == 1)
        if (s.done == null) {
          let o = new ft(
            s.active.source,
            0
            /* State.Inactive */
          );
          for (let l of s.updates)
            o = o.update(l, e);
          o.state != 1 && t.push(o);
        } else
          this.startQuery(r);
    }
    t.length && this.view.dispatch({ effects: zh.of(t) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let t = this.view.state.field(ot, !1);
      if (t && t.tooltip && this.view.state.facet(Q).closeOnBlur) {
        let e = t.open && Ba(this.view, t.open.tooltip);
        (!e || !e.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: ci.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: xn.of(!1) }), 20), this.composing = 0;
    }
  }
}), Km = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), jm = /* @__PURE__ */ Zt.highest(/* @__PURE__ */ k.domEventHandlers({
  keydown(n, t) {
    let e = t.state.field(ot, !1);
    if (!e || !e.open || e.open.disabled || e.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(Km && n.altKey) || n.metaKey)
      return !1;
    let i = e.open.options[e.open.selected], s = e.active.find((o) => o.source == i.source), r = i.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(n.key) > -1 && yr(t, i), !1;
  }
})), Kh = /* @__PURE__ */ k.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class Um {
  constructor(t, e, i, s) {
    this.field = t, this.line = e, this.from = i, this.to = s;
  }
}
class br {
  constructor(t, e, i) {
    this.field = t, this.from = e, this.to = i;
  }
  map(t) {
    let e = t.mapPos(this.from, -1, Y.TrackDel), i = t.mapPos(this.to, 1, Y.TrackDel);
    return e == null || i == null ? null : new br(this.field, e, i);
  }
}
class wr {
  constructor(t, e) {
    this.lines = t, this.fieldPositions = e;
  }
  instantiate(t, e) {
    let i = [], s = [e], r = t.doc.lineAt(e), o = /^\s*/.exec(r.text)[0];
    for (let a of this.lines) {
      if (i.length) {
        let c = o, h = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < h; f++)
          c += t.facet(An);
        s.push(e + c.length - h), a = c + a.slice(h);
      }
      i.push(a), e += a.length + 1;
    }
    let l = this.fieldPositions.map((a) => new br(a.field, s[a.line] + a.from, s[a.line] + a.to));
    return { text: i, ranges: l };
  }
  static parse(t) {
    let e = [], i = [], s = [], r;
    for (let o of t.split(/\r\n?|\n/)) {
      for (; r = /[#$]\{(?:(\d+)(?::([^}]*))?|((?:\\[{}]|[^}])*))\}/.exec(o); ) {
        let l = r[1] ? +r[1] : null, a = r[2] || r[3] || "", c = -1, h = a.replace(/\\[{}]/g, (f) => f[1]);
        for (let f = 0; f < e.length; f++)
          (l != null ? e[f].seq == l : h && e[f].name == h) && (c = f);
        if (c < 0) {
          let f = 0;
          for (; f < e.length && (l == null || e[f].seq != null && e[f].seq < l); )
            f++;
          e.splice(f, 0, { seq: l, name: h }), c = f;
          for (let u of s)
            u.field >= c && u.field++;
        }
        s.push(new Um(c, i.length, r.index, r.index + h.length)), o = o.slice(0, r.index) + a + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (l, a, c) => {
        for (let h of s)
          h.line == i.length && h.from > c && (h.from--, h.to--);
        return a;
      }), i.push(o);
    }
    return new wr(i, s);
  }
}
let Gm = /* @__PURE__ */ A.widget({ widget: /* @__PURE__ */ new class extends Bt {
  toDOM() {
    let n = document.createElement("span");
    return n.className = "cm-snippetFieldPosition", n;
  }
  ignoreEvent() {
    return !1;
  }
}() }), Xm = /* @__PURE__ */ A.mark({ class: "cm-snippetField" });
class Ne {
  constructor(t, e) {
    this.ranges = t, this.active = e, this.deco = A.set(t.map((i) => (i.from == i.to ? Gm : Xm).range(i.from, i.to)));
  }
  map(t) {
    let e = [];
    for (let i of this.ranges) {
      let s = i.map(t);
      if (!s)
        return null;
      e.push(s);
    }
    return new Ne(e, this.active);
  }
  selectionInsideField(t) {
    return t.ranges.every((e) => this.ranges.some((i) => i.field == this.active && i.from <= e.from && i.to >= e.to));
  }
}
const ki = /* @__PURE__ */ O.define({
  map(n, t) {
    return n && n.map(t);
  }
}), Jm = /* @__PURE__ */ O.define(), fi = /* @__PURE__ */ U.define({
  create() {
    return null;
  },
  update(n, t) {
    for (let e of t.effects) {
      if (e.is(ki))
        return e.value;
      if (e.is(Jm) && n)
        return new Ne(n.ranges, e.value);
    }
    return n && t.docChanged && (n = n.map(t.changes)), n && t.selection && !n.selectionInsideField(t.selection) && (n = null), n;
  },
  provide: (n) => k.decorations.from(n, (t) => t ? t.deco : A.none)
});
function xr(n, t) {
  return b.create(n.filter((e) => e.field == t).map((e) => b.range(e.from, e.to)));
}
function Ym(n) {
  let t = wr.parse(n);
  return (e, i, s, r) => {
    let { text: o, ranges: l } = t.instantiate(e.state, s), a = {
      changes: { from: s, to: r, insert: L.of(o) },
      scrollIntoView: !0,
      annotations: i ? [gr.of(i), q.userEvent.of("input.complete")] : void 0
    };
    if (l.length && (a.selection = xr(l, 0)), l.some((c) => c.field > 0)) {
      let c = new Ne(l, 0), h = a.effects = [ki.of(c)];
      e.state.field(fi, !1) === void 0 && h.push(O.appendConfig.of([fi, eg, ig, Kh]));
    }
    e.dispatch(e.state.update(a));
  };
}
function jh(n) {
  return ({ state: t, dispatch: e }) => {
    let i = t.field(fi, !1);
    if (!i || n < 0 && i.active == 0)
      return !1;
    let s = i.active + n, r = n > 0 && !i.ranges.some((o) => o.field == s + n);
    return e(t.update({
      selection: xr(i.ranges, s),
      effects: ki.of(r ? null : new Ne(i.ranges, s)),
      scrollIntoView: !0
    })), !0;
  };
}
const Qm = ({ state: n, dispatch: t }) => n.field(fi, !1) ? (t(n.update({ effects: ki.of(null) })), !0) : !1, Zm = /* @__PURE__ */ jh(1), _m = /* @__PURE__ */ jh(-1), tg = [
  { key: "Tab", run: Zm, shift: _m },
  { key: "Escape", run: Qm }
], Xo = /* @__PURE__ */ C.define({
  combine(n) {
    return n.length ? n[0] : tg;
  }
}), eg = /* @__PURE__ */ Zt.highest(/* @__PURE__ */ nr.compute([Xo], (n) => n.facet(Xo)));
function st(n, t) {
  return Object.assign(Object.assign({}, t), { apply: Ym(n) });
}
const ig = /* @__PURE__ */ k.domEventHandlers({
  mousedown(n, t) {
    let e = t.state.field(fi, !1), i;
    if (!e || (i = t.posAtCoords({ x: n.clientX, y: n.clientY })) == null)
      return !1;
    let s = e.ranges.find((r) => r.from <= i && r.to >= i);
    return !s || s.field == e.active ? !1 : (t.dispatch({
      selection: xr(e.ranges, s.field),
      effects: ki.of(e.ranges.some((r) => r.field > s.field) ? new Ne(e.ranges, s.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), ui = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, re = /* @__PURE__ */ O.define({
  map(n, t) {
    let e = t.mapPos(n, -1, Y.TrackAfter);
    return e ?? void 0;
  }
}), vr = /* @__PURE__ */ new class extends le {
}();
vr.startSide = 1;
vr.endSide = -1;
const Uh = /* @__PURE__ */ U.define({
  create() {
    return B.empty;
  },
  update(n, t) {
    if (n = n.map(t.changes), t.selection) {
      let e = t.state.doc.lineAt(t.selection.main.head);
      n = n.update({ filter: (i) => i >= e.from && i <= e.to });
    }
    for (let e of t.effects)
      e.is(re) && (n = n.update({ add: [vr.range(e.value, e.value + 1)] }));
    return n;
  }
});
function w0() {
  return [sg, Uh];
}
const es = "()[]{}<>";
function Gh(n) {
  for (let t = 0; t < es.length; t += 2)
    if (es.charCodeAt(t) == n)
      return es.charAt(t + 1);
  return Gs(n < 128 ? n : n + 1);
}
function Xh(n, t) {
  return n.languageDataAt("closeBrackets", t)[0] || ui;
}
const ng = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), sg = /* @__PURE__ */ k.inputHandler.of((n, t, e, i) => {
  if ((ng ? n.composing : n.compositionStarted) || n.state.readOnly)
    return !1;
  let s = n.state.selection.main;
  if (i.length > 2 || i.length == 2 && dt(J(i, 0)) == 1 || t != s.from || e != s.to)
    return !1;
  let r = og(n.state, i);
  return r ? (n.dispatch(r), !0) : !1;
}), rg = ({ state: n, dispatch: t }) => {
  if (n.readOnly)
    return !1;
  let i = Xh(n, n.selection.main.head).brackets || ui.brackets, s = null, r = n.changeByRange((o) => {
    if (o.empty) {
      let l = lg(n.doc, o.head);
      for (let a of i)
        if (a == l && En(n.doc, o.head) == Gh(J(a, 0)))
          return {
            changes: { from: o.head - a.length, to: o.head + a.length },
            range: b.cursor(o.head - a.length)
          };
    }
    return { range: s = o };
  });
  return s || t(n.update(r, { scrollIntoView: !0, userEvent: "delete.backward" })), !s;
}, x0 = [
  { key: "Backspace", run: rg }
];
function og(n, t) {
  let e = Xh(n, n.selection.main.head), i = e.brackets || ui.brackets;
  for (let s of i) {
    let r = Gh(J(s, 0));
    if (t == s)
      return r == s ? cg(n, s, i.indexOf(s + s + s) > -1, e) : ag(n, s, r, e.before || ui.before);
    if (t == r && Jh(n, n.selection.main.from))
      return hg(n, s, r);
  }
  return null;
}
function Jh(n, t) {
  let e = !1;
  return n.field(Uh).between(0, n.doc.length, (i) => {
    i == t && (e = !0);
  }), e;
}
function En(n, t) {
  let e = n.sliceString(t, t + 2);
  return e.slice(0, dt(J(e, 0)));
}
function lg(n, t) {
  let e = n.sliceString(t - 2, t);
  return dt(J(e, 0)) == e.length ? e : e.slice(1);
}
function ag(n, t, e, i) {
  let s = null, r = n.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: t, from: o.from }, { insert: e, from: o.to }],
        effects: re.of(o.to + t.length),
        range: b.range(o.anchor + t.length, o.head + t.length)
      };
    let l = En(n.doc, o.head);
    return !l || /\s/.test(l) || i.indexOf(l) > -1 ? {
      changes: { insert: t + e, from: o.head },
      effects: re.of(o.head + t.length),
      range: b.cursor(o.head + t.length)
    } : { range: s = o };
  });
  return s ? null : n.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function hg(n, t, e) {
  let i = null, s = n.changeByRange((r) => r.empty && En(n.doc, r.head) == e ? {
    changes: { from: r.head, to: r.head + e.length, insert: e },
    range: b.cursor(r.head + e.length)
  } : i = { range: r });
  return i ? null : n.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function cg(n, t, e, i) {
  let s = i.stringPrefixes || ui.stringPrefixes, r = null, o = n.changeByRange((l) => {
    if (!l.empty)
      return {
        changes: [{ insert: t, from: l.from }, { insert: t, from: l.to }],
        effects: re.of(l.to + t.length),
        range: b.range(l.anchor + t.length, l.head + t.length)
      };
    let a = l.head, c = En(n.doc, a), h;
    if (c == t) {
      if (Jo(n, a))
        return {
          changes: { insert: t + t, from: a },
          effects: re.of(a + t.length),
          range: b.cursor(a + t.length)
        };
      if (Jh(n, a)) {
        let u = e && n.sliceDoc(a, a + t.length * 3) == t + t + t ? t + t + t : t;
        return {
          changes: { from: a, to: a + u.length, insert: u },
          range: b.cursor(a + u.length)
        };
      }
    } else {
      if (e && n.sliceDoc(a - 2 * t.length, a) == t + t && (h = Yo(n, a - 2 * t.length, s)) > -1 && Jo(n, h))
        return {
          changes: { insert: t + t + t + t, from: a },
          effects: re.of(a + t.length),
          range: b.cursor(a + t.length)
        };
      if (n.charCategorizer(a)(c) != V.Word && Yo(n, a, s) > -1 && !fg(n, a, t, s))
        return {
          changes: { insert: t + t, from: a },
          effects: re.of(a + t.length),
          range: b.cursor(a + t.length)
        };
    }
    return { range: r = l };
  });
  return r ? null : n.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Jo(n, t) {
  let e = j(n).resolveInner(t + 1);
  return e.parent && e.from == t;
}
function fg(n, t, e, i) {
  let s = j(n).resolveInner(t, -1), r = i.reduce((o, l) => Math.max(o, l.length), 0);
  for (let o = 0; o < 5; o++) {
    let l = n.sliceDoc(s.from, Math.min(s.to, s.from + e.length + r)), a = l.indexOf(e);
    if (!a || a > -1 && i.indexOf(l.slice(0, a)) > -1) {
      let h = s.firstChild;
      for (; h && h.from == s.from && h.to - h.from > e.length + a; ) {
        if (n.sliceDoc(h.to - e.length, h.to) == e)
          return !1;
        h = h.firstChild;
      }
      return !0;
    }
    let c = s.to == t && s.parent;
    if (!c)
      break;
    s = c;
  }
  return !1;
}
function Yo(n, t, e) {
  let i = n.charCategorizer(t);
  if (i(n.sliceDoc(t - 1, t)) != V.Word)
    return t;
  for (let s of e) {
    let r = t - s.length;
    if (n.sliceDoc(r, t) == s && i(n.sliceDoc(r - 1, r)) != V.Word)
      return r;
  }
  return -1;
}
function v0(n = {}) {
  return [
    jm,
    ot,
    Q.of(n),
    qm,
    dg,
    Kh
  ];
}
const ug = [
  { key: "Ctrl-Space", run: Hm },
  { key: "Escape", run: Vm },
  { key: "ArrowDown", run: /* @__PURE__ */ zi(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ zi(!1) },
  { key: "PageDown", run: /* @__PURE__ */ zi(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ zi(!1, "page") },
  { key: "Enter", run: Fm }
], dg = /* @__PURE__ */ Zt.highest(/* @__PURE__ */ nr.computeN([Q], (n) => n.facet(Q).defaultKeymap ? [ug] : []));
class pg {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.diagnostic = i;
  }
}
class ne {
  constructor(t, e, i) {
    this.diagnostics = t, this.panel = e, this.selected = i;
  }
  static init(t, e, i) {
    let s = t, r = i.facet(di).markerFilter;
    r && (s = r(s, i));
    let o = A.set(s.map((l) => l.from == l.to || l.from == l.to - 1 && i.doc.lineAt(l.from).to == l.from ? A.widget({
      widget: new kg(l),
      diagnostic: l
    }).range(l.from) : A.mark({
      attributes: { class: "cm-lintRange cm-lintRange-" + l.severity + (l.markClass ? " " + l.markClass : "") },
      diagnostic: l
    }).range(l.from, l.to)), !0);
    return new ne(o, e, Pe(o));
  }
}
function Pe(n, t = null, e = 0) {
  let i = null;
  return n.between(e, 1e9, (s, r, { spec: o }) => {
    if (!(t && o.diagnostic != t))
      return i = new pg(s, r, o.diagnostic), !1;
  }), i;
}
function mg(n, t) {
  let e = t.pos, i = t.end || e, s = n.state.facet(di).hideOn(n, e, i);
  if (s != null)
    return s;
  let r = n.startState.doc.lineAt(t.pos);
  return !!(n.effects.some((o) => o.is(Yh)) || n.changes.touchesRange(r.from, Math.max(r.to, i)));
}
function gg(n, t) {
  return n.field(ut, !1) ? t : t.concat(O.appendConfig.of(Mg));
}
const Yh = /* @__PURE__ */ O.define(), kr = /* @__PURE__ */ O.define(), Qh = /* @__PURE__ */ O.define(), ut = /* @__PURE__ */ U.define({
  create() {
    return new ne(A.none, null, null);
  },
  update(n, t) {
    if (t.docChanged && n.diagnostics.size) {
      let e = n.diagnostics.map(t.changes), i = null, s = n.panel;
      if (n.selected) {
        let r = t.changes.mapPos(n.selected.from, 1);
        i = Pe(e, n.selected.diagnostic, r) || Pe(e, null, r);
      }
      !e.size && s && t.state.facet(di).autoPanel && (s = null), n = new ne(e, s, i);
    }
    for (let e of t.effects)
      if (e.is(Yh)) {
        let i = t.state.facet(di).autoPanel ? e.value.length ? pi.open : null : n.panel;
        n = ne.init(e.value, i, t.state);
      } else e.is(kr) ? n = new ne(n.diagnostics, e.value ? pi.open : null, n.selected) : e.is(Qh) && (n = new ne(n.diagnostics, n.panel, e.value));
    return n;
  },
  provide: (n) => [
    li.from(n, (t) => t.panel),
    k.decorations.from(n, (t) => t.diagnostics)
  ]
}), yg = /* @__PURE__ */ A.mark({ class: "cm-lintRange cm-lintRange-active" });
function bg(n, t, e) {
  let { diagnostics: i } = n.state.field(ut), s = [], r = 2e8, o = 0;
  i.between(t - (e < 0 ? 1 : 0), t + (e > 0 ? 1 : 0), (a, c, { spec: h }) => {
    t >= a && t <= c && (a == c || (t > a || e > 0) && (t < c || e < 0)) && (s.push(h.diagnostic), r = Math.min(a, r), o = Math.max(c, o));
  });
  let l = n.state.facet(di).tooltipFilter;
  return l && (s = l(s, n.state)), s.length ? {
    pos: r,
    end: o,
    above: n.state.doc.lineAt(r).to < o,
    create() {
      return { dom: wg(n, s) };
    }
  } : null;
}
function wg(n, t) {
  return I("ul", { class: "cm-tooltip-lint" }, t.map((e) => _h(n, e, !1)));
}
const xg = (n) => {
  let t = n.state.field(ut, !1);
  (!t || !t.panel) && n.dispatch({ effects: gg(n.state, [kr.of(!0)]) });
  let e = oi(n, pi.open);
  return e && e.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, Qo = (n) => {
  let t = n.state.field(ut, !1);
  return !t || !t.panel ? !1 : (n.dispatch({ effects: kr.of(!1) }), !0);
}, vg = (n) => {
  let t = n.state.field(ut, !1);
  if (!t)
    return !1;
  let e = n.state.selection.main, i = t.diagnostics.iter(e.to + 1);
  return !i.value && (i = t.diagnostics.iter(0), !i.value || i.from == e.from && i.to == e.to) ? !1 : (n.dispatch({ selection: { anchor: i.from, head: i.to }, scrollIntoView: !0 }), !0);
}, k0 = [
  { key: "Mod-Shift-m", run: xg, preventDefault: !0 },
  { key: "F8", run: vg }
], di = /* @__PURE__ */ C.define({
  combine(n) {
    return Object.assign({ sources: n.map((t) => t.source).filter((t) => t != null) }, Ot(n.map((t) => t.config), {
      delay: 750,
      markerFilter: null,
      tooltipFilter: null,
      needsRefresh: null,
      hideOn: () => null
    }, {
      needsRefresh: (t, e) => t ? e ? (i) => t(i) || e(i) : t : e
    }));
  }
});
function Zh(n) {
  let t = [];
  if (n)
    t: for (let { name: e } of n) {
      for (let i = 0; i < e.length; i++) {
        let s = e[i];
        if (/[a-zA-Z]/.test(s) && !t.some((r) => r.toLowerCase() == s.toLowerCase())) {
          t.push(s);
          continue t;
        }
      }
      t.push("");
    }
  return t;
}
function _h(n, t, e) {
  var i;
  let s = e ? Zh(t.actions) : [];
  return I("li", { class: "cm-diagnostic cm-diagnostic-" + t.severity }, I("span", { class: "cm-diagnosticText" }, t.renderMessage ? t.renderMessage(n) : t.message), (i = t.actions) === null || i === void 0 ? void 0 : i.map((r, o) => {
    let l = !1, a = (u) => {
      if (u.preventDefault(), l)
        return;
      l = !0;
      let d = Pe(n.state.field(ut).diagnostics, t);
      d && r.apply(n, d.from, d.to);
    }, { name: c } = r, h = s[o] ? c.indexOf(s[o]) : -1, f = h < 0 ? c : [
      c.slice(0, h),
      I("u", c.slice(h, h + 1)),
      c.slice(h + 1)
    ];
    return I("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: a,
      onmousedown: a,
      "aria-label": ` Action: ${c}${h < 0 ? "" : ` (access key "${s[o]})"`}.`
    }, f);
  }), t.source && I("div", { class: "cm-diagnosticSource" }, t.source));
}
class kg extends Bt {
  constructor(t) {
    super(), this.diagnostic = t;
  }
  eq(t) {
    return t.diagnostic == this.diagnostic;
  }
  toDOM() {
    return I("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
}
class Zo {
  constructor(t, e) {
    this.diagnostic = e, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = _h(t, e, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
  }
}
class pi {
  constructor(t) {
    this.view = t, this.items = [];
    let e = (s) => {
      if (s.keyCode == 27)
        Qo(this.view), this.view.focus();
      else if (s.keyCode == 38 || s.keyCode == 33)
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      else if (s.keyCode == 40 || s.keyCode == 34)
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      else if (s.keyCode == 36)
        this.moveSelection(0);
      else if (s.keyCode == 35)
        this.moveSelection(this.items.length - 1);
      else if (s.keyCode == 13)
        this.view.focus();
      else if (s.keyCode >= 65 && s.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic: r } = this.items[this.selectedIndex], o = Zh(r.actions);
        for (let l = 0; l < o.length; l++)
          if (o[l].toUpperCase().charCodeAt(0) == s.keyCode) {
            let a = Pe(this.view.state.field(ut).diagnostics, r);
            a && r.actions[l].apply(t, a.from, a.to);
          }
      } else
        return;
      s.preventDefault();
    }, i = (s) => {
      for (let r = 0; r < this.items.length; r++)
        this.items[r].dom.contains(s.target) && this.moveSelection(r);
    };
    this.list = I("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown: e,
      onclick: i
    }), this.dom = I("div", { class: "cm-panel-lint" }, this.list, I("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => Qo(this.view)
    }, "×")), this.update();
  }
  get selectedIndex() {
    let t = this.view.state.field(ut).selected;
    if (!t)
      return -1;
    for (let e = 0; e < this.items.length; e++)
      if (this.items[e].diagnostic == t.diagnostic)
        return e;
    return -1;
  }
  update() {
    let { diagnostics: t, selected: e } = this.view.state.field(ut), i = 0, s = !1, r = null;
    for (t.between(0, this.view.state.doc.length, (o, l, { spec: a }) => {
      let c = -1, h;
      for (let f = i; f < this.items.length; f++)
        if (this.items[f].diagnostic == a.diagnostic) {
          c = f;
          break;
        }
      c < 0 ? (h = new Zo(this.view, a.diagnostic), this.items.splice(i, 0, h), s = !0) : (h = this.items[c], c > i && (this.items.splice(i, c - i), s = !0)), e && h.diagnostic == e.diagnostic ? h.dom.hasAttribute("aria-selected") || (h.dom.setAttribute("aria-selected", "true"), r = h) : h.dom.hasAttribute("aria-selected") && h.dom.removeAttribute("aria-selected"), i++;
    }); i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); )
      s = !0, this.items.pop();
    this.items.length == 0 && (this.items.push(new Zo(this.view, {
      from: -1,
      to: -1,
      severity: "info",
      message: this.view.state.phrase("No diagnostics")
    })), s = !0), r ? (this.list.setAttribute("aria-activedescendant", r.id), this.view.requestMeasure({
      key: this,
      read: () => ({ sel: r.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
      write: ({ sel: o, panel: l }) => {
        let a = l.height / this.list.offsetHeight;
        o.top < l.top ? this.list.scrollTop -= (l.top - o.top) / a : o.bottom > l.bottom && (this.list.scrollTop += (o.bottom - l.bottom) / a);
      }
    })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), s && this.sync();
  }
  sync() {
    let t = this.list.firstChild;
    function e() {
      let i = t;
      t = i.nextSibling, i.remove();
    }
    for (let i of this.items)
      if (i.dom.parentNode == this.list) {
        for (; t != i.dom; )
          e();
        t = i.dom.nextSibling;
      } else
        this.list.insertBefore(i.dom, t);
    for (; t; )
      e();
  }
  moveSelection(t) {
    if (this.selectedIndex < 0)
      return;
    let e = this.view.state.field(ut), i = Pe(e.diagnostics, this.items[t].diagnostic);
    i && this.view.dispatch({
      selection: { anchor: i.from, head: i.to },
      scrollIntoView: !0,
      effects: Qh.of(i)
    });
  }
  static open(t) {
    return new pi(t);
  }
}
function Sg(n, t = 'viewBox="0 0 40 40"') {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${t}>${encodeURIComponent(n)}</svg>')`;
}
function qi(n) {
  return Sg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${n}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
}
const Cg = /* @__PURE__ */ k.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ qi("#d11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ qi("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ qi("#999") },
  ".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ qi("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
}), Mg = [
  ut,
  /* @__PURE__ */ k.decorations.compute([ut], (n) => {
    let { selected: t, panel: e } = n.field(ut);
    return !t || !e || t.from == t.to ? A.none : A.set([
      yg.range(t.from, t.to)
    ]);
  }),
  /* @__PURE__ */ $u(bg, { hideOn: mg }),
  Cg
], tc = [
  /* @__PURE__ */ st("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ st("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ st("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ st("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ st("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ st(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ st("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ st(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ st(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ st('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ st('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], Ag = /* @__PURE__ */ tc.concat([
  /* @__PURE__ */ st("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ st("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ st("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), _o = /* @__PURE__ */ new uc(), ec = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function qe(n) {
  return (t, e) => {
    let i = t.node.getChild("VariableDefinition");
    return i && e(i, n), !0;
  };
}
const Dg = ["FunctionDeclaration"], Tg = {
  FunctionDeclaration: /* @__PURE__ */ qe("function"),
  ClassDeclaration: /* @__PURE__ */ qe("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ qe("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ qe("type"),
  NamespaceDeclaration: /* @__PURE__ */ qe("namespace"),
  VariableDefinition(n, t) {
    n.matchContext(Dg) || t(n, "variable");
  },
  TypeDefinition(n, t) {
    t(n, "type");
  },
  __proto__: null
};
function ic(n, t) {
  let e = _o.get(t);
  if (e)
    return e;
  let i = [], s = !0;
  function r(o, l) {
    let a = n.sliceString(o.from, o.to);
    i.push({ label: a, type: l });
  }
  return t.cursor(ll.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let l = Tg[o.name];
      if (l && l(o, r) || ec.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of ic(n, o.node))
        i.push(l);
      return !1;
    }
  }), _o.set(t, i), i;
}
const tl = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, nc = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  ".",
  "?."
];
function Og(n) {
  let t = j(n.state).resolveInner(n.pos, -1);
  if (nc.indexOf(t.name) > -1)
    return null;
  let e = t.name == "VariableName" || t.to - t.from < 20 && tl.test(n.state.sliceDoc(t.from, t.to));
  if (!e && !n.explicit)
    return null;
  let i = [];
  for (let s = t; s; s = s.parent)
    ec.has(s.name) && (i = i.concat(ic(n.state.doc, s)));
  return {
    options: i,
    from: e ? t.from : n.pos,
    validFor: tl
  };
}
const oe = /* @__PURE__ */ an.define({
  name: "javascript",
  parser: /* @__PURE__ */ fc.configure({
    props: [
      /* @__PURE__ */ Na.add({
        IfStatement: /* @__PURE__ */ Gn({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ Gn({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: hd,
        SwitchBody: (n) => {
          let t = n.textAfter, e = /^\s*\}/.test(t), i = /^\s*(case|default)\b/.test(t);
          return n.baseIndent + (e ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ ad({ closing: "}" }),
        ArrowFunction: (n) => n.baseIndent + n.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ Gn({ except: /^{/ }),
        JSXElement(n) {
          let t = /^\s*<\//.test(n.textAfter);
          return n.lineIndent(n.node.from) + (t ? 0 : n.unit);
        },
        JSXEscape(n) {
          let t = /\s*\}/.test(n.textAfter);
          return n.lineIndent(n.node.from) + (t ? 0 : n.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        }
      }),
      /* @__PURE__ */ Va.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": ud,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), sc = {
  test: (n) => /^JSX/.test(n.name),
  facet: /* @__PURE__ */ Ra({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, Bg = /* @__PURE__ */ oe.configure({ dialect: "ts" }, "typescript"), Lg = /* @__PURE__ */ oe.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ or.add((n) => n.isTop ? [sc] : void 0)]
}), Pg = /* @__PURE__ */ oe.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ or.add((n) => n.isTop ? [sc] : void 0)]
}, "typescript");
let rc = (n) => ({ label: n, type: "keyword" });
const oc = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(rc), Eg = /* @__PURE__ */ oc.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(rc));
function S0(n = {}) {
  let t = n.jsx ? n.typescript ? Pg : Lg : n.typescript ? Bg : oe, e = n.typescript ? Ag.concat(Eg) : tc.concat(oc);
  return new td(t, [
    oe.data.of({
      autocomplete: xm(nc, Vh(e))
    }),
    oe.data.of({
      autocomplete: Og
    }),
    n.jsx ? Ng : []
  ]);
}
function Rg(n) {
  for (; ; ) {
    if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag")
      return n;
    if (n.name == "JSXEscape" || !n.parent)
      return null;
    n = n.parent;
  }
}
function el(n, t, e = n.length) {
  for (let i = t == null ? void 0 : t.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return n.sliceString(i.from, Math.min(i.to, e));
  return "";
}
const Ig = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), Ng = /* @__PURE__ */ k.inputHandler.of((n, t, e, i, s) => {
  if ((Ig ? n.composing : n.compositionStarted) || n.state.readOnly || t != e || i != ">" && i != "/" || !oe.isActiveAt(n.state, t, -1))
    return !1;
  let r = s(), { state: o } = r, l = o.changeByRange((a) => {
    var c;
    let { head: h } = a, f = j(o).resolveInner(h - 1, -1), u;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(h - 1, h) != i || f.name == "JSXAttributeValue" && f.to > h)) {
      if (i == ">" && f.name == "JSXFragmentTag")
        return { range: a, changes: { from: h, insert: "</>" } };
      if (i == "/" && f.name == "JSXStartCloseTag") {
        let d = f.parent, p = d.parent;
        if (p && d.from == h - 2 && ((u = el(o.doc, p.firstChild, h)) || ((c = p.firstChild) === null || c === void 0 ? void 0 : c.name) == "JSXFragmentTag")) {
          let m = `${u}>`;
          return { range: b.cursor(h + m.length, -1), changes: { from: h, insert: m } };
        }
      } else if (i == ">") {
        let d = Rg(f);
        if (d && d.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(h, h + 2)) && (u = el(o.doc, d, h)))
          return { range: a, changes: { from: h, insert: `</${u}>` } };
      }
    }
    return { range: a };
  });
  return l.changes.empty ? !1 : (n.dispatch([
    r,
    o.update(l, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
}), Fg = "#e5c07b", il = "#e06c75", Hg = "#56b6c2", Vg = "#ffffff", _i = "#abb2bf", js = "#7d8799", Wg = "#61afef", $g = "#98c379", nl = "#d19a66", zg = "#c678dd", qg = "#21252b", sl = "#2c313a", rl = "#282c34", is = "#353a42", Kg = "#3E4451", ol = "#528bff", jg = /* @__PURE__ */ k.theme({
  "&": {
    color: _i,
    backgroundColor: rl
  },
  ".cm-content": {
    caretColor: ol
  },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: ol },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: Kg },
  ".cm-panels": { backgroundColor: qg, color: _i },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },
  ".cm-activeLine": { backgroundColor: "#6699ff0b" },
  ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },
  ".cm-gutters": {
    backgroundColor: rl,
    color: js,
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: sl
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },
  ".cm-tooltip": {
    border: "none",
    backgroundColor: is
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: is,
    borderBottomColor: is
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: sl,
      color: _i
    }
  }
}, { dark: !0 }), Ug = /* @__PURE__ */ wi.define([
  {
    tag: w.keyword,
    color: zg
  },
  {
    tag: [w.name, w.deleted, w.character, w.propertyName, w.macroName],
    color: il
  },
  {
    tag: [/* @__PURE__ */ w.function(w.variableName), w.labelName],
    color: Wg
  },
  {
    tag: [w.color, /* @__PURE__ */ w.constant(w.name), /* @__PURE__ */ w.standard(w.name)],
    color: nl
  },
  {
    tag: [/* @__PURE__ */ w.definition(w.name), w.separator],
    color: _i
  },
  {
    tag: [w.typeName, w.className, w.number, w.changed, w.annotation, w.modifier, w.self, w.namespace],
    color: Fg
  },
  {
    tag: [w.operator, w.operatorKeyword, w.url, w.escape, w.regexp, w.link, /* @__PURE__ */ w.special(w.string)],
    color: Hg
  },
  {
    tag: [w.meta, w.comment],
    color: js
  },
  {
    tag: w.strong,
    fontWeight: "bold"
  },
  {
    tag: w.emphasis,
    fontStyle: "italic"
  },
  {
    tag: w.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: w.link,
    color: js,
    textDecoration: "underline"
  },
  {
    tag: w.heading,
    fontWeight: "bold",
    color: il
  },
  {
    tag: [w.atom, w.bool, /* @__PURE__ */ w.special(w.variableName)],
    color: nl
  },
  {
    tag: [w.processingInstruction, w.string, w.inserted],
    color: $g
  },
  {
    tag: w.invalid,
    color: Vg
  }
]), C0 = [jg, /* @__PURE__ */ Cd(Ug)];
export {
  g0 as A,
  An as B,
  i0 as C,
  kn as D,
  P as E,
  S0 as F,
  C0 as G,
  O as S,
  t0 as a,
  d0 as b,
  _g as c,
  Zg as d,
  f0 as e,
  c0 as f,
  u0 as g,
  o0 as h,
  a0 as i,
  w0 as j,
  v0 as k,
  r0 as l,
  s0 as m,
  e0 as n,
  y0 as o,
  nr as p,
  x0 as q,
  n0 as r,
  Cd as s,
  m0 as t,
  b0 as u,
  p0 as v,
  h0 as w,
  ug as x,
  k0 as y,
  k as z
};
