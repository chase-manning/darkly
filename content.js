let on = false;

const nighttime = () => {
  on = true;

  // Add the overlay
  const overlay = document.createElement("div");
  overlay.id = "darkly-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "9999";
  overlay.style.backdropFilter = "invert(100%) hue-rotate(180deg)";
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);

  // Add the 'dark-mode' class to the body
  document.body.classList.add("dark-mode");
};

const daytime = () => {
  on = false;

  // Remove the overlay
  const overlay = document.getElementById("darkly-overlay");
  overlay.remove();

  // Remove the 'dark-mode' class from the body
  document.body.classList.remove("dark-mode");
};

document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "j") {
    if (on) daytime();
    else nighttime();
  }
});
