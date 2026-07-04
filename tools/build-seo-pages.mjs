import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const telegramUrl = "https://t.me/+jcCKJ6rNoHUyODMy";
const vkUrl = "https://vk.com/pesni_bez_ap";
const maxUrl = "https://max.ru/freetextbit";
const domain = "https://textydlyapesen.ru";
const today = "2026-07-04";

const snippets = [
  {
    title: "Лирика про любовь и семью",
    text: `Это любовь, если просыпаешься с кайфом
Семья это единственное что меня воодушевляет
Я хотел стать выше, но весь сброд тянул обратно
Почему весь мир не хочет, что бы ты засиял, а?`,
  },
  {
    title: "Куплет для рэп-трека",
    text: `Я мэтр в этом стиле, давненько им советую
Читаю рэп с пяти лет, гонял по гетто
Сломанная ритмика, словно били кастетом
Было не было игра, у вас сваг был? Не было!`,
  },
  {
    title: "Строки для TikTok",
    text: `Тебе нужен повод? Просто останься
Город погаснет, ты не потеряйся
Пальцы дрожат, но к тебе тянутся
Даже когда друг на друга пялимся`,
  },
  {
    title: "Панчи и хуки",
    text: `Твой plug - байт в Telegram, мой plug не сидит online
Тут даже дети знают: добрый - значит удобный
У него дрип как TikTok - одноразовый и дешёвый
Твои gang в интернете, мои G реально в розыске`,
  },
  {
    title: "Студийный вайб",
    text: `Я на студии в семь, семь утра и вечера
Двадцать четыре на семь, тут местный я
Дела делами, музло лечит от стресса
Бас, бас, бас бьет испытывая нервы`,
  },
  {
    title: "Trap / vamp",
    text: `Она уже vamp, она уже, она уже vamp
Она trap, это так, менталку разрушая
Сделал slide, её skip, она не понимает
Как оказалась в спальне Swag Lover'а`,
  },
];

const pages = [
  ["teksty-bez-avtorskih-prav", "Тексты без авторских прав", "Готовые тексты для песен без авторских прав: бери строки как основу, записывай под бит и выпускай трек.", "главный запрос"],
  ["teksty-dlya-pesen", "Тексты для песен", "Библиотека текстов для песен: куплеты, припевы, хуки и идеи для артистов из проекта TEXT4FREE.", "библиотека"],
  ["besplatnye-teksty", "Бесплатные тексты", "Бесплатные тексты для песен, демо и релизов. В Telegram проекта доступны тысячи строк и новых заготовок.", "бесплатно"],
  ["teksty-pod-bit", "Тексты под бит", "Тексты под бит для записи демо, куплета, припева или полноценного трека.", "под бит"],
  ["huki-i-panchi", "Хуки и панчи", "Короткие хуки, панчи и цепляющие фразы для припевов, Shorts, Reels и TikTok.", "хуки"],
  ["stroki-dlya-tiktok", "Строки для TikTok", "Короткие строки для TikTok, Reels и Shorts: быстро читаются с телефона и легко пробуются под бит.", "короткий формат"],
  ["rep-teksty-besplatno", "Рэп тексты бесплатно", "Бесплатные рэп тексты, строки и куплеты для начинающих и практикующих артистов.", "рэп"],
  ["trap-teksty", "Trap тексты", "Trap тексты и вайбовые строки под современный бит, демо и быстрый релиз.", "trap"],
  ["kuplety-dlya-pesen", "Куплеты для песен", "Готовые куплеты для песен: используй как стартовую основу и развивай под свой стиль.", "куплеты"],
  ["pripevy-dlya-trekov", "Припевы для треков", "Идеи припевов и хуков для треков, которые можно адаптировать под свой бит.", "припевы"],
  ["idei-dlya-treka", "Идеи для трека", "Идеи для трека, когда есть бит, но не получается начать текст или найти первую строку.", "идеи"],
  ["teksty-dlya-demo", "Тексты для демо", "Тексты для демо-записи: быстрый способ проверить бит, подачу и настроение трека.", "демо"],
  ["teksty-dlya-nachinayushchih-artistov", "Тексты для начинающих артистов", "Готовые текстовые заготовки для начинающих артистов, которым нужна опора для первого трека.", "новичкам"],
  ["gotovye-teksty-dlya-trekov", "Готовые тексты для треков", "Готовые тексты для треков: строки, куплеты, припевы и идеи из TEXT4FREE.", "готовые тексты"],
  ["liricheskie-teksty", "Лирические тексты", "Лирические тексты и строки про чувства, отношения, семью и внутренний голос.", "лирика"],
  ["teksty-pro-lyubov", "Тексты про любовь", "Тексты про любовь, чувства и отношения для песен, демо и коротких видео.", "любовь"],
  ["panchi-dlya-repa", "Панчи для рэпа", "Панчи для рэпа: короткие строки, которые можно развить в куплет или хук.", "панчи"],
  ["stroki-dlya-pesni", "Строки для песни", "Строки для песни, если нужна первая фраза, идея или готовая текстовая искра.", "строки"],
  ["teksty-dlya-reliza", "Тексты для релиза", "Тексты для релиза на площадки: бери основу, адаптируй под бит и выпускай.", "релиз"],
  ["teksty-dlya-muzyki", "Тексты для музыки", "Тексты для музыки, битов и авторских треков: бесплатная база TEXT4FREE.", "музыка"],
  ["besplatnye-kuplety", "Бесплатные куплеты", "Бесплатные куплеты для песен и рэп-треков с переходом к полной базе в Telegram.", "куплеты бесплатно"],
  ["besplatnye-huki", "Бесплатные хуки", "Бесплатные хуки и короткие припевные строки для треков, Reels и TikTok.", "хуки бесплатно"],
  ["tekst-pesni-besplatno", "Текст песни бесплатно", "Текст песни бесплатно: где взять основу для записи и быстро перейти к демо.", "текст песни"],
  ["slova-dlya-pesni", "Слова для песни", "Слова для песни, когда нужен быстрый старт, хук, куплет или припев.", "слова"],
  ["teksty-dlya-reels", "Тексты для Reels", "Тексты для Reels и коротких видео: цепляющие строки, которые удобно читать с телефона.", "reels"],
  ["teksty-dlya-shorts", "Тексты для Shorts", "Тексты для Shorts, коротких музыкальных роликов и быстрых демо.", "shorts"],
  ["teksty-na-russkom", "Тексты на русском", "Русские тексты для песен, рэпа, trap-настроения, TikTok и демо-записей.", "русский текст"],
  ["baza-tekstov-dlya-pesen", "База текстов для песен", "База текстов для песен TEXT4FREE: на сайте категории, в Telegram - тысячи строк.", "база"],
  ["teksty-dlya-avtorskih-trekov", "Тексты для авторских треков", "Тексты для авторских треков: используй как стартовую искру и дорабатывай под себя.", "авторские треки"],
  ["muzykalnye-zagotovki", "Музыкальные заготовки", "Музыкальные заготовки, строки и идеи для артистов, которые хотят быстрее записать трек.", "заготовки"],
];

