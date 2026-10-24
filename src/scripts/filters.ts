export function setupFilters({
  item,
  noun,
  suffix = '',
}: {
  item: string;
  noun: string;
  suffix?: string;
}) {
  const items = [...document.querySelectorAll<HTMLElement>(item)];
  const search = document.querySelector<HTMLInputElement>('[data-search-input]');
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const counter = document.querySelector('[data-result-count]');
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  let category = 'all';
  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase();
  function update() {
    const term = normalize(search?.value || '');
    let count = 0;
    items.forEach((el) => {
      const visible =
        (category === 'all' || el.dataset.category === category) &&
        normalize(el.dataset.search || '').includes(term);
      el.hidden = !visible;
      if (visible) count++;
    });
    const singular: Record<string, string> = {
      stories: 'story',
      communities: 'community',
      'learning paths': 'learning path',
    };
    if (counter)
      counter.textContent = `${count} ${count === 1 ? singular[noun] || noun : noun} ${term || category !== 'all' ? 'found' : 'in this preview'}.${suffix ? ` ${suffix}` : ''}`;
    if (empty) empty.hidden = count > 0;
    buttons.forEach((button) => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      category = button.dataset.filter || 'all';
      update();
    }),
  );
  search?.addEventListener('input', update);
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    category = 'all';
    if (search) search.value = '';
    update();
    search?.focus();
  });
  // Respect browser-restored text and input entered before the module finished loading.
  update();
}
