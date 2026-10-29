// ВСЕ подборки лежат здесь. Чтобы добавить свою, скопируйте любую строку и измените.
// type: "movie" | "series" | "youtube"
// slot: "short" (до 45 минут) | "film" (один фильм) | "evening" (несколько серий)
const PICKS = [
  { title: "Друзья", type: "series", slot: "short", length: "22 мин", note: "Один-два эпизода ситкома: легко, смешно, без обязательств." },
  { title: "Рик и Морти", type: "series", slot: "short", length: "22 мин", note: "Короткие эпизоды с безумными идеями. Хорошо на один присест." },
  { title: "Видеоэссе о кино (пример)", type: "youtube", slot: "short", length: "около 20 мин", note: "Замените на ролик, который вам нравится." },

  { title: "Отель «Гранд Будапешт» (2014)", type: "movie", slot: "film", length: "99 мин", note: "Комедия с продуманной картинкой. Короткий и яркий вариант." },
  { title: "Паразиты (2019)", type: "movie", slot: "film", length: "132 мин", note: "Социальный триллер. Лучше не читать заранее про сюжет." },
  { title: "Начало (2010)", type: "movie", slot: "film", length: "148 мин", note: "Фантастика о снах внутри снов. Требует внимания." },
  { title: "История одного изобретения (пример)", type: "youtube", slot: "film", length: "около 1 часа", note: "Замените на длинный документальный ролик со своего любимого канала." },

  { title: "Чернобыль (2019)", type: "series", slot: "evening", length: "5 серий", note: "Мини-сериал о катастрофе. Тяжёлый, но цельный." },
  { title: "Ход королевы (2020)", type: "series", slot: "evening", length: "7 серий", note: "История шахматистки. Затягивает и без знания шахмат." }
];

const TYPE_NAMES = { movie: "Фильм", series: "Сериал", youtube: "YouTube" };

// Собирает HTML одной карточки
function cardHTML(p) {
  return `
    <article class="card ${p.type}">
      <h3>${p.title}</h3>
      <p class="meta">${TYPE_NAMES[p.type]}, ${p.length}</p>
      <p>${p.note}</p>
    </article>`;
}

// Включает одну кнопку из группы и выключает остальные
function selectChip(group, chip) {
  group.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  chip.setAttribute("aria-pressed", "true");
}

/* ---------- Главная: случайный выбор ---------- */
const pickButton = document.getElementById("pick");

if (pickButton) {
  const result = document.getElementById("result");
  const group = document.querySelector(".chips");
  let slot = "film"; // выбрано по умолчанию

  group.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    slot = chip.dataset.slot;
    selectChip(group, chip);
  });

  pickButton.addEventListener("click", () => {
    const options = PICKS.filter(p => p.slot === slot);
    const choice = options[Math.floor(Math.random() * options.length)];
    result.innerHTML = cardHTML(choice);
  });
}

/* ---------- Каталог: фильтр по типу ---------- */
const list = document.getElementById("list");

if (list) {
  const group = document.querySelector(".chips");

  function show(type) {
    const items = type === "all" ? PICKS : PICKS.filter(p => p.type === type);
    list.innerHTML = items.map(cardHTML).join("");
  }

  group.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    selectChip(group, chip);
    show(chip.dataset.type);
  });

  show("all");
}
