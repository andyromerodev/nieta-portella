function applyThemeIcons() {
  const dark = document.documentElement.classList.contains("dark");
  const icon = dark ? "light_mode" : "dark_mode";
  ["themeIcon", "themeToggleIcon"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = icon;
  });
}

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("lnp-theme", dark ? "dark" : "light");
  } catch (error) {
    /* demo keeps working if storage is blocked */
  }
  applyThemeIcons();
}

document.addEventListener("DOMContentLoaded", applyThemeIcons);
