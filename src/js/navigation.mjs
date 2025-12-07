function setExpandedState(button, expanded) {
  if (!button) return;
  button.setAttribute("aria-expanded", String(expanded));
}

function togglePanel(button, panel) {
  if (!panel) return;
  const shouldOpen = button.getAttribute("aria-expanded") !== "true";
  setExpandedState(button, shouldOpen);
  panel.classList.toggle("show", shouldOpen);
}

function initMainMenuToggle() {
  const button = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");
  if (!button || !globalNav) return;

  button.addEventListener("click", () => {
    const isOpen = !globalNav.classList.contains("show");
    globalNav.classList.toggle("show", isOpen);
    setExpandedState(button, isOpen);
  });
}

function initSplitButtonToggles() {
  const buttons = document.querySelectorAll(".global-nav__split-button__toggle");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const submenu = button.closest("li")?.querySelector(".global-nav__submenu");
      togglePanel(button, submenu);
    });
  });
}

function initNestedSplitButtonToggles() {
  const selectors = [
    ".global-nav__submenu__split-button__toggle",
    ".global-nav__deep-submenu__split-button__toggle",
  ];
  const nestedButtons = document.querySelectorAll(selectors.join(", "));
  const validPanels = [
    "global-nav__submenu",
    "global-nav__deep-submenu",
    "global-nav__very-deep-submenu",
  ];

  nestedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button
        .closest(
          ".global-nav__submenu__split-button, .global-nav__deep-submenu__split-button"
        )
        ?.nextElementSibling;

      if (panel && validPanels.some((cls) => panel.classList.contains(cls))) {
        togglePanel(button, panel);
      }
    });
  });
}

export function initNavigation() {
  initMainMenuToggle();
  initSplitButtonToggles();
  initNestedSplitButtonToggles();
}
