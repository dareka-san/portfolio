import { profile, projects, skillGroups, careerEntries } from './content.js';
import Splide from './vendor/splide.esm.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const icon = (name, classes = '') => `<svg class="icon ${classes}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const validUrl = (value) => {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
};
const availableProjects = projects.filter((project) => project.isHidden !== true);

document.querySelectorAll('[data-profile]').forEach((element) => {
  const value = profile[element.dataset.profile];
  if (value !== undefined) { element.textContent = value; element.style.whiteSpace = 'pre-line'; }
});
document.title = `${profile.name} — Developer Portfolio`;
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#project-total').textContent = availableProjects.length;

function renderProjects(filter = 'all') {
  const visibleProjects = availableProjects.filter((project) => filter === 'all' || project.category === filter);
  document.querySelector('#project-grid').innerHTML = visibleProjects.map((project) => `
    <button type="button" class="project-card" data-project="${escapeHtml(project.id)}" aria-haspopup="dialog" aria-label="${escapeHtml(project.title)}の詳細を見る">
      <div class="w-full overflow-hidden border-b border-line bg-[#ffffff]"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="800" height="420" loading="lazy" class="aspect-[800/420] w-full object-cover"></div>
      <div class="flex flex-1 flex-col px-5 pb-4 pt-4"><div class="flex items-center justify-between gap-3"><h3 class="flex min-w-0 items-center gap-2 font-mono text-[14px] font-semibold text-link">${icon('book', 'h-3.5 w-3.5 text-muted')}<span class="truncate">${escapeHtml(project.title)}</span></h3>${icon('arrow', 'card-arrow h-4 w-4 text-muted')}</div>
      <p class="mt-2 text-[12px] leading-6">${escapeHtml(project.subtitle)}</p>
      <div class="mb-5 mt-3 flex flex-wrap gap-1.5">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      <p class="mb-4 font-mono text-[12px] text-muted">${escapeHtml(project.kind)}<span class="mx-1">/</span>${escapeHtml(project.year)}</p>
      <div class="mt-auto flex items-center gap-1.5 border-t border-line/70 pt-3 text-[12px] text-muted"><span class="h-2 w-2 shrink-0 rounded-full" style="background:${escapeHtml(project.color)}"></span><span>${escapeHtml(project.role)}</span></div></div>
    </button>`).join('');
}
renderProjects();

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  renderProjects(button.dataset.filter);
}));

document.querySelector('#skills-grid').innerHTML = skillGroups.map((group, index) => `
  <div class="p-5 ${index ? 'border-t border-line md:border-l md:border-t-0' : ''}"><h3 class="flex items-center gap-2 font-mono text-sm font-semibold">${icon(group.icon, 'h-4 w-4 text-muted')}${escapeHtml(group.title)}</h3><p class="mb-5 mt-2 text-[12px] text-muted">${escapeHtml(group.label)}</p><ul class="space-y-3.5">${group.skills.map((skill) => `<li class="flex items-center gap-2.5 text-xs text-muted"><span class="skill-dot" style="background:${escapeHtml(skill.color)}"></span>${escapeHtml(skill.name)}</li>`).join('')}</ul></div>`).join('');

const careerTimeline = document.querySelector('#career-timeline');
if (careerTimeline) {
  careerTimeline.innerHTML = careerEntries.map((entry, index) => `
    <li class="relative border-l border-line pb-8 pl-6 last:border-transparent last:pb-0">
      <span aria-hidden="true" class="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-page ${index === 0 ? 'bg-accent' : 'bg-muted'}"></span>
      <div class="grid gap-3 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6">
        <p class="font-mono text-[14px] leading-6">${escapeHtml(entry.period)}</p>
        <div class="min-w-0"><div class="flex flex-wrap items-center gap-2"><h3 class="text-sm font-semibold text-ink">${escapeHtml(entry.organization)}</h3>${entry.isSample ? '<span class="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">記入例</span>' : ''}</div>
        <p class="mt-1 text-xs text-accent">${escapeHtml(entry.role)}</p>
        <p class="mt-3 whitespace-pre-line text-xs leading-6">${escapeHtml(entry.description)}</p></div>
      </div>
    </li>`).join('');
}

const projectDialog = document.querySelector('#project-dialog');
let projectSlider = null;
projectDialog.addEventListener('close', () => {
  projectSlider?.destroy(true);
  projectSlider = null;
});
function openDialog(dialog) {
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
async function closeDialog(dialog) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  dialog.classList.add('is-closing');
  const closingAnimations = dialog.getAnimations().filter((animation) => animation.animationName === 'dialog-fade-out');
  await Promise.allSettled(closingAnimations.map((animation) => animation.finished));
  if (dialog.open) dialog.close();
  dialog.classList.remove('is-closing');
}
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog); });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
  });
});
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));

