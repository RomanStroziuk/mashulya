const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let e = []; // trails
let h = []; // heart path
let O = canvas.width = innerWidth;
let Q = canvas.height = innerHeight;

const v = 32; // num trails, num particles per trail & num nodes in heart path
const M = Math;
const R = M.random;
const C = M.cos;
const Y = 6.3; // close to 44/7 or Math.PI * 2 - 6.3 seems is close enough.

const textArray = ["Машуля","Прівєт❤️", "Хочу", "Тобі", "Нагадати", "Що...", "Ти", "Найкраща дівчина у світі", "Ти змушуєш моє серце битися швидше", "Я ціную кожну мить, проведену з тобою"
  , "Ти – моя підтримка і опора", "Ти для мене – найцінніший скарб", "Ти робиш мене кращим", "Ти моє сонечко", "Ти мій спокій", "Ти мій дім", "Ти завжди чарівна", "Я не можу уявити своє життя без тебе", "Я пишаюсь тобою", "Я люблю тебе такою, яка ти є", "А", "Ще", "Ти", "Чарівна ✨", "Неповторна 💖", "Дивовижна 💫", "Ніжна 🌸", "Незрівнянна 🌟", "Казкова 🧚‍♀️", "Захоплююча 💕"
  , "Стильна ✨ ", "Витончена  🌸 ", "Розкішна 👑", "Красива 💐", "Лагідна ☀️", "Спокуслива 🔥", "Краща ніж Іра 🎀", "Неперевершена 💎", "Геніальна 🧠", "Милозвучна 🎶", "Вірна ❤️", "Вродлива 🌹", "Прекрасна 🌺", "Унікальна 💎", "Непідробна 🤗", "Божественна ✨", "Я вдячний ", "Долі", "Що", "Подарувала", "Мені", "Тебе"
  , "Я", "ТЕБЕ", "ДУЖЕ", "ЛЮБЛЮ",  "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺"
  , "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️",
   "🌺", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️"
  , "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️"
  , "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺"
  , "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺", "🌺"

];

// Масив для зберігання анімованого тексту
let animatedTexts = [];
let textIndex = 0; // Індекс для вибору тексту по порядку

// Функція для створення тексту
function createText(x, y, text) {
  return {
    x: x,
    y: y,
    text: text,
    alpha: 1, // Початкова прозорість (повністю видимий)
    speedX: R() * 1 - 1, // Швидкість руху по X
    speedY: R() * 1 - 1, // Швидкість руху по Y
    fadeSpeed: 0.005 + R() * 0.001
   };
}

// Функція для відображення тексту
function renderText(animatedText) {
  ctx.fillStyle = `rgba(255, 255, 255, ${animatedText.alpha})`;
  ctx.font = "30px Arial";
  ctx.fillText(animatedText.text, animatedText.x, animatedText.y);
}

// Формування шляху серця
for (let i = 0; i < Y; i += 0.2) {
  h.push([
    O / 2 + 180 * M.pow(M.sin(i), 3),
    Q / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))
  ]);
}

let i = 0;
while (i < v) {
  const x = R() * O;
  const y = R() * Q;

  const H = i / v * 80 + 280;
  const S = R() * 40 + 60;
  const B = R() * 60 + 20;

  let f = [];

  let k = 0;
  while (k < v) {
    f[k++] = {
      x: x,
      y: y,
      X: 0,
      Y: 0,
      R: (1 - k / v) + 1,
      S: R() + 1,
      q: ~~(R() * v),
      D: i % 2 * 2 - 1,
      F: R() * 0.2 + 0.7,
      f: `hsla(${~~H},${~~S}%,${~~B}%,.1)`
    };
  }

  e[i++] = f;
}

// Функція для малювання частинки
function render(_) {
  ctx.fillStyle = _.f;
  ctx.beginPath();
  ctx.arc(_.x, _.y, _.R, 0, Y, 1);
  ctx.closePath();
  ctx.fill();
}

function loop() {
  ctx.fillStyle = "rgba(0,0,0,.2)";
  ctx.fillRect(0, 0, O, Q);

  let i = v;
  while (i--) {
    let f = e[i];
    let u = f[0];
    let q = h[u.q];
    let D = u.x - q[0];
    let E = u.y - q[1];
    let G = M.sqrt((D * D) + (E * E));

    if (G < 10) {
      if (R() > .95) {
        u.q = ~~(R() * v);
      } else {
        if (R() > .99) u.D *= -1;
        u.q += u.D;
        u.q %= v;
        if (u.q < 0) u.q += v;
      }
    }

    u.X += -D / G * u.S;
    u.Y += -E / G * u.S;

    u.x += u.X;
    u.y += u.Y;

    render(u);

    u.X *= u.F;
    u.Y *= u.F;

    let k = 0;
    while (k < v - 1) {
      let T = f[k];
      let N = f[++k];

      N.x -= (N.x - T.x) * 0.7;
      N.y -= (N.y - T.y) * 0.7;

      render(N);
    }
  }

  // Оновлення та рендеринг анімованого тексту
  animatedTexts = animatedTexts.filter(text => text.alpha > 0); // Видаляємо тексти, що вже зникли

  animatedTexts.forEach(text => {
    text.x += text.speedX;
    text.y += text.speedY;
    text.alpha -= text.fadeSpeed; // Зменшуємо прозорість

    renderText(text); // Малюємо текст
  });
}

// Обробник кліків для додавання нового тексту
canvas.addEventListener('click', (e) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Генеруємо координати в межах 500×500 від центру
  const x = centerX + (R() * 100 - 100); // Від -250 до +250
  const y = centerY + (R() * 100 - 100);

  // Беремо текст по порядку, якщо дійшли до кінця масиву - починаємо з початку
  const randomText = textArray[textIndex];
  textIndex = (textIndex + 1) % textArray.length; // Оновлення індексу циклічно

  // Додаємо новий текст в масив
  animatedTexts.push(createText(x, y, randomText));
});

// Запуск анімації
(function doit() {
  requestAnimationFrame(doit);
  loop();
})();
