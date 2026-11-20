# TypeScript compiler

Checks that the published typings of `class-signals` compile in the `tsc` setups consumers actually use.

`public-api.consumer.ts` uses the public API the way an application would. `tsc` compiles it against the packed package once per `environment-configs/tsconfig.<mode>.json`.

| Config             | Consumer it stands for                     | Topics                                                                                                                                                                                               |
| ------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nodenext`         | Node.js ESM project                        | [`module`](https://www.typescriptlang.org/tsconfig/#module), [modules reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)                                                |
| `node16`           | Node.js project pinned to an older mode    | [`moduleResolution`](https://www.typescriptlang.org/tsconfig/#moduleResolution)                                                                                                                      |
| `node10`           | legacy resolution, ignores `exports`       | [`moduleResolution`](https://www.typescriptlang.org/tsconfig/#moduleResolution), `types` field in `package.json`                                                                                     |
| `bundler`          | Vite or webpack project                    | [`moduleResolution: bundler`](https://www.typescriptlang.org/tsconfig/#moduleResolution)                                                                                                             |
| `bundler-verbatim` | bundler project with strict import elision | [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax), [`isolatedModules`](https://www.typescriptlang.org/tsconfig/#isolatedModules)                               |
| `strictest`        | project with the strictest checks          | [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes), [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) |
| `node-without-dom` | Node.js project without the DOM library    | [`lib`](https://www.typescriptlang.org/tsconfig/#lib), [`types`](https://www.typescriptlang.org/tsconfig/#types), `@types/node` globals                                                              |

All of them extend `environment-configs/tsconfig.base.json`, which sets [`skipLibCheck: false`](https://www.typescriptlang.org/tsconfig/#skipLibCheck): the package's `.d.ts` files are compiled, not trusted.

The `@ts-expect-error` lines in `public-api.consumer.ts` assert that misuse is rejected. If the typings ever resolve to `any`, nothing is rejected and `tsc` fails on the unused directives. See [`// @ts-expect-error` comments](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments).

To cover another setup, add a `tsconfig.<mode>.json` to `environment-configs/`: the test picks it up by its file name.
