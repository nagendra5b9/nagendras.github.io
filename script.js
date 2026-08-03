const pageLoader = document.getElementById("pageLoader");
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("themeToggle");
const typedRole = document.getElementById("typedRole");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader.classList.add("hidden");
  }, 350);
});

currentYear.textContent = new Date().getFullYear();

function closeMobileMenu() {
  navLinksContainer.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinksContainer.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("no-scroll", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinksContainer.contains(event.target);
  const clickedMenuButton = menuToggle.contains(event.target);

  if (
    navLinksContainer.classList.contains("open") &&
    !clickedInsideMenu &&
    !clickedMenuButton
  ) {
    closeMobileMenu();
  }
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 15);
}

window.addEventListener("scroll", updateHeader);
updateHeader();

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${sectionId}`
        );
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark-theme");
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const newTheme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";

  localStorage.setItem("portfolio-theme", newTheme);
  updateThemeIcon();
});

const roles = [
  "Java Full Stack Developer",
  "Backend Developer",
  "Spring Boot Developer",
  "Problem Solver",
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    characterIndex += 1;
    typedRole.textContent = currentRole.slice(0, characterIndex);

    if (characterIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1400);
      return;
    }
  } else {
    characterIndex -= 1;
    typedRole.textContent = currentRole.slice(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 90);
}

setTimeout(typeRole, 700);

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const isDecimal = String(target).includes(".");
  const duration = 1200;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    element.textContent = isDecimal ? value.toFixed(2) : Math.round(value);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = isDecimal ? target.toFixed(2) : target;
    }
  }

  requestAnimationFrame(updateCounter);
}

const statsSection = document.querySelector(".about-stats");

const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(animateCounter);
      counterObserver.disconnect();
    }
  },
  { threshold: 0.35 }
);

if (statsSection) {
  counterObserver.observe(statsSection);
}

function setFieldError(input, message) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.add("invalid");
  formGroup.querySelector(".error-message").textContent = message;
}

function clearFieldError(input) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.remove("invalid");
  formGroup.querySelector(".error-message").textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => clearFieldError(field));
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  let isValid = true;

  if (nameInput.value.trim().length < 2) {
    setFieldError(nameInput, "Please enter your name.");
    isValid = false;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    setFieldError(emailInput, "Please enter a valid email address.");
    isValid = false;
  }

  if (subjectInput.value.trim().length < 3) {
    setFieldError(subjectInput, "Please enter a subject.");
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    setFieldError(messageInput, "Please enter at least 10 characters.");
    isValid = false;
  }

  if (!isValid) {
    formStatus.textContent = "Please correct the highlighted fields.";
    formStatus.className = "form-status";
    return;
  }

  /*
    This portfolio is fully frontend-based, so the form does not send data
    to a server yet. Connect Formspree, EmailJS, Web3Forms, or your own backend
    endpoint here when you deploy the site.
  */
  formStatus.textContent =
    "Form validated successfully. Connect an email service before deployment.";
  formStatus.className = "form-status success";
  contactForm.reset();
});
