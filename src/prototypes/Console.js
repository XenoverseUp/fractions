console.defaultLog = console.log.bind(console);
console.logs = [];
console.log = function () {
  console.defaultLog.apply(console, arguments);
  console.logs.push(Array.from(arguments));
};

console.defaultError = console.error.bind(console);
console.errors = [];
console.error = function () {
  console.defaultError.apply(console, arguments);
  console.errors.push(Array.from(arguments));
};

console.defaultWarn = console.warn.bind(console);
console.warns = [];
console.warn = function () {
  console.defaultWarn.apply(console, arguments);
  console.warns.push(Array.from(arguments));
};

console.defaultDebug = console.debug.bind(console);
console.debugs = [];
console.debug = function () {
  console.defaultDebug.apply(console, arguments);
  console.debugs.push(Array.from(arguments));
};
