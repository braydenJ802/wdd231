import { getParkData } from "./parkService.mjs";

function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function setHeaderInfo(data) {
  // insert data into disclaimer section
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  // set the page title
  const title = document.querySelector("head > title").textContent = data.fullName;

  // set banner image
  document.querySelector(".hero-banner > img").src = data.images[0].url;

  // set header info
  document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(data);
}


function mediaCardTemplate(info) {

  return `
    <img src="${info.url}" alt="${info.altText}" class="media-card__image" />

    <h1 class="media-card__title">${info.title}</h1>

    <p class="media-card__desc>${info.description}</p>
  `;
}


const parkData = getParkData();
setHeaderInfo(parkData);

