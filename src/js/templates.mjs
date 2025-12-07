export function iconTemplate(iconId) {
  // Shared helper for pulling icons from sprite.symbol.svg (saves us from typing the same markup each time).
  return `<svg class="icon" role="presentation" focusable="false">
    <use xlink:href="/images/sprite.symbol.svg#${iconId}"></use>
  </svg>`;
}

export function visitorCenterTitleTemplate(text) {
  // Heading that combines the ranger-station icon with the visitor center name.
  return `${iconTemplate("ranger-station")}<span class="visitor-center-name__text">${text ??
    "Visitor Center"}</span>`;
}

export function visitorCenterInfoTemplate(center) {
  // Hero section with the first image + description; falls back to the stock Yellowstone image if nothing is returned.
  const fallbackImage =
    "https://www.nps.gov/common/uploads/structured_data/3C7D5920-1DD8-B71B-0B83F012ED802CEA.jpg";
  const image = center?.images?.[0];
  const src = image?.url ?? fallbackImage;
  const alt = image?.altText ?? center?.name ?? "Visitor center";
  const caption = image?.caption ?? "";
  const credit = image?.credit ?? "";

  return `<figure class="visitor-center-info__figure">
      <img src="${src}" alt="${alt}" class="visitor-center-info__image" />
      <figcaption class="visitor-center-info__figcaption">
        <span class="visitor-center-info__image-title">${caption}</span>
        <span class="visitor-center-info__image-credit">${credit}</span>
      </figcaption>
    </figure>
    <p class="visitor-center-info__description">
      ${center?.description ?? "No description available."}
    </p>`;
}

function visitorCenterAddressTemplate(address, label) {
  // Render either the formatted address or a simple “not available” message.
  if (!address) {
    return `<section>
      <h3>${label}</h3>
      <p>No ${label.toLowerCase()} available.</p>
    </section>`;
  }

  return `<section>
      <h3>${label}</h3>
      <address>
        ${address.line1 ?? ""}<br />
        ${address.line2 ? `${address.line2}<br />` : ""}
        ${address.line3 ? `${address.line3}<br />` : ""}
        ${[address.city, address.stateCode].filter(Boolean).join(", ")} ${address.postalCode ?? ""}
      </address>
    </section>`;
}

export function visitorCenterAddressesListTemplate(addresses = []) {
  // Compose both physical and mailing address sections if present.
  const physical = addresses.find((address) => address.type === "Physical");
  const mailing = addresses.find((address) => address.type === "Mailing");

  return (
    visitorCenterAddressTemplate(physical, "Physical Address") +
    visitorCenterAddressTemplate(mailing, "Mailing Address")
  );
}

export function listTemplate(
  data = [],
  contentTemplate,
  { className = "", emptyHtml = "<li>None listed.</li>", wrap = true } = {}
) {
  // Generic list generator that accepts a per-item template. Can optionally skip the <ul> wrapper.
  const classAttr = className ? ` class="${className}"` : "";
  if (!data || !data.length) {
    return wrap ? `<ul${classAttr}>${emptyHtml}</ul>` : emptyHtml;
  }
  const markup = data.map(contentTemplate).join("");
  return wrap ? `<ul${classAttr}>${markup}</ul>` : markup;
}

export function visitorCenterAmenityTemplate(item) {
  return `<li>${item}</li>`;
}

export function visitorCenterImageTemplate(image) {
  return `<li><img src="${image.url}" alt="${image.altText ?? image.caption ?? ""}" /></li>`;
}

export function visitorCenterDirectionsTemplate(info, url) {
  // Directions paragraph
  const directions = info ?? "No directions provided.";
  const link = url // link is an empty placeholder
    ? `<a class="visitor-center-directions__link" href="#" aria-disabled="true"> 
        Open detailed directions
      </a>`
    : "";
  return `<p class="visitor-center-directions__text">${directions}</p>${link}`;
}

export function visitorCenterContactsTemplate(contacts = {}) {
  // Only the first email/phone are displayed
  const email = contacts.emailAddresses?.[0];
  const phone = contacts.phoneNumbers?.[0];

  const emailHtml = email
    ? `<a href="mailto:${email.emailAddress}">${email.description || email.emailAddress}</a>`
    : "<p>No email listed.</p>";

  const phoneHtml = phone
    ? `<a href="tel:${phone.phoneNumber.replace(/[^0-9]/g, "")}">${phone.description ||
        phone.phoneNumber}</a>`
    : "<p>No phone number listed.</p>";

  return `<section class="visitor-center-contact__email">
      <h3>Email Address</h3>
      ${emailHtml}
    </section>
    <section class="visitor-center-contact__phone">
      <h3>Phone Numbers</h3>
      ${phoneHtml}
    </section>`;
}
