function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function contactInfoTemplate(info) {
  const contacts = info.contacts.phoneNumbers;
  const address = info.addresses[1];

  let html = `
    <h1>CONTACT INFO</h1>

    <address>
      <h2>Mailing Address:</h2>

      <p>${address.line1}</p>
      <p>${address.city}, ${address.stateCode} ${address.postalCode}</p>

      <h2>Phone:</h2>
  `;

  contacts.forEach((number) => {
    html += `
      <p>${number.phoneNumber}</p>
    `;
  });

  html += `</address>`;
  return html;
}

export function setHeaderInfo(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  if (disclaimer) {
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
  }

  const pageTitle = document.querySelector("head > title");
  if (pageTitle) pageTitle.textContent = data.fullName;

  const bannerImage = document.querySelector(".hero-banner > img");
  if (bannerImage) bannerImage.src = data.images[0].url;

  const heroContent = document.querySelector(".hero-banner__content");
  if (heroContent) heroContent.innerHTML = parkInfoTemplate(data);
}

export function setContactInfo(data) {
  const footer = document.querySelector("#park-footer");
  if (footer) footer.innerHTML = contactInfoTemplate(data);
}