document.querySelector('#project-grid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = availableProjects.find((item) => item.id === button.dataset.project);
  if (!project) return;
  projectSlider?.destroy(true);
  projectSlider = null;
  const galleryImages = project.images?.length ? project.images : [{ src: project.image, alt: project.imageAlt }];
  const hasMultipleImages = galleryImages.length > 1;
  const challengeTitle = typeof project.challengeTitle === 'string' ? project.challengeTitle.trim() : '';
  const featuresTitle = typeof project.featuresTitle === 'string' ? project.featuresTitle.trim() : '';
  const liveUrlTitle = typeof project.liveUrlTitle === 'string' ? project.liveUrlTitle.trim() : '';
  const externalLinks = [
    { url: validUrl(project.liveUrl), text: liveUrlTitle || 'サイトを見る' },
    { url: validUrl(project.repositoryUrl), text: 'ソースコードを見る' },
  ].filter((link) => link.url);
  document.querySelector('#dialog-body').innerHTML = `
    <div class="splide project-gallery" role="group" aria-label="${escapeHtml(project.title)}の実績写真">
      <div class="splide__track"><ul class="splide__list">${galleryImages.map((image, index) => `
        <li class="splide__slide"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || project.imageAlt)}" width="800" height="420" loading="${index === 0 ? 'eager' : 'lazy'}"></li>`).join('')}
      </ul><div class="gallery-scroll-cue" aria-hidden="true"><span class="gallery-scroll-label">Scroll</span><span class="gallery-scroll-line"></span></div></div>
      <div class="gallery-controls" ${hasMultipleImages ? '' : 'hidden'}><ul class="splide__pagination"></ul><span class="gallery-count" aria-hidden="true"><span data-gallery-index>01</span> / ${String(galleryImages.length).padStart(2, '0')}</span></div>
    </div>
    <div class="modal-content px-6 py-6 sm:px-8"><div class="flex items-center gap-2 font-mono text-[14px] text-muted"><span>${escapeHtml(project.kind)}</span><span>·</span><span>${escapeHtml(project.year)}</span>${profile.isSample ? '<span class="ml-auto rounded-full border border-line px-2 py-0.5">Sample project</span>' : ''}</div>
    <h2 id="dialog-title" class="mt-3 break-words font-mono text-2xl font-semibold text-link">${escapeHtml(project.title)}</h2><p class="mt-2 !text-ink">${escapeHtml(project.subtitle)}</p>
    <div class="mb-6 mt-4 flex flex-wrap gap-2">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
    <div class="mb-7 rounded-md border border-line bg-subtle px-4 py-3 text-xs"><span class="mr-4 text-muted">担当範囲</span>${escapeHtml(project.role)}</div>
    <section class="mb-6"><h3>概要</h3><p>${escapeHtml(project.overview)}</p></section>
    ${typeof project.challenge === 'string' && project.challenge.trim() ? `<section class="mb-6"><h3>${escapeHtml(challengeTitle || '課題とアプローチ')}</h3><p>${escapeHtml(project.challenge)}</p></section>` : ''}
    ${Array.isArray(project.features) && project.features.length ? `<section class="mb-6"><h3>${escapeHtml(featuresTitle || '主なポイント')}</h3><ul class="space-y-3">${project.features.map((feature) => `<li class="flex items-start gap-2 text-sm leading-6">${icon('check', 'mt-1 h-4 w-4 text-accent')}<span>${escapeHtml(feature)}</span></li>`).join('')}</ul></section>` : ''}
    ${externalLinks.length ? `<div class="mt-7 flex flex-wrap gap-3 border-t border-line pt-5">${externalLinks.map((link) => `<a href="${escapeHtml(link.url)}" class="quiet-button" target="_blank" rel="noopener noreferrer">${escapeHtml(link.text)}${icon('arrow', 'h-4 w-4')}</a>`).join('')}</div>` : ''}
    </div>`;
  projectDialog.querySelectorAll('[data-projects]').forEach((element) => {
    const value = project[element.dataset.projects];
    if (value !== undefined) element.textContent = value;
  });
  openDialog(projectDialog);
  projectDialog.scrollTop = 0;
  const gallery = projectDialog.querySelector('.project-gallery');
  const slider = new Splide(gallery, {
    type: 'slide',
    perPage: 1,
    rewind: true,
    speed: 350,
    arrows: hasMultipleImages,
    pagination: hasMultipleImages,
    drag: hasMultipleImages,
    keyboard: true,
    i18n: {
      prev: '前の写真へ', next: '次の写真へ', first: '最初の写真へ', last: '最後の写真へ',
      slideX: '%s枚目の写真へ', pageX: '%s枚目の写真へ', select: '表示する写真を選択',
      carousel: '実績写真', slide: '写真', slideLabel: '%s / %s',
    },
  });
  slider.on('mounted moved', () => {
    gallery.querySelector('[data-gallery-index]').textContent = String(slider.index + 1).padStart(2, '0');
  });
  projectSlider = slider;
  slider.mount();
});

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
  const reachedBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const current = reachedBottom
    ? sections.at(-1)
    : [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 140) || sections[0];
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
