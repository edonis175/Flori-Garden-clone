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
    se("#header", "slideDown", {
      duration: 1200,
    });

    se("#banner .text > *", "riseUp", {
      duration: 1500,
      stagger: 150,
    });
  }

  /* ABOUT PAGE */
  if (page === "about") {
    se("#header", "slideDown", {
      duration: 1200,
    });
  }
  se("#about-intro .text > *", "riseUp", {
    duration: 1500,
    stagger: 150,
  });

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
      se(cards[0], "slideLeft", { duration: 2000 });
      se(cards[1], "riseUp", { duration: 2500 });
      se(cards[2], "slideRight", { duration: 2000 });
    }

    se(".service-card", "scaleUp", {
      duration: 700,
      stagger: 120,
    });
  }

  /* CONTACT PAGE */
  if (page === "contact") {
    se("#header", "slideDown", {
      duration: 1200,
    });
  }
  se("#contact-banner .text > *", "riseUp", {
    duration: 1200,
    stagger: 150,
  });
});
