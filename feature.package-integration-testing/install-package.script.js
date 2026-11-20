// Builds the library from a clean state, packs it exactly as `npm publish` would,
// and installs the tarball into this bench, so every suite imports the real package.
import { execFileSync } from "node:child_process"
import { mkdirSync, readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const benchRoot = fileURLToPath(new URL(".", import.meta.url))
const repoRoot = fileURLToPath(new URL("..", import.meta.url))

const npm = (args, cwd) => execFileSync("npm", args, { cwd, stdio: ["ignore", "pipe", "inherit"], shell: process.platform === "win32" }).toString()

// Start from a clean build: stale output of a deleted .ts would otherwise be packed.
rmSync(join(repoRoot, ".esm-build"), { recursive: true, force: true })
for (const entry of readdirSync(join(repoRoot, "feature.signals"), { recursive: true, withFileTypes: true })) {
    if (entry.isFile() && !entry.name.endsWith(".ts")) throw new Error(`unexpected non-source file in feature.signals: ${join(entry.parentPath, entry.name)}`)
    if (entry.isFile() && entry.name.endsWith(".d.ts")) throw new Error(`unexpected declaration file in feature.signals: ${join(entry.parentPath, entry.name)}`)
}

npm(["run", "build"], repoRoot)

const packDir = join(benchRoot, ".pack")
rmSync(packDir, { recursive: true, force: true })
mkdirSync(packDir)
const [{ filename }] = JSON.parse(npm(["pack", "--json", "--pack-destination", packDir], repoRoot))

npm(["install", "--no-save", "--no-audit", "--no-fund", join(packDir, filename)], benchRoot)
console.log(`installed ${filename} into the integration bench`)
