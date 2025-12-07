import spritePath from '../images/sprite.symbol.svg';
import "../css/style.css"; // we can do this type of import because we are using Vite
import "../css/home.css";
import "../css/conditions.css";

import { getParkData, getParkAlerts, getVisitorCenterData, getActivityData } from "./parkService.mjs";
import { setHeaderInfo, setContactInfo } from "./siteInfo.mjs";
import { initNavigation } from "./navigation.mjs";
import { updateVisitorCenterNavLinks } from "./visitorCenterNav.mjs";

// Template functions

function alertInfoTemplate(alert) {

    // Most of the alerts were a single word, the "Park Closure" was the only exception
    let alertType = alert.category === "Park Closure" ? "closure" : alert.category.toLowerCase();

    return `<li class="alert">
        <svg class="icon" focusable="false" aria-hidden="true">
            <use xlink:href="${spritePath}#alert-${alertType}"></use>
        </svg>
        <div class="alert-content">
            <h3 class="alert-${alertType}">${alert.title}</h3>
            <p>${alert.description}</p>
        </div></li>`
}

function visitorCenterInfoTemplate(center) {
    return `<li class="visitor-center">
        <h4><a href="visitor-center.html?id=${center.id}">${center.name}</a></h4>
        <p>${center.description}</p>
        <p>${center.directionsInfo}</p>
    </li>`;
}

function activityInfoTemplate(activity) {
    return `<li class="activity">${activity.name}</li>`;
}


// HTML Setters

function setParkAlerts(alerts) {
    const alertsContainer = document.querySelector(".alerts > ul");
    if (!alertsContainer) return;

    const html = (alerts || []).map(alertInfoTemplate).join("");
    alertsContainer.innerHTML = html || "<li>No current alerts.</li>";
}

function setVisitorCenterInfo(vistorCenters) {
    const visitorCenterContainer = document.querySelector(".visitor-services > details > ul");
    if (!visitorCenterContainer) return;

    const html = (vistorCenters || []).map(visitorCenterInfoTemplate).join("");
    visitorCenterContainer.innerHTML = html || "<li>No visitor centers available</li>";
}

function setActivityInfo(activities) {
    const activityContainer = document.querySelector(".activities > details > ul");
    if (!activityContainer) return;

    const html = (activities || []).map(activityInfoTemplate).join("");
    activityContainer.innerHTML = html || "<li>No activities available</li>";

}


async function init() {
  const parkData = await getParkData();
  const parkAlerts = await getParkAlerts();
  const visitorCenters = await getVisitorCenterData();
  const activities = await getActivityData();

  setHeaderInfo(parkData);
  setContactInfo(parkData);

  setParkAlerts(parkAlerts);
  setVisitorCenterInfo(visitorCenters);
  setActivityInfo(activities);
  updateVisitorCenterNavLinks(visitorCenters);
}

init();
initNavigation();
