import { getImg } from "./Decor/image.js";
fetch("https://fdo.rocketlaunch.live/json/launches/next/5")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("launches-container");
    data.result.slice(0, 4).forEach((rocket) => {
      const card = document.createElement("div");
      card.classList.add("launch-card");
      let utcTime;

      if (rocket.t0) {
        utcTime = new Date(rocket.t0);
      } else  {
        utcTime = new Date(Number(rocket.sort_date) * 1000); 
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
      const istTime = utcTime? utcTime.toLocaleString("en-US", istOptions): "TBD";
      const pad = rocket.pad;
      const location = [
        pad.location?.name,
        pad.location?.statename,
        pad.location?.country,
      ]
        .filter(Boolean)
        .join(", ");

      const name = rocket.vehicle.name;
      let img = getImg(name);

      const providerName = rocket.provider.name;
      const url = URL[providerName] || "#";

      card.innerHTML = `
        <img class="Img" src="${img}" alt="Launch Image">
        
        <div class="content">
            <div class="badge"><a href="${url}" target="_blank">${rocket.provider.name}</a></div>
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
