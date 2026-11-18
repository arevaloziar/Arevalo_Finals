const portfolio = window.portfolioSettings;
const settings = portfolio ? portfolio.value : { theme: "light" };
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = themeToggle ? themeToggle.querySelector(".theme-label") : null;

function updateThemeButton() {
  if (!themeToggle) return;
  const isDark = settings.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  if (themeLabel) themeLabel.textContent = "Theme";
  themeToggle.firstChild.textContent = isDark ? "☀ " : "◐ ";
}

function saveSettings() {
  return portfolio ? portfolio.save() : false;
}

if (themeToggle) {
  updateThemeButton();
  themeToggle.addEventListener("click", function () {
    settings.theme = settings.theme === "dark" ? "light" : "dark";
    root.dataset.theme = settings.theme;
    updateThemeButton();
    saveSettings();
  });
}

function setupFilter(buttonAttribute, cardSelector, cardAttribute) {
  const buttons = Array.from(document.querySelectorAll("[" + buttonAttribute + "]"));
  if (!buttons.length) return;
  const cards = Array.from(document.querySelectorAll(cardSelector));

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute(buttonAttribute);
      buttons.forEach(function (item) {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      cards.forEach(function (card) {
        const categories = (card.getAttribute(cardAttribute) || "").split(/\s+/);
        card.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });
}

setupFilter("data-project-filter", ".project-card", "data-project-category");
setupFilter("data-course-filter", ".course-card", "data-course-category");

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const status = document.querySelector("#contact-status");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    if (status) {
      status.textContent = "Thanks for your message! This front-end demo does not send or store it.";
    }
    contactForm.reset();
  });
}