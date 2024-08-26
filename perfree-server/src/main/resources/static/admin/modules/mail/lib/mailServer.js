function a(e) {
  return axios.post("/api/auth/mailServer/page", e);
}
function i(e) {
  return axios.post("/api/auth/mailServer/add", e);
}
function r(e) {
  return axios.post("/api/auth/mailServer/update", e);
}
function t(e) {
  return axios.delete("/api/auth/mailServer/del?id=" + e);
}
function p(e) {
  return axios.get("/api/auth/mailServer/get?id=" + e);
}
function l() {
  return axios.get("/api/auth/mailServer/listAll");
}
function o(e) {
  return axios.post("/api/auth/mailServer/export", e, { responseType: "blob" });
}
export {
  i as a,
  p as b,
  t as c,
  a as d,
  o as e,
  l as f,
  r as m
};
