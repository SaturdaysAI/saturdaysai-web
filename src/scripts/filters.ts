export function setupFilters({
  item,
  noun,
  suffix = '',
  pageSize = 12,
}: {
  item: string;
  noun: string;
  suffix?: string;
  pageSize?: number;
}) {
  const items = [...document.querySelectorAll<HTMLElement>(item)];
  const search = document.querySelector<HTMLInputElement>('[data-search-input]');
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const counter = document.querySelector('[data-result-count]');
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  let category = 'all';
  let limit = pageSize;
  const more = document.querySelector<HTMLButtonElement>('[data-load-more]');
  const year = document.querySelector<HTMLSelectElement>('[data-year]');
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
        (!year?.value || el.dataset.year === year.value) &&
        normalize(el.dataset.search || '').includes(term);
      if (visible) count++;
      el.hidden = !visible || (!!more && count > limit);
    });
    const singular: Record<string, string> = {
      stories: 'story',
      communities: 'community',
      'learning paths': 'learning path',
    };
    if (counter)
      counter.textContent = `${count} ${count === 1 ? singular[noun] || noun : noun}${term || category !== 'all' || year?.value ? ' found' : ' to explore'}.${more && count > limit ? ` Showing ${limit}.` : ''}${suffix ? ` ${suffix}` : ''}`;
    if (more) {
      more.hidden = count <= limit;
      more.textContent = `Show ${Math.min(pageSize, Math.max(0, count - limit))} more`;
    }
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
      limit = pageSize;
      update();
    }),
  );
  search?.addEventListener('input', () => {
    limit = pageSize;
    update();
  });
  year?.addEventListener('change', () => {
    limit = pageSize;
    update();
  });
  more?.addEventListener('click', () => {
    const first = items
      .filter((x) => x.hidden)
      .find(
        (x) =>
          (category === 'all' || x.dataset.category === category) &&
          (!year?.value || x.dataset.year === year.value) &&
          normalize(x.dataset.search || '').includes(normalize(search?.value || '')),
      );
    limit += pageSize;
    update();
    first?.querySelector<HTMLElement>('a')?.focus();
  });
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    category = 'all';
    if (search) search.value = '';
    if (year) year.value = '';
    limit = pageSize;
    update();
    search?.focus();
  });
  // Respect browser-restored text and input entered before the module finished loading.
  update();
}
