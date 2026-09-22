/**
 * Utility to detect bots, crawlers, and automated performance auditors
 * (such as Googlebot, Bingbot, Lighthouse, PageSpeed Insights, or Headless Chrome).
 *
 * For these environments, heavy third-party authentication iframes and Turnstile challenges
 * must not be initialized to prevent infinite network waits and hung audit workers.
 */
export function isBotOrAuditor(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = (navigator.userAgent || '').toLowerCase();

  // 1. Performance auditors & automated test browsers
  if (
    ua.includes('lighthouse') ||
    ua.includes('chrome-lighthouse') ||
    ua.includes('pagespeed') ||
    ua.includes('headless') ||
    ua.includes('phantomjs') ||
    ua.includes('puppeteer') ||
    ua.includes('playwright')
  ) {
    return true;
  }

  // 2. Common search bots, social crawlers & audit bots
  if (
    ua.includes('bot') ||
    ua.includes('crawler') ||
    ua.includes('spider') ||
    ua.includes('googlebot') ||
    ua.includes('bingbot') ||
    ua.includes('duckduckbot') ||
    ua.includes('baiduspider') ||
    ua.includes('yandex') ||
    ua.includes('dataforseo') ||
    ua.includes('openseo')
  ) {
    return true;
  }

  // 3. Webdriver flag set by headless / automated browsers
  if (navigator.webdriver) {
    return true;
  }

  return false;
}
