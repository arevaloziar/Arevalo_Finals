const portfolio = window.portfolioSettings;
const settings = portfolio.value;
const visitorForm = document.querySelector("#visitor-form");
const visitorNameInput = document.querySelector("#visitor-name");
const visitorGreeting = document.querySelector("#visitor-greeting");
const lastVisit = document.querySelector("#last-visit");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = themeToggle.querySelector(".theme-label");
const storageNote = document.querySelector(".storage-note");
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

function showGreeting() {
  if (settings.visitorName) {
    visitorGreeting.textContent = "Welcome, " + settings.visitorName + "!";
  } else {
    visitorGreeting.textContent = "Welcome to my portfolio!";
  }
}

function updateThemeButton() {
  const isDark = settings.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
}

function saveAndShowStatus() {
  const saved = portfolio.save();
  storageNote.textContent = saved
    ? "Your theme and name stay in this browser."
    : "The page still works, but this browser is not saving settings.";
  return saved;
}

visitorNameInput.value = settings.visitorName;
showGreeting();
updateThemeButton();

if (settings.lastVisit) {
  const previousVisit = new Date(settings.lastVisit).toLocaleString();
  lastVisit.textContent = "Your last visit was " + previousVisit + ".";
} else {
  lastVisit.textContent = "This is your first visit.";
}

// Save this visit after showing the one from before.
settings.lastVisit = new Date().toISOString();
saveAndShowStatus();

themeToggle.addEventListener("click", function () {
  settings.theme = settings.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = settings.theme;
  updateThemeButton();
  saveAndShowStatus();
});

visitorForm.addEventListener("submit", function (event) {
  event.preventDefault();
  settings.visitorName = visitorNameInput.value.trim().slice(0, 40);
  visitorNameInput.value = settings.visitorName;
  showGreeting();
  saveAndShowStatus();
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  contactStatus.textContent = "Thanks! This demo does not send or save the message.";
  contactForm.reset();
});