const related = pages.slice(0, 12);

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageTemplate(page, index) {
  const [slug, title, description, tag] = page;
  const chosen = [snippets[index % snippets.length], snippets[(index + 2) % snippets.length], snippets[(index + 4) % snippets.length]];
  const relatedLinks = related
    .filter(([relatedSlug]) => relatedSlug !== slug)
    .slice(0, 8)
    .map(([relatedSlug, relatedTitle]) => `<a class="mini-link" href="../${relatedSlug}/">${esc(relatedTitle)}</a>`)
    .join("\n          ");

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#090909" />
  <title>${esc(title)} бесплатно | TEXT4FREE</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${domain}/${slug}/" />
  <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
  <link rel="apple-touch-icon" href="../avatar.png.jpg" />
  <link rel="stylesheet" href="../seo-style.css" />
  <script defer src="../analytics.js"></script>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "${esc(title)}",
      "description": "${esc(description)}",
      "url": "${domain}/${slug}/",
      "inLanguage": "ru-RU",
      "isPartOf": {"@type": "WebSite", "name": "TEXT4FREE", "url": "${domain}/"}
    }
  </script>
</head>
<body>
  <main class="wrap">
    <header class="nav">
      <a class="brand" href="../"><span class="brand-mark">T4F</span><span>TEXT4FREE</span></a>
      <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer">Telegram</a>
    </header>

    <section class="hero hero-seo">
      <div class="eyebrow">${esc(tag)} / без авторских прав</div>
      <h1>${esc(title)}</h1>
      <p>${esc(description)} На этой странице показаны только несколько примеров. Основная база, новые публикации и тысячи строк лежат в нашем Telegram.</p>
      <div class="cta-row">
        <a class="btn" href="${telegramUrl}" target="_blank" rel="noopener noreferrer">Открыть Telegram</a>
        <a class="btn alt" href="${vkUrl}" target="_blank" rel="noopener noreferrer">Проект VK</a>
        <a class="btn alt" href="${maxUrl}" target="_blank" rel="noopener noreferrer">Проект MAX</a>
      </div>
      <div class="proof-row">
        <span>1000+ строк в Telegram</span>
        <span>тексты без авторских прав</span>
        <span>для телефона</span>
      </div>
    </section>

    <section class="section">
      <h2>Примеры из TEXT4FREE</h2>
      <p>Это не вся база. Мы показываем часть материалов, чтобы было понятно направление проекта. Больше текстов, куплетов, припевов, панчей и идей выходит в Telegram.</p>
      <div class="grid">
        ${chosen.map((item) => `<article class="card"><h3>${esc(item.title)}</h3><div class="lyrics">${esc(item.text)}</div></article>`).join("\n        ")}
      </div>
    </section>

    <section class="section conversion-panel">
      <p class="eyebrow">переход в базу</p>
      <h2>В Telegram ещё тысячи строк</h2>
      <p>Если нужен не один пример, а постоянный поток текстов для песен, хуков, куплетов, припевов и идей под бит - открывай канал. Ссылка ниже ведёт через счётчик вступлений, чтобы мы понимали, сколько артистов приходит с сайта.</p>
      <div class="links">
        <a class="pill" href="${telegramUrl}" target="_blank" rel="noopener noreferrer">Telegram / вся база</a>
        <a class="pill" href="${vkUrl}" target="_blank" rel="noopener noreferrer">VK / проект</a>
        <a class="pill" href="${maxUrl}" target="_blank" rel="noopener noreferrer">MAX / канал</a>
      </div>
    </section>

    <section class="section">
      <h2>Похожие разделы</h2>
      <div class="mini-grid">
          ${relatedLinks}
      </div>
    </section>

    <footer class="footer">TEXT4FREE © 2026 · тексты для песен без авторских прав</footer>
  </main>
