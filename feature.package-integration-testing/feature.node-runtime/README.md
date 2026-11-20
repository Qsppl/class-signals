# Node.js runtime

Checks that the packed `class-signals` loads and works in Node.js through each way a Node.js project can load it.

| File                         | Role                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `consumer.scenario.js`       | Runtime contract shared by all consumers; throws on the first mismatch                     |
| `esm.consumer.js`            | Loads the package with `import`                                                            |
| `cjs.consumer.cjs`           | Loads it with `require()`, which works through `require(esm)` (unflagged since Node 22.12) |
| `type-stripping.consumer.ts` | Loads it from a `.ts` file that Node runs with its built-in type stripping, no compiler    |
| `node-runtime.test.js`       | Runs each consumer as a separate `node` process                                            |

## How it works

Each consumer imports `class-signals` by name, so Node resolves it from the bench's `node_modules`, where `pretest` installs the tarball produced by `npm pack`. The consumer passes the module namespace to `runScenario`, so it stays responsible only for _how_ the package is loaded.

The scenario covers function and object subscribers, `unsubscribe`, `once`, an `AbortSignal`, and a `ProtectedSignal` activated through its controller. A mismatch throws, the process exits with a non-zero code, and the test fails with the process output.

## Adding a consumer

1. Add a file that loads the package and calls `runScenario(lib)`.
2. Add one `test(...)` line for it in `node-runtime.test.js`.
