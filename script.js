const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.focus();
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const copyEmailBtn = document.getElementById("copy-email-btn");
const copyBtnText = document.getElementById("copy-btn-text");
const copyStatus = document.getElementById("copy-status");
const emailAddress = "webforgemodernwebsites@gmail.com";

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = emailAddress;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      copyEmailBtn.classList.add("copied");
      if (copyBtnText) copyBtnText.textContent = "Copied!";
      if (copyStatus) copyStatus.textContent = "✓ Email copied to clipboard!";

      setTimeout(() => {
        copyEmailBtn.classList.remove("copied");
        if (copyBtnText) copyBtnText.textContent = "Copy";
        if (copyStatus) copyStatus.textContent = "";
      }, 2500);
    } catch {
      if (copyStatus) copyStatus.textContent = "Please copy the email address manually.";
    }
  });
}


// Add a subtle reveal effect to content, with a safe fallback if reduced motion is enabled.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    ".service-card, .work-card, .process-step, .why-item, .about-copy, .faq-item"
  );
  revealTargets.forEach((item) => item.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((item) => observer.observe(item));
}
