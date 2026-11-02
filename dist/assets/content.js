// 自分の情報へ差し替えるファイルです。実績・スキルは表示確認用のサンプルです。
export const profile = {
  name: 'Kano Sasaki',
  handle: 'dareka-san',
  role: 'Web Designer / Director / Frontend Engineer',
  tagline: 'Webを専門領域に、人と組織の課題をデザインと技術で解決すること。',
  intro: 'Webデザイン・フロントエンドエンジニアを専門領域として制作会社・事業会社に約16年携わってきました。\n近年はWeb制作に限らず、SNS、グラフィック、イベント、社内向けツールなど、目的に応じて手段を選択し、顧客・社員・企業とのコミュニケーション構築や業務環境の改善にも取り組んできました。\nその両方を大切に、Webのものづくりを楽しんでいます。',
  location: 'Japan / Kanagawa',
  githubUrl: 'https://github.com/dareka-san',
  learning: 'Rive/Blenderを使用したインタラクション表現',
  isSample: false,
};

export const projects = [
  {
    id: 'iface-website', title: 'iFace公式サイト', subtitle: 'スマートフォンケースブランド「iFace」の公式サイトTOPページリニューアル。ユーザーリサーチからUI/UXを改善',
    description: 'スマートフォンケースブランド「iFace」の公式サイトTOPページリニューアル。ユーザーリサーチからUI/UXを改善。',
    image: './assets/img-iface-1.jpg', imageAlt: 'スマートフォンケースブランド「iFace」の公式サイトのサムネイル画像',
    // 2枚目以降は差し替え用の仮画像です。srcとaltを変更して実績写真を追加できます。
    images: [
      { src: './assets/img-iface-1.jpg', alt: 'iFace公式サイトの実績写真 1枚目' },
      { src: './assets/img-iface-1.jpg', alt: 'iFace公式サイトの実績写真 2枚目（仮画像）' },
      { src: './assets/img-iface-1.jpg', alt: 'iFace公式サイトの実績写真 3枚目（仮画像）' },
    ],
    category: 'application', kind: 'Hamee株式会社様', tags: ['HTML/CSS', 'JavaScript', 'UI/UX','UserResearch'],
    color: '#3178c6', year: '2026', role: 'UI設計 / フロントエンド',
    overview: '複数のデータをひとつの画面で確認するダッシュボードのサンプルです。情報量が多くても迷わず使えるよう、優先順位と余白を意識した構成にしています。',
    challenge: '指標・グラフ・履歴が混在する画面で、視線の流れと情報のまとまりを整理することをテーマにしました。',
    features: ['主要な指標をまとめたサマリーカード', '期間別に比較できるグラフのUI設計', '画面幅に合わせて組み替わるレスポンシブレイアウト'],
    lesson: 'データを増やす前に、利用する人が何を判断したいかを整理することが、分かりやすい画面につながると学びました。',
    liveUrl: 'https://jp.iface.com', repositoryUrl: '',
  },
  {
    id: 'studio-website', title: 'studio-website', subtitle: '余白で伝える、ブランドの空気感。',
    description: 'タイポグラフィと余白を軸にした、クリエイティブスタジオのWebサイト。',
    image: './assets/studio.svg', imageAlt: 'アイボリーとオレンジを使ったスタジオサイトのサンプル画面',
    category: 'website', kind: 'Website', tags: ['HTML / CSS', 'JavaScript', 'Responsive'],
    color: '#e3b341', year: '2026', role: 'デザイン / コーディング',
    overview: '架空のクリエイティブスタジオを題材にしたWebサイトのサンプルです。装飾を抑え、文字の大きさと写真の配置で印象をつくることを目指しました。',
    challenge: 'ブランドらしさを感じるビジュアルと、内容の読みやすさを両立することをテーマにしています。',
    features: ['文字の強弱を生かしたファーストビュー', '作品を主役にしたシンプルなグリッド', 'モバイルでも読みやすい余白と文字サイズ'],
    lesson: '要素を足すだけでなく、減らすことで伝えたい内容を際立たせる設計の大切さを学びました。',
    liveUrl: '', repositoryUrl: '',
  },
  {
    id: 'dev-notes', title: 'dev-notes', subtitle: '学んだことを、未来の自分へ。',
    description: 'コードと気づきを蓄積する、開発者のためのミニマルなノートアプリ。',
    image: './assets/notes.svg', imageAlt: 'マークダウン形式の開発ノートアプリのサンプル画面',
    category: 'application', kind: 'Personal Project', tags: ['React', 'Markdown', 'Local Storage'],
    color: '#3178c6', year: '2026', role: '企画 / UI設計 / 開発',
    overview: '日々の開発で得た知識を残すためのノートアプリのサンプルです。書き始めるまでの操作を少なくし、内容に集中できる体験を考えました。',
    challenge: '編集機能を詰め込みすぎず、書く・探す・読み返すという基本の流れを自然につなぐことをテーマにしました。',
    features: ['Markdownを使ったノート編集のUI', 'タグで整理するノート一覧', 'ローカル保存を想定したシンプルなデータ構造'],
    lesson: '小さな個人開発でも、利用する場面を絞ると、必要な機能を判断しやすくなると学びました。',
    liveUrl: '', repositoryUrl: '',
  },
  {
    id: 'focus-timer', title: 'focus-timer', subtitle: 'ひとつのことに、深く潜る。',
    description: '作業と休憩のリズムを整える、ブラウザで使うフォーカスタイマー。',
    image: './assets/focus.svg', imageAlt: '紫色の背景に円形タイマーを配置したサンプル画面',
    category: 'application', kind: 'Small Experiment', tags: ['JavaScript', 'CSS', 'Web Audio'],
    color: '#e3b341', year: '2026', role: 'デザイン / フロントエンド',
    overview: '集中する時間と休憩する時間を切り替えるタイマーのサンプルです。情報を最小限に抑え、時間の経過を穏やかに伝える画面を考えました。',
    challenge: '残り時間を認識しやすくしながら、作業の邪魔にならないインタラクションを設計することをテーマにしています。',
    features: ['円形のプログレス表示', '作業と休憩を切り替えるモード設計', 'キーボード操作と通知音を想定したUI'],
    lesson: '状態が少ない小さなツールでも、停止・再開・完了時の振る舞いを丁寧に考える必要があると学びました。',
    liveUrl: '', repositoryUrl: '',
  },
];

