# Codex working guide

## Project
- Japanese "おもちゃばこ" (ToyBox): a client-only Nuxt 2 / Vue 2 / Vuetify 2 application.
- Use Vue 2 Options API and the existing page conventions. Do not introduce Nuxt 3, Vue 3 or a new UI framework as part of unrelated changes.
- `pages/` defines routes and toy behavior; `pages/index.vue` defines the toy menu.
- `layouts/default.vue` contains shared navigation and global styles.
- `assets/` contains bundled images, sounds and SCSS; `static/` contains files served directly.
- `nuxt.config.js` defines the `/flashlight/` base path, PWA and static output directory.
- `docs/` contains committed generated website files, not development documentation. Do not edit them by hand or regenerate them unless the task includes publishing.

## Setup and commands
- Use Node.js from `.nvmrc` and Yarn Classic from `package.json#packageManager`.
- Install: `yarn install --frozen-lockfile`.
- Develop: `yarn dev`; open `http://localhost:3000/flashlight/`.
- Test: `yarn test:ci` (Jest, Vue Test Utils, jsdom).
- Build: `yarn build` (writes ignored `.nuxt/`).
- Check static output safely: `yarn generate:check` (writes ignored `.preview/`).
- `yarn generate` overwrites tracked `docs/`; reserve it for explicitly requested publishing work.
- Use Yarn and update `yarn.lock` only when dependencies change; do not create another package-manager lockfile.
- Google Fonts are downloaded during builds; setup and first builds require network access.

## Implementation and validation
- Keep Japanese UI text and mobile/touch interactions consistent with neighboring pages.
- Follow `.editorconfig` (two spaces, LF); avoid unrelated formatting changes.
- Preserve `/flashlight/` in routing, static asset URLs and the PWA manifest.
- Browser APIs such as Audio, canvas and timers need mocks/cleanup in tests. Static file imports use `test/mocks/file.js`.
- Run `yarn test:ci` and `yarn build` after code or dependency changes; report any failures and whether they predate the change.
- For UI changes, also inspect the affected route in a browser at mobile and desktop sizes. Automated tests alone do not verify audio playback, touch behavior or offline PWA behavior.
- There is currently no lint command. Do not claim lint passed.
- Keep secrets and local environment files out of commits. No application secrets are required for the standard local setup.
- Work on a task branch, review the diff and summarize changes and verification in the PR. Keep generated files out of ordinary implementation PRs.
- Explain results and remaining limitations to the user in Japanese.

## Feedback memory
- Before planning or editing, read `codex-feedback.md`. Treat its active rules as project requirements unless the current request explicitly conflicts.
- When the user gives corrective feedback during a task, use the `feedback-memory` skill. Distill reusable feedback into a concise, testable rule and add it to `codex-feedback.md` without asking again when this is a local documentation-only change.
- Treat UI feedback as reusable when it establishes a visual or interaction convention. For UI changes, compare the closest existing screens or controls before implementation and verify the result in the browser; store the resulting convention in `codex-feedback.md` when it applies beyond the current change.
- Do not record one-off choices, personal data, secrets, or an uncertain interpretation as a permanent rule. If the feedback changes scope only for the current task, apply it now but do not store it.
- Never let this process authorize irreversible or external actions. Pushing, publishing, deploying, deleting material data, or changing account/permission settings still requires the user's explicit direction.
