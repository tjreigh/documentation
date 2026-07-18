document.querySelector("#year").textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return root.dataset.theme || (systemTheme.matches ? "dark" : "light");
}

function updateThemeToggle() {
  const theme = currentTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-checked", theme === "dark" ? "true" : "false");
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeColor.content = theme === "dark" ? "#141413" : "#eeeeea";
}

themeToggle.addEventListener("click", () => {
  const nextTheme = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;

  try {
    localStorage.setItem("theme", nextTheme);
  } catch {}

  updateThemeToggle();
});

systemTheme.addEventListener("change", updateThemeToggle);
updateThemeToggle();
