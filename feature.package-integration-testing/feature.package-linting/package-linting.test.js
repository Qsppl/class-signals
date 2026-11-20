import assert from "node:assert/strict"
import { readdirSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { test } from "node:test"
import { publint } from "publint"
import { formatMessage } from "publint/utils"
import { fileURLToPath } from "node:url"
import { runCommand } from "../run-command.helper.js"

const benchRoot = fileURLToPath(new URL("..", import.meta.url))

const packDir = join(benchRoot, ".pack")
const tarball = join(
    packDir,
    readdirSync(packDir).find((name) => name.endsWith(".tgz")),
)

test("publint", async () => {
    const pkgDir = join(benchRoot, "node_modules", "class-signals")
    const { messages, pkg } = await publint({ pkgDir, pack: false, strict: true })
    assert.deepEqual(
        messages.map((message) => `${message.type}: ${formatMessage(message, pkg)}`),
        [],
    )
})

test("are the types wrong", () => {
    const attw = join(createRequire(import.meta.url).resolve("@arethetypeswrong/cli/package.json"), "..", "dist", "index.js")
    // esm-only: the package is ESM-only on purpose; CommonJS consumers are covered by require(esm) in the Node test.
    runCommand(process.execPath, [attw, tarball, "--profile", "esm-only", "--format", "ascii"])
})
