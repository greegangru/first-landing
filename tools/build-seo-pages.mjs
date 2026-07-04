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

const hiddenPages = [
  ["biblioteka/nastroenie/grustnye-teksty-dlya-pesen", "Грустные тексты для песен", "Грустные тексты для песен, когда нужен минорный вайб, боль, чувства и честная первая строка.", "грустные тексты"],
  ["biblioteka/nastroenie/teksty-pro-rasstavanie", "Тексты про расставание", "Тексты про расставание, поздние переписки, пустые чаты и треки после отношений.", "расставание"],
  ["biblioteka/nastroenie/teksty-pro-odinochestvo", "Тексты про одиночество", "Тексты про одиночество, ночной город, тишину и состояние, которое хочется записать в трек.", "одиночество"],
  ["biblioteka/nastroenie/teksty-pro-mechtu", "Тексты про мечту", "Тексты про мечту, движение, веру в себя и желание выйти на новый уровень.", "мечта"],
  ["biblioteka/nastroenie/teksty-pro-semiyu", "Тексты про семью", "Тексты про семью, поддержку, близких людей и смысл, который держит артиста на плаву.", "семья"],
  ["biblioteka/nastroenie/teksty-pro-bol", "Тексты про боль", "Тексты про боль, внутреннее напряжение и эмоции, которые хорошо ложатся на лиричный бит.", "боль"],
  ["biblioteka/nastroenie/teksty-pro-gorod", "Тексты про город", "Тексты про город, улицы, студию, ночные мысли и атмосферу большого движения.", "город"],
  ["biblioteka/nastroenie/teksty-pro-uspeh", "Тексты про успех", "Тексты про успех, деньги, амбиции, рост и желание доказать свой уровень.", "успех"],
  ["biblioteka/zhanry/teksty-dlya-drill", "Тексты для drill", "Тексты для drill-бита: жёсткая подача, короткие строки, энергия района и плотный ритм.", "drill"],
  ["biblioteka/zhanry/teksty-dlya-plug", "Тексты для plug", "Тексты для plug и melodic plug: воздушные строки, лёгкий вайб и современная подача.", "plug"],
  ["biblioteka/zhanry/teksty-dlya-new-jazz", "Тексты для new jazz", "Тексты для new jazz, rage и свежего звучания, где важны ритм, флоу и необычные фразы.", "new jazz"],
  ["biblioteka/zhanry/teksty-dlya-rage", "Тексты для rage", "Тексты для rage-бита: энергия, драйв, клубная подача и строки для яркого трека.", "rage"],
  ["biblioteka/zhanry/teksty-dlya-pop-rap", "Тексты для pop rap", "Тексты для pop rap: понятные хуки, запоминающиеся фразы и лёгкая структура для песни.", "pop rap"],
  ["biblioteka/zhanry/teksty-dlya-melodichnogo-repa", "Тексты для мелодичного рэпа", "Тексты для мелодичного рэпа, где важны чувства, припев и плавная подача.", "мелодичный рэп"],
  ["biblioteka/zhanry/teksty-dlya-lofi", "Тексты для lo-fi", "Тексты для lo-fi и спокойного бита: мягкая лирика, заметки и ночная атмосфера.", "lo-fi"],
  ["biblioteka/zhanry/teksty-dlya-klubnogo-treka", "Тексты для клубного трека", "Тексты для клубного трека, танцевального вайба, сторис и короткого запоминающегося хука.", "клуб"],
  ["biblioteka/formaty/korotkie-teksty-dlya-pesen", "Короткие тексты для песен", "Короткие тексты для песен, которые можно быстро прочитать с телефона и примерить на бит.", "короткие тексты"],
  ["biblioteka/formaty/dlinnye-teksty-dlya-pesen", "Длинные тексты для песен", "Длинные текстовые заготовки для тех, кто хочет развить куплет, историю и полноценный трек.", "длинные тексты"],
  ["biblioteka/formaty/pervaya-stroka-dlya-pesni", "Первая строка для песни", "Первая строка для песни, если сложно начать текст, но хочется сразу поймать настроение.", "первая строка"],
  ["biblioteka/formaty/idei-dlya-pripeva", "Идеи для припева", "Идеи для припева, хука и повторяющейся фразы, которая может держать весь трек.", "припев"],
  ["biblioteka/formaty/idei-dlya-kupleta", "Идеи для куплета", "Идеи для куплета, чтобы разогнать мысль, флоу и историю внутри трека.", "куплет"],
  ["biblioteka/formaty/frazy-dlya-treka", "Фразы для трека", "Фразы для трека, которые можно использовать как старт, панч, хук или связку между строками.", "фразы"],
  ["biblioteka/formaty/rifmy-dlya-pesni", "Рифмы для песни", "Рифмы и текстовые заготовки для песни, когда нужно быстрее собрать куплет или припев.", "рифмы"],
  ["biblioteka/formaty/podpisi-dlya-muzykalnyh-video", "Подписи для музыкальных видео", "Подписи и строки для музыкальных видео, Reels, Shorts, TikTok и промо трека.", "видео"],
  ["biblioteka/dlya-kogo/teksty-dlya-molodyh-artistov", "Тексты для молодых артистов", "Тексты для молодых артистов, которые ищут основу для первых песен и демо-записей.", "молодым артистам"],
  ["biblioteka/dlya-kogo/teksty-dlya-reperov", "Тексты для рэперов", "Тексты для рэперов: куплеты, панчи, хуки и строки под современный бит.", "рэперам"],
  ["biblioteka/dlya-kogo/teksty-dlya-bitmeykerov", "Тексты для битмейкеров", "Тексты для битмейкеров, которым нужны демо-строки для проверки бита и подачи.", "битмейкерам"],
  ["biblioteka/dlya-kogo/teksty-dlya-vokalistov", "Тексты для вокалистов", "Тексты для вокалистов, мелодичных припевов, куплетов и лиричных музыкальных идей.", "вокалистам"],
  ["biblioteka/dlya-kogo/teksty-dlya-avtorov-pesen", "Тексты для авторов песен", "Тексты для авторов песен, которым нужна искра, структура или направление для нового трека.", "авторам"],
  ["biblioteka/dlya-kogo/teksty-dlya-tiktok-artistov", "Тексты для TikTok артистов", "Тексты для TikTok артистов: короткие строки, хуки и идеи для быстрого музыкального ролика.", "tiktok артистам"],
  ["biblioteka/poisk/besplatnye-teksty-bez-ap", "Бесплатные тексты без АП", "Бесплатные тексты без авторских прав для песен, демо, TikTok и релизов.", "без АП"],
  ["biblioteka/poisk/gde-vzyat-tekst-dlya-pesni", "Где взять текст для песни", "Где взять текст для песни бесплатно и быстро перейти от пустой заметки к записи.", "где взять текст"],
  ["biblioteka/poisk/skachat-tekst-dlya-pesni", "Скачать текст для песни", "Скачать текст для песни нельзя буквально, но можно открыть бесплатную базу и взять строки для трека.", "скачать текст"],
  ["biblioteka/poisk/vzyat-tekst-dlya-treka", "Взять текст для трека", "Взять текст для трека, адаптировать под свой бит и выпустить песню на площадках.", "взять текст"],
  ["biblioteka/poisk/tekst-dlya-bita", "Текст для бита", "Текст для бита, когда инструментал уже есть, а слов для записи пока не хватает.", "текст для бита"],
  ["biblioteka/poisk/tekst-dlya-minusa", "Текст для минуса", "Текст для минуса, демо и авторского трека: готовые строки и идеи из TEXT4FREE.", "минус"],
  ["biblioteka/poisk/tekst-dlya-zapisi", "Текст для записи", "Текст для записи на студии, дома или в заметках, чтобы быстрее проверить звучание трека.", "запись"],
  ["biblioteka/poisk/free-text-bit", "Free Text Bit", "Free Text Bit: бесплатные тексты, хуки, куплеты и идеи под бит из проекта TEXT4FREE.", "free text bit"],
  ["biblioteka/mobile/teksty-s-telefona", "Тексты с телефона", "Тексты с телефона: удобно открыть, быстро прочитать и сразу записать под свой бит.", "телефон"],
  ["biblioteka/mobile/teksty-dlya-zametok", "Тексты для заметок", "Тексты для заметок, которые можно сохранить, адаптировать и развить в полноценный трек.", "заметки"],
  ["biblioteka/mobile/teksty-dlya-storis", "Тексты для сторис", "Тексты для сторис, коротких видео и музыкальных публикаций в соцсетях.", "сторис"],
  ["biblioteka/mobile/teksty-dlya-klipov", "Тексты для клипов", "Тексты для клипов, сниппетов и коротких музыкальных фрагментов.", "клипы"],
  ["biblioteka/mobile/teksty-dlya-snippetov", "Тексты для сниппетов", "Тексты для сниппетов, teaser-видео и коротких музыкальных анонсов.", "сниппеты"],
  ["biblioteka/mobile/teksty-dlya-repeticii", "Тексты для репетиции", "Тексты для репетиции подачи, флоу и записи демо под разные биты.", "репетиция"],
  ["biblioteka/longtail/tekst-pesni-dlya-novichka", "Текст песни для новичка", "Текст песни для новичка, который хочет записать первый трек без долгого поиска слов.", "новичок"],
  ["biblioteka/longtail/kak-napisat-pesnyu-s-nulya", "Как написать песню с нуля", "Как написать песню с нуля: взять готовую искру, примерить на бит и развить под себя.", "с нуля"],
  ["biblioteka/longtail/chto-delat-esli-net-teksta", "Что делать если нет текста", "Что делать, если нет текста для песни: открыть базу строк и начать с готовой идеи.", "нет текста"],
  ["biblioteka/longtail/tekst-dlya-pervogo-treka", "Текст для первого трека", "Текст для первого трека, чтобы быстрее перейти от идеи к записи и публикации.", "первый трек"],
  ["biblioteka/longtail/tekst-dlya-treka-bez-prav", "Текст для трека без прав", "Текст для трека без авторских прав: готовые строки и идеи для записи под бит.", "без прав"],
  ["biblioteka/longtail/besplatnye-slova-dlya-pesni", "Бесплатные слова для песни", "Бесплатные слова для песни, куплета, припева, хука или короткого музыкального ролика.", "слова бесплатно"],
  ["biblioteka/longtail/gotovye-stroki-dlya-repa", "Готовые строки для рэпа", "Готовые строки для рэпа, панчи и фразы, которые можно развить в свой куплет.", "строки рэп"],
  ["biblioteka/longtail/tekst-dlya-treka-v-telegram", "Текст для трека в Telegram", "Текст для трека в Telegram: основная база TEXT4FREE находится в канале со свежими публикациями.", "telegram"],
];

