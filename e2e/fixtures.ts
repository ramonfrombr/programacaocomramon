import { test as base, expect } from "@playwright/test";

/**
 * Default Playwright navigation waits for `load`, which flaky pages can miss when
 * Next.js image optimization hits slow external URLs or MuxPlayer keeps fetching.
 * DOM-ready is enough — spec assertions provide the real synchronization.
 */
const test = base.extend({
  page: async ({ page }, use) => {
    const goto = page.goto.bind(page);
    page.goto = (url, options) =>
      goto(url, { waitUntil: "domcontentloaded", ...options });
    await use(page);
  },
});

export { expect, test };