export const careerEntries = [
  {
    period: 'YYYY.MM — 現在',
    organization: '現在の会社名・屋号',
    role: '職種・役職',
    description: '現在担当している業務やプロジェクト、チームでの役割などを記載します。',
    isSample: true,
  },
  {
    period: 'YYYY.MM — YYYY.MM',
    organization: '以前の会社名・所属先',
    role: '職種・役職',
    description: '担当した業務、経験したこと、取り組んだ課題や成果などを記載します。',
    isSample: true,
  },
  {
    period: 'YYYY.MM — YYYY.MM',
    organization: '学校名・最初の所属先',
    role: '学んだ分野・キャリアの出発点',
    description: '専門として学んだことや、ものづくりを始めたきっかけなどを記載します。',
    isSample: true,
  },
];

export const skillGroups = [
  { title: 'Frontend', label: 'フロントエンド', icon: 'code', skills: [
    { name: 'HTML / CSS', color: '#e77b56' }, { name: 'JavaScript', color: '#e3b341' },
    { name: 'TypeScript', color: '#3178c6' }, { name: 'React', color: '#58c4dc' },
    { name: 'Tailwind CSS', color: '#38bdf8' },
  ] },
  { title: 'Tools & Workflow', label: 'ツール・ワークフロー', icon: 'terminal', skills: [
    { name: 'Git / GitHub', color: '#f78166' }, { name: 'VS Code', color: '#58a6ff' },
    { name: 'Figma', color: '#d2a8ff' }, { name: 'npm', color: '#e56b6f' },
  ] },
  { title: 'Currently Learning', label: '🔥', icon: 'stack', skills: [
    { name: 'Accessibility', color: '#56d084' }, { name: 'UI / UX Design', color: '#d2a8ff' },
    { name: 'Web Performance', color: '#e3b341' },
  ] },
];
