const g = window.Pinia.defineStore;
g({
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
function c(e, r) {
  if (arguments.length === 0 || !e)
    return null;
  const i = r || "{y}-{m}-{d} {h}:{i}:{s}";
  let t;
  typeof e == "object" ? t = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), t = new Date(e));
  const a = {
    y: t.getFullYear(),
    m: t.getMonth() + 1,
    d: t.getDate(),
    h: t.getHours(),
    i: t.getMinutes(),
    s: t.getSeconds(),
    a: t.getDay()
  };
  return i.replace(/{([ymdhisa])+}/g, (u, s) => {
    let n = a[s];
    return s === "a" ? ["日", "一", "二", "三", "四", "五", "六"][n] : (u.length > 0 && n < 10 && (n = "0" + n), n || 0);
  });
}
export {
  c as p
};
