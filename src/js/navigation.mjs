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
  const nestedButtons = document.querySelectorAll(
    ".global-nav__submenu__split-button__toggle"
  );

  nestedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button
        .closest(".global-nav__submenu__split-button")
        ?.nextElementSibling;

      if (
        panel &&
        (panel.classList.contains("global-nav__submenu") ||
          panel.classList.contains("global-nav__deep-submenu"))
      ) {
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

