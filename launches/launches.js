let page = parseInt(localStorage.getItem("page")) || 1;
if (page >= 1 && page <= 5) {
  fetch(
    `https://fdo.rocketlaunch.live/json/launches?key=8d97c60b-25f0-4091-9237-b97e0caf238e&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const container = document.getElementById("launches-container");
      data.result.forEach((rocket) => {
        const card = document.createElement("div");
        card.classList.add("launch-card");
        const sortDateSeconds = rocket.sort_date;
        const sortDateMilliseconds = Number(sortDateSeconds) * 1000;
        let utcTime;
        if (rocket.t0) {
          utcTime = new Date(rocket.t0);
        } else if (rocket.sort_date) {
          utcTime = new Date(sortDateMilliseconds);
        }
        const istOptions = {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZoneName: "short",
        };
        const istTime = utcTime
          ? utcTime.toLocaleString("en-US", istOptions)
          : "TBD";
        const pad = rocket.pad;
        const location = [
          pad.location?.name,
          pad.location?.statename,
          pad.location?.country,
        ]
          .filter(Boolean)
          .join(", ");
        const providerURL = rocket.provider.name;
        const url = URL[providerURL];

        card.innerHTML = `
        <img class="Img" src="https://www.cnsa.gov.cn/english/n6465652/n6465653/c6810962/part/6785764.jpeg" alt="Launch Image">
        
        <div class="content">
            <div class="badge"><a href="${url}" target="_blank">${providerURL}</a></div>
            <div class="title"> ${rocket.vehicle.name} | ${rocket.name}</div>
            <div class="datetime">${istTime}<br>${location}</div>
        </div>
        <div class="actions">
            <a href="./work.html">DETAILS</a>
        </div>
    `;
        card.addEventListener("click", (event) => {
          if (event.target.tagName === "A") {
            if (!url) {
              event.preventDefault();
              alert("No Website Found :)");
            }
          }
        });
        container.appendChild(card);
      });
    });
  const next = document.getElementById("Next");
  next.classList.add("next");
  if (page < 5) {
    next.innerHTML = `<button>Next</button>`;
    next.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        localStorage.setItem("page", page + 1);
        location.reload();
      }
    });
  }

  const prev = document.getElementById("Prev");
  prev.classList.add("prev");
  if (page > 1) {
    prev.innerHTML = `<button>Prev</button>`;
    prev.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        localStorage.setItem("page", page - 1);
        location.reload();
      }
    });
  }
  let resetTimeout;

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      resetTimeout = setTimeout(() => {
        localStorage.removeItem("page");
      });
    }
  });
}
