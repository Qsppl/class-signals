# Contributing

Thanks for helping improve `class-signals`. This guide covers the development workflow: setup, commits, pull requests and releases.

## Setup

Requirements: Node.js 24 and npm 11.2 or later.

```bash
git clone https://github.com/Qsppl/class-signals.git
cd class-signals
npm install
```

`npm install` also installs the Git hooks (via Husky):

- **pre-commit** formats staged files with Prettier and re-adds them;
- **commit-msg** checks the message with commitlint and runs the TypeScript check.

Useful scripts:

| Script                     | What it does                  |
| -------------------------- | ----------------------------- |
| `npm run prettier:write`   | Format the code               |
| `npm run prettier:check`   | Check formatting (as CI does) |
| `npm run typescript:check` | Type-check the project        |

## Commits

Messages follow [Conventional Commits](https://www.conventionalcommits.org/). The type decides whether a release happens:

| Type                                           | Example                                     | Release               |
| ---------------------------------------------- | ------------------------------------------- | --------------------- |
| `fix:`                                         | `fix: handle unsubscribe during activation` | patch (2.0.2 → 2.0.3) |
| `feat:`                                        | `feat: add once() helper`                   | minor (2.0.2 → 2.1.0) |
| `feat!:` or `BREAKING CHANGE:` in the body     | `feat!: rename activate() to emit()`        | major (2.0.2 → 3.0.0) |
| `docs:`, `chore:`, `refactor:`, `test:`, `ci:` | `docs: fix typo in README`                  | none                  |

The README shown on npm only updates with a new release. To publish a README fix, use `fix:`.

## Pull requests

1. Create a branch from `main`: `git checkout -b fix/short-description`.
2. Commit, push and open a pull request into `main`.
3. The PR title must be a Conventional Commit too (`fix: ...`, `feat: ...`): it is checked in CI and becomes the commit message on squash merge.
4. CI runs formatting and type checks, and lints every commit message. Merge when all checks are green, using **Squash and merge**.

## Releases

Releases are automated with [release-please](https://github.com/googleapis/release-please):

1. After a `fix:` or `feat:` commit lands on `main`, release-please opens or updates a pull request named `chore(main): release X.Y.Z` with the new version and changelog.
2. Review the changelog in that PR and merge it.
3. The release job then creates the GitHub release and tags (`vX.Y.Z`, `vX.Y`, `vX`) and publishes the package to npm through trusted publishing (OIDC), with no npm token stored in the repository.

Do not edit the version in `package.json` or `CHANGELOG.md` by hand: release-please owns both.
