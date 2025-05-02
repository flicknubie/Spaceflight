fetch("http://54.211.225.1:3000/rocket")
  .then((res) => res.json())
  .then((rocket) => {
    const container = document.getElementById("rockets-container");
    rocket.forEach((rockets) => {
      const card = document.createElement("div");
      card.classList.add("rocket-card");
      card.innerHTML = `
            <img class="img" src="${rockets.image}">
            <div class="name"><a href="/rockets/Rockets_Details/Rockets_Details.html?name=${encodeURIComponent(
              rockets.name
            )}">${rockets.name}</a></div>
        `;
      container.appendChild(card);
    });
  });
