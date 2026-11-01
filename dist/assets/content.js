// 自分の情報へ差し替えるファイルです。実績・スキルは表示確認用のサンプルです。
export const profile = {
  name: 'Kano Sasaki',
  handle: 'dareka-san',
  role: 'Frontend Developer\n& Curious Builder',
  tagline: 'コードを書くこと。仕組みを知ること。\n小さな「おもしろい」を、かたちに。',
  intro: 'アイデアが動き出す瞬間が好きです。\n使いやすいUIと、読みやすいコード。\nその両方を大切に、Webのものづくりを楽しんでいます。',
  location: 'Japan',
  githubUrl: 'https://github.com/dareka-san',
  learning: 'アクセシビリティと、心地よいインタラクションを探求中。',
  isSample: true,
};

export const projects = [
  {
    id: 'orbit-dashboard', title: 'orbit-dashboard', subtitle: '日々の情報に、ひとつの居場所を。',
    description: '必要な情報をひと目で把握する、シンプルな分析ダッシュボード。',
    image: './assets/orbit.svg', imageAlt: 'ダークテーマの分析ダッシュボードのサンプル画面',
    category: 'application', kind: 'Web Application', tags: ['React', 'TypeScript', 'Tailwind CSS'],
    language: 'TypeScript', color: '#3178c6', year: '2026', role: 'UI設計 / フロントエンド',
    overview: '複数のデータをひとつの画面で確認するダッシュボードのサンプルです。情報量が多くても迷わず使えるよう、優先順位と余白を意識した構成にしています。',
    challenge: '指標・グラフ・履歴が混在する画面で、視線の流れと情報のまとまりを整理することをテーマにしました。',
    features: ['主要な指標をまとめたサマリーカード', '期間別に比較できるグラフのUI設計', '画面幅に合わせて組み替わるレスポンシブレイアウト'],
    lesson: 'データを増やす前に、利用する人が何を判断したいかを整理することが、分かりやすい画面につながると学びました。',
    liveUrl: '', repositoryUrl: '',
  },
  {
    id: 'studio-website', title: 'studio-website', subtitle: '余白で伝える、ブランドの空気感。',
    description: 'タイポグラフィと余白を軸にした、クリエイティブスタジオのWebサイト。',
    image: './assets/studio.svg', imageAlt: 'アイボリーとオレンジを使ったスタジオサイトのサンプル画面',
    category: 'website', kind: 'Website', tags: ['HTML / CSS', 'JavaScript', 'Responsive'],
    language: 'JavaScript', color: '#e3b341', year: '2026', role: 'デザイン / コーディング',
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
    language: 'TypeScript', color: '#3178c6', year: '2026', role: '企画 / UI設計 / 開発',
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
    language: 'JavaScript', color: '#e3b341', year: '2026', role: 'デザイン / フロントエンド',
    overview: '集中する時間と休憩する時間を切り替えるタイマーのサンプルです。情報を最小限に抑え、時間の経過を穏やかに伝える画面を考えました。',
    challenge: '残り時間を認識しやすくしながら、作業の邪魔にならないインタラクションを設計することをテーマにしています。',
    features: ['円形のプログレス表示', '作業と休憩を切り替えるモード設計', 'キーボード操作と通知音を想定したUI'],
    lesson: '状態が少ない小さなツールでも、停止・再開・完了時の振る舞いを丁寧に考える必要があると学びました。',
    liveUrl: '', repositoryUrl: '',
  },
];

export const skillGroups = [
  { title: 'Frontend', label: 'インターフェースをつくる', icon: 'code', skills: [
    { name: 'HTML / CSS', color: '#e77b56' }, { name: 'JavaScript', color: '#e3b341' },
    { name: 'TypeScript', color: '#3178c6' }, { name: 'React', color: '#58c4dc' },
    { name: 'Tailwind CSS', color: '#38bdf8' },
  ] },
  { title: 'Tools & Workflow', label: 'つくる過程も、心地よく', icon: 'terminal', skills: [
    { name: 'Git / GitHub', color: '#f78166' }, { name: 'VS Code', color: '#58a6ff' },
    { name: 'Figma', color: '#d2a8ff' }, { name: 'npm', color: '#e56b6f' },
  ] },
  { title: 'Currently Learning', label: '好奇心の、その先へ', icon: 'stack', skills: [
    { name: 'Accessibility', color: '#56d084' }, { name: 'UI / UX Design', color: '#d2a8ff' },
    { name: 'Web Performance', color: '#e3b341' },
  ] },
];
