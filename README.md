# Developer Portfolio

GitHub風のUIとTailwind CSSで構築した、1ページのポートフォリオです。

## 機能

- 自己紹介、スキル、サムネイル付きの実績紹介
- 実績詳細モーダル（Esc・背景クリック・閉じるボタンに対応）
- 実績のカテゴリー絞り込み
- ダーク / ライトテーマ（ブラウザに保存）
- セクション移動メニュー（`/` キー）、プロフィールのコピー
- モバイル対応、キーボード操作、動きを抑える設定への対応

## 開発・確認

Node.js 20以上を使用します。この環境ではNode.js 24と依存関係を準備済みです。

ターミナルでプロジェクトに移動して、開発サーバーを起動します。

```sh
cd /Users/kanosasaki/Documents/Codex/Portfolio/portfolio
npm run dev
```

`http://127.0.0.1:4173` を開きます。Tailwind CSSの生成、ファイル変更の監視、ブラウザの自動再読み込みがまとめて動きます。HTML・JavaScript・サムネイル・`src/styles.css` を保存すると画面に反映されます。停止するときは、起動したターミナルで `Ctrl+C` を押してください。ローカルの変更がGitHubや公開サイトへ自動送信されることはありません。

別のPCなど、依存関係がまだ入っていない環境では、最初に `npm ci` を実行してください。

公開用のCSS生成と構文チェックは、次のコマンドです。

```sh
npm run build
npm run check
```

生成したファイルを自動更新なしで確認する場合は `npm run preview` を使えます。`dev` と `preview` は同じポートを使うため、同時には起動しないでください。

## 自分の情報への差し替え

`dist/assets/content.js` にプロフィール、実績、スキル、経歴をまとめています。

`data-profile` 属性が付いたプロフィール本文は、ページ表示時に `content.js` の内容で置き換わります。この本文を変えるときは `index.html` ではなく `content.js` を編集してください。レイアウトは `dist/index.html`、色や追加スタイルは `src/styles.css` で調整します。`dist/assets/styles.css` は自動生成されるため直接編集しません。

- `profile`: 名前、ハンドル、自己紹介、GitHub URLなど。差し替え後に `isSample` を `false` にするとプレビュー表示が消えます。
- `projects`: タイトル、説明、サムネイル、担当範囲、課題、工夫、学び、公開URLなど。
- `skillGroups`: スキルの分類と項目。
- `careerEntries`: 新しい順の経歴。期間・所属・役職・説明を編集できます。実際の内容に差し替えた項目は `isSample` を `false` にすると「記入例」の表示が消えます。

名前・ハンドル・GitHub URLは、接続されたGitHubプロフィールに合わせています。自己紹介文・職種・スキル・4件の実績はサンプルです。サムネイルも、このサイトのために作成したサンプル画像です。実際の実績へ差し替えて使用してください。公開前に `dist/index.html` の説明文、アバター、サイドバーの趣味タグ、自己紹介の見出しとコード例も確認してください。

実績の `liveUrl` と `repositoryUrl` は、空欄の場合リンクを表示しません。`profile.githubUrl` も同様です。

## 構成

```text
dist/                 公開する静的ファイル
  index.html          1ページのサイト本体
  assets/
    content.js        編集するコンテンツ
    app.js            モーダル・絞り込みなど
    styles.css        Tailwindで生成したCSS
    *.svg             アバター・サムネイル
src/styles.css        Tailwind設定と追加スタイル
scripts/dev.mjs       CSS監視とサーバーをまとめて起動
scripts/preview.mjs   ローカル確認用サーバー・自動再読み込み
```

## 公開

`npm run build` 実行後、`dist/` の内容を静的サイトのホスティング先へ配置できます。外部CDN・外部フォント・実行時のフレームワーク依存はありません。非公開のGitHubリポジトリを作成しただけでは、Webサイトは一般公開されません。

Tailwind CSSのユーティリティで独自のUIを実装しています。有料のTailwind PlusコンポーネントやGitHub公式素材は含めていません。
