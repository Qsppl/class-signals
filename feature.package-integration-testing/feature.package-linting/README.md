# Package linting

Checks the packed `class-signals` with the de facto standard package checkers.

| Check   | Runs on                                         | Catches                                                                   |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| publint | the installed package, in strict mode           | broken `package.json` fields, `exports`, `files`                          |
| attw    | the tarball from `npm pack`, `esm-only` profile | types that resolve to the wrong place under `node10`, `node16`, `bundler` |

The `esm-only` profile is deliberate: the package ships only ESM, and CommonJS consumers are covered by `require(esm)` in `feature.node-runtime`.

## Limits

Both tools check _where_ the package and its types resolve, not _what_ they resolve to: neither compiles the declaration files. They reported the broken 2.1.3 as healthy, although its typings resolved to the shipped `.ts` sources. `feature.typescript-compiler` covers that gap by compiling a consumer against them.
