export function mediaProvider(value) {
  let source;
  try {
    source = new URL(value);
  } catch {
    return null;
  }
  if (source.protocol !== 'https:' || source.username || source.password || source.port)
    return null;
  let name = '',
    audio = false;
  if (
    ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com'].includes(source.hostname) &&
    /^\/embed\/[a-zA-Z0-9_-]+$/.test(source.pathname)
  ) {
    source.hostname = 'www.youtube-nocookie.com';
    name = 'YouTube';
  } else if (source.hostname === 'player.vimeo.com' && /^\/video\/\d+\/?$/.test(source.pathname))
    name = 'Vimeo';
  else if (source.hostname === 'embed.acast.com') {
    name = 'Acast';
    audio = true;
  } else if (source.hostname === 'w.soundcloud.com' && source.pathname === '/player/') {
    name = 'SoundCloud';
    audio = true;
  } else return null;
  return { name, audio, src: source.href };
}
export function findMedia(body = '') {
  for (const match of body.matchAll(/https:\/\/[^\s<>"')]+/g)) {
    const provider = mediaProvider(match[0]);
    if (provider) return provider;
  }
  return null;
}
export function episodeInfo(title = '') {
  const match = title.match(/\bT0*(\d+)[\s/\-]*E0*(\d+)/i) || title.match(/\b(\d+)[×x](\d+)/i);
  return match ? { season: Number(match[1]), episode: Number(match[2]) } : null;
}
