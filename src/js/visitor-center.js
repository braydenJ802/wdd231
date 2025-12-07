import "../css/style.css"; // baseline styles via Vite
import "../css/home.css";
import "../css/visitor-center.css";

import { getParkData, getParkVisitorCenterDetails, getVisitorCenterData } from "./parkService.mjs";
import { setHeaderInfo, setContactInfo } from "./siteInfo.mjs";
import { initNavigation } from "./navigation.mjs";
import { updateVisitorCenterNavLinks } from "./visitorCenterNav.mjs";
import {
  listTemplate,
  visitorCenterAddressesListTemplate,
  visitorCenterAmenityTemplate,
  visitorCenterContactsTemplate,
  visitorCenterDirectionsTemplate,
  visitorCenterImageTemplate,
  visitorCenterInfoTemplate,
  visitorCenterTitleTemplate,
} from "./templates.mjs";

export function getParam(param) {
  // Grab the search string (ex: id?=x000) and use URLSearchParams to get the correct Visitor Center data.
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

function renderVisitorCenter(center) {
  const main = document.querySelector("main");
  if (!main) return;

  if (!center) {
    // If we don't have a center, show the message from the assignment.
    main.innerHTML = `<section class="visitor-center-detail">
      <h1>Visitor center not found</h1>
      <p>Return to the <a href="conditions.html">conditions page</a> and choose another link.</p>
    </section>`;
    return;
  }

  // Heading
  const nameEl = document.querySelector(".visitor-center-name__text");
  if (nameEl) nameEl.textContent = center.name ?? "Visitor Center";

  // Info section (figure + description)
  const infoSection = document.querySelector(".visitor-center-info");
  if (infoSection) infoSection.innerHTML = visitorCenterInfoTemplate(center);

  // Addresses panel content
  const addressesEl = document.querySelector(".visitor-center-addresses");
  if (addressesEl)
    addressesEl.innerHTML = visitorCenterAddressesListTemplate(center.addresses ?? []);

  // Directions panel content
  const directionsEl = document.querySelector(".visitor-center-directions");
  if (directionsEl)
    directionsEl.innerHTML = visitorCenterDirectionsTemplate(
      center.directionsInfo,
      center.directionsUrl
    );

  // Amenities list (only the <li>s so the existing <ul> stays in place)
  const amenitiesList = document.querySelector(".visitor-center-amenities");
  if (amenitiesList)
    amenitiesList.innerHTML = listTemplate(center.amenities ?? [], visitorCenterAmenityTemplate, {
      emptyHtml: "<li>No amenities listed.</li>",
      wrap: false,
    });

  // Contact info (first email + phone, per assignment)
  const contactEl = document.querySelector(".visitor-center-contact");
  if (contactEl) contactEl.innerHTML = visitorCenterContactsTemplate(center.contacts ?? {});

  // Gallery (skip the first image because it's already used in the hero)
  const galleryList = document.querySelector(".visitor-center-gallery__list");
  if (galleryList)
    galleryList.innerHTML = listTemplate(center.images?.slice(1) ?? [], visitorCenterImageTemplate, {
      emptyHtml: '<li class="visitor-center-gallery__empty">No images available.</li>',
      wrap: false,
    });
}

function collapseOtherDetails() {
  const detailSections = document.querySelectorAll(
    ".visitor-center-details-list details"
  );
  // Same behavior as the conditions page: when one <details> opens, close the rest.
  detailSections.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        detailSections.forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
}

async function init() {
  const parkData = await getParkData();
  setHeaderInfo(parkData);
  setContactInfo(parkData);

  const navVisitorCenters = await getVisitorCenterData();
  updateVisitorCenterNavLinks(navVisitorCenters);

  const centerId = getParam("id");
  const centerDetails = centerId
    ? await getParkVisitorCenterDetails(centerId)
    : null;
  renderVisitorCenter(centerDetails);
  collapseOtherDetails();
}

init();
initNavigation();
