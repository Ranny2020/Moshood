"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const projectGrid = document.querySelector("#project-grid");
const galleryGrid = document.querySelector("#gallery-grid");
const slideImage = document.querySelector("#gallery-slide-image");
const slideCaption = document.querySelector("#gallery-slide-caption");
const slideCount = document.querySelector("#gallery-slide-count");
const projectCategories = {
  website: "Website",
  webinar: "Webinar",
  "email-campaign": "Email campaign",
  "storytelling-report": "Storytelling report",
  "social-media-management": "Social media management",
};
const featuredProjects = [
  {
    category: "website",
    title: "eHealth Africa",
    description: "WordPress website managed for eHealth Africa.",
    link_url: "https://ehealthafrica.org/",
  },
  {
    category: "website",
    title: "Insights Learning Forum",
    description: "Webflow website managed for the Insights Learning Forum.",
    link_url: "https://insightslearningforum.org/",
  },
  {
    category: "email-campaign",
    title: "Meeting invitation campaign",
    description: "Email campaign sample shared through Mailchimp.",
    link_url:
      "https://mailchi.mp/ae24413b7a45/im-inviting-you-to-this-meeting-10157326",
  },
  {
    category: "webinar",
    title: "Insights by eHA",
    description: "Webinar series managed for eHealth Africa.",
    link_url: "https://ehealthafrica.org/events/#insights-by-eha",
  },
  {
    category: "storytelling-report",
    title: "2026 Mid Year Report – Expanding Reach, Readiness and Resilience",
    description:
      "Mid-year storytelling and impact report produced for eHealth Africa.",
    link_url:
      "https://ehealthafrica.org/report/2026-mid-year-report-expanding-reach-readiness-resilience/",
  },
  {
    category: "storytelling-report",
    title: "Engaging Communities to Expand HPV Vaccine Coverage in Kano State",
    description:
      "Community health storytelling report produced for eHealth Africa.",
    link_url:
      "https://ehealthafrica.org/report/engaging-communities-expand-hpv-vaccine-coverage-kano-state/",
  },
  {
    category: "storytelling-report",
    title:
      "Scaling Digital Solutions to Save More Lives – 2025 Annual Impact Report",
    description: "Annual impact report produced for eHealth Africa.",
    link_url:
      "https://ehealthafrica.org/report/scaling-digital-solutions-to-save-more-lives/",
  },
  {
    category: "storytelling-report",
    title:
      "Empowering Teachers to Drive HPV Awareness and Vaccination in Northern Nigeria",
    description:
      "Public health storytelling report produced for eHealth Africa.",
    link_url:
      "https://ehealthafrica.org/report/empowering-teachers-drive-hpv-awareness-and-vaccination-northern-nigeria/",
  },
  {
    category: "social-media-management",
    title: "YIAGA on X",
    description:
      "From 2017 to 2023, developed creative digital content and audience engagement initiatives, contributing to 500% Twitter follower growth over two years.",
    link_url: "https://x.com/YIAGA",
  },
  {
    category: "social-media-management",
    title: "YIAGA on Facebook",
    description:
      "From 2017 to 2023, developed creative digital content and audience engagement initiatives, contributing to 150% Facebook follower growth over two years.",
    link_url: "https://web.facebook.com/yiaga.org/?_rdc=1&_rdr#",
  },
];
const fieldPhotos = [
  "mosh 1.jpeg",
  "mosh 2.jpeg",
  "mosh 3.jpeg",
  "mosh 4.jpeg",
  "mosh 5.jpeg",
  "mosh 6.jpeg",
  "mosh 7 (1).jpeg",
  "mosh 7.jpeg",
  "mosh 9.jpg",
  "mosh 10.jpeg",
  "mosh 12.jpeg",
  "mosh 13.jpeg",
  "mosh 14.jpeg",
  "mosh 15.jpeg",
  "mosh 16.jpg",
  "mosh 17.jpg",
  "mosh 18.jpg",
  "mosh 19.jpg",
  "mosh 20.jpg",
  "mosh 21.jpg",
  "mosh 22.jpg",
  "mosh 23.jpg",
  "mosh 24.jpeg",
  "mosh 25.jpeg",
  "mosh 26.jpg",
  "mosh 27.jpg",
  "mosh 28.jpg",
  "mosh 31.jpeg",
  "mosh 34.jpeg",
  "mosh 35.jpg",
  "mosh 36.jpg",
  "mosh 38.jpg",
  "mosh 39.jpg",
  "mosh 40.jpg",
  "Mosh 41.jpg",
  "mosh 43.jpg",
  "mosh 44 (1).jpg",
  "mosh 44.jpg",
  "mosh 47.jpg",
];

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function renderProjects() {
  if (!projectGrid) return;

  projectGrid.innerHTML = featuredProjects
    .map(
      (project) => `
        <article class="project-card is-linked">
          <a href="${escapeHtml(project.link_url)}" target="_blank" rel="noopener noreferrer">
            <p class="project-category">${escapeHtml(projectCategories[project.category])}</p>
            <h3>${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <span class="project-link" aria-hidden="true">View sample ↗</span>
          </a>
        </article>`,
    )
    .join("");
}

function renderGallery() {
  if (galleryGrid) {
    galleryGrid.innerHTML = fieldPhotos
      .map(
        (filename, index) => `
          <figure class="gallery-card${index === 3 ? " gallery-card-face" : ""}">
            <img
              src="${encodeURIComponent(filename)}"
              alt="Moshood Isah during field work, photo ${index + 1}"
              loading="lazy"
            />
          </figure>`,
      )
      .join("");
  }

  if (!slideImage || !slideCaption || !slideCount) return;

  let activePhoto = 0;
  const showPhoto = (index) => {
    activePhoto = (index + fieldPhotos.length) % fieldPhotos.length;
    slideImage.src = encodeURIComponent(fieldPhotos[activePhoto]);
    slideImage.classList.toggle("is-portrait", activePhoto === 3);
    slideImage.alt = `Moshood Isah during field work, photo ${activePhoto + 1}`;
    slideCaption.textContent = `Field work, photo ${activePhoto + 1}`;
    slideCount.textContent = `${String(activePhoto + 1).padStart(2, "0")} / ${String(fieldPhotos.length).padStart(2, "0")}`;
  };
  const previousButton = document.querySelector("[data-gallery-prev]");
  const nextButton = document.querySelector("[data-gallery-next]");

  previousButton.addEventListener("click", () => showPhoto(activePhoto - 1));
  nextButton.addEventListener("click", () => showPhoto(activePhoto + 1));
  showPhoto(activePhoto);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let slideshowTimer;
    const stopSlideshow = () => window.clearInterval(slideshowTimer);
    const startSlideshow = () => {
      stopSlideshow();
      if (!document.hidden) {
        slideshowTimer = window.setInterval(
          () => showPhoto(activePhoto + 1),
          5000,
        );
      }
    };

    document.addEventListener("visibilitychange", startSlideshow);
    [previousButton, nextButton].forEach((button) => {
      button.addEventListener("click", startSlideshow);
      button.addEventListener("focus", stopSlideshow);
      button.addEventListener("blur", startSlideshow);
    });
    startSlideshow();
  }
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

renderProjects();
renderGallery();
