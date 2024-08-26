const c = window.Pinia.defineStore;
c({
  id: "common",
  state: () => ({
    menuInit: !1,
    menuList: [],
    cachedViews: []
  }),
  getters: {
    getMenuInit() {
      return this.menuInit;
    },
    getMenuList() {
      return this.menuList;
    },
    getCachedViews() {
      return this.cachedViews;
    }
  },
  actions: {
    setMenuInit(e) {
      this.menuInit = e;
    },
    setMenuList(e) {
      this.menuList = e;
    },
    setCachedViews(e) {
      this.cachedViews = e;
    }
  },
  persist: {
    enabled: !1
  }
});
function l(e, i) {
  if (arguments.length === 0 || !e)
    return null;
  const a = i || "{y}-{m}-{d} {h}:{i}:{s}";
  let t;
  typeof e == "object" ? t = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), t = new Date(e));
  const o = {
    y: t.getFullYear(),
    m: t.getMonth() + 1,
    d: t.getDate(),
    h: t.getHours(),
    i: t.getMinutes(),
    s: t.getSeconds(),
    a: t.getDay()
  };
  return a.replace(/{([ymdhisa])+}/g, (r, n) => {
    let s = o[n];
    return n === "a" ? ["日", "一", "二", "三", "四", "五", "六"][s] : (r.length > 0 && s < 10 && (s = "0" + s), s || 0);
  });
}
function d(e, i, a, t, o) {
  i = i || "id", a = a || "parentId", o = o || Math.min.apply(Math, e.map((n) => n[a])) || 0;
  const u = JSON.parse(JSON.stringify(e)), r = u.filter((n) => {
    let s = u.filter((g) => n[i] === g[a]);
    return s.length > 0 && (n.children = s), n[a] === o;
  });
  return r !== "" ? r : e;
}
function f(e) {
  return axios.post("/api/auth/codegen/getTableList", e);
}
function h(e) {
  return axios.post("/api/auth/codegen/create-list", e);
}
function p(e) {
  return axios.post("/api/auth/codegen/codegenTablePage", e);
}
function b(e) {
  return axios.get("/api/auth/codegen/getCodegenInfoByTableId?tableId=" + e);
}
function C(e) {
  return axios.post("/api/auth/codegen/saveConfig", e);
}
function w(e) {
  return axios.get("/api/auth/codegen/getCodeFileList?tableId=" + e);
}
function x(e) {
  return axios.post("/api/auth/codegen/getCodeFileContent", e);
}
function y(e) {
  return axios.delete("/api/auth/codegen/del?id=" + e);
}
function L(e) {
  return axios.get("/api/auth/codegen/download?id=" + e, { responseType: "blob" });
}
export {
  x as a,
  b,
  p as c,
  f as d,
  h as e,
  y as f,
  w as g,
  d as h,
  L as i,
  l as p,
  C as s
};
