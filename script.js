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

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form && status) {
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.dataset.submitting === "true") return;

    form.dataset.submitting = "true";
    if (submitButton) submitButton.disabled = true;
    status.classList.add("is-visible");
    status.classList.remove("is-error");
    status.textContent = "Sending your inquiry...";

    try {
      const endpoint = new URL(form.action);
      endpoint.pathname = `/ajax${endpoint.pathname}`;

      const response = await fetch(endpoint, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();

      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error("FormSubmit did not confirm the submission.");
      }

      status.textContent = "Your inquiry was submitted successfully. We'll be in touch soon.";
      form.reset();
    } catch {
      status.classList.add("is-error");
      status.textContent = "We could not confirm your inquiry was submitted. Please try again or email webforgemodernwebsites@gmail.com.";
    } finally {
      delete form.dataset.submitting;
      if (submitButton) submitButton.disabled = false;
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
