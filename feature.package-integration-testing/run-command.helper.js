import { spawnSync } from "node:child_process"

/** Runs a command and fails with its full output when it exits non-zero. */
export function runCommand(command, args) {
    const { status, stdout, stderr, error } = spawnSync(command, args, { encoding: "utf8" })
    if (error) throw error
    if (status !== 0) throw new Error(`${[command, ...args].join(" ")} exited with ${status}\n${stdout}${stderr}`)
}
