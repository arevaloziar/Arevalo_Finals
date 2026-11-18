// This file runs in the head so the saved theme is ready before the page shows.
(function () {
  const settingsKey = "zia-portfolio-settings-v1";
  const defaults = {
    theme: "light",
    visitorName: "",
    lastVisit: null
  };
  let canSave = true;
  let savedSettings = { ...defaults };

  try {
    const savedText = window.localStorage.getItem(settingsKey);

    if (savedText !== null) {
      let parsed;

      try {
        parsed = JSON.parse(savedText);
      } catch (error) {
        console.warn("Saved settings were not valid JSON. Using defaults.", error);
        parsed = null;
      }

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        if (parsed.theme === "light" || parsed.theme === "dark") {
          savedSettings.theme = parsed.theme;
        } else if (parsed.theme !== undefined) {
          console.warn("Saved theme was not light or dark. Using the default theme.");
        }

        if (typeof parsed.visitorName === "string") {
          savedSettings.visitorName = parsed.visitorName.trim().slice(0, 40);
        } else if (parsed.visitorName !== undefined) {
          console.warn("Saved visitor name was not text. Leaving it blank.");
        }

        if (typeof parsed.lastVisit === "string" && !Number.isNaN(Date.parse(parsed.lastVisit))) {
          savedSettings.lastVisit = parsed.lastVisit;
        } else if (parsed.lastVisit !== null && parsed.lastVisit !== undefined) {
          console.warn("Saved visit date was not valid. Leaving it blank.");
        }
      } else if (parsed !== null) {
        console.warn("Saved settings were not an object. Using defaults.");
      }
    }
  } catch (error) {
    canSave = false;
    console.warn("Local Storage could not be read. Settings will not persist.", error);
  }

  document.documentElement.dataset.theme = savedSettings.theme;

  function saveSettings() {
    if (!canSave) return false;

    try {
      window.localStorage.setItem(settingsKey, JSON.stringify(savedSettings));
      return true;
    } catch (error) {
      canSave = false;
      console.warn("Local Storage could not be saved. Changes will not persist.", error);
      return false;
    }
  }

  window.portfolioSettings = {
    key: settingsKey,
    value: savedSettings,
    save: saveSettings,
    canSave: function () {
      return canSave;
    }
  };
})();