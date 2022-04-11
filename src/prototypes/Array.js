Array.prototype.render = function (fn) {
  return fn ? this.map(fn).join("\n") : this.join("\n");
};
