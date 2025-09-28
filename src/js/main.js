import { getParkData } from "./parkService.mjs";
import { getParkMediaInfo } from "./parkInfo.mjs";


function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function parkIntroTemplate(info) {
  return `
  <h2>${info.fullName}</h2>

  <p>${info.description}</p>
  `;
}

function mediaCardTemplate(info) {
  let html = ``;

  info.forEach(card => {
    html += `
      <a href="${card.link}">
        <img src="${card.image}" alt="${card.name}" class="media-card__image" />

        <h1 class="media-card__title">${card.name}</h1>

        <p class="media-card__desc>${card.description}</p>
      </a>
    `;
    console.log(card);
  });

  return html;
}

function contactInfoTemplate(info) {
  
  let contacts = info.contacts.phoneNumbers;
  let address = info.addresses[1];
  
  let html = ``;

  html += `
    <h1>Contact Info</h1>

    <address>
      <h2><em>Mailing Address:</em></h2>

      <p>${address.line1}</p>
      <p>${address.city}, ${address.stateCode} ${address.postalCode}</p>

      <h2><em>Phone:</em></h2>
  `

  contacts.forEach(number => {
    html += `
      <p>${number.phoneNumber}</p>
    `;
  });

  html += `</address>`;
  return html;
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

function setIntroInfo(data) {
  document.querySelector(".intro").innerHTML = parkIntroTemplate(data);
}

function setMediaCard(data) {
  document.querySelector(".media-card").innerHTML = mediaCardTemplate(data);
}

function setContactInfo(data) {
  document.querySelector("#park-footer").innerHTML = contactInfoTemplate(data);
}


const parkData = getParkData();
const parkMediaInfo = getParkMediaInfo();
setHeaderInfo(parkData);
setIntroInfo(parkData);
setMediaCard(parkMediaInfo);
setContactInfo(parkData);

