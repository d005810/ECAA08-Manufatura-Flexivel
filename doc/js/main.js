// doc/js/main.js - Script Global Seguro e Sem Erros
document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. Alternador de Tema Escuro / Claro
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const docEl = document.documentElement;
        const currentTheme = docEl.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        docEl.setAttribute("data-theme", nextTheme);
        themeBtn.innerText = nextTheme === "dark" ? "☀️" : "🌙";
        try { localStorage.setItem("scada_theme", nextTheme); } catch (e) {}
      });
    }

    // 2. Menu Mobile Seguro
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });
    }
  } catch (err) {
    console.warn("Aviso main.js:", err);
  }
});
