const STORAGE_KEY = "darklyStorage";
let siteSettings = {};

// Check if the site is enabled
const on = () => {
  const siteSetting = siteSettings[window.location.hostname];
  if (siteSetting === undefined) return false;
  return siteSettings[window.location.hostname];
};

// Get the site settings from the storage
chrome.storage.local.get([STORAGE_KEY], function (result) {
  siteSettings = result[STORAGE_KEY] || {};

  // Toggle the site settings based on the current config
  if (on()) nighttime();
});

// Save the site settings to the storage
const saveSiteSettings = (site, enabled) => {
  siteSettings[site] = enabled;
  chrome.storage.local.set({ [STORAGE_KEY]: siteSettings });
};

// Toggle the site settings to nighttime
const nighttime = () => {
  saveSiteSettings(window.location.hostname, true);

  // Add the overlay
  const overlay = document.createElement("div");
  overlay.id = "darkly-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "9999999999999";
  overlay.style.backdropFilter =
    "invert(100%) hue-rotate(180deg) contrast(0.90) brightness(1.2)";
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);

  // Add the 'dark-mode' class to the body
  document.body.classList.add("dark-mode");
};

// Toggle the site settings to daytime
const daytime = () => {
  saveSiteSettings(window.location.hostname, false);

  // Remove the overlay
  const overlay = document.getElementById("darkly-overlay");
  if (!overlay) return;
  overlay.remove();

  // Remove the 'dark-mode' class from the body
  if (!document.body.classList.contains("dark-mode")) return;
  document.body.classList.remove("dark-mode");
};

// Listen for the key combination to toggle the site settings
document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "j") {
    if (on()) daytime();
    else nighttime();
  }
});
