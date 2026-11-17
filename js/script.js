
/* =========================================
   MY TRAVEL - JAVASCRIPT
   Author: Teodora Pilipović
   Year: 2026
========================================= */

// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// WEBSITE SHARING

const shareButton = document.querySelector(".share-button");

if (shareButton) {
    shareButton.addEventListener("click", async function () {
        const shareData = {
            title: "My Travel - Turistička agencija",
            text: "Otkrijte inspiraciju za svoje sledeće putovanje.",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Deljenje nije uspelo:", error);
                }
            }
        } else if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(window.location.href);
                shareButton.textContent = "Link je kopiran!";
            } catch (error) {
                alert("Kopiranje linka nije uspelo. Kopirajte adresu iz pregledača.");
            }
        } else {
            alert("Kopirajte adresu stranice iz pregledača da biste je podelili.");
        }
    });
}

// CONTACT FORM

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value;
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Molimo popunite sva polja.");
            return;
        }

        const recipient = "info@mytravel.rs";
        const emailSubject = encodeURIComponent("My Travel upit: " + subject);
        const emailBody = encodeURIComponent(
            "Ime i prezime: " + name + "\n" +
            "E-mail: " + email + "\n" +
            "Tema: " + subject + "\n\n" +
            "Poruka:\n" + message
        );

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;
    });
}
