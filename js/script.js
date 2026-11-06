"use strict";

const header = document.querySelector("#siteHeader");
const demoBanner = document.querySelector("#demoBanner");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector("#primaryNav");
const backToTop = document.querySelector("#backToTop");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateScrollUI() {
  const isScrolled = window.scrollY > 24;
  header.classList.toggle("is-scrolled", isScrolled);
  backToTop.classList.toggle("is-visible", window.scrollY > 550);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

document.querySelector(".banner-close").addEventListener("click", () => {
  demoBanner.classList.add("is-dismissed");
});

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navPanel.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (menuToggle.getAttribute("aria-expanded") === "true"
    && !navPanel.contains(event.target)
    && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const counters = document.querySelectorAll("[data-count]");
function animateCounter(element) {
  const target = Number(element.dataset.count);
  if (reducedMotion) {
    element.textContent = String(target);
    return;
  }
  const duration = 1300;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.75 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.querySelector("#projectCount");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    projectCount.textContent = `${String(visibleCount).padStart(2, "0")} PROJECT${visibleCount === 1 ? "" : "S"}`;
  });
});

const projects = {
  northline: {
    category: "COMMERCIAL · OFFICE",
    title: "Northline Workplace",
    description: "An illustrative commercial office project focused on a bright, adaptable workplace, considered finishes, and a smooth path from planning through delivery.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern commercial office building"
  },
  "oak-house": {
    category: "RESIDENTIAL · NEW BUILD",
    title: "Oak House",
    description: "An illustrative new-build home combining warm natural materials, a connection to the landscape, and practical spaces for everyday living.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary residential home"
  },
  "foundry-commons": {
    category: "COMMERCIAL · INTERIOR",
    title: "Foundry Commons",
    description: "An illustrative commercial interior brought together around natural light, flexible collaboration areas, and durable, welcoming finishes.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    alt: "Bright collaborative commercial office interior"
  },
  "the-harper": {
    category: "RENOVATION · RESIDENTIAL",
    title: "The Harper",
    description: "An illustrative residential renovation that gives a familiar space new life through thoughtful planning and a refreshed, cohesive interior.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    alt: "Renovated contemporary residential interior"
  },
  ridgeview: {
    category: "RESIDENTIAL · CUSTOM HOME",
    title: "Ridgeview Residence",
    description: "An illustrative custom residence balancing clean architectural lines, inviting materials, and a practical connection between indoor and outdoor living.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern custom residence with warm finishes"
  },
  "union-hall": {
    category: "RENOVATION · COMMERCIAL",
    title: "Union Hall",
    description: "An illustrative commercial renovation centered on renewing an existing space with durable finishes, improved comfort, and a clear identity.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    alt: "Refined renovated commercial interior"
  },
  "oakridge-roof": {
    category: "ROOFING · RESIDENTIAL",
    title: "Oakridge Roof Renewal",
    description: "An illustrative residential roofing project showcasing a roof renewal designed to complement the home and help protect it from the elements.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern home with pitched roof and finished exterior"
  }
};

const projectDialog = document.querySelector("#projectDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogCategory = document.querySelector("#dialogCategory");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogContact = document.querySelector("#dialogContact");

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    dialogImage.src = project.image;
    dialogImage.alt = project.alt;
    dialogTitle.textContent = project.title;
    dialogCategory.textContent = project.category;
    dialogDescription.textContent = project.description;
    projectDialog.showModal();
  });
});

function closeProjectDialog() {
  if (projectDialog.open) projectDialog.close();
}

projectDialog.querySelector(".dialog-close").addEventListener("click", closeProjectDialog);
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProjectDialog();
});
dialogContact.addEventListener("click", closeProjectDialog);

const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
const slideCurrent = document.querySelector("#slideCurrent");
const slideTotal = document.querySelector("#slideTotal");
let activeSlide = 0;
let carouselTimer;
slideTotal.textContent = String(slides.length).padStart(2, "0");

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === activeSlide;
    slide.hidden = !active;
    slide.classList.toggle("is-active", active);
  });
  slideCurrent.textContent = String(activeSlide + 1).padStart(2, "0");
}

function restartCarousel() {
  window.clearInterval(carouselTimer);
  if (!reducedMotion) carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 6500);
}

document.querySelector("#testimonialPrev").addEventListener("click", () => {
  showSlide(activeSlide - 1);
  restartCarousel();
});
document.querySelector("#testimonialNext").addEventListener("click", () => {
  showSlide(activeSlide + 1);
  restartCarousel();
});
const testimonialStage = document.querySelector(".testimonial-stage");
testimonialStage.addEventListener("mouseenter", () => window.clearInterval(carouselTimer));
testimonialStage.addEventListener("mouseleave", restartCarousel);
testimonialStage.addEventListener("focusin", () => window.clearInterval(carouselTimer));
testimonialStage.addEventListener("focusout", restartCarousel);
restartCarousel();

const inquiryForm = document.querySelector("#inquiryForm");
const formMessage = document.querySelector("#formMessage");
inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  formMessage.textContent = "Thanks for exploring the Alvoratech demo. This form is a preview only—your details were not sent or stored.";
  formMessage.classList.add("is-visible");
  inquiryForm.reset();
});

document.querySelector("#currentYear").textContent = String(new Date().getFullYear());
