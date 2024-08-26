let n = 0;
function r() {
  const t = 370 + ++n;
  return "F" + Math.random().toString(36).substr(3, 3) + (+`${Date.now()}`).toString(36) + t.toString(36) + "c";
}
export {
  r as u
};
