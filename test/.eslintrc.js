module.exports = {
  extends: ["../react"],
  // override the default version setting of `detect`, since it causes warnings
  // if react isn't installed as a depencency.
  settings: { react: { version: "18" } },
  parserOptions: { tsconfigRootDir: __dirname },
};
