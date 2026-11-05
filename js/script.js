// Shared JavaScript for the portfolio website.
// Navigation uses normal page links; this script highlights the current page
// and provides a small enhancement for the mobile-friendly site.

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach((link) => {
        const targetPage = link.getAttribute("href");
        if (targetPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Update the footer year automatically.
    const yearElement = document.querySelector("[data-current-year]");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
