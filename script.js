window.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const button = document.getElementById('openBtn');
  const photoContainer = document.getElementById('photoContainer');
  const secondMessage = document.getElementById('secondMessage');
  const heartsContainer = document.getElementById('hearts');
  const song = document.getElementById('song');
  const flowersContainer = document.getElementById('flowersContainer');

  button.addEventListener('click', () => {
    card.classList.toggle('open');

    setTimeout(() => {
      photoContainer.style.transform = "translate(-50%, -50%) scale(1)";
      photoContainer.style.opacity = "1";
      secondMessage.textContent = "Я тебя очень люблю";
      secondMessage.style.opacity = "1";

      if (song) song.play();
      createFloatingHearts(30);

      const startTime = Date.now();
      const flowerInterval = setInterval(() => {
        if (Date.now() - startTime > 30000) { // 30 секунд
          clearInterval(flowerInterval);
        } else {
          for (let i = 0; i < 2; i++) createLayeredFlower();
        }
      }, 500);
    }, 2000);
  });

  function createFloatingHearts(count) {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart-floating');
      heart.style.left = Math.random() * 180 + "px";
      heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heartsContainer.appendChild(heart);
      heart.addEventListener('animationend', () => heart.remove());
    }
  }

  function createLayeredFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');

    const photoRect = photoContainer.getBoundingClientRect();
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    if (x > photoRect.left - 50 && x < photoRect.right + 50) {
      x += 150;
      if (x > window.innerWidth - 50) x -= 300;
    }
    if (y > photoRect.top - 50 && y < photoRect.bottom + 50) {
      y += 150;
      if (y > window.innerHeight - 50) y -= 300;
    }

    flower.style.left = x + "px";
    flower.style.top = y + "px";

    const center = document.createElement('div');
    center.classList.add('stem');
    flower.appendChild(center);

    // 7 слоев лепестков
    const layers = [
      { count: 8, radius: 28, size: 12, color: 'pink' },
      { count: 8, radius: 24, size: 10, color: 'pink' },
      { count: 8, radius: 20, size: 8, color: 'pink' },
      { count: 8, radius: 16, size: 7, color: 'pink' },
      { count: 8, radius: 12, size: 6, color: 'pink' },
      { count: 8, radius: 8, size: 5, color: 'pink' },
      
    ];

    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.width = layer.size + "px";
        petal.style.height = layer.size + "px";
        petal.style.background = layer.color;
        const angle = (i / layer.count) * 2 * Math.PI;
        petal.style.left = layer.radius * Math.cos(angle) + "px";
        petal.style.top = layer.radius * Math.sin(angle) + "px";
        flower.appendChild(petal);
      }
    });

    flowersContainer.appendChild(flower);
  }
});
