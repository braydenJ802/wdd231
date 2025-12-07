import "../css/style.css"; // we can do this type of import because we are using Vite
import "../css/home.css";

import { getParkData, getVisitorCenterData } from "./parkService.mjs";
import { getParkMediaInfo } from "./parkInfo.mjs";
import { initNavigation } from "./navigation.mjs";
import { setHeaderInfo, setContactInfo } from "./siteInfo.mjs";
import { updateVisitorCenterNavLinks } from "./visitorCenterNav.mjs";

function parkIntroTemplate(info) {
  return `
  <h2>${info.fullName}</h2>

  <p>${info.description}</p>
  `;
}

function mediaCardTemplate(info) {
  let html = ``;

  info.forEach((card) => {
    html += `
      <a class="media-card" href="${card.link}">
        <img src="${card.image}" alt="${card.name}" class="media-card__image" />

        <h1 class="media-card__title">${card.name}</h1>

        <p class="media-card__desc">${card.description}</p>
      </a>
    `;
  });

  return html;
}

function setIntroInfo(data) {
  const intro = document.querySelector(".intro");
  if (intro) intro.innerHTML = parkIntroTemplate(data);
}

function setMediaCard(data) {
  const parkInfo = document.querySelector(".park-info");
  if (parkInfo) parkInfo.innerHTML = mediaCardTemplate(data);
}

async function init() {
  const parkData = await getParkData();
  const parkMediaInfo = await getParkMediaInfo();
  const visitorCenters = await getVisitorCenterData();

  setHeaderInfo(parkData);
  setIntroInfo(parkData);
  setMediaCard(parkMediaInfo);
  setContactInfo(parkData);
  updateVisitorCenterNavLinks(visitorCenters);
}

init();
initNavigation();
