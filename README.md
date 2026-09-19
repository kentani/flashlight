# flashlight / おもちゃばこ

ライト・おえかき・音楽などを楽しむ、日本語のブラウザ向けおもちゃアプリです。
Nuxt 2 / Vue 2 / Vuetify 2 を使ったクライアント側アプリで、公開時のベース URL は `/flashlight/` です。

## 開発環境

- Node.js **22.23.2**（`.nvmrc`）
- Yarn Classic **1.22.19**（`package.json` の `packageManager`）
- Git。PR の操作には認証済み GitHub CLI (`gh`) を使用します。

Node の管理に nvm を使う場合:

```sh
nvm install
nvm use
corepack enable
corepack prepare yarn@1.22.19 --activate
yarn install --frozen-lockfile
yarn dev:isolated
```

Volta を使う場合は `volta install node@22.23.2 yarn@1.22.19` で上記のバージョンを用意できます（既定バージョンが変わります）。
`yarn dev:isolated` は空いているポートを自動で選び、開く URL を表示します。表示された URL をブラウザで開き、確認後は Ctrl-C で停止してください。
通常の開発に API キーや `.env` は不要です。依存パッケージの取得と Google Fonts のダウンロードにはネットワークが必要です。
Nuxt 2.16 の依存パッケージは古い Node バージョン範囲を宣言しているため、`.yarnrc` で engine 検査をスキップします。実行環境は `.nvmrc` と CI で固定し、テスト・ビルドで互換性を確認します。
依存関係は Yarn と `yarn.lock` で管理します。npm install は使用しません。

## 検証

```sh
yarn test:ci        # Jest を非対話・単一プロセスで実行
yarn build          # 本番ビルド（.nuxt/）
yarn generate:check # 静的サイトの生成確認（.preview/）
```

`yarn test` は通常の Jest 実行です。テストは `test/` に追加します。
Vue 2 用の Jest 29 transformer と、音声・画像のモックを設定済みです。
最初の回帰テストはライトのタップによる移動・拡大縮小・音声再生呼び出しを確認します。
音が実際に出ること、タッチ操作、PWA のオフライン動作はブラウザでも確認してください。
現在 lint コマンドはありません。

GitHub Actions は PR と main/master への push で、固定した Node/Yarn による依存インストール・テスト・静的生成を実行します。
既存の CSS の空の `url()`、古い Browserslist データ、大きなアセットについてビルド警告が出ます。今回の環境整備ではアプリの見た目や依存フレームワークを刷新していません。

## Codex で作業する

1. このリポジトリのローカルフォルダを Codex のプロジェクトとして開きます。
2. 新しい実装タスクは、コンポーザー下の **Worktree** を選んで開始します。並行タスクごとに別の Worktree を使います。
3. 対象の画面・期待する動作・完了条件を伝えます。
4. ブラウザ確認は `yarn dev:isolated` で起動し、表示された URL を使います。確認後は Ctrl-C で停止します。
5. PR 作成または引き継ぎ後にタスクをアーカイブすると、Codex 管理の Worktree は自動クリーンアップの対象になります。
6. Codex はルートの [AGENTS.md](AGENTS.md) を読み、構成・編集方針・検証コマンドを参照します。
7. 差分と検証結果を確認し、作業ブランチから PR を作成します。

依頼例:

> ライト画面で音をオン・オフできるようにしてください。初期状態はオンとし、スマホで押しやすいボタンを追加してください。変更箇所のテストとビルドを確認し、PR にまとめてください。

Codex Cloud を使用する場合は、別途 GitHub リポジトリの接続とクラウド環境の設定が必要です。このリポジトリのファイルだけでアカウント連携が有効になるわけではありません。

## 構成と公開

| 場所 | 用途 |
| --- | --- |
| `pages/` | 各おもちゃの画面と動作。`index.vue` はメニュー |
| `layouts/default.vue` | 共通ナビゲーション・スタイル |
| `assets/` | バンドルする画像・音声・SCSS |
| `static/` | そのまま配信するファイル |
| `nuxt.config.js` | ルーティング・PWA・ビルド設定 |
| `test/` | 自動テスト |
| `dist/` | ローカルの静的生成物（Git 管理外） |

GitHub Pages は GitHub Actions が `.pages/` に生成した成果物をデプロイします。`yarn generate` はローカルの無視対象 `dist/` に出力します。
通常の開発・CI では `yarn generate:check` を使います。こちらは無視対象の `.preview/` に出力します。
