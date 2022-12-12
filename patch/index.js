// see https://github.com/microsoft/rushstack/tree/master/eslint/eslint-patch
// for more details. we have this entrypoint since stricter package managers
// (yarn 2+, pnpm) disallow requiring modules that aren't direct dependencies
// (so consumers would have to install eslint-patch and require it themselves
// rather than using the version we bundle).
require("@rushstack/eslint-patch/modern-module-resolution");
