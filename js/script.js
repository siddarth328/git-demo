// ===================================================================
// SAI SIDDHARTH PORTFOLIO - JAVASCRIPT
// Interactive Features: ScrollSpy, Mobile Menu, Car Filtering,
// Lightbox Modal, Contact Form Validation & Back to Top
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector("nav");

    if (mobileToggle && nav) {
        mobileToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
            const isOpen = nav.classList.contains("open");
            mobileToggle.setAttribute("aria-expanded", isOpen);
            mobileToggle.innerHTML = isOpen ? "✕" : "☰";
        });

        // Close mobile nav when clicking a link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (nav.classList.contains("open")) {
                    nav.classList.remove("open");
                    mobileToggle.innerHTML = "☰";
                    mobileToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // 2. Active Link & ScrollSpy for Single-page navigation
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    function updateActiveNav() {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", updateActiveNav);
        updateActiveNav();
    } else {
        // Fallback for multi-page highlighting
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll("nav a").forEach(link => {
            const targetPage = link.getAttribute("href");
            if (targetPage === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // 3. Back to Top Button
    const backToTopBtn = document.querySelector(".back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 4. Car Filter Tabs
    const filterTabs = document.querySelectorAll(".filter-tab");
    const carCards = document.querySelectorAll(".car-card");

    if (filterTabs.length > 0 && carCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                filterTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                const filter = tab.getAttribute("data-filter");

                carCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        card.style.display = "block";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 50);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px)";
                        setTimeout(() => {
                            card.style.display = "none";
                        }, 250);
                    }
                });
            });
        });
    }

    // 5. Lightbox Modal for Car Photos
    const lightboxModal = document.getElementById("carLightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDesc = document.getElementById("lightboxDesc");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (lightboxModal && lightboxImg) {
        // Open modal on car card click
        carCards.forEach(card => {
            card.addEventListener("click", () => {
                const img = card.querySelector("img");
                const title = card.querySelector(".car-title-text") || card.querySelector("h4");
                const desc = card.querySelector("p");

                if (img) lightboxImg.src = img.src;
                if (title && lightboxTitle) lightboxTitle.textContent = title.textContent;
                if (desc && lightboxDesc) lightboxDesc.textContent = desc.textContent;

                lightboxModal.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        // Close modal
        function closeLightbox() {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = "";
        }

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
                closeLightbox();
            }
        });
    }

    // 6. Contact Form Submission (Front-end enhancement)
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn ? submitBtn.innerHTML : "Send Message";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "<span>Sending...</span>";
            }

            setTimeout(() => {
                formStatus.className = "form-status-msg success";
                formStatus.innerHTML = "✓ Thank you! Your message has been received. Sai Siddharth will get back to you soon.";
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }

                setTimeout(() => {
                    formStatus.style.display = "none";
                }, 6000);
            }, 800);
        });
    }

    // 7. Update current year dynamically
    const yearSpan = document.querySelector("[data-current-year]");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
