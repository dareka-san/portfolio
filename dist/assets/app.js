import { profile, projects, skillGroups } from './content.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const icon = (name, classes = '') => `<svg class="icon ${classes}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const validUrl = (value) => {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
};

document.querySelectorAll('[data-profile]').forEach((element) => {
  const value = profile[element.dataset.profile];
  if (value !== undefined) { element.textContent = value; element.style.whiteSpace = 'pre-line'; }
});
document.title = `${profile.name} — Developer Portfolio`;
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#sample-notice').hidden = !profile.isSample;
const githubLink = document.querySelector('#github-link');
if (validUrl(profile.githubUrl)) { githubLink.href = validUrl(profile.githubUrl); githubLink.classList.remove('hidden'); githubLink.classList.add('flex'); }
document.querySelector('#project-total').textContent = projects.length;

function renderProjects(filter = 'all') {
  const visibleProjects = projects.filter((project) => filter === 'all' || project.category === filter);
  document.querySelector('#project-count').textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? 'project' : 'projects'}`;
  document.querySelector('#project-grid').innerHTML = visibleProjects.map((project) => `
    <button type="button" class="project-card" data-project="${escapeHtml(project.id)}" aria-haspopup="dialog" aria-label="${escapeHtml(project.title)}の詳細を見る">
      <div class="w-full overflow-hidden border-b border-line bg-subtle"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="800" height="420" loading="lazy" class="aspect-[800/420] w-full object-cover"></div>
      <div class="flex flex-1 flex-col px-5 pb-4 pt-4"><div class="flex items-center justify-between gap-3"><h3 class="flex min-w-0 items-center gap-2 font-mono text-[14px] font-semibold text-link">${icon('book', 'h-3.5 w-3.5 text-muted')}<span class="truncate">${escapeHtml(project.title)}</span></h3>${icon('arrow', 'card-arrow h-4 w-4 text-muted')}</div>
      <p class="mt-2 text-[12px] leading-6 text-muted">${escapeHtml(project.description)}</p>
      <div class="mb-4 mt-3 flex flex-wrap gap-1.5">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      <div class="mt-auto flex items-center justify-between border-t border-line/70 pt-3 text-[10px] text-muted"><span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full" style="background:${escapeHtml(project.color)}"></span>${escapeHtml(project.language)}</span><span class="font-mono">${escapeHtml(project.kind)} <span class="mx-1">·</span> ${escapeHtml(project.year)}</span></div></div>
    </button>`).join('');
}
renderProjects();

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  renderProjects(button.dataset.filter);
}));

document.querySelector('#skills-grid').innerHTML = skillGroups.map((group, index) => `
  <div class="p-5 ${index ? 'border-t border-line md:border-l md:border-t-0' : ''}"><h3 class="flex items-center gap-2 font-mono text-xs font-semibold">${icon(group.icon, 'h-4 w-4 text-muted')}${escapeHtml(group.title)}</h3><p class="mb-5 mt-2 text-[10px] text-muted">${escapeHtml(group.label)}</p><ul class="space-y-3.5">${group.skills.map((skill) => `<li class="flex items-center gap-2.5 text-xs text-muted"><span class="skill-dot" style="background:${escapeHtml(skill.color)}"></span>${escapeHtml(skill.name)}</li>`).join('')}</ul></div>`).join('');

const projectDialog = document.querySelector('#project-dialog');
const searchDialog = document.querySelector('#search-dialog');
function openDialog(dialog) {
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));

document.querySelector('#project-grid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = projects.find((item) => item.id === button.dataset.project);
  if (!project) return;
  const externalLinks = [
    { url: validUrl(project.liveUrl), text: 'サイトを見る' },
    { url: validUrl(project.repositoryUrl), text: 'ソースコードを見る' },
  ].filter((link) => link.url);
  document.querySelector('#dialog-body').innerHTML = `
    <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="800" height="420" class="aspect-[800/420] w-full border-b border-line object-cover">
    <div class="modal-content px-6 py-6 sm:px-8"><div class="flex items-center gap-2 font-mono text-[10px] text-muted"><span>${escapeHtml(project.kind)}</span><span>·</span><span>${escapeHtml(project.year)}</span>${profile.isSample ? '<span class="ml-auto rounded-full border border-line px-2 py-0.5">Sample project</span>' : ''}</div>
    <h2 id="dialog-title" class="mt-3 break-words font-mono text-2xl font-semibold text-link">${escapeHtml(project.title)}</h2><p class="mt-2 !text-ink">${escapeHtml(project.subtitle)}</p>
    <div class="mb-6 mt-4 flex flex-wrap gap-2">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
    <div class="mb-7 rounded-md border border-line bg-subtle px-4 py-3 text-xs"><span class="mr-4 text-muted">担当範囲</span>${escapeHtml(project.role)}</div>
    <section class="mb-6"><h3>概要</h3><p>${escapeHtml(project.overview)}</p></section>
    <section class="mb-6"><h3>課題とアプローチ</h3><p>${escapeHtml(project.challenge)}</p></section>
    <section class="mb-6"><h3>主なポイント</h3><ul class="space-y-3">${project.features.map((feature) => `<li class="flex items-start gap-2 text-sm leading-6 text-muted">${icon('check', 'mt-1 h-4 w-4 text-accent')}<span>${escapeHtml(feature)}</span></li>`).join('')}</ul></section>
    <section><h3>学んだこと</h3><p>${escapeHtml(project.lesson)}</p></section>
    ${externalLinks.length ? `<div class="mt-7 flex flex-wrap gap-3 border-t border-line pt-5">${externalLinks.map((link) => `<a href="${escapeHtml(link.url)}" class="quiet-button" target="_blank" rel="noopener noreferrer">${escapeHtml(link.text)}${icon('arrow', 'h-4 w-4')}</a>`).join('')}</div>` : '<p class="mt-7 border-t border-line pt-4 !text-xs">外部リンクは未設定です。</p>'}
    </div>`;
  openDialog(projectDialog);
});

document.querySelector('#search-button').addEventListener('click', () => openDialog(searchDialog));
document.addEventListener('keydown', (event) => {
  const isEditing = event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName));
  if (event.key === '/' && !isEditing && !event.ctrlKey && !event.metaKey && !event.altKey && !document.querySelector('dialog[open]')) { event.preventDefault(); openDialog(searchDialog); }
});
document.querySelectorAll('[data-jump]').forEach((link) => link.addEventListener('click', () => searchDialog.close()));

const themeButton = document.querySelector('#theme-button');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'ライトテーマに切り替える' : 'ダークテーマに切り替える');
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0d1117' : '#ffffff';
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* 保存不可でも表示は切り替える。 */ }
}
try { setTheme(localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'); } catch { setTheme('dark'); }
themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
}
document.querySelector('#copy-profile').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(`${profile.name} (@${profile.handle})\n${profile.role}\n\n${profile.tagline}${profile.githubUrl ? `\n${profile.githubUrl}` : ''}`);
    showToast('プロフィールをコピーしました。');
  } catch { showToast('コピーできませんでした。ブラウザのクリップボード設定をご確認ください。'); }
});

const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href')));
let scrollPending = false;
function updateNavigation() {
  const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 140) || sections[0];
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
updateNavigation();
