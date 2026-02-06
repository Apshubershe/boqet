const card = document.getElementById('card');
const btn = document.getElementById('openBtn');
const photo = document.getElementById('photoContainer');
const text = document.getElementById('secondMessage');
const heartsBox = document.getElementById('hearts');
const song = document.getElementById('song');
const flowers = document.getElementById('flowersContainer');
const projectBtn = document.getElementById('projectBtn');

const COLORS = ['#ff6b81','#ff9ff3','#feca57','#ffffff','#c56cf0','#ff4757'];
let flowerCount = 0;

btn.onclick = () => {
  card.classList.add('open');

  setTimeout(() => {
    photo.classList.add('show');
    typeText("Я тебя очень люблю", text);
    fadeMusic();
    spawnHearts();
    startGarden();

    // Показ кнопки с ссылкой после появления цветов
    setTimeout(() => {
      projectBtn.classList.add('show');
    }, 1000);

  }, 2000);
};

function typeText(t, el) {
  el.textContent = "";
  el.style.opacity = 1;
  let i = 0;
  const int = setInterval(() => {
    el.textContent += t[i++];
    if (i >= t.length) clearInterval(int);
  }, 80);
}

function fadeMusic() {
  song.volume = 0;
  song.play();
  let v = 0;
  const f = setInterval(() => {
    v += 0.05;
    song.volume = v;
    if (v >= 1) clearInterval(f);
  }, 200);
}

function spawnHearts() {
  const HEARTS_COUNT = 7;
  for (let i = 0; i < HEARTS_COUNT; i++) {
    const h = document.createElement('div');
    h.className = 'heart-fly';
    h.style.left = 40 + Math.random() * 120 + 'px';
    h.style.animationDelay = Math.random() * 1.5 + 's';
    heartsBox.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }
}

function startGarden() {
  const i = setInterval(() => {
    if (flowerCount >= 80) return clearInterval(i);
    createFlower();
    flowerCount++;
  }, 400);
}

function createFlower() {
  const f = document.createElement('div');
  f.className = 'flower';
  f.style.left = Math.random() * innerWidth + 'px';
  f.style.top = Math.random() * innerHeight + 'px';
  f.style.setProperty('--petal-color', COLORS[Math.floor(Math.random()*COLORS.length)]);

  const c = document.createElement('div');
  c.className = 'flower-center';
  f.appendChild(c);

  for (let l = 0; l < 7; l++) {
    const layer = document.createElement('div');
    layer.className = 'petal-layer';
    layer.style.animationDelay = l * 0.15 + 's';

    const r = 30 - l * 4;
    const s = 12 - l;

    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.width = s + 'px';
      p.style.height = s + 'px';
      const a = (i / 8) * Math.PI * 2;
      p.style.left = Math.cos(a) * r + 'px';
      p.style.top = Math.sin(a) * r + 'px';
      layer.appendChild(p);
    }
    f.appendChild(layer);
  }
  flowers.appendChild(f);
}
