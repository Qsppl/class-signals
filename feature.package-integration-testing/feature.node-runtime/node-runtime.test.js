import { test } from "node:test"
import { fileURLToPath } from "node:url"
import { runCommand } from "../run-command.helper.js"

const runConsumer = (file) => runCommand(process.execPath, [fileURLToPath(new URL(file, import.meta.url))])

test("node: ESM import", () => runConsumer("./esm.consumer.js"))

test("node: CommonJS require()", () => runConsumer("./cjs.consumer.cjs"))

test("node: .ts consumer via built-in type stripping", () => runConsumer("./type-stripping.consumer.ts"))
