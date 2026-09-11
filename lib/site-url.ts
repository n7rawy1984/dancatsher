/** Only an approved HTTPS origin may be used for public SEO URLs. */
export function normalizeSiteUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path or credentials.');
  }
  return url.origin;
}
