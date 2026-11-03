# Developer Portfolio

GitHub風のUIとTailwind CSSで構築した、1ページのポートフォリオです。

## 機能

- 自己紹介、スキル、サムネイル付きの実績紹介
- 実績詳細モーダル（Esc・背景クリック・閉じるボタンに対応）
- Splideによる実績写真スライダー（矢印・ドット・スワイプ操作）
- 実績のカテゴリー絞り込み
- ダークテーマ、プロフィールのコピー
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

- `profile`: 名前、ハンドル、自己紹介、GitHub URLなど。差し替え後に `isSample` を `false` にするとモーダル内の「Sample project」表示が消えます。
- `profile.strengths`: Skills内の「強み」の説明文。`\n` で改行、`\n\n` で空行を入れられます。
- `projects`: タイトル、共通の説明文（`subtitle`）、サムネイル、担当範囲、課題、工夫、公開URLなど。`subtitle` は一覧カードと詳細モーダルの両方に表示します。
- 一部の実績には、`sourceUrl` に移行元の実績ページを記録しています。画面には表示しない任意の参照情報です。画像は `dist/assets/works/` にあるファイル数に合わせています。
- `skillGroups`: スキルの分類と項目。
- `careerEntries`: 新しい順の経歴。期間・所属・役職・説明を編集できます。実際の内容に差し替えた項目は `isSample` を `false` にすると「記入例」の表示が消えます。

公開前にプロフィール・実績・経歴・スキルの内容と、`dist/index.html` の説明文、アバター、自己紹介も確認してください。

実績の `liveUrl` と `repositoryUrl` は、空欄の場合リンクを表示しません。`profile.githubUrl` はプロフィールのコピーに使います。ヘッダーのGitHubリンクは `dist/index.html` で変更できます。
どちらの実績URLも未設定なら、リンク欄や未設定の案内文は表示しません。

各実績の `liveUrlTitle` でリンクボタン名を変更できます（例：`liveUrlTitle: 'Instagramを見る'`）。空文字・空白のみ・未指定の場合は「サイトを見る」を使います。`liveUrl` 自体が未設定の場合は、ボタン名を入力してもボタンは表示しません。

各実績に `isHidden: true` を指定すると、一覧・カテゴリー絞り込み・モーダルの表示対象から除外し、件数にも含めません。`isHidden: false` または未指定なら表示します。変更を保存してページを再読み込みすると反映されます。データや画像自体は残るため、配信ファイルへのアクセスを制限する機能ではありません。

`challenge: false` にすると「課題とアプローチ」、`features: false` にすると「主なポイント」を見出しごと非表示にします。空文字・空配列・項目の省略でも非表示になります。表示する場合は、`challenge` に文章、`features` に文字列の配列を設定してください。

各実績の見出しは `challengeTitle` と `featuresTitle` で変更できます。空文字・空白のみ・未指定の場合は、それぞれ「課題とアプローチ」「主なポイント」に戻ります。

```js
challengeTitle: '制作の背景',
featuresTitle: '担当したこと',
```

モーダルの写真は、各実績の `images` に設定できます。`image` は一覧カード用のサムネイルとして使います。

```js
images: [
  { src: './assets/photo-1.jpg', alt: '写真1枚目の説明' },
  { src: './assets/photo-2.jpg', alt: '写真2枚目の説明' },
],
```

`images` を省略するか空の配列にすると、`image` を1枚表示します。1枚の場合は矢印・ドットを非表示にします。SplideのJavaScriptとライセンスは、開発・ビルド・プレビューの起動時に `dist/assets/vendor/` へコピーされます。

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