</body>
</html>
`;
}

for (const [index, page] of pages.entries()) {
  const [slug] = page;
  mkdirSync(slug, { recursive: true });
  writeFileSync(join(slug, "index.html"), pageTemplate(page, index), "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${pages.map(([slug], index) => `  <url>
    <loc>${domain}/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${index < 3 ? "0.95" : index < 12 ? "0.88" : "0.78"}</priority>
  </url>`).join("\n")}
</urlset>
`;
writeFileSync("sitemap.xml", sitemap, "utf8");

let indexHtml = readFileSync("index.html", "utf8");
if (!indexHtml.includes('href="favicon.svg"')) {
  indexHtml = indexHtml.replace(
    '<meta name="theme-color" content="#090909" />',
    '<meta name="theme-color" content="#090909" />\n  <link rel="icon" type="image/svg+xml" href="favicon.svg" />\n  <link rel="apple-touch-icon" href="avatar.png.jpg" />\n  <link rel="manifest" href="site.webmanifest" />'
  );
}
if (!indexHtml.includes('href="site.webmanifest"')) {
  indexHtml = indexHtml.replace(
    '<link rel="apple-touch-icon" href="avatar.png.jpg" />',
    '<link rel="apple-touch-icon" href="avatar.png.jpg" />\n  <link rel="manifest" href="site.webmanifest" />'
  );
}
if (!indexHtml.includes('src="analytics.js"')) {
  indexHtml = indexHtml.replace("</head>", '  <script defer src="analytics.js"></script>\n</head>');
}
indexHtml = indexHtml.replaceAll(["https://t.me/", "freetextbit"].join(""), telegramUrl);
const start = indexHtml.indexOf('<section class="section reveal from-right" id="seo">');
const end = indexHtml.indexOf("    <section class=\"cta reveal from-right\">", start);
if (start !== -1 && end !== -1) {
  const cards = pages
    .slice(0, 15)
    .map(([slug, title, description]) => `        <a class="seo-card" href="${slug}/">
          <h3>${esc(title)}</h3>
          <p>${esc(description)}</p>
        </a>`)
    .join("\n");
  const replacement = `    <section class="section reveal from-right" id="seo">
      <p class="section-label">поисковая база</p>
      <h2>SEO-библиотека текстов для песен</h2>
      <p class="lead">Мы расширяем сайт под десятки запросов: тексты без авторских прав, бесплатные куплеты, хуки, панчи, строки для TikTok, тексты под бит и идеи для первого трека. На сайте - категории и примеры, в Telegram - основная база и тысячи строк.</p>
      <div class="seo-grid">
${cards}
      </div>
    </section>

`;
  indexHtml = indexHtml.slice(0, start) + replacement + indexHtml.slice(end);
}
writeFileSync("index.html", indexHtml, "utf8");

console.log(`Built ${pages.length} SEO pages and sitemap.`);
