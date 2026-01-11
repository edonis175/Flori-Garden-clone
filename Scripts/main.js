// Mobile menu functionality
function showMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  if (!mobileMenu || !hamburger) return;

  // Toggle the active class on the mobile menu
  mobileMenu.classList.toggle("active");

  // Toggle hamburger icon animation
  hamburger.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  if (!mobileMenu || !hamburger) return;

  // Check if click is outside mobile menu and hamburger
  if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close menu on window resize to desktop
window.addEventListener("resize", function () {
  if (window.innerWidth > 992) {
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburger = document.getElementById("hamburger");
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close menu when clicking on mobile nav links
document.addEventListener("DOMContentLoaded", function () {
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  if (!mobileMenu || !hamburger) return;

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Close mobile menu when link is clicked
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
});

// Parallax effect for hero section
function initParallaxEffect() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  });
}
// Parallax effect for hero section
initParallaxEffect();

/* =========================================
   SE – SIMPLE ELEMENT ANIMATION ENGINE
   ========================================= */
(function () {
  const EFFECT_CLASS_MAP = {
    slideDown: "se-slide-down",
    riseUp: "se-rise-up",
    fadeIn: "se-fade-in",
    scaleUp: "se-scale-up",
    slideLeft: "se-slide-left",
    slideRight: "se-slide-right",
  };

  function normalize(target) {
    if (typeof target === "string") {
      return Array.from(document.querySelectorAll(target));
    }
    if (target instanceof Element) return [target];
    if (target && typeof target.length === "number") {
      return Array.from(target);
    }
    return [];
  }

  function applyAnimation(el, effectClass, options, index) {
    const {
      duration = 600,
      delay = 0,
      stagger = 0,
      ease = "cubic-bezier(0.22, 1, 0.36, 1)",
    } = options;

    el.classList.add("se-prep");

    el.style.setProperty("--se-duration", duration + "ms");
    el.style.setProperty("--se-delay", delay + index * stagger + "ms");
    el.style.setProperty("--se-ease", ease);

    requestAnimationFrame(() => {
      el.classList.add("se-anim", effectClass);
      el.classList.remove("se-prep");
    });
  }

  function se(target, effect, options = {}) {
    const effectClass = EFFECT_CLASS_MAP[effect];
    if (!effectClass) return;

    normalize(target).forEach((el, i) => {
      applyAnimation(el, effectClass, options, i);
    });
  }

  // Viewport-triggered animation
  se.onView = function (target, effect, options = {}) {
    const effectClass = EFFECT_CLASS_MAP[effect];
    if (!effectClass) return;

    const elements = normalize(target);
    const { threshold = 0.15, rootMargin = "0px", once = false } = options;

    // Hide elements initially
    elements.forEach((el) => {
      el.classList.add("se-hidden");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.remove("se-hidden");
            const elIndex = elements.indexOf(el);
            applyAnimation(el, effectClass, options, elIndex);
            if (once) {
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
  };

  se.onLoad = function (fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  window.se = se;
})();

/* =========================================
   PAGE-SPECIFIC ANIMATIONS
   ========================================= */
se.onLoad(() => {
  const page = document.body.dataset.page;

  if (!page) return;

  /* HOME PAGE */
  if (page === "home") {
    // Header animation on load
    se("#header", "slideDown", {
      duration: 1200,
    });

    // Banner animation on load
    se("#banner .text > *", "riseUp", {
      duration: 1500,
      stagger: 150,
    });

    // Viewport-triggered animations
    se.onView("#Welcome", "riseUp", {
      duration: 800,
      threshold: 0.4,
    });

    se.onView(".flori-garten-container .right-stack", "slideRight", {
      duration: 900,
      threshold: 0.8,
    });
    se.onView(".flori-garten-container .left-stack", "slideLeft", {
      duration: 900,
      threshold: 0.8,
    });

    se.onView(".wishes", "slideRight", {
      duration: 1000,
      threshold: 0.3,
    });

    se.onView(".wishes-buttons p", "slideRight", {
      duration: 1000,
      threshold: 0.3,
    });

    se.onView(".gardening-cards-row .image-card1", "slideLeft", {
      duration: 1000,
      threshold: 0.8,
    });

    se.onView(".gardening-cards-row .image-card2", "riseUp", {
      duration: 1000,
      threshold: 0.8,
    });

    se.onView(".gardening-cards-row .text-card", "slideRight", {
      duration: 1000,
      threshold: 0.8,
    });

    se.onView(".horticulture-wrapper", "riseUp", {
      duration: 1200,
      threshold: 0.5,
    });

    se.onView(".arts", "slideRight", {
      duration: 1200,
      threshold: 0.3,
    });

    se.onView(".arts-cards-row .image-card1", "slideLeft", {
      duration: 1000,
      threshold: 0.8,
    });

    se.onView(".arts-cards-row .arts-card2", "riseUp", {
      duration: 1000,
      threshold: 0.8,
    });
    se.onView(".arts-text-card ", "slideRight", {
      duration: 1000,
      threshold: 0.8,
    });

    se.onView(".arts-wrapper", "riseUp", {
      duration: 1000,
      threshold: 0.8,
    });
    se.onView(".latest-works", "slideLeft", {
      duration: 800,
      threshold: 0.8,
    });

    se.onView(".footer-cards .footer-card", "scaleUp", {
      duration: 700,
      stagger: 150,
      threshold: 0.5,
    });
  }

  /* ABOUT PAGE */
  if (page === "about") {
    se("#header", "slideDown", {
      duration: 1200,
    });

    se.onView("#about-intro .text > *", "riseUp", {
      duration: 1500,
      stagger: 150,
      threshold: 0.2,
    });
  }

  /* SERVICES PAGE */
  if (page === "services") {
    se("#header", "slideDown", {
      duration: 1200,
    });
    se("#banner-service .text > *", "riseUp", {
      duration: 1500,
      stagger: 150,
    });

    const cards = document.querySelectorAll(".service-box");

    if (cards.length > 0) {
      se.onView(cards[0], "slideLeft", {
        duration: 2000,
        threshold: 0.2,
      });
      se.onView(cards[1], "riseUp", {
        duration: 2500,
        threshold: 0.2,
      });
      se.onView(cards[2], "slideRight", {
        duration: 2000,
        threshold: 0.2,
      });
    }

    se.onView(".service-card", "scaleUp", {
      duration: 700,
      stagger: 120,
      threshold: 0.15,
    });
  }

  /* CONTACT PAGE */
  if (page === "contact") {
    se("#header", "slideDown", {
      duration: 1200,
    });

    se.onView("#services-cards-container", "riseUp", {
      duration: 1200,
      stagger: 150,
      threshold: 0.2,
    });
  }
});
