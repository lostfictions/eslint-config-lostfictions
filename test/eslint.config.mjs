// @ts-check

/** @type {import("..").Config} */
module.exports = {
  extends: ["../react"],
  // override the default version setting of `detect`, since it causes warnings
  // if react isn't installed as a dependency.
  settings: { react: { version: "19" } },
  parserOptions: { tsconfigRootDir: __dirname },
};
