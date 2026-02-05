const bouquet = document.getElementById("bouquet");

bouquet.addEventListener("click", () => {
  const flower = document.createElement("div");
  flower.classList.add("flower");

  // случайный цвет
  const colors = ["#ff6f91", "#ffc75f", "#f9a1bc", "#cdb4db"];
  flower.style.background = colors[Math.floor(Math.random() * colors.length)];

  bouquet.appendChild(flower);
});