const allPages = [...pages, ...hiddenPages];
const related = allPages.slice(0, 24);

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageTemplate(page, index) {
  const [slug, title, description, tag] = page;
  const depthPrefix = "../".repeat(slug.split("/").length);
  const chosen = [snippets[index % snippets.length], snippets[(index + 2) % snippets.length], snippets[(index + 4) % snippets.length]];
  const relatedPool = index >= pages.length ? allPages.slice(Math.max(0, index - 8), index).concat(allPages.slice(index + 1, index + 13)) : related;
  const relatedLinks = relatedPool
    .filter(([relatedSlug]) => relatedSlug !== slug)
    .slice(0, 8)
    .map(([relatedSlug, relatedTitle]) => `<a class="mini-link" href="${depthPrefix}${relatedSlug}/">${esc(relatedTitle)}</a>`)
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
  <link rel="icon" type="image/svg+xml" href="${depthPrefix}favicon.svg" />
  <link rel="apple-touch-icon" href="${depthPrefix}avatar.png.jpg" />
  <link rel="stylesheet" href="${depthPrefix}seo-style.css" />
  <script defer src="${depthPrefix}analytics.js"></script>
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
      <a class="brand" href="${depthPrefix}"><span class="brand-mark">T4F</span><span>TEXT4FREE</span></a>
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

function libraryTemplate() {
  const groups = hiddenPages.reduce((acc, page) => {
    const [slug] = page;
    const group = slug.split("/")[1] || "razdely";
    acc[group] ||= [];
    acc[group].push(page);
    return acc;
  }, {});
  const groupTitles = {
    nastroenie: "По настроению",
    zhanry: "По жанрам",
    formaty: "По формату",
    "dlya-kogo": "Для кого",
    poisk: "По поисковым запросам",
    mobile: "Для телефона и коротких видео",
    longtail: "Длинные запросы",
  };
  const sections = Object.entries(groups).map(([group, items]) => `<section class="section">
      <h2>${esc(groupTitles[group] || group)}</h2>
      <div class="mini-grid">
        ${items.map(([slug, title]) => `<a class="mini-link" href="../${slug}/">${esc(title)}</a>`).join("\n        ")}
      </div>
    </section>`).join("\n\n    ");

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#090909" />
  <title>Скрытая SEO-библиотека текстов для песен | TEXT4FREE</title>
  <meta name="description" content="Глубинная библиотека TEXT4FREE: тексты для песен, рэпа, TikTok, Reels, демо, релизов и начинающих артистов." />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${domain}/biblioteka/" />
  <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
  <link rel="stylesheet" href="../seo-style.css" />
  <script defer src="../analytics.js"></script>
</head>
<body>
  <main class="wrap">
    <header class="nav">
      <a class="brand" href="../"><span class="brand-mark">T4F</span><span>TEXT4FREE</span></a>
      <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer">Telegram</a>
    </header>
    <section class="hero">
      <div class="eyebrow">глубокая база / SEO</div>
      <h1>Библиотека текстов для песен</h1>
      <p>Эта страница собрана для глубокой навигации по нишевым запросам. На сайте - категории и примеры, в Telegram - основная база и тысячи строк.</p>
      <div class="cta-row">
        <a class="btn" href="${telegramUrl}" target="_blank" rel="noopener noreferrer">Открыть Telegram</a>
        <a class="btn alt" href="../teksty-bez-avtorskih-prav/">Главный раздел</a>
      </div>
    </section>
    ${sections}
    <footer class="footer">TEXT4FREE © 2026 · скрытая SEO-библиотека</footer>
  </main>
</body>
</html>
`;
}

for (const [index, page] of allPages.entries()) {
  const [slug] = page;
  mkdirSync(slug, { recursive: true });
  writeFileSync(join(slug, "index.html"), pageTemplate(page, index), "utf8");
}
mkdirSync("biblioteka", { recursive: true });
writeFileSync(join("biblioteka", "index.html"), libraryTemplate(), "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/biblioteka/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.72</priority>
  </url>
${allPages.map(([slug], index) => `  <url>
    <loc>${domain}/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${index < 3 ? "0.95" : index < 12 ? "0.88" : index < pages.length ? "0.78" : "0.64"}</priority>
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
      <div class="deep-library-link">
        <a href="biblioteka/">Открыть скрытую SEO-библиотеку</a>
      </div>
    </section>

`;
  indexHtml = indexHtml.slice(0, start) + replacement + indexHtml.slice(end);
}
writeFileSync("index.html", indexHtml, "utf8");

console.log(`Built ${allPages.length} SEO pages and sitemap.`);
