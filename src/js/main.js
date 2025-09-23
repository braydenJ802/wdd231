import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// Title
const title = document.querySelector("title");
title.innerHTML = parkData.fullName;

// Disclaimer
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;


function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

// Park & States
const hero_banner_content = document.querySelector(".hero-banner__content");
hero_banner_content.innerHTML = parkInfoTemplate(parkData);

