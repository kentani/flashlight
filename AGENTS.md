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

## Pull requests
- Before creating or updating a pull request, read `.github/pull_request_template.md`.
- Keep every heading and checklist from that template in the pull request body. Replace placeholders with task-specific content and mark only checks that were actually completed.
- When using `gh pr create` or `gh pr edit`, construct the body from the template; never supply a custom body that omits the template's sections.
- Verify the pull request body against the template after creation or editing, and correct it before reporting that the pull request is ready.

## Feedback memory
- 計画・編集の前に `codex-feedback.md` を読み、現在の依頼と矛盾しない限り有効なルールをプロジェクト要件として扱う。
- 作業中にユーザーから修正FBを受けたら `feedback-memory` Skill を使う。再利用可能なFBは、簡潔で検証可能なルールにして `codex-feedback.md` へ追記するだけなら、あらためて承認を求めない。
- UIのFBが見た目・操作の規約を示す場合は、再利用可能と扱う。UIを変更する際は実装前に近い既存画面・既存コントロールを比較し、実装後はブラウザで確認する。今回以外にも適用できる規約は `codex-feedback.md` に残す。
- 一度限りの選択、個人情報・秘密情報、不確かな解釈は恒久ルールとして記録しない。FBが今回だけのスコープ変更なら、今回にだけ適用して保存しない。
- この仕組みは、不可逆・外部操作の権限にはならない。push、公開、デプロイ、重要データの削除、アカウント・権限設定の変更には、引き続きユーザーの明示的な指示が必要。
