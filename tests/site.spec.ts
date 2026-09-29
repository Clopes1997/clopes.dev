import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { biography } from "../src/content/biography";
import snapshot from "../src/content/github.json";

const routes = [
  "/", "/about/", "/bloodbound-legacy/", "/bloodbound-legacy/about/",
  "/code/", "/code/about/", "/voice/en-US/", "/voice/en-US/about/",
  "/voice/pt-BR/", "/voice/pt-BR/about/",
];
for (const route of routes) {
  test(`${route} works independently with valid links and accessible layout`, async ({page}, testInfo) => {
    const errors:string[] = [];
    page.on("pageerror",error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    const locale = route.includes("pt-BR") ? "pt-BR" : "en-US";
    await expect(page.locator("html")).toHaveAttribute("lang",locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://clopes.dev${route}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content",/\S+/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const avatars = page.locator('img[src*="clopes-avatar"]');
    await expect(avatars).toHaveCount(route.endsWith("/about/") || route === "/about/" ? 1 : 0);
    if (await avatars.count()) await expect(avatars).toHaveAttribute("src","/images/clopes-avatar.webp");
    if (route !== "/") {
      await expect(page.locator("dialog")).toHaveCount(0);
      expect(await page.content()).not.toMatch(/6-zJRhnEN0Y|Ilithyia|necromancy/i);
      await page.keyboard.type("necromancy");
      await expect(page.locator("dialog, iframe")).toHaveCount(0);
    }
    const urls = await page.locator("a[href]").evaluateAll(anchors => anchors.map(a => a.getAttribute("href")!));
    for (const href of [...new Set(urls)]) {
      expect(href).not.toBe("#");
      if (/^(https?:|mailto:)/.test(href)) continue;
      const url = new URL(href,page.url());
      if (url.pathname !== route) expect((await page.request.get(url.pathname)).status(),href).toBe(200);
      if (url.hash) {
        if (url.pathname === route) await expect(page.locator(`[id="${url.hash.slice(1)}"]`),href).toHaveCount(1);
        else {
          const html = await (await page.request.get(url.pathname)).text();
          expect(html,href).toContain(`id="${url.hash.slice(1)}"`);
        }
      }
    }
    const a11y = await new AxeBuilder({page}).exclude("iframe").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    expect(a11y.violations).toEqual([]);
    await page.screenshot({path:testInfo.outputPath(`${route === "/" ? "hub" : route.replaceAll("/","-")}.png`), fullPage:true, animations:"disabled"});
    expect(errors).toEqual([]);
  });
}

test("the biography is shared and each About page has the same facts",async ({page}) => {
  for (const route of routes.filter(route => route.endsWith("/about/"))) {
    await page.goto(route);
    const locale = route.includes("pt-BR") ? "pt-BR" : "en-US";
    await expect(page.locator("[data-biography] p")).toHaveText([biography[locale].introduction,...biography[locale].paragraphs]);
  }
});

test("voice languages have reciprocal SEO and switch the current page",async ({page}) => {
  for (const suffix of ["","about/"]) {
    await page.goto(`/voice/en-US/${suffix}`);
    await page.getByRole("link",{name:"Português (Brasil)",exact:true}).click();
    await expect(page).toHaveURL(new RegExp(`/voice/pt-BR/${suffix}$`));
    await expect(page.locator("html")).toHaveAttribute("lang","pt-BR");
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content","pt_BR");
    await expect(page.locator('link[hreflang="en-US"]')).toHaveAttribute("href",`https://clopes.dev/voice/en-US/${suffix}`);
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveAttribute("href",`https://clopes.dev/voice/pt-BR/${suffix}`);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href",`https://clopes.dev/voice/en-US/${suffix}`);
    await page.getByRole("link",{name:"English (United States)",exact:true}).click();
    await expect(page).toHaveURL(new RegExp(`/voice/en-US/${suffix}$`));
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content","en_US");
  }
});

test("real GitHub projects, empty audio, contact, and no fabricated demos",async ({page}) => {
  await page.goto("/code/");
  expect(await page.locator(".code-repo").count()).toBe(snapshot.repositories.filter(repo => !repo.fork && !repo.archived).length);
  for (const repo of snapshot.repositories.filter(repo => !repo.fork && !repo.archived)) await expect(page.locator(`.code-repo[href="${repo.url}"]`)).toHaveCount(1);
  await expect(page.locator(".code-project")).toHaveCount(4);
  await page.locator(".code-project").first().getByText("Inside the implementation").click();
  await expect(page.locator(".code-project").first().getByText(/Keyboard-accessible controls/)).toBeVisible();
  await expect(page.getByRole("link",{name:"Live project"})).toHaveCount(0);
  for (const locale of ["en-US","pt-BR"]) {
    await page.goto(`/voice/${locale}/`);
    await expect(page.locator("audio, iframe")).toHaveCount(0);
    await expect(page.locator(".voice-empty h3")).toContainText(locale === "en-US" ? "No public voice samples yet." : "Ainda não há amostras públicas de voz.");
    await expect(page.locator('a[href="mailto:clopescode97@gmail.com"]')).toHaveCount(1);
  }
});

test("the hidden performance only initializes on the root and closes cleanly",async ({page}) => {
  await page.goto("/");
  await expect(page.locator("iframe")).toHaveCount(0);
  const ornament = page.getByRole("button",{name:"A small ornament"});
  await ornament.focus();
  for (let click=0;click<3;click++) await ornament.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("iframe")).toHaveAttribute("src","https://www.youtube-nocookie.com/embed/6-zJRhnEN0Y?hl=en");
  await expect(page.getByRole("dialog")).toContainText("guest singer");
  const a11y = await new AxeBuilder({page}).exclude("iframe").withTags(["wcag2a","wcag2aa"]).analyze();
  expect(a11y.violations).toEqual([]);
  await page.getByRole("button",{name:"Close",exact:true}).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(ornament).toBeFocused();
  await page.keyboard.type("necromancy");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.locator('a[href="/code/"]').click();
  await expect(page).toHaveURL(/\/code\/$/);
  await page.keyboard.type("necromancy");
  await expect(page.locator("dialog, iframe")).toHaveCount(0);
  await page.locator('.code-footer a[href="/"]').click();
  await page.waitForLoadState("networkidle");
  await page.keyboard.type("necromancy");
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("professional pages do not load the hidden performance client code",async ({page}) => {
  for (const route of ["/bloodbound-legacy/","/code/","/voice/en-US/","/voice/pt-BR/about/"]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const scripts = await page.locator("script[src]").evaluateAll(elements => elements.map(el => (el as HTMLScriptElement).src));
    for (const src of scripts) {
      const source = await (await page.request.get(src)).text();
      expect(source,`${route}: ${src}`).not.toMatch(/6-zJRhnEN0Y|necromancy|Something stirs/);
    }
  }
});

test("narrow screens, enlarged text, and keyboard access",async ({page}) => {
  for (const route of routes) {
    await page.setViewportSize({width:320,height:850});
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),route).toBe(true);
    await page.addStyleTag({content:"html { font-size:200%; }"});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`${route} at 200%`).toBe(true);
  }
  await page.goto("/voice/pt-BR/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link",{name:"Pular para o conteúdo"})).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("legacy URLs forward and unsupported music or locale paths return 404",async ({page}) => {
  await page.goto("/stories/");
  await expect(page).toHaveURL(/\/bloodbound-legacy\/$/);
  await page.goto("/voice/");
  await expect(page).toHaveURL(/\/voice\/en-US\/$/);
  for (const route of ["/music/","/voice/fr-FR/","/missing-page/"]) {
    expect((await page.goto(route))?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("Nothing here.");
  }
});
