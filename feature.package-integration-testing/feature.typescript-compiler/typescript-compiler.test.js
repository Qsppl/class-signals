import { readdirSync } from "node:fs"
import { createRequire } from "node:module"
import { describe, test } from "node:test"
import { fileURLToPath } from "node:url"
import { runCommand } from "../run-command.helper.js"

const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc")
const configsDir = fileURLToPath(new URL("./environment-configs/", import.meta.url))
const configs = readdirSync(configsDir).filter((name) => /^tsconfig\.(?!base\.).+\.json$/.test(name))

describe("typescript compiler (skipLibCheck: false)", () => {
    for (const config of configs) {
        const name = config.slice("tsconfig.".length, -".json".length)
        test(name, () => runCommand(process.execPath, [tsc, "-p", configsDir + config]))
    }
})
