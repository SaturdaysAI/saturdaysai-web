import { matchesSearch, readFilterState, writeFilterState } from '../lib/filter-state.mjs';
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
  const spanish = document.documentElement.lang === 'es';
  const search = document.querySelector<HTMLInputElement>('[data-search-input]');
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const counter = document.querySelector('[data-result-count]');
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  const more = document.querySelector<HTMLButtonElement>('[data-load-more]');
  const year = document.querySelector<HTMLSelectElement>('[data-year]');
  const categories = buttons.map((button) => button.dataset.filter || 'all');
  const years = [...(year?.options || [])].map((option) => option.value);
  let state = readFilterState(location.search, categories, years, pageSize, items.length);
  const syncInputs = () => {
    if (search) search.value = state.query;
    if (year) year.value = state.year;
  };
  const matched = () =>
    items.filter(
      (el) =>
        (state.category === 'all' || el.dataset.category === state.category) &&
        (!state.year || el.dataset.year === state.year) &&
        matchesSearch(el.dataset.search || '', state.query),
    );
  function update(save = false) {
    const matches = matched();
    const visible = new Set(more ? matches.slice(0, state.limit) : matches);
    items.forEach((el) => {
      el.hidden = !visible.has(el);
    });
    const active = !!state.query.trim() || state.category !== 'all' || !!state.year;
    const singular: Record<string, string> = {
      stories: 'story',
      communities: 'community',
      'learning paths': 'learning path',
      projects: 'project',
      episodes: 'episode',
      resources: 'resource',
    };
    const esNouns: Record<string, [string, string]> = {
      stories: ['historia', 'historias'],
      communities: ['comunidad', 'comunidades'],
      'learning paths': ['itinerario', 'itinerarios'],
      projects: ['proyecto', 'proyectos'],
      episodes: ['episodio', 'episodios'],
      resources: ['recurso', 'recursos'],
    };
    if (counter)
      counter.textContent = spanish
        ? `${matches.length} ${esNouns[noun]?.[matches.length === 1 ? 0 : 1] || noun}${active ? ' en los resultados' : ' para explorar'}.${more && matches.length > visible.size ? ` Mostrando ${visible.size}.` : ''}`
        : `${matches.length} ${matches.length === 1 ? singular[noun] || noun : noun}${active ? ' found' : ' to explore'}.${more && matches.length > visible.size ? ` Showing ${visible.size}.` : ''}${suffix ? ` ${suffix}` : ''}`;
    if (more) {
      more.hidden = matches.length <= state.limit;
      const remaining = Math.min(pageSize, Math.max(0, matches.length - state.limit));
      more.textContent = spanish ? `Ver ${remaining} más` : `Show ${remaining} more`;
    }
    if (empty) empty.hidden = matches.length > 0;
    document.querySelectorAll<HTMLElement>('[data-clear-filters]').forEach((el) => {
      el.hidden = !active;
    });
    document.querySelectorAll<HTMLElement>('[data-featured]').forEach((el) => {
      el.hidden = active;
    });
    buttons.forEach((button) => {
      const selected = button.dataset.filter === state.category;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (save) {
      const query = writeFilterState(location.search, state, pageSize);
      history.replaceState(
        history.state,
        '',
        `${location.pathname}${query ? '?' + query : ''}${location.hash}`,
      );
    }
  }
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      state.category = button.dataset.filter || 'all';
      state.limit = pageSize;
      update(true);
    }),
  );
  search?.addEventListener('input', () => {
    state.query = search.value;
    state.limit = pageSize;
    update(true);
  });
  year?.addEventListener('change', () => {
    state.year = year.value;
    state.limit = pageSize;
    update(true);
  });
  more?.addEventListener('click', () => {
    const first = matched()[state.limit];
    state.limit += pageSize;
    update(true);
    first?.querySelector<HTMLElement>('a:not([tabindex="-1"]):not([aria-hidden="true"])')?.focus();
  });
  document.querySelectorAll('[data-reset]').forEach((button) =>
    button.addEventListener('click', () => {
      state = { query: '', category: 'all', year: '', limit: pageSize };
      syncInputs();
      update(true);
      search?.focus();
    }),
  );
  const restore = () => {
    state = readFilterState(location.search, categories, years, pageSize, items.length);
    syncInputs();
    update();
  };
  window.addEventListener('popstate', restore);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) restore();
  });
  syncInputs();
  update();
}
