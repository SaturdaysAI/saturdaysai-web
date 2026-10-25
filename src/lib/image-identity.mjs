/** Match only known WordPress resized variants; unrelated uploads stay distinct. */
export function originalImageIdentity(source) {
  return source.replace(/(?:-\d+x\d+|-scaled)(?=\.[a-z0-9]+$)/i, '');
}
