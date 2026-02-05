
function loadAnalytics() {
  if (window.analyticsLoaded) return; // 🛑 evită dublu load
  window.analyticsLoaded = true;

  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-1CWHGGP30P";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-1CWHGGP30P');
}

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  document.getElementById('cookie-banner')?.remove();
  loadAnalytics();
}

function refuseCookies() {
  localStorage.setItem('cookiesAccepted', 'false');
  document.getElementById('cookie-banner')?.remove();
}

document.addEventListener('DOMContentLoaded', function () {
  const consent = localStorage.getItem('cookiesAccepted');

  if (consent === 'true') {
    loadAnalytics();
    document.getElementById('cookie-banner')?.remove();
  }

  if (consent === 'false') {
    document.getElementById('cookie-banner')?.remove();
  }
});




/* =========================
   HERO IMAGE + FLEET SLIDER
========================= */
const heroWrapper = document.querySelector(".hero-image");
const heroImage = document.querySelector(".hero-image img:first-child");
const fleetImages = document.querySelectorAll(".fleet-gallery img");

let currentIndex = 0;
let autoPlay = true;
let interval = null;

// afișează imaginea
function showImage(index) {
    fleetImages.forEach(img => img.classList.remove("active"));
    heroWrapper.classList.remove("high-focus", "low-focus");

    const img = fleetImages[index];
    const newBg = img.dataset.bg;

    heroImage.style.opacity = 0;

    setTimeout(() => {
        heroImage.src = newBg;
        heroImage.style.opacity = 1;
    }, 750);

    img.classList.add("active");

    if (img.classList.contains("high-focus")) {
        heroWrapper.classList.add("high-focus");
    }

    if (img.classList.contains("low-focus")) {
        heroWrapper.classList.add("low-focus");
    }

    currentIndex = index;
}

// autoplay
function startAutoPlay() {
    interval = setInterval(() => {
        if (!autoPlay) return;
        let next = (currentIndex + 1) % fleetImages.length;
        showImage(next);
    }, 8000);
}

// click manual = oprește autoplay
fleetImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        autoPlay = false;
        clearInterval(interval);
        showImage(index);
    });
});

/* =========================
   NAV ACTIVE LINK ON SCROLL
========================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

/* =========================
   PAGE LOAD
========================= */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    showImage(0);
    startAutoPlay();
    window.dispatchEvent(new Event("scroll"));
});

const indicators = document.querySelectorAll(".indicator");

fleetImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        const newBg = img.getAttribute("data-bg");

        if (heroImage.src.includes(newBg)) return;

        heroImage.style.opacity = 0;

        setTimeout(() => {
            heroImage.src = newBg;
            heroImage.style.opacity = 1;
        }, 250);

        // active thumbnail
        fleetImages.forEach(i => i.classList.remove("active"));
        img.classList.add("active");

        // active indicator
        indicators.forEach(ind => ind.classList.remove("active"));
        indicators[index].classList.add("active");
    });
});

