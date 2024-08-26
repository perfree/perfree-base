function c(t) {
  return axios.post("/api/auth/attachConfig/page", t);
}
function f(t) {
  return axios.post("/api/auth/attachConfig/add", t);
}
function h(t) {
  return axios.put("/api/auth/attachConfig/update", t);
}
function p(t) {
  return axios.get("/api/auth/attachConfig/get?id=" + t);
}
function d(t) {
  return axios.put("/api/auth/attachConfig/updateMaster", t);
}
function l(t) {
  return axios.delete("/api/auth/attachConfig/del?id=" + t);
}
function C() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const u = window.Pinia.defineStore;
u({
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
    setMenuInit(t) {
      this.menuInit = t;
    },
    setMenuList(t) {
      this.menuList = t;
    },
    setCachedViews(t) {
      this.cachedViews = t;
    }
  },
  persist: {
    enabled: !1
  }
});
function A(t, i) {
  if (arguments.length === 0 || !t)
    return null;
  const s = i || "{y}-{m}-{d} {h}:{i}:{s}";
  let e;
  typeof t == "object" ? e = t : (typeof t == "string" && /^[0-9]+$/.test(t) ? t = parseInt(t) : typeof t == "string" && (t = t.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof t == "number" && t.toString().length === 10 && (t = t * 1e3), e = new Date(t));
  const o = {
    y: e.getFullYear(),
    m: e.getMonth() + 1,
    d: e.getDate(),
    h: e.getHours(),
    i: e.getMinutes(),
    s: e.getSeconds(),
    a: e.getDay()
  };
  return s.replace(/{([ymdhisa])+}/g, (r, n) => {
    let a = o[n];
    return n === "a" ? ["日", "一", "二", "三", "四", "五", "六"][a] : (r.length > 0 && a < 10 && (a = "0" + a), a || 0);
  });
}
export {
  c as a,
  h as b,
  f as c,
  l as d,
  d as e,
  C as f,
  p as g,
  A as p
};
