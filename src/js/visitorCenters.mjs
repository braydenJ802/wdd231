export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
  <h4><a href="visitor-center.html?id=${center.id}">${center.name}</a></h4>
  <p>${center.description}</p>
  <p>${center.directionsInfo}</p>
  </li>`;
}

export function renderVisitorCenters(listElements, centers = []) {
  if (!listElements?.length) return;
  const markup = centers.map(visitorCenterTemplate).join("");
  listElements.forEach((element) => {
    element.innerHTML = markup;
  });
}
