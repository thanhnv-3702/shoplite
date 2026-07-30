const root = document.documentElement;
const btn = document.getElementById("theme-toggle");
const stored = localStorage.getItem("shoplite-theme");

if (stored === "dark") {
  root.classList.add("dark");
}

function syncLabel(): void {
  if (!(btn instanceof HTMLButtonElement)) return;
  const isDark = root.classList.contains("dark");
  btn.setAttribute("aria-pressed", String(isDark));
  btn.textContent = isDark ? "☀️" : "🌙";
  btn.setAttribute("aria-label", isDark ? "Bật chế độ sáng" : "Bật chế độ tối");
}

syncLabel();

btn?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem(
    "shoplite-theme",
    root.classList.contains("dark") ? "dark" : "light"
  );
  syncLabel();
});